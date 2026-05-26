"use client";

import { useState, useEffect } from "react";

export function useOffline() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return offline;
}

export function useCacheProgress() {
  const [progress, setProgress] = useState<{ total: number; done: number } | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "CACHE_PROGRESS") {
        setProgress({ total: event.data.total, done: event.data.done });
      }
    };
    navigator.serviceWorker?.addEventListener("message", handler);
    return () => navigator.serviceWorker?.removeEventListener("message", handler);
  }, []);

  return progress;
}

export function cacheAllPages() {
  if (!("serviceWorker" in navigator) || !navigator.serviceWorker.controller) return;

  const urls: string[] = ["/"];

  for (let i = 1; i <= 114; i++) {
    urls.push(`/surah/${i}`);
  }
  for (let i = 1; i <= 30; i++) {
    urls.push(`/juz/${i}`);
  }

  navigator.serviceWorker.controller.postMessage({
    type: "CACHE_ALL_PAGES",
    urls,
  });
}

/** Check if a URL is cached in any Cache Storage. */
export async function isCached(url: string): Promise<boolean> {
  if (typeof caches === "undefined") return false;
  const keys = await caches.keys();
  for (const key of keys) {
    const cache = await caches.open(key);
    const match = await cache.match(url);
    if (match) return true;
  }
  return false;
}

/** React hook: returns a Set of surah numbers that are cached for offline. */
export function useCachedSurahs(): Set<number> {
  const [cached, setCached] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function scan() {
      if (typeof caches === "undefined") return;
      const surahNumbers = new Set<number>();
      const keys = await caches.keys();
      for (const key of keys) {
        const cache = await caches.open(key);
        const requests = await cache.keys();
        for (const req of requests) {
          const match = req.url.match(/\/surah\/(\d+)/);
          if (match) {
            const n = parseInt(match[1]!);
            if (!isNaN(n)) surahNumbers.add(n);
          }
        }
      }
      if (!cancelled) setCached(surahNumbers);
    }

    // Re-scan when cache progress messages arrive
    const handler = () => scan();
    navigator.serviceWorker?.addEventListener("message", handler);

    scan();

    return () => {
      cancelled = true;
      navigator.serviceWorker?.removeEventListener("message", handler);
    };
  }, []);

  return cached;
}