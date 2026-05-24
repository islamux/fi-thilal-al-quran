"use client";

import { useState } from "react";
import Link from "next/link";
import { X, BookOpen, ChevronDown, ChevronLeft } from "lucide-react";
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
    <aside className="w-72 h-full overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <h2 className="font-bold flex items-center gap-2">
          <BookOpen size={18} />
          السور
        </h2>
        {onClose && (
          <button onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="p-2">
        {juzList.map(([juz, surahList]) => {
          const isOpen = expandedJuz === parseInt(juz);
          return (
            <div key={juz}>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-surface-hover)] transition-colors">
                <Link
                  href={`/juz/${juz}`}
                  className="flex-1"
                  onClick={() => setExpandedJuz(isOpen ? null : parseInt(juz))}
                >
                  الجزء {juz}
                </Link>
                <button
                  onClick={() => setExpandedJuz(isOpen ? null : parseInt(juz))}
                  className="p-0.5"
                  aria-label={isOpen ? "طي قائمة السور" : "توسيع قائمة السور"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <ChevronDown size={14} /> : <ChevronLeft size={14} />}
                </button>
              </div>
              {isOpen && (
                <div className="mr-3 border-r-2 border-[var(--color-border-light)]">
                  {surahList.map((s) => (
                    <Link
                      key={s.number}
                      href={`/surah/${s.number}`}
                      className={`block px-3 py-1.5 text-sm rounded-r-lg transition-colors ${
                        s.number === activeNumber
                          ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] font-medium"
                          : "hover:bg-[var(--color-surface-hover)]"
                      }`}
                    >
                      {s.number}. {s.name}
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
