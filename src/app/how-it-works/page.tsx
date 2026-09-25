import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProcessSteps } from "@/components/sections/process-steps";
import { VideoSection } from "@/components/sections/video-section";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.howItWorks;
export const metadata: Metadata = pageMetadata(page, "how-it-works");

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        compact
        crumbs={[{ name: "How It Works", path: page.path }]}
        title="How It Works"
        intro="Getting started is simple — and there's no obligation."
      />
      <ProcessSteps />
      <VideoSection />
      <FinalCta location="how_it_works_final" />
    </>
  );
}
