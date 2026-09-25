import { expect, test } from "@playwright/test";

test.describe("free consultation form", () => {
  test("shows clear errors, then submits successfully", async ({ page }) => {
    await page.goto("/free-consultation");
    await expect(page.getByRole("heading", { level: 1, name: "Request Your Free Consultation" })).toBeVisible();
    await expect(page.getByText("Step 1 of 4:")).toBeVisible();

    // Step 1: try to continue with empty fields.
    await page.getByRole("button", { name: "Continue to step 2" }).click();
    const alert = page.locator("form [role=alert]");
    await expect(alert).toContainText("Please enter your first name.");
    await expect(alert).toContainText("Please enter your last name.");
    await expect(page.getByLabel("First name")).toHaveAttribute("aria-invalid", "true");

    await page.getByLabel("First name").fill("Mary");
    await page.getByLabel("Last name").fill("O'Neil");
    await page.getByRole("button", { name: "Continue to step 2" }).click();

    // Step 2
    await expect(page.getByRole("heading", { name: "Your debt" })).toBeFocused();
    await page.getByRole("button", { name: "Continue to step 3" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("Please choose the type of debt.");
    await page.getByLabel("Credit card debt").check();
    await page.getByLabel("$10,000 – $25,000").check();
    await page.getByRole("group", { name: /debt collector contacted you/ }).getByLabel("Yes").check();
    await page.getByLabel("Which state do you live in?").selectOption("OH");
    await page.getByRole("button", { name: "Continue to step 3" }).click();

    // Step 3
    await page.getByLabel("Email address").fill("not-an-email");
    await page.getByLabel("Phone number").fill("555");
    await page.getByRole("button", { name: "Continue to step 4" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("complete email address");
    await expect(page.locator("form [role=alert]")).toContainText("10-digit U.S. phone number");
    await page.getByLabel("Email address").fill("mary@example.com");
    await page.getByLabel("Phone number").fill("(614) 555-0142");
    await page.getByRole("button", { name: "Continue to step 4" }).click();

    // Step 4: summary, edit, consent
    await expect(page.getByText("Please check your answers")).toBeVisible();
    await expect(page.getByText("Mary O'Neil")).toBeVisible();
    await page.getByRole("button", { name: "Edit name" }).click();
    await expect(page.getByLabel("First name")).toHaveValue("Mary");
    for (const n of [2, 3, 4]) await page.getByRole("button", { name: `Continue to step ${n}` }).click();

    await page.getByRole("button", { name: "Request My Free Consultation" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("contact you about your request");
    await page.getByLabel(/may contact me by phone call or email/).check();
    await page.getByLabel(/I have read the/).check();
    await page.getByRole("button", { name: "Request My Free Consultation" }).click();

    await expect(page.getByRole("heading", { name: "Your Request Has Been Received." })).toBeFocused();
    await expect(page.getByText("No obligation.", { exact: true })).toBeVisible();
  });

  test("Back keeps previous answers", async ({ page }) => {
    await page.goto("/free-consultation");
    await page.getByLabel("First name").fill("Ann");
    await page.getByLabel("Last name").fill("Lee");
    await page.getByRole("button", { name: "Continue to step 2" }).click();
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByLabel("First name")).toHaveValue("Ann");
  });

  test("old /request-review URL redirects", async ({ page }) => {
    await page.goto("/request-review");
    await expect(page).toHaveURL(/\/free-consultation$/);
  });

  test("server rejects invalid payloads", async ({ request }) => {
    const res = await request.post("/api/consultation-request", { data: { firstName: "" } });
    expect(res.status()).toBe(422);
  });
});

test("contact form validates and sends", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send My Message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await page.getByLabel("Your name").fill("Sam Doe");
  await page.getByLabel("Email address").fill("sam@example.com");
  await page.getByLabel("Your message").fill("How long does a review usually take?");
  await page.getByRole("button", { name: "Send My Message" }).click();
  await expect(page.getByRole("heading", { name: "Your Message Has Been Sent." })).toBeVisible();
});
