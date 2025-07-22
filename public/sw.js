
const CACHE_NAME = 'fundit-v2';
const STATIC_CACHE = 'fundit-static-v2';
const DYNAMIC_CACHE = 'fundit-dynamic-v2';

const staticAssets = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/e6293d53-5a45-4a9c-babb-c7ce15f22a7e.png',
  '/lovable-uploads/97f86f98-1c7d-47e7-88b5-94abda06fe44.png',
  '/manifest.json'
];

const dynamicAssets = [
  '/company-events',
  '/knowledge-base',
  '/suggestion-box',
  '/post-management',
  '/member-management'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(staticAssets)),
      caches.open(DYNAMIC_CACHE).then(cache => cache.addAll(dynamicAssets))
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached version and update cache in background
        updateCache(request);
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request).then(response => {
        // Don't cache error responses
        if (!response.ok) return response;

        // Clone the response for caching
        const responseClone = response.clone();
        
        // Determine which cache to use
        const cacheName = staticAssets.includes(url.pathname) 
          ? STATIC_CACHE 
          : DYNAMIC_CACHE;

        // Cache the response
        caches.open(cacheName).then(cache => {
          cache.put(request, responseClone);
        });

        return response;
      }).catch(() => {
        // Network failed, try to serve a fallback
        if (request.destination === 'document') {
          return caches.match('/');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Background cache update
async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Performing background sync...');
  // Implement sync logic here
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New update available',
    icon: '/lovable-uploads/97f86f98-1c7d-47e7-88b5-94abda06fe44.png',
    badge: '/lovable-uploads/97f86f98-1c7d-47e7-88b5-94abda06fe44.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('FundiT Intranet', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
