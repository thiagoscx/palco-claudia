// Offline: o app fica no cache "app-vN"; as músicas num cache separado ("musicas-v1")
// que NÃO é apagado quando eu atualizo o app, pra ela não rebaixar 52 MB.
const APP = "app-v1";
const SHELL = ["./", "index.html", "repertorio.js", "manifest.json", "icone.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener("activate", e => { e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("app-") && k !== APP) await caches.delete(k);
  await self.clients.claim();
})()); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith((async () => {
    const hit = await caches.match(e.request, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const r = await fetch(e.request);
      if (r.ok && e.request.url.includes("/musicas/")) (await caches.open("musicas-v1")).put(e.request, r.clone());
      else if (r.ok && new URL(e.request.url).origin === location.origin) (await caches.open(APP)).put(e.request, r.clone());
      return r;
    } catch { return caches.match("index.html"); }
  })());
});
