# Proof 1–4 — REQUIRED ASSETS (missing)

The current greenlightdebtrelief.com homepage has a section titled
**"Still not convinced? See the results for yourself."** with four items
labelled **Proof 1, Proof 2, Proof 3 and Proof 4**.

These files could not be retrieved automatically (the build environment could
not reach greenlightdebtrelief.com). Nothing has been substituted for them.

| Slot    | Expected file                 | Status  |
| ------- | ----------------------------- | ------- |
| Proof 1 | `public/proof/proof-1.jpg`    | MISSING |
| Proof 2 | `public/proof/proof-2.jpg`    | MISSING |
| Proof 3 | `public/proof/proof-3.jpg`    | MISSING |
| Proof 4 | `public/proof/proof-4.jpg`    | MISSING |

## How to add them

1. Download the original four images from the current website (or your source
   files). JPG, PNG or WebP are fine.
2. **Before publishing, confirm each image is a genuine client result and that
   all personal information is redacted** (names, addresses, account numbers).
3. Save them using the file names above.
4. In `src/lib/content/proof.ts`, set each item's `image`, for example:

   ```ts
   { id: "proof-1", label: "Proof 1", image: { src: "/proof/proof-1.jpg", width: 1200, height: 1600, alt: "Settlement letter from a creditor showing a reduced balance (personal details redacted)" } },
   ```

   Use the real width/height and describe what the image shows in `alt`.
5. Optionally add a short factual `caption` (type of debt, year).

The section shows placeholders in `npm run dev` and stays hidden in production
until at least one image is set. The disclaimer that results are individual and
not typical or guaranteed is always shown with the images.
