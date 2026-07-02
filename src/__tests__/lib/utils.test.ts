import { describe, it, expect } from "vitest";
import { slugify, highlightText } from "@/lib/utils";

describe("slugify", () => {
  it("converts text to lowercase kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("What is love?")).toBe("what-is-love");
  });

  it("collapses multiple spaces/hyphens", () => {
    expect(slugify("foo   bar--baz")).toBe("foo-bar-baz");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("--hello--")).toBe("hello");
  });
});

describe("highlightText", () => {
  it("wraps matching words in <mark> tags", () => {
    const result = highlightText("The quick brown fox", "quick");
    expect(result).toContain("<mark>quick</mark>");
  });

  it("is case-insensitive", () => {
    const result = highlightText("Hello World", "hello");
    expect(result).toContain("<mark>Hello</mark>");
  });

  it("handles multiple query words", () => {
    const result = highlightText("The quick brown fox", "quick fox");
    expect(result).toContain("<mark>quick</mark>");
    expect(result).toContain("<mark>fox</mark>");
  });

  it("escapes regex special characters", () => {
    const result = highlightText("price is $10.00", "$10");
    expect(result).toContain("<mark>$10</mark>");
  });

  it("returns original text for empty query", () => {
    expect(highlightText("Hello", "")).toBe("Hello");
    expect(highlightText("Hello", "   ")).toBe("Hello");
  });
});
