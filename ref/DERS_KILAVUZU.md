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
