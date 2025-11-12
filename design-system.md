# Design System — Guide d’entrée

Ce document est le point d’entrée de la documentation du design system. Il donne une vue d’ensemble, explique comment consommer les tokens, définit les conventions de nommage, et propose un guide d’usage par rôle. Les documents dédiés précisent chaque collection:
- `primitive-tokens-doc.md` / `primitive-tokens.JSON`
- `semantic-tokens-doc.md` / `semantic-tokens.JSON`

Les primitives sont la «matière première» (couleurs, tailles, etc.). Les sémantiques sont des rôles UI stables qui référencent ces primitives. Les brand tokens concentrent les choix de marque (palette principale/secondaire et polices) et sont référencés par les sémantiques.

## How to consume

Voici des façons courantes d’utiliser les tokens dans un front-end. Choisissez la plus simple pour votre stack et vos contraintes.

### Option A — Consommer les JSON directement (JS/TS)
- Importer les JSON et construire un objet `theme` en JS/TS.
- Référencer les chemins de tokens tels quels (ex: `{color.brand.action.default}`).

Étapes (haut niveau):
1) Importer `primitive-tokens.JSON` et `semantic-tokens.JSON`.
2) Exposer un `theme` qui pointe d’abord vers les tokens sémantiques (préféré), et retombe sur les primitives si nécessaire.
3) Utiliser ces chemins dans vos composants (ex: `button.bg = theme.color.brand.action.default`).

Avantages: pas de dépendance lourde, dynamique, idéal pour prototyper. Inconvénient: pas de variables CSS automatiques.

### Option B — Variables CSS (via génération)
- Générer des variables CSS (ex: `--color-brand-action-default`) à partir des tokens (via un script simple ou un outil comme Style Dictionary).
- Utiliser ces variables dans vos CSS/JS (ex: `background: var(--color-brand-action-default)`).

Étapes (haut niveau):
1) Exporter depuis Tokens Studio for Figma vers les JSON du repo.
2) Générer un fichier CSS `:root { --token-name: value; }` à partir des tokens sémantiques (les primitives servent de source pour ces valeurs).
3) Importer ce CSS dans l’app; utiliser `var(--…)` dans les styles.

Avantages: thèmes/overrides simples, performant. Inconvénient: étape de build supplémentaire.

Bonnes pratiques minimales:
- Privilégier les tokens sémantiques côté UI (surface, content, action…), pour préserver la flexibilité (thème clair/sombre, rebranding…).
- Éviter de coder en dur des primitives dans les composants (risque de dette et de duplication).

## Conventions de nommage

- Chemins hiérarchiques par segments: `groupe.sousGroupe.niveau.variation`.
- Séparateurs: le point `.` entre segments; les clés peuvent utiliser kebab-case si présent dans les JSON (ex: `border-width`).
- Casse/orthographe: respecter EXACTEMENT les clés JSON (sensible à la casse). Exemple: `light-brand` / `dark-brand`.
- Collections principales:
  - Primitives: `color`, `transparent`, `opacity`, `size`, `spacing`, `border-radius`, `border-width`, `font-family`, `font-weight`, `line-height`, `font-size`, `letter-spacing`, `paragraph-spacing`, `text-case`, `text-decoration`, `boolean`, `dimension`.
  - Sémantiques: `color`, `spacing`, `sizing`, `radius`, `border-width`, `elevation`, `typography`, `opacity`.
- Variations spécifiques (exemples):
  - `color.*.surface.*`: `default`, `inverse` (l’ancienne variante `on-surface` a été retirée sur les surfaces).
  - `color.*.content.*`: `default`, `on-surface`, `inverse`.
  - `color.*.effect.*`: `shadow|glow|light` avec niveaux `soft|medium|intense`.
  - `color.*.action`: `primary`, `toned.transparent|fix`, `ghost`, `content`, `border`.
  - Élévation: couches `hard-layer`, `soft-layer`, `complete`.

## Guide d’usage par rôle (sémantiques)

- Couleurs (`color`):
  - `surface`: arrière-plans et couches de fond (cartes, panneaux). Choisir le palier de douceur/force (`subtle` → `intense`) selon la hiérarchie visuelle.
  - `content`: texte, icônes et séparateurs visibles sur la surface. Associer le niveau (`weakest` → `heaviest`) pour obtenir le contraste attendu.
  - `action`: couleurs d’interaction (boutons, liens, CTA). `default` pour l’état principal; `toned` pour variantes discrètes/secondaires.
  - `effect`: effets visuels.
    - `shadow`: ombres portées (profondeur/élévation).
    - `glow`: halo lumineux (accent/brand);
    - `light`: rayons/éclairages décoratifs.
  - `brand`: expose `light-brand` / `dark-brand`.
  - `utility`: focus & sélection de texte (`color.utility.focus`, `color.utility.selection.text.*`).
  - `data-viz`: palettes catégorielles, scales séquentielles, utilitaires (axes/grille/labels).

