"use client";




import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] shadow-xl",
          className
        )}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
          <h2 id="modal-title" className="text-lg font-semibold text-[var(--text)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
