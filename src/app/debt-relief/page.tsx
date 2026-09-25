/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ImportantToKnow } from "@/components/sections/important-to-know";
import { ProofSection } from "@/components/sections/proof-section";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaButton } from "@/components/ui/tracked-link";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.debtRelief;
export const metadata: Metadata = pageMetadata(page, "debt-relief");

export default function DebtReliefPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: page.path, name: page.title, description: page.description }),
          {
            "@type": "Service",
            name: "Credit card and unsecured debt relief",
            serviceType: "Debt relief",
            provider: { "@id": `${absoluteUrl("/")}#organization` },
            areaServed: { "@type": "Country", name: "United States" },
            url: absoluteUrl(page.path),
          },
        )}
      />
      <PageHeader
        crumbs={[{ name: "Debt Relief", path: page.path }]}
        eyebrow="Our services"
        title="Credit Card & Unsecured Debt Relief"
        intro={`${siteConfig.name} helps people who are struggling with credit card and other unsecured debt — with a customized plan, creditor negotiation and a real person to guide you.`}
      >
        <div className="mt-8">
          <CtaButton href="/free-consultation" location="debt_relief_header" variant="onDark" arrow>
            Get My Free Consultation
          </CtaButton>
        </div>
      </PageHeader>
      <ServicesSection />
      <ProcessSteps />
      <ProofSection />
      <ImportantToKnow />
      <FinalCta location="debt_relief_final" />
    </>
  );
}
