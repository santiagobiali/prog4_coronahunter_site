const cacheName = 'pwa-conf-v4';
const staticAssets = [
  '',
  './manifest.json',
  './index.html',
  './static/assets/icon/flaticon.png',
  './static/css/all.css',
  './static/css/animate.css',
  './static/css/bootstrap.css',
  './static/css/corona_hunter.css',
  './static/css/font-awesome.css',
  './static/js/app.js',
  './static/js/bootstrap.bundle.min.js',
  './static/js/bootstrap.js',
  './static/js/corona_hunter.js',
  './static/js/jquery.min.js',
  './static/js/sw.js'
];

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try { 
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) { 
      const cachedResponse = await cache.match(req);
      return cachedResponse;
    }
}

self.addEventListener('fetch', event => {
    const req = event.request;
  
    if (/.*(json)$/.test(req.url)) {
      event.respondWith(networkFirst(req));
    } else {
      event.respondWith(cacheFirst(req));
    }
});
  
self.addEventListener('fetch', async event => {
    console.log('fetch event')
});

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
    console.log('install event');
});