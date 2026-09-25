import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.freeConsultation;
export const metadata: Metadata = pageMetadata(page, "free-consultation");

export default function FreeConsultationPage() {
  const { phone, phoneDisplay } = siteConfig;
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description }))} />
      <PageHeader
        compact
        crumbs={[{ name: "Free Consultation", path: page.path }]}
        eyebrow="Four short steps"
        title={siteConfig.consultationIsFree ? "Request Your Free Consultation" : "Request a Consultation"}
        intro="Tell us a little about your debt and how to reach you. A Greenlight consultant will contact you to talk through your options."
      />
      <div className="bg-canvas py-10 sm:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-12">
          <div className="min-w-0">
            <ConsultationForm />
          </div>
          <aside className="space-y-6" aria-label="About this form">
            {phone && phoneDisplay && (
              <div className="on-dark rounded-[var(--radius-card)] bg-deep-900 p-6 text-on-dark">
                <h2 className="text-xl text-white">Prefer to talk now?</h2>
                <p className="mt-2 text-[1.0625rem] leading-relaxed">Call us and speak with a consultant.</p>
                <TrackedLink
                  href={`tel:${phone}`}
                  event="phone_click"
                  params={{ location: "consultation_sidebar" }}
                  className="mt-4 inline-flex min-h-12 items-center gap-2 text-xl font-bold text-white underline underline-offset-4"
                >
                  <Icon name="phone" className="size-6 text-accent-300" />
                  {phoneDisplay}
                </TrackedLink>
              </div>
            )}
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="text-xl">Before you start</h2>
              <ul className="mt-4 space-y-3.5 text-[1.0625rem] leading-snug">
                {[
                  "It takes just a few minutes.",
                  siteConfig.consultationIsFree ? "The consultation is free, with no obligation." : "There is no obligation.",
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
            <p className="px-1 text-base leading-relaxed text-muted">
              Results vary and not all debts qualify. Whether to move forward is always your decision.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
