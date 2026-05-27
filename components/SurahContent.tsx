"use client";

import { useEffect, useRef, useState } from "react";
import QuranVerse from "./QuranVerse";
import FontSizeControl from "./FontSizeControl";
import BookmarkButton from "./BookmarkButton";
import ReadingProgressBar from "./ReadingProgressBar";
import FloatingNavPill from "./FloatingNavPill";
import { useReadingProgress } from "@/lib/readingProgress";
import { toggleBookmark } from "@/lib/bookmarks";
import { MECCAN_BOUNDARY, SCROLL_TOP_THRESHOLD } from "@/lib/constants";

export default function SurahContent({
  number,
  name,
  juz,
  verses,
  content,
  prevNumber,
  nextNumber,
}: {
  number: number;
  name: string;
  juz: number;
  verses: number;
  content: string;
  prevNumber?: number;
  nextNumber?: number;
}) {
  const { saveProgress } = useReadingProgress();
  const saved = useRef(false);
  const [bookmarkToggle, setBookmarkToggle] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "b") {
        e.preventDefault();
        toggleBookmark(number, name);
        setBookmarkToggle((n) => n + 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [number, name]);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    saveProgress({ surah: number, surahName: name, juz, scrollPosition: 0, totalHeight: 0 });
  }, [number, name, juz, saveProgress]);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      saveProgress({ surah: number, surahName: name, juz, scrollPosition, totalHeight });
      setShowScrollTop(scrollPosition > SCROLL_TOP_THRESHOLD);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [number, name, juz, saveProgress]);

  return (
    <>
      <ReadingProgressBar />

      <article className="pt-6 lg:mr-0 min-h-screen pb-24 lg:pb-8 px-4 lg:px-8">
        <div className="max-w-[70ch] mx-auto">
          <header className="text-center mb-xxl">
            <div className="flex justify-center mb-md">
              <BookmarkButton key={bookmarkToggle} surah={number} surahName={name} />
            </div>

            <div className="mb-md opacity-20 select-none pointer-events-none">
              <p className="font-verse text-5xl leading-relaxed text-gilded-gold">{name}</p>
            </div>

            <h1 className="font-display text-display text-primary mb-sm">سورة {name}</h1>

            <p className="font-body text-faded-ink italic">
              {number <= MECCAN_BOUNDARY ? "مكية" : "مدنية"} | {verses} آيات
            </p>

            <div className="mt-lg flex justify-center items-center">
              <div className="h-px w-1/3 bg-gradient-to-l from-transparent via-warm-border to-transparent" />
              <span className="material-symbols-outlined text-gilded-gold mx-md">auto_stories</span>
              <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-warm-border to-transparent" />
            </div>
          </header>

          <div
            className="[&_p]:text-[var(--reader-font-size,18px)]"
            style={{ fontSize: "var(--reader-font-size, 18px)" }}
          >
            <QuranVerse content={content} surahName={name} />
          </div>

          <div className="mt-xxl pt-lg border-t border-warm-border" />
        </div>
      </article>

      <FontSizeControl />
      <FloatingNavPill
        number={number}
        name={name}
        prevNumber={prevNumber}
        nextNumber={nextNumber}
        onBookmarkToggle={() => setBookmarkToggle((n) => n + 1)}
      />

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 lg:bottom-8 left-6 w-14 h-14 bg-secondary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50"
          aria-label="العودة للأعلى"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      )}
    </>
  );
}
