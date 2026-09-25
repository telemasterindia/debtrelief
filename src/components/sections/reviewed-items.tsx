import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export const reviewedItems: { icon: IconName; title: string; text: string }[] = [
  { icon: "document", title: "Account information", text: "The account the debt is connected to, and whether it matches your records." },
  { icon: "building", title: "Creditor information", text: "The original creditor, the current creditor, and any company collecting for them." },
  { icon: "dollar", title: "Debt amount", text: "The amount claimed, and how it breaks down into principal, interest and fees." },
  { icon: "history", title: "Account history", text: "Payments, credits and changes to the balance since the itemization date." },
  { icon: "message", title: "Collection information", text: "The letters, notices and calls you have received, and the dates they arrived." },
  { icon: "documents", title: "Documentation", text: "Statements, agreements or other records that may be available for the account." },
  { icon: "user", title: "Your information", text: "Anything you share with us, such as your own records of payments or letters." },
];

export function ReviewedItems() {
  return (
    <section aria-labelledby="reviewed-title" className="bg-canvas py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="reviewed-title"
            eyebrow="What may be reviewed"
            title="The Information Behind an Account"
            intro="A review focuses on the facts. Depending on what is available, these are the kinds of information that may be looked at."
            className="reveal"
          />
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewedItems.map((item, i) => (
            <li
              key={item.title}
              className={`reveal flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)] ${
                i === 0 ? "lg:row-span-2 lg:flex-col lg:justify-between lg:bg-navy-900 lg:text-on-dark lg:border-navy-800" : ""
              }`}
            >
              <span
                className={`flex size-13 shrink-0 items-center justify-center rounded-xl ${
                  i === 0 ? "bg-brand-50 text-brand-700 lg:bg-white/10 lg:text-cyan-300" : "bg-brand-50 text-brand-700"
                }`}
              >
                <Icon name={item.icon} className="size-7" />
              </span>
              <span className={i === 0 ? "lg:mt-auto" : ""}>
                <span className={`block text-xl font-semibold ${i === 0 ? "text-ink lg:text-2xl lg:text-white" : "text-ink"}`}>
                  {item.title}
                </span>
                <span className={`mt-2 block text-lg leading-relaxed ${i === 0 ? "text-muted lg:text-on-dark" : "text-muted"}`}>
                  {item.text}
                </span>
                {i === 0 && (
                  <span className="mt-6 hidden rounded-xl border border-white/15 bg-white/5 p-4 text-[1.0625rem] leading-snug text-on-dark-muted lg:block">
                    Not every account has complete records. We&apos;ll tell you what could be reviewed and what could not.
                  </span>
                )}
              </span>
            </li>
          ))}
          <li className="reveal flex flex-col justify-center rounded-[var(--radius-card)] border-2 border-dashed border-line-strong p-7">
            <span className="text-xl font-semibold text-ink">Helpful tip</span>
            <span className="mt-2 text-lg leading-relaxed text-muted">
              Keep any letters from the debt collector nearby. The validation notice answers many of these questions.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
