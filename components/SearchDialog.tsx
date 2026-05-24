"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/lib/search";

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { query, results, search, ready } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function handleChange(v: string) {
    setInput(v);
    search(v);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }

  if (!open) return null;

  function highlightText(text: string, q: string): React.ReactNode {
    if (!q.trim()) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="bg-[var(--color-accent-light)] text-[var(--color-text)] rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div
          role="dialog"
          aria-modal="true"
          aria-label="بحث في في ظلال القرآن"
          className="relative w-full max-w-2xl mx-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
          <Search size={20} className="text-[var(--color-text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="ابحث في تفسير في ظلال القرآن..."
            aria-label="ابحث في التفسير"
            className="flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          />
          {!ready && <Loader2 size={18} className="animate-spin text-[var(--color-text-muted)]" />}
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)]" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/surah/${r.surah}`}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
                  <BookOpen size={16} className="text-[var(--color-accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{r.surahName}</span>
                    <span className="text-[var(--color-text-muted)] text-xs">الجزء {r.juz}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {highlightText(r.text.slice(0, 200), input)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {input && ready && results.length === 0 && (
          <div className="py-12 text-center text-[var(--color-text-muted)]">
            لا توجد نتائج لـ &quot;{input}&quot;
          </div>
        )}

        {!input && (
          <div className="py-12 text-center text-[var(--color-text-muted)] text-sm">
            اكتب كلمة أو عبارة للبحث في تفسير في ظلال القرآن
          </div>
        )}
      </div>
    </div>
  );
}
