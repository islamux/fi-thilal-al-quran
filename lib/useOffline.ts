"use client";

import { useState, useEffect } from "react";
import { SW_CACHE_ALL, SW_CACHE_PROGRESS, SURAH_COUNT, JUZ_COUNT } from "./constants";

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
      if (event.data?.type === SW_CACHE_PROGRESS) {
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

  for (let i = 1; i <= SURAH_COUNT; i++) {
    urls.push(`/surah/${i}`);
  }
  for (let i = 1; i <= JUZ_COUNT; i++) {
    urls.push(`/juz/${i}`);
  }

  navigator.serviceWorker.controller.postMessage({
    type: SW_CACHE_ALL,
    urls,
  });
}
