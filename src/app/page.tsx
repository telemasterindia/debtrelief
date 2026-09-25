import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BenefitsStrip } from "@/components/sections/benefits-strip";
import { HelpWith } from "@/components/sections/help-with";
import { ProcessSteps } from "@/components/sections/process-steps";
import { VideoSection } from "@/components/sections/video-section";
import { WhyGreenlight } from "@/components/sections/why-greenlight";
import { ProofSection } from "@/components/sections/proof-section";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, videoSchema, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.home;

export const metadata: Metadata = buildMetadata({ ...page, ogImagePath: "/og/home", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }), videoSchema())} />
      <Hero />
      <BenefitsStrip />
      <HelpWith />
      <ProcessSteps />
      <VideoSection />
      <WhyGreenlight />
      <ProofSection />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
