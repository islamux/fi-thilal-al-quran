"use client";

import { useRouter } from "next/navigation";
import { toggleBookmark } from "@/lib/bookmarks";

export default function FloatingNavPill({
  number,
  name,
  prevNumber,
  nextNumber,
  onBookmarkToggle,
}: {
  number: number;
  name: string;
  prevNumber?: number;
  nextNumber?: number;
  onBookmarkToggle: () => void;
}) {
  const router = useRouter();

  return (
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1 bg-primary text-white p-2 rounded-full shadow-xl">
        {prevNumber ? (
          <button
            onClick={() => router.push(`/surah/${prevNumber}`)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
            aria-label="السورة السابقة"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : <div className="w-10 h-10" />}

        <div className="w-px h-6 bg-white/20" />

        <button
          onClick={() => { toggleBookmark(number, name); onBookmarkToggle(); }}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
          aria-label="حفظ"
        >
          <span className="material-symbols-outlined">bookmark</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all" aria-label="مشاركة">
          <span className="material-symbols-outlined">share</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all" aria-label="إعدادات">
          <span className="material-symbols-outlined">settings_suggest</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        {nextNumber ? (
          <button
            onClick={() => router.push(`/surah/${nextNumber}`)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
            aria-label="السورة التالية"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : <div className="w-10 h-10" />}
      </div>
    </div>
  );
}
