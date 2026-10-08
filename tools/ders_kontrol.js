// Kullanım: NODE_PATH=$(npm root -g) node tools/ders_kontrol.js dersler/d01.js [...]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const files = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent('<html><body><div id="x" style="width:760px"></div></body></html>');
  let bad = 0;
  for (const f of files) {
    const res = await p.evaluate((src) => {
      const out = { err: [], warn: [], info: {} }; window.ELK_DERS = {};
      try { (0, eval)(src); } catch (e) { out.err.push('JS HATASI: ' + e.message); return out; }
      const W = s => (s || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
      for (const id of Object.keys(window.ELK_DERS)) {
        const d = window.ELK_DERS[id]; const E = m => out.err.push(id + ': ' + m), U = m => out.warn.push(id + ': ' + m);
        ['hafta', 'baslik', 'hedef', 'saha', 'parcalar', 'ornek', 'yokla', 'sahada', 'ozet', 'modul'].forEach(k => { if (d[k] == null) E('alan eksik: ' + k); });
        if (!d.parcalar) continue;
        let w = W(d.saha) + W((d.hedef || []).join(' ')) + W((d.ozet || []).join(' ')) + W((d.sahada || []).join(' '));
        d.parcalar.forEach((x, i) => { const pw = W(x.metin); w += pw + W(x.akilda) + W(x.baslik); if (pw > 240) U('parça ' + (i + 1) + ' uzun (' + pw + ')'); if (!x.akilda) E('parça ' + (i + 1) + ' akilda yok'); });
        if (d.ornek) w += W(d.ornek.baslik) + W((d.ornek.adimlar || []).join(' ')) + W(d.ornek.sonuc);
        (d.yokla || []).forEach(q => { w += W(q.s) + W(q.c); if (!q.s || !q.c) E('yokla bozuk'); });
        const svgs = d.parcalar.map(x => x.sema || '').filter(Boolean);
        out.info[id] = { kelime: w, parca: d.parcalar.length, sema: svgs.length, yokla: (d.yokla || []).length };
        if (w < 1000) U('kısa (' + w + ')'); if (w > 1700) U('uzun (' + w + ')');
        if (d.parcalar.length < 3 || d.parcalar.length > 4) U('parça sayısı ' + d.parcalar.length);
        if (svgs.length < 2) U('şema az'); if ((d.yokla || []).length < 6) U('yokla az'); if ((d.hedef || []).length !== 3) U('hedef 3 olmalı');
        const all = JSON.stringify(d); const tip = (all.match(/tipik/gi) || []).length; if (tip > 3) U('"tipik" ' + tip + ' kez');
        svgs.forEach((s, k) => {
          const doc = new DOMParser().parseFromString(s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"'), 'image/svg+xml');
          if (doc.querySelector('parsererror')) { E('şema' + (k + 1) + ' XML HATASI'); return; }
          if (/#141d26|#e8eef6/i.test(s)) E('şema' + (k + 1) + ' koyu palet');
          const host = document.getElementById('x'); host.innerHTML = s; const svg = host.querySelector('svg');
          const vb = (svg.getAttribute('viewBox') || '').split(/[ ,]+/).map(Number); if (vb.length !== 4) { E('viewBox yok'); return; }
          const tx = [...svg.querySelectorAll('text')].map(e => { const bb = e.getBBox(); return { t: e.textContent.trim().slice(0, 25), x: bb.x, y: bb.y, w: bb.width, h: bb.height, fs: parseFloat(e.getAttribute('font-size') || getComputedStyle(e).fontSize) }; }).filter(o => o.w > 0);
          tx.forEach(o => { if (o.x < vb[0] - 1 || o.y < vb[1] - 1 || o.x + o.w > vb[0] + vb[2] + 1 || o.y + o.h > vb[1] + vb[3] + 1) E('şema' + (k + 1) + ' taşma "' + o.t + '"'); if (o.fs < 9.5) U('şema' + (k + 1) + ' küçük yazı "' + o.t + '"'); });
          for (let i = 0; i < tx.length; i++) for (let j = i + 1; j < tx.length; j++) { const a = tx[i], c = tx[j]; if (Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x) > 1.5 && Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y) > 1.5) E('şema' + (k + 1) + ' ÇAKIŞMA "' + a.t + '" × "' + c.t + '"'); }
        });
      }
      return out;
    }, fs.readFileSync(f, 'utf8'));
    console.log('== ' + path.basename(f), JSON.stringify(res.info)); res.err.forEach(e => console.log('  ✗ ' + e)); res.warn.forEach(e => console.log('  ! ' + e)); if (res.err.length) bad++;
  }
  await b.close(); process.exit(bad ? 2 : 0);
})();
