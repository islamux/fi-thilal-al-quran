import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import SurahNavFooter from "@/components/SurahNavFooter";
import SurahContent from "@/components/SurahContent";
import { getSurah, getAdjacentSurahs, getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";
import { APP_NAME } from "@/lib/constants";

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
    title: `سورة ${surah.name} - ${APP_NAME}`,
    description: `تفسير سورة ${surah.name} من ${APP_NAME} لسيد قطب`,
  };
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const num = parseInt(number);
  const surah = getSurah(num);
  if (!surah) notFound();

  const { prev, next } = getAdjacentSurahs(num);
  const allSurahs = getAllSurahs();

  return (
    <ClientShell surahs={allSurahs} activeNumber={num} surahName={surah.name} juzNumber={surah.juz}>
      <SurahContent
        number={surah.number}
        name={surah.name}
        juz={surah.juz}
        verses={surah.verses}
        content={surah.content}
        prevNumber={prev?.number}
        nextNumber={next?.number}
      />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <SurahNavFooter prev={prev} next={next} />
      </div>
    </ClientShell>
  );
}
