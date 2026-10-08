/* ELK MASTER v15 — uygulama mantığı
   Veri: js/veri.js (MODS, CATS, PROGRAM, QBANK, MYK_Q, GLOSSARY)
   İçerik: icerik/mXX.js → js/icerik-yukle.js ile TEORI/FOY/QBANK'e bağlanır. */

/* ===================== KALICILIK ===================== */
const SKEY = 'elkmaster_v5';
let MEM = null;
function _read(){ try{ return JSON.parse(localStorage.getItem(SKEY)) || {}; }catch(e){ return MEM || {}; } }
function _write(o){ try{ localStorage.setItem(SKEY, JSON.stringify(o)); }catch(e){ MEM = o; } }
let DB = _read();
DB.scores = DB.scores || {};
DB.notes  = DB.notes  || {};
DB.srs    = DB.srs    || {};
DB.exams  = DB.exams  || [];
DB.myk    = DB.myk    || [];
function persist(){ _write(DB); }

/* ===================== YARDIMCILAR ===================== */
const el  = id => document.getElementById(id);
const app = () => el('app');
function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function toast(t){ const d=document.createElement('div'); d.className='toast'; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2200); }
function todayStr(){ const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); return d.toISOString().slice(0,10); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function fmt(s){ const m=Math.floor(s/60), x=s%60; return (m<10?'0':'')+m+':'+(x<10?'0':'')+x; }

const modById = id => MODS.find(m => m.id === id);
const GECME = 70;                                   /* modül tamam sayılma eşiği */
function isDone(id){ return (DB.scores[id]||0) >= GECME; }
function moduleDone(){ return MODS.filter(m => isDone(m.id)).length; }
function avgScore(){ const v=Object.values(DB.scores); return v.length ? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 0; }
function totalQuestions(){ let n=0; for(const k in QBANK) n+=QBANK[k].length; return n; }
function setScore(id,pct){ pct=Math.round(pct); if(!(DB.scores[id]>=pct)) DB.scores[id]=pct; persist(); }

/* Tek sıralama kaynağı: PROGRAM aşamaları */
function sira(){ const o=[]; PROGRAM.forEach(a=>a.mods.forEach(id=>{ if(modById(id) && o.indexOf(id)<0) o.push(id); })); MODS.forEach(m=>{ if(o.indexOf(m.id)<0) o.push(m.id); }); return o; }
function asamaOf(id){ for(let i=0;i<PROGRAM.length;i++){ const j=PROGRAM[i].mods.indexOf(id); if(j>=0) return {i, j, a:PROGRAM[i]}; } return null; }
function sonraki(id){ const o=sira(), i=o.indexOf(id); return (i>=0 && i<o.length-1) ? o[i+1] : null; }
function onceki(id){ const o=sira(), i=o.indexOf(id); return i>0 ? o[i-1] : null; }
function kaldigin(){ return sira().find(id => !isDone(id)) || null; }

function okumaSuresi(id){
  const t=(TEORI[id]||'').replace(/<svg[\s\S]*?<\/svg>/g,' ');
  const k=t.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(k/170));
}

/* ===================== ARALIKLI TEKRAR (Leitner) ===================== */
const SRS_INT = [1,2,4,7,15,30];
function srsAnswer(qid, correct){
  const s = DB.srs[qid] || {box:0};
  s.box = correct ? Math.min(SRS_INT.length-1, (s.box||0)+1) : 0;
  const d = new Date(); d.setDate(d.getDate() + (correct ? SRS_INT[s.box] : 0)); d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  s.due = d.toISOString().slice(0,10);
  DB.srs[qid] = s; persist();
}
function parseQid(qid){ const p=qid.split('.'); return {mod:+p[0], idx:+p[1]}; }
function qByQid(qid){ if(qid.indexOf('myk.')===0){ const p=qid.split('.'); return (MYK_Q[p[1]]||[])[+p[2]]; } const p=parseQid(qid); return (QBANK[p.mod]||[])[p.idx]; }
function dueReviews(){ const t=todayStr(); return Object.keys(DB.srs).filter(q => DB.srs[q].due<=t && qByQid(q)); }

/* ===================== YÖNLENDİRME ===================== */
function go(view, arg){
  const v = ({kapak:'dersler', onsoz:'dersler', home:'dersler', program:'dersler'})[view] || view;
  document.querySelectorAll('#nav [data-v]').forEach(b => b.classList.toggle('active', b.dataset.v===v || (v==='module' && b.dataset.v==='modules') || (v==='ders' && b.dataset.v==='dersler') || (v==='myk' && b.dataset.v==='exam')));
  window.scrollTo(0,0);
  if(v==='dersler') renderDersler();
  else if(v==='ders') openDers(+arg);
  else if(v==='modules') renderModules();
  else if(v==='module') openModule(+arg);
  else if(v==='exam') renderExam();
  else if(v==='myk') renderMYK();
  else if(v==='review') renderReview();
  else if(v==='glossary') renderGlossary();
  else if(v==='settings') renderSettings();
  else renderDersler();
  try{ history.replaceState(null,'', v==='module' ? '#m'+arg : v==='ders' ? '#d'+arg : '#'+v); }catch(e){}
}
function routeFromHash(){
  const h=(location.hash||'').slice(1);
  if(/^m\d+$/.test(h) && modById(+h.slice(1))) return go('module', +h.slice(1));
  if(/^d\d+$/.test(h) && ELK_DERS[+h.slice(1)]) return go('ders', +h.slice(1));
  if(['dersler','modules','exam','myk','review','glossary','settings'].indexOf(h)>=0) return go(h);
  go('dersler');
}

