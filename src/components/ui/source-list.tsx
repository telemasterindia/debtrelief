import { sources, type SourceId } from "@/lib/content/sources";
import { Icon } from "./icon";

/** A visible list of the authoritative sources that support a section. */
export function SourceList({ ids, title = "Sources", className }: { ids: SourceId[]; title?: string; className?: string }) {
  return (
    <aside aria-label={title} className={className}>
      <p className="text-base font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {ids.map((id) => {
          const s = sources[id];
          return (
            <li key={id} className="flex gap-2.5 text-base leading-snug">
              <Icon name="external" className="mt-0.5 size-5 shrink-0 text-muted" />
              <span>
                <a href={s.url} className="link" rel="noopener noreferrer" target="_blank">
                  {s.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="block text-[0.9375rem] text-muted">{s.publisher}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
