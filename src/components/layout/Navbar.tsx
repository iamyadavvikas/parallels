"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { BookOpen, Search, Layers, GitCompare, Bookmark } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Logo from "../ui/Logo";

const navLinks = [
  { href: "/", label: "Library", icon: BookOpen },
  { href: "/search", label: "Search", icon: Search },
  { href: "/topics", label: "Topics", icon: Layers },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/bookmarks", label: "Saved", icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const updateIndicator = useCallback(() => {
    const activeLink = navRefs.current.get(pathname);
    const indicator = indicatorRef.current;
    if (!activeLink || !indicator) return;
    const navRect = activeLink.closest("div")?.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    if (!navRect) return;
    indicator.style.left = `${linkRect.left - navRect.left}px`;
    indicator.style.width = `${linkRect.width}px`;
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (window.innerWidth < 768) {
        setHidden(y > lastScrollY.current && y > 100);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => { clearTimeout(timer); window.removeEventListener("resize", updateIndicator); };
  }, [updateIndicator]);

  return (
    <>
      {/* Desktop */}
      <nav className={`sticky top-0 z-50 hidden md:block transition-all duration-500 ${
        scrolled
          ? "border-b border-border/30 bg-bg-primary/60 backdrop-blur-[24px] saturate-[1.8] shadow-[0_1px_0_var(--color-shadow-sm),0_0_60px_rgba(255,209,102,0.03)]"
          : "border-b border-transparent bg-transparent"
      }`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 text-base font-bold text-text-primary font-display group">
            <Logo size={28} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-tight">Parallels</span>
          </Link>

          <div className="relative flex items-center gap-0.5">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                ref={(el) => { if (el) navRefs.current.set(href, el); }}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium font-body transition-all duration-200 ${
                  pathname === href
                    ? "text-accent bg-accent/6"
                    : "text-text-muted hover:bg-bg-tertiary/50 hover:text-text-primary"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
            <div ref={indicatorRef} className="nav-slide-indicator" />
            <div className="ml-2 border-l border-border/40 pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-bg-primary/60 backdrop-blur-[24px] saturate-[1.8] md:hidden transition-all duration-300 ${
        hidden ? "nav-hidden" : "nav-visible"
      }`}>
        <div className="flex items-center justify-around py-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`mobile-nav-btn ${pathname === href ? "active" : ""}`}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
