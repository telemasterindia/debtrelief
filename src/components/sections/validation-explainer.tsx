import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { SectionHeading } from "@/components/ui/section-heading";
import { SourceList } from "@/components/ui/source-list";

export const noticeContents = [
  "The debt collector's name and mailing address",
  "The name of the creditor on a specific date (the \"itemization date\")",
  "The account number, if any, on that date",
  "The name of the creditor the debt is owed to now",
  "The amount owed on the itemization date",
  "Interest, fees, payments and credits since then",
  "The current amount of the debt",
  "The date by which you can dispute the debt",
  "How to dispute, and how to ask for the original creditor's name and address",
];

export function ValidationExplainer({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section aria-labelledby="explainer-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="explainer-title"
          eyebrow="The basics"
          title="What Is Debt Validation?"
          intro="Debt validation means getting clear, basic information about a debt from the collector — so you can check it before deciding what to do."
          className="reveal"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal space-y-6 text-lg leading-relaxed">
            <div className="flex gap-5">
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700">1</span>
              <div>
                <h3 className="text-xl font-semibold">The collector must tell you about the debt</h3>
                <p className="mt-2">
                  A debt collector must give you &quot;validation information&quot; in its first message to you or within
                  five days after it. This usually arrives as a letter called a validation notice.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700">2</span>
              <div>
                <h3 className="text-xl font-semibold">You can dispute or ask questions</h3>
                <p className="mt-2">
                  You generally have 30 days after receiving the notice to dispute the debt in writing, or to ask for the
                  name and address of the original creditor.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700">3</span>
              <div>
                <h3 className="text-xl font-semibold">Collection pauses until they respond</h3>
                <p className="mt-2">
                  If you dispute in writing within that window, the collector must stop collecting the disputed debt until
                  it sends you verification.
                </p>
              </div>
            </div>

            <Notice tone="notice" title="What validation does not do">
              Validation does not erase a debt you legitimately owe, and it does not guarantee any outcome. If the debt is
              verified, the collector may continue collecting it.
            </Notice>

            {showMoreLink && (
              <Link href="/debt-validation" className="link inline-flex min-h-12 items-center gap-2 text-lg">
                Read the complete guide to debt validation
                <Icon name="arrowRight" className="size-5" />
              </Link>
            )}
          </div>

          <div className="reveal">
            <div className="relative rounded-[1.25rem] bg-navy-900 p-2 shadow-[var(--shadow-raised)]">
              <div className="rounded-[0.9rem] bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
                  <div>
                    <p className="text-base font-semibold uppercase tracking-[0.08em] text-brand-700">Validation notice</p>
                    <h3 className="mt-1 text-2xl">What it generally includes</h3>
                  </div>
                  <span className="hidden size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 sm:flex">
                    <Icon name="document" className="size-8" />
                  </span>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {noticeContents.map((item) => (
                    <li key={item} className="flex gap-3.5 text-lg leading-snug">
                      <Icon name="check" className="mt-0.5 size-6 shrink-0 text-success-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <SourceList className="mt-8 border-t border-line pt-6" ids={["regF34", "cfpbValidationInfo"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
