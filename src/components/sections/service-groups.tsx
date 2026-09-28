import Link from "next/link";
import { servicePath, type ServiceGroup } from "@/lib/content/services";
import { Icon } from "@/components/ui/icon";

/** Grouped service links, used on the Services overview page. */
export function ServiceGroups({ groups }: { groups: ServiceGroup[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {groups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`group-${group.id}`}
          className="reveal rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon name={group.icon} className="size-6" />
            </span>
            <h2 id={`group-${group.id}`} className="text-2xl">
              {group.title}
            </h2>
          </div>
          <ul className="mt-5 divide-y divide-line">
            {group.services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={servicePath(s.slug)}
                  className="group flex min-h-16 items-center justify-between gap-4 py-3.5"
                >
                  <span>
                    <span className="block text-lg font-semibold text-ink group-hover:text-brand-700">{s.title}</span>
                    <span className="mt-0.5 block text-base leading-relaxed text-muted">{s.menuText}</span>
                  </span>
                  <Icon name="chevronRight" className="size-5 shrink-0 text-brand-700 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
