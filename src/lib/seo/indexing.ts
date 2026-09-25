/**
 * Single switch for search-engine visibility.
 *
 * SEO is intentionally DISABLED during this phase. While disabled:
 *   - every response carries `X-Robots-Tag: noindex, nofollow` (primary control)
 *   - every page renders `<meta name="robots" content="noindex, nofollow">`
 *   - robots.txt disallows all crawling and lists no sitemap
 *   - /sitemap.xml returns 404
 *   - canonical links and JSON-LD structured data are not emitted
 *
 * To "Enable SEO" later, set NEXT_PUBLIC_ENABLE_INDEXING=true and rebuild.
 * No other code changes are required.
 */
export const indexingEnabled = process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true";

export const noIndexValue = "noindex, nofollow, noarchive, nosnippet, noimageindex";
