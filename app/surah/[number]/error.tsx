"use client";

import ErrorFallback from "@/components/ErrorFallback";

export default function SurahError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback {...props} message="تعذر تحميل السورة. يرجى المحاولة مرة أخرى." />;
}
