import { absoluteUrl, operatorName, siteConfig, siteUrl } from "@/lib/site-config";

/**
 * Schema.org builders. Only facts that are configured (and therefore true) are
 * emitted — no ratings, reviews, awards or invented details.
 */
const orgId = `${siteUrl}/#organization`;
const siteId = `${siteUrl}/#website`;

export function organizationSchema() {
  const { address, phone, email } = siteConfig;
  return {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    ...(siteConfig.foundingYear ? { foundingDate: String(siteConfig.foundingYear) } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.country,
          },
        }
      : {}),
    ...(phone || email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            areaServed: "US",
            availableLanguage: "English",
            ...(phone ? { telephone: phone } : {}),
            ...(email ? { email } : {}),
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: siteUrl,
    name: siteConfig.name,
    inLanguage: "en-US",
    publisher: { "@id": orgId },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function webPageSchema({ path, name, description, type = "WebPage" }: { path: string; name: string; description: string; type?: string }) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": siteId },
    publisher: { "@id": orgId },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function articleSchema(a: { path: string; headline: string; description: string; datePublished: string; dateModified: string }) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(a.path)}#article`,
    headline: a.headline,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    mainEntityOfPage: absoluteUrl(a.path),
    image: absoluteUrl(`/og/resource-${a.path.split("/").pop()}`),
    inLanguage: "en-US",
    // Authored and published by the organization. No individual author is
    // named unless a real, verifiable person is added.
    author: { "@id": orgId, "@type": "Organization", name: operatorName },
    publisher: { "@id": orgId },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
