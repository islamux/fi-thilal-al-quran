"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">حدث خطأ</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          تعذر تحميل السورة. يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
