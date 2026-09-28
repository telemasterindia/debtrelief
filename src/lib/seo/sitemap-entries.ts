import { allServices, servicePath } from "@/lib/content/services";
import { pages } from "@/lib/seo/pages";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export type SitemapEntry = { url: string; lastModified?: string; changeFrequency?: string; priority?: number };

/** Sitemap entries — only served when indexing is enabled (see lib/seo/indexing.ts). */
export function sitemapEntries(): SitemapEntry[] {
  const legal = new Set(["/privacy", "/terms"]);
  return [
    ...Object.values(pages).map((p) => ({
      url: absoluteUrl(p.path),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(legal.has(p.path) ? { lastModified: siteConfig.legalLastUpdated } : {}),
    })),
    ...allServices.map((s) => ({ url: absoluteUrl(servicePath(s.slug)), changeFrequency: "monthly", priority: 0.6 })),
  ];
}
