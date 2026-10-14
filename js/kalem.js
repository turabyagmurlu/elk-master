/* ELK MASTER — Kalem: metin vurgulama, satır notu, şema üstüne serbest çizim.
   Depo: DB.vurgu[sayfa] = [{t:metin, n:kaçıncı eşleşme, r:renk, not:'...'}]
         DB.cizim[sayfa][şemaNo] = dataURL (PNG)
   sayfa anahtarı: 'd7' (ders) veya 'm26' (modül). Yedek dosyasına DB ile birlikte girer. */

DB.vurgu = DB.vurgu || {};
DB.cizim = DB.cizim || {};
const KALEM_RENK = {s:'#fff176', y:'#a5d6a7', p:'#f8bbd0'};  /* sarı, yeşil, pembe */
let KALEM = { sayfa:null, kok:null, mod:false, arac:'vurgu', renk:'s' };
try{ const k=JSON.parse(localStorage.getItem('elk_kalem')||'{}'); if(k.arac) KALEM.arac=k.arac; if(k.renk) KALEM.renk=k.renk; }catch(e){}
const KALEM_IKON='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';
const KALEM_ARAC = {vurgu:'Vurgula', not:'Not', ciz:'Çiz', sil:'Silgi'};

/* ---------- sayfa bağlama ---------- */
function kalemBagla(sayfa, kokSecici){
  KALEM.sayfa = sayfa; KALEM.kok = document.querySelector(kokSecici);
  if(!KALEM.kok) return kalemGizle();
  kalemUygula();
  kalemCizimYukle();
  kalemIkonGoster();
}
/* sayfa değişince: ikon gizlenir, kalem modu kapanır */
function kalemGizle(){
  KALEM.sayfa=null; KALEM.kok=null; kalemModKapat();
  ['kalemFab','kalemIpucu'].forEach(id=>{ const x=el(id); if(x) x.remove(); });
}
function kalemIkonGoster(){
  let f=el('kalemFab');
  if(!f){ f=document.createElement('button'); f.id='kalemFab'; f.setAttribute('aria-label','Kalem'); f.innerHTML=KALEM_IKON; f.onclick=kalemModDegistir; document.body.appendChild(f); }
  f.classList.toggle('acik', KALEM.mod);
  try{ if(!el('kalemIpucu') && localStorage.getItem('elk_kalem_ipucu')!=='1'){ const t=document.createElement('div'); t.id='kalemIpucu'; t.innerHTML='Kalem: vurgula, not al, şemaya çiz. <b>Dokun, başla.</b>'; t.onclick=()=>t.remove(); document.body.appendChild(t); localStorage.setItem('elk_kalem_ipucu','1'); setTimeout(()=>{ const x=el('kalemIpucu'); if(x) x.remove(); },6000); } }catch(e){}
}
function kalemModDegistir(){ KALEM.mod ? kalemModKapat() : kalemModAc(); }
function kalemModAc(){
  if(!KALEM.kok) return;
  KALEM.mod=true; const ip=el('kalemIpucu'); if(ip) ip.remove();
  document.body.classList.add('kalem-acik');
  let pnl=el('kalemPanel'); if(!pnl){ pnl=document.createElement('div'); pnl.id='kalemPanel'; document.body.appendChild(pnl); }
  kalemPanelCiz(); kalemAracUygula();
  const f=el('kalemFab'); if(f) f.classList.add('acik');
  kalemFabKonum();
}
function kalemModKapat(){
  KALEM.mod=false;
  document.body.classList.remove('kalem-acik','kalem-ciz','kalem-sil','kalem-yaz');
  ['kalemPanel','kalemBar','kalemMenu'].forEach(id=>{ const x=el(id); if(x) x.remove(); });
  const f=el('kalemFab'); if(f){ f.classList.remove('acik'); f.style.bottom=''; }
  try{ const s=window.getSelection(); if(s) s.removeAllRanges(); }catch(e){}
}
function kalemPanelCiz(){
  const pnl=el('kalemPanel'); if(!pnl) return;
  const yard={vurgu:'Metnin üstünde <b>yana sürükle</b> → boyar. Dokun → cümleyi boyar.', not:'<b>Sürükle</b> veya cümleye dokun → boya + not yaz.', ciz:'Bir <b>şemaya</b> dokun, üstüne çiz.', sil:'Vurguların <b>üstünden geç</b> veya dokun → siler.'};
  pnl.innerHTML=`<div class="kp-araclar">${Object.keys(KALEM_ARAC).map(a=>`<button class="kp-arac ${KALEM.arac===a?'aktif':''}" onclick="kalemAracSec('${a}')">${KALEM_ARAC[a]}</button>`).join('')}<button class="kp-arac kp-geri" onclick="kalemGeriAl()" ${((KALEM.gecmis||{})[KALEM.sayfa]||[]).length?'':'disabled'}>↶ Geri al</button></div>
    <div class="kp-alt"><span class="kp-renkler" ${KALEM.arac==='vurgu'||KALEM.arac==='not'?'':'style="visibility:hidden"'}>${Object.keys(KALEM_RENK).map(k=>`<button class="kp-renk ${KALEM.renk===k?'aktif':''}" style="background:${KALEM_RENK[k]}" onclick="kalemRenkSec('${k}')" aria-label="renk"></button>`).join('')}</span>
    <span class="kp-yard">${yard[KALEM.arac]}</span>
    <button class="kp-link" onclick="kalemModKapat();go('notlar')">Notlarım</button><span class="kp-surum">${typeof ELK_SURUM!=="undefined"?ELK_SURUM.slice(0,4):""}</span><button class="kp-kapat" onclick="kalemModKapat()" aria-label="Kapat">✕</button></div>`;
}
function kalemAracSec(a){ KALEM.arac=a; kalemKaydetAyar(); kalemPanelCiz(); kalemAracUygula(); kalemFabKonum(); }
/* ikon, açık panelin hemen üstünde dursun */
function kalemFabKonum(){ const f=el('kalemFab'), p=el('kalemPanel'); if(f&&p) f.style.bottom=(p.offsetHeight+12)+'px'; }
function kalemRenkSec(k){ KALEM.renk=k; kalemKaydetAyar(); kalemPanelCiz(); }
function kalemKaydetAyar(){ try{ localStorage.setItem('elk_kalem', JSON.stringify({arac:KALEM.arac, renk:KALEM.renk})); }catch(e){} }
function kalemAracUygula(){
  document.body.classList.toggle('kalem-ciz', KALEM.mod && KALEM.arac==='ciz');
  document.body.classList.toggle('kalem-sil', KALEM.mod && KALEM.arac==='sil');
  document.body.classList.toggle('kalem-yaz', KALEM.mod && (KALEM.arac==='vurgu'||KALEM.arac==='not'));
  const b=el('kalemBar'); if(b) b.remove();
}
function kalemSayfaKey(){ return KALEM.sayfa; }

