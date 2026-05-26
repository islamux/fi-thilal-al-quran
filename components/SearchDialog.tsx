"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearch } from "@/lib/search";

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { query, results, search, ready } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    dialog.addEventListener("keydown", handleTab);
    return () => dialog.removeEventListener("keydown", handleTab);
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
        <mark key={i} className="highlight-match">{part}</mark>
      ) : (
        part
      )
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="بحث في في ظلال القرآن"
          className="relative w-full max-w-2xl mx-4 bg-surface border border-warm-border rounded-2xl overflow-hidden anim-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-warm-border">
          <span className="material-symbols-outlined text-text-muted">search</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="ابحث في تفسير في ظلال القرآن..."
            aria-label="ابحث في التفسير"
            className="flex-1 bg-transparent text-text placeholder:text-text-muted focus:outline-none"
          />
          {!ready && (
            <span className="material-symbols-outlined text-text-muted animate-spin">progress_activity</span>
          )}
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="إغلاق">
            <span className="material-symbols-outlined text-text-muted">close</span>
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[50vh] overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/surah/${r.surah}`}
                onClick={onClose}
                className="block bg-surface border border-warm-border p-3 rounded-xl hover:bg-surface-hover transition-all group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2 mb-sm">
                  <div className="w-8 h-8 rounded-full bg-gilded-gold-light flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-sm">book_2</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm block truncate">{r.surahName}</span>
                    <span className="text-text-muted text-xs">الجزء {r.juz}</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 bg-gilded-gold-light/40 p-sm rounded-lg">
                  {highlightText(r.text.slice(0, 200), input)}
                </p>
              </Link>
            ))}
          </div>
        )}

        {input && ready && results.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            لا توجد نتائج لـ &quot;{input}&quot;
          </div>
        )}

        {!input && (
          <div className="py-12 text-center text-text-muted text-sm">
            اكتب كلمة أو عبارة للبحث في تفسير في ظلال القرآن
          </div>
        )}
      </div>
    </div>
  );
}
