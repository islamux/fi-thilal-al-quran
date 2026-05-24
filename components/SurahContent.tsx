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

      <article className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookmarkButton surah={number} surahName={name} />
          </div>
          <h1 className="text-3xl font-[var(--font-amiri-quran)] font-bold">
            سورة {name}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            الجزء {juz} — {verses} آية
          </p>
        </header>

        <div
          className="[&_p]:text-[var(--reader-font-size,18px)]"
          style={{ fontSize: "var(--reader-font-size, 18px)" }}
        >
          <QuranVerse content={content} />
        </div>
      </article>

      <FontSizeControl />
    </>
  );
}
