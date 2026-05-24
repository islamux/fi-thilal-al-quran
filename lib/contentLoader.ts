import "server-only";
import fs from "fs";
import path from "path";
import indexData from "@/content/surahs-index.json";
import type { SurahIndexEntry, SurahData } from "./types";

const index = indexData as SurahIndexEntry[];

export function getAllSurahs(): SurahIndexEntry[] {
  return index;
}

export function getSurah(number: number): SurahData | null {
  const entry = index.find((s) => s.number === number);
  if (!entry) return null;
  const filePath = path.join(process.cwd(), "content/surahs", entry.file);
  const content = fs.readFileSync(filePath, "utf-8");
  return { ...entry, content };
}

export function getSurahsByJuz(juz: number): SurahIndexEntry[] {
  return index.filter((s) => s.juz === juz);
}

export function getAdjacentSurahs(number: number): { prev: SurahIndexEntry | null; next: SurahIndexEntry | null } {
  const idx = index.findIndex((s) => s.number === number);
  return {
    prev: idx > 0 ? index[idx - 1]! : null,
    next: idx < index.length - 1 ? index[idx + 1]! : null,
  };
}
