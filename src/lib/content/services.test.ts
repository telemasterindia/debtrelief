import { describe, expect, it } from "vitest";
import { allServices, findService, serviceDisclaimer, serviceGroups, servicePath } from "./services";

describe("services content", () => {
  it("has the four groups with 7 / 2 / 5 / 1 services", () => {
    expect(serviceGroups.map((g) => [g.title, g.services.length])).toEqual([
      ["Personal Debt", 7],
      ["Credit & Financial Health", 2],
      ["Business & Tax", 5],
      ["Student Loans", 1],
    ]);
  });

  it("has unique, URL-safe slugs that resolve", () => {
    expect(new Set(allServices.map((s) => s.slug)).size).toBe(allServices.length);
    for (const s of allServices) {
      expect(s.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(findService(s.slug)?.service).toBe(s);
      expect(servicePath(s.slug)).toBe(`/services/${s.slug}`);
    }
  });

  it("every service has the page content filled in", () => {
    for (const s of allServices) {
      expect(s.overview.length, s.slug).toBeGreaterThan(0);
      expect(s.mayHelp.length, s.slug).toBeGreaterThan(1);
      expect(s.consider.length, s.slug).toBeGreaterThan(1);
      expect(s.haveReady.length, s.slug).toBeGreaterThan(1);
    }
  });

  it("promises no outcomes and doesn't repeat no-guarantee language", () => {
    for (const s of allServices) {
      const text = [s.title, s.menuText, s.description, ...s.overview, ...s.mayHelp, ...s.consider, ...s.haveReady]
        .join(" ")
        .toLowerCase();
      expect(text, s.slug).not.toMatch(
        /(?<!personal )guarantee|we will|you will|eliminate|approv|increase your (credit )?score|in \d+ months|save \$|\d+%|not all|may not qualify/,
      );
    }
  });

  it("keeps one short, general disclaimer", () => {
    expect(serviceDisclaimer).toBe(
      "Options and results vary based on individual circumstances. A consultation does not guarantee eligibility or a specific outcome.",
    );
  });
});
