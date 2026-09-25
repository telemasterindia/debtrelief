"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics/track";
import { Icon } from "@/components/ui/icon";
import { CtaButton } from "@/components/ui/tracked-link";

/**
 * On small screens, keeps "Call" and "Free Consultation" within reach once the
 * visitor has scrolled past the hero. Hidden on the consultation page itself.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { phone } = siteConfig;

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(window.scrollY > 640 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/free-consultation") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-white/96 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      {phone && (
        <a
          href={`tel:${phone}`}
          onClick={() => track("phone_click", { location: "mobile_sticky" })}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 text-lg font-semibold text-ink ring-2 ring-inset ring-line-strong"
        >
          <Icon name="phone" className="size-5 text-brand-700" />
          Call
        </a>
      )}
      <CtaButton href="/free-consultation" location="mobile_sticky" className="flex-1 px-4!">
        Free Consultation
      </CtaButton>
    </div>
  );
}
