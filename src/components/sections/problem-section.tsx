import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

const questions: { icon: IconName; q: string; a: string }[] = [
  { icon: "building", q: "Who is collecting this debt?", a: "The company contacting you may not be the one you originally did business with." },
  { icon: "document", q: "What account is this?", a: "Debts are often sold, and the name on the letter may be unfamiliar." },
  { icon: "dollar", q: "How much is being claimed — and why?", a: "Interest and fees can change the amount over time." },
  { icon: "documents", q: "What documentation exists?", a: "Records may be complete, partial, or hard to find." },
  { icon: "search", q: "What should I look at before I pay?", a: "Knowing the facts first helps you make a confident decision." },
];

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="bg-canvas py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="problem-title"
            eyebrow="Why people come to us"
            title="When You're Asked to Pay a Debt, You May Have Questions."
            intro={
              <>
                <p>
                  A letter or phone call from a debt collector can be confusing — especially when you don&apos;t recognize
                  the company or the amount.
                </p>
                <p className="mt-4 font-medium text-ink">These are reasonable questions. You are allowed to ask them.</p>
              </>
            }
          />
        </div>
        <ol className="reveal space-y-4">
          {questions.map((item, i) => (
            <li key={item.q} className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-cyan-300">
                <Icon name={item.icon} className="size-7" />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-white">
                  {i + 1}
                </span>
              </span>
              <span>
                <span className="block text-xl font-semibold leading-snug text-ink">{item.q}</span>
                <span className="mt-1.5 block text-lg leading-relaxed text-muted">{item.a}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
