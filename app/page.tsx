import ClientShell from "@/components/ClientShell";
import SurahGrid from "@/components/SurahGrid";
import ContinueReading from "@/components/ContinueReading";
import { getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

export default function Home() {
  const surahList = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">في ظلال القرآن</h1>
          <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
            تأليف: سيد قطب
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            تفسير في ظلال القرآن — رحلة تأملية في آيات الله
          </p>
        </div>

        <ContinueReading />

        <SurahGrid surahs={surahList} />
      </div>
    </ClientShell>
  );
}