/* ===================== PROGRAM (ana sayfa) ===================== */
function renderProgram(){
  const toplam=MODS.length, bitti=moduleDone(), due=dueReviews().length;
  const kalanDk=MODS.filter(m=>!isDone(m.id)).reduce((a,m)=>a+okumaSuresi(m.id),0);
  const k=kaldigin();
  let h=`<div class="panel">
    <h2 class="h2">Eğitim Programı</h2>
    <p class="muted">${PROGRAM.length} aşama · ${toplam} modül · ${totalQuestions()} soru. Sırayla ilerle: teoriyi şemalarıyla oku, sorularda %${GECME} ve üstünü al, modül tamamlanmış sayılır.</p>
    <div class="stats">
      <div><b>${bitti}/${toplam}</b><span>tamamlanan modül</span></div>
      <div><b>%${avgScore()}</b><span>ortalama puan</span></div>
      <div><b>≈${(kalanDk/60).toFixed(1).replace('.',',')} sa</b><span>kalan okuma</span></div>
      <div><b>${due}</b><span>tekrar bekleyen soru</span></div>
    </div>
    <div class="bar"><i style="width:${Math.round(bitti/toplam*100)}%"></i></div>
    <div class="row">${k?`<button class="btn" onclick="go('module',${k})">Devam et: M${k} — ${esc(modById(k).t)}</button>`:`<button class="btn" onclick="go('exam')">Tüm modüller bitti — deneme sınavına geç</button>`}
      ${due?`<button class="btn ghost" onclick="go('review')">Tekrar (${due})</button>`:''}</div>
  </div>`;
  PROGRAM.forEach((st,si)=>{
    const ids=st.mods.filter(id=>modById(id)), d=ids.filter(isDone).length;
    h+=`<div class="panel stage">
      <div class="stagehead"><h3>${esc(st.t)}</h3><span class="muted">${d}/${ids.length}</span></div>
      <p class="muted">${esc(st.hedef)}</p>
      <div class="bar thin"><i style="width:${ids.length?Math.round(d/ids.length*100):0}%"></i></div>
      <ol class="modlist">${ids.map(id=>{
        const m=modById(id), sc=DB.scores[id];
        const durum = isDone(id) ? `<span class="ok">%${sc}</span>` : (sc!=null ? `<span class="warn">%${sc}</span>` : `<span class="muted">${okumaSuresi(id)} dk</span>`);
        return `<li onclick="go('module',${id})"><span class="mno">M${id}</span><span class="mt">${esc(m.t)}</span>${durum}</li>`;
      }).join('')}</ol>
    </div>`;
  });
  h+=`<div class="panel center"><b>Program sonunda:</b> <button class="btn sm" onclick="go('exam')">Deneme sınavı</button> <button class="btn sm" onclick="go('myk')">MYK provası</button> <a class="btn ghost sm" href="foy.html" target="_blank" rel="noopener">Baskı föyü</a></div>`;
  app().innerHTML=h;
}

/* ===================== MODÜL LİSTESİ ===================== */
function renderModules(){
  let h=`<div class="panel"><h2 class="h2">Kütüphane</h2><p class="muted">45 başvuru modülü · derslerin ayrıntısı burada · ${moduleDone()}/${MODS.length} modülün sorularında %70+</p>
    <input type="text" id="msearch" placeholder="Modül veya konu ara (örn. vavien, topraklama, kompanzasyon)" oninput="filterModules()"></div><div id="mlist"></div>`;
  app().innerHTML=h; filterModules();
}
function filterModules(){
  const q=(el('msearch').value||'').toLocaleLowerCase('tr');
  const hit=m=>!q || (m.t+' '+m.d).toLocaleLowerCase('tr').includes(q) || (TEORI[m.id]||'').replace(/<[^>]*>/g,' ').toLocaleLowerCase('tr').includes(q);
  let h='';
  PROGRAM.forEach(st=>{
    const ms=st.mods.map(modById).filter(m=>m && hit(m)); if(!ms.length) return;
    h+=`<h3 class="grp">${esc(st.t)}</h3><div class="cards">`+ms.map(m=>{
      const sc=DB.scores[m.id];
      return `<div class="card" onclick="go('module',${m.id})"><div class="ctop"><span class="mno">M${m.id}</span><span class="cat" style="color:${(CATS[m.cat]||{}).c}">${esc((CATS[m.cat]||{}).n||'')}</span>${sc!=null?`<span class="${isDone(m.id)?'ok':'warn'}">%${sc}</span>`:''}</div>
        <h4>${esc(m.t)}</h4><p>${esc(m.d)}</p><div class="muted small">${okumaSuresi(m.id)} dk okuma · ${(QBANK[m.id]||[]).length} soru</div></div>`;
    }).join('')+`</div>`;
  });
  el('mlist').innerHTML=h||'<div class="panel muted">Sonuç yok.</div>';
}

