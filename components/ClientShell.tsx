"use client";

import { useState, useEffect } from "react";
import SearchDialog from "./SearchDialog";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import MobileNav from "./MobileNav";
import OfflineBanner from "./OfflineBanner";
import { cacheAllPages } from "@/lib/useOffline";
import { STORAGE_KEY_THEME } from "@/lib/constants";
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
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
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
    localStorage.setItem(STORAGE_KEY_THEME, next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader
        surahName={surahName}
        juzNumber={juzNumber}
        onMenuToggle={surahs ? () => setMenuOpen(!menuOpen) : undefined}
        onSearchOpen={() => setSearchOpen(true)}
        dark={dark}
        onToggleDark={toggleDark}
        showMenu={!!surahs}
      />

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

      <MobileNav />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <OfflineBanner />
    </div>
  );
}
