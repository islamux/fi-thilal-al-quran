"use client";

import Link from "next/link";

export default function ErrorFallback({
  error,
  reset,
  message,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  message: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">حدث خطأ</h2>
        <p className="text-sm text-text-muted mb-4">{message}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-warm-border text-sm text-text-secondary hover:bg-surface transition-colors"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