/* ---------- geri al ----------
   Her değişiklikten önce o sayfanın vurgu+çizim durumu yığına alınır. */
KALEM.gecmis={};
function kalemAnlik(){
  const k=KALEM.sayfa; if(!k) return;
  const y=KALEM.gecmis[k]=KALEM.gecmis[k]||[];
  y.push(JSON.stringify({v:DB.vurgu[k]||[], c:DB.cizim[k]||{}})); if(y.length>50) y.shift();
  kalemPanelCiz();
}
function kalemGeriAl(){
  const k=KALEM.sayfa; const y=(KALEM.gecmis[k]||[]); if(!y.length){ toast('Geri alınacak işlem yok'); return; }
  const o=JSON.parse(y.pop()); DB.vurgu[k]=o.v; DB.cizim[k]=o.c; persist();
  ['kalemMenu','kalemOnizleme'].forEach(id=>{ const x=el(id); if(x) x.remove(); });
  kalemUygula();
  KALEM.kok.querySelectorAll('.figwrap').forEach(f=>{ f.querySelectorAll('.kc-rozet,.kc-onizleme').forEach(x=>x.remove()); delete f.dataset.kc; });
  kalemCizimYukle(); kalemPanelCiz(); toast('Geri alındı');
}
function kalemAralikKaydet(r, renk, notla){
  const t=r.toString().trim(); if(t.length<2) return;
  /* seçimden önce kökte kaç kez geçiyor → n */
  const pre=document.createRange(); pre.setStart(KALEM.kok,0); pre.setEnd(r.startContainer,r.startOffset);
  const n=kalemSay(kalemDuz(pre.toString()), kalemDuz(t));
  kalemAnlik();
  const list=DB.vurgu[KALEM.sayfa]=DB.vurgu[KALEM.sayfa]||[];
  list.push({t, n, r:renk, not:''}); persist();
  kalemUygula();
  if(notla) kalemNotDuzenle(list.length-1);
}

