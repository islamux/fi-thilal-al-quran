"use client";

import { useOffline, useCacheProgress, cacheAllPages } from "@/lib/useOffline";

export default function OfflineBanner() {
  const offline = useOffline();
  const progress = useCacheProgress();

  if (progress && progress.done < progress.total) {
    return (
      <div className="fixed bottom-20 lg:bottom-4 right-4 z-50 px-4 py-2 rounded-xl bg-surface border border-accent shadow-subtle text-sm text-text-secondary">
        تحميل للاستخدام دون اتصال... {progress.done}/{progress.total}
      </div>
    );
  }

  if (!offline) return null;

  return (
    <div className="offline-banner">
      أنت غير متصل — المحتوى المحفوظ متاح للقراءة
    </div>
  );
}
