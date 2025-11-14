# Contributing to MDS

Merci de vouloir contribuer à **MDS** (Modul Design System) ! 🎉

Ce guide vous aidera à contribuer efficacement au projet.

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Setup du projet](#setup-du-projet)
- [Workflow de développement](#workflow-de-développement)
- [Créer un composant](#créer-un-composant)
- [Standards de qualité](#standards-de-qualité)
- [Conventions](#conventions)
- [Soumettre une PR](#soumettre-une-pr)

## Code de conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite. Soyez respectueux et constructif dans toutes vos interactions.

## Comment contribuer

### Signaler un bug

1. Vérifier qu'une issue similaire n'existe pas déjà
2. Utiliser le template "Bug Report"
3. Fournir le maximum de détails (étapes de reproduction, version, navigateur)
4. Ajouter des screenshots si pertinent

### Proposer une feature

1. Vérifier qu'une issue similaire n'existe pas déjà
2. Utiliser le template "Feature Request"
3. Expliquer le problème que ça résout
4. Proposer une solution
5. Lister les alternatives considérées

### Soumettre du code

1. **Fork** le repo
2. Créer une **branche** depuis `main`
3. **Développer** en suivant les conventions
4. **Tester** localement
5. Ouvrir une **Pull Request**

## Setup du projet

### Prérequis

- **Node.js** : v20 ou supérieur
- **npm** : v10 ou supérieur
- **Git**

### Installation

```bash
# Cloner le repo
git clone https://github.com/alexisbaud/mds.git
cd mds

# Installer les dépendances
npm install

# Générer les tokens CSS
npm run generate:tokens

# Lancer Storybook en dev
npm run dev
```

Storybook sera accessible sur http://localhost:6006

### Vérifier le setup

```bash
# Vérifier que tout compile
npm run typecheck

# Vérifier le lint
npm run lint

# Lancer les tests
npm test

# Build la librairie
npm run build
```

Si toutes ces commandes passent, votre environnement est prêt ! ✅

## Workflow de développement

### 1. Créer une branche

```bash
git checkout -b feat/button-component
# ou
git checkout -b fix/focus-ring-color
```

**Nommage des branches :**
- `feat/nom-feature` pour les nouvelles fonctionnalités
- `fix/nom-bug` pour les corrections de bugs
- `docs/nom-doc` pour la documentation
- `refactor/nom` pour les refactorings
- `test/nom` pour les tests

### 2. Développer

Suivez les [Standards de qualité](#standards-de-qualité) et les [Conventions](#conventions).

### 3. Tester localement

```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test:coverage

# Lint
npm run lint

# Type-check
npm run typecheck

# Build
npm run build

# Storybook
npm run dev
```

**Tous ces checks doivent passer** avant de soumettre une PR.

### 4. Commit

Utilisez les **[Conventional Commits](https://www.conventionalcommits.org/)** :

```bash
git add .
git commit -m "feat(button): add primary and secondary variants"
```

**Format :**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types :**
- `feat`: nouvelle fonctionnalité
- `fix`: correction de bug
- `docs`: documentation
- `style`: formatage (pas de changement de code)
- `refactor`: refactoring
- `test`: ajout/correction de tests
- `chore`: maintenance (deps, config)

### 5. Push et PR

```bash
git push origin feat/button-component
```

Puis ouvrez une Pull Request sur GitHub en utilisant le template.

## Créer un composant

### Structure de fichiers

```bash
mkdir -p src/components/Button
touch src/components/Button/Button.tsx
touch src/components/Button/Button.css
touch src/components/Button/Button.test.tsx
touch src/components/Button/Button.stories.tsx
touch src/components/Button/index.ts
```

### 1. Composant TypeScript (.tsx)

```typescript
/**
 * Button Component
 * 
 * Description du composant et de son usage
 */
import './Button.css';

export interface ButtonProps {
  /** Prop description avec JSDoc */
  variant?: 'primary' | 'secondary';
  /** Whether the button is disabled */
  isDisabled?: boolean;
  /** Click event handler */
  onClick?: () => void;
  /** Button content */
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  isDisabled = false,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant}`}
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  );
};
```

### 2. Styles CSS (.css)

**RÈGLE ABSOLUE : Uniquement des tokens CSS, zéro valeur magique**

```css
.button {
  padding: var(--spacing-inset-sm) var(--spacing-inset-md);
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
}

.button--primary {
  background: var(--color-brand-action-primary-default);
  color: var(--color-brand-action-content-inverse);
}

.button--primary:hover {
  background: var(--color-brand-action-primary-hover);
}

.button--secondary {
  background: var(--color-brand-action-toned-transparent-default);
  color: var(--color-brand-action-content-default);
}
```

### 3. Tests (.test.tsx)

Couverture minimale : **80%**

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../../../tests/utils/test-helpers';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} isDisabled>Click</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### 4. Stories (.stories.tsx)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};
```

### 5. Export (index.ts)

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### 6. Barrel export

Ajouter dans `src/components/index.ts` :

```typescript
export * from './Button';
```

## Standards de qualité

### TypeScript

- ✅ Mode strict activé
- ✅ Zéro `any` (utiliser `unknown` si nécessaire)
- ✅ Props typées avec interfaces
- ✅ JSDoc pour toutes les props publiques

### CSS

- ✅ **Zéro valeur magique** : tous les styles via `var(--token-name)`
- ✅ Styles séparés dans fichier `.css`
- ✅ Classes avec convention kebab-case
- ✅ Utiliser uniquement tokens sémantiques ou component

### Tests

- ✅ Couverture ≥ 80% (lignes, branches, fonctions)
- ✅ Tests de rendu pour toutes variantes
- ✅ Tests d'interactions (click, change, etc.)
- ✅ Tests de navigation clavier
- ✅ Tests d'accessibilité (axe-core)

### Accessibilité

- ✅ Navigation clavier fonctionnelle
- ✅ Focus visible (`outline` avec token `--color-utility-focus`)
- ✅ Rôles ARIA appropriés
- ✅ États communiqués (disabled, expanded, checked, etc.)
- ✅ Contraste validé APCA (Lc ≥ 60 pour body, ≥ 45 pour headings)

### Documentation

- ✅ Commentaires JSDoc pour props
- ✅ Stories Storybook avec Controls
- ✅ MDX documentation dans `docs/components/`
- ✅ Exemples d'usage
- ✅ Liste des tokens consommés
- ✅ Critères a11y documentés

## Conventions

### Nommage

- **Tokens JSON** : kebab-case, chemins hiérarchiques (`color.brand.action.primary.default`)
- **Variables CSS** : kebab-case avec `--` (`--color-brand-action-primary-default`)
- **Composants** : PascalCase (`Button`, `Card`, `HelloWorld`)
- **Props** : camelCase (`onClick`, `isDisabled`, `hasError`)
- **Fichiers** : PascalCase pour composants (`Button.tsx`), kebab-case pour autres
- **Classes CSS** : kebab-case (`button`, `button--primary`)

### Commits

**Conventional Commits** obligatoire :

```
feat(button): add ghost variant
fix(input): correct focus ring color
docs(tokens): update semantic tokens documentation
test(card): add keyboard navigation tests
chore(deps): update dependencies
```

### Branches

- `feat/nom-feature`
- `fix/nom-bug`
- `docs/nom-doc`
- `refactor/nom`
- `test/nom`

## Soumettre une PR

### Checklist avant soumission

- [ ] `npm run typecheck` ✅
- [ ] `npm run lint` ✅
- [ ] `npm test` ✅ (avec couverture ≥ 80%)
- [ ] `npm run build` ✅
- [ ] Commits suivent Conventional Commits
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour (si applicable)
- [ ] Template PR rempli complètement

### Process de review

1. **Soumission** : ouvrir la PR avec description détaillée
2. **CI** : les workflows GitHub Actions doivent passer
3. **Review** : attendre la review d'un maintainer
4. **Itérations** : appliquer les changements demandés
5. **Merge** : la PR sera mergée par un maintainer

### Délais de review

- **Bugs critiques** : 24-48h
- **Features** : 3-7 jours
- **Documentation** : 2-5 jours
- **Refactoring** : 5-10 jours

## Tokens

### Ajouter des tokens

1. Éditer le fichier JSON approprié dans `src/tokens/`
   - `primitive-tokens.JSON` : valeurs brutes (rare)
   - `brand-tokens.JSON` : identité de marque (rare)
   - `semantic-tokens.JSON` : rôles UI (courant)
   - `component-tokens.JSON` : recettes composants (courant)

2. Respecter la nomenclature kebab-case et les chemins hiérarchiques

3. Générer les CSS variables :
   ```bash
   npm run generate:tokens
   ```

4. Vérifier que `src/styles/tokens.css` contient les nouvelles variables

5. Documenter dans `docs/tokens/` (si applicable)

### Modifier des tokens

⚠️ **Attention** : modifier un token sémantique peut impacter plusieurs composants.

1. Identifier l'impact (quels composants utilisent ce token ?)
2. Tester tous les composants impactés
3. Vérifier le contraste APCA si c'est un token de couleur
4. Mettre à jour la documentation
5. Si breaking change, bumper la version MAJOR

## Resources

- [Documentation Storybook](http://localhost:6006) : docs complètes
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [APCA Contrast Calculator](https://www.myndex.com/APCA/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## Questions ?

Si vous avez des questions :

- 📖 Consultez la [documentation](http://localhost:6006)
- 💬 Ouvrez une [discussion GitHub](https://github.com/alexisbaud/mds/discussions)
- 📝 Créez une [issue](https://github.com/alexisbaud/mds/issues)

Merci pour votre contribution ! 🙏

