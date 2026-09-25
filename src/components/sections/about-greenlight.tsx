/*
 * CONTENT_REQUIRES_VERIFICATION — company description from the owner's brief.
 */
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-heading";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";

/** Short company introduction for the homepage. */
export function AboutGreenlight() {
  const { name, foundingYear, phone, phoneDisplay } = siteConfig;
  return (
    <section aria-labelledby="about-title" className="bg-canvas py-20 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="reveal min-w-0">
          <Eyebrow>About us</Eyebrow>
          <h2 id="about-title" className="mt-3 text-[2rem] sm:text-[2.5rem]">
            {foundingYear ? `Helping Consumers Since ${foundingYear}.` : `About ${name}.`}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
            <p>
              {name} helps consumers explore options for managing credit card and other unsecured debt.
              {foundingYear ? ` We've been working in the debt-relief industry since ${foundingYear}.` : ""}
            </p>
            <p>
              Our experienced team takes the time to understand your situation, explains the options available to you, and
              works through the process with you — so you can decide the next step that&apos;s right for you.
            </p>
          </div>
          <Link href="/about" className="link mt-6 inline-flex min-h-12 items-center gap-2 text-lg">
            More about {name}
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </div>
        <div className="reveal min-w-0 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-xl font-semibold text-ink">Talk with our team</p>
          <p className="mt-2 text-lg text-muted">Tell us about your situation. There&apos;s no obligation.</p>
          <div className="mt-6 flex flex-col gap-3">
            <CtaButton href="/free-consultation" location="about_section" className="w-full whitespace-normal!" arrow>
              Get My Free Consultation
            </CtaButton>
            {phone && phoneDisplay && (
              <TrackedLink
                href={`tel:${phone}`}
                event="phone_click"
                params={{ location: "about_section" }}
                aria-label={`Call Greenlight at ${phoneDisplay}`}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[var(--radius-control)] px-6 text-lg font-semibold text-ink ring-2 ring-inset ring-line-strong hover:ring-ink"
              >
                <Icon name="phone" className="size-5 text-brand-700" />
                Call {phoneDisplay}
              </TrackedLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
