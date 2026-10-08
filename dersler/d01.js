/* Ders 1 — Gerilim, akım, direnç: ölçtüğün üç sayı */
ELK_DERS[1] = {
hafta: 1,
baslik: "Gerilim, akım, direnç: ölçtüğün üç sayı",
hedef: [
  "Gerilim, akım ve direncin sahada neye karşılık geldiğini kendi cümlenle anlatabilirsin.",
  "Multimetre ve pens ampermetrenin neyi, nasıl ölçtüğünü ve neden öyle bağlandığını bilirsin.",
  "Gevşek bir ekin neden ısındığını Ohm kanunu ve P = I²·R ile hesaplayabilirsin."
],
saha: `Bir dairede priz linyesine 2000 W'lık ısıtıcı takılı. Panoda faz-nötr arası 230 V ölçüyorsun, prizde ise ısıtıcı çalışırken 205 V. Isıtıcıyı fişten çekince prizde yine 229 V görüyorsun. Kablo yeni, sigorta atmıyor. Peki 25 volt nereye gitti ve bu bir tehlike mi?`,
parcalar: [
  { baslik: "Gerilim: iki nokta arasındaki fark",
    metin: `Gerilim (U, birimi volt, V) bir noktanın diğerine göre ne kadar "itme" farkı taşıdığıdır. Bu yüzden gerilim her zaman <b>iki nokta arasında</b> ölçülür: faz-nötr, faz-toprak, nötr-toprak. Tek bir noktanın "gerilimi" ancak bir referansa göre söylenebilir; sahada referans çoğu zaman nötr ya da topraktır.<br><br>Multimetreyi volt kademesine alıp iki ucu ölçmek istediğin iki noktaya değdirirsin. Alet devreye <b>paralel</b> bağlanır ve iç direnci çok yüksektir (megaohm mertebesi), yani devreden neredeyse akım çekmez; sadece farkı okur.<br><br>Sağlıklı bir konut tesisatında beklenen tablo şudur: faz-nötr ≈ 230 V, faz-PE ≈ 230 V, nötr-PE birkaç volt. Nötr-PE arası onlarca volta çıkıyorsa nötr hattında bir sorun vardır: gevşek nötr bağlantısı, kopukluk ya da aşırı yüklü ortak nötr.`,
    sema: `<svg viewBox="0 0 460 210"><rect width="460" height="210" fill="#ffffff"/><text x="230" y="20" fill="#1c232d" font-size="12" text-anchor="middle">Pano → linye → yük: neyi nerede ölçersin</text><rect x="20" y="50" width="80" height="110" fill="#f1f5f9" stroke="#cbd5e1"/><text x="60" y="44" fill="#4b5563" font-size="10" text-anchor="middle">PANO</text><text x="60" y="80" fill="#b45309" font-size="11" text-anchor="middle">L (faz)</text><text x="60" y="140" fill="#0369a1" font-size="11" text-anchor="middle">N (nötr)</text><line x1="100" y1="76" x2="360" y2="76" stroke="#b45309" stroke-width="3"/><line x1="100" y1="136" x2="360" y2="136" stroke="#0369a1" stroke-width="3"/><rect x="360" y="60" width="80" height="92" fill="#f1f5f9" stroke="#cbd5e1"/><text x="400" y="102" fill="#1c232d" font-size="11" text-anchor="middle">YÜK</text><text x="400" y="118" fill="#4b5563" font-size="10" text-anchor="middle">ısıtıcı</text><line x1="150" y1="76" x2="150" y2="96" stroke="#6d28d9" stroke-width="1.5"/><line x1="150" y1="116" x2="150" y2="136" stroke="#6d28d9" stroke-width="1.5"/><circle cx="150" cy="106" r="11" fill="#ffffff" stroke="#6d28d9" stroke-width="2"/><text x="150" y="110" fill="#6d28d9" font-size="11" text-anchor="middle">V</text><text x="150" y="182" fill="#6d28d9" font-size="10" text-anchor="middle">Voltmetre: iki iletken ARASINA</text><text x="150" y="196" fill="#6d28d9" font-size="10" text-anchor="middle">(paralel, akım çekmez)</text><ellipse cx="270" cy="76" rx="16" ry="20" fill="none" stroke="#15803d" stroke-width="2.5"/><text x="270" y="44" fill="#15803d" font-size="10" text-anchor="middle">Pens: TEK iletkeni sarar</text><text x="290" y="182" fill="#15803d" font-size="10" text-anchor="middle">L ve N birlikte alınırsa ≈ 0 A</text><text x="290" y="196" fill="#15803d" font-size="10" text-anchor="middle">(zıt akımların alanı birbirini siler)</text></svg>`,
    akilda: "Gerilim iki nokta arasındaki farktır; voltmetre bu iki noktaya paralel bağlanır ve devreden akım çekmez." },
  { baslik: "Akım: devreden geçen miktar",
    metin: `Akım (I, birimi amper, A) bir iletkenden saniyede geçen elektrik yükünün miktarıdır. Akım ancak <b>kapalı bir devre</b> varsa akar: fazdan yüke, yükten nötre ve kaynağa geri.<br><br>Sahadaki en önemli gerçek şudur: akımı kaynak değil <b>yük belirler</b>. Prizde 230 V hazır bekler ama hiçbir şey takılı değilse akım sıfırdır. 2000 W'lık ısıtıcıyı takınca yaklaşık 8,7 A, 100 W'lık bir cihazı takınca yaklaşık 0,4 A çekilir. Sigorta da, kablo da akıma göre seçilir; çünkü ısınmayı yapan akımdır.<br><br>Akımı ölçmenin pratik yolu pens ampermetredir. Pens, iletkenin çevresindeki manyetik alanı okur; bu yüzden içine <b>yalnız bir iletken</b> almalısın. Faz ve nötrü birlikte kavrarsan gidiş ve dönüş akımları eşit ve zıt olduğu için alanlar birbirini siler, ekranda sıfıra yakın bir değer görürsün. Bu sıfır, devrede kaçak yok demektir; kaçak akım rölesi de tam bu farkı izler.`,
    sema: "",
    akilda: "Akımı yük belirler; ölçerken pense yalnız tek iletkeni al, L ve N'yi birlikte alırsan sadece kaçağı görürsün." },
  { baslik: "Direnç ve ısı: gevşek ek neden yanar",
    metin: `Direnç (R, birimi ohm, Ω) akımın geçişini zorlaştıran şeydir. Isıtıcının teli bilerek dirençlidir, çünkü işi ısı üretmektir. Kablonun, klemensin, ekin direnci ise istenmez; sıfıra yakın olmalıdır.<br><br>Üçü arasındaki bağ <b>Ohm kanunu</b>dur: <b>U = I · R</b>. Buradan I = U / R ve R = U / I çıkar. Bir noktada harcanan güç, yani ısı ise <b>P = I² · R</b>'dir. Akımın karesi olduğuna dikkat et: akım iki katına çıkınca o noktadaki ısı dört katına çıkar.<br><br>Şimdi bir klemensi düşün. Sağlam sıkılmış bir ekin direnci 0,005 Ω civarındadır; 16 A'de üzerinde 16² × 0,005 = 1,3 W ısı oluşur, hissedilmez. Vida gevşemiş, yüzey oksitlenmişse direnç 0,2 Ω'a çıkabilir: aynı 16 A'de 16² × 0,2 = 51 W. Bu, küçük bir havyanın gücü kadar ısının avuç içi kadar bir klemenste toplanması demektir. Sigorta bunu görmez, çünkü akım hâlâ 16 A'dir. Yangınların önemli bir kısmı böyle başlar.`,
    sema: `<svg viewBox="0 0 460 190"><rect width="460" height="190" fill="#ffffff"/><text x="230" y="20" fill="#1c232d" font-size="12" text-anchor="middle">Aynı 16 A, farklı ek direnci → ekteki ısı (P = I²·R)</text><line x1="60" y1="160" x2="430" y2="160" stroke="#94a3b8"/><rect x="90" y="152" width="70" height="8" fill="#15803d"/><text x="125" y="146" fill="#15803d" font-size="11" text-anchor="middle">1,3 W</text><text x="125" y="176" fill="#4b5563" font-size="10" text-anchor="middle">sağlam ek 0,005 Ω</text><rect x="195" y="134" width="70" height="26" fill="#b45309"/><text x="230" y="128" fill="#b45309" font-size="11" text-anchor="middle">5,1 W</text><text x="230" y="176" fill="#4b5563" font-size="10" text-anchor="middle">zayıf ek 0,02 Ω</text><rect x="300" y="50" width="70" height="110" fill="#b91c1c"/><text x="335" y="44" fill="#b91c1c" font-size="11" text-anchor="middle">51 W</text><text x="335" y="176" fill="#4b5563" font-size="10" text-anchor="middle">gevşek ek 0,2 Ω</text><text x="335" y="100" fill="#ffffff" font-size="10" text-anchor="middle">sigorta</text><text x="335" y="114" fill="#ffffff" font-size="10" text-anchor="middle">bunu görmez</text></svg>`,
    akilda: "Aynı akımda direnç büyüdükçe o noktadaki ısı büyür (P = I²·R); gevşek ek sigortayı attırmadan yangın çıkarabilir." }
],
ornek: {
  baslik: "Prizde 205 V: kablo mu, bozuk ek mi?",
  adimlar: [
    "Isıtıcının akımı: I = P / U = 2000 / 230 ≈ 8,7 A.",
    "Linye 30 m, 2,5 mm² bakır. Akım gidip döndüğü için iletken boyu 60 m. Bakırın özgül direnci 0,0178 Ω·mm²/m → R = 0,0178 × 60 / 2,5 ≈ 0,43 Ω.",
    "Sağlam kablodaki düşüm: ΔU = I × R = 8,7 × 0,43 ≈ 3,7 V. Prizde 226 V civarı beklenirdi.",
    "Ölçülen düşüm 230 − 205 = 25 V. Pens bu sırada 7,7 A gösterir: ısıtıcının direnci sabittir, 205 V'ta 230 V'takinden az akım çeker. Hattaki toplam direnç R = 25 / 7,7 ≈ 3,2 Ω. Kablo 0,43 Ω ise geri kalan ≈ 2,8 Ω bir ek, klemens veya priz bağlantısında.",
    "O noktadaki ısı: P = 7,7² × 2,8 ≈ 166 W. Bu bir lehim havyasından fazla; buat veya priz arkası ısınıyor demektir.",
    "Boşta 229 V görmen tuzaktır: akım yokken I × R = 0, bozuk ek kendini sadece yük altında belli eder."
  ],
  sonuc: "Enerjiyi kes, gerilim yokluğunu doğrula, linyedeki buat ve priz eklerini sırayla aç: renk değiştirmiş, erimiş veya gevşek olanı yenile. Ölçümü mutlaka yük altında tekrarla."
},
yokla: [
  { s: "Faz-nötr 230 V, nötr-PE arası 18 V ölçüyorsun. Bu ne anlatır, nereye bakarsın?", c: "Nötr hattında anormal gerilim düşümü var: gevşek ya da kopmak üzere olan nötr bağlantısı veya aşırı yüklenmiş ortak nötr. Sağlıklı tesisatta nötr-PE birkaç volttur; pano ve buatlardaki nötr bağlantılarını kontrol edersin." },
  { s: "Pense faz ve nötrü birlikte aldın, ekranda 0,02 A var. Bu ne demek?", c: "Gidiş ve dönüş akımları neredeyse eşit; devrede anlamlı bir kaçak yok. Yükün akımını görmek için tek iletkeni almalısın." },
  { s: "Hesapla: 16 A geçen iki ek var, biri 0,01 Ω, diğeri 0,2 Ω. Her birinde kaç watt ısı oluşur?", c: "P = I²·R: 256 × 0,01 = 2,56 W ve 256 × 0,2 = 51,2 W. Gevşek ekte 20 kat fazla ısı." },
  { s: "Prizde hiçbir şey takılı değilken akım neden sıfırdır, gerilim neden 230 V'tur?", c: "Gerilim kaynağın hazır tuttuğu farktır; akım ise ancak devre bir yükle kapanınca akar ve büyüklüğünü yük belirler." },
  { s: "Hesapla: 230 V'ta 1150 W çeken ısıtıcının akımı ve direnci kaçtır?", c: "I = 1150 / 230 = 5 A, R = U / I = 230 / 5 = 46 Ω." },
  { s: "Bozuk bir ek neden boşta ölçümde görünmez de yük altında görünür?", c: "Gerilim düşümü ΔU = I × R'dir; akım sıfırken düşüm de sıfırdır. Ek direnci ancak akım geçince gerilim kaybı ve ısı olarak ortaya çıkar." }
],
sahada: [
  "Yetkin ve KKD'n tamsa bir priz linyesinde gerilimi önce boşta, sonra yük altında (ör. ısıtıcı) ölç. Farkı not et; 5–6 V'u geçiyorsa ekleri kontrol listesine al.",
  "Panoda bir linyenin akımını pensle tek iletkenden ölç, linyenin sigorta değeriyle kıyasla. Sonra faz ve nötrü birlikte alıp kaçağa bak.",
  "Termal kamera veya temassız termometre varsa yüklü bir panoda klemens ve sigorta bağlantılarının sıcaklıklarını karşılaştır; komşularından belirgin sıcak olan noktayı işaretle."
],
ozet: [
  "Gerilim iki nokta arasındaki farktır; voltmetre paralel bağlanır.",
  "Akımı yük belirler; pens tek iletkeni sarar, L+N birlikte kaçağı gösterir.",
  "Ohm kanunu: U = I · R. Bir noktadaki ısı: P = I² · R.",
  "Gevşek ek sigortayı attırmaz ama ısınır; arıza yük altında ölçülerek bulunur.",
  "Linyede beklenen düşümü kablo boyu ve kesitinden hesapla; fazlası bir ekte saklanıyordur."
],
modul: [36, 1, 4]
};
