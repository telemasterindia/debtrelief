import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ReviewedItems } from "@/components/sections/reviewed-items";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SourceList } from "@/components/ui/source-list";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.howItWorks;
export const metadata: Metadata = pageMetadata(page, "how-it-works");

const options = [
  { title: "Ask the collector for more information", text: "Request verification of the debt or the original creditor's name and address, in writing." },
  { title: "Dispute information that looks wrong", text: "If the amount, the creditor or the account doesn't match your records, you can dispute it." },
  { title: "Arrange to pay, if the debt is yours", text: "If the debt is accurate, you may choose to pay it or discuss a payment plan with the creditor or collector." },
  { title: "Speak with a licensed attorney", text: "Especially if you have been sued, or have questions about your rights under your state's laws." },
  { title: "Talk with a nonprofit credit counselor", text: "If you are dealing with several debts, a reputable nonprofit counselor can help you look at your whole budget." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        crumbs={[{ name: "How It Works", path: page.path }]}
        eyebrow="The process"
        title="How a Debt Validation Review Works"
        intro="A clear, step-by-step look at what happens after you request a review — what we ask, what is looked at, and how you learn your options."
      />

      <ProcessSteps showCta={false} />

      <ReviewedItems />

      <section aria-labelledby="options-title" className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="options-title"
              eyebrow="After the review"
              title="Steps That May Be Available"
              intro={
                <>
                  <p>Every situation is different. Depending on what the review finds, next steps may include the options on this page.</p>
                  <p className="mt-4">
                    We&apos;ll explain which ones may fit your situation. The choice is always yours.
                    {siteConfig.isLawFirm ? "" : " We do not give legal advice."}
                  </p>
                </>
              }
            />
          </div>
          <ul className="reveal space-y-4">
            {options.map((o) => (
              <li key={o.title} className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                <Icon name="chevronRight" className="mt-1 size-6 shrink-0 text-brand-700" />
                <div>
                  <h3 className="text-xl font-semibold">{o.title}</h3>
                  <p className="mt-1.5 text-lg leading-relaxed text-muted">{o.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="timing-title" className="bg-canvas py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="reveal lg:col-span-1">
            <SectionHeading id="timing-title" eyebrow="Good to know" title="Timing and Deadlines" />
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed lg:col-span-2">
            <p>
              How long a review takes depends on your situation and on how quickly information about the account can be
              gathered. After you submit a request, we&apos;ll contact you and give you a realistic timeframe.
            </p>
            <p>
              <strong className="font-semibold text-ink">Your deadlines still apply.</strong> The validation notice from a
              debt collector shows the date by which you can dispute the debt. If you have received court papers, you must
              respond by the court&apos;s deadline. Please don&apos;t wait on a review if a deadline is close.
            </p>
            <SourceList ids={["cfpbValidationInfo", "cfpbWhatToDo"]} />
          </div>
        </div>
      </section>

      <FinalCta location="how_it_works_final" />
    </>
  );
}
