const VERSE_RE = /([^()]+?)\((\d+)\)/g;
const PAGE_REF_RE = /^\s*\(\d+\/\d+\)/;

export interface VerseToken {
  type: "verse" | "text";
  text: string;
  number?: number;
}

export function tokenizeLine(line: string): VerseToken[] {
  const tokens: VerseToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = VERSE_RE.exec(line)) !== null) {
    const before = line.slice(lastIndex, match.index);
    if (before.trim()) {
      tokens.push({ type: "text", text: before });
    }
    tokens.push({
      type: "verse",
      text: match[1]!.trim(),
      number: parseInt(match[2]!),
    });
    lastIndex = match.index + match[0].length;
  }

  const remaining = line.slice(lastIndex);
  if (remaining.trim()) {
    tokens.push({ type: "text", text: remaining });
  }

  return tokens;
}

export function isPageRef(line: string): boolean {
  return PAGE_REF_RE.test(line) || line.trim().startsWith("في ظلال القرآن");
}

export function isHeading(line: string): boolean {
  return line.startsWith("#") || line.startsWith("[سورة");
}
