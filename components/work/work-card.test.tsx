import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WorkCard } from "@/components/work/work-card";
import type { WorkItem } from "@/lib/data/work";

const baseItem: WorkItem = {
  slug: "test-project",
  title: "Test Project",
  category: "Brand",
  year: 2025,
  client: "Acme Health",
  summary: "A one-line summary of the test project.",
  coverImage: "/images/bridge.png",
};

describe("WorkCard", () => {
  it("renders title, category, summary and cover image", () => {
    render(<WorkCard item={baseItem} />);

    expect(screen.getByRole("heading", { name: "Test Project" })).toBeInTheDocument();
    // The category is rendered as-authored; the UI uppercases it with CSS
    // (`uppercase` utility on the category chip), not by transforming the text.
    const category = screen.getByText("Brand");
    expect(category).toBeInTheDocument();
    expect(category).toHaveClass("uppercase");
    expect(screen.getByText("A one-line summary of the test project.")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("links to the project's detail page by slug", () => {
    render(<WorkCard item={baseItem} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/work/test-project");
  });
});
