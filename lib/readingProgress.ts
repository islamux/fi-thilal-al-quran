"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { loadJSON, saveJSON } from "./storage";

const STORAGE_KEY = "fi-thilal-reading-progress";

export interface ReadingEntry {
  surah: number;
  surahName: string;
  juz?: number;
  scrollPosition: number;
  totalHeight: number;
  readAt: number;
}

export function useReadingProgress() {
  const [entries, setEntries] = useState<ReadingEntry[]>([]);
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  useEffect(() => {
    setEntries(loadJSON<ReadingEntry[]>(STORAGE_KEY, []));
  }, []);

  const saveProgress = useCallback(
    (entry: Omit<ReadingEntry, "readAt">) => {
      const current = entriesRef.current;
      const updated = [
        { ...entry, readAt: Date.now() },
        ...current.filter((e) => e.surah !== entry.surah),
      ];
      setEntries(updated);
      saveJSON(STORAGE_KEY, updated);
    },
    []
  );

  const getLastRead = useCallback((): ReadingEntry | null => {
    return entries.length > 0 ? entries[0]! : null;
  }, [entries]);

  return { entries, saveProgress, getLastRead };
}
