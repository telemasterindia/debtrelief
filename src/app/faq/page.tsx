import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FaqList } from "@/components/sections/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPlainText, faqs } from "@/lib/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { faqSchema, graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.faq;
export const metadata: Metadata = pageMetadata(page, "faq");

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
        compact
        crumbs={[{ name: "FAQs", path: page.path }]}
        title="Frequently Asked Questions"
        intro="Quick answers to common questions. Select a question to read the answer."
      />
      <div className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <FaqList items={faqs} headingLevel="h2" />
        </div>
      </div>
      <FinalCta title="Still Have Questions? Let's Talk." location="faq_final" />
    </>
  );
}
