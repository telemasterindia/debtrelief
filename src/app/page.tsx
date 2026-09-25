import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { ValidationExplainer } from "@/components/sections/validation-explainer";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ReviewedItems } from "@/components/sections/reviewed-items";
import { Expectations } from "@/components/sections/expectations";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.home;

export const metadata: Metadata = buildMetadata({ ...page, ogImagePath: "/og/home", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ValidationExplainer />
      <ProcessSteps />
      <ReviewedItems />
      <Expectations />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
