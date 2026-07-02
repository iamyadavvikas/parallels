"use client";

import { useThemeContext } from "@/components/layout/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  const [rotating, setRotating] = useState(false);

  function handleToggle() {
    setRotating(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setRotating(false), 400);
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-all hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      <span className={`theme-toggle-icon ${rotating ? "rotate" : ""}`}>
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </button>
  );
}
