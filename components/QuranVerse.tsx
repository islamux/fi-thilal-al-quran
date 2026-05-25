"use client";

import { useMemo } from "react";

const VERSE_RE = /([^()]+?)\((\d+)\)/g;
const PAGE_REF_RE = /^\s*\(\d+\/\d+\)/;

interface VerseToken {
  type: "verse" | "text";
  text: string;
  number?: number;
}

function tokenizeLine(line: string): VerseToken[] {
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

function isPageRef(line: string): boolean {
  return PAGE_REF_RE.test(line) || line.trim().startsWith("في ظلال القرآن");
}

function isHeading(line: string): boolean {
  return line.startsWith("#") || line.startsWith("[سورة");
}

export default function QuranVerse({ content }: { content: string }) {
  const nodes = useMemo(() => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (isHeading(line)) return null;
      if (isPageRef(line)) {
        return (
          <p key={i} className="text-xs text-[var(--color-text-muted)] text-center mt-6 mb-2 font-[var(--font-tajawal)]">
            {line.trim()}
          </p>
        );
      }

      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={i} className="h-5" />;
      }

      const tokens = tokenizeLine(trimmed);
      if (tokens.length === 0) {
        return (
          <p key={i} className="text-lg leading-relaxed mb-5">
            {trimmed}
          </p>
        );
      }

      return (
        <p key={i} className="text-lg leading-relaxed mb-5 group hover:bg-[var(--color-verse-bg)] transition-colors duration-200 rounded-lg px-2 -mx-2">
          {tokens.map((token, j) =>
            token.type === "verse" ? (
              <span
                key={j}
                className="font-[var(--font-amiri-quran)] text-[1.3em] leading-relaxed"
              >
                <span className="verse-bracket">﴿</span>
                {token.text}
                <span className="verse-bracket">﴾</span>
                <span className="verse-badge">{token.number}</span>{" "}
              </span>
            ) : (
              <span key={j}>{token.text}</span>
            )
          )}
        </p>
      );
    });
  }, [content]);

  return <>{nodes}</>;
}
