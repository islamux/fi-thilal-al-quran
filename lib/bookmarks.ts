"use client";

import { loadJSON, saveJSON } from "./storage";

const STORAGE_KEY = "fi-thilal-bookmarks";

export interface Bookmark {
  surah: number;
  surahName: string;
  verse?: number;
  note?: string;
  createdAt: number;
}

export function getBookmarks(): Bookmark[] {
  return loadJSON<Bookmark[]>(STORAGE_KEY, []);
}

export function isBookmarked(surah: number, verse?: number): boolean {
  return getBookmarks().some(
    (b) => b.surah === surah && (verse === undefined || b.verse === verse)
  );
}

export function toggleBookmark(surah: number, surahName: string, verse?: number): Bookmark[] {
  const bookmarks = getBookmarks();
  const idx = bookmarks.findIndex(
    (b) => b.surah === surah && (verse === undefined || b.verse === verse)
  );
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.unshift({ surah, surahName, verse, createdAt: Date.now() });
  }
  saveJSON(STORAGE_KEY, bookmarks);
  return bookmarks;
}

export function removeBookmark(surah: number, verse?: number): Bookmark[] {
  const bookmarks = getBookmarks().filter(
    (b) => !(b.surah === surah && (verse === undefined || b.verse === verse))
  );
  saveJSON(STORAGE_KEY, bookmarks);
  return bookmarks;
}
