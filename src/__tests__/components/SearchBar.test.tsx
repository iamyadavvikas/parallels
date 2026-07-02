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
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders large variant with search icon", () => {
    render(<SearchBar large />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("enterKeyHint", "search");
  });

  it("has proper accessibility attributes", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("type", "search");
    expect(input).toHaveAttribute("inputMode", "search");
  });

  it("navigates to search page on submit", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "peace");
    await user.keyboard("{Enter}");
    expect(mockPush).toHaveBeenCalledWith("/search?q=peace");
  });
});
