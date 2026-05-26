import ClientShell from "@/components/ClientShell";
import SurahGrid from "@/components/SurahGrid";
import ContinueReading from "@/components/ContinueReading";
import { getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

export default function Home() {
  const surahList = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell surahs={surahList}>
      <div className="pt-6 px-4 lg:px-8 min-h-screen pb-24 lg:pb-8 max-w-screen-2xl mx-auto">
        <ContinueReading />

        <div className="flex items-center justify-between mb-lg border-b border-warm-border pb-md">
          <h2 className="font-headline text-headline text-primary">فهرس السور</h2>
          <div className="flex items-center gap-sm">
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors" aria-label="ترتيب">
              <span className="material-symbols-outlined">sort</span>
            </button>
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors" aria-label="عرض شبكي">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>

        <SurahGrid surahs={surahList} />
      </div>
    </ClientShell>
  );
}
