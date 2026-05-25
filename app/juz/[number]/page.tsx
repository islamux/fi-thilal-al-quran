import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import JuzGrid from "@/components/JuzGrid";
import { getSurahsByJuz, getAllSurahs } from "@/lib/contentLoader";
import type { SurahIndexEntry } from "@/lib/types";

const JUZ_COUNT = 30;

export async function generateStaticParams() {
  return Array.from({ length: JUZ_COUNT }, (_, i) => ({
    number: (i + 1).toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  return {
    title: `الجزء ${number} - في ظلال القرآن`,
    description: `سور الجزء ${number} من تفسير في ظلال القرآن لسيد قطب`,
  };
}

export default async function JuzPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const juz = parseInt(number);
  if (juz < 1 || juz > JUZ_COUNT) notFound();

  const surahs = getSurahsByJuz(juz) as SurahIndexEntry[];
  const allSurahs = getAllSurahs() as SurahIndexEntry[];

  return (
    <ClientShell surahs={allSurahs}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <JuzGrid juz={juz} surahs={surahs} />
      </div>
    </ClientShell>
  );
}
