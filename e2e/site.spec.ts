import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/debt-validation",
  "/how-it-works",
  "/faq",
  "/about",
  "/contact",
  "/request-review",
  "/resources",
  "/resources/debt-validation-letter",
  "/resources/debt-collector-contacted-you",
  "/resources/old-debts-and-time-limits",
  "/resources/spot-debt-collection-scams",
  "/privacy",
  "/terms",
  "/disclaimer",
];

for (const path of paths) {
  test(`${path}: accessible, one h1, unique SEO tags`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));

    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(new RegExp(`${path === "/" ? "/?$" : path}$`));
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    expect((await page.title()).length).toBeGreaterThan(10);

    // Every JSON-LD block must be valid JSON and must never contain ratings or reviews.
    for (const block of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      const json = JSON.parse(block);
      expect(JSON.stringify(json)).not.toMatch(/AggregateRating|"Review"/);
    }

    // No horizontal scrolling.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("body text is at least 17px", async ({ page }) => {
  await page.goto("/");
  const size = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
  expect(size).toBeGreaterThanOrEqual(17);
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("FAQ accordion opens with the keyboard", async ({ page }) => {
  await page.goto("/faq");
  const summary = page.locator("#does-it-eliminate-debt summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#does-it-eliminate-debt")).toHaveAttribute("open", "");
  await expect(page.getByText("does not erase or eliminate a debt you legitimately owe")).toBeVisible();
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/debt-validation</loc>");
  expect(sitemap).toContain("/resources/old-debts-and-time-limits</loc>");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap:");
  const og = await request.get("/og/faq");
  expect(og.headers()["content-type"]).toContain("image/png");
});

test("unknown pages return 404", async ({ page }) => {
  const res = await page.goto("/not-a-real-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "We couldn't find that page." })).toBeVisible();
});
