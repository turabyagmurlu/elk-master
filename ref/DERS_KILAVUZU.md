# ELK MASTER — 30 Dakikalık Ders Yazım Kılavuzu

## Neden bu format var
Kullanıcı (elektrik formeni, sahada çalışıyor) modülleri okudu ve "bilgim yüzde 0 gelişti" dedi. Sebepler, kendi seçimiyle:
1. **Çok uzun ve yoğun:** 3000 kelimelik duvar metin, birkaç paragraftan sonra bırakıyor.
2. **Okuyor ama aklında kalmıyor:** neyi bildiğini, neyi bilmediğini göremiyor.
3. **Seviyesine oturmuyor:** bir yer çok basit, bir yer birden standart ve yönetmelik ağırlıklı.
4. **Sahayla bağı zayıf:** okuduğu şey her gün yaptığı işe (pano, kablo, arıza) doğrudan değmiyor.

Günde **30 dakika** ayırabiliyor. Oyun istemiyor, çocukça hiçbir şey istemiyor. "Anlat, anlatırken göster, bilgi doğru olsun, öğrenilebilir olsun."

Modüller (`icerik/mXX.js`) **başvuru kitabı** olarak kalır. Dersler **öğretmen** olur: az ve öz, sırayla, tekrar ettirerek.

