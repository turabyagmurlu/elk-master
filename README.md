# ELK MASTER — Elektrik Uzmanlık Akademisi

Elektrik teorisi + şema + MYK deneme platformu. Tarayıcıda `index.html` açılır, kurulum yok.

## Yapı (v14)
- `index.html` — iskelet
- `css/elk.css` — stil
- `js/elk.js` — uygulama (modül listesi, soru bankası, sınav, tekrar sistemi)
- `icerik/mXX.js` — Modül 1–36 teori, özet ve ek sorular (`ELK_ICERIK[id] = {teori, ozet, sorular}`)
- `js/icerik-yukle.js` — içerik dosyalarını uygulamaya bağlar
- `foy.html` — yazdırılabilir föy (ayrı sayfa)

## İçerik ekleme / düzeltme
Kurallar: `ref/YAZIM_KILAVUZU.md`. Şablon: `icerik/_ornek.js`.
Doğrulama (SVG çakışma, taşma, format):
```
NODE_PATH=$(npm root -g) node tools/kontrol.js icerik/m07.js
```
