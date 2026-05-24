"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SurahCard from "./SurahCard";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahGrid({ surahs }: { surahs: SurahIndexEntry[] }) {
  const [query, setQuery] = useState("");

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

  return (
    <section>
      {/* Search bar */}
      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-accent)] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن سورة..."
          className="w-full pr-12 pl-4 py-3.5 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] transition-all duration-200"
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-[var(--color-accent)]" />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            لا توجد نتائج لـ &quot;{query}&quot;
          </p>
        </div>
      )}
    </section>
  );
}
