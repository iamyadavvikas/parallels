import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ThemeContext } from "@/components/layout/ThemeProvider";

const mockSetTheme = vi.fn();
let mockTheme = "light";

vi.mock("@/components/layout/ThemeProvider", () => ({
  useThemeContext: () => ({
    theme: mockTheme,
    setTheme: (t: string) => {
      mockTheme = t;
      mockSetTheme(t);
    },
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockTheme = "light";
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
