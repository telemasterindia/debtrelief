import Link from "next/link";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";

export default function Article() {
  return (
    <>
      <div className="prose-readable">
        <p>
          When a debt collector contacts you, it must give you basic information about the debt. This information is
          called <strong>validation information</strong>, and it usually arrives as a letter called a{" "}
          <strong>validation notice</strong>. It is one of the most useful documents you will receive, so it is worth
          reading carefully.
        </p>

        <h2>When the notice should arrive</h2>
        <p>
          A debt collector must provide validation information either in its first communication with you or within
          five days after that first communication. Many collectors include it in their first letter.
        </p>

        <h2>What the notice must include</h2>
        <p>Under the federal debt collection rule (Regulation F), the validation notice includes, among other things:</p>
        <ul>
          <li>The debt collector&apos;s name and the mailing address where it accepts disputes.</li>
          <li>Your name and mailing address.</li>
          <li>
            For consumer financial debts such as credit cards, the name of the creditor as of a specific date called the{" "}
            <strong>itemization date</strong>, and the account number (if any) as of that date.
          </li>
          <li>The name of the creditor the debt is currently owed to.</li>
          <li>
            An <strong>itemization</strong>: the amount owed on the itemization date, and how it has changed since —
            interest, fees, payments and credits.
          </li>
          <li>The current amount of the debt.</li>
          <li>
            The <strong>end date of the validation period</strong>, which is the date by which you can dispute the debt or
            ask for the name and address of the original creditor.
          </li>
          <li>Instructions for how to dispute the debt and how to request original-creditor information.</li>
        </ul>

        <h2>How to read your notice</h2>
        <p>Take a few minutes and check each item:</p>
        <ol>
          <li>
            <strong>Do you recognize the creditor?</strong> Debts are often sold, so the current creditor may be a company
            you have never heard of. The creditor on the itemization date should help you connect it to an account.
          </li>
          <li>
            <strong>Does the amount make sense?</strong> Compare the itemization to your own records. Look for interest or
            fees you do not understand, and payments that are missing.
          </li>
          <li>
            <strong>Is the date circled?</strong> Write down the validation period end date. You have the strongest
            protections if you respond in writing by that date.
          </li>
        </ol>

        <h2>How to respond</h2>
        <p>
          If you do not recognize the debt, believe the amount is wrong, or simply need more information, you can send the
          collector a written dispute or a request for more information before the validation period ends.
        </p>
        <p>
          If you dispute the debt in writing during the validation period — or ask for the name and address of the
          original creditor — the collector must stop collecting the disputed debt until it sends you verification or the
          requested information.
        </p>
        <p>
          The Consumer Financial Protection Bureau (CFPB) publishes free sample letters you can adapt. Consider sending
          your letter by certified mail with a return receipt, and keep a copy of everything you send and receive.
        </p>
      </div>

      <Notice tone="notice" title="What if the 30 days have passed?" className="my-10 max-w-[44rem]">
        You can still ask the collector for information or dispute the debt. The collector is not required to pause
        collection in the same way, but asking is still worthwhile. Not disputing a debt also does not mean you admit you
        owe it.
      </Notice>

      <div className="prose-readable">
        <h2>What validation does not do</h2>
        <p>
          Validation helps you get accurate information. It does not erase a debt you legitimately owe. If the collector
          verifies the debt, it may continue its collection efforts.
        </p>
        <p>
          If you would like help understanding the information connected to your account, you can{" "}
          <Link href="/request-review">request a validation review</Link>.
        </p>
      </div>

      <SourceList
        className="mt-12 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
        ids={["regF34", "cfpbValidationInfo", "fdcpa1692g", "ftcDebtCollectionFaqs"]}
      />
    </>
  );
}
