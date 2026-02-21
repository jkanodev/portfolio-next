"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import errorsData from "@/data/errors.json";
import ErrorCard from "@/components/ErrorCard";
import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import Modal from "@/components/Modal";
import { buildErrorsFuse, searchErrors } from "@/lib/fuse";

export default function ErrorsClient() {
  const errors = errorsData as unknown as any[];

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  const fuse = useMemo(() => buildErrorsFuse(errors), [errors]);

  const results = useMemo(() => {
    const base = query.trim() ? searchErrors(fuse, query) : errors.map((e) => ({ item: e } as any));
    const filtered = activeTags.length
      ? base.filter((r: any) => activeTags.every((t) => (r.item.tags ?? []).includes(t)))
      : base;

    return filtered.map((r: any) => r.item) as any[];
  }, [errors, fuse, query, activeTags]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const e of errors) for (const t of e.tags ?? []) set.add(t);
    return Array.from(set).sort();
  }, [errors]);

  const openItem = results.find((e) => e.id === openId) ?? null;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search errors, symptoms, fixes..." />
        <FilterChips chips={allTags.map((t) => ({ id: t, label: t }))} selected={new Set(activeTags)} onToggle={(id) => { setActiveTags((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]); }} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((e) => (
          <ErrorCard key={e.id} entry={e} />
        ))}
      </div>

      <Modal open={!!openItem} onClose={() => setOpenId(null)} title={openItem?.title ?? ""}>
        {openItem ? <ErrorCard entry={openItem} /> : null}
      </Modal>
    </div>
  );
}
