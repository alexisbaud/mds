# Description

<!-- Décrivez vos changements de manière claire et concise -->

## Type de changement

<!-- Cochez les cases appropriées -->

- [ ] 🐛 Bug fix (changement qui corrige un problème)
- [ ] ✨ Nouvelle fonctionnalité (changement qui ajoute une fonctionnalité)
- [ ] 💥 Breaking change (changement qui casse la rétrocompatibilité)
- [ ] 📝 Documentation (changements de documentation uniquement)
- [ ] 🎨 Style (formatage, point-virgules, etc. - pas de changement de code)
- [ ] ♻️ Refactoring (ni bug fix ni feature)
- [ ] ⚡️ Performance (amélioration des performances)
- [ ] ✅ Tests (ajout ou correction de tests)
- [ ] 🔧 Chore (maintenance, dependencies, config, etc.)

## Motivation et contexte

<!-- Pourquoi ce changement est-il nécessaire ? Quel problème résout-il ? -->
<!-- Si c'est lié à une issue, mentionnez-la : Closes #123 -->

## Changements effectués

<!-- Listez les principaux changements -->

- 
- 
- 

## Comment cela a-t-il été testé ?

<!-- Décrivez les tests que vous avez effectués -->

- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests manuels effectués
- [ ] Tests d'accessibilité (addon Storybook a11y)
- [ ] Tests de navigation clavier
- [ ] Vérification du contraste APCA

## Captures d'écran (si applicable)

<!-- Ajoutez des screenshots pour les changements visuels -->

## Checklist

<!-- Vérifiez que vous avez complété tous les points avant de soumettre -->

### Code

- [ ] Mon code suit les conventions de style du projet
- [ ] J'ai effectué une auto-revue de mon code
- [ ] J'ai commenté mon code, particulièrement dans les zones complexes
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] TypeScript compile sans erreur (`npm run typecheck`)
- [ ] ESLint passe sans erreur (`npm run lint`)
- [ ] Prettier est appliqué (`npm run format`)

### Tests

- [ ] J'ai ajouté des tests qui prouvent que mon fix fonctionne ou que ma feature marche
- [ ] Les tests nouveaux et existants passent localement (`npm test`)
- [ ] La couverture de tests est ≥ 80% pour le code modifié

### Composants (si applicable)

- [ ] Le composant utilise UNIQUEMENT des tokens CSS (zéro valeur magique)
- [ ] Tous les styles sont dans un fichier `.css` séparé
- [ ] Les props sont typées avec interfaces TypeScript et JSDoc
- [ ] Le composant a des attributs ARIA appropriés
- [ ] La navigation clavier fonctionne correctement
- [ ] Le focus est visible
- [ ] Toutes les variantes ont des stories Storybook
- [ ] Le composant est exporté depuis `src/components/index.ts`
- [ ] La documentation MDX est créée dans `docs/components/`

### Tokens (si applicable)

- [ ] Les nouveaux tokens suivent la nomenclature kebab-case
- [ ] Les tokens sont dans le bon niveau (primitives/brand/semantic/component)
- [ ] `npm run generate:tokens` a été exécuté
- [ ] Les paires surface/content ont un contraste validé APCA

### Documentation

- [ ] J'ai mis à jour la documentation correspondante
- [ ] J'ai ajouté/mis à jour les commentaires JSDoc
- [ ] J'ai créé/mis à jour les stories Storybook
- [ ] J'ai mis à jour CHANGELOG.md (si applicable)

### Build

- [ ] `npm run build` réussit
- [ ] `npm run build:storybook` réussit (si changements visibles dans Storybook)

## Notes pour les reviewers

<!-- Ajoutez des notes pour faciliter la review -->

## Checklist pour le merge

<!-- Pour les mainteneurs -->

- [ ] Les workflows CI passent
- [ ] Le code a été reviewé
- [ ] Les tests passent
- [ ] La documentation est à jour
- [ ] CHANGELOG.md est mis à jour (si nécessaire)
- [ ] Version bumpée si nécessaire (selon semver)

