"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { consultationCta } from "@/lib/navigation";
import { serviceGroups, servicePath, servicesIndexPath, type ServiceGroup } from "@/lib/content/services";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui/icon";

function isServicesPath(pathname: string) {
  return pathname === servicesIndexPath || pathname.startsWith(`${servicesIndexPath}/`);
}

/**
 * Desktop "Services" mega-menu. A disclosure (button + panel of links), not an ARIA
 * menu: Tab moves through the links, Escape closes and returns focus to the button.
 * Opens on click, and on hover for mouse users; closes on outside click, when focus
 * leaves, or on navigation.
 */
export function ServicesMegaMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverOpened = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active = isServicesPath(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpen((wasOpen) => {
      if (!wasOpen) hoverOpened.current = true;
      return true;
    });
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !hoverOpened.current) return;
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  return (
    <li
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          // A click after a hover-open keeps the panel open (the user clearly wants it).
          const keepOpen = hoverOpened.current;
          hoverOpened.current = false;
          clearTimeout(closeTimer.current);
          setOpen((v) => (keepOpen ? true : !v));
        }}
        className={cn(
          "relative flex min-h-12 items-center gap-1 rounded-lg px-2.5 text-[1.0625rem] font-medium transition-colors 2xl:px-3.5",
          active || open ? "text-brand-700" : "text-ink hover:text-brand-700",
        )}
      >
        Services
        <Icon name="chevronDown" className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        {active && <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-brand-600" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-line bg-white shadow-[var(--shadow-raised)]"
      >
        <div className="container-page py-8">
          <div className="grid grid-cols-12 gap-x-8 gap-y-6">
            <MenuGroup group={serviceGroups[0]} className="col-span-6" columns={2} />
            <div className="col-span-3 space-y-6 border-l border-line pl-8">
              <MenuGroup group={serviceGroups[1]} />
              <MenuGroup group={serviceGroups[3]} />
            </div>
            <MenuGroup group={serviceGroups[2]} className="col-span-3 border-l border-line pl-8" />
          </div>

          <div className="mt-7 flex items-center justify-between gap-6 rounded-[var(--radius-card)] bg-brand-50 px-6 py-4">
            <p className="text-[1.0625rem] text-ink">
              <span className="font-semibold">Not sure which option fits?</span>{" "}
              <span className="text-body">Our team can help you understand your options and next steps.</span>
            </p>
            <div className="flex shrink-0 items-center gap-5">
              <Link href={servicesIndexPath} className="link inline-flex min-h-11 items-center text-[1.0625rem]">
                View all services
              </Link>
              <Link
                href={consultationCta.href}
                onClick={() => track("cta_click", { location: "services_menu", label: consultationCta.label })}
                className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-control)] bg-brand-600 px-5 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {consultationCta.label}
                <Icon name="arrowRight" className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function MenuGroup({ group, className, columns = 1 }: { group: ServiceGroup; className?: string; columns?: 1 | 2 }) {
  const headingId = `menu-${group.id}`;
  return (
    <div className={className}>
      <p id={headingId} className="flex items-center gap-2.5 text-base font-bold text-brand-700">
        <Icon name={group.icon} className="size-5" />
        {group.title}
      </p>
      <ul aria-labelledby={headingId} className={cn("mt-3 grid gap-x-4 gap-y-0.5", columns === 2 && "grid-cols-2")}>
        {group.services.map((s) => (
          <li key={s.slug}>
            <Link
              href={servicePath(s.slug)}
              className="group -mx-3 block rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-50 focus-visible:bg-brand-50"
            >
              <span className="block text-[1.0625rem] font-semibold leading-snug text-ink group-hover:text-brand-700">
                {s.title}
              </span>
              <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">{s.menuText}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mobile "Services" accordion: Services → group → service links. */
export function ServicesAccordion({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(() => isServicesPath(pathname));
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const regionId = useId();
  const active = isServicesPath(pathname);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-15 w-full items-center justify-between py-3 text-left text-xl font-semibold",
          active ? "text-brand-700" : "text-ink",
        )}
      >
        Services
        <Icon name="chevronDown" className={cn("size-6 text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div id={regionId} hidden={!open} className="pb-4">
        <ul className="space-y-2">
          {serviceGroups.map((group) => {
            const expanded = openGroup === group.id;
            const listId = `${regionId}-${group.id}`;
            return (
              <li key={group.id} className="rounded-[var(--radius-control)] bg-canvas">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={listId}
                  onClick={() => setOpenGroup(expanded ? null : group.id)}
                  className="flex min-h-14 w-full items-center gap-3 px-4 text-left text-lg font-semibold text-ink"
                >
                  <Icon name={group.icon} className="size-5 shrink-0 text-brand-700" />
                  <span className="flex-1">{group.title}</span>
                  <span className="text-base font-normal text-muted">
                    {group.services.length}
                    <span className="sr-only"> {group.services.length === 1 ? "service" : "services"}</span>
                  </span>
                  <Icon name="chevronDown" className={cn("size-5 shrink-0 text-muted transition-transform duration-200", expanded && "rotate-180")} />
                </button>
                <ul id={listId} hidden={!expanded} className="px-2 pb-2">
                  {group.services.map((s) => {
                    const href = servicePath(s.slug);
                    const current = pathname === href;
                    return (
                      <li key={s.slug} className="mt-1.5 first:mt-0">
                        <Link
                          href={href}
                          onClick={onNavigate}
                          aria-current={current ? "page" : undefined}
                          className={cn(
                            "flex min-h-13 items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5 text-[1.0625rem] font-medium",
                            current ? "text-brand-700" : "text-ink",
                          )}
                        >
                          {s.title}
                          <Icon name="chevronRight" className="size-5 shrink-0 text-muted" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <Link
          href={servicesIndexPath}
          onClick={onNavigate}
          className="link mt-3 inline-flex min-h-12 items-center text-lg"
        >
          View all services
        </Link>
      </div>
    </li>
  );
}
