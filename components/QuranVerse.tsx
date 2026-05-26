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
          <p key={i} className="text-label-sm text-greyed-ink text-center mt-lg mb-sm">
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
          <p key={i} className="text-body leading-body mb-lg text-text">
            {trimmed}
          </p>
        );
      }

      const hasVerse = tokens.some((t) => t.type === "verse");

      if (hasVerse) {
        return (
          <div key={i} className="mb-xxl verse-block group">
            <div className="verse-content">
              <p className="font-verse text-verse leading-verse text-center mb-sm text-text">
                {tokens.map((token, j) =>
                  token.type === "verse" ? (
                    <span key={j}>
                      <span className="quran-bracket">﴿</span>
                      {token.text}
                      <span className="quran-bracket">﴾</span>
                      <span className="verse-badge mr-2">{token.number}</span>{" "}
                    </span>
                  ) : null
                )}
              </p>
            </div>
          </div>
        );
      }

      return (
        <p key={i} className="text-body leading-body mb-lg text-text">
          {tokens.map((token, j) =>
            <span key={j}>{token.text}</span>
          )}
        </p>
      );
    });
  }, [content]);

  return <>{nodes}</>;
}
