import { Serwist } from "serwist";
import { registerRuntimeCaching } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
});

registerRuntimeCaching(serwist, []);

serwist.addEventListeners();
