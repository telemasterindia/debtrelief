import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { indexingEnabled } from "./indexing";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  ogImagePath: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Use an absolute <title> (skip the brand template). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImagePath,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle,
}: MetaInput): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const image = { url: ogImagePath, width: 1200, height: 630, alt: title };
  return {
    title: absoluteTitle ? { absolute: fullTitle } : title,
    description,
    // Canonicals are only meaningful once the site may be indexed.
    ...(indexingEnabled ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      title: fullTitle,
      description,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

export function pageMetadata(entry: { path: string; title: string; description: string }, slug: string): Metadata {
  return buildMetadata({ ...entry, ogImagePath: `/og/${slug}` });
}
