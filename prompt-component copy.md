# Prompt Template - Création de Composant MDS

> **Instructions** : Compléter les sections marquées `[À COMPLÉTER]` avant de soumettre ce prompt à l'agent IA.

---

## 🎯 CONTEXTE DU PROJET

Tu es un développeur expert TypeScript/React travaillant sur **MDS (Modul Design System)**, un design system production-ready avec :

- **Stack** : TypeScript strict + React + Vite
- **Tokens** : Système hiérarchique (primitives → brand → semantic → component)
- **Tests** : Vitest avec couverture minimale 80%
- **Documentation** : Storybook avec addons a11y
- **Accessibilité** : WCAG 2.1 AA, navigation clavier, ARIA
- **CI/CD** : GitHub Actions (lint, test, build automatiques)

**Repository** : https://github.com/alexisbaud/mds  
**Documentation déployée** : https://alexisbaud.github.io/mds/  
**Version actuelle** : v0.0.1 - Perfect Base

---

## 📋 COMPOSANT À CRÉER

### Nom du composant
**[À COMPLÉTER]**  
Exemple : `Button`, `Input`, `Card`, `Modal`

### Description fonctionnelle
**[À COMPLÉTER]**  
Décris CE QUE fait le composant, pas COMMENT il le fait.

Exemple :
```
Le composant Button permet à l'utilisateur de déclencher une action.
Il doit supporter différents niveaux d'emphase visuelle (primary, secondary, ghost)
et différentes tailles (sm, md, lg). Il doit être accessible au clavier et aux 
lecteurs d'écran. Il doit gérer les états disabled et loading.
```

### Cas d'usage principaux
**[À COMPLÉTER]**  
Liste les scénarios d'utilisation.

Exemple :
```
1. Soumettre un formulaire (primary)
2. Annuler une action (secondary)
3. Action discrète dans une toolbar (ghost)
4. Action destructive (danger variant)
5. Bouton avec icône
6. Bouton en état de chargement
```

### Variantes attendues
**[À COMPLÉTER]**  
Liste les variations visuelles nécessaires.

Exemple :
```
- Variants : primary, secondary, ghost, danger
- Sizes : sm, md, lg
- States : default, hover, pressed, disabled, loading
```

### Interactions utilisateur
**[À COMPLÉTER]**  
Décris les interactions possibles.

Exemple :
```
- Clic souris : déclenche l'action
- Enter/Space : déclenche l'action (clavier)
- Focus : affiche le focus ring
- Disabled : empêche toute interaction
- Loading : affiche un spinner, empêche interaction
```

### Contraintes d'accessibilité
**[À COMPLÉTER]**  
Spécifie les exigences a11y spécifiques au composant.

Exemple :
```
- Navigation au clavier (Tab, Enter, Space)
- Focus visible obligatoire
- État disabled communiqué (aria-disabled)
- État loading communiqué (aria-busy)
- Label accessible (texte ou aria-label)
- Contraste minimum : Lc ≥ 60 pour texte, ≥ 45 pour icônes
```

---

## 🎨 CONTEXTE DESIGN (Figma)

### Lien Figma
**[À COMPLÉTER]**  
URL Figma du composant : `https://figma.com/design/...`

**Instructions pour l'agent** :
- Utilise le **MCP Figma** pour récupérer le contexte de design
- Extrais : couleurs utilisées, espacements, tailles, typographies, états
- Mappe les valeurs Figma aux tokens MDS disponibles
- Si une valeur n'a pas de token correspondant, propose d'en créer un

### Notes design spécifiques
**[À COMPLÉTER - OPTIONNEL]**  
Précisions sur le design qui ne sont pas évidentes dans Figma.

Exemple :
```
- Le variant ghost doit être totalement transparent par défaut
- Le focus ring doit être visible sur tous les backgrounds
- Les icônes doivent être alignées verticalement au centre du texte
```

---

## 📚 DOCUMENTATION OBLIGATOIRE À CONSULTER

Avant de commencer, tu DOIS lire et comprendre :

### 1. Conventions et Standards

**Fichiers à lire** :
- `CONTRIBUTING.md` : workflow complet de développement
- `docs/conventions/naming.mdx` : conventions de nommage
- `docs/conventions/separation-of-concerns.mdx` : architecture et SoC
- `docs/conventions/accessibility.mdx` : critères a11y (WCAG 2.1 AA)
- `docs/conventions/testing.mdx` : exigences de tests
- `docs/conventions/versioning.mdx` : versioning sémantique

### 2. Système de Tokens

