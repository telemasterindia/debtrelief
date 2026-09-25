import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ReviewForm } from "@/components/forms/review-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.requestReview;
export const metadata: Metadata = pageMetadata(page, "request-review");

export default function RequestReviewPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        compact
        crumbs={[{ name: "Request a Review", path: page.path }]}
        eyebrow="Four short steps"
        title="Request a Debt Validation Review"
        intro="Tell us a little about the debt and how to reach you. We'll contact you to review the information connected to the account and explain what may be available."
      />
      <div className="bg-canvas py-10 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-12">
          <div className="min-w-0">
            <ReviewForm />
          </div>
          <aside className="space-y-6" aria-label="About this form">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="text-xl">Before you start</h2>
              <ul className="mt-4 space-y-3.5 text-[1.0625rem] leading-snug">
                {[
                  "It takes just a few minutes.",
                  siteConfig.initialReviewIsFree ? "Requesting a review is free." : "Any fee is explained in writing first.",
                  "No Social Security number or account numbers.",
                  "You can go back and change any answer.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-success-700" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="text-xl">Please keep in mind</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-body">
                A review helps you understand the information behind an account. It does not erase a debt you owe, and no
                result is guaranteed.
                {siteConfig.isLawFirm ? "" : ` ${siteConfig.name} is not a law firm and does not give legal advice.`}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border-2 border-[#f1dca6] bg-notice-50 p-6">
              <h2 className="flex items-center gap-2 text-xl">
                <Icon name="alert" className="size-6 text-notice-800" />
                Received court papers?
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-body">
                Don&apos;t ignore them. Respond by the deadline and contact a licensed attorney right away.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
