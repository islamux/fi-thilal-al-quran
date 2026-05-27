import Link from "next/link";
import { highlightText } from "@/lib/textUtils";
import type { SearchChunk } from "@/lib/search";

export default function SearchResultCard({
  result,
  query,
  focused,
}: {
  result: SearchChunk;
  query: string;
  focused: boolean;
}) {
  return (
    <div
      className={`bg-surface border border-warm-border p-lg rounded-xl shadow-subtle hover:shadow-subtle-hover hover:-translate-y-0.5 transition-all duration-200 group relative overflow-hidden ${
        focused ? "ring-2 ring-accent bg-warm-ash" : ""
      }`}
    >
      <div className="absolute right-0 top-0 w-1 h-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-md">
        <div>
          <h3 className="font-headline text-headline text-primary mb-xs">{result.surahName}</h3>
          <div className="flex gap-md">
            <span className="font-label-sm text-label-sm text-greyed-ink bg-warm-stone px-sm py-1 rounded">الجزء {result.juz}</span>
          </div>
        </div>
        <button className="p-sm text-greyed-ink hover:text-secondary transition-colors" aria-label="حفظ">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>
      <div className="bg-gilded-gold-light p-md rounded-lg mb-md text-center">
        <p className="font-verse text-verse text-primary leading-loose">
          {highlightText(result.text.slice(0, 200), query)}
        </p>
      </div>
      <Link
        href={`/surah/${result.surah}`}
        className="inline-flex items-center gap-xs text-secondary font-title text-title mt-md hover:gap-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        اقرأ التفسير كاملاً
        <span className="material-symbols-outlined text-sm">arrow_back</span>
      </Link>
    </div>
  );
}
