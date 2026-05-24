import ClientShell from "@/components/ClientShell";
import SurahGrid from "@/components/SurahGrid";
import ContinueReading from "@/components/ContinueReading";
import { getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

export default function Home() {
  const surahList = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero section */}
        <div className="text-center mb-14 relative">
          {/* Large gold glow behind the title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[var(--color-accent)]/[0.07] to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Decorative gold diamonds row */}
          <div className="flex justify-center gap-1 mb-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="w-[3px] h-[3px]"
                style={{
                  backgroundColor: "var(--color-accent)",
                  opacity: 0.1 + (1 - Math.abs(i - 3.5) / 3.5) * 0.3,
                  transform: "rotate(45deg)",
                }}
              />
            ))}
          </div>

          <h1 className="relative font-[var(--font-amiri-quran)] text-6xl md:text-8xl leading-[1.2] gold-text mb-3">
            في ظلال القرآن
          </h1>

          <p className="relative text-lg text-[var(--color-text-secondary)] font-[var(--font-tajawal)]">
            تأليف: سيد قطب
          </p>

          {/* Gold divider with center diamond */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-[var(--color-accent)]/50 to-transparent" />
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="9" y="9" width="10" height="10" rx="2" fill="var(--color-accent)" opacity="0.15"/>
              <rect x="11" y="11" width="6" height="6" rx="1" fill="var(--color-accent)" opacity="0.4"/>
              <rect x="13" y="13" width="2" height="2" rx="0.5" fill="var(--color-accent)"/>
            </svg>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent" />
          </div>

          <p className="relative text-sm text-[var(--color-text-muted)] max-w-lg mx-auto leading-relaxed">
            رحلة تأملية في آيات الله — تفسير حي يتنفس مع حركة الإنسان والحياة والكون
          </p>

          {/* Premium stat pills with gold bg */}
          <div className="relative flex items-center justify-center gap-4 mt-8">
            <div className="card-gilded flex items-center gap-2.5 px-5 py-2.5 border-gold">
              <span className="flex items-center justify-center w-8 h-8 rounded-full gold-bg text-white text-sm font-bold shadow-sm">
                {surahList.length}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)] font-medium">سورة</span>
            </div>
            <div className="card-gilded flex items-center gap-2.5 px-5 py-2.5 border-gold">
              <span className="flex items-center justify-center w-8 h-8 rounded-full gold-bg text-white text-sm font-bold shadow-sm">
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
