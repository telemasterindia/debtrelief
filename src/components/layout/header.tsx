"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNav, reviewCta } from "@/lib/navigation";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onRequestPage = pathname === reviewCta.href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/88",
        scrolled || open ? "border-line shadow-[0_6px_24px_-16px_rgb(11_26_51/0.35)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1 2xl:gap-2">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-12 items-center rounded-lg px-2.5 text-[1.0625rem] font-medium transition-colors 2xl:px-3.5",
                      active ? "text-brand-700" : "text-ink hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-brand-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {!onRequestPage && (
            <Link
              href={reviewCta.href}
              onClick={() => track("cta_click", { location: "header", label: reviewCta.label })}
              className="hidden min-h-12 items-center rounded-[var(--radius-control)] bg-brand-600 px-5 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
            >
              {reviewCta.label}
            </Link>
          )}
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-control)] px-3.5 text-[1.0625rem] font-semibold text-ink ring-2 ring-inset ring-line-strong hover:ring-ink xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} className="size-6" />
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white xl:hidden"
      >
        <nav aria-label="Main" className="container-page py-4">
          <ul className="divide-y divide-line">
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="flex min-h-15 items-center justify-between py-3 text-xl font-semibold text-ink">
                Home
                <Icon name="chevronRight" className="size-6 text-muted" />
              </Link>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-15 items-center justify-between py-3 text-xl font-semibold",
                    isActive(pathname, item.href) ? "text-brand-700" : "text-ink",
                  )}
                >
                  {item.label}
                  <Icon name="chevronRight" className="size-6 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          {!onRequestPage && (
            <Link
              href={reviewCta.href}
              onClick={() => track("cta_click", { location: "mobile_menu", label: "Request a Validation Review" })}
              className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-brand-600 px-6 text-lg font-semibold text-white"
            >
              Request a Validation Review
              <Icon name="arrowRight" className="size-5" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
