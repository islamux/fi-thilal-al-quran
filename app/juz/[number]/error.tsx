"use client";

import ErrorFallback from "@/components/ErrorFallback";

export default function JuzError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback {...props} message="تعذر تحميل الجزء. يرجى المحاولة مرة أخرى." />;
}
