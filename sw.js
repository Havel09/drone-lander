/* Service worker : met en cache les fichiers de la page pour qu'elle
   fonctionne hors connexion (l'APK n'est volontairement pas mis en cache). */
const CACHE = "drone-lander-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // On ne gère que les mêmes pages (pas l'APK ni les autres origines)
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((reponse) => {
      return reponse || fetch(event.request).then((reseau) => {
        // On met en cache les ressources mêmes-origine réussies
        if (reseau && reseau.status === 200 && reseau.type === "basic") {
          const copie = reseau.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copie));
        }
        return reseau;
      }).catch(() => caches.match("./index.html"));
    })
  );
});