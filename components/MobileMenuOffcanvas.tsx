"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type Item = { label: string; href: string };

type Props = { open: boolean; onClose: () => void; items: Item[] };

export default function MobileMenu({ open, onClose, items }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop - tap to close */}
      <button
        type="button"
        className="absolute inset-0 bg-black/90"
        aria-label="Close menu"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col border-l border-[var(--border)] bg-[var(--bg)] shadow-[-8px_0_32px_rgba(0,0,0,0.4)]"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="flex min-h-[56px] items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h2 className="text-lg font-semibold text-[var(--text)]" id="mobileNavLabel">
            Menu
          </h2>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto" aria-label="Main navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[48px] items-center border-b border-[var(--border)] px-5 py-3 text-[var(--text)] hover:bg-[var(--surface)]"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
