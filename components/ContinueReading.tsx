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
      className="group block mb-8 p-4 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-light)]/20 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)]/30 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
            <BookOpen size={18} className="text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">أكمل القراءة</p>
            <p className="font-medium">{last.surahName}</p>
          </div>
        </div>
        <ArrowLeft
          size={18}
          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:-translate-x-1 transition-all"
        />
      </div>
    </Link>
  );
}