/* ===================== MODÜL SAYFASI ===================== */
function openModule(id){
  const m=modById(id); if(!m) return go('modules');
  const as=asamaOf(id), nx=sonraki(id), pv=onceki(id);
  const tabs=[['teori','Teori'],['ozet','Özet'],['quiz','Sorular ('+(QBANK[id]||[]).length+')'],['not','Notlar']];
  const nav=`<div class="modnav">${pv?`<button class="btn ghost sm" onclick="go('module',${pv})">← M${pv} ${esc(modById(pv).t)}</button>`:'<span></span>'}${nx?`<button class="btn sm" onclick="go('module',${nx})">M${nx} ${esc(modById(nx).t)} →</button>`:''}</div>`;
  app().innerHTML=`<div class="crumb"><a onclick="go('modules')">Kütüphane</a> › ${as?esc(as.a.t)+' › ':''}M${m.id}</div>
   <div class="panel">
     <div class="modhead"><div class="mno big">M${m.id}</div><div><h2 class="h2">${esc(m.t)}</h2>
       <div class="muted small">${esc((CATS[m.cat]||{}).n||'')} · ≈${okumaSuresi(id)} dk okuma${DB.scores[id]!=null?` · en iyi %${DB.scores[id]}`:''}${as?` · ${as.j+1}/${as.a.mods.length}. modül`:''}</div></div></div>
     <div class="tabbar" id="tabbar">${tabs.map(t=>`<button data-t="${t[0]}" onclick="showTab(${id},'${t[0]}')">${t[1]}</button>`).join('')}</div>
     <div id="mtab"></div>
     ${nav}
   </div>`;
  showTab(id,'teori');
}
function showTab(id,tab){
  document.querySelectorAll('#tabbar button').forEach(b=>b.classList.toggle('active',b.dataset.t===tab));
  const c=el('mtab'); if(!c) return;
  if(tab==='teori'){
    c.innerHTML=`<div class="lessonbody">${icerikSusle(TEORI[id]||'',id)}</div>
      ${FOY[id]?`<div class="toparla"><div class="toparla-h">Toparlama</div>${FOY[id]}</div>`:''}
      <div class="row"><button class="btn" onclick="showTab(${id},'quiz')">Soruları çöz</button><a class="btn ghost" href="foy.html#${id}-tam" target="_blank" rel="noopener">Yazdır</a></div>`;
  }
  else if(tab==='ozet') c.innerHTML=`<div class="lessonbody ozet">${FOY[id]||'<span class="muted">Bu modülde özet yok.</span>'}</div><div class="row"><button class="btn ghost" onclick="showTab(${id},'teori')">Teoriye dön</button><button class="btn" onclick="showTab(${id},'quiz')">Soruları çöz</button></div>`;
  else if(tab==='quiz') startModuleQuiz(id);
  else if(tab==='not') c.innerHTML=noteHTML(id);
  if(tab!=='teori') window.scrollTo(0, (el('tabbar').getBoundingClientRect().top + window.scrollY - 70));
}
function noteHTML(id){
  return `<div class="panel2"><b>Notların</b><div class="muted small">Bu cihazda saklanır.</div>
   <textarea id="noteArea" placeholder="Formüller, saha notları, hatırlatmalar...">${esc(DB.notes[id]||'')}</textarea>
   <div class="row"><button class="btn sm" onclick="saveNote(${id})">Kaydet</button><span id="noteMsg" class="muted small"></span></div></div>`;
}
function saveNote(id){ DB.notes[id]=el('noteArea').value; persist(); el('noteMsg').textContent='Kaydedildi'; setTimeout(()=>{ const e=el('noteMsg'); if(e) e.textContent=''; },1500); }

