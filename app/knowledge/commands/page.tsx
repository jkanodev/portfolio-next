"use client";

import { useMemo, useState } from "react";
import commandsData from "@/data/commands.json";
import CommandCard from "@/components/CommandCard";
import FilterChips from "@/components/FilterChips";
import type { CommandEntry } from "@/components/CommandCard";

const commands = commandsData as CommandEntry[];
const domains = Array.from(new Set(commands.map((c) => c.domain))).map((id) => ({
  id,
  label: id,
}));

export default function CommandsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (selectedDomain.size === 0) return commands;
    return commands.filter((c) => selectedDomain.has(c.domain));
  }, [selectedDomain]);

  const byDomain = useMemo(() => {
    const map = new Map<string, CommandEntry[]>();
    filtered.forEach((c) => {
      const list = map.get(c.domain) ?? [];
      list.push(c);
      map.set(c.domain, list);
    });
    return map;
  }, [filtered]);

  const toggleDomain = (id: string) => {
    setSelectedDomain((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text)]">Commands Library</h1>
      <p className="text-[var(--text-muted)]">
        Grouped by domain. Copy button on each card.
      </p>
      <FilterChips chips={domains} selected={selectedDomain} onToggle={toggleDomain} />
      <div className="space-y-8">
        {Array.from(byDomain.entries()).map(([domain, list]) => (
          <section key={domain}>
            <h2 className="mb-4 text-lg font-semibold text-[var(--text)]">{domain}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {list.map((entry) => (
                <CommandCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
