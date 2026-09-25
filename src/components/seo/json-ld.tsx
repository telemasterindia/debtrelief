import { indexingEnabled } from "@/lib/seo/indexing";

/** Structured data is SEO-only and is not emitted while indexing is disabled. */
export function JsonLd({ data }: { data: object }) {
  if (!indexingEnabled) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" to prevent breaking out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
