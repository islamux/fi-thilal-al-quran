import { getAllSurahs } from "@/lib/contentLoader";
import SearchClient from "./SearchClient";
import type { SurahIndexEntry } from "@/lib/types";

export default function SearchPage() {
  const surahs = getAllSurahs() as SurahIndexEntry[];
  return <SearchClient surahs={surahs} />;
}
