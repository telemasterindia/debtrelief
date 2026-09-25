// Usage: node scripts/shot.mjs <path> <width> <outfile> [fullPage=1] [waitMs=2500]
import { chromium } from "@playwright/test";
const [, , path = "/", width = "1440", out = "qa-output/shot.png", full = "1", wait = "2500"] = process.argv;
const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const w = Number(width);
const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : w < 1100 ? 1180 : 900 }, deviceScaleFactor: 1 });
const logs = [];
page.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`); });
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
await page.goto(base + path + (process.env.FORCE3D ? (path.includes("?") ? "&force3d" : "?force3d") : ""), { waitUntil: "networkidle" });
await page.waitForTimeout(Number(wait));
if (full === "1") {
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
  await page.waitForTimeout(800);
}
if (full.startsWith("sel:")) {
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")));
  const sels = full.slice(4).split("|");
  let i = 0;
  for (const sel of sels) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await el.screenshot({ path: out.replace(".png", `-${i++}.png`) });
  }
} else {
  await page.screenshot({ path: out, fullPage: full === "1" });
}
console.log(logs.join("\n") || "no console errors");
await browser.close();
