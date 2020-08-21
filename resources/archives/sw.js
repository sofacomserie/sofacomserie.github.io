var CACHE_NAME = "sofacomserie-" + process.env.PKG_VERSION;
var CACHED_URLS = [
  "/assets/js/site/scripts.js?v=0.1.0",
  "/assets/scss/site/style.css?v=0.1.0",

  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&amp;display=swap",

  "/assets/img/site/global/favicon.ico",
  "/assets/img/site/global/transparent.png",

  "/offline/index.html",
  "/offline/image.jpg",
  "/404.html",
  "/404.gif"
];

self.addEventListener("beforeinstallprompt", function (event) {
  event.userChoice.then(function (result) {
    if (result.outcome == "dismissed") {
      // Usuário dispensou o banner, enviar para o nosso analytics
    } else {
      // User accepted! Send to analytics
      // Usuário aceitou o banner, enviar para o nosso analytics
    }
  });
});

// Cache on install
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(CACHED_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Clear cache on activate
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(
              (name) => name.includes("sofacomserie") && name !== CACHE_NAME
            )
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Serve from Cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function (response) {
          if (response.status === 404) {
            return caches.match("/404.html");
          }
          return response;
        });
      })
      .catch(function () {
        return caches.match("/offline/index.html");
      })
  );
});
