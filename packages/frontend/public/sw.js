const CACHE_NAME = 'mubit-v1';
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = ['/', '/offline'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (!event.request.url.startsWith('http')) return;

  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  if (request.mode === 'navigate' || request.destination === 'document') {
    try {
      const networkResponse = await fetchWithTimeout(request, 5000);

      if (networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const offlineResponse = await caches.match(OFFLINE_URL);
      if (offlineResponse) {
        return offlineResponse;
      }

      return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  try {
    const cachedResponse = await caches.match(request);

    const networkPromise = fetch(request)
      .then(async (response) => {
        if (response && response.ok && response.status === 200) {
          try {
            const cache = await caches.open(CACHE_NAME);

            await cache.put(request, response.clone());
          } catch (err) {
            console.warn('[SW] Failed to cache:', request.url, err);
          }
        }
        return response;
      })
      .catch((err) => {
        console.warn('[SW] Network fetch failed:', err);
        return null;
      });

    if (cachedResponse) {
      networkPromise.catch(() => {});
      return cachedResponse;
    }

    return (await networkPromise) || new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('[SW] Fetch error:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Not found', { status: 404 });
  }
}

function fetchWithTimeout(request, timeout) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Network timeout')), timeout)),
  ]);
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
