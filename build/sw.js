let cacheData = "appv1";
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/bundle.js',
                '/manifest.json',
                '/logo192.png',
                '/index.html',
                '/'
            ])
        })
    )
    
    self.addEventListener('activate', (event) => {
        event.waitUntil(
            // Perform any tasks you need during activation here

            // This will ensure that the new service worker
            // takes control immediately, but keeps the old cache
            self.clients.claim()
        );
    });

    this.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
            })
        )
    })
})