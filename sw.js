/* Piccola Italiano v0.9.0 - offline app shell, no remote dependencies */
const CACHE = 'piccola-italiano-v0090';
const ASSETS = ['./', './index.html', './styles.css', './vivo.css?v=080', './curriculum.css?v=090', './app.js?v=090', './content.js?v=071', './mission.js', './adventure.js', './bank.js', './archaeology.js', './excavation.js', './codex.js', './chancery.js', './vivo.js?v=080', './curriculum.js?v=090', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('piccola-italiano-') && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});