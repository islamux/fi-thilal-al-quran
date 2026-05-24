import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahCard({ surah }: { surah: SurahIndexEntry }) {
  const isMakkan = surah.number <= 57;

  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] font-bold text-sm">
          {surah.number}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-muted)]">
          {isMakkan ? "مكية" : "مدنية"}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-[var(--font-amiri-quran)] font-bold leading-relaxed">
        {surah.name}
      </h3>

      <div className="mt-2 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
        <span>الجزء {surah.juz}</span>
        <span>•</span>
        <span>{surah.verses} آية</span>
      </div>
    </Link>
  );
}
