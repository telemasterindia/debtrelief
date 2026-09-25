import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";

export function FinalCta({ title = "Talk With an Experienced Team.", location = "final_cta" }: { title?: string; location?: string }) {
  const { phone, phoneDisplay, email } = siteConfig;
  return (
    <section id="contact-us" aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="on-dark reveal relative isolate overflow-hidden rounded-[1.5rem] bg-deep-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgb(55_129_8/0.45)_0%,rgb(22_27_23/0)_70%)]" />
          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[2rem] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-dark sm:text-xl">
            Tell us about your situation. Our team will review it with you and explain the options available — then you
            decide how you want to proceed.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/free-consultation" location={location} variant="primaryOnDark" arrow>
              Get My Free Consultation
            </CtaButton>
            {phone && phoneDisplay && (
              <TrackedLink
                href={`tel:${phone}`}
                event="phone_click"
                params={{ location }}
                aria-label={`Call Greenlight at ${phoneDisplay}`}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-control)] bg-white/5 px-7 text-lg font-semibold text-white ring-2 ring-inset ring-white/35 hover:bg-white/12"
              >
                <Icon name="phone" className="size-5 text-accent-300" />
                Call {phoneDisplay}
              </TrackedLink>
            )}
          </div>
          {email && (
            <p className="mt-8 text-lg text-on-dark">
              Or email us at{" "}
              <TrackedLink href={`mailto:${email}`} event="email_click" params={{ location }} className="font-semibold text-white underline underline-offset-4">
                {email}
              </TrackedLink>
            </p>
          )}
          <p className="mx-auto mt-4 max-w-2xl text-base text-on-dark-muted">
            {siteConfig.consultationIsFree ? "Free consultation. " : ""}No obligation.{" "}
            <Link href="/disclaimer" className="underline underline-offset-4 hover:text-white">
              Disclosures
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
