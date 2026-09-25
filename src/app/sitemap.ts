import type { MetadataRoute } from "next";
import { pages } from "@/lib/seo/pages";
import { resources } from "@/lib/content/resources";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
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
