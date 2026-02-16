"use client";

import Link from "next/link";
import ReadAloudButton from "./ReadAloudButton";
import { buildNarrationFromError } from "@/lib/utils";

export type ErrorEntry = {
  id: string;
  title: string;
  category: string;
  tags?: string[];
  summary: string;
  narration?: string;
  symptoms?: string[];
  root_cause?: string;
  fix_steps?: { step: string; why: string }[];
  commands?: { cmd: string; note: string }[];
  verification_steps?: string[];
  prevention?: string[];
  related_entries?: string[];
};

export default function ErrorCard({ entry }: { entry: ErrorEntry }) {
  const narration = buildNarrationFromError(entry);

  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--text-muted)]/30">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            {entry.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-[var(--text)]">
            {entry.title}
          </h3>
        </div>
        <ReadAloudButton text={narration} />
      </div>
      <p className="text-sm text-[var(--text-muted)]">{entry.summary}</p>
      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-[var(--bg)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/knowledge/errors?id=${entry.id}`}
        className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
      >
        View
      </Link>
    </article>
  );
}
