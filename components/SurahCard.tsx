import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahCard({ surah }: { surah: SurahIndexEntry }) {
  const isMakkan = surah.number <= 57;

  const basmalah =
    surah.number === 1 || surah.number === 9
      ? ""
      : "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group relative block bg-surface border border-warm-border p-md rounded-xl transition-all duration-300 hover:bg-warm-ash hover:border-secondary/30 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-secondary transition-all duration-300 group-hover:h-3/4" />

      <div className="flex justify-between items-start mb-md">
        <div className="w-10 h-10 rounded-full bg-gilded-gold-light border border-secondary/20 flex items-center justify-center font-label-sm text-secondary font-bold">
          {surah.number}
        </div>
        <div className="text-left">
          <span className="block font-label-sm text-greyed-ink text-xs uppercase tracking-tight">
            {isMakkan ? "مكية" : "مدنية"}
          </span>
          <span className="block font-label-sm text-greyed-ink text-xs">
            {surah.verses} آيات
          </span>
        </div>
      </div>

      <div className="text-right">
        <h3 className="font-headline text-headline text-primary mb-xs group-hover:text-secondary transition-colors">
          {surah.name}
        </h3>
        {basmalah && (
          <p className="font-verse text-on-surface-variant opacity-70 text-sm truncate">
            {basmalah}
          </p>
        )}
      </div>
    </Link>
  );
}
