import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.contact;
export const metadata: Metadata = pageMetadata(page, "contact");

export default function ContactPage() {
  const { phone, phoneDisplay, email, hours, address } = siteConfig;
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description, type: "ContactPage" }))} />
      <PageHeader
        crumbs={[{ name: "Contact", path: page.path }]}
        eyebrow="Contact us"
        title="We're Here to Help."
        intro="Call us, email us, or send a message. We're happy to answer your questions about debt relief."
      />
      <div className="bg-canvas py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <ContactForm />
          <aside className="space-y-6" aria-label="Other ways to reach us">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="text-xl">Ready to get started?</h2>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">Request a free consultation online in a few minutes. There is no obligation.</p>
              <CtaButton href="/free-consultation" location="contact_sidebar" className="mt-5 w-full" size="md" arrow>
                Get My Free Consultation
              </CtaButton>
            </div>
            {(phone || email || address) && (
              <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h2 className="text-xl">Contact details</h2>
                <ul className="mt-4 space-y-4 text-lg">
                  {phone && phoneDisplay && (
                    <li className="flex gap-3">
                      <Icon name="phone" className="mt-0.5 size-6 shrink-0 text-brand-700" />
                      <span>
                        <TrackedLink href={`tel:${phone}`} event="phone_click" params={{ location: "contact_page" }} className="link">{phoneDisplay}</TrackedLink>
                        {hours && <span className="block text-[1.0625rem] text-muted">{hours}</span>}
                      </span>
                    </li>
                  )}
                  {email && (
                    <li className="flex gap-3">
                      <Icon name="mail" className="mt-0.5 size-6 shrink-0 text-brand-700" />
                      <TrackedLink href={`mailto:${email}`} event="email_click" params={{ location: "contact_page" }} className="link break-all">{email}</TrackedLink>
                    </li>
                  )}
                  {address && (
                    <li className="flex gap-3">
                      <Icon name="building" className="mt-0.5 size-6 shrink-0 text-brand-700" />
                      <address className="not-italic">{address.street}<br />{address.city}, {address.region} {address.postalCode}</address>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h2 className="text-xl">Problems with a debt collector?</h2>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">You can also contact these government agencies directly.</p>
              <ul className="mt-4 space-y-2 text-[1.0625rem]">
                <li><a className="link" href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer">Submit a complaint to the CFPB<span className="sr-only"> (opens in a new tab)</span></a></li>
                <li><a className="link" href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer">Report fraud to the FTC<span className="sr-only"> (opens in a new tab)</span></a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
