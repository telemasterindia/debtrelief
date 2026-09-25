"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Gently fades sections in as they scroll into view. Content is fully visible
 * without JavaScript, if the app fails to hydrate, and when the visitor prefers
 * reduced motion.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Show anything already on screen straight away (no flicker), then enable the
    // hide-until-scrolled effect. The "js" class is added HERE — only once this
    // component is actually running — so if the app's JavaScript fails to load or
    // hydrate, no content is ever left hidden.
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
    });
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden (e.g. for print or very tall screens).
    const t = window.setTimeout(() => els.forEach((el) => el.classList.add("is-visible")), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
