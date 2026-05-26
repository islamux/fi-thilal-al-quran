"use client";

import { useState } from "react";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import { useSearch } from "@/lib/search";

export default function SearchPage() {
  const { query, results, search, ready } = useSearch();
  const [input, setInput] = useState("");

  function handleChange(v: string) {
    setInput(v);
    search(v);
  }

  function highlightText(text: string, q: string): React.ReactNode {
    if (!q.trim()) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="highlight-match">{part}</mark>
      ) : (
        part
      )
    );
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

          <div className="relative max-w-2xl mx-auto mb-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="ابحث عن آية، كلمة، أو موضوع..."
              className="w-full h-14 px-md rounded-xl border border-warm-border bg-surface focus:border-secondary focus:ring-0 text-lg outline-none transition-colors text-text placeholder:text-text-muted"
            />
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-greyed-ink pointer-events-none">search</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
            <div className="bg-bg-secondary p-md rounded-xl border border-warm-border">
              <label className="block text-label-sm text-greyed-ink mb-xs">السورة</label>
              <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
                <option>الكل</option>
              </select>
            </div>
            <div className="bg-bg-secondary p-md rounded-xl border border-warm-border">
              <label className="block text-label-sm text-greyed-ink mb-xs">الجزء</label>
              <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
                <option>الكل</option>
              </select>
            </div>
            <div className="bg-bg-secondary p-md rounded-xl border border-warm-border">
              <label className="block text-label-sm text-greyed-ink mb-xs">المجلد</label>
              <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
                <option>الكل</option>
              </select>
            </div>
            <button className="bg-gilded-gold hover:bg-gilded-gold-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-md active:scale-98">
              <span className="material-symbols-outlined">tune</span>
              تحديث النتائج
            </button>
          </div>

          {input && (
            <div className="flex justify-between items-center mb-md pb-md border-b border-warm-border">
              <span className="text-label-sm text-greyed-ink">
                تم العثور على {results.length} نتيجة لـ &quot;{input}&quot;
              </span>
            </div>
          )}

          <div className="space-y-lg">
            {results.map((r) => (
              <div key={r.id} className="bg-surface border border-warm-border p-lg rounded-xl hover:bg-warm-ash transition-all group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1 h-full bg-gilded-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-md">
                  <div>
                    <h3 className="font-headline text-headline text-primary mb-xs">{r.surahName}</h3>
                    <div className="flex gap-sm">
                      <span className="text-label-sm text-greyed-ink bg-gilded-gold-light px-sm py-xs rounded">الجزء {r.juz}</span>
                    </div>
                  </div>
                </div>
                <p className="font-body text-faded-ink leading-body">
                  {highlightText(r.text.slice(0, 300), input)}
                </p>
                <Link
                  href={`/surah/${r.surah}`}
                  className="inline-flex items-center gap-xs text-secondary font-medium text-label-sm mt-md hover:gap-md transition-all"
                >
                  اقرأ التفسير كاملاً
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </Link>
              </div>
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
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white font-medium shadow-md">١</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors font-medium">٢</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">٣</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-warm-border text-primary hover:bg-warm-ash transition-colors">
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
