import { expect, test } from "@playwright/test";

test("About page: overview video sits between the intro and Why Greenlight", async ({ page }) => {
  await page.goto("/about");
  const video = page.locator('iframe[title="Greenlight Debt Relief overview"]');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/7sU_x_hj6u8(\?|$)/);
  await expect(video).toHaveAttribute("loading", "lazy");
  expect(await video.getAttribute("src")).not.toContain("autoplay");
  await expect(page.getByRole("heading", { level: 2, name: "Get to Know Greenlight Debt Relief" })).toBeVisible();

  // Order: intro answers → video heading → Why Greenlight heading.
  const order = await page.evaluate(() => {
    const top = (el: Element | null) => (el ? el.getBoundingClientRect().top + window.scrollY : NaN);
    return {
      intro: top(document.querySelector("dl")),
      video: top(document.getElementById("about-video-title")),
      why: top(document.getElementById("why-title")),
    };
  });
  expect(order.intro).toBeLessThan(order.video);
  expect(order.video).toBeLessThan(order.why);
});

for (const width of [375, 390, 430, 1280, 1440]) {
  test(`About page: video is 16:9 with no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const box = await page.locator('iframe[title="Greenlight Debt Relief overview"]').boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs(box!.width / box!.height - 16 / 9)).toBeLessThan(0.02);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
