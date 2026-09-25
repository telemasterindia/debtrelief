import Link from "next/link";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";

export default function Article() {
  return (
    <>
      <div className="prose-readable">
        <p>
          Scammers sometimes pretend to be debt collectors. They may even know some of your personal information. The
          Federal Trade Commission (FTC) lists several warning signs to watch for.
        </p>

        <h2>Warning signs</h2>
        <ul>
          <li>The caller refuses to give you a mailing address, a phone number, or written information about the debt.</li>
          <li>The caller asks for your bank account, credit card or Social Security number before you have verified them.</li>
          <li>You are pressured to pay right away, or to pay by gift card, wire transfer or cryptocurrency.</li>
          <li>The caller threatens to have you arrested or put in jail. Real debt collectors cannot do this.</li>
          <li>The debt is one you do not recognize, and the caller becomes angry when you ask questions.</li>
        </ul>

        <h2>How to check whether a collector is real</h2>
        <ol>
          <li>Ask for the collector&apos;s name, company, mailing address and phone number.</li>
          <li>Ask for the validation notice in writing. Legitimate collectors must provide validation information.</li>
          <li>Look up the company&apos;s contact information yourself, and call back using the number you found.</li>
          <li>Contact the original creditor to ask whether the debt was sold or assigned, and to whom.</li>
        </ol>
      </div>

      <Notice tone="notice" title="Never pay a caller you have not verified" className="my-10 max-w-[44rem]">
        Once money is sent by gift card, wire transfer or cryptocurrency, it is very hard to get back.
      </Notice>

      <div className="prose-readable">
        <h2>Debt relief scams, too</h2>
        <p>
          Scammers also pose as debt relief companies. Be cautious of anyone who charges fees before settling any of your
          debts, guarantees to make your debt disappear, or enrolls you without reviewing your finances.{" "}
          <Link href="/resources/debt-relief-what-to-know">Learn what to expect from a legitimate debt relief company.</Link>
        </p>

        <h2>Where to report a scam</h2>
        <p>
          Report suspected scams to the FTC at ReportFraud.ftc.gov and to your state attorney general. You can also submit
          a complaint about a debt collector to the CFPB.
        </p>
        <p>
          Unsure whether a collection account is legitimate?{" "}
          <Link href="/resources/debt-collector-contacted-you">Read our checklist for when a collector contacts you</Link>.
        </p>
      </div>

      <SourceList
        className="mt-12 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
        ids={["ftcFakeCollectors", "ftcReportFraud", "cfpbComplaint"]}
      />
    </>
  );
}