/* ---------- fosforlu kalem: parmak / Apple Pencil / fare ile sürükle ----------
   Vurgula/Not: metnin üstünde YANA doğru sürükle → boyar (sonra aşağı da inebilirsin).
                Yukarı-aşağı kaydırma sayfayı kaydırır. Tek dokunuş → cümleyi boyar.
   Silgi: vurguların üstünden geç veya dokun → siler.
   Çiz: şemaya dokun → çizim ekranı. */
let KS=null;   /* aktif sürükleme */
function kalemNokta(x,y){
  let c=null;
  if(document.caretRangeFromPoint) c=document.caretRangeFromPoint(x,y);
  else if(document.caretPositionFromPoint){ const p=document.caretPositionFromPoint(x,y); if(p){ c=document.createRange(); c.setStart(p.offsetNode,p.offset); } }
  if(!c || c.startContainer.nodeType!==3 || !KALEM.kok.contains(c.startContainer)) return null;
  if(c.startContainer.parentNode.closest('svg,.kv-notkutu,button')) return null;
  return [c.startContainer, c.startOffset];
}
function kalemKelime(nd,o,sona){
  const v=nd.nodeValue;
  if(sona){ while(o<v.length && !/\s/.test(v[o])) o++; } else { while(o>0 && !/\s/.test(v[o-1])) o--; }
  return o;
}
function kalemSurukAralik(a,b){
  const r=document.createRange(); r.setStart(a[0],a[1]); r.collapse(true);
  const r2=document.createRange(); r2.setStart(b[0],b[1]); r2.collapse(true);
  let s=a,e=b; if(r.compareBoundaryPoints(Range.START_TO_START,r2)>0){ s=b; e=a; }
  const out=document.createRange();
  out.setStart(s[0], kalemKelime(s[0],s[1],false)); out.setEnd(e[0], kalemKelime(e[0],e[1],true));
  return out;
}
function kalemOnizle(r){
  let o=el('kalemOnizleme'); if(!o){ o=document.createElement('div'); o.id='kalemOnizleme'; document.body.appendChild(o); }
  const renk=KALEM_RENK[KALEM.renk];
  o.innerHTML=[...r.getClientRects()].filter(q=>q.width>1).map(q=>`<i style="left:${q.left}px;top:${q.top}px;width:${q.width}px;height:${q.height}px;background:${renk}"></i>`).join('');
}
function kalemYazMod(){ return KALEM.mod && KALEM.kok && (KALEM.arac==='vurgu'||KALEM.arac==='not'); }

