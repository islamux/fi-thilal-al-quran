"use client";

import { useState, useEffect, useCallback } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

export default function BookmarkButton({
  surah,
  surahName,
  verse,
}: {
  surah: number;
  surahName: string;
  verse?: number;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isBookmarked(surah, verse));
  }, [surah, verse]);

  const handleToggle = useCallback(() => {
    const updated = toggleBookmark(surah, surahName, verse);
    setActive(updated.some((b) => b.surah === surah && (verse === undefined || b.verse === verse)));
  }, [surah, surahName, verse]);

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-all duration-200 ${
        active
          ? "text-accent bg-accent-light scale-110"
          : "text-text-muted hover:bg-surface-hover hover:scale-105"
      }`}
      aria-label={active ? "إزالة الإشارة المرجعية" : "إضافة إشارة مرجعية"}
    >
      <span className={`material-symbols-outlined text-xl ${active ? "filled" : ""}`}>bookmark</span>
    </button>
  );
}
