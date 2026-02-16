"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import errorsData from "@/data/errors.json";
import ErrorCard from "@/components/ErrorCard";
import FilterChips from "@/components/FilterChips";
import ReadAloudButton from "@/components/ReadAloudButton";
import CopyButton from "@/components/CopyButton";
import { buildNarrationFromError } from "@/lib/utils";
import type { ErrorEntry } from "@/components/ErrorCard";

const errors = errorsData as ErrorEntry[];
const categories = Array.from(new Set(errors.map((e) => e.category))).map((id) => ({
  id,
  label: id,
}));

function ErrorDetail({ entry }: { entry: ErrorEntry }) {
  const narration = buildNarrationFromError(entry);
  return (
    <article className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase text-[var(--text-muted)]">{entry.category}</span>
          <h2 className="mt-1 text-xl font-semibold text-[var(--text)]">{entry.title}</h2>
        </div>
        <ReadAloudButton text={narration} />
      </div>
      <section className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium text-[var(--text)]">Overview</h3>
          <p className="mt-1 text-[var(--text-muted)]">{entry.summary}</p>
        </div>
        {entry.symptoms && entry.symptoms.length > 0 && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Symptoms</h3>
            <ul className="mt-1 list-inside list-disc text-[var(--text-muted)]">
              {entry.symptoms.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {entry.root_cause && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Root cause</h3>
            <p className="mt-1 text-[var(--text-muted)]">{entry.root_cause}</p>
          </div>
        )}
        {entry.fix_steps && entry.fix_steps.length > 0 && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Fix steps</h3>
            <ul className="mt-1 space-y-2 text-[var(--text-muted)]">
              {entry.fix_steps.map((f, i) => (
                <li key={i}>
                  <span className="text-[var(--text)]">{f.step}</span>
                  <span className="block text-xs">Why: {f.why}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {entry.commands && entry.commands.length > 0 && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Commands</h3>
            <ul className="mt-2 space-y-2">
              {entry.commands.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-2 rounded bg-[var(--bg)] px-3 py-2">
                  <code className="text-xs text-[var(--text)]">{c.cmd}</code>
                  <CopyButton text={c.cmd} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {entry.verification_steps && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Verification</h3>
            <ul className="mt-1 list-inside list-disc text-[var(--text-muted)]">
              {entry.verification_steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {entry.prevention && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Prevention</h3>
            <ul className="mt-1 list-inside list-disc text-[var(--text-muted)]">
              {entry.prevention.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        {entry.related_entries && entry.related_entries.length > 0 && (
          <div>
            <h3 className="font-medium text-[var(--text)]">Related</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{entry.related_entries.join(", ")}</p>
          </div>
        )}
      </section>
    </article>
  );
}

export default function ErrorsPage() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  const selectedEntry = useMemo(() => (idFromUrl ? errors.find((e) => e.id === idFromUrl) : null), [idFromUrl]);
  const filtered = useMemo(() => {
    if (selectedCategory.size === 0) return errors;
    return errors.filter((e) => selectedCategory.has(e.category));
  }, [selectedCategory]);

  const toggleCategory = (id: string) => {
    setSelectedCategory((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text)]">Errors Wiki</h1>
      <p className="text-[var(--text-muted)]">
        Real troubleshooting entries. Overview, symptoms, root cause, fix, verification, prevention.
      </p>
      {selectedEntry && <ErrorDetail entry={selectedEntry} />}
      <FilterChips chips={categories} selected={selectedCategory} onToggle={toggleCategory} />
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((entry) => (
          <ErrorCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
