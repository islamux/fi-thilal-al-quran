"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchDialog from "./SearchDialog";
import Sidebar from "./Sidebar";
import OfflineBanner from "./OfflineBanner";
import { cacheAllPages } from "@/lib/useOffline";
import type { SurahIndexEntry } from "@/lib/types";

export default function ClientShell({
  children,
  surahs,
  activeNumber,
  surahName,
  juzNumber,
}: {
  children: React.ReactNode;
  surahs?: SurahIndexEntry[];
  activeNumber?: number;
  surahName?: string;
  juzNumber?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;
    const RETRY_DELAY = 2000;

    function tryCache() {
      if (navigator.serviceWorker?.controller) {
        cacheAllPages();
      } else {
        attempts++;
        if (attempts < MAX_ATTEMPTS) {
          setTimeout(tryCache, RETRY_DELAY);
        }
      }
    }

    const id = setTimeout(tryCache, 3000);
    return () => clearTimeout(id);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-header fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-4 lg:px-8 dark:border-outline-variant">
        <div className="flex items-center gap-4">
          {surahs && (
            <button
              className="md:hidden p-sm hover:bg-warm-ash rounded-full transition-colors duration-150"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              <span className="material-symbols-outlined text-text">menu</span>
            </button>
          )}
          <Link href="/" className="font-headline text-headline text-primary hover:text-secondary transition-colors tracking-tight font-extrabold">
            في ظلال القرآن
          </Link>
        </div>

        {surahName && (
          <div className="hidden md:flex items-center gap-xl">
            <span className="text-secondary border-b-2 border-secondary font-medium">{surahName}</span>
            <span className="text-on-surface-variant hover:bg-warm-ash px-sm py-xs rounded transition-all cursor-pointer">
              الجزء {juzNumber}
            </span>
          </div>
        )}

        <div className="flex items-center gap-sm">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="بحث في السور والآيات..."
              className="w-64 bg-surface border border-warm-border rounded-xl px-md py-xs text-label-sm focus:border-secondary outline-none transition-colors text-text placeholder:text-text-muted"
              onFocus={() => setSearchOpen(true)}
              readOnly
            />
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
          </div>
          <button
            className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150"
            onClick={() => setSearchOpen(true)}
            aria-label="البحث"
          >
            <span className="material-symbols-outlined md:hidden text-primary">search</span>
          </button>
          <button
            className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150"
            onClick={toggleDark}
            aria-label={dark ? "الوضع النهاري" : "الوضع الليلي"}
          >
            <span className="material-symbols-outlined text-primary">{dark ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {surahs && (
          <div className="hidden lg:block fixed right-0 top-14 bottom-0 z-30 w-[280px]">
            <Sidebar surahs={surahs} activeNumber={activeNumber} />
          </div>
        )}

        {surahs && menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 right-0 z-50 lg:hidden">
              <Sidebar surahs={surahs} activeNumber={activeNumber} onClose={() => setMenuOpen(false)} />
            </div>
          </>
        )}

        <main className={`flex-1 min-w-0 pt-14 ${surahs ? 'lg:mr-[280px]' : ''}`}>{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-parchment-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-warm-border flex justify-around items-center h-16 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-secondary">
          <span className="material-symbols-outlined filled">book_2</span>
          <span className="text-[10px] font-medium">السور</span>
        </Link>
        <Link href="/juz/1" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">segment</span>
          <span className="text-[10px] font-medium">الأجزاء</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-medium">البحث</span>
        </Link>
        <Link href="/bookmarks" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">bookmark</span>
          <span className="text-[10px] font-medium">العلامات</span>
        </Link>
      </nav>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <OfflineBanner />
    </div>
  );
}
