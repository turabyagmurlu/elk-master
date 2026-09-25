# ELK MASTER — Teori İçerik Yazım Kılavuzu

Hedef okur: sahada çalışan elektrikçi / formen / MYK (15UY0241 Elektrik Tesisatçısı Seviye 3-4) adayı.
Kullanıcının talebi: "İnteraktifliği sahada yaparım; bana TEORİK BİLGİ ağırlığı lazım, modüllerin öğrenim süresi uzun olsun, teori GÖRSELLERLE desteklensin."

## Çıktı dosyası: icerik/mXX.js (XX iki haneli: m01, m02 ...)
```js
/* Modül 7 — YG Manevrası */
ELK_ICERIK[7] = {
teori: `...HTML...`,
ozet:  `...HTML...`,
sorular: [ {q:"...",opts:["..","..","..",".."],ans:0,ex:"..."}, ... ]
};
```
- Template literal İÇİNDE backtick (`) ve `${` KULLANMA. Tırnak ' ve " serbest.
- `teori` mevcut teorinin YERİNE geçer → mevcut teorideki her doğru bilgiyi (ref/mevcut_1_36.json → mevcut_teori) yeni metne dahil et, hiçbir doğru bilgiyi kaybetme. Mevcutta yanlış/eksik bir şey varsa düzelt ve sonuç mesajında belirt.
- `ozet` mevcut özetin yerine geçer: 120-200 kelime, `<b>Özet:</b> ...<br><b>Terim:</b> ...<br>` kalıbı; formüller, kritik sayılar, "Sık hata" satırı.
- `sorular`: YENİ teoriden 6 yeni soru (mevcut sorular korunur, bunlar EKLENİR; mevcutlarla aynısını yazma). 4 şık, ans 0-3 (doğru şıkkı farklı pozisyonlara dağıt), ex = neden doğru, 1-2 cümle.

## Teori HTML kuralları (uygulamanın içerik motoru buna göre biçimlendirir)
- Bölüm başlığı: `<b style="font-size:15px">🔹 1) Başlık</b><br>` — 6 ila 9 bölüm.
- Paragraflar düz metin, satır sonu `<br>`, paragraf arası `<br><br>`.
- Tanım / madde: `<b>• Terim:</b> açıklama<br>`
- Örnek: satır `Örnek: ...` ile başlasın (uygulama bunu ÖRNEK kutusuna çevirir). Her modülde en az 2 sayısal/saha örneği.
- Tablo gerekiyorsa sade `<table class="tbl"><tr><th>..</th></tr><tr><td>..</td></tr></table>` (tek satırda yaz, içinde <br> yok).
- Uyarı: `<b>⚠ Dikkat:</b> ...` ; saha ipucu: `<b>🛠 Saha notu:</b> ...`
- Emojiyi abartma: sadece başlıklarda 🔹 ve yukarıdaki iki etiket.
- Uzunluk: modül başına 1200–1800 kelime (SVG hariç). Okuma süresi ~8-12 dk.
- İçerik akışı: Ne? → Neden/fizik mantığı → Nasıl hesaplanır/seçilir → Sahada nasıl uygulanır → Sık hatalar → Mevzuat/standart dayanağı → Kontrol listesi.
- Dil: Türkçe karakterler tam, sade, net, hikâye/edebiyat yok, kurumsal jargon yok. Saha dili kullanılabilir ("kofta", "şalter") ama teknik adı da ver.
- DOĞRULUK HER ŞEY: Sadece emin olduğun bilgiyi yaz. Türkiye mevzuatı/standartları: Elektrik İç Tesisleri Yönetmeliği, Elektrik Tesislerinde Topraklamalar Yönetmeliği, Elektrik Kuvvetli Akım Tesisleri Yönetmeliği, TS HD 60364, TS EN 60898/61008/61009/60947, TS EN 62305 vb. Madde numarası veya kesin sayısal sınır konusunda emin değilsen madde numarası verme, genel ifade kullan. Uydurma değer YASAK. Pratik tipik değer verirken "tipik", "yaklaşık" de.

## SVG şema kuralları (her modülde 3-4 şema, metnin ilgili bölümünün içine)
Şema bloğu (tek satır olabilir, içinde <br> OLMAZ):
```
<div class="figwrap"><div class="fighead">🔎 Şema 1 — Kısa başlık</div><figure class="fig" style="margin:0;border:none;border-radius:0"><svg viewBox="0 0 460 220">...</svg></figure></div><br>
```
- Bloktan önce `<br>` olmalı (yeni satırda başlasın).
- Arka plan: ilk eleman `<rect width="460" height="H" fill="#141d26"/>`. Genişlik 460 sabit, yükseklik 160–300.
- Renkler: metin #e8eef6, ikincil #8a98ab, çizgi #3a4b5c, faz/uyarı turuncu #ffb000, mavi (nötr/bilgi) #33b1ff, yeşil (doğru/topraklama PE) #3fb950, kırmızı (hata/tehlike) #f85149, mor #a371ff. Renk kodu kuralı: L=kahverengi/siyah/gri yerine şemada turuncu kullanılabilir, N=mavi, PE=yeşil — lejantta belirt.
- font-size en az 9 (tercihen 10-11), font-family belirtme. text-anchor kullanabilirsin.
- Metinler ASLA birbirinin üstüne binmesin ve viewBox dışına taşmasın. Uzun etiketi iki satıra böl. Türkçe metin genişliği ≈ font-size×0.55×karakter sayısı — hesapla.
- İçerik: prensip şeması, devre şeması, kesit/katman çizimi, akış (adım adım), karşılaştırma tablosu-diyagramı, grafik (eğri). Süsleme değil, ÖĞRETEN çizim olsun: etiketli, oklu, değerli.
- Harici görsel/URL YOK. Sadece inline SVG.

## Doğrulama (zorunlu)
Her dosyayı yazdıktan sonra çalıştır:
`cd /home/claude/elk-master && NODE_PATH=$(npm root -g) node tools/kontrol.js icerik/mXX.js`
Tüm ✗ hatalarını ve "kelime az / şema az / bölüm az" uyarılarını gider. Küçük yazı uyarısını da gider.