- Typographie (`typography`): choisir par rôle de texte
  - `display` pour titres brandés, `heading` pour hiérarchie UI, `title` pour éléments UI, `body` pour contenu, `label`, `caption`, `overline`, `code`, `lead`.

- Espacements et dimensions
  - `spacing`: marges/espacements (micro/inset/stack/layout/wide).
  - `sizing`: tailles d’éléments (icon/atom/molecule/component/container).
  - `radius`, `border-width`, `elevation`, `opacity.state` pour états (hover/pressed/disabled…).

## Intentions et échelles (couleur, taille, contraste)

- Couleur (palettes et paliers):
  - Les paliers numériques (ex: `5, 8, 15… 105`) progressent de clair → sombre (ou inverse pour neutres selon l’usage), avec des écarts perceptuels réguliers.
  - Les familles (ex: `pink`, `blue`, `super-teal`, neutres `warm-gray/gray/cold-gray`) assurent une cohérence inter-composants.

- Contraste — APCA
  - Les paires `surface`/`content` sont pensées pour atteindre des cibles APCA (Lc) adaptées à l’usage.
  - Repères génériques (adapter selon contexte et tests):
    - Texte corps/long (petits corps): viser Lc ≈ 60 ou plus.
    - Titres et gros textes: Lc ≈ 45 ou plus.
    - Icônes/pictos non-textuels ou UI discrète: Lc ≈ 30 ou plus.
  - Mesurer vos combinaisons réelles (outil APCA) et privilégier les rôles sémantiques (`content.heavy` sur `surface.soft`, etc.).

- Tailles (spacing/sizing/typography)
  - Échelles régulières pour garantir rythme, hiérarchie, et cohérence responsive.
  - Choisir la catégorie appropriée (`icon` vs `component`, `micro` vs `layout`) plutôt que des valeurs arbitraires.

## Recommandations d’implémentation

- Côté composants, n’utilisez que les tokens sémantiques. Réservez les primitives aux définitions de tokens et à la composition de recettes (elevation, typographies).
- Centralisez le mapping sémantique → style (thème) pour faciliter le theming futur (dark, responsive density).
- Documentez les paires `surface`/`content` validées (contraste) et réutilisez-les.

## Référence et navigation

- Primitives: voir `primitive-tokens-doc.md`.
- Sémantiques: voir `semantic-tokens-doc.md`.
- Fichiers sources: `primitive-tokens.JSON`, `semantic-tokens.JSON`.
 - Brand: voir `brand-tokens-doc.md`.
 - Fichiers brand: `brand-tokens.JSON` (couleur de marque, couleur d’accent, polices de marque).

## Brand tokens — ce qu’il faut savoir

Les brand tokens regroupent les décisions d’identité de marque et évitent de les disperser dans les primitives.

- Couleurs
  - `color.brand-color`: palette principale de marque (paliers `5…105` + `light-brand`/`dark-brand`).
  - `color.brand-accent`: palette d’accent de marque (paliers `5…105`).
  - Transparences correspondantes exposées dans `transparent.brand-color.*.*` et `transparent.brand-accent.*.*` via les références des primitives.

- Polices
  - `font-family.main`, `font-family.brand`, `font-family.technic`: alias de familles basés sur les primitives pour assurer une cohérence typographique.

- Intégration aux sémantiques
  - `color.brand.*` des sémantiques référence `brand-color.*` (ex: surfaces, content, effects, action).
  - `color.accent.*` des sémantiques référence `brand-accent.*`.
  - Les effets (`glow`, `light`, `shadow`) utilisent les variantes `transparent.brand-color` ou `transparent.brand-accent` correspondantes.

## Espace réservé — à venir

Cette section accueillera les éléments planifiés mais non encore finalisés.

- Component tokens
  - Fichier prévu: `component-tokens.JSON` pour formaliser des recettes par composant (ex: Button/Card/Switch) tout en restant découplé des implémentations.

- Thèmes et responsive
  - Mode sombre; variantes de tailles d’écran (mobile, tablet, TV). Le système actuel cible le mode clair et desktop.

- Pipeline & outillage
  - Suivi via Tokens Studio for Figma; export/CI; scripts de génération (variables CSS, thèmes).

- Versionnage & migration
  - Changelog des tokens; règles de dépréciation; filets anti-régression visuels (tests visuels si possible).
