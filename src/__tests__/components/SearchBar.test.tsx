import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/ui/SearchBar";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("SearchBar", () => {
  it("renders search input", () => {
    render(<SearchBar />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders large variant with search icon", () => {
    render(<SearchBar large />);
    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("enterKeyHint", "search");
  });

  it("has proper accessibility attributes", () => {
    render(<SearchBar />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("inputMode", "search");
    expect(input).toHaveAttribute("aria-label", "Search sacred texts");
  });

  it("navigates to search page on submit", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox");
    await user.type(input, "peace");
    await user.keyboard("{Enter}");
    expect(mockPush).toHaveBeenCalledWith("/search?q=peace");
  });

  it("shows autocomplete suggestions when typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("combobox");
    await user.type(input, "pea");
    const suggestions = await screen.findAllByRole("option");
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
