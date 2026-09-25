import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";

export function FinalCta({ title = "Take the First Step Toward Financial Freedom.", location = "final_cta" }: { title?: string; location?: string }) {
  const { phone, phoneDisplay } = siteConfig;
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="on-dark reveal relative isolate overflow-hidden rounded-[1.5rem] bg-deep-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgb(55_129_8/0.45)_0%,rgb(22_27_23/0)_70%)]" />
          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[2rem] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-dark sm:text-xl">
            Talk with {siteConfig.name} about your debts and your budget. We&apos;ll explain your options honestly — and
            if our program may fit, how a customized plan would work.
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
                className="inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-control)] bg-white/5 px-7 text-lg font-semibold text-white ring-2 ring-inset ring-white/35 hover:bg-white/12"
              >
                <Icon name="phone" className="size-5 text-accent-300" />
                Call {phoneDisplay}
              </TrackedLink>
            )}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-on-dark-muted">
            {siteConfig.consultationIsFree ? "The consultation is free. " : ""}There is no obligation. Results vary and are
            not guaranteed.{" "}
            <Link href="/disclaimer" className="font-semibold text-white underline underline-offset-4">
              Read important disclosures
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
