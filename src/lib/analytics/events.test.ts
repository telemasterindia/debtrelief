import { describe, expect, it } from "vitest";
import { sanitizeParams } from "./events";

describe("sanitizeParams", () => {
  it("keeps allow-listed keys", () => {
    expect(sanitizeParams({ location: "hero", step: 2, open: true })).toEqual({ location: "hero", step: 2, open: true });
  });

  it("drops keys that are not allow-listed", () => {
    expect(sanitizeParams({ email: "a@b.com", debtAmount: "10k", location: "footer" })).toEqual({ location: "footer" });
  });

  it("drops values that look like personal data", () => {
    expect(sanitizeParams({ label: "jane@example.com", location: "5551234567" })).toEqual({});
  });

  it("truncates long values", () => {
    const out = sanitizeParams({ label: "x".repeat(200) });
    expect(String(out.label).length).toBe(80);
  });
});
