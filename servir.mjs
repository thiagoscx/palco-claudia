// servidor estático com suporte a Range (o do Python não tem, e sem Range o áudio não busca posição)
import { createServer } from "node:http"; import { createReadStream, statSync, existsSync } from "node:fs"; import { extname, join } from "node:path";
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".mp3": "audio/mpeg", ".png": "image/png" };
createServer((req, res) => {
  let f = join(process.cwd(), decodeURIComponent(req.url.split("?")[0]));
  if (f.endsWith("/")) f += "index.html";
  if (!existsSync(f)) { res.writeHead(404); return res.end("404"); }
  const size = statSync(f).size, type = T[extname(f)] || "application/octet-stream", r = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (r) { const s = +r[1] || 0, e = r[2] ? +r[2] : size - 1;
    res.writeHead(206, { "content-type": type, "content-range": `bytes ${s}-${e}/${size}`, "accept-ranges": "bytes", "content-length": e - s + 1 });
    return createReadStream(f, { start: s, end: e }).pipe(res); }
  res.writeHead(200, { "content-type": type, "content-length": size, "accept-ranges": "bytes" });
  createReadStream(f).pipe(res);
}).listen(4070, () => console.log("servindo em http://localhost:4070"));
