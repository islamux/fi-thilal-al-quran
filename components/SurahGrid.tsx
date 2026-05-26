"use client";

import { useState, useMemo } from "react";
import SurahCard from "./SurahCard";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahGrid({ surahs }: { surahs: SurahIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = useMemo(() => {
    if (!query.trim()) return surahs;
    const q = query.trim().toLowerCase();
    return surahs.filter(
      (s) =>
        s.name.includes(q) ||
        s.number.toString() === q ||
        s.number.toString().includes(q)
    );
  }, [surahs, query]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section>
      <div className="md:hidden mb-lg">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن سورة..."
            className="w-full bg-surface border border-warm-border rounded-xl px-md py-md text-label-sm focus:border-secondary outline-none transition-colors text-text placeholder:text-text-muted"
          />
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        {visible.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>

      {visible.length < filtered.length && (
        <div className="mt-xxl flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 24)}
            className="px-xl py-md border border-warm-border rounded-lg text-primary font-title hover:bg-warm-stone transition-all active:scale-95 flex items-center gap-sm"
          >
            <span>عرض المزيد من السور</span>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-text-muted mx-auto mb-4 block">search_off</span>
          <p className="text-sm text-text-muted">
            لا توجد نتائج لـ &quot;{query}&quot;
          </p>
        </div>
      )}
    </section>
  );
}
