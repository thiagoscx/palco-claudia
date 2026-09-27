// Offline: o app fica no cache "app-vN"; as músicas num cache separado ("musicas-v1")
// que NÃO é apagado quando eu atualizo o app, pra ela não rebaixar 52 MB.
const APP = "app-v9";
const SHELL = ["./", "index.html", "repertorio.js", "manifest.json", "icone.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener("activate", e => { e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("app-") && k !== APP) await caches.delete(k);
  await self.clients.claim();
})()); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const musica = e.request.url.includes("/musicas/");
  e.respondWith((async () => {
    // Música: cache primeiro (são 52 MB e não mudam, a não ser que eu suba o ?v=).
    if (musica) {
      const hit = await caches.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok) (await caches.open("musicas-v1")).put(e.request, r.clone());
      return r;
    }
    // App (index, repertório, ícone): rede primeiro, com prazo curto, e cai pro cache se estiver offline.
    // É o que faz qualquer correção minha chegar nela sem precisar reinstalar nada.
    try {
      // cache: "no-cache" = confere no servidor mesmo dentro dos 10 min que o GitHub manda guardar (só custa um 304)
      const r = await Promise.race([fetch(e.request, { cache: "no-cache" }), new Promise((_, x) => setTimeout(() => x(new Error("lento")), 3500))]);
      if (r.ok) (await caches.open(APP)).put(e.request, r.clone());
      return r;
    } catch {
      return (await caches.match(e.request, { ignoreSearch: true })) || (await caches.match("index.html")) || Response.error();
    }
  })());
});
