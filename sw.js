const staticCacheName = 'site-static-v12';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/rnd/pwa/',
    '/rnd/pwa/index.html',
    '/rnd/pwa/fallback.html'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets)
        })
    );
})

//active service worker
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

//fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    return fetchRes;
                })
            });
        }).catch(() => caches.match('/rnd/pwa/fallback.html'))
    );
});


