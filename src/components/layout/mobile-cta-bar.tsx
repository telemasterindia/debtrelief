"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/tracked-link";

/**
 * On small screens, keeps the primary action within reach once the visitor has
 * scrolled past the hero. Hidden on the request page itself.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setVisible(window.scrollY > 640 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/request-review") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/96 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <CtaButton href="/request-review" location="mobile_sticky" className="w-full" arrow>
        Request a Validation Review
      </CtaButton>
    </div>
  );
}
