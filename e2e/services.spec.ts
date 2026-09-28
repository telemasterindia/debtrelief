import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allServices, serviceDisclaimer, serviceGroups } from "../src/lib/content/services";

test.describe("desktop Services mega-menu", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("opens on click, lists every service, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Services" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`.replace(/:/g, "\\:"));
    await expect(panel).toBeVisible();
    for (const g of serviceGroups) await expect(panel.getByText(g.title, { exact: true })).toBeVisible();
    for (const s of allServices) {
      await expect(panel.getByRole("link", { name: new RegExp(`^${s.title.replace(/[/]/g, "\\/")}`) })).toHaveAttribute("href", `/services/${s.slug}`);
    }
    await expect(panel.getByRole("link", { name: "View all services" })).toHaveAttribute("href", "/services");
    await expect(panel.getByRole("link", { name: /Get Free Consultation/ })).toHaveAttribute("href", "/free-consultation");

    // Keyboard: Tab moves into the panel.
    await button.focus();
    await page.keyboard.press("Tab");
    await expect(panel.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("opens on hover, closes on outside click, and navigates", async ({ page }) => {
    await page.goto("/about");
    const button = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Services" });
    await button.hover();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await page.mouse.click(10, 880); // below the full-width panel
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await button.click();
    await page.getByRole("link", { name: /^Tax Relief/ }).click();
    await expect(page).toHaveURL(/\/services\/tax-relief$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tax Relief");
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("header still fits at 1280px with the Services item", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole("link", { name: "Get Free Consultation" }).first()).toBeVisible();
  });
});

test.describe("mobile Services accordion", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("Services → group → service link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const services = page.getByRole("button", { name: "Services", exact: true });
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    for (const g of serviceGroups) {
      await expect(page.getByRole("button", { name: new RegExp(`^${g.title}`) })).toHaveAttribute("aria-expanded", "false");
    }
    // Service links stay hidden until their group is opened (no accidental taps).
    await expect(page.getByRole("link", { name: "Debt Settlement" })).toBeHidden();
    await page.getByRole("button", { name: /^Business & Tax/ }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.getByRole("link", { name: "Personal Tax Debt Relief" }).click();
    await expect(page).toHaveURL(/\/services\/personal-tax-debt-relief$/);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

for (const path of ["/services", ...allServices.map((s) => `/services/${s.slug}`)]) {
  test(`${path}: loads, one h1, noindex, accessible`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByText(serviceDisclaimer)).toHaveCount(1);
    if (path !== "/services") {
      await expect(page.getByRole("link", { name: /Explore Your Options/ })).toHaveAttribute("href", "/free-consultation");
    }
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
    await page.waitForTimeout(900);
    const results = await new AxeBuilder({ page: page as never }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}

for (const width of [375, 390, 430]) {
  test(`services pages have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ["/services", "/services/debt-settlement", "/services/dti-improvement"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

test("unknown service slugs return 404", async ({ page }) => {
  const response = await page.goto("/services/not-a-service");
  expect(response?.status()).toBe(404);
});
