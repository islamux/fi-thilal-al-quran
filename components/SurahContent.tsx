"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import QuranVerse from "./QuranVerse";
import FontSizeControl from "./FontSizeControl";
import BookmarkButton from "./BookmarkButton";
import ReadingProgressBar from "./ReadingProgressBar";
import { useReadingProgress } from "@/lib/readingProgress";
import { toggleBookmark } from "@/lib/bookmarks";

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
  const router = useRouter();
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
      if (e.key === "ArrowRight" && nextNumber) {
        e.preventDefault();
        router.push(`/surah/${nextNumber}`);
      }
      if (e.key === "ArrowLeft" && prevNumber) {
        e.preventDefault();
        router.push(`/surah/${prevNumber}`);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [number, name, prevNumber, nextNumber, router]);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    saveProgress({
      surah: number,
      surahName: name,
      juz,
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
        juz,
        scrollPosition,
        totalHeight,
      });
      setShowScrollTop(scrollPosition > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [number, name, saveProgress]);

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
              <p className="font-verse text-5xl leading-relaxed text-gilded-gold">
                {name}
              </p>
            </div>

            <h1 className="font-display text-display text-primary mb-sm">
              سورة {name}
            </h1>

            <p className="font-body text-faded-ink italic">
              {number <= 57 ? "مكية" : "مدنية"} | {verses} آيات
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
            <QuranVerse content={content} surahNumber={number} surahName={name} />
          </div>

          <div className="mt-xxl pt-lg border-t border-warm-border" />
        </div>
      </article>

      <FontSizeControl />

      {/* Floating Navigation Pill */}
      <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 bg-primary text-white p-2 rounded-full shadow-xl">
          {prevNumber ? (
            <button
              onClick={() => router.push(`/surah/${prevNumber}`)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
              aria-label="السورة السابقة"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : <div className="w-10 h-10" />}

          <div className="w-px h-6 bg-white/20" />

          <button
            onClick={() => { toggleBookmark(number, name); setBookmarkToggle(n => n + 1); }}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
            aria-label="حفظ"
          >
            <span className="material-symbols-outlined">bookmark</span>
          </button>

          <div className="w-px h-6 bg-white/20" />

          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all" aria-label="مشاركة">
            <span className="material-symbols-outlined">share</span>
          </button>

          <div className="w-px h-6 bg-white/20" />

          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all" aria-label="إعدادات">
            <span className="material-symbols-outlined">settings_suggest</span>
          </button>

          <div className="w-px h-6 bg-white/20" />

          {nextNumber ? (
            <button
              onClick={() => router.push(`/surah/${nextNumber}`)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
              aria-label="السورة التالية"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : <div className="w-10 h-10" />}
        </div>
      </div>

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
