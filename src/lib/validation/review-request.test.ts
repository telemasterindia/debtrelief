import { describe, expect, it } from "vitest";
import { basicInfoSchema, contactInfoSchema, normalizeUsPhone, reviewRequestSchema } from "./review-request";

const valid = {
  firstName: "Mary",
  lastName: "O'Neil",
  debtType: "credit_card",
  debtAmount: "1k_5k",
  collectorContact: "yes",
  state: "OH",
  details: "",
  email: "mary@example.com",
  phone: "(614) 555-0142",
  consentContact: true,
  consentTerms: true,
  consentSms: false,
};

describe("review request schema", () => {
  it("accepts a complete, valid request", () => {
    expect(reviewRequestSchema.safeParse(valid).success).toBe(true);
  });

  it("requires consent", () => {
    const r = reviewRequestSchema.safeParse({ ...valid, consentContact: false });
    expect(r.success).toBe(false);
  });

  it("rejects unknown states and debt types", () => {
    expect(reviewRequestSchema.safeParse({ ...valid, state: "XX" }).success).toBe(false);
    expect(reviewRequestSchema.safeParse({ ...valid, debtType: "mortgage" }).success).toBe(false);
  });

  it("gives plain-English name errors", () => {
    const r = basicInfoSchema.safeParse({ firstName: "", lastName: "Smith" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toBe("Please enter your first name.");
  });

  it("validates email and phone", () => {
    expect(contactInfoSchema.safeParse({ email: "nope", phone: "555" }).success).toBe(false);
  });
});

describe("normalizeUsPhone", () => {
  it("normalizes common formats", () => {
    expect(normalizeUsPhone("(614) 555-0142")).toBe("6145550142");
    expect(normalizeUsPhone("+1 614 555 0142")).toBe("6145550142");
  });
  it("rejects invalid numbers", () => {
    expect(normalizeUsPhone("123-456-7890")).toBeNull();
    expect(normalizeUsPhone("614-555-014")).toBeNull();
  });
});
