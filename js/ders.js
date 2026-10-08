/* ELK MASTER — 30 dakikalık ders motoru
   Dersler: dersler/dXX.js → ELK_DERS[n] = {hafta, baslik, hedef, saha, parcalar, ornek, yokla, sahada, ozet, modul}
   Kendini yokla kartları aralıklı tekrara girer (qid: "d<ders>.<soru>"). */

DB.ders = DB.ders || {};          /* {n: 'YYYY-MM-DD'} bitirilen dersler */
DB.seviye = DB.seviye || null;    /* {hafta: başlangıç haftası, puan: {h: %}} */
const HAFTA_AD = {1:'Elektriğin temeli',2:'AC ve üç faz',3:'Güvenlik ve ölçüm',4:'Kablo ve koruma',5:'Topraklama ve kaçak akım',6:'İç tesisat ve pano',7:'Motor ve kumanda',8:'Dağıtım ve arıza'};

function dersNos(){ return Object.keys(ELK_DERS).map(Number).sort((a,b)=>a-b); }
function dersBitti(n){ return !!DB.ders[n]; }
function siradakiDers(){
  const bas = DB.seviye ? DB.seviye.hafta : 1;
  return dersNos().find(n => !dersBitti(n) && ELK_DERS[n].hafta >= bas) || dersNos().find(n => !dersBitti(n)) || null;
}
function kartDue(){ const t=todayStr(); return Object.keys(DB.srs).filter(q => q[0]==='d' && DB.srs[q].due<=t && kartByQid(q)); }
function kartByQid(q){ const m=q.match(/^d(\d+)\.(\d+)$/); if(!m) return null; const d=ELK_DERS[+m[1]]; return d && d.yokla[+m[2]] ? Object.assign({ders:+m[1]}, d.yokla[+m[2]]) : null; }
function bar(p){ const n=Math.round(p/10); return '█'.repeat(n)+'░'.repeat(10-n)+' %'+p; }

/* ---------- Ders listesi (ana sayfa) ---------- */
function renderDersler(){
  const nos=dersNos(), bitti=nos.filter(dersBitti).length, pct=Math.round(bitti/Math.max(1,nos.length)*100);
  const s=siradakiDers(), kd=kartDue().length, sd=dueReviews().length;
  let h=`<div class="panel">
    <h2 class="h2">30 dakikalık dersler</h2>
    <p class="muted">${nos.length} ders · 8 hafta · günde bir ders. Her ders: sahadan bir durum, 3–4 kısa parça, şema, işlenmiş örnek, kafandan cevaplayacağın sorular, yarın sahada bakacakların.</p>
    <div class="bar"><i style="width:${pct}%"></i></div><div class="muted small">%${pct} · ${bitti}/${nos.length} ders bitti${DB.seviye?' · başlangıç: '+DB.seviye.hafta+'. hafta':''}</div>
    <div class="row">${s?`<button class="btn big" onclick="go('ders',${s})">Bugünün dersi: ${s}. ${esc(ELK_DERS[s].baslik)}</button>`:`<button class="btn big" onclick="go('exam')">Tüm dersler bitti — genel denemeye geç</button>`}
      ${(kd+sd)?`<button class="btn ghost" onclick="go('review')">Tekrar (${kd+sd})</button>`:''}
      ${DB.seviye?`<span class="muted small">Seviye testi: ${DB.seviye.hafta}. haftadan başla önerildi · <a class="lnk" onclick="seviyeBasla()">yeniden yap</a></span>`:`<button class="btn ghost" onclick="seviyeBasla()">Seviye testi (10 dk)</button>`}</div>
  </div>`;
  for(let w=1; w<=8; w++){
    const ds=nos.filter(n=>ELK_DERS[n].hafta===w); if(!ds.length) continue;
    const b=ds.filter(dersBitti).length;
    h+=`<div class="panel stage"><div class="stagehead"><h3>${w}. hafta · ${HAFTA_AD[w]||''}</h3><span class="muted">${b}/${ds.length}</span></div>
      <ol class="modlist">${ds.map(n=>`<li onclick="go('ders',${n})"><span class="mno">D${n}</span><span class="mt">${esc(ELK_DERS[n].baslik)}</span>${dersBitti(n)?'<span class="ok">bitti</span>':(n===s?'<span class="warn">sıradaki</span>':'<span class="muted">30 dk</span>')}</li>`).join('')}</ol></div>`;
  }
  h+=`<div class="panel center muted small">Derslerin dayandığı ayrıntılı bilgi <a class="lnk" onclick="go('modules')">Kütüphane</a>'de (45 modül). Ders sayfasındaki "Derinlemesine" bağlantıları oraya götürür.</div>`;
  app().innerHTML=h;
}

