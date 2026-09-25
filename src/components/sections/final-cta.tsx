import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CtaButton } from "@/components/ui/tracked-link";

export function FinalCta({ title = "Get Clear Answers About a Debt.", location = "final_cta" }: { title?: string; location?: string }) {
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="on-dark reveal relative isolate overflow-hidden rounded-[1.5rem] bg-navy-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,#1f4f9a_0%,rgba(8,23,49,0)_70%)]" />
          <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10 opacity-60" />
          <h2 id="final-cta-title" className="mx-auto max-w-3xl text-[2rem] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-dark sm:text-xl">
            Tell us about the debt in a few short steps. We&apos;ll contact you to review the information connected to the
            account and explain the options that may be available.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/request-review" location={location} variant="onDark" arrow>
              Request a Validation Review
            </CtaButton>
            <CtaButton href="/contact" location={`${location}_contact`} variant="ghostDark">
              Ask a Question First
            </CtaButton>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-on-dark-muted">
            {siteConfig.initialReviewIsFree ? "Requesting a review is free. " : ""}A request does not create any obligation
            and does not guarantee a particular result.{" "}
            <Link href="/disclaimer" className="font-semibold text-white underline underline-offset-4">
              Read our disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
