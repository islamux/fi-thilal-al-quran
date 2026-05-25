"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Sun, Moon } from "lucide-react";
import SearchDialog from "./SearchDialog";
import Sidebar from "./Sidebar";
import OfflineBanner from "./OfflineBanner";
import { cacheAllPages } from "@/lib/useOffline";
import type { SurahIndexEntry } from "@/lib/types";

export default function ClientShell({
  children,
  surahs,
  activeNumber,
}: {
  children: React.ReactNode;
  surahs?: SurahIndexEntry[];
  activeNumber?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
    const id = setTimeout(() => {
      if (navigator.serviceWorker?.controller) {
        cacheAllPages();
      }
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gold top accent bar - very visible */}
      <div className="gold-bar" />

      <header className="sticky top-0 z-50 glass border-b border-[var(--color-border)]">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent" />

        <div className="flex items-center justify-between px-5 h-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            {surahs && (
              <button
                className="md:hidden p-2 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="القائمة"
              >
                <Menu size={22} />
              </button>
            )}
            <div className="hidden md:block w-72" />
          </div>

          <Link href="/" className="flex items-center gap-3 group">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <rect width="32" height="32" rx="7" fill="var(--color-accent)"/>
              <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--color-accent)" opacity="0.15"/>
              <path d="M9 9h4v14H9V9zm10 0h4v14h-4V9z" fill="white" opacity="0.9"/>
              <path d="M13 9h6v14h-6V9z" fill="white"/>
            </svg>
            <span className="text-lg font-[var(--font-amiri-quran)] font-bold text-[var(--color-text)] group-hover:gold-text transition-all duration-200">
              في ظلال القرآن
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              className="p-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
              onClick={() => setSearchOpen(true)}
              aria-label="البحث"
            >
              <Search size={20} />
            </button>
            <div className="w-px h-5 bg-[var(--color-border-light)] mx-1" />
            <button
              className="p-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
              onClick={toggleDark}
              aria-label={dark ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Desktop sidebar — fixed panel */}
        {surahs && (
          <div className="hidden md:block fixed top-16 right-0 bottom-0 z-30">
            <Sidebar surahs={surahs} activeNumber={activeNumber} />
          </div>
        )}

        {/* Mobile sidebar — overlay drawer */}
        {surahs && menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 right-0 z-50 md:hidden">
              <Sidebar surahs={surahs} activeNumber={activeNumber} onClose={() => setMenuOpen(false)} />
            </div>
          </>
        )}

        <main className={`flex-1 min-w-0 ${surahs ? 'md:mr-72' : ''}`}>{children}</main>
      </div>

      <footer className="relative py-6 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border-light)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent" />
        <span>في ظلال القرآن — سيد قطب</span>
      </footer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <OfflineBanner />
    </div>
  );
}
