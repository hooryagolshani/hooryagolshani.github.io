// offline cache: the whole menu (clips, posters, sounds) is stored on first visit
const C = 'menu3d-v6';
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(['./','index.html','manifest.webmanifest','media/burger-charcoal.jpg','media/burger-charcoal.mp4','media/burger-double.jpg','media/burger-double.mp4','media/burger-royal.jpg','media/burger-royal.mp4','media/cola.jpg','media/cola.mp4','media/fries.jpg','media/fries.mp4','media/icecream-cone.jpg','media/icecream-cone.mp4','media/icecream-lotus.jpg','media/icecream-lotus.mp4','media/icecream-saffron.jpg','media/icecream-saffron.mp4','media/juice-orange.jpg','media/juice-orange.mp4','media/pizza-chicken.jpg','media/pizza-chicken.mp4','media/pizza-garlic.jpg','media/pizza-garlic.mp4','media/pizza-roastbeef.jpg','media/pizza-roastbeef.mp4','media/pizza-special.jpg','media/pizza-special.mp4','media/plate.jpg','media/sfx/flip.mp3','media/sfx/ice.mp3','media/sfx/pop.mp3','media/sfx/rise.mp3','media/sfx/sizzle.mp3'])).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.headers.has('range')) return;   // iOS Safari streams video with Range requests: let the network answer those
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request)));
});
