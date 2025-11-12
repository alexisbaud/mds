# Semantic Tokens — Reference

This document enumerates the existing Semantic Tokens defined in `design-system/semantic-tokens.JSON` and their structure. It lists what exists and is directly available to reference in Tokens Studio.

## Top-level groups
- `color`
- `spacing`
- `sizing`
- `radius`
- `border-width`
- `elevation`
- `typography`
- `opacity`
- `blur-size`

## color
Groups under `color` provide semantic roles that reference primitive or brand tokens.

- Groups: `neutral`, `brand`, `accent`, `danger`, `warning`, `success`, `info`, `utility`, `data-viz`.
  Structure per role group (`neutral`/`brand`/`accent`/`danger`/`warning`/`success`/`info`):
  - `surface` levels:
    - Levels: `subtle`, `soft`, `medium`, `strong`, `intense` (+ `base` for `neutral` only).
    - Variants: `default`, `inverse`.
  - `content` levels:
    - Levels: `weakest`, `weaker`, `weak`, `heavy`, `heavier`, `heaviest`.
    - Variants: `default`, `on-surface`, `inverse`.
  - `effect` kinds:
    - `shadow`: `soft`, `medium`, `intense` → transparent role-colored shadows for elevation and overlays.
    - `glow`: `soft`, `medium`, `intense` → outer‑glow accents.
    - `light`: `soft`, `medium`, `intense` → light tints for highlights.
  - `brand` (only under `color.brand`): `default`, `inverse` → map to `{color.brand-color.light-brand}` and `{color.brand-color.dark-brand}`.
  - `action` variants:
    - `primary`: `default`, `hover`, `pressed` → solid fills for primary actions and links.
    - `toned.transparent`: `default`, `hover`, `pressed` → low‑emphasis tinted backgrounds for actions/links on light surfaces.
    - `toned.fix`: `default`, `hover`, `pressed` → low‑contrast fixed fills for busy/complex surfaces.
    - `ghost`: `default`, `hover`, `pressed` → preserve underlying surface; subtle tints on hover/pressed.
    - `content`: `default`, `on-surface`, `inverse` → text/icons for actions and links.
    - `border`: `weak`, `heavy`, `heavier` → control emphasis for action borders.

- `color.utility`:
  - `focus`: ring/highlight color for focus treatment → `{transparent.brand-color.light-brand.*}`.
  - `selection.text`: selection colors for text content
    - `background`, `content`, `inverse-background`, `inverse-content`.

- `color.data-viz`:
  - `category.1..10`: categorical palette for series.
  - `scale.{family}.1..9`: sequential ramps per family (e.g., `pink`, `blue`, `green`, ...).
  - `utility.axis`, `utility.grid`, `utility.label`: chart scaffolding colors.

All color values are token references like `{color.cold-gray.22}` or `{transparent.cold-gray.105.15}`. Brand-related semantic colors reference brand tokens `{color.brand-color.*}` and `{color.brand-accent.*}`.

Notes d’usage:
- Overlays/scrims: `color.{type}.effect.shadow.intense` convient pour les fonds modaux.
- Skeletons: utiliser des paires `surface`/`content` adaptées (ex: `surface.subtle` + `content.weak`).

## spacing
- Namespaces: `micro`, `inset`, `stack`, `layout`, `wide`.
- Each size key maps to a primitive spacing token, e.g. `{spacing.pixel.2}`, `{spacing.pixel.48}`.

## sizing
- Namespaces: `icon`, `atom`, `molecule`, `component`, `container`.
- Each size key maps to a primitive size token, e.g. `{size.pixel.32}`, `{size.pixel.256}`.

## radius
- Keys: `xs`, `sm`, `md`, `lg`, `xl`, `pill`.
- Values reference primitive border radius tokens, e.g. `{border-radius.pixel.4}`, `{border-radius.pixel.1000}`.

## border-width
- Keys: `xs`, `sm`, `md`, `lg`, `focus`.
- Values reference primitive border width tokens, e.g. `{border-width.pixel.1}`, `{border-width.pixel.4}`.

## elevation
Elevation provides shadow recipes at multiple sizes. Each size includes:

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`.
- Layers per size:
  - `hard-layer`: drop shadow for the crisp base layer.
  - `soft-layer`: drop shadow for the diffuse/ambient layer.
  - `complete`: an array combining both layers.
- Shadow object schema (`$type: boxShadow`):
  - `type`: `dropShadow` (all defined entries).
  - `x`, `y`, `blur`, `spread`, `color`.
  - All `x`, `y`, `blur` reference primitive tokens from `dimension.pixel` (e.g. `{dimension.pixel.null}`, `{dimension.pixel.4}`).

## typography
Text styles that reference primitives. Each item is `$type: typography` with `$value` fields combining:

- `fontFamily`, `fontSize`, `lineHeight`, `fontWeight`, `letterSpacing`, optionally `textCase` and `paragraphSpacing`.
- Categories:
  - `display`: `xs, sm, md, lg, xl`
  - `heading`: `xs, sm, md, lg, xl, xxl`
  - `title`: `xs, sm, md, lg, xl`
  - `body`: `sm, md, lg`
  - `label`: `xs, sm, md, lg, xl`
  - `caption`: `sm, md, lg`
  - `overline`: `sm, md, lg`
  - `code`: `sm, md, lg`
  - `lead`: `sm, md, lg, xl`

All typography values reference primitives: `{font-family.*}`, `{font-size.*}`, `{line-height.*}`, `{font-weight.*}`, `{letter-spacing.*}`, `{text-case.*}`, `{paragraph-spacing.*}`.

## opacity
- `opacity.state` tokens:
  - `hidden`, `disabled` → reference `opacity.transparent.*` primitives.
- `opacity.interaction` tokens:
  - `visited`, `default`.

## blur-size
- Keys: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `max`.
- Values reference `dimension.pixel.*` primitives and drive modal backdrops/scrims blur.

## Notes
- `color.brand.identity` includes `default` and `inverse` brand colors.
- All elevation shadow `x`, `y`, `blur` reference `dimension.pixel` primitives.