## Ders dosyası: `dersler/dXX.js` (XX iki haneli: d01 … d40)
```js
/* Ders 7 — Üç faz: 230 mü, 400 mü? */
ELK_DERS[7] = {
hafta: 2,
baslik: "Üç faz: 230 mü, 400 mü?",
hedef: ["...", "...", "..."],          // 3 madde: "Bu dersten sonra ... yapabilirsin" (fiille başlar)
saha: `...`,                            // sahadan bir durum, 3–5 cümle, soru ile biter
parcalar: [                             // 3–4 parça, her biri TEK fikir
  { baslik: "...", metin: `...`, sema: `<svg ...>...</svg>` /* veya "" */, akilda: "tek cümlelik kural" },
  ...
],
ornek: { baslik: "...", adimlar: ["...", "...", "..."], sonuc: "..." },  // sahadan baştan sona işlenmiş örnek
yokla: [ { s: "soru", c: "cevap" }, ... ],   // 6 soru; son 1–2'si ÖNCEKİ derslerden (tekrar)
sahada: ["...", "..."],                 // yarın sahada bakılacak/ölçülecek 2–3 şey (güvenlik notuyla)
ozet: ["...", "...", "...", "..."],     // 4–5 madde, her biri tek cümle
modul: [7, 18]                          // derinlemesine okumak için kütüphane modülleri
};
```
- Template literal içinde backtick (`) ve `${` YOK. Düz tırnak serbest.
- HTML: `metin` içinde paragraf arası `<br><br>`, vurgu `<b>`, formül `<b>P = U · I</b>`. Liste gerekiyorsa `<br>• ` ile. Tablo gerekiyorsa sade `<table class="tbl">…</table>` (en fazla 4 sütun, 6 satır).

## Yazım kuralları (en önemli kısım)
- **Uzunluk:** ders toplamı 1100–1500 kelime (SVG hariç). Her `metin` en fazla 220 kelime. Okuma ~15 dk + yokla/düşünme ~10 dk + özet ~5 dk.
- **Bir parça = bir fikir.** Parçaya sığmıyorsa o fikir başka derse aittir.
- **Sırayla:** önce sezgi (sahadaki bir şeye benzet), sonra kural/formül, sonra sayıyla küçük bir örnek. Asla formülle başlama.
- **Sahadan konuş:** "panoda", "kablo tavasında", "termik attı", "pensle ölçtün" gibi. Okuyucu formen; işi biliyor, teorinin "neden"ini öğreniyor. Ona tepeden bakma, çocukça benzetme yapma; ama hiçbir şeyi bilindiğini varsayma.
- **Standart / yönetmelik:** sadece işe yarıyorsa, tek cümle, numarasız ("TS HD 60364 bunu ister" düzeyinde). Ayrıntı kütüphane modülünde.
- **Rakamlar:** birimle yaz (230 V, 16 A, 2,5 mm²). Türkçe ondalık virgül. Her hesap gerçekten doğru olsun; iki kez kontrol et.
- **Çekince dozu:** "tipik" kelimesi ders başına en fazla 3 kez. Belirsiz bilgiyi yazma.
- **Dil:** kısa cümle, Türkçe karakter tam, jargon gerekiyorsa ilk geçtiği yerde parantezle açıkla. Emoji yok.
- **`akilda`:** her parçanın sonunda unutulmayacak tek cümle. Ezberlenecek şey buysa bu olsun.
- **`yokla`:** kişinin cevabı KAFASINDA ÜRETMESİNİ isteyen açık uçlu sorular (çoktan seçmeli değil). "Neden…?", "Şu durumda ne olur…?", "Hesapla: …". Cevap 1–3 cümle, net. Son 1–2 soru önceki derslerden (aralıklı tekrar). İlk derste hepsi o dersten.
- **`sahada`:** gerçekten yapılabilir, güvenli gözlem/ölçüm. Enerjili işte güvenlik uyarısı (yetki, KKD, gerilim yokluğu kontrolü) ekle.

## Şema kuralları
- 0–1 şema her parçada, ders başına 2–4 şema. Şema metni tekrar etmesin; metnin gösteremediğini göstersin (akış yönü, bağlantı, karşılaştırma, grafik).
- Kütüphane modüllerinde (`icerik/mXX.js`) uygun bir şema VARSA onu aynen alıp kullanabilirsin (sadece başlık metnini değiştir). Yoksa yeni çiz.
- Açık palet: arka plan ilk eleman `<rect width="460" height="H" fill="#ffffff"/>`; metin #1c232d, ikincil #4b5563, çizgi #94a3b8, kutu #f1f5f9 / kenar #cbd5e1, faz turuncu #b45309, nötr mavi #0369a1, PE yeşil #15803d, tehlike kırmızı #b91c1c, mor #6d28d9. viewBox genişliği 460, yükseklik 140–300, font-size ≥ 10. Metinler üst üste binmesin, taşmasın. `<svg viewBox="0 0 460 H">` ile başlasın; içinde `<br>` olmaz.

## Doğrulama
`cd /home/claude/elk-master && NODE_PATH=$(npm root -g) node tools/ders_kontrol.js dersler/d07.js`
Tüm ✗ ve uyarıları gider. Şemaları PNG'ye render edip gözle bak.


---

# v2 — SADE DİL KURALLARI (Ekim 2026, öncekilerle çelişirse BU geçerli)

## Neden
Kullanıcı yeni dersleri de "fazla teknik" buldu. Elektrik mühendisi ya da teknikeri değil; sahada formen, teorisi zayıf. Formülle, Ω·mm²/m'li hesapla anlatılan örneği takip edemiyor. Amacı: "Elektrikçiyim" dediğinde ustanın, mühendisin, müşterinin karşısında **kontrpiyede kalmamak** — doğru kelimeyi, doğru sırayla, emin bir şekilde söyleyebilmek.

İki uç da yasak:
- **Fazla teknik:** formülle başlayan, birimden birime dönüşüm yapan, 6 adımlı hesap zinciri kuran anlatım.
- **Fazla basit:** ilkokul çocuğuna anlatır gibi, "elektrik bir su gibidir, hadi bakalım" tonu, oyunlaştırma, ünlem, sevimlilik. Kullanıcı işini bilen yetişkin bir usta adayı. Havalı, ciddi, net bir öğrenim uygulaması karakteri korunacak.

Ton: Kıdemli bir ustanın, zeki bir çırağa şantiyede çay molasında anlatması. Kısa, emin, saygılı, esprisiz ama kuru da değil.

## Yeni alanlar
```js
terimler: [ { t: "Gerilim düşümü", a: "Kablo boyunca yolda kaybolan volt. Uzun ve ince kabloda artar." }, ... ],  // 4–6 terim
usta: {
  soz:  ["Boşta değil, yük altında ölçtüm; hatta gerilim düşümü var.", "..."],   // 2–3 cümle: sahada ağızdan çıkacak, doğru terimli, kendinden emin cümleler
  deme: "\"Prizde elektrik az geliyor\" deme. Doğrusu: \"Yük altında prizde gerilim 205 V'a düşüyor.\""  // en sık yapılan yanlış söz + doğrusu
}
```
- `terimler`: Dersin içinde geçen ve bilmeyenin takılacağı kelimeler. `a` en fazla 20 kelime, gündelik dille, formülsüz. Saha argosu varsa onu da söyle ("halk arasında 'kofta'").
- `usta.soz`: tırnaksız yaz (tasarım tırnak koyar). Gerçek bir konuşmada kurulabilecek doğal Türkçe. Terimi doğru kullansın.
- `usta.deme`: amatör gibi gösteren yaygın yanlış ifade + doğru ifade.

## Anlatım sırası (her parçada)
1. **Sahada ne görürsün** (1–2 cümle: ekranda ne yazar, ne ısınır, ne atar).
2. **Neden olur** (sade dil, gerekirse tek bir yerinde benzetme: hortum, boru, yol, köprü... Benzetme kısa olsun ve hemen bırakılsın; çocukça uzatılmasın).
3. **Kural** (tek cümle). Formül gerekiyorsa ancak bundan SONRA gelir ve **kelimeyle okunur**: "<b>Volt = Amper × Ohm</b> (U = I · R)". Önce kelimeli hali, parantezde sembol.
4. **Tek bir rakamla gösterim** (yuvarlak, akılda kalan sayılar: 10 A, 230 V, 2 kat). Ondalıklı uzun hesap yok.

## Rakam kuralı
- Bir parçada en fazla 2 hesap. Hesap gösterirken her adımı kelimeyle söyle: "16 amper ile 0,2 ohm'u çarparsan 3 volt kaybolur."
- Sayıları yuvarla: 8,7 A yerine "yaklaşık 9 A", 0,43 Ω yerine "yarım ohm kadar". Kesinlik gereken yerde (sigorta değeri, kesit, 30 mA) tam yaz.
- Özgül direnç, √3, cosφ gibi kavramlar gerekiyorsa önce ne işe yaradığını söyle, sayıyı sonra ver. "√3 = 1,73: üç fazda hep çıkan sabit çarpan" gibi.
- Bir rakam ancak bir anlam taşıyorsa yazılır. Rakamın yanına "bu ne demek" cümlesi koy ("166 W — yanan bir havyadan fazla ısı").

## İşlenmiş örnek (`ornek`)
- 4–6 adım. Her adım `<b>Kısa etiket:</b>` ile başlar (ör. <b>Ne olmalı:</b>, <b>Ne ölçtün:</b>, <b>Fark nereden:</b>, <b>Tehlike:</b>, <b>Tuzak:</b>, <b>Ne yaparsın:</b>).
- Her adım en fazla 2 cümle, en fazla 1 hesap. Hesap zinciri yok.
- `sonuc`: sahada yapılacak iş, emir kipinde, güvenlik adımı dahil.

## Kendini yokla
- Sorular sahne kurar: "Pensle ölçtün, X gördün. Ne düşünürsün?" Hesap sorusu ders başına en fazla 1, rakamları yuvarlak.
- Cevap 1–3 cümle, cevabın "neden"i mutlaka içinde.

## Şemalar (KALİTE ARTIRILACAK)
- Her şema TEK bir şeyi göstersin. Etiket sayısı az (en fazla ~10 metin), yazılar büyük (font-size 11–13, başlık 13–14).
- Şemanın tepesinde kısa bir başlık cümlesi (ne gördüğünü söyler), altında 1 satır "ne anlama gelir" notu.
- Tercih edilen şema tipleri: (a) akış/yol şeması: pano → kablo → ek → priz, her durakta değer; (b) doğru/yanlış yan yana iki panel (yeşil ✓ / kırmızı ✗ etiketli); (c) basit çubuk/karşılaştırma; (d) sade devre çizimi (L turuncu, N mavi, PE yeşil, kalın çizgi 3–4 px).
- Renk anlam taşır: kırmızı = tehlike/hata, yeşil = doğru/güvenli, turuncu = faz, mavi = nötr. Lejant gerekiyorsa tek satır.
- Kutular yuvarlak köşeli (rx="8"), bol boşluklu, hizalı. Ok uçları için `<defs><marker>` kullanılabilir.
- Okunmayan küçük not, üst üste binen etiket, köşeye sıkışmış yazı = kabul edilmez. Render edip bak.

## Doğruluk
Sadeleştirmek yanlışlamak değildir. Eski dersteki her doğru teknik bilgiyi koru (gerekirse sadeleştirerek); yanlış varsa düzelt. Uydurma değer yok.
