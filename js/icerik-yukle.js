/* ELK MASTER — içerik yükleyici
   icerik/mXX.js dosyaları ELK_ICERIK[id] = {teori, ozet, sorular} tanımlar.
   teori/ozet uygulamaya bağlanır; sorular veri.js'teki soru bankasına EKLENİR. */
(function(){
  for (var k in ELK_ICERIK){
    var id=+k, c=ELK_ICERIK[k]; if(!c) continue;
    if (c.teori) TEORI[id]=c.teori.replace(/🔎\s*/g,'');
    if (c.ozet)  FOY[id]=foySusle(c.ozet);
    if (c.sorular && c.sorular.length) QBANK[id]=(QBANK[id]||[]).concat(c.sorular);
  }
})();
routeFromHash();
