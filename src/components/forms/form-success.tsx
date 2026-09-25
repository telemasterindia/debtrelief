"use client";

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
            text: "Someone from our team will reach out by phone or email, using the details you provided, to confirm your request and ask about the account.",
          },
          {
            title: "Keep your letters nearby",
            text: "If you have letters or notices from a debt collector, keep them handy. The date on the validation notice may matter.",
          },
          {
            title: "You'll learn what we find",
            text: "We will explain what information is available, what is missing, and the steps that may be open to you. You decide what to do next.",
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
          <strong className="font-semibold text-ink">No guaranteed result.</strong> Submitting a request does not guarantee
          any outcome, and it does not remove, reduce or settle a debt.
        </p>
        <p>
          <strong className="font-semibold text-ink">How your information is used.</strong> We use it only to respond to
          your request, as described in our{" "}
          <Link href="/privacy" className="link">
            Privacy Policy
          </Link>
          . We do not sell your personal information.
        </p>
        <p>
          <strong className="font-semibold text-ink">Don&apos;t miss deadlines.</strong> If a collector gave you a date to
          dispute the debt, or you have received court papers, don&apos;t wait for us — those deadlines still apply.
          {siteConfig.isLawFirm ? "" : " If you have been sued, please contact a licensed attorney."}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/resources" className="link inline-flex min-h-12 items-center gap-2 text-lg">
          Read our plain-English guides
          <Icon name="arrowRight" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
