/* ELK MASTER — Sor: ders/modül sayfasında Claude'a soru.
   Güvenlik: API anahtarı KODDA YOK. Kullanıcı Ayarlar'da kendi anahtarını girer,
   yalnız bu cihazın localStorage'ında durur ('elk_api_anahtar'), yedek dosyasına GİRMEZ.
   İstek doğrudan tarayıcıdan api.anthropic.com'a gider; araya başka sunucu girmez. */

const SOR_API = 'https://api.anthropic.com/v1';
let SOR = { gecmis: [], sayfa: null };

function sorAnahtar(){ try{ return localStorage.getItem('elk_api_anahtar')||''; }catch(e){ return ''; } }
function sorModel(){ try{ return localStorage.getItem('elk_api_model')||''; }catch(e){ return ''; } }
function sorBaslik(k){ return { 'x-api-key':k, 'anthropic-version':'2023-06-01', 'content-type':'application/json', 'anthropic-dangerous-direct-browser-access':'true' }; }

/* En yeni Sonnet modelini otomatik seç (model adı koda gömülmez, eskimez) */
async function sorModelBul(k){
  const r = await fetch(SOR_API+'/models?limit=100', { headers: sorBaslik(k) });
  if(!r.ok) throw new Error(r.status===401 ? 'Anahtar geçersiz.' : 'Bağlantı hatası ('+r.status+').');
  const d = await r.json(); const ids = (d.data||[]).map(m=>m.id);
  const m = ids.find(i=>/sonnet/i.test(i)) || ids.find(i=>/haiku/i.test(i)) || ids[0];
  if(!m) throw new Error('Kullanılabilir model bulunamadı.');
  try{ localStorage.setItem('elk_api_model', m); }catch(e){}
  return m;
}

/* ---------- Ayarlar bölümü ---------- */
function sorAyarHtml(){
  const k = sorAnahtar();
  return `<div class="panel"><h2 class="h2">Yapay zekâ (Sor)</h2>
    <p class="muted">Ders sayfasında anlamadığın yeri sorarsın, sade Türkçe ile anlatır. Kendi Anthropic API anahtarınla çalışır; anahtar <b>yalnız bu cihazda</b> saklanır, yedek dosyasına girmez.</p>
    <div class="row"><input id="sorAnahtarInp" type="password" autocomplete="off" placeholder="sk-ant-..." value="${k?'••••••••'+esc(k.slice(-4)):''}" style="flex:1;min-width:220px;padding:9px 12px;border:1px solid var(--line);border-radius:8px;font:inherit">
      <button class="btn" onclick="sorAnahtarKaydet()">Kaydet ve dene</button>${k?'<button class="btn ghost" onclick="sorAnahtarSil()">Sil</button>':''}</div>
    <p class="muted small" id="sorDurum">${k ? 'Anahtar kayıtlı'+(sorModel()?' · model: '+esc(sorModel()):'') : 'Anahtar yok.'}</p>
    <details class="muted small"><summary>Anahtarı nereden alırım?</summary>
      <ol><li>console.anthropic.com adresine gir, hesabınla oturum aç.</li>
      <li><b>Billing</b> bölümünden kredi yükle. <b>Limits</b> bölümünden aylık harcama sınırı koy (ör. 5 $).</li>
      <li><b>API Keys → Create Key</b>. Adı: "ELK iPad". Çıkan anahtarı kopyala (bir kez gösterilir).</li>
      <li>Buraya yapıştır, <b>Kaydet ve dene</b>.</li></ol>
      Claude Max aboneliği API kredisi içermez; API ayrı ücretlendirilir. Bir soru genelde 1–3 kuruş tutar.</details></div>`;
}
async function sorAnahtarKaydet(){
  const v = (el('sorAnahtarInp').value||'').trim(); const d = el('sorDurum');
  const k = v.startsWith('••') ? sorAnahtar() : v;
  if(!/^sk-ant-/.test(k)){ d.textContent='Anahtar "sk-ant-" ile başlamalı.'; return; }
  d.textContent='Deneniyor…';
  try{ const m = await sorModelBul(k); localStorage.setItem('elk_api_anahtar', k); d.textContent='Çalışıyor · model: '+m; toast('Anahtar kaydedildi'); renderSettings(); }
  catch(e){ d.textContent='Olmadı: '+e.message; }
}
function sorAnahtarSil(){ try{ localStorage.removeItem('elk_api_anahtar'); localStorage.removeItem('elk_api_model'); }catch(e){} toast('Anahtar silindi'); renderSettings(); }

/* ---------- sayfadaki Sor düğmesi ---------- */
function sorIkonGoster(){
  if(el('sorFab')) return;
  const b=document.createElement('button'); b.id='sorFab'; b.textContent='Sor'; b.setAttribute('aria-label','Yapay zekâya sor'); b.onclick=sorAc; document.body.appendChild(b);
}
function sorGizle(){ ['sorFab'].forEach(id=>{ const x=el(id); if(x) x.remove(); }); }

