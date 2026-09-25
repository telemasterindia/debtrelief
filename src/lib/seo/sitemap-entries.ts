import { pages } from "@/lib/seo/pages";
import { resources } from "@/lib/content/resources";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export type SitemapEntry = { url: string; lastModified?: string; changeFrequency?: string; priority?: number };

/** Sitemap entries — only served when indexing is enabled (see lib/seo/indexing.ts). */
export function sitemapEntries(): SitemapEntry[] {
  const legal = new Set(["/privacy", "/terms", "/disclaimer"]);
  return [
    ...Object.values(pages).map((p) => ({
      url: absoluteUrl(p.path),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      ...(legal.has(p.path) ? { lastModified: siteConfig.legalLastUpdated } : {}),
    })),
    ...resources.map((r) => ({
      url: absoluteUrl(`/resources/${r.slug}`),
      lastModified: r.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
