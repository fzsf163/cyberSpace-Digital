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
  coverImage: "/placeholder.jpg",
};

describe("WorkCard", () => {
  it("renders title, category, year, client and summary", () => {
    render(<WorkCard item={baseItem} />);

    expect(screen.getByRole("heading", { name: "Test Project" })).toBeInTheDocument();
    // The category is rendered as-authored; the UI uppercases it with CSS
    // (`uppercase` utility on the category/year row), not by transforming
    // the text itself.
    const category = screen.getByText("Brand");
    expect(category).toBeInTheDocument();
    expect(category.parentElement).toHaveClass("uppercase");
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("Acme Health")).toBeInTheDocument();
    expect(screen.getByText("A one-line summary of the test project.")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("renders an external link when item.href is set", () => {
    render(<WorkCard item={{ ...baseItem, href: "https://example.com/case-study" }} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/case-study");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders no link when item.href is absent", () => {
    render(<WorkCard item={baseItem} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
