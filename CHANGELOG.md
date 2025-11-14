# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

Rien pour le moment.

## [0.0.1] - 2024-11-14 - Perfect Base

### Ajouté

#### Architecture
- Setup initial du projet avec TypeScript, React, Vite
- Configuration Storybook 8 avec addons (a11y, docs, controls, actions)
- Configuration Vitest avec couverture de tests (seuil 80%)
- Configuration ESLint + Prettier (règles strictes TS, React, a11y)
- Structure modulaire du projet (src/, docs/, tests/, scripts/)
- Plugin vite-plugin-dts pour génération des déclarations TypeScript

#### Tokens
- Système de tokens hiérarchiques (primitives → brand → sémantiques → composants)
- **3012 primitive tokens** (couleurs, espacements, tailles, typographies)
- **397 brand tokens** (identité de marque, couleurs, polices)
- **800 semantic tokens** (rôles UI exposés en CSS variables)
- Script générateur de tokens avec résolution récursive des références
- Transformation automatique JSON → variables CSS (800 variables générées)
- Support complet des objets complexes (typography, shadows)
- Documentation complète des tokens (overview, primitives, brand, semantic, component, theming, contrast-pairs)

#### Styles
- Reset CSS minimal
- Styles globaux (focus-visible, sr-only, accessibility helpers)
- Génération automatique de `tokens.css` (800 CSS variables) depuis les JSON
- Export CSS dans `dist/styles/` pour consommation externe

#### Composants
- **HelloWorld** : composant de référence avec tests (10 tests ✅)
  - 3 variantes (default, brand, accent)
  - 100% tokens CSS (zéro valeur magique)
  - Tests de rendu, variantes, props, a11y
  - Story Storybook avec Controls
- **TokenDemo** : exemple de consommation de tokens
  - Démonstration typography, spacing, colors, actions
  - Story Storybook interactive

#### Documentation
- Page Getting Started (installation, configuration, usage)
- Conventions : Naming, Separation of Concerns, Accessibility, Testing, Versioning
- Guide complet des tokens (hiérarchie, nomenclature, usage)
- Template de documentation composants
- CONTRIBUTING.md avec workflow complet
- Templates GitHub (Bug Report, Feature Request, PR Template)

#### Utilitaires
- Helpers d'accessibilité (`src/utils/accessibility.ts`) - 13 tests ✅
  - `createFocusTrap` : gestion du focus trap pour modales
  - `generateId` : génération d'IDs uniques pour ARIA
  - `announceToScreenReader` : annonces aux lecteurs d'écran
- Helpers de tests (`tests/utils/test-helpers.ts`)
  - Custom render avec type explicite
  - Re-exports de @testing-library

#### CI/CD
- Workflow GitHub Actions pour CI (lint, typecheck, test, build)
- Workflow GitHub Actions pour déploiement Storybook (GitHub Pages)
- Tous les checks passent ✅

#### Configuration
- `tsconfig.json` avec mode strict
- `tsconfig.build.json` pour génération declarations
- `vite.config.ts` pour build library avec plugin dts
- `vitest.config.ts` avec seuils de couverture 80%
- `.eslintrc.cjs` avec règles a11y strictes
- `.prettierrc` pour formatage uniforme
- `.editorconfig` pour cohérence entre IDE
- `.nvmrc` pour version Node.js (20)
- `LICENSE` MIT

#### Tests
- **23 tests passent** ✅
  - 13 tests pour accessibility utils
  - 10 tests pour HelloWorld component
- Configuration Vitest avec jsdom
- Coverage reporting (text, json, html, lcov)

#### Build
- Build library réussit ✅
  - `dist/mds.js` (ES module)
  - `dist/mds.umd.cjs` (UMD)
  - `dist/*.d.ts` (TypeScript declarations)
  - `dist/styles/*.css` (CSS exportables)
- Build Storybook réussit ✅
  - `storybook-static/` complet

### Corrigé

- Erreur TypeScript dans `test-helpers.ts` (annotation de type RenderResult)
- Erreur ESLint dans `TokenDemo.tsx` (apostrophe échappée)
- Résolution récursive des références dans objets complexes (typography, shadows)
- Plugin vite-plugin-dts désactivé pour build Storybook (conflits MDX)
- Documentation MDX temporairement désactivée (problèmes de parsing JSX)

### Notes

- Version initiale avec base production-ready complète
- **800 semantic tokens** exposés en CSS variables
- **1 composant** de référence (HelloWorld)
- **23 tests** qui passent avec succès
- **Pipeline complet** validé (tokens → CSS → composants → tests → build)
- Documentation MDX à réactiver après correction du parsing JSX

### Tokens générés

```
Primitives : 3012 tokens (usage interne)
Brand :       397 tokens (usage interne)
Semantic :    800 tokens → 800 CSS variables ✅
Component :     0 tokens (à créer au fil de l'eau)
```

### Tests

```
Test Files:  2 passed (2)
Tests:       23 passed (23)
Coverage:    N/A (composants à venir)
```

### Builds

```
Library:    dist/ avec .js, .umd.cjs, .d.ts, styles/ ✅
Storybook:  storybook-static/ complet ✅
```

## Guide de migration

### Vers 0.0.1

Première version, pas de migration nécessaire.

---

## Types de changements

- **Added** (Ajouté) : nouvelles fonctionnalités
- **Changed** (Modifié) : changements dans les fonctionnalités existantes
- **Deprecated** (Déprécié) : fonctionnalités qui seront supprimées
- **Removed** (Supprimé) : fonctionnalités supprimées
- **Fixed** (Corrigé) : corrections de bugs
- **Security** (Sécurité) : corrections de vulnérabilités

## Liens

- [Unreleased]: https://github.com/alexisbaud/mds/compare/v0.0.1...HEAD
- [0.0.1]: https://github.com/alexisbaud/mds/releases/tag/v0.0.1