/* ---------- Ders sayfası ---------- */
function openDers(n){
  const d=ELK_DERS[n]; if(!d) return go('dersler');
  const nos=dersNos(), i=nos.indexOf(n), pv=nos[i-1], nx=nos[i+1];
  const fig=(svg,t)=> svg ? `<div class="figwrap"><div class="fighead">${esc(t)}</div><figure class="fig">${svg}</figure></div>` : '';
  let h=`<div class="crumb"><a onclick="go('dersler')">Dersler</a> › ${d.hafta}. hafta › Ders ${n}</div>
  <article class="panel ders">
    <div class="modhead"><div class="mno big">D${n}</div><div><h2 class="h2">${esc(d.baslik)}</h2><div class="muted small">${d.hafta}. hafta · ${HAFTA_AD[d.hafta]||''} · ≈30 dk · ${i+1}/${nos.length}${dersBitti(n)?' · bitirdin ('+DB.ders[n]+')':''}</div></div></div>
    <div class="dersbody">
    <div class="hedef"><div class="kutu-h">Bu dersten sonra</div><ul>${d.hedef.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="saha"><div class="kutu-h">Sahadan</div>${d.saha}</div>`;
  d.parcalar.forEach((p,k)=>{
    h+=`<section class="parca"><h3 class="sechead"><span class="secno">${k+1}</span>${p.baslik}</h3>
      <div class="ptext">${p.metin}</div>${fig(p.sema, 'Şekil '+(k+1)+' — '+p.baslik)}
      <div class="akilda"><span>Akılda kalsın</span>${p.akilda}</div></section>`;
  });
  h+=`<section class="parca"><h3 class="sechead"><span class="secno">✓</span>İşlenmiş örnek: ${d.ornek.baslik}</h3>
      <ol class="adimlar">${d.ornek.adimlar.map(a=>`<li>${a}</li>`).join('')}</ol><div class="sonuc"><b>Sonuç:</b> ${d.ornek.sonuc}</div></section>
    <section class="parca yokla"><h3 class="sechead"><span class="secno">?</span>Kendini yokla</h3>
      <p class="muted small">Cevabı önce kafanda kur (gerekirse kâğıda yaz), sonra aç. "Tekrar sor" dediklerin aralıklı tekrar listene girer.</p>
      ${d.yokla.map((q,j)=>`<div class="kart" id="k${j}"><div class="ks">${j+1}. ${q.s}</div>
        <button class="btn ghost sm" onclick="kartAc(${n},${j})">Cevabı göster</button>
        <div class="kc">${q.c}<div class="row"><button class="btn sm" onclick="kartNot(${n},${j},true)">Bildim</button><button class="btn ghost sm" onclick="kartNot(${n},${j},false)">Tekrar sor</button></div></div></div>`).join('')}
    </section>
    <section class="parca"><h3 class="sechead"><span class="secno">→</span>Yarın sahada</h3><ul class="bulcard">${d.sahada.map(x=>`<li>${x}</li>`).join('')}</ul></section>
    <div class="toparla"><div class="toparla-h">Özet</div><ul>${d.ozet.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <p class="muted small derin">Derinlemesine: ${(d.modul||[]).filter(modById).map(id=>`<a class="lnk" onclick="go('module',${id})">M${id} ${esc(modById(id).t)}</a>`).join(' · ')}</p>
    </div>
    <div class="row">${dersBitti(n)?'':`<button class="btn" onclick="dersBitir(${n})">Dersi bitirdim</button>`}<button class="btn ghost" onclick="window.print()">Yazdır</button></div>
    <div class="modnav">${pv?`<button class="btn ghost sm" onclick="go('ders',${pv})">← D${pv}</button>`:'<span></span>'}${nx?`<button class="btn sm" onclick="go('ders',${nx})">D${nx} ${esc(ELK_DERS[nx].baslik)} →</button>`:''}</div>
  </article>`;
  app().innerHTML=h;
}
function kartAc(n,j){ const k=el('k'+j); if(k) k.classList.add('acik'); }
function kartNot(n,j,ok){ srsAnswer('d'+n+'.'+j, ok); const k=el('k'+j); if(k){ k.classList.add(ok?'bildi':'bilmedi'); k.querySelector('.kc .row').innerHTML='<span class="'+(ok?'ok':'warn')+'">'+(ok?'Bildin — aralık uzadı.':'Tekrar listene eklendi.')+'</span>'; } }
function dersBitir(n){
  DB.ders[n]=todayStr(); persist();
  const nx=siradakiDers();
  toast('Ders '+n+' bitti');
  if(nx) go('ders',nx); else go('dersler');
}

