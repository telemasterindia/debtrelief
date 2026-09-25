import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { operatorName, siteConfig } from "@/lib/site-config";

const page = pages.privacy;
export const metadata: Metadata = pageMetadata(page, "privacy");

export default function PrivacyPage() {
  return (
    <LegalPage path={page.path} title="Privacy Policy" description={page.description}>
      <p>
        This Privacy Policy explains how {operatorName} (&quot;we,&quot; &quot;us&quot;) collects, uses, shares and
        protects information when you use this website. We have written it in plain English. If anything is unclear,
        please <Link href="/contact">contact us</Link>.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>We collect only what we need to respond to your request or message.</li>
        <li>We do not sell your personal information.</li>
        <li>We never ask for your Social Security number, full account numbers or bank passwords through this website.</li>
        <li>You can ask us to stop contacting you, or to access or delete your information.</li>
      </ul>

      <h2>Information you give us</h2>
      <p>When you request a consultation, we collect:</p>
      <ul>
        <li>Your first and last name</li>
        <li>Your email address and phone number</li>
        <li>Your state of residence</li>
        <li>General information about your debt: the type of debt, an approximate total, and whether a collector has contacted you</li>
        <li>Any additional details you choose to share</li>
        <li>Your consent choices, including whether you agreed to receive text messages</li>
      </ul>
      <p>When you send a message through our contact form, we collect your name, email address and message.</p>

      <h2>Information collected automatically</h2>
      <p>
        Like most websites, our servers receive technical information such as your IP address, browser type and the pages
        you request. We use this to operate the website, keep it secure and prevent abuse (for example, limiting repeated
        form submissions).
      </p>
      <p>
        This website does not use advertising cookies. Our video is embedded from YouTube in privacy-enhanced mode and
        nothing is loaded from YouTube until you press Play; once you do, YouTube&apos;s privacy policy applies to the
        video player. If we add website analytics in the future, we will update this
        policy first. Our analytics design never includes your name, contact details or information about your debt.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your request for a consultation, and to contact you about it</li>
        <li>To answer your questions</li>
        <li>To keep records of your consent and our communications</li>
        <li>To protect the website and our users from fraud and abuse</li>
        <li>To comply with the law</li>
      </ul>

      <h2>How we share information</h2>
      <p>We share personal information only:</p>
      <ul>
        <li>With service providers who help us operate our business (for example, website hosting and customer-communication tools), who may use it only to provide services to us</li>
        <li>When required by law, or to protect rights, safety and property</li>
        <li>As part of a merger, acquisition or sale of assets, subject to this policy</li>
        <li>With your permission</li>
      </ul>
      <p>We do not sell your personal information, and we do not share it with other companies for their own marketing.</p>

      <h2>Phone calls, emails and text messages</h2>
      <p>
        If you agree, we may contact you by phone or email about your request. We send text messages only if you choose
        that option. You can withdraw your consent at any time by telling us — for example, by replying to a message or
        using our <Link href="/contact">contact page</Link>. Consent is never a condition of buying anything.
      </p>

      <h2>How we protect information</h2>
      <p>
        Information you submit on this website is sent over an encrypted (HTTPS) connection. We limit access to personal
        information to people who need it to do their jobs. No method of transmission or storage is completely secure, but
        we work to protect your information using reasonable safeguards.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep personal information only as long as needed for the purposes described here, including to meet legal,
        accounting and record-keeping requirements. When it is no longer needed, we delete or de-identify it.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may ask us to access, correct or delete the personal information we hold about you, or to stop contacting you.
        Depending on where you live, your state&apos;s law may give you additional rights. We will not treat you
        differently for exercising your privacy rights. To make a request, please <Link href="/contact">contact us</Link>
        {siteConfig.email ? <> or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></> : null}.
      </p>

      <h2>Children</h2>
      <p>This website is intended for adults. We do not knowingly collect information from children under 13.</p>

      <h2>Links to other websites</h2>
      <p>
        Our pages link to government and other websites. Their privacy practices are their own, and we encourage you to
        read their policies.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we make changes, we will update the date at the top of this page.</p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Please use our <Link href="/contact">contact page</Link>
        {siteConfig.address ? (
          <>
            {" "}
            or write to us at {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region}{" "}
            {siteConfig.address.postalCode}
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  );
}