/* ===================== SORU MOTORU ===================== */
let QS=null;
function shuffleItems(items){ return shuffle(items.map(it=>{ const idx=it.opts.map((_,i)=>i); shuffle(idx); return Object.assign({},it,{opts:idx.map(i=>it.opts[i]), ans:idx.indexOf(it.ans)}); })); }
function startQuiz(container, items, srs, finishLabel, onFinish){
  QS={items, picks:{}, checked:false, srs, onFinish};
  el(container).innerHTML = items.map((it,i)=>`<div class="q" id="q${i}"><div class="qtxt">${i+1}. ${it.q}</div>`+
      it.opts.map((o,j)=>`<button class="opt" id="o${i}_${j}" onclick="pick(${i},${j})">${o}</button>`).join('')+
      `<div class="expl" id="e${i}"></div></div>`).join('') +
    `<div class="row"><button class="btn" id="qSubmit" onclick="submitQuiz()">${finishLabel||'Cevapları kontrol et'}</button></div><div id="qresult"></div>`;
}
function pick(i,j){ if(QS.checked) return; QS.picks[i]=j; document.querySelectorAll('#q'+i+' .opt').forEach(o=>o.classList.remove('sel')); el('o'+i+'_'+j).classList.add('sel'); }
function submitQuiz(force){
  if(QS.checked) return;
  const bos=QS.items.map((_,i)=>i).filter(i=>QS.picks[i]==null);
  if(bos.length && force!==true && !confirm(bos.length+' soru boş ('+bos.slice(0,12).map(i=>i+1).join(', ')+(bos.length>12?'…':'')+'). Boşlar yanlış sayılır. Yine de bitirilsin mi?')) return;
  QS.checked=true; let correct=0; const yanlisMod={};
  QS.items.forEach((it,i)=>{
    const p=QS.picks[i], ok=p===it.ans; if(ok) correct++;
    el('o'+i+'_'+it.ans).classList.add('correct');
    if(p!=null && !ok) el('o'+i+'_'+p).classList.add('wrong');
    let extra='';
    if(!ok && it.qid && /^\d+\./.test(it.qid)){ const mod=parseInt(it.qid,10); yanlisMod[mod]=(yanlisMod[mod]||0)+1; extra=` <a class="lnk" onclick="go('module',${mod})">Teoriye dön: M${mod}</a>`; }
    const e=el('e'+i); e.className='expl show '+(ok?'good':'bad'); e.innerHTML=(ok?'Doğru. ':'Yanlış. ')+it.ex+extra;
    if(QS.srs && it.qid) srsAnswer(it.qid, ok);
  });
  const total=QS.items.length, pct=Math.round(correct/total*100);
  const r=el('qresult'); if(r) r.innerHTML=`<div class="panel2 result"><b>Sonuç: ${correct}/${total} · %${pct}</b><div class="bar"><i style="width:${pct}%"></i></div></div>`;
  const sb=el('qSubmit'); if(sb) sb.disabled=true;
  QS.yanlis=QS.items.filter((it,i)=>QS.picks[i]!==it.ans);
  if(QS.onFinish) QS.onFinish(correct,total,pct,yanlisMod);
}
function yanlisListesi(ym){
  const ks=Object.keys(ym).sort((a,b)=>ym[b]-ym[a]); if(!ks.length) return '';
  return `<div class="panel2"><b>Zayıf olduğun modüller</b><ul class="plain">${ks.map(k=>`<li><a class="lnk" onclick="go('module',${k})">M${k} — ${esc((modById(+k)||{}).t||'')}</a> · ${ym[k]} yanlış</li>`).join('')}</ul></div>`;
}
function startModuleQuiz(id){
  const items=shuffleItems((QBANK[id]||[]).map((x,i)=>Object.assign({qid:id+'.'+i},x)));
  startQuiz('mtab', items, true, 'Cevapları kontrol et', (c,t,pct)=>{
    setScore(id,pct);
    const nx=sonraki(id);
    el('qresult').insertAdjacentHTML('beforeend', `<div class="row">${pct>=GECME?`<span class="ok">Modül tamamlandı (≥%${GECME}).</span>`:`<span class="warn">%${GECME} altında: yanlışların teorisini tekrar oku.</span>`}
      <button class="btn ghost sm" onclick="showTab(${id},'teori')">Teoriye dön</button><button class="btn ghost sm" onclick="startModuleQuiz(${id})">Yeniden çöz</button>${nx&&pct>=GECME?`<button class="btn sm" onclick="go('module',${nx})">Sonraki: M${nx}</button>`:''}</div>`);
  });
}

