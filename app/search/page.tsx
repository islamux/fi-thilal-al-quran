import { getAllSurahs } from "@/lib/contentLoader";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  const surahs = getAllSurahs();
  return <SearchClient surahs={surahs} />;
}
