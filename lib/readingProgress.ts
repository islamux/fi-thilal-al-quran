"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "fi-thilal-reading-progress";

export interface ReadingEntry {
  surah: number;
  surahName: string;
  scrollPosition: number;
  totalHeight: number;
  readAt: number;
}

function loadAll(): ReadingEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(entries: ReadingEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

export function useReadingProgress() {
  const [entries, setEntries] = useState<ReadingEntry[]>([]);

  useEffect(() => {
    setEntries(loadAll());
  }, []);

  const saveProgress = useCallback(
    (entry: Omit<ReadingEntry, "readAt">) => {
      const updated = [
        { ...entry, readAt: Date.now() },
        ...entries.filter((e) => e.surah !== entry.surah),
      ];
      setEntries(updated);
      saveAll(updated);
    },
    [entries]
  );

  const getLastRead = useCallback((): ReadingEntry | null => {
    return entries.length > 0 ? entries[0]! : null;
  }, [entries]);

  return { entries, saveProgress, getLastRead };
}