**Fichiers à lire** :
- `design-system.md` : guide d'entrée du système de tokens
- `semantic-tokens-doc.md` : **TOKENS À UTILISER** (rôles UI)
- `src/tokens/README.md` : où sont les fichiers, comment les utiliser

**Règles absolues** :
- ✅ Utiliser UNIQUEMENT les tokens sémantiques ou component
- ❌ JAMAIS utiliser les primitives ou brand directement
- ❌ JAMAIS de valeurs magiques (couleurs hex, pixels en dur, etc.)

**Tokens disponibles** :
- Couleurs : `--color-{role}-{type}-{level}-{variant}` (ex: `--color-brand-action-primary-default`)
- Spacing : `--spacing-{usage}-{size}` (ex: `--spacing-inset-md`)
- Typography : `--typography-{role}-{size}-{variant}-{property}` (ex: `--typography-label-md-default-fontFamily`)
- Radius : `--radius-{size}` (ex: `--radius-sm`)
- Elevation : `--elevation-{size}-complete` (box-shadows)

### 3. Composant de Référence

**Fichier à étudier** :
- `src/components/HelloWorld/` : EXEMPLE COMPLET d'un composant MDS
  - `HelloWorld.tsx` : structure, props TypeScript, JSDoc
  - `HelloWorld.css` : 100% tokens CSS, zéro valeur magique
  - `HelloWorld.test.tsx` : structure de tests, 100% coverage
  - `HelloWorld.stories.tsx` : stories Storybook avec Controls

**Ce que tu dois reproduire** :
- Structure de fichiers identique
- Qualité de code identique
- Niveau de tests identique
- Documentation identique

---

## 🔧 PROCESS DE DÉVELOPPEMENT

### Phase 1 : Proposition d'API ⚠️ **IMPORTANT**

**AVANT d'implémenter quoi que ce soit**, tu dois :

1. **Analyser** les besoins fonctionnels ci-dessus
2. **Consulter** le design Figma (via MCP)
3. **Étudier** les tokens disponibles dans `semantic-tokens-doc.md`
4. **Proposer** une interface TypeScript complète :
   ```typescript
   interface ComponentNameProps {
     // Props avec JSDoc complet
     // Variantes, tailles, états
     // Event handlers
     // Contenus (children, etc.)
     // ARIA overrides
   }
   ```

5. **Justifier** tes choix :
   - Pourquoi ces props ?
   - Quels tokens tu vas utiliser ?
   - Quels patterns a11y tu vas implémenter ?
   - Quels tests tu vas écrire ?

6. **Attendre validation** de l'utilisateur avant d'implémenter

### Phase 2 : Implémentation (après validation de l'API)

**Structure à créer** :
```
src/components/[NomComposant]/
├── [NomComposant].tsx       # Composant React
├── [NomComposant].css       # Styles (100% tokens)
├── [NomComposant].test.tsx  # Tests (≥ 80% coverage)
├── [NomComposant].stories.tsx  # Storybook stories
└── index.ts                 # Export
```

**Étapes d'implémentation** :

1. **Créer le composant TypeScript** (`.tsx`)
   - Interface props avec JSDoc
   - Implémentation React
   - Gestion des états
   - Attributs ARIA appropriés
   - Event handlers

2. **Créer les styles CSS** (`.css`)
   - **ZÉRO valeur magique**
   - Tous les styles via `var(--token-name)`
   - Classes avec convention kebab-case
   - Variantes, tailles, états

3. **Créer les tests** (`.test.tsx`)
   - Tests de rendu (toutes variantes)
   - Tests d'interactions (click, change, etc.)
   - Tests clavier (Enter, Space, Escape, Arrows si applicable)
   - Tests ARIA (attributs, rôles)
   - Tests d'états (disabled, loading, error, etc.)
   - **Objectif** : ≥ 80% coverage (viser 100%)

4. **Créer les stories** (`.stories.tsx`)
   - Story par variante importante
   - Controls pour toutes les props
   - Tags autodocs
   - Descriptions claires

5. **Exporter le composant** (`index.ts`)
   ```typescript
   export { ComponentName } from './ComponentName';
   export type { ComponentNameProps } from './ComponentName';
   ```

6. **Intégrer dans le barrel export**
   - Ajouter `export * from './ComponentName';` dans `src/components/index.ts`

### Phase 3 : Validation Qualité

**Exécuter tous les checks** :

```bash
npm run typecheck      # TypeScript doit compiler
npm run lint          # ESLint doit passer
npm test              # Tous les tests doivent passer
npm run test:coverage # Coverage ≥ 80%
npm run build         # Build doit réussir
npm run dev           # Vérifier dans Storybook
```

