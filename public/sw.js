const CACHE_NAME = "rville-portfolio-v2";
const OFFLINE = "/offline.html";
const PRECACHE = [OFFLINE, "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("rville-portfolio") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || (url.pathname.startsWith("/api/") || url.pathname === "/admin") || request.headers.has("RSC") || url.searchParams.has("_rsc") || request.headers.has("Next-Router-Prefetch")) return;

  const navigation = request.mode === "navigate";
  const staticAsset = url.pathname.startsWith("/_next/static/");
  const image = url.pathname === "/_next/image" || /\.(png|webp|jpg|jpeg|svg|ico)$/.test(url.pathname);
  if (!navigation && !staticAsset && !image) return;

  if (staticAsset) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())));
      return response;
    })));
    return;
  }

  const network = fetch(request).then(response => {
    if (response.ok) event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())));
    return response;
  });
  event.respondWith(network.catch(async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (navigation) return await caches.match(OFFLINE) || Response.error();
    return Response.error();
  }));
});
