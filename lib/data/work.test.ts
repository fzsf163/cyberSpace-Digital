import { describe, expect, it } from "vitest";

import { workItems } from "@/lib/data/work";

describe("workItems data integrity", () => {
  it("has unique slugs", () => {
    const slugs = workItems.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a non-empty title, summary and coverImage on every item", () => {
    for (const item of workItems) {
      expect(item.title.trim(), `title of "${item.slug}"`).not.toBe("");
      expect(item.summary.trim(), `summary of "${item.slug}"`).not.toBe("");
      expect(item.coverImage.trim(), `coverImage of "${item.slug}"`).not.toBe("");
    }
  });

  it("has at least 4 featured items for the home page Featured Work section", () => {
    const featured = workItems.filter((item) => item.featured);
    expect(featured.length).toBeGreaterThanOrEqual(4);
  });

  it("uses root-relative coverImage paths (served from /public)", () => {
    for (const item of workItems) {
      expect(item.coverImage, `coverImage of "${item.slug}"`).toMatch(/^\//);
    }
  });
});
