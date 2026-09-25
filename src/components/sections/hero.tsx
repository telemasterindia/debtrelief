import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { CtaButton } from "@/components/ui/tracked-link";
import { HeroStage } from "./hero-stage";

export function Hero() {
  const reassurances = [
    siteConfig.initialReviewIsFree ? "Free to request" : "No obligation to buy",
    "No Social Security number needed",
    "Plain-English answers",
  ];

  return (
    <HeroStage>
      <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-base font-medium text-on-dark">
            <span aria-hidden="true" className="size-2 rounded-full bg-cyan-400 motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
            For U.S. consumers contacted by a debt collector
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.5rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.75rem]">
            Know What You&apos;re Being Asked to Pay For.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark sm:text-xl">
            Federal rules give you the right to clear information about a debt in collection — who is collecting it, who
            it is owed to, and how the amount was calculated. We help you review that information and understand your
            options, in plain English.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton href="/request-review" location="hero" variant="onDark" className="px-6!" arrow>
              Request a Validation Review
            </CtaButton>
            <CtaButton href="/debt-validation" location="hero_secondary" variant="ghostDark" className="px-6!">
              How Debt Validation Works
            </CtaButton>
          </div>
          <ul className="mt-9 flex flex-col gap-3 text-[1.0625rem] text-on-dark sm:flex-row sm:flex-wrap sm:gap-x-7">
            {reassurances.map((r) => (
              <li key={r} className="flex items-center gap-2.5">
                <Icon name="checkCircle" className="size-6 shrink-0 text-cyan-300" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeroStage>
  );
}
