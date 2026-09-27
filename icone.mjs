import { chromium } from "playwright-core";
const exe = process.env.HOME + "/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const svg = (pad) => `<!doctype html><html><body style="margin:0"><div style="width:512px;height:512px;background:#14101A;display:grid;place-items:center">
<svg width="${pad ? 300 : 380}" height="${pad ? 300 : 380}" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FF6B35"/>
  <path d="M41 32 L41 68 L70 50 Z" fill="#14101A"/>
  <circle cx="33" cy="50" r="5" fill="#14101A"/>
</svg></div></body></html>`;
const b = await chromium.launch({ executablePath: exe });
for (const [f, pad] of [["icone.png", false], ["icone-mascara.png", true]]) {
  const p = await b.newPage({ viewport: { width: 512, height: 512 } });
  await p.setContent(svg(pad)); await p.waitForTimeout(200); await p.screenshot({ path: f }); await p.close();
}
await b.close(); console.log("ícones ok");
