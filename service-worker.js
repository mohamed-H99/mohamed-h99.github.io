const cacheName = 'v1';

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      ).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() =>
        caches
          .match(e.request)
          .then(res => res)
          .then(() => self.skipWaiting())
      )
  );
});
