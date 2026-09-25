"use client";

/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";

export function FormSuccess() {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
    heading.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-6 shadow-[var(--shadow-raised)] sm:p-10" role="status">
      <span className="flex size-16 items-center justify-center rounded-full bg-success-50 text-success-700">
        <Icon name="checkCircle" className="size-10" />
      </span>
      <h2 ref={heading} tabIndex={-1} className="mt-6 text-3xl outline-none sm:text-4xl">
        Your Request Has Been Received.
      </h2>
      <p className="mt-4 text-lg leading-relaxed sm:text-xl">
        Thank you. Here is what happens next — so you know exactly what to expect.
      </p>

      <ol className="mt-8 space-y-6">
        {[
          {
            title: "We'll contact you",
            text: "A Greenlight consultant will reach out by phone or email, using the details you provided, to set up your free consultation.",
          },
          {
            title: "Have your information nearby",
            text: "A rough list of your debts and your monthly budget will help us talk through your options.",
          },
          {
            title: "You decide what's next",
            text: "We'll explain the options that may be available to you. Whether to move forward is always your choice.",
          },
        ].map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700">{i + 1}</span>
            <div>
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-1 text-lg leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-4 rounded-[var(--radius-card)] bg-canvas p-5 text-[1.0625rem] leading-relaxed sm:p-6 sm:text-lg">
        <p>
          <strong className="font-semibold text-ink">No obligation.</strong> Submitting a request doesn&apos;t commit you
          to anything. Results vary from person to person.
        </p>
        <p>
          <strong className="font-semibold text-ink">How your information is used.</strong> We use it to respond to your
          request
          {siteConfig.sharesInformationWithPartners ? " and may share it with our debt-relief partners so they can present options to you" : ""}
          , as described in our{" "}
          <Link href="/privacy" className="link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/how-it-works" className="link inline-flex min-h-12 items-center gap-2 text-lg">
          See how it works
          <Icon name="arrowRight" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
