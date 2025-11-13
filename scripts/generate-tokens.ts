/**
 * Token Generator Script
 * 
 * Transforms JSON token files into CSS custom properties (variables).
 * Only semantic and component tokens are exposed as CSS vars.
 * Primitives and brand tokens are resolved internally.
 * 
 * Usage: npm run generate:tokens
 * Output: src/styles/tokens.css
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths to token files
const TOKENS_DIR = resolve(__dirname, '../src/tokens');
const OUTPUT_FILE = resolve(__dirname, '../src/styles/tokens.css');

// Token file names
const TOKEN_FILES = {
  primitives: 'primitive-tokens.JSON',
  brand: 'brand-tokens.JSON',
  semantic: 'semantic-tokens.JSON',
  component: 'component-tokens.JSON',
};

interface TokenValue {
  $value?: string | number | object;
  $type?: string;
  $description?: string;
  [key: string]: unknown;
}

type TokenObject = {
  [key: string]: TokenValue | TokenObject | string | number;
};

/**
 * Load and parse a JSON token file
 */
function loadTokenFile(filename: string): TokenObject {
  const filePath = resolve(TOKENS_DIR, filename);
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not load ${filename}`, error);
    return {};
  }
}

/**
 * Flatten nested token object into dot-notation paths
 * e.g., { color: { neutral: { surface: { default: '#fff' } } } }
 * becomes { 'color.neutral.surface.default': '#fff' }
 * 
 * Complex objects (typography, elevation) are decomposed into separate properties
 */
function flattenTokens(
  obj: TokenObject,
  prefix = '',
  result: Record<string, string | number> = {}
): Record<string, string | number> {
  for (const key in obj) {
    // Skip metadata keys
    if (key.startsWith('$')) continue;

    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object') {
      // Check if it's a token value object with $value
      if ('$value' in value) {
        const tokenValue = (value as TokenValue).$value;
        
        if (typeof tokenValue === 'string' || typeof tokenValue === 'number') {
          result[path] = tokenValue;
        } else if (typeof tokenValue === 'object' && tokenValue !== null) {
          // Handle complex values (typography, shadows, etc.)
          if (Array.isArray(tokenValue)) {
            // Arrays (like elevation shadows) - store as JSON for now
            result[path] = JSON.stringify(tokenValue);
          } else {
            // Objects (like typography) - decompose into separate properties
            for (const subKey in tokenValue) {
              if (typeof tokenValue[subKey] === 'string' || typeof tokenValue[subKey] === 'number') {
                result[`${path}.${subKey}`] = tokenValue[subKey];
              } else {
                // Nested objects - stringify
                result[`${path}.${subKey}`] = JSON.stringify(tokenValue[subKey]);
              }
            }
          }
        }
      } else {
        // Recurse into nested object
        flattenTokens(value as TokenObject, path, result);
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      result[path] = value;
    }
  }

  return result;
}

/**
 * Resolve token references in format {token.path.here}
 */
function resolveReferences(
  value: string | number,
  allTokens: Record<string, string | number>,
  visited = new Set<string>()
): string | number {
  if (typeof value !== 'string') return value;

  // Match {token.path} pattern
  const referencePattern = /\{([^}]+)\}/g;
  let resolved = value;
  let match;

  while ((match = referencePattern.exec(value)) !== null) {
    const refPath = match[1];

    // Prevent circular references
    if (visited.has(refPath)) {
      console.warn(`Circular reference detected: ${refPath}`);
      continue;
    }

    const refValue = allTokens[refPath];
    if (refValue !== undefined) {
      visited.add(refPath);
      const resolvedRef = resolveReferences(refValue, allTokens, visited);
      resolved = resolved.replace(match[0], String(resolvedRef));
      visited.delete(refPath);
    } else {
      console.warn(`Reference not found: ${refPath}`);
    }
  }

  return resolved;
}

/**
 * Convert token path to CSS variable name
 * e.g., 'color.brand.action.primary.default' -> '--color-brand-action-primary-default'
 */
function toCSSVariableName(path: string): string {
  return `--${path.replace(/\./g, '-')}`;
}

/**
 * Format token value for CSS
 */
function formatCSSValue(value: string | number): string {
  const str = String(value);

  // Remove quotes from font family strings
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }

  return str;
}

/**
 * Generate CSS custom properties from tokens
 */
function generateCSS(tokens: Record<string, string | number>): string {
  const lines: string[] = [
    '/**',
    ' * MDS Design Tokens',
    ' * Auto-generated from JSON token files',
    ' * DO NOT EDIT MANUALLY',
    ' *',
    ' * Generated: ' + new Date().toISOString(),
    ' */',
    '',
    ':root {',
  ];

  // Sort tokens alphabetically for consistency
  const sortedPaths = Object.keys(tokens).sort();

  // Group tokens by category for better readability
  const categories = new Map<string, string[]>();
  
  for (const path of sortedPaths) {
    const category = path.split('.')[0];
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(path);
  }

  // Generate CSS with category comments
  let isFirst = true;
  for (const [category, paths] of Array.from(categories.entries()).sort()) {
    if (!isFirst) {
      lines.push('');
    }
    lines.push(`  /* ${category} */`);
    
    for (const path of paths) {
      const cssVar = toCSSVariableName(path);
      const value = formatCSSValue(tokens[path]);
      lines.push(`  ${cssVar}: ${value};`);
    }
    
    isFirst = false;
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Generating CSS tokens...\n');

  // Load all token files
  console.log('📂 Loading token files...');
  const primitives = loadTokenFile(TOKEN_FILES.primitives);
  const brand = loadTokenFile(TOKEN_FILES.brand);
  const semantic = loadTokenFile(TOKEN_FILES.semantic);
  const component = loadTokenFile(TOKEN_FILES.component);

  // Flatten all tokens for reference resolution
  console.log('🔄 Flattening tokens...');
  const flatPrimitives = flattenTokens(primitives);
  const flatBrand = flattenTokens(brand);
  const flatSemantic = flattenTokens(semantic);
  const flatComponent = flattenTokens(component);

  // Combine all tokens for reference resolution
  const allTokens = {
    ...flatPrimitives,
    ...flatBrand,
    ...flatSemantic,
    ...flatComponent,
  };

  console.log(
    `  Found ${Object.keys(flatPrimitives).length} primitive tokens`
  );
  console.log(`  Found ${Object.keys(flatBrand).length} brand tokens`);
  console.log(`  Found ${Object.keys(flatSemantic).length} semantic tokens`);
  console.log(`  Found ${Object.keys(flatComponent).length} component tokens`);

  // Resolve references in semantic and component tokens
  console.log('\n🔗 Resolving token references...');
  const resolvedSemantic: Record<string, string | number> = {};
  const resolvedComponent: Record<string, string | number> = {};

  for (const [path, value] of Object.entries(flatSemantic)) {
    resolvedSemantic[path] = resolveReferences(value, allTokens);
  }

  for (const [path, value] of Object.entries(flatComponent)) {
    resolvedComponent[path] = resolveReferences(value, allTokens);
  }

  // Combine semantic and component tokens for CSS output
  const cssTokens = {
    ...resolvedSemantic,
    ...resolvedComponent,
  };

  console.log(`  Resolved ${Object.keys(cssTokens).length} tokens for CSS`);

  // Generate CSS
  console.log('\n✍️  Generating CSS...');
  const css = generateCSS(cssTokens);

  // Write to file
  console.log(`📝 Writing to ${OUTPUT_FILE}...`);
  writeFileSync(OUTPUT_FILE, css, 'utf-8');

  console.log('\n✅ Tokens generated successfully!\n');
}

// Run the script
main();

