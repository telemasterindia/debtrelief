import Link from "next/link";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";

export default function Article() {
  return (
    <>
      <div className="prose-readable">
        <p>
          If you are behind on credit card bills or other unsecured debts, you have several options. Debt relief — also
          called debt settlement — is one of them. This guide explains how it works, its trade-offs, and the alternatives,
          so you can choose what is right for you.
        </p>

        <h2>How debt relief works</h2>
        <p>
          A debt relief company negotiates with your creditors to try to settle your debts for less than the full balance.
          Typically, you set aside a monthly amount you can afford. As funds build up, the company works to reach
          settlements with your creditors one at a time. You agree to each settlement before it is final.
        </p>

        <h2>Who it may help</h2>
        <ul>
          <li>People with significant credit card or other unsecured debt</li>
          <li>People who can&apos;t keep up with minimum payments, but can set aside a smaller monthly amount</li>
          <li>People who want to avoid bankruptcy, if possible</li>
        </ul>

        <h2>The trade-offs</h2>
        <ul>
          <li>
            <strong>Results vary.</strong> Creditors are not required to negotiate or settle, and some debts may not be
            settled.
          </li>
          <li>
            <strong>Your credit may be affected.</strong> Debt relief can lower your credit scores, especially if payments
            to creditors stop. Late fees and interest may be added in the meantime.
          </li>
          <li>
            <strong>Collection may continue.</strong> Creditors and collectors may keep contacting you, and may file a
            lawsuit.
          </li>
          <li>
            <strong>Taxes.</strong> The IRS may treat forgiven debt as income, although exceptions such as insolvency may
            apply.
          </li>
        </ul>

        <h2>What the law requires on fees and disclosures</h2>
        <p>
          Under the FTC&apos;s Telemarketing Sales Rule, for-profit debt relief companies that sell their services by phone
          generally cannot collect fees until they have settled or changed the terms of at least one of your debts, you
          have agreed to that settlement, and you have made at least one payment under it. Before you sign up, they must
          tell you how long it will take to get results, how much you must save before offers are made, and the possible
          negative consequences.
        </p>
      </div>

      <Notice tone="notice" title="Warning signs of a debt relief scam" className="my-10 max-w-[44rem]">
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Asking for fees before settling any of your debts</li>
          <li>Guaranteeing to settle all your debts or to make debt disappear</li>
          <li>Enrolling you without reviewing your financial situation first</li>
          <li>Telling you to stop talking to your creditors without explaining the consequences</li>
        </ul>
      </Notice>

      <div className="prose-readable">
        <h2>Alternatives to consider</h2>
        <ul>
          <li>
            <strong>Call your creditors.</strong> Some will agree to a lower interest rate or a payment plan, especially
            before an account goes to collection.
          </li>
          <li>
            <strong>Nonprofit credit counseling.</strong> A counselor can review your budget and may set up a debt
            management plan, where you repay the full balance at reduced interest.
          </li>
          <li>
            <strong>A debt consolidation loan.</strong> If your credit allows, one lower-rate loan may replace several
            high-rate cards.
          </li>
          <li>
            <strong>Bankruptcy.</strong> In some situations it may be the best option. A bankruptcy attorney can explain
            how it works in your state.
          </li>
        </ul>

        <h2>Questions to ask any debt relief company</h2>
        <ol>
          <li>Which of my debts are eligible?</li>
          <li>How long do you estimate the program will take for me?</li>
          <li>What are all the fees, and when are they charged?</li>
          <li>How much must I save before you make offers to my creditors?</li>
          <li>How could this affect my credit, and what happens if a creditor sues?</li>
        </ol>
        <p>
          At Greenlight Debt Relief, we answer these questions in writing before you enroll.{" "}
          <Link href="/free-consultation">Request a free consultation</Link> to talk through your situation.
        </p>
      </div>

      <SourceList
        className="mt-12 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
        ids={["cfpbDebtReliefPrograms", "cfpbDebtReliefCompare", "ftcHowToGetOutOfDebt", "ftcTsrDebtRelief", "irsCanceledDebt"]}
      />
    </>
  );
}
