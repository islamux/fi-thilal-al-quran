import Link from "next/link";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahNavFooter({
  prev,
  next,
}: {
  prev: SurahIndexEntry | null;
  next: SurahIndexEntry | null;
}) {
  return (
    <nav className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-warm-border" aria-label="التنقل بين السور">
      {prev ? (
        <Link
          href={`/surah/${prev.number}`}
          aria-label={`السورة السابقة: ${prev.name}`}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface border border-warm-border shadow-subtle hover:shadow-subtle-hover hover:-translate-y-0.5 transition-all duration-200 hover:border-accent/30 hover:bg-surface-hover"
        >
          <span className="material-symbols-outlined text-text-muted group-hover:text-accent transition-colors">chevron_right</span>
          <div className="text-right min-w-0">
            <div className="text-xs text-text-muted mb-0.5">السورة السابقة</div>
            <div className="font-[var(--font-amiri-quran)] text-lg text-text truncate">
              {prev.name}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href="/"
        aria-label="العودة إلى قائمة جميع السور"
        className="shrink-0 text-sm text-text-muted hover:text-accent transition-colors px-3"
      >
        جميع السور
      </Link>

      {next ? (
        <Link
          href={`/surah/${next.number}`}
          aria-label={`السورة التالية: ${next.name}`}
          className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface border border-warm-border shadow-subtle hover:shadow-subtle-hover hover:-translate-y-0.5 transition-all duration-200 hover:border-accent/30 hover:bg-surface-hover"
        >
          <div className="text-left min-w-0">
            <div className="text-xs text-text-muted mb-0.5">السورة التالية</div>
            <div className="font-[var(--font-amiri-quran)] text-lg text-text truncate">
              {next.name}
            </div>
          </div>
          <span className="material-symbols-outlined text-text-muted group-hover:text-accent transition-colors">chevron_left</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
