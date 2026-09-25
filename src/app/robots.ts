import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { indexingEnabled } from "@/lib/seo/indexing";

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) {
    // Pre-launch: discourage all crawling. The noindex header/meta tags are the
    // primary control; this is a secondary signal. No sitemap is advertised.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
