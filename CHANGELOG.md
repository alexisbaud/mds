# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### En cours
- Architecture complète du projet
- Système de tokens (primitives, brand, sémantiques, composants)
- Documentation Storybook (Getting Started, Conventions, Tokens)
- Configuration CI/CD

## [0.1.0] - 2024-11-12

### Ajouté

#### Architecture
- Setup initial du projet avec TypeScript, React, Vite
- Configuration Storybook 8 avec addons (a11y, docs, controls, actions)
- Configuration Vitest avec couverture de tests (seuil 80%)
- Configuration ESLint + Prettier (règles strictes TS, React, a11y)
- Structure modulaire du projet (src/, docs/, tests/, scripts/)

#### Tokens
- Système de tokens hiérarchiques (primitives → brand → sémantiques → composants)
- Fichiers JSON placeholders (`primitives.json`, `brand.json`, `semantic.json`, `component.json`)
- Script générateur de tokens (`scripts/generate-tokens.ts`)
- Transformation automatique JSON → variables CSS
- Documentation complète des tokens (overview, primitives, brand, semantic, component, theming, contrast-pairs)

#### Styles
- Reset CSS minimal
- Styles globaux (focus-visible, sr-only, accessibility helpers)
- Génération automatique de `tokens.css` depuis les JSON

#### Documentation
- Page Getting Started (installation, configuration, usage)
- Conventions : Naming, Separation of Concerns, Accessibility, Testing, Versioning
- Guide complet des tokens (hiérarchie, nomenclature, usage)
- Template de documentation composants

#### Utilitaires
- Helpers d'accessibilité (`src/utils/accessibility.ts`)
  - `createFocusTrap` : gestion du focus trap pour modales
  - `generateId` : génération d'IDs uniques pour ARIA
  - `announceToScreenReader` : annonces aux lecteurs d'écran
- Helpers de tests (`tests/utils/test-helpers.ts`)

#### CI/CD
- Workflow GitHub Actions pour CI (lint, typecheck, test, build)
- Workflow GitHub Actions pour déploiement Storybook (GitHub Pages)

#### Configuration
- `tsconfig.json` avec mode strict
- `vite.config.ts` pour build library
- `vitest.config.ts` avec seuils de couverture
- `.eslintrc.cjs` avec règles a11y
- `.prettierrc` pour formatage uniforme

### Documentation
- README.md complet avec quick start, architecture, scripts, contribution
- CHANGELOG.md initialisé
- Documentation inline (JSDoc) pour tous les helpers

### Notes
- Version initiale avec architecture complète
- Pas encore de composants UI (prochaine version)
- Tokens JSON sont des placeholders (à remplir avec les vraies valeurs)

## Guide de migration

### Vers 0.1.0

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

- [Unreleased]: https://github.com/alexisbaud/mds/compare/v0.1.0...HEAD
- [0.1.0]: https://github.com/alexisbaud/mds/releases/tag/v0.1.0

