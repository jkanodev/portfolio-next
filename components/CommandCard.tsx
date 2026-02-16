import CopyButton from "./CopyButton";

export type CommandEntry = {
  id: string;
  domain: string;
  command: string;
  what_it_does: string;
  when_to_use: string;
  example_output_or_expectation: string;
  common_mistakes: string;
};

export default function CommandCard({ entry }: { entry: CommandEntry }) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          {entry.domain}
        </span>
        <CopyButton text={entry.command} />
      </div>
      <code className="mt-2 block rounded bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)]">
        {entry.command}
      </code>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{entry.what_it_does}</p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        When: {entry.when_to_use}
      </p>
    </article>
  );
}