**Vérifier dans Storybook** :
- Toutes les variantes s'affichent correctement
- Controls fonctionnent
- Addon a11y ne montre AUCUNE violation
- Les styles utilisent bien les tokens (inspecter avec DevTools)

### Phase 4 : Documentation

**Créer** (si complexe) :
- `docs/components/[NomComposant].mdx` avec :
  - Description
  - Props (auto-générées par autodocs)
  - Variantes et états
  - Tokens consommés
  - Critères a11y respectés
  - Exemples d'usage

---

## ⚠️ RÈGLES STRICTES À RESPECTER

### Tokens CSS

```css
/* ✅ CORRECT */
.button {
  background: var(--color-brand-action-primary-default);
  padding: var(--spacing-inset-sm) var(--spacing-inset-md);
  font-family: var(--typography-label-md-default-fontFamily);
}

/* ❌ INTERDIT - Valeurs magiques */
.button {
  background: #3b82f6;
  padding: 12px 16px;
  font-family: "IBM Plex Sans";
}

/* ❌ INTERDIT - Primitives directes */
.button {
  background: var(--color-super-teal-30);
  padding: var(--spacing-pixel-16);
}
```

### Typography Tokens (Décomposés depuis v0.0.1)

**IMPORTANT** : Les tokens typography sont décomposés en propriétés individuelles.

```css
/* ✅ CORRECT - Toutes les propriétés */
.title {
  font-family: var(--typography-display-xs-default-fontFamily);
  font-size: var(--typography-display-xs-default-fontSize);
  font-weight: var(--typography-display-xs-default-fontWeight);
  line-height: var(--typography-display-xs-default-lineHeight);
  letter-spacing: var(--typography-display-xs-default-letterSpacing);
}

/* ⚠️ INCOMPLET - Manque des propriétés */
.title {
  font-size: var(--typography-display-xs-default-fontSize);
  /* Où sont fontFamily, lineHeight, etc. ? */
}
```

**Propriétés disponibles** par token typography :
- `-fontFamily`
- `-fontSize`
- `-fontWeight`
- `-lineHeight`
- `-letterSpacing`
- `-textCase` (optionnel)
- `-paragraphSpacing` (optionnel)

### Accessibilité

**Navigation clavier obligatoire** :
- `Tab` / `Shift+Tab` : focus
- `Enter` ou `Space` : activation (boutons, liens, checkbox)
- `Escape` : fermeture (modals, dropdowns)
- `Arrow keys` : navigation (listes, tabs, menus)

**Focus visible obligatoire** :
```css
.component:focus-visible {
  outline: 2px solid var(--color-utility-focus);
  outline-offset: 2px;
}
```

**ARIA approprié** :
- Bouton personnalisé : `role="button"` + `tabIndex={0}`
- Switch : `role="switch"` + `aria-checked`
- Modal : `role="dialog"` + `aria-modal` + `aria-labelledby`
- Tabs : `role="tablist"`, `role="tab"`, `role="tabpanel"`
- États : `aria-disabled`, `aria-expanded`, `aria-busy`, etc.

### Tests

**Couverture minimale 80%**, viser **100%**.

**Structure obligatoire** :
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Tests de rendu basique et variantes
  });

  describe('Interactions', () => {
    // Tests des event handlers (onClick, onChange, etc.)
  });

  describe('Keyboard Navigation', () => {
    // Tests clavier (Enter, Space, Escape, Arrows)
  });

  describe('Accessibility', () => {
    // Tests ARIA attributes, roles
  });

  describe('States', () => {
    // Tests des états (disabled, loading, error, etc.)
  });
});
```

**Imports de tests** :
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../../tests/utils/test-helpers';
```

### TypeScript

**Mode strict activé** :
- Zéro `any` (utiliser `unknown` si nécessaire)
- Props typées avec interfaces
- JSDoc pour toutes les props publiques
- Event handlers typés précisément

### Separation of Concerns

- **Styles** → fichier `.css` séparé (UNIQUEMENT tokens)
- **Logique** → fichier `.tsx`
- **Tests** → fichier `.test.tsx`
- **Stories** → fichier `.stories.tsx`

---

## 🎨 CONTEXTE DESIGN FIGMA

### URL du Design
**[À COMPLÉTER]**  
Lien Figma : `https://figma.com/design/[fileKey]/[fileName]?node-id=[nodeId]`

### Instructions pour l'Agent

**Utilise le MCP Figma** pour :

1. **Récupérer le design** via `get_design_context` ou `get_screenshot`
   - Extraire `fileKey` et `nodeId` de l'URL
   - Récupérer les specs visuelles

