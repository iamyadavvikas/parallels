import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookCard from "@/components/ui/BookCard";
import type { Book, Religion } from "@/lib/types";

const mockBook: Book = {
  id: "bible",
  title: "The Bible",
  religion: "Christianity" as Religion,
  slug: "bible",
  description: "The sacred scripture of Christianity.",
  summary: "A collection of ancient texts.",
  originDate: "c. 1st century CE",
  originalLanguage: "Hebrew, Greek",
  era: "Antiquity",
  centralThemes: ["Faith", "Redemption"],
  structure: "Old and New Testaments",
  quickFacts: [
    { label: "Chapters", value: "1,189" },
    { label: "Verses", value: "31,102" },
  ],
  chapters: [],
};

describe("BookCard", () => {
  it("renders book title", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText("The Bible")).toBeInTheDocument();
  });

  it("renders religion badge", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText("Christianity")).toBeInTheDocument();
  });

  it("renders tradition theme", () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText("Covenant")).toBeInTheDocument();
  });

  it("links to book detail page", () => {
    render(<BookCard book={mockBook} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/books/bible");
  });
});
