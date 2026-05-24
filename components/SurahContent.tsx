"use client";

import { useEffect, useRef } from "react";
import QuranVerse from "./QuranVerse";
import FontSizeControl from "./FontSizeControl";
import BookmarkButton from "./BookmarkButton";
import ReadingProgressBar from "./ReadingProgressBar";
import { useReadingProgress } from "@/lib/readingProgress";

export default function SurahContent({
  number,
  name,
  juz,
  verses,
  content,
}: {
  number: number;
  name: string;
  juz: number;
  verses: number;
  content: string;
}) {
  const { saveProgress } = useReadingProgress();
  const saved = useRef(false);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    saveProgress({
      surah: number,
      surahName: name,
      scrollPosition: 0,
      totalHeight: 0,
    });
  }, [number, name, saveProgress]);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      saveProgress({
        surah: number,
        surahName: name,
        scrollPosition,
        totalHeight,
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [number, name, saveProgress]);

  return (
    <>
      <ReadingProgressBar />

      <article className="max-w-4xl mx-auto px-4 py-10">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <BookmarkButton surah={number} surahName={name} />
          </div>

          {/* Gold decorative divider */}
          <div className="flex justify-center mb-4">
            <svg width="160" height="24" viewBox="0 0 160 24" fill="none">
              <line x1="0" y1="12" x2="48" y2="12" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
              <circle cx="64" cy="12" r="6" fill="var(--color-accent)" opacity="0.12"/>
              <circle cx="64" cy="12" r="3" fill="var(--color-accent)" opacity="0.3"/>
              <circle cx="64" cy="12" r="1" fill="var(--color-accent)"/>
              <rect x="76" y="8" width="8" height="8" rx="1.5" fill="var(--color-accent)" opacity="0.15"/>
              <rect x="78" y="10" width="4" height="4" rx="0.5" fill="var(--color-accent)" opacity="0.3"/>
              <circle cx="96" cy="12" r="6" fill="var(--color-accent)" opacity="0.12"/>
              <circle cx="96" cy="12" r="3" fill="var(--color-accent)" opacity="0.3"/>
              <circle cx="96" cy="12" r="1" fill="var(--color-accent)"/>
              <line x1="112" y1="12" x2="160" y2="12" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
            </svg>
          </div>

          <h1 className="font-[var(--font-amiri-quran)] text-4xl md:text-5xl leading-relaxed text-[var(--color-text)] mb-4">
            سورة {name}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              الجزء {juz}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              {verses} آية
            </span>
          </div>

          {/* Gold bottom divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-[var(--color-accent)]/40 to-transparent" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="5" y="5" width="2" height="2" rx="0.5" fill="var(--color-accent)" opacity="0.6"/>
              <rect x="3" y="3" width="6" height="6" rx="1" fill="var(--color-accent)" opacity="0.15"/>
            </svg>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-[var(--color-accent)]/40 to-transparent" />
          </div>
        </header>

        {/* Reading pane */}
        <div className="card-gilded p-6 md:p-10">
          <div
            className="[&_p]:text-[var(--reader-font-size,18px)]"
            style={{ fontSize: "var(--reader-font-size, 18px)" }}
          >
            <QuranVerse content={content} />
          </div>
        </div>
      </article>

      <FontSizeControl />
    </>
  );
}
