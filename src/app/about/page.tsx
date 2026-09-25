/*
 * CONTENT_REQUIRES_VERIFICATION
 * Company description written from the owner's brief. Replace with Greenlight's
 * existing About Us wording where it differs.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { BenefitsStrip } from "@/components/sections/benefits-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyGreenlight } from "@/lib/content/greenlight";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.about;
export const metadata: Metadata = pageMetadata(page, "about");

export default function AboutPage() {
  const { name, foundingYear } = siteConfig;
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description, type: "AboutPage" }))} />
      <PageHeader
        compact
        crumbs={[{ name: "About", path: page.path }]}
        title={`About ${name}`}
        intro={
          foundingYear
            ? `Helping consumers explore debt-relief options since ${foundingYear}.`
            : "Helping consumers explore options for credit card and unsecured debt."
        }
      />
      <BenefitsStrip />

      <section aria-labelledby="story-title" className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading id="story-title" eyebrow="Who we are" title="A Personal Approach to Debt Relief." className="reveal" />
          <div className="reveal space-y-5 text-lg leading-relaxed">
            <p>
              {name} helps people with credit card and unsecured debt understand their options and find a path that fits
              their situation.
            </p>
            <p>
              It starts with a {siteConfig.consultationIsFree ? "free, " : ""}no-obligation consultation. You&apos;ll have a
              dedicated account manager and live online access, and every decision along the way is yours.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-canvas py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading id="values-title" eyebrow="Why Greenlight" title="What You Can Expect." className="reveal" />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyGreenlight.map((w) => (
              <li key={w.title} className="reveal border-t-2 border-ink pt-5">
                <Icon name={w.icon} className="size-7 text-brand-700" />
                <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta location="about_final" />
    </>
  );
}