/* ---------- Kart tekrarı ---------- */
function renderKartTekrar(){
  const due=kartDue().slice(0,15);
  let h=`<div class="panel"><h2 class="h2">Kart tekrarı · ${due.length}</h2><p class="muted small">Ders kartları. Cevabı kafanda kur, sonra aç ve dürüstçe işaretle.</p>`;
  h+=due.map((q,j)=>{ const c=kartByQid(q), m=q.match(/^d(\d+)\.(\d+)$/); return `<div class="kart" id="k${j}"><div class="muted small">Ders ${c.ders} · ${esc(ELK_DERS[c.ders].baslik)}</div><div class="ks">${c.s}</div>
      <button class="btn ghost sm" onclick="kartAc(0,${j})">Cevabı göster</button>
      <div class="kc">${c.c}<div class="row"><button class="btn sm" onclick="kartNot(${m[1]},${m[2]},true);this.closest('.kart').id='x'">Bildim</button><button class="btn ghost sm" onclick="kartNot(${m[1]},${m[2]},false)">Tekrar sor</button></div></div></div>`; }).join('');
  h+=`<div class="row">${dueReviews().length?`<button class="btn" onclick="renderReviewMCQ()">Sıradaki: ${dueReviews().length} çoktan seçmeli tekrar</button>`:''}<button class="btn ghost" onclick="go('dersler')">Derslere dön</button></div></div>`;
  app().innerHTML=h;
}

/* ---------- Seviye testi ---------- */
let SV=null;
function seviyeBasla(){
  const items=[];
  for(let w=1; w<=8; w++){
    const mods=[...new Set(dersNos().filter(n=>ELK_DERS[n].hafta===w).flatMap(n=>ELK_DERS[n].modul||[]))].filter(id=>QBANK[id]&&QBANK[id].length);
    const pool=[]; mods.forEach(id=>QBANK[id].forEach((q,i)=>pool.push(Object.assign({qid:id+'.'+i, hafta:w},q))));
    shuffle(pool).slice(0,3).forEach(q=>items.push(q));
  }
  SV={items:shuffleItems(items)};
  app().innerHTML=`<div class="panel"><h2 class="h2">Seviye testi · ${SV.items.length} soru</h2><p class="muted">Her haftadan 3 soru. Bilmediğini boş bırakma, tahmin de etme: emin değilsen boş geç. Sonuca göre hangi haftadan başlaman gerektiğini söyleyeceğim.</p><div id="svBody"></div></div>`;
  window.scrollTo(0,0);
  startQuiz('svBody', SV.items, false, 'Testi bitir', ()=>{
    const p={}; for(let w=1;w<=8;w++){ const it=SV.items.map((x,i)=>[x,i]).filter(([x])=>x.hafta===w); if(it.length) p[w]=Math.round(it.filter(([x,i])=>QS.picks[i]===x.ans).length/it.length*100); }
    let bas=1; for(let w=1;w<=8;w++){ if(p[w]!=null && p[w]<67){ bas=w; break; } bas=w+1; }
    bas=Math.min(bas,8);
    DB.seviye={hafta:bas, puan:p, tarih:todayStr()}; persist();
    el('qresult').insertAdjacentHTML('beforeend', `<div class="panel2"><b>Önerilen başlangıç: ${bas}. hafta — ${HAFTA_AD[bas]}</b><table class="tbl">${Object.keys(p).map(w=>`<tr><td>${w}. hafta · ${HAFTA_AD[w]}</td><td class="${p[w]>=67?'ok':'warn'}">%${p[w]}</td></tr>`).join('')}</table><p class="muted small">Önceki haftaları atlayabilirsin; ama oradaki kavramlar sonraki derslerde kullanılıyor. Takıldığın yerde geri dönmek bir tık.</p></div><div class="row"><button class="btn" onclick="go('dersler')">Derslere git</button></div>`);
  });
}
