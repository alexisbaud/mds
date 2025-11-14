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
 * Check if a value is a typography object (has fontFamily, fontSize, etc.)
 */
function isTypographyObject(value: unknown): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return 'fontFamily' in obj || 'fontSize' in obj || 'lineHeight' in obj;
}

/**
 * Decompose complex objects (typography) into individual properties
 * e.g., { fontFamily: "IBM Plex Sans", fontSize: "16px" }
 * becomes { 'fontFamily': 'IBM Plex Sans', 'fontSize': '16px' }
 */
function decomposeObject(
  obj: Record<string, unknown>,
  path: string,
  result: Record<string, string | number>
): void {
  for (const [key, value] of Object.entries(obj)) {
    const propPath = `${path}.${key}`;
    if (typeof value === 'string' || typeof value === 'number') {
      result[propPath] = value;
    } else if (typeof value === 'object' && value !== null) {
      // Nested object or array - stringify it
      result[propPath] = JSON.stringify(value);
    }
  }
}

/**
 * Flatten nested token object into dot-notation paths
 * e.g., { color: { neutral: { surface: { default: '#fff' } } } }
 * becomes { 'color.neutral.surface.default': '#fff' }
 * 
 * Complex objects (typography) are decomposed into individual properties
 * Arrays (shadows) are kept as JSON strings
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
          // Check if it's a typography object that should be decomposed
          if (isTypographyObject(tokenValue)) {
            // Decompose into individual properties
            decomposeObject(tokenValue as Record<string, unknown>, path, result);
          } else {
            // Keep as JSON string (e.g., shadows/arrays)
            result[path] = JSON.stringify(tokenValue);
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
 * Recursively resolve references within complex objects (typography, shadows, etc.)
 * This walks through objects and arrays, resolving any {token.path} references found
 */
function resolveObjectReferences(
  value: unknown,
  allTokens: Record<string, string | number>,
  visited = new Set<string>()
): unknown {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle arrays (e.g., shadow arrays)
  if (Array.isArray(value)) {
    return value.map((item) => resolveObjectReferences(item, allTokens, visited));
  }

  // Handle objects (e.g., typography objects)
  if (typeof value === 'object') {
    const resolved: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveObjectReferences(val, allTokens, visited);
    }
    return resolved;
  }

  // Handle strings with references
  if (typeof value === 'string' && value.includes('{')) {
    return resolveReferences(value, allTokens, visited);
  }

  // Return primitives as-is
  return value;
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

  // If it's a JSON string (for complex values), parse and format
  if (str.startsWith('{') || str.startsWith('[')) {
    try {
      const parsed = JSON.parse(str);

      // Handle typography tokens
      if (parsed.fontFamily) {
        return str; // Keep as-is for now, will need special handling in components
      }

      // Handle shadow tokens
      if (Array.isArray(parsed)) {
        return str; // Keep as-is for now
      }
    } catch {
      // Not JSON, continue
    }
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

  for (const path of sortedPaths) {
    const cssVar = toCSSVariableName(path);
    const value = formatCSSValue(tokens[path]);
    lines.push(`  ${cssVar}: ${value};`);
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

  // PASS 1: Flatten all tokens without resolving complex objects
  console.log('🔄 Flattening tokens (first pass)...');
  const flatPrimitives = flattenTokens(primitives);
  const flatBrand = flattenTokens(brand);
  const flatSemantic = flattenTokens(semantic);
  const flatComponent = flattenTokens(component);

  console.log(`  Found ${Object.keys(flatPrimitives).length} primitive tokens`);
  console.log(`  Found ${Object.keys(flatBrand).length} brand tokens`);
  console.log(`  Found ${Object.keys(flatSemantic).length} semantic tokens`);
  console.log(`  Found ${Object.keys(flatComponent).length} component tokens`);

  // PASS 2: Create complete token map for reference resolution
  const allTokens = {
    ...flatPrimitives,
    ...flatBrand,
    ...flatSemantic,
    ...flatComponent,
  };

  // PASS 3: Resolve complex objects (shadows - arrays) in semantic and component tokens
  // Note: Typography objects are already decomposed in PASS 1
  console.log('🔄 Resolving complex objects (shadows)...');
  const semanticResolved: Record<string, string | number> = {};
  const componentResolved: Record<string, string | number> = {};

  for (const [path, value] of Object.entries(flatSemantic)) {
    // Check if value is a JSON array (shadows)
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        const resolved = resolveObjectReferences(parsed, allTokens);
        semanticResolved[path] = JSON.stringify(resolved);
      } catch {
        // Not valid JSON, keep as-is
        semanticResolved[path] = value;
      }
    } else {
      // Simple value or decomposed property - keep as-is for now
      semanticResolved[path] = value;
    }
  }

  for (const [path, value] of Object.entries(flatComponent)) {
    // Check if value is a JSON array (shadows)
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        const resolved = resolveObjectReferences(parsed, allTokens);
        componentResolved[path] = JSON.stringify(resolved);
      } catch {
        // Not valid JSON, keep as-is
        componentResolved[path] = value;
      }
    } else {
      // Simple value or decomposed property - keep as-is for now
      componentResolved[path] = value;
    }
  }

  // PASS 4: Resolve simple string references in semantic and component tokens
  console.log('🔗 Resolving token references...');
  const finalSemantic: Record<string, string | number> = {};
  const finalComponent: Record<string, string | number> = {};

  // Update allTokens with resolved objects for final pass
  const allTokensWithResolved = {
    ...flatPrimitives,
    ...flatBrand,
    ...semanticResolved,
    ...componentResolved,
  };

  for (const [path, value] of Object.entries(semanticResolved)) {
    if (typeof value === 'string') {
      // Check if it's a JSON array (shadows) - these are already resolved
      const isJsonArray = value.startsWith('[');
      if (isJsonArray) {
        try {
          JSON.parse(value);
          // Valid JSON array (shadows), already resolved in pass 3
          finalSemantic[path] = value;
        } catch {
          // Not valid JSON, treat as simple reference
          finalSemantic[path] = resolveReferences(value, allTokensWithResolved);
        }
      } else if (value.includes('{')) {
        // Simple string with reference like "{token.path}"
        finalSemantic[path] = resolveReferences(value, allTokensWithResolved);
      } else {
        // No reference, keep as-is (includes decomposed properties)
        finalSemantic[path] = value;
      }
    } else {
      finalSemantic[path] = value;
    }
  }

  for (const [path, value] of Object.entries(componentResolved)) {
    if (typeof value === 'string') {
      // Check if it's a JSON array (shadows) - these are already resolved
      const isJsonArray = value.startsWith('[');
      if (isJsonArray) {
        try {
          JSON.parse(value);
          // Valid JSON array (shadows), already resolved in pass 3
          finalComponent[path] = value;
        } catch {
          // Not valid JSON, treat as simple reference
          finalComponent[path] = resolveReferences(value, allTokensWithResolved);
        }
      } else if (value.includes('{')) {
        // Simple string with reference like "{token.path}"
        finalComponent[path] = resolveReferences(value, allTokensWithResolved);
      } else {
        // No reference, keep as-is (includes decomposed properties)
        finalComponent[path] = value;
      }
    } else {
      finalComponent[path] = value;
    }
  }

  // Combine semantic and component tokens for CSS output
  const cssTokens = {
    ...finalSemantic,
    ...finalComponent,
  };

  console.log(`  Generated ${Object.keys(cssTokens).length} CSS variables`);
  console.log(`    (typography tokens decomposed into individual properties)`);

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

