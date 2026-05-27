"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="pt-6 px-4 lg:px-8 min-h-screen pb-24 lg:pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-accent text-2xl">bookmark</span>
          <h1 className="font-bold text-2xl text-accent">المفضلة</h1>
          <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-text-muted mx-auto mb-4 block">bookmark</span>
            <p className="text-text-muted">لا توجد سور محفوظة في المفضلة</p>
            <Link
              href="/"
              className="inline-block mt-4 px-5 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              العودة إلى فهرس السور
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <div
                key={`${b.surah}-${b.verse ?? ""}`}
                className="flex items-center justify-between p-4 rounded-xl bg-surface border border-warm-border shadow-subtle hover:shadow-subtle-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href={`/surah/${b.surah}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-bg-secondary text-text-secondary text-sm font-bold shrink-0">
                    {b.surah}
                  </span>
                  <div className="min-w-0">
                    <p className="font-[var(--font-amiri-quran)] text-lg text-text truncate">
                      {b.surahName}
                    </p>
                    <p className="text-xs text-text-muted">
                      {b.verse ? `الآية ${b.verse}` : "السورة كاملة"}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleDelete(b.surah, b.verse)}
                  className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-error transition-colors"
                  aria-label="حذف المفضلة"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientShell>
  );
}
