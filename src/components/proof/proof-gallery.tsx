"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import type { ProofDocument } from "@/lib/content/proof-documents";
import { track } from "@/lib/analytics/track";
import { Icon } from "@/components/ui/icon";

/**
 * Proof document gallery.
 *
 * "View Proof" is a real link that opens the PDF in a new tab (works without
 * JavaScript and on phones, where browsers show PDFs best in their own viewer).
 * On larger screens with a mouse, it opens an in-page viewer instead.
 */
export function ProofGallery({ documents }: { documents: ProofDocument[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<ProofDocument | null>(null);

  const open = (doc: ProofDocument, e: MouseEvent<HTMLAnchorElement>) => {
    track("cta_click", { location: "results_proof", label: "view_proof" });
    const inPage = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (!inPage || !dialogRef.current?.showModal) return; // follow the link: new tab
    e.preventDefault();
    triggerRef.current = e.currentTarget;
    setActive(doc);
    dialogRef.current.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, i) => (
          <li key={doc.id} className="reveal flex">
            <article
              aria-labelledby={`${doc.id}-title`}
              className="flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line bg-canvas">
                {doc.thumbnailPath ? (
                  <Image src={doc.thumbnailPath} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                ) : (
                  <span aria-hidden="true" className="flex flex-col items-center gap-3 text-brand-700">
                    <Icon name="document" className="size-16" />
                    <span className="rounded-md bg-brand-600 px-2.5 py-1 text-sm font-bold tracking-wide text-white">PDF</span>
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-base font-semibold text-brand-700">{doc.institution}</p>
                <h3 id={`${doc.id}-title`} className="mt-1 text-xl font-semibold leading-snug">
                  {doc.title}
                </h3>
                {doc.resultType && (
                  <p className="mt-2 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-base font-medium text-brand-700">
                    {doc.resultType}
                  </p>
                )}
                <p className="mt-3 flex-1 text-[1.0625rem] leading-relaxed text-muted">{doc.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={doc.pdfPath}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => open(doc, e)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-brand-600 px-5 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    <Icon name="search" className="size-5" />
                    View Proof
                    <span className="sr-only">: {doc.institution} {doc.title} (document {i + 1} of {documents.length})</span>
                  </a>
                  <a href={doc.pdfPath} target="_blank" rel="noopener" className="link inline-flex min-h-12 items-center gap-1.5 text-[1.0625rem]">
                    Open PDF
                    <Icon name="external" className="size-4" />
                    <span className="sr-only">: {doc.institution} {doc.title}, document {i + 1} of {documents.length} (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="proof-viewer-title"
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close(); // click on the backdrop
        }}
        className="m-auto h-[92vh] w-[min(1100px,94vw)] max-w-none rounded-[var(--radius-card)] bg-white p-0 shadow-[var(--shadow-raised)] backdrop:bg-deep-950/75"
      >
        {active && (
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-base font-semibold text-brand-700">{active.institution}</p>
                <h2 id="proof-viewer-title" className="text-xl leading-snug sm:text-2xl">
                  {active.title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <a
                  href={active.pdfPath}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-control)] px-4 text-[1.0625rem] font-semibold text-ink ring-2 ring-inset ring-line-strong hover:ring-ink"
                >
                  Open Full PDF
                  <Icon name="external" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-control)] bg-deep-900 px-4 text-[1.0625rem] font-semibold text-white hover:bg-deep-700"
                >
                  <Icon name="x" className="size-5" />
                  Close
                </button>
              </div>
            </div>
            <iframe
              key={active.id}
              src={`${active.pdfPath}#view=FitH`}
              title={`${active.institution} — ${active.title} (PDF)`}
              className="w-full flex-1 bg-canvas"
            />
          </div>
        )}
      </dialog>
    </>
  );
}
