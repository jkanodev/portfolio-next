"use client";

import { cn } from "@/lib/utils";

type Chip = { id: string; label: string };

export default function FilterChips({
  chips,
  selected,
  onToggle,
  className,
}: {
  chips: Chip[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onToggle(chip.id)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-colors",
            selected.has(chip.id)
              ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
              : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text)]"
          )}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
