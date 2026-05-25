"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Bookmark } from "lucide-react";
import ClientShell from "@/components/ClientShell";
import { getBookmarks, removeBookmark } from "@/lib/bookmarks";
import type { Bookmark as BookmarkType } from "@/lib/bookmarks";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleDelete = (surah: number, verse?: number) => {
    const updated = removeBookmark(surah, verse);
    setBookmarks(updated);
  };

  return (
    <ClientShell>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark size={24} className="text-[var(--color-accent)]" />
          <h1 className="font-[var(--font-amiri-quran)] text-3xl gold-text">المفضلة</h1>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark size={48} className="mx-auto text-[var(--color-text-muted)] mb-4" />
            <p className="text-[var(--color-text-muted)]">لا توجد سور محفوظة في المفضلة</p>
            <Link
              href="/"
              className="inline-block mt-4 px-5 py-2 rounded-xl bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              العودة إلى فهرس السور
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <div
                key={`${b.surah}-${b.verse ?? ""}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <Link
                  href={`/surah/${b.surah}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] text-sm font-bold shrink-0">
                    {b.surah}
                  </span>
                  <div className="min-w-0">
                    <p className="font-[var(--font-amiri-quran)] text-lg text-[var(--color-text)] truncate">
                      {b.surahName}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {b.verse ? `الآية ${b.verse}` : "السورة كاملة"}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleDelete(b.surah, b.verse)}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                  aria-label="حذف المفضلة"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientShell>
  );
}
