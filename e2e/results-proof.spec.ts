import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { proofDocuments } from "../src/lib/content/proof-documents";

const path = "/results-and-proof";

test("Results & Proof: title, description, noindex, disclaimer and closing CTA", async ({ page }) => {
  const response = await page.goto(path);
  expect(response?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page).toHaveTitle("Results & Proof | Greenlight Debt Relief");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Real examples and documentation from individual debt cases. Review redacted documents and learn more about what debt settlement and resolution outcomes can look like.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*nofollow/);
  await expect(page.getByText("not typical or guaranteed results", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Want to See What Options May Be Available for You?" })).toBeVisible();
  await expect(page.getByText("Development placeholder")).toHaveCount(0);
});

test("Results & Proof: every document card shows its details and links to its PDF", async ({ page }) => {
  await page.goto(path);
  const cards = page.locator("article[aria-labelledby^='proof-']");
  await expect(cards).toHaveCount(proofDocuments.length);
  for (const [i, doc] of proofDocuments.entries()) {
    const card = cards.nth(i);
    await expect(card.getByText(doc.institution, { exact: true })).toBeVisible();
    await expect(card.getByRole("heading", { name: doc.title })).toBeVisible();
    await expect(card.getByText(doc.description)).toBeVisible();
    const view = card.getByRole("link", { name: /^View Proof/ });
    await expect(view).toHaveAttribute("href", doc.pdfPath);
    await expect(card.getByRole("link", { name: /^Open PDF/ })).toHaveAttribute("href", doc.pdfPath);
  }
});

test("Results & Proof: PDFs are served inline, framable only by this site, and noindex", async ({ request }) => {
  for (const doc of proofDocuments) {
    const res = await request.get(doc.pdfPath);
    expect(res.status(), doc.pdfPath).toBe(200);
    const h = res.headers();
    expect(h["content-type"]).toContain("application/pdf");
    expect(h["content-disposition"]).toContain("inline");
    expect(h["x-frame-options"]).toBe("SAMEORIGIN");
    expect(h["content-security-policy"]).toContain("frame-ancestors 'self'");
    expect(h["x-robots-tag"]).toContain("noindex");
    expect((await res.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
});

test("Results & Proof: nav order is How It Works, Results & Proof, FAQs (header and footer)", async ({ page, isMobile }) => {
  await page.goto(path);
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const header = await page.getByRole("navigation", { name: "Main" }).getByRole("link").allTextContents();
  const h = header.map((t) => t.trim());
  expect(h.indexOf("Results & Proof")).toBe(h.indexOf("How It Works") + 1);
  expect(h.indexOf("FAQs")).toBe(h.indexOf("Results & Proof") + 1);
  if (isMobile) await page.keyboard.press("Escape");
  await expect(page.locator("footer").getByRole("link", { name: "Results & Proof", exact: true })).toHaveAttribute("href", path);
});

test("Results & Proof: in-page viewer on desktop, new tab on mobile", async ({ page, isMobile }) => {
  await page.goto(path);
  const first = proofDocuments[0];
  const view = page.getByRole("link", { name: /^View Proof/ }).first();
  if (isMobile) {
    await expect(view).toHaveAttribute("target", "_blank");
    // Headless Chromium downloads PDFs instead of showing them, so check the new tab requests the PDF.
    const [popup, request] = await Promise.all([
      page.waitForEvent("popup"),
      page.context().waitForEvent("request", (r) => r.url().endsWith(first.pdfPath)),
      view.click(),
    ]);
    expect(popup).toBeTruthy();
    expect((await request.response())?.status()).toBe(200);
    return;
  }
  const pdf = page.waitForResponse((r) => r.url().endsWith(first.pdfPath));
  await view.click();
  const dialog = page.getByRole("dialog", { name: first.title });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(first.institution, { exact: true })).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute("src", `${first.pdfPath}#view=FitH`);
  expect((await pdf).status()).toBe(200);
  await expect(dialog.getByRole("link", { name: /Open Full PDF/ })).toHaveAttribute("href", first.pdfPath);
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(view).toBeFocused();
});

for (const width of [375, 390, 430, 1280, 1440]) {
  test(`Results & Proof: no horizontal overflow and accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(path);
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const columns = await page.locator("article[aria-labelledby^='proof-']").evaluateAll(
      (els) => new Set(els.map((el) => Math.round(el.getBoundingClientRect().left))).size,
    );
    expect(columns).toBe(width >= 1024 ? 3 : width >= 640 ? 2 : 1);
    const results = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
}
