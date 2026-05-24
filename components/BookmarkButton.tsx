"use client";

import { useState, useEffect, useCallback } from "react";
import { Bookmark } from "lucide-react";
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
      className={`p-2 rounded-lg transition-colors ${
        active
          ? "text-[var(--color-accent)] bg-[var(--color-accent-light)]"
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
      }`}
      aria-label={active ? "إزالة الإشارة المرجعية" : "إضافة إشارة مرجعية"}
    >
      <Bookmark size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
