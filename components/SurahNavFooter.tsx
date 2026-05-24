import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahNavFooter({
  prev,
  next,
}: {
  prev: SurahIndexEntry | null;
  next: SurahIndexEntry | null;
}) {
  return (
    <nav className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-[var(--color-border)]">
      {prev ? (
        <Link
          href={`/surah/${prev.number}`}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl card-gilded"
        >
          <ChevronRight
            size={20}
            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0"
          />
          <div className="text-right min-w-0">
            <div className="text-xs text-[var(--color-text-muted)] mb-0.5">السورة السابقة</div>
            <div className="font-[var(--font-amiri-quran)] text-lg text-[var(--color-text)] truncate">
              {prev.name}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href="/"
        className="shrink-0 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors px-3"
      >
        جميع السور
      </Link>

      {next ? (
        <Link
          href={`/surah/${next.number}`}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl card-gilded"
        >
          <div className="text-left min-w-0">
            <div className="text-xs text-[var(--color-text-muted)] mb-0.5">السورة التالية</div>
            <div className="font-[var(--font-amiri-quran)] text-lg text-[var(--color-text)] truncate">
              {next.name}
            </div>
          </div>
          <ChevronLeft
            size={20}
            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0"
          />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
