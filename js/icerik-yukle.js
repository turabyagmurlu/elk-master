/* ELK MASTER v14 — içerik yükleyici
   icerik/mXX.js dosyaları ELK_ICERIK[id] = {teori, ozet, sorular} tanımlar.
   teori ve ozet mevcut metnin YERİNE geçer; sorular mevcut soru bankasına EKLENİR. */
(function(){
  for (var k in ELK_ICERIK){
    var id=+k, c=ELK_ICERIK[k]; if(!c) continue;
    if (c.teori) TEORI[id]=c.teori;
    if (c.ozet)  FOY[id]=c.ozet;
    if (c.sorular && c.sorular.length) QBANK[id]=(QBANK[id]||[]).concat(c.sorular);
  }
})();
refreshHeader();
go('kapak');

/* İnternet yokken dış görseller yüklenemezse boş kutu bırakma */
document.addEventListener('error', function(e){
  var t=e.target; if(t && t.tagName==='IMG'){ t.style.display='none'; }
}, true);
