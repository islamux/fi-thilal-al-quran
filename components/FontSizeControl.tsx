"use client";

import { useEffect, useState } from "react";

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
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
      {open && (
        <div className="flex items-center gap-2 bg-glass backdrop-blur-[12px] border border-warm-border rounded-xl px-3 py-2 anim-scale-in">
          <button
            onClick={() => change(-STEP)}
            disabled={atMin}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="تصغير الخط"
          >
            <span className="material-symbols-outlined text-lg text-text">zoom_out</span>
          </button>
          <span className="text-sm font-medium tabular-nums min-w-[3ch] text-center text-text">
            {size}
          </span>
          <span className="text-xs text-text-muted">px</span>
          <button
            onClick={() => change(STEP)}
            disabled={atMax}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="تكبير الخط"
          >
            <span className="material-symbols-outlined text-lg text-text">zoom_in</span>
          </button>
          <div className="w-px h-6 bg-warm-border mx-1" />
          <button
            onClick={reset}
            className="text-xs text-text-muted hover:text-accent hover:bg-accent-light px-2 py-1 rounded-lg transition-colors"
          >
            إعادة
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full bg-accent text-white hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="التحكم بحجم الخط"
      >
        <span className="material-symbols-outlined">format_size</span>
      </button>
    </div>
  );
}
