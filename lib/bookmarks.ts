"use client";

const STORAGE_KEY = "fi-thilal-bookmarks";

export interface Bookmark {
  surah: number;
  surahName: string;
  verse?: number;
  note?: string;
  createdAt: number;
}

function loadAll(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(bookmarks: Bookmark[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {}
}

export function getBookmarks(): Bookmark[] {
  return loadAll();
}

export function isBookmarked(surah: number, verse?: number): boolean {
  return loadAll().some(
    (b) => b.surah === surah && (verse === undefined || b.verse === verse)
  );
}

export function toggleBookmark(surah: number, surahName: string, verse?: number): Bookmark[] {
  const bookmarks = loadAll();
  const idx = bookmarks.findIndex(
    (b) => b.surah === surah && (verse === undefined || b.verse === verse)
  );
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.unshift({ surah, surahName, verse, createdAt: Date.now() });
  }
  saveAll(bookmarks);
  return bookmarks;
}

export function removeBookmark(surah: number, verse?: number): Bookmark[] {
  const bookmarks = loadAll().filter(
    (b) => !(b.surah === surah && (verse === undefined || b.verse === verse))
  );
  saveAll(bookmarks);
  return bookmarks;
}

export function clearBookmarks() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
