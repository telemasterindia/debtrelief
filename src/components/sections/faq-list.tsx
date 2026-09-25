"use client";

import Link from "next/link";
import type { FaqItem } from "@/lib/content/faq";
import { track } from "@/lib/analytics/track";
import { Icon } from "@/components/ui/icon";

/**
 * Accessible accordion built on native <details>/<summary>: keyboard and
 * screen-reader support come from the browser, and answers remain in the page
 * (and searchable with Find) even when collapsed.
 */
export function FaqList({ items, headingLevel = "h3" }: { items: FaqItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details
          key={item.id}
          id={item.id}
          className="group scroll-mt-28"
          onToggle={(e) => track("faq_toggle", { question_id: item.id, open: (e.currentTarget as HTMLDetailsElement).open })}
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <Heading className="text-xl font-semibold leading-snug text-ink sm:text-[1.375rem]">{item.question}</Heading>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 group-open:rotate-180">
              <Icon name="chevronDown" className="size-6" />
            </span>
          </summary>
          <div className="max-w-3xl space-y-4 pb-7 pr-4 text-lg leading-relaxed text-body sm:pr-16">
            {item.answer.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {item.links && (
              <ul className="space-y-2 pt-1">
                {item.links.map((l) =>
                  l.external ? (
                    <li key={l.href}>
                      <a href={l.href} className="link inline-flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                        {l.label}
                        <Icon name="external" className="size-5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link href={l.href} className="link inline-flex items-center gap-2">
                        {l.label}
                        <Icon name="arrowRight" className="size-5" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
