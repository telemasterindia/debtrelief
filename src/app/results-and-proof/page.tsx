import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { ProofGallery } from "@/components/proof/proof-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { proofDisclaimer, proofDocuments } from "@/lib/content/proof-documents";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.resultsProof;
export const metadata: Metadata = pageMetadata(page, "results-and-proof");

export default function ResultsAndProofPage() {
  const showPlaceholders = proofDocuments.length === 0 && process.env.NODE_ENV !== "production";

  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />

      {/* 1. Hero */}
      <PageHeader
        crumbs={[{ name: "Results & Proof", path: page.path }]}
        title="Results & Proof"
        intro={
          <>
            <p className="text-xl font-semibold text-white sm:text-2xl">Real examples. Real documentation.</p>
            <p className="mt-3">
              Every situation is different, but these examples show the types of outcomes and documentation consumers may
              receive during the debt-relief process.
            </p>
          </>
        }
      />

      <section aria-labelledby="proof-docs-title" className="bg-canvas py-14 sm:py-20">
        <div className="container-page">
          {/* 2. Short trust / disclaimer statement */}
          <div className="reveal mx-auto flex max-w-4xl gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-6">
            <Icon name="shield" className="mt-0.5 size-7 shrink-0 text-brand-700" />
            <p className="text-[1.0625rem] leading-relaxed text-body sm:text-lg">
              Documents are shared with personal information removed to protect our clients&apos; privacy. They are
              examples from individual cases — not a promise of any particular result.
            </p>
          </div>

          {/* 3. Proof document grid */}
          <h2 id="proof-docs-title" className="sr-only">
            Proof documents
          </h2>
          <div className="mt-12">
            {proofDocuments.length > 0 ? (
              <ProofGallery documents={proofDocuments} />
            ) : showPlaceholders ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 10 }, (_, i) => (
                  <li key={i} className="flex aspect-[4/3] flex-col items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-danger-700 bg-danger-50 p-6 text-center">
                    <p className="text-lg font-bold text-danger-700">Proof document {String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-2 text-base text-body">Slot for a reviewed, redacted PDF. See public/proof/README.md.</p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-danger-700">Development placeholder</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mx-auto max-w-2xl text-center text-lg text-muted">
                Documents will appear here as they are added.
              </p>
            )}
          </div>

          {/* 4. Every situation is different */}
          <p className="reveal mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted">
            <strong className="font-semibold text-ink">Every situation is different.</strong> {proofDisclaimer}
          </p>
        </div>
      </section>

      {/* 5. Consultation CTA */}
      <FinalCta
        title="Want to See What Options May Be Available for You?"
        body="Talk with our experienced team about your situation and explore your options."
        location="results_proof_final"
      />
    </>
  );
}