/* ===================== DENEME SINAVI ===================== */
let EX=null;
function renderExam(){
  const hist=DB.exams.length?`<div class="panel"><h3>Geçmiş denemeler</h3>`+DB.exams.slice(0,8).map(e=>`<div class="hrow"><span>${e.date}</span><b class="${e.pass?'ok':'bad'}">%${e.pct} · ${e.correct}/${e.total}</b></div>`).join('')+`</div>`:'';
  app().innerHTML=`<div class="panel"><h2 class="h2">Sınav</h2>
    <div class="twocol">
      <div class="panel2"><h3>Genel deneme</h3><p class="muted">Tüm modüllerden karışık 30 soru · 30 dakika · geçme %70. Sonunda zayıf olduğun modüller listelenir.</p><button class="btn" onclick="startExam()">Başla</button></div>
      <div class="panel2"><h3>MYK provası</h3><p class="muted">Elektrik Tesisatçısı (15UY0241) teorik sınav formatında 25 soru. Seviye 3 ve Seviye 4.</p><button class="btn" onclick="go('myk')">MYK bölümüne git</button></div>
    </div></div>${hist}`;
}
function startExam(){
  const pool=[]; for(const mod in QBANK) QBANK[mod].forEach((q,i)=>pool.push(Object.assign({qid:mod+'.'+i},q)));
  const items=shuffleItems(pool).slice(0,30);
  EX={start:Date.now(), dur:30*60, timer:null};
  app().innerHTML=`<div class="panel"><div class="row sb"><h2 class="h2">Genel deneme</h2><div class="timer" id="examTimer">30:00</div></div><div id="examBody"></div></div>`;
  startQuiz('examBody', items, true, 'Sınavı bitir', examFinish);
  EX.timer=setInterval(tickExam,1000);
}
function tickExam(){
  if(!EX) return; const t=el('examTimer'); if(!t){ clearInterval(EX.timer); return; }
  const left=EX.dur-Math.floor((Date.now()-EX.start)/1000);
  if(left<=0){ clearInterval(EX.timer); t.textContent='00:00'; if(QS && !QS.checked) submitQuiz(true); return; }
  t.textContent=fmt(left); if(left<=60) t.classList.add('bad');
}
function examFinish(c,t,pct,ym){
  if(EX&&EX.timer) clearInterval(EX.timer);
  const pass=pct>=70;
  DB.exams.unshift({date:todayStr(),correct:c,total:t,pct,pass}); DB.exams=DB.exams.slice(0,20); persist();
  el('qresult').insertAdjacentHTML('beforeend', `<div class="panel2"><b class="${pass?'ok':'bad'}">${pass?'Geçme notunun üstünde.':'Geçme notunun altında.'}</b> %${pct} (${c}/${t}) · geçme %70</div>${yanlisListesi(ym)}
    <div class="row">${QS.yanlis.length?`<button class="btn" onclick="yanlislariCoz()">Bu sınavın ${QS.yanlis.length} yanlışını tekrar çöz</button>`:''}<button class="btn ghost" onclick="startExam()">Yeni deneme</button></div>`);
}

/* ===================== MYK ===================== */
let MK=null;
function renderMYK(){
  const hist=DB.myk.length?`<div class="panel"><h3>MYK deneme geçmişi</h3>`+DB.myk.slice(0,8).map(e=>`<div class="hrow"><span>${e.date} · Seviye ${e.level} (≥%${e.thr})</span><b class="${e.pass?'ok':'bad'}">%${e.pct}</b></div>`).join('')+`</div>`:'';
  app().innerHTML=`<div class="crumb"><a onclick="go('exam')">Sınav</a> › MYK</div><div class="panel"><h2 class="h2">MYK Mesleki Yeterlilik provası</h2>
     <div class="mykinfo">${foySusle(MYK_INFO)}</div>
     <p class="muted small">Gerçek MYK soruları yayımlanmaz. Buradaki sorular yeterlilik birimleri ve sınav formatına uygun hazırlanmış özgün deneme sorularıdır. Güncel şartnameyi belgelendirme kuruluşundan teyit et.</p>
     <div class="row"><button class="btn" onclick="startMyk(3)">Seviye 3 (geçme %70)</button><button class="btn" onclick="startMyk(4)">Seviye 4 (geçme %80)</button></div>
   </div>${hist}`;
}
function startMyk(level){
  const thr=level===4?80:70, pool=[];
  MYK_Q.isg.forEach((q,i)=>pool.push(Object.assign({qid:'myk.isg.'+i},q)));
  MYK_Q.meslek.forEach((q,i)=>pool.push(Object.assign({qid:'myk.meslek.'+i},q)));
  const items=shuffleItems(pool).slice(0,25);
  MK={level,thr,start:Date.now(),dur:50*60,timer:null};
  app().innerHTML=`<div class="panel"><div class="row sb"><h2 class="h2">MYK provası · Seviye ${level}</h2><div class="timer" id="mykTimer">50:00</div></div>
     <p class="muted small">25 soru · geçme ≥ %${thr} · yanlış doğruyu götürmez</p><div id="mykBody"></div></div>`;
  startQuiz('mykBody', items, true, 'Sınavı bitir', mykFinish);
  MK.timer=setInterval(mykTick,1000);
}
function mykTick(){ if(!MK) return; const t=el('mykTimer'); if(!t){ clearInterval(MK.timer); return; } const left=MK.dur-Math.floor((Date.now()-MK.start)/1000); if(left<=0){ clearInterval(MK.timer); t.textContent='00:00'; if(QS&&!QS.checked) submitQuiz(true); return; } t.textContent=fmt(left); if(left<=120) t.classList.add('bad'); }
function mykFinish(c,t,pct){
  if(MK&&MK.timer) clearInterval(MK.timer);
  const pass=pct>=MK.thr;
  DB.myk.unshift({date:todayStr(),level:MK.level,thr:MK.thr,pct,pass}); DB.myk=DB.myk.slice(0,20); persist();
  el('qresult').insertAdjacentHTML('beforeend', `<div class="panel2"><b class="${pass?'ok':'bad'}">${pass?'Seviye '+MK.level+' eşiğinin üstünde.':'Seviye '+MK.level+' eşiğinin altında.'}</b> %${pct} (geçme ≥%${MK.thr}). Bu bir hazırlık denemesidir, resmî belge yerine geçmez.</div>
    <div class="row">${QS.yanlis.length?`<button class="btn" onclick="yanlislariCoz()">${QS.yanlis.length} yanlışı tekrar çöz</button>`:''}<button class="btn ghost" onclick="startMyk(${MK.level})">Yeni deneme</button><button class="btn ghost" onclick="go('myk')">MYK bölümü</button></div>`);
}

