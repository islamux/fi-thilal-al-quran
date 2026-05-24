import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import SurahNavFooter from "@/components/SurahNavFooter";
import SurahContent from "@/components/SurahContent";
import { getSurah, getAdjacentSurahs, getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry, SurahData } from "@/lib/types";

export async function generateStaticParams() {
  const surahs = getAllSurahs();
  return surahs.map((s: SurahIndexEntry) => ({ number: s.number.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const surah = getSurah(parseInt(number));
  if (!surah) return {};
  return {
    title: `سورة ${surah.name} - في ظلال القرآن`,
    description: `تفسير سورة ${surah.name} من في ظلال القرآن لسيد قطب`,
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const num = parseInt(number);
  const surah = getSurah(num) as SurahData | null;
  if (!surah) notFound();

  const { prev, next } = getAdjacentSurahs(num);

  return (
    <ClientShell>
      <SurahContent
        number={surah.number}
        name={surah.name}
        juz={surah.juz}
        verses={surah.verses}
        content={surah.content}
      />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <SurahNavFooter prev={prev} next={next} />
      </div>
    </ClientShell>
  );
}
