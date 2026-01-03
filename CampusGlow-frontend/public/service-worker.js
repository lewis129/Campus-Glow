const CACHE_NAME = "campus-glow-cache-v1";
const urlsToCache = [
  "/",              // root
  "/index.html",    // main HTML
  "/styles.css",    // your CSS
  "/app.js",        // your JS
  "/logo.png",      // example image
  "/offline.html"   // fallback page
];

// Install event: cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve cached file if available
      if (response) {
        return response;
      }
      // Try network, and if offline show fallback
      return fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});