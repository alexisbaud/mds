# Tokens Directory

Ce répertoire contient les fichiers JSON de tokens du design system MDS.

## Structure

- **`primitives.json`** : Tokens primitifs (couleurs brutes, tailles, espacements, etc.). Ne jamais consommer directement.
- **`brand.json`** : Tokens de marque (palette principale, accent, polices). Référencés par les sémantiques.
- **`semantic.json`** : Tokens sémantiques (surface, content, action, spacing, etc.). **À privilégier dans les composants**.
- **`component.json`** : Tokens spécifiques aux composants. Créés au fur et à mesure.

## Comment ajouter/modifier des tokens

1. Édite le fichier JSON approprié (généralement depuis Tokens Studio for Figma)
2. Exécute `npm run generate:tokens` pour régénérer les variables CSS
3. Les variables CSS sont disponibles dans `src/styles/tokens.css`

## Nomenclature

- Chemins hiérarchiques : `groupe.sous-groupe.niveau.variation`
- kebab-case pour les clés
- Sensible à la casse (respecter exactement les clés JSON)

## Hiérarchie de consommation

```
Primitives → Brand → Sémantiques → Composants → UI
```

**Les composants UI ne doivent consommer QUE des tokens sémantiques ou component.**

