const CACHE_NAME = 'tms-cache-v1';

// Files to cache on install (your app shell)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.json',
];

// INSTALL — cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE — delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH — Network first, fallback to cache (for API calls)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // API calls → Network first, cache fallback (offline support)
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request)) // Offline: return cached data
    );
    return;
  }

  // Static files → Cache first
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});