import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ReligionBadge from "@/components/ui/ReligionBadge";

describe("ReligionBadge", () => {
  it("renders religion name", () => {
    render(<ReligionBadge religion="Buddhism" />);
    expect(screen.getByText("Buddhism")).toBeInTheDocument();
  });

  it("renders all religions", () => {
    const religions = [
      "Hinduism",
      "Christianity",
      "Islam",
      "Judaism",
      "Sikhism",
      "Buddhism",
    ] as const;
    for (const r of religions) {
      const { unmount } = render(<ReligionBadge religion={r} />);
      expect(screen.getByText(r)).toBeInTheDocument();
      unmount();
    }
  });
});
