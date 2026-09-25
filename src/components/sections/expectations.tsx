import { siteConfig } from "@/lib/site-config";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudies } from "./case-studies";

export function Expectations() {
  const commitments: { icon: IconName; title: string; text: string }[] = [
    { icon: "book", title: "Plain answers", text: "We explain what we find in everyday language, and we answer your questions." },
    { icon: "alert", title: "Honesty about limits", text: "We tell you what could not be found. We never promise to erase or eliminate a debt." },
    { icon: "user", title: "Your decision", text: "No pressure. You choose whether to take any next step, and when." },
    { icon: "lock", title: "Only what's needed", text: "We never ask for your Social Security number, full account numbers or bank passwords through this website." },
    {
      icon: "dollar",
      title: "Clear costs",
      text: siteConfig.initialReviewIsFree
        ? "Requesting a review is free. Any fee for a later service is explained in writing before you agree."
        : "Any fee is explained in writing before you agree to anything.",
    },
    { icon: "shield", title: "Official sources", text: "Our explanations are based on guidance from the CFPB, FTC and federal law — and we link to them." },
  ];

  return (
    <section aria-labelledby="expect-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              id="expect-title"
              eyebrow="What you can expect"
              title="Trust Is Earned With Transparency."
              intro={
                <>
                  <p>
                    You won&apos;t find invented reviews or inflated numbers here. Instead, here is what you can hold us to
                    when you request a review.
                  </p>
                </>
              }
            />
          </div>
          <ul className="reveal grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {commitments.map((c) => (
              <li key={c.title} className="border-t-2 border-ink pt-5">
                <Icon name={c.icon} className="size-7 text-brand-700" />
                <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <CaseStudies />
      </div>
    </section>
  );
}
