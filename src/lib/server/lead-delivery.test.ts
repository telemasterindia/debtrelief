import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { buildConsultationEmail, escapeHtml, LEAD_RECIPIENT, type ConsultationLead } from "./lead-email";
import { deliverSubmission } from "./deliver";

const lead: ConsultationLead = {
  firstName: "Mary",
  lastName: "O'Neil",
  debtType: "credit_card",
  debtAmount: "10k_25k",
  collectorContact: "yes",
  state: "OH",
  details: "Two cards, calls every day.",
  email: "mary@example.com",
  phone: "6145550142",
  consentContact: true,
  consentTerms: true,
  consentSms: false,
};

const submittedAt = new Date("2026-09-26T14:05:00Z");

describe("buildConsultationEmail", () => {
  const email = buildConsultationEmail(lead, submittedAt, "Greenlight Leads <leads@example.com>");

  it("is addressed exactly to Telemasterindia@gmail.com", () => {
    expect(LEAD_RECIPIENT).toBe("Telemasterindia@gmail.com");
    expect(email.to).toEqual(["Telemasterindia@gmail.com"]);
    expect(email.from).toBe("Greenlight Leads <leads@example.com>");
  });

  it("has a clear subject and reply-to the customer", () => {
    expect(email.subject).toBe("New Free Consultation Lead — Mary O'Neil");
    expect(email.reply_to).toBe("mary@example.com");
  });

  it("includes every lead field in both HTML and text", () => {
    const expected = [
      "Mary", // first name
      "Neil", // last name (apostrophe is HTML-escaped in the HTML part)
      "mary@example.com",
      "(614) 555-0142",
      "Credit card debt",
      "$10,000 – $25,000",
      "Contacted by a debt collector",
      "Ohio (OH)",
      "Two cards, calls every day.",
      "Consent to be contacted (phone/email)",
      "Consent to text messages (SMS)",
      "2026-09-26T14:05:00.000Z",
    ];
    for (const value of expected) {
      expect(email.text).toContain(value);
      expect(email.html).toContain(escapeHtml(value));
    }
    expect(email.text).toMatch(/Consent to be contacted \(phone\/email\): Yes/);
    expect(email.text).toMatch(/Consent to text messages \(SMS\): No/);
    expect(email.text).toMatch(/Contacted by a debt collector: Yes/);
  });

  it("is not a raw JSON dump", () => {
    expect(email.html).not.toContain('"firstName"');
    expect(email.text).not.toContain("{");
  });

  it("cannot execute user-provided HTML or script", () => {
    const hostile = buildConsultationEmail(
      { ...lead, firstName: "Eve", details: '<script>alert(1)</script><img src=x onerror="alert(2)">' },
      submittedAt,
      "from@example.com",
    );
    expect(hostile.html).not.toContain("<script>");
    expect(hostile.html).not.toContain("<img");
    expect(hostile.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(hostile.html).toContain("onerror=&quot;alert(2)&quot;");
  });

  it("keeps the subject on one line", () => {
    const injected = buildConsultationEmail({ ...lead, lastName: "Smith\r\nBcc: x@evil.test" }, submittedAt, "f@e.com");
    expect(injected.subject).not.toMatch(/[\r\n]/);
  });
});

describe("deliverSubmission (consultation_request)", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    for (const key of ["RESEND_API_KEY", "LEAD_EMAIL_FROM", "LEAD_WEBHOOK_URL", "LEAD_WEBHOOK_SECRET", "ALLOW_LEAD_DISCARD"]) {
      vi.stubEnv(key, "");
    }
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  const configureEmail = () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("LEAD_EMAIL_FROM", "Greenlight Leads <leads@example.com>");
  };

  it("sends the email and reports success", async () => {
    configureEmail();
    vi.stubEnv("NODE_ENV", "production");
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "abc" }), { status: 200 }));

    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test_key");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["Telemasterindia@gmail.com"]);
    expect(body.subject).toBe("New Free Consultation Lead — Mary O'Neil");
  });

  it("fails when the email provider returns an error", async () => {
    configureEmail();
    vi.stubEnv("NODE_ENV", "production");
    fetchMock.mockResolvedValue(new Response("{}", { status: 500 }));
    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: false, reason: "failed" });
  });

  it("fails when the email provider times out or is unreachable", async () => {
    configureEmail();
    fetchMock.mockRejectedValue(Object.assign(new Error("timeout"), { name: "TimeoutError" }));
    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: false, reason: "failed" });
  });

  it("never logs provider responses, lead contents or credentials", async () => {
    configureEmail();
    fetchMock.mockResolvedValue(new Response("provider secret detail", { status: 401 }));
    await deliverSubmission("consultation_request", lead);
    const logged = (console.error as unknown as ReturnType<typeof vi.fn>).mock.calls.flat().join(" ");
    expect(logged).not.toContain("re_test_key");
    expect(logged).not.toContain("mary@example.com");
    expect(logged).not.toContain("provider secret detail");
  });

  it("fails safely in production when email is not configured (even with a webhook)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/lead");
    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps ALLOW_LEAD_DISCARD testing behaviour in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_LEAD_DISCARD", "true");
    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("also posts to the webhook when configured", async () => {
    configureEmail();
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/lead");
    vi.stubEnv("LEAD_WEBHOOK_SECRET", "hook-secret");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [hookUrl, hookInit] = fetchMock.mock.calls[1];
    expect(hookUrl).toBe("https://hooks.example.com/lead");
    expect(hookInit.headers["X-Webhook-Secret"]).toBe("hook-secret");
    const payload = JSON.parse(hookInit.body);
    expect(payload.type).toBe("consultation_request");
    expect(payload.data.email).toBe("mary@example.com");
  });

  it("still succeeds when the email is sent but the optional webhook fails", async () => {
    configureEmail();
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/lead");
    fetchMock
      .mockResolvedValueOnce(new Response("{}", { status: 200 }))
      .mockResolvedValueOnce(new Response("{}", { status: 502 }));
    expect(await deliverSubmission("consultation_request", lead)).toEqual({ ok: true });
  });
});