document.addEventListener('pointerdown', e=>{
  KS=null;
  if(!KALEM.mod || !KALEM.kok || !e.target.closest || e.button>0) return;
  if(e.target.closest('#kalemPanel,#kalemFab,#kalemMenu,.zoom')) return;
  if(KALEM.arac!=='sil' && !KALEM.kok.contains(e.target)) return;   /* silgi kenardan da başlayabilir */
  KS={x:e.clientX, y:e.clientY, t:Date.now(), hedef:e.target, bas:null, akti:false, sil:new Set(), id:e.pointerId};
  if(kalemYazMod() && !e.target.closest('mark.kv,button,a,input,textarea,select,.figwrap,.opt,summary,[onclick]')) KS.bas=kalemNokta(e.clientX,e.clientY);
  if(KALEM.arac==='sil' || KS.bas){ if(e.pointerType==='mouse') e.preventDefault(); }
}, true);
document.addEventListener('pointermove', e=>{
  if(!KS || e.pointerId!==KS.id) return;
  const dx=e.clientX-KS.x, dy=e.clientY-KS.y;
  if(!KS.akti){ if(Math.hypot(dx,dy)<8) return; KS.akti=true; }
  if(KALEM.arac==='sil'){
    const m=document.elementFromPoint(e.clientX,e.clientY); const mk=m&&m.closest&&m.closest('mark.kv');
    if(mk && KALEM.kok.contains(mk)){ KS.sil.add(+mk.dataset.i); mk.classList.add('kv-silinecek'); }
    return;
  }
  if(!KS.bas) return;
  const b=kalemNokta(e.clientX,e.clientY); if(!b) return;
  KS.son=b; kalemOnizle(kalemSurukAralik(KS.bas,b));
}, true);
document.addEventListener('pointerup', e=>{
  const d=KS; KS=null; if(!d || e.pointerId!==d.id) return;
  const o=el('kalemOnizleme'); if(o) o.remove();
  if(d.akti){
    if(KALEM.arac==='sil' && d.sil.size){
      kalemAnlik(); const list=DB.vurgu[KALEM.sayfa]||[];
      [...d.sil].sort((x,y)=>y-x).forEach(i=>list.splice(i,1)); persist(); kalemUygula(); toast(d.sil.size+' vurgu silindi');
    } else if(d.bas && d.son){ kalemAralikKaydet(kalemSurukAralik(d.bas,d.son), KALEM.renk, KALEM.arac==='not'); }
    KALEM._tapT=Date.now(); return;
  }
  if(Date.now()-d.t>600) return;   /* uzun basma: dokunma sayılmaz */
  if(kalemDokun(d.hedef, e.clientX, e.clientY)) KALEM._tapT=Date.now();
}, true);
document.addEventListener('pointercancel', ()=>{ KS=null; const o=el('kalemOnizleme'); if(o) o.remove(); }, true);

/* tek dokunuşun işi. true dönerse olay tüketildi. */
function kalemDokun(tg, x, y){
  if(!KALEM.mod || !KALEM.kok || !tg || !tg.closest || !KALEM.kok.contains(tg)) return false;
  const f=tg.closest('.figwrap');
  if(KALEM.arac==='ciz'){ if(f){ kalemCizimAc(+f.dataset.kci); return true; } return false; }
  const m=tg.closest('mark.kv');
  if(m){ kalemVurguMenu(m); return true; }
  if(kalemYazMod()){
    if(f || tg.closest('button,a,input,textarea,select,svg,.kv-notkutu,.opt,summary,[onclick]')) return false;
    const c=kalemNokta(x,y); if(!c) return false;
    const r=kalemCumle(c[0], c[1]); if(!r) return false;
    kalemAralikKaydet(r, KALEM.renk, KALEM.arac==='not'); return true;
  }
  return false;
}
/* pointer ile işlenen dokunuşun ardından gelen tıklamayı yut (şema büyütme açılmasın) */
document.addEventListener('click', e=>{
  if(!KALEM.mod || !KALEM.kok) return;
  const tg=e.target; if(!tg.closest || !KALEM.kok.contains(tg)) return;
  if((KALEM._tapT && Date.now()-KALEM._tapT<900) || (KALEM.arac==='ciz' && tg.closest('.figwrap'))){ e.stopPropagation(); e.preventDefault(); }
}, true);

