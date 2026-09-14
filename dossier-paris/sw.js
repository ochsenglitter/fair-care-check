/* DOSSIER PARIS – Offline-Cache. Version bei jeder Aenderung hochzaehlen. */
const CACHE = "dossier-paris-v1";
const DATEIEN = [
  "./", "./index.html", "./manifest.webmanifest", "./img/icon.svg",
  "./css/style.css",
  "./js/core.js", "./js/items.js", "./js/audio.js", "./js/session.js", "./js/app.js",
  "./js/data/s1.js", "./js/data/s2.js", "./js/data/s3.js", "./js/data/s4.js", "./js/data/story.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   /* Schriften normal laden */
  e.respondWith(
    caches.match(e.request).then(treffer => {
      if (treffer) return treffer;
      return fetch(e.request).then(antwort => {
        const kopie = antwort.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie));
        return antwort;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
