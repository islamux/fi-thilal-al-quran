import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { SurahIndexEntry } from "@/lib/types";

export default function SurahNavFooter({
  prev,
  next,
}: {
  prev: SurahIndexEntry | null;
  next: SurahIndexEntry | null;
}) {
  return (
    <nav className="flex items-center justify-between gap-2 flex-wrap mt-12 pt-6 border-t border-[var(--color-border)]">
      {prev ? (
        <Link
          href={`/surah/${prev.number}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors text-sm"
        >
          <ChevronRight size={18} />
          <div className="text-right">
            <div className="text-[var(--color-text-muted)] text-xs">السابقة</div>
            <div className="font-medium">{prev.name}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      <Link
        href="/"
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        جميع السور
      </Link>

      {next ? (
        <Link
          href={`/surah/${next.number}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors text-sm"
        >
          <div className="text-left">
            <div className="text-[var(--color-text-muted)] text-xs">التالي</div>
            <div className="font-medium">{next.name}</div>
          </div>
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
