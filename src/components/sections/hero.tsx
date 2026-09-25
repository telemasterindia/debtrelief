import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { CtaButton, TrackedLink } from "@/components/ui/tracked-link";
import { HeroStage } from "./hero-stage";

export function Hero() {
  const reassurances = [
    siteConfig.consultationIsFree ? "Free, no-obligation consultation" : "No-obligation consultation",
    "Dedicated account manager",
    "Live online access",
  ];
  const { phone, phoneDisplay } = siteConfig;

  return (
    <HeroStage>
      <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-base font-medium text-on-dark">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent-400 motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
            Credit card &amp; unsecured debt relief
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.5rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.75rem]">
            A Clear, Customized Plan for Your Credit Card Debt.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark sm:text-xl">
            {siteConfig.name} builds a plan around a monthly amount you can afford and negotiates directly with your
            creditors. You&apos;ll have a dedicated account manager and live online access every step of the way.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton href="/free-consultation" location="hero" variant="onDark" className="px-6!" arrow>
              Get My Free Consultation
            </CtaButton>
            {phone && phoneDisplay && (
              <TrackedLink
                href={`tel:${phone}`}
                event="phone_click"
                params={{ location: "hero" }}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-control)] bg-white/5 px-6 text-lg font-semibold text-white ring-2 ring-inset ring-white/35 transition-colors hover:bg-white/12 hover:ring-white/70"
              >
                <Icon name="phone" className="size-5 text-accent-300" />
                Call {phoneDisplay}
              </TrackedLink>
            )}
          </div>
          <ul className="mt-9 flex flex-col gap-3 text-[1.0625rem] text-on-dark sm:flex-row sm:flex-wrap sm:gap-x-7">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-2.5">
                <Icon name="checkCircle" className="size-6 shrink-0 text-accent-300" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeroStage>
  );
}
