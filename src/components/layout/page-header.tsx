import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/seo/structured-data";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-heading";

/** Interior page intro with visible breadcrumbs (and matching BreadcrumbList schema). */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  meta,
  compact,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  meta?: ReactNode;
  compact?: boolean;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900">
      <JsonLd data={graph(breadcrumbSchema(all))} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_85%_0%,#124536_0%,rgba(8,23,49,0)_65%)]" />
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10 opacity-80" />
      <div className={`container-page ${compact ? "py-8 sm:py-10" : "py-12 sm:py-16 lg:py-20"}`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-on-dark-muted">
            {all.map((c, i) => {
              const last = i === all.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="text-white">{c.name}</span>
                  ) : (
                    <>
                      <Link href={c.path} className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-white">
                        {c.name}
                      </Link>
                      <Icon name="chevronRight" className="size-4" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className={compact ? "mt-4 max-w-3xl" : "mt-6 max-w-3xl"}>
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className={`mt-3 leading-[1.1] text-white ${compact ? "text-[2rem] sm:text-[2.75rem]" : "text-[2.25rem] sm:text-5xl lg:text-[3.5rem]"}`}>{title}</h1>
          {intro && <div className="mt-5 text-lg leading-relaxed text-on-dark sm:text-xl">{intro}</div>}
          {meta && <div className="mt-6 text-base text-on-dark-muted">{meta}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}
