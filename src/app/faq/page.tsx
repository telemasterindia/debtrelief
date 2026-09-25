import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FaqList } from "@/components/sections/faq-list";
import { VideoPlayer } from "@/components/media/video-player";
import { siteConfig } from "@/lib/site-config";
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
        <section aria-labelledby="faq-video-title" className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <h2 id="faq-video-title" className="text-center text-[2rem] sm:text-[2.5rem]">
            Watch Our FAQ Video
          </h2>
          <div className="mt-10">
            <VideoPlayer videoId={siteConfig.faqVideoId} title={`${siteConfig.name} FAQ video`} />
          </div>
        </section>
      </div>
      <FinalCta title="Still Have Questions? Let's Talk." location="faq_final" />
    </>
  );
}
