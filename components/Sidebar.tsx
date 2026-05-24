"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronLeft } from "lucide-react";
import type { SurahIndexEntry } from "@/lib/types";

export default function Sidebar({
  surahs,
  activeNumber,
  onClose,
}: {
  surahs: SurahIndexEntry[];
  activeNumber?: number;
  onClose?: () => void;
}) {
  const [expandedJuz, setExpandedJuz] = useState<number | null>(null);

  const grouped = surahs.reduce<Record<number, SurahIndexEntry[]>>((acc, s) => {
    (acc[s.juz] ??= []).push(s);
    return acc;
  }, {});

  const juzList = Object.entries(grouped).sort(
    (a, b) => parseInt(a[0]) - parseInt(b[0])
  );

  return (
    <aside className="w-72 h-full overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-background-secondary)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <h2 className="font-bold text-sm flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" rx="3" fill="var(--color-accent)"/>
            <path d="M4 4h2v8H4V4zm6 0h2v8h-2V4z" fill="white" opacity="0.9"/>
            <path d="M6 4h4v8H6V4z" fill="white"/>
          </svg>
          فهرس السور
        </h2>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors" aria-label="إغلاق القائمة">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="p-2">
        {juzList.map(([juz, surahList]) => {
          const isOpen = expandedJuz === parseInt(juz);
          return (
            <div key={juz} className="mb-1">
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                isOpen ? "bg-[var(--color-surface)] border border-[var(--color-border-light)]" : "hover:bg-[var(--color-surface)]"
              }`}>
                <Link
                  href={`/juz/${juz}`}
                  className="flex-1 font-medium text-[var(--color-text)]"
                  onClick={() => setExpandedJuz(isOpen ? null : parseInt(juz))}
                >
                  <span className="gold-text ml-1 font-bold">الجزء</span> {juz}
                </Link>
                <button
                  onClick={() => setExpandedJuz(isOpen ? null : parseInt(juz))}
                  className="p-0.5 rounded hover:bg-[var(--color-surface-hover)] transition-colors"
                  aria-label={isOpen ? "طي" : "توسيع"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <ChevronDown size={14} className="text-[var(--color-accent)]" /> : <ChevronLeft size={14} className="text-[var(--color-text-muted)]" />}
                </button>
              </div>

              {isOpen && (
                <div className="mr-3 pr-2 border-r-2 border-[var(--color-accent)]/15 mt-1 space-y-0.5">
                  {surahList.map((s) => (
                    <Link
                      key={s.number}
                      href={`/surah/${s.number}`}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-r-lg transition-all ${
                        s.number === activeNumber
                          ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium border-r-2 border-[var(--color-accent)]"
                          : "hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s.number === activeNumber
                          ? "gold-bg text-white"
                          : "bg-[var(--color-background-secondary)] text-[var(--color-text-muted)]"
                      }`}>
                        {s.number}
                      </span>
                      <span className="font-[var(--font-amiri-quran)]">{s.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