/* ===================== TEKRAR ===================== */
function yanlislariCoz(){
  const items=shuffleItems(QS.yanlis.map(it=>Object.assign({},it)));
  app().innerHTML=`<div class="panel"><h2 class="h2">Yanlışların · ${items.length} soru</h2><p class="muted small">Açıklamaları dikkatle oku; ilgili modüle dönüş bağlantısı her sorunun altında.</p><div id="revBody"></div></div>`;
  window.scrollTo(0,0);
  startQuiz('revBody', items, true, 'Kontrol et', (c,t,pct,ym)=>{ el('qresult').insertAdjacentHTML('beforeend', yanlisListesi(ym)); });
}
function renderReview(){ if(kartDue().length) return renderKartTekrar(); renderReviewMCQ(); }
function renderReviewMCQ(){
  const due=dueReviews();
  if(!due.length){ app().innerHTML=`<div class="panel"><h2 class="h2">Tekrar</h2><p class="muted">Bugün tekrar edilecek soru yok. Soru çözdükçe yanlışların aralıklı tekrar sistemiyle (1-2-4-7-15-30 gün) burada belirir.</p><button class="btn" onclick="go('dersler')">Derslere dön</button></div>`; return; }
  const items=shuffleItems(due.slice(0,20).map(qid=>Object.assign({qid},qByQid(qid))));
  app().innerHTML=`<div class="panel"><h2 class="h2">Tekrar · ${items.length} soru</h2><p class="muted small">Doğru bildiklerinin aralığı uzar, yanlışlar ertesi gün tekrar gelir.</p><div id="revBody"></div></div>`;
  startQuiz('revBody', items, true, 'Tekrarı bitir', (c,t,pct,ym)=>{ el('qresult').insertAdjacentHTML('beforeend', yanlisListesi(ym)+`<div class="row"><button class="btn" onclick="go('review')">Kalan tekrarlar</button></div>`); });
}

/* ===================== SÖZLÜK ===================== */
function renderGlossary(){
  app().innerHTML=`<div class="panel"><h2 class="h2">Sözlük</h2><input type="text" id="gsearch" placeholder="Terim ara (örn. reaktans, parafudr, seçicilik)" oninput="filterGlossary()"><div id="gres"></div></div>`;
  filterGlossary();
}
function filterGlossary(){
  const q=(el('gsearch').value||'').toLocaleLowerCase('tr');
  const terms=GLOSSARY.filter(t=>!q||t[0].toLocaleLowerCase('tr').includes(q)||t[1].toLocaleLowerCase('tr').includes(q)).sort((a,b)=>a[0].localeCompare(b[0],'tr'));
  const say=(m)=>{ const t=(m.t+' '+m.t+' '+(TEORI[m.id]||'').replace(/<[^>]*>/g,' ')).toLocaleLowerCase('tr'); let n=0,i=0; while(q&&(i=t.indexOf(q,i))>=0){ n++; i+=q.length; } return n; };
  const mods=q&&q.length>2?MODS.map(m=>[m,say(m)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]):[];
  el('gres').innerHTML=(mods.length?`<div class="muted small">Geçtiği modüller: ${mods.map(m=>`<a class="lnk" onclick="go('module',${m.id})">M${m.id} ${esc(m.t)}</a>`).join(' · ')}</div>`:'')+
    `<dl class="gloss">${terms.map(t=>`<dt>${t[0]}</dt><dd>${t[1]}${t[2]&&modById(t[2])?` <a class="lnk small" onclick="go('module',${t[2]})">→ M${t[2]}</a>`:''}</dd>`).join('')||'<dd class="muted">Sonuç yok.</dd>'}</dl>`;
}