2. **Analyser les propriétés visuelles** :
   - Couleurs utilisées
   - Espacements (padding, margin)
   - Tailles (width, height)
   - Typographies (fonts, sizes, weights)
   - Border radius
   - Ombres / élévations

3. **Mapper aux tokens MDS** :
   - Trouve le token sémantique correspondant dans `src/styles/tokens.css`
   - Si aucun token ne correspond, note-le et propose d'en créer un
   - Documente le mapping dans tes commentaires CSS

4. **Identifier les états** :
   - Default, hover, pressed, focus
   - Disabled, loading, error
   - Autres états spécifiques

### Variables Figma (si applicables)
**[À COMPLÉTER - OPTIONNEL]**  
Si le design utilise des variables Figma, utilise `get_variable_defs` pour les récupérer.

---

## 🔍 RESSOURCES DISPONIBLES

### Tokens Disponibles

Consulte `src/styles/tokens.css` (1160 variables) pour voir tous les tokens disponibles :

**Couleurs** :
- Surfaces : `--color-{role}-surface-{level}` (subtle, soft, medium, strong, intense)
- Contents : `--color-{role}-content-plain-{level}-{variant}` (weakest → heaviest)
- Actions : `--color-{role}-action-{type}-{state}` (primary, toned, ghost)

Où `{role}` = `neutral`, `brand`, `accent`, `danger`, `warning`, `success`, `info`

**Spacing** :
- `--spacing-micro-{size}`, `--spacing-inset-{size}`, `--spacing-stack-{size}`, `--spacing-layout-{size}`

**Typography** (décomposés) :
- `--typography-{role}-{size}-{variant}-fontFamily`
- `--typography-{role}-{size}-{variant}-fontSize`
- `--typography-{role}-{size}-{variant}-fontWeight`
- `--typography-{role}-{size}-{variant}-lineHeight`
- `--typography-{role}-{size}-{variant}-letterSpacing`

Où `{role}` = `display`, `heading`, `title`, `body`, `label`, `caption`, `overline`, `code`, `lead`

**Autres** :
- `--radius-{size}` (xs, sm, md, lg, xl, pill)
- `--border-width-{size}` (xs, sm, md, lg, focus)
- `--elevation-{size}-complete` (xs, sm, md, lg, xl)
- `--opacity-state-disabled`, `--opacity-state-hidden`
- `--color-utility-focus` (focus ring)

### Utilitaires Disponibles

**Accessibilité** (`src/utils/accessibility.ts`) :
- `createFocusTrap(element)` : piège le focus dans les modals
- `generateId(prefix)` : génère des IDs uniques pour ARIA
- `announceToScreenReader(message, priority)` : annonces dynamiques

**Tests** (`tests/utils/test-helpers.ts`) :
- `render()`, `screen`, `userEvent` : testing-library
- `customRender()` : render avec providers

### Composant de Référence

**Étudie** `src/components/HelloWorld/` pour comprendre :
- Comment structurer un composant
- Comment utiliser les tokens CSS
- Comment écrire les tests
- Comment créer les stories

---

## 📋 CHECKLIST DE VALIDATION

Avant de soumettre le composant, vérifie :

### Code
- [ ] TypeScript strict, zéro `any`
- [ ] Props typées avec interfaces et JSDoc
- [ ] Tous les styles via tokens CSS (`var(--token-name)`)
- [ ] Zéro valeur magique
- [ ] Séparation styles/logique respectée
- [ ] Composant exporté depuis `src/components/index.ts`

### Tests
- [ ] Coverage ≥ 80% (viser 100%)
- [ ] Tests de rendu pour toutes variantes
- [ ] Tests d'interactions
- [ ] Tests de navigation clavier
- [ ] Tests ARIA attributes
- [ ] Tests d'états (disabled, loading, etc.)

### Accessibilité
- [ ] Navigation clavier fonctionnelle
- [ ] Focus visible avec `--color-utility-focus`
- [ ] Rôles ARIA corrects
- [ ] États communiqués aux lecteurs d'écran
- [ ] Contraste validé (addon Storybook a11y)
- [ ] Labels accessibles (texte ou aria-label)

### Documentation
- [ ] Stories Storybook avec Controls
- [ ] Props autodocumentées (JSDoc)
- [ ] Addon a11y sans violations
- [ ] Exemples d'usage clairs

### Validation Technique
- [ ] `npm run typecheck` ✅
- [ ] `npm run lint` ✅
- [ ] `npm test` ✅
- [ ] `npm run build` ✅
- [ ] Storybook (`npm run dev`) affiche correctement

