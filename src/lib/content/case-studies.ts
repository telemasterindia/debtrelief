/**
 * Verified case studies.
 *
 * This list is intentionally empty. Add an entry ONLY when it describes a real,
 * documented matter, the consumer has given written permission, and the outcome
 * can be substantiated with records. Sections that display case studies render
 * nothing until at least one verified entry exists.
 */
export type CaseStudy = {
  id: string;
  /** Month and year the matter concluded, e.g. "2026-05". */
  date: string;
  /** Short description of the situation, in plain English. */
  situation: string;
  debtType: string;
  /** Approximate amount, only where appropriate and permitted. */
  amount?: string;
  actionTaken: string;
  documentedOutcome: string;
  /** Specific limitations that apply to this example. */
  limitations: string;
  /** Must be true — confirms records and consent are on file. */
  verified: true;
};

export const caseStudies: CaseStudy[] = [];

/** Shown alongside every case study. */
export const caseStudyDisclaimer =
  "This is an individual example, not a typical or guaranteed result. Every account is different, and outcomes depend on the facts, the documentation available and the laws that apply.";
