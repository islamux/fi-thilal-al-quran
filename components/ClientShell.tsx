"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Sun, Moon } from "lucide-react";
import SearchDialog from "./SearchDialog";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-background)]/80 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto w-full">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="text-xl font-bold tracking-tight">
            في ظلال القرآن
          </Link>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
              onClick={toggleDark}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
