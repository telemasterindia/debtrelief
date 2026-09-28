import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { ServiceGroups } from "@/components/sections/service-groups";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceDisclaimer, serviceGroups } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.services;
export const metadata: Metadata = pageMetadata(page, "services");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        compact
        crumbs={[{ name: "Services", path: page.path }]}
        title="Services"
        intro="Debt and financial challenges come in many forms. Choose a topic to learn about your options — or talk with our team and we'll help you work out where to start."
      />
      <section aria-label="Service categories" className="bg-canvas py-14 sm:py-20">
        <div className="container-page">
          <ServiceGroups groups={serviceGroups} />
          <p className="mt-10 text-center text-base text-muted">{serviceDisclaimer}</p>
        </div>
      </section>
      <FinalCta
        title="Not Sure Where to Start?"
        body="Tell us about your situation. Our team can help you understand which options may fit and what your next steps could be."
        location="services_final"
      />
    </>
  );
}
