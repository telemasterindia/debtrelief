# Official Greenlight Debt Relief logo — REQUIRED ASSET

The official logo could not be retrieved automatically (the build environment
could not reach greenlightdebtrelief.com). Until it is added, the site shows the
company name as plain text. No substitute logo is used.

To add it:

1. Export the logo from the current website or brand files — preferably SVG,
   otherwise a PNG at least 2× the display size (e.g. 480 × 120).
2. Save it here, e.g. `public/brand/greenlight-logo.svg`.
3. In `src/lib/site-config.ts` set:

   ```ts
   logo: { src: "/brand/greenlight-logo.svg", width: 240, height: 60, alt: "Greenlight Debt Relief" },
   ```

   (use the file's real width/height ratio).
4. Favicon: delete the transparent placeholder `src/app/icon.svg` and add `src/app/icon.png` (square, 512 × 512) and
   `src/app/apple-icon.png` (180 × 180) cut from the official logo. Next.js
   picks them up automatically.
5. Update the brand colors in `src/app/globals.css` (`--color-brand-*`) to the
   logo's exact greens, keeping white-on-`brand-600` contrast at 4.5:1 or more.
