const CACHE_NAME = "robo-friends-v2";
const BASE = "/robo-friends/";
// Install: cache the application shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const response = await fetch(BASE);
      if (!response.ok) {
        throw new Error(`Failed to cache app shell: ${response.status}`);
      }
      await cache.put(BASE, response);
    }),
  );
  self.skipWaiting();
});

// Activate: remove old versions of this app's cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (name) => name.startsWith("robo-friends-") && name !== CACHE_NAME,
            )
            .map((name) => caches.delete(name)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch: serve cached files offline
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle only GET requests from this origin.
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Only handle requests within this app.
  if (!url.pathname.startsWith(BASE)) {
    return;
  }

  // For page navigation, try the network first.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(BASE, copy);
            });
          }

          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);

          return (
            (await cache.match(BASE)) ||
            new Response("You are offline. Please reconnect.", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            })
          );
        }),
    );

    return;
  }

  // For JS, CSS, images, and other resources:
  // use the cache first, then the network.
  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      const response = await fetch(request);
      // Cache successful responses only.
      if (response.ok && response.type === "basic") {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, copy);
        });
      }

      return response;
    }),
  );
});
