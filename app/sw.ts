/// <reference lib="webworker" />
import type { PrecacheEntry } from "serwist";
import { Serwist, CacheFirst, NetworkFirst, ExpirationPlugin } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[];
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /\/search-data\.json/,
      handler: new CacheFirst({
        cacheName: "search-data",
        plugins: [
          new ExpirationPlugin({ maxEntries: 2, maxAgeSeconds: 60 * 60 * 24 * 90 }),
        ],
      }),
    },
    {
      matcher: /\/_next\/image\?/,
      handler: new NetworkFirst({
        cacheName: "next-image",
        plugins: [
          new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }),
        ],
      }),
    },
    {
      matcher: /\/icons\/.*\.(png|svg|ico)/,
      handler: new CacheFirst({
        cacheName: "app-icons",
        plugins: [
          new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }),
        ],
      }),
    },
  ],
});

// Pre-cache search-data.json on activate so search works offline immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open("search-data");
      try {
        const res = await fetch("/search-data.json");
        if (res.ok) await cache.put("/search-data.json", res);
      } catch {}
    })()
  );
});

serwist.addEventListeners();

self.addEventListener("message", (event) => {
  if (event.data?.type === "CACHE_ALL_PAGES") {
    const urls: string[] = event.data.urls;
    event.waitUntil(
      (async () => {
        const cache = await caches.open("offline-pages");
        const results = await Promise.allSettled(
          urls.map(async (url) => {
            try {
              const response = await fetch(url);
              if (response.ok) await cache.put(url, response);
            } catch {}
          })
        );
        const ok = results.filter((r) => r.status === "fulfilled").length;
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ type: "CACHE_PROGRESS", total: urls.length, done: ok })
          );
        });
      })()
    );
  }
});
