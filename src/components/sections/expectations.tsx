import { siteConfig } from "@/lib/site-config";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function Expectations() {
  const commitments: { icon: IconName; title: string; text: string }[] = [
    { icon: "book", title: "Plain answers", text: "We explain your options in everyday language and answer every question." },
    { icon: "alert", title: "No false promises", text: "We never guarantee to eliminate your debt or promise a specific result." },
    { icon: "user", title: "Your decision", text: "No pressure. You decide whether to enroll, and you approve each settlement." },
    { icon: "lock", title: "Only what's needed", text: "We never ask for your Social Security number, full account numbers or bank passwords through this website." },
    {
      icon: "dollar",
      title: "Clear costs",
      text: siteConfig.consultationIsFree
        ? "Your consultation is free. Every program fee is explained in writing before you enroll."
        : "Every program fee is explained in writing before you enroll.",
    },
    { icon: "message", title: "A real person", text: "Your dedicated account manager is your point of contact from start to finish." },
  ];

  return (
    <section aria-labelledby="expect-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal">
          <SectionHeading
            id="expect-title"
            eyebrow="Our commitments"
            title="What You Can Expect From Us."
            intro="Trust is earned. Here is what you can hold us to from your first call."
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
    </section>
  );
}
