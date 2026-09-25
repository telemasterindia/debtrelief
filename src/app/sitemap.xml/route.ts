import { indexingEnabled } from "@/lib/seo/indexing";
import { sitemapEntries } from "@/lib/seo/sitemap-entries";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The sitemap is not exposed while the site is intentionally no-indexed. */
export function GET() {
  if (!indexingEnabled) return new Response("Not found", { status: 404 });
  const body = sitemapEntries()
    .map(
      (e) =>
        `<url><loc>${escape(e.url)}</loc>${e.lastModified ? `<lastmod>${e.lastModified}</lastmod>` : ""}${
          e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : ""
        }${e.priority !== undefined ? `<priority>${e.priority}</priority>` : ""}</url>`,
    )
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { "Content-Type": "application/xml" },
  });
}