/* ===================== VERİ / AYARLAR ===================== */
function exportData(){ try{ const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='elkmaster-yedek-'+todayStr()+'.json'; document.body.appendChild(a); a.click(); a.remove(); toast('Yedek indirildi'); }catch(e){ toast('Yedek alınamadı'); } }
function importData(input){ const f=input.files&&input.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const o=JSON.parse(r.result); DB=Object.assign({scores:{},notes:{},srs:{},exams:[],myk:[],ders:{},seviye:null},o); persist(); toast('Yedek geri yüklendi'); go('dersler'); }catch(e){ toast('Geçersiz dosya'); } }; r.readAsText(f); }
function resetData(){ if(!confirm('Tüm ilerleme kalıcı olarak silinecek. Emin misin?')) return; DB={scores:{},notes:{},srs:{},exams:[],myk:[],ders:{},seviye:null}; persist(); toast('İlerleme sıfırlandı'); go('dersler'); }
function renderSettings(){
  app().innerHTML=`<div class="panel"><h2 class="h2">Veri</h2>
    <p class="muted">İlerleme bu cihazın tarayıcısında saklanır. Başka cihaza taşımak için yedek al.</p>
    <div class="stats"><div><b>${moduleDone()}/${MODS.length}</b><span>tamamlanan modül</span></div><div><b>%${avgScore()}</b><span>ortalama puan</span></div><div><b>${dueReviews().length}</b><span>tekrar bekleyen</span></div><div><b>${DB.exams.length+DB.myk.length}</b><span>sınav denemesi</span></div></div>
    <div class="row"><button class="btn" onclick="exportData()">Yedek al (JSON)</button>
    <label class="btn ghost">Geri yükle<input type="file" accept="application/json,.json" style="display:none" onchange="importData(this)"></label>
    <button class="btn danger" onclick="resetData()">İlerlemeyi sıfırla</button></div></div>`;
}

/* ===================== ŞEMA BÜYÜTME ===================== */
document.addEventListener('click', function(e){
  const f=e.target.closest && e.target.closest('.lessonbody .figwrap'); if(!f) return;
  const svg=f.querySelector('svg'); if(!svg) return;
  const head=f.querySelector('.fighead');
  const d=document.createElement('div'); d.className='zoom';
  d.innerHTML='<div class="zoom-bar"><span>'+(head?head.textContent:'')+'</span><button class="btn sm">Kapat</button></div><div class="zoom-body"></div>';
  d.querySelector('.zoom-body').appendChild(svg.cloneNode(true));
  d.addEventListener('click', ev=>{ if(ev.target===d || ev.target.tagName==='BUTTON') d.remove(); });
  document.body.appendChild(d);
});

