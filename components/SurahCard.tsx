import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahCard({ surah }: { surah: SurahIndexEntry }) {
  const isMakkan = surah.number <= 57;

  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group block card-gilded p-5"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl gold-bg text-white text-sm font-bold shadow-sm shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="relative">{surah.number}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-[var(--font-amiri-quran)] text-xl leading-relaxed text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {surah.name}
            </h3>
            <span className="shrink-0 text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border-light)]">
              {isMakkan ? "مكية" : "مدنية"}
            </span>
          </div>

          <div className="mt-1.5 font-[var(--font-amiri-quran)] text-sm text-[var(--color-text-muted)] leading-relaxed">
            {surah.number === 1 || surah.number === 9 ? "" : "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-[var(--color-text-muted)]">
            <span>الجزء {surah.juz}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
            <span>{surah.verses} آية</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
