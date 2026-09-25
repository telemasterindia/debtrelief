/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";
import { HeroStage } from "./hero-stage";

export function Hero() {
  const reassurances = [
    ...(siteConfig.consultationIsFree ? ["Free consultation"] : []),
    "No obligation",
    "Dedicated account manager",
  ];
  const { phone, phoneDisplay } = siteConfig;

  return (
    <HeroStage>
      <div className="container-page relative grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          {/* The official logo sits directly above in the white header. It has no reversed
              (light-on-dark) version, so it is not repeated on this dark background. */}
          <p className="text-lg font-semibold text-accent-300">Credit card &amp; unsecured debt relief</p>
          <h1 id="hero-title" className="mt-3 text-[2.5rem] leading-[1.08] text-white sm:text-[3.25rem] lg:text-[4rem]">
            Get Help With Your Credit Card Debt.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark sm:text-xl">
            {siteConfig.name} helps consumers explore options for managing credit card and unsecured debt. Talk with our
            experienced team — start with a {siteConfig.consultationIsFree ? "free, " : ""}no-obligation consultation.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
            {/* Primary action: largest, solid, highest contrast */}
            <CtaButton
              href="/free-consultation"
              location="hero"
              variant="primaryOnDark"
              className="min-h-16! px-8! text-xl!"
              arrow
            >
              Get My Free Consultation
            </CtaButton>
            {/* Secondary action: outlined, quieter */}
            {phone && phoneDisplay && (
              <TrackedLink
                href={`tel:${phone}`}
                event="phone_click"
                params={{ location: "hero" }}
                aria-label={`Call Greenlight at ${phoneDisplay}`}
                className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[var(--radius-control)] px-6 text-white ring-2 ring-inset ring-white/40 transition-colors hover:bg-white/10 hover:ring-white/80"
              >
                <Icon name="phone" className="size-6 shrink-0 text-accent-300" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-lg font-semibold">Call Greenlight</span>
                  <span className="text-base text-on-dark">{phoneDisplay}</span>
                </span>
              </TrackedLink>
            )}
          </div>

          {/* Supporting actions: text links */}
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1 text-lg">
            <Link href="/how-it-works" className="inline-flex min-h-12 items-center gap-2 font-medium text-on-dark underline decoration-white/40 underline-offset-[6px] hover:text-white hover:decoration-white">
              See how it works
              <Icon name="arrowRight" className="size-5" />
            </Link>
            <a href="#video" className="inline-flex min-h-12 items-center gap-2.5 font-medium text-on-dark underline decoration-white/40 underline-offset-[6px] hover:text-white hover:decoration-white">
              <Icon name="play" className="size-6 text-accent-300" />
              Watch our video
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/12 pt-6 text-[1.0625rem] text-on-dark">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Icon name="check" className="size-5 shrink-0 text-accent-300" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[1.0625rem] font-medium text-on-dark">
            <span aria-hidden="true" className="tracking-[0.12em] text-accent-300">★ ★ ★ ★ ★</span> 5-Star Rated Company
          </p>
        </div>
      </div>
    </HeroStage>
  );
}
