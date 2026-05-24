"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useReadingProgress } from "@/lib/readingProgress";

export default function ContinueReading() {
  const { getLastRead } = useReadingProgress();
  const last = getLastRead();

  if (!last) return null;

  return (
    <Link
      href={`/surah/${last.surah}`}
      className="group block mb-10 card-gilded p-5 border-[var(--color-accent)]/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gold-bg flex items-center justify-center shadow-sm">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-0.5">أكمل القراءة</p>
            <p className="font-[var(--font-amiri-quran)] text-xl text-[var(--color-text)]">
              {last.surahName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--color-accent)]">
          <span>تابع القراءة</span>
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