function sorAc(){
  if(el('sorDlg')) return;
  if(SOR.sayfa!==KALEM.sayfa){ SOR.gecmis=[]; SOR.sayfa=KALEM.sayfa; }
  const d=document.createElement('div'); d.className='zoom'; d.id='sorDlg';
  const k=sorAnahtar();
  d.innerHTML=`<div class="zoom-bar"><span>Sor · bu sayfa hakkında</span><button class="btn sm" onclick="el('sorDlg').remove()">Kapat</button></div>
    <div class="zoom-body sor-body">${k ? `<div id="sorAkis" class="sor-akis">${SOR.gecmis.length?'':'<p class="muted">Anlamadığın yeri yaz. Örnek: "Kaçak akım rölesi neden nötrü de keser?" ya da "Bu şemadaki U1 ne demek?"</p>'}</div>
      <div class="sor-giris"><textarea id="sorTa" rows="2" placeholder="Sorunu yaz…"></textarea><button class="btn" id="sorGonder" onclick="sorGonder()">Gönder</button></div>`
      : `<p>Bu özellik için önce kendi API anahtarını girmen gerekiyor.</p><button class="btn" onclick="el('sorDlg').remove();go('settings')">Ayarlar'a git</button>`}</div>`;
  document.body.appendChild(d);
  sorAkisCiz();
  const ta=el('sorTa'); if(ta){ ta.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sorGonder(); } }); setTimeout(()=>ta.focus(),60); }
}
function sorMd(t){ /* sade biçim: kalın, satır başı madde, paragraf */
  return esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').split(/\n{2,}/).map(p=>{
    const sat=p.split('\n'); if(sat.every(s=>/^\s*([-•*]|\d+[.)])\s+/.test(s))) return '<ul>'+sat.map(s=>'<li>'+s.replace(/^\s*([-•*]|\d+[.)])\s+/,'')+'</li>').join('')+'</ul>';
    return '<p>'+sat.join('<br>')+'</p>'; }).join('');
}
function sorAkisCiz(){
  const a=el('sorAkis'); if(!a) return; if(!SOR.gecmis.length) return;
  a.innerHTML=SOR.gecmis.map(m=> m.role==='user' ? `<div class="sor-s">${esc(m.content)}</div>` : `<div class="sor-c">${sorMd(m.content)}</div>`).join('');
  a.scrollTop=a.scrollHeight;
}
function sorBaglam(){
  const kok=KALEM.kok; if(!kok) return '';
  const h=document.querySelector('#app .h2'); const bas=h?h.textContent.trim():'';
  let t=kok.innerText.replace(/\n{3,}/g,'\n\n'); if(t.length>14000) t=t.slice(0,14000)+'\n[…]';
  return 'SAYFA: '+bas+'\n\n'+t;
}
const SOR_SISTEM=`Sen ELK MASTER uygulamasında bir elektrik ustabaşına (taşeron şefi) birebir anlatan, sahayı bilen deneyimli bir elektrik hocasısın.
Kullanıcı mühendis veya tekniker değil; teori bilgisi düşük, sahada çok tecrübeli. Amacı "elektrikçiyim" dediğinde kimsenin karşısında bocalamamak.
Kurallar:
- Türkçe, sade, kısa yaz. Önce 1-2 cümlelik net cevap, sonra gerekirse sahadan bir örnek.
- Formül ve sayı yığma. Formül gerekiyorsa tek bir tane, ne işe yaradığını günlük dille söyle.
- Benzetme kullanabilirsin (su borusu vb.) ama sonunda gerçek terimi de ver.
- Emin değilsen uydurma, "emin değilim, şuna bak" de. Türkiye'de geçerli yönetmelik/standart (Elektrik İç Tesisleri Yönetmeliği, TS HD 60364) adı verilecekse genel konuş, madde numarası uydurma.
- İş güvenliği gerektiren konularda enerjiyi kes, kilitle-etiketle, ölç kuralını hatırlat.
- Cevap 180 kelimeyi geçmesin; kullanıcı "detaylı anlat" derse uzatabilirsin.
Aşağıda kullanıcının şu an okuduğu ders sayfasının metni var; cevabı mümkünse buna dayandır.`;
async function sorGonder(){
  const ta=el('sorTa'); const q=(ta&&ta.value||'').trim(); if(!q) return;
  const k=sorAnahtar(); if(!k) return;
  ta.value=''; SOR.gecmis.push({role:'user',content:q}); sorAkisCiz();
  const a=el('sorAkis'); const bek=document.createElement('div'); bek.className='sor-c muted'; bek.textContent='Düşünüyor…'; a.appendChild(bek); a.scrollTop=a.scrollHeight;
  const btn=el('sorGonder'); if(btn) btn.disabled=true;
  try{
    const model = sorModel() || await sorModelBul(k);
    const r = await fetch(SOR_API+'/messages', { method:'POST', headers:sorBaslik(k), body:JSON.stringify({
      model, max_tokens:1000, system: SOR_SISTEM+'\n\n'+sorBaglam(), messages: SOR.gecmis.slice(-10) }) });
    const d = await r.json().catch(()=>({}));
    if(!r.ok){
      if(r.status===404 || /model/i.test((d.error||{}).message||'')){ try{ localStorage.removeItem('elk_api_model'); }catch(e){} }
      throw new Error(r.status===401?'Anahtar geçersiz. Ayarlar\'dan yeniden gir.' : r.status===429?'Çok sık soruldu ya da kredi limiti doldu. Biraz bekle.' : r.status===400&&/credit/i.test(JSON.stringify(d))?'API kredisi bitmiş. Console → Billing.' : ((d.error||{}).message||('Hata '+r.status)));
    }
    const txt=(d.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n').trim()||'(boş cevap)';
    SOR.gecmis.push({role:'assistant',content:txt});
  }catch(e){
    SOR.gecmis.pop(); if(ta) ta.value=q;
    bek.classList.remove('muted'); bek.innerHTML='<b>Olmadı:</b> '+esc(e.message||'İnternet bağlantısını kontrol et.'); if(btn) btn.disabled=false; return;
  }
  if(btn) btn.disabled=false; sorAkisCiz();
}
