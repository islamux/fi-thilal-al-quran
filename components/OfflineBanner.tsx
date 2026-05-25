"use client";

import { useOffline, useCacheProgress, cacheAllPages } from "@/lib/useOffline";

export default function OfflineBanner() {
  const offline = useOffline();
  const progress = useCacheProgress();

  if (progress && progress.done < progress.total) {
    return (
      <div className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-accent)] shadow-lg text-sm text-[var(--color-text-secondary)]">
        تحميل للاستخدام دون اتصال... {progress.done}/{progress.total}
      </div>
    );
  }

  if (!offline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 shadow-lg text-sm text-amber-800 dark:text-amber-200">
      أنت غير متصل — المحتوى المحفوظ متاح للقراءة
    </div>
  );
}
