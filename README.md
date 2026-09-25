# ELK MASTER — Elektrik Teorisi

Saha elektrikçisi için teori ağırlıklı, şemalı elektrik kursu. 7 aşama, 45 modül, soru bankası, genel deneme, MYK (15UY0241) provası, aralıklı tekrar ve baskı föyü. Tarayıcıda `index.html` açılır; internet gerekmez, dış kaynak yok.

## Yapı
- `index.html` — iskelet
- `css/elk.css` — açık, baskı dostu tema
- `js/veri.js` — modüller, aşamalar (PROGRAM), soru bankası, MYK soruları, sözlük
- `js/elk.js` — uygulama mantığı ve içerik biçimlendirme motoru
- `icerik/mXX.js` — modül teorisi, özet, ek sorular (`ELK_ICERIK[id] = {teori, ozet, sorular}`)
- `js/icerik-yukle.js` — içerikleri bağlar, açılış rotası
- `foy.html` — baskı föyü (tek modül / tümü · sadece özet / özet+şema / tam teori)

## İçerik ekleme / düzeltme
Kurallar: `ref/YAZIM_KILAVUZU.md`. Şablon: `icerik/_ornek.js`. Yeni modül: `js/veri.js` → MODS + PROGRAM'a ekle, `index.html` ve `foy.html`'e script satırı ekle.

Doğrulama (SVG çakışma, taşma, format):
```
NODE_PATH=$(npm root -g) node tools/kontrol.js icerik/m*.js
python3 tools/palet_acik.py icerik/m*.js   # koyu paletli şema varsa açığa çevirir
```
