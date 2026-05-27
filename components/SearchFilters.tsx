import type { SurahIndexEntry } from "@/lib/types";

export default function SearchFilters({ surahs }: { surahs: SurahIndexEntry[] }) {
  const uniqueJuzs = [...new Set(surahs.map((s) => s.juz))].sort((a, b) => a - b);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
      <div className="bg-bg-secondary p-md rounded-xl border border-warm-border shadow-subtle">
        <label className="block text-label-sm text-greyed-ink mb-xs">السورة</label>
        <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
          <option>الكل</option>
          {surahs.map((s) => (
            <option key={s.number}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="bg-bg-secondary p-md rounded-xl border border-warm-border shadow-subtle">
        <label className="block text-label-sm text-greyed-ink mb-xs">الجزء</label>
        <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
          <option>الكل</option>
          {uniqueJuzs.map((j) => (
            <option key={j}>الجزء {j}</option>
          ))}
        </select>
      </div>
      <div className="bg-bg-secondary p-md rounded-xl border border-warm-border shadow-subtle">
        <label className="block text-label-sm text-greyed-ink mb-xs">المجلد</label>
        <select className="w-full bg-transparent border-none focus:ring-0 font-bold p-0 text-primary outline-none">
          <option>الكل</option>
          {[1, 2, 3, 4].map((v) => (
            <option key={v}>المجلد {v}</option>
          ))}
        </select>
      </div>
      <button className="bg-gilded-gold hover:bg-gilded-gold-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-md active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span className="material-symbols-outlined">tune</span>
        تحديث النتائج
      </button>
    </div>
  );
}
