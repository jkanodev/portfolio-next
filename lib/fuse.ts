"use client";

import Fuse from "fuse.js";

export type SearchableItem = {
  id: string;
  title: string;
  summary?: string;
  tags?: string[];
  category?: string;
  domain?: string;
  one_liner?: string;
};

export function createFuseIndex<T extends SearchableItem>(
  items: T[],
  options: { keys: string[]; threshold?: number } = { keys: ["title", "summary", "tags", "category", "one_liner"], threshold: 0.35 }
): Fuse<T> {
  return new Fuse(items, {
    keys: options.keys,
    threshold: options.threshold ?? 0.35,
    includeScore: true,
  });
}

export function searchErrors<T>(fuse: Fuse<T>, query: string): import("fuse.js").FuseResult<T>[] {
  if (!query.trim()) return [];
  return fuse.search(query.trim());
}
export const buildErrorsFuse = createFuseIndex;
