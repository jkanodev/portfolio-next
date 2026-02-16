import Link from "next/link";
import { AlertCircle, BookOpen, Layers } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[var(--text)]">Knowledge Base</h1>
      <p className="text-[var(--text-muted)]">
        Search above or browse by section. Every entry is readable aloud.
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          href="/knowledge/errors"
          className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--text-muted)]/30"
        >
          <AlertCircle className="h-10 w-10 text-[var(--accent)]" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--text)]">Errors Wiki</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Real errors: symptoms, root cause, fix steps, commands, prevention.
          </p>
        </Link>
        <Link
          href="/knowledge/commands"
          className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--text-muted)]/30"
        >
          <BookOpen className="h-10 w-10 text-[var(--accent)]" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--text)]">Commands Library</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Commands by domain with copy button and when to use.
          </p>
        </Link>
        <Link
          href="/knowledge/kubernetes"
          className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--text-muted)]/30"
        >
          <Layers className="h-10 w-10 text-[var(--accent)]" />
          <h2 className="mt-4 text-lg font-semibold text-[var(--text)]">Kubernetes Notes</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Roadmap status: completed, in progress, not started.
          </p>
        </Link>
      </div>
    </div>
  );
}
