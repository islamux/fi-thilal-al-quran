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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">الجزء {juz}</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {surahs.length} سورة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="group block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] font-bold text-sm">
                {surah.number}
              </span>
              <div>
                <h3 className="text-lg font-[var(--font-amiri-quran)] font-bold leading-relaxed">
                  {surah.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
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
