self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)

  if (
    url.protocol === 'chrome-extension:'
    || url.pathname === "/_frsh/alive"
    || url.pathname === "/_frsh/refresh.js"
  ) {
    console.log(event.request.url)
    event.respondWith(fetch(event.request));
  } else {
    // Otherwise, cache the response and return it
    event.respondWith(
      caches.open('my-cache').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