describe("deliverSubmission (contact_message) — existing webhook behaviour", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    for (const key of ["RESEND_API_KEY", "LEAD_EMAIL_FROM", "LEAD_WEBHOOK_URL", "ALLOW_LEAD_DISCARD"]) vi.stubEnv(key, "");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("posts to the webhook and does not send an email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("LEAD_EMAIL_FROM", "f@e.com");
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.com/contact");
    expect(await deliverSubmission("contact_message", { name: "Sam", email: "s@e.com", message: "Hello there" })).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("https://hooks.example.com/contact");
  });

  it("is rejected in production without a webhook", async () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(await deliverSubmission("contact_message", { name: "Sam" })).toEqual({ ok: false, reason: "not_configured" });
  });
});

describe("credentials stay server-side", () => {
  const files = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) && !p.endsWith(".test.ts") ? [p] : [];
    });
  const src = files(join(__dirname, "../.."));

  it("no client component references email or webhook secrets", () => {
    for (const file of src) {
      const code = readFileSync(file, "utf8");
      if (!/^\s*["']use client["']/m.test(code)) continue;
      expect(code, file).not.toMatch(/RESEND_API_KEY|LEAD_EMAIL_FROM|LEAD_WEBHOOK_URL|LEAD_WEBHOOK_SECRET|lead-email|server\/deliver/);
    }
  });

  it("no email/webhook credential is exposed as NEXT_PUBLIC_*", () => {
    for (const file of src) expect(readFileSync(file, "utf8"), file).not.toMatch(/NEXT_PUBLIC_(RESEND|LEAD|EMAIL|SMTP|WEBHOOK)/);
  });

  it("server delivery modules are guarded by server-only", () => {
    for (const f of ["lead-email.ts", "deliver.ts"]) {
      expect(readFileSync(join(__dirname, f), "utf8")).toMatch(/^import "server-only";/);
    }
  });
});
