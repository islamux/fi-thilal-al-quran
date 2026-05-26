"use client";

import Link from "next/link";
import { useState } from "react";
import type { SurahIndexEntry } from "@/lib/types";

export default function Sidebar({
  activeNumber,
  onClose,
  surahs,
}: {
  surahs: SurahIndexEntry[];
  activeNumber?: number;
  onClose?: () => void;
}) {
  const [expandedJuz, setExpandedJuz] = useState<number | null>(null);

  const navItems = [
    { icon: "book_2", label: "السور", href: "/", isActive: true },
    { icon: "segment", label: "الأجزاء", href: "/juz/1", isActive: false },
    { icon: "bookmark", label: "العلامات", href: "/bookmarks", isActive: false },
    { icon: "search", label: "البحث", href: "/search", isActive: false },
  ];

  const juzGroups: { juz: number; surahs: SurahIndexEntry[] }[] = [];
  const grouped = new Map<number, SurahIndexEntry[]>();
  for (const s of surahs) {
    const list = grouped.get(s.juz) ?? [];
    list.push(s);
    grouped.set(s.juz, list);
  }
  for (const [juz, list] of grouped) {
    juzGroups.push({ juz, surahs: list });
  }
  juzGroups.sort((a, b) => a.juz - b.juz);

  return (
    <aside className="w-[280px] h-full flex flex-col bg-warm-stone dark:bg-dark-surface border-l border-warm-border dark:border-outline-variant overflow-y-auto custom-scrollbar">
      <div className="pt-4 px-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-headline text-title">
            ق
          </div>
          <div className={onClose ? "ml-8" : ""}>
            <h2 className="font-headline text-title text-primary dark:text-dark-primary">المكتبة القرآنية</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">تصفح في ظلال القرآن</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1 rounded-lg hover:bg-warm-ash transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="إغلاق"
          >
            <span className="material-symbols-outlined text-text-muted text-xl">close</span>
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-xs px-2 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-md p-md rounded-lg transition-all font-label-sm text-label-sm active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              item.isActive
                ? "text-secondary dark:text-secondary-fixed-dim bg-warm-ash dark:bg-tertiary-container border-r-2 border-secondary"
                : "text-on-surface-variant dark:text-on-tertiary-container hover:bg-warm-ash dark:hover:bg-tertiary-container"
            }`}
          >
            <span
              className={`material-symbols-outlined ${item.isActive ? "filled" : ""}`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-2 mt-md">
        <h3 className="font-label-sm text-label-sm text-greyed-ink px-md mb-sm">الأجزاء</h3>
        <div className="flex flex-col gap-xs">
          {juzGroups.map(({ juz, surahs: groupSurahs }) => (
            <div key={juz}>
              <button
                onClick={() => setExpandedJuz(expandedJuz === juz ? null : juz)}
                aria-expanded={expandedJuz === juz}
                aria-label={`الجزء ${juz}`}
                className="w-full flex items-center justify-between p-md rounded-lg transition-all font-label-sm text-label-sm text-on-surface-variant dark:text-on-tertiary-container hover:bg-warm-ash dark:hover:bg-tertiary-container active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>الجزء {juz}</span>
                <div className="flex items-center gap-sm">
                  <span className="text-xs text-greyed-ink">{groupSurahs.length} سور</span>
                  <span className={`material-symbols-outlined text-sm transition-transform ${expandedJuz === juz ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>
              {expandedJuz === juz && (
                <div className="mr-md pr-sm border-r-2 border-warm-border/50">
                  {groupSurahs.map((s) => (
                    <Link
                      key={s.number}
                      href={`/surah/${s.number}`}
                      onClick={onClose}
                      className={`flex items-center gap-sm p-sm rounded-lg transition-all text-sm active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        activeNumber === s.number
                          ? "text-secondary dark:text-secondary-fixed-dim bg-warm-ash dark:bg-tertiary-container"
                          : "text-on-surface-variant dark:text-on-tertiary-container hover:bg-warm-ash dark:hover:bg-tertiary-container"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gilded-gold-light text-gilded-gold text-xs font-bold">
                        {s.number}
                      </span>
                      <span>{s.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-md border-t border-warm-border/50 dark:border-outline-variant/50">
        <div className="flex items-center gap-sm p-sm">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-warm-ash border border-warm-border flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-sm">person</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-bold text-primary dark:text-dark-primary">
              أحمد القارئ
            </span>
            <span className="text-[10px] text-greyed-ink">قارئ نشط</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