---

## 🎯 WORKFLOW ATTENDU

### 1. Analyse et Proposition

**Tu dois produire** :

**a) Analyse du design Figma** :
```
Couleurs identifiées :
- Background primary button : #00d4ca (maps to --color-brand-action-primary-default)
- Text on primary : #ffffff (maps to --color-brand-action-content-inverse)
- Border radius : 4px (maps to --radius-sm)
etc.
```

**b) Proposition d'interface** :
```typescript
interface ButtonProps {
  /** Description de chaque prop avec JSDoc */
  variant?: 'primary' | 'secondary' | 'ghost';
  // ... toutes les props
}
```

**c) Justification** :
- Pourquoi ces variantes ?
- Quels tokens pour quels éléments ?
- Quels patterns a11y ?
- Quels tests ?

**d) Questions/Clarifications** :
- Points ambigus du design
- Tokens manquants éventuels
- Comportements non spécifiés

**⚠️ ATTENDRE VALIDATION avant d'implémenter !**

### 2. Implémentation

Après validation de l'API :
- Créer tous les fichiers
- Implémenter selon les specs validées
- Respecter toutes les règles

### 3. Validation

Exécuter tous les checks et corriger jusqu'à ce que tout passe.

### 4. Livraison

**Fournir** :
- Résumé de ce qui a été créé
- Liste des tokens utilisés
- Liste des tests écrits
- Couverture obtenue
- Screenshots Storybook (si pertinent)
- Instructions pour tester manuellement

---

## 📝 INFORMATIONS SUPPLÉMENTAIRES

### Notes spécifiques au composant
**[À COMPLÉTER - OPTIONNEL]**  
Tout autre information pertinente.

### Dépendances entre composants
**[À COMPLÉTER - OPTIONNEL]**  
Si ce composant dépend d'autres composants (ex: Button utilise Icon).

### Component Tokens à créer ?
**[À COMPLÉTER - OPTIONNEL]**  
Si tu veux créer des component tokens pour ce composant dans `component-tokens.JSON`.

Exemple :
```json
{
  "button": {
    "primary": {
      "background": "{color.brand.action.primary.default}",
      "background-hover": "{color.brand.action.primary.hover}",
      "content": "{color.brand.action.content.inverse}",
      "padding-y": "{spacing.inset.sm}",
      "padding-x": "{spacing.inset.md}"
    }
  }
}
```

Si oui : l'agent doit les créer, exécuter `npm run generate:tokens`, et les utiliser dans le CSS.

---

## 🎓 PRINCIPES PHILOSOPHIQUES MDS

### KISS (Keep It Simple, Stupid)

- Éviter l'over-engineering
- API simple et intuitive
- Props avec valeurs par défaut raisonnables
- Pas de patterns complexes si simple suffit

### Separation of Concerns

- Styles (tokens) séparés de la logique
- Un composant = une responsabilité
- Hooks customs pour logique complexe
- Pas de couplage fort

### Accessibility First

- Penser a11y dès le début
- Tester au clavier dès le début
- ARIA n'est pas optionnel
- Contraste validé obligatoirement

### Token-Driven

- Tous les styles via tokens
- Facilite le theming futur
- Cohérence garantie
- Zéro dette technique

---

## ✅ RÉCAPITULATIF POUR L'AGENT

**Ta mission** :

1. ✅ **LIRE** toute la documentation référencée
2. ✅ **ANALYSER** le design Figma via MCP
3. ✅ **PROPOSER** une API TypeScript complète et justifiée
4. ⏸️ **ATTENDRE** validation de l'utilisateur
5. ✅ **IMPLÉMENTER** selon les specs validées
6. ✅ **TESTER** jusqu'à 80%+ coverage
7. ✅ **VALIDER** tous les checks (typecheck, lint, test, build)
8. ✅ **DOCUMENTER** dans Storybook
9. ✅ **LIVRER** avec résumé complet

**Qualité attendue** :
- Code production-ready
- Tests exhaustifs
- Accessibilité parfaite
- Documentation claire
- Zéro compromis sur la qualité

**Ton objectif** : un composant qui respecte à 100% les standards MDS et qui pourrait être mergé immédiatement dans `main` après validation.

---

## 🚀 COMMENCER

Une fois ce prompt complété, soumets-le à l'agent IA en lui demandant :

> "Crée le composant [NomComposant] selon les spécifications ci-dessus. Commence par me proposer l'API TypeScript complète avec justifications, puis attends ma validation avant d'implémenter."

Bonne création de composants ! 🎨

