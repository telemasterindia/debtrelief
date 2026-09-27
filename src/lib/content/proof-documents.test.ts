import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { proofDisclaimer, proofDocuments } from "./proof-documents";

const publicDir = join(import.meta.dirname, "../../../public");

describe("proof documents config", () => {
  it("lists exactly the 9 approved documents, proof-01 to proof-09, in order", () => {
    expect(proofDocuments.map((d) => d.id)).toEqual(Array.from({ length: 9 }, (_, i) => `proof-${String(i + 1).padStart(2, "0")}`));
    for (const d of proofDocuments) expect(d.pdfPath).toBe(`/proof/${d.id}.pdf`);
  });

  it("every listed PDF is a real PDF file", () => {
    for (const d of proofDocuments) {
      expect(readFileSync(join(publicDir, d.pdfPath)).subarray(0, 5).toString(), d.pdfPath).toBe("%PDF-");
    }
  });

  it("has unique ids and PDF paths", () => {
    expect(new Set(proofDocuments.map((d) => d.id)).size).toBe(proofDocuments.length);
    expect(new Set(proofDocuments.map((d) => d.pdfPath)).size).toBe(proofDocuments.length);
  });

  it("only points at clean public /proof/proof-NN.pdf files that exist", () => {
    for (const d of proofDocuments) {
      expect(d.pdfPath).toMatch(/^\/proof\/proof-\d{2,3}\.pdf$/);
      expect(existsSync(join(publicDir, d.pdfPath)), d.pdfPath).toBe(true);
      if (d.thumbnailPath) expect(existsSync(join(publicDir, d.thumbnailPath)), d.thumbnailPath).toBe(true);
    }
  });

  it("every entry has institution, title and description filled in", () => {
    for (const d of proofDocuments) {
      expect(d.institution.trim(), d.id).not.toBe("");
      expect(d.title.trim(), d.id).not.toBe("");
      expect(d.description.trim(), d.id).not.toBe("");
    }
  });

  it("cards never show the document's date", () => {
    for (const d of proofDocuments) {
      expect(`${d.title} ${d.description} ${d.resultType ?? ""}`, d.id).not.toMatch(
        /\b(19|20)\d{2}\b|\d{1,2}\/\d{1,2}\/\d{2,4}|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d/i,
      );
    }
  });

  it("descriptions make no guarantee or promise", () => {
    expect(proofDisclaimer.toLowerCase()).toContain("not typical or guaranteed");
    for (const d of proofDocuments) {
      expect(`${d.title} ${d.description} ${d.resultType ?? ""}`.toLowerCase(), d.id).not.toMatch(
        /guarantee|you will (save|receive)|every customer|typical|always|promise|expect to|you can save|deleted|removed from/,
      );
    }
  });
});
