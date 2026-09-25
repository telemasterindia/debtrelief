import type { ReactNode } from "react";
import { PageHeader } from "./page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const formatted = new Date(`${siteConfig.legalLastUpdated}T12:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function LegalPage({ path, title, description, children }: { path: string; title: string; description: string; children: ReactNode }) {
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path, name: title, description }))} />
      <PageHeader
        compact
        crumbs={[{ name: title, path }]}
        title={title}
        meta={<>Last updated <time dateTime={siteConfig.legalLastUpdated}>{formatted}</time></>}
      />
      <div className="container-page py-14 sm:py-20">
        <div className="prose-readable">{children}</div>
      </div>
    </>
  );
}
