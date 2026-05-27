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
        <h1 className="font-bold text-3xl text-primary mb-2">
          الجزء {juz}
        </h1>
        <div className="flex justify-center items-center gap-3 mt-4">
          <div className="h-px w-12 bg-gradient-to-l from-accent/50 to-transparent" />
          <span className="material-symbols-outlined text-accent text-base">auto_stories</span>
          <div className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <p className="mt-4 text-sm text-text-muted">
          {surahs.length} سورة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="group relative block bg-surface border border-warm-border p-4 rounded-xl shadow-subtle hover:shadow-subtle-hover hover:-translate-y-0.5 transition-all duration-200 hover:bg-surface-hover hover:border-accent/30"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-accent transition-all duration-300 group-hover:h-3/4 rounded-full" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                {surah.number}
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-amiri-quran)] text-lg text-text group-hover:text-accent transition-colors leading-relaxed truncate">
                  {surah.name}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
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
