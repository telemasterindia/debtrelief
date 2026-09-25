import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { VideoSection } from "@/components/sections/video-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ProofSection } from "@/components/sections/proof-section";
import { ImportantToKnow } from "@/components/sections/important-to-know";
import { Expectations } from "@/components/sections/expectations";
import { KnowYourRights } from "@/components/sections/know-your-rights";
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
      <VideoSection />
      <TrustStrip />
      <ProblemSection />
      <ServicesSection />
      <ProcessSteps />
      <ProofSection />
      <ImportantToKnow />
      <Expectations />
      <KnowYourRights />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
