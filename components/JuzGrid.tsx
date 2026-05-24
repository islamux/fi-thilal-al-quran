import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function JuzGrid({
  juz,
  surahs,
}: {
  juz: number;
  surahs: SurahIndexEntry[];
}) {
  return (
    <section>
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <svg width="100" height="16" viewBox="0 0 100 16" fill="none">
            <line x1="0" y1="8" x2="30" y2="8" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
            <circle cx="50" cy="8" r="4" fill="var(--color-accent)" opacity="0.2"/>
            <circle cx="50" cy="8" r="1.5" fill="var(--color-accent)"/>
            <line x1="70" y1="8" x2="100" y2="8" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
          </svg>
        </div>
        <h1 className="font-[var(--font-amiri-quran)] text-4xl leading-relaxed gold-text">
          الجزء {juz}
        </h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-12 bg-gradient-to-l from-[var(--color-accent)]/50 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)]" />
          <div className="h-px w-12 bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent" />
        </div>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          {surahs.length} سورة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="group block card-gilded p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl gold-bg text-white text-sm font-bold shadow-sm shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative">{surah.number}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-amiri-quran)] text-lg leading-relaxed text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {surah.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {surah.verses} آية
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
