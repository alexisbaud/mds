# Primitive Tokens — Reference

This document enumerates the existing Primitive Tokens defined in `design-system/primitive-tokens.JSON` and their structure. It lists what exists and is directly available to reference in Tokens Studio.

## Top-level groups
- `color`
- `transparent`
- `opacity`
- `size`
- `spacing`
- `border-radius`
- `border-width`
- `font-family`
- `font-weight`
- `line-height`
- `font-size`
- `letter-spacing`
- `paragraph-spacing`
- `text-case`
- `text-decoration`
- `boolean`
- `dimension`

## color
Families (as keys under `color`), each providing numeric shade steps:
- Accents: `pink`, `fuchsia`, `purple`, `blue`, `cyan`, `teal`, `super-teal`, `green`, `lime`, `yellow`, `orange`, `red`.
- Neutrals: `warm-gray`, `gray`, `cold-gray`.

Shades per family:
- Common steps: `5, 8, 15, 22, 30, 37, 45, 52, 60, 67, 75, 82, 90, 95, 100, 105`.
- Neutrals additionally include `0` (`warm-gray.0`, `gray.0`, `cold-gray.0`).
- `super-teal` additionally includes: `dark-brand`, `light-brand`.

All values are hex colors (`$type: color`, `$value: "#RRGGBB"`).

## transparent
- Structure: `transparent.{family}.{shade}.{alpha}`.
- Families mirror `color` (including neutrals with `0`, and `super-teal.dark-brand`, `super-teal.light-brand`).
- For each `{family}.{shade}`, available `alpha` steps: `5, 10, 15, 20, 30, 40, 50, 60, 70, 80` (as RGBA strings).
- Special cases `transparent.black` and `transparent.white` provides a dense ladder: `1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99, 100, none`.

All values are RGBA colors (`$type: color`, `$value: "rgba(r,g,b,a)"`).

## opacity
- `opacity.transparent`: `1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95` (percent strings).
- `opacity.opaque`: `100%`.

## size
- `size.pixel`: `2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256, 320, 384, 512, 640, 768, 896, 1024` (px).
- `size.percent`: `5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200` (%).

## spacing
- `spacing.pixel`: `2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256` (px).

## border-radius
- `border-radius.pixel`: `2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 1000` (px).
- `border-radius.percent`: `5, 10, 15, 20, 25, 30, 35, 40, 45, 50` (%).

## border-width
- `border-width.pixel`: `05, 1, 2, 4, 8, 16` (px; `05` = `0.5px`).

## font-family
- `font-family.sans-serif`: `inter`, `ibm-sans`, `strawford`, `outfit`, `sf-pro`, `lexend`, `poppins`, `funnel`.
- `font-family.styled`: `mondwest`, `playpen-sans`, `sansita`.
- `font-family.serif`: `argent-cf`, `lora`, `podkova`, `roboto-slab`, `times-new-roman`, `new-york`, `arvo`.
- `font-family.mono`: `ibm-mono`, `space-mono`, `sf-mono`.

Each value is a font family name string (`$type: fontFamilies`).

## font-weight
- `font-weight.numeric`: `100, 200, 300, 400, 500, 600, 700, 800, 900`.
- `font-weight.keyword`: `thin, extra-light, light, regular, medium, semi-bold, bold, extra-bold, black`.

Each value is a string (`$type: fontWeights`).

## line-height
- `line-height.percent`: `80, 100, 120, 150, 200` (% strings).
- `line-height.pixel`: `8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64` (px strings).
- Convenience maps in `line-height.pixel`:
  - `1-2`: keys `8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64` with pixel values.
  - `1-5`: keys `8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64` with pixel values.

## font-size
- `font-size.pixel`: `8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80` (px).
- `font-size.rem`: `8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80` (rem strings per key).

## letter-spacing
- `letter-spacing.pixel.none`: `0px`.
- `letter-spacing.pixel.negative`: `5, 10, 25, 50, 75, 100, 150, 200` (px strings with negative values).
- `letter-spacing.pixel.positive`: `5, 10, 25, 50, 75, 100, 150, 200` (px strings with positive values).

## paragraph-spacing
- `paragraph-spacing.pixel`: `2, 4, 8, 12, 16, 20, 24, 32, 40, 48` (px).

## text-case
- `text-case`: `none, uppercase, lowercase, capitalize`.

## text-decoration
- `text-decoration`: `none, underline, line-through, overline`.

## boolean
- `boolean`: `true, false` (strings `"true"`, `"false"`).

## dimension
- `dimension.pixel`: `1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48, 64, 96, 128, 256, 512, 1024, null` (px; `null` = `0px`).

## Notes limited to what exists
- Neutrals include shade `0` in `warm-gray`, `gray`, `cold-gray`.
- `super-teal` includes `dark-brand` and `light-brand` keys.
- `transparent.black` (and `transparent.white`) include an extended alpha ladder and `none`.
