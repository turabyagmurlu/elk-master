// Kullanım: NODE_PATH=$(npm root -g) node tools/kontrol.js icerik/m01.js [icerik/m02.js ...]
// İçerik dosyasını doğrular: JS sözdizimi, kelime sayısı, bölüm sayısı, SVG XML geçerliliği,
// SVG metin çakışması ve viewBox dışına taşma, soru formatı.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const files = process.argv.slice(2); if (!files.length) { console.log('dosya ver'); process.exit(1); }
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 800, height: 900 } });
  await p.setContent('<html><body><div id="x" style="width:760px"></div></body></html>');
  let bad = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const res = await p.evaluate((src) => {
      const out = { err: [], warn: [], info: {} };
      window.ELK_ICERIK = {};
      try { (0, eval)(src); } catch (e) { out.err.push('JS HATASI: ' + e.message); return out; }
      const ids = Object.keys(window.ELK_ICERIK); if (!ids.length) { out.err.push('ELK_ICERIK boş'); return out; }
      for (const id of ids) {
        const c = window.ELK_ICERIK[id]; const t = c.teori || '';
        const plain = t.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]*>/g, ' ');
        const words = plain.split(/\s+/).filter(Boolean).length;
        const secs = (t.match(/<b style="font-size:15px">/g) || []).length;
        const svgs = t.match(/<svg[\s\S]*?<\/svg>/g) || [];
        out.info[id] = { kelime: words, bolum: secs, sema: svgs.length, soru: (c.sorular || []).length, ozet_kelime: (c.ozet || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length };
        if (words < 900) out.warn.push(id + ': kelime az (' + words + ')');
        if (secs < 5) out.warn.push(id + ': bölüm az (' + secs + ')');
        if (svgs.length < 2) out.warn.push(id + ': şema az (' + svgs.length + ')');
        (c.sorular || []).forEach((q, i) => { if (!q.q || !Array.isArray(q.opts) || q.opts.length !== 4 || !(q.ans >= 0 && q.ans < 4) || !q.ex) out.err.push(id + ': soru ' + i + ' formatı bozuk'); });
        svgs.forEach((s, k) => {
          if (/<br/i.test(s)) out.err.push(id + ' şema' + (k + 1) + ': SVG içinde <br> var');
          const doc = new DOMParser().parseFromString(s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'), 'image/svg+xml');
          if (doc.querySelector('parsererror')) { out.err.push(id + ' şema' + (k + 1) + ': SVG XML HATASI ' + doc.querySelector('parsererror').textContent.slice(0, 120)); return; }
          const host = document.getElementById('x'); host.innerHTML = s; const svg = host.querySelector('svg');
          const vb = (svg.getAttribute('viewBox') || '').split(/[ ,]+/).map(Number);
          if (vb.length !== 4) { out.err.push(id + ' şema' + (k + 1) + ': viewBox yok'); return; }
          const tx = [...svg.querySelectorAll('text')].map(e => { const bb = e.getBBox(); return { t: e.textContent.trim().slice(0, 30), x: bb.x, y: bb.y, w: bb.width, h: bb.height, fs: parseFloat(e.getAttribute('font-size') || getComputedStyle(e).fontSize) }; }).filter(o => o.w > 0);
          tx.forEach(o => {
            if (o.x < vb[0] - 1 || o.y < vb[1] - 1 || o.x + o.w > vb[0] + vb[2] + 1 || o.y + o.h > vb[1] + vb[3] + 1) out.err.push(id + ' şema' + (k + 1) + ': taşma "' + o.t + '"');
            if (o.fs < 8.5) out.warn.push(id + ' şema' + (k + 1) + ': küçük yazı ' + o.fs + ' "' + o.t + '"');
          });
          for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) {
            const a = tx[i], c2 = tx[j]; const ox = Math.min(a.x + a.w, c2.x + c2.w) - Math.max(a.x, c2.x), oy = Math.min(a.y + a.h, c2.y + c2.h) - Math.max(a.y, c2.y);
            if (ox > 1.5 && oy > 1.5) out.err.push(id + ' şema' + (k + 1) + ': METİN ÇAKIŞMASI "' + a.t + '" × "' + c2.t + '"');
          }
        });
      }
      return out;
    }, src);
    console.log('== ' + path.basename(f), JSON.stringify(res.info));
    res.err.forEach(e => console.log('  ✗ ' + e)); res.warn.forEach(e => console.log('  ! ' + e));
    if (res.err.length) bad++;
  }
  await b.close(); process.exit(bad ? 2 : 0);
})();
