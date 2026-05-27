"use client";

import { useMemo } from "react";
import GoldDivider from "./GoldDivider";
import { tokenizeLine, isPageRef, isHeading } from "@/lib/verseTokenizer";

export default function QuranVerse({ content, surahName }: { content: string; surahName?: string }) {
  const nodes = useMemo(() => {
    const lines = content.split("\n");
    let lastWasVerse = false;
    return lines.flatMap((line, i) => {
      if (isHeading(line)) return [];
      if (isPageRef(line)) {
        lastWasVerse = false;
        return [
          <p key={i} className="text-label-sm text-greyed-ink text-center mt-lg mb-sm">
            {line.trim()}
          </p>,
        ];
      }

      const trimmed = line.trim();
      if (!trimmed) {
        lastWasVerse = false;
        return [<div key={i} className="h-5" />];
      }

      const tokens = tokenizeLine(trimmed);
      if (tokens.length === 0) {
        lastWasVerse = false;
        return [
          <p key={i} className="text-body leading-body mb-lg text-text">
            {trimmed}
          </p>,
        ];
      }

      const hasVerse = tokens.some((t) => t.type === "verse");

      if (hasVerse) {
        lastWasVerse = true;
        return [
          <div key={i} className="mb-xxl verse-block group">
            <div className="verse-content">
              <p className="font-verse text-verse leading-verse text-center mb-sm text-text">
                {tokens.map((token, j) =>
                  token.type === "verse" ? (
                    <span key={j} className="relative group/verse">
                      <span className="quran-bracket">﴿</span>
                      {token.text}
                      <span className="quran-bracket">﴾</span>
                      <span
                        className="verse-badge mr-2"
                        title={surahName && token.number ? `سورة ${surahName} - الآية ${token.number}` : undefined}
                      >
                        {token.number}
                      </span>{" "}
                    </span>
                  ) : null
                )}
              </p>
            </div>
          </div>,
          <GoldDivider key={`divider-${i}`} variant="narrow" className="my-lg" />,
        ];
      }

      const result = [];
      if (lastWasVerse) {
        result.push(
          <h4 key={`label-${i}`} className="font-title text-primary mb-sm border-r-2 border-warm-border pr-sm mr-md">
            في ظلال الآية
          </h4>,
        );
      }
      lastWasVerse = false;
      result.push(
        <p key={i} className="text-body leading-body mb-lg text-text">
          {tokens.map((token, j) =>
            <span key={j}>{token.text}</span>
          )}
        </p>,
      );
      return result;
    });
  }, [content]);

  return <>{nodes}</>;
}
