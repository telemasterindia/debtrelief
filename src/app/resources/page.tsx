import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { SourceList } from "@/components/ui/source-list";
import { resources } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.resources;
export const metadata: Metadata = pageMetadata(page, "resources");

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description, type: "CollectionPage" }))} />
      <PageHeader
        crumbs={[{ name: "Resources", path: page.path }]}
        eyebrow="Guides"
        title="Free Guides to Debt Relief and Your Rights"
        intro="Short, practical guides based on federal law and official CFPB, FTC and IRS guidance. Free to read — no sign-up required."
      />
      <div className="container-page py-14 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="reveal md:col-span-2">
            <Link
              href="/resources/debt-relief-what-to-know"
              className="group flex flex-col gap-6 rounded-[var(--radius-card)] bg-deep-900 p-8 text-on-dark shadow-[var(--shadow-raised)] sm:flex-row sm:items-center sm:p-10"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
                <Icon name="document" className="size-9" />
              </span>
              <span className="flex-1">
                <span className="text-lg font-semibold text-accent-300">Start here</span>
                <span className="mt-1 block text-2xl font-bold text-white sm:text-3xl">Debt Relief: What to Know Before You Enroll</span>
                <span className="mt-2 block text-lg text-on-dark">How it works, the trade-offs, the fee rules and the alternatives — explained honestly.</span>
              </span>
              <Icon name="arrowRight" className="size-7 shrink-0 text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
          <li className="reveal">
            <Link
              href="/debt-validation"
              className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)] sm:p-8"
            >
              <span className="text-base text-muted">8 minute read</span>
              <span className="mt-2 text-2xl font-bold leading-snug text-ink group-hover:text-brand-700">What Is Debt Validation? Your Rights With Debt Collectors</span>
              <span className="mt-3 flex-1 text-lg leading-relaxed text-muted">Your right to information about a debt in collection, key deadlines, and what validation does not do.</span>
              <span className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-brand-700">
                Read the guide
                <Icon name="arrowRight" className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
          {resources.filter((r) => r.slug !== "debt-relief-what-to-know").map((r) => (
            <li key={r.slug} className="reveal">
              <Link
                href={`/resources/${r.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)] sm:p-8"
              >
                <span className="text-base text-muted">{r.readingMinutes} minute read</span>
                <span className="mt-2 text-2xl font-bold leading-snug text-ink group-hover:text-brand-700">{r.title}</span>
                <span className="mt-3 flex-1 text-lg leading-relaxed text-muted">{r.summary}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-brand-700">
                  Read the guide
                  <Icon name="arrowRight" className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="official-title" className="mt-16 rounded-[var(--radius-card)] border border-line bg-canvas p-7 sm:p-10">
          <h2 id="official-title" className="text-2xl sm:text-3xl">Official government resources</h2>
          <p className="mt-3 max-w-3xl text-lg text-muted">
            These free resources come directly from U.S. government agencies that oversee debt collection.
          </p>
          <SourceList title="Government resources" className="mt-6" ids={["cfpbWhatToDo", "cfpbValidationInfo", "ftcDebtCollectionFaqs", "ftcFakeCollectors", "cfpbComplaint", "ftcReportFraud"]} />
        </section>
      </div>
      <FinalCta location="resources_final" />
    </>
  );
}
