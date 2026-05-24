export interface SurahIndexEntry {
  number: number;
  name: string;
  juz: number;
  verses: number;
  file: string;
  source_file: string;
}

export interface SurahData extends SurahIndexEntry {
  content: string;
}
