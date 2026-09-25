import Link from "next/link";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";

export default function Article() {
  return (
    <>
      <div className="prose-readable">
        <p>
          Every state sets a time limit for how long a creditor or collector can sue you over a debt. This time limit is
          called the <strong>statute of limitations</strong>. When it has passed, the debt is often called a{" "}
          <strong>time-barred debt</strong>.
        </p>

        <h2>What collectors may not do</h2>
        <p>
          Under the federal debt collection rule, a debt collector must not sue you or threaten to sue you to collect a
          time-barred debt.
        </p>

        <h2>What collectors may still do</h2>
        <p>
          A time-barred debt does not simply disappear. A collector may still contact you and ask you to pay it
          voluntarily.
        </p>

        <h2>Why a payment deserves careful thought</h2>
        <p>
          In some states, making a payment on an old debt — or even acknowledging it in writing — can restart the time
          limit. That could make it possible for you to be sued over the full amount again.
        </p>
        <p>
          The length of the time limit, and the rules about restarting it, depend on your state and the type of debt. The
          time limit for lawsuits is also different from the time a debt may appear on your credit report.
        </p>
      </div>

      <Notice tone="info" title="Before you pay an old debt" className="my-10 max-w-[44rem]">
        Find out when the last payment was made, which state&apos;s law applies, and whether a payment could restart the
        time limit. A licensed attorney or legal aid office in your state can answer this for your situation.
      </Notice>

      <div className="prose-readable">
        <h2>How validation helps</h2>
        <p>
          The validation notice shows the creditor and an itemization from a specific date, which can help you understand
          how old an account is and how the amount has grown.{" "}
          If you are struggling with several debts, <Link href="/free-consultation">a free consultation</Link> can help you understand your options.
        </p>
      </div>

      <SourceList
        className="mt-12 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
        ids={["regF26", "ftcDebtCollectionFaqs", "cfpbWhatToDo"]}
      />
    </>
  );
}
