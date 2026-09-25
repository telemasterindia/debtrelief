import { expect, test } from "@playwright/test";

test("mobile menu opens, lists all pages, and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
  for (const label of ["Debt Relief", "How It Works", "Resources", "FAQ", "About", "Contact"]) {
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("phones get the static hero illustration (no WebGL canvas)", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.waitForTimeout(2500);
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("the review CTA is visible above the fold", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Get My Free Consultation/ }).first()).toBeInViewport();
});

test("reduced motion: content is visible without animation", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "What You Can Expect From Us." })).toBeVisible();
  await context.close();
});
