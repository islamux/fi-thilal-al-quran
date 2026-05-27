"use client";

import { useState } from "react";
import ClientShell from "@/components/ClientShell";
import SearchFilters from "@/components/SearchFilters";
import SearchResultCard from "@/components/SearchResultCard";
import { useSearch } from "@/lib/search";
import type { SurahIndexEntry } from "@/lib/types";

export default function SearchClient({ surahs }: { surahs: SurahIndexEntry[] }) {
  const { query, results, search, ready } = useSearch();
  const [input, setInput] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  function handleChange(v: string) {
    setInput(v);
    search(v);
    setFocusedIndex(-1);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && focusedIndex >= 0 && focusedIndex < results.length) {
      e.preventDefault();
      const result = results[focusedIndex];
      if (result) window.location.href = `/surah/${result.surah}`;
    }
  }

  return (
    <ClientShell>
      <div className="pt-6 px-4 lg:px-8 min-h-screen pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-lg text-center">
            <h1 className="font-display text-display text-primary mb-sm tracking-tight">البحث العلمي الدقيق</h1>
            <p className="font-body text-faded-ink italic max-w-2xl mx-auto leading-body">
              ابحث في أعماق التفسير والتدبر للآيات الكريمة من خلال في ظلال القرآن لسيد قطب
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto mb-lg search-input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKey}
              placeholder="ابحث عن آية، كلمة، أو موضوع..."
              className="w-full h-16 pr-[64px] pl-md rounded-xl border border-warm-border bg-surface focus:border-secondary focus:ring-0 text-xl outline-none transition-all text-text placeholder:text-text-muted shadow-sm focus:scale-[1.01]"
            />
            <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-greyed-ink text-[32px] pointer-events-none">search</span>
          </div>

          <SearchFilters surahs={surahs} />

          {input && (
            <div className="flex justify-between items-center mb-lg pb-sm border-b border-warm-border">
              <span className="font-label-sm text-label-sm text-faded-ink">
                تم العثور على {results.length} نتيجة لـ &quot;{input}&quot;
              </span>
              <div className="flex gap-sm">
                <button className="text-secondary font-label-sm text-label-sm flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
                  الأكثر صلة <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-lg" onKeyDown={handleKey}>
            {results.map((r, idx) => (
              <SearchResultCard
                key={r.id}
                result={r}
                query={input}
                focused={focusedIndex === idx}
              />
            ))}
          </div>

          {input && ready && results.length === 0 && (
            <div className="text-center py-xxl">
              <span className="material-symbols-outlined text-5xl text-greyed-ink mx-auto mb-md block">search_off</span>
              <p className="text-faded-ink">لا توجد نتائج لـ &quot;{input}&quot;</p>
            </div>
          )}

          {!input && (
            <div className="text-center py-xxl">
              <span className="material-symbols-outlined text-6xl text-greyed-ink/30 mx-auto block mb-md">search</span>
              <p className="text-faded-ink">اكتب كلمة أو عبارة للبحث في تفسير في ظلال القرآن</p>
            </div>
          )}

          {results.length > 10 && (
            <div className="flex justify-center items-center gap-md py-xl">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white font-medium shadow-subtle">١</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">٢</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">٣</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            </div>
          )}

          <div className="fixed bottom-0 left-0 p-6 opacity-10 pointer-events-none hidden lg:block">
            <span className="font-verse text-6xl text-gilded-gold select-none">﴿</span>
          </div>
        </div>
      </div>
    </ClientShell>
  );
}
