# MDS — Modul Design System

**MDS** est un design system TypeScript/React construit avec Vite, pensé pour être maintenable, accessible et production-ready.

## 🎯 Principes

- **TypeScript strict** : typage fort, zéro `any`
- **Accessibilité native** : WCAG 2.1 AA, ARIA, navigation clavier
- **Tokens hiérarchiques** : primitives → brand → sémantiques → composants
- **Qualité garantie** : tests (80% coverage), lint, type-check, CI
- **Documentation vivante** : Storybook avec MDX, exemples interactifs

## 🚀 Quick Start

### Installation

```bash
npm install mds
```

### Usage

```tsx
import { Button } from 'mds';
import 'mds/styles/reset.css';
import 'mds/styles/global.css';
import 'mds/styles/tokens.css';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## 📚 Documentation

La documentation complète est disponible dans **Storybook** :

```bash
npm run dev
```

Ouvrir http://localhost:6006

### Sections principales

- **[Getting Started](http://localhost:6006/?path=/docs/getting-started)** : installation et configuration
- **[Conventions](http://localhost:6006/?path=/docs/conventions-naming)** : règles de nommage, SoC, a11y, tests
- **[Tokens](http://localhost:6006/?path=/docs/tokens-overview)** : système de design tokens
- **[Components](http://localhost:6006/?path=/docs/components-overview)** : catalogue de composants

## 🏗️ Architecture

```
mds/
├── src/
│   ├── tokens/              # Fichiers JSON de tokens
│   ├── styles/              # CSS (reset, global, tokens générés)
│   ├── components/          # Composants React
│   ├── utils/               # Helpers (a11y, etc.)
│   └── index.ts             # Point d'entrée
├── docs/                    # Documentation MDX (Storybook)
├── tests/                   # Tests Vitest
├── scripts/                 # Scripts (générateur tokens)
└── .storybook/              # Configuration Storybook
```

## 🎨 Système de Tokens

MDS utilise une hiérarchie de tokens en 4 niveaux :

```
Primitives → Brand → Sémantiques → Composants → UI
```

### Exemple

```json
// primitives.json
{ "color": { "super-teal": { "30": "#00d4ca" } } }

// brand.json
{ "color": { "brand-color": { "light-brand": "{color.super-teal.30}" } } }

// semantic.json
{ "color": { "brand": { "action": { "primary": { "default": "{color.brand-color.light-brand}" } } } } }

// component.json
{ "button": { "primary": { "background": "{color.brand.action.primary.default}" } } }
```

**Génération CSS :**

```bash
npm run generate:tokens
```

Produit `src/styles/tokens.css` :

```css
:root {
  --color-brand-action-primary-default: #00d4ca;
  --button-primary-background: var(--color-brand-action-primary-default);
}
```

## 🛠️ Scripts

```bash
# Développement (Storybook)
npm run dev

# Build de la librairie
npm run build

# Tests
npm test
npm run test:coverage

# Lint & Format
npm run lint
npm run format

# Type-check
npm run typecheck

# Générer les tokens CSS
npm run generate:tokens

# Build Storybook (static)
npm run build:storybook
```

## 🧪 Tests

MDS utilise **Vitest** avec une couverture minimale de **80%**.

```bash
# Lancer les tests
npm test

# Mode watch
npm test -- --watch

# Couverture
npm run test:coverage
```

### Critères de qualité

- ✅ Couverture ≥ 80% (lignes, branches, fonctions)
- ✅ Tests de rendu pour toutes variantes
- ✅ Tests d'interactions (click, focus, keyboard)
- ✅ Tests a11y (axe-core, aucune violation)
- ✅ TypeScript strict (zéro `any`)

## ♿️ Accessibilité

Tous les composants respectent **WCAG 2.1 niveau AA** :

- **Navigation clavier** : Tab, Enter, Space, Escape, Arrow keys
- **Focus visible** : outline avec `--color-utility-focus`
- **Rôles ARIA** : `role`, `aria-*` appropriés
- **Contraste APCA** : Lc ≥ 60 pour body, ≥ 45 pour headings
- **États communiqués** : disabled, expanded, checked, etc.

## 🤝 Contribution

### Workflow

1. **Fork** le repo
2. **Créer une branche** : `feat/button-component` ou `fix/focus-ring`
3. **Développer** en respectant les conventions
4. **Tester** : `npm test`, `npm run lint`, `npm run typecheck`
5. **Documenter** : créer/mettre à jour la doc MDX et les stories
6. **Ouvrir une PR** avec description complète

### Conventions

- **Commits** : [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, etc.)
- **Nommage** : kebab-case pour tokens/CSS, PascalCase pour composants, camelCase pour props
- **Séparation of Concerns** : styles (tokens) séparés de la logique
- **Zéro valeur magique** : tous les styles via tokens CSS

### Checklist composant

- [ ] TypeScript strict, props typées avec JSDoc
- [ ] Styles uniquement via tokens CSS (`var(--token-name)`)
- [ ] Tests ≥ 80% coverage (rendu, interactions, clavier, a11y)
- [ ] Stories Storybook pour toutes variantes et états
- [ ] Doc MDX dans `docs/components/`
- [ ] Aucune violation a11y (addon Storybook)
- [ ] Contraste validé APCA
- [ ] Export depuis `src/components/index.ts`

## 📋 Versioning

MDS suit le **[Semantic Versioning](https://semver.org/)** :

- **MAJOR** : breaking changes
- **MINOR** : nouvelles fonctionnalités (rétrocompatibles)
- **PATCH** : corrections de bugs

Voir [CHANGELOG.md](./CHANGELOG.md) pour l'historique.

## 🗺️ Roadmap

### Phase 1 — Architecture ✅

- [x] Setup TypeScript/React/Vite
- [x] Configuration Storybook + addons (a11y, docs, controls)
- [x] Système de tokens (générateur JSON → CSS)
- [x] Tests Vitest + helpers
- [x] CI GitHub Actions
- [x] Documentation complète (Getting Started, Conventions, Tokens)

### Phase 2 — Composants de base 🚧

- [ ] Button (variants, sizes, états)
- [ ] Input (text, email, password, textarea)
- [ ] Card (surfaces, élévations)
- [ ] Icon (système d'icônes)
- [ ] Badge
- [ ] Avatar

### Phase 3 — Composants complexes

- [ ] Modal / Dialog
- [ ] Dropdown / Select
- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Toast / Notification

### Phase 4 — Thèmes multiples

- [ ] Dark theme officiel
- [ ] High contrast theme
- [ ] Générateur de thèmes

### Phase 5 — Data-Viz

- [ ] Composants charts (Bar, Line, Pie)
- [ ] Helpers a11y data-viz

### Phase 6 — Optimisations

- [ ] Tree-shaking avancé
- [ ] Tests visuels (Chromatic/Percy)
- [ ] Performance monitoring

## 📄 License

MIT © Alexis Baud

## 🔗 Liens

- **Documentation** : [Storybook](http://localhost:6006)
- **Repository** : [GitHub](https://github.com/alexisbaud/mds)
- **Issues** : [GitHub Issues](https://github.com/alexisbaud/mds/issues)

## 📞 Support

Pour toute question ou problème :

- 📝 Ouvrir une [issue](https://github.com/alexisbaud/mds/issues)
- 💬 Consulter la documentation Storybook
- 🤝 Lire le [guide de contribution](#-contribution)

---

**MDS** — Built with ❤️ and TypeScript

