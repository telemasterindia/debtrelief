import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { operatorName, siteConfig } from "@/lib/site-config";

const page = pages.about;
export const metadata: Metadata = pageMetadata(page, "about");

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: "book", title: "Plain language", text: "We write for everyday readers. If we use a legal term, we explain it." },
  { icon: "compass", title: "Transparency", text: "We explain what we look at, what we find and what we could not find." },
  { icon: "alert", title: "No false promises", text: "We never promise to erase a debt, guarantee savings or predict a legal outcome." },
  { icon: "user", title: "Respect", text: "Debt can happen to anyone. We treat every person with patience and without judgment." },
  { icon: "lock", title: "Privacy", text: "We ask only for what we need, and we never sell your personal information." },
  { icon: "scale", title: "Accuracy", text: "Our explanations are based on federal law and guidance from the CFPB and FTC, with links to the source." },
];

export default function AboutPage() {
  const { address, email, phoneDisplay, phone } = siteConfig;
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description, type: "AboutPage" }))} />
      <PageHeader
        crumbs={[{ name: "About", path: page.path }]}
        eyebrow="About us"
        title="Clear Information Should Come Before Any Payment."
        intro={`${siteConfig.name} helps U.S. consumers understand the information behind a debt in collection — calmly, clearly and without pressure.`}
      />

      <section aria-labelledby="why-title" className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading id="why-title" eyebrow="Why we exist" title="You're Entitled to Clear Information." className="reveal" />
          <div className="reveal space-y-5 text-lg leading-relaxed">
            <p>
              When a debt collector calls, many people feel pressured to pay right away — even when they don&apos;t
              recognize the company, the account or the amount.
            </p>
            <p>
              Federal law gives consumers the right to clear information about a debt in collection. But the notices can be
              hard to read, and deadlines are easy to miss.
            </p>
            <p>
              We built {siteConfig.name} to change that: to explain the process in plain English, to help people look at the
              information behind an account, and to make sure they understand their options before they decide anything.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="bg-canvas py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading id="principles-title" eyebrow="How we work" title="The Standards We Hold Ourselves To" className="reveal" />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="reveal border-t-2 border-ink pt-5">
                <Icon name={p.icon} className="size-7 text-brand-700" />
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="operator-title" className="py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <SectionHeading id="operator-title" eyebrow="Who we are" title="Who Operates This Website" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
              <p>
                This website is operated by <strong className="text-ink">{operatorName}</strong>.
              </p>
              {address && (
                <p>
                  Mailing address: {address.street}, {address.city}, {address.region} {address.postalCode}
                </p>
              )}
              {phone && phoneDisplay && <p>Phone: <a className="link" href={`tel:${phone}`}>{phoneDisplay}</a></p>}
              {email && <p>Email: <a className="link" href={`mailto:${email}`}>{email}</a></p>}
              <p>
                You can always reach us through our <Link href="/contact" className="link">contact page</Link>.
              </p>
            </div>
          </div>
          <div className="reveal space-y-5">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl">What we are not</h3>
              <ul className="mt-4 space-y-3 text-lg leading-snug">
                {!siteConfig.isLawFirm && (
                  <li className="flex gap-3"><Icon name="x" className="mt-0.5 size-6 shrink-0 text-danger-700" />We are not a law firm, and we do not give legal advice.</li>
                )}
                <li className="flex gap-3"><Icon name="x" className="mt-0.5 size-6 shrink-0 text-danger-700" />We are not a government agency, and we are not affiliated with the CFPB or FTC.</li>
                <li className="flex gap-3"><Icon name="x" className="mt-0.5 size-6 shrink-0 text-danger-700" />We do not promise to remove, reduce or settle any debt.</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl">Our editorial standards</h3>
              <p className="mt-3 text-lg leading-relaxed">
                Our guides are based on primary sources — federal law, the CFPB&apos;s debt collection rule and official
                consumer guidance — and link to them directly. Each guide shows the date it was last reviewed. If you spot
                something that looks wrong, please <Link href="/contact" className="link">let us know</Link> and we&apos;ll
                correct it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta location="about_final" />
    </>
  );
}
