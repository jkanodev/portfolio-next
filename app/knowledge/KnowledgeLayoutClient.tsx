"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import VoicePicker from "@/components/VoicePicker";
import { createFuseIndex, type SearchableItem } from "@/lib/fuse";
import errorsData from "@/data/errors.json";
import commandsData from "@/data/commands.json";
import projectsData from "@/data/projects.json";

type ErrorItem = { id: string; title: string; summary?: string; tags?: string[]; category?: string };
type CommandItem = { id: string; command: string; what_it_does?: string; domain?: string };
type ProjectItem = { id: string; title: string; one_liner?: string };

const toSearchableError = (e: ErrorItem): SearchableItem => ({
  id: e.id,
  title: e.title,
  summary: e.summary,
  tags: e.tags,
  category: e.category,
});
const toSearchableCommand = (c: CommandItem): SearchableItem => ({
  id: c.id,
  title: c.command,
  summary: c.what_it_does,
  domain: c.domain,
});
const toSearchableProject = (p: ProjectItem): SearchableItem => ({
  id: p.id,
  title: p.title,
  summary: p.one_liner,
});

export default function KnowledgeLayoutClient({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const { errorResults, commandResults, projectResults } = useMemo(() => {
    const errors = (errorsData as ErrorItem[]).map(toSearchableError);
    const commands = (commandsData as CommandItem[]).map(toSearchableCommand);
    const projects = (projectsData as ProjectItem[]).map(toSearchableProject);
    const all: SearchableItem[] = [...errors, ...commands, ...projects];
    const fuse = createFuseIndex(all, { keys: ["title", "summary", "tags", "category", "domain"], threshold: 0.4 });

    if (!query.trim()) {
      return { errorResults: [], commandResults: [], projectResults: [] };
    }
    const results = fuse.search(query.trim());
    const errIds = new Set((errorsData as ErrorItem[]).map((e) => e.id));
    const cmdIds = new Set((commandsData as CommandItem[]).map((c) => c.id));
    const projIds = new Set((projectsData as ProjectItem[]).map((p) => p.id));
    const errorResults = results.filter((r) => errIds.has(r.item.id));
    const commandResults = results.filter((r) => cmdIds.has(r.item.id));
    const projectResults = results.filter((r) => projIds.has(r.item.id));
    return { errorResults, commandResults, projectResults };
  }, [query]);

  const hasResults = errorResults.length > 0 || commandResults.length > 0 || projectResults.length > 0;

  return (
    <div className="mx-auto max-content px-4 py-8 sm:px-6">
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search errors, commands, projects…" className="mb-4" />
      <details className="mb-6">
        <summary className="cursor-pointer text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Voice settings for Read Aloud</summary>
        <div className="mt-3 max-w-xs">
          <VoicePicker />
        </div>
      </details>
      {query.trim() && (
        <div className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--text-muted)]">Search results</h2>
          {!hasResults && <p className="mt-2 text-sm text-[var(--text-muted)]">No results.</p>}
          {hasResults && (
            <ul className="mt-2 space-y-2">
              {errorResults.slice(0, 5).map((r) => (
                <li key={r.item.id}>
                  <Link href={`/knowledge/errors?id=${r.item.id}`} className="text-sm text-[var(--accent)] hover:underline">
                    [Error] {r.item.title}
                  </Link>
                  {r.item.summary && <span className="ml-2 text-[var(--text-muted)]">– {r.item.summary}</span>}
                </li>
              ))}
              {commandResults.slice(0, 5).map((r) => (
                <li key={r.item.id}>
                  <Link href={`/knowledge/commands?highlight=${r.item.id}`} className="text-sm text-[var(--accent)] hover:underline">
                    [Command] {r.item.title}
                  </Link>
                </li>
              ))}
              {projectResults.slice(0, 3).map((r) => (
                <li key={r.item.id}>
                  <Link href={`/projects#${r.item.id}`} className="text-sm text-[var(--accent)] hover:underline">
                    [Project] {r.item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
