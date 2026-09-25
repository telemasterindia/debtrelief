/**
 * Central business configuration for Greenlight Debt Relief.
 *
 * Every value here is shown to consumers or published in structured data.
 * Values marked VERIFY came from the owner's brief and should be re-checked
 * against the live site before launch. Optional fields left as `null` are not
 * shown anywhere — nothing is invented to fill the gap.
 */
export type SiteConfig = {
  name: string;
  /** Short line shown with the name where a descriptor helps. */
  descriptor: string;
  legalName: string | null;
  address: { street: string; city: string; region: string; postalCode: string; country: string } | null;
  /** E.164 format. */
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  hours: string | null;
  /** Only set when verifiable. */
  foundingYear: number | null;
  /**
   * The official Greenlight Debt Relief logo. Place the file in /public/brand/
   * and set its path and intrinsic size here. While null, the header and footer
   * show the company name as plain text (no substitute logo is drawn).
   */
  logo: { src: string; width: number; height: number; alt: string } | null;
  /** Official Greenlight Debt Relief YouTube video. */
  youtubeVideoId: string;
  isLawFirm: boolean;
  /** Whether the initial consultation is free. Controls all "free consultation" copy. */
  consultationIsFree: boolean;
  legalLastUpdated: string;
};

export const siteConfig: SiteConfig = {
  name: "Greenlight Debt Relief",
  descriptor: "Credit card & unsecured debt relief",
  legalName: null,
  address: null,
  phone: "+18778700717", // VERIFY
  phoneDisplay: "+1 (877) 870-0717", // VERIFY
  email: "info@greenlightdebtrelief.com", // VERIFY
  hours: null,
  foundingYear: null,
  // Official logo supplied by Greenlight (trimmed of empty transparent margin only).
  logo: { src: "/brand/greenlight-logo.png", width: 382, height: 235, alt: "Greenlight Debt Relief" },
  youtubeVideoId: "92CTw_kb6x8",
  isLawFirm: false,
  consultationIsFree: true,
  legalLastUpdated: "2026-09-25",
};

/** Canonical origin, without trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://greenlightdebtrelief.com").replace(/\/+$/, "");

export const operatorName = siteConfig.legalName ?? siteConfig.name;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
