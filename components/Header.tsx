"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import MobileMenuOffcanvas from "./MobileMenuOffcanvas";


const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "What I've Learned", href: "/#what-ive-learned" },
  { label: "Proof", href: "/#proof" },
  { label: "Knowledge Base", href: "/knowledge" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();

  // Load Bootstrap JS only on client so prerender never sees document/window
  useEffect(() => {
    import("bootstrap");
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/80">
        <div className="mx-auto flex max-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="text-lg font-semibold text-[var(--text)] hover:text-[var(--accent)]">
            Joseph Kano
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-[var(--text)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] p-2 text-[var(--text)] md:hidden"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileNav"
              aria-controls="mobileNav"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenuOffcanvas items={navItems} />
    </>
  );
}
