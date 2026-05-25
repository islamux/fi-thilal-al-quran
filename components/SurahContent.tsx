"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import QuranVerse from "./QuranVerse";
import FontSizeControl from "./FontSizeControl";
import BookmarkButton from "./BookmarkButton";
import ReadingProgressBar from "./ReadingProgressBar";
import GoldDivider from "./GoldDivider";
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
            <BookmarkButton key={bookmarkToggle} surah={number} surahName={name} />
          </div>

          <GoldDivider variant="wide" className="mb-4" />

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

          <GoldDivider variant="narrow" className="my-6" />
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
