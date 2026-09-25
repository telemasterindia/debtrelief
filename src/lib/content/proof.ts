/**
 * Greenlight Debt Relief results ("Still not convinced? See the results for yourself.")
 *
 * These are the four existing proof assets (Proof 1–4) from the current website.
 * The images could not be retrieved automatically, so each `image` is null.
 * See /public/proof/README.md for exactly what to add. Until images are added,
 * the section shows clearly labelled placeholders in development and is hidden
 * in production builds, so nothing incomplete is shown to visitors.
 *
 * Never replace these with invented results.
 */
export type ProofItem = {
  id: string;
  label: string;
  image: { src: string; width: number; height: number; alt: string } | null;
  /** Optional short, factual caption (e.g. "Credit card settlement, 2025"). */
  caption?: string;
};

export const proofItems: ProofItem[] = [
  { id: "proof-1", label: "Proof 1", image: null },
  { id: "proof-2", label: "Proof 2", image: null },
  { id: "proof-3", label: "Proof 3", image: null },
  { id: "proof-4", label: "Proof 4", image: null },
];

export const proofDisclaimer =
  "These are individual results from past Greenlight Debt Relief clients. They are not typical or guaranteed. Results depend on each client's debts, creditors and ability to complete the program. Personal information has been removed.";
