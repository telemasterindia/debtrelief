import Link from "next/link";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";

export default function Article() {
  return (
    <>
      <div className="prose-readable">
        <p>
          A call or letter from a debt collector can be stressful. The most important thing you can do is slow down and
          get the facts before you agree to anything. This checklist can help.
        </p>

        <h2>1. Take notes, and don&apos;t pay on the spot</h2>
        <p>
          Write down the name of the person, the company, their phone number and mailing address, the date, and the
          amount they say you owe. You do not have to make a payment or a promise during the first call.
        </p>

        <h2>2. Protect your personal information</h2>
        <p>
          Do not give your bank account, debit card or Social Security number to someone you have not verified. If you
          are unsure the caller is real, ask for their mailing address and hang up.{" "}
          <Link href="/resources/spot-debt-collection-scams">Learn the warning signs of fake debt collectors.</Link>
        </p>

        <h2>3. Look for the validation notice</h2>
        <p>
          The collector must give you validation information in its first communication or within five days after it.
          This notice explains who the collector is, who the debt is owed to, how much is claimed, and the date by which
          you can dispute it.{" "}
          <Link href="/resources/debt-validation-letter">Here is how to read a validation notice.</Link>
        </p>

        <h2>4. Decide whether the debt is yours and the amount is right</h2>
        <p>
          Compare the notice with your own records. Do you recognize the original creditor? Does the amount match what
          you remember, including payments you made?
        </p>

        <h2>5. Respond in writing before the deadline</h2>
        <p>
          If something is wrong or unclear, send a written dispute or a request for more information before the
          validation period ends. The collector must then pause collection of the disputed debt until it responds with
          verification. Keep copies of everything.
        </p>

        <h2>6. Know the basic rules collectors must follow</h2>
        <ul>
          <li>Collectors generally may not call before 8 a.m. or after 9 p.m. your local time.</li>
          <li>They may not harass you, use threats, or use obscene language.</li>
          <li>They may not lie about the amount you owe or claim to be attorneys or government officials if they are not.</li>
          <li>You can tell a collector, in writing, to stop contacting you. This does not erase the debt.</li>
        </ul>
      </div>

      <Notice tone="notice" title="If you receive court papers" className="my-10 max-w-[44rem]">
        Do not ignore a lawsuit. Respond by the deadline on the court papers and speak with a licensed attorney as soon as
        possible. If you do not respond, the court may enter a judgment against you.
      </Notice>

      <div className="prose-readable">
        <h2>7. Report problems</h2>
        <p>
          If a collector breaks the rules, you can submit a complaint to the CFPB or report it to the FTC and your state
          attorney general.
        </p>
      </div>

      <SourceList
        className="mt-12 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
        ids={["cfpbWhatToDo", "ftcDebtCollectionFaqs", "cfpbValidationInfo", "cfpbComplaint"]}
      />
    </>
  );
}
