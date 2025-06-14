const CACHE_NAME = 'majorine-ventures-v4';
const FILES_TO_CACHE = [
  'shop.html',
  'admin.html',
  'sales.html',
  'manifest.json',
  'assets/banner.jpg',
  'data/products.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'libs/xlsx.full.min.js',
  'libs/papaparse.min.js'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

// Listen for update signal
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
