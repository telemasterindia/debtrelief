import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { operatorName, siteConfig } from "@/lib/site-config";

const page = pages.terms;
export const metadata: Metadata = pageMetadata(page, "terms");

export default function TermsPage() {
  return (
    <LegalPage path={page.path} title="Terms & Conditions" description={page.description}>
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) apply to your use of this website, which is operated by{" "}
        {operatorName}. By using the website, you agree to these Terms. If you do not agree, please do not use the website.
      </p>

      <h2>1. Educational information only</h2>
      <p>
        The content on this website is general information for U.S. consumers. It is not legal, tax or financial advice
        for your specific situation.{" "}
        {siteConfig.isLawFirm
          ? "Using this website does not create an attorney-client relationship."
          : `${siteConfig.name} is not a law firm, and using this website does not create an attorney-client relationship.`}{" "}
        Please read our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>2. Requesting a review</h2>
      <p>
        Submitting a request through this website asks us to contact you about an initial review. It does not create a
        contract for services, it does not create any obligation for you, and it does not guarantee any result.
      </p>
      <p>
        If any service is offered to you after an initial review, it will be described — including all fees — in a
        separate written agreement before you agree to anything. You are never required to purchase a service.
      </p>

      <h2>3. No guaranteed results</h2>
      <p>
        Debt validation does not eliminate debts that are legitimately owed. Outcomes depend on the facts of each account,
        the documentation available and the laws that apply. We do not promise that any debt will be removed, reduced,
        settled or found invalid.
      </p>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide information that is accurate and your own.</li>
        <li>Do not submit Social Security numbers, full account numbers, passwords or other sensitive information through this website.</li>
        <li>Continue to meet any deadlines that apply to you, including deadlines in a validation notice or in court papers.</li>
        <li>Use the website only for lawful purposes, and do not interfere with its security or operation.</li>
      </ul>

      <h2>5. Communications</h2>
      <p>
        If you give consent in our form, we may contact you by phone or email — and by text message if you choose that
        option — about your request. You may withdraw consent at any time. See our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>6. Links to other websites</h2>
      <p>
        We link to government agencies and other websites for your reference. We are not responsible for their content,
        and a link does not mean they endorse us.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The website&apos;s design, text and graphics belong to {operatorName} or its licensors. You may view and print
        pages for your personal, non-commercial use.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        We work to keep information accurate and current, but laws and guidance change. The website is provided &quot;as
        is&quot; and &quot;as available,&quot; without warranties of any kind, to the fullest extent permitted by law.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {operatorName} is not liable for indirect, incidental or consequential
        damages arising from your use of the website or reliance on its general information. Nothing in these Terms limits
        any rights you have that cannot be limited by law.
      </p>

      <h2>10. Changes</h2>
      <p>We may update these Terms. The date at the top of this page shows when they last changed.</p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Please use our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
