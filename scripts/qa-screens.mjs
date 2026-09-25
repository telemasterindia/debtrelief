// Visual QA: captures key regions at every target width.
// Usage: BASE_URL=http://localhost:3000 node scripts/qa-screens.mjs
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL || "http://localhost:3000";
const widths = (process.env.WIDTHS || "375,390,430,768,1024,1280,1440,1920").split(",").map(Number);
mkdirSync("qa-output/matrix", { recursive: true });
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const problems = [];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 844 : w < 1200 ? 1100 : 1000 } });
  page.on("pageerror", (e) => problems.push(`${w}: ${e.message}`));
  await page.goto(`${base}/${w >= 768 ? "?force3d" : ""}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(w >= 768 ? 6000 : 1500);
  await page.screenshot({ path: `qa-output/matrix/${w}-hero.png` });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) problems.push(`${w}: horizontal overflow ${overflow}px`);
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
  for (const [name, sel] of [["video", "#video"], ["why", "section[aria-labelledby=why-title]"], ["help", "section[aria-labelledby=help-title]"], ["about", "section[aria-labelledby=about-title]"], ["process", "section[aria-labelledby=process-title]"], ["footer", "footer"]]) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: `qa-output/matrix/${w}-${name}.png` });
  }
  await page.goto(`${base}/free-consultation`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Continue to step 2/ }).click();
  await page.waitForTimeout(400);
  await page.locator("form").first().screenshot({ path: `qa-output/matrix/${w}-form.png` });
  await page.close();
}
console.log(problems.length ? problems.join("\n") : "no overflow or page errors");
await browser.close();
