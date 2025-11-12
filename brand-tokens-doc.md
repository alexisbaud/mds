# Brand Tokens — Reference

Cette documentation décrit la collection `brand-tokens.JSON` et son rôle dans le design system. Les brand tokens centralisent les décisions d’identité (couleurs de marque et polices) et sont référencés par les tokens sémantiques.

## Contenu

- `color.brand-color`
  - Palette principale de marque
  - Paliers: `5, 8, 15, 22, 30, 37, 45, 52, 60, 67, 75, 82, 90, 95, 100, 105`
  - Raccourcis: `light-brand`, `dark-brand`
  - Valeurs: références vers les primitives de couleur (ex: `{color.super-teal.30}`, `{color.super-teal.light-brand}`)

Mise à jour (kebab-case):
- `color.brand-color`
  - Raccourcis: `light-brand`, `dark-brand`
  - Valeurs: références primitives (ex: `{color.super-teal.30}`, `{color.super-teal.light-brand}`)

- `color.brand-accent`
  - Palette d’accent de marque
  - Paliers: `5 … 105`
  - Valeurs: références vers les primitives (ex: `{color.pink.67}`)

Mise à jour (kebab-case):
- `color.brand-accent`

- `font-family`
  - Aliases: `main`, `brand`, `technic`
  - Valeurs: références primitives (ex: `{font-family.sans-serif.ibm-sans}`, `{font-family.sans-serif.funnel}`, `{font-family.mono.ibm-mono}`)

## Usage recommandé

- Privilégier les références sémantiques qui pointent vers les brand tokens:
  - `color.brand.*` → `brand-color.*`
  - `color.accent.*` → `brand-accent.*`
- Pour les effets, utiliser `transparent.brand-color` / `transparent.brand-accent` (via les références existantes vers `transparent.*`).
- N’utiliser les primitives directes que pour définir/composer les brand tokens, pas dans les composants.

## Notes

- Les paliers numériques expriment une progression perceptuelle cohérente avec les primitives.
- `light-brand`/`dark-brand` servent d’ancres UI (liaisons avec logos, accents marketing, etc.).
- Voir `design-system.md` pour un guide d’usage par rôle et APCA.
