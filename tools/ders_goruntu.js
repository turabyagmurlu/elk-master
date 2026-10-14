// Ders sayfasının ekran görüntüsü: NODE_PATH=$(npm root -g) node tools/ders_goruntu.js 1 [çıktı.png] [genişlik]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const n = +process.argv[2]; const out = process.argv[3] || ('/tmp/ders' + n + '.png'); const w = +(process.argv[4] || 820);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('SAYFA HATASI', e.message));
  await p.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
  await p.waitForTimeout(600);
  await p.evaluate(n => go('ders', n), n); await p.waitForTimeout(400);
  await p.screenshot({ path: out, fullPage: true }); await b.close(); console.log(out);
})();
