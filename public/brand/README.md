# Greenlight Debt Relief brand assets

| File | What it is | Used for |
| --- | --- | --- |
| `greenlight-logo.png` | Official logo supplied by Greenlight (382 × 235, transparent). Only the empty transparent margin was trimmed; artwork, colours and proportions are untouched. | Header, footer, social-share images |
| `greenlight-mark.png` | The lightbulb mark isolated from the official logo (letters masked out, nothing redrawn), 256 × 256 transparent | Reference / favicon source |
| `src/app/icon.png` | Favicon (256 × 256) from the mark | Browser tab |
| `src/app/apple-icon.png` | 180 × 180 on white | iOS home screen |

## Logo usage rules

- The logo exists only in full colour for **light backgrounds** (its "DEBT RELIEF"
  wordmark is charcoal `#222222`). Do not place it on the dark sections, and do
  not recolour, filter, stretch or crop it. A reversed (light-on-dark) version
  would need to come from Greenlight's designer.
- Keep clear space around it at least equal to the height of the "D" in "DEBT".
- An SVG version from the original design files would render even more crisply
  on high-density screens; if one exists, save it here as `greenlight-logo.svg`
  and update `logo.src` in `src/lib/site-config.ts`.

## Colours (measured from the logo)

| Colour | Hex | Role |
| --- | --- | --- |
| Greenlight green ("GREEN LIGHT") | `#378108` | Primary brand colour, primary buttons |
| Deep green (lightbulb) | `#1D5505` | Deep accents, gradients |
| Charcoal ("DEBT RELIEF") | `#222222` | Headings, dark neutrals |
| Signal orange (lightbulb arc) | `#E14002` | Logo only — too low-contrast for UI text |

Design tokens live in `src/app/globals.css`.
