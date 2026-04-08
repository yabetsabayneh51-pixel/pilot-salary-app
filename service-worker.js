/**
 *  * Service Worker for Offline Support
  */

  const CACHE_NAME = 'pilot-salary-v1';
  const ASSETS = [
      '/',
          '/index.html',
              '/app.js',
                  '/db.js',
                      '/calculator.js',
                          '/ui.js',
                              '/manifest.json',
                                  'https://cdn.tailwindcss.com' // Cache CDN
                                  ];

                                  // Install Event
                                  self.addEventListener('install', event => {
                                      event.waitUntil(
                                              caches.open(CACHE_NAME)
                                                          .then(cache => cache.addAll(ASSETS))
                                                                      .then(() => self.skipWaiting())
                                                                          );
                                                                          });

                                                                          // Activate Event
                                                                          self.addEventListener('activate', event => {
                                                                              event.waitUntil(
                                                                                      caches.keys().then(cacheNames => {
                                                                                                  return Promise.all(
                                                                                                                  cacheNames
                                                                                                                                      .filter(name => name !== CACHE_NAME)
                                                                                                                                                          .map(name => caches.delete(name))
                                                                                                                                                                      );
                                                                                                                                                                              }).then(() => self.clients.claim())
                                                                                                                                                                                  );
                                                                                                                                                                                  });

                                                                                                                                                                                  // Fetch Event (Network First, then Cache)
                                                                                                                                                                                  self.addEventListener('fetch', event => {
                                                                                                                                                                                      event.respondWith(
                                                                                                                                                                                              fetch(event.request)
                                                                                                                                                                                                          .then(response => {
                                                                                                                                                                                                                          // Clone response to cache
                                                                                                                                                                                                                                          const responseClone = response.clone();
                                                                                                                                                                                                                                                          caches.open(CACHE_NAME).then(cache => {
                                                                                                                                                                                                                                                                              cache.put(event.request, responseClone);
                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                                              return response;
                                                                                                                                                                                                                                                                                                                          })
                                                                                                                                                                                                                                                                                                                                      .catch(() => {
                                                                                                                                                                                                                                                                                                                                                      return caches.match(event.request);
                                                                                                                                                                                                                                                                                                                                                                  })
                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                      });
 */