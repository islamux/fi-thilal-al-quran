"use client";

import Link from "next/link";
import { useReadingProgress } from "@/lib/readingProgress";

export default function ContinueReading() {
  const { getLastRead } = useReadingProgress();
  const last = getLastRead();

  if (!last) return null;

  return (
    <section className="mb-xl">
      <div className="relative group overflow-hidden rounded-xl bg-secondary dark:bg-secondary-container p-xl flex flex-col md:flex-row items-center justify-between text-white shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-l from-secondary-container/20 to-transparent pointer-events-none" />
        <div className="relative z-10 text-right">
          <span className="font-label-sm text-label-sm uppercase tracking-widest opacity-80 mb-sm block">
            استمر في القراءة
          </span>
          <h3 className="font-headline text-headline mb-xs">
            سورة {last.surahName}
          </h3>
          <p className="font-verse text-title italic opacity-90 mb-md leading-loose">
            ﴿ وَقُلِ الْحَقُّ مِن رَّبِّكُمْ ۖ فَمَن شَاءَ فَلْيُؤْمِن وَمَن شَاءَ فَلْيَكْفُرْ ﴾
          </p>
          <div className="flex items-center gap-sm">
            <span className="bg-white/20 backdrop-blur-md px-sm py-1 rounded text-xs">
              الجزء {last.juz || "—"}
            </span>
          </div>
        </div>
        <Link
          href={`/surah/${last.surah}`}
          className="relative z-10 mt-xl md:mt-0 px-xl py-md bg-white text-secondary font-title rounded-lg hover:bg-warm-ash dark:hover:bg-tertiary-container dark:text-secondary dark:bg-dark-surface transition-colors flex items-center gap-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>متابعة القراءة</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>
    </section>
  );
}
