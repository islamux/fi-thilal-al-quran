"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function AppHeader({
  surahName,
  juzNumber,
  onMenuToggle,
  onSearchOpen,
  dark,
  onToggleDark,
  showMenu,
}: {
  surahName?: string;
  juzNumber?: number;
  onMenuToggle?: () => void;
  onSearchOpen: () => void;
  dark: boolean;
  onToggleDark: () => void;
  showMenu: boolean;
}) {
  return (
    <header className="glass-header fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-4 lg:px-8 dark:border-outline-variant">
      <div className="flex items-center gap-4">
        {showMenu && (
          <button
            className="md:hidden p-sm hover:bg-warm-ash rounded-full transition-colors duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={onMenuToggle}
            aria-label="القائمة"
          >
            <span className="material-symbols-outlined text-text">menu</span>
          </button>
        )}
        <Link href="/" className="font-headline text-headline text-primary hover:text-secondary transition-colors tracking-tight font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
          {APP_NAME}
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
            className="w-64 bg-surface border border-warm-border rounded-xl px-md py-xs text-label-sm focus:border-secondary outline-none transition-colors text-text placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-accent shadow-subtle"
            onFocus={onSearchOpen}
            readOnly
          />
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
        </div>
        <button
          className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onSearchOpen}
          aria-label="البحث"
        >
          <span className="material-symbols-outlined md:hidden text-primary">search</span>
        </button>
        <button
          className="p-sm hover:bg-warm-ash rounded-full transition-colors active:scale-95 duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={onToggleDark}
          aria-label={dark ? "الوضع النهاري" : "الوضع الليلي"}
        >
          <span className="material-symbols-outlined text-primary">{dark ? "light_mode" : "dark_mode"}</span>
        </button>
      </div>
    </header>
  );
}
