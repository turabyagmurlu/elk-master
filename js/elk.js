/* ===================== VERİ KATMANI ===================== */

const CATS = {
  temel:{n:"Temel Elektrik",c:"#33b1ff"},
  olcum:{n:"Ölçüm & Sinyal",c:"#3fb950"},
  saha:{n:"Saha & Kablaj",c:"#ffb000"},
  pano:{n:"Pano & Güç Dağıtım",c:"#a371ff"},
  yg:{n:"Yüksek Gerilim & Koruma",c:"#f85149"},
  yonetim:{n:"Yönetim & Havacılık",c:"#22b8cf"}
};

/* modül metası: id, başlık, kategori, ikon, açıklama, interaktif görev fonksiyonu (varsa) */
const MODS = [
  {id:1, t:"Elektrik Yasaları", cat:"temel", ic:"⚡", d:"Ohm kanunu, güç, seri/paralel devre.", task:null},
  {id:2, t:"Ek & Bağlantı (RJ45)", cat:"saha", ic:"🔌", d:"CAT6 renk dizilimi, soyma ölçüleri.", task:null},
  {id:3, t:"Kablo Seçimi", cat:"temel", ic:"🧵", d:"NYY/NYM/NYA/NYAF ortam eşleştirme.", task:null},
  {id:4, t:"Ölçüm Aletleri", cat:"olcum", ic:"📏", d:"Multimetre & pens ampermetre.", task:null},
  {id:5, t:"Pano Otomasyonu", cat:"pano", ic:"🎛️", d:"LDR + kontaktör ile aydınlatma.", task:null},
  {id:6, t:"Fatura Optimizasyonu", cat:"pano", ic:"💡", d:"T2→T3 yük kaydırma, kompanzasyon.", task:null},
  {id:7, t:"YG Manevrası", cat:"yg", ic:"⚠️", d:"Kesici→Ayırıcı sırası, 5 altın kural.", task:null},
  {id:8, t:"İdari Yönetim", cat:"yonetim", ic:"📋", d:"Adam-saat, metraj, hakediş.", task:null},
  {id:9, t:"Havacılık ATS", cat:"yonetim", ic:"✈️", d:"Yedek güç ≤1 sn transfer (CAT II/III).", task:null},
  {id:10, t:"YG İletim & Koruma", cat:"yg", ic:"🗼", d:"Parafudur, topraklama < 1Ω.", task:null},
  {id:11, t:"Osiloskop & PCB", cat:"olcum", ic:"📟", d:"Periyot/frekans, RMS, dağlama.", task:null},
  {id:12, t:"Birim & Ölçü Aletleri", cat:"temel", ic:"🔣", d:"Büyüklük→birim→ölçü aleti.", task:null},
  {id:13, t:"Hata Analizi", cat:"temel", ic:"➗", d:"Mutlak ve bağıl (%) hata.", task:null},
  {id:14, t:"Bobin & Reaktans", cat:"temel", ic:"🌀", d:"XL=2πfL, DA'da kısa devre.", task:null},
  {id:15, t:"Akü Kablosu Hazırlama", cat:"saha", ic:"🔋", d:"Lehim adım sırası + güvenlik.", task:null},
  {id:16, t:"Bağlantı Standartları", cat:"saha", ic:"🪢", d:"Solid/stranded, Nox, yank testi.", task:null},
  {id:17, t:"Alet Sembolleri", cat:"olcum", ic:"🔠", d:"Ölçü aleti sembolleri.", task:null},
  {id:18, t:"Güç Hesabı", cat:"olcum", ic:"🧮", d:"Tek/üç faz: P, S, Q, cosφ.", task:null},
  {id:19, t:"ADP Odası Panoları", cat:"pano", ic:"🗄️", d:"Ana dağıtım panosu, baralar.", task:null},
  {id:20, t:"Jeneratör Sistemleri", cat:"pano", ic:"🔧", d:"Dizel jeneratör, ATS, senkron.", task:null},
  {id:21, t:"Yıldırımdan Korunma", cat:"yg", ic:"🌩️", d:"Paratoner, iniş iletkeni, SPD.", task:null},
  {id:22, t:"Peyzaj Aydınlatma", cat:"saha", ic:"🌳", d:"IP65/67, yer altı besleme, fotosel.", task:null},
  {id:23, t:"Disiplinler Arası Koord.", cat:"yonetim", ic:"🤝", d:"İnşaat/mekanik/IT koordinasyonu.", task:null},
];
const modById = id => MODS.find(m=>m.id===id);
/* ===================== TEORİ (Eğitim Notu) ===================== */
const TEORI = {
1:`<b>Ohm Yasası:</b> V = I × R · buradan I = V/R, R = V/I.<br><b>Güç:</b> P = V·I = I²·R = V²/R (Watt).<br><b>Seri:</b> akım sabit, gerilim bölünür; bir eleman kopsa devre açılır.<br><b>Paralel:</b> gerilim sabit, akım bölünür; kollar bağımsızdır — bir lamba patlasa diğerleri yanar (ev tesisatı paraleldir).`,
2:`İyi ek = düşük temas direnci; gevşek ek ısınır → yangın riski. Düz/T ek için kablo <b>50 mm</b>, F (anten) konnektörde yalıtkan <b>15 mm</b> soyulur.<br><b>RJ45 T568B:</b> Turuncu-Beyaz, Turuncu, Yeşil-Beyaz, Mavi, Mavi-Beyaz, Yeşil, Kahverengi-Beyaz, Kahverengi. Çift bükümlü teller paraziti (EMI) bastırır.`,
3:`Kablo ortama göre seçilir:<br>• <b>NYA</b> tek telli, sabit pano içi · • <b>NYAF</b> çok telli/esnek, titreşimli motor · • <b>NYM</b> nemli sıva altı · • <b>NYY</b> yer altı.<br>Kesit (mm²) taşınacak akıma göre seçilir; ince kesit + yüksek akım = aşırı ısınma.`,
4:`<b>Ampermetre:</b> SERİ bağlanır, iç direnci çok düşüktür (≈0–1 Ω).<br><b>Voltmetre:</b> PARALEL bağlanır, iç direnci çok yüksektir.<br><b>Pens ampermetre:</b> manyetik alanı okur; içine yalnız TEK hat (faz) alınır. Faz+nötr birlikte alınırsa ekran 0 A gösterir.`,
5:`<b>LDR</b> aydınlıkta düşük, karanlıkta yüksek dirençlidir (ışık sensörü). <b>Kontaktör</b> küçük kumanda akımıyla büyük yükü anahtarlar. Karanlık → LDR sinyali → kontaktör çeker → lambalar yanar (akşam ≈19:00 otomatik).`,
6:`Üç zamanlı tarife: <b>T1 gündüz</b> (orta), <b>T2 puant 17–22</b> (en pahalı), <b>T3 gece 22–06</b> (en ucuz). Yüksek güçlü ertelenebilir yükleri T3'e kaydırmak faturayı düşürür. Düşük cosφ → reaktif ceza → kompanzasyon.`,
7:`<b>Kesici</b> yük akımını güvenle keser (ark hazneli). <b>Ayırıcı</b> yalnız görünür ayrım sağlar; yük altında AÇILAMAZ (ark patlaması). Açma sırası: önce Kesici → sonra Ayırıcı. Kapama: tersi. Gerilim ıstanka/neon ile kontrol edilir.`,
8:`<b>Adam-saat = işçi × saat.</b> <b>Metraj</b> yapılan işin ölçümü. <b>Hakediş = metraj × birim fiyat.</b> Şef puantaj tutar, metraj çıkarır, hakedişi müşavire sunar.`,
9:`<b>ATS</b> şebeke↔jeneratör otomatik geçiş yapar; <b>UPS</b> aradaki boşluğu köprüler. Havaalanı CAT II/III pist ışıkları kritik yüktür: transfer süresi <b>≤ 1 saniye</b> olmalı, yoksa pilot pas geçer.`,
10:`<b>Parafudur</b> aşırı gerilimi toprağa akıtıp trafoyu korur. Topraklama direnci ne kadar düşük olursa o kadar etkilidir; hedef <b>R &lt; 1 Ω</b> (bakır kazıklarla). Hava hatlarına helikopter ikaz küreleri asılır.`,
11:`Saykıl=bir tam dalga; Periyot T; Frekans <b>f = 1/T</b>. Osiloskop dalga şeklini gösterir ve <b>maksimum</b> değeri okutur; <b>Vrms = Vmax/√2</b>. PCB dağlama: 1 Perhidrol + 3 Tuz Ruhu, 5–10 dk.`,
12:`Her elektriksel büyüklüğün birimi ve ölçü aleti vardır: Akım→Amper→Ampermetre, Gerilim→Volt→Voltmetre, Direnç→Ohm→Ohmmetre, Frekans→Hertz→Frekansmetre, Güç→Watt→Wattmetre, Endüktans→Henry→LCRmetre.`,
13:`<b>Mutlak hata:</b> ΔX=|Xg−X|. <b>Bağıl hata:</b> ε=ΔX/Xg (×100 ile %). Örn. Xg=220, X=216 → ΔX=4, ε=%1,82. Alet sınıfı izin verilen maksimum hatayı belirtir.`,
14:`<b>XL = 2·π·f·L</b> (endüktif reaktans). DA'da f=0 → XL=0 → bobin kısa devre gibi davranır. Kapasitif: XC=1/(2πfC); DA'da XC→∞ (kondansatör açık devre).`,
15:`Akü kablosu sonlandırma sırası: Oksidasyon temizliği → İzolasyon soyma → Krimp → Lehim (sadece ucu ısıt) → Makaron. Yeşil alev=bakır oksitlendi (dur). Flux abartılmaz (asidik). Makaron kötü bağlantıyı gizlemek için kullanılmaz.`,
16:`Titreşimli yerde <b>stranded</b> (çok telli) zorunlu; solid kırılır. Ringing (yüzük atma) iletkeni zayıflatır. Farklı metaller korozyona uğrar → <b>Nox</b> pasta. Dış mekânda yüksük yukarı (shed water). Teller saat yönü bükülür. Yank testi yapılır.`,
17:`Semboller: <b>~</b> AC, <b>—</b> DC; <b>⊥</b> dik, <b>⊓</b> yatay, <b>∠60°</b> eğik kullanım; yıldız içinde rakam = yalıtkanlık deneyi kV'si; üçgen içinde (!) = dikkat/teknik dokümana bak.`,
18:`Tek faz P=V·I·cosφ. Üç faz: S=√3·U·I (kVA), P=√3·U·I·cosφ (kW), Q=√3·U·I·sinφ (kVAR). S²=P²+Q², cosφ=P/S. Düşük cosφ kondansatörle (kompanzasyon) düzeltilir.`,
19:`<b>ADP</b> (Ana Dağıtım Panosu) binanın elektrik merkezi. Hiyerarşi: Ana pano → tali panolar → kat/mahal panoları. İçinde: ana şalter, bara (busbar), sigorta/otomat, kontaktör, parafudur, ölçü, kompanzasyon, topraklama barası. Ortama göre IP sınıfı.`,
20:`Dizel jeneratör = motor + alternatör. Şebeke kesilince <b>ATS</b> jeneratöre geçer. Bileşen: günlük yakıt tankı, marş aküsü, radyatör, egzoz, yağlama. Standby=acil, Prime=sürekli. Paralel çalışma için senkronizasyon.`,
21:`3 katman: (1) Yakalama ucu (Franklin/aktif paratoner), (2) İniş iletkeni (kısa/düz bakır), (3) düşük dirençli topraklama (hedef R&lt;1 Ω). İç koruma: parafudur (SPD Tip 1/2/3) + eşpotansiyel baralama. Geniş yapıda Faraday kafesi.`,
22:`Dış mekân armatürü IP65/IP67, kablo UV dayanımlı. Besleme yer altından NYY ile ~60 cm derine, ikaz bandıyla. Kumanda: fotosel + zaman saati. Güvenlik için alçak gerilim (12/24 V) bahçe sistemleri. Topraklama Sınıf I veya çift yalıtım Sınıf II.`,
23:`Elektrik ekibi: İnşaatla (beton öncesi sleeve/ankraj), mekanikle (tava↔kanal çakışması/clash), mimariyle (armatür yerleşimi), IT/zayıf akımla (EMI için ayrı tava), asansör/yangınla (ayrı besleme) koordine olur. Ortak teknik galeri + BIM clash detection.`,
};
/* ===================== FÖY (Detaylı Anlatım) ===================== */
const FOY = {
1:`<b>Özet:</b> Ohm yasası devrenin temelidir: <b>V = I × R</b>.<br><b>Güç:</b> P = V·I = I²·R = V²/R. Örnek: V=12 V, R=6 Ω → I=2 A, P=24 W.<br><b>Seri:</b> R<sub>top</sub>=R1+R2+… · akım aynı · gerilim bölünür · biri kopar→tümü söner.<br><b>Paralel:</b> 1/R<sub>top</sub>=1/R1+1/R2+… · gerilim aynı · akım bölünür · biri arızalansa diğerleri çalışır.<br><b>Sık hata:</b> Ampermetreyi paralel bağlamak kısa devre yapar.`,
2:`<b>Özet:</b> İyi ek = düşük temas direnci; gevşek ek ısınır→yangın.<br><b>Soyma:</b> düz/T ek 50 mm, F konnektör 15 mm.<br><b>T568B:</b> Tu-Beyaz·Turuncu·Ye-Beyaz·Mavi·Mavi-Beyaz·Yeşil·Ka-Beyaz·Kahverengi.<br><b>İpucu:</b> İki uç da B → düz kablo; A-B → çapraz. Çift büküm EMI bastırır.<br><b>Yank testi:</b> her teli çek, oynayan varsa yeniden yap.`,
3:`<b>Özet:</b> Kablo ortama+mekanik şarta göre seçilir.<br>• NYA: tek tel, sabit pano/boru · • NYAF: çok tel, esnek, motor · • NYM: nemli sıva altı · • NYY: yer altı.<br><b>Harf:</b> N=standart, Y=PVC, A=tek tel, F=ince çok tel, M=antigron.<br><b>Kesit:</b> akıma göre; ince kesit+yüksek akım = ısınma+gerilim düşümü.`,
4:`<b>Özet:</b> Doğru bağlantı = doğru ölçüm.<br><b>Ampermetre:</b> SERİ, düşük iç direnç (≈0–1 Ω); paralelde kısa devre.<br><b>Voltmetre:</b> PARALEL, yüksek iç direnç.<br><b>Ohmmetre:</b> devre enerjisiz; büyük dirençte iki probu birden elleme.<br><b>Pens:</b> tek hat (faz); faz+nötr=0 A.`,
5:`<b>Özet:</b> Otomatik aydınlatma LDR+kontaktör.<br><b>LDR:</b> karanlıkta yüksek dirençli, ışığı okur.<br><b>Kontaktör:</b> bobin (A1-A2) + ana kontaklar; küçük sinyalle büyük yük.<br><b>Çalışma:</b> karanlık→bobin enerjilenir→kontak kapanır→lamba yanar.<br><b>Hata:</b> mantığı ters kurmak (gündüz yakmak).`,
6:`<b>Özet:</b> Üç zamanlı sayaç.<br>T1 (06–17) orta · T2 (17–22) EN PAHALI · T3 (22–06) EN UCUZ.<br><b>Yük kaydırma:</b> fırın/pompa/ısıtıcı gece (T3).<br><b>Reaktif:</b> düşük cosφ → ceza → kompanzasyon panosu (kondansatör).<br><b>Pratik:</b> zaman saatli programlı çalıştırma.`,
7:`<b>Özet (ölümcül kural):</b> Kesici yük akımını keser; Ayırıcı yük altında AÇILMAZ.<br><b>Açma:</b> önce KESİCİ → sonra AYIRICI. <b>Kapama:</b> tersi.<br><b>5 altın kural:</b> 1) enerjiyi kes 2) tekrar kapanmayı önle (kilit/etiket) 3) gerilimsizliği doğrula 4) toprakla+kısa devre et 5) komşu gerilimli kısımları yalıt.`,
8:`<b>Özet:</b> Şef işçilik+işi takip eder.<br><b>Adam-saat = işçi × saat.</b> Örn. 10×9 = 90.<br><b>Metraj:</b> yapılan işin ölçümü.<br><b>Hakediş = metraj × birim fiyat.</b> Örn. 250 m × 40 TL = 10.000 TL.<br><b>Belge:</b> puantaj, yeşil defter (metraj), hakediş raporu.`,
9:`<b>Özet:</b> Kritik tesiste kesinti kabul edilmez.<br><b>ATS:</b> şebeke↔jeneratör otomatik geçiş.<br><b>UPS:</b> jeneratör gelene kadar kesintisiz köprü (online ≈0 geçiş).<br><b>CAT II/III:</b> pist ışıkları kritik; transfer ≤ 1 sn yoksa pas geçilir.<br><b>Kademe:</b> şebeke→UPS (anlık)→jeneratör (saniyeler).`,
10:`<b>Özet:</b> YG'de aşırı gerilim + topraklama kritik.<br><b>Parafudur:</b> aşırı gerilimi toprağa akıtır.<br><b>Topraklama:</b> düşük direnç şart; ≥1 Ω parafuduru etkisizleştirir → hedef R&lt;1 Ω (bakır kazık, eşpotansiyel, bentonit).<br><b>İkaz küreleri:</b> hava hattında uçak/helikopter uyarısı.`,
11:`<b>Özet:</b> AC işaret ve ölçümü.<br><b>Tanım:</b> saykıl, periyot T, <b>f=1/T</b>. T=20 ms→f=50 Hz.<br><b>Osiloskop:</b> TEPE değeri okutur; <b>Vrms=Vmax/√2</b>, Vpp=2·Vmax.<br><b>PCB dağlama:</b> 1 Perhidrol + 3 Tuz Ruhu, 5–10 dk. Az süre→bakır kalır, çok süre→yol aşınır.`,
12:`<b>Büyüklük / Birim / Alet:</b><br>I→Amper→Ampermetre · V→Volt→Voltmetre · R→Ohm(Ω)→Ohmmetre · f→Hertz→Frekansmetre · P→Watt→Wattmetre · Q→Var→Varmetre · L→Henry→LCRmetre · C→Farad→LCRmetre · cosφ→Kosinüsfimetre.`,
13:`<b>Mutlak:</b> ΔX=|Xg−X|. <b>Bağıl:</b> ε=ΔX/Xg×100.<br>Örn. Xg=220, X=216 → ΔX=4, ε=%1,82.<br><b>Alet sınıfı:</b> tam skalaya göre izinli maks. hata (örn. 1,5 → ±%1,5).<br><b>İpucu:</b> bağıl hata ölçümün kalitesini daha iyi anlatır.`,
14:`<b>X<sub>L</sub> = 2πfL.</b> Frekans artarsa XL artar.<br><b>DA:</b> f=0 → XL=0 → bobin kısa devre.<br><b>Kapasitif:</b> X<sub>C</sub>=1/(2πfC); DA'da XC→∞ (açık devre).<br><b>İpucu:</b> bobin DA'yı geçirir/AC'yi zorlar; kondansatör tersi.`,
15:`<b>Sıra:</b> Oksidasyon temizliği (½" kes) → soyma → krimp → lehim (sadece ucu ısıt) → makaron.<br><b>Yeşil alev:</b> bakır oksitlendi, DUR.<br><b>Flux:</b> abartma — asidik, kalırsa korozyon.<br><b>Makaron:</b> kötü bağlantıyı gizlemek için DEĞİL, koruma için.`,
16:`• Titreşimde stranded zorunlu.<br>• Ringing (yüzük) iletkeni zayıflatır.<br>• Nox: bakır-nikel-çinko korozyonunu önler.<br>• Shed water: yüksük yukarı baksın.<br>• Saat yönü büküm → sıkı bağlantı.<br>• Yank testi: her teli çek.`,
17:`• ~ AC · — DC · ikisi birlikte = DC+AC.<br>• ⊥ dik · ⊓ yatay · ∠60° eğik kullanım.<br>• Yıldız+rakam = yalıtkanlık deneyi kV'si; içi boş 5 köşeli yıldız = 500 V muayene.<br>• Üçgen içinde (!) = dikkat, dokümana bak.`,
18:`<b>Güç üçgeni:</b> S²=P²+Q².<br>Tek faz P=V·I·cosφ. Üç faz: S=√3·U·I, P=√3·U·I·cosφ, Q=√3·U·I·sinφ.<br>Örn. U=380, I=10, cosφ=1 → P=1,732·380·10=6.581 W≈6,58 kW.<br><b>cosφ=P/S;</b> düşükse fazla akım çekilir (kayıp+ceza) → kompanzasyon.`,
19:`<b>ADP:</b> binanın elektrik kalbi.<br><b>Hiyerarşi:</b> giriş→Ana pano→tali→kat/mahal panoları.<br><b>İçi:</b> ana şalter, bara, sigorta/otomat, kontaktör, SPD, ölçü, kompanzasyon, topraklama barası.<br><b>IP:</b> 1. rakam toz, 2. rakam su (örn. IP54).<br><b>Pratik:</b> etiketleme, faz dengesi, kısa devre dayanımı (Icw).`,
20:`<b>Jeneratör=motor+alternatör.</b><br>Şebeke kesilir→ATS→marş→devreye girer→şebeke gelince geri transfer.<br>Bileşen: günlük yakıt tankı, akü, radyatör, egzoz, yağlama, kontrol.<br>Standby=acil, Prime=sürekli.<br>Paralel için senkron (V, f, faz). Periyodik yük testi.`,
21:`<b>3 katman:</b> 1) yakalama ucu (Franklin/aktif ESE) 2) iniş iletkeni (kısa/düz, keskin dönüşsüz) 3) topraklama (R&lt;1 Ω).<br><b>SPD:</b> Tip 1 (ana giriş), Tip 2 (tali), Tip 3 (cihaz yanı) + eşpotansiyel baralama.<br><b>Faraday kafesi:</b> geniş yapıda örgü koruma.`,
22:`<b>Koruma:</b> armatür IP65/67, kablo UV dayanımlı; topraklama Sınıf I veya çift yalıtım Sınıf II.<br><b>Besleme:</b> NYY yer altı, ~60 cm + ikaz bandı.<br><b>Kumanda:</b> fotosel + zaman saati.<br><b>Güvenlik:</b> ıslak/dekoratifte 12/24 V.<br><b>Armatür:</b> projektör, gömme spot, bollard, RGB.`,
23:`• <b>İnşaat:</b> beton ÖNCESİ sleeve/ankraj bırak.<br>• <b>Mekanik:</b> tava↔kanal çakışması (clash) önle, kot paylaş.<br>• <b>Mimari:</b> armatür/priz tavan planına uyar.<br>• <b>IT:</b> veri kabloları güçten ayrı tava/mesafe (EMI).<br>• <b>Asansör/yangın:</b> ayrı besleme.<br>• <b>Araç:</b> ortak galeri/şaft + BIM clash detection + koordinasyon toplantısı.`,
};
/* ===================== SORU BANKASI (1-12) ===================== */
var QBANK = {
1:[
 {q:"V=24 V, R=8 Ω ise akım kaç A?",opts:["2 A","3 A","4 A","6 A"],ans:1,ex:"I = V/R = 24/8 = 3 A."},
 {q:"P = V × I bağıntısında P'nin birimi?",opts:["Volt","Amper","Watt","Ohm"],ans:2,ex:"Güç Watt (W) ile ifade edilir."},
 {q:"Paralel devrede bir lamba patlarsa diğerleri ne olur?",opts:["Hepsi söner","Yanmaya devam eder","Daha parlak yanar ve patlar","Akım sıfırlanır"],ans:1,ex:"Paralel kollar bağımsızdır; biri arızalansa diğerleri çalışır."},
 {q:"Seri devrede sabit kalan büyüklük?",opts:["Akım","Gerilim","Güç","Direnç"],ans:0,ex:"Seri devrede akım her elemandan aynı geçer; gerilim bölünür."},
 {q:"R=10 Ω, I=2 A ise harcanan güç (P=I²R)?",opts:["20 W","40 W","80 W","100 W"],ans:1,ex:"P = I²·R = 2²·10 = 40 W."},
 {q:"Ev tesisatı neden paralel bağlanır?",opts:["Daha ucuz olduğu için","Her cihaz aynı gerilimi görüp bağımsız çalışsın diye","Akım artsın diye","Kablo azalsın diye"],ans:1,ex:"Paralelde her cihaz aynı 230 V'u görür ve bağımsız çalışır."}
],
2:[
 {q:"Düz/T ek için kablo ne kadar soyulur?",opts:["15 mm","25 mm","50 mm","100 mm"],ans:2,ex:"Düz ve T ek için 50 mm (5 cm) soyulur."},
 {q:"F (anten) konnektörde yalıtkan ne kadar soyulur?",opts:["5 mm","15 mm","30 mm","50 mm"],ans:1,ex:"Koaksiyel F konnektörde yalıtkan 15 mm soyulur."},
 {q:"T568B sırasında 1. kablo rengi?",opts:["Turuncu","Turuncu-Beyaz","Yeşil-Beyaz","Mavi"],ans:1,ex:"T568B: Turuncu-Beyaz ile başlar."},
 {q:"Gevşek/kötü ekin en büyük riski?",opts:["Renk solması","Isınma ve yangın","Kablonun uzaması","Hız kaybı"],ans:1,ex:"Yüksek temas direnci ısınmaya ve yangına yol açar."},
 {q:"İki ucu da T568B olan kablo türü?",opts:["Çapraz kablo","Düz kablo","Koaksiyel","Topraklama"],ans:1,ex:"Her iki uç aynı standartta ise düz (straight) kablodur."},
 {q:"Ağ kablosunda çift bükümün amacı?",opts:["Görsellik","Parazit (EMI) bastırma","Maliyet","Uzatma"],ans:1,ex:"Çift bükümlü teller elektromanyetik paraziti bastırır."}
],
3:[
 {q:"Yeraltı (toprak altı) tesisat için uygun kablo?",opts:["NYA","NYM","NYY","NYAF"],ans:2,ex:"NYY yer altı için mekanik dayanımlı kablodur."},
 {q:"Titreşimli motor bağlantısı için uygun kablo?",opts:["NYA","NYAF","NYY","NYM"],ans:1,ex:"NYAF çok telli/esnektir, titreşime dayanır."},
 {q:"Nemli sıva altı iç mekan için?",opts:["NYM (antigron)","NYY","NYA","NYAF"],ans:0,ex:"NYM (antigron) nemli sıva altı ortam içindir."},
 {q:"Sabit pano içi sert tek telli kablo?",opts:["NYAF","NYA","NYY","NYM"],ans:1,ex:"NYA tek telli, sabit pano/boru içi kullanılır."},
 {q:"Kablo kesiti (mm²) neye göre seçilir?",opts:["Renge","Taşınacak akıma","Marka","Uzunluğa hiç bakılmaz"],ans:1,ex:"Kesit taşınacak akıma göre seçilir; aksi halde ısınır."},
 {q:"İnce kesit + yüksek akım sonucu?",opts:["Sorun olmaz","Aşırı ısınma ve gerilim düşümü","Akım azalır","Direnç sıfırlanır"],ans:1,ex:"Yetersiz kesit ısınma ve gerilim düşümüne yol açar."}
],
4:[
 {q:"Ampermetre devreye nasıl bağlanır?",opts:["Seri","Paralel","Çapraz","Toprağa"],ans:0,ex:"Ampermetre seri bağlanır; iç direnci çok düşüktür."},
 {q:"Voltmetre devreye nasıl bağlanır?",opts:["Seri","Paralel","Toprağa","Fark etmez"],ans:1,ex:"Voltmetre paralel bağlanır; iç direnci çok yüksektir."},
 {q:"Pens ampermetre içine ne alınır?",opts:["Faz + nötr birlikte","Sadece tek hat (faz)","Toprak hattı","Üç faz birden"],ans:1,ex:"Tek hat alınır; faz+nötr birlikte 0 A okutur."},
 {q:"Direnç (ohmmetre) ölçümünde devre nasıl olmalı?",opts:["Enerjili","Enerjisiz","Yarı yüklü","Kısa devre"],ans:1,ex:"Ohm ölçümü devre enerjisizken yapılır."},
 {q:"Ampermetrenin iç direnci nasıldır?",opts:["Çok yüksek","Çok düşük (≈0–1 Ω)","Sonsuz","Negatif"],ans:1,ex:"Devreyi etkilememesi için çok düşüktür."},
 {q:"Pens ampermetreye faz+nötr birlikte alınırsa ekran?",opts:["İki katı gösterir","0 A gösterir","Yanar","Değişmez"],ans:1,ex:"Zıt yönlü alanlar birbirini götürür → 0 A."}
],
5:[
 {q:"LDR'nin direnci karanlıkta nasıldır?",opts:["Düşük","Yüksek","Sıfır","Değişmez"],ans:1,ex:"LDR karanlıkta yüksek dirençlidir."},
 {q:"Büyük yükü küçük sinyalle anahtarlayan eleman?",opts:["Direnç","Kontaktör","Sigorta","Kondansatör"],ans:1,ex:"Kontaktör bobiniyle büyük gücü anahtarlar."},
 {q:"Çevre aydınlatması ne zaman yanmalı?",opts:["Gündüz","Karanlıkta (akşam)","Sürekli","Hiç"],ans:1,ex:"Otomatik aydınlatma karanlıkta devreye girer."},
 {q:"Kontaktör hangi parçayla çeker?",opts:["Ana kontak","Bobin (A1-A2)","Sigorta","Klemens"],ans:1,ex:"Bobin enerjilenince kontaklar kapanır."},
 {q:"Akşam ~19:00'da sistem ne yapmalı?",opts:["Lambaları söndürmeli","Kontaktör çekip lambaları yakmalı","Hiçbir şey","Sigortayı atmalı"],ans:1,ex:"Karanlık algılanır, kontaktör çeker, lambalar yanar."},
 {q:"Kontaktör hangi cihaza benzer ama yüksek akım içindir?",opts:["Röle","Direnç","Diyot","Trafo"],ans:0,ex:"Kontaktör röleye benzer; büyük güç yükleri içindir."}
],
6:[
 {q:"Üç zamanlı tarifede en pahalı dilim?",opts:["T1 gündüz","T2 puant","T3 gece","Hepsi eşit"],ans:1,ex:"T2 (puant, 17–22) en pahalı dilimdir."},
 {q:"En ucuz dilim hangisidir?",opts:["T1","T2","T3 gece","Fark etmez"],ans:2,ex:"T3 (gece, 22–06) en ucuz dilimdir."},
 {q:"Yüksek güçlü yükler hangi dilime kaydırılmalı?",opts:["T2","T3 gece","T1","Kaydırılmaz"],ans:1,ex:"Ertelenebilir büyük yükler ucuz T3 dilimine alınır."},
 {q:"Düşük güç faktörü (cosφ) sanayide neye yol açar?",opts:["İndirim","Reaktif ceza","Daha az akım","Hiçbir şey"],ans:1,ex:"Düşük cosφ reaktif güç cezası doğurur."},
 {q:"Reaktif gücü düzelten yöntem?",opts:["Kompanzasyon (kondansatör)","Sigorta büyütme","Kablo kısaltma","Topraklama"],ans:0,ex:"Kompanzasyon panosu (kondansatör) cosφ'yi düzeltir."},
 {q:"T2 puant dilimi yaklaşık hangi saatler?",opts:["22–06","06–17","17–22","00–06"],ans:2,ex:"Puant genelde akşam 17–22 arasıdır."}
],
7:[
 {q:"Yük akımını güvenle kesebilen cihaz?",opts:["Ayırıcı","Kesici","Sigorta yuvası","Klemens"],ans:1,ex:"Kesici ark söndürme hazneli olup yük akımını keser."},
 {q:"Yük altında AÇILMAMASI gereken cihaz?",opts:["Kesici","Ayırıcı","Röle","Kontaktör"],ans:1,ex:"Ayırıcı yük altında açılırsa ark patlaması olur."},
 {q:"Doğru açma (enerji kesme) sırası?",opts:["Önce Ayırıcı sonra Kesici","Önce Kesici sonra Ayırıcı","Aynı anda","Sırası önemsiz"],ans:1,ex:"Önce Kesici, sonra Ayırıcı açılır."},
 {q:"Enerji verme (kapama) sırası?",opts:["Önce Ayırıcı sonra Kesici","Önce Kesici sonra Ayırıcı","Sadece Kesici","Sadece Ayırıcı"],ans:0,ex:"Kapamada tersine: önce Ayırıcı, sonra Kesici."},
 {q:"Gerilim olup olmadığını kontrol için?",opts:["El ile dokunarak","Neon lambalı ıstanka","Koklayarak","Tahminle"],ans:1,ex:"Gerilim ıstanka/neon ile kontrol edilir."},
 {q:"İşçi güvenliğinde 5 altın kuralın ilki?",opts:["Toprakla","Enerjiyi kes","Yalıt","Etiketle"],ans:1,ex:"Önce enerji kesilir; ardından kilitle/etiketle vb."}
],
8:[
 {q:"10 işçi 9 saat çalıştı. Adam-saat?",opts:["19","90","109","900"],ans:1,ex:"Adam-saat = 10 × 9 = 90."},
 {q:"Hakediş nasıl hesaplanır?",opts:["İşçi × saat","Metraj × birim fiyat","Sadece metraj","Sadece fiyat"],ans:1,ex:"Hakediş = metraj × birim fiyat."},
 {q:"250 m kablo, 40 TL/m. Hakediş?",opts:["2.900 TL","6.250 TL","10.000 TL","12.500 TL"],ans:2,ex:"250 × 40 = 10.000 TL."},
 {q:"Metraj nedir?",opts:["İşçi sayısı","Yapılan işin ölçülmesi","Maliyet","Saatlik ücret"],ans:1,ex:"Metraj, yapılan işin (örn. kablo uzunluğu) ölçümüdür."},
 {q:"Puantaj defteri neyi tutar?",opts:["Malzeme fiyatı","İşçi çalışma saatleri","Hava durumu","Metraj"],ans:1,ex:"Puantaj işçi çalışma saatlerinin kaydıdır."},
 {q:"Hakediş kime sunulur?",opts:["İşçiye","Müşavire/işverene","Tedarikçiye","Hiç kimseye"],ans:1,ex:"Hakediş müşavire/işverene sunulur."}
],
9:[
 {q:"Şebeke↔jeneratör otomatik geçişi yapan cihaz?",opts:["UPS","ATS","LDR","SPD"],ans:1,ex:"ATS (Otomatik Transfer Şalteri) geçişi yapar."},
 {q:"Jeneratör gelene kadar kesintisiz köprüleyen?",opts:["UPS","ATS","Kontaktör","Sigorta"],ans:0,ex:"UPS aradaki boşluğu kesintisiz köprüler."},
 {q:"CAT II/III pist ışıklarında transfer süresi?",opts:["≤ 1 saniye","≤ 10 saniye","1 dakika","Önemli değil"],ans:0,ex:"Pist ışıkları için transfer ≤ 1 sn olmalı."},
 {q:"Transfer 1 sn'yi aşarsa ne olur?",opts:["Sorun olmaz","Pilot pas geçer","Daha iyi olur","Jeneratör durur"],ans:1,ex:"Pist kararır, pilot pas geçer; görev başarısız."},
 {q:"Pist ışıkları nasıl yük sınıfındadır?",opts:["Önemsiz","Kritik yük","Aydınlatma dışı","Reaktif"],ans:1,ex:"Pist ışıkları kritik yüktür, kesinti kabul edilmez."},
 {q:"Online UPS'in geçiş süresi yaklaşık?",opts:["Sıfıra yakın","5 sn","30 sn","2 dk"],ans:0,ex:"Online UPS'te geçiş pratikte ≈0'dır."}
],
10:[
 {q:"Aşırı gerilimi toprağa akıtıp trafoyu koruyan eleman?",opts:["Sigorta","Parafudur","Sayaç","Kontaktör"],ans:1,ex:"Parafudur (surge arrester) aşırı gerilimi toprağa akıtır."},
 {q:"Yıldırım topraklamasında hedef direnç?",opts:["Yüksek","R < 1 Ω","10 kΩ","Önemsiz"],ans:1,ex:"Hassas tesiste hedef R < 1 Ω'dur."},
 {q:"Topraklama direnci nasıl düşürülür?",opts:["Kablo inceltilir","Ek bakır kazık çakılır","Sigorta büyütülür","Boya atılır"],ans:1,ex:"Ek bakır kazık/çubuk ve eşpotansiyel ile düşürülür."},
 {q:"Hava hattındaki turuncu küreler ne işe yarar?",opts:["Süs","Helikopter/uçak uyarısı","İzolasyon","Topraklama"],ans:1,ex:"İkaz küreleri hava aracı çarpmasını önler."},
 {q:"Topraklama direnci yüksekse parafudur ne yapar?",opts:["Daha iyi çalışır","Görev yapamaz","Patlar","Fark etmez"],ans:1,ex:"Yüksek direnç parafudurun işini yapmasını engeller."},
 {q:"Şalt sahasının gerilim seviyesi örneği?",opts:["12 V","220 V","154 kV","1.5 V"],ans:2,ex:"Örnekte 154 kV YG şalt sahası ele alınır."}
],
11:[
 {q:"T = 20 ms ise frekans (f=1/T)?",opts:["20 Hz","50 Hz","100 Hz","500 Hz"],ans:1,ex:"f = 1/0,02 s = 50 Hz."},
 {q:"Osiloskop hangi değeri gösterir?",opts:["Etkin (RMS)","Maksimum (tepe)","Ortalama","Sıfır"],ans:1,ex:"Osiloskop tepe (maksimum) değeri okutur."},
 {q:"Vmax=100 V ise Vrms (=Vmax/√2)?",opts:["50 V","≈70,7 V","100 V","141 V"],ans:1,ex:"Vrms = 100/√2 ≈ 70,7 V."},
 {q:"Bir saykıl nedir?",opts:["Yarım dalga","Bir tam dalga","İki dalga","Sabit değer"],ans:1,ex:"Saykıl bir tam dalgadır (pozitif+negatif alternans)."},
 {q:"PCB dağlamada doğru oran?",opts:["3 Perhidrol + 1 Tuz Ruhu","1 Perhidrol + 3 Tuz Ruhu","1 + 1","Sadece su"],ans:1,ex:"1 ölçek Perhidrol + 3 ölçek Tuz Ruhu."},
 {q:"PCB banyosu çok uzun sürerse?",opts:["Bakır kalır","Devre yolları aşınır/plaket yanar","Hiçbir şey","Bakır artar"],ans:1,ex:"Aşırı süre yolları aşındırır; 5–10 dk idealdir."}
],
12:[
 {q:"Akımın birimi ve ölçü aleti?",opts:["Volt — Voltmetre","Amper — Ampermetre","Watt — Wattmetre","Ohm — Ohmmetre"],ans:1,ex:"Akım: Amper (A), Ampermetre ile ölçülür."},
 {q:"Direnç birimi ve aleti?",opts:["Ohm — Ohmmetre","Farad — LCRmetre","Hertz — Frekansmetre","Var — Varmetre"],ans:0,ex:"Direnç: Ohm (Ω), Ohmmetre."},
 {q:"Frekansın birimi?",opts:["Joule","Hertz","Var","Henry"],ans:1,ex:"Frekans Hertz (Hz) ile ifade edilir."},
 {q:"Endüktans (L) birimi ve aleti?",opts:["Farad — LCRmetre","Henry — LCRmetre","Watt — Wattmetre","Volt — Voltmetre"],ans:1,ex:"Endüktans: Henry (H), LCRmetre."},
 {q:"Reaktif gücün birimi?",opts:["Watt","Var","Joule","Hertz"],ans:1,ex:"Reaktif güç Var ile ifade edilir."},
 {q:"Güç faktörünü ölçen alet?",opts:["Wattmetre","Kosinüsfimetre","Frekansmetre","Sayaç"],ans:1,ex:"cosφ Kosinüsfimetre ile ölçülür."}
]
};
/* ===================== SORU BANKASI (13-23) ===================== */
Object.assign(QBANK, {
13:[
 {q:"Mutlak hata nasıl bulunur?",opts:["Xg + X","|Xg − X|","Xg × X","Xg / X"],ans:1,ex:"Mutlak hata ΔX = |Xg − X| (gerçek − ölçülen)."},
 {q:"Bağıl hata formülü?",opts:["ΔX × Xg","ΔX / Xg","Xg / ΔX","ΔX − Xg"],ans:1,ex:"Bağıl hata ε = ΔX / Xg (×100 ile %)."},
 {q:"Xg=200, X=196 → mutlak hata?",opts:["2","4","6","8"],ans:1,ex:"ΔX = |200−196| = 4."},
 {q:"Xg=200, X=196 → bağıl hata (%)?",opts:["%1","%2","%4","%8"],ans:1,ex:"ε = 4/200 = 0,02 = %2."},
 {q:"Alet sınıfı (doğruluk) neyi belirtir?",opts:["Rengini","İzin verilen maksimum hatayı","Ağırlığını","Markasını"],ans:1,ex:"Sınıf, tam skalaya göre izinli maks. hatayı belirtir."},
 {q:"Hangi hata ölçümün kalitesini daha iyi anlatır?",opts:["Mutlak hata","Bağıl hata","İkisi de aynı","Hiçbiri"],ans:1,ex:"Bağıl (yüzde) hata kaliteyi daha iyi yansıtır."}
],
14:[
 {q:"Endüktif reaktans formülü?",opts:["XL = 2πfL","XL = 1/(2πfL)","XL = R·L","XL = f/L"],ans:0,ex:"XL = 2·π·f·L."},
 {q:"DA'da (f=0) bobinin reaktansı?",opts:["Sonsuz","Sıfır","1 Ω","Negatif"],ans:1,ex:"f=0 → XL=0; bobin kısa devre gibi davranır."},
 {q:"Frekans artarsa XL nasıl değişir?",opts:["Artar","Azalır","Değişmez","Sıfırlanır"],ans:0,ex:"XL frekansla doğru orantılıdır, artar."},
 {q:"Kapasitif reaktans formülü?",opts:["XC = 2πfC","XC = 1/(2πfC)","XC = R/C","XC = fC"],ans:1,ex:"XC = 1/(2πfC); frekans artarsa azalır."},
 {q:"Kondansatör DA'da nasıl davranır?",opts:["Kısa devre","Açık devre","Direnç","Bobin gibi"],ans:1,ex:"DA'da XC→∞; kondansatör açık devredir."},
 {q:"Bobin hangi akımı zorlar?",opts:["DA'yı","AA'yı (yüksek frekansı)","Hiçbirini","Sadece sabit"],ans:1,ex:"Bobin AA'ya zorluk gösterir, DA'yı geçirir."}
],
15:[
 {q:"Akü kablosu hazırlamada ilk adım?",opts:["Lehim","Makaron","Oksidasyon temizliği","Krimp"],ans:2,ex:"Önce uçtaki oksitli bakır kesilir (½\")."},
 {q:"Isıtmada yeşil alev neyi gösterir?",opts:["Lehim hazır","Bakır oksitlendi (dur)","Doğru sıcaklık","Flux bitti"],ans:1,ex:"Yeşil alev bakırın oksitlendiğini gösterir."},
 {q:"Makaron ne için KULLANILMAZ?",opts:["Çevresel koruma","Kötü krimpi gizlemek","Yalıtım","Kozmetik"],ans:1,ex:"Makaron hatalı bağlantıyı gizlemek için kullanılmaz."},
 {q:"Lehimde nereyi ısıtmalı?",opts:["Kabloyu doğrudan","Terminalin ucunu","Makaronu","Eldiveni"],ans:1,ex:"Sadece terminal ucu ısıtılır; kablo doğrudan ısıtılırsa oksitlenir."},
 {q:"Flux için doğru ifade?",opts:["Bol kullan","Abartma, asidiktir","Su ile karıştır","Hiç kullanma"],ans:1,ex:"Rosin flux abartılmaz; kalırsa korozyon yapar."},
 {q:"Doğru adım sırası?",opts:["Krimp→Soyma→Lehim","Oksidasyon→Soyma→Krimp→Lehim→Makaron","Lehim→Krimp→Makaron","Soyma→Makaron→Krimp"],ans:1,ex:"Oksidasyon → Soyma → Krimp → Lehim → Makaron."}
],
16:[
 {q:"Titreşimli motor bağlantısında kablo?",opts:["Solid","Stranded","İkisi de olur","Önemsiz"],ans:1,ex:"Stranded (çok telli) esnektir, titreşime dayanır."},
 {q:"'Ringing' (yüzük atma) neden zararlı?",opts:["İletkeni zayıflatır, kırılır","İzolasyonu güçlendirir","Hızı artırır","Zararsız"],ans:0,ex:"İletkende zayıf nokta açar, titreşimle kopar."},
 {q:"Nox (anti-oksidan) neyi önler?",opts:["Isınmayı","Elektroliz/korozyonu","Kısa devreyi","Gevşemeyi"],ans:1,ex:"Farklı metallerde nem+akım korozyonunu önler."},
 {q:"Dış mekânda yüksük hangi yöne bakmalı?",opts:["Aşağı","Yukarı","Yana","Önemsiz"],ans:1,ex:"Shed water: yukarı baksın, su içine dolmasın."},
 {q:"Yüksük öncesi teller hangi yöne bükülür?",opts:["Saat yönü","Tersine","Düz bırakılır","Çapraz"],ans:0,ex:"Saat yönü büküm yüksük dişiyle uyumlu, sıkı bağlantı sağlar."},
 {q:"Yank testi nedir?",opts:["Gerilim ölçme","Her teli sertçe çekme","Isıtma","Renk kontrolü"],ans:1,ex:"Bağlantı sonrası her tel çekilerek kontrol edilir."}
],
17:[
 {q:"'~' sembolü neyi belirtir?",opts:["DC","AC","Topraklama","Sigorta"],ans:1,ex:"Dalgalı çizgi sadece AC içindir."},
 {q:"'—' (düz çizgi) sembolü?",opts:["AC","DC","Hem DC hem AC","Faz"],ans:1,ex:"Düz çizgi sadece DC içindir."},
 {q:"⊥ (ters T) sembolü?",opts:["Yatay kullan","Dik (dikey) kullan","60° eğik","AC"],ans:1,ex:"Alet dikey konumda kullanılmalıdır."},
 {q:"⊓ (U) sembolü?",opts:["Dik kullan","Yatay kullan","DC","Topraklama"],ans:1,ex:"Alet yatay konumda kullanılmalıdır."},
 {q:"Yıldız içinde '2' rakamı?",opts:["2 V muayene","Yalıtkanlık deneyi 2 kV","2 yıl garanti","2 faz"],ans:1,ex:"Yalıtkanlık deneyi 2 kV ile yapılmıştır."},
 {q:"Üçgen içinde ünlem (!) işareti?",opts:["Tehlike yok","Dikkat, teknik dokümana bak","Sadece AC","Topraklama"],ans:1,ex:"Çalışma tertibatına dikkat; dokümana bakınız."}
],
18:[
 {q:"Üç fazlı görünür güç formülü?",opts:["S=U·I","S=√3·U·I","S=U·I·cosφ","S=3·U·I"],ans:1,ex:"S = √3·U·I (kVA)."},
 {q:"Üç fazlı aktif güç formülü?",opts:["P=√3·U·I·cosφ","P=U·I","P=√3·U·I","P=U·I·sinφ"],ans:0,ex:"P = √3·U·I·cosφ (kW)."},
 {q:"Güç üçgeninde doğru bağıntı?",opts:["S=P+Q","S²=P²+Q²","P=S+Q","Q=S+P"],ans:1,ex:"S² = P² + Q²."},
 {q:"U=380 V, I=10 A, cosφ=1 → P ≈ ? (√3≈1,732)",opts:["3,8 kW","6,58 kW","13 kW","380 W"],ans:1,ex:"P=1,732·380·10/1000 ≈ 6,58 kW."},
 {q:"Güç faktörü cosφ nasıl bulunur?",opts:["P/S","S/P","P·S","Q/P"],ans:0,ex:"cosφ = P/S."},
 {q:"Düşük cosφ'yi düzelten yöntem?",opts:["Sigorta büyütme","Kompanzasyon (kondansatör)","Kablo kısaltma","Topraklama"],ans:1,ex:"Kondansatörlü kompanzasyon cosφ'yi 1'e yaklaştırır."}
],
19:[
 {q:"ADP neyin kısaltması?",opts:["Ana Dağıtım Panosu","Acil Durum Panosu","Alçak Direnç Panosu","Ana Direnç Plakası"],ans:0,ex:"ADP = Ana Dağıtım Panosu."},
 {q:"Panoda akımı dağıtan iletken çubuk?",opts:["Bara (busbar)","Sigorta","Klemens","Kontaktör"],ans:0,ex:"Bara (busbar) büyük akımı dağıtır."},
 {q:"Doğru pano hiyerarşisi?",opts:["Tali→Ana→Kat","Ana→Tali→Kat/mahal","Kat→Ana→Tali","Hepsi eşit"],ans:1,ex:"Ana pano → tali panolar → kat/mahal panoları."},
 {q:"IP koruma sınıfının 2. rakamı neyi belirtir?",opts:["Toz","Su","Darbe","Sıcaklık"],ans:1,ex:"1. rakam katı/toz, 2. rakam su korumasıdır."},
 {q:"Düşük güç faktörünü düzelten pano?",opts:["Kompanzasyon panosu","Yangın panosu","Aydınlatma panosu","Zayıf akım"],ans:0,ex:"Kompanzasyon panosu reaktifi karşılar."},
 {q:"Her panoda bulunması gereken bara?",opts:["Veri barası","Topraklama barası","Su barası","Yakıt barası"],ans:1,ex:"Güvenlik için topraklama barası şarttır."}
],
20:[
 {q:"Dizel jeneratörde elektriği üreten kısım?",opts:["Radyatör","Alternatör","Susturucu","Akü"],ans:1,ex:"Alternatör elektrik üretir."},
 {q:"Şebeke kesilince geçişi sağlayan?",opts:["ATS","UPS yok","LDR","SPD"],ans:0,ex:"ATS otomatik transfer şalteridir."},
 {q:"Standby jeneratör ne zaman çalışır?",opts:["Sürekli","Acil/kesinti durumunda","Sadece gündüz","Hiç"],ans:1,ex:"Standby yalnız acil durumda devreye girer."},
 {q:"Jeneratörleri paralel çalıştırmak için?",opts:["Topraklama","Senkronizasyon","Kompanzasyon","Soğutma"],ans:1,ex:"Gerilim, frekans ve faz eşitlenir (senkron)."},
 {q:"Günlük yakıt tankının görevi?",opts:["Soğutma","Motora yakıt sağlamak","Susturma","Şarj"],ans:1,ex:"Motora sürekli yakıt sağlar."},
 {q:"Soğutmayı sağlayan eleman?",opts:["Radyatör","Alternatör","Akü","Egzoz"],ans:0,ex:"Radyatör motor soğutmasını yapar."}
],
21:[
 {q:"Yıldırımı yakalayan en üst eleman?",opts:["İniş iletkeni","Yakalama ucu (paratoner)","Topraklama barası","SPD"],ans:1,ex:"Yakalama ucu (Franklin/aktif paratoner) en üstte."},
 {q:"Yakalama ucunu toprağa bağlayan?",opts:["İniş iletkeni","Faz","Nötr","Bara"],ans:0,ex:"İniş iletkeni (kalın bakır) toprağa bağlar."},
 {q:"Yıldırım topraklamasında hedef?",opts:["Yüksek direnç","Düşük direnç","Önemsiz","Sonsuz"],ans:1,ex:"Düşük direnç (hassas tesiste R<1 Ω)."},
 {q:"İç tesisatı aşırı gerilimden koruyan?",opts:["Parafudur (SPD)","Sayaç","Sigorta yuvası","Klemens"],ans:0,ex:"SPD (parafudur) aşırı gerilimi sınırlar."},
 {q:"Ana girişte kullanılan SPD tipi?",opts:["Tip 1","Tip 2","Tip 3","Hiçbiri"],ans:0,ex:"Tip 1 ana girişte yıldırım akımına karşı kullanılır."},
 {q:"Geniş yapıda örgü koruma yöntemi?",opts:["Faraday kafesi","Yıldız bağlantı","Delta","Kompanzasyon"],ans:0,ex:"Faraday kafesi örgü ile yüzey koruması sağlar."}
],
22:[
 {q:"Dış mekân armatüründe aranan koruma?",opts:["IP20","IP65/IP67","IP00","Yok"],ans:1,ex:"Su/toz koruması için IP65/IP67."},
 {q:"Bahçede yer altı besleme kablosu?",opts:["NYA","NYY","NYAF","Telefon kablosu"],ans:1,ex:"NYY yer altı için uygundur."},
 {q:"Yer altı kablosu yaklaşık kaç cm derine gömülür?",opts:["~5 cm","~60 cm","Yüzeye","2 m"],ans:1,ex:"~60 cm, üzerine ikaz bandı konur."},
 {q:"Peyzaj aydınlatmasını otomatik yakan?",opts:["Fotosel + zaman saati","Sadece sigorta","Manuel zorunlu","Termostat"],ans:0,ex:"Fotosel karanlığı, zaman saati saati yönetir."},
 {q:"Islak/dekoratif alanda güvenli gerilim?",opts:["12/24 V (alçak gerilim)","380 V","1000 V","Önemsiz"],ans:0,ex:"Güvenlik için alçak gerilim 12/24 V tercih edilir."},
 {q:"Sınıf II armatürün özelliği?",opts:["Topraklamasız çift yalıtım","Topraklı","Yüksek gerilim","Susuz"],ans:0,ex:"Sınıf II çift yalıtımlıdır, koruma topraklaması gerekmez."}
],
23:[
 {q:"Beton dökümünden ÖNCE elektrikçi ne bırakır?",opts:["Armatür","Boru/sleeve ve ankraj","Sayaç","Pano"],ans:1,ex:"Sonradan kırım olmasın diye sleeve/ankraj bırakılır."},
 {q:"Kablo tavası hangi grupla çakışmamalı?",opts:["Mekanik (HVAC/boru)","Hiçbiri","Sadece kendisi","Mimari boya"],ans:0,ex:"Tava ile mekanik kanal/borular çakışmamalı (clash)."},
 {q:"Veri kabloları güçten neden ayrı tutulur?",opts:["Renk","Parazit (EMI)","Maliyet","Ağırlık"],ans:1,ex:"EMI/paraziti önlemek için ayrı tava ve mesafe."},
 {q:"Çakışmaların önceden tespiti?",opts:["Clash detection","Kompanzasyon","Senkronizasyon","Metraj"],ans:0,ex:"BIM ile clash detection çakışmaları önceden bulur."},
 {q:"Armatür/priz yerleşimi hangi plana uyar?",opts:["Yakıt planı","Mimari tavan/yerleşim planı","Yok","Hava durumu"],ans:1,ex:"Mimari tavan ve yerleşim planına uyulur."},
 {q:"Asansör ve yangın grupları nasıl beslenir?",opts:["Ortak hat","Ayrı, güvenilir besleme","Beslenmez","Jeneratörsüz"],ans:1,ex:"Kritik sistemler ayrı ve güvenilir beslenir."}
]
});
/* ===================== KALICILIK + SRS + ROZET ===================== */
const SKEY='elkmaster_v5';
let MEM=null;
function _read(){ try{return JSON.parse(localStorage.getItem(SKEY))||{};}catch(e){return MEM||{};} }
function _write(o){ try{localStorage.setItem(SKEY,JSON.stringify(o));}catch(e){MEM=o;} }
let DB=_read();
DB.scores=DB.scores||{};
DB.notes=DB.notes||{};
DB.srs=DB.srs||{};
DB.exams=DB.exams||[];
DB.days=DB.days||[];
DB.name=DB.name||'';
DB.xp=DB.xp||0;
function persist(){ _write(DB); }

function todayStr(){ const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); return d.toISOString().slice(0,10); }
function markToday(){ const t=todayStr(); if(!DB.days.includes(t)){ DB.days.push(t); persist(); } }
function streak(){
  if(!DB.days.length) return 0;
  const set=new Set(DB.days); let s=0; const d=new Date();
  while(true){ d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
    const k=d.toISOString().slice(0,10);
    if(set.has(k)){ s++; d.setDate(d.getDate()-1); d.setMinutes(d.getMinutes()+d.getTimezoneOffset()); }
    else break;
  }
  return s;
}
function addXp(n){ DB.xp=(DB.xp||0)+n; persist(); refreshHeader(); }

function setScore(id,pct){ pct=Math.round(pct); if(!(DB.scores[id]>=pct)) DB.scores[id]=pct; markToday(); persist(); refreshHeader(); }
function moduleDone(){ return Object.keys(DB.scores).length; }
function moduleProgressPct(){ return Math.round(moduleDone()/MODS.length*100); }
function avgScore(){ const v=Object.values(DB.scores); return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):0; }
function totalQuestions(){ let n=0; for(const k in QBANK) n+=QBANK[k].length; return n; }

/* SRS — Leitner kutuları */
const SRS_INT=[1,2,4,7,15,30];
function srsAnswer(qid,correct){
  let s=DB.srs[qid]||{box:0,due:todayStr()};
  s.box = correct ? Math.min(SRS_INT.length-1,(s.box||0)+1) : 0;
  const days = correct ? SRS_INT[s.box] : 1;
  const d=new Date(); d.setDate(d.getDate()+days); d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  s.due=d.toISOString().slice(0,10);
  DB.srs[qid]=s; persist();
}
function dueReviews(){ const t=todayStr(); const out=[]; for(const qid in DB.srs){ if(DB.srs[qid].due<=t) out.push(qid); } return out; }
function parseQid(qid){ const p=qid.split('.'); return {mod:+p[0], idx:+p[1]}; }

/* ROZETLER */
const BADGES=[
 {id:'first',ic:'🌱',n:'İlk Adım',d:'1 modül tamamla',f:()=>moduleDone()>=1},
 {id:'cirak',ic:'🔧',n:'Çırak',d:'5 modül tamamla',f:()=>moduleDone()>=5},
 {id:'kalfa',ic:'🛠️',n:'Kalfa',d:'12 modül tamamla',f:()=>moduleDone()>=12},
 {id:'usta',ic:'🏅',n:'Usta',d:'Tüm 23 modül',f:()=>moduleDone()>=23},
 {id:'mukemmel',ic:'💯',n:'Mükemmeliyet',d:'5 modülde 100 puan',f:()=>Object.values(DB.scores).filter(x=>x>=100).length>=5},
 {id:'sinav',ic:'🎓',n:'Sınav Şampiyonu',d:'Sınavdan ≥90',f:()=>DB.exams.some(e=>e.pct>=90)},
 {id:'streak7',ic:'🔥',n:'7 Gün Seri',d:'7 gün üst üste',f:()=>streak()>=7},
 {id:'streak30',ic:'⚡',n:'Azimli',d:'30 gün seri',f:()=>streak()>=30},
];
function earnedBadges(){ return BADGES.filter(b=>{try{return b.f();}catch(e){return false;}}); }

function refreshHeader(){
  const s=document.getElementById('hsStreak'); if(s) s.textContent=streak();
  const x=document.getElementById('hsXp'); if(x) x.textContent=DB.xp||0;
}
/* ===================== ARAYÜZ / ROUTER ===================== */
const el=id=>document.getElementById(id);
const app=()=>el('app');
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toast(t){ const d=document.createElement('div'); d.className='toast'; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2200); }

function ringSVG(pct,size){
  size=size||130; const r=(size-16)/2, c=2*Math.PI*r, off=c*(1-pct/100);
  return `<svg class="ring" width="${size}" height="${size}"><circle class="bg" cx="${size/2}" cy="${size/2}" r="${r}"></circle>
   <circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="url(#rg)" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"></circle>
   <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb000"/><stop offset="100%" stop-color="#ff7a00"/></linearGradient></defs></svg>`;
}
function nextModule(){ const m=MODS.find(x=>DB.scores[x.id]==null); return m?m.id:1; }

/* ---------- PANO (HOME) ---------- */
function renderHome(){
  const pct=moduleProgressPct(), due=dueReviews().length, eb=earnedBadges();
  const nm=DB.name?esc(DB.name):'';
  app().innerHTML=`
   <div class="panel hero">
     <div style="position:relative;width:150px;height:150px;display:grid;place-items:center">
       ${ringSVG(pct,150)}
       <div style="position:absolute;text-align:center"><div style="font-size:30px;font-weight:800;color:var(--acc)">%${pct}</div><div class="muted" style="font-size:11px">tamamlandı</div></div>
     </div>
     <div>
       <h2 style="margin:0 0 4px">Merhaba${nm?', '+nm:''} 👋</h2>
       <div class="muted" style="font-size:13px;margin-bottom:14px">Elektrik uzmanlık yolculuğun — ${moduleDone()}/${MODS.length} modül, ${totalQuestions()} soru.</div>
       <div class="kpis">
         <div class="kpi"><div class="v">${moduleDone()}</div><div class="l">Tamamlanan modül</div></div>
         <div class="kpi"><div class="v">%${avgScore()}</div><div class="l">Ortalama puan</div></div>
         <div class="kpi"><div class="v">≈${Math.round(MODS.filter(m=>DB.scores[m.id]==null).reduce((a,m)=>a+okumaSuresi(m.id),0)/60)} sa</div><div class="l">Kalan okuma</div></div>
       </div>
       <div class="row" style="margin-top:16px">
         <button class="btn" onclick="go('module',${nextModule()})">▶ Çalışmaya devam et</button>
         <button class="btn blue" onclick="go('exam')">📝 Deneme sınavı</button>
         <button class="btn ghost" onclick="go('review')">🔁 Tekrar ${due?'('+due+')':''}</button>
       </div>
     </div>
   </div>

   <div class="panel2" style="margin-top:14px">
     <div class="row" style="justify-content:space-between">
       <div><b>Sertifika adı</b><div class="muted" style="font-size:12px">Sınav sertifikanda görünecek isim.</div></div>
       <div class="row"><input type="text" class="inline" id="nameIn" style="width:230px" placeholder="Ad Soyad" value="${nm}"><button class="btn sm" onclick="saveName()">Kaydet</button></div>
     </div>
   </div>

   ${due?`<div class="panel2" style="margin-top:14px;border-left:4px solid var(--warn)"><b>🔁 Bugün ${due} soru tekrar edilmeli.</b> <button class="btn sm" style="margin-left:8px" onclick="go('review')">Tekrara başla</button></div>`:''}

   <div class="sectiontitle"><h2>Kategoriler</h2><div class="ln"></div><button class="btn ghost sm" onclick="go('modules')">Tümünü gör →</button></div>
   <div class="cards">${Object.keys(CATS).map(k=>{
      const ms=MODS.filter(m=>m.cat===k); const d=ms.filter(m=>DB.scores[m.id]!=null).length;
      return `<div class="card" onclick="go('modules')"><div class="cat" style="color:${CATS[k].c}">${CATS[k].n}</div>
        <h3>${d}/${ms.length} modül</h3><div class="mini"><i style="width:${Math.round(d/ms.length*100)}%"></i></div></div>`;
   }).join('')}</div>`;
  refreshHeader();
}
function saveName(){ DB.name=el('nameIn').value.trim(); persist(); toast('İsim kaydedildi'); }

/* ---------- MODÜLLER ---------- */
function renderModules(){
  let h=`<div class="sectiontitle"><h2>Tüm Modüller</h2><div class="ln"></div><span class="muted" style="font-size:12.5px">${moduleDone()}/${MODS.length} tamamlandı</span></div>`;
  for(const k of Object.keys(CATS)){
    const ms=MODS.filter(m=>m.cat===k); if(!ms.length) continue;
    h+=`<div class="sectiontitle" style="margin-top:18px"><h2 style="font-size:15px;color:${CATS[k].c}">${CATS[k].n}</h2><div class="ln"></div></div><div class="cards">`;
    for(const m of ms){
      const sc=DB.scores[m.id], dueN=dueReviews().filter(q=>parseQid(q).mod===m.id).length;
      const badge = sc!=null?`<span class="cardbadge done">%${sc}</span>`:(dueN?`<span class="cardbadge due">🔁${dueN}</span>`:'');
      h+=`<div class="card" onclick="go('module',${m.id})">${badge}<div class="ico">${m.ic}</div>
        <div class="cat">Modül ${m.id}</div><h3>${m.t}</h3><p>${m.d}</p>
        <div class="mini"><i style="width:${sc||0}%"></i></div></div>`;
    }
    h+=`</div>`;
  }
  app().innerHTML=h;
}

/* ---------- MODÜL SAYFASI (SEKMELER) ---------- */

function noteHTML(id){
  return `<div class="panel2"><b>✏️ Kişisel Notların</b>
   <div class="muted" style="font-size:12px;margin:4px 0 8px">Bu cihazda kalıcı saklanır.</div>
   <textarea id="noteArea" placeholder="Bu modülle ilgili kendi notların, formüller, hatırlatmalar...">${esc(DB.notes[id]||'')}</textarea>
   <div class="row" style="margin-top:10px"><button class="btn sm" onclick="saveNote(${id})">Kaydet</button><span id="noteMsg" class="muted" style="font-size:12px"></span></div></div>`;
}
function saveNote(id){ DB.notes[id]=el('noteArea').value; persist(); el('noteMsg').textContent=' Kaydedildi ✓'; setTimeout(()=>{const e=el('noteMsg');if(e)e.textContent='';},1500); }

/* ---------- QUIZ MOTORU (paylaşımlı) ---------- */
let QS=null;
function startQuiz(container, items, srs, finishLabel, onFinish){
  QS={items, picks:{}, checked:false, srs:srs, onFinish:onFinish};
  let h='';
  items.forEach((it,i)=>{
    h+=`<div class="q" id="q${i}"><div class="qtxt">${i+1}. ${it.q}</div>`+
      it.opts.map((o,j)=>`<button class="opt" id="o${i}_${j}" onclick="pick(${i},${j})">${o}</button>`).join('')+
      `<div class="expl" id="e${i}"></div></div>`;
  });
  h+=`<div class="row" style="margin-top:8px"><button class="btn blue" id="qSubmit" onclick="submitQuiz()">${finishLabel||'Cevapları Kontrol Et'}</button></div><div id="qresult"></div>`;
  el(container).innerHTML=h;
}
function pick(i,j){ if(QS.checked) return; QS.picks[i]=j;
  document.querySelectorAll('#q'+i+' .opt').forEach(o=>o.classList.remove('sel'));
  el('o'+i+'_'+j).classList.add('sel'); }

/* ---------- SÖZLÜK / ARAMA ---------- */
const GLOSSARY=[
 ["Ohm Yasası","V = I × R; gerilim, akım ve direnç ilişkisi."],
 ["Güç (P)","P = V·I = I²R = V²/R, birimi Watt."],
 ["Seri devre","Akım sabit, gerilim bölünür; biri kopar tümü söner."],
 ["Paralel devre","Gerilim sabit, akım bölünür; kollar bağımsız."],
 ["Ampermetre","Akım ölçer, SERİ bağlanır, düşük iç direnç."],
 ["Voltmetre","Gerilim ölçer, PARALEL bağlanır, yüksek iç direnç."],
 ["Pens ampermetre","Manyetik alanla akım ölçer; içine tek hat alınır."],
 ["Mutlak hata","ΔX = |Xg − X|."],
 ["Bağıl hata","ε = ΔX / Xg (×100 ile %)."],
 ["Reaktans (XL)","XL = 2πfL; DA'da (f=0) sıfırdır."],
 ["Reaktans (XC)","XC = 1/(2πfC); DA'da sonsuzdur."],
 ["NYA / NYAF / NYM / NYY","Sırasıyla: pano içi tek tel / esnek motor / nemli sıva altı / yer altı kablosu."],
 ["RJ45 T568B","Ağ kablosu renk sırası standardı."],
 ["Kesici (Breaker)","Yük akımını güvenle kesen, ark hazneli cihaz."],
 ["Ayırıcı (Isolator)","Görünür ayrım sağlar; yük altında açılamaz."],
 ["Istanka / Neon","Gerilim olup olmadığını kontrol aracı."],
 ["Kontaktör","Bobinle büyük yükü anahtarlayan elektromekanik şalter."],
 ["LDR","Işığa duyarlı direnç (foto direnç)."],
 ["Kompanzasyon","Kondansatörle güç faktörünü (cosφ) düzeltme."],
 ["Güç faktörü (cosφ)","P/S oranı; 1'e yakın olması istenir."],
 ["Görünür/Aktif/Reaktif güç","S (kVA) / P (kW) / Q (kVAR); S²=P²+Q²."],
 ["ATS","Otomatik Transfer Şalteri (şebeke↔jeneratör)."],
 ["UPS","Kesintisiz güç kaynağı; jeneratöre kadar köprüler."],
 ["Parafudur (SPD)","Aşırı gerilimi toprağa akıtan koruma."],
 ["Topraklama direnci","Düşük olmalı; yıldırım korumasında hedef R<1 Ω."],
 ["Faraday kafesi","Örgü ile yapı yüzeyi yıldırım koruması."],
 ["ADP","Ana Dağıtım Panosu."],
 ["Bara (busbar)","Pano içinde akımı dağıtan bakır çubuk."],
 ["IP koruma sınıfı","Toz/su koruma derecesi (örn. IP65)."],
 ["Alternatör","Jeneratörde elektrik üreten kısım."],
 ["Nox","Korozyonu önleyen anti-oksidan pasta."],
 ["Shed water","Dış mekânda yüksüğü yukarı yerleştirme prensibi."],
 ["Yank testi","Bağlantı sonrası teli çekerek sağlamlık kontrolü."],
 ["Periyot / Frekans","T süresi; f = 1/T (Hz)."],
 ["RMS","Etkin değer; Vrms = Vmax/√2."],
 ["Clash detection","Disiplinler arası çakışma tespiti (BIM)."],
];
function renderGlossary(){
  app().innerHTML=`<div class="sectiontitle"><h2>Sözlük & Arama</h2><div class="ln"></div></div>
   <input type="text" id="gsearch" placeholder="Terim veya modül ara... (örn. reaktans, topraklama, RJ45)" oninput="filterGlossary()">
   <div id="gres" style="margin-top:14px"></div>`;
  filterGlossary();
}
function filterGlossary(){
  const q=(el('gsearch').value||'').toLocaleLowerCase('tr');
  const terms=GLOSSARY.filter(t=>!q||t[0].toLocaleLowerCase('tr').includes(q)||t[1].toLocaleLowerCase('tr').includes(q));
  const mods=MODS.filter(m=>q && (m.t.toLocaleLowerCase('tr').includes(q)||(TEORI[m.id]||'').toLocaleLowerCase('tr').includes(q)));
  let h='';
  if(mods.length){ h+=`<div class="muted" style="font-size:12px;margin-bottom:6px">Modüller</div><div class="cards" style="margin-bottom:18px">`+
    mods.map(m=>`<div class="card" onclick="go('module',${m.id})"><div class="ico">${m.ic}</div><div class="cat">Modül ${m.id}</div><h3>${m.t}</h3><p>${m.d}</p></div>`).join('')+`</div>`; }
  h+=`<div class="muted" style="font-size:12px;margin-bottom:6px">Terimler (${terms.length})</div>`;
  h+=terms.map(t=>`<div class="panel2" style="margin:8px 0"><b style="color:var(--acc2)">${t[0]}</b><div style="font-size:13px;margin-top:4px;line-height:1.6">${t[1]}</div></div>`).join('')||'<div class="muted">Sonuç yok.</div>';
  el('gres').innerHTML=h;
}
/* ===================== İNTERAKTİF UYGULAMALAR ===================== */

/* M1 OHM */

/* M2 RJ45 */

/* M3 KABLO */

/* M4 ÖLÇÜM */

/* M5 PANO */

/* M6 FATURA */

/* M7 YG MANEVRA */

/* M9 ATS */

/* M10 YG KORUMA */

/* M11 PCB+OSİLOSKOP */

/* M13 HATA */

/* M14 REAKTANS */

/* M15 AKÜ */

/* M18 GÜÇ */

/* ===================== SINAV + SERTİFİKA + TEKRAR ===================== */
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function fmt(s){const m=Math.floor(s/60),x=s%60;return (m<10?'0':'')+m+':'+(x<10?'0':'')+x;}

let EX=null;
function renderExam(){
  let hist='';
  if(DB.exams.length){
    hist=`<div class="sectiontitle" style="margin-top:18px"><h2 style="font-size:15px">Geçmiş Denemeler</h2><div class="ln"></div></div>`+
      DB.exams.slice(0,6).map(e=>`<div class="panel2" style="margin:8px 0"><div class="row" style="justify-content:space-between"><span>${e.date}</span><b style="color:${e.pass?'var(--ok)':'var(--bad)'}">%${e.pct} · ${e.correct}/${e.total} ${e.pass?'GEÇTİ':'KALDI'}</b></div></div>`).join('');
  }
  app().innerHTML=`<div class="panel"><h2 style="margin:0">📝 Deneme Sınavı</h2>
   <div class="muted" style="font-size:13px;margin-top:6px">20 rastgele soru · 15 dakika · Geçme notu %70. Tüm modüllerden karışık. Geçersen sertifika alırsın.</div>
   ${DB.name?'':'<div class="msg info" style="display:block">İpucu: Sertifikada isminin görünmesi için Pano sayfasından adını kaydet.</div>'}
   <div class="row" style="margin-top:14px"><button class="btn" onclick="startExam()">▶ Sınava Başla</button><button class="btn ghost" onclick="go('home')">Pano</button></div>
   </div>${hist}`;
}

function tickExam(){
  if(!EX) return;
  const left=EX.dur-Math.floor((Date.now()-EX.start)/1000);
  const t=el('examTimer'); if(!t){clearInterval(EX.timer);return;}
  if(left<=0){ clearInterval(EX.timer); t.textContent='00:00'; if(QS && !QS.checked) submitQuiz(); return; }
  t.textContent=fmt(left); if(left<=60) t.style.color='var(--bad)';
}
function examFinish(c,t,pct){
  if(EX&&EX.timer) clearInterval(EX.timer);
  const pass=pct>=70;
  DB.exams.unshift({date:todayStr(),correct:c,total:t,pct,pass}); DB.exams=DB.exams.slice(0,20); persist();
  addXp(c*3); markToday(); refreshHeader();
  let out=`<div class="panel2" style="margin-top:14px;border-left:4px solid ${pass?'var(--ok)':'var(--bad)'}"><b style="font-size:16px">${pass?'🎉 Tebrikler, geçtin!':'Bu sefer olmadı — tekrar dene.'}</b> · %${pct} (${c}/${t})</div>`;
  if(pass) out+=certHTML(pct);
  out+=`<div class="row" style="margin-top:12px"><button class="btn" onclick="go('exam')">↻ Tekrar dene</button><button class="btn ghost" onclick="go('review')">Yanlışları tekrar et</button><button class="btn ghost" onclick="go('home')">Pano</button></div>`;
  const r=el('qresult'); if(r) r.insertAdjacentHTML('beforeend', out);
}
function certHTML(pct){
  const nm=DB.name?esc(DB.name):'(Pano\'dan isim ekleyebilirsin)';
  return `<div class="cert" id="cert"><div class="seal">🏅</div><h2>BAŞARI SERTİFİKASI</h2>
   <div class="muted">DHMİ Elektrik Uzmanlık Akademisi · ELK MASTER</div>
   <div class="nm">${nm}</div>
   <div style="font-size:14px">genel deneme sınavını <b style="color:var(--acc)">%${pct}</b> başarı ile tamamlamıştır.</div>
   <div class="line"></div>
   <div class="muted" style="font-size:12px">Tarih: ${todayStr()} · Belge No: ELK-${Date.now().toString().slice(-6)}</div>
   <div class="row" style="justify-content:center;margin-top:14px"><button class="btn sm" onclick="window.print()">🖨️ Yazdır / PDF kaydet</button></div></div>`;
}

/* ===================== BAŞLAT ===================== */
/* ===== EK: kategori, yeni modüller, TEORI, FOY (24-29) ===== */
CATS.mak={n:"Makineler & Güç",c:"#22c55e"};
MODS.push(
  {id:24, t:"Transformatörler", cat:"mak", ic:"🔁", d:"Dönüştürme oranı, kayıplar, bağlantılar.", task:null},
  {id:25, t:"Elektrik Makineleri", cat:"mak", ic:"⚙️", d:"Asenkron/senkron/DA motor, yol verme.", task:null},
  {id:26, t:"Topraklama & Kaçak Akım", cat:"yg", ic:"🌍", d:"TN/TT/IT sistemleri, RCD (30 mA).", task:null},
  {id:27, t:"Koruma, Seçicilik & Hesap", cat:"yg", ic:"🛡️", d:"Sigorta eğrileri, kısa devre, gerilim düşümü.", task:null},
  {id:28, t:"Aydınlatma Tekniği", cat:"saha", ic:"🔆", d:"Lüks/lümen, verim, aydınlatma hesabı.", task:null},
  {id:29, t:"Mevzuat & İSG", cat:"yonetim", ic:"📜", d:"Yönetmelikler, 5 altın kural, KKD, LOTO.", task:null}
);
Object.assign(TEORI,{
24:`Transformatör elektromanyetik indüksiyonla gerilim seviyesini değiştirir (yalnız AC; DA'da çalışmaz çünkü değişken akı gerekir).<br><b>Dönüştürme oranı:</b> N1/N2 = V1/V2 = I2/I1. N2&gt;N1 → yükseltici, N2&lt;N1 → düşürücü.<br>İdeal trafoda güç korunur (S1≈S2). <b>Kayıplar:</b> bakır (I²R) + demir (histerezis/girdap). Soğutmaya göre yağlı/kuru. Üç fazda yıldız (Y) / üçgen (Δ) bağlantı.`,
25:`<b>Asenkron (endüksiyon) motor</b> en yaygındır: sağlam, ucuz, az bakım. <b>Senkron motor</b> sabit hızda döner, kompanzasyona yardımcı olur. <b>DA motor</b> kolay hız kontrolü sağlar.<br>Senkron hız: <b>n = 120·f / p</b> (p: kutup sayısı). Yol alma akımını düşürmek için <b>yıldız-üçgen</b> yol verme, soft starter veya sürücü (VFD) kullanılır.`,
26:`<b>Topraklama sistemleri</b> (1. harf kaynak, 2. harf gövde): TN-S (N ve PE ayrı), TN-C-S (önce birleşik sonra ayrık), TT (gövde ayrı topraklayıcı), IT (kaynak izole).<br><b>Kaçak akım rölesi (RCD/FI):</b> faz-nötr akım farkını ölçer; <b>30 mA can güvenliği</b>, ~300 mA yangın koruması. Eşpotansiyel baralama dokunma gerilimini azaltır.`,
27:`<b>Aşırı akım koruması:</b> sigorta/otomat. Açma eğrileri: <b>B 3–5·In</b> (aydınlatma), <b>C 5–10·In</b> (priz/motor), <b>D 10–20·In</b> (yüksek başlangıç akımı).<br><b>Seçicilik:</b> arıza en yakın koruma elemanında temizlenmeli, üst kademe açmamalı. Kısa devre akımı, kesicinin kesme kapasitesinden (kA) küçük olmalı.<br><b>Gerilim düşümü:</b> aydınlatmada ≤%3, kuvvette ≤%5; hat uzunluğu ve akımla artar.`,
28:`<b>Işık akısı:</b> lümen (lm). <b>Aydınlık düzeyi:</b> lüks (lx = lm/m²). <b>Armatür verimi:</b> lm/W (LED en verimli).<br>Lümen yöntemi: E = (Φ·n·η·d) / A. Önerilen düzeyler: ofis ~500 lx, koridor ~100 lx, hassas iş ~750–1000 lx. Konfor için renk sıcaklığı (K) ve renksel geriverim (CRI/Ra) önemlidir.`,
29:`Temel düzenlemeler: <b>Elektrik İç Tesisleri Yönetmeliği</b>, Elektrik Tesislerinde Topraklamalar Yönetmeliği, Elektrik Kuvvetli Akım Tesisleri Yönetmeliği, İSG mevzuatı; havacılıkta <b>SHT/HES</b> kuralları.<br>Yetkisiz müdahale yasaktır. Çalışma öncesi <b>5 altın kural</b>, KKD (baret, yalıtkan eldiven/ayakkabı), iş izni ve <b>etiket-kilit (LOTO)</b> zorunludur.`
});
Object.assign(FOY,{
24:`<b>Özet:</b> Trafo AC gerilimini indüksiyonla dönüştürür.<br><b>Oran:</b> N1/N2 = V1/V2 = I2/I1. Gerilim artarsa akım düşer (güç sabit).<br>Örn. N1=1000, N2=100, V1=220 V → V2 = 220·(100/1000) = 22 V (düşürücü).<br><b>Kayıplar:</b> bakır (sargı, I²R) + demir (nüve: histerezis+girdap akımı).<br><b>DA'da çalışmaz:</b> sabit akı indüksiyon üretmez.`,
25:`<b>Asenkron motor:</b> en yaygın; sağlam, ucuz.<br><b>Senkron hız:</b> n=120·f/p. Örn. f=50 Hz, p=4 → n=1500 d/d.<br><b>Yıldız-üçgen:</b> yolverme akımını düşürür (önce yıldız, sonra üçgen).<br><b>VFD/sürücü:</b> hızı kademesiz ayarlar.<br><b>Senkron motor</b> ayrıca güç faktörü düzeltir.`,
26:`<b>Sistemler:</b> TN-S (N/PE ayrı), TN-C-S, TT (gövde ayrı topraklı), IT (izole kaynak).<br><b>RCD:</b> faz-nötr akım farkını ölçer; fark eşiği aşarsa keser.<br>Can güvenliği: <b>30 mA</b>; yangın: ~300 mA.<br><b>Eşpotansiyel baralama</b> tüm iletken kısımları aynı potansiyele getirir.<br><b>Amaç:</b> insanı çarpılmaktan korumak.`,
27:`<b>Eğriler:</b> B 3–5·In, C 5–10·In, D 10–20·In.<br><b>Seçicilik:</b> sadece arızaya en yakın koruma açar; üst kademe devrede kalır.<br><b>Kesme kapasitesi (kA):</b> beklenen kısa devre akımından büyük olmalı.<br><b>Gerilim düşümü:</b> aydınlatma ≤%3, kuvvet ≤%5; uzun hat+yüksek akım = büyük düşüm → kesit büyüt.`,
28:`<b>Birimler:</b> Φ lümen (lm), E lüks (lx=lm/m²), verim lm/W.<br><b>Lümen yöntemi:</b> E = Φ·n·η·d / A (n armatür, η verim, d bakım faktörü).<br>Örn. 10 armatür × 4000 lm, η=0,6, d=0,8, A=40 m² → E=480 lx.<br>Hedefler: ofis ~500 lx, koridor ~100 lx.<br><b>CRI (Ra)</b> renkleri gerçekçi gösterme ölçüsüdür.`,
29:`<b>Yönetmelikler:</b> İç Tesisler, Topraklamalar, Kuvvetli Akım Tesisleri; İSG.<br><b>Havacılık:</b> SHT/HES (SHGM denetimi).<br><b>5 altın kural:</b> kes → kilitle/etiketle → gerilimsizliği doğrula → toprakla/kısa devre → yalıt.<br><b>LOTO:</b> Lockout-Tagout (kilitle-etiketle).<br>Yetkisiz kişi YG'de çalışamaz; KKD ve iş izni zorunlu.`
});

/* ===== EK: soru bankası (24-29) ===== */
Object.assign(QBANK,{
24:[
 {q:"Transformatör hangi akımda çalışır?",opts:["Sadece DC","Sadece AC","Hem AC hem DC","Hiçbiri"],ans:1,ex:"Trafo değişken akı (indüksiyon) gerektirir; yalnız AC'de çalışır."},
 {q:"Dönüştürme oranı bağıntısı?",opts:["N1/N2 = V1/V2","N1·N2 = V1·V2","N1/N2 = I1/I2","N1+N2 = V1"],ans:0,ex:"N1/N2 = V1/V2 = I2/I1."},
 {q:"N2 > N1 olan trafo nedir?",opts:["Düşürücü","Yükseltici","Yalıtım","Ölçü"],ans:1,ex:"Sekonder sarımı fazlaysa gerilim yükselir → yükseltici."},
 {q:"İdeal trafoda korunan büyüklük?",opts:["Akım","Gerilim","Güç (S1≈S2)","Direnç"],ans:2,ex:"İdeal trafoda giriş gücü ≈ çıkış gücü."},
 {q:"Nüve (demir) kaybı türü?",opts:["Bakır kaybı","Histerezis ve girdap akımı","Temas direnci","Sürtünme"],ans:1,ex:"Demir kayıpları histerezis + girdap akımı kayıplarıdır."},
 {q:"1000 sarım/220 V primer, 100 sarım sekonder → V2?",opts:["2200 V","22 V","110 V","220 V"],ans:1,ex:"V2 = 220·(100/1000) = 22 V."},
 {q:"Üç fazda Δ sembolü neyi gösterir?",opts:["Yıldız","Üçgen","Toprak","Nötr"],ans:1,ex:"Δ üçgen, Y yıldız bağlantıyı gösterir."},
 {q:"Trafo DA'da neden çalışmaz?",opts:["Çok ısınır","Sabit akı indüksiyon üretmez","Aşırı akım","Frekans yüksek"],ans:1,ex:"DA'da akı sabit kalır, sekonderde gerilim indüklenmez."}
],
25:[
 {q:"En yaygın endüstriyel motor?",opts:["DA motor","Asenkron (endüksiyon)","Senkron","Step motor"],ans:1,ex:"Asenkron motor sağlam, ucuz ve az bakımlıdır."},
 {q:"Yol alma akımını düşüren klasik yöntem?",opts:["Yıldız-üçgen","Kompanzasyon","Topraklama","Parafudur"],ans:0,ex:"Yıldız-üçgen yolverme başlangıç akımını azaltır."},
 {q:"f=50 Hz, p=4 kutup → senkron hız (n=120f/p)?",opts:["750 d/d","1500 d/d","3000 d/d","1000 d/d"],ans:1,ex:"n = 120·50/4 = 1500 d/d."},
 {q:"Motor hızını kademesiz ayarlayan cihaz?",opts:["Sürücü (VFD)","Sigorta","Kontaktör","Trafo"],ans:0,ex:"Frekans konvertörü (VFD) hızı kademesiz ayarlar."},
 {q:"Senkron motorun ek faydası?",opts:["Ucuzluk","Güç faktörü düzeltme","Susuz çalışma","Yüksek kayıp"],ans:1,ex:"Aşırı uyartımlı senkron motor cosφ'yi düzeltir."},
 {q:"DA motorun avantajı?",opts:["Bakımsızlık","Kolay hız kontrolü","Ucuzluk","Sessizlik"],ans:1,ex:"DA motorda hız kontrolü kolaydır."},
 {q:"Yıldız-üçgen yolvermede başlangıç bağlantısı?",opts:["Üçgen","Yıldız","Karışık","Seri"],ans:1,ex:"Önce yıldız (düşük akım), sonra üçgen."},
 {q:"Asenkron motorda dönen kısım?",opts:["Stator","Rotor","Nüve","Klemens"],ans:1,ex:"Rotor döner; stator sabit manyetik alanı oluşturur."}
],
26:[
 {q:"Kaçak akım rölesi (RCD) neyi ölçer?",opts:["Toplam akımı","Faz-nötr akım farkını","Gerilimi","Frekansı"],ans:1,ex:"Faz ve nötr akımı eşit değilse fark kaçaktır → keser."},
 {q:"Can güvenliği için RCD eşiği?",opts:["30 mA","300 mA","3 A","30 A"],ans:0,ex:"İnsan koruması için 30 mA kullanılır."},
 {q:"TN-S sisteminde N ve PE?",opts:["Birleşik","Ayrı","Yok","Aynı şey"],ans:1,ex:"TN-S'de nötr (N) ve koruma (PE) ayrıdır."},
 {q:"IT sisteminde kaynak nasıldır?",opts:["Doğrudan topraklı","Topraktan izole","Kısa devreli","Nötrsüz değil"],ans:1,ex:"IT'de kaynak topraktan izoledir (veya yüksek empedansla)."},
 {q:"Eşpotansiyel baralamanın amacı?",opts:["Hız artırma","Dokunma gerilimini azaltma","Aydınlatma","Kompanzasyon"],ans:1,ex:"İletken kısımları aynı potansiyele getirir, çarpılmayı azaltır."},
 {q:"Yangın koruması için RCD eşiği?",opts:["10 mA","30 mA","~300 mA","30 A"],ans:2,ex:"Yangın koruması tipik olarak ~300 mA'dir."},
 {q:"TT sisteminde gövde nasıl bağlanır?",opts:["Nötre","Ayrı topraklayıcıya","Faza","Bağlanmaz"],ans:1,ex:"TT'de gövde kendi topraklayıcısına bağlanır."},
 {q:"Topraklamanın temel amacı?",opts:["Hız","İnsanı çarpılmaktan korumak","Aydınlatma","Tasarruf"],ans:1,ex:"Arıza akımını toprağa akıtıp dokunma gerilimini düşürür."}
],
27:[
 {q:"C tipi otomatın açma aralığı?",opts:["3–5·In","5–10·In","10–20·In","1–2·In"],ans:1,ex:"C eğrisi 5–10·In; priz/motor devrelerinde yaygın."},
 {q:"Seçicilik (selektivite) nedir?",opts:["Tüm korumalar açar","Sadece arızaya en yakın koruma açar","Hiçbiri açmaz","Sigorta erir"],ans:1,ex:"Arıza en yakın elemanda temizlenir, üst kademe açmaz."},
 {q:"Kesicinin kesme kapasitesi birimi?",opts:["A","kA","V","Hz"],ans:1,ex:"Kesme kapasitesi kiloamper (kA) ile verilir."},
 {q:"Aydınlatma devresinde önerilen maks. gerilim düşümü?",opts:["%3","%5","%10","%1"],ans:0,ex:"Aydınlatmada genelde ≤%3 önerilir."},
 {q:"Kuvvet (motor) devresinde gerilim düşümü?",opts:["≤%3","≤%5","≤%15","Sınır yok"],ans:1,ex:"Kuvvet devrelerinde ≤%5 hedeflenir."},
 {q:"Kısa devre akımı kesme kapasitesinden nasıl olmalı?",opts:["Büyük","Küçük","Eşit","Önemsiz"],ans:1,ex:"Beklenen kısa devre akımı kesicinin kesme kapasitesinden küçük olmalı."},
 {q:"B tipi otomat hangi yük için uygun?",opts:["Yüksek başlangıç akımlı","Dirençsel/aydınlatma","Sadece motor","Trafo"],ans:1,ex:"B eğrisi düşük açma akımı; aydınlatma/dirençsel yükler için."},
 {q:"Gerilim düşümü neyle artar?",opts:["Kısa hat","Hat uzunluğu ve akım","Düşük akım","Kalın kesit"],ans:1,ex:"Uzun hat ve yüksek akımda gerilim düşümü artar."}
],
28:[
 {q:"Aydınlık düzeyinin birimi?",opts:["Lümen","Lüks (lx)","Watt","Kelvin"],ans:1,ex:"Aydınlık düzeyi lüks (lx) ile ölçülür."},
 {q:"Işık akısının birimi?",opts:["Lüks","Lümen (lm)","Amper","Hz"],ans:1,ex:"Işık akısı lümen (lm)."},
 {q:"1 lüks kaça eşittir?",opts:["1 lm/m²","1 W/m²","1 cd","1 lm·m²"],ans:0,ex:"1 lx = 1 lm/m²."},
 {q:"Ofis için önerilen aydınlık düzeyi?",opts:["~100 lx","~500 lx","~50 lx","~2000 lx"],ans:1,ex:"Ofis çalışması için ~500 lx önerilir."},
 {q:"Armatür verimi hangi birimle ifade edilir?",opts:["lm/W","W/lm","lx/m","cd/W"],ans:0,ex:"Verim lümen/Watt (lm/W) ile ifade edilir."},
 {q:"En verimli ışık kaynağı?",opts:["Akkor","Floresan","LED","Halojen"],ans:2,ex:"LED en yüksek lm/W verime sahiptir."},
 {q:"Renkleri gerçekçi gösterme ölçüsü?",opts:["CRI (Ra)","Lümen","Kelvin","Lüks"],ans:0,ex:"CRI (Ra) renksel geriverim indeksidir."},
 {q:"Bakım faktörü (d) neden kullanılır?",opts:["Maliyet","Kirlenme/yaşlanmayla ışık azalır","Renk için","Hız için"],ans:1,ex:"Zamanla kirlenme ve yaşlanma ışığı azaltır; tasarımda hesaba katılır."}
],
29:[
 {q:"İç tesisat kurallarını belirleyen yönetmelik?",opts:["Elektrik İç Tesisleri Yönetmeliği","Trafik Yönetmeliği","İmar Yönetmeliği","Yok"],ans:0,ex:"İç tesisat kuralları Elektrik İç Tesisleri Yönetmeliği'nde yer alır."},
 {q:"Çalışma öncesi kaç altın kural vardır?",opts:["3","5","7","10"],ans:1,ex:"İş güvenliğinde 5 altın kural uygulanır."},
 {q:"LOTO ne anlama gelir?",opts:["Etiketle-kilitle (enerji izolasyonu)","Ölçüm","Topraklama","Aydınlatma"],ans:0,ex:"Lockout-Tagout: enerjiyi kilitle ve etiketle."},
 {q:"Havacılık elektrik işlerini düzenleyen?",opts:["SHT/HES (SHGM)","Belediye","TSE","Yok"],ans:0,ex:"Havacılıkta SHT/HES kuralları ve SHGM denetimi geçerlidir."},
 {q:"Yetkisiz kişi YG'de müdahale edebilir mi?",opts:["Evet","Hayır","Sadece gündüz","İzinle herkes"],ans:1,ex:"YG'de yalnız yetkili/eğitimli personel çalışabilir."},
 {q:"KKD örneği hangisidir?",opts:["Yalıtkan eldiven/baret","Cep telefonu","Anahtar","Kalem"],ans:0,ex:"Kişisel koruyucu donanım: baret, yalıtkan eldiven/ayakkabı vb."},
 {q:"Topraklama esaslarını veren yönetmelik?",opts:["Topraklamalar Yönetmeliği","Gürültü Yönetmeliği","Su Yönetmeliği","Yok"],ans:0,ex:"Elektrik Tesislerinde Topraklamalar Yönetmeliği."},
 {q:"İş izni (work permit) ne zaman gerekir?",opts:["Hiçbir zaman","Riskli/YG çalışmaları öncesi","Sadece tatilde","Ofiste"],ans:1,ex:"Riskli ve YG çalışmaları öncesi iş izni alınır."}
]
});

/* ===== EK: interaktif görevler, karıştırma, yedekleme, ayarlar ===== */
/* M24 TRAFO */

/* M28 AYDINLATMA */

/* SORU KARIŞTIRMA — quiz/sınav/tekrar yeniden tanımlanır */
function shuffleItems(items){return shuffle(items.map(it=>{const idx=it.opts.map((_,i)=>i);shuffle(idx);return Object.assign({},it,{opts:idx.map(i=>it.opts[i]),ans:idx.indexOf(it.ans)});}));}
function startModuleQuiz(id){const items=shuffleItems(QBANK[id].map((x,i)=>Object.assign({qid:id+'.'+i},x)));startQuiz('mtab',items,true,'Cevapları Kontrol Et',(c,t,pct)=>{setScore(id,pct);addXp(c*2);el('qresult').innerHTML+=`<div class="row" style="margin-top:12px"><button class="btn sm" onclick="showTab(${id},'foy')">📘 Föy ile pekiştir</button><button class="btn ghost sm" onclick="startModuleQuiz(${id})">↻ Tekrar çöz</button></div>`;});}
function startExam(){const pool=[];for(const mod in QBANK)QBANK[mod].forEach((q,i)=>pool.push(Object.assign({qid:mod+'.'+i},q)));const items=shuffleItems(pool).slice(0,20);EX={items,start:Date.now(),dur:15*60,timer:null};app().innerHTML=`<div class="panel"><div class="row" style="justify-content:space-between"><h2 style="margin:0">📝 Deneme Sınavı</h2><div class="examtimer" id="examTimer">15:00</div></div><div id="examBody" style="margin-top:12px"></div></div>`;startQuiz('examBody',items,true,'Sınavı Bitir',examFinish);EX.timer=setInterval(tickExam,1000);}
function renderReview(){const due=dueReviews();if(!due.length){app().innerHTML=`<div class="panel"><h2 style="margin:0">🔁 Tekrar</h2><div class="muted" style="font-size:13px;margin-top:8px">Bugün tekrar edilecek soru yok 🎉<br>Quiz çözdükçe yanlış cevapların aralıklı tekrar (spaced repetition) ile zamanı gelince burada belirir.</div><button class="btn" style="margin-top:14px" onclick="go('modules')">Modüllere git</button></div>`;return;}const items=shuffleItems(due.slice(0,20).map(qid=>{const p=parseQid(qid);return Object.assign({qid},QBANK[p.mod][p.idx]);}));app().innerHTML=`<div class="panel"><h2 style="margin:0">🔁 Tekrar — ${items.length} soru</h2><div class="muted" style="font-size:13px;margin-top:6px">Zamanı gelen tekrar soruları. Doğru bildiklerin uzar, yanlışlar yakında tekrar gelir.</div><div id="revBody" style="margin-top:14px"></div></div>`;startQuiz('revBody',items,true,'Tekrarı Bitir',(c,t,pct)=>{addXp(c);const r=el('qresult');if(r)r.insertAdjacentHTML('beforeend',`<div class="row" style="margin-top:12px"><button class="btn" onclick="go('review')">↻ Kalan tekrarlar</button><button class="btn ghost" onclick="go('home')">Pano</button></div>`);});}

/* YEDEKLEME / GERİ YÜKLEME / SIFIRLAMA + AYARLAR */
function exportData(){try{const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='elkmaster-yedek-'+todayStr()+'.json';document.body.appendChild(a);a.click();a.remove();toast('Yedek indirildi');}catch(e){toast('Yedek alınamadı');}}
function importData(input){const f=input.files&&input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);DB=Object.assign({scores:{},notes:{},srs:{},exams:[],days:[],name:'',xp:0},o);persist();refreshHeader();toast('Yedek geri yüklendi');go('home');}catch(e){toast('Geçersiz dosya');}};r.readAsText(f);}
function resetData(){if(!confirm('Tüm ilerlemen kalıcı olarak silinecek. Emin misin?'))return;DB={scores:{},notes:{},srs:{},exams:[],days:[],name:'',xp:0};persist();refreshHeader();toast('İlerleme sıfırlandı');go('home');}
function renderSettings(){app().innerHTML=`<div class="panel"><h2 style="margin:0">⚙️ Veri & Ayarlar</h2>
 <div class="muted" style="font-size:13px;margin-top:8px">İlerlemen bu cihazın tarayıcısında saklanır. Başka cihaza taşımak veya veri kaybetmemek için düzenli yedek al.</div>
 <div class="row" style="margin-top:16px"><button class="btn" onclick="exportData()">⬇️ Yedek Al (JSON)</button>
 <label class="btn ghost" style="cursor:pointer">⬆️ Geri Yükle<input type="file" accept="application/json,.json" style="display:none" onchange="importData(this)"></label>
 <button class="btn danger" onclick="resetData()">🗑️ İlerlemeyi Sıfırla</button></div>
 <div class="panel2" style="margin-top:16px"><b>Mevcut Durum</b><div class="muted" style="font-size:12.5px;margin-top:6px">Tamamlanan: ${moduleDone()}/${MODS.length} modül · Ortalama: %${avgScore()} · XP: ${DB.xp||0} · Seri: ${streak()} gün · Tekrar bekleyen: ${dueReviews().length} · Sınav denemesi: ${DB.exams.length}</div></div></div>`;}

/* ===== EK: SVG ŞEMA KÜTÜPHANESİ ===== */
const DIAG = {
1:`<svg viewBox="0 0 420 170"><rect x="60" y="30" width="300" height="110" rx="4" fill="none" stroke="#8a98ab" stroke-width="2"/>
 <line x1="55" y1="60" x2="55" y2="110" stroke="#ffb000" stroke-width="3"/><line x1="65" y1="70" x2="65" y2="100" stroke="#ffb000" stroke-width="6"/>
 <text x="30" y="92" fill="#ffb000" font-size="13">V</text>
 <polyline points="170,30 180,18 200,42 220,18 240,42 250,30" fill="none" stroke="#33b1ff" stroke-width="3"/><text x="195" y="14" fill="#33b1ff" font-size="13">R</text>
 <polygon points="350,80 342,72 342,88" fill="#3fb950"/><text x="300" y="160" fill="#3fb950" font-size="13">I (akım yönü)</text>
 <text x="120" y="105" fill="#e8eef6" font-size="18" font-weight="700">V = I · R</text></svg>`,
2:`<svg viewBox="0 0 420 150">${["#ff9b54","#ff6b00","#7bdc7b","#2f6bff","#9db8ff","#1f9d1f","#c8a07a","#7a4a23"].map((c,i)=>`<rect x="${40+i*44}" y="40" width="30" height="60" fill="${c}" stroke="#0008"/><text x="${55+i*44}" y="120" fill="#cdd7e2" font-size="12" text-anchor="middle">${i+1}</text>`).join('')}
 <path d="M30,40 h360 v-14 h-360 z" fill="none" stroke="#8a98ab" stroke-width="2"/><text x="150" y="20" fill="#e8eef6" font-size="13">RJ45 — T568B sırası</text></svg>`,
4:`<svg viewBox="0 0 420 170"><rect x="50" y="40" width="320" height="90" rx="4" fill="none" stroke="#8a98ab" stroke-width="2"/>
 <circle cx="150" cy="40" r="16" fill="none" stroke="#3fb950" stroke-width="2"/><text x="150" y="45" fill="#3fb950" font-size="13" text-anchor="middle">A</text><text x="120" y="22" fill="#3fb950" font-size="12">SERİ</text>
 <circle cx="300" cy="130" r="16" fill="none" stroke="#ffb000" stroke-width="2"/><text x="300" y="135" fill="#ffb000" font-size="13" text-anchor="middle">V</text><line x1="300" y1="114" x2="300" y2="40" stroke="#ffb000" stroke-width="2" stroke-dasharray="4"/><line x1="300" y1="146" x2="300" y2="130" stroke="#ffb000" stroke-width="2"/><text x="318" y="120" fill="#ffb000" font-size="12">PARALEL</text>
 <polyline points="220,40 228,32 244,48 252,40" fill="none" stroke="#33b1ff" stroke-width="3"/></svg>`,
7:`<svg viewBox="0 0 420 150"><text x="20" y="30" fill="#e8eef6" font-size="13">Açma sırası:</text>
 <rect x="40" y="50" width="120" height="46" rx="6" fill="#11331c" stroke="#3fb950" stroke-width="2"/><text x="100" y="78" fill="#bdf0c8" font-size="13" text-anchor="middle">1 · KESİCİ</text>
 <polygon points="180,73 200,63 200,83" fill="#ffb000"/>
 <rect x="210" y="50" width="120" height="46" rx="6" fill="#332a11" stroke="#ffb000" stroke-width="2"/><text x="270" y="78" fill="#ffd089" font-size="13" text-anchor="middle">2 · AYIRICI</text>
 <text x="40" y="125" fill="#f85149" font-size="12">Yük altında ayırıcı açılırsa → ARK PATLAMASI</text></svg>`,
10:`<svg viewBox="0 0 420 170"><line x1="60" y1="30" x2="60" y2="120" stroke="#8a98ab" stroke-width="3"/>
 <polygon points="50,120 70,120 60,150" fill="#7a4a23"/><line x1="40" y1="150" x2="80" y2="150" stroke="#8a98ab" stroke-width="2"/><line x1="46" y1="156" x2="74" y2="156" stroke="#8a98ab" stroke-width="2"/><line x1="52" y1="162" x2="68" y2="162" stroke="#8a98ab" stroke-width="2"/>
 <rect x="120" y="50" width="80" height="50" rx="4" fill="none" stroke="#f85149" stroke-width="2"/><text x="160" y="80" fill="#f85149" font-size="11" text-anchor="middle">Parafudur</text>
 <line x1="60" y1="55" x2="120" y2="55" stroke="#ffb000" stroke-width="2"/>
 <text x="240" y="80" fill="#3fb950" font-size="15">Hedef: R &lt; 1 Ω</text><text x="240" y="100" fill="#8a98ab" font-size="11">ek bakır kazıklarla düşür</text></svg>`,
11:`<svg viewBox="0 0 420 160"><line x1="20" y1="80" x2="400" y2="80" stroke="#26313f" stroke-width="1"/>
 <path d="M30,80 Q70,10 110,80 T190,80 T270,80 T350,80" fill="none" stroke="#33b1ff" stroke-width="3"/>
 <line x1="30" y1="80" x2="30" y2="25" stroke="#ffb000" stroke-width="1" stroke-dasharray="3"/><line x1="190" y1="80" x2="190" y2="25" stroke="#ffb000" stroke-width="1" stroke-dasharray="3"/>
 <text x="95" y="20" fill="#ffb000" font-size="12">T (periyot)</text><text x="20" y="45" fill="#3fb950" font-size="12">Vmax</text>
 <text x="250" y="40" fill="#e8eef6" font-size="14">f = 1 / T · Vrms = Vmax/√2</text></svg>`,
14:`<svg viewBox="0 0 420 160"><path d="M40,120 L40,40" stroke="#8a98ab" stroke-width="2"/><path d="M40,40 L380,40" stroke="#8a98ab" stroke-width="2"/>
 <path d="M70,110 q14,-20 28,0 q14,20 28,0 q14,-20 28,0 q14,20 28,0" fill="none" stroke="#a371ff" stroke-width="3"/><text x="80" y="135" fill="#a371ff" font-size="12">Bobin (L)</text>
 <text x="210" y="80" fill="#e8eef6" font-size="14">XL = 2·π·f·L</text><text x="210" y="105" fill="#f85149" font-size="12">DA (f=0) → XL=0 (kısa devre)</text></svg>`,
18:`<svg viewBox="0 0 420 170"><polygon points="60,140 320,140 60,40" fill="none" stroke="#8a98ab" stroke-width="2"/>
 <line x1="60" y1="140" x2="320" y2="140" stroke="#3fb950" stroke-width="4"/><text x="170" y="158" fill="#3fb950" font-size="13">P (kW)</text>
 <line x1="320" y1="140" x2="60" y2="40" stroke="#ffb000" stroke-width="4"/><text x="200" y="85" fill="#ffb000" font-size="13">S (kVA)</text>
 <line x1="60" y1="140" x2="60" y2="40" stroke="#f85149" stroke-width="4"/><text x="14" y="95" fill="#f85149" font-size="13">Q</text>
 <text x="80" y="132" fill="#cdd7e2" font-size="12">φ</text><text x="250" y="30" fill="#e8eef6" font-size="12">S²=P²+Q²</text></svg>`,
21:`<svg viewBox="0 0 420 170"><polygon points="40,40 60,10 80,40" fill="#ffb000"/><line x1="60" y1="40" x2="60" y2="140" stroke="#8a98ab" stroke-width="3"/>
 <line x1="40" y1="140" x2="80" y2="140" stroke="#8a98ab" stroke-width="2"/><line x1="48" y1="148" x2="72" y2="148" stroke="#8a98ab" stroke-width="2"/>
 <text x="100" y="30" fill="#ffb000" font-size="12">1· Yakalama ucu</text><text x="100" y="90" fill="#33b1ff" font-size="12">2· İniş iletkeni</text><text x="100" y="150" fill="#3fb950" font-size="12">3· Topraklama (R&lt;1Ω)</text></svg>`,
24:`<svg viewBox="0 0 420 170"><line x1="60" y1="30" x2="60" y2="140" stroke="#33b1ff" stroke-width="2"/>${[0,1,2,3].map(i=>`<path d="M60,${45+i*22} a8,8 0 0 1 0,16" fill="none" stroke="#33b1ff" stroke-width="3"/>`).join('')}
 <rect x="180" y="30" width="14" height="110" fill="#26313f"/>
 <line x1="320" y1="30" x2="320" y2="140" stroke="#ffb000" stroke-width="2"/>${[0,1].map(i=>`<path d="M320,${60+i*30} a8,8 0 0 0 0,16" fill="none" stroke="#ffb000" stroke-width="3"/>`).join('')}
 <text x="30" y="160" fill="#33b1ff" font-size="12">N1 / V1</text><text x="300" y="160" fill="#ffb000" font-size="12">N2 / V2</text><text x="150" y="20" fill="#e8eef6" font-size="12">N1/N2 = V1/V2</text></svg>`,
25:`<svg viewBox="0 0 420 160"><circle cx="120" cy="80" r="45" fill="none" stroke="#8a98ab" stroke-width="2"/><text x="120" y="85" fill="#22c55e" font-size="16" text-anchor="middle">M</text><text x="95" y="145" fill="#cdd7e2" font-size="12">Asenkron motor</text>
 <line x1="250" y1="50" x2="290" y2="50" stroke="#33b1ff" stroke-width="3"/><line x1="270" y1="50" x2="270" y2="30" stroke="#33b1ff" stroke-width="3"/><text x="300" y="55" fill="#33b1ff" font-size="12">Yıldız (Y) — yolverme</text>
 <polygon points="255,95 285,95 270,75" fill="none" stroke="#ffb000" stroke-width="3"/><text x="300" y="100" fill="#ffb000" font-size="12">Üçgen (Δ) — çalışma</text></svg>`,
26:`<svg viewBox="0 0 420 160"><text x="20" y="25" fill="#e8eef6" font-size="13">TN-S</text><line x1="20" y1="40" x2="120" y2="40" stroke="#3fb950" stroke-width="2"/><text x="125" y="44" fill="#3fb950" font-size="11">PE (ayrı)</text><line x1="20" y1="58" x2="120" y2="58" stroke="#33b1ff" stroke-width="2"/><text x="125" y="62" fill="#33b1ff" font-size="11">N (ayrı)</text>
 <text x="20" y="100" fill="#e8eef6" font-size="13">RCD</text><rect x="20" y="110" width="100" height="34" rx="4" fill="none" stroke="#f85149" stroke-width="2"/><text x="70" y="132" fill="#f85149" font-size="11" text-anchor="middle">30 mA</text><text x="135" y="132" fill="#8a98ab" font-size="11">can güvenliği</text></svg>`,
28:`<svg viewBox="0 0 420 160"><circle cx="100" cy="40" r="16" fill="#ffd400"/>${[0,1,2,3,4].map(i=>`<line x1="100" y1="60" x2="${60+i*20}" y2="120" stroke="#ffd400" stroke-width="2" opacity="0.7"/>`).join('')}
 <line x1="40" y1="125" x2="160" y2="125" stroke="#8a98ab" stroke-width="2"/><text x="60" y="145" fill="#cdd7e2" font-size="12">Alan A (m²)</text>
 <text x="230" y="60" fill="#e8eef6" font-size="13">E = Φ·n·η·d / A</text><text x="230" y="84" fill="#8a98ab" font-size="11">lüks = lümen / m²</text><text x="230" y="104" fill="#3fb950" font-size="11">Ofis ≈ 500 lx</text></svg>`,
};
function figureFor(id){ return DIAG[id]?`<figure class="fig">${DIAG[id]}<figcaption>Şekil — ${esc((modById(id)||{}).t||'')}</figcaption></figure>`:''; }

/* ===== EK: FASİKÜL düzeni + MYK sınav bölümü ===== */
DB.myk = DB.myk || [];

/* showTab yeniden tanımlanır — Teori sekmesi fasikül düzeni + şekil */

/* ---------- MYK ---------- */
const MYK_INFO=`<b>MYK Mesleki Yeterlilik — Elektrik Tesisatçısı (15UY0241)</b> sınavı iki aşamalıdır:
<br>• <b>Teorik sınav:</b> en az 25 çoktan seçmeli (4 şıklı) soru, soru başına ~2 dakika, yanlış cevap doğruyu götürmez.
<br>• <b>Performans (uygulama) sınavı:</b> gerçek/gerçeğe yakın iş ortamında yapılır; kritik adımların tamamı + genelde asgari %80 başarı gerekir.
<br>• <b>Geçme notu:</b> Teorikte Seviye 3 için ≥ %70, Seviye 4 için ≥ %80. A1 (İSG, Çevre, İş Organizasyonu) birimi için ≥ 70.
<br>• <b>Birimler:</b> A1 (zorunlu — İSG/Çevre/Organizasyon), B1 (Elektrik İç Tesisat Projesi Hazırlama), B2 (Elektrik İç Tesisat Uygulaması). Seçmelilerden en az biri.`;

const MYK_Q = {
isg:[
 {q:"Gerilim altındaki bir tesiste çalışmaya başlamadan önce yapılması gereken İLK iş?",opts:["Enerjiyi kesmek","Ölçüm almak","Eldiven giymek","Etiket asmak"],ans:0,ex:"5 altın kuralın ilki: enerjiyi kes."},
 {q:"İş güvenliğinde 'beş altın kural'dan biri DEĞİLDİR?",opts:["Enerjiyi kesmek","Gerilimsizliği doğrulamak","Topraklama ve kısa devre etmek","Sigortayı büyütmek"],ans:3,ex:"Kurallar: kes, tekrar kapanmayı önle, gerilimsizliği doğrula, toprakla/kısa devre et, yalıt."},
 {q:"LOTO (Lockout-Tagout) ne anlama gelir?",opts:["Ölçüm-kontrol","Kilitle-etiketle","Topraklama-yalıtım","Kesme-bağlama"],ans:1,ex:"Enerji izolasyonunu kilitleyip etiketlemek."},
 {q:"Elektrik yangınında KULLANILMAMASI gereken söndürücü?",opts:["CO2","Kuru kimyevi toz","Su","Karbondioksit"],ans:2,ex:"İletken olduğu için su elektrik yangınında kullanılmaz."},
 {q:"Akıma kapılmış bir kişiye ilk müdahale?",opts:["Hemen elinden çekmek","Önce enerjiyi/akımı kesmek","Su dökmek","Beklemek"],ans:1,ex:"Önce kişiyi akımdan ayır/enerjiyi kes, sonra müdahale et."},
 {q:"Yüksekte çalışmada zorunlu KKD?",opts:["Emniyet kemeri/paraşüt tipi","Sadece eldiven","Gözlük yeterli","Maske"],ans:0,ex:"Düşmeye karşı tam vücut emniyet kemeri kullanılır."},
 {q:"İSG birimi (A1) için MYK teorik geçme notu?",opts:["50","60","70","80"],ans:2,ex:"A1 birimi geçme notu 70'tir."},
 {q:"Yalıtkan eldivenin amacı?",opts:["Sıcaktan korunma","Elektrik çarpmasından korunma","Kesilmeyi önleme","Kir tutmama"],ans:1,ex:"Yalıtkan eldiven çarpılmaya karşı korur; periyodik test edilir."},
 {q:"Atık kablo/kılıfların doğru yönetimi?",opts:["Çöpe atmak","Yakmak","Ayrı toplayıp geri dönüşüme vermek","Gömme"],ans:2,ex:"Çevre koruma: atıklar ayrıştırılıp geri dönüşüme verilir."},
 {q:"Riskli/YG çalışmasına başlamadan önce hangi belge alınır?",opts:["Fatura","İş izni (work permit)","Garanti","İrsaliye"],ans:1,ex:"Riskli işlerde iş izni/çalışma izni alınır."},
 {q:"Baret hangi riske karşı kullanılır?",opts:["Gürültü","Düşen cisim/çarpma","Toz","Titreşim"],ans:1,ex:"Baret kafayı düşen cisim ve çarpmalara karşı korur."},
 {q:"Topraklama ve kısa devre etmenin amacı?",opts:["Daha hızlı çalışmak","Çalışma süresince gerilimsizliği güvence altına almak","Aydınlatma","Ölçüm kolaylığı"],ans:1,ex:"Beklenmedik gerilime karşı çalışanı korur."}
],
meslek:[
 {q:"Sıva altı nemli ortam için uygun kablo?",opts:["NYA","NYM","NYAF","NYY"],ans:1,ex:"NYM (antigron) nemli sıva altı için uygundur."},
 {q:"Ampermetre devreye nasıl bağlanır?",opts:["Seri","Paralel","Çapraz","Toprağa"],ans:0,ex:"Ampermetre seri bağlanır."},
 {q:"Kaçak akım rölesinde can güvenliği eşiği?",opts:["10 mA","30 mA","100 mA","300 mA"],ans:1,ex:"İnsan koruması için 30 mA."},
 {q:"V = I·R bağıntısında akım I neye eşittir?",opts:["V·R","V/R","R/V","V−R"],ans:1,ex:"I = V/R."},
 {q:"Üç fazlı aktif güç formülü?",opts:["U·I","√3·U·I·cosφ","√3·U·I","U·I·sinφ"],ans:1,ex:"P = √3·U·I·cosφ."},
 {q:"Yıldırım/koruma topraklamasında istenen direnç?",opts:["Yüksek","Düşük","Sonsuz","Önemsiz"],ans:1,ex:"Topraklama direnci düşük olmalıdır."},
 {q:"RJ45 T568B diziliminde ilk renk?",opts:["Turuncu","Turuncu-Beyaz","Yeşil-Beyaz","Mavi"],ans:1,ex:"İlk sıra Turuncu-Beyaz."},
 {q:"Aydınlatma devresinde önerilen maksimum gerilim düşümü?",opts:["%3","%5","%10","%1"],ans:0,ex:"Aydınlatmada ≤%3."},
 {q:"C tipi otomatın açma akımı aralığı?",opts:["3–5·In","5–10·In","10–20·In","1–2·In"],ans:1,ex:"C eğrisi 5–10·In."},
 {q:"Transformatör hangi akımda çalışır?",opts:["DC","AC","Hem AC hem DC","Hiçbiri"],ans:1,ex:"Trafo yalnız AC'de çalışır."},
 {q:"Asenkron motorda yol alma akımını düşüren yöntem?",opts:["Kompanzasyon","Yıldız-üçgen","Topraklama","Parafudur"],ans:1,ex:"Yıldız-üçgen yolverme başlangıç akımını düşürür."},
 {q:"Kompanzasyon neyi düzeltir?",opts:["Gerilimi","Güç faktörünü (cosφ)","Frekansı","Direnci"],ans:1,ex:"Kompanzasyon cosφ'yi düzeltir."},
 {q:"Pano içinde akımı dağıtan iletken çubuk?",opts:["Bara","Sigorta","Klemens","Kontaktör"],ans:0,ex:"Bara (busbar) akımı dağıtır."},
 {q:"Türkiye şebekesinde faz-nötr gerilimi yaklaşık?",opts:["110 V","230 V","400 V","12 V"],ans:1,ex:"Faz-nötr ≈ 230 V."},
 {q:"Fazlar arası (hat) gerilimi yaklaşık?",opts:["230 V","400 V","690 V","110 V"],ans:1,ex:"Hat gerilimi ≈ 400 V (√3·230)."},
 {q:"Seri devrede sabit kalan büyüklük?",opts:["Akım","Gerilim","Güç","Direnç"],ans:0,ex:"Seri devrede akım her elemandan aynı geçer."},
 {q:"Osiloskop hangi değeri gösterir?",opts:["Etkin (RMS)","Maksimum (tepe)","Ortalama","Sıfır"],ans:1,ex:"Osiloskop tepe değeri okutur; Vrms=Vmax/√2."},
 {q:"İletken kesiti (mm²) neye göre seçilir?",opts:["Renge","Taşınacak akıma","Markaya","Uzunluğa bakılmaz"],ans:1,ex:"Kesit, taşınacak akıma göre seçilir."}
]
};

function renderMYK(){
  let hist='';
  if(DB.myk.length){
    hist=`<div class="sectiontitle" style="margin-top:18px"><h2 style="font-size:15px">MYK Deneme Geçmişi</h2><div class="ln"></div></div>`+
     DB.myk.slice(0,6).map(e=>`<div class="panel2" style="margin:8px 0"><div class="row" style="justify-content:space-between"><span>${e.date} · Seviye ${e.level} (≥%${e.thr})</span><b style="color:${e.pass?'var(--ok)':'var(--bad)'}">%${e.pct} ${e.pass?'GEÇTİ':'KALDI'}</b></div></div>`).join('');
  }
  app().innerHTML=`<div class="panel" style="border-left:4px solid var(--acc3)">
     <h2 style="margin:0">🎖️ MYK Mesleki Yeterlilik — Deneme Merkezi</h2>
     <div class="edu" style="margin-top:12px;border-left-color:var(--acc3)">${MYK_INFO}</div>
     <div class="msg info" style="display:block;margin-top:12px">ℹ️ Gerçek MYK sınav soruları telif korumalıdır ve yayımlanmaz. Buradaki sorular, <b>resmi yeterlilik birimleri ve sınav formatına uygun olarak hazırlanmış özgün deneme sorularıdır</b>.</div>
     <div class="row" style="margin-top:14px">
       <button class="btn purple" onclick="startMyk(3)">▶ Seviye 3 Denemesi (geçme %70)</button>
       <button class="btn" onclick="startMyk(4)">▶ Seviye 4 Denemesi (geçme %80)</button>
     </div>
   </div>${hist}`;
}
let MK=null;
function startMyk(level){
  const thr=level===4?80:70;
  const pool=[]; MYK_Q.isg.forEach((q,i)=>pool.push(Object.assign({qid:'myk.isg.'+i},q))); MYK_Q.meslek.forEach((q,i)=>pool.push(Object.assign({qid:'myk.meslek.'+i},q)));
  const items=shuffleItems(pool).slice(0,25);
  MK={items,level,thr,start:Date.now(),dur:50*60,timer:null};
  app().innerHTML=`<div class="panel"><div class="row" style="justify-content:space-between"><h2 style="margin:0">🎖️ MYK Deneme — Seviye ${level}</h2><div class="examtimer" id="mykTimer">50:00</div></div>
     <div class="muted" style="font-size:12px;margin-top:4px">25 soru · geçme ≥ %${thr} · yanlış doğruyu götürmez</div>
     <div id="mykBody" style="margin-top:12px"></div></div>`;
  startQuiz('mykBody',items,false,'Sınavı Bitir',mykFinish);
  MK.timer=setInterval(mykTick,1000);
}
function mykTick(){ if(!MK)return; const left=MK.dur-Math.floor((Date.now()-MK.start)/1000); const t=el('mykTimer'); if(!t){clearInterval(MK.timer);return;} if(left<=0){clearInterval(MK.timer);t.textContent='00:00'; if(QS&&!QS.checked)submitQuiz(); return;} t.textContent=fmt(left); if(left<=120)t.style.color='var(--bad)'; }
function mykFinish(c,t,pct){
  if(MK&&MK.timer)clearInterval(MK.timer);
  const pass=pct>=MK.thr;
  DB.myk=DB.myk||[]; DB.myk.unshift({date:todayStr(),level:MK.level,thr:MK.thr,pct,pass}); DB.myk=DB.myk.slice(0,20); persist();
  addXp(c*3); markToday(); refreshHeader();
  let out=`<div class="panel2" style="margin-top:14px;border-left:4px solid ${pass?'var(--ok)':'var(--bad)'}"><b style="font-size:16px">${pass?'🎉 Tebrikler — MYK Seviye '+MK.level+' denemesini geçtin!':'Geçme notunun altında kaldın.'}</b> · %${pct} (geçme ≥%${MK.thr})</div>`;
  if(pass) out+=`<div class="cert" id="cert"><div class="seal">🎖️</div><h2>MYK DENEME BAŞARI BELGESİ</h2>
     <div class="muted">Elektrik Tesisatçısı (15UY0241) tarzı deneme · ELK MASTER</div>
     <div class="nm">${DB.name?esc(DB.name):'(Panodan isim ekle)'}</div>
     <div style="font-size:14px">Seviye ${MK.level} teorik deneme sınavını <b style="color:var(--acc)">%${pct}</b> ile tamamlamıştır.</div>
     <div class="muted" style="font-size:11px;margin-top:8px">Not: Bu bir hazırlık denemesidir; resmi MYK belgesi yerine geçmez.</div>
     <div class="line"></div><div class="muted" style="font-size:12px">Tarih: ${todayStr()} · ELK-MYK-${Date.now().toString().slice(-6)}</div>
     <div class="row" style="justify-content:center;margin-top:14px"><button class="btn sm" onclick="window.print()">🖨️ Yazdır / PDF</button></div></div>`;
  out+=`<div class="row" style="margin-top:12px"><button class="btn purple" onclick="startMyk(${MK.level})">↻ Tekrar dene</button><button class="btn ghost" onclick="go('myk')">MYK Merkezi</button></div>`;
  const r=el('qresult'); if(r) r.insertAdjacentHTML('beforeend',out);
}

/* go yeniden tanımlanır — MYK rotası eklenir */

/* ===== EK: kaynaklardan 4 yeni modül (30-33) ===== */
CATS.elektronik={n:"Elektronik & Güç Elektroniği",c:"#06b6d4"};
CATS.guvenlik={n:"İş Güvenliği & İlk Yardım",c:"#f97316"};
MODS.push(
  {id:30, t:"Yarı İletkenler & Diyot", cat:"elektronik", ic:"🔻", d:"N/P tipi, diyot, tek yön geçirme, LED.", task:null},
  {id:31, t:"Doğrultucular (AC→DC)", cat:"elektronik", ic:"🔋", d:"Yarım/tam/köprü dalga doğrultma.", task:null},
  {id:32, t:"Transistör & Anahtarlama", cat:"elektronik", ic:"📡", d:"NPN/PNP, yükselteç ve anahtar.", task:null},
  {id:33, t:"Elektrik Çarpması & İlk Yardım", cat:"guvenlik", ic:"⚡", d:"Akım şiddeti etkileri, ilk müdahale.", task:null}
);
Object.assign(TEORI,{
30:`Maddeler iletkenlik bakımından <b>iletken, yalıtkan ve yarı iletken</b> olur. Yarı iletkenlerin (silisyum, germanyum) son yörüngesinde <b>4 elektron (valans)</b> bulunur.<br><b>Katkılama (doping):</b> 5 değerlikli katkı ile <b>N tipi</b> (fazla elektron), 3 değerlikli katkı ile <b>P tipi</b> (oyuk/hole) elde edilir.<br><b>Diyot</b> bir P-N birleşimidir; akımı yalnız <b>tek yönde (anot→katot)</b> geçirir. Doğru polarmada iletir, ters polarmada tıkar. <b>LED</b> ışık yayan diyottur.`,
31:`<b>Doğrultma</b>, alternatif akımı (AC) doğru akıma (DC) çevirme işlemidir; diyotların tek yön geçirme özelliğiyle yapılır. Adaptörler bunu yapar.<br>Üç tip: <b>(1) Yarım dalga</b> — tek diyot, yalnız bir alternansı geçirir, verimsiz. <b>(2) Tam dalga (orta uçlu trafo)</b> — iki diyot, her iki alternansı kullanır, güç iki katına çıkar. <b>(3) Köprü</b> — dört diyot, orta uçlu trafo gerekmez, en yaygın.<br>Çıkıştaki dalgalanmayı (ripple) <b>filtre kondansatörü</b> azaltır.`,
32:`<b>Transistör</b> üç katmanlı yarı iletkendir (<b>NPN</b> veya <b>PNP</b>) ve üç uçludur: <b>Beyz (B), Kolektör (C), Emiter (E)</b>.<br>İki temel işlevi vardır: <b>anahtarlama</b> (aç-kapa, dijital) ve <b>yükseltme</b> (küçük beyz akımıyla büyük kolektör akımını kontrol etme).<br>Küçük bir kumanda sinyaliyle büyük yükü sürer — röle/kontaktörün elektronik karşılığıdır.`,
33:`Tehlikeyi belirleyen <b>vücuttan geçen akımın şiddetidir</b> (gerilim değil, akım öldürür). Yaklaşık eşikler: ~1 mA hissetme, 1–5 mA uyuşma, 5–15 mA kramp, 15–25 mA kasların kontrol kaybı (bırakamama), <b>80–100 mA ve üzeri kalp fibrilasyonu</b> ve ölüm riski.<br><b>AA, eşit değerdeki DA'dan daha tehlikelidir.</b><br><b>İlk müdahale:</b> önce enerjiyi kes ya da yalıtkan bir cisimle kişiyi akımdan ayır; sonra 112'yi ara, gerekirse CPR uygula.`,
});
Object.assign(FOY,{
30:`<b>Sınıflar:</b> iletken (çok serbest elektron), yalıtkan (yok denecek kadar az), yarı iletken (4 valans elektron).<br><b>N tipi:</b> 5 değerlikli katkı → fazla elektron (n: negatif taşıyıcı). <b>P tipi:</b> 3 değerlikli katkı → oyuk (p: pozitif).<br><b>Diyot = P-N:</b> anot (P) → katot (N) yönünde iletir.<br><b>Doğru polarma:</b> anot +, katot − → iletir. <b>Ters polarma:</b> tıkar.<br><b>LED:</b> iletimde ışık yayar.`,
31:`<b>Yarım dalga:</b> 1 diyot, çıkış kesik (verimsiz).<br><b>Tam dalga (orta uçlu):</b> 2 diyot, her iki yarı periyot kullanılır → güç ~2 katı.<br><b>Köprü:</b> 4 diyot, orta uçlu trafo gerekmez → en yaygın.<br><b>Filtre kondansatörü</b> DC'yi düzleştirir (ripple azalır).<br><b>Örnek:</b> telefon adaptörü = trafo + köprü doğrultucu + filtre.`,
32:`<b>Uçlar:</b> Beyz (kumanda), Kolektör, Emiter.<br><b>Türler:</b> NPN, PNP.<br><b>Anahtar modu:</b> beyz sinyali varsa C-E iletir (ON), yoksa kesim (OFF).<br><b>Yükselteç modu:</b> küçük beyz akımındaki değişim, kolektörde büyük akım değişimi yaratır (kazanç).<br><b>Sezgi:</b> transistör = elektronik kontaktör/musluk.`,
33:`<b>Akım–etki (yaklaşık):</b><br>• 0,5–1 mA: hissetme<br>• 1–5 mA: uyuşma<br>• 5–15 mA: kramp, bırakmada zorluk<br>• 15–25 mA: kaslar kasılır, bırakamama<br>• 80–100 mA+: <b>kalp fibrilasyonu, bilinç kaybı, ölüm</b><br><b>Neden AA daha tehlikeli?</b> 50 Hz kalp ritmini bozmaya daha yatkındır.<br><b>İlk yardım:</b> 1) Enerjiyi kes / yalıtkanla ayır 2) 112 3) Bilinç/solunum yoksa CPR 4) Yanıkları soğut.`,
});

/* ===== EK: yeni modül soruları + mevcut modüllere ek sorular ===== */
Object.assign(QBANK,{
30:[
 {q:"Yarı iletkenin son yörüngesinde kaç elektron bulunur?",opts:["2","4","6","8"],ans:1,ex:"Yarı iletkenlerde valans yörüngesinde 4 elektron vardır."},
 {q:"Elektronikte en yaygın iki yarı iletken?",opts:["Bakır-Demir","Silisyum-Germanyum","Altın-Gümüş","Çinko-Nikel"],ans:1,ex:"Silisyum ve germanyum yaygın yarı iletkenlerdir."},
 {q:"5 değerlikli katkı ile elde edilen yarı iletken?",opts:["N tipi","P tipi","Yalıtkan","İletken"],ans:0,ex:"Fazla elektron → N tipi."},
 {q:"Diyot akımı hangi yönde geçirir?",opts:["Her iki yön","Tek yön (anot→katot)","Hiçbir yön","Rastgele"],ans:1,ex:"Diyot tek yönlüdür; anottan katoda iletir."},
 {q:"Diyot doğru polarmada nasıl davranır?",opts:["Tıkar","İletir","Patlar","Isınmaz"],ans:1,ex:"Doğru polarma (anot +) → iletir."},
 {q:"Ters polarmada diyot?",opts:["İletir","Tıkar (yalıtkan)","Yükseltir","Doğrultur"],ans:1,ex:"Ters polarmada akımı geçirmez."},
 {q:"LED nedir?",opts:["Işık yayan diyot","Direnç","Kondansatör","Transistör"],ans:0,ex:"LED = Light Emitting Diode (ışık yayan diyot)."},
 {q:"P tipi yarı iletkende çoğunluk taşıyıcısı?",opts:["Elektron","Oyuk (hole)","Proton","Nötron"],ans:1,ex:"P tipinde çoğunluk taşıyıcı oyuktur."}
],
31:[
 {q:"Doğrultma işlemi nedir?",opts:["DC'yi AC'ye çevirme","AC'yi DC'ye çevirme","Gerilim yükseltme","Akım ölçme"],ans:1,ex:"Doğrultma AC'yi DC'ye çevirir."},
 {q:"Kaç tip doğrultucu vardır?",opts:["2","3","4","5"],ans:1,ex:"Yarım dalga, tam dalga, köprü."},
 {q:"Yarım dalga doğrultucuda kaç diyot vardır?",opts:["1","2","4","6"],ans:0,ex:"Yarım dalga tek diyotludur."},
 {q:"Köprü doğrultucuda kaç diyot vardır?",opts:["1","2","4","8"],ans:2,ex:"Köprü doğrultucu 4 diyotludur."},
 {q:"Köprü doğrultucunun avantajı?",opts:["Orta uçlu trafo gerektirmez","Tek diyot yeter","DC üretmez","Verimsizdir"],ans:0,ex:"Köprü, orta uçlu trafoya ihtiyaç duymaz."},
 {q:"Tam dalga doğrultucunun yarım dalgaya göre avantajı?",opts:["Daha az diyot","Gücü ~2 katına çıkarır","DC vermez","Daha ucuz"],ans:1,ex:"Her iki alternans kullanıldığından güç ~2 kat."},
 {q:"Çıkıştaki dalgalanmayı (ripple) azaltan eleman?",opts:["Filtre kondansatörü","Sigorta","Diyot sayısı","Trafo"],ans:0,ex:"Filtre kondansatörü DC'yi düzleştirir."},
 {q:"Telefon adaptörü temelde ne yapar?",opts:["DC'yi AC yapar","AC'yi DC yapar","Frekans artırır","Direnç ölçer"],ans:1,ex:"Adaptör şebeke AC'sini cihaz DC'sine doğrultur."}
],
32:[
 {q:"Transistör kaç uçludur?",opts:["2","3","4","5"],ans:1,ex:"Beyz, Kolektör, Emiter — üç uç."},
 {q:"Transistör türleri?",opts:["N ve P","NPN ve PNP","A ve B","AC ve DC"],ans:1,ex:"İki temel tür: NPN ve PNP."},
 {q:"Transistörün iki temel işlevi?",opts:["Ölçme ve doğrultma","Anahtarlama ve yükseltme","Topraklama ve yalıtım","Isıtma ve soğutma"],ans:1,ex:"Anahtar (aç-kapa) ve yükselteç olarak çalışır."},
 {q:"Transistörde kumanda ucu hangisidir?",opts:["Beyz","Kolektör","Emiter","Toprak"],ans:0,ex:"Beyz akımı C-E iletimini kontrol eder."},
 {q:"Küçük beyz akımı neyi kontrol eder?",opts:["Büyük kolektör akımını","Gerilimi sıfırlar","Frekansı","Direnci"],ans:0,ex:"Küçük beyz sinyali büyük kolektör akımını sürer."},
 {q:"Transistör neyin elektronik karşılığı sayılır?",opts:["Sigortanın","Röle/anahtarın","Trafonun","Sayacın"],ans:1,ex:"Küçük sinyalle büyük yükü sürdüğü için röle/anahtar gibidir."},
 {q:"Dijital devrede transistör nasıl çalışır?",opts:["Aç-kapa anahtar","Sadece yükselteç","Doğrultucu","Ölçü aleti"],ans:0,ex:"Dijitalde ON/OFF anahtar olarak kullanılır."},
 {q:"Yükselteçte transistörün görevi?",opts:["Küçük sinyali büyütmek","Sinyali yok etmek","DC üretmek","Topraklamak"],ans:0,ex:"Zayıf sinyali kazançla büyütür."}
],
33:[
 {q:"Elektrik çarpmasında tehlikeyi asıl belirleyen?",opts:["Gerilim","Akım şiddeti","Renk","Frekans markası"],ans:1,ex:"Vücuttan geçen akımın şiddeti tehlikeyi belirler."},
 {q:"Yaklaşık 1 mA akımın etkisi?",opts:["Ölüm","Hissetme/gıdıklanma","Fibrilasyon","Hiçbir şey"],ans:1,ex:"~1 mA hissetme sınırıdır."},
 {q:"80–100 mA ve üzeri akımın etkisi?",opts:["Hafif uyuşma","Kalp fibrilasyonu, ölüm riski","Sadece kramp","Etkisiz"],ans:1,ex:"Bu seviyede kalp fibrilasyonu ve ölüm riski vardır."},
 {q:"15–25 mA akımda tipik etki?",opts:["Hiçbir şey","Kasların kasılması, bırakamama","Serinleme","Görme kaybı"],ans:1,ex:"Kaslar kasılır, kişi iletkeni bırakamayabilir."},
 {q:"Eşit değerde hangisi daha tehlikelidir?",opts:["Doğru akım (DA)","Alternatif akım (AA)","İkisi eşit","Hiçbiri"],ans:1,ex:"AA (50 Hz) kalp ritmini bozmaya daha yatkındır."},
 {q:"Çarpılan birine İLK müdahale?",opts:["Hemen elinden tutmak","Önce enerjiyi kes / akımdan ayır","Su dökmek","Beklemek"],ans:1,ex:"Önce enerjiyi kes veya yalıtkanla ayır."},
 {q:"Kişiyi akımdan ayırırken ne kullanılır?",opts:["Çıplak el","Yalıtkan bir cisim","Islak bez","Metal çubuk"],ans:1,ex:"Kuru/yalıtkan cisimle ayrılır, çıplak elle değil."},
 {q:"Bilinç/solunum yoksa ne yapılır?",opts:["Beklenir","112 aranır ve gerekirse CPR","Su verilir","Yürütülür"],ans:1,ex:"112 aranır; gerekirse kalp masajı (CPR) uygulanır."}
]
});
/* mevcut modüllere ek sorular (kaynaklardan) */
QBANK[1]=QBANK[1].concat([
 {q:"Atomun çekirdeğindeki yük?",opts:["Negatif","Pozitif (proton)","Nötr","Yok"],ans:1,ex:"Çekirdek protonlar (pozitif) ve nötronlardan oluşur."},
 {q:"Metal iletkende akımı taşıyan?",opts:["Proton","Serbest elektron","Nötron","Oyuk"],ans:1,ex:"İletkende serbest elektronlar akımı taşır."},
 {q:"Maddeler iletkenlik bakımından kaça ayrılır?",opts:["2","3 (iletken/yalıtkan/yarı iletken)","4","5"],ans:1,ex:"İletken, yalıtkan ve yarı iletken."}
]);
QBANK[18]=QBANK[18].concat([
 {q:"Sadece dirençli devrede çekilen güç türü?",opts:["Reaktif","Aktif (P)","Görünür","Yok"],ans:1,ex:"Saf dirençli yük aktif güç (P, Watt) çeker."},
 {q:"Saf bobin/kondansatörlü devrede güç türü?",opts:["Aktif","Reaktif (Q)","Isı","Yok"],ans:1,ex:"Saf L veya C reaktif güç (Q, Var) çeker."}
]);
QBANK[25]=QBANK[25].concat([
 {q:"Bir fazlı asenkron motorda yardımcı sargıya seri bağlanan?",opts:["Direnç","Kondansatör","Diyot","Sigorta"],ans:1,ex:"Yol verme momenti için yardımcı sargıya kondansatör bağlanır."},
 {q:"Sincap kafesli motora yol verme yöntemlerinden biri?",opts:["Parafudur","Yıldız-üçgen","Kompanzasyon","Doğrultma"],ans:1,ex:"Yıldız-üçgen, ön direnç veya soft starter kullanılır."}
]);
QBANK[5]=QBANK[5].concat([
 {q:"Zaman rölesinde ayarlanabilen temel parametre?",opts:["Renk","Zaman/gecikme","Ağırlık","Frekans markası"],ans:1,ex:"Zaman rölesinde gecikme süresi ayarlanır."}
]);

/* ===== EK: yeni modül şemaları + interaktif görevler ===== */
Object.assign(DIAG,{
30:`<svg viewBox="0 0 420 140"><line x1="40" y1="70" x2="160" y2="70" stroke="#8a98ab" stroke-width="2"/><polygon points="160,50 160,90 200,70" fill="#06b6d4"/><line x1="200" y1="48" x2="200" y2="92" stroke="#06b6d4" stroke-width="4"/><line x1="200" y1="70" x2="320" y2="70" stroke="#8a98ab" stroke-width="2"/><text x="110" y="105" fill="#06b6d4" font-size="12">Anot (+)</text><text x="232" y="105" fill="#06b6d4" font-size="12">Katot (−)</text><polygon points="270,62 258,56 258,68" fill="#3fb950"/><text x="120" y="40" fill="#3fb950" font-size="12">akım tek yön →</text></svg>`,
31:`<svg viewBox="0 0 420 150"><line x1="20" y1="80" x2="400" y2="80" stroke="#26313f"/><path d="M30,80 Q60,25 90,80 Q120,135 150,80 Q180,25 210,80" fill="none" stroke="#33b1ff" stroke-width="2"/><text x="60" y="125" fill="#33b1ff" font-size="11">Giriş AC</text><path d="M245,80 Q275,25 305,80 Q335,25 365,80" fill="none" stroke="#3fb950" stroke-width="3"/><text x="270" y="125" fill="#3fb950" font-size="11">Doğrultulmuş DC</text></svg>`,
32:`<svg viewBox="0 0 420 150"><circle cx="200" cy="75" r="40" fill="none" stroke="#8a98ab" stroke-width="2"/><line x1="120" y1="75" x2="168" y2="75" stroke="#06b6d4" stroke-width="3"/><text x="100" y="79" fill="#06b6d4" font-size="13">B</text><line x1="220" y1="52" x2="262" y2="26" stroke="#ffb000" stroke-width="3"/><text x="268" y="30" fill="#ffb000" font-size="13">C</text><line x1="220" y1="98" x2="262" y2="124" stroke="#3fb950" stroke-width="3"/><text x="268" y="128" fill="#3fb950" font-size="13">E</text><text x="183" y="80" fill="#e8eef6" font-size="13">NPN</text></svg>`,
33:`<svg viewBox="0 0 420 130"><defs><linearGradient id="cg"><stop offset="0%" stop-color="#3fb950"/><stop offset="55%" stop-color="#d29922"/><stop offset="100%" stop-color="#f85149"/></linearGradient></defs><rect x="20" y="44" width="380" height="26" rx="6" fill="url(#cg)"/><text x="20" y="34" fill="#e8eef6" font-size="12">Akım şiddeti arttıkça tehlike artar →</text><text x="22" y="92" fill="#3fb950" font-size="11">~1 mA hissetme</text><text x="150" y="92" fill="#d29922" font-size="11">15–25 mA bırakamama</text><text x="300" y="92" fill="#f85149" font-size="11">80+ fibrilasyon</text></svg>`
});

/* M31 DOĞRULTUCU */

/* M33 ÇARPILMA */

/* ===== EK: kalan modüller için şemalar (tüm modüller görselli) ===== */
Object.assign(DIAG,{
3:`<svg viewBox="0 0 460 160">
 <circle cx="60" cy="58" r="30" fill="#1a2230" stroke="#8a98ab" stroke-width="2"/><circle cx="60" cy="58" r="11" fill="#c8772e"/>
 <text x="60" y="112" fill="#33b1ff" font-size="13" text-anchor="middle">NYA</text><text x="60" y="130" fill="#8a98ab" font-size="10" text-anchor="middle">tek tel · pano içi</text>
 <circle cx="170" cy="58" r="30" fill="#1a2230" stroke="#8a98ab" stroke-width="2"/>
 ${[[170,58],[162,52],[178,52],[162,64],[178,64],[170,48],[170,68],[156,58],[184,58]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" fill="#c8772e"/>`).join('')}
 <text x="170" y="112" fill="#33b1ff" font-size="13" text-anchor="middle">NYAF</text><text x="170" y="130" fill="#8a98ab" font-size="10" text-anchor="middle">çok tel · esnek/motor</text>
 <circle cx="290" cy="58" r="30" fill="#2b313b" stroke="#8a98ab" stroke-width="2"/>${[[278,58],[302,58],[290,46]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#c8772e" stroke="#0006"/>`).join('')}
 <text x="290" y="112" fill="#33b1ff" font-size="13" text-anchor="middle">NYM</text><text x="290" y="130" fill="#8a98ab" font-size="10" text-anchor="middle">nemli sıva altı</text>
 <circle cx="400" cy="58" r="30" fill="#0e1014" stroke="#8a98ab" stroke-width="2"/>${[[388,58],[412,58],[400,46],[400,70]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#c8772e" stroke="#0006"/>`).join('')}
 <text x="400" y="112" fill="#33b1ff" font-size="13" text-anchor="middle">NYY</text><text x="400" y="130" fill="#8a98ab" font-size="10" text-anchor="middle">yer altı · zırhlı kılıf</text></svg>`,
5:`<svg viewBox="0 0 440 160"><circle cx="60" cy="60" r="24" fill="none" stroke="#ffb000" stroke-width="2"/><text x="60" y="65" fill="#ffb000" font-size="11" text-anchor="middle">LDR</text><text x="40" y="110" fill="#8a98ab" font-size="11">ışık sensörü</text>
 <line x1="84" y1="60" x2="150" y2="60" stroke="#8a98ab" stroke-width="2"/>
 <rect x="150" y="38" width="90" height="44" rx="5" fill="#1b2430" stroke="#33b1ff" stroke-width="2"/><text x="195" y="64" fill="#33b1ff" font-size="12" text-anchor="middle">Kontaktör</text>
 <line x1="240" y1="60" x2="300" y2="60" stroke="#8a98ab" stroke-width="2"/>
 <circle cx="330" cy="60" r="22" fill="radial-gradient(#ffd400,#b58a00)"/><circle cx="330" cy="60" r="22" fill="#ffd400"/><text x="330" y="64" fill="#000" font-size="11" text-anchor="middle">L</text>
 <text x="150" y="120" fill="#3fb950" font-size="11">Karanlık → kontaktör çeker → lamba yanar (≈19:00)</text></svg>`,
6:`<svg viewBox="0 0 440 160">${[['T1\\nGündüz',60,90,'#33b1ff'],['T2\\nPuant',150,130,'#f85149'],['T3\\nGece',240,40,'#3fb950']].map(b=>`<rect x="${b[1]}" y="${140-b[2]}" width="60" height="${b[2]}" rx="4" fill="${b[3]}" opacity="0.85"/>`).join('')}
 <text x="90" y="155" fill="#33b1ff" font-size="11" text-anchor="middle">T1 orta</text><text x="180" y="155" fill="#f85149" font-size="11" text-anchor="middle">T2 pahalı</text><text x="270" y="155" fill="#3fb950" font-size="11" text-anchor="middle">T3 ucuz</text>
 <text x="330" y="60" fill="#e8eef6" font-size="13">Yükü T2 → T3'e</text><text x="330" y="80" fill="#e8eef6" font-size="13">kaydır = tasarruf</text></svg>`,
8:`<svg viewBox="0 0 440 150"><rect x="30" y="40" width="170" height="70" rx="8" fill="#1b2430" stroke="#a371ff" stroke-width="2"/><text x="115" y="70" fill="#a371ff" font-size="13" text-anchor="middle">Adam-saat</text><text x="115" y="92" fill="#cdd7e2" font-size="12" text-anchor="middle">işçi × saat</text>
 <rect x="240" y="40" width="180" height="70" rx="8" fill="#1b2430" stroke="#3fb950" stroke-width="2"/><text x="330" y="70" fill="#3fb950" font-size="13" text-anchor="middle">Hakediş</text><text x="330" y="92" fill="#cdd7e2" font-size="12" text-anchor="middle">metraj × birim fiyat</text></svg>`,
9:`<svg viewBox="0 0 440 150"><rect x="30" y="50" width="90" height="50" rx="6" fill="#1b2430" stroke="#33b1ff" stroke-width="2"/><text x="75" y="80" fill="#33b1ff" font-size="12" text-anchor="middle">Şebeke</text>
 <rect x="175" y="40" width="90" height="70" rx="6" fill="#241d07" stroke="#ffb000" stroke-width="2"/><text x="220" y="72" fill="#ffb000" font-size="13" text-anchor="middle">ATS</text><text x="220" y="92" fill="#8a98ab" font-size="10" text-anchor="middle">≤ 1 sn</text>
 <rect x="320" y="50" width="90" height="50" rx="6" fill="#11331c" stroke="#3fb950" stroke-width="2"/><text x="365" y="80" fill="#3fb950" font-size="12" text-anchor="middle">Jeneratör</text>
 <line x1="120" y1="75" x2="175" y2="75" stroke="#8a98ab" stroke-width="2"/><line x1="265" y1="75" x2="320" y2="75" stroke="#8a98ab" stroke-width="2"/></svg>`,
12:`<svg viewBox="0 0 440 150">${[['I','A','#33b1ff'],['V','V','#ffb000'],['R','Ω','#3fb950'],['P','W','#a371ff'],['f','Hz','#f85149']].map((c,i)=>`<rect x="${20+i*84}" y="45" width="70" height="60" rx="10" fill="#1b2430" stroke="${c[2]}" stroke-width="2"/><text x="${55+i*84}" y="78" fill="${c[2]}" font-size="20" text-anchor="middle" font-weight="700">${c[0]}</text><text x="${55+i*84}" y="96" fill="#cdd7e2" font-size="12" text-anchor="middle">${c[1]}</text>`).join('')}
 <text x="20" y="130" fill="#8a98ab" font-size="11">Her büyüklüğün birimi ve ölçü aleti vardır</text></svg>`,
13:`<svg viewBox="0 0 440 150"><rect x="40" y="40" width="120" height="40" rx="4" fill="#11331c" stroke="#3fb950" stroke-width="2"/><text x="100" y="65" fill="#bdf0c8" font-size="12" text-anchor="middle">Gerçek Xg</text>
 <rect x="40" y="90" width="100" height="34" rx="4" fill="#2a2010" stroke="#ffb000" stroke-width="2"/><text x="90" y="112" fill="#ffd089" font-size="12" text-anchor="middle">Ölçülen X</text>
 <text x="200" y="70" fill="#e8eef6" font-size="14">ΔX = |Xg − X|</text><text x="200" y="98" fill="#33b1ff" font-size="14">ε = ΔX / Xg × 100</text></svg>`,
15:`<svg viewBox="0 0 460 130">${['Oksidasyon','Soyma','Krimp','Lehim','Makaron'].map((s,i)=>`<rect x="${10+i*90}" y="45" width="78" height="40" rx="6" fill="#1b2430" stroke="#ffb000" stroke-width="2"/><text x="${49+i*90}" y="69" fill="#ffd089" font-size="11" text-anchor="middle">${i+1}·${s}</text>`).join('')}
 ${[0,1,2,3].map(i=>`<polygon points="${88+i*90},65 ${100+i*90},58 ${100+i*90},72" fill="#3fb950"/>`).join('')}</svg>`,
16:`<svg viewBox="0 0 440 150"><path d="M70,40 q-20,30 0,60 q20,30 0,30" fill="none" stroke="#c8772e" stroke-width="4"/><polygon points="60,30 90,30 75,55" fill="#9aa4b2"/><text x="55" y="120" fill="#8a98ab" font-size="11">yüksük yukarı (shed water)</text>
 <text x="210" y="55" fill="#3fb950" font-size="12">✔ saat yönü büküm</text><text x="210" y="80" fill="#3fb950" font-size="12">✔ yank (çekme) testi</text><text x="210" y="105" fill="#f85149" font-size="12">✘ ringing (yüzük atma)</text></svg>`,
17:`<svg viewBox="0 0 460 130">${[['~','AC'],['—','DC'],['⊥','dik'],['⊓','yatay'],['!','dikkat']].map((c,i)=>`<rect x="${14+i*90}" y="35" width="76" height="56" rx="8" fill="#1b2430" stroke="#33b1ff" stroke-width="2"/><text x="${52+i*90}" y="68" fill="#e8eef6" font-size="22" text-anchor="middle">${c[0]}</text><text x="${52+i*90}" y="106" fill="#8a98ab" font-size="11" text-anchor="middle">${c[1]}</text>`).join('')}</svg>`,
19:`<svg viewBox="0 0 440 160"><rect x="160" y="20" width="120" height="34" rx="5" fill="#241d07" stroke="#ffb000" stroke-width="2"/><text x="220" y="42" fill="#ffd089" font-size="12" text-anchor="middle">Ana Pano (ADP)</text>
 ${[80,220,360].map(x=>`<rect x="${x-45}" y="80" width="90" height="30" rx="5" fill="#1b2430" stroke="#33b1ff" stroke-width="2"/><text x="${x}" y="100" fill="#33b1ff" font-size="11" text-anchor="middle">Tali pano</text><line x1="220" y1="54" x2="${x}" y2="80" stroke="#8a98ab" stroke-width="1.5"/>`).join('')}
 ${[80,220,360].map(x=>`<rect x="${x-40}" y="128" width="80" height="24" rx="4" fill="#10151d" stroke="#3fb950" stroke-width="1.5"/><text x="${x}" y="144" fill="#3fb950" font-size="10" text-anchor="middle">Kat panosu</text><line x1="${x}" y1="110" x2="${x}" y2="128" stroke="#8a98ab" stroke-width="1.5"/>`).join('')}</svg>`,
20:`<svg viewBox="0 0 440 150"><rect x="40" y="50" width="80" height="50" rx="6" fill="#1b2430" stroke="#8a98ab" stroke-width="2"/><text x="80" y="80" fill="#cdd7e2" font-size="12" text-anchor="middle">Dizel motor</text>
 <line x1="120" y1="75" x2="160" y2="75" stroke="#8a98ab" stroke-width="3"/>
 <circle cx="195" cy="75" r="32" fill="none" stroke="#22c55e" stroke-width="2"/><text x="195" y="80" fill="#22c55e" font-size="12" text-anchor="middle">Alternatör</text>
 <line x1="227" y1="75" x2="270" y2="75" stroke="#ffb000" stroke-width="3"/><rect x="270" y="55" width="80" height="40" rx="5" fill="#241d07" stroke="#ffb000" stroke-width="2"/><text x="310" y="80" fill="#ffd089" font-size="12" text-anchor="middle">ATS</text></svg>`,
22:`<svg viewBox="0 0 440 160"><circle cx="80" cy="40" r="14" fill="#ffd400"/>${[0,1,2,3].map(i=>`<line x1="80" y1="56" x2="${50+i*20}" y2="92" stroke="#ffd400" stroke-width="2" opacity="0.6"/>`).join('')}<rect x="60" y="92" width="40" height="14" fill="#3a2f1a"/><text x="40" y="124" fill="#cdd7e2" font-size="11">bahçe armatürü (IP65)</text>
 <rect x="210" y="95" width="200" height="18" fill="#2b231a"/><line x1="210" y1="104" x2="410" y2="104" stroke="#c8772e" stroke-width="3" stroke-dasharray="6 4"/><text x="210" y="135" fill="#8a98ab" font-size="11">NYY · ~60 cm derin + ikaz bandı</text></svg>`,
23:`<svg viewBox="0 0 440 150"><circle cx="150" cy="70" r="40" fill="#33b1ff22" stroke="#33b1ff" stroke-width="2"/><text x="150" y="74" fill="#33b1ff" font-size="12" text-anchor="middle">Elektrik</text>
 <circle cx="250" cy="70" r="40" fill="#ffb00022" stroke="#ffb000" stroke-width="2"/><text x="250" y="74" fill="#ffb000" font-size="12" text-anchor="middle">Mekanik</text>
 <circle cx="200" cy="110" r="34" fill="#a371ff22" stroke="#a371ff" stroke-width="2"/><text x="200" y="120" fill="#a371ff" font-size="11" text-anchor="middle">İnşaat</text>
 <text x="310" y="74" fill="#e8eef6" font-size="12">Çakışma (clash)</text><text x="310" y="94" fill="#e8eef6" font-size="12">koordinasyonu</text></svg>`,
27:`<svg viewBox="0 0 440 150"><line x1="40" y1="120" x2="400" y2="120" stroke="#26313f"/><line x1="40" y1="120" x2="40" y2="30" stroke="#26313f"/>
 <path d="M60,120 L60,60 L120,60" fill="none" stroke="#3fb950" stroke-width="3"/><text x="70" y="50" fill="#3fb950" font-size="11">B (3–5·In)</text>
 <path d="M150,120 L150,80 L230,80" fill="none" stroke="#ffb000" stroke-width="3"/><text x="160" y="72" fill="#ffb000" font-size="11">C (5–10·In)</text>
 <path d="M260,120 L260,100 L360,100" fill="none" stroke="#f85149" stroke-width="3"/><text x="270" y="92" fill="#f85149" font-size="11">D (10–20·In)</text>
 <text x="300" y="45" fill="#8a98ab" font-size="11">Açma eğrileri</text></svg>`,
29:`<svg viewBox="0 0 460 140">${['Kes','Kilitle/Etiketle','Gerilimsiz doğrula','Toprakla','Yalıt'].map((s,i)=>`<rect x="${8+i*90}" y="45" width="80" height="48" rx="8" fill="#1b2430" stroke="#f97316" stroke-width="2"/><text x="${48+i*90}" y="66" fill="#f97316" font-size="14" text-anchor="middle" font-weight="700">${i+1}</text><text x="${48+i*90}" y="84" fill="#cdd7e2" font-size="9.5" text-anchor="middle">${s}</text>`).join('')}
 <text x="8" y="28" fill="#e8eef6" font-size="13">İş güvenliğinde 5 Altın Kural</text></svg>`
});

/* ===== EK: MODÜL 34 — GERÇEKÇİ PANO ATÖLYESİ ===== */
MODS.push({id:34, t:"Pano Atölyesi (Gerçekçi Pano)", cat:"pano", ic:"🧰", d:"DIN ray, MCB/RCD/voltaj koruma, canlı kablo akışı.", task:null});
Object.assign(TEORI,{
34:`Dağıtım panosu, enerjinin güvenle dağıtıldığı yerdir. <b>DIN ray</b> üzerine modüler cihazlar dizilir: <b>ana şalter</b> → <b>kaçak akım rölesi (RCD, 30 mA)</b> → <b>voltaj koruma rölesi</b> → devre başına <b>otomatik sigortalar (MCB, örn. C16)</b>.<br>Renk kodu: <b>Faz</b> kahverengi/siyah, <b>Nötr</b> mavi, <b>Toprak</b> sarı-yeşil.<br>Besleme sırası: Sayaç → Ana şalter → RCD → MCB'ler → linyeler (aydınlatma, priz, mutfak...).`,
});
Object.assign(FOY,{
34:`<b>Modüler cihazlar (DIN ray):</b><br>• <b>Ana şalter:</b> tüm panoyu açıp kapatır.<br>• <b>RCD (kaçak akım):</b> faz-nötr farkını ölçer; 30 mA'i aşınca keser → can güvenliği.<br>• <b>Voltaj koruma rölesi:</b> aşırı/düşük gerilimde (örn. &lt;195 V veya &gt;253 V) cihazları korumak için keser.<br>• <b>MCB (otomatik sigorta):</b> aşırı akım/kısa devrede açar (B/C/D eğrileri).<br><b>Sıra önemlidir:</b> koruma yukarıdan aşağıya kademelenir (seçicilik).<br><b>Uygulamada:</b> kaçak simüle et → RCD'nin tüm hattı kestiğini gör; gerilimi yükselt → voltaj korumanın devreye girişini izle.`,
});
Object.assign(QBANK,{
34:[
 {q:"RCD (kaçak akım rölesi) can güvenliği eşiği?",opts:["10 mA","30 mA","300 mA","3 A"],ans:1,ex:"İnsan koruması için 30 mA."},
 {q:"MCB (otomatik sigorta) neye karşı korur?",opts:["Aşırı akım/kısa devre","Aşırı ışık","Nem","Gürültü"],ans:0,ex:"MCB aşırı akım ve kısa devrede açar."},
 {q:"DIN ray ne işe yarar?",opts:["Topraklama","Modüler cihazların montajı","Aydınlatma","Ölçüm"],ans:1,ex:"Modüler pano cihazları DIN raya geçirilir."},
 {q:"Doğru besleme sırası?",opts:["MCB→RCD→Ana","Sayaç→Ana şalter→RCD→MCB","RCD→Sayaç→MCB","MCB→Ana→Sayaç"],ans:1,ex:"Koruma kademeli: ana → RCD → MCB."},
 {q:"Nötr iletkeni rengi?",opts:["Mavi","Kahverengi","Sarı-yeşil","Kırmızı"],ans:0,ex:"Nötr mavidir."},
 {q:"Toprak (koruma) iletkeni rengi?",opts:["Mavi","Sarı-yeşil","Siyah","Beyaz"],ans:1,ex:"Toprak sarı-yeşildir."},
 {q:"Voltaj koruma rölesi ne yapar?",opts:["Akım ölçer","Aşırı/düşük gerilimde keser","Aydınlatır","Topraklar"],ans:1,ex:"Belirlenen sınırların dışında enerjiyi keser."},
 {q:"C16 etiketi neyi belirtir?",opts:["C eğrisi, 16 A","16 V","16 devre","C sınıfı kablo"],ans:0,ex:"C tipi açma eğrisi, 16 amper anma akımı."}
]
});
Object.assign(DIAG,{
34:`<svg viewBox="0 0 440 130"><rect x="20" y="55" width="400" height="20" fill="url(#rail)"/><defs><linearGradient id="rail" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7dde3"/><stop offset="0.5" stop-color="#aeb6bf"/><stop offset="1" stop-color="#d7dde3"/></linearGradient></defs>
 <rect x="30" y="35" width="40" height="60" rx="3" fill="#fff" stroke="#c2c8cf"/><rect x="44" y="44" width="12" height="16" rx="2" fill="#e23b32"/><text x="50" y="108" fill="#cdd7e2" font-size="9" text-anchor="middle">ANA</text>
 <rect x="80" y="35" width="70" height="60" rx="3" fill="#fff" stroke="#c2c8cf"/><text x="115" y="70" fill="#000" font-size="9" text-anchor="middle">RCD 30mA</text>
 ${[0,1,2,3].map(i=>`<rect x="${165+i*40}" y="35" width="34" height="60" rx="3" fill="#fff" stroke="#c2c8cf"/><rect x="${176+i*40}" y="44" width="12" height="14" rx="2" fill="#e23b32"/><text x="${182+i*40}" y="108" fill="#cdd7e2" font-size="8" text-anchor="middle">C16</text>`).join('')}</svg>`,
});

/* ===== EK: sürükle-bırak sıralama + doğru cevap gösterimi ===== */
/* RJ45 */

/* AKÜ */

/* ===== TEORİ DERİNLEŞTİRME (1-17) — quizler buradan çözülebilir ===== */
Object.assign(TEORI,{
1:`<b>Akım, gerilim, direnç.</b> Elektrik akımı (I) iletken içindeki serbest elektronların hareketidir; birimi <b>Amper (A)</b>. Gerilim (V, Volt) elektronları iten potansiyel farkı, direnç (R, Ohm) ise akışa karşı zorluktur.<br>
<b>Ohm Yasası:</b> V = I·R. Buradan <b>I = V/R</b> ve R = V/I. Örnek: 24 V ve 8 Ω → I = 24/8 = <b>3 A</b>.<br>
<b>Güç (P):</b> birim zamanda harcanan enerjidir, birimi <b>Watt (W)</b>: P = V·I = I²·R = V²/R. Örn. I=2 A, R=10 Ω → P = 2²·10 = <b>40 W</b>.<br>
<b>Seri devre:</b> elemanlar art arda; akım her noktada <b>aynıdır</b>, gerilim bölünür; bir eleman kopunca devre tümüyle açılır.<br>
<b>Paralel devre:</b> gerilim her kolda aynıdır, akım bölünür; kollar bağımsızdır — <b>bir lamba patlasa diğerleri yanmaya devam eder</b>. Ev tesisatı bu yüzden paraleldir: her cihaz aynı 230 V'u görür ve biri bozulunca diğerleri etkilenmez.`,
2:`<b>İletken ekleri.</b> İyi bir ek düşük <b>temas direnci</b> sağlar; gevşek/kötü ek ısınır ve <b>yangın</b> riski doğurur. Düz ek ve T-ek için kablo <b>50 mm</b>, koaksiyel F (anten) konnektörde yalıtkan <b>15 mm</b> soyulur.<br>
<b>Ağ kablosu (RJ45 – T568B):</b> sıra <b>Turuncu-Beyaz</b> · Turuncu · Yeşil-Beyaz · Mavi · Mavi-Beyaz · Yeşil · Kahverengi-Beyaz · Kahverengi. İlk renk Turuncu-Beyaz'dır.<br>
<b>Düz vs çapraz:</b> iki uç da T568B ise <b>düz kablo</b>; bir uç T568A diğeri T568B ise çapraz.<br>
<b>Çift büküm</b> (twisted pair) telleri sararak elektromanyetik <b>paraziti (EMI) bastırır</b>. Ek sonrası <b>yank (çekme) testi</b> ile sağlamlık kontrol edilir.`,
3:`<b>Kablo seçimi</b> ortama ve mekanik şarta göre yapılır:<br>
• <b>NYA</b> — tek telli (sert); sabit pano/boru içi.<br>
• <b>NYAF</b> — çok telli (esnek); titreşimli ve hareketli motor bağlantıları.<br>
• <b>NYM (antigron)</b> — nemli, sıva altı iç mekan.<br>
• <b>NYY</b> — yer altı, zırhlı/mekanik dayanımlı dış kılıf.<br>
<b>Harf mantığı:</b> N standart, Y PVC yalıtım, A tek tel, F ince çok tel (esnek), M antigron kılıf.<br>
<b>Kesit (mm²)</b> taşınacak <b>akıma</b> göre seçilir. İnce kesit + yüksek akım = aşırı ısınma ve gerilim düşümü; bu yüzden yük arttıkça kalın kesit gerekir.`,
4:`<b>Ölçü aletleri ve bağlama.</b><br>
• <b>Ampermetre</b> akımı ölçer; iç direnci çok <b>düşüktür (≈0–1 Ω)</b> ve devreye <b>SERİ</b> bağlanır. Paralel bağlanırsa kısa devre olur.<br>
• <b>Voltmetre</b> gerilimi ölçer; iç direnci çok <b>yüksektir</b> ve devreye <b>PARALEL</b> bağlanır (devreden akım çekmemesi için).<br>
• <b>Ohmmetre</b> direnç ölçer; devre <b>enerjisiz</b> olmalıdır.<br>
• <b>Pens ampermetre</b> iletkenin manyetik alanını okur; içine yalnız <b>tek hat (faz)</b> alınır. Faz ve nötr birlikte alınırsa alanlar birbirini götürür ve ekran <b>0 A</b> gösterir.`,
5:`<b>Pano otomasyonu (LDR + kontaktör).</b><br>
<b>LDR (foto direnç):</b> aydınlıkta direnci düşük, <b>karanlıkta yüksektir</b>; ortam ışığını "okuyan" sensördür.<br>
<b>Kontaktör:</b> küçük kumanda akımıyla (bobin, A1-A2 uçları) büyük güç yükünü (ana kontaklar) anahtarlayan elektromekanik şalterdir; <b>röleye benzer</b> ama yüksek akım içindir.<br>
<b>Çalışma:</b> karanlık olunca LDR sinyal verir → kontaktör bobini enerjilenir → kontaklar kapanır → lambalar yanar. Çevre/sokak aydınlatması akşam (≈19:00) <b>karardığında otomatik yanar</b>, sabah söner. Mantık ters kurulursa (ışık artınca çek) gündüz yanar — yanlıştır.`,
6:`<b>Üç zamanlı tarife (elektronik sayaç).</b> Tüketim saat dilimlerine ayrılır:<br>
• <b>T1 (gündüz, ~06–17)</b> orta fiyat · • <b>T2 (puant, 17–22)</b> <b>en pahalı</b> · • <b>T3 (gece, 22–06)</b> <b>en ucuz</b>.<br>
<b>Yük kaydırma:</b> yüksek güçlü ve ertelenebilir yükleri (fırın, pompa, ısıtıcı) gece dilimine (<b>T3</b>) almak fatura maliyetini düşürür.<br>
<b>Reaktif güç:</b> sanayide düşük güç faktörü (cosφ) <b>reaktif ceza</b> doğurur; bu, kondansatörlü <b>kompanzasyon</b> panosuyla düzeltilir. cosφ 1'e yaklaştıkça hattan çekilen gereksiz akım ve kayıp azalır.`,
7:`<b>YG manevrası — ölümcül kural.</b><br>
<b>Kesici (Breaker):</b> ark söndürme hazneli olup <b>yük akımını güvenle kesebilir</b>.<br>
<b>Ayırıcı (Isolator):</b> yalnız gözle görülür güvenli ayrım sağlar; <b>yük altında AÇILAMAZ</b> — açılırsa ark patlaması olur.<br>
<b>Açma (enerji kesme) sırası:</b> önce <b>Kesici</b> → sonra <b>Ayırıcı</b>. <b>Kapama:</b> tersi (önce Ayırıcı, sonra Kesici).<br>
Gerilim olup olmadığı <b>neon lambalı ıstanka</b> ile kontrol edilir.<br>
<b>İş güvenliğinde 5 altın kural:</b> 1) Enerjiyi kes 2) Tekrar kapanmayı önle (kilitle/etiketle) 3) Gerilimsizliği doğrula 4) Toprakla ve kısa devre et 5) Komşu gerilimli kısımları yalıt. İlk adım daima <b>enerjiyi kesmektir</b>.`,
8:`<b>Şantiye idari yönetimi.</b> Şef, hem işçiliği hem yapılan işi takip eder.<br>
<b>Adam-saat = çalışan sayısı × çalışılan saat.</b> Örn. 10 işçi × 9 saat = <b>90 adam-saat</b>.<br>
<b>Metraj:</b> yapılan işin <b>ölçülmesidir</b> (örn. çekilen kablo uzunluğu).<br>
<b>Hakediş = metraj × birim fiyat.</b> Örn. 250 m × 40 TL = <b>10.000 TL</b>.<br>
<b>Belgeler:</b> puantaj defteri işçi çalışma saatlerini, yeşil defter metrajı tutar; hazırlanan <b>hakediş müşavire/işverene</b> sunulur.`,
9:`<b>Havacılık — kesintisiz güç.</b> Kritik tesiste elektrik kesintisi kabul edilmez.<br>
<b>ATS (Otomatik Transfer Şalteri):</b> şebeke ↔ jeneratör arasında otomatik geçiş yapar.<br>
<b>UPS:</b> jeneratör devreye girene kadar kesintisiz <b>köprüler</b>; online UPS'te geçiş süresi ≈0'dır.<br>
<b>CAT II/III pist ışıkları kritik yüktür.</b> İniş anında ışık sönmemeli; transfer süresi <b>≤ 1 saniye</b> olmalıdır. 1 sn aşılırsa pist kararır ve <b>pilot pas geçer</b>; görev başarısız sayılır.<br>
Kademe: Şebeke → UPS (anlık) → Jeneratör (saniyeler içinde) → tekrar şebeke.`,
10:`<b>YG iletim hatları koruma.</b> 154 kV şalt sahasında trafo girişine <b>parafudur</b> takılır; yıldırım ve anahtarlama kaynaklı aşırı gerilimi <b>toprağa akıtarak</b> teçhizatı korur.<br>
<b>Topraklama direnci</b> ne kadar <b>düşük</b> olursa koruma o kadar etkilidir. Direnç <b>≥1 Ω</b> ise parafudur işini yapamaz; hedef <b>R &lt; 1 Ω</b>. Direnç, ek <b>bakır kazıklar</b> çakılarak ve eşpotansiyel baralama ile düşürülür.<br>
Hava hatlarına, helikopter/uçak çarpmasını önlemek için turuncu <b>ikaz küreleri</b> asılır.`,
11:`<b>Alternatif akım ve osiloskop.</b> Saykıl bir <b>tam dalgadır</b>; periyot (T) bir saykılın süresi, frekans <b>f = 1/T</b> (Hz). Örn. T = 20 ms → f = 1/0,02 = <b>50 Hz</b>.<br>
<b>Osiloskop</b> dalga şeklini grafiksel gösterir ve <b>maksimum (tepe) değeri</b> okutur; etkin (RMS) değer <b>Vrms = Vmax/√2</b>. Örn. Vmax=100 V → Vrms ≈ <b>70,7 V</b>.<br>
<b>PCB dağlama:</b> fazla bakırı eritmek için <b>1 ölçek Perhidrol + 3 ölçek Tuz Ruhu</b>, süre 5–10 dk. Süre kısa kalırsa bakır kalır (kısa devre), <b>çok uzun olursa yollar aşınır/plaket yanar</b>.`,
12:`<b>Büyüklük – Birim – Ölçü aleti.</b> Her elektriksel büyüklüğün bir birimi ve ona özel aleti vardır:<br>
• Akım (I) → <b>Amper (A)</b> → Ampermetre<br>
• Gerilim (V) → Volt → Voltmetre<br>
• Direnç (R) → <b>Ohm (Ω)</b> → Ohmmetre<br>
• Frekans (f) → <b>Hertz (Hz)</b> → Frekansmetre<br>
• Aktif güç (P) → Watt → Wattmetre · Reaktif güç (Q) → <b>Var</b> → Varmetre<br>
• Endüktans (L) → <b>Henry (H)</b> → LCRmetre · Kapasite (C) → Farad → LCRmetre<br>
• Güç faktörü → cos φ → <b>Kosinüsfimetre</b>. Sınavda birim–alet eşleştirmesi sık sorulur.`,
13:`<b>Ölçme hatası</b> iki türlü ifade edilir.<br>
<b>Mutlak hata:</b> ΔX = |Xg − X| (gerçek değer − ölçülen değer); birimi büyüklüğün birimidir.<br>
<b>Bağıl hata:</b> ε = ΔX / Xg, genelde ×100 ile <b>yüzde</b>. Örnek: Xg=200, X=196 → ΔX = |200−196| = <b>4</b>, ε = 4/200 = 0,02 = <b>%2</b>.<br>
<b>Alet sınıfı (doğruluk):</b> aletin tam skalasına göre izin verilen <b>maksimum hatayı</b> belirtir (örn. sınıf 1,5 → ±%1,5).<br>
<b>Bağıl hata</b>, ölçümün kalitesini mutlak hatadan daha iyi anlatır.`,
14:`<b>Bobin ve reaktans.</b> Bobinin alternatif akıma gösterdiği zorluk endüktif reaktanstır: <b>XL = 2·π·f·L</b>. Frekans artarsa <b>XL artar</b>.<br>
<b>Kritik:</b> DA'da frekans sıfırdır (f=0) → XL=0 → bobin <b>kısa devre</b> gibi davranır (sadece sargı omik direnci kalır).<br>
<b>Kapasitif reaktans (karşıt davranış):</b> XC = 1/(2πfC); frekans artarsa azalır. DA'da XC→∞ olduğundan kondansatör <b>açık devredir</b>.<br>
Özet: bobin DA'yı geçirir/AC'yi zorlar; kondansatör DA'yı durdurur/AC'yi geçirir.`,
15:`<b>Akü kablosu hazırlama.</b> Doğru sonlandırma sırası: <b>1) Oksidasyon temizliği</b> (uçtaki ½" oksitli bakırı kes) → 2) İzolasyon soyma (lug derinliğine göre) → 3) Krimp/sıkma → <b>4) Lehimleme</b> (sadece terminal ucunu ısıt) → 5) Makaron.<br>
<b>Yeşil alev:</b> ısıtmada yeşil alev görmek <b>bakırın oksitlendiğini</b> gösterir → dur (iletkenlik düşer).<br>
<b>Flux:</b> rosin flux akışkanlık sağlar ama abartılmaz; <b>asidiktir</b>, kalırsa korozyon yapar.<br>
<b>Makaron uyarısı:</b> kötü krimpi/bağlantıyı <b>gizlemek için kullanılmaz</b>; yalnız koruma/kozmetik amaçlıdır.`,
16:`<b>Endüstriyel bağlantı standartları.</b><br>
• <b>Solid (tek tel)</b> sabit yerde; <b>Stranded (çok tel)</b> titreşimli/hareketli yerlerde <b>zorunludur</b> (solid çabuk kırılır).<br>
• <b>Ringing (yüzük atma):</b> izoleyi dairesel kesmek iletkende zayıf nokta açar, titreşimle kırılır — yapılmaz.<br>
• <b>Nox (anti-oksidan):</b> farklı metaller (bakır-nikel-çinko) nem ve akımla korozyona (elektroliz) uğrar; Nox bunu <b>önler</b>.<br>
• <b>Shed water:</b> dış mekânda kablo yüksüğü <b>yukarı</b> baksın ki su içine dolmasın.<br>
• Teller yüksük dişiyle aynı yönde, <b>saat yönünde</b> bükülür. Bitince <b>yank testi</b> (her teli çek) yapılır.`,
17:`<b>Ölçü aleti sembolleri.</b><br>
• <b>~</b> sadece Alternatif Akım (AC) · <b>—</b> sadece Doğru Akım (DC) · üst üste düz+dalgalı = hem DC hem AC.<br>
• <b>⊥ (ters T):</b> alet <b>dik (dikey)</b> kullanılır · <b>⊓ (U):</b> <b>yatay</b> kullanılır · <b>∠60°:</b> 60° eğik.<br>
• <b>Yıldız içinde rakam (örn. 2):</b> aletin yalıtkanlık deneyi o <b>kV</b> ile yapılmıştır (2 kV). Yıldız (rakamsız) = deney yapılmamış; içi boş beş köşeli yıldız = muayene gerilimi 500 V.<br>
• <b>Üçgen içinde ünlem (!):</b> çalışma tertibatına <b>dikkat, teknik dokümana bak</b>.`
});

/* ===== TEORİ DERİNLEŞTİRME (18-34) ===== */
Object.assign(TEORI,{
18:`<b>Güç hesabı.</b> Tek fazda P = V·I·cosφ. Üç fazda:<br>
• Görünür güç <b>S = √3·U·I</b> (kVA)<br>
• Aktif güç <b>P = √3·U·I·cosφ</b> (kW) — gerçek işi yapan güç<br>
• Reaktif güç <b>Q = √3·U·I·sinφ</b> (kVAR) — mıknatıslama gücü.<br>
İlişki: <b>S² = P² + Q²</b> ve güç faktörü <b>cosφ = P/S</b>.<br>
<b>Örnek:</b> U=380 V, I=10 A, cosφ=1 → P = 1,732·380·10/1000 ≈ <b>6,58 kW</b>.<br>
Saf dirençli yük yalnız <b>aktif (P)</b>, saf bobin/kondansatör yalnız <b>reaktif (Q)</b> çeker. Düşük cosφ daha çok akım çektirir (kayıp+ceza); <b>kondansatörlü kompanzasyon</b> ile düzeltilir.`,
19:`<b>ADP (Ana Dağıtım Panosu)</b> binanın elektrik dağıtım merkezidir.<br>
<b>Hiyerarşi:</b> Sayaç/giriş → <b>Ana pano → tali (alt) panolar → kat/mahal panoları</b>.<br>
<b>Pano içi:</b> ana şalter, <b>bara (busbar)</b> — akımı dağıtan bakır çubuk —, sigorta/otomatlar, kontaktörler, parafudur (SPD), ölçü (sayaç/analizör), kompanzasyon ve her panoda <b>topraklama barası</b>.<br>
<b>IP koruma sınıfı:</b> ilk rakam katı cisim/toz, <b>ikinci rakam su</b> korumasıdır (örn. IP54). Pano ortamına göre seçilir. Düşük güç faktörü <b>kompanzasyon panosu</b> ile düzeltilir.`,
20:`<b>Jeneratör sistemleri.</b> Dizel jeneratör = dizel motor + <b>alternatör</b> (elektriği üreten kısım).<br>
<b>Çalışma:</b> şebeke kesilince <b>ATS</b> algılar → marş → jeneratör devreye girer → şebeke gelince geri transfer.<br>
<b>Bileşenler:</b> <b>günlük yakıt tankı</b> (motora yakıt sağlar), marş aküsü, <b>radyatör</b> (soğutma), egzoz susturucu, yağlama, kontrol panosu.<br>
<b>Standby</b> yalnız acil/kesinti durumunda çalışır; Prime sürekli kaynaktır.<br>
Birden çok jeneratör paralel çalışacaksa gerilim, frekans ve faz eşitlenir (<b>senkronizasyon</b>).`,
21:`<b>Yıldırımdan korunma (3 katman).</b><br>
1) <b>Yakalama ucu</b> (Franklin çubuğu veya aktif paratoner) — yapının en yükseğinde yıldırımı yakalar.<br>
2) <b>İniş iletkeni</b> — yakalama ucunu toprağa bağlayan kalın bakır; en kısa/düz yol.<br>
3) <b>Topraklama</b> — düşük dirençli olmalı (hassas tesiste hedef R&lt;1 Ω).<br>
<b>İç koruma:</b> <b>parafudur (SPD)</b> aşırı gerilimi sınırlar — Tip 1 ana girişte, Tip 2 tali panoda, Tip 3 cihaz yanında — ve eşpotansiyel baralama yapılır.<br>
Geniş yapılarda örgü/kafes koruması <b>Faraday kafesi</b> ile sağlanır.`,
22:`<b>Peyzaj/bahçe aydınlatması</b> dış mekân koşullarına dayanmalıdır.<br>
<b>Koruma:</b> armatür <b>IP65/IP67</b>, kablo UV dayanımlı; armatür ya topraklı (Sınıf I) ya da <b>çift yalıtımlı (Sınıf II)</b>.<br>
<b>Besleme:</b> yer altından <b>NYY</b> kablo ile, yaklaşık <b>60 cm</b> derine, üzerine ikaz bandı konularak gömülür.<br>
<b>Kumanda:</b> <b>fotosel</b> (karanlıkta yak) + <b>zaman saati</b> (belirli saatte kapat) birlikte kullanılır.<br>
Islak/dekoratif alanlarda güvenlik için <b>alçak gerilim (12/24 V)</b> bahçe sistemleri tercih edilir. Armatürler: projektör, gömme spot, bollard, RGB.`,
23:`<b>Disiplinler arası koordinasyon.</b> Elektrik işleri tek başına yürümez.<br>
• <b>İnşaat:</b> beton dökümünden <b>ÖNCE</b> boru/sleeve ve ankrajlar bırakılır (sonradan kırım istenmez).<br>
• <b>Mekanik (HVAC/sıhhi):</b> kablo tavası ile hava kanalı/borular <b>çakışmamalı (clash)</b>; güzergah ve kotlar paylaşılır.<br>
• <b>Mimari:</b> armatür/priz yerleşimi tavan ve yerleşim planına uyar.<br>
• <b>Zayıf akım/IT:</b> veri kabloları güç kablolarından <b>ayrı tava ve mesafede</b> tutulur (parazit/EMI).<br>
• Asansör/yangın grupları <b>ayrı ve güvenilir</b> beslenir. Ortak teknik galeri/şaft ve BIM ile <b>clash detection</b> gecikmeyi önler.`,
24:`<b>Transformatörler.</b> Trafo elektromanyetik indüksiyonla gerilim seviyesini değiştirir; yalnız <b>AC</b>'de çalışır (DA'da akı sabit kaldığından indüksiyon olmaz).<br>
<b>Dönüştürme oranı:</b> N1/N2 = V1/V2 = I2/I1. <b>N2 &gt; N1 ise yükseltici</b>, N2 &lt; N1 ise düşürücü.<br>
İdeal trafoda güç korunur (<b>S1 ≈ S2</b>); gerilim artarsa akım düşer.<br>
<b>Örnek:</b> N1=1000, N2=100, V1=220 V → V2 = 220·(100/1000) = <b>22 V</b>.<br>
<b>Kayıplar:</b> bakır (sargı I²R) ve demir (nüvede <b>histerezis + girdap akımı</b>). Üç fazda yıldız (Y) / üçgen (Δ) bağlantı yapılır.`,
25:`<b>Elektrik makineleri (motorlar).</b> En yaygın olan <b>asenkron (endüksiyon) motordur</b>: sağlam, ucuz, az bakımlı; içinde stator sabit, <b>rotor döner</b>.<br>
<b>Senkron hız:</b> n = 120·f / p (p: kutup sayısı). Örn. f=50 Hz, p=4 → n = <b>1500 d/d</b>.<br>
<b>Yol verme:</b> başlangıç akımını düşürmek için <b>yıldız-üçgen</b> (önce yıldız, sonra üçgen), soft starter veya sürücü (<b>VFD</b>, kademesiz hız) kullanılır.<br>
<b>Senkron motor</b> sabit hızda döner ve güç faktörünü düzeltir. <b>DA motor</b> kolay hız kontrolü sağlar.<br>
Bir fazlı asenkron motorda yol verme momenti için yardımcı sargıya <b>kondansatör</b> bağlanır.`,
26:`<b>Topraklama sistemleri & kaçak akım.</b> Sistemler (1. harf kaynak, 2. harf gövde): <b>TN-S</b> (N ve PE ayrı), TN-C-S, <b>TT</b> (gövde ayrı topraklayıcıya), <b>IT</b> (kaynak izole).<br>
<b>Kaçak akım rölesi (RCD/FI):</b> faz ve nötr akımı arasındaki <b>farkı</b> ölçer; fark eşiği aşarsa keser. Can güvenliği için <b>30 mA</b>, yangın koruması için ~300 mA.<br>
<b>Eşpotansiyel baralama</b> iletken kısımları aynı potansiyele getirerek <b>dokunma gerilimini</b> azaltır.<br>
Topraklamanın temel amacı insanı <b>çarpılmaktan korumak</b> ve arıza akımını toprağa akıtmaktır.`,
27:`<b>Koruma, seçicilik ve hesaplar.</b> Aşırı akım koruması sigorta/otomatla yapılır. Açma eğrileri: <b>B 3–5·In</b> (aydınlatma/dirençsel), <b>C 5–10·In</b> (priz/motor), <b>D 10–20·In</b> (yüksek başlangıç akımı).<br>
<b>Seçicilik:</b> arıza yalnız en yakın koruma elemanında temizlenmeli, üst kademe açmamalıdır.<br>
<b>Kesme kapasitesi (kA):</b> beklenen <b>kısa devre akımı</b>, kesicinin kesme kapasitesinden <b>küçük</b> olmalıdır.<br>
<b>Gerilim düşümü:</b> aydınlatmada ≤<b>%3</b>, kuvvet (motor) devrelerinde ≤<b>%5</b>; hat uzunluğu ve akım arttıkça düşüm büyür, çözüm kesit büyütmektir.`,
28:`<b>Aydınlatma tekniği.</b> Işık akısı <b>lümen (lm)</b>, aydınlık düzeyi <b>lüks (lx = lm/m²)</b>, armatür verimi <b>lm/W</b> ile ifade edilir (LED en verimli kaynaktır).<br>
<b>Lümen yöntemi:</b> ortalama aydınlık E = (Φ·n·η·d) / A (n armatür sayısı, η verim, d <b>bakım faktörü</b> — kirlenme/yaşlanmayla ışık azaldığı için hesaba katılır).<br>
<b>Önerilen düzeyler:</b> ofis ~<b>500 lx</b>, koridor ~100 lx, hassas iş ~750–1000 lx.<br>
Konfor için renk sıcaklığı (K) ve renksel geriverim <b>CRI (Ra)</b> önemlidir.`,
29:`<b>Mevzuat & İSG.</b> Temel düzenlemeler: <b>Elektrik İç Tesisleri Yönetmeliği</b>, <b>Elektrik Tesislerinde Topraklamalar Yönetmeliği</b>, Elektrik Kuvvetli Akım Tesisleri Yönetmeliği ve İSG mevzuatı; havacılıkta <b>SHT/HES</b> kuralları (SHGM denetimi).<br>
Yetkisiz kişi YG'de <b>çalışamaz</b>. Çalışma öncesi <b>5 altın kural</b> uygulanır; KKD (baret, yalıtkan eldiven/ayakkabı) giyilir; riskli ve YG işlerinde <b>iş izni</b> alınır.<br>
<b>LOTO (Lockout-Tagout):</b> enerji kaynağını <b>kilitle ve etiketle</b> — yanlışlıkla devreye alınmayı önler.`,
30:`<b>Yarı iletkenler & diyot.</b> Maddeler iletkenlik bakımından iletken, yalıtkan ve <b>yarı iletken</b> olur. Yarı iletkenlerin (silisyum, germanyum) son yörüngesinde <b>4 elektron (valans)</b> bulunur.<br>
<b>Katkılama (doping):</b> 5 değerlikli katkı ile <b>N tipi</b> (çoğunluk taşıyıcı elektron), 3 değerlikli katkı ile <b>P tipi</b> (çoğunluk taşıyıcı <b>oyuk/hole</b>) elde edilir.<br>
<b>Diyot</b> bir P-N birleşimidir; akımı yalnız <b>tek yönde (anot→katot)</b> geçirir. <b>Doğru polarmada iletir</b>, ters polarmada tıkar (yalıtkan).<br>
<b>LED</b> = ışık yayan diyottur.`,
31:`<b>Doğrultucular (AC→DC).</b> Doğrultma, alternatif akımı doğru akıma çevirme işlemidir; diyotların tek yön geçirme özelliğiyle yapılır (adaptörler bunu yapar).<br>
<b>Üç tip:</b><br>
• <b>Yarım dalga</b> — <b>1 diyot</b>, yalnız bir alternansı geçirir (verimsiz).<br>
• <b>Tam dalga (orta uçlu trafo)</b> — 2 diyot, her iki alternansı kullanır → güç <b>~2 katına</b> çıkar.<br>
• <b>Köprü</b> — <b>4 diyot</b>, orta uçlu trafo <b>gerektirmez</b>, en yaygın.<br>
Çıkıştaki dalgalanmayı (ripple) <b>filtre kondansatörü</b> azaltır.`,
32:`<b>Transistör & anahtarlama.</b> Transistör üç katmanlı yarı iletkendir (<b>NPN</b> veya <b>PNP</b>) ve <b>üç uçludur</b>: Beyz (B), Kolektör (C), Emiter (E).<br>
İki temel işlevi: <b>anahtarlama</b> (aç-kapa, dijital) ve <b>yükseltme</b> (zayıf sinyali büyütme).<br>
<b>Kumanda ucu beyzdir</b>: küçük bir beyz akımı, büyük <b>kolektör</b> akımını kontrol eder.<br>
Bu yüzden transistör, küçük sinyalle büyük yükü süren <b>röle/anahtarın elektronik karşılığı</b> sayılır. Dijital devrede ON/OFF anahtar, yükselteçte küçük sinyali büyüten eleman olarak çalışır.`,
33:`<b>Elektrik çarpması & ilk yardım.</b> Tehlikeyi belirleyen, vücuttan geçen <b>akımın şiddetidir</b> (gerilim değil, akım öldürür). Yaklaşık eşikler:<br>
• ~1 mA: hissetme · 1–5 mA: uyuşma · 5–15 mA: kramp · <b>15–25 mA</b>: kasların kontrol kaybı (<b>bırakamama</b>) · <b>80–100 mA ve üzeri</b>: <b>kalp fibrilasyonu</b>, bilinç kaybı, ölüm riski.<br>
<b>Alternatif akım (AA)</b>, eşit değerdeki doğru akımdan (DA) <b>daha tehlikelidir</b>.<br>
<b>İlk müdahale:</b> önce enerjiyi kes ya da <b>yalıtkan</b> bir cisimle kişiyi akımdan ayır; sonra <b>112</b>'yi ara, bilinç/solunum yoksa <b>CPR</b> uygula.`,
34:`<b>Pano atölyesi.</b> Dağıtım panosunda <b>DIN ray</b> üzerine modüler cihazlar dizilir. Besleme sırası: Sayaç → <b>Ana şalter → RCD → MCB'ler</b> → linyeler.<br>
• <b>RCD (kaçak akım):</b> faz-nötr farkını ölçer, <b>30 mA</b>'i aşınca keser (can güvenliği).<br>
• <b>MCB (otomatik sigorta):</b> aşırı akım/kısa devrede açar. <b>C16</b> = C eğrisi, 16 A anma akımı.<br>
• <b>Voltaj koruma rölesi:</b> aşırı/düşük gerilimde (örn. &lt;195 V veya &gt;253 V) keser.<br>
<b>Renk kodu:</b> Faz kahverengi/siyah, <b>Nötr mavi</b>, <b>Toprak sarı-yeşil</b>. Koruma yukarıdan aşağıya kademelenir (seçicilik).`
});

/* ===== EK: sıradaki modül butonu + önizleme popup ===== */

function previewNext(id){
  if(id==null){ toast('Bu son modül 🎉'); return; }
  const m=modById(id);
  const d=document.createElement('div'); d.className='modal-bg'; d.id='modalRoot';
  d.onclick=function(e){ if(e.target===d) closeModal(); };
  d.innerHTML=`<div class="modal">
     <div class="modalhead"><div class="lh-ic">${m.ic}</div><div><div class="lh-cat" style="color:${CATS[m.cat].c}">SIRADAKİ MODÜL · ${CATS[m.cat].n}</div><div class="lh-t">Modül ${m.id}: ${m.t}</div></div></div>
     ${figureFor(id)}
     <p class="muted" style="font-size:13px;margin:6px 0 10px">${m.d}</p>
     <div class="muted" style="font-size:11px;margin-bottom:4px">Önizleme — bu modülde öğreneceklerin:</div>
     <div class="edu" style="max-height:200px;overflow:auto;font-size:12.5px">${TEORI[id]||''}</div>
     <div class="row" style="margin-top:16px;justify-content:flex-end">
       <button class="btn ghost sm" onclick="closeModal()">Kapat</button>
       <button class="btn" onclick="closeModal();go('module',${id})">▶ Modüle Başla</button></div>
   </div>`;
  document.body.appendChild(d);
}
function closeModal(){ const r=document.getElementById('modalRoot'); if(r) r.remove(); }

/* ===== EK: yanlış cevaba 'Teoriye dön' kısayolu ===== */
function submitQuiz(){
  if(QS.checked) return; QS.checked=true; let correct=0;
  QS.items.forEach((it,i)=>{
    const p=QS.picks[i];
    el('o'+i+'_'+it.ans).classList.add('correct');
    if(p!=null && p!==it.ans) el('o'+i+'_'+p).classList.add('wrong');
    const ok=p===it.ans; if(ok) correct++;
    let extra='';
    if(!ok && it.qid && /^\d+\./.test(it.qid)){
      const mod=parseInt(it.qid,10);
      const mm=modById(mod);
      if(mm) extra=` <button class="btn ghost sm" style="margin-left:6px;padding:3px 9px;font-size:11px" onclick="go('module',${mod})">📖 Teoriye dön (Modül ${mod})</button>`;
    }
    const e=el('e'+i); e.className='expl show'; e.innerHTML=(ok?'✔ ':'✗ ')+it.ex+extra;
    if(QS.srs && it.qid) srsAnswer(it.qid, ok);
  });
  const total=QS.items.length, pct=Math.round(correct/total*100);
  const r=el('qresult'); if(r) r.innerHTML=`<div class="panel2" style="margin-top:14px"><div class="row" style="justify-content:space-between"><b>Sonuç</b><b style="font-size:20px;color:var(--acc)">${correct}/${total} · %${pct}</b></div><div class="scorebar" style="margin:8px 0"><i style="width:${pct}%"></i></div></div>`;
  const sb=el('qSubmit'); if(sb) sb.disabled=true;
  markToday(); refreshHeader();
  if(QS.onFinish) QS.onFinish(correct,total,pct);
}

/* ===== MODÜL 35 — SAYAÇ & PANO BAĞLANTISI ===== */
MODS.push({id:35, t:"Sayaç & Pano Bağlantısı", cat:"pano", ic:"🔌", d:"Sayaç panosu, sigorta bağlantısı, mühür, tesisat girişi.", task:null});
Object.assign(TEORI,{
35:`<b>Sayaç panosu</b>, şebeke enerjisinin binaya girdiği ve tüketimin ölçüldüğü ilk noktadır.<br>
<b>Bağlantı sırası:</b> Şebeke girişi → ana sigorta/kesici → <b>Sayaç</b> → tüketici panosu (RCD + linye sigortaları) → linyeler.<br>
<b>Sayaç tipi:</b> Ev için <b>monofaze</b> (1 faz + nötr), işyeri/sanayi için <b>trifaze</b> (3 faz + nötr).<br>
Sayacın <b>giriş uçları şebekeden</b>, <b>çıkış uçları tesisata</b> bağlanır; uçlar karıştırılmaz. Sayaç ve ana kesici <b>dağıtım şirketince mühürlenir</b>; mühürlü kısma müdahale yasaktır (kaçak sayılır).<br>
Sayaç sonrası tüketici tarafında <b>RCD (30 mA)</b> ve <b>linye sigortaları (MCB)</b> bulunur. Topraklama (PE) ayrı çekilir; rengi <b>sarı-yeşildir</b>.`,
});
Object.assign(FOY,{
35:`<b>Kademeler (giriş → yük):</b><br>
1) <b>Şebeke girişi:</b> Dağıtım şebekesinden faz(lar) + nötr gelir.<br>
2) <b>Ana sigorta/kesici:</b> Panoyu ve sayacı korur, mühürlenir.<br>
3) <b>Sayaç:</b> Tüketilen enerjiyi (kWh) ölçer. Giriş = şebeke, çıkış = tesisat. Monofaze 230 V, trifaze 400 V.<br>
4) <b>Tüketici panosu:</b> RCD (30 mA can güvenliği) + linye sigortaları (aydınlatma, priz, mutfak...).<br>
5) <b>Linyeler:</b> Her sigortadan bir hat çıkar; kesit yüke göre (aydınlatma 1,5 mm², priz 2,5 mm²).<br>
<b>Renk kodu:</b> Faz kahve/siyah/gri · Nötr mavi · Toprak sarı-yeşil.<br>
<b>Dikkat:</b> Mühürlü bölüme dokunma; faz-nötr uçlarını karıştırma; çok telli kabloda yüksük kullan; her sigortayı etiketle.`,
});
Object.assign(QBANK,{
35:[
 {q:"Sayaç ne ölçer?",opts:["Gerilimi","Tüketilen elektrik enerjisini (kWh)","Direnci","Frekansı"],ans:1,ex:"Sayaç tüketilen aktif enerjiyi kWh cinsinden ölçer."},
 {q:"Ev tipi (monofaze) sayaç kaç iletkenle bağlanır?",opts:["Faz + nötr (2)","3 faz + nötr","Sadece faz","5 iletken"],ans:0,ex:"Monofaze: 1 faz + nötr."},
 {q:"Trifaze sayaç bağlantısı?",opts:["1 faz + nötr","3 faz + nötr","2 faz","Sadece nötr"],ans:1,ex:"Trifaze: 3 faz + nötr (işyeri/sanayi)."},
 {q:"Doğru bağlantı sırası?",opts:["Sayaç→şebeke→RCD","Şebeke→ana kesici→sayaç→RCD→sigortalar→linye","Linye→sayaç→şebeke","RCD→sayaç→şebeke"],ans:1,ex:"Enerji giriş→ölçüm→koruma→dağıtım sırasıyla ilerler."},
 {q:"Sayacın giriş uçları nereye bağlanır?",opts:["Tesisata","Şebekeye","Toprağa","Linyeye"],ans:1,ex:"Giriş şebekeden, çıkış tesisata; uçlar karıştırılmaz."},
 {q:"Sayaç/ana kesicideki mühüre müdahale?",opts:["Serbest","Yasak (kaçak sayılır)","İzinle serbest","Sadece geceleri"],ans:1,ex:"Mühürlü kısma müdahale kaçak elektrik sayılır ve yasaktır."},
 {q:"Sayaç sonrası can güvenliği cihazı?",opts:["Kondansatör","RCD (30 mA)","Sayaç","Parafudur"],ans:1,ex:"Tüketici tarafında 30 mA RCD kullanılır."},
 {q:"Panoda topraklama iletkeni rengi?",opts:["Mavi","Sarı-yeşil","Kahverengi","Siyah"],ans:1,ex:"Toprak (PE) sarı-yeşildir."}
]
});
Object.assign(DIAG,{
35:`<svg viewBox="0 0 420 320"><line x1="150" y1="18" x2="150" y2="250" stroke="#8a98ab" stroke-width="2.5"/>
 <text x="170" y="24" fill="#cdd7e2" font-size="11">Şebeke girişi</text><circle cx="150" cy="24" r="4" fill="#f85149"/>
 <line x1="150" y1="42" x2="150" y2="54" stroke="#8a98ab" stroke-width="2"/><rect x="140" y="54" width="20" height="14" fill="#161b22" stroke="#8a98ab"/><text x="170" y="65" fill="#8a98ab" font-size="10">Ana sigorta (mühürlü)</text>
 <circle cx="150" cy="92" r="16" fill="#161b22" stroke="#ffb000" stroke-width="2"/><text x="150" y="96" text-anchor="middle" font-size="9" fill="#ffb000">kWh</text><text x="172" y="90" fill="#ffb000" font-size="11">SAYAÇ</text><text x="172" y="102" fill="#8a98ab" font-size="9">giriş=şebeke, çıkış=tesisat</text>
 <line x1="150" y1="108" x2="150" y2="124" stroke="#8a98ab" stroke-width="2"/><line x1="150" y1="124" x2="164" y2="114" stroke="#f85149" stroke-width="2.5"/><text x="172" y="126" fill="#8a98ab" font-size="10">Ana kesici</text>
 <rect x="132" y="140" width="36" height="20" fill="#161b22" stroke="#3fb950" stroke-width="2"/><text x="150" y="154" text-anchor="middle" font-size="8" fill="#3fb950">RCD 30mA</text>
 <line x1="60" y1="182" x2="300" y2="182" stroke="#8a98ab" stroke-width="3"/><line x1="150" y1="160" x2="150" y2="182" stroke="#8a98ab" stroke-width="2"/><text x="308" y="186" fill="#8a98ab" font-size="10">Bara</text>
 ${[0,1,2].map(i=>`<line x1="${90+i*80}" y1="182" x2="${90+i*80}" y2="200" stroke="#8a98ab" stroke-width="2"/><rect x="${78+i*80}" y="200" width="24" height="15" fill="#161b22" stroke="#33b1ff"/><text x="${90+i*80}" y="211" text-anchor="middle" font-size="7" fill="#33b1ff">C16</text><line x1="${90+i*80}" y1="215" x2="${90+i*80}" y2="235" stroke="#8a98ab" stroke-width="2"/><text x="${90+i*80}" y="248" text-anchor="middle" font-size="8" fill="#8a98ab">Linye ${i+1}</text>`).join('')}
 <line x1="150" y1="250" x2="150" y2="278" stroke="#3fb950" stroke-width="2"/><line x1="138" y1="278" x2="162" y2="278" stroke="#3fb950" stroke-width="2"/><line x1="143" y1="284" x2="157" y2="284" stroke="#3fb950" stroke-width="2"/><text x="170" y="282" fill="#3fb950" font-size="9">Topraklama (PE)</text></svg>`,
});

/* ===== MODÜL 36 — ELEKTRİK 101 (TEMEL KAVRAMLAR) ===== */
MODS.push({id:36, t:"Elektrik 101 — Temel Kavramlar", cat:"temel", ic:"🎓", d:"Volt, Amper, Watt, kWh nedir? Güç hesabı, hap bilgiler.", task:null});
Object.assign(TEORI,{
36:`Elektriği anlamanın en kolay yolu <b>su borusu benzetmesidir</b> 🚰:<br>
• <b>Gerilim (Volt, V)</b> = suyun <b>BASINCI</b>. Elektronları iten kuvvet. Türkiye'de priz ≈ <b>230 V</b>.<br>
• <b>Akım (Amper, A)</b> = borudaki su <b>DEBİSİ</b>. Bir noktadan saniyede geçen elektron miktarı.<br>
• <b>Direnç (Ohm, Ω)</b> = borudaki <b>DARLIK</b>. Akışa karşı gösterilen zorluk.<br>
• <b>Güç (Watt, W)</b> = birim zamanda yapılan <b>İŞ</b>; cihazın "ne kadar güçlü" olduğudur. <b>P = V × I</b>.<br>
• <b>Enerji (kWh)</b> = zamanla harcanan <b>TÜKETİM</b>; faturaya yansıyan budur. <b>kWh = kW × saat</b>.<br>
<b>Watt neye denir?</b> Güç birimine — 1 W, saniyede 1 joule enerji demektir. <b>1 kW = 1000 W.</b><br>
<b>kWh nedir?</b> 1 kW gücün 1 saat çalışması = 1 kWh enerji.<br>
<b>Ön ekler:</b> mili (m)=1/1000 · kilo (k)=1.000 · Mega (M)=1.000.000.`,
});
Object.assign(FOY,{
36:`<b>💊 Hap bilgiler:</b><br>
• Volt (V) → gerilim/basınç · Amper (A) → akım/debi · Ohm (Ω) → direnç · Watt (W) → güç · kWh → enerji (tüketim).<br>
• <b>Ohm yasası:</b> V = I × R.<br>
• <b>Güç:</b> P = V × I = I²×R = V²/R (birim: Watt).<br>
• <b>1 kW = 1000 W</b>, <b>1 MW = 1000 kW</b>.<br>
• <b>Enerji = Güç × Zaman:</b> kWh = kW × saat.<br>
<b>Örnek fatura hesabı:</b> 2000 W'lık (2 kW) bir ısıtıcı günde 3 saat çalışırsa:<br>
&nbsp;&nbsp;Enerji = 2 kW × 3 saat = <b>6 kWh/gün</b> → ayda 6×30 = 180 kWh.<br>
&nbsp;&nbsp;Birim fiyat 3 TL/kWh ise: 180 × 3 = <b>540 TL/ay</b>.<br>
<b>Kısa yol:</b> Watt'ı 1000'e böl → kW; saatle çarp → kWh; birim fiyatla çarp → TL.`,
});
Object.assign(QBANK,{
36:[
 {q:"Gerilimin birimi nedir?",opts:["Amper","Volt","Watt","Ohm"],ans:1,ex:"Gerilim Volt (V) ile ölçülür."},
 {q:"Akımın birimi nedir?",opts:["Amper","Volt","Ohm","Hertz"],ans:0,ex:"Akım Amper (A) ile ölçülür."},
 {q:"Güç hangi birimle ifade edilir?",opts:["Volt","Watt","Joule","Ohm"],ans:1,ex:"Güç Watt (W) ile ifade edilir."},
 {q:"Güç formülü hangisidir?",opts:["P = V + I","P = V × I","P = V / I","P = I / V"],ans:1,ex:"P = V × I (gerilim çarpı akım)."},
 {q:"1 kW kaç Watt'tır?",opts:["10","100","1000","1.000.000"],ans:2,ex:"1 kW = 1000 W."},
 {q:"Faturadaki tüketim (enerji) hangi birimledir?",opts:["Watt","kWh","Volt","Amper"],ans:1,ex:"Enerji tüketimi kWh (kilovatsaat) ile ölçülür."},
 {q:"1 kWh ne demektir?",opts:["1 kW gücün 1 saat çalışması","1000 Volt","1 Amperlik akım","1 saatlik gerilim"],ans:0,ex:"kWh = kW × saat; 1 kW'ın 1 saat çalışması 1 kWh'dir."},
 {q:"Su benzetmesinde 'Volt' neye benzer?",opts:["Debiye","Basınca","Darlığa","Sıcaklığa"],ans:1,ex:"Volt = basınç, Amper = debi, Ohm = borudaki darlık."}
]
});
Object.assign(DIAG,{
36:`<svg viewBox="0 0 440 190"><rect x="30" y="80" width="380" height="26" rx="6" fill="#20303f" stroke="#8a98ab"/>
 <circle cx="80" cy="60" r="20" fill="#161b22" stroke="#ffb000" stroke-width="2"/><line x1="80" y1="60" x2="92" y2="50" stroke="#ffb000" stroke-width="2"/><text x="80" y="30" text-anchor="middle" fill="#ffb000" font-size="12" font-weight="700">V</text><text x="80" y="128" text-anchor="middle" fill="#8a98ab" font-size="9">Basınç (Volt)</text>
 <polygon points="180,86 180,100 210,93" fill="#33b1ff"/><text x="165" y="74" fill="#33b1ff" font-size="12" font-weight="700">A →</text><text x="185" y="128" text-anchor="middle" fill="#8a98ab" font-size="9">Debi (Amper)</text>
 <path d="M250,80 l14,13 l-14,13" fill="none" stroke="#f85149" stroke-width="3"/><path d="M270,80 l-14,13 l14,13" fill="none" stroke="#f85149" stroke-width="3"/><text x="258" y="72" text-anchor="middle" fill="#f85149" font-size="12" font-weight="700">Ω</text><text x="258" y="128" text-anchor="middle" fill="#8a98ab" font-size="9">Darlık (Direnç)</text>
 <circle cx="370" cy="93" r="22" fill="#161b22" stroke="#3fb950" stroke-width="2"/>${[0,60,120,180,240,300].map(a=>`<line x1="370" y1="93" x2="${(370+18*Math.cos(a*Math.PI/180)).toFixed(1)}" y2="${(93+18*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="#3fb950" stroke-width="2"/>`).join('')}<text x="370" y="97" text-anchor="middle" fill="#3fb950" font-size="12" font-weight="700">W</text><text x="370" y="132" text-anchor="middle" fill="#8a98ab" font-size="9">İş / Güç (Watt)</text>
 <text x="30" y="165" fill="#cdd7e2" font-size="13">P = V × I &nbsp;·&nbsp; kWh = kW × saat</text></svg>`,
});

/* ===== EK: yıldız-üçgen gerçekçi görsel + kablo seçimi soruları ===== */
Object.assign(DIAG,{
25:`<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3GAM4t5LIrVnoytOwhQqVixxnvj/hf_20260712_125954_40d5090e-0b2a-4893-b7aa-bec1a864b3d0.png" alt="Yıldız ve üçgen klemens bağlantısı" style="width:100%;max-height:420px;object-fit:contain;background:#fff;border-radius:6px" loading="lazy">`
});
TEORI[25]=(TEORI[25]||'')+`<br><b>Klemens köprüleme:</b> Yıldız → <b>W2-U2-V2</b> köprülenir (yıldız noktası), besleme U1-V1-W1'e. Üçgen → <b>U1-W2, V1-U2, W1-V2</b> köprülenir. Etiketi <b>400/690 V</b> olan motor <b>400 V</b> şebekede <b>ÜÇGEN</b> bağlanır (her sargı tam 400 V görür); 690 V'ta yıldız.`;
QBANK[25]=QBANK[25].concat([
 {q:"Etiketi 400/690 V olan motor 400 V şebekeye nasıl bağlanır?",opts:["Yıldız","Üçgen","Bağlanmaz","Seri"],ans:1,ex:"Küçük değer (400 V) şebekeye eşitse ÜÇGEN bağlanır; her sargı tam 400 V görür ve motor tam gücünü verir."},
 {q:"Yıldız bağlantıda klemenste hangi uçlar köprülenir?",opts:["U1-V1-W1","W2-U2-V2","U1-W2","Hiçbiri"],ans:1,ex:"Yıldız noktası, sargı sonları W2-U2-V2 köprülenerek oluşur."},
 {q:"Yıldız-üçgen yol vermede motor önce hangi bağlantıda kalkar?",opts:["Üçgen","Yıldız","İkisi birden","Seri"],ans:1,ex:"Önce yıldız (düşük akım/moment), sonra üçgen (tam güç)."}
]);
QBANK[27]=QBANK[27].concat([
 {q:"Üç fazlı akım formülü hangisidir?",opts:["I = P/(V·cosφ)","I = P/(√3·V·cosφ)","I = P·√3·V","I = V/P"],ans:1,ex:"Üç fazda I = P/(√3·U·cosφ); √3≈1,73. Tek fazda I = P/(V·cosφ)."},
 {q:"Kablo kesitini belirleyen 3 kriterden hangisi seçilir?",opts:["En incesi","En kalını","Ortalaması","Rastgele"],ans:1,ex:"Akım kapasitesi, gerilim düşümü ve koruma uyumundan EN KALIN çıkan kesit seçilir."},
 {q:"Sigorta–kablo uyumunda doğru sıra?",opts:["Kablo ≤ sigorta ≤ yük","Yük ≤ sigorta ≤ kablo kapasitesi","Sigorta ≤ yük ≤ kablo","Hepsi eşit"],ans:1,ex:"Yük akımı ≤ sigorta anma akımı ≤ kablo taşıma kapasitesi (kablo yanmadan sigorta atmalı)."}
]);

/* ===== KİTAP AKIŞI: Kapak → İçindekiler/Önsöz → Modüller ===== */

function renderOnsoz(){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.remove('active'));
  var toc='';
  for(const k of Object.keys(CATS)){
    const ms=MODS.filter(m=>m.cat===k);
    toc+=`<div class="tcat"><div class="tcat-h" style="color:${CATS[k].c}">${CATS[k].n}</div>`;
    ms.forEach(m=>{ toc+=`<div class="trow" onclick="go('module',${m.id})"><span>${m.ic} ${m.t}</span><span class="tnum">${m.id}</span></div>`; });
    toc+=`</div>`;
  }
  app().innerHTML=`<span class="breadcrumb" onclick="go('kapak')">← Kapak</span>
   <div class="bookpage">
     <div class="bp-kicker">ELK MASTER</div>
     <h1>İçindekiler</h1><div class="book-sub">${MODS.length} modül · ${Object.keys(CATS).length} bölüm</div>
     <div class="toc-book">${toc}</div>
     <div class="bp-sep"></div>
     <h1>Önsöz</h1><div class="book-sub">Bu kitabı neden yaptık</div>
     <div class="onsoz">
       <p class="drop">Elektrik görünmez ama hayatın her yerinde: evini aydınlatan lambadan fabrikayı döndüren motora, uçağı geceleyin yere indiren pist ışığına kadar. Onu anlamak, önce ondan korkmayı bırakmakla başlar.</p>
       <p>Bu kitap sıfırdan başlayan biri için tasarlandı. Önce <b>"neden"i</b>, sonra <b>"nasıl"ı</b> öğretir. Her modülde aynı yol var: <b>💊 Özet</b> ile çerçeveyi gör, <b>📖 Teori</b>'yi şemalarla birlikte baştan sona oku, <b>📝 Quiz</b>'de kendini sına, yanlışta teoriye dön. Uygulamayı sahada yaparsın; burası bilginin sağlam oturduğu yer.</p>
       <p>Günde bir modül, dikkatle okunmuş hâliyle, yeter. Deneme ve MYK sınavlarıyla kendini ölç. Bittiğinde elektrik senin için bir bilmece değil, konuştuğun bir dil olacak.</p>
       <p style="text-align:center;color:var(--muted);font-style:italic;margin-top:16px">Hazırsan, sayfayı çevir.</p>
     </div>
     <div class="row" style="justify-content:center;margin-top:26px"><button class="btn" style="font-size:15px;padding:12px 26px" onclick="go('modules')">Modüllere Başla ▶</button></div>
   </div>`;
  window.scrollTo(0,0);
}

/* ===== EK v7: Kaçak akım rölesi harf tipleri + kablo-sigorta-güç tablosu ===== */
TEORI[26]=(TEORI[26]||'')+`<br><br><b style="font-size:15px">🔠 Kaçak Akım Rölesindeki HARFLER ne anlama gelir?</b><br>
<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3GsQa4HBJ49oduhafl3gjVBJXbb/hf_20260730_123427_6add5b0f-e015-4338-a450-c21033644961.png" alt="AC, A, F, B, S, K tipi kaçak akım röleleri DIN ray üzerinde" style="width:100%;max-height:340px;object-fit:cover;border-radius:10px;margin:8px 0;border:1px solid #dbe4ee" loading="lazy"><br>
Hepsi kaçak akım rölesidir ama <b>hepsi aynı işi yapmaz</b>. Röle üzerindeki harf, cihazın <b>hangi tür kaçak akımı algılayabildiğini</b> gösterir. Yanlış tip seçersen röle seni <b>korumayabilir</b> — modern inverterli cihazlar, rölenin "göremediği" DC bileşenli kaçaklar üretebilir.
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px">
<tr style="background:rgba(20,184,166,.08)"><th style="padding:7px;border:1px solid #dbe4ee;text-align:left">Tip</th><th style="padding:7px;border:1px solid #dbe4ee;text-align:left">Algıladığı kaçak türleri</th><th style="padding:7px;border:1px solid #dbe4ee;text-align:left">Nerede kullanılır</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#16a34a">AC</b></td><td style="padding:7px;border:1px solid #dbe4ee">Sadece sinüzoidal AC</td><td style="padding:7px;border:1px solid #dbe4ee">Aydınlatma, klasik priz, rezistif yükler (eski tesisat)</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#2563eb">A</b></td><td style="padding:7px;border:1px solid #dbe4ee">AC + darbeli DC</td><td style="padding:7px;border:1px solid #dbe4ee">Çamaşır/bulaşık makinesi, elektronik güç kaynakları, inverterli cihazlar — <b>bugün çoğu ev için en uygun seçim</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#7c3aed">F</b></td><td style="padding:7px;border:1px solid #dbe4ee">AC + darbeli DC + yüksek frekanslı</td><td style="padding:7px;border:1px solid #dbe4ee">İnverter klima, ısı pompası, frekans kontrollü motorlar</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#dc2626">B</b></td><td style="padding:7px;border:1px solid #dbe4ee">AC + darbeli DC + <b>düz DC</b> + yüksek frekanslı — <b>en geniş koruma</b></td><td style="padding:7px;border:1px solid #dbe4ee">Elektrikli araç şarj istasyonu, güneş (PV) sistemleri, endüstriyel sürücüler (VFD), UPS</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#ea580c">S</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Gecikmeli açma</b> (selektif) — kısa süreli kaçakta açmaz, kalıcı kaçakta açar</td><td style="padding:7px;border:1px solid #dbe4ee">Ana panolar; alt kaçak rölesiyle <b>selektivite</b> kurmak için (genelde 300 mA)</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b style="color:#ca8a04">K</b></td><td style="padding:7px;border:1px solid #dbe4ee">AC, darbeli DC, düz DC + 10 kHz'e kadar yüksek frekanslı</td><td style="padding:7px;border:1px solid #dbe4ee">Tıbbi cihazlar, veri merkezleri, hassas elektronik sistemler</td></tr>
</table>
<b>IΔn (açma eşiği) seçimi:</b> <b>30 mA</b> = insan hayatını koruma standardı (priz/son devreler). <b>100–300 mA</b> = yangın koruması ve ana pano selektivitesi. Kural: kişi koruması istenen her son devrede 30 mA şart; ana panoda S tipi 300 mA ile kademelendirilir ki mutfaktaki kaçak bütün binayı karartmasın.<br>
<b>Saha özeti:</b> Eski aydınlatma tesisatı → AC tipi yeter · Modern ev → A tipi · İnverter klima/ısı pompası → F · EV şarj + solar + VFD → mutlaka B · Ana pano → S (gecikmeli).`;

QBANK[26]=QBANK[26].concat([
 {q:"Elektrikli araç şarj istasyonu devresinde hangi tip kaçak akım rölesi kullanılmalıdır?",opts:["AC tipi","A tipi","B tipi","S tipi"],ans:2,ex:"EV şarjı düz DC kaçak üretebilir; bunu yalnız B tipi algılar. AC/A tipleri düz DC kaçağı 'göremez' ve koruma sağlamaz."},
 {q:"Kaçak akım rölesindeki 'A' harfi neyi ifade eder?",opts:["Sadece AC kaçakları algılar","AC + darbeli DC kaçakları algılar","Sadece DC algılar","Gecikmeli açar"],ans:1,ex:"A tipi, sinüzoidal AC'ye ek olarak darbeli DC kaçak akımlarını da algılar — çamaşır/bulaşık makinesi gibi elektronik yüklü modern evler için en uygun tiptir."},
 {q:"S tipi kaçak akım rölesinin özelliği nedir?",opts:["Yüksek frekans algılar","Zamana gecikmeli açar (selektivite)","Sadece DC algılar","30 mA'dan küçüktür"],ans:1,ex:"S = selektif/gecikmeli. Kısa süreli kaçakta açmaz; ana panoda kullanılır ki önce alt devredeki 30 mA röle açsın, bina komple karanlığa gömülmesin."},
 {q:"İnsan hayatını korumak için son devrelerde standart IΔn değeri kaçtır?",opts:["10 mA","30 mA","100 mA","300 mA"],ans:1,ex:"30 mA insan koruması standardıdır. 100–300 mA değerleri yangın koruması ve ana pano selektivitesi içindir."},
 {q:"İnverter klima ve ısı pompası devresi için tercih edilen röle tipi?",opts:["AC","A","F","S"],ans:2,ex:"F tipi; AC + darbeli DC'ye ek yüksek frekanslı kaçakları algılar. İnverter teknolojisi yüksek frekanslı kaçak üretebilir; F tipi hem korur hem gereksiz açmayı azaltır."}
]);

TEORI[3]=(TEORI[3]||'')+`<br><br><b style="font-size:15px">📏 Cep Tablosu: Kesit → Sigorta → Maks. Güç → Tipik Kullanım (230 V tek faz)</b>
<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px">
<tr style="background:rgba(37,99,235,.07)"><th style="padding:7px;border:1px solid #dbe4ee">Kesit</th><th style="padding:7px;border:1px solid #dbe4ee">Sigorta</th><th style="padding:7px;border:1px solid #dbe4ee">Maks. güç</th><th style="padding:7px;border:1px solid #dbe4ee">Tipik kullanım</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>1,5 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">10 A</td><td style="padding:7px;border:1px solid #dbe4ee">~2300 W</td><td style="padding:7px;border:1px solid #dbe4ee">💡 Aydınlatma devreleri</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>2,5 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">16 A</td><td style="padding:7px;border:1px solid #dbe4ee">~3600 W</td><td style="padding:7px;border:1px solid #dbe4ee">🔌 Priz devreleri</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>4 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">20–25 A</td><td style="padding:7px;border:1px solid #dbe4ee">~5750 W</td><td style="padding:7px;border:1px solid #dbe4ee">❄️ Klima, ankastre ocak</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>6 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">32 A</td><td style="padding:7px;border:1px solid #dbe4ee">~7360 W</td><td style="padding:7px;border:1px solid #dbe4ee">🚿 Şofben, elektrikli fırın hattı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>10 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">40–50 A</td><td style="padding:7px;border:1px solid #dbe4ee">~9200 W</td><td style="padding:7px;border:1px solid #dbe4ee">⚙️ Motor hatları, güçlü yükler</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>10–16 mm²</b></td><td style="padding:7px;border:1px solid #dbe4ee">63 A</td><td style="padding:7px;border:1px solid #dbe4ee">~14500 W</td><td style="padding:7px;border:1px solid #dbe4ee">🏠 Ana besleme / ev girişi (kolon hattı)</td></tr>
</table>
<b>Nasıl okunur?</b> Maks. güç ≈ V × I (230 × sigorta akımı). Bu tablo <b>hızlı saha kontrolü</b> içindir; kesin seçimde üç kriteri (akım kapasitesi · gerilim düşümü · koruma uyumu) mutlaka uygula. Sıra hep aynı: <b>yük ≤ sigorta ≤ kablo kapasitesi</b>.`;

QBANK[3]=QBANK[3].concat([
 {q:"Aydınlatma devresi için standart kesit ve sigorta ikilisi hangisidir?",opts:["1,5 mm² – 10 A","2,5 mm² – 16 A","4 mm² – 25 A","6 mm² – 32 A"],ans:0,ex:"Aydınlatma: 1,5 mm² + 10 A (~2300 W). Priz devresi ise 2,5 mm² + 16 A ile çekilir."},
 {q:"2,5 mm² kablo + 16 A sigortalı priz hattından güvenle çekilebilecek yaklaşık maksimum güç?",opts:["1500 W","2300 W","3600 W","7360 W"],ans:2,ex:"P ≈ V×I = 230×16 ≈ 3600 W. Bu yüzden 2000 W'lık iki ısıtıcıyı aynı priz hattına takmak sigortayı attırır."},
 {q:"Şofben/fırın gibi 7 kW'a yaklaşan sabit yük için doğru hat?",opts:["1,5 mm² – 10 A","2,5 mm² – 16 A","6 mm² – 32 A","Priz hattına takılır"],ans:2,ex:"~7360 W için 6 mm² + 32 A müstakil hat gerekir; böyle yükler asla ortak priz devresine bağlanmaz."}
]);

/* ===== EK v8: KNX & Otomasyon modülleri (37-38) ===== */
MODS.push({id:37, t:"KNX & Bina Otomasyonu", cat:"oto", ic:"🏢", d:"KNX nedir? Bus, telegram, ETS, aktör/sensör."});
MODS.push({id:38, t:"Pano İçi Otomasyon & Ekipmanlar", cat:"oto", ic:"🎛️", d:"Kontaktör, röleler, PLC, kumanda devreleri."});
Object.assign(TEORI,{
37:`<b style="font-size:15px">🔹 KNX Nedir, Neden Dünya Standardı?</b><br>
KNX, bina otomasyonu için geliştirilmiş, üreticiden bağımsız <b>dünya standardıdır (ISO/IEC 14543-3)</b>. Yani ABB'nin butonu, Siemens'in aktörü, Schneider'in sensörü aynı hatta sorunsuz konuşur; sen tek bir yazılımla (ETS) hepsini programlarsın. Havalimanı terminalleri, oteller, hastaneler gibi büyük binalarda aydınlatma, panjur, HVAC ve enerji izleme neredeyse hep KNX ile yapılır. DHMİ tesislerindeki modern terminal binalarında da aydınlatma sahneleri ve merkezi kumanda tipik KNX işidir.<br><br>
<b style="font-size:15px">🔹 Klasik Tesisat ile Farkı</b><br>
Klasik tesisatta buton ile lamba arasında <b>fiziksel bir kablo</b> vardır; buton neyi keserse o yanar-söner. Bir butonun görevini değiştirmek istersen duvarı kırar, kablo çekersin. KNX'te ise buton lambaya değil, <b>bus hattına</b> bağlıdır. Buton "1/2/3 grubuna AÇ komutu" diye bir mesaj (telegram) atar; o grubu dinleyen aktör röle çeker, lamba yanar. Görev değişikliği = sadece yazılımda parametre değişikliği. Su benzetmesi: klasik tesisat her muslukten her lavaboya ayrı boru çekmek gibidir; KNX ise tek ana boru (bus) üzerinden herkesin adresli koli aldığı bir kargo sistemi gibidir.<br><br>
<b style="font-size:15px">🔹 Bus Topolojisi: Line, Area, Coupler</b><br>
KNX'in en küçük yapı taşı <b>hat (line)</b> segmentidir. <b>Bir segmente en fazla 64 cihaz</b> bağlanır; repeater ile hat genişletilebilir. Hatlar <b>line coupler (hat kuplörü)</b> ile ana hatta, ana hatlar da <b>area coupler (alan kuplörü)</b> ile omurgaya (backbone) bağlanır. Kuplörler aynı zamanda <b>filtre</b> görevi görür: sadece karşı tarafı ilgilendiren telegramları geçirir, gereksiz trafiği keser. 15 alan x 15 hat yapısıyla dev binalar kurulabilir.<br><br>
<b style="font-size:15px">🔹 Güç Kaynağı ve Bus Kablosu</b><br>
Her hattın kendi <b>KNX güç kaynağı</b> vardır: <b>29V DC, SELV</b> (güvenlik çok düşük gerilim, şebekeden güvenli izoleli). Kaynak içinde bir <b>şok bobini (choke)</b> bulunur; bu bobin DC beslemeyi verirken telegram sinyalinin kısa devre olmasını engeller. Bus kablosu meşhur <b>yeşil KNX kablosudur: 2x2x0.8 mm</b>. Kullanılan çift: <b>KIRMIZI = + , SİYAH = −</b>. Sarı/beyaz çift yedektir. Cihazlar bus'tan hem beslenir hem haberleşir; tek kabloda "elektrik + veri" birlikte taşınır (yine su benzetmesi: aynı borudan hem su hem faturanın bilgisi akar gibi).<br><br>
<b style="font-size:15px">🔹 Adresleme: Fiziksel Adres ve Grup Adresi</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Adres türü</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Örnek</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Anlamı</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Fiziksel adres</td><td style="padding:7px;border:1px solid #dbe4ee"><b>1.1.5</b></td><td style="padding:7px;border:1px solid #dbe4ee">Alan 1, Hat 1, Cihaz 5 — cihazın "TC kimlik no"su, hatta benzersizdir</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Grup adresi</td><td style="padding:7px;border:1px solid #dbe4ee"><b>1/2/3</b></td><td style="padding:7px;border:1px solid #dbe4ee">Ana grup/orta grup/alt grup — fonksiyonun adresi ("Kat 1 koridor aydınlatma AÇ/KAPA" gibi)</td></tr>
</table><br>
Telegram mantığı şöyledir: buton, grup adresi <b>1/2/3</b>'e "1" (AÇ) değerini yayınlar. Bus'taki BÜTÜN cihazlar mesajı duyar ama sadece o grup adresine abone olan aktörler harekete geçer. Radyo yayını gibi: herkes frekansı duyar, sadece o kanalı dinleyen tepki verir. Bir grup adresine birden çok buton ve birden çok aktör bağlanabilir — merkezi kapama bu sayede tek telegramla yapılır.<br><br>
<b style="font-size:15px">🔹 Sensör mü Aktör mü?</b><br>
<b>Sensörler bilgi üretir ve telegram GÖNDERİR:</b> buton, sıcaklık sensörü, hareket (PIR) dedektörü, lüks (aydınlık) sensörü, hava istasyonu. <b>Aktörler telegramı ALIR ve yükü sürer:</b> röle (anahtarlama) aktörü lambayı açar, dimmer aktörü parlaklığı ayarlar, jaluzi/panjur aktörü motoru yukarı-aşağı sürer, vana aktörü ısıtmayı kısar. Kural basit: parmağın/ortam değeri → sensör; 230V yükü süren → aktör.<br><br>
<b style="font-size:15px">🔹 ETS ile Programlama Akışı</b><br>
1) ETS'te proje aç, bina yapısını (kat/oda) kur. 2) Üreticilerin ürün veritabanlarını içe aktar, cihazları odalara yerleştir. 3) Topolojiyi kur, her cihaza fiziksel adres ver. 4) Grup adreslerini oluştur, sensör ve aktör nesnelerini aynı gruba bağla. 5) Cihaz parametrelerini ayarla (dim eğrisi, panjur süresi vb.). 6) Sahada cihazın <b>programlama butonuna</b> basıp fiziksel adresi yükle, sonra uygulama programını indir. 7) Test et, projeyi yedekle (proje dosyası ve şifresi kaybolursa bina yeniden programlanır — pahalı ders!).<br><br>
<b style="font-size:15px">🔹 Tipik Senaryolar ve Saha Kontrolü</b><br>
Aydınlatma sahneleri (toplantı/sunum/temizlik modu), panjur-güneş takibi, HVAC gece-gündüz rejimi, "binadan çıkarken tek tuşla merkezi kapama", lüks sensörüyle gün ışığına göre otomatik dim. <b>Devreye alma sırası:</b> önce bus kablo sürekliliği ve polarite, sonra güç kaynağı enerjilendir, <b>hat sonunda gerilimi ölç</b> (kaynak boşta ~30V gösterir; yüklü hatta cihaz ucunda <b>en az 21V</b> olmalı), sonra adres yükle, en son grup bağlantılarını test et. <b>Sık hatalar:</b> kırmızı-siyah <b>polarite ters</b> bağlanması (cihaz çalışmaz), aynı fiziksel adresin iki cihaza verilmesi (<b>adres çakışması</b>, programlama kilitlenir), hat sonunda gerilim düşümü (kablo çok uzun/ek hatalı), bus kablosunun 230V hatla aynı boruda taşınması.`,
38:`<b style="font-size:15px">🔹 Pano: Otomasyonun Kalbi</b><br>
Bir kumanda panosu, orkestra gibidir: kontaktör kaslardır, röleler sinir sistemi, PLC beyindir, klemensler eklemlerdir. Sahada arıza bulmanın yolu her elemanın görevini ve <b>klemens numarasını</b> ezbere bilmekten geçer.<br><br>
<b style="font-size:15px">🔹 Kontaktör</b><br>
Elektromıknatısla çalışan güç anahtarıdır. <b>A1/A2</b> uçları bobindir; A1'e faz (veya 24V), A2'ye nötr verilir, bobin enerjilenince nüve çeker ve <b>ana kontaklar (1-2, 3-4, 5-6)</b> kapanıp motora güç verir. Üzerindeki küçük <b>yardımcı kontaklar</b> kumanda içindir: <b>13-14 NO</b> (normalde açık), <b>21-22 NC</b> (normalde kapalı). <b>AC-3</b> kullanım sınıfı, sincap kafesli asenkron motorların yol alma ve durdurulması içindir (kalkış akımı 6-8xIn'i kaldırır); rezistif yükler için AC-1 yeter. Su benzetmesi: bobin, küçük bir el gücüyle koca ana vanayı açan servo koldur.<br><br>
<b style="font-size:15px">🔹 Termik Aşırı Yük Rölesi ve Motor Koruma Şalteri</b><br>
Termik röle, kontaktörün altına takılır; içindeki bimetal şeritler motor akımıyla ısınır. <b>Ayar akımı motor etiket akımına (In) ayarlanır.</b> Aşırı yükte atar: <b>95-96 NC kontağı AÇILIR</b> ve kumanda devresini kesip kontaktörü bıraktırır; <b>97-98 NO kontağı KAPANIR</b> ve arıza lambasını yakar. Termik kısa devreyi KESMEZ — kısa devre koruması sigorta/şalterin işidir. <b>Motor koruma şalteri (MKŞ)</b> ise termik + manyetik korumayı tek gövdede birleştirir; küçük motorlarda sigorta+termik ikilisinin yerini alır.<br><br>
<b style="font-size:15px">🔹 Zaman Röleleri</b><br>
<b>Çekmede gecikmeli (on-delay):</b> enerji gelince süre saymaya başlar, süre dolunca kontak konum değiştirir (örn. fan, kompresörden 5 sn sonra başlasın). <b>Bırakmada gecikmeli (off-delay):</b> enerji kesilince kontak bir süre daha tutar (örn. motor durunca soğutma fanı 30 sn daha dönsün). <b>Yıldız-üçgen zaman rölesi:</b> motoru önce yıldızda çalıştırır, ayarlanan süre sonunda (araya 50 ms civarı ölü zaman koyarak) üçgene geçirir; yıldız ve üçgen kontaktörlerinin AYNI ANDA çekmesini önlemek hayati önemdedir (faz arası kısa devre!).<br><br>
<b style="font-size:15px">🔹 Koruma ve Fonksiyon Röleleri</b><br>
<b>Faz koruma / faz sırası rölesi:</b> faz kesilmesi, düşük/yüksek gerilim ve ters faz sırasını izler; sıra tersse çıkış kontağını çekmez, motorun ters dönmesini engeller (asansör, pompa, apron köprüsü gibi yerlerde şart). <b>Sıvı seviye rölesi:</b> depodaki elektrotlarla su seviyesini algılar, pompayı kuru çalışmadan korur ve depo dolunca durdurur. <b>Darbe akım rölesi (impuls röle):</b> her buton darbesinde konum değiştirir (bas-yan, bas-sön); koridor aydınlatmasında çok butonla tek devre kumandası. <b>Merdiven otomatiği:</b> butona basılınca lambayı yakar, ayarlanan süre (örn. 3 dk) sonunda kendiliğinden söndürür.<br><br>
<b style="font-size:15px">🔹 Akıllı Röle / Mini PLC (Logo, Zelio, Easy)</b><br>
Klasik röle ormanının yerini alan programlanabilir kutu. <b>Ladder (merdiven) mantığı</b> kullanılır: seri bağlı kontaklar <b>AND</b> (hepsi kapalıysa çıkış var), paralel kontaklar <b>OR</b> (biri kapalıysa yeter). <b>Self-holding (mühürleme):</b> çıkışın kendi kontağı, start butonuna paralel bağlanır; buton bırakılsa da devre "kendini hatırlar". Zamanlayıcı, sayıcı, haftalık saat gibi fonksiyonlar yazılımla eklenir; pano küçülür, kablolama azalır, senaryo değişikliği program değişikliğine döner.<br><br>
<b style="font-size:15px">🔹 Buton/Lamba Renkleri, Klemens ve Numaralandırma</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Renk (IEC 60204-1)</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Buton</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Sinyal lambası</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kırmızı</td><td style="padding:7px;border:1px solid #dbe4ee">DUR / acil durdurma</td><td style="padding:7px;border:1px solid #dbe4ee">Arıza, tehlike</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yeşil</td><td style="padding:7px;border:1px solid #dbe4ee">ÇALIŞTIR / başlat</td><td style="padding:7px;border:1px solid #dbe4ee">Normal çalışma</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Sarı</td><td style="padding:7px;border:1px solid #dbe4ee">Anormal duruma müdahale</td><td style="padding:7px;border:1px solid #dbe4ee">Uyarı, anormal durum</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Mavi / Beyaz</td><td style="padding:7px;border:1px solid #dbe4ee">Reset / genel amaç</td><td style="padding:7px;border:1px solid #dbe4ee">Zorunlu bilgi / genel bilgi</td></tr>
</table><br>
<b>Selektör şalter</b> (0-1, El-0-Oto) çalışma modunu seçer. <b>Ray klemensler</b> DIN rayına dizilir; <b>sarı-yeşil topraklama klemensi</b> raya kendinden temaslıdır. Çok telli iletken uçlarına <b>ferrül (yüksük)</b> takılır, her kablo iki ucundan <b>numaralandırılır</b> — projede 13 numaralı tel panoda da 13'tür; arıza bulmanın yarısı budur.<br><br>
<b style="font-size:15px">🔹 Kumanda Devresi ve Güç Devresi</b><br>
<b>Güç devresi</b> motoru besleyen kalın damarlı devredir (3x400V). <b>Kumanda devresi</b> ise butonlar, bobinler, lambalarla kurulan ince kesitli beyin devresidir; genellikle <b>230V AC veya güvenlik için 24V AC/DC</b> (kumanda trafosu üzerinden) çalışır. İkisi ayrı çizilir, ayrı sigortalanır.<br><br>
<b style="font-size:15px">🔹 Başlat-Durdur Mühürleme Devresi — ADIM ADIM</b><br>
1) Fazdan kumanda sigortasına gir. 2) Sigorta çıkışını termik rölenin <b>95-96 NC</b> kontağından geçir (termik atarsa her şey dursun). 3) Seri olarak <b>STOP butonunu (NC)</b> bağla. 4) Seri olarak <b>START butonunu (NO)</b> bağla. 5) Start çıkışını kontaktör bobini <b>A1</b>'e, <b>A2</b>'yi nötre bağla. 6) Kontaktörün <b>13-14 NO yardımcı kontağını START butonuna PARALEL</b> bağla — mühür budur. Çalışma: Start'a basınca bobin çeker, 13-14 kapanır; elini çeksen de akım 13-14 üzerinden dolaşır, motor çalışmaya devam eder. Stop'a basınca veya termik atınca bobin bırakır, 13-14 açılır, mühür çözülür. Enerji kesilip gelince motor KENDİLİĞİNDEN kalkmaz — bu, mühürlemenin sağladığı en önemli iş güvenliği özelliğidir.`
});
Object.assign(FOY,{
37:`💊 <b>Hap bilgiler — KNX</b><br>
• Standart: <b>ISO/IEC 14543-3</b>, üreticiden bağımsız.<br>
• Bus gerilimi: <b>29V DC SELV</b>; kaynak boşta ~30V, cihaz ucunda en az <b>21V</b>.<br>
• Kablo: yeşil <b>2x2x0.8</b> — <b>kırmızı +, siyah −</b> (sarı/beyaz yedek).<br>
• Segment başına <b>64 cihaz</b>; hatlar line coupler, alanlar area coupler ile bağlanır.<br>
• Fiziksel adres <b>1.1.5</b> = Alan.Hat.Cihaz (kimlik). Grup adresi <b>1/2/3</b> = fonksiyon (komut kanalı).<br>
• Sensör telegram gönderir, aktör yükü sürer. Programlama: <b>ETS</b>.<br>
• Sık hata: polarite ters, adres çakışması, hat sonu gerilim düşümü. Proje dosyasını YEDEKLE.<br><br>
📋 <b>Cebe yaz:</b> "29V-64 cihaz-kırmızı artı" + "önce polarite ölç, sonra adres yükle".<br><br>
🛠️ <b>Adım adım örnek — koridor lambasını butona bağlama:</b><br>
1) ETS'te grup adresi oluştur: 1/0/1 "Koridor aydınlatma".<br>
2) Butonun (fiziksel adres 1.1.10) anahtarlama nesnesini 1/0/1'e sürükle.<br>
3) Röle aktörünün (1.1.20) A kanalı nesnesini de 1/0/1'e bağla.<br>
4) İki cihaza da programı indir.<br>
5) Butona bas: buton 1/0/1'e "1" telegramı yollar, aktör röleyi çeker, lamba yanar. Grup izleme (group monitor) ekranından telegramı canlı izle.`,
38:`💊 <b>Hap bilgiler — Pano</b><br>
• Kontaktör bobini: <b>A1/A2</b>. Ana kontaklar 1-2/3-4/5-6. Yardımcı: <b>13-14 NO</b>, 21-22 NC.<br>
• Termik röle: <b>95-96 NC</b> kumandayı keser, <b>97-98 NO</b> arıza lambası. Ayar = motor etiket akımı.<br>
• Motor yolvermede kontaktör sınıfı: <b>AC-3</b>.<br>
• Zaman röleleri: on-delay (çekmede), off-delay (bırakmada), yıldız-üçgen özel röle.<br>
• Renkler: <b>kırmızı=DUR, yeşil=ÇALIŞ</b>, sarı=uyarı, mavi=reset. Toprak klemensi <b>sarı-yeşil</b>.<br>
• Kumanda devresi 230V/24V ince kesit; güç devresi ayrı. Her tel iki uçtan numaralı + ferrüllü.<br>
• Ladder: seri=AND, paralel=OR, mühürleme=self-holding.<br><br>
📋 <b>Cebe yaz:</b> "95-96 keser, 97-98 söyler; 13-14 mühürler".<br><br>
🛠️ <b>Adım adım örnek — başlat-durdur mühürleme:</b><br>
1) Faz → kumanda sigortası → termik 95-96 → STOP (NC) → START (NO) → bobin A1; A2 → nötr.<br>
2) K1'in 13-14 kontağını START'a paralel bağla.<br>
3) Start'a bas: bobin çeker, 13-14 kapanır (mühür), motor döner.<br>
4) Eli çek: motor çalışmaya devam eder (akım 13-14'ten dolaşır).<br>
5) Stop'a bas veya termik atsın: bobin bırakır, mühür çözülür, motor durur. Enerji gidip gelince motor kendiliğinden KALKMAZ — güvenlik böyle sağlanır.`
});
Object.assign(QBANK,{
37:[
{q:"KNX bus hattının nominal besleme gerilimi kaçtır?",opts:["12V DC","24V AC","29V DC","48V DC"],ans:2,ex:"KNX güç kaynağı 29V DC SELV verir. Boşta ~30V ölçülür; cihazlar 21V'a kadar çalışabilir. SELV olduğu için şebekeden güvenli izolelidir."},
{q:"Bir KNX hat segmentine en fazla kaç cihaz bağlanabilir?",opts:["32","128","256","64"],ans:3,ex:"Segment başına sınır 64 cihazdır. Daha fazlası için repeater kullanılır veya line coupler ile yeni hat açılır."},
{q:"Yeşil KNX bus kablosunda (2x2x0.8) hangi damar çifti kullanılır ve polarite nasıldır?",opts:["Kırmızı +, siyah −","Sarı +, beyaz −","Kahve +, mavi −","Siyah +, kırmızı −"],ans:0,ex:"Kırmızı damar +, siyah damar − olarak bağlanır; sarı/beyaz çift yedektir. Polarite ters bağlanırsa cihaz haberleşemez — sahadaki en sık hatalardan biridir."},
{q:"1.1.5 şeklindeki KNX adresi neyi ifade eder?",opts:["Grup adresi: ana/orta/alt grup","Fiziksel adres: Alan 1, Hat 1, Cihaz 5","IP adresi kısaltması","Telegram öncelik kodu"],ans:1,ex:"Nokta ile ayrılan adres fiziksel adrestir (Alan.Hat.Cihaz) ve cihazın kimliğidir. Bölü ile ayrılan (1/2/3) ise fonksiyonu taşıyan grup adresidir."},
{q:"Bir buton lambayı KNX üzerinden nasıl yakar?",opts:["Butondan lambaya doğrudan 230V gider","Buton grup adresine telegram yollar, o adrese bağlı aktör röleyi çeker","Buton lambaya radyo frekansıyla enerji aktarır","Güç kaynağı butonun akımını lambaya yönlendirir"],ans:1,ex:"Buton (sensör) bus'a grup adresli bir telegram yayınlar. O grup adresine abone olan anahtarlama aktörü mesajı alır ve 230V yük kontağını kapatır. Buton ile lamba arasında güç kablosu yoktur."},
{q:"Aşağıdakilerden hangisi bir AKTÖRDÜR?",opts:["Lüks sensörü","Hareket dedektörü","Jaluzi (panjur) aktörü","Sıcaklık sensörü"],ans:2,ex:"Aktörler telegramı alıp yükü sürer: röle aktörü, dimmer, jaluzi aktörü, vana aktörü. Sensörler ise ortamdan bilgi toplayıp telegram gönderir."},
{q:"ETS yazılımının görevi nedir?",opts:["Sadece enerji tüketimini faturalandırır","Bus kablosunun direncini ölçer","Yalnızca üretici ABB cihazlarını yapılandırır","KNX cihazlarını adresleme, parametre ayarı ve grup bağlantısı ile programlar"],ans:3,ex:"ETS (Engineering Tool Software) üreticiden bağımsız TEK resmi devreye alma aracıdır: topoloji, fiziksel adres, grup adresleri, parametreler ve indirme hep ETS ile yapılır. Proje dosyası mutlaka yedeklenmelidir."},
{q:"Line coupler (hat kuplörü) ne işe yarar?",opts:["Bus gerilimini 29V'tan 230V'a yükseltir","Hatları birbirine bağlar ve filtre tablosuyla gereksiz telegramları geçirmez","Cihazlara fiziksel adres dağıtır","Lambaların parlaklığını ayarlar"],ans:1,ex:"Kuplör hem topolojik bağlantı hem trafik filtresidir: yalnızca karşı hattı ilgilendiren telegramları geçirir. Böylece büyük binalarda bus trafiği yönetilebilir kalır."},
{q:"Devreye almada hat sonunda bus gerilimi ölçülüyor. Kaynak boşta ~30V iken cihaz ucunda en az kaç volt olmalıdır?",opts:["9V","15V","21V","29V"],ans:2,ex:"KNX cihazları 21-30V aralığında çalışır. Hat sonunda 21V'un altı ölçülüyorsa kablo çok uzundur, ek hatalıdır veya hatta aşırı cihaz vardır; cihazlar kararsız çalışır."},
{q:"Aynı fiziksel adresin iki cihaza verilmesi sahada nasıl bir soruna yol açar?",opts:["Hiçbir sorun olmaz, adresler paylaşılabilir","Adres çakışması olur; programlama ve haberleşme kilitlenir","Bus gerilimi iki katına çıkar","Sadece lamba renkleri değişir"],ans:1,ex:"Fiziksel adres cihazın benzersiz kimliğidir. Çakışmada ETS indirmeleri hata verir, telegramlar karışır. Çözüm: cihazlardan birine programlama moduna alıp yeni adres yüklemek."}
],
38:[
{q:"Kontaktör bobininin bağlantı uçları hangileridir?",opts:["13-14","95-96","A1-A2","1-2"],ans:2,ex:"A1/A2 bobin uçlarıdır; A1'e kumanda gerilimi (faz veya 24V), A2'ye nötr/eksi bağlanır. 1-2/3-4/5-6 ana güç kontakları, 13-14 yardımcı NO kontaktır."},
{q:"Termik aşırı yük rölesi attığında 95-96 kontağı ne yapar?",opts:["Kapanır ve motoru tekrar çalıştırır","Açılır ve kumanda devresini keserek kontaktörü bıraktırır","Arıza lambasını doğrudan söndürür","Güç devresini kısa devre eder"],ans:1,ex:"95-96 NC (normalde kapalı) kontaktır; termik atınca AÇILIR ve bobin enerjisi kesilir. 97-98 NO kontak ise KAPANIR ve arıza sinyal lambasını yakar. Termik kısa devreyi kesmez; o iş sigorta/şalterindir."},
{q:"Sincap kafesli asenkron motorun yol alma/durdurma anahtarlaması için kontaktör hangi kullanım sınıfında seçilir?",opts:["AC-1","AC-15","DC-5","AC-3"],ans:3,ex:"AC-3, motorun 6-8 kat kalkış akımını anahtarlamaya uygun sınıftır. AC-1 rezistif yükler içindir; motorda AC-1 kontaktör seçilirse kontaklar erken yanar."},
{q:"Yıldız-üçgen zaman rölesinin kritik görevi nedir?",opts:["Motoru sürekli yıldızda tutmak","Süre sonunda araya ölü zaman koyarak yıldızdan üçgene geçirmek, iki kontaktörün aynı anda çekmesini önlemek","Motor akımını ölçüp faturalamak","Faz sırasını düzeltmek"],ans:1,ex:"Yıldız ve üçgen kontaktörleri AYNI ANDA çekerse fazlar arası kısa devre oluşur. Özel röle, ayarlanan süre sonunda yıldızı bırakıp ~50 ms ölü zaman sonrası üçgeni çektirir; ayrıca elektriksel kilitleme (NC kontaklarla) yapılır."},
{q:"Mühürleme (self-holding) devresinde kontaktörün hangi kontağı start butonuna paralel bağlanır?",opts:["95-96 NC","21-22 NC","13-14 NO","A1-A2"],ans:2,ex:"13-14 NO yardımcı kontak start'a paralel bağlanır. Bobin çekince 13-14 kapanır ve buton bırakılsa da akım bu kontaktan dolaşır — devre kendini mühürler."},
{q:"IEC renk standardına göre butonlarda kırmızı ve yeşilin anlamı nedir?",opts:["Kırmızı=çalıştır, yeşil=dur","Kırmızı=dur/acil, yeşil=çalıştır","İkisi de yalnızca sinyal içindir","Renk seçimi tamamen serbesttir"],ans:1,ex:"IEC 60204-1: kırmızı = durdurma/acil durdurma, yeşil = başlatma. Sinyal lambasında kırmızı arıza/tehlike, yeşil normal çalışma, sarı uyarı anlamındadır."},
{q:"Faz sırası rölesi hangi tehlikeyi önler?",opts:["Faz sırası ters bağlandığında motorun ters yönde dönmesini","Motorun aşırı ısınmasını","Kumanda sigortasının atmasını","Bus geriliminin düşmesini"],ans:0,ex:"Üç fazlı motorda iki fazın yeri değişirse dönüş yönü tersine döner; asansör, pompa, konveyör gibi yerlerde bu tehlikelidir. Röle sırayı izler, sıra yanlışsa çıkış kontağını çektirmez, motor hiç kalkmaz."},
{q:"Kumanda devresi ile güç devresi arasındaki temel fark nedir?",opts:["Kumanda devresi her zaman 400V'tur","Güç devresi motoru besler (kalın kesit), kumanda devresi buton-bobin-lamba mantığını taşır (ince kesit, 230V veya 24V)","İkisi aynı devredir, sadece rengi farklıdır","Kumanda devresinde sigorta kullanılmaz"],ans:1,ex:"Güç devresi 3x400V ile motoru sürer; kumanda devresi ise bobinleri ve sinyalleri yöneten ayrı sigortalı, ince kesitli devredir. Güvenlik istenirse kumanda trafo ile 24V'a düşürülür."},
{q:"Merdiven otomatiğinin çalışma prensibi nedir?",opts:["Butona basılınca lamba yanar ve ayarlanan süre sonunda kendiliğinden söner","Lamba sürekli yanar, buton söndürür","Her basışta konum değiştirir","Sadece gündüz çalışır"],ans:0,ex:"Merdiven otomatiği bir zaman rölesidir: darbe alınca çıkışı çeker, ayarlanan süre (örn. 1-5 dk) dolunca söndürür. Her basışta konum değiştiren cihaz ise darbe akım (impuls) rölesidir — ikisini karıştırma."},
{q:"Ladder (merdiven) mantığında seri ve paralel bağlı kontaklar hangi mantık işlemine karşılık gelir?",opts:["Seri=OR, paralel=AND","Seri=AND, paralel=OR","İkisi de NOT","Seri=XOR, paralel=NAND"],ans:1,ex:"Seri kontakların HEPSİ kapalıysa akım geçer = AND. Paralel kollardan BİRİ kapalıysa yeter = OR. Mühürleme, çıkış kontağının start'a paralel (OR) bağlanmasıyla kurulan bir hafızadır."}
]
});
Object.assign(DIAG,{
37:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#0d1520"/><text x="220" y="18" fill="#33b1ff" font-size="12" text-anchor="middle" font-weight="bold">KNX BUS TOPOLOJİSİ (1 HAT SEGMENTİ)</text><rect x="20" y="40" width="86" height="46" rx="4" fill="#20303f" stroke="#8a98ab"/><text x="63" y="58" fill="#ffb000" font-size="10" text-anchor="middle">GÜÇ KAYNAĞI</text><text x="63" y="72" fill="#8a98ab" font-size="9" text-anchor="middle">29V DC SELV</text><rect x="128" y="40" width="70" height="46" rx="4" fill="#20303f" stroke="#8a98ab"/><text x="163" y="58" fill="#33b1ff" font-size="10" text-anchor="middle">BUTON</text><text x="163" y="72" fill="#8a98ab" font-size="9" text-anchor="middle">sensör 1.1.10</text><rect x="218" y="40" width="76" height="46" rx="4" fill="#20303f" stroke="#8a98ab"/><text x="256" y="58" fill="#33b1ff" font-size="10" text-anchor="middle">PIR SENSÖR</text><text x="256" y="72" fill="#8a98ab" font-size="9" text-anchor="middle">sensör 1.1.11</text><rect x="314" y="40" width="86" height="46" rx="4" fill="#20303f" stroke="#8a98ab"/><text x="357" y="58" fill="#f85149" font-size="10" text-anchor="middle">RÖLE AKTÖRÜ</text><text x="357" y="72" fill="#8a98ab" font-size="9" text-anchor="middle">aktör 1.1.20</text><line x1="63" y1="86" x2="63" y2="120" stroke="#3fb950" stroke-width="3"/><line x1="163" y1="86" x2="163" y2="120" stroke="#3fb950" stroke-width="3"/><line x1="256" y1="86" x2="256" y2="120" stroke="#3fb950" stroke-width="3"/><line x1="357" y1="86" x2="357" y2="120" stroke="#3fb950" stroke-width="3"/><line x1="30" y1="120" x2="420" y2="120" stroke="#3fb950" stroke-width="4"/><text x="225" y="136" fill="#3fb950" font-size="10" text-anchor="middle">YEŞİL KNX BUS 2x2x0.8 — KIRMIZI(+) / SİYAH(−) — maks. 64 cihaz</text><line x1="357" y1="86" x2="357" y2="86" stroke="#8a98ab"/><line x1="380" y1="40" x2="380" y2="26" stroke="#ffb000" stroke-width="2"/><circle cx="380" cy="20" r="6" fill="none" stroke="#ffb000" stroke-width="2"/><line x1="376" y1="16" x2="384" y2="24" stroke="#ffb000" stroke-width="1.5"/><line x1="384" y1="16" x2="376" y2="24" stroke="#ffb000" stroke-width="1.5"/><text x="406" y="24" fill="#ffb000" font-size="9">230V lamba</text><text x="30" y="160" fill="#8a98ab" font-size="10">Telegram: buton 1/2/3 grubuna AÇ komutu yayınlar,</text><text x="30" y="174" fill="#8a98ab" font-size="10">aynı gruba abone aktör röleyi çeker → lamba yanar.</text><text x="30" y="190" fill="#33b1ff" font-size="9">Line coupler ile diğer hatlara, area coupler ile omurgaya bağlanır.</text></svg>`,
38:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#0d1520"/><text x="220" y="16" fill="#33b1ff" font-size="12" text-anchor="middle" font-weight="bold">BAŞLAT-DURDUR MÜHÜRLEME (KUMANDA DEVRESİ)</text><line x1="40" y1="30" x2="40" y2="180" stroke="#f85149" stroke-width="2"/><text x="28" y="40" fill="#f85149" font-size="10">L1</text><line x1="400" y1="30" x2="400" y2="180" stroke="#33b1ff" stroke-width="2"/><text x="406" y="40" fill="#33b1ff" font-size="10">N</text><line x1="40" y1="70" x2="70" y2="70" stroke="#8a98ab" stroke-width="2"/><rect x="70" y="62" width="34" height="16" fill="#20303f" stroke="#ffb000"/><text x="87" y="74" fill="#ffb000" font-size="9" text-anchor="middle">F1</text><line x1="104" y1="70" x2="130" y2="70" stroke="#8a98ab" stroke-width="2"/><rect x="130" y="58" width="46" height="24" fill="#20303f" stroke="#8a98ab"/><text x="153" y="68" fill="#f85149" font-size="9" text-anchor="middle">TERMİK</text><text x="153" y="79" fill="#8a98ab" font-size="8" text-anchor="middle">95-96 NC</text><line x1="176" y1="70" x2="200" y2="70" stroke="#8a98ab" stroke-width="2"/><rect x="200" y="58" width="42" height="24" fill="#20303f" stroke="#f85149"/><text x="221" y="68" fill="#f85149" font-size="9" text-anchor="middle">STOP</text><text x="221" y="79" fill="#8a98ab" font-size="8" text-anchor="middle">NC</text><line x1="242" y1="70" x2="264" y2="70" stroke="#8a98ab" stroke-width="2"/><rect x="264" y="58" width="42" height="24" fill="#20303f" stroke="#3fb950"/><text x="285" y="68" fill="#3fb950" font-size="9" text-anchor="middle">START</text><text x="285" y="79" fill="#8a98ab" font-size="8" text-anchor="middle">NO</text><line x1="306" y1="70" x2="336" y2="70" stroke="#8a98ab" stroke-width="2"/><circle cx="352" cy="70" r="16" fill="#20303f" stroke="#ffb000" stroke-width="2"/><text x="352" y="74" fill="#ffb000" font-size="10" text-anchor="middle">K1</text><text x="336" y="52" fill="#8a98ab" font-size="8">A1</text><text x="372" y="92" fill="#8a98ab" font-size="8">A2</text><line x1="368" y1="70" x2="400" y2="70" stroke="#8a98ab" stroke-width="2"/><line x1="264" y1="70" x2="264" y2="120" stroke="#3fb950" stroke-width="2"/><line x1="306" y1="70" x2="306" y2="120" stroke="#3fb950" stroke-width="2"/><line x1="264" y1="120" x2="272" y2="120" stroke="#3fb950" stroke-width="2"/><rect x="272" y="110" width="26" height="20" fill="#20303f" stroke="#3fb950"/><text x="285" y="121" fill="#3fb950" font-size="8" text-anchor="middle">K1</text><text x="285" y="129" fill="#8a98ab" font-size="7" text-anchor="middle">13-14</text><line x1="298" y1="120" x2="306" y2="120" stroke="#3fb950" stroke-width="2"/><text x="285" y="146" fill="#3fb950" font-size="9" text-anchor="middle">MÜHÜR (paralel)</text><text x="40" y="168" fill="#8a98ab" font-size="9">Start basılınca K1 çeker, 13-14 kapanır; el çekilse de devre</text><text x="40" y="181" fill="#8a98ab" font-size="9">mühür üzerinden beslenir. Stop veya termik (95-96) devreyi çözer.</text><text x="40" y="194" fill="#ffb000" font-size="9">K1 ana kontakları (1-2/3-4/5-6) güç devresinde motoru sürer.</text></svg>`
});

/* ===== EK v8: AG/OG + Pano Tasarımı modülleri (39-40) ===== */
MODS.push({id:39, t:"AG / OG Dağıtım Mimarisi", cat:"oto", ic:"🏗️", d:"OG hücreler, trafo, ADP, bara, kompanzasyon."});
MODS.push({id:40, t:"Pano Tasarımı & Senaryolar", cat:"oto", ic:"📐", d:"Yerleşim, form, ısı hesabı, 'ne yaparsak ne olur?'"});

Object.assign(TEORI,{
39:`<b style="font-size:15px">🔹 AG mi, OG mi? Önce Tanımlar</b><br>
Elektrik dağıtımında gerilim seviyeleri sınıflara ayrılır: <b>AG (Alçak Gerilim)</b> 1000 V (1 kV) ve altındaki gerilimlerdir; Türkiye'de tipik AG değeri <b>0,4 kV (400 V faz arası / 230 V faz-nötr)</b> olur. <b>OG (Orta Gerilim)</b> 1 kV ile 36 kV arasıdır; Türkiye dağıtım şebekesinde en yaygın OG değeri <b>34,5 kV</b>'tur (bazı bölgelerde 15,8 kV ve 6,3 kV da görülür). Bunun üstü <b>YG (Yüksek Gerilim)</b> iletim seviyesidir: 154 kV ve 380 kV.<br><br>
<b style="font-size:15px">🔹 Enerji Zinciri: Santralden Prize</b><br>
Enerji şu yolu izler: <b>Santral</b> (üretim, genelde 10-20 kV'ta üretilir) → yükseltici trafo ile <b>iletim hattı (154/380 kV)</b> → indirici trafo merkezleri → <b>OG dağıtım (34,5 kV)</b> → mahalledeki/tesisteki <b>dağıtım trafosu (34,5/0,4 kV)</b> → <b>AG ana dağıtım panosu (ADP)</b> → tali panolar → yükler. Gerilimi yükseltmenin sebebi basittir: aynı güç için gerilim arttıkça akım düşer, akım düşünce hat kaybı (I²R) ve iletken kesiti düşer.<br><br>
<b style="font-size:15px">🔹 OG Hücreleri: Trafo Merkezinin Odaları</b><br>
OG tarafı "hücre" adı verilen, metal muhafazalı, tip testli modüler bölmelerden kurulur. Tipik bir müşteri trafo merkezinde dizilim: <b>Giriş hücresi</b> (şebekeden gelen kablo buraya girer), gerekirse <b>çıkış hücresi</b> (ring şebekede enerjiyi bir sonraki merkeze aktarır), <b>ölçü hücresi</b> (OG gerilim ve akım trafoları ile sayaç ölçümü) ve <b>trafo koruma hücresi</b> (trafoyu besleyen ve koruyan hücre). Hücreler iki ana tipe ayrılır: <b>yük ayırıcılı</b> hücre yük akımını açıp kapatabilir ama kısa devreyi kesemez; kısa devre koruması seri bağlı OG sigortasıyla yapılır (küçük trafolar için ekonomiktir). <b>Kesicili</b> hücre ise kısa devre akımını kesebilen gerçek bir kesici içerir ve röle ile koordineli çalışır; büyük güçlerde zorunludur. Kesicilerde ark söndürme ortamı olarak <b>vakum</b> (dağıtımda en yaygın, bakım gerektirmez) veya <b>SF6 gazı</b> kullanılır; SF6 çok iyi yalıtkandır ama güçlü bir sera gazı olduğundan kaçak takibi ister ve yeni tesislerde vakum/temiz hava çözümleri tercih edilmektedir.<br><br>
<b style="font-size:15px">🔹 Dağıtım Trafosu ve Dyn11</b><br>
Dağıtım trafosu 34,5 kV'u 0,4 kV'a indirir. Etiketteki <b>Dyn11</b> bağlantı grubudur: <b>D</b> = primer (OG) sargı üçgen, <b>yn</b> = sekonder (AG) sargı yıldız ve nötrü dışarı çıkarılmış, <b>11</b> = sekonder gerilimin primerden 11×30° = 330° kaydığı (yani 30° ileride olduğu) anlamına gelir. Yıldız sekonder sayesinde AG tarafında nötr elde edilir ve tek fazlı yükler beslenir. Soğutma tipine göre <b>yağlı tip</b> (ONAN: yağ doğal, hava doğal; ucuz, dış ortama uygun ama yangın/sızıntı riski) ve <b>kuru tip</b> (döküm reçineli; bina içi, yangın riski düşük, biraz pahalı) ayrımı vardır. Yağlı trafolarda <b>Buchholz rölesi</b> kazan ile genleşme deposu arasına takılır; içeride ark/aşırı ısınma sonucu gaz oluşursa veya ani yağ akışı olursa önce alarm, ağır arızada açma verir. Termometre, yağ seviye göstergesi ve basınç ventili diğer koruma donanımlarıdır.<br><br>
<b style="font-size:15px">🔹 AG Ana Dağıtım Panosu (ADP)</b><br>
Trafodan gelen AG besleme ADP'ye girer. Girişte <b>ACB (açık tip hava kesici)</b> bulunur: yüksek akımlarda (630 A - 6300 A) ayarlanabilir elektronik koruma üniteli ana kesicidir. Enerji ACB'den <b>bakır baralara</b> dağılır. Bara kesiti, taşınacak sürekli akıma, kısa devre dayanımına ve ısınmaya göre seçilir; kabaca çıplak bakır barada cm² başına 1,5-2 A/mm² mertebesi değil, pratik tablolarla (örn. 30x10 mm bara ≈ 700-800 A) belirlenir. İletken tanıma renkleri: <b>L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı</b>. Çıkış kolonları çoğu tesiste <b>NH bıçaklı sigortalı</b> yük ayırıcılarla korunur; NH boyları güç kademesini belirler: <b>NH00 (≤160 A), NH1 (≤250 A), NH2 (≤400 A), NH3 (≤630 A)</b>. Ölçü için baralara <b>akım trafoları</b> (örn. 1000/5 A) takılır; sayaç ve analizörler bu 5 A'lik sekonderden beslenir. Akım trafosunun sekonderi yük altında asla açık bırakılmaz.<br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Seviye</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Tipik değer (TR)</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Görev</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Ana ekipman</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">YG iletim</td><td style="padding:7px;border:1px solid #dbe4ee">154 / 380 kV</td><td style="padding:7px;border:1px solid #dbe4ee">Uzak mesafe taşıma</td><td style="padding:7px;border:1px solid #dbe4ee">İletim hattı, oto trafo</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">OG dağıtım</td><td style="padding:7px;border:1px solid #dbe4ee">34,5 kV</td><td style="padding:7px;border:1px solid #dbe4ee">Bölge içi dağıtım</td><td style="padding:7px;border:1px solid #dbe4ee">Hücreler, kesici, ayırıcı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Trafo</td><td style="padding:7px;border:1px solid #dbe4ee">34,5/0,4 kV Dyn11</td><td style="padding:7px;border:1px solid #dbe4ee">İndirme</td><td style="padding:7px;border:1px solid #dbe4ee">Yağlı/kuru trafo, Buchholz</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">AG</td><td style="padding:7px;border:1px solid #dbe4ee">0,4 kV / 230 V</td><td style="padding:7px;border:1px solid #dbe4ee">Son kullanım</td><td style="padding:7px;border:1px solid #dbe4ee">ADP, ACB, NH, bara</td></tr>
</table><br>
<b style="font-size:15px">🔹 Kompanzasyon</b><br>
Motorlar, trafolar, balastlar şebekeden <b>endüktif reaktif güç</b> çeker; bu güç iş yapmaz ama hatları ve trafoyu meşgul eder, cosφ'yi düşürür. Dağıtım şirketi belirli oranın üstündeki reaktif tüketime <b>ceza</b> keser (yönetmelikte tipik sınırlar: aktif enerjinin endüktifte %20'si, kapasitifte %15'i; abone grubuna göre değişebilir, güncel tarifeyi kontrol edin). Çözüm: ADP baralarına <b>kademeli kondansatör grupları</b> bağlanır; <b>reaktif güç kontrol rölesi</b> akım trafosundan yükü izler, cosφ'yi hedefe (pratikte 0,95-1,00 endüktif bölge) çekecek kadar kademeyi kontaktörlerle devreye alır/çıkarır. Harmonikli tesislerde kondansatörler filtre reaktörleriyle birlikte kullanılır.<br><br>
<b style="font-size:15px">🔹 Selektivite ve Jeneratör Bağlantısı</b><br>
<b>Selektivite</b>: arıza olduğunda sadece arızaya en yakın koruma elemanının açması, üst kademelerin devrede kalmasıdır. Bunun için kademeler arasında akım ve/veya zaman ayrımı bırakılır (örn. çıkış NH 160 A → ADP girişi ACB 1000 A, ACB'nin kısa gecikme kademesi NH'nin ergime süresinin üstünde). Jeneratörlü tesiste <b>enversör (transfer) şalter veya ATS</b> ADP'nin giriş bölümündedir: şebeke ve jeneratör baraya asla aynı anda bağlanamaz; elektriksel ve mekanik kilitleme zorunludur. ATS şebeke kesilince jeneratöre start verir, gerilim oturunca yükü aktarır; şebeke dönünce geri transfer edip jeneratörü soğutma çalışmasından sonra durdurur.`,

40:`<b style="font-size:15px">🔹 İyi Pano Tasarımı Neden Önemli?</b><br>
Pano, tesisin kalbidir; arızaların büyük kısmı ya kötü bağlantıdan ya kötü yerleşimden çıkar. İyi tasarlanmış panoda enerji akışı gözle takip edilebilir, her elemanın etiketi şemadaki adıyla birebirdir, ısı kontrol altındadır ve bir arızada tekniker dakikalar içinde doğru noktaya iner.<br><br>
<b style="font-size:15px">🔹 Yerleşim Düzeni</b><br>
Enerji akışı mantıklı bir yön izlemelidir: yaygın uygulama <b>giriş şalterinin altta veya üstte</b> olması ve akışın tek yönde (örn. alttan giriş → yukarı bara → çıkışlar) ilerlemesidir; kablo girişi alttan ise ana şalteri alta koymak kablo boyunu kısaltır. <b>Güç devresi ile kumanda devresi ayrılır</b>: güç solda kumanda sağda, ya da ayrı bölme/ayrı pano. Böylece 400 V güç kabloları ile 24 V sinyal kabloları yan yana koşmaz, parazit ve kaza riski düşer. Isı üreten elemanlar (sürücüler, frenleme dirençleri, trafolar) panonun üst-arka bölgesine ve havalandırma çıkışına yakın konur; elektronik (PLC, röleler) ısı kaynağının altına/uzağına yerleşir. <b>Kablo kanalları en fazla ~%70 doldurulur</b>; kalan hacim hem ısı hem de gelecekteki ilaveler içindir. <b>Klemensler işlevine göre gruplanır</b> (güç, dijital giriş, dijital çıkış, analog, besleme) ve analog sinyaller ekranlı kabloyla, güçten ayrı kanaldan taşınır.<br><br>
<b style="font-size:15px">🔹 Form Ayrımı (IEC 61439)</b><br>
Form sınıfı, pano içindeki iç bölmelendirmeyi tanımlar: <b>Form 1</b> hiç bölme yok (tek hacim). <b>Form 2</b> baralar fonksiyonel ünitelerden ayrılmış. <b>Form 3</b> ek olarak fonksiyonel üniteler birbirinden ayrılmış. <b>Form 4</b> bunlara ilave çıkış klemensleri de her ünite için ayrı bölmede. Form büyüdükçe bir bölmede çalışırken diğerleri enerjili ve dokunmaya karşı korumalı kalabilir; hastane, endüstri ana panoları gibi kesintinin kabul edilmediği yerlerde Form 3b/4 istenir.<br><br>
<b style="font-size:15px">🔹 IP Koruma Sınıfı</b><br>
İlk rakam katı cisim/toz, ikinci rakam su korumasıdır. Kuru, temiz iç mekân panoları için <b>IP20-IP31</b> yeterli olabilir; tozlu atölye için <b>IP54</b>; dış ortam ve yıkamalı alanlar için <b>IP54-IP65</b> seçilir. IP arttıkça pano sızdırmazlaşır, bu da ısıyı içeride hapseder: yüksek IP + yüksek kayıp gücü = klima veya ısı eşanjörü ihtiyacı.<br><br>
<b style="font-size:15px">🔹 Isıl Hesap ve Havalandırma</b><br>
Panodaki her cihaz kayıp güç (watt) yayar: sürücü etiketinde yazar (kabaca anma gücünün %2-3'ü), kontaktör bobini + kontaklar birkaç W, sigorta ve klemensler, baralar, güç kaynakları... <b>Tüm kayıp güçler toplanır (Pk)</b>. Pano yüzeyi doğal yolla yaklaşık k×A×ΔT kadar ısı atar (boyalı sac için k ≈ 5,5 W/m²K, A etkin yüzey). Hesaplanan iç sıcaklık, içerideki en hassas cihazın sınırını (çoğu elektronik için 40-50°C) aşıyorsa <b>filtreli fan</b> eklenir; ortam çok tozlu/sıcaksa fan yerine <b>ısı eşanjörü veya pano kliması</b> gerekir. Fan alttan filtreden temiz hava alıp üstten atacak şekilde, çapraz akış oluşturur.<br><br>
<b style="font-size:15px">🔹 Renk, Etiket, Ferrül, Yedek Alan</b><br>
İletken renkleri: L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı; kumandada tipik uygulama 230 VAC kumanda kırmızı, 24 VDC mavi (+ ve - ayrımı), yabancı gerilim turuncudur (projede tanımlanır). <b>Her kablonun iki ucunda ferrül (numara makaronu)</b> bulunur ve bu numara şemadaki hat numarasının aynısıdır; şema-pano birebirliği bozulursa pano "okunamaz" hale gelir. Her cihazın üstünde şemadaki kodu (Q1, K3, F12...) yazan kalıcı etiket olmalıdır. Ray ve kanal yerleşiminde <b>%20-30 yedek alan</b> bırakılır; hiçbir tesis kurulduğu gibi kalmaz. Koruma tarafında <b>selektivite</b> (alt kademe önce açar) ve gerekirse <b>kaskad (back-up) koruma</b> (üstteki kesicinin, alttaki daha düşük kesme kapasiteli şalteri kısa devrede koruması — üretici tablosuyla doğrulanır) planlanır.<br><br>
<b style="font-size:15px">🔹 NE YAPARSAK NE OLUR? — Saha Senaryoları</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Yaparsak</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Ne olur</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Doğrusu</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kablo kanalını %100 doldurursak</td><td style="padding:7px;border:1px solid #dbe4ee">Isı birikir, yalıtım erken yaşlanır, kablo eklemek/arıza izlemek imkansızlaşır</td><td style="padding:7px;border:1px solid #dbe4ee">Max ~%70 doluluk, gerekirse kanal büyüt</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Termiği motor etiket akımından yükseğe ayarlarsak</td><td style="padding:7px;border:1px solid #dbe4ee">Aşırı yükte röle açmaz, sargı yanana kadar motor korumasız çalışır</td><td style="padding:7px;border:1px solid #dbe4ee">Termik = motor etiketindeki In (anma akımı)</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">N ve PE'yi panoda birleştirirsek (TN-S sistemde)</td><td style="padding:7px;border:1px solid #dbe4ee">Yük akımı PE üzerinden döner; kaçak akım röleleri gereksiz açar, gövdelerde gerilim düşümü oluşur, koruma bozulur</td><td style="padding:7px;border:1px solid #dbe4ee">N-PE ayrımı sadece besleme başında (TN-C-S geçiş noktası) yapılır, sonrasında asla birleşmez</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Bara ek yerini gevşek sıkarsak</td><td style="padding:7px;border:1px solid #dbe4ee">Temas direnci → ısı → oksitlenme → daha çok ısı → ark → pano yangını</td><td style="padding:7px;border:1px solid #dbe4ee">Tork anahtarıyla üretici değerinde sık, periyodik termal kamera kontrolü yap</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Havalandırma filtresini tıkalı bırakırsak</td><td style="padding:7px;border:1px solid #dbe4ee">Hava debisi düşer, iç sıcaklık yükselir; sürücüler ısıl arızaya geçer, elektronik ömrü kısalır (her +10°C ömrü kabaca yarılar)</td><td style="padding:7px;border:1px solid #dbe4ee">Filtreyi bakım planına al, tıkanma alarmı/termostat kullan</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Etiketleme ve ferrül yapmazsak</td><td style="padding:7px;border:1px solid #dbe4ee">Arızada kablo izlemek saatler alır, yanlış kabloyu sökme = yeni arıza + kaza riski</td><td style="padding:7px;border:1px solid #dbe4ee">Her uç ferrüllü, her cihaz şema koduyla etiketli, şema pano gözünde güncel kopya</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Farklı kesitleri aynı klemense sıkarsak</td><td style="padding:7px;border:1px solid #dbe4ee">İnce iletken gevşek kalır; temassızlık, kıvılcım, kesik sinyal, ısınma</td><td style="padding:7px;border:1px solid #dbe4ee">Klemens başına uygun tek kesit; çoklu bağlantı için köprü/çift katlı klemens</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Sigortayı bir üst değere koyarsak</td><td style="padding:7px;border:1px solid #dbe4ee">Kablo koruması kalkar; kablo taşıyamayacağı akımda ısınır, yangın riski; selektivite bozulur</td><td style="padding:7px;border:1px solid #dbe4ee">Sigorta kabloyu korur: değer kablo kesitine ve yüke göre seçilir, keyfe göre büyütülmez</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Güç ve analog sinyal kablolarını aynı kanaldan geçirirsek</td><td style="padding:7px;border:1px solid #dbe4ee">Endüksiyonla sinyale parazit biner; ölçümler oynar, sürücüler hatalı referans alır</td><td style="padding:7px;border:1px solid #dbe4ee">Ayrı kanal, analoglar ekranlı kablo, ekran tek noktadan topraklı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yedek alan bırakmazsak</td><td style="padding:7px;border:1px solid #dbe4ee">İlk ilavede pano "yamalı bohça" olur; standart dışı montaj, ısı ve düzen problemi</td><td style="padding:7px;border:1px solid #dbe4ee">Ray ve kanalda %20-30 rezerv, birkaç yedek klemens ve sigorta yuvası</td></tr>
</table>`
});

Object.assign(FOY,{
39:`<b>💊 Hap bilgiler</b><br>
• AG ≤ 1 kV (TR: 0,4 kV / 230 V) — OG 1-36 kV (TR: 34,5 kV) — YG iletim 154/380 kV<br>
• Zincir: Santral → İletim YG → OG dağıtım → Trafo 34,5/0,4 → ADP → yükler<br>
• Hücreler: giriş / çıkış / ölçü / trafo koruma; yük ayırıcılı = sigortalı ucuz çözüm, kesicili = röleli tam koruma<br>
• Kesici: vakum (dağıtımda standart, bakımsız) — SF6 (iyi yalıtkan ama sera gazı)<br>
• Dyn11: primer üçgen, sekonder yıldız + nötr, 30° faz kayması<br>
• Buchholz: yağlı trafoda gaz/ani yağ akışı → alarm/açma<br>
• ADP: ACB giriş → bakır bara (L1 kahverengi, L2 siyah, L3 gri, N mavi, PE yeşil-sarı) → NH çıkışlar<br>
• NH boyları: NH00≤160 A, NH1≤250 A, NH2≤400 A, NH3≤630 A<br>
• Akım trafosu sekonderi yük altında AÇIK BIRAKILMAZ (tehlikeli gerilim!)<br>
• Kompanzasyon hedefi cosφ ≈ 0,95-1,00; ceza sınırları tipik endüktif %20 / kapasitif %15<br>
• ATS/enversör: şebeke + jeneratör asla aynı anda barada olmaz (elektriksel + mekanik kilit)<br><br>
<b>Saha özeti:</b> Trafo merkezine girerken önce hücre dizilimini oku: enerji hangi hücreden girip trafoya nereden gidiyor? ADP'de ana kesiciyi, bara düzenini ve NH çıkış etiketlerini tanı. Kompanzasyon panosunda kontrol rölesinin cosφ ekranına bak: 0,95 altında endüktifte kalıyorsa kademe/kondansatör kontrolü gerekir. OG bölümüne asla yetkisiz girilmez; topraklama ayırıcısı kapatılmadan ve gerilim yokluğu doğrulanmadan çalışma yapılmaz.<br><br>
<b>İşlenmiş örnek — kompanzasyon kademe hesabı:</b><br>
Tesis: P = 100 kW, mevcut cosφ1 = 0,80 → tanφ1 = 0,75. Hedef cosφ2 = 0,95 → tanφ2 = 0,33.<br>
Gerekli kondansatör gücü: Qc = P × (tanφ1 − tanφ2) = 100 × (0,75 − 0,33) = <b>42 kVAr</b>.<br>
Seçim: 45 kVAr'lık grup; kademeler 2×5 + 2×10 + 1×15 kVAr yapılırsa röle küçük yük değişimlerini de ince ayarla karşılar. Akım trafosu ana girişte (ör. 200/5 A) olmalı, sadece kondansatör hattında değil!`,

40:`<b>💊 Hap bilgiler</b><br>
• Akış tek yönlü: giriş şalteri → bara → çıkışlar; güç ve kumanda ayrı bölge<br>
• Kablo kanalı doluluk max ~%70, yedek alan %20-30<br>
• Form 1: bölmesiz — Form 2: bara ayrı — Form 3: üniteler de ayrı — Form 4: klemensler de ayrı<br>
• IP20-31 temiz iç mekân, IP54 tozlu atölye, IP54-65 dış ortam; IP arttıkça ısı içeride kalır<br>
• Isıl hesap: kayıp güçleri (W) topla → yüzeyden atılan ısıyla karşılaştır → gerekirse fan/klima<br>
• Elektronik ömrü: iç sıcaklık her +10°C'de kabaca yarıya iner<br>
• Ferrül iki uçta, numara = şema hat numarası; cihaz etiketi = şema kodu (Q1, K3, F12)<br>
• Termik ayarı = motor etiket akımı; sigorta değeri kabloya göre, asla "atmasın diye" büyütülmez<br>
• N-PE ayrımı panoda korunur (TN-S); birleştirme sadece besleme başında<br>
• Bara/klemens bağlantıları tork anahtarıyla; devreye almada ve periyodik bakımda termal kontrol<br><br>
<b>Saha özeti:</b> Panoya baktığında 30 saniyede şunu görebilmelisin: enerji nereden giriyor, ana şalter hangisi, hangi çıkış neyi besliyor. Göremiyorsan pano kötü tasarlanmış veya etiketler eksik demektir. Devreye almadan önce: bağlantı torkları, ferrül-şema kontrolü, yalıtım ölçümü, koruma ayarları (termik, kaçak akım testi) ve havalandırma yönü kontrol listesinden geçir.<br><br>
<b>İşlenmiş örnek — pano ısı hesabı:</b><br>
Cihaz kayıpları: hız sürücüsü 150 W + kontaktör/röleler 40 W + PLC ve güç kaynağı 30 W + bara/kablo/sigorta kayıpları 30 W → <b>Pk = 250 W</b>.<br>
Pano 2000×800×400 mm, duvara bitişik; etkin ısı atma yüzeyi A ≈ 3,5 m², boyalı sac k ≈ 5,5 W/m²K.<br>
Doğal ısınma: ΔT = Pk / (k × A) = 250 / (5,5 × 3,5) ≈ <b>13 K</b>. Ortam 35°C ise iç sıcaklık ≈ 48°C → sürücünün 45°C sınırı aşılıyor, <b>filtreli fan gerekli</b>.<br>
Fan debisi (ΔT = 10 K hedefiyle, pratik formül): V ≈ 3,1 × Pk / ΔT = 3,1 × 250 / 10 ≈ <b>78 m³/h</b> → 100 m³/h filtreli fan + üstte çıkış filtresi seçilir; fan altta emiş, çıkış üstte olacak şekilde monte edilir.`
});

Object.assign(QBANK,{
39:[
{q:"Türkiye'de en yaygın OG dağıtım gerilimi ve AG değeri hangisidir?", opts:["11 kV / 0,23 kV","34,5 kV / 0,4 kV","66 kV / 0,4 kV","154 kV / 0,4 kV"], ans:1, ex:"Türkiye dağıtım şebekesinde standart OG 34,5 kV, AG ise 0,4 kV (400 V faz arası / 230 V faz-nötr) değeridir. 154 ve 380 kV iletim (YG) seviyeleridir."},
{q:"Trafo etiketindeki 'Dyn11' ifadesinde 'yn' neyi belirtir?", opts:["Primer sargının üçgen bağlı olduğunu","Sekonder sargının yıldız bağlı ve nötrünün dışarı alındığını","Trafonun yağlı tip olduğunu","11 kV çıkış gerilimini"], ans:1, ex:"D = primer üçgen, yn = sekonder yıldız ve nötr ucu dışarı çıkarılmış, 11 = 11×30° = 330° faz kayması (sekonder 30° ileride). Yıldız sekonder sayesinde AG'de nötr elde edilir."},
{q:"Buchholz rölesi ne zaman devreye girer?", opts:["Trafo aşırı yüklendiğinde gerilimi düşürür","Yağlı trafoda iç arıza sonucu gaz oluştuğunda veya ani yağ akışında alarm/açma verir","Kuru tip trafoda sargı sıcaklığını ölçer","Kondansatör kademelerini anahtarlar"], ans:1, ex:"Buchholz, kazan ile genleşme deposu arasındaki boruya takılır. İç arkın ürettiği gaz birikince alarm, ağır arızadaki ani yağ akışında açma kontağı çalışır. Sadece yağlı trafolarda bulunur."},
{q:"NH bıçaklı sigortalarda boy-akım eşleşmesi hangisinde doğrudur?", opts:["NH00 ≤ 630 A","NH1 ≤ 250 A","NH2 ≤ 160 A","NH3 ≤ 100 A"], ans:1, ex:"Tipik sınırlar: NH00 ≤ 160 A, NH1 ≤ 250 A, NH2 ≤ 400 A, NH3 ≤ 630 A. Boy büyüdükçe hem akım hem fiziksel ölçü büyür; altlık ile buşon boyu aynı olmalıdır."},
{q:"Yük ayırıcılı OG hücre ile kesicili hücrenin temel farkı nedir?", opts:["Yük ayırıcı kısa devre akımını kesebilir, kesici kesemez","Kesici kısa devre akımını kesebilir; yük ayırıcı yalnızca yük akımını açar, kısa devreyi seri OG sigortası temizler","İkisi de yalnızca boşta açma yapar","Yük ayırıcı sadece AG'de kullanılır"], ans:1, ex:"Yük ayırıcı anma yük akımını açıp kapatır ama kısa devre kesme kapasitesi yoktur; koruma OG sigortasıyla tamamlanır. Kesici ise röle komutuyla kısa devreyi kendisi keser, büyük trafolarda zorunludur."},
{q:"OG kesicilerde vakum teknolojisinin SF6'ya göre öne çıkan avantajı hangisidir?", opts:["Daha iyi yalıtkan gaz içermesi","Sera gazı içermemesi ve dağıtım seviyesinde bakımsız uzun ömür","Daha yüksek gerilimlere tek kademede çıkabilmesi","Ark oluşturmaması"], ans:1, ex:"SF6 mükemmel yalıtkan ve ark söndürücüdür ama çok güçlü bir sera gazıdır; kaçak takibi ister. Vakum kesici dağıtım gerilimlerinde standarttır: gaz yok, kontak aşınması az, bakım ihtiyacı minimum."},
{q:"AG panosunda iletken tanıma renkleri hangisinde doğru verilmiştir?", opts:["L1 kırmızı, L2 beyaz, L3 mavi, N siyah","L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı","L1 sarı, L2 yeşil, L3 mor, N gri","Hepsi siyah olabilir, renk zorunlu değildir"], ans:1, ex:"Güncel standart (IEC/TSE): fazlar kahverengi-siyah-gri, nötr açık mavi, koruma iletkeni yeşil-sarı. Yeşil-sarı başka hiçbir amaçla kullanılamaz."},
{q:"Kompanzasyonda hedef cosφ ve tipik reaktif ceza mantığı nasıldır?", opts:["Hedef 0,50; endüktif tüketim serbesttir","Hedef 0,95-1,00; aktif enerjiye oranla endüktif ~%20, kapasitif ~%15 sınırı aşılırsa ceza uygulanır","Hedef tam 1,00 kapasitif; kondansatör ne kadar çok o kadar iyi","Ceza yalnızca kapasitif tüketime kesilir"], ans:1, ex:"Reaktif güç kontrol rölesi cosφ'yi 0,95-1,00 endüktif bandında tutacak şekilde kademe anahtarlar. Aşırı kondansatör de cezalıdır (kapasitif sınır); 'ne kadar çok o kadar iyi' yanlıştır. Oranlar tarifeye göre güncellenir."},
{q:"Selektivite ne demektir?", opts:["Tüm kesicilerin aynı anda açması","Arızada yalnızca arızaya en yakın koruma elemanının açması, üst kademelerin beslemede kalması","En büyük sigortanın her zaman önce atması","Kaçak akım rölesinin termikten önce ayarlanması"], ans:1, ex:"Selektivite akım ve zaman kademelendirmesiyle sağlanır: çıkıştaki NH veya şalter, giriş ACB'sinden önce açmalıdır. Böylece tek arıza tüm tesisi karartmaz."},
{q:"ATS/enversör bağlantısında en kritik kural hangisidir?", opts:["Jeneratörün sürekli çalışır durumda beklemesi","Şebeke ile jeneratörün baraya asla aynı anda bağlanmaması (elektriksel + mekanik kilitleme)","Transferin daima yük altında elle yapılması","Nötr hattının transfer edilmemesi her sistemde yasaktır"], ans:1, ex:"İki kaynak aynı anda baraya girerse faz farkı nedeniyle çok büyük dengeleme akımları akar; jeneratör ve pano hasar görür, şebekeye geri besleme can güvenliğini tehdit eder. Bu yüzden çift kilitleme zorunludur."},
{q:"Akım trafosunun sekonder devresi yük altında neden açık bırakılmaz?", opts:["Sayaç sıfırlanacağı için","Açık sekonderde tehlikeli derecede yüksek gerilim indüklenir ve trafo aşırı doyuma gider","Sigortası atacağı için","Primer akım kesileceği için"], ans:1, ex:"Akım trafosu akım kaynağı gibi davranır: sekonder açılırsa tüm amper-sarım çekirdeği doyurur, uçlarda kV mertebesinde tepe gerilimler oluşur. Devre kesilecekse önce sekonder kısa devre edilir."}
],
40:[
{q:"Pano içindeki kablo kanalları en fazla ne kadar doldurulmalıdır?", opts:["%100 — boş hacim israftır","Yaklaşık %70","%10","%50'nin altı yasaktır"], ans:1, ex:"~%70 üstü dolulukta ısı atılamaz, yalıtım erken yaşlanır ve kablo ekleme/izleme imkansızlaşır. Kalan %30 hem havalandırma hem gelecekteki ilaveler içindir."},
{q:"IEC 61439'a göre 'Form 4' ayrımı ne anlama gelir?", opts:["Pano 4 kapılıdır","Baralar, fonksiyonel üniteler VE çıkış klemensleri birbirinden ayrı bölmelerdedir","Yalnızca baralar kapatılmıştır","Pano 4 mm sacdan yapılmıştır"], ans:1, ex:"Form 1 bölmesiz tek hacimdir; Form 2'de baralar, Form 3'te ek olarak üniteler, Form 4'te klemensler de ayrılır. Yüksek form, bir bölmede çalışırken diğerlerinin enerjili ve korumalı kalmasını sağlar."},
{q:"IP54 kodunda rakamlar neyi ifade eder?", opts:["5: darbe dayanımı, 4: kapı sayısı","5: toz korumalı, 4: her yönden su sıçramasına dayanıklı","5: 5 bar basınç, 4: 4 metre derinlik","5: gerilim sınıfı, 4: akım sınıfı"], ans:1, ex:"İlk rakam katı cisim/toz (5 = toz korumalı, 6 = toz geçirmez), ikinci rakam su (4 = sıçrama, 5 = tazyiksiz jet, 65+ dış ortam/yıkama). IP arttıkça pano sızdırmazlaşır ve iç ısı yönetimi zorlaşır."},
{q:"Pano ısıl hesabının ilk adımı nedir?", opts:["Fan kataloğundan en büyük fanı seçmek","İçerideki tüm cihazların kayıp güçlerini (W) toplamak","Pano rengini beyaz seçmek","Kapıya termometre takmak"], ans:1, ex:"Önce toplam kayıp güç Pk bulunur (sürücü, trafo, kontaktör, bara, güç kaynağı...). Sonra panonun doğal olarak atabileceği ısı (k×A×ΔT) ile karşılaştırılır; açık kalan fark fan, eşanjör veya klimayla karşılanır."},
{q:"TN-S sistemde N ve PE panoda birleştirilirse ne olur?", opts:["Hiçbir şey olmaz, ikisi zaten aynı potansiyeldedir","Yük akımının bir kısmı PE'den döner; kaçak akım röleleri gereksiz açar ve koruma düzeni bozulur","Sigortalar daha hızlı atar, bu iyidir","Kompanzasyon devre dışı kalır"], ans:1, ex:"TN-S'nin amacı PE'nin normalde akımsız kalmasıdır. Birleştirme yapılırsa nötr akımı PE ve gövdeler üzerinden paylaşılır: RCD'ler dengesizliği kaçak sanıp açar, gövdelerde gerilim düşümü oluşur. N-PE bağlantısı yalnızca besleme başındadır."},
{q:"Motor termik rölesi hangi değere ayarlanır?", opts:["Motor etiket akımının 2 katına, gereksiz atmasın diye","Motor etiketindeki anma akımına (In)","Sigorta değeriyle aynı değere","Mümkün olan en düşük değere"], ans:1, ex:"Termik, motoru aşırı yüke karşı korur; referansı motorun etiket akımıdır. Yükseğe ayarlanırsa motor sargısı yanana kadar açmaz; çok düşüğe ayarlanırsa normal çalışmada gereksiz durdurur."},
{q:"Bara ek yerinin gevşek sıkılmasının tipik sonuç zinciri hangisidir?", opts:["Gerilim yükselir → sigorta atar","Temas direnci artar → ısınma → oksitlenme → ark → pano yangını","Akım düşer → motorlar yavaşlar","Kaçak akım rölesi devreye girer"], ans:1, ex:"Gevşek bağlantı milyohmluk ek direnç yaratır; I²R ısısı yüzeyi oksitler, direnç daha da artar ve kısır döngü arkla bitebilir. Çözüm: tork anahtarıyla montaj + termal kamerayla periyodik tarama."},
{q:"Ferrül (uç numaralandırma) uygulamasının temel kuralı nedir?", opts:["Sadece güç kablolarına takılır","Her kablonun iki ucuna, şemadaki hat numarasıyla birebir aynı numara takılır","Numara yerine renk yeterlidir","Yalnızca devreye almada geçici takılır"], ans:1, ex:"Şema-pano birebirliği ferrülle sağlanır: şemada 105 numaralı hat, panoda iki ucunda da 105 yazan kablodur. Bu birebirlik bozulursa arıza takibi saatler alır ve yanlış müdahale riski doğar."},
{q:"Farklı kesitteki iki iletkeni aynı klemens ağzına sıkarsak ne olur?", opts:["Daha sağlam bağlantı elde edilir","Kalın iletken sıkılır, ince olan gevşek kalır; temassızlık, ısınma ve kesik sinyal oluşur","Akım ikiye bölünür, sorun olmaz","Klemens otomatik olarak ikisini de kavrar"], ans:1, ex:"Klemens çenesi tek kesite göre kapanır; ince iletken boşta kalır. Çoklu bağlantı gerekiyorsa köprü barlı, çift katlı veya çift ağızlı klemens kullanılır."},
{q:"Sürekli atan bir sigortayı 'bir üst değere' koymak neden yanlıştır?", opts:["Üst değer daha pahalıdır","Sigorta kabloyu korur; büyütülürse kablo taşıyamayacağı akımda ısınır, yangın riski doğar ve selektivite bozulur","Sigorta yuvasına sığmaz","Sayaç fazla yazar"], ans:1, ex:"Sigorta değeri kablo kesitine ve yüke göre hesaplanır. Atmanın sebebi (aşırı yük, kaçak, gevşek bağlantı) bulunmalıdır; değeri büyütmek sadece koruyucuyu susturur, tehlikeyi büyütür."}
]
});

Object.assign(DIAG,{
39:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#141d26"/><text x="220" y="16" fill="#8a98ab" font-size="10" text-anchor="middle" font-family="monospace">TEK HAT: OG HÜCRELER → TRAFO → ADP</text><rect x="12" y="30" width="150" height="60" fill="#20303f" stroke="#8a98ab"/><text x="87" y="43" fill="#33b1ff" font-size="9" text-anchor="middle" font-family="monospace">OG 34,5 kV HÜCRELER</text><rect x="20" y="50" width="40" height="32" fill="#141d26" stroke="#8a98ab"/><text x="40" y="69" fill="#8a98ab" font-size="8" text-anchor="middle" font-family="monospace">GİRİŞ</text><rect x="66" y="50" width="40" height="32" fill="#141d26" stroke="#8a98ab"/><text x="86" y="69" fill="#8a98ab" font-size="8" text-anchor="middle" font-family="monospace">ÖLÇÜ</text><rect x="112" y="50" width="44" height="32" fill="#141d26" stroke="#ffb000"/><text x="134" y="64" fill="#ffb000" font-size="7" text-anchor="middle" font-family="monospace">TR KORUMA</text><text x="134" y="74" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace">kesici</text><line x1="162" y1="66" x2="196" y2="66" stroke="#33b1ff" stroke-width="2"/><circle cx="212" cy="58" r="12" fill="none" stroke="#3fb950" stroke-width="2"/><circle cx="212" cy="72" r="12" fill="none" stroke="#3fb950" stroke-width="2"/><text x="212" y="102" fill="#3fb950" font-size="8" text-anchor="middle" font-family="monospace">TRAFO 34,5/0,4</text><text x="212" y="112" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace">Dyn11</text><line x1="228" y1="66" x2="258" y2="66" stroke="#33b1ff" stroke-width="2"/><rect x="258" y="34" width="170" height="120" fill="#20303f" stroke="#8a98ab"/><text x="343" y="47" fill="#33b1ff" font-size="9" text-anchor="middle" font-family="monospace">ADP 0,4 kV</text><rect x="268" y="54" width="42" height="22" fill="#141d26" stroke="#f85149"/><text x="289" y="68" fill="#f85149" font-size="8" text-anchor="middle" font-family="monospace">ACB</text><line x1="310" y1="65" x2="330" y2="65" stroke="#ffb000" stroke-width="3"/><line x1="330" y1="52" x2="330" y2="140" stroke="#ffb000" stroke-width="3"/><text x="342" y="58" fill="#ffb000" font-size="7" font-family="monospace">BARA</text><line x1="330" y1="80" x2="352" y2="80" stroke="#8a98ab" stroke-width="2"/><rect x="352" y="72" width="36" height="16" fill="#141d26" stroke="#8a98ab"/><text x="370" y="83" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace">NH ÇIKIŞ</text><line x1="330" y1="104" x2="352" y2="104" stroke="#8a98ab" stroke-width="2"/><rect x="352" y="96" width="36" height="16" fill="#141d26" stroke="#3fb950"/><text x="370" y="107" fill="#3fb950" font-size="7" text-anchor="middle" font-family="monospace">KOMP.</text><line x1="330" y1="128" x2="352" y2="128" stroke="#8a98ab" stroke-width="2"/><rect x="352" y="120" width="36" height="16" fill="#141d26" stroke="#33b1ff"/><text x="370" y="131" fill="#33b1ff" font-size="7" text-anchor="middle" font-family="monospace">ATS/JEN</text><text x="87" y="180" fill="#8a98ab" font-size="8" font-family="monospace">Şebeke: 154/380 kV iletimden</text><text x="268" y="168" fill="#8a98ab" font-size="7" font-family="monospace">CT + sayaç, cosφ hedef 0,95</text></svg>`,
40:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#141d26"/><text x="220" y="16" fill="#8a98ab" font-size="10" text-anchor="middle" font-family="monospace">PANO YERLEŞİM KROKİSİ (Form 2, IP54)</text><rect x="30" y="26" width="270" height="160" fill="#20303f" stroke="#8a98ab" stroke-width="2"/><rect x="40" y="34" width="120" height="20" fill="#141d26" stroke="#f85149"/><text x="100" y="47" fill="#f85149" font-size="8" text-anchor="middle" font-family="monospace">BARA BÖLMESİ L1 L2 L3</text><rect x="40" y="60" width="120" height="36" fill="#141d26" stroke="#ffb000"/><text x="100" y="75" fill="#ffb000" font-size="8" text-anchor="middle" font-family="monospace">GÜÇ: sürücü + kontaktör</text><text x="100" y="88" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace">ısı kaynağı üstte</text><rect x="40" y="102" width="120" height="30" fill="#141d26" stroke="#33b1ff"/><text x="100" y="115" fill="#33b1ff" font-size="8" text-anchor="middle" font-family="monospace">KUMANDA: PLC + röle</text><text x="100" y="126" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace">24 VDC bölge</text><rect x="40" y="138" width="120" height="18" fill="#141d26" stroke="#3fb950"/><text x="100" y="150" fill="#3fb950" font-size="8" text-anchor="middle" font-family="monospace">KLEMENS GRUPLARI</text><rect x="170" y="34" width="26" height="122" fill="#141d26" stroke="#8a98ab" stroke-dasharray="4 3"/><text x="183" y="100" fill="#8a98ab" font-size="7" text-anchor="middle" font-family="monospace" transform="rotate(-90 183 100)">KANAL max %70</text><rect x="206" y="34" width="84" height="122" fill="#141d26" stroke="#8a98ab" stroke-dasharray="4 3"/><text x="248" y="90" fill="#8a98ab" font-size="8" text-anchor="middle" font-family="monospace">YEDEK ALAN</text><text x="248" y="102" fill="#3fb950" font-size="8" text-anchor="middle" font-family="monospace">%20-30</text><rect x="40" y="162" width="250" height="16" fill="#141d26" stroke="#f85149"/><text x="165" y="173" fill="#f85149" font-size="8" text-anchor="middle" font-family="monospace">ANA ŞALTER + ALT KABLO GİRİŞİ</text><rect x="316" y="40" width="14" height="26" fill="#141d26" stroke="#3fb950"/><text x="360" y="52" fill="#3fb950" font-size="7" font-family="monospace">çıkış filtresi</text><rect x="316" y="140" width="14" height="26" fill="#141d26" stroke="#33b1ff"/><text x="360" y="152" fill="#33b1ff" font-size="7" font-family="monospace">filtreli fan</text><line x1="323" y1="138" x2="323" y2="70" stroke="#33b1ff" stroke-width="1" stroke-dasharray="3 3"/><polygon points="319,72 327,72 323,64" fill="#33b1ff"/><text x="336" y="100" fill="#8a98ab" font-size="7" font-family="monospace">hava akışı</text><text x="336" y="110" fill="#8a98ab" font-size="7" font-family="monospace">alttan üste</text><text x="336" y="186" fill="#8a98ab" font-size="7" font-family="monospace">ferrül + etiket = şema</text></svg>`
});

/* ===== EK v8: Saha Senaryoları + Altın Kurallar (41-42) ===== */
MODS.push({id:41, t:"Saha Senaryoları & Arıza Avcılığı", cat:"oto", ic:"🔧", d:"Gerçek vakalar: belirti→teşhis→çözüm."});
MODS.push({id:42, t:"Olmazsa Olmazlar: Altın Kurallar", cat:"oto", ic:"🛡️", d:"5 altın kural, kesin yasaklar, son kontrol listesi."});

Object.assign(TEORI,{
41:`<b style="font-size:15px">🔹 Arıza Avcılığının Mantığı: Tahmin Etme, Ölç</b><br><br>
Usta olmakla eskici olmak arasındaki fark şudur: Eskici parça değiştirir, usta arıza bulur. Sahada otuz yılda öğrendiğim en önemli ders şu — <b>arıza asla rastgele değildir; her belirtinin arkasında bir fizik vardır.</b> Belirtiyi doğru okur, doğru noktadan ölçersen arıza saklanacak yer bulamaz. Yöntemimiz hep aynı: <b>Belirti → Olası nedenler (ihtimal sırasına göre) → Ölçerek eleme → Çözüm → Kalıcı önlem.</b> Ve her ölçümden önce altın söz: <b>Enerjili devrede ölçüm yapıyorsan yalıtkan eldiven, kategori uyumlu (CAT III/IV) ölçü aleti ve sağlam prob şart. Direnç ve izolasyon ölçümleri ise MUTLAKA enerjisiz devrede yapılır.</b><br><br>

<b style="font-size:15px">🔹 Vaka 1 — Kaçak Akım Rölesi (KAR) Sürekli Atıyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">30 mA KAR bazen hemen, bazen saatler sonra atıyor. Kurunca duruyor, sonra yine atıyor.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) Bir cihazda toprak kaçağı (ısıtıcı rezistansı, çamaşır makinesi, eski buzdolabı) 2) Nemli ortamda izolasyon zayıflaması (banyo, bahçe hattı, buat içine su) 3) <b>Ortak nötr hatası:</b> KAR sonrası bir devrenin nötrü başka bir KAR'ın nötrüyle veya ana nötrle birleştirilmiş 4) Toplam süzülme kaçağının doğal olarak 15-20 mA'ya dayanması (çok cihazlı tesis) 5) Rölenin kendisinin arızası.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) Tüm cihaz fişlerini çek, KAR'ı kur; yine atıyorsa arıza sabit tesisatta. 2) <b>Enerjiyi kes, kestiğini doğrula</b>, sonra sigortaları ve nötr klemenslerini tek tek ayırıp her devreyi <b>megger (izolasyon test cihazı) ile 500 V DC'de ölç:</b> L-PE ve N-PE arası. 1 MΩ altı şüpheli, 0,5 MΩ altı kesin sorun. 3) Değerler iyiyse ortak nötrü ara: KAR açıkken çıkış nötrü ile ana nötr arasında süreklilik ölç — süreklilik varsa nötrler karışmış demektir. 4) Cihaz kaçağı için: fişleri tek tek tak, kaçak akım pensi ile (faz+nötr birlikte kelepçelenir) hangi cihazda mA sıçradığını izle. 5) Röle şüphesi için test butonu ve KAR test cihazıyla açma akımı/süresi ölçülür.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Kaçaklı cihaz onarılır/değişir; nemli buat kurutulup contalı IP'li malzeme ile yenilenir; karışmış nötrler ait oldukları KAR'a ayrılır; kaçak toplamı yüksekse devreler ayrı 30 mA KAR'lara bölünür.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Her ıslak hacme ayrı KAR; nötrleri panoda etiketle; yılda bir KAR test butonuna bas; megger ölçümünü periyodik bakıma yaz.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 2 — Üç Fazlı Motor Kalkmıyor / Homurduyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">Motor start alınca uğultuyla homurduyor, dönmüyor veya çok yavaş dönüyor, kısa sürede ısınıyor; ya da hiç tepki yok.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Faz kaybı</b> (sigorta bir fazda atmış, gevşek klemens, kopuk iletken) — homurtunun bir numaralı sebebi 2) Kontaktör ana kontağı yanmış/oksitlenmiş (bir kutup iletmiyor) 3) Termik röle atmış veya yanlış (düşük) ayarlanmış 4) Yıldız-üçgen zaman rölesi/yıldız kontaktörü arızası (üçgene geçemiyor, yıldızda kalıp zorlanıyor) 5) Mekanik sıkışma (rulman, yük) 6) Sargı arızası.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Önce STOP'a bas, homurdayan motoru beklemede tutma — sargı dakikalar içinde yanar.</b> 2) Pano girişinde voltmetre ile üç faz arası ölç: L1-L2, L1-L3, L2-L3 hepsi ~400 V olmalı; biri düşükse/sıfırsa faz kaybı, sigortadan geriye doğru izle. 3) Giriş sağlamsa kontaktörü çektirip (güvenli test düzeninde) çıkış uçlarında üç fazı ölç; bir kutupta gerilim yoksa kontak yanık. Enerjisiz halde kontak direncini ohmmetre ile doğrula. 4) Termik rölenin atık göstergesine bak; atmışsa <b>nedenini bulmadan resetleyip bırakma</b> — pens ampermetre ile üç faz akımını ayrı ayrı ölç, etiket akımıyla kıyasla, dengesizlik %10'u geçmesin. 5) Yıldız-üçgende: zaman rölesinin geçiş yaptığını, üçgen kontaktörünün çektiğini gözle ve ölçerek doğrula. 6) Enerjisiz: sargı dirençlerini ölç (U-V-W üçü birbirine yakın olmalı), megger ile sargı-gövde izolasyonuna bak. Mili elle çevirip mekanik sıkışmayı kontrol et.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Atık sigorta/kopuk hat onarılır; yanık kontaktör kontağı takım halinde (tek kutup değil) değişir; termik motor etiket akımına göre ayarlanır; arızalı zaman rölesi yenilenir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Faz koruma rölesi (faz sırası/faz kaybı) tak; klemens tork kontrolünü bakım planına al; kontaktörü motor gücüne uygun AC-3 sınıfında seç.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 3 — Sigorta Belirli Aralıklarla Atıyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">B16 otomat günde birkaç kez, genelde belli saatlerde atıyor. Kurulunca bir süre sorunsuz.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Kritik ayrım</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Anında, şak diye atıyorsa → kısa devre veya büyük kaçak</b> (manyetik açma). <b>Dakikalar sonra atıyorsa → aşırı yük</b> (termik açma). Bu ayrım teşhisin yarısıdır.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) Devreye sonradan eklenen yüklerle toplam akımın otomat değerini aşması 2) Belirli bir cihazın kalkış akımı (kompresör, motor) 3) Gevşek bağlantının otomat klemensini ısıtıp termik açmayı erken tetiklemesi 4) Aralıklı (kesikli) kısa devre — ezilmiş kablo, titreşimle temas eden iletken 5) Yaşlanmış/değersiz otomat.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Pens ampermetreyi</b> devre fazına kelepçele, yük açıkken izle; mümkünse min/max veya kayıt (inrush) fonksiyonu kullan. B16 için sürekli akım 16 A'ya dayanıyorsa sebep aşırı yük. 2) Atma anını yakalayamıyorsan cihazları sırayla devreden alıp hangisiyle akımın düştüğüne bak. 3) Otomat gövdesine elinin sırtıyla dokun (yalnızca kapağı kapalı, yalıtılmış gövdeye): aşırı ısınma gevşek klemens işaretidir — <b>enerjiyi kesip</b> klemensleri kontrol et, yanık izine bak. 4) Kesikli kısa devre şüphesinde enerjisiz halde megger ile hat izolasyonunu ölç, kabloyu hareket ettirerek değişimi izle. 5) Hiçbiri çıkmazsa otomatı aynı karakter ve değerde yenisiyle dene.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Aşırı yükte çözüm otomatı büyütmek DEĞİL, yükü bölmek veya hattı kesitiyle birlikte yenilemektir. <b>Otomat kabloyu korur; kablo 2,5 mm² ise 16 A üstüne çıkılmaz.</b> Kalkış akımı sorununda B yerine C karakter (kablo kesiti ve kısa devre şartları uygunsa) düşünülür.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Devre yük listesi çıkar ve panoya as; yeni yük eklenirken hesap yap; yıllık termal tarama ve tork kontrolü.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 4 — Prizde Gerilim Var Ama Cihaz Çalışmıyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">Kontrol kalemi prizde yanıyor, hatta bazen her iki delikte de yanıyor; ama cihaz çalışmıyor.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Nötr kopuğu</b> (buatta veya priz klemensinde) — faz cihaz üzerinden nötr hattına yansıdığı için kontrol kalemi iki tarafta da yanar, bu klasik tuzaktır 2) Gevşek klemens (temassızlık, yük altında ark) 3) Priz yaylarının gevşemesi 4) Cihazın kendi arızası.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Kontrol kalemine güvenme; iki problu voltmetre kullan.</b> Faz-Nötr ölç: 0 V veya kararsız ise ve Faz-PE ~230 V ise nötr kopuk demektir. 2) Cihazı başka prizde dene (cihazı aklamak için). 3) <b>Enerjiyi kes, doğrula</b>, priz kapağını aç: yanık, kararma, gevşek vida ara. Sağlamsa geriye doğru buatları aç, nötr eklerini kontrol et. 4) Süreklilik testi: enerjisiz hatta priz nötrü ile pano nötr barası arası ohmmetre ile ölçülür.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Kopuk/gevşek ek uygun klemensle (bant sarması değil!) yenilenir, yanmış priz komple değişir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Buat eklerinde burgu+bant yerine vidalı/yaylı klemens kullan; yüksek akımlı prizlerde (kombi, fırın) yıllık klemens kontrolü.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 5 — Aydınlatma Titreşiyor, LED'ler Yanıp Sönüyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">Lambalar ara ara parlayıp sönükleşiyor; LED'ler kapalıyken bile hafif kırpışıyor; bazı dairelerde ampuller sık patlıyor.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Nötr zayıflığı/kopmaya yüz tutmuş nötr</b> (üç fazlı tesiste yıldız noktası kayar: bir fazın gerilimi 260 V'a çıkarken diğeri 190 V'a düşer — ampul patlatan senaryo budur ve ACİLDİR) 2) Şebeke gerilim dalgalanması (büyük yüklerin kalkışı, trafo bölgesi sorunu) 3) LED driver/floresan balast arızası veya kalitesiz driver 4) Anahtardan geçirilmiş nötr ya da pilotlu anahtarın kaçak akımı (kapalıyken kırpışma) 5) Gevşek duy/klemens.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) Ana panoda üç fazın faz-nötr gerilimlerini aynı anda/peş peşe ölç: biri yüksek biri düşükse <b>nötr sorunu — derhal ana kesiciyi aç, hassas cihazları koru, nötr hattını enerjisiz kontrol et.</b> 2) Gerilimler dengeli ama oynuyorsa min/max kayıtlı multimetre veya enerji analizörü bağla, dalgalanma saatlerini not et; sorun şebekedeyse dağıtım şirketine kayıt aç. 3) Tek armatürse driver/balastı sağlamıyla değiştirerek dene. 4) Kapalıyken kırpışan LED'de anahtarın fazı mı nötrü mü kestiğini kontrol et — anahtar daima FAZI kesmelidir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Zayıf nötr eki yenilenir (kesiti faz kadar olmalı); kalitesiz driver markalı ve uyumlu olanla değişir; nötrden geçirilmiş anahtar düzeltilir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Nötr bağlantılarını da faz kadar ciddiye al; kritik tesislere gerilim koruma rölesi (aşırı/düşük gerilim kesici) tak.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 6 — Pano Aşırı Isınıyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">Pano kapağı sıcak, içeriden plastik/vernik kokusu geliyor, bazı klemenslerde renk atması var.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Gevşek bara/klemens bağlantısı</b> (temas direnci → noktasal ısı; pano yangınlarının bir numaralı sebebi) 2) Fazlar arası dengesiz yük dağılımı (bir faz aşırı yüklü) 3) Kapasitesinin üstünde yüklenmiş şalter/kablo 4) Havalandırma yetersizliği, tıkalı filtre 5) Harmonik yükler nedeniyle nötr iletkeninin aşırı ısınması.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>Termal kamera</b> ile yük altında tara: sağlıklı bağlantılar arasında 10-15°C üstü sıcak nokta = gevşek temas. Kamera yoksa <b>elinin SIRTINI</b> yaklaştırarak (asla dokunma, asla avuç içi — refleksle kavrarsın) ısı farkını hisset; bu yalnızca kapalı/yalıtılmış yüzeylerde yapılır, açık baralara el yaklaştırılmaz. 2) Pens ampermetre ile L1-L2-L3 ve N akımlarını ölç; fazlar arasında belirgin fark varsa yük dağılımı bozuk. Nötr akımı fazlara yakın/yüksekse harmonik şüphesi. 3) <b>Enerjiyi kesip, kestiğini doğrulayıp</b> tüm bara ve klemens vidalarını tork anahtarıyla üretici değerinde kontrol et; renk atmış, sertleşmiş izoleli iletkenlerin uçlarını kes-yenile.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Gevşek bağlantılar torklanır, yanmış klemens ve bara parçaları değişir; yükler fazlara dengeli dağıtılır; gerekirse havalandırma fanı/filtre eklenir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Yılda bir yük altında termal tarama; devreye almadan ve her bakımda tork kontrolü; pano yük etiketini güncel tut.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Vaka 7 — Jeneratör Çalışıyor Ama Tesis Beslenmiyor</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Belirti</b></td><td style="padding:7px;border:1px solid #dbe4ee">Şebeke kesilince jeneratör start alıp çalışıyor, motor sesi normal; ama tesis karanlıkta — yük jeneratöre aktarılmıyor.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Olası nedenler (sıralı)</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) <b>ATS (otomatik transfer) arızası:</b> transfer kontaktörü/motorlu şalter jeneratör tarafına geçmiyor (bobin arızası, sıkışmış mekanizma, kontrol rölesi) 2) <b>Enversör mekanik/elektriksel kilidi</b> takılı kalmış veya şebeke kontaktörü yapışık — kilit haklı olarak jeneratör kontaktörünün çekmesine izin vermiyor 3) Jeneratör çıkış kesicisi atmış/kapatılmamış 4) Kontrol kartı jeneratör gerilim/frekansını uygun görmüyor (gerilim düşük, frekans oturmamış) 5) Manuel-otomatik seçici anahtarın MANUEL veya OFF konumunda unutulması 6) Transfer kumanda sigortasının atık olması.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Adım adım teşhis</b></td><td style="padding:7px;border:1px solid #dbe4ee">1) Kontrol paneli alarm/konum LED'lerini oku (çoğu vaka burada çözülür: seçici OFF'ta!). 2) Jeneratör çıkış klemenslerinde gerilim ve frekansı ölç: ~400 V / 50 Hz oturmuş mu? Değilse sorun jeneratör regülasyonunda. 3) Çıkış sağlamsa ATS girişinde jeneratör gerilimini ölç; var ama çıkışta yoksa arıza transfer düzeneğinde. 4) Jeneratör kontaktör bobinine kumanda geriliminin gelip gelmediğini ölç: geliyorsa ama çekmiyorsa bobin/mekanizma arızası; gelmiyorsa kontrol rölesi, kilit kontağı veya kumanda sigortasını izle. 5) Şebeke kontaktörünün gerçekten bıraktığını gözle doğrula — yapışıksa elektriksel kilit jeneratör tarafını bilerek engelliyordur. <b>UYARI: ATS içinde İKİ ayrı kaynak vardır; şebeke tarafı klemensler jeneratör çalışırken de, jeneratör tarafı şebeke varken de enerjili olabilir. Kilitleri asla iptal ederek köprüleme yapma — ters besleme hem tesisi hem hattaki görevliyi öldürür.</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Çözüm</b></td><td style="padding:7px;border:1px solid #dbe4ee">Arızalı bobin/röle değişir, yapışık kontaktör yenilenir, mekanik kilit ayarı yapılır, seçici anahtar OTO'ya alınır; kart parametreleri (gerilim/frekans penceresi, geçiş gecikmeleri) kontrol edilir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee;background:#f0f4f8"><b>Bir daha yaşanmasın</b></td><td style="padding:7px;border:1px solid #dbe4ee">Ayda bir yükte transfer testi yap ve kaydet; akü ve kumanda sigortalarını bakım listesine al; ATS şemasını pano kapağının içine yapıştır.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Usta Sözü</b><br><br>
Arıza avcılığında acele eden iki kere gider: bir kere arızaya, bir kere hastaneye. <b>Ölçmeden karar verme, doğrulamadan dokunma, nedenini bulmadan resetleyip gitme.</b> Termik neden attı, KAR neden düştü, sigorta neden gitti — bunlar tesisatın sana yazdığı mektuplardır; okumazsan bir dahaki mektup yangın olur.`,

42:`<b style="font-size:15px">🔹 Bu Modül Neden Var?</b><br><br>
Elektrik affetmez; ama kurallara uyanı da yormaz. Bu modüldeki her madde, birilerinin canı yanarak öğrenildi. <b>Ezberlemeyeceksin, içselleştireceksin.</b> Sahada seni koruyacak olan tesisatın sağlamlığı değil, senin disiplinindir. Çünkü tesisat yalan söyler: "enerjisiz" görünen hat enerjili çıkar, "kimse açmaz" dediğin şalteri biri açar.<br><br>

<b style="font-size:15px">🔹 5 Altın Güvenlik Kuralı (Sırası Bozulmaz)</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f4f8"><td style="padding:7px;border:1px solid #dbe4ee"><b>#</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Kural</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Nasıl uygulanır</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>1</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>AÇ (tüm kaynaklardan ayır)</b></td><td style="padding:7px;border:1px solid #dbe4ee">Çalışılacak bölümü BÜTÜN besleme kaynaklarından ayır: şebeke, jeneratör, UPS, güneş inverteri, kompanzasyon kondansatörleri. Görünür ayırma aralığı olan cihaz (ayırıcı, çekilen sigorta buşonu) tercih edilir. Unutma: bir hattın iki ucu olabilir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>2</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>KİLİTLE & ETİKETLE (LOTO)</b></td><td style="padding:7px;border:1px solid #dbe4ee">Açtığın şalteri asma kilitle kilitle, anahtar CEBİNDE kalsın; üzerine "ÇALIŞMA VAR — AÇMAYINIZ" etiketi as (kim, ne iş, telefon). Kilitlenemiyorsa buşonları söküp yanına al, panoya nöbetçi koy. Birden çok ekip varsa herkes KENDİ kilidini takar (çoklu kilit mandalı).</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>3</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>YOKLA (gerilim yokluğunu doğrula)</b></td><td style="padding:7px;border:1px solid #dbe4ee">İki kademeli doğrulama: <b>(a)</b> Ölçü aletini BİLİNEN canlı bir kaynakta test et — çalışıyor mu? <b>(b)</b> Çalışma yerinde TÜM iletkenler arasında ve toprağa karşı ölç (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, hepsi-PE). <b>(c)</b> Aleti tekrar bilinen kaynakta doğrula. Ölmüş pilli dedektör "0 V" gösterir — bu üçlü sıra o yüzden vardır. Kontrol kalemi tek başına delil DEĞİLDİR.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>4</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>TOPRAKLA & KISA DEVRE ET</b></td><td style="padding:7px;border:1px solid #dbe4ee">Özellikle YG'de ve uzun/çift beslemeli AG hatlarında zorunlu: önce topraklama ucunu toprağa, sonra faz uçlarına bağla (sökerken ters sıra). Bu, yanlışlıkla enerjilenme, indüklenme ve kondansatör boşalmasına karşı son kaledir. Topraklama teçhizatı beklenen kısa devre akımına dayanacak kesitte olmalı.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>5</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>ÖRT & PERDELE</b></td><td style="padding:7px;border:1px solid #dbe4ee">Çalışma bölgesine komşu enerjili kısımları yalıtkan örtü, paravan veya bariyerle kapat; çalışma alanını şeritle sınırla. Yanındaki canlı baraya dirseğinle değen adam, kendi devresini kapatmış olmanın tesellisini yaşayamaz.</td></tr>
</table><br>

<b style="font-size:15px">🔹 KESİN YASAKLAR — Pazarlığı Yok</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f4f8"><td style="padding:7px;border:1px solid #dbe4ee"><b>Yasak</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Neden</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yük altında AYIRICI açmak</td><td style="padding:7px;border:1px solid #dbe4ee">Ayırıcının ark söndürme düzeni yoktur; yük altında açarsan ark patlaması yüzüne gelir. Önce kesici ile yükü kes, sonra ayırıcıyı aç.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Sigortayı telle/folyoyla köprülemek</td><td style="padding:7px;border:1px solid #dbe4ee">Korumasız kalan hat, kısa devrede kablo yangını ve patlama demektir. "Geçici" köprü diye bir şey yoktur; her köprü kalıcıdır.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">PE'yi (koruma iletkeni) devre iletkeni/nötr olarak kullanmak</td><td style="padding:7px;border:1px solid #dbe4ee">PE üzerinden yük akımı akarsa tüm cihaz gövdeleri gerilim altında kalır; PE koptuğu an her metal kasa öldürücü olur.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Islak elle, ıslak/iletken zeminde çalışmak</td><td style="padding:7px;border:1px solid #dbe4ee">Vücut direnci onlarca kat düşer; 50 V bile öldürebilir. Yalıtkan paspas/tabure kullan, teri ve yağmuru ciddiye al.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Etiketli/kilitli devreyi habersiz enerjilemek</td><td style="padding:7px;border:1px solid #dbe4ee">O etiketin ucunda hatta çalışan bir insan var. Etiketi yalnız asan kişi (veya yetkili iş sorumlusu) kaldırır — başkası ASLA.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Gerilim ölçülecek devrede aleti akım/ohm kademesinde bırakmak</td><td style="padding:7px;border:1px solid #dbe4ee">Amper kademesinde gerilim ölçmek aleti patlatır (kısa devre). Her ölçümden önce kademe ve prob soketini kontrol et.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Enerjili tesiste metal cetvel, çelik şerit metre, kolye-yüzük-saat</td><td style="padding:7px;border:1px solid #dbe4ee">İletken takı hem köprü kurar hem kısa devre arkında eriyip ete yapışır. Panoya girerken çıkar.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Tek başına yüksek riskli çalışma (YG, canlı çalışma, kapalı hacim)</td><td style="padding:7px;border:1px solid #dbe4ee">Çarpılırsan seni kim kurtaracak? Gözcü olmadan canlıya yaklaşma.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Enerji Vermeden Önce SON KONTROL — 10 Madde</b><br><br>
<b>1)</b> Hatta çalışan KİMSE kalmadı mı — tüm ekipten sözlü teyit aldın mı?<br>
<b>2)</b> Tüm aletler, geçici topraklamalar ve kısa devre düzenekleri söküldü mü?<br>
<b>3)</b> Kapaklar, bariyerler, klemens kapakları yerine takıldı mı?<br>
<b>4)</b> Bağlantı noktaları uygun torkta sıkıldı mı, boşta uç kalmadı mı?<br>
<b>5)</b> İzolasyon ölçümü yapıldı mı — değerler sınırın üstünde mi?<br>
<b>6)</b> Faz sırası ve L-N-PE bağlantı doğruluğu kontrol edildi mi (motorda dönüş yönü!)?<br>
<b>7)</b> Koruma elemanları (otomat, KAR, termik ayarı) doğru değerde ve konumda mı?<br>
<b>8)</b> Kilitler ve etiketler yalnızca SAHİPLERİ tarafından kaldırıldı mı?<br>
<b>9)</b> Enerjilenecek bölgedeki herkes bilgilendirildi mi, kimse temas mesafesinde mi?<br>
<b>10)</b> Enerji verme kademeli mi planlandı (önce ana, sonra kollar) ve ilk yüklemede ölçüm/gözlem yapacak mısın?<br><br>

<b style="font-size:15px">🔹 Elektrik Çarpmasında İlk Yardım — Sıra Hayat Kurtarır</b><br><br>
<b>1) KAYNAĞI KES:</b> Şalteri indir, fişi çek. Kesemiyorsan kazazedeyi KURU yalıtkan cisimle (tahta sopa, plastik boru) kaynaktan ayır. YG'de yaklaşma — mesafeni koru, yetkiliye kestir.<br>
<b>2) ÇIPLAK ELLE DOKUNMA:</b> Enerji kesilmeden dokunan, ikinci kazazede olur.<br>
<b>3) 112'Yİ ARA:</b> Yer, durum, bilinç bilgisi ver. Kazazede "iyiyim" dese bile aramaktan vazgeçme — elektrik çarpmasında ritim bozukluğu saatler sonra gelebilir, hastane kontrolü şart.<br>
<b>4) DEĞERLENDİR & CPR:</b> Bilinç ve solunum kontrolü; solunum yoksa göğüs basısına başla (dakikada 100-120, 5-6 cm derinlik, 30 bası / 2 solunum), varsa OED (defibrilatör) getirt ve sesli komutlarına uy. Yardım gelene ya da kazazede kendine gelene kadar devam.<br>
<b>5)</b> Bilinçli kazazedeyi sırtüstü yatır, sıcak tut, yanıkları soğuk suyla soğut ama yapışan giysiyi koparma; yüksekten düşme varsa boynunu oynatma.<br><br>

<b style="font-size:15px">🔹 Kişisel Koruyucu Donanım (KKD) ve Sınıflar</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f4f8"><td style="padding:7px;border:1px solid #dbe4ee"><b>KKD</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Sınıf / Not</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yalıtkan eldiven (EN 60903)</td><td style="padding:7px;border:1px solid #dbe4ee">Sınıf 00: 500 V — Sınıf 0: 1000 V — Sınıf 1: 7,5 kV — Sınıf 2: 17 kV — Sınıf 3: 26,5 kV — Sınıf 4: 36 kV (maks. kullanma gerilimi). Her kullanımdan önce şişirerek delik kontrolü; 6 ayda bir periyodik test; üzerine mekanik koruyucu (deri) eldiven giyilir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Ark yüz siperi / ark kıyafeti</td><td style="padding:7px;border:1px solid #dbe4ee">Ark parlaması (arc flash) riskli pano işlerinde cal/cm² değerine göre seçilir; sentetik iç giysi YASAK (eriyip yapışır), pamuk veya aleve dayanıklı kumaş giyilir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yalıtkan baret, iş ayakkabısı, paspas, ıstanka</td><td style="padding:7px;border:1px solid #dbe4ee">Baret EN 397/EN 50365; ayakkabı yalıtkan tabanlı; YG manevralarında yalıtkan halı + ıstanka + eldiven birlikte kullanılır.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Ölçü aletleri</td><td style="padding:7px;border:1px solid #dbe4ee">Pano ve dağıtımda EN AZ CAT III (bina girişi/sayaç civarı CAT IV) sınıfı multimetre/pens; probları hasarsız, uçları korumalı olmalı.</td></tr>
</table><br>

<b style="font-size:15px">🔹 İş İzni (Çalışma İzni) Mantığı ve "Üç Kere Kontrol" Kültürü</b><br><br>
İş izni bir kâğıt işi değil, bir <b>sorumluluk zinciridir:</b> İşi veren (tesis yetkilisi) bölgeyi ayırdığını yazıyla beyan eder, işi yapan (çalışma sorumlusu) güvenlik önlemlerini kurduğunu imzalar; iş bitince izin KAPATILMADAN enerji verilmez. Böylece "ben kestim sanıyordum" cümlesi tarihe karışır. Kim açtı, kim kapatacak, hangi şalter, hangi saat — hepsi kayıt altındadır.<br><br>
<b>Üç kere kontrol</b> ustalık kültürüdür: <b>Bir</b> — yapmadan önce planı kontrol et (doğru devre mi, doğru şalter mi?). <b>İki</b> — yaparken kontrol et (ölçtün mü, doğruladın mı?). <b>Üç</b> — bitirdikten sonra kontrol et (tork, kapak, etiket, ölçüm). Acemi bir kere bakar, usta üç kere bakar; o yüzden usta yaşlanır, acemi yaşlanamaz.<br><br>

<b style="font-size:15px">🔹 En Sık 8 Ölümcül Hata → Nasıl Önlenir</b><br><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr style="background:#f0f4f8"><td style="padding:7px;border:1px solid #dbe4ee"><b>Ölümcül hata</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>Önleme</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">"Enerjisizdir" varsayımıyla dokunmak</td><td style="padding:7px;border:1px solid #dbe4ee">Üç adımlı yoklama (test et-ölç-tekrar test et) olmadan hiçbir iletken ölü sayılmaz.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kilitsiz-etiketsiz çalışmak</td><td style="padding:7px;border:1px solid #dbe4ee">LOTO şart; kilidin anahtarı cebinde, etiket şalterin üstünde.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Başkasının kestiğine güvenmek</td><td style="padding:7px;border:1px solid #dbe4ee">Kendi gözünle gör, kendi aletinle ölç; güven iyi, doğrulama daha iyidir.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kondansatör/UPS/güneş gibi ikincil kaynakları unutmak</td><td style="padding:7px;border:1px solid #dbe4ee">Tek hat şemasından TÜM kaynakları listele; kondansatörleri boşalt ve boşaldığını ölç.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yanlış kademede/kategoride ölçüm</td><td style="padding:7px;border:1px solid #dbe4ee">Ölçümden önce kademe-prob-kategori kontrolü; şüpheliysen ölçme, sor.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Aceleyle son kontrolü atlamak</td><td style="padding:7px;border:1px solid #dbe4ee">10 maddelik listeyi fiziken işaretle; acele işe şeytan değil, elektrik karışır.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Uygun olmayan KKD (delik eldiven, sentetik mont)</td><td style="padding:7px;border:1px solid #dbe4ee">KKD'yi işe göre seç, kullanmadan önce gözle-test et, süresi geçeni imha et.</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Yorgun, dalgın, öfkeli çalışmak</td><td style="padding:7px;border:1px solid #dbe4ee">Kafan yerinde değilse panoya girme; elektrikte ikinci şans yoktur, mola hakkın vardır.</td></tr>
</table><br>

<b style="font-size:15px">🔹 Usta Sözü</b><br><br>
Bu meslekte kahramanlık, hızlı iş bitirmek değil; akşam evine iki elinle, iki gözünle dönmektir. Kurallar seni yavaşlatmak için değil, yaşlandırmak için var. <b>Aç, kilitle, yokla, toprakla, perdele — sonra çalış.</b> Gerisi teferruattır.`
});

Object.assign(FOY,{
41:`<b>💊 Hap bilgiler</b><br>
• Homurdayan 3 fazlı motor = %90 faz kaybı → önce STOP, sonra üç fazı ölç.<br>
• KAR atıyor + tüm fişler çekiliyken de atıyorsa → arıza sabit tesisatta; megger ile devre devre ele.<br>
• Kontrol kalemi iki delikte de yanıyorsa → klasik NÖTR KOPUĞU tuzağı; voltmetreyle L-N ölç.<br>
• Sigorta ŞAK diye atarsa kısa devre, DAKİKALAR sonra atarsa aşırı yük.<br>
• Bir faz 260 V, diğeri 190 V → ana nötr kopuyor; DERHAL kes, cihazları kurtar.<br>
• Panoda sıcak nokta = gevşek klemens; termal kamera veya el SIRTI (dokunmadan!).<br>
• Jeneratör çalışıyor, tesis karanlık → önce seçici anahtar (OTO'da mı?), sonra ATS.<br>
• Termik/KAR/sigorta NEDENİNİ bulmadan resetlenmez.<br><br>
<b>🔧 Cepte arıza akışı</b><br>
BELİRTİ gözle → GÜVENLİK (kes-kilitle-yokla; canlı ölçüm gerekiyorsa KKD+CAT III) → ÖLÇ (V: var/yok-dengeli mi? → A: pens ile yük normal mi? → Ω/Megger: enerjisiz iken süreklilik-izolasyon) → DARALT (devreyi böl: pano→hat→buat→cihaz; yarıya bölerek ilerle) → ONAR → DOĞRULA (ölçerek) → KAYDET (ne buldun, ne yaptın) → ÖNLEM yaz.<br><br>
<b>📏 Ölçüm hatırlatıcıları</b><br>
• Megger yalnız ENERJİSİZ devrede; elektronik cihazları (driver, kart) ayırarak.<br>
• Kaçak pensinde faz+nötr BİRLİKTE kelepçelenir; tek iletken kelepçelenirse yük akımı okursun.<br>
• Ohm kademesiyle canlı devreye girme — alet gider.`,

42:`<b>💊 Hap bilgiler</b><br>
• 5 Altın Kural (sıra bozulmaz): AÇ → KİLİTLE-ETİKETLE → YOKLA → TOPRAKLA-KISA DEVRE → ÖRT-PERDELE.<br>
• Yoklama üçlemesi: aleti canlıda TEST et → çalışma yerinde ÖLÇ → aleti tekrar TEST et.<br>
• Etiketi yalnız ASAN kaldırır. Kilidin anahtarı CEBİNDE.<br>
• Ayırıcı yük altında AÇILMAZ; sigorta telle KÖPRÜLENMEZ; PE'den yük akıtılmaz.<br>
• Eldiven sınıfları: 00=500V, 0=1000V, 1=7,5kV, 2=17kV, 3=26,5kV, 4=36kV.<br>
• Çarpılan "iyiyim" dese de 112 + hastane; ritim bozukluğu gecikmeli gelir.<br>
• Pano işinde CAT III alet, panoya girerken saat-yüzük-kolye çıkar.<br>
• Kafan dağınıksa panoya girme — elektrikte ikinci şans yok.<br><br>
<b>⚡ Çarpılma anında sıra</b><br>
KAYNAĞI KES → DOKUNMA (kuru yalıtkanla ayır) → 112 → solunum yoksa CPR (100-120/dk, 30:2) + OED → hastaneye sevk.<br><br>
<b>✅ Enerji öncesi 10 madde (kısa)</b><br>
1 Hatta kimse yok (teyitli) · 2 Alet/geçici topraklama söküldü · 3 Kapak-bariyer tamam · 4 Torklar sıkıldı · 5 İzolasyon ölçüldü · 6 Faz sırası/L-N-PE doğru · 7 Korumalar doğru değerde · 8 Kilit-etiket sahiplerince kalktı · 9 Herkes bilgilendirildi · 10 Kademeli enerji + ilk yük gözlemi.`
});

Object.assign(QBANK,{
41:[
{q:"30 mA kaçak akım rölesi, tesisteki TÜM cihaz fişleri çekilmişken bile atmaya devam ediyor. En doğru sonraki adım hangisidir?",opts:["Röleyi 300 mA'lık ile değiştirmek","Enerjiyi kesip devreleri ayırarak megger ile L-PE ve N-PE izolasyonunu devre devre ölçmek","Röleyi köprüleyip tesisi izlemek","Ana sigortayı büyütmek"],ans:1,ex:"Fişler çekiliyken atma sürüyorsa kaçak sabit tesisattadır. Doğru yöntem: enerjisiz devrede, sigorta ve nötrleri ayırarak her devrenin izolasyonunu megger ile ölçüp kaçaklı hattı bulmak. Röleyi büyütmek veya köprülemek can güvenliğini yok eder."},
{q:"Üç fazlı motor start alınca homurduyor, dönmüyor ve hızla ısınıyor. İlk yapılacak iş ve ilk bakılacak yer?",opts:["Termiği resetleyip tekrar start vermek","Motoru söküp sargı ölçmek","STOP'a basıp motor besleme uçlarında üç fazın da var olup olmadığını ölçmek","Kondansatör eklemek"],ans:2,ex:"Homurtu tipik faz kaybı belirtisidir. İki fazda kalan motor kalkamaz ve sargısı dakikalar içinde yanar; bu yüzden önce durdurulur, sonra voltmetreyle üç faz kontrol edilir. Sargı sökümü en son adımdır."},
{q:"Termik röle atmış. Ustaca yaklaşım hangisidir?",opts:["Resetleyip çalıştırmak, yine atarsa ayarını yükseltmek","Termiği iptal edip motoru direkt beslemek","Pens ampermetre ile üç faz akımını ayrı ayrı ölçüp etiket değeriyle ve birbirleriyle kıyasladıktan sonra nedeni gidermek","Termiği bir üst değere değiştirmek"],ans:2,ex:"Termik bir habercidir: aşırı yük, faz kaybı veya dengesizlik olabilir. Neden bulunmadan reset veya ayar yükseltme, motoru yakmanın kibar yoludur. Fazlar arası akım dengesizliği %10'u geçmemelidir."},
{q:"B16 otomat, elektrikli ısıtıcı ve kettle aynı anda çalışınca 5-10 dakika sonra atıyor; anında atmıyor. Arızanın karakteri nedir?",opts:["Kısa devre (manyetik açma)","Aşırı yük (termik açma)","Kaçak akım","Otomat arızası"],ans:1,ex:"Gecikmeli atma, bimetalin ısınmasıyla oluşan TERMİK açmadır ve aşırı yükü gösterir. Anında (şak diye) atma manyetik açmadır ve kısa devreyi düşündürür. Çözüm otomatı büyütmek değil, yükü bölmektir — otomat kabloyu korur."},
{q:"Prizde kontrol kalemi HER İKİ delikte de yanıyor, cihaz çalışmıyor. En olası arıza?",opts:["Faz kopuğu","Çift faz gelmesi","Nötr kopuğu — faz, cihaz üzerinden nötr hattına yansıyor","Topraklama kopuğu"],ans:2,ex:"Nötr koptuğunda faz, prize takılı cihazın direnci üzerinden nötr ucuna kadar uzanır; kontrol kalemi iki tarafta da yanar. Bu yüzden kontrol kalemine güvenilmez — iki problu voltmetre ile L-N ölçülür (0 V veya kararsız çıkar)."},
{q:"Bir binada bazı lambalar aşırı parlak yanıp ampuller patlıyor, bazıları sönük yanıyor. Bu tablo neyin acil işaretidir?",opts:["Kompanzasyon arızası","Ana nötr iletkeninin kopması/zayıflaması (yıldız noktası kayması)","Trafo yağ eksikliği","Sayaç arızası"],ans:1,ex:"Üç fazlı sistemde nötr zayıflarsa yıldız noktası kayar: az yüklü fazın gerilimi 260 V'a tırmanır (ampul patlar), çok yüklü faz 190 V'a düşer (sönük yanar). Cihazları kurtarmak için derhal enerji kesilmeli, nötr hattı onarılmalıdır."},
{q:"Pano termal taramasında bir klemens komşularından 25°C daha sıcak görünüyor. En olası neden ve doğru müdahale?",opts:["Normaldir; klemensler ısınır","Gevşek bağlantı; enerji kesilip doğrulandıktan sonra klemens tork anahtarıyla sıkılır, yanık uç varsa yenilenir","Kablo rengi koyu olduğu için sıcak görünür","Hemen soğutucu sprey sıkılır"],ans:1,ex:"Noktasal ısı artışı temas direncinin, yani gevşek bağlantının imzasıdır ve pano yangınlarının başlıca sebebidir. Müdahale mutlaka enerjisiz yapılır; el ile kontrol gerekiyorsa yalnızca kapalı yüzeylere elin SIRTI ile, dokunmadan yaklaşılır."},
{q:"Şebeke kesildi, jeneratör start alıp normal çalışıyor ama tesis beslenmiyor. İlk kontrol edilecek şey hangisidir?",opts:["Jeneratör yakıt filtresi","ATS/kontrol paneli: seçici anahtar konumu (OTO mu?) ve alarm göstergeleri","Tesisin tüm sigortaları","Motor yağ seviyesi"],ans:1,ex:"Motor çalışıyorsa mekanik taraf görevini yapıyordur; sorun transfer tarafındadır. Vakaların önemli kısmı MANUEL/OFF'ta unutulmuş seçici anahtar veya ATS alarmıdır. Sonra jeneratör çıkış gerilimi/frekansı ve transfer kontaktör kumandası ölçülür."},
{q:"ATS panosunda şebeke kontaktörü yapışmış, jeneratör kontaktörü kilit yüzünden çekmiyor. Kilidi iptal edip köprülemek neden ölümcül hatadır?",opts:["Jeneratör yakıtı çabuk biter","İki kaynak çakışır; ters besleme hem tesisi yakar hem şebekede çalışan görevliyi öldürebilir","Kontaktör bobini ısınır","Sayaç ters döner"],ans:1,ex:"Enversör kilidi iki kaynağın aynı anda bağlanmasını önler. Köprülenirse jeneratör şebekeye ters besleme yapar: kesinti sanıp hatta çalışan ekipler enerjiyle karşılaşır, kaynak çakışması patlamaya yol açar. Çözüm yapışık kontaktörün değişimidir, kilidin iptali değil."},
{q:"Kaçak akım pensi ile bir cihazın kaçağını ölçerken kelepçeden hangi iletkenler geçirilmelidir?",opts:["Yalnız faz","Yalnız nötr","Faz ve nötr birlikte (PE hariç)","Faz, nötr ve PE birlikte"],ans:2,ex:"Faz ve nötr birlikte kelepçelenince giden-dönen akımlar birbirini siler; fark (yani toprağa kaçan mA) okunur. Tek iletken kelepçelenirse yük akımı okunur, PE de dahil edilirse kaçak akım da silinip ölçülemez."}
],
42:[
{q:"5 Altın Güvenlik Kuralının doğru sırası hangisidir?",opts:["Yokla → Aç → Toprakla → Kilitle → Ört","Aç → Kilitle/Etiketle → Yokla → Toprakla/Kısa devre et → Ört/Perdele","Aç → Yokla → Kilitle → Ört → Toprakla","Kilitle → Aç → Toprakla → Yokla → Ört"],ans:1,ex:"Sıra mantık zinciridir: önce tüm kaynaklardan ayırırsın, sonra kimse geri kapatamasın diye kilitler-etiketlersin, gerilim yokluğunu ölçerek doğrularsın, yanlış enerjilenmeye karşı topraklar-kısa devre edersin, en son komşu canlı kısımları perdelersin. Sıra bozulursa zincir kopar."},
{q:"Gerilim yokluğu doğrulamasında ölçü aleti önce ve sonra bilinen canlı bir kaynakta neden test edilir?",opts:["Aleti kalibre etmek için","Pili bitmiş veya arızalı bir alet '0 V' göstererek canlı hattı ölü gösterebilir; test bu ölümcül yanılgıyı önler","Prosedür öyle yazdığı için","Garanti şartı olduğu için"],ans:1,ex:"Arızalı dedektör her yerde 0 gösterir. Ölçümden ÖNCE canlıda test → çalışıyor; çalışma yerinde ölç → 0 V; SONRA tekrar canlıda test → alet hâlâ sağlam, demek ki 0 V gerçek. Üçlü sıranın her halkası hayatidir."},
{q:"Yük altındaki bir hattı ayırıcı (seksiyoner) ile açmak neden yasaktır?",opts:["Ayırıcı kontakları paslanır","Ayırıcının ark söndürme düzeneği yoktur; yük akımı kesilirken oluşan ark patlamaya ve ağır yanıklara yol açar","Sigortalar atar","Gerilim yükselir"],ans:1,ex:"Kesici ark söndürme hücrelerine sahiptir, ayırıcı değildir. Doğru manevra sırası: önce KESİCİ ile yükü kes, sonra AYIRICI ile görünür ayırma sağla. Kapatırken sıra terstir: önce ayırıcı, sonra kesici."},
{q:"PE (koruma iletkeni) neden asla nötr veya devre iletkeni olarak kullanılamaz?",opts:["Rengi farklı olduğu için karışıklık olur","Kesiti genelde küçüktür","PE'den yük akımı akarsa tüm cihaz gövdeleri gerilim altında kalır; PE koptuğu an her metal kasa öldürücü olur","Sayaç yük akımını ölçemez"],ans:2,ex:"PE'nin tek görevi arıza akımını taşımak ve gövdeleri toprak potansiyelinde tutmaktır. Üzerinden sürekli yük akıtılırsa gövdelerde gerilim düşümü oluşur; kopması halinde ise koruma tamamen kaybolur ve gövdeler faza kalır."},
{q:"Panoda LOTO uygulandı. Etiket ve kilidi kim kaldırabilir?",opts:["İşletme müdürü","O anda panonun başındaki herhangi bir elektrikçi","Yalnızca etiketi/kilidi asan kişi (o yoksa tanımlı yetkili prosedürle)","Vardiya amiri her durumda"],ans:2,ex:"Kilit-etiket, hatta çalışanın can sigortasıdır. Ancak asan kişi işin bittiğini bilebilir; başkası kaldırırsa hatta hâlâ çalışan biri enerji altında kalır. İstisnalar bile yazılı, teyitli özel prosedüre bağlıdır."},
{q:"Elektrik çarpması gören kişi kaynaktan ayrıldı, bilinci açık ve 'iyiyim' diyor. Doğru davranış?",opts:["Su içirip işe devam ettirmek","Yine de 112'yi aramak ve hastane kontrolüne göndermek; ritim bozukluğu saatler sonra ortaya çıkabilir","Yarım saat dinlendirip göndermek","Sadece yanık varsa hastaneye götürmek"],ans:1,ex:"Akım kalpten geçtiyse gecikmeli aritmi ve içsel doku hasarı riski vardır; kişi kendini iyi hissetse bile EKG ve gözlem gerekir. 'İyiyim' sözü tıbbi değerlendirmenin yerini tutmaz."},
{q:"Bilinçsiz ve solunumu olmayan çarpılma kazazedesinde CPR nasıl uygulanır?",opts:["Dakikada 60 bası, 15:2","Dakikada 100-120 bası, 5-6 cm derinlik, 30 bası / 2 solunum; varsa OED getirtilir","Sadece suni solunum yapılır","Önce su serpilir, uyanmazsa CPR"],ans:1,ex:"Güncel temel yaşam desteği: göğüs merkezine dakikada 100-120 tempoda, 5-6 cm çökertecek bası; 30 basıya 2 solunum. OED (otomatik defibrilatör) elektrik çarpmasındaki ventriküler fibrilasyonda hayat kurtarır — gelir gelmez bağlanır."},
{q:"400 V'luk bir panoda canlı yakın çalışma için EN AZ hangi sınıf yalıtkan eldiven uygundur?",opts:["Sınıf 00 (500 V)","Sınıf 2 (17 kV) şart","Sınıf 0 (1000 V) uygundur; Sınıf 00 (500 V) da gerilim olarak karşılar ama AG panoda yaygın tercih Sınıf 0'dır","Deri montaj eldiveni yeterlidir"],ans:2,ex:"EN 60903: Sınıf 00=500 V, Sınıf 0=1000 V, 1=7,5 kV, 2=17 kV, 3=26,5 kV, 4=36 kV. 400 V pano için Sınıf 0 standart tercihtir; eldiven her kullanım öncesi şişirilerek kontrol edilir ve üzerine mekanik koruyucu eldiven giyilir. Deri eldiven yalıtkan DEĞİLDİR."},
{q:"Enerji vermeden önceki son kontrolde aşağıdakilerden hangisi ATLANIRSA en tipik 'unutulan topraklama' kazası yaşanır?",opts:["Faz sırası kontrolü","Geçici topraklama ve kısa devre düzeneklerinin söküldüğünün doğrulanması","Kapakların takılması","Yük listesinin güncellenmesi"],ans:1,ex:"Geçici topraklama unutulup enerji verilirse doğrudan kısa devre oluşur: ark patlaması, şalter hasarı, yaralanma. Bu yüzden takılan her topraklama numaralanır, kayda geçer ve sökülmeden enerji izni kapatılmaz."},
{q:"Panoda ölçüme başlamadan önce multimetrede kontrol edilmesi gereken en kritik iki şey nedir?",opts:["Ekran ışığı ve pil yüzdesi","Kademe (V mi, A/Ω mı?) ve probların doğru sokette/sağlam olması + aletin CAT III/IV uygunluğu","Marka ve model yılı","Kılıfının rengi"],ans:1,ex:"Amper veya ohm kademesinde gerilim ölçmeye kalkmak aleti kısa devreye sokar; düşük kategorili (CAT II) alet pano enerjisinde ark patlamasına dayanamaz. Kademe-prob-kategori üçlüsü her ölçümün ön şartıdır."}
]
});

Object.assign(DIAG,{
41:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#16212b" rx="8"/><text x="220" y="20" fill="#33b1ff" font-size="12" text-anchor="middle" font-weight="bold">ARIZA TEŞHİS AKIŞI</text><rect x="12" y="38" width="88" height="40" fill="#20303f" stroke="#8a98ab" rx="6"/><text x="56" y="55" fill="#33b1ff" font-size="10" text-anchor="middle" font-weight="bold">BELİRTİ</text><text x="56" y="69" fill="#8a98ab" font-size="8" text-anchor="middle">gözle / dinle / kokla</text><path d="M100 58 L124 58" stroke="#8a98ab" stroke-width="1.5" marker-end="none"/><polygon points="124,58 117,54 117,62" fill="#8a98ab"/><rect x="126" y="38" width="88" height="40" fill="#20303f" stroke="#ffb000" rx="6"/><text x="170" y="55" fill="#ffb000" font-size="10" text-anchor="middle" font-weight="bold">GÜVENLİK</text><text x="170" y="69" fill="#8a98ab" font-size="8" text-anchor="middle">kes · kilitle · yokla</text><path d="M214 58 L238 58" stroke="#8a98ab" stroke-width="1.5"/><polygon points="238,58 231,54 231,62" fill="#8a98ab"/><rect x="240" y="38" width="88" height="40" fill="#20303f" stroke="#33b1ff" rx="6"/><text x="284" y="55" fill="#33b1ff" font-size="10" text-anchor="middle" font-weight="bold">ÖLÇ</text><text x="284" y="69" fill="#8a98ab" font-size="8" text-anchor="middle">V → A → Ω / Megger</text><path d="M328 58 L352 58" stroke="#8a98ab" stroke-width="1.5"/><polygon points="352,58 345,54 345,62" fill="#8a98ab"/><rect x="354" y="38" width="74" height="40" fill="#20303f" stroke="#8a98ab" rx="6"/><text x="391" y="55" fill="#f0f4f8" font-size="10" text-anchor="middle" font-weight="bold">KARAR</text><text x="391" y="69" fill="#8a98ab" font-size="8" text-anchor="middle">daralt / böl</text><path d="M391 78 L391 102" stroke="#8a98ab" stroke-width="1.5"/><polygon points="391,102 387,95 395,95" fill="#8a98ab"/><rect x="240" y="104" width="188" height="36" fill="#20303f" stroke="#3fb950" rx="6"/><text x="334" y="119" fill="#3fb950" font-size="10" text-anchor="middle" font-weight="bold">ONAR + ÖLÇEREK DOĞRULA</text><text x="334" y="132" fill="#8a98ab" font-size="8" text-anchor="middle">nedeni gider, sonucu kanıtla</text><path d="M238 122 L214 122" stroke="#8a98ab" stroke-width="1.5"/><polygon points="214,122 221,118 221,126" fill="#8a98ab"/><rect x="12" y="104" width="200" height="36" fill="#20303f" stroke="#8a98ab" rx="6"/><text x="112" y="119" fill="#f0f4f8" font-size="10" text-anchor="middle" font-weight="bold">KAYDET + KALICI ÖNLEM</text><text x="112" y="132" fill="#8a98ab" font-size="8" text-anchor="middle">bir daha yaşanmasın</text><rect x="12" y="154" width="416" height="34" fill="#20303f" stroke="#f85149" rx="6"/><text x="220" y="169" fill="#f85149" font-size="9" text-anchor="middle" font-weight="bold">KURAL: Ölçmeden karar verme · Doğrulamadan dokunma · Nedeni bulmadan resetleme</text><text x="220" y="182" fill="#8a98ab" font-size="8" text-anchor="middle">Direnç ve izolasyon ölçümü daima enerjisiz devrede yapılır</text></svg>`,
42:`<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="440" height="200" fill="#16212b" rx="8"/><text x="220" y="20" fill="#3fb950" font-size="12" text-anchor="middle" font-weight="bold">5 ALTIN GÜVENLİK KURALI ZİNCİRİ</text><rect x="10" y="40" width="76" height="52" fill="#20303f" stroke="#33b1ff" rx="6"/><text x="48" y="58" fill="#33b1ff" font-size="13" text-anchor="middle" font-weight="bold">1</text><text x="48" y="72" fill="#f0f4f8" font-size="9" text-anchor="middle" font-weight="bold">AÇ</text><text x="48" y="84" fill="#8a98ab" font-size="7" text-anchor="middle">tüm kaynaklar</text><path d="M86 66 L96 66" stroke="#8a98ab" stroke-width="1.5"/><polygon points="98,66 92,62 92,70" fill="#8a98ab"/><rect x="99" y="40" width="76" height="52" fill="#20303f" stroke="#ffb000" rx="6"/><text x="137" y="58" fill="#ffb000" font-size="13" text-anchor="middle" font-weight="bold">2</text><text x="137" y="72" fill="#f0f4f8" font-size="9" text-anchor="middle" font-weight="bold">KİLİTLE</text><text x="137" y="84" fill="#8a98ab" font-size="7" text-anchor="middle">+ etiketle (LOTO)</text><path d="M175 66 L185 66" stroke="#8a98ab" stroke-width="1.5"/><polygon points="187,66 181,62 181,70" fill="#8a98ab"/><rect x="188" y="40" width="76" height="52" fill="#20303f" stroke="#f85149" rx="6"/><text x="226" y="58" fill="#f85149" font-size="13" text-anchor="middle" font-weight="bold">3</text><text x="226" y="72" fill="#f0f4f8" font-size="9" text-anchor="middle" font-weight="bold">YOKLA</text><text x="226" y="84" fill="#8a98ab" font-size="7" text-anchor="middle">test-ölç-test</text><path d="M264 66 L274 66" stroke="#8a98ab" stroke-width="1.5"/><polygon points="276,66 270,62 270,70" fill="#8a98ab"/><rect x="277" y="40" width="76" height="52" fill="#20303f" stroke="#3fb950" rx="6"/><text x="315" y="58" fill="#3fb950" font-size="13" text-anchor="middle" font-weight="bold">4</text><text x="315" y="72" fill="#f0f4f8" font-size="9" text-anchor="middle" font-weight="bold">TOPRAKLA</text><text x="315" y="84" fill="#8a98ab" font-size="7" text-anchor="middle">+ kısa devre et</text><path d="M353 66 L363 66" stroke="#8a98ab" stroke-width="1.5"/><polygon points="365,66 359,62 359,70" fill="#8a98ab"/><rect x="366" y="40" width="64" height="52" fill="#20303f" stroke="#33b1ff" rx="6"/><text x="398" y="58" fill="#33b1ff" font-size="13" text-anchor="middle" font-weight="bold">5</text><text x="398" y="72" fill="#f0f4f8" font-size="9" text-anchor="middle" font-weight="bold">ÖRT</text><text x="398" y="84" fill="#8a98ab" font-size="7" text-anchor="middle">perdele</text><rect x="10" y="106" width="206" height="38" fill="#20303f" stroke="#ffb000" rx="6"/><text x="113" y="121" fill="#ffb000" font-size="9" text-anchor="middle" font-weight="bold">YOKLAMA ÜÇLEMESİ</text><text x="113" y="135" fill="#8a98ab" font-size="8" text-anchor="middle">canlıda test → yerinde ölç → tekrar test</text><rect x="224" y="106" width="206" height="38" fill="#20303f" stroke="#f85149" rx="6"/><text x="327" y="121" fill="#f85149" font-size="9" text-anchor="middle" font-weight="bold">ETİKET KURALI</text><text x="327" y="135" fill="#8a98ab" font-size="8" text-anchor="middle">yalnız asan kaldırır · anahtar cebinde</text><rect x="10" y="154" width="420" height="34" fill="#20303f" stroke="#3fb950" rx="6"/><text x="220" y="169" fill="#3fb950" font-size="9" text-anchor="middle" font-weight="bold">SIRA BOZULMAZ: 1→2→3→4→5 · sonra çalış</text><text x="220" y="182" fill="#8a98ab" font-size="8" text-anchor="middle">Çarpılmada: kaynağı kes → dokunma → 112 → CPR (30:2, 100-120/dk)</text></svg>`
});

/* ===== EK v8: SAHA ÖNCESİ YETİŞTİRME PROGRAMI + oto kategorisi ===== */
CATS.oto={n:"Otomasyon & Saha Ustalığı",c:"#0ea5b7"};

const PROGRAM=[
 {ic:"⚡", t:"Aşama 1 · Elektriğin Dili", hedef:"V, A, W, Ω kavramlarını su benzetmesiyle otur; Ohm kanunu ve devre mantığını çözünce gerisi kolay.", mods:[36,1,12,13,14]},
 {ic:"🛡️", t:"Aşama 2 · Güvenlik & Ölçüm", hedef:"Önce hayatta kal: 5 altın kural, gerilim yokluğu doğrulama, ölçü aletlerini doğru kullanma.", mods:[42,4,17,29]},
 {ic:"🔌", t:"Aşama 3 · Kablo & Saha Uygulama", hedef:"Kesit seç, ek yap, bağlantı standartlarına uy; sayaçtan panoya gerçek bağlantı kur.", mods:[3,2,16,15,35,22]},
 {ic:"🎛️", t:"Aşama 4 · Pano & Otomasyon", hedef:"Pano içindeki her cihazı tanı; kontaktör-röle-PLC ile kumanda devresi kur; panoyu doğru tasarla.", mods:[38,5,18,28,40]},
 {ic:"🏗️", t:"Aşama 5 · Güç Dağıtımı: AG/OG & Koruma", hedef:"OG hücreden ADP'ye enerji zincirini oku; trafo, bara, kompanzasyon, kaçak akım ve selektiviteyi yönet.", mods:[39,43,24,26,27,7,10,21]},
 {ic:"🏢", t:"Aşama 6 · İleri Sistemler", hedef:"KNX bina otomasyonu, motorlar, elektronik ve sinyal — modern tesisin beyni.", mods:[37,25,11,30,31]},
 {ic:"🔧", t:"Aşama 7 · Saha Provası", hedef:"Gerçek arıza senaryolarını çöz, havacılık sistemlerini ve prosedürleri bağla; deneme + MYK sınavıyla taçlandır.", mods:[41,9,23,8]}
];

function pModDone(id){ return (DB.scores[id]||0)>=70; }
function renderProgram(){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.v==='program'));
  let allMods=0, allDone=0, firstOpen=null;
  PROGRAM.forEach(st=>{ st.mods.filter(id=>MODS.some(m=>m.id===id)).forEach(id=>{ allMods++; if(pModDone(id)) allDone++; else if(firstOpen===null) firstOpen=id; }); });
  const gpct=allMods?Math.round(allDone/allMods*100):0;
  let h=`<div class="panel" style="margin-bottom:16px">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div><h2 style="margin:0">🎓 Saha Öncesi Yetiştirme Programı</h2>
      <div class="muted" style="font-size:13px;margin-top:4px">7 aşama · ${allMods} modül · Bitirdiğinde sahada her işin bir ucundan tutabilecek donanımda olacaksın. Kural: sırayla git, her modülde quiz'den <b>%70+</b> al, aşamayı öyle kapat.</div></div>
      <div style="text-align:right;min-width:150px"><div style="font-size:26px;font-weight:800;color:var(--acc)">%${gpct}</div><div class="muted" style="font-size:11px">${allDone}/${allMods} modül tamamlandı</div></div>
    </div>
    <div class="scorebar" style="margin-top:12px"><i style="width:${gpct}%"></i></div>
    ${firstOpen!==null?`<div class="row" style="margin-top:14px"><button class="btn" onclick="go('module',${firstOpen})">▶ Kaldığın yerden devam: ${modById(firstOpen).ic} ${modById(firstOpen).t}</button></div>`:`<div class="msg ok" style="margin-top:14px">🎉 Programın tamamı bitti! Şimdi Deneme Sınavı ve MYK ile taçlandır.</div>`}
  </div>`;
  PROGRAM.forEach((st,si)=>{
    const ids=st.mods.filter(id=>MODS.some(m=>m.id===id));
    const done=ids.filter(pModDone).length;
    const pct=ids.length?Math.round(done/ids.length*100):0;
    const stDone=done===ids.length&&ids.length>0;
    h+=`<div class="panel" style="margin-bottom:14px;${stDone?'border-color:var(--acc);':''}">
      <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h3 style="margin:0;font-size:17px">${st.ic} ${st.t} ${stDone?'<span style="color:var(--ok)">✓</span>':''}</h3>
        <span class="muted" style="font-size:12px">${done}/${ids.length} · %${pct}</span></div>
      <div class="muted" style="font-size:12.5px;margin:6px 0 10px">${st.hedef}</div>
      <div class="mini"><i style="width:${pct}%"></i></div>
      <div style="margin-top:10px">${ids.map((id,i)=>{
        const m=modById(id); const sc=DB.scores[id]; const ok=pModDone(id);
        return `<div class="trow" onclick="go('module',${id})" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;cursor:pointer;border-bottom:1px solid var(--line)">
          <span style="font-size:13.5px">${i+1}. ${m.ic} ${m.t}</span>
          <span style="font-size:12px;font-weight:700;color:${ok?'var(--ok)':(sc!=null?'var(--warn)':'var(--muted)')}">${ok?'✅ %'+sc:(sc!=null?'%'+sc+' · tekrar dene':'başlanmadı')}</span></div>`;
      }).join('')}</div>
    </div>`;
  });
  h+=`<div class="panel" style="text-align:center">
    <b>🏁 Final:</b> Tüm aşamalar bitince → <button class="btn sm" onclick="go('exam')">📝 Deneme Sınavı</button>
    <button class="btn sm" onclick="go('myk')">🎖️ MYK Provası</button>
    <a class="btn ghost sm" href="foy.html" target="_blank" rel="noopener" style="text-decoration:none">📘 Föyü yazdır, sahaya götür</a></div>`;
  app().innerHTML=h;
}
function go(view,arg){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.v===view));
  window.scrollTo(0,0);
  if(view==='kapak')renderKapak();
  else if(view==='onsoz')renderOnsoz();
  else if(view==='program')renderProgram();
  else if(view==='home')renderHome();
  else if(view==='modules')renderModules();
  else if(view==='module')openModule(arg);
  else if(view==='exam')renderExam();
  else if(view==='review')renderReview();
  else if(view==='glossary')renderGlossary();
  else if(view==='settings')renderSettings();
  else if(view==='myk')renderMYK();
}

/* ===== EK v9: Sigorta Ailesi (43) ===== */
MODS.push({id:43, t:"Sigorta Ailesi: Kofta'dan NH'ye", cat:"oto", ic:"🔥", d:"Buşon/kofta, NH bıçaklı, gG-aM, B-C-D eğrileri, kesme kapasitesi."});

Object.assign(TEORI,{ 43:`
<b style="font-size:15px">🔹 1) Sigortanın Görevi: Kabloyu Korur, Cihazı Değil</b><br>
Sigorta, devreden geçen akım güvenli sınırın üstüne çıktığında iletkeni <b>kasten koparan</b> zayıf halkadır. Tesisatın en ucuz parçasıdır ve bilerek en önce ölmesi için oraya konur. Sahada en çok yapılan zihinsel hata şudur: "Sigorta cihazımı korur." <b>Hayır.</b> Sigortanın birinci görevi <b>kabloyu ve tesisatı yangından korumaktır</b>. Cihazı koruyan şey termik röle, motor koruma şalteri, dahili termistör veya sürücünün kendi korumasıdır. Sigorta seçilirken sorulacak ilk soru "cihazım kaç amper çeker" değil, <b>"bu kablo kaç amper taşır"</b> sorusudur.<br><br>
Sigortanın açması gereken iki farklı olay vardır ve bunların karakteri birbirine hiç benzemez:<br>
<b>• Aşırı yük (overload):</b> Akım anma değerinin biraz üstündedir (örneğin 16 A'lik hatta 22 A). Kablo hemen yanmaz, yavaş yavaş ısınır. Yalıtım kanserli gibi zamanla bozulur. Bu yüzden koruma da <b>yavaş</b> olmalıdır: dakikalar mertebesinde açar. Buna <b>termik bölge</b> denir. Motorun kalkış akımı da teknik olarak bir aşırı yüktür ama geçicidir; korumanın buna dayanması, gerçek aşırı yükte ise açması istenir.<br>
<b>• Kısa devre (short circuit):</b> Faz-nötr veya faz-faz doğrudan temas eder. Akım anma değerinin 20-100 katına, kilo-amperler seviyesine fırlar. Burada milisaniye önemlidir; koruma <b>ani (manyetik)</b> davranmalıdır.<br><br>
<b>I²t kavramı — sigortanın geçirdiği enerji:</b> Bir sigortanın kalitesini belirleyen şey sadece "kaç amperde açtığı" değil, <b>açarken devreye ne kadar enerji sızdırdığıdır</b>. Akımın karesi çarpı süre (I²t) devreye giren ısı enerjisiyle orantılıdır ve birimi A²s'dir. Bir sigortanın <b>geçirme I²t</b> değeri, korunan kablonun ve cihazın dayanabileceği I²t değerinden küçük olmalıdır. Halk diliyle: sigorta patlarken arkasındaki kabloya "az yakıt" bırakmalıdır. Bıçaklı NH ve buşonlu sigortalar bu konuda otomatik sigortalardan (MCB) genelde daha iyidir; çünkü eriyen tel ark oluşmadan kum içinde çok hızlı buharlaşır ve akımı tepe noktasına ulaşmadan keser. Buna <b>akım sınırlama</b> denir.<br><br>
<b>Eriyen tel prensibi:</b> Buşonun ve NH'nin içinde kalibre edilmiş gümüş/bakır şeritler vardır. Bu şeritlerin daraltılmış boyun bölgeleri, belirli bir I²t enerjisinde erir. Etrafındaki <b>kuvars kumu</b> eriyen metal buharını soğurur, arkı söndürür ve basıncı emer. Bu yüzden bir NH sigortası patlarken dışarıdan hiçbir şey görünmez — sadece gösterge pimi fırlar.<br><br>

<b style="font-size:15px">🔹 2) Buşonlu / Vidalı Sigorta — Halk Dilinde KOFTA</b><br>
<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3GsQa4HBJ49oduhafl3gjVBJXbb/hf_20260821_080635_b4858064-1a5e-4e7c-8db4-07ab9645d6f7.png" alt="Buşonlu (kofta) ve NH bıçaklı sigorta" style="width:100%;max-height:360px;object-fit:cover;border-radius:10px;margin:8px 0;border:1px solid #dbe4ee" loading="lazy"><br>
Sahada "kofta" denilen eleman, teknik adıyla <b>vidalı buşonlu sigortadır</b>. İki ailesi vardır: <b>Diazed</b> (klasik, büyük, E27/E33 dişli) ve <b>Neozed</b> (yeni nesil, daha kompakt). Parçaları:<br>
<b>• Altlık (kaide):</b> Porselen veya termoplastik gövde; içinde alt kontak ve üst (kapak) kontağı bulunur. Ray tipi veya pano sacına vidalanan tipleri vardır.<br>
<b>• Kontak vidası / ayar vidası (pas vidası):</b> Altlığın dibine vidalanan, akım değerine göre <b>farklı iç çapta</b> olan kalibrasyon parçası. Görevi kritiktir, aşağıda ayrıca anlatılıyor.<br>
<b>• Buşon (patron, sigorta fişi):</b> İçinde kum ve eriyen tel bulunan asıl tüketilebilir eleman. Ucundaki <b>gösterge pastili</b> renk koduna göre boyanmıştır.<br>
<b>• Kapak (başlık, şapka):</b> Buşonu altlığa bastıran, camlı vidalı kapak. Cam sayesinde pastile bakarak sigortanın atıp atmadığı anlaşılır.<br><br>
<b>Nasıl çalışır:</b> Akım kapaktan buşonun tepe kontağına, oradan eriyen telden geçip alt kontağa ve ayar vidasına iner. Tel eridiğinde arkasındaki küçük yay <b>renkli gösterge pastilini</b> fırlatır; pastil camın altına düşer veya yere düşer. <b>Pastil düşmüşse buşon ölmüştür</b>, bakarak anlarsınız; sökmeye gerek yok.<br><br>
<b>DIAZED RENK - AKIM KODU (ezberlenmesi zorunlu)</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><th style="padding:7px;border:1px solid #dbe4ee">Akım</th><th style="padding:7px;border:1px solid #dbe4ee">Renk</th><th style="padding:7px;border:1px solid #dbe4ee">Tipik kullanım</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>2 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#f9a8d4;border-radius:2px;vertical-align:middle;border:1px solid #999"></span> Pembe</td><td style="padding:7px;border:1px solid #dbe4ee">Kumanda, sinyal devresi</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>4 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#7b3f00;border-radius:2px;vertical-align:middle"></span> Kahverengi</td><td style="padding:7px;border:1px solid #dbe4ee">Küçük kumanda trafosu</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>6 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#16a34a;border-radius:2px;vertical-align:middle"></span> Yeşil</td><td style="padding:7px;border:1px solid #dbe4ee">Aydınlatma hattı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>10 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#e11d48;border-radius:2px;vertical-align:middle"></span> Kırmızı</td><td style="padding:7px;border:1px solid #dbe4ee">Aydınlatma / küçük priz</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>16 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#9ca3af;border-radius:2px;vertical-align:middle"></span> Gri</td><td style="padding:7px;border:1px solid #dbe4ee">Priz linyesi (klasik)</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>20 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#2563eb;border-radius:2px;vertical-align:middle"></span> Mavi</td><td style="padding:7px;border:1px solid #dbe4ee">Kuvvet prizi, küçük motor</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>25 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#eab308;border-radius:2px;vertical-align:middle"></span> Sarı</td><td style="padding:7px;border:1px solid #dbe4ee">Kolon, ısıtıcı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>35 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#111827;border-radius:2px;vertical-align:middle"></span> Siyah</td><td style="padding:7px;border:1px solid #dbe4ee">Daire kolonu / pano girişi</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>50 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#ffffff;border-radius:2px;vertical-align:middle;border:1px solid #999"></span> Beyaz</td><td style="padding:7px;border:1px solid #dbe4ee">Ana hat (DIII)</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>63 A</b></td><td style="padding:7px;border:1px solid #dbe4ee"><span style="display:inline-block;width:12px;height:12px;background:#b87333;border-radius:2px;vertical-align:middle"></span> Bakır / altın rengi</td><td style="padding:7px;border:1px solid #dbe4ee">Ana kolon, sayaç öncesi</td></tr>
</table><br>
<b>Diazed vs Neozed:</b> Diazed'in dişi <b>E27 (DII, 25 A'e kadar)</b> ve <b>E33 (DIII, 35-63 A)</b> ampul dişi mantığındadır; büyük ve derindir. <b>Neozed</b> ise aynı işi çok daha küçük hacimde yapar: <b>D01 (≤16 A), D02 (≤63 A), D03 (≤100 A)</b>. Neozed altlıkları raya oturur, kapakları geçmeli-çevirmelidir; modern panolarda yer kazandırır. Renk kodu mantığı Neozed'de de aynı akım-renk eşleşmesini kullanır.<br><br>
<b>Ayar vidasının (pas vidası) amacı:</b> Her akım değerinin buşon ucundaki <b>alt pim çapı farklıdır</b>. Ayar vidasının deliği de o çapa göredir. 16 A'lik ayar vidası takılı bir altlığa 25 A'lik buşon <b>fiziksel olarak oturmaz</b> — pimi deliğe girmez, kapak sıkılamaz. Bu, "sigorta atıyor, bir üstünü takayım" refleksine karşı konulmuş <b>mekanik bir güvenlik kilididir</b>. Ayar vidasını sökmek veya çıkarıp atmak, tesisatın kablo korumasını devre dışı bırakmak demektir; yasaktır.<br><br>
<b>Neden hâlâ karşınıza çıkar:</b> Eski konut tesisatlarında, tarımsal sulama panolarında, trafo binalarında, un/yem fabrikalarında yaygındır. <b>Avantajı:</b> çok yüksek kesme kapasitesi (genelde 50-100 kA), düşük geçirme I²t, ucuz, ark üretmeden keser, elektromanyetik gürültüye dayanıklı. <b>Dezavantajı:</b> tek kullanımlıktır (atınca atılır), elle değiştirilir (stok gerektirir), karanlıkta yanlış buşon takma riski vardır, kapağı açık unutulursa canlı kontak açıkta kalır ve üç fazlı devrede tek buşon atarsa motor <b>iki fazda kalır</b> (yanar).<br><br>

<b style="font-size:15px">🔹 3) NH Bıçaklı Sigorta (Bıçaklı Buşon)</b><br>
NH, sanayi ve dağıtım panolarının belkemiğidir. Yüksek akımlarda buşonlu sigorta yetmez; NH devreye girer.<br>
<b>Yapısı:</b> Dikdörtgen <b>porselen (seramik) gövde</b>, iki uçta <b>bıçak (bakır palet) kontaklar</b>, içinde paralel eriyen gümüş şeritler ve tamamını dolduran <b>kuvars kum</b>. Üst yüzeyde, tel eridiğinde yay ile fırlayan <b>gösterge pimi</b> vardır — panoya bakınca hangi fazın attığı anlaşılır. Bıçaklar, altlıktaki yaylı <b>pabuçlara (kontak maşalarına)</b> girer.<br>
<b>Altlık ve pabuç:</b> Altlık, bara veya kablo bağlantısını taşıyan seramik/termoset kaidedir. Pabuç yayı gevşerse temas direnci artar, ısınma ve renk değişimi (kararma) başlar; bu <b>arıza habercisidir</b>, pabuç değişmelidir.<br>
<b>NH boyları ve akım aralıkları:</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><th style="padding:7px;border:1px solid #dbe4ee">Boy</th><th style="padding:7px;border:1px solid #dbe4ee">Üst akım sınırı</th><th style="padding:7px;border:1px solid #dbe4ee">Tipik yer</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH000 / NH00</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 160 A</td><td style="padding:7px;border:1px solid #dbe4ee">Dağıtım panosu çıkışı, motor hattı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH1</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 250 A</td><td style="padding:7px;border:1px solid #dbe4ee">Tali pano besleme</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH2</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 400 A</td><td style="padding:7px;border:1px solid #dbe4ee">Ana dağıtım kolonu</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH3</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 630 A</td><td style="padding:7px;border:1px solid #dbe4ee">Trafo çıkışı, ana pano</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH4</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 1250 A</td><td style="padding:7px;border:1px solid #dbe4ee">Büyük trafo / bara sistemi</td></tr>
</table><br>
<b>NH takma-sökme kolu (sigorta çekme sapı) ile GÜVENLİ değiştirme:</b><br>
1) <b>Önce yükü kes.</b> Mümkünse üst kademe şalteri veya ana şalteri aç; motor hattıysa kontaktörü durdur. NH bir <b>yük ayırıcısı değildir</b>.<br>
2) Gerilim yokluğunu <b>iki kutuplu test cihazıyla</b> doğrula (kalemtuz/faz kalemi tek başına yeterli değildir).<br>
3) NH boyuna uygun, yalıtımlı <b>çekme sapını</b> tak; sapın kilidi bıçak omuzlarını tam kavramalıdır. Pense/kargaburun ile çekmek kesinlikle yasaktır.<br>
4) <b>KKD zorunlu:</b> ark dayanımlı yüz siperi, yalıtkan eldiven (üstüne deri koruyucu), uzun kollu alev geciktirmeli iş elbisesi, yanıcı olmayan giysi. Kolyeyi/saati çıkar.<br>
5) Sigortayı <b>düz ve tek hamlede</b> çek; yana yatırma (ark köprüsü kurar). Fazları teker teker, aynı sırayla.<br>
6) Yenisini takarken <b>aynı boy, aynı akım, aynı karakteristik</b>. Yerine tam oturana kadar bastır; yarım oturmuş bıçak ısınıp yangın çıkarır.<br>
7) Sapı çıkar, kapağı kapat, ardından yükü kademeli devreye al.<br>
<b>Yük altında çekmenin tehlikesi:</b> Bıçak pabuçtan ayrılırken devre akımı kopmaz, <b>ark olarak havada devam eder</b>. 400 V'ta birkaç yüz amperlik bir ark, 10.000 °C'ye varan plazma ve metal buharı üretir; el, yüz ve göz için kalıcı yanık, kör olma ve basınç dalgası riski vardır. Bu, sahada en sık ölümcül kaza sebeplerinden biridir.<br><br>

<b style="font-size:15px">🔹 4) Karakteristikler: gG mi aM mi?</b><br>
Sigortanın üstündeki iki harf hangi işi yaptığını söyler. Birinci harf <b>koruma aralığını</b>, ikinci harf <b>kullanım nesnesini</b> gösterir.<br>
<b>• gG (g = tam aralık, G = genel amaçlı):</b> Hem <b>aşırı yükü</b> hem <b>kısa devreyi</b> korur. Anma akımının biraz üstündeki küçük aşırı yükleri bile (yavaşça) açar. <b>Kablo, hat, kolon, priz, aydınlatma, genel dağıtım</b> için doğru seçimdir. Eski adı <b>gL</b>'dir; standart güncellemesiyle <b>gL/gG</b> aynı ürünü ifade eder — piyasada iki etiketi de görebilirsiniz.<br>
<b>• aM (a = kısmi aralık, M = motor/şalt cihazı):</b> <b>Yalnızca kısa devreyi</b> korur. Anma akımının yaklaşık 4 katına kadar hiç açmaz; motorun kalkış akımına bilerek göz yumar. Aşırı yükü <b>termik röle</b> veya motor koruma şalteri yapar. Bu yüzden aM <b>daima bir termik röle ile birlikte</b> kullanılır.<br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><th style="padding:7px;border:1px solid #dbe4ee">Kriter</th><th style="padding:7px;border:1px solid #dbe4ee">gG (gL/gG)</th><th style="padding:7px;border:1px solid #dbe4ee">aM</th><th style="padding:7px;border:1px solid #dbe4ee">MCB B</th><th style="padding:7px;border:1px solid #dbe4ee">MCB C</th><th style="padding:7px;border:1px solid #dbe4ee">MCB D</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Aşırı yük koruması</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">YOK</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kısa devre koruması</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td><td style="padding:7px;border:1px solid #dbe4ee">VAR</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Ani açma bölgesi</td><td style="padding:7px;border:1px solid #dbe4ee">Tam aralık</td><td style="padding:7px;border:1px solid #dbe4ee">Yaklaşık 4×In üstü</td><td style="padding:7px;border:1px solid #dbe4ee"><b>3-5 × In</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>5-10 × In</b></td><td style="padding:7px;border:1px solid #dbe4ee"><b>10-20 × In</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Nerede kullanılır</td><td style="padding:7px;border:1px solid #dbe4ee">Kablo/hat, kolon, genel dağıtım</td><td style="padding:7px;border:1px solid #dbe4ee">Motor hattı (termik röle ile)</td><td style="padding:7px;border:1px solid #dbe4ee">Aydınlatma, priz, rezistif yük</td><td style="padding:7px;border:1px solid #dbe4ee">Motor, trafo, LED sürücü, genel</td><td style="padding:7px;border:1px solid #dbe4ee">Yüksek kalkışlı motor, kaynak, trafo</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Tek başına yeterli mi</td><td style="padding:7px;border:1px solid #dbe4ee">Evet (hat için)</td><td style="padding:7px;border:1px solid #dbe4ee"><b>Hayır</b></td><td style="padding:7px;border:1px solid #dbe4ee">Evet</td><td style="padding:7px;border:1px solid #dbe4ee">Evet</td><td style="padding:7px;border:1px solid #dbe4ee">Evet</td></tr>
</table><br>

<b style="font-size:15px">🔹 5) Otomatik Sigorta (MCB) Eğrileri: B / C / D</b><br>
MCB'nin içinde iki koruma vardır: <b>bimetal</b> (yavaş, aşırı yük) ve <b>manyetik bobin</b> (ani, kısa devre). Eğri harfi <b>sadece manyetik eşiği</b> belirtir; termik davranış üçünde de benzerdir.<br>
<b>• B eğrisi (3-5 × In):</b> En hassas. Kalkış akımı olmayan yükler için: aydınlatma, priz, rezistans, ısıtıcı, uzun kablolu TN hatlar (düşük kısa devre akımı olan uçlarda bile açabilmesi için).<br>
<b>• C eğrisi (5-10 × In):</b> Genel amaçlı standart. Küçük motorlar, pompa, klima, trafo, LED sürücü ve anahtarlamalı güç kaynakları (bunların <b>inrush</b> akımı yüksektir), karışık konut/ticari panolar.<br>
<b>• D eğrisi (10-20 × In):</b> Çok yüksek darbe akımlı yükler: doğrudan yol verilen büyük motorlar, kaynak makineleri, transformatörler, kondansatör grupları, X-ray cihazları.<br>
<b>Yanlış eğri seçilirse:</b> C yerine <b>B</b> takarsanız motor veya trafo <b>her kalkışta sigortayı attırır</b>; ortada arıza yoktur ama tesis çalışmaz — sonra usta "bir üst amper takalım" der ve asıl tehlike başlar. B yerine <b>D</b> takarsanız kablo ucundaki zayıf bir kısa devrede (uzun hat, yüksek empedans) manyetik eşik hiç aşılmaz; MCB manyetik değil sadece <b>termik</b> açar, yani saniyeler-dakikalar sürer. Bu sürede kablo yalıtımı erir, dokunma gerilimi tehlikeli süre boyunca ayakta kalır. Bu yüzden eğri seçimi sadece konfor değil, <b>can güvenliği</b> meselesidir.<br><br>

<b style="font-size:15px">🔹 6) Kesme Kapasitesi (Icn / Icu — kA)</b><br>
Sigortanın üstündeki kutu içinde yazan <b>3000, 6000, 10000</b> veya <b>3 kA, 6 kA, 10 kA</b>, o cihazın <b>güvenle kesebileceği en büyük kısa devre akımıdır</b>. Anma akımıyla (In) hiç ilgisi yoktur; 16 A'lik bir MCB 6 kA kesebilir demek, o noktada 6000 A'e kadar bir kısa devre olursa cihaz kendini imha etmeden devreyi keser demektir.<br>
<b>Kısa devre akımı neye göre değişir?</b> Esas olarak <b>kaynağa (trafoya) yakınlığa</b>. Trafo çıkışında kısa devre akımı 20-50 kA olabilir; kablo uzadıkça empedans artar, akım düşer; dairenin en uzak prizinde belki 500 A kalır. Bu yüzden <b>ana panoda yüksek kA</b>, uçlarda daha düşük kA'lı ürün kullanılır. Şehir şebekesinde konutta genelde <b>6 kA</b>, sanayide <b>10 kA ve üstü</b>, trafo yakınında <b>NH (50-120 kA)</b> tercih edilir.<br>
<b>Yetersiz kesme kapasitesi ne yapar?</b> Kısa devrede kontaklar <b>kaynaşır</b>, ark söndürme odacığı yetmez, gövde patlar, plazma ve erimiş metal panoya yayılır. Sigorta açtığını sanırsınız ama devre hâlâ kapalıdır. Sonuç: pano yangını ve ark patlaması. Bu, ucuz sigortanın en pahalı hatası olduğu yerdir.<br><br>

<b style="font-size:15px">🔹 7) Selektivite (Seçicilik)</b><br>
İdeal tesiste bir arıza olduğunda <b>sadece arızalı kolun sigortası açar</b>, ana sigorta ayakta kalır. Buna selektivite denir. Kurallar:<br>
• Üst kademedeki koruma, alttakinden hem <b>daha büyük akımlı</b> hem de <b>daha yavaş</b> olmalıdır.<br>
• Eriyen telli sigortalarda pratik kural: kademeler arası oran yaklaşık <b>1:1,6</b> olsun (ör. 20 A → 32 A → 50 A → 80 A → 125 A). Bir kademe atlamak yerine bu diziyi kullanmak, tam selektivite şansını yükseltir.<br>
• <b>NH (üst) — otomat (alt):</b> Klasik ve sağlıklı bir kademelendirmedir; NH'nin yavaş termik bölgesi, MCB'nin altında kalır.<br>
• <b>Buşon (üst) — otomat (alt):</b> Örneğin apartman kolonunda 63 A Diazed, daire içinde 16 A C otomat. Genellikle sorunsuz çalışır.<br>
• <b>Otomat — otomat:</b> Kısa devrede seçicilik zayıftır; iki MCB'nin manyetik açması aynı milisaniyeye düşer ve ikisi birden açabilir. Kritik yerlerde üst kademeye <b>kısa gecikmeli şalter (MCCB, S tipi)</b> koyulur.<br>
• <b>Kaçak akım rölesiyle bağlantı:</b> Ana kademede <b>S tipi (selektif, gecikmeli) RCD</b>, alt kademede <b>anlık 30 mA RCD</b> kullanılır. Böylece bir dairedeki kaçak, tüm binayı karartmaz. S tipi ana RCD tipik olarak 100-300 mA ve zaman gecikmelidir.<br><br>

<b style="font-size:15px">🔹 8) YANLIŞ SEÇERSEN NE OLUR?</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><th style="padding:7px;border:1px solid #dbe4ee">Yapılan hata</th><th style="padding:7px;border:1px solid #dbe4ee">Ne olur</th><th style="padding:7px;border:1px solid #dbe4ee">Doğrusu</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Buşonu <b>telle köprülemek</b> (çivi/tel sarmak)</td><td style="padding:7px;border:1px solid #dbe4ee">Koruma tamamen yok olur; kablo eriyene kadar akım akar → <b>yangın</b>, sigorta gövdesi patlar</td><td style="padding:7px;border:1px solid #dbe4ee">Asla. Doğru amperde orijinal buşon</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">"Atıyor" diye <b>bir üst değere çıkmak</b> (16→25 A)</td><td style="padding:7px;border:1px solid #dbe4ee">Kablo taşıma kapasitesi aşılır, yalıtım kızarır, buat/priz erir → gizli yangın</td><td style="padding:7px;border:1px solid #dbe4ee">Önce sebebi bul; gerekiyorsa kablo kesitini büyüt</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>aM</b> sigortayı kablo/priz hattında kullanmak</td><td style="padding:7px;border:1px solid #dbe4ee">Aşırı yük hiç görülmez; 4×In'e kadar akım serbest → kablo yavaşça kavrulur</td><td style="padding:7px;border:1px solid #dbe4ee">Hat koruması için <b>gG</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>B eğrisi</b>ni motor hattında kullanmak</td><td style="padding:7px;border:1px solid #dbe4ee">Her kalkışta gereksiz açma; üretim durur, sonra hatalı büyütme yapılır</td><td style="padding:7px;border:1px solid #dbe4ee">Motor için <b>C</b>, ağır kalkışta <b>D</b></td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Kesme kapasitesi düşük</b> ürün (3 kA'yı sanayide)</td><td style="padding:7px;border:1px solid #dbe4ee">Kısa devrede kontaklar kaynar, gövde patlar, <b>ark patlaması</b>; devre kesilmez</td><td style="padding:7px;border:1px solid #dbe4ee">Sahanın Ik değerine göre 10 kA+ veya NH</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Ayar (pas) vidasını sökmek</b></td><td style="padding:7px;border:1px solid #dbe4ee">Her amperde buşon takılabilir hale gelir; mekanik güvenlik kilidi ölür</td><td style="padding:7px;border:1px solid #dbe4ee">Hat akımına uygun ayar vidası mutlaka takılı olsun</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH'yi yük altında</b> çekmek</td><td style="padding:7px;border:1px solid #dbe4ee">Ark plazması, yüz/göz yanığı, körlük, pano patlaması</td><td style="padding:7px;border:1px solid #dbe4ee">Yükü kes, çekme sapı + siper + eldiven</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Yanlış NH boyu</b> / yarım oturan bıçak</td><td style="padding:7px;border:1px solid #dbe4ee">Temas direnci artar, pabuç kızarır, kararma ve yangın; koordinasyon bozulur</td><td style="padding:7px;border:1px solid #dbe4ee">Altlığın boyuna uygun NH, tam oturt</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>Sebebi araştırmadan</b> yeni buşon takmak</td><td style="padding:7px;border:1px solid #dbe4ee">Kısa devre hâlâ yerinde; yeni buşon da patlar, ark tekrarlar, ekipman zarar görür</td><td style="padding:7px;border:1px solid #dbe4ee">Önce ölç: yük mü, kısa devre mi, kaçak mı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Üç fazlıda <b>tek fazın buşonunu</b> yenilemeyip bırakmak</td><td style="padding:7px;border:1px solid #dbe4ee">Motor iki fazda kalır, akım fırlar, sargı yanar</td><td style="padding:7px;border:1px solid #dbe4ee">Üç fazı birlikte kontrol et, faz koruma rölesi kullan</td></tr>
</table><br>

<b style="font-size:15px">🔹 9) Sahada Arıza Akışı: Sigorta Attı, Şimdi Ne Yapacağım?</b><br>
<b>1) Yenisini takmadan önce SEBEBİ sor.</b> İki ihtimal var: aşırı yük mü, kısa devre mi? Ayırt etme ipucu: sigorta <b>bir süre çalıştıktan sonra</b> attıysa aşırı yük; <b>şalteri kaldırır kaldırmaz</b> attıysa kısa devre veya toprak kaçağıdır.<br>
<b>2) Yükü ölç.</b> <b>Pens ampermetreyle</b> hattın gerçek akımını, mümkünse en yoğun anda ölç. Anma akımının %80'ini sürekli aşıyorsa sorun yükte veya kesitte. Üç fazda faz dengesizliğine de bak.<br>
<b>3) Kısa devre / kaçak ara.</b> Hattı besleme tarafından ayır, uçları serbest bırak, <b>megger (izolasyon ölçer)</b> ile 500 V DC uygulayarak faz-nötr, faz-toprak, nötr-toprak izolasyonuna bak. Sağlıklı bir tesisatta genellikle <b>1 MΩ üzeri</b> beklenir; sıfıra yakın değer temas noktasını gösterir. Hattı ortadan bölerek (buattan) arızayı yarıya indirerek daralt.<br>
<b>4) Termal kontrol.</b> Termal kamera veya elin tersiyle (gerilimsizken) klemens, pabuç, buşon kapağı sıcaklığına bak; gevşek klemens de sigorta attırır.<br>
<b>5) Onar, sonra AYNI değerde ve AYNI karakteristikte</b> yenisini tak. Değeri asla büyütme. Değiştirme tarihini ve sebebini pano etiketine yaz.<br>
<b>6) Test et.</b> Kademeli devreye al, akımı tekrar ölç, RCD test butonuna bas.<br><br>

<b style="font-size:15px">🔹 10) Hangi Sigorta Nerede? (Özet)</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><th style="padding:7px;border:1px solid #dbe4ee">Yer</th><th style="padding:7px;border:1px solid #dbe4ee">Uygun koruma</th><th style="padding:7px;border:1px solid #dbe4ee">Not</th></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Konut aydınlatma</td><td style="padding:7px;border:1px solid #dbe4ee">6-10 A <b>B</b> MCB (6 kA)</td><td style="padding:7px;border:1px solid #dbe4ee">LED sürücü çoksa C tercih edilir</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Konut priz linyesi</td><td style="padding:7px;border:1px solid #dbe4ee">16 A <b>B/C</b> MCB + 30 mA RCD</td><td style="padding:7px;border:1px solid #dbe4ee">2,5 mm² kablo ile</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Klima / pompa / küçük motor</td><td style="padding:7px;border:1px solid #dbe4ee"><b>C</b> MCB veya motor koruma şalteri</td><td style="padding:7px;border:1px solid #dbe4ee">Inrush akımına dayanmalı</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Sanayi motoru (DOL)</td><td style="padding:7px;border:1px solid #dbe4ee"><b>aM</b> NH + termik röle, ya da <b>D</b> MCB</td><td style="padding:7px;border:1px solid #dbe4ee">aM tek başına aşırı yükü korumaz</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kaynak makinesi / trafo</td><td style="padding:7px;border:1px solid #dbe4ee"><b>D</b> MCB veya gG NH</td><td style="padding:7px;border:1px solid #dbe4ee">Mıknatıslanma darbesi yüksektir</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Ana kolon / tali pano besleme</td><td style="padding:7px;border:1px solid #dbe4ee"><b>gG NH</b> (NH00-NH2) veya MCCB</td><td style="padding:7px;border:1px solid #dbe4ee">Selektivite için alt kademeden 1,6 kat büyük</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Trafo çıkışı / ana pano</td><td style="padding:7px;border:1px solid #dbe4ee"><b>gG NH3-NH4</b> veya açık tip kesici</td><td style="padding:7px;border:1px solid #dbe4ee">Yüksek kA gerekir</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Sayaç öncesi / dağıtım girişi</td><td style="padding:7px;border:1px solid #dbe4ee"><b>Diazed 63 A</b> veya NH00 gG</td><td style="padding:7px;border:1px solid #dbe4ee">Genelde mühürlü, dağıtım şirketi yetkisi</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee">Kumanda devresi (trafo sekonderi)</td><td style="padding:7px;border:1px solid #dbe4ee">2-6 A Diazed/Neozed veya C MCB</td><td style="padding:7px;border:1px solid #dbe4ee">Pembe 2 A, yeşil 6 A</td></tr>
</table><br>
<b>Kapanış:</b> Sigorta seçimi üç sorunun cevabıdır: <b>Hangi kabloyu koruyorum? (amper)</b>, <b>Yükün karakteri ne? (eğri / gG-aM)</b>, <b>Bu noktada kısa devre akımı ne kadar? (kA)</b>. Üçü doğruysa tesisat yıllarca sessizce çalışır; biri yanlışsa ya sürekli sigorta atar ya da bir gün hiç atmaz — ve ikincisi çok daha tehlikelidir.
` });

Object.assign(FOY,{ 43:`
<b style="font-size:15px">💊 Hap Bilgiler</b><br>
• Sigorta <b>kabloyu</b> korur, cihazı değil. Cihazı termik röle korur.<br>
• Aşırı yük = yavaş açma (termik). Kısa devre = ani açma (manyetik).<br>
• <b>I²t</b> = sigortanın geçirdiği enerji. Küçük olması iyidir (akım sınırlama).<br>
• Buşonun pastili düşmüşse buşon ölmüştür — sökmeden anlarsın.<br>
• <b>Ayar (pas) vidası</b> = büyük buşonun küçük yuvaya girmesini engelleyen mekanik kilit. Sökmek yasak.<br>
• <b>gG</b> = aşırı yük + kısa devre (hat/kablo). Eski adı <b>gL</b>.<br>
• <b>aM</b> = sadece kısa devre (motor). <b>Termik röle ile birlikte kullanılır.</b><br>
• <b>B = 3-5×In</b> (aydınlatma/priz) · <b>C = 5-10×In</b> (motor/trafo/genel) · <b>D = 10-20×In</b> (kaynak, ağır kalkış).<br>
• <b>kA</b> = kesme kapasitesi, anma akımıyla ilgisi yok. Trafoya yaklaştıkça büyüğü gerekir.<br>
• Selektivite pratik kuralı: kademeler arası <b>1 : 1,6</b> oran (20-32-50-80-125 A).<br>
• Ana kademede <b>S tipi (gecikmeli) RCD</b>, uçta <b>30 mA anlık RCD</b>.<br>
• NH'yi <b>asla</b> yük altında çekme. Sap + eldiven + yüz siperi.<br><br>

<b style="font-size:15px">🎨 Cepte Taşı: Diazed Renk Kodu</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>2 A</b> Pembe</td><td style="padding:7px;border:1px solid #dbe4ee"><b>4 A</b> Kahverengi</td><td style="padding:7px;border:1px solid #dbe4ee"><b>6 A</b> Yeşil</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>10 A</b> Kırmızı</td><td style="padding:7px;border:1px solid #dbe4ee"><b>16 A</b> Gri</td><td style="padding:7px;border:1px solid #dbe4ee"><b>20 A</b> Mavi</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>25 A</b> Sarı</td><td style="padding:7px;border:1px solid #dbe4ee"><b>35 A</b> Siyah</td><td style="padding:7px;border:1px solid #dbe4ee"><b>50 A</b> Beyaz</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee" colspan="3"><b>63 A</b> Bakır / altın rengi</td></tr>
</table>
<i>Hatırlatma:</i> DII = E27 diş (≤25 A), DIII = E33 diş (35-63 A). Neozed: D01 ≤16 A, D02 ≤63 A, D03 ≤100 A.<br><br>

<b style="font-size:15px">🔪 Cepte Taşı: NH Boyları</b><br>
<table style="width:100%;border-collapse:collapse;font-size:13px">
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH000 / NH00</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 160 A</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH1</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 250 A</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH2</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 400 A</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH3</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 630 A</td></tr>
<tr><td style="padding:7px;border:1px solid #dbe4ee"><b>NH4</b></td><td style="padding:7px;border:1px solid #dbe4ee">≤ 1250 A</td></tr>
</table><br>

<b style="font-size:15px">📐 İşlenmiş Örnek: 7,5 kW Trifaze Motor İçin Seçim</b><br>
<b>Veriler:</b> P = 7,5 kW, U = 400 V, cos φ ≈ 0,85, verim ≈ 0,88, doğrudan yol verme (DOL).<br>
<b>1) Anma akımı:</b> In = P / (1,73 × U × cos φ × verim) = 7500 / (1,73 × 400 × 0,85 × 0,88) ≈ <b>14,5 A</b>. Sahada pratik kural olarak 400 V'ta yaklaşık <b>2 A/kW</b> alınır → 15 A civarı, tutarlı.<br>
<b>2) Kalkış akımı:</b> DOL'de yaklaşık 6-7 × In → <b>90-100 A</b>, birkaç saniye sürer.<br>
<b>3) Kablo:</b> 4 mm² NYY (yaklaşık 25-30 A taşır) rahat yeter; uzun mesafede gerilim düşümüne göre kontrol et.<br>
<b>4a) Klasik sanayi çözümü:</b> <b>25 A aM</b> NH00 veya Neozed buşon + <b>kontaktör</b> + <b>termik röle 13-18 A</b> (14,5 A'e ayarla). aM kalkışı görmezden gelir, aşırı yükü termik röle yapar, kısa devreyi aM keser.<br>
<b>4b) Modern pano çözümü:</b> <b>Motor koruma şalteri (MPCB) 13-18 A</b> ayarlı, ya da <b>25 A C eğrisi</b> MCB. C eğrisi 25 A için manyetik eşik 125-250 A → 100 A'lik kalkışı sorunsuz geçirir.<br>
<b>4c) Ağır kalkış varsa</b> (büyük volanlı fan, kırıcı, kompresör): <b>D eğrisi 20-25 A</b>.<br>
<b>5) Kesme kapasitesi:</b> Pano trafoya yakınsa <b>10 kA</b>, uzaksa 6 kA yeterli.<br>
<b>6) Selektivite:</b> Bu motor kolunu besleyen tali pano girişine 25 × 1,6 ≈ <b>40 A</b>, ana kolona 40 × 1,6 ≈ <b>63 A gG NH00</b>. Böylece motorda arıza olursa fabrika kararmaz.<br>
<b>❌ Yapılmayacak:</b> 25 A <b>B</b> eğrisi takmak (eşik 75-125 A → kalkışta atar) veya "atmasın" diye 40 A gG takıp termik rölesiz bırakmak (4 mm² kablo korumasız kalır).
` });

Object.assign(QBANK,{ 43:[
 {q:"Diazed buşonlu sigortada GRİ renk hangi akım değerini gösterir?",
  opts:["16 A","10 A","20 A","25 A"], ans:0,
  ex:"Diazed renk kodunda gri = 16 A'dir. Sıra: 2 A pembe, 4 A kahverengi, 6 A yeşil, 10 A kırmızı, 16 A gri, 20 A mavi, 25 A sarı, 35 A siyah, 50 A beyaz, 63 A bakır rengi. Pastilin rengine bakarak buşonu sökmeden değerini anlarsın."},

 {q:"Aşağıdaki eşleştirmelerden hangisi YANLIŞTIR?",
  opts:["6 A - yeşil","10 A - kırmızı","25 A - mavi","63 A - bakır/altın rengi"], ans:2,
  ex:"25 A SARI, 20 A ise MAVİ'dir. Karıştırılması sık görülen bir çifttir; mavi buşonu 25 A sanıp takmak hattı gereğinden dar korur ya da tam tersi kabloyu aşırı yükte bırakır."},

 {q:"Buşonlu sigorta altlığındaki AYAR VİDASININ (pas vidası) asıl görevi nedir?",
  opts:["Kontak direncini azaltmak","Buşonu topraklamak","Daha büyük akımlı buşonun yuvaya takılmasını mekanik olarak engellemek","Buşonun daha hızlı soğumasını sağlamak"], ans:2,
  ex:"Her akım değerinin buşon alt pim çapı farklıdır; ayar vidasının deliği de o çapa göredir. 16 A ayar vidalı altlığa 25 A buşon fiziksel olarak oturmaz. Bu, 'atıyor, bir üstünü takayım' hatasına karşı mekanik güvenlik kilididir. Sökmek yasaktır."},

 {q:"Bir motor hattında gG yerine aM sigorta kullanılmasının sebebi nedir?",
  opts:["aM daha ucuzdur","aM hem aşırı yükü hem kısa devreyi daha hassas korur","aM kaçak akımı da algılar","aM sadece kısa devreyi korur, kalkış akımında gereksiz açmaz; aşırı yükü termik röle yapar"], ans:3,
  ex:"aM (kısmi aralık, motor) yaklaşık 4×In'e kadar açmaz; motorun kalkış akımına bilerek göz yumar. Bu yüzden aM DAİMA bir termik röle veya motor koruma şalteri ile birlikte kullanılmalıdır. Tek başına aşırı yük koruması sağlamaz."},

 {q:"C eğrisi bir otomatik sigortanın ani (manyetik) açma bölgesi nedir?",
  opts:["3-5 × In","5-10 × In","10-20 × In","20-40 × In"], ans:1,
  ex:"B = 3-5×In (aydınlatma, priz, rezistif), C = 5-10×In (motor, trafo, LED sürücü, genel kullanım), D = 10-20×In (kaynak makinesi, ağır kalkışlı motor, trafo). Eğri harfi sadece manyetik eşiği belirtir; termik davranış benzerdir."},

 {q:"Bir MCB'nin üzerinde yazan '6000' veya '6 kA' ifadesi neyi belirtir?",
  opts:["Anma akımını","Açma süresini","Kesme kapasitesini (güvenle kesebileceği en büyük kısa devre akımı)","Test gerilimini"], ans:2,
  ex:"kA değeri kesme kapasitesidir ve anma akımıyla (In) ilgisi yoktur. Kısa devre akımı trafoya yakınlıkla artar: trafo çıkışında 20-50 kA olabilirken en uzak prizde birkaç yüz amperdir. Yetersiz kA'lı ürün kısa devrede kontakları kaynatır, gövdesi patlar ve devreyi kesemez."},

 {q:"NH2 boyu bıçaklı sigorta hangi akıma kadar kullanılır?",
  opts:["160 A","250 A","630 A","400 A"], ans:3,
  ex:"NH boyları: NH000/NH00 ≤160 A, NH1 ≤250 A, NH2 ≤400 A, NH3 ≤630 A, NH4 ≤1250 A. Altlığın boyuna uygun NH seçilmelidir; yarım oturan bıçak temas direncini artırır, pabucu kızdırır ve yangın çıkarır."},

 {q:"NH sigortayı yük altında (akım akarken) çekmenin başlıca tehlikesi nedir?",
  opts:["Bıçak pabuçtan ayrılırken akım ark olarak devam eder; plazma ve metal buharı ciddi yanık/körlük yapar","Sigorta erken yaşlanır","Gösterge pimi kırılır","Ölçüm hatası oluşur"], ans:0,
  ex:"NH bir yük ayırıcısı değildir. Kontak açılırken 400 V'ta birkaç yüz amperlik ark 10.000 °C'ye varan plazma üretir. Doğru sıra: yükü kes, gerilim yokluğunu iki kutuplu test cihazıyla doğrula, uygun NH çekme sapı + ark siperi + yalıtkan eldivenle düz hamlede çek."},

 {q:"Eriyen telli sigortalarda selektivite (seçicilik) için önerilen pratik kademe oranı nedir?",
  opts:["1 : 1,1","1 : 1,6","1 : 3","1 : 5"], ans:1,
  ex:"Üst kademe alt kademeden hem daha büyük hem daha yavaş olmalıdır; pratik kural yaklaşık 1:1,6 oranıdır (20-32-50-80-125 A dizisi). Ayrıca ana kademede S tipi (gecikmeli) kaçak akım rölesi, uçta 30 mA anlık RCD kullanılarak selektivite kaçak akım tarafında da sağlanır."},

 {q:"Sigorta attı. En doğru ilk adım hangisidir?",
  opts:["Önce sebebi bulmak: pens ampermetreyle yükü ölç, megger ile izolasyonu kontrol et","Hemen bir üst amperdekini takmak","Buşonu telle köprüleyip devreyi çalıştırmak","Kesme kapasitesi daha düşük ürünle denemek"], ans:0,
  ex:"Sigorta bir haberci, arıza değildir. Bir süre çalıştıktan sonra attıysa aşırı yük, şalter kalkar kalkmaz attıysa kısa devre/kaçak şüphesi vardır. Pens ampermetreyle gerçek akımı, megger (500 V DC) ile faz-nötr, faz-toprak, nötr-toprak izolasyonunu ölç. Onardıktan sonra AYNI değer ve AYNI karakteristikte yenisini tak."},

 {q:"gG karakteristiğinin eski (önceki standarttaki) adı nedir ve neyi korur?",
  opts:["aM - sadece aşırı yük","gL - hem aşırı yük hem kısa devre","gR - sadece yarı iletken","aR - sadece aşırı yük"], ans:1,
  ex:"gG'nin eski adı gL'dir; piyasada 'gL/gG' etiketiyle de görülür. Tam aralık koruma sağlar: hem aşırı yükü hem kısa devreyi keser. Kablo, kolon, priz ve aydınlatma hatlarının koruması için doğru seçimdir."},

 {q:"Diazed ve Neozed karşılaştırmasında hangisi doğrudur?",
  opts:["Neozed E27/E33 dişli ve daha büyüktür","Neozed sadece doğru akımda kullanılır","Diazed'in kesme kapasitesi otomatik sigortadan düşüktür","Diazed DII (E27) ve DIII (E33) dişlidir; Neozed D01/D02/D03 olarak daha kompakttır"], ans:3,
  ex:"Diazed klasik ampul dişi mantığındadır: DII = E27 (≤25 A), DIII = E33 (35-63 A). Neozed aynı işi daha küçük hacimde yapar: D01 ≤16 A, D02 ≤63 A, D03 ≤100 A. Her iki buşonlu ailenin kesme kapasitesi de tipik MCB'lerden yüksektir (genelde 50-100 kA)."},

 {q:"Uzun bir aydınlatma hattında B eğrisi yerine D eğrisi otomat kullanılırsa ne olur?",
  opts:["Hiçbir şey değişmez","Kalkışta gereksiz açma yapar","Kaçak akım koruması bozulur","Hat ucundaki zayıf kısa devrede manyetik eşik aşılmaz, sadece termik açar ve açma çok gecikir"], ans:3,
  ex:"D eğrisinin manyetik eşiği 10-20×In'dir. Uzun/yüksek empedanslı hatta oluşan kısa devre akımı bu eşiğin altında kalabilir; o zaman MCB manyetik değil sadece termik (saniyeler-dakikalar) açar. Bu sürede kablo yalıtımı erir ve tehlikeli dokunma gerilimi ayakta kalır. Eğri seçimi bir can güvenliği meselesidir."}
] });

Object.assign(DIAG,{ 43:`<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" width="100%">
<rect x="0" y="0" width="440" height="210" fill="#0d1117"/>
<text x="10" y="14" fill="#33b1ff" font-size="11" font-weight="bold">BUSONLU (KOFTA)</text>
<text x="240" y="14" fill="#33b1ff" font-size="11" font-weight="bold">NH BICAKLI</text>

<rect x="14" y="24" width="86" height="86" rx="4" fill="#20303f" stroke="#8a98ab"/>
<text x="18" y="36" fill="#8a98ab" font-size="9">altlik (kaide)</text>
<rect x="34" y="42" width="46" height="34" rx="3" fill="#20303f" stroke="#ffb000"/>
<text x="37" y="63" fill="#ffb000" font-size="9">buson</text>
<circle cx="57" cy="82" r="5" fill="#f85149"/>
<rect x="30" y="88" width="54" height="8" rx="2" fill="#20303f" stroke="#3fb950"/>
<line x1="57" y1="76" x2="57" y2="88" stroke="#8a98ab" stroke-width="1"/>
<rect x="34" y="26" width="46" height="12" rx="2" fill="#20303f" stroke="#33b1ff"/>
<text x="104" y="34" fill="#33b1ff" font-size="9">kapak (baslik)</text>
<text x="104" y="60" fill="#ffb000" font-size="9">eriyen tel + kum</text>
<text x="104" y="84" fill="#f85149" font-size="9">gosterge pastili</text>
<text x="104" y="97" fill="#3fb950" font-size="9">ayar vidasi (pas)</text>
<text x="14" y="122" fill="#8a98ab" font-size="9">2A pembe 6A yesil 10A kirmizi 16A gri 25A sari</text>

<rect x="244" y="26" width="70" height="80" rx="4" fill="#20303f" stroke="#8a98ab"/>
<rect x="236" y="34" width="14" height="16" rx="2" fill="#20303f" stroke="#33b1ff"/>
<rect x="308" y="34" width="14" height="16" rx="2" fill="#20303f" stroke="#33b1ff"/>
<rect x="236" y="82" width="14" height="16" rx="2" fill="#20303f" stroke="#33b1ff"/>
<rect x="308" y="82" width="14" height="16" rx="2" fill="#20303f" stroke="#33b1ff"/>
<circle cx="279" cy="42" r="5" fill="#f85149"/>
<text x="256" y="70" fill="#8a98ab" font-size="9">porselen</text>
<text x="256" y="82" fill="#ffb000" font-size="9">kum dolgu</text>
<rect x="240" y="110" width="78" height="9" rx="2" fill="#20303f" stroke="#3fb950"/>
<text x="326" y="44" fill="#f85149" font-size="9">gosterge pimi</text>
<text x="326" y="60" fill="#33b1ff" font-size="9">bicak kontak</text>
<text x="326" y="118" fill="#3fb950" font-size="9">altlik+pabuc</text>
<text x="236" y="134" fill="#8a98ab" font-size="9">NH00 160A / NH1 250A / NH2 400A / NH3 630A</text>

<text x="14" y="156" fill="#33b1ff" font-size="11" font-weight="bold">MCB ANI ACMA BANDI (x In)</text>
<rect x="14" y="164" width="410" height="16" rx="3" fill="#20303f" stroke="#8a98ab"/>
<rect x="16" y="166" width="96" height="12" rx="2" fill="#3fb950" opacity="0.55"/>
<rect x="118" y="166" width="140" height="12" rx="2" fill="#ffb000" opacity="0.55"/>
<rect x="264" y="166" width="158" height="12" rx="2" fill="#f85149" opacity="0.55"/>
<text x="26" y="175" fill="#0d1117" font-size="9" font-weight="bold">B 3-5x</text>
<text x="150" y="175" fill="#0d1117" font-size="9" font-weight="bold">C 5-10x</text>
<text x="300" y="175" fill="#0d1117" font-size="9" font-weight="bold">D 10-20x</text>
<text x="14" y="194" fill="#3fb950" font-size="9">B: aydinlatma/priz</text>
<text x="146" y="194" fill="#ffb000" font-size="9">C: motor/trafo/LED</text>
<text x="290" y="194" fill="#f85149" font-size="9">D: kaynak/agir kalkis</text>
<text x="14" y="205" fill="#8a98ab" font-size="9">gG = asiri yuk + kisa devre (kablo) | aM = sadece kisa devre (motor, termik role ile)</text>
</svg>` });

/* renkli uyarı kutuları — satır başındaki emoji kalıplarını yakalar */
function alertify(h){
  if(!h) return h;
  var rules=[
    {re:/^(<b[^>]*>)?\s*(⚠️|❌|🚫|⛔)\s*/,cls:'ab-danger',ic:'⚠️'},
    {re:/^(<b[^>]*>)?\s*(💡|✅|👍|🎯)\s*/,cls:'ab-tip',ic:'💡'},
    {re:/^(<b[^>]*>)?\s*(🔧|🧰|🔩|📌|🏗️)\s*/,cls:'ab-field',ic:'🔧'},
    {re:/^(<b[^>]*>)?\s*(🔥|❗|⚡)\s*/,cls:'ab-warn',ic:'⚡'}
  ];
  var parts=h.split(/<br>/);
  for(var i=0;i<parts.length;i++){
    var t=parts[i]; if(!t || !t.trim()) continue;
    var s=t.replace(/^\s+/,'');
    for(var j=0;j<rules.length;j++){
      var r=rules[j];
      if(r.re.test(s)){
        var body=s.replace(r.re,'$1');
        parts[i]='<div class="alertbox '+r.cls+'"><span class="ab-ic">'+r.ic+'</span><div>'+body+'</div></div>';
        break;
      }
    }
  }
  var out=parts.join('<br>');
  out=out.replace(/<br>\s*(<div class="alertbox)/g,'$1');
  out=out.replace(/(<\/div><\/div>)\s*<br>/g,'$1');
  return out;
}
/* ===== v9: Sinematik kapak + Özet-önce sekmeler + içerik cilası ===== */

/* --- A) SİNEMATİK KAPAK --- */

/* --- B) ÖZET-ÖNCE SEKMELER + C) İÇERİK CİLASI --- */
function okumaSuresi(id){
  var t=(TEORI[id]||'')+(FOY[id]||'');
  var kelime=t.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2,Math.round(kelime/190));
}

function showTab(id,tab){
  const m=modById(id);
  document.querySelectorAll('#tabbar button').forEach(b=>b.classList.toggle('active',b.dataset.t===tab));
  const c=el('mtab');
  if(tab==='ozet'){
    c.innerHTML=`<div class="ozetwrap">
      <div class="ozethead"><span class="ozetic">💊</span><div><div class="ozett">Hızlı özet</div><div class="ozets">Konuyu ${Math.max(1,Math.round(okumaSuresi(id)/3))} dakikada kavra, sonra teoriye geç</div></div></div>
      <div class="edu ozetbody">${FOY[id]||'<span class="muted">Bu modülde özet yok.</span>'}</div>
      <div class="row" style="margin-top:14px"><button class="btn" onclick="showTab(${id},'teori')">📖 Teoriye geç →</button><button class="btn blue" onclick="showTab(${id},'quiz')">📝 Quiz çöz</button></div>
    </div>`;
    window.scrollTo(0,0);
  }
  else if(tab==='teori'){
    c.innerHTML=`<div class="lesson">
      <div class="lessonhead" style="border-left-color:${CATS[m.cat].c}">
        <div class="lh-ic">${m.ic}</div>
        <div><div class="lh-cat" style="color:${CATS[m.cat].c}">${CATS[m.cat].n}</div>
        <div class="lh-t">Fasikül ${m.id} — ${m.t}</div></div></div>
      <div class="metabar"><span>⏱ ≈${okumaSuresi(id)} dk okuma</span><span>📝 ${(QBANK[id]||[]).length} soru</span>${m.task?'<span>🎯 interaktif</span>':''}${DB.scores[id]!=null?`<span class="mb-ok">✅ en iyi %${DB.scores[id]}</span>`:''}</div>
      ${(ELK_ICERIK[id]||TEORI[id].indexOf('figwrap')>=0)?'':`<div class="figwrap"><div class="fighead">🔎 Şema — ${m.t}</div>${figureFor(id)}</div>`}
      <div class="edu lessonbody">${icerikSusle(TEORI[id]||'',id)}</div>
      <div class="row" style="margin-top:14px">${m.task?`<button class="btn" onclick="showTab(${id},'uygulama')">🎯 Uygulama</button>`:''}<button class="btn blue" onclick="showTab(${id},'quiz')">📝 Quiz çöz</button><button class="btn ghost" onclick="showTab(${id},'ozet')">💊 Özete dön</button></div>
    </div>`;
  }
  else if(tab==='foy') showTab(id,'ozet');
  else if(tab==='not') c.innerHTML=noteHTML(id);
  else if(tab==='quiz') startModuleQuiz(id);
  else if(tab==='uygulama'){ if(m.task && window[m.task]) window[m.task](m); else c.innerHTML='<div class="muted">Bu modülde interaktif uygulama yok.</div>'; }
}
function openModule(id){
  const m=modById(id);
  const idx=MODS.findIndex(x=>x.id===id);
  const nx=(idx>=0&&idx<MODS.length-1)?MODS[idx+1]:null;
  let tabs=[['ozet','💊 Özet'],['teori','📖 Teori']];
  if(m.task) tabs.push(['uygulama','🎯 Uygulama']);
  tabs.push(['quiz','📝 Quiz'],['not','✏️ Notlar']);
  const sc=DB.scores[id]!=null?` · En iyi: %${DB.scores[id]}`:'';
  const nextBtn = nx?`<button class="btn sm" onclick="previewNext(${nx.id})">Sıradaki: ${nx.ic} ${nx.t} →</button>`:`<button class="btn ghost sm" disabled>🎉 Son modül</button>`;
  app().innerHTML=`<div class="row" style="justify-content:space-between;align-items:center">
     <span class="breadcrumb" onclick="go('modules')">← Modüller</span>${nextBtn}</div>
   <div class="panel">
     <h2 style="margin:0">${m.ic} Modül ${m.id}: ${m.t}</h2>
     <div class="muted" style="font-size:12.5px;margin-top:3px">${CATS[m.cat].n}${sc}</div>
     <div class="tabbar" id="tabbar">${tabs.map(t=>`<button data-t="${t[0]}" onclick="showTab(${id},'${t[0]}')">${t[1]}</button>`).join('')}</div>
     <div id="mtab"></div>
     <div class="row" style="margin-top:18px;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px">
       <button class="btn ghost sm" onclick="go('modules')">← Modül listesi</button>${nextBtn}</div>
   </div>`;
  showTab(id,'ozet');
}

/* ===== v10: DÜZ METİN MODÜLLERİ İÇİN İÇERİK CİLASI ===== */
/* Modül 1-36 "<b>Terim:</b> açıklama<br>" kalıbıyla yazılmış; v9 kart sistemi
   sadece "<b style=font-size:15px>" başlıklı yeni modüllerde çalışıyordu.
   v10 bu düz metni tanım satırı / madde kartı / örnek kutusu'na çevirir. */

function _v10Denge(x){
  return (x.match(/<b/g)||[]).length === (x.match(/<\/b>/g)||[]).length;
}
/* "… Örn. 24 V ve 8 Ω → 3 A" kuyruğunu ayrı hesap kutusuna al */
function _v10Orn(s){
  var m = s.match(/^([\s\S]*?)(Örn\.\s|Örnek\s*:|Örneğin\s*[:,])\s*([\s\S]+)$/);
  if(!m) return s;
  var pre = m[1], post = m[3];
  if(!_v10Denge(pre) || !_v10Denge(post)) return s;
  var box = '<div class="exline"><span class="ex-ic">ÖRNEK</span><div>'+post+'</div></div>';
  return pre.trim().length < 6 ? box : pre + box;
}
/* Tek bir metin parçasını sınıflandır */
function _v10Parca(t){
  if(!t) return '';
  if(/^<\/?(div|img|svg|figure|table|ul|ol|p|h[1-6])\b/i.test(t)) return t;
  if(/^<div class="alertbox/.test(t)) return t;
  var d = t.match(/^<b>([^<]{2,80}?)\s*([:.?])<\/b>\s*([\s\S]+)$/);
  if(d && d[3].trim() && _v10Denge(d[3])){
    return '<div class="defrow"><div class="defterm">'+d[1]+(d[2]==='?'?'?':'')+'</div><div class="defbody">'+_v10Orn(d[3].trim())+'</div></div>';
  }
  if(/^(Örn\.|Örnek\s*:|Örneğin\s*[:,])/.test(t)){
    return '<div class="exline"><span class="ex-ic">ÖRNEK</span><div>'+t.replace(/^(Örn\.|Örnek\s*:|Örneğin\s*[:,])\s*/,'')+'</div></div>';
  }
  return '<p class="para">'+_v10Orn(t)+'</p>';
}
/* Satır satır dolaş, ardışık maddeleri tek karta topla */
function _v10Satirlar(h){
  if(!h) return h;
  var parts = h.split(/<br\s*\/?>/);
  var out = [], buf = [];
  function flush(){
    if(buf.length){
      out.push('<ul class="bulcard">'+buf.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>');
      buf = [];
    }
  }
  for(var i=0;i<parts.length;i++){
    var raw = parts[i].replace(/^[\s ]+/,'').replace(/[\s ]+$/,'');
    if(!raw) continue;
    /* başlık/tablo yer tutucularını olduğu gibi bırak, çevresini işle */
    var segs = raw.split(/(@@[HT]\d+@@)/);
    for(var k=0;k<segs.length;k++){
      var t = segs[k].replace(/^[\s ]+/,'').replace(/[\s ]+$/,'');
      if(!t) continue;
      if(/^@@[HT]\d+@@$/.test(t)){ flush(); out.push(t); continue; }
      var b = t.match(/^[•·▪◦*]\s*([\s\S]+)$/) || t.match(/^[–—]\s+([\s\S]+)$/);
      if(b){ buf.push(_v10Orn(b[1])); continue; }
      flush();
      out.push(_v10Parca(t));
    }
  }
  flush();
  return out.join('');
}

/* Formül ve birim rozetleri — sadece zaten <b> içinde olan metni dönüştürür */
function _v10Vurgu(h){
  if(!h) return h;
  h = h.replace(/<b>(\s*[A-Za-z0-9ΩΔΦηθλμ√][^<>=]{0,26}=[^<>]{1,36})<\/b>/g,'<span class="fml">$1</span>');
  h = h.replace(/<b>(\s*[\d.,]+\s?(?:mm²|kWh|kVA|kV|kW|mA|lx|Hz|°C|bar|V|A|W|Ω|%)\s*)<\/b>/g,'<span class="unit">$1</span>');
  return h;
}

/* ---- icerikSusle: v9'un yerine geçen tam sürüm ---- */
function icerikSusle(html,id){
  if(!html) return '';
  var h = html;

  /* 1) tabloları koru */
  var tbl = [];
  h = h.replace(/<table[\s\S]*?<\/table>/g, function(m){ tbl.push(m); return '@@T'+(tbl.length-1)+'@@'; });

  /* 2) büyük başlıkları yer tutucuya al */
  var heads = [];
  h = h.replace(/<b style="font-size:15px">([\s\S]*?)<\/b>/g, function(_,ic){
    heads.push(ic.replace(/^\s*(🔹\s*)?\d+\s*[).]\s*/,'').trim()); return '@@H'+(heads.length-1)+'@@';
  });

  /* 3) emoji uyarı kutuları (satır bazlı, <br> hâlâ yerinde) */
  h = alertify(h);

  /* 4) satır dönüşümü: tanım / madde / örnek / paragraf */
  h = _v10Satirlar(h);

  /* 5) başlıkları numaralı bölüm kartına çevir */
  h = h.replace(/@@H(\d+)@@/g, function(_,n){
    var i = (+n)+1;
    return '</div><div class="secbox" id="sec'+id+'_'+i+'"><div class="sechead"><span class="secno">'+i+
           '</span><span class="sectitle">'+heads[+n]+'</span></div>';
  });
  h = '<div class="secbox">'+h+'</div>';
  h = h.replace(/<div class="secbox">(?:\s|<br>|&nbsp;)*<\/div>/g,'');

  /* 6) tabloları geri koy, sar */
  h = h.replace(/@@T(\d+)@@/g, function(_,n){
    return '<div class="tblwrap">'+tbl[+n]+'</div>';
  });

  /* 7) içindekiler şeridi */
  var toc = '';
  if(heads.length > 1){
    var items = heads.map(function(x,i){
      return '<a class="tocchip" href="#sec'+id+'_'+(i+1)+'">'+(i+1)+'. '+
             x.replace(/<[^>]*>/g,'').replace(/^[^\wçğıöşüÇĞİÖŞÜ]+/,'').trim()+'</a>';
    }).join('');
    toc = '<div class="tocbar"><div class="tocbar-h">Bu bölümde</div><div class="tocchips">'+items+'</div></div>';
  }
  return toc + _v10Vurgu(h);
}

/* ---- Özet (FÖY) metnine de aynı cilayı uygula (kart sarmadan) ---- */
function foySusle(h){
  if(!h) return h;
  var tbl = [];
  h = h.replace(/<table[\s\S]*?<\/table>/g, function(m){ tbl.push(m); return '@@T'+(tbl.length-1)+'@@'; });
  h = alertify(h);
  h = _v10Satirlar(h);
  h = h.replace(/@@T(\d+)@@/g, function(_,n){ return '<div class="tblwrap">'+tbl[+n]+'</div>'; });
  return _v10Vurgu(h);
}
try{
  if(typeof FOY==='object' && FOY && !FOY.__v10){
    Object.keys(FOY).forEach(function(k){
      if(typeof FOY[k]==='string') FOY[k]=foySusle(FOY[k]);
    });
    Object.defineProperty(FOY,'__v10',{value:true,enumerable:false});
  }
}catch(e){}

/* ===== MODÜL 44: PROJE & ŞEMA OKUMA — tek hat, kumanda, pano kitapçığı ===== */
MODS.push({id:44, t:"Proje & Şema Okuma", cat:"oto", ic:"📐", d:"Tek hat, kumanda şeması, antet, sembol lejantı, klemens numaraları, yıldız-üçgen okunuşu, pano kitapçığı."});

Object.assign(DIAG,{
44:`<svg viewBox="0 0 420 230"><rect width="420" height="230" fill="#141d26"/>
<text x="210" y="16" fill="#8a98ab" font-size="10" text-anchor="middle" font-family="monospace">KUMANDA ŞEMASI OKUMA: L1 → STOP(NC) → START(NO) → BOBİN → N</text>
<line x1="40" y1="30" x2="380" y2="30" stroke="#ffb000" stroke-width="2"/><text x="20" y="34" fill="#ffb000" font-size="11">L1</text>
<line x1="40" y1="210" x2="380" y2="210" stroke="#33b1ff" stroke-width="2"/><text x="20" y="214" fill="#33b1ff" font-size="11">N</text>
<line x1="120" y1="30" x2="120" y2="55" stroke="#e8eef6" stroke-width="2"/>
<rect x="112" y="55" width="16" height="22" fill="none" stroke="#f85149" stroke-width="2"/><line x1="120" y1="55" x2="120" y2="77" stroke="#f85149" stroke-width="2"/>
<text x="140" y="70" fill="#f85149" font-size="10">F4 sigorta</text>
<line x1="120" y1="77" x2="120" y2="95" stroke="#e8eef6" stroke-width="2"/>
<line x1="120" y1="95" x2="110" y2="115" stroke="#f85149" stroke-width="2"/><line x1="106" y1="98" x2="126" y2="98" stroke="#f85149" stroke-width="2"/>
<text x="140" y="108" fill="#f85149" font-size="10">S0 STOP (NC) — basınca AÇAR</text>
<line x1="120" y1="115" x2="120" y2="132" stroke="#e8eef6" stroke-width="2"/>
<line x1="120" y1="132" x2="108" y2="152" stroke="#3fb950" stroke-width="2"/>
<text x="140" y="145" fill="#3fb950" font-size="10">S1 START (NO) — basınca KAPAR</text>
<path d="M 120 132 h 55 v 20" stroke="#8a98ab" stroke-width="1.6" fill="none"/>
<line x1="175" y1="152" x2="163" y2="170" stroke="#8a98ab" stroke-width="2"/>
<path d="M 175 172 v 8 h -55" stroke="#8a98ab" stroke-width="1.6" fill="none"/>
<text x="185" y="165" fill="#8a98ab" font-size="10">KM1 13-14 mühürleme</text>
<line x1="120" y1="152" x2="120" y2="180" stroke="#e8eef6" stroke-width="2"/>
<rect x="104" y="180" width="32" height="20" rx="3" fill="none" stroke="#33b1ff" stroke-width="2"/>
<text x="120" y="194" fill="#33b1ff" font-size="10" text-anchor="middle">KM1</text>
<text x="145" y="186" fill="#8a98ab" font-size="9">A1</text><text x="145" y="204" fill="#8a98ab" font-size="9">A2</text>
<line x1="120" y1="200" x2="120" y2="210" stroke="#e8eef6" stroke-width="2"/>
<text x="270" y="60" fill="#e8eef6" font-size="10">OKUMA SIRASI:</text>
<text x="270" y="78" fill="#8a98ab" font-size="9">1) Yukarıdan aşağı, soldan sağa</text>
<text x="270" y="93" fill="#8a98ab" font-size="9">2) Önce durduran (NC), sonra</text>
<text x="270" y="105" fill="#8a98ab" font-size="9">    çalıştıran (NO) gelir</text>
<text x="270" y="123" fill="#8a98ab" font-size="9">3) Şema HER ZAMAN enerjisiz</text>
<text x="270" y="135" fill="#8a98ab" font-size="9">    ve basılmamış hâli gösterir</text>
<text x="270" y="153" fill="#8a98ab" font-size="9">4) Mühürleme = START'a paralel</text>
<text x="270" y="165" fill="#8a98ab" font-size="9">    NO kontak (elini çekince</text>
<text x="270" y="177" fill="#8a98ab" font-size="9">    devrede tutar)</text>
</svg>`
});

Object.assign(TEORI,{
44:`<b style="font-size:15px">🔹 1) Pano Kitapçığı Nedir, İçinde Ne Var?</b><br>
Sahaya giden her panonun yanında bir <b>pano kitapçığı</b> (proje dosyası) bulunur. Panoya dokunmadan önce bu kitapçığı okumak, sahadaki en temel profesyonellik göstergesidir. İçindekiler tipik olarak şu sırayla gider:<br>
• <b>Kapak + içindekiler:</b> proje adı, pano kodu, sayfa listesi.<br>
• <b>Tek hat şeması:</b> enerjinin kaynaktan yüklere dağılımı — panonun "haritası".<br>
• <b>Güç devresi şemaları:</b> üç fazlı ana akım yolları (kontaktör ana kontakları, termik, motor).<br>
• <b>Kumanda devresi şemaları:</b> butonlar, bobinler, yardımcı kontaklar, zaman röleleri.<br>
• <b>Yerleşim (montaj) planı:</b> hangi cihaz panonun neresinde duruyor.<br>
• <b>Klemens ve kablo listesi:</b> hangi kablo hangi klemense gidiyor (X1:5 gibi).<br>
• <b>Malzeme listesi (BOM):</b> cihazların marka/model/değerleri.<br>
💡 Arıza aramada altın sıra: önce <b>tek hat</b> ile enerji yolunu kavra → sonra <b>kumanda şeması</b> ile mantığı çöz → en son <b>yerleşim planı</b> ile cihazı panoda bul.<br><br>

<b style="font-size:15px">🔹 2) Antet (Başlık Bloğu) Okuma — Sağ Alt Köşe</b><br>
Her teknik çizimin sağ alt köşesindeki kutu antettir. Küçük görünür ama hayati bilgiler taşır:<br>
<table style="border-collapse:collapse;width:100%"><tr style="background:#eef4fa"><th style="padding:6px;border:1px solid #dbe4ee">Alan</th><th style="padding:6px;border:1px solid #dbe4ee">Örnek</th><th style="padding:6px;border:1px solid #dbe4ee">Neden önemli?</th></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Çizim no (DWG NO)</b></td><td style="padding:6px;border:1px solid #dbe4ee">SD-001</td><td style="padding:6px;border:1px solid #dbe4ee">Telefonda/raporda şemayı bununla anarsın.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Sayfa (SHEET)</b></td><td style="padding:6px;border:1px solid #dbe4ee">1 OF 1</td><td style="padding:6px;border:1px solid #dbe4ee">Devrenin devamı başka sayfada olabilir — eksik sayfayla karar verme.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Revizyon</b></td><td style="padding:6px;border:1px solid #dbe4ee">Rev B</td><td style="padding:6px;border:1px solid #dbe4ee">⚠️ Eski revizyonla çalışmak sahada en sinsi hatalardan biridir; pano değişmiş, elindeki çizim eski olabilir.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Gerilim bilgileri</b></td><td style="padding:6px;border:1px solid #dbe4ee">3~ 400V 50Hz / kumanda 230V AC</td><td style="padding:6px;border:1px solid #dbe4ee">Güç ve kumanda devresinin gerilimleri farklı olabilir — ölçüme başlamadan bunu bil.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Çizen / onaylayan / tarih</b></td><td style="padding:6px;border:1px solid #dbe4ee">ENG. DEPT. · 05/2024</td><td style="padding:6px;border:1px solid #dbe4ee">Sorumluluk ve güncellik izi.</td></tr></table><br>

<b style="font-size:15px">🔹 3) Cihaz Harf Kodları — Şemadaki "İsim Soyisim"</b><br>
Şemadaki her cihazın bir harf kodu ve sıra numarası vardır. Aşağıdaki kodlar sahada yerleşik <b>klasik kullanımdır</b> (eski DIN 40719 kökenli); güncel IEC 81346-2 sınıflandırması kısmen farklıdır ama sahada ve mevcut projelerde bu tabloyu görürsün:<br>
<table style="border-collapse:collapse;width:100%"><tr style="background:#eef4fa"><th style="padding:6px;border:1px solid #dbe4ee">Kod</th><th style="padding:6px;border:1px solid #dbe4ee">Cihaz</th><th style="padding:6px;border:1px solid #dbe4ee">Örnek</th></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>Q</b></td><td style="padding:6px;border:1px solid #dbe4ee">Güç devresi anahtarlama (şalter, kesici, motor koruma şalteri)</td><td style="padding:6px;border:1px solid #dbe4ee">Q1 ana şalter</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>F</b></td><td style="padding:6px;border:1px solid #dbe4ee">Koruma elemanı (sigorta, termik, kaçak akım)</td><td style="padding:6px;border:1px solid #dbe4ee">F1-F3 güç sigortaları, F4 kumanda sigortası</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>K</b></td><td style="padding:6px;border:1px solid #dbe4ee">Kontaktör / röle ailesi. Saha geleneği: <b>KM</b> kontaktör, <b>KA</b> yardımcı röle, <b>KT</b> zaman rölesi</td><td style="padding:6px;border:1px solid #dbe4ee">KM1 ana, KT gecikme</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>S</b></td><td style="padding:6px;border:1px solid #dbe4ee">Buton, anahtar, seçici şalter</td><td style="padding:6px;border:1px solid #dbe4ee">S0 stop, S1 start</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>M</b></td><td style="padding:6px;border:1px solid #dbe4ee">Motor</td><td style="padding:6px;border:1px solid #dbe4ee">M1 3~ motor</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>T</b></td><td style="padding:6px;border:1px solid #dbe4ee">Transformatör</td><td style="padding:6px;border:1px solid #dbe4ee">T1 kumanda trafosu</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>H</b></td><td style="padding:6px;border:1px solid #dbe4ee">Sinyal elemanı (lamba, korna)</td><td style="padding:6px;border:1px solid #dbe4ee">H1 çalışıyor lambası</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>P</b></td><td style="padding:6px;border:1px solid #dbe4ee">Ölçü aleti (A-metre, V-metre, sayaç)</td><td style="padding:6px;border:1px solid #dbe4ee">P1 ampermetre</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>X</b></td><td style="padding:6px;border:1px solid #dbe4ee">Klemens grubu</td><td style="padding:6px;border:1px solid #dbe4ee">X1:5 = X1 grubunun 5. klemensi</td></tr></table>
🔧 Aynı koddan birden fazla varsa numara ayırt eder: KM1, KM2, KM3 üç ayrı kontaktördür; hepsi "kontaktör" ama görevleri şemada yazar.<br><br>

<b style="font-size:15px">🔹 4) Klemens Numaraları — Kontakların Kimliği</b><br>
Şema okumayı asıl hızlandıran şey klemens numaralarının sistemini bilmektir; ezber değil sistem:<br>
<table style="border-collapse:collapse;width:100%"><tr style="background:#eef4fa"><th style="padding:6px;border:1px solid #dbe4ee">Numara</th><th style="padding:6px;border:1px solid #dbe4ee">Anlamı</th></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>1-2, 3-4, 5-6</b></td><td style="padding:6px;border:1px solid #dbe4ee">Kontaktör/termik <b>ana (güç) kontakları</b>. Giriş tek sayı (1,3,5 → L1,L2,L3), çıkış çift sayı (2,4,6 → T1,T2,T3).</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>13-14, 23-24…</b></td><td style="padding:6px;border:1px solid #dbe4ee">Yardımcı <b>NO</b> kontak. İlk rakam kontağın sıra no'su, son iki rakamın <b>3-4</b> olması NO demektir.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>11-12, 21-22…</b></td><td style="padding:6px;border:1px solid #dbe4ee">Yardımcı <b>NC</b> kontak. Sonu <b>1-2</b> = NC.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>95-96</b></td><td style="padding:6px;border:1px solid #dbe4ee">Termik röle <b>NC</b> kontağı — kumanda beslemesine seri girer; termik atınca bobini düşürür.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>97-98</b></td><td style="padding:6px;border:1px solid #dbe4ee">Termik röle <b>NO</b> kontağı — arıza lambası/alarm için.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>A1-A2</b></td><td style="padding:6px;border:1px solid #dbe4ee">Bobin uçları. A1 faz, A2 nötr tarafı (yaygın pratik; AC bobin kutupsuzdur, <b>DC bobinde</b> ise A1(+)/A2(−) kutbuna uyulmalıdır). Bobini görünce "bu cihazı ne enerjilendiriyor?" diye A1'e gelen yolu geriye doğru izle.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee"><b>15-16 / 15-18</b></td><td style="padding:6px;border:1px solid #dbe4ee">Zaman rölesinin gecikmeli enversör kontağı: <b>15 ortak</b>, süre dolunca <b>15-16 açılır</b> (gecikmeli NC), <b>15-18 kapanır</b> (gecikmeli NO).</td></tr></table>
⚠️ <b>En kritik okuma kuralı:</b> şema her zaman devrenin <b>enerjisiz ve butonlara basılmamış</b> hâlini gösterir. "Normalde açık/kapalı" ifadesindeki "normal" budur. Çizimde açık görünen NO kontak, sahada cihaz çekiliyken kapalıdır.<br><br>

<b style="font-size:15px">🔹 5) Kumanda Şeması Okuma Yöntemi: Akımı Parmağınla Takip Et</b><br>
Kumanda şeması iki ray arasında okunur: üstte faz (L1), altta nötr (N). Her dikey kol bir "cümledir": <i>şu şartlar sağlanırsa şu bobin enerjilenir.</i><br>
• <b>1. Kural:</b> Sol üstten başla; yukarıdan aşağı, soldan sağa oku.<br>
• <b>2. Kural:</b> Bobine giden yol üzerindeki her kontak bir <b>şarttır</b>: NC'ler "engel yoksa", NO'lar "komut verilirse" demektir.<br>
• <b>3. Kural:</b> Durdurucular (stop, termik 95-96, acil stop) hep <b>seri ve NC</b>; çalıştırıcılar (start) <b>NO</b> bağlanır. Bu sayede kablo kopması motoru <b>durdurur</b>, asla başlatmaz (fail-safe).<br>
• <b>4. Kural:</b> START'a paralel bağlı NO kontak <b>mühürlemedir</b> (KM1 13-14): butondan elini çekince devreyi o tutar. Mühürleme yoksa buton bırakılınca cihaz durur — buna "yoklamalı (jog) çalışma" denir.<br>
• <b>5. Kural:</b> Bir bobin gördüğünde iki soru sor: <b>"Bunu ne çektiriyor?"</b> (A1'e gelen yol) ve <b>"Bu çekince nereleri değiştiriyor?"</b> (aynı adı taşıyan tüm kontakları şemada ara — KM1 bobini çekince şemadaki BÜTÜN KM1 kontakları konum değiştirir, sayfa farketmez).<br><br>

<b style="font-size:15px">🔹 6) Uygulamalı Okuma: Yıldız-Üçgen Yol Verici Şeması</b><br>
Klasik sınav ve saha örneği. Güç devresinde üç kontaktör: <b>KM1 (ana)</b>, <b>KM2 (yıldız)</b>, <b>KM3 (üçgen)</b>; motor 6 uçlu (U1-V1-W1 / U2-V2-W2). Amaç: motoru önce yıldızda (düşük akım) kaldırıp sonra üçgene geçirmek. Doğrudan yol vermeye göre kalkış akımı ve momenti yaklaşık <b>1/3</b>'tür. Kumanda şemasını satır satır okuyalım:<br>
• <b>Başlangıç:</b> Her şey enerjisiz. F4 sağlam, S0 (NC) kapalı, S1 (NO) açık, termik 95-96 kapalı.<br>
• <b>S1'e basınca:</b> Akım L1 → F4 → S0 → S1 yolundan geçer; <b>KT (zaman rölesi)</b> ve yıldız hattı üzerinden <b>KM2</b> çeker; KM2'nin NO kontağı üzerinden (veya doğrudan) <b>KM1</b> çeker. KM1'in <b>13-14</b> kontağı S1'i mühürler. Motor <b>yıldız</b> bağlı olarak dönmeye başlar; KT süre saymaktadır.<br>
• <b>Süre dolunca (örn. 5 s):</b> KT'nin gecikmeli kontağı konum değiştirir: <b>15-16 açılır</b> → KM2 (yıldız) düşer; <b>15-18 kapanır</b> → <b>KM3 (üçgen)</b> çeker. Motor artık üçgen bağlıdır, normal çalışmaya geçmiştir. Kaliteli yıldız-üçgen zaman röleleri, KM2 fiilen açılmadan KM3'ü çektirmemek için araya <b>kısa bir ölü zaman</b> (≈30-50 ms) koyar.<br>
• <b>Kilitleme:</b> KM2 ile KM3 <b>asla aynı anda çekmemelidir</b> — ikisi birden çekerse motor uçları üzerinden <b>fazlar arası kısa devre</b> oluşur. Bu yüzden KM2'nin NC kontağı KM3'ün bobin yoluna, KM3'ün NC kontağı KM2'nin bobin yoluna seri bağlanır (<b>elektriksel kilitleme</b>); iyi panolarda ayrıca <b>mekanik kilit</b> bulunur.<br>
• <b>S0'a basınca / termik atınca:</b> seri yol kesilir, tüm bobinler düşer, motor durur. Mühürleme de düştüğü için motor kendiliğinden tekrar kalkmaz.<br>
💡 Bu motorun etiketinde <b>Δ 400 V</b> yazmalıdır (tipik etiket: 400/690 V Δ/Y). Üçgen gerilimi şebeke gerilimine eşit olmayan motora yıldız-üçgen uygulanmaz.<br><br>

<b style="font-size:15px">🔹 7) Tek Hat Şeması Okuma: Enerjinin Haritası</b><br>
Tek hat şemasında üç fazlı sistem <b>tek çizgiyle</b> gösterilir; çizgi üzerindeki küçük eğik çizgiler iletken sayısını belirtir (⫽⫽ 3 = üç faz). Okuma yönü daima <b>kaynaktan yüke</b>:<br>
• <b>Ev/ofis panosu zinciri:</b> şebeke → sayaç → ana kesici → <b>kaçak akım rölesi (30 mA)</b> → linye otomatları (B10/B16 aydınlatma, B16 priz — 2,5 mm² tipik; C tipi motorlu yükler…). Her otomat satırında akımı, eğrisi ve beslediği linye yazar.<br>
• <b>DHMİ tarzı tesis zinciri:</b> OG hücreleri (giriş-çıkış-ölçü-koruma) → güç trafosu (34,5/0,4 kV) → AG ana dağıtım panosu (ADP) → kompanzasyon + kolon hatları → tali panolar → yükler. Jeneratör ve UPS, <b>ATS/enversör</b> üzerinden aynı şemada ayrı kaynak olarak görünür.<br>
• Hat üzerinde yazan bilgiler ciddiye alınır: kablo tipi/kesiti (örn. NYY 4×16), sigorta/kesici değeri, hat adı. Bunlar keyfî değil, <b>seçicilik ve kesit hesabının</b> sonucudur.<br>
⚠️ Arıza aramada veya enerji kesme (LOTO) öncesi tek hattan <b>TÜM kaynakları</b> listele: şebeke + jeneratör + UPS + kompanzasyon kondansatörleri. "Şalteri kapattım, enerji yok" cümlesi tek hat okunmadan kurulmaz.<br><br>

<b style="font-size:15px">🔹 8) Şemada Görürsen → Sahada Anlamı</b><br>
<table style="border-collapse:collapse;width:100%"><tr style="background:#eef4fa"><th style="padding:6px;border:1px solid #dbe4ee">Şemada gördüğün</th><th style="padding:6px;border:1px solid #dbe4ee">Sahada anlamı</th></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">Kesikli (dashed) çizgiyle birbirine bağlı kontaklar</td><td style="padding:6px;border:1px solid #dbe4ee">Mekanik bağlantı: aynı cihazın kontakları birlikte hareket eder (örn. Q1'in üç kutbu).</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">S0 sembolünde basınca <b>açılan</b> kontak</td><td style="padding:6px;border:1px solid #dbe4ee">Durdurma butonu (NC). Kırmızı ve mantar tip acil stop da bu ailedendir.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">Bobin kutusunun yanında KM1 yazan başka sayfadaki kontaklar</td><td style="padding:6px;border:1px solid #dbe4ee">Aynı kontaktörün uzaktaki kontakları — bobin çekince hepsi birlikte değişir.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">Zaman diyagramı (0 → 5s basamağı)</td><td style="padding:6px;border:1px solid #dbe4ee">Kontağın süre dolunca konum değiştireceğini gösterir; süre ayarı rölenin üzerindeki potansiyometrede.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">X1:7 etiketi</td><td style="padding:6px;border:1px solid #dbe4ee">Kablonun panoda X1 klemens grubunun 7. klemensine bağlandığı — arıza ölçümünde probu koyacağın yer.</td></tr>
<tr><td style="padding:6px;border:1px solid #dbe4ee">PE/topraklama sembolü</td><td style="padding:6px;border:1px solid #dbe4ee">Koruma iletkeni — asla anahtarlanmaz, asla sigortalanmaz.</td></tr></table><br>

<b style="font-size:15px">🔹 9) Sık Yapılan Okuma Hataları</b><br>
⚠️ Şemayı <b>enerjili durumun fotoğrafı sanmak</b> — en yaygın hata; şema enerjisiz hâli gösterir.<br>
⚠️ NO/NC ayrımını buton renginden tahmin etmek — renk değil <b>sembol ve numara</b> esas alınır.<br>
⚠️ Tek sayfada karar vermek — "SHEET 2 OF 4" yazıyorsa bobinin kontakları başka sayfada olabilir.<br>
⚠️ Revizyonu kontrol etmemek — pano tadilat görmüş, elindeki çizim eski olabilir; panodaki cep dosyasındaki son revizyonla karşılaştır.<br>
⚠️ Kumanda gerilimini varsaymak — 230 V AC yaygındır ama 24 V DC kumandalı panolar da çoktur; antetten oku.<br>
🔧 <b>Saha alışkanlığı:</b> arıza bulduğunda şemanın üzerine değil fotokopisine not al; kalıcı değişiklik yapıldıysa çizime işlenip revizyon yükseltilmeli (as-built).`
});

Object.assign(FOY,{
44:`<b>Pano kitapçığı sırası:</b> tek hat → güç → kumanda → yerleşim → klemens/kablo listesi → malzeme.<br>
<b>Antet (sağ alt):</b> çizim no · sayfa · <b>revizyon</b> · gerilimler · tarih. Eski revizyonla çalışma!<br>
<b>Harf kodları:</b> Q şalter · F koruma · KM kontaktör · KT zaman rölesi · S buton · M motor · H lamba · X klemens.<br>
<b>Numaralar:</b> 1-6 güç · sonu 3-4 = NO · sonu 1-2 = NC · 95-96 termik NC · A1-A2 bobin · 15-16/15-18 gecikmeli.<br>
<b>Altın kural:</b> şema daima <b>enerjisiz + basılmamış</b> hâli gösterir. Durduranlar seri NC, çalıştıranlar NO, mühürleme START'a paralel NO.<br>
<b>Yıldız-üçgen okunuşu:</b> S1 → KM2(Y)+KM1 çeker, KT sayar → süre dolunca 15-16 açılır KM2 düşer, 15-18 kapanır KM3(Δ) çeker. KM2↔KM3 kilitli; kalkış akımı ≈ 1/3.<br>
<b>Tek hat:</b> kaynaktan yüke oku; kesit/sigorta değerleri hattın üzerinde; LOTO öncesi TÜM kaynakları (şebeke, jeneratör, UPS, kondansatör) tek hattan say.`
});

QBANK[44]=[
{q:"Teknik çizimde antet (başlık bloğu) genellikle nerededir ve en kritik alanı hangisidir?",opts:["Sol üst; ölçek","Sağ alt; revizyon","Orta; proje adı","Sol alt; tarih"],ans:1,ex:"Antet sağ alttadır; eski revizyonla çalışmak sahada ciddi hatalara yol açar."},
{q:"Şemada 'KM3' etiketi neyi ifade eder?",opts:["3. klemens grubu","3 numaralı kontaktör","3 kutuplu şalter","3. sayfa"],ans:1,ex:"K/KM kontaktör ailesidir; sıra numarası aynı tip cihazları ayırt eder."},
{q:"Kontaktörün ana (güç) kontakları hangi numaraları taşır?",opts:["13-14, 23-24","A1-A2","1-2, 3-4, 5-6","95-96"],ans:2,ex:"Tek sayılar giriş (1,3,5), çift sayılar çıkış (2,4,6)."},
{q:"Yardımcı kontak numarasının sonu '3-4' ise kontak tipi nedir?",opts:["NC","NO","Gecikmeli NC","Enversör"],ans:1,ex:"Sonu 3-4 = NO, sonu 1-2 = NC. İlk rakam sıra numarasıdır (13-14, 23-24…)."},
{q:"95-96 numaralı kontak neye aittir ve nasıl bağlanır?",opts:["Zaman rölesi NO; paralel","Termik röle NC; kumanda beslemesine seri","Bobin uçları","Ana kontak"],ans:1,ex:"Termik atınca 95-96 açılır ve kumanda devresini keserek bobini düşürür."},
{q:"A1-A2 uçları neyi gösterir?",opts:["Ana kontakları","Bobin uçlarını","Mühürleme kontağını","Klemens grubunu"],ans:1,ex:"A1-A2 bobindir. Bobini görünce A1'e gelen yolu geriye izle: 'bunu ne çektiriyor?'"},
{q:"Şemalar devrenin hangi hâlini gösterir?",opts:["Enerjili, çalışır hâlini","Enerjisiz ve butonlara basılmamış hâlini","Arızalı hâlini","Tam yük hâlini"],ans:1,ex:"'Normalde açık/kapalı'daki normal budur. NO kontak sahada cihaz çekiliyken kapalıdır."},
{q:"Stop butonları ve termik kontağı neden seri + NC bağlanır?",opts:["Daha az kablo için","Kablo kopunca devre dursun diye (fail-safe)","Estetik için","Akımı artırmak için"],ans:1,ex:"NC seri durdurucularda kopukluk = durdurma. Kopan kablo asla motoru başlatamaz."},
{q:"START butonuna paralel bağlanan KM1 13-14 kontağının görevi nedir?",opts:["Kilitleme","Mühürleme — butondan el çekilince devreyi tutmak","Sinyal verme","Termik koruma"],ans:1,ex:"Mühürleme yoksa buton bırakılınca bobin düşer (yoklamalı/jog çalışma)."},
{q:"Yıldız-üçgen yol vermede kalkış akımı doğrudan yol vermeye göre yaklaşık kaçtır?",opts:["Yarısı","1/3'ü","2 katı","Aynı"],ans:1,ex:"Yıldızda sargılara faz gerilimi (400/√3=230 V) uygulanır; şebekeden çekilen akım ve moment ≈ 1/3'tür."},
{q:"Yıldız-üçgen şemasında süre dolunca zaman rölesinde ne olur?",opts:["15-18 açılır, 15-16 kapanır","15-16 açılır (KM2 düşer), 15-18 kapanır (KM3 çeker)","A1-A2 kısa devre olur","95-96 açılır"],ans:1,ex:"15 ortaktır: gecikmeli NC (15-16) açılır, gecikmeli NO (15-18) kapanır; yıldızdan üçgene geçilir."},
{q:"KM2 (yıldız) ile KM3 (üçgen) aynı anda çekerse ne olur?",opts:["Motor hızlanır","Fazlar arası kısa devre oluşur","Sadece termik atar","Hiçbir şey olmaz"],ans:1,ex:"Bu yüzden karşılıklı NC kontaklarla elektriksel kilitleme + mümkünse mekanik kilit şarttır."},
{q:"Tek hat şeması nasıl okunur?",opts:["Yükten kaynağa","Kaynaktan yüke doğru","Sağdan sola","Alfabetik"],ans:1,ex:"Enerji akış yönünde: şebeke → sayaç/trafo → ana pano → tali panolar → yükler."},
{q:"LOTO (etiketle-kilitle) öncesi tek hat şemasından ne çıkarılır?",opts:["Kablo renkleri","Devreyi besleyebilecek TÜM kaynaklar","Pano ölçüleri","Marka listesi"],ans:1,ex:"Şebeke + jeneratör + UPS + kondansatörler… Tek kaynağı kesip 'enerji yok' demek en tehlikeli varsayımdır."},
{q:"Şemada kontaklar arasındaki kesikli (dashed) çizgi neyi gösterir?",opts:["Arızalı hattı","Mekanik bağlantıyı — kontakların birlikte hareket ettiğini","Toprak hattını","İptal edilmiş devreyi"],ans:1,ex:"Örn. Q1 şalterinin üç kutbu tek kolla birlikte açılıp kapanır."}
];

/* Saha Programı Aşama 4'e ekle (Pano & Otomasyon'un başına) */
try{ if(typeof PROGRAM!=='undefined' && PROGRAM[3] && PROGRAM[3].mods.indexOf(44)===-1) PROGRAM[3].mods.unshift(44); }catch(e){}
/* v10 özet cilası bu modülden önce çalıştıysa, 44'ün özetini de işle */
try{ if(typeof foySusle==='function') FOY[44]=foySusle(FOY[44]); }catch(e){}

/* ===== v11: KİTAP KAPAĞI (SPLIT) — renderKapak yeniden tanım ===== */
var KAPAK_IMG = "https://d8j0ntlcm91z4.cloudfront.net/user_3GAM4t5LIrVnoytOwhQqVixxnvj/hf_20260712_131403_d8ee47d8-260d-4f6e-9bf1-9858c3e24981.png";
function renderKapak(){
  document.querySelectorAll('#nav button').forEach(b=>b.classList.remove('active'));
  var b=document.querySelector('#nav button[data-v="kapak"]'); if(b) b.classList.add('active');
  var toplamSoru=Object.values(QBANK).reduce(function(a,x){return a+x.length;},0);
  var bitti=MODS.filter(function(m){return (DB.scores[m.id]||0)>=70;}).length;
  app().innerHTML='<div class="bk">'+
    '<div class="bk-left">'+
      '<div class="bk-kick">DHMİ · Elektrik Uzmanlık Akademisi</div>'+
      '<div class="bk-rule"></div>'+
      '<h1 class="bk-title">ELK<br><em>MASTER</em></h1>'+
      '<p class="bk-sub">Sıfırdan saha ustalığına: teori, uygulama, şema okuma ve MYK provası — hepsi tek kitapta.</p>'+
      '<div class="bk-stats">'+
        '<div class="bk-stat"><b>'+MODS.length+'</b><span>modül</span></div>'+
        '<div class="bk-stat"><b>'+toplamSoru+'</b><span>soru</span></div>'+
        '<div class="bk-stat"><b>'+Object.keys(CATS).length+'</b><span>bölüm</span></div>'+
        (bitti?'<div class="bk-stat done"><b>'+bitti+'</b><span>bitti</span></div>':'<div class="bk-stat"><b>7</b><span>aşama</span></div>')+
      '</div>'+
      '<div class="bk-cta">'+
        '<button class="btn bk-btn" onclick="go(\'onsoz\')">📖 Kitabı aç</button>'+
        '<button class="btn bk-btn bk-btn2" onclick="go(\'program\')">🎓 Saha programı</button>'+
      '</div>'+
      '<div class="bk-edition">3. baskı · güncel: 44 modül · tek hat & kumanda şeması okuma dahil</div>'+
    '</div>'+
    '<div class="bk-right">'+
      '<img class="bk-img" src="'+KAPAK_IMG+'" alt="Saha görseli" loading="eager">'+
      '<div class="bk-tag">Saha · Pano · MYK</div>'+
    '</div>'+
  '</div>';
}

/* ===== MODÜL 44 GÖRSEL PAKETİ: bölümlere gömülü statik SVG çizimler ===== */
(function(){
if(typeof TEORI==='undefined' || !TEORI[44]) return;
if(TEORI[44].indexOf('sema-fig-1')>=0) return;

function F(no,baslik,svg){
  return '<div class="figwrap sema-fig-'+no+'"><div class="fighead">🔎 Şema '+no+' — '+baslik+'</div>'+
         '<figure class="fig" style="margin:0;border:none;border-radius:0">'+svg+'</figure></div>';
}

/* ---------- 1) ANTET ---------- */
var A = F(1,'Antet (başlık bloğu) — hangi kutuda ne yazar',
'<svg viewBox="0 0 460 200"><rect width="460" height="200" fill="#141d26"/>'+
'<rect x="14" y="14" width="290" height="172" fill="none" stroke="#3a4b5c" stroke-width="1"/>'+
'<text x="40" y="60" fill="#43566a" font-size="10">( çizim alanı )</text>'+
'<rect x="150" y="118" width="152" height="66" fill="#1c2836" stroke="#8a98ab" stroke-width="1.4"/>'+
'<line x1="150" y1="134" x2="302" y2="134" stroke="#8a98ab" stroke-width="0.8"/>'+
'<line x1="150" y1="152" x2="302" y2="152" stroke="#8a98ab" stroke-width="0.8"/>'+
'<line x1="150" y1="168" x2="302" y2="168" stroke="#8a98ab" stroke-width="0.8"/>'+
'<line x1="226" y1="152" x2="226" y2="184" stroke="#8a98ab" stroke-width="0.8"/>'+
'<text x="156" y="130" fill="#e8eef6" font-size="8.5">YILDIZ-ÜÇGEN YOL VERİCİ</text>'+
'<text x="156" y="147" fill="#8a98ab" font-size="7.5">GÜÇ 3~400V 50Hz / KUMANDA 230V</text>'+
'<text x="156" y="164" fill="#ffb000" font-size="7.5">DWG: SD-001</text>'+
'<text x="232" y="164" fill="#3fb950" font-size="7.5">REV: B</text>'+
'<text x="156" y="180" fill="#8a98ab" font-size="7.5">SHEET 1/4</text>'+
'<text x="232" y="180" fill="#8a98ab" font-size="7.5">05/2024</text>'+
'<line x1="316" y1="126" x2="306" y2="128" stroke="#e8eef6" stroke-width="1"/><polygon points="304,128 312,124 312,132" fill="#e8eef6"/>'+
'<text x="320" y="129" fill="#e8eef6" font-size="9">Neyin şeması</text>'+
'<line x1="316" y1="145" x2="306" y2="145" stroke="#33b1ff" stroke-width="1"/><polygon points="304,145 312,141 312,149" fill="#33b1ff"/>'+
'<text x="320" y="148" fill="#33b1ff" font-size="9">Gerilimler — ölçümden önce oku</text>'+
'<line x1="316" y1="162" x2="306" y2="162" stroke="#ffb000" stroke-width="1"/><polygon points="304,162 312,158 312,166" fill="#ffb000"/>'+
'<text x="320" y="165" fill="#ffb000" font-size="9">Çizim no — telefonda bunu söyle</text>'+
'<line x1="316" y1="179" x2="306" y2="179" stroke="#f85149" stroke-width="1"/><polygon points="304,179 312,175 312,183" fill="#f85149"/>'+
'<text x="320" y="176" fill="#3fb950" font-size="9">REV — pano değişmiş olabilir!</text>'+
'<text x="320" y="188" fill="#8a98ab" font-size="8">SHEET: devamı var mı?</text>'+
'<text x="20" y="196" fill="#43566a" font-size="8">Antet daima SAĞ ALT köşededir</text>'+
'</svg>');

/* ---------- 2) SEMBOL LEJANTI ---------- */
function sym(x,y,label,inner){
  return '<g><rect x="'+x+'" y="'+y+'" width="104" height="62" fill="#1a2532" stroke="#2e3f50" stroke-width="1" rx="4"/>'+
         inner+'<text x="'+(x+52)+'" y="'+(y+56)+'" fill="#8a98ab" font-size="8" text-anchor="middle">'+label+'</text></g>';
}
var B = F(2,'Sık kullanılan devre sembolleri',
'<svg viewBox="0 0 460 210"><rect width="460" height="210" fill="#141d26"/>'+
sym(14,10,'Q1 · Şalter (3 kutuplu)',
 '<g stroke="#33b1ff" stroke-width="1.6" fill="none">'+
 '<line x1="36" y1="20" x2="36" y2="28"/><line x1="36" y1="28" x2="30" y2="42"/><line x1="36" y1="44" x2="36" y2="50"/>'+
 '<line x1="52" y1="20" x2="52" y2="28"/><line x1="52" y1="28" x2="46" y2="42"/><line x1="52" y1="44" x2="52" y2="50"/>'+
 '<line x1="68" y1="20" x2="68" y2="28"/><line x1="68" y1="28" x2="62" y2="42"/><line x1="68" y1="44" x2="68" y2="50"/></g>'+
 '<line x1="26" y1="36" x2="76" y2="30" stroke="#5b6f84" stroke-width="1" stroke-dasharray="3 2"/>')+
sym(128,10,'F · Sigorta',
 '<line x1="180" y1="18" x2="180" y2="26" stroke="#f85149" stroke-width="1.6"/>'+
 '<rect x="173" y="26" width="14" height="20" fill="none" stroke="#f85149" stroke-width="1.6"/>'+
 '<line x1="180" y1="26" x2="180" y2="46" stroke="#f85149" stroke-width="1.6"/>'+
 '<line x1="180" y1="46" x2="180" y2="52" stroke="#f85149" stroke-width="1.6"/>')+
sym(242,10,'KM · Kontaktör bobini',
 '<line x1="294" y1="18" x2="294" y2="26" stroke="#33b1ff" stroke-width="1.6"/>'+
 '<rect x="278" y="26" width="32" height="20" fill="none" stroke="#33b1ff" stroke-width="1.8" rx="2"/>'+
 '<line x1="294" y1="46" x2="294" y2="52" stroke="#33b1ff" stroke-width="1.6"/>'+
 '<text x="316" y="32" fill="#5b6f84" font-size="7">A1</text><text x="316" y="48" fill="#5b6f84" font-size="7">A2</text>')+
sym(356,10,'M · Motor 3~',
 '<circle cx="408" cy="34" r="15" fill="none" stroke="#3fb950" stroke-width="1.8"/>'+
 '<text x="408" y="32" fill="#3fb950" font-size="9" text-anchor="middle">M</text>'+
 '<text x="408" y="42" fill="#3fb950" font-size="8" text-anchor="middle">3~</text>')+
sym(14,80,'Kontak NO (13-14)',
 '<line x1="66" y1="88" x2="66" y2="98" stroke="#3fb950" stroke-width="1.8"/>'+
 '<line x1="66" y1="98" x2="56" y2="116" stroke="#3fb950" stroke-width="1.8"/>'+
 '<line x1="66" y1="118" x2="66" y2="126" stroke="#3fb950" stroke-width="1.8"/>')+
sym(128,80,'Kontak NC (11-12)',
 '<line x1="180" y1="88" x2="180" y2="98" stroke="#f85149" stroke-width="1.8"/>'+
 '<line x1="180" y1="98" x2="170" y2="116" stroke="#f85149" stroke-width="1.8"/>'+
 '<line x1="166" y1="100" x2="186" y2="100" stroke="#f85149" stroke-width="1.8"/>'+
 '<line x1="180" y1="118" x2="180" y2="126" stroke="#f85149" stroke-width="1.8"/>')+
sym(242,80,'S · Buton (start / stop)',
 '<line x1="294" y1="88" x2="294" y2="98" stroke="#ffb000" stroke-width="1.8"/>'+
 '<line x1="294" y1="98" x2="284" y2="114" stroke="#ffb000" stroke-width="1.8"/>'+
 '<line x1="294" y1="118" x2="294" y2="126" stroke="#ffb000" stroke-width="1.8"/>'+
 '<rect x="298" y="92" width="7" height="10" fill="#ffb000"/><line x1="301" y1="102" x2="301" y2="110" stroke="#ffb000" stroke-width="1.2"/>')+
sym(356,80,'F · Termik röle',
 '<rect x="392" y="90" width="32" height="26" fill="none" stroke="#ffb000" stroke-width="1.6" rx="2"/>'+
 '<path d="M 396 110 q 6 -12 12 0 q 6 12 12 0" fill="none" stroke="#ffb000" stroke-width="1.6"/>'+
 '<line x1="408" y1="84" x2="408" y2="90" stroke="#ffb000" stroke-width="1.6"/>'+
 '<line x1="408" y1="116" x2="408" y2="124" stroke="#ffb000" stroke-width="1.6"/>')+
'<text x="230" y="204" fill="#5b6f84" font-size="8.5" text-anchor="middle">Yeşil = normalde açık (NO) · Kırmızı = normalde kapalı (NC)</text>'+
'</svg>');

/* ---------- 3) KLEMENS HARİTASI ---------- */
var C = F(3,'Kontaktör ve termik röle üzerindeki klemens numaraları',
'<svg viewBox="0 0 460 240"><rect width="460" height="240" fill="#141d26"/>'+
'<text x="115" y="20" fill="#e8eef6" font-size="10" text-anchor="middle">KONTAKTÖR (KM1)</text>'+
'<rect x="52" y="34" width="126" height="150" fill="#1c2836" stroke="#33b1ff" stroke-width="1.8" rx="4"/>'+
'<text x="115" y="62" fill="#33b1ff" font-size="13" text-anchor="middle" font-weight="bold">KM1</text>'+
'<line x1="70" y1="20" x2="70" y2="34" stroke="#ffb000" stroke-width="2"/><text x="63" y="31" fill="#ffb000" font-size="9">1</text>'+
'<line x1="96" y1="20" x2="96" y2="34" stroke="#ffb000" stroke-width="2"/><text x="89" y="31" fill="#ffb000" font-size="9">3</text>'+
'<line x1="122" y1="20" x2="122" y2="34" stroke="#ffb000" stroke-width="2"/><text x="115" y="31" fill="#ffb000" font-size="9">5</text>'+
'<line x1="70" y1="184" x2="70" y2="198" stroke="#3fb950" stroke-width="2"/><text x="63" y="196" fill="#3fb950" font-size="9">2</text>'+
'<line x1="96" y1="184" x2="96" y2="198" stroke="#3fb950" stroke-width="2"/><text x="89" y="196" fill="#3fb950" font-size="9">4</text>'+
'<line x1="122" y1="184" x2="122" y2="198" stroke="#3fb950" stroke-width="2"/><text x="115" y="196" fill="#3fb950" font-size="9">6</text>'+
'<text x="115" y="212" fill="#8a98ab" font-size="8.5" text-anchor="middle">GÜÇ: tek sayı giriş · çift sayı çıkış</text>'+
'<line x1="178" y1="60" x2="192" y2="60" stroke="#e8eef6" stroke-width="1.4"/><text x="196" y="58" fill="#e8eef6" font-size="9">A1 — bobin (+faz)</text>'+
'<line x1="178" y1="86" x2="192" y2="86" stroke="#e8eef6" stroke-width="1.4"/><text x="196" y="84" fill="#e8eef6" font-size="9">A2 — bobin (nötr)</text>'+
'<line x1="178" y1="118" x2="192" y2="118" stroke="#3fb950" stroke-width="1.4"/><text x="196" y="116" fill="#3fb950" font-size="9">13-14 yardımcı NO (mühürleme)</text>'+
'<line x1="178" y1="148" x2="192" y2="148" stroke="#f85149" stroke-width="1.4"/><text x="196" y="146" fill="#f85149" font-size="9">21-22 yardımcı NC (kilitleme)</text>'+
'<text x="196" y="168" fill="#5b6f84" font-size="8.5">Kural: son iki rakam 3-4 = NO</text>'+
'<text x="196" y="181" fill="#5b6f84" font-size="8.5">          son iki rakam 1-2 = NC</text>'+
'<line x1="14" y1="222" x2="446" y2="222" stroke="#2e3f50" stroke-width="1"/>'+
'<text x="20" y="236" fill="#ffb000" font-size="9">TERMİK RÖLE:</text>'+
'<text x="106" y="236" fill="#f85149" font-size="9">95-96 = NC (kumandayı keser)</text>'+
'<text x="286" y="236" fill="#3fb950" font-size="9">97-98 = NO (alarm lambası)</text>'+
'</svg>');

/* ---------- 4) NO/NC "NORMAL" DURUM ---------- */
var D = F(4,'"Normalde" ne demek — enerjisiz hâl vs. çekili hâl',
'<svg viewBox="0 0 460 190"><rect width="460" height="190" fill="#141d26"/>'+
'<rect x="12" y="10" width="212" height="170" fill="#182430" stroke="#2e3f50" rx="6"/>'+
'<rect x="236" y="10" width="212" height="170" fill="#182430" stroke="#2e3f50" rx="6"/>'+
'<text x="118" y="30" fill="#e8eef6" font-size="10" text-anchor="middle">ŞEMADA GÖRDÜĞÜN (enerjisiz)</text>'+
'<text x="342" y="30" fill="#3fb950" font-size="10" text-anchor="middle">SAHADA (bobin çekili)</text>'+
'<text x="60" y="56" fill="#3fb950" font-size="9">NO 13-14</text>'+
'<line x1="70" y1="64" x2="70" y2="76" stroke="#3fb950" stroke-width="2"/>'+
'<line x1="70" y1="76" x2="58" y2="96" stroke="#3fb950" stroke-width="2"/>'+
'<line x1="70" y1="98" x2="70" y2="110" stroke="#3fb950" stroke-width="2"/>'+
'<text x="46" y="126" fill="#8a98ab" font-size="8.5">AÇIK — akım geçmez</text>'+
'<text x="152" y="56" fill="#f85149" font-size="9">NC 21-22</text>'+
'<line x1="166" y1="64" x2="166" y2="76" stroke="#f85149" stroke-width="2"/>'+
'<line x1="166" y1="76" x2="154" y2="96" stroke="#f85149" stroke-width="2"/>'+
'<line x1="150" y1="78" x2="172" y2="78" stroke="#f85149" stroke-width="2"/>'+
'<line x1="166" y1="98" x2="166" y2="110" stroke="#f85149" stroke-width="2"/>'+
'<text x="140" y="126" fill="#8a98ab" font-size="8.5">KAPALI — akım geçer</text>'+
'<text x="284" y="56" fill="#3fb950" font-size="9">NO 13-14</text>'+
'<line x1="294" y1="64" x2="294" y2="110" stroke="#3fb950" stroke-width="2.6"/>'+
'<circle cx="294" cy="87" r="3" fill="#3fb950"/>'+
'<text x="268" y="126" fill="#3fb950" font-size="8.5">KAPANDI — akım geçer</text>'+
'<text x="376" y="56" fill="#f85149" font-size="9">NC 21-22</text>'+
'<line x1="390" y1="64" x2="390" y2="76" stroke="#f85149" stroke-width="2"/>'+
'<line x1="390" y1="76" x2="376" y2="98" stroke="#f85149" stroke-width="2"/>'+
'<line x1="390" y1="100" x2="390" y2="110" stroke="#f85149" stroke-width="2"/>'+
'<text x="360" y="126" fill="#f85149" font-size="8.5">AÇILDI — akım kesildi</text>'+
'<text x="230" y="160" fill="#ffb000" font-size="9.5" text-anchor="middle">Şema her zaman SOL taraftaki hâli çizer.</text>'+
'<text x="230" y="174" fill="#8a98ab" font-size="8.5" text-anchor="middle">Panoda kontağı ölçerken cihazın çekili olup olmadığına bak.</text>'+
'</svg>');

/* ---------- 5) MÜHÜRLEME VAR / YOK ---------- */
var E = F(5,'Mühürleme kontağı olmazsa ne olur',
'<svg viewBox="0 0 460 220"><rect width="460" height="220" fill="#141d26"/>'+
'<text x="112" y="18" fill="#f85149" font-size="10" text-anchor="middle">MÜHÜRLEME YOK (jog)</text>'+
'<text x="342" y="18" fill="#3fb950" font-size="10" text-anchor="middle">MÜHÜRLEME VAR</text>'+
'<line x1="24" y1="30" x2="200" y2="30" stroke="#ffb000" stroke-width="1.6"/><text x="10" y="34" fill="#ffb000" font-size="8">L1</text>'+
'<line x1="24" y1="196" x2="200" y2="196" stroke="#33b1ff" stroke-width="1.6"/><text x="10" y="200" fill="#33b1ff" font-size="8">N</text>'+
'<line x1="90" y1="30" x2="90" y2="66" stroke="#e8eef6" stroke-width="1.6"/>'+
'<line x1="90" y1="66" x2="80" y2="86" stroke="#ffb000" stroke-width="1.8"/>'+
'<text x="100" y="80" fill="#ffb000" font-size="8.5">S1 START</text>'+
'<line x1="90" y1="88" x2="90" y2="140" stroke="#e8eef6" stroke-width="1.6"/>'+
'<rect x="74" y="140" width="32" height="20" fill="none" stroke="#33b1ff" stroke-width="1.8" rx="2"/>'+
'<text x="90" y="154" fill="#33b1ff" font-size="9" text-anchor="middle">KM1</text>'+
'<line x1="90" y1="160" x2="90" y2="196" stroke="#e8eef6" stroke-width="1.6"/>'+
'<text x="112" y="180" fill="#f85149" font-size="8.5">Elini çekersen</text>'+
'<text x="112" y="191" fill="#f85149" font-size="8.5">motor DURUR</text>'+
'<line x1="254" y1="30" x2="440" y2="30" stroke="#ffb000" stroke-width="1.6"/><text x="240" y="34" fill="#ffb000" font-size="8">L1</text>'+
'<line x1="254" y1="196" x2="440" y2="196" stroke="#33b1ff" stroke-width="1.6"/><text x="240" y="200" fill="#33b1ff" font-size="8">N</text>'+
'<line x1="320" y1="30" x2="320" y2="66" stroke="#e8eef6" stroke-width="1.6"/>'+
'<line x1="320" y1="66" x2="310" y2="86" stroke="#ffb000" stroke-width="1.8"/>'+
'<text x="330" y="62" fill="#ffb000" font-size="8.5">S1</text>'+
'<line x1="320" y1="88" x2="320" y2="140" stroke="#e8eef6" stroke-width="1.6"/>'+
'<path d="M 320 66 h 58 v 20" stroke="#3fb950" stroke-width="1.5" fill="none"/>'+
'<line x1="378" y1="86" x2="368" y2="104" stroke="#3fb950" stroke-width="1.8"/>'+
'<path d="M 378 106 v 14 h -58" stroke="#3fb950" stroke-width="1.5" fill="none"/>'+
'<text x="386" y="100" fill="#3fb950" font-size="8">KM1</text>'+
'<text x="386" y="111" fill="#3fb950" font-size="8">13-14</text>'+
'<rect x="304" y="140" width="32" height="20" fill="none" stroke="#33b1ff" stroke-width="1.8" rx="2"/>'+
'<text x="320" y="154" fill="#33b1ff" font-size="9" text-anchor="middle">KM1</text>'+
'<line x1="320" y1="160" x2="320" y2="196" stroke="#e8eef6" stroke-width="1.6"/>'+
'<text x="342" y="180" fill="#3fb950" font-size="8.5">Elini çeksen de</text>'+
'<text x="342" y="191" fill="#3fb950" font-size="8.5">motor ÇALIŞIR</text>'+
'<text x="230" y="214" fill="#8a98ab" font-size="8.5" text-anchor="middle">Mühürleme = START butonuna PARALEL bağlı NO yardımcı kontak</text>'+
'</svg>');

/* ---------- 6) YILDIZ-ÜÇGEN PAFTASI ---------- */
var G = F(6,'Yıldız-üçgen yol verici — güç devresi, kumanda devresi ve zaman',
'<svg viewBox="0 0 680 430"><rect width="680" height="430" fill="#141d26"/>'+
'<text x="14" y="18" fill="#8a98ab" font-size="10" font-family="monospace">GÜÇ DEVRESİ 3~400V</text>'+
'<line x1="330" y1="8" x2="330" y2="424" stroke="#2e3f50" stroke-width="1"/>'+
'<text x="346" y="18" fill="#8a98ab" font-size="10" font-family="monospace">KUMANDA DEVRESİ 230V</text>'+
'<text x="40" y="34" fill="#ffb000" font-size="9">L1</text><text x="72" y="34" fill="#ffb000" font-size="9">L2</text><text x="104" y="34" fill="#ffb000" font-size="9">L3</text>'+
'<line x1="44" y1="38" x2="44" y2="70" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="76" y1="38" x2="76" y2="70" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="108" y1="38" x2="108" y2="70" stroke="#ffb000" stroke-width="1.6"/>'+
'<rect x="30" y="70" width="92" height="22" fill="none" stroke="#f85149" stroke-width="1.4"/>'+
'<text x="130" y="85" fill="#f85149" font-size="8.5">F1-F3 sigortalar</text>'+
'<line x1="44" y1="92" x2="44" y2="118" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="76" y1="92" x2="76" y2="118" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="108" y1="92" x2="108" y2="118" stroke="#ffb000" stroke-width="1.6"/>'+
'<rect x="30" y="118" width="92" height="24" fill="#1c2836" stroke="#33b1ff" stroke-width="1.6" rx="3"/>'+
'<text x="76" y="134" fill="#33b1ff" font-size="10" text-anchor="middle">KM1 ana</text>'+
'<line x1="44" y1="142" x2="44" y2="168" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="76" y1="142" x2="76" y2="168" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="108" y1="142" x2="108" y2="168" stroke="#ffb000" stroke-width="1.6"/>'+
'<rect x="30" y="168" width="92" height="22" fill="none" stroke="#ffb000" stroke-width="1.4"/>'+
'<text x="130" y="183" fill="#ffb000" font-size="8.5">Termik (95-96)</text>'+
'<line x1="44" y1="190" x2="44" y2="232" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="76" y1="190" x2="76" y2="232" stroke="#ffb000" stroke-width="1.6"/>'+
'<line x1="108" y1="190" x2="108" y2="232" stroke="#ffb000" stroke-width="1.6"/>'+
'<rect x="24" y="232" width="104" height="46" fill="#1c2836" stroke="#3fb950" stroke-width="1.4" rx="3"/>'+
'<text x="44" y="246" fill="#3fb950" font-size="8">U1</text><text x="72" y="246" fill="#3fb950" font-size="8">V1</text><text x="100" y="246" fill="#3fb950" font-size="8">W1</text>'+
'<text x="44" y="272" fill="#3fb950" font-size="8">U2</text><text x="72" y="272" fill="#3fb950" font-size="8">V2</text><text x="100" y="272" fill="#3fb950" font-size="8">W2</text>'+
'<circle cx="76" cy="304" r="18" fill="none" stroke="#3fb950" stroke-width="1.8"/>'+
'<text x="76" y="302" fill="#3fb950" font-size="10" text-anchor="middle">M</text>'+
'<text x="76" y="313" fill="#3fb950" font-size="8" text-anchor="middle">3~</text>'+
'<rect x="176" y="232" width="80" height="24" fill="#1c2836" stroke="#7fd8ff" stroke-width="1.6" rx="3"/>'+
'<text x="216" y="248" fill="#7fd8ff" font-size="9" text-anchor="middle">KM2 yıldız</text>'+
'<line x1="128" y1="244" x2="176" y2="244" stroke="#5b6f84" stroke-width="1.2"/>'+
'<line x1="216" y1="256" x2="216" y2="278" stroke="#7fd8ff" stroke-width="1.4"/>'+
'<line x1="196" y1="278" x2="236" y2="278" stroke="#7fd8ff" stroke-width="2"/>'+
'<text x="242" y="282" fill="#7fd8ff" font-size="8">U2-V2-W2 kısa devre</text>'+
'<rect x="176" y="300" width="80" height="24" fill="#1c2836" stroke="#ff9d5c" stroke-width="1.6" rx="3"/>'+
'<text x="216" y="316" fill="#ff9d5c" font-size="9" text-anchor="middle">KM3 üçgen</text>'+
'<line x1="128" y1="312" x2="176" y2="312" stroke="#5b6f84" stroke-width="1.2"/>'+
'<text x="150" y="340" fill="#ff9d5c" font-size="8">U1-V2 · V1-W2 · W1-U2</text>'+
'<line x1="352" y1="34" x2="664" y2="34" stroke="#ffb000" stroke-width="1.6"/><text x="340" y="38" fill="#ffb000" font-size="8">L1</text>'+
'<line x1="352" y1="404" x2="664" y2="404" stroke="#33b1ff" stroke-width="1.6"/><text x="340" y="408" fill="#33b1ff" font-size="8">N</text>'+
'<line x1="392" y1="34" x2="392" y2="52" stroke="#e8eef6" stroke-width="1.5"/>'+
'<rect x="385" y="52" width="14" height="18" fill="none" stroke="#f85149" stroke-width="1.5"/><line x1="392" y1="52" x2="392" y2="70" stroke="#f85149" stroke-width="1.5"/>'+
'<text x="406" y="65" fill="#f85149" font-size="8">F4</text>'+
'<line x1="392" y1="70" x2="392" y2="86" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="392" y1="86" x2="380" y2="104" stroke="#f85149" stroke-width="1.8"/><line x1="376" y1="88" x2="398" y2="88" stroke="#f85149" stroke-width="1.8"/>'+
'<text x="406" y="100" fill="#f85149" font-size="8">S0 STOP (NC)</text>'+
'<line x1="392" y1="106" x2="392" y2="122" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="392" y1="122" x2="380" y2="140" stroke="#3fb950" stroke-width="1.8"/>'+
'<text x="406" y="136" fill="#3fb950" font-size="8">S1 START (NO)</text>'+
'<path d="M 392 122 h 62 v 20" stroke="#3fb950" stroke-width="1.3" fill="none"/>'+
'<line x1="454" y1="142" x2="444" y2="158" stroke="#3fb950" stroke-width="1.6"/>'+
'<path d="M 454 160 v 12 h -62" stroke="#3fb950" stroke-width="1.3" fill="none"/>'+
'<text x="462" y="155" fill="#3fb950" font-size="7.5">KM1 13-14</text>'+
'<line x1="392" y1="142" x2="392" y2="176" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="392" y1="176" x2="380" y2="192" stroke="#ffb000" stroke-width="1.8"/><line x1="376" y1="178" x2="398" y2="178" stroke="#ffb000" stroke-width="1.8"/>'+
'<text x="406" y="190" fill="#ffb000" font-size="8">Termik 95-96</text>'+
'<line x1="392" y1="194" x2="392" y2="214" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="392" y1="214" x2="620" y2="214" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="392" y1="214" x2="392" y2="248" stroke="#e8eef6" stroke-width="1.5"/>'+
'<circle cx="392" cy="262" r="14" fill="none" stroke="#c9a0ff" stroke-width="1.8"/>'+
'<line x1="392" y1="255" x2="392" y2="262" stroke="#c9a0ff" stroke-width="1.4"/><line x1="392" y1="262" x2="398" y2="266" stroke="#c9a0ff" stroke-width="1.4"/>'+
'<text x="392" y="292" fill="#c9a0ff" font-size="8.5" text-anchor="middle">KT 5 s</text>'+
'<line x1="392" y1="276" x2="392" y2="404" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="486" y1="214" x2="486" y2="240" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="486" y1="240" x2="474" y2="256" stroke="#c9a0ff" stroke-width="1.8"/><line x1="470" y1="242" x2="492" y2="242" stroke="#c9a0ff" stroke-width="1.8"/>'+
'<text x="496" y="252" fill="#c9a0ff" font-size="7.5">KT 15-16</text>'+
'<line x1="486" y1="258" x2="486" y2="284" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="486" y1="284" x2="474" y2="300" stroke="#ff9d5c" stroke-width="1.8"/><line x1="470" y1="286" x2="492" y2="286" stroke="#ff9d5c" stroke-width="1.8"/>'+
'<text x="496" y="296" fill="#ff9d5c" font-size="7.5">KM3 21-22</text>'+
'<line x1="486" y1="302" x2="486" y2="336" stroke="#e8eef6" stroke-width="1.5"/>'+
'<rect x="470" y="336" width="32" height="20" fill="none" stroke="#7fd8ff" stroke-width="1.8" rx="2"/>'+
'<text x="486" y="350" fill="#7fd8ff" font-size="9" text-anchor="middle">KM2</text>'+
'<line x1="486" y1="356" x2="486" y2="404" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="620" y1="214" x2="620" y2="240" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="620" y1="240" x2="608" y2="258" stroke="#c9a0ff" stroke-width="1.8"/>'+
'<text x="630" y="252" fill="#c9a0ff" font-size="7.5">KT 15-18</text>'+
'<line x1="620" y1="260" x2="620" y2="284" stroke="#e8eef6" stroke-width="1.5"/>'+
'<line x1="620" y1="284" x2="608" y2="300" stroke="#7fd8ff" stroke-width="1.8"/><line x1="604" y1="286" x2="626" y2="286" stroke="#7fd8ff" stroke-width="1.8"/>'+
'<text x="630" y="296" fill="#7fd8ff" font-size="7.5">KM2 21-22</text>'+
'<line x1="620" y1="302" x2="620" y2="336" stroke="#e8eef6" stroke-width="1.5"/>'+
'<rect x="604" y="336" width="32" height="20" fill="none" stroke="#ff9d5c" stroke-width="1.8" rx="2"/>'+
'<text x="620" y="350" fill="#ff9d5c" font-size="9" text-anchor="middle">KM3</text>'+
'<line x1="620" y1="356" x2="620" y2="404" stroke="#e8eef6" stroke-width="1.5"/>'+
'<text x="486" y="378" fill="#f85149" font-size="7.5" text-anchor="middle">karşılıklı NC = kilitleme</text>'+
'<line x1="502" y1="292" x2="604" y2="292" stroke="#f85149" stroke-width="0.9" stroke-dasharray="3 3"/>'+
'<rect x="346" y="412" width="318" height="14" fill="#182430"/>'+
'<text x="352" y="422" fill="#8a98ab" font-size="8">0 s</text>'+
'<line x1="372" y1="419" x2="452" y2="419" stroke="#7fd8ff" stroke-width="3"/><text x="456" y="422" fill="#7fd8ff" font-size="8">YILDIZ</text>'+
'<line x1="500" y1="419" x2="580" y2="419" stroke="#ff9d5c" stroke-width="3"/><text x="584" y="422" fill="#ff9d5c" font-size="8">ÜÇGEN</text>'+
'<text x="470" y="422" fill="#c9a0ff" font-size="8">5 s</text>'+
'</svg>');

/* ---------- 7) EV PANOSU TEK HAT ---------- */
var H = F(7,'Ev/ofis panosu tek hat şeması — kaynaktan yüke',
'<svg viewBox="0 0 460 260"><rect width="460" height="260" fill="#141d26"/>'+
'<text x="14" y="18" fill="#8a98ab" font-size="9" font-family="monospace">ŞEBEKE → SAYAÇ → ANA KESİCİ → KAÇAK AKIM → LİNYELER</text>'+
'<line x1="40" y1="30" x2="40" y2="52" stroke="#ffb000" stroke-width="2"/>'+
'<text x="52" y="42" fill="#ffb000" font-size="9">Şebeke 230/400 V</text>'+
'<line x1="30" y1="34" x2="50" y2="30" stroke="#ffb000" stroke-width="1"/>'+
'<rect x="24" y="52" width="32" height="22" fill="none" stroke="#8a98ab" stroke-width="1.5" rx="2"/>'+
'<text x="40" y="67" fill="#8a98ab" font-size="9" text-anchor="middle">kWh</text>'+
'<text x="64" y="67" fill="#8a98ab" font-size="8.5">Sayaç</text>'+
'<line x1="40" y1="74" x2="40" y2="94" stroke="#ffb000" stroke-width="2"/>'+
'<line x1="40" y1="94" x2="30" y2="112" stroke="#33b1ff" stroke-width="2"/><line x1="26" y1="96" x2="48" y2="96" stroke="#33b1ff" stroke-width="1.4"/>'+
'<text x="56" y="108" fill="#33b1ff" font-size="8.5">Ana kesici (örn. 3×40 A)</text>'+
'<line x1="40" y1="114" x2="40" y2="134" stroke="#ffb000" stroke-width="2"/>'+
'<rect x="20" y="134" width="40" height="24" fill="#1c2836" stroke="#3fb950" stroke-width="1.8" rx="3"/>'+
'<text x="40" y="150" fill="#3fb950" font-size="9" text-anchor="middle">KAR</text>'+
'<text x="66" y="144" fill="#3fb950" font-size="8.5">Kaçak akım rölesi</text>'+
'<text x="66" y="155" fill="#3fb950" font-size="8.5">30 mA — can güvenliği</text>'+
'<line x1="40" y1="158" x2="40" y2="182" stroke="#ffb000" stroke-width="2"/>'+
'<line x1="40" y1="182" x2="424" y2="182" stroke="#ffb000" stroke-width="2.4"/>'+
'<text x="230" y="176" fill="#8a98ab" font-size="8" text-anchor="middle">BARA (dağıtım)</text>'+
'<g stroke="#33b1ff" stroke-width="1.8">'+
'<line x1="80" y1="182" x2="80" y2="200"/><line x1="80" y1="200" x2="72" y2="214"/><line x1="80" y1="216" x2="80" y2="232"/>'+
'<line x1="164" y1="182" x2="164" y2="200"/><line x1="164" y1="200" x2="156" y2="214"/><line x1="164" y1="216" x2="164" y2="232"/>'+
'<line x1="248" y1="182" x2="248" y2="200"/><line x1="248" y1="200" x2="240" y2="214"/><line x1="248" y1="216" x2="248" y2="232"/>'+
'<line x1="332" y1="182" x2="332" y2="200"/><line x1="332" y1="200" x2="324" y2="214"/><line x1="332" y1="216" x2="332" y2="232"/>'+
'<line x1="410" y1="182" x2="410" y2="200"/><line x1="410" y1="200" x2="402" y2="214"/><line x1="410" y1="216" x2="410" y2="232"/></g>'+
'<text x="80" y="246" fill="#e8eef6" font-size="8" text-anchor="middle">B10</text>'+
'<text x="164" y="246" fill="#e8eef6" font-size="8" text-anchor="middle">B16</text>'+
'<text x="248" y="246" fill="#e8eef6" font-size="8" text-anchor="middle">B16</text>'+
'<text x="332" y="246" fill="#e8eef6" font-size="8" text-anchor="middle">C16</text>'+
'<text x="410" y="246" fill="#e8eef6" font-size="8" text-anchor="middle">B16</text>'+
'<text x="80" y="256" fill="#5b6f84" font-size="7.5" text-anchor="middle">aydınlatma</text>'+
'<text x="164" y="256" fill="#5b6f84" font-size="7.5" text-anchor="middle">priz (2,5 mm²)</text>'+
'<text x="248" y="256" fill="#5b6f84" font-size="7.5" text-anchor="middle">mutfak</text>'+
'<text x="332" y="256" fill="#5b6f84" font-size="7.5" text-anchor="middle">klima/motor</text>'+
'<text x="410" y="256" fill="#5b6f84" font-size="7.5" text-anchor="middle">banyo</text>'+
'</svg>');

/* ---------- 8) OG → ADP ZİNCİRİ ---------- */
var I = F(8,'Tesis tek hattı — OG hücrelerden ADP ve tali panolara',
'<svg viewBox="0 0 620 200"><rect width="620" height="200" fill="#141d26"/>'+
'<text x="14" y="18" fill="#8a98ab" font-size="9" font-family="monospace">OG 34,5 kV → TRAFO → AG 400 V → ADP → TALİ PANOLAR</text>'+
'<rect x="18" y="42" width="86" height="42" fill="#1c2836" stroke="#f85149" stroke-width="1.5" rx="3"/>'+
'<text x="61" y="60" fill="#f85149" font-size="9" text-anchor="middle">OG HÜCRE</text>'+
'<text x="61" y="74" fill="#8a98ab" font-size="7.5" text-anchor="middle">giriş·çıkış·ölçü·koruma</text>'+
'<line x1="104" y1="63" x2="140" y2="63" stroke="#ffb000" stroke-width="2"/><polygon points="146,63 138,59 138,67" fill="#ffb000"/>'+
'<circle cx="166" cy="55" r="14" fill="none" stroke="#ffb000" stroke-width="1.6"/>'+
'<circle cx="166" cy="72" r="14" fill="none" stroke="#ffb000" stroke-width="1.6"/>'+
'<text x="166" y="100" fill="#ffb000" font-size="8.5" text-anchor="middle">TRAFO</text>'+
'<text x="166" y="111" fill="#8a98ab" font-size="7.5" text-anchor="middle">34,5/0,4 kV Dyn11</text>'+
'<line x1="192" y1="63" x2="228" y2="63" stroke="#33b1ff" stroke-width="2"/><polygon points="234,63 226,59 226,67" fill="#33b1ff"/>'+
'<rect x="236" y="38" width="94" height="50" fill="#1c2836" stroke="#33b1ff" stroke-width="1.6" rx="3"/>'+
'<text x="283" y="56" fill="#33b1ff" font-size="9.5" text-anchor="middle">ADP</text>'+
'<text x="283" y="70" fill="#8a98ab" font-size="7.5" text-anchor="middle">ACB + bara</text>'+
'<text x="283" y="81" fill="#8a98ab" font-size="7.5" text-anchor="middle">kompanzasyon</text>'+
'<line x1="283" y1="88" x2="283" y2="112" stroke="#33b1ff" stroke-width="2"/>'+
'<line x1="150" y1="112" x2="470" y2="112" stroke="#33b1ff" stroke-width="2.4"/>'+
'<g stroke="#3fb950" stroke-width="1.6">'+
'<line x1="180" y1="112" x2="180" y2="136"/><line x1="270" y1="112" x2="270" y2="136"/>'+
'<line x1="360" y1="112" x2="360" y2="136"/><line x1="450" y1="112" x2="450" y2="136"/></g>'+
'<rect x="150" y="136" width="60" height="26" fill="none" stroke="#3fb950" stroke-width="1.3" rx="2"/><text x="180" y="153" fill="#3fb950" font-size="8" text-anchor="middle">Tali P1</text>'+
'<rect x="240" y="136" width="60" height="26" fill="none" stroke="#3fb950" stroke-width="1.3" rx="2"/><text x="270" y="153" fill="#3fb950" font-size="8" text-anchor="middle">Tali P2</text>'+
'<rect x="330" y="136" width="60" height="26" fill="none" stroke="#3fb950" stroke-width="1.3" rx="2"/><text x="360" y="153" fill="#3fb950" font-size="8" text-anchor="middle">Aydınlatma</text>'+
'<rect x="420" y="136" width="60" height="26" fill="none" stroke="#3fb950" stroke-width="1.3" rx="2"/><text x="450" y="153" fill="#3fb950" font-size="8" text-anchor="middle">Motor MCC</text>'+
'<rect x="500" y="30" width="100" height="30" fill="#1c2836" stroke="#ff9d5c" stroke-width="1.4" rx="3"/>'+
'<text x="550" y="49" fill="#ff9d5c" font-size="8.5" text-anchor="middle">JENERATÖR</text>'+
'<rect x="500" y="70" width="100" height="30" fill="#1c2836" stroke="#c9a0ff" stroke-width="1.4" rx="3"/>'+
'<text x="550" y="89" fill="#c9a0ff" font-size="8.5" text-anchor="middle">UPS</text>'+
'<line x1="500" y1="45" x2="470" y2="45" stroke="#ff9d5c" stroke-width="1.5"/>'+
'<line x1="500" y1="85" x2="470" y2="85" stroke="#c9a0ff" stroke-width="1.5"/>'+
'<line x1="470" y1="45" x2="470" y2="112" stroke="#8a98ab" stroke-width="1.5" stroke-dasharray="4 3"/>'+
'<text x="486" y="128" fill="#f85149" font-size="8">ATS</text>'+
'<text x="310" y="188" fill="#f85149" font-size="9" text-anchor="middle">LOTO öncesi: şebeke + jeneratör + UPS + kondansatörler — HEPSİNİ tek hattan say.</text>'+
'</svg>');

/* ---------- BÖLÜMLERE YERLEŞTİR ---------- */
var t = TEORI[44], n = 0;
function ins(anchor, fig){
  if(t.indexOf(anchor)<0) return false;
  t = t.replace(anchor, anchor + fig); n++; return true;
}
ins('Küçük görünür ama hayati bilgiler taşır:<br>', A);
ins('güncel IEC 81346-2 sınıflandırması kısmen farklıdır ama sahada ve mevcut projelerde bu tabloyu görürsün:<br>', B);
ins('Şema okumayı asıl hızlandıran şey klemens numaralarının sistemini bilmektir; ezber değil sistem:<br>', C);
ins('Çizimde açık görünen NO kontak, sahada cihaz çekiliyken kapalıdır.<br>', D);
ins('Mühürleme yoksa buton bırakılınca cihaz durur — buna "yoklamalı (jog) çalışma" denir.<br>', E);
ins('Kumanda şemasını satır satır okuyalım:<br>', G);
ins('Okuma yönü daima <b>kaynaktan yüke</b>:<br>', H);
ins('Jeneratör ve UPS, <b>ATS/enversör</b> üzerinden aynı şemada ayrı kaynak olarak görünür.<br>', I);
TEORI[44] = t;
try{ window.__sema44fig = n; }catch(e){}
})();

/* ===== v13: Modül 44 şemalarında metin çakışması düzeltmesi ===== */
(function(){
 if(typeof DIAG==='undefined'||!DIAG[44]) return;
 var d=DIAG[44];
 d=d.replace('viewBox="0 0 420 230"','viewBox="0 0 560 230"');
 d=d.replace('<rect width="420" height="230"','<rect width="560" height="230"');
 d=d.replace('<text x="210" y="16"','<text x="280" y="16"');
 d=d.split('x2="380" y2="30"').join('x2="520" y2="30"');
 d=d.split('x2="380" y2="210"').join('x2="520" y2="210"');
 d=d.split('<text x="270"').join('<text x="336"');
 DIAG[44]=d;
 var t=TEORI[44];
 t=t.replace('<text x="268" y="126" fill="#3fb950" font-size="8.5">KAPANDI','<text x="246" y="126" fill="#3fb950" font-size="8.5">KAPANDI');
 t=t.replace('<text x="360" y="126" fill="#f85149" font-size="8.5">AÇILDI','<text x="368" y="126" fill="#f85149" font-size="8.5">AÇILDI');
 t=t.replace('<text x="470" y="422" fill="#c9a0ff" font-size="8">5 s</text>','<text x="458" y="409" fill="#c9a0ff" font-size="8">5 s</text>');
 TEORI[44]=t;
})();
