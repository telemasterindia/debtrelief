/**
 * Central business configuration.
 *
 * IMPORTANT FOR THE SITE OWNER: every value below is displayed to consumers or
 * published in structured data. Only set values that are true and verifiable.
 * Optional fields left as `null` are simply not shown anywhere on the site —
 * nothing is invented to fill the gap.
 */
export type SiteConfig = {
  /** Consumer-facing brand name. */
  name: string;
  /** Short descriptor shown next to the logo. */
  descriptor: string;
  /** Registered legal name of the company that operates the website. */
  legalName: string | null;
  /** Mailing address of the operating company. */
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  } | null;
  /** Customer phone line, E.164 format (e.g. "+18005551234"). */
  phone: string | null;
  /** Human-readable phone, e.g. "(800) 555-1234". */
  phoneDisplay: string | null;
  /** Customer support email. */
  email: string | null;
  /** Business hours text, e.g. "Monday–Friday, 9 a.m.–6 p.m. Eastern". */
  hours: string | null;
  /** Year the company was founded. Only set if verifiable. */
  foundingYear: number | null;
  /**
   * Whether the operating company is a law firm. This controls the "not a law
   * firm" disclaimer language. Must reflect reality.
   */
  isLawFirm: boolean;
  /**
   * Whether requesting the initial review is free of charge. This controls the
   * "free to request" messaging. Must reflect the actual business practice.
   */
  initialReviewIsFree: boolean;
  /** Date the legal pages (privacy, terms, disclaimer) were last updated (ISO). */
  legalLastUpdated: string;
};

export const siteConfig: SiteConfig = {
  name: "Ledgerwise",
  descriptor: "Debt Validation Review",
  legalName: null,
  address: null,
  phone: null,
  phoneDisplay: null,
  email: null,
  hours: null,
  foundingYear: null,
  isLawFirm: false,
  initialReviewIsFree: true,
  legalLastUpdated: "2026-09-25",
};

/** Canonical origin, without trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/+$/, "");

export const operatorName = siteConfig.legalName ?? siteConfig.name;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
