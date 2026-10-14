/* ELK MASTER — PWA: service worker kaydı, güncelleme, kurulum ipucu */
let PWA_DEFER=null, PWA_YENI=null;
if('serviceWorker' in navigator && location.protocol!=='file:'){
  navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(reg=>{
    reg.update().catch(()=>{});
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') reg.update().catch(()=>{}); });
    reg.addEventListener('updatefound',()=>{ const nw=reg.installing; nw&&nw.addEventListener('statechange',()=>{ if(nw.state==='installed' && navigator.serviceWorker.controller){ PWA_YENI=nw; pwaYeniBildir(); } }); });
  }).catch(()=>{});
  navigator.serviceWorker.addEventListener('controllerchange',()=>{ if(PWA_YENI){ location.reload(); } });
}
function pwaYeniBildir(){
  if(el('pwaBar')) return;
  const d=document.createElement('div'); d.id='pwaBar'; d.innerHTML='Yeni sürüm hazır. <button class="btn sm" onclick="PWA_YENI.postMessage(\'skipWaiting\')">Yenile</button> <button class="btn ghost sm" onclick="el(\'pwaBar\').remove()">Sonra</button>';
  document.body.appendChild(d);
}
function pwaGuncelle(){ if(!('serviceWorker' in navigator)) return toast('Bu tarayıcıda yok'); navigator.serviceWorker.getRegistration().then(r=>{ if(!r) return toast('Kurulu değil'); r.update().then(()=>toast(PWA_YENI?'Yeni sürüm hazır':'Güncel')); }); }
window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); PWA_DEFER=e; pwaKurIpucu(); });
function pwaKurIpucu(){
  try{ if(localStorage.getItem('elk_kur_ipucu')==='1') return; }catch(e){}
  if(el('pwaKur')) return;
  const d=document.createElement('div'); d.id='pwaKur'; d.className='pwaKur';
  d.innerHTML='<b>Telefona kur:</b> internetsiz açılır, ana ekranda ikonla durur. <button class="btn sm" onclick="pwaKur()">Kur</button> <button class="btn ghost sm" onclick="pwaKurKapat()">Şimdi değil</button>';
  document.body.appendChild(d);
}
function pwaKurKapat(){ try{ localStorage.setItem('elk_kur_ipucu','1'); }catch(e){} const d=el('pwaKur'); if(d) d.remove(); }
function pwaKur(){ if(PWA_DEFER){ PWA_DEFER.prompt(); PWA_DEFER.userChoice.then(()=>{ PWA_DEFER=null; pwaKurKapat(); }); } else pwaKurTarif(); }
function pwaKurTarif(){
  const ios=/iPhone|iPad/.test(navigator.userAgent);
  const d=document.createElement('div'); d.className='zoom'; d.id='pwaTarif';
  d.innerHTML='<div class="zoom-bar"><span>Telefona kurulum</span><button class="btn sm" onclick="el(\'pwaTarif\').remove()">Kapat</button></div><div class="zoom-body" style="min-width:0">'+
   (ios ? '<ol><li>Safari ile aç.</li><li>Alttaki <b>Paylaş</b> (kare-ok) simgesine bas.</li><li><b>Ana Ekrana Ekle</b> → <b>Ekle</b>.</li></ol>' :
          '<ol><li>Chrome ile aç.</li><li>Sağ üst <b>⋮</b> menü → <b>Ana ekrana ekle</b> / <b>Uygulamayı yükle</b>.</li><li><b>Yükle</b>.</li></ol>')+
   '<p class="muted small">Kurulduktan sonra internetsiz çalışır. İlerleme, not ve çizimler telefonda kalır; Veri sayfasından yedek alabilirsin.</p></div>';
  document.body.appendChild(d);
}