function kalemBlok(nd){
  let x=nd.parentNode;
  while(x && x!==KALEM.kok){ const d=getComputedStyle(x).display; if(d!=='inline' && d!=='inline-block' && d!=='contents') return x; x=x.parentNode; }
  return KALEM.kok;
}
function kalemCumle(node, off){
  const blok=kalemBlok(node);
  const w=document.createTreeWalker(blok, NodeFilter.SHOW_TEXT, {acceptNode:nd=> nd.parentNode.closest('svg,script,style,.kv-notkutu') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const parts=[]; let full='', nd, at=-1;
  while((nd=w.nextNode())){ if(nd===node) at=full.length+off; parts.push([nd, full.length]); full+=nd.nodeValue; }
  if(at<0 || !full.trim()) return null;
  /* cümle sınırı: . ! ? … ; sonrası boşluk. Ondalık sayı (2.5) bölünmez. */
  let a=0; for(let i=Math.min(at,full.length)-1;i>0;i--){ if(/[.!?…;]/.test(full[i-1]) && /\s/.test(full[i])){ a=i; break; } }
  let b=full.length; for(let i=at;i<full.length;i++){ if(/[.!?…;]/.test(full[i]) && (i+1>=full.length || /\s/.test(full[i+1]))){ b=i+1; break; } }
  while(a<b && /\s/.test(full[a])) a++; while(b>a && /\s/.test(full[b-1])) b--;
  if(b-a<2) return null; if(b-a>600) b=a+600;
  const loc=o=>{ for(let k=parts.length-1;k>=0;k--){ if(o>=parts[k][1]) return [parts[k][0], Math.min(o-parts[k][1], parts[k][0].nodeValue.length)]; } return null; };
  const s=loc(a), t=loc(b); if(!s||!t) return null;
  const r=document.createRange(); r.setStart(s[0],s[1]); r.setEnd(t[0],t[1]); return r;
}
function kalemDuz(s){ return s.replace(/\s+/g,' '); }
function kalemSay(hay, needle){ let n=0,i=0; while((i=hay.indexOf(needle,i))>=0){ n++; i+=needle.length; } return n; }

/* ---------- vurguları DOM'a uygula (metin düğümü yürüyüşü) ---------- */
function kalemTemizle(){
  if(!KALEM.kok) return;
  KALEM.kok.querySelectorAll('mark.kv').forEach(m=>{ const p=m.parentNode; while(m.firstChild) p.insertBefore(m.firstChild,m); p.removeChild(m); p.normalize(); });
}
function kalemUygula(){
  if(!KALEM.kok) return; kalemTemizle();
  const list=DB.vurgu[KALEM.sayfa]||[]; if(!list.length) return;
  list.forEach((v,idx)=>{
    const rng=kalemBul(kalemDuz(v.t), v.n); if(!rng) return;
    try{
      /* aralığı metin düğümlerine böl, her birini mark ile sar */
      const nodes=kalemMetinDugumleri(rng);
      nodes.forEach(([node,s,e])=>{
        if(e<=s) return;
        const m=document.createElement('mark'); m.className='kv kv-'+v.r; m.dataset.i=idx; if(v.not) m.classList.add('kv-notlu');
        const r2=document.createRange(); r2.setStart(node,s); r2.setEnd(node,e); r2.surroundContents(m);
      });
    }catch(e){}
  });
  kalemNotlariCiz();
}
function kalemBul(needle, n){
  /* kökün düz metninde n. eşleşmeyi bul, metin düğümü konumlarına çevir */
  const walker=document.createTreeWalker(KALEM.kok, NodeFilter.SHOW_TEXT, {acceptNode:nd=> nd.parentNode.closest('svg,script,style,#kalemBar,.kv-notkutu') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  const parts=[]; let full=''; let nd;
  while((nd=walker.nextNode())){ const txt=nd.nodeValue; parts.push([nd, full.length, txt]); full+=txt; }
  /* boşluk sıkıştırmalı eşleştirme: düz dizgi üzerinde ara, ham dizgiye haritala */
  const map=[]; let flat=''; let lastSpace=false;
  for(let i=0;i<full.length;i++){ const c=full[i]; if(/\s/.test(c)){ if(lastSpace) continue; lastSpace=true; flat+=' '; map.push(i); } else { lastSpace=false; flat+=c; map.push(i); } }
  let pos=-1, k=-1, from=0;
  while(k<n){ pos=flat.indexOf(needle, from); if(pos<0) return null; k++; from=pos+needle.length; }
  const rawS=map[pos], rawE=map[pos+needle.length-1]+1;
  const loc=o=>{ for(const [node,st,txt] of parts){ if(o>=st && o<=st+txt.length) return [node,o-st]; } return null; };
  const a=loc(rawS), b=loc(rawE); if(!a||!b) return null;
  const r=document.createRange(); r.setStart(a[0],a[1]); r.setEnd(b[0],b[1]); return r;
}
function kalemMetinDugumleri(rng){
  const out=[]; const walker=document.createTreeWalker(rng.commonAncestorContainer, NodeFilter.SHOW_TEXT, null);
  let nd=walker.currentNode.nodeType===3?walker.currentNode:walker.nextNode();
  while(nd){ if(rng.intersectsNode(nd)){ const s= nd===rng.startContainer?rng.startOffset:0; const e= nd===rng.endContainer?rng.endOffset:nd.nodeValue.length; out.push([nd,s,e]); } nd=walker.nextNode(); }
  return out;
}

/* ---------- vurguya dokun → sil / not menüsü ---------- */
function kalemVurguMenu(m){
  if(m.closest('.notlist')) return;
  const i=+m.dataset.i; const v=(DB.vurgu[KALEM.sayfa]||[])[i]; if(!v) return;
  if(KALEM.arac==='sil'){ kalemSil(i); toast('Vurgu silindi'); return; }
  const old=el('kalemMenu'); if(old) old.remove();
  const d=document.createElement('div'); d.id='kalemMenu';
  d.innerHTML=`<div class="km-t">"${esc(v.t.slice(0,60))}${v.t.length>60?'…':''}"</div>
    <div class="row"><button class="btn sm" onclick="kalemNotDuzenle(${i})">${v.not?'Notu düzenle':'Not ekle'}</button>
    ${Object.keys(KALEM_RENK).map(k=>`<button class="km-r" style="background:${KALEM_RENK[k]}" onclick="kalemRenk(${i},'${k}')"></button>`).join('')}
    <button class="btn ghost sm" onclick="kalemSil(${i})">Vurguyu kaldır</button><button class="btn ghost sm" onclick="el('kalemMenu').remove()">Kapat</button></div>`;
  const r=m.getBoundingClientRect(); d.style.top=(r.bottom+window.scrollY+6)+'px'; d.style.left=Math.max(8,Math.min(window.innerWidth-330,r.left))+'px';
  document.body.appendChild(d);
}
function kalemRenk(i,k){ kalemAnlik(); DB.vurgu[KALEM.sayfa][i].r=k; persist(); el('kalemMenu')&&el('kalemMenu').remove(); kalemUygula(); }
function kalemSil(i){ kalemAnlik(); DB.vurgu[KALEM.sayfa].splice(i,1); persist(); el('kalemMenu')&&el('kalemMenu').remove(); kalemUygula(); }
function kalemNotDuzenle(i){
  const v=DB.vurgu[KALEM.sayfa][i]; el('kalemMenu')&&el('kalemMenu').remove();
  const d=document.createElement('div'); d.className='zoom'; d.id='kalemNotDlg';
  d.innerHTML=`<div class="zoom-bar"><span>Not</span><button class="btn sm" onclick="el('kalemNotDlg').remove()">Kapat</button></div><div class="zoom-body" style="min-width:0">
    <div class="muted small">"${esc(v.t)}"</div><textarea id="kalemNotTa" placeholder="Bu satırla ilgili notun...">${esc(v.not||'')}</textarea>
    <div class="row"><button class="btn" onclick="kalemNotKaydet(${i})">Kaydet</button>${v.not?`<button class="btn ghost" onclick="kalemNotKaydet(${i},true)">Notu sil</button>`:''}</div></div>`;
  document.body.appendChild(d); setTimeout(()=>el('kalemNotTa').focus(),50);
}
function kalemNotKaydet(i,sil){ kalemAnlik(); DB.vurgu[KALEM.sayfa][i].not = sil?'':(el('kalemNotTa').value.trim()); persist(); el('kalemNotDlg').remove(); kalemUygula(); }
function kalemNotlariCiz(){
  KALEM.kok.querySelectorAll('.kv-notkutu').forEach(x=>x.remove());
  const list=DB.vurgu[KALEM.sayfa]||[];
  const gorulen=new Set();
  KALEM.kok.querySelectorAll('mark.kv-notlu').forEach(m=>{
    const i=+m.dataset.i; if(gorulen.has(i)) return; gorulen.add(i);
    const v=list[i]; if(!v||!v.not) return;
    const blok=m.closest('p,li,.ptext,.defbody,.para,.akilda,.sonuc,div'); if(!blok) return;
    const k=document.createElement('div'); k.className='kv-notkutu'; k.innerHTML=`<span class="kv-notik">✎</span>${esc(v.not)}`; k.onclick=()=>{ if(KALEM.mod) kalemNotDuzenle(i); };
    blok.insertAdjacentElement('afterend',k);
  });
}

/* ---------- serbest çizim (şema üstü) ---------- */
function kalemSvgUrl(svg,W,H){
  let x=svg.outerHTML.replace(/<svg([^>]*)>/, (m,a)=>'<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'"'+a.replace(/\s(width|height)="[^"]*"/g,'')+' style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif">');
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(x);
}
function kalemCizimYukle(){
  if(!KALEM.kok) return;
  const figs=KALEM.kok.querySelectorAll('.figwrap'); const saved=DB.cizim[KALEM.sayfa]||{};
  figs.forEach((f,i)=>{
    if(f.dataset.kc) return; f.dataset.kc='1'; f.dataset.kci=i;
    if(saved[i]){ const r=document.createElement('span'); r.className='kc-rozet'; r.textContent='çizim var'; f.querySelector('.fighead').appendChild(r); }
    if(saved[i]){ const im=document.createElement('img'); im.className='kc-onizleme'; im.src=saved[i]; f.querySelector('figure').appendChild(im); }
  });
}
let CZ=null;
function kalemCizimAc(i){
  if(el('kalemCizDlg')) return;
  const f=KALEM.kok.querySelectorAll('.figwrap')[i]; const svg=f.querySelector('svg'); if(!svg) return;
  const vb=(svg.getAttribute('viewBox')||'0 0 460 220').split(/[ ,]+/).map(Number);
  const W=vb[2], H=vb[3]; const scale=Math.max(0.6, Math.min((window.innerWidth-44)/W, (window.innerHeight-190)/H, 2.5));
  const sw=Math.round(W*scale), sh=Math.round(H*scale);
  const d=document.createElement('div'); d.className='zoom'; d.id='kalemCizDlg';
  d.innerHTML=`<div class="zoom-bar"><span>Çizim · ${esc(f.querySelector('.fighead').firstChild.textContent||'')}</span>
      <span class="kc-araclar">${['#b91c1c','#0369a1','#15803d','#1c232d'].map(c=>`<button class="kc-renk" style="background:${c}" onclick="CZ.renk='${c}';CZ.silgi=false"></button>`).join('')}
      <button class="btn ghost sm" onclick="CZ.silgi=true">Silgi</button><button class="btn ghost sm" onclick="kalemCizGeri()">Geri al</button><button class="btn ghost sm" onclick="kalemCizTemizle()">Temizle</button>
      <button class="btn sm" onclick="kalemCizKaydet(${i})">Kaydet</button><button class="btn ghost sm" onclick="el('kalemCizDlg').remove()">Vazgeç</button></span></div>
    <div class="zoom-body kc-body"><div class="kc-sahne" style="width:${sw}px;height:${sh}px"><img class="kc-svgimg" src="${kalemSvgUrl(svg,W,H)}" width="${sw}" height="${sh}"><canvas id="kcCanvas" width="${sw*2}" height="${sh*2}"></canvas></div><div class="muted small" style="margin-top:6px;max-width:${sw}px">Parmak veya kalemle çiz. Kaydedince şemanın üstünde görünür; çizim şemaya oranlı saklanır, her ekranda aynı yere oturur.</div></div>`;
  document.body.appendChild(d);
  const cv=el('kcCanvas'), ctx=cv.getContext('2d'); ctx.lineCap='round'; ctx.lineJoin='round';
  CZ={cv,ctx,renk:'#b91c1c',silgi:false,yollar:[],aktif:null,scale};
  const saved=(DB.cizim[KALEM.sayfa]||{})[i];
  if(saved){ const im=new Image(); im.onload=()=>{ ctx.drawImage(im,0,0,cv.width,cv.height); CZ.taban=ctx.getImageData(0,0,cv.width,cv.height); }; im.src=saved; }
  const pt=e=>{ const r=cv.getBoundingClientRect(); const p=e.touches?e.touches[0]:e; return [(p.clientX-r.left)/r.width*cv.width,(p.clientY-r.top)/r.height*cv.height]; };
  const down=e=>{ e.preventDefault(); CZ.aktif={renk:CZ.silgi?null:CZ.renk,pts:[pt(e)]}; };
  const move=e=>{ if(!CZ.aktif) return; e.preventDefault(); CZ.aktif.pts.push(pt(e)); kalemCizYenile(); };
  const up=e=>{ if(!CZ.aktif) return; CZ.yollar.push(CZ.aktif); CZ.aktif=null; kalemCizYenile(); };
  cv.addEventListener('pointerdown',down); cv.addEventListener('pointermove',move); window.addEventListener('pointerup',up); cv.addEventListener('touchstart',e=>e.preventDefault(),{passive:false});
}
function kalemCizYenile(){
  const {cv,ctx}=CZ; ctx.clearRect(0,0,cv.width,cv.height); if(CZ.taban) ctx.putImageData(CZ.taban,0,0);
  [...CZ.yollar, CZ.aktif].filter(Boolean).forEach(y=>{
    ctx.globalCompositeOperation = y.renk ? 'source-over' : 'destination-out';
    ctx.strokeStyle=y.renk||'#000'; ctx.lineWidth= y.renk ? 5 : 28;
    ctx.beginPath(); y.pts.forEach((p,k)=> k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
  });
  ctx.globalCompositeOperation='source-over';
}
function kalemCizGeri(){ CZ.yollar.pop(); kalemCizYenile(); }
function kalemCizTemizle(){ CZ.yollar=[]; CZ.taban=null; kalemCizYenile(); }
function kalemCizKaydet(i){
  kalemAnlik();
  const {cv}=CZ; const bos=!CZ.yollar.length && !CZ.taban;
  DB.cizim[KALEM.sayfa]=DB.cizim[KALEM.sayfa]||{};
  if(bos) delete DB.cizim[KALEM.sayfa][i]; else DB.cizim[KALEM.sayfa][i]=cv.toDataURL('image/png');
  persist(); el('kalemCizDlg').remove();
  KALEM.kok.querySelectorAll('.figwrap').forEach(f=>{ f.querySelectorAll('.kc-rozet,.kc-onizleme').forEach(x=>x.remove()); delete f.dataset.kc; });
  kalemCizimYukle(); toast(bos?'Çizim silindi':'Çizim kaydedildi');
}

/* ---------- Not Defterim ---------- */
function renderNotDefteri(){
  const sayfalar=Object.keys(DB.vurgu).filter(k=>(DB.vurgu[k]||[]).length).concat(Object.keys(DB.cizim).filter(k=>Object.keys(DB.cizim[k]||{}).length && !DB.vurgu[k]));
  const ad=k=> k[0]==='d' ? (ELK_DERS[+k.slice(1)]?'Ders '+k.slice(1)+' — '+ELK_DERS[+k.slice(1)].baslik:k) : (modById(+k.slice(1))?'Modül '+k.slice(1)+' — '+modById(+k.slice(1)).t:k);
  const git=k=> k[0]==='d' ? `go('ders',${+k.slice(1)})` : `go('module',${+k.slice(1)})`;
  let h=`<div class="panel"><h2 class="h2">Not defterim</h2><p class="muted">Vurguladığın satırlar, notların ve şema çizimlerin. Ders veya kütüphane sayfasında sağ alttaki kalem ikonuna bas: Vurgula, Not, Çiz, Silgi. Yazdırılabilir.</p>
    ${sayfalar.length?'':'<p class="muted">Henüz not yok.</p>'}
    ${sayfalar.sort((a,b)=>a[0]===b[0]?+a.slice(1)-+b.slice(1):a[0]<b[0]?-1:1).map(k=>`<div class="panel2"><div class="row sb"><b><a class="lnk" onclick="${git(k)}">${esc(ad(k))}</a></b><span class="muted small">${(DB.vurgu[k]||[]).length} vurgu · ${Object.keys(DB.cizim[k]||{}).length} çizim</span></div>
      <ul class="notlist">${(DB.vurgu[k]||[]).map(v=>`<li><mark class="kv kv-${v.r}">${esc(v.t)}</mark>${v.not?`<div class="kv-notkutu"><span class="kv-notik">✎</span>${esc(v.not)}</div>`:''}</li>`).join('')}</ul>
      ${Object.keys(DB.cizim[k]||{}).map(i=>`<img class="kc-defter" src="${DB.cizim[k][i]}">`).join('')}</div>`).join('')}
    <div class="row"><button class="btn ghost" onclick="window.print()">Yazdır</button></div></div>`;
  app().innerHTML=h;
}
