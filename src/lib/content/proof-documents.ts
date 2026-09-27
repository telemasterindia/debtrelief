/**
 * Results & Proof — public PDF proof documents.
 *
 * Add an entry ONLY after the PDF has been reviewed and confirmed fully redacted
 * (no names, phone numbers, emails, addresses, account numbers, creditor account
 * IDs, SSNs, dates of birth, signatures or other personal information — checked
 * in both the text layer and the rendered pages). See public/proof/README.md.
 *
 * Institution, title, description and resultType must come from the PDF itself.
 * Never invent bank names, amounts, percentages or dates.
 */
export type ProofDocument = {
  /** Stable id, e.g. "proof-01". */
  id: string;
  /** Bank or credit institution named on the document. */
  institution: string;
  /** Document type, e.g. "Settlement letter". */
  title: string;
  /** Short, neutral description of what the document shows. */
  description: string;
  /** Public path, e.g. "/proof/proof-01.pdf". */
  pdfPath: string;
  /** Optional result type shown on the document, e.g. "Settled in full". */
  resultType?: string;
  /** Optional preview image of page 1 (e.g. "/proof/proof-01.png"), redacted like the PDF. */
  thumbnailPath?: string;
};

export const proofDocuments: ProofDocument[] = [
  {
    id: "proof-01",
    institution: "Chase",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states an unpaid balance of $28,521.08 and an offer to accept $5,704.22 to reduce the account balance to zero.",
    pdfPath: "/proof/proof-01.pdf",
  },
  {
    id: "proof-02",
    institution: "Chase",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states an account balance of $8,866.09 and an offer to accept $1,773.22 to settle the account.",
    pdfPath: "/proof/proof-02.pdf",
  },
  {
    id: "proof-03",
    institution: "Chase",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states an account balance of $5,101.02 and an offer to accept $1,275.26 to settle the account.",
    pdfPath: "/proof/proof-03.pdf",
  },
  {
    id: "proof-04",
    institution: "Chase",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states an account balance of $3,942.14 and an offer to accept $788.43 to settle the account.",
    pdfPath: "/proof/proof-04.pdf",
  },
  {
    id: "proof-05",
    institution: "PNC Bank",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states a balance of $7,194.88 and an offer to accept $2,158.46 as full and final settlement, which the letter describes as reducing the balance by 70%.",
    pdfPath: "/proof/proof-05.pdf",
  },
  {
    id: "proof-06",
    institution: "Chase",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "The letter states an account balance of $53,798.35 and an offer to accept $5,380.71 to settle the account.",
    pdfPath: "/proof/proof-06.pdf",
  },
  {
    id: "proof-07",
    institution: "U.S. Bank",
    title: "Form 1099-C, Cancellation of Debt",
    resultType: "Debt cancelled",
    description:
      "The form reports $4,547.81 of credit card debt discharged (Box 2). It does not state a settlement amount.",
    pdfPath: "/proof/proof-07.pdf",
  },
  {
    id: "proof-08",
    institution: "FMA Alliance / Upstart",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "Collection agency letter for a loan serviced by Upstart. It states a balance of $49,269.76 and an offer to accept $14,780.93 as settlement in full.",
    pdfPath: "/proof/proof-08.pdf",
  },
  {
    id: "proof-09",
    institution: "FMA Alliance / Upstart",
    title: "Settlement offer letter",
    resultType: "Settlement offer",
    description:
      "Collection agency letter for a loan serviced by Upstart. It states a balance of $52,689.45 and an offer to accept $15,806.84 as settlement in full.",
    pdfPath: "/proof/proof-09.pdf",
  },
];

export const proofDisclaimer =
  "These documents are examples from individual prior cases, shown with personal information removed. They are not typical or guaranteed results. Every situation is different, and your results will depend on your own debts, creditors and circumstances.";
