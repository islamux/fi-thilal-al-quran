"use client";

import { useEffect, useState, useCallback } from "react";
import FlexSearch from "flexsearch";

interface SearchChunk {
  id: string;
  surah: number;
  surahName: string;
  juz: number;
  text: string;
}

let indexInstance: unknown = null;
let store: SearchChunk[] = [];

async function getIndex() {
  if (indexInstance) return indexInstance;
  let chunks: SearchChunk[];
  try {
    const res = await fetch("/search-data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    chunks = await res.json();
  } catch {
    console.warn("Search index unavailable — running offline");
    chunks = [];
  }
  store = chunks;
  const index = new FlexSearch.Document<{
    id: string;
    surah: number;
    surahName: string;
    juz: number;
    text: string;
  }>({
    document: {
      id: "id",
      index: ["text"],
      store: ["surah", "surahName", "juz", "text"],
    },
    tokenize: "forward",
    cache: true,
  });
  for (const chunk of chunks) {
    index.add(chunk);
  }
  indexInstance = index;
  return index;
}

export type SearchResult = SearchChunk;

export function useSearch() {
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getIndex().then(() => setReady(true));
  }, []);

  const search = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const index: any = await getIndex();
    const raw = index.search(q, { limit: 20 }) as Array<{ field: string; result: (string | number)[] }>;
    const ids = new Set<string>();
    for (const fieldResult of raw) {
      for (const id of fieldResult.result) {
        ids.add(String(id));
      }
    }
    const found = store.filter((c) => ids.has(c.id));
    setResults(found);
  }, []);

  return { query, results, search, ready };
}
