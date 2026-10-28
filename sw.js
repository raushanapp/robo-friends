const CACHE_NAME = "robo-friends-v3";
const APP_SCOPE = new URL(self.registration.scope);
const ROBOTS_API = "https://jsonplaceholder.typicode.com/users";
const ROBOHASH_ORIGIN = "https://robohash.org";

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(APP_SCOPE);

  if (!response.ok) {
    throw new Error(`Failed to cache app shell: ${response.status}`);
  }

  await cache.put(APP_SCOPE, response.clone());

  const html = await response.text();
  const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(([, path]) => new URL(path, APP_SCOPE))
    .filter(
      (url) =>
        url.origin === APP_SCOPE.origin &&
        url.pathname.startsWith(APP_SCOPE.pathname) &&
        /\.(?:js|css|json|png|svg|ico)$/i.test(url.pathname),
    );

  await Promise.all(
    assetUrls.map(async (url) => {
      const assetResponse = await fetch(url);
      if (!assetResponse.ok) {
        throw new Error(
          `Failed to cache app asset ${url.pathname}: ${assetResponse.status}`,
        );
      }
      await cache.put(url, assetResponse);
    }),
  );

  const manifestUrl = assetUrls.find((url) =>
    url.pathname.endsWith("/manifest.json"),
  );
  if (manifestUrl) {
    const manifestResponse = await cache.match(manifestUrl);
    if (manifestResponse) {
      const manifest = await manifestResponse.json();
      await Promise.all(
        manifest.icons.map(async ({ src }) => {
          const iconUrl = new URL(src, manifestUrl);
          if (
            iconUrl.origin !== APP_SCOPE.origin ||
            !iconUrl.pathname.startsWith(APP_SCOPE.pathname)
          ) {
            return;
          }

          const iconResponse = await fetch(iconUrl);
          if (!iconResponse.ok) {
            throw new Error(
              `Failed to cache app icon ${iconUrl.pathname}: ${iconResponse.status}`,
            );
          }
          await cache.put(iconUrl, iconResponse);
        }),
      );
    }
  }
}

async function cacheRobotsAndAvatars() {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(ROBOTS_API);
    if (!response.ok) {
      throw new Error(`Robots API returned ${response.status}`);
    }

    await cache.put(ROBOTS_API, response.clone());
    const robots = await response.json();

    await Promise.all(
      robots.map(({ id }) =>
        cacheAvatar(cache, `${ROBOHASH_ORIGIN}/${id}?size=190x190`),
      ),
    );
  } catch (error) {
    console.warn("Unable to precache robots for offline use:", error);
  }
}

async function cacheAvatar(cache, url) {
  const response = await fetch(url, { mode: "no-cors" });
  if (response.type === "opaque" || response.ok) {
    await cache.put(url, response);
    return;
  }

  throw new Error(`Failed to cache robot avatar: ${response.status}`);
}

self.addEventListener("install", (event) => {
  event.waitUntil(Promise.all([cacheAppShell(), cacheRobotsAndAvatars()]));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((cacheNames) =>
          cacheNames
            .filter(
              (name) => name.startsWith("robo-friends-") && name !== CACHE_NAME,
            )
            .map((name) => caches.delete(name)),
        ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (url.href === ROBOTS_API) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(ROBOTS_API, response.clone());
            return response;
          }

          return (await caches.match(ROBOTS_API)) ?? response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(ROBOTS_API);
          return (
            cachedResponse ??
            new Response(
              JSON.stringify({ error: "Robots are not available offline." }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              },
            )
          );
        }),
    );
    return;
  }

  if (url.origin === ROBOHASH_ORIGIN) {
    event.respondWith(
      caches.match(request).then(async (cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        const response = await fetch(request);
        if (response.type === "opaque" || response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      }),
    );
    return;
  }

  if (
    url.origin !== APP_SCOPE.origin ||
    !url.pathname.startsWith(APP_SCOPE.pathname)
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return (
          (await cache.match(APP_SCOPE)) ??
          new Response("You are offline. Please reconnect.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        );
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await fetch(request);
      if (response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    }),
  );
});
