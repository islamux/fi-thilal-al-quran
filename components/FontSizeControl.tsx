"use client";

import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut, Type } from "lucide-react";

const STORAGE_KEY = "fi-thilal-font-size";
const MIN = 14;
const MAX = 32;
const STEP = 2;
const DEFAULT = 18;

export default function FontSizeControl() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const n = parseInt(saved);
      if (n >= MIN && n <= MAX) {
        setSize(n);
        applySize(n);
      }
    }
  }, []);

  function applySize(n: number) {
    document.documentElement.style.setProperty("--reader-font-size", `${n}px`);
  }

  function change(delta: number) {
    const next = Math.max(MIN, Math.min(MAX, size + delta));
    setSize(next);
    applySize(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  function reset() {
    setSize(DEFAULT);
    applySize(DEFAULT);
    localStorage.removeItem(STORAGE_KEY);
  }

  const atMin = size <= MIN;
  const atMax = size >= MAX;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {open && (
        <div className="flex items-center gap-2 glass border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-lg anim-scale-in">
          <button
            onClick={() => change(-STEP)}
            disabled={atMin}
            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="تصغير الخط"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm font-medium tabular-nums min-w-[3ch] text-center">
            {size}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">px</span>
          <button
            onClick={() => change(STEP)}
            disabled={atMax}
            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="تكبير الخط"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
          <button
            onClick={reset}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] px-2 py-1 rounded-lg transition-colors"
          >
            إعادة
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full glass border border-[var(--color-border)] shadow-lg hover:shadow-xl hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200"
        aria-label="التحكم بحجم الخط"
      >
        <Type size={20} />
      </button>
    </div>
  );
}
