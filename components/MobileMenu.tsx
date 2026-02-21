"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

type Item = { label: string; href: string };

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

export default function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      previousActiveRef.current = document.activeElement as HTMLElement | null;
    } else {
      document.body.style.overflow = "";
      previousActiveRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = getFocusables(panelRef.current);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusables = getFocusables(panelRef.current);
    const first = focusables[0];
    if (first) {
      requestAnimationFrame(() => first.focus());
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div
        className="absolute inset-0 bg-[var(--bg)] opacity-[0.98]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 backdrop-blur-sm"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-default"
        aria-label="Close menu"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 z-10 flex h-full w-full max-w-[360px] flex-col border-l border-[var(--border)] bg-[var(--bg)] p-5"
        style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.3)" }}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-muted)]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Main navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex min-h-[48px] items-center rounded-lg px-4 py-3 text-[var(--text)] hover:bg-[var(--surface)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
