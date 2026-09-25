import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ImportantToKnow } from "@/components/sections/important-to-know";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.howItWorks;
export const metadata: Metadata = pageMetadata(page, "how-it-works");

const prepare = [
  "A list of your debts — who you owe and roughly how much",
  "Your monthly income and main expenses",
  "Any recent letters from creditors or debt collectors",
  "Any court papers, if you have received them",
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        crumbs={[{ name: "How It Works", path: page.path }]}
        eyebrow="Our process"
        title="How Greenlight Debt Relief Works"
        intro="A clear, step-by-step look at what happens — from your free consultation, to your customized plan, to negotiating with your creditors."
      />

      <ProcessSteps showCta={false} />

      <section aria-labelledby="prepare-title" className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="prepare-title"
            eyebrow="Before your consultation"
            title="What to Have Ready"
            intro="You don't need anything to get started — but having these nearby helps us give you a clearer picture."
            className="reveal"
          />
          <ul className="reveal space-y-4">
            {prepare.map((p) => (
              <li key={p} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 text-lg shadow-[var(--shadow-card)]">
                <Icon name="check" className="mt-0.5 size-6 shrink-0 text-success-700" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ImportantToKnow />
      <FinalCta location="how_it_works_final" />
    </>
  );
}
