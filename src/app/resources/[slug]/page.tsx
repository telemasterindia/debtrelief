import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleBodies } from "@/components/articles";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { getResource, resources } from "@/lib/content/resources";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return {};
  return buildMetadata({
    title: r.title,
    description: r.description,
    path: `/resources/${r.slug}`,
    ogImagePath: `/og/resource-${r.slug}`,
    type: "article",
    publishedTime: r.datePublished,
    modifiedTime: r.dateModified,
  });
}

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResource(slug);
  const Body = articleBodies[slug];
  if (!r || !Body) notFound();
  const path = `/resources/${r.slug}`;
  const related = resources.filter((x) => x.slug !== r.slug);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: r.title, description: r.description }),
          articleSchema({ path, headline: r.title, description: r.description, datePublished: r.datePublished, dateModified: r.dateModified }),
        )}
      />
      <PageHeader
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: r.shortTitle, path },
        ]}
        eyebrow="Guide"
        title={r.title}
        intro={r.description}
        meta={
          <>
            By {siteConfig.name} · Last reviewed <time dateTime={r.dateModified}>{formatDate(r.dateModified)}</time> · {r.readingMinutes} minute read
          </>
        }
      />
      <div className="container-page grid gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_20rem]">
        <article className="min-w-0">
          <Body />
          <p className="mt-10 max-w-[44rem] border-t border-line pt-6 text-base leading-relaxed text-muted">
            This guide is general information for U.S. consumers, not legal advice. Laws vary by state and can change. For
            advice about your situation, contact a licensed attorney.
          </p>
        </article>
        <aside aria-label="More guides" className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-xl">More guides</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            <li>
              <Link href="/debt-validation" className="flex min-h-14 items-center justify-between gap-3 py-3 text-lg font-medium text-ink hover:text-brand-700">
                What is debt validation?
                <Icon name="chevronRight" className="size-5 shrink-0" />
              </Link>
            </li>
            {related.map((x) => (
              <li key={x.slug}>
                <Link href={`/resources/${x.slug}`} className="flex min-h-14 items-center justify-between gap-3 py-3 text-lg font-medium text-ink hover:text-brand-700">
                  {x.shortTitle}
                  <Icon name="chevronRight" className="size-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <FinalCta location={`resource_${r.slug}`} />
    </>
  );
}