/* ===================== İÇERİK BİÇİMLENDİRME MOTORU ===================== */
/* satır başındaki uyarı işaretlerini kutuya çevirir (⚠ Dikkat, 🛠 Saha notu vb.) */
function alertify(h){
  if(!h) return h;
  const rules=[
    {re:/^(<b[^>]*>)?\s*(⚠️|⚠|❌|🚫|⛔)\s*/,cls:'ab-danger'},
    {re:/^(<b[^>]*>)?\s*(💡|✅|👍|🎯)\s*/,cls:'ab-tip'},
    {re:/^(<b[^>]*>)?\s*(🛠️|🛠|🔧|🧰|🔩|📌|🏗️)\s*/,cls:'ab-field'},
    {re:/^(<b[^>]*>)?\s*(🔥|❗|⚡)\s*/,cls:'ab-warn'}
  ];
  const parts=h.split(/<br>/);
  for(let i=0;i<parts.length;i++){
    const s=(parts[i]||'').replace(/^\s+/,''); if(!s) continue;
    for(const r of rules){ if(r.re.test(s)){ parts[i]='<div class="alertbox '+r.cls+'"><div>'+s.replace(r.re,'$1')+'</div></div>'; break; } }
  }
  return parts.join('<br>').replace(/<br>\s*(<div class="alertbox)/g,'$1').replace(/(<\/div><\/div>)\s*<br>/g,'$1');
}
function _v10Denge(x){ return (x.match(/<b/g)||[]).length === (x.match(/<\/b>/g)||[]).length; }
function _v10Orn(s){
  const m=s.match(/^([\s\S]*?)(Örn\.\s|Örnek\s*:|Örneğin\s*[:,])\s*([\s\S]+)$/); if(!m) return s;
  const pre=m[1], post=m[3]; if(!_v10Denge(pre)||!_v10Denge(post)) return s;
  const box='<div class="exline"><span class="ex-ic">ÖRNEK</span><div>'+post+'</div></div>';
  return pre.trim().length<6 ? box : pre+box;
}
function _v10Parca(t){
  if(!t) return '';
  if(/^<\/?(div|img|svg|figure|table|ul|ol|p|h[1-6])\b/i.test(t)) return t;
  const d=t.match(/^<b>([^<]{2,80}?)\s*([:.?])<\/b>\s*([\s\S]+)$/);
  if(d && d[3].trim() && _v10Denge(d[3])) return '<div class="defrow"><div class="defterm">'+d[1]+(d[2]==='?'?'?':'')+'</div><div class="defbody">'+_v10Orn(d[3].trim())+'</div></div>';
  if(/^(Örn\.|Örnek\s*:|Örneğin\s*[:,])/.test(t)) return '<div class="exline"><span class="ex-ic">ÖRNEK</span><div>'+t.replace(/^(Örn\.|Örnek\s*:|Örneğin\s*[:,])\s*/,'')+'</div></div>';
  return '<p class="para">'+_v10Orn(t)+'</p>';
}
function _v10Satirlar(h){
  if(!h) return h;
  const parts=h.split(/<br\s*\/?>/), out=[]; let buf=[];
  const flush=()=>{ if(buf.length){ out.push('<ul class="bulcard">'+buf.map(x=>'<li>'+x+'</li>').join('')+'</ul>'); buf=[]; } };
  for(const p of parts){
    const raw=p.replace(/^[\s ]+/,'').replace(/[\s ]+$/,''); if(!raw) continue;
    for(const sg of raw.split(/(@@[HT]\d+@@)/)){
      const t=sg.replace(/^[\s ]+/,'').replace(/[\s ]+$/,''); if(!t) continue;
      if(/^@@[HT]\d+@@$/.test(t)){ flush(); out.push(t); continue; }
      const b=t.match(/^[•·▪◦*]\s*([\s\S]+)$/)||t.match(/^[–—]\s+([\s\S]+)$/);
      if(b){ buf.push(_v10Orn(b[1])); continue; }
      flush(); out.push(_v10Parca(t));
    }
  }
  flush(); return out.join('');
}
function _v10Vurgu(h){
  if(!h) return h;
  h=h.replace(/<b>(\s*[A-Za-z0-9ΩΔΦηθλμ√][^<>=]{0,26}=[^<>]{1,36})<\/b>/g,'<span class="fml">$1</span>');
  h=h.replace(/<b>(\s*[\d.,]+\s?(?:mm²|kWh|kVA|kV|kW|mA|lx|Hz|°C|bar|V|A|W|Ω|%)\s*)<\/b>/g,'<span class="unit">$1</span>');
  return h;
}
function icerikSusle(html,id){
  if(!html) return '';
  let h=html; const tbl=[], figs=[], heads=[];
  h=h.replace(/<div class="figwrap[\s\S]*?<\/svg><\/figure><\/div>/g, m=>{ figs.push(m); return '<br>@@F'+(figs.length-1)+'@@<br>'; });
  h=h.replace(/<table[\s\S]*?<\/table>/g, m=>{ tbl.push(m); return '@@T'+(tbl.length-1)+'@@'; });
  h=h.replace(/<b style="font-size:15px">([\s\S]*?)<\/b>/g, (_,ic)=>{ heads.push(ic.replace(/^\s*(🔹\s*)?\d+\s*[).]\s*/,'').replace(/^🔹\s*/,'').trim()); return '@@H'+(heads.length-1)+'@@'; });
  h=h.replace(/@@F(\d+)@@/g,'<div data-f="$1"></div>');
  h=alertify(h);
  h=_v10Satirlar(h);
  h=h.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]\uFE0F?\s?/gu,'');
  h=h.replace(/@@H(\d+)@@/g,(_,n)=>{ const i=(+n)+1; return '</div><div class="secbox" id="sec'+id+'_'+i+'"><h3 class="sechead"><span class="secno">'+i+'</span>'+heads[+n]+'</h3>'; });
  h=('<div class="secbox">'+h+'</div>').replace(/<div class="secbox">(?:\s|<br>|&nbsp;)*<\/div>/g,'');
  h=h.replace(/@@T(\d+)@@/g,(_,n)=>'<div class="tblwrap">'+tbl[+n]+'</div>');
  h=_v10Vurgu(h);
  h=h.replace(/<div data-f="(\d+)"><\/div>/g,(_,n)=>figs[+n]);
  let toc='';
  if(heads.length>1) toc='<nav class="tocbar"><div class="tocbar-h">Bu modülde</div><ol>'+heads.map((x,i)=>'<li><a href="#sec'+id+'_'+(i+1)+'" onclick="event.preventDefault();document.getElementById(\'sec'+id+'_'+(i+1)+'\').scrollIntoView({behavior:\'smooth\'})">'+x.replace(/<[^>]*>/g,'')+'</a></li>').join('')+'</ol></nav>';
  return toc+h;
}
function foySusle(h){
  if(!h) return h;
  const tbl=[];
  h=h.replace(/<table[\s\S]*?<\/table>/g, m=>{ tbl.push(m); return '@@T'+(tbl.length-1)+'@@'; });
  h=alertify(h); h=_v10Satirlar(h);
  h=h.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]\uFE0F?\s?/gu,'');
  h=h.replace(/@@T(\d+)@@/g,(_,n)=>'<div class="tblwrap">'+tbl[+n]+'</div>');
  return _v10Vurgu(h);
}
