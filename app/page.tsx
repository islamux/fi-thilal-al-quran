import ClientShell from "@/components/ClientShell";
import SurahGrid from "@/components/SurahGrid";
import ContinueReading from "@/components/ContinueReading";
import { getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

export default function Home() {
  const surahList = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell surahs={surahList}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero section */}
        <div className="text-center mb-14 relative">
          {/* Large gold glow behind the title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[var(--color-accent)]/[0.07] to-transparent rounded-full blur-3xl pointer-events-none" />

          <h1 className="relative font-[var(--font-amiri-quran)] text-6xl md:text-8xl leading-[1.2] gold-text mb-3">
            في ظلال القرآن
          </h1>

          <p className="relative text-lg text-[var(--color-text-secondary)] font-[var(--font-tajawal)]">
            تأليف: سيد قطب
          </p>

          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-px w-24 bg-[var(--color-border)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" />
            <div className="h-px w-24 bg-[var(--color-border)]" />
          </div>

          <p className="relative text-sm text-[var(--color-text-muted)] max-w-lg mx-auto leading-relaxed">
            رحلة تأملية في آيات الله — تفسير حي يتنفس مع حركة الإنسان والحياة والكون
          </p>

          {/* Stat pills — subtle, no gold bg */}
          <div className="relative flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] text-sm font-bold">
                {surahList.length}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)] font-medium">سورة</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] text-sm font-bold">
                ٣٠
              </span>
              <span className="text-sm text-[var(--color-text-secondary)] font-medium">جزء</span>
            </div>
          </div>
        </div>

        <div>
          <ContinueReading />
        </div>

        <div>
          {/* Section header with bold gold accent */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-1 h-7 rounded-full gold-bg shadow-sm" />
            <h2 className="text-xl font-bold text-[var(--color-text)]">فهرس السور</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
          </div>

          <SurahGrid surahs={surahList} />
        </div>
      </div>
    </ClientShell>
  );
}
