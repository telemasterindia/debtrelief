import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FaqList } from "@/components/sections/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Notice } from "@/components/ui/notice";
import { faqPlainText, faqs } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { faqSchema, graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.faq;
export const metadata: Metadata = pageMetadata(page, "faq");

const groups = [
  { id: "basics", title: "Debt validation basics" },
  { id: "process", title: "The review process" },
  { id: "costs-privacy", title: "Costs, privacy and legal advice" },
] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: page.path, name: page.title, description: page.description }),
          faqSchema(faqs.map((f) => ({ question: f.question, answer: faqPlainText(f) }))),
        )}
      />
      <PageHeader
        crumbs={[{ name: "FAQ", path: page.path }]}
        eyebrow="Frequently asked questions"
        title="Debt Validation Questions, Answered"
        intro="Clear answers to the questions people ask most. Select a question to read the answer."
      />
      <div className="container-page py-14 sm:py-20">
        <Notice tone="info" title="The most important things to know" className="max-w-4xl">
          Debt validation helps you get accurate information about a debt. It does not erase a debt you owe, and no result
          is guaranteed.{" "}
          {siteConfig.isLawFirm ? "This information is general, not legal advice." : `${siteConfig.name} is not a law firm and does not give legal advice.`}{" "}
          If you have been sued, respond by the court&apos;s deadline and contact a licensed attorney.
        </Notice>

        <nav aria-label="FAQ topics" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-flex min-h-12 items-center rounded-full border-2 border-line-strong px-5 text-[1.0625rem] font-semibold text-ink hover:border-ink">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-16">
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
              <h2 id={`${g.id}-title`} className="mb-6 text-3xl">
                {g.title}
              </h2>
              <FaqList items={faqs.filter((f) => f.category === g.id)} />
            </section>
          ))}
        </div>
      </div>
      <FinalCta title="Still Have Questions?" location="faq_final" />
    </>
  );
}
