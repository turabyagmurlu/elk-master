/* ELK MASTER — veri: modüller, aşamalar, soru bankası (eski sorular, denetimden geçmiş), MYK, sözlük.
   Teori/özet/ek sorular icerik/mXX.js dosyalarında. */
const CATS = {"temel": {"n": "Temel Elektrik", "c": "#1d4ed8"}, "olcum": {"n": "Ölçüm & Sinyal", "c": "#15803d"}, "saha": {"n": "Saha & Kablaj", "c": "#a16207"}, "pano": {"n": "Pano & Güç Dağıtım", "c": "#6d28d9"}, "yg": {"n": "Koruma & Yüksek Gerilim", "c": "#b91c1c"}, "yonetim": {"n": "Yönetim & Havacılık", "c": "#0e7490"}, "mak": {"n": "Makineler & Güç", "c": "#047857"}, "elektronik": {"n": "Elektronik & Güç Elektroniği", "c": "#0369a1"}, "guvenlik": {"n": "İş Güvenliği & Mevzuat", "c": "#c2410c"}, "oto": {"n": "Otomasyon", "c": "#0f766e"}, "proje": {"n": "Proje & İç Tesisat", "c": "#92400e"}};
const MODS = [
{"id": 36, "t": "Elektrik 101 — Temel Kavramlar", "cat": "temel", "d": "Volt, amper, watt, kWh: su benzetmesiyle temel kavramlar."},
{"id": 1, "t": "Elektrik Yasaları", "cat": "temel", "d": "Ohm kanunu, güç, seri/paralel devre."},
{"id": 12, "t": "Birim & Ölçü Aletleri", "cat": "temel", "d": "Büyüklük→birim→ölçü aleti."},
{"id": 13, "t": "Hata Analizi", "cat": "temel", "d": "Mutlak ve bağıl (%) hata."},
{"id": 14, "t": "Bobin & Reaktans", "cat": "temel", "d": "XL=2πfL, DA'da kısa devre."},
{"id": 18, "t": "Güç Hesabı", "cat": "olcum", "d": "Tek/üç faz: P, S, Q, cosφ."},
{"id": 42, "t": "Olmazsa Olmazlar: Altın Kurallar", "cat": "guvenlik", "d": "5 altın kural, kesin yasaklar, son kontrol listesi."},
{"id": 33, "t": "Elektrik Çarpması & İlk Yardım", "cat": "guvenlik", "d": "Akım şiddeti etkileri, ilk müdahale."},
{"id": 4, "t": "Ölçüm Aletleri", "cat": "olcum", "d": "Multimetre & pens ampermetre."},
{"id": 17, "t": "Alet Sembolleri", "cat": "olcum", "d": "Ölçü aleti sembolleri."},
{"id": 29, "t": "Mevzuat & İSG", "cat": "guvenlik", "d": "Yönetmelikler, 5 altın kural, KKD, LOTO."},
{"id": 3, "t": "Kablo Seçimi", "cat": "temel", "d": "Kablo tipleri, kesit seçimi (Ib→In→Iz), gerilim düşümü, uçtan uca hesap."},
{"id": 16, "t": "Bağlantı Standartları", "cat": "saha", "d": "Solid/stranded, Nox, yank testi."},
{"id": 2, "t": "Ek & Bağlantı (RJ45)", "cat": "saha", "d": "Güç kablosu ekleri, klemens, pabuç/krimp, CAT6 T568A/B."},
{"id": 15, "t": "Akü Kablosu Hazırlama", "cat": "saha", "d": "Lehim adım sırası + güvenlik."},
{"id": 45, "t": "İç Tesisat Devreleri & Proje Sembolleri", "cat": "proje", "d": "Linye, sorti, anahtar tipleri (vavien, komütatör, kron), priz, kolon şeması, yük cetveli."},
{"id": 35, "t": "Sayaç & Pano Bağlantısı", "cat": "pano", "d": "Sayaç panosu, sigorta bağlantısı, mühür, tesisat girişi."},
{"id": 34, "t": "Daire / Ofis Panosu", "cat": "pano", "d": "Ana şalter, RCD, MCB, gerilim rölesi; montaj sırası ve devreye alma."},
{"id": 22, "t": "Peyzaj Aydınlatma", "cat": "saha", "d": "IP65/67, yer altı besleme, fotosel."},
{"id": 25, "t": "Elektrik Makineleri", "cat": "mak", "d": "Asenkron/senkron/DA motor, yol verme."},
{"id": 38, "t": "Pano İçi Otomasyon & Ekipmanlar", "cat": "oto", "d": "Kontaktör, termik, röleler, PLC, enversör, dahlander, VFD."},
{"id": 5, "t": "Pano Otomasyonu", "cat": "pano", "d": "Fotosel, astronomik saat, kontaktörle aydınlatma kumandası."},
{"id": 44, "t": "Proje & Şema Okuma", "cat": "proje", "d": "Tek hat, kumanda şeması, antet, sembol lejantı, klemens numaraları, yıldız-üçgen okunuşu, pano kitapçığı."},
{"id": 43, "t": "Sigorta Ailesi: Kofta'dan NH'ye", "cat": "yg", "d": "Buşon/kofta, NH bıçaklı, gG-aM, B-C-D eğrileri, kesme kapasitesi."},
{"id": 27, "t": "Koruma, Seçicilik & Hesap", "cat": "yg", "d": "Sigorta eğrileri, kısa devre, gerilim düşümü."},
{"id": 26, "t": "Topraklama & Kaçak Akım", "cat": "yg", "d": "TN/TT/IT sistemleri, RCD (30 mA)."},
{"id": 40, "t": "Pano Tasarımı & Senaryolar", "cat": "pano", "d": "Yerleşim, form, ısı hesabı, 'ne yaparsak ne olur?'"},
{"id": 19, "t": "ADP Odası Panoları", "cat": "pano", "d": "Ana dağıtım panosu, baralar."},
{"id": 28, "t": "Aydınlatma Tekniği", "cat": "saha", "d": "Lüks/lümen, verim, aydınlatma hesabı."},
{"id": 24, "t": "Transformatörler", "cat": "mak", "d": "Dönüştürme oranı, kayıplar, bağlantılar."},
{"id": 39, "t": "AG / OG Dağıtım Mimarisi", "cat": "pano", "d": "OG hücreler, trafo, ADP, bara, kompanzasyon."},
{"id": 20, "t": "Jeneratör Sistemleri", "cat": "pano", "d": "Dizel jeneratör, ATS, senkron."},
{"id": 6, "t": "Fatura Optimizasyonu", "cat": "pano", "d": "Tarife mantığı, yük kaydırma, reaktif enerji ve kompanzasyon."},
{"id": 7, "t": "YG Manevrası", "cat": "yg", "d": "Kesici→Ayırıcı sırası, 5 altın kural."},
{"id": 10, "t": "YG İletim & Koruma", "cat": "yg", "d": "İletim/dağıtım seviyeleri, parafudr, topraklama direnci hedefleri."},
{"id": 21, "t": "Yıldırımdan Korunma", "cat": "yg", "d": "Paratoner, iniş iletkeni, SPD."},
{"id": 37, "t": "KNX & Bina Otomasyonu", "cat": "oto", "d": "KNX nedir? Bus, telegram, ETS, aktör/sensör."},
{"id": 30, "t": "Yarı İletkenler & Diyot", "cat": "elektronik", "d": "N/P tipi, diyot, tek yön geçirme, LED."},
{"id": 31, "t": "Doğrultucular (AC→DC)", "cat": "elektronik", "d": "Yarım/tam/köprü dalga doğrultma."},
{"id": 32, "t": "Transistör & Anahtarlama", "cat": "elektronik", "d": "NPN/PNP, yükselteç ve anahtar."},
{"id": 11, "t": "Osiloskop & PCB", "cat": "olcum", "d": "Periyot/frekans, RMS, dağlama."},
{"id": 41, "t": "Saha Senaryoları & Arıza Avcılığı", "cat": "saha", "d": "Gerçek vakalar: belirti→teşhis→çözüm."},
{"id": 9, "t": "Havacılık ATS", "cat": "yonetim", "d": "CAT I/II/III, kritik gruplarda 1 s / diğerlerinde 15 s transfer, CCR, UPS+jeneratör."},
{"id": 23, "t": "Disiplinler Arası Koord.", "cat": "yonetim", "d": "İnşaat/mekanik/IT koordinasyonu."},
{"id": 8, "t": "İdari Yönetim", "cat": "yonetim", "d": "Adam-saat, metraj, hakediş."}
];
const PROGRAM = [
 {
  "t": "Aşama 1 · Elektriğin Dili",
  "hedef": "Temel büyüklükler, Ohm ve Kirchhoff, iletken direnci, AC ve güç. Gerisi bunun üstüne kurulur.",
  "mods": [
   36,
   1,
   12,
   13,
   14,
   18
  ]
 },
 {
  "t": "Aşama 2 · Güvenlik & Ölçüm",
  "hedef": "Önce hayatta kal: 5 altın kural, çarpılma fizyolojisi, gerilim yokluğu kontrolü, ölçü aletleri, mevzuat.",
  "mods": [
   42,
   33,
   4,
   17,
   29
  ]
 },
 {
  "t": "Aşama 3 · Kablo & İç Tesisat",
  "hedef": "Kesit seç, ek yap, iç tesisat devrelerini ve proje sembollerini oku, sayaçtan daire panosuna bağla.",
  "mods": [
   3,
   16,
   2,
   15,
   45,
   35,
   34,
   22
  ]
 },
 {
  "t": "Aşama 4 · Motor, Pano & Koruma",
  "hedef": "Motoru tanı, kumanda devresini kur ve oku; sigorta, topraklama, RCD ve seçicilikle doğru koruma seç.",
  "mods": [
   25,
   38,
   5,
   44,
   43,
   27,
   26,
   40,
   19,
   28
  ]
 },
 {
  "t": "Aşama 5 · Güç Dağıtımı: AG/OG",
  "hedef": "Trafodan ADP'ye enerji zinciri, jeneratör, tarife, YG manevra ve yıldırımdan korunma.",
  "mods": [
   24,
   39,
   20,
   6,
   7,
   10,
   21
  ]
 },
 {
  "t": "Aşama 6 · Otomasyon & Elektronik",
  "hedef": "KNX, yarı iletkenler, doğrultucu, transistör ve osiloskop: panonun içindeki elektroniği anla.",
  "mods": [
   37,
   30,
   31,
   32,
   11
  ]
 },
 {
  "t": "Aşama 7 · Saha Ustalığı",
  "hedef": "Arıza avcılığı, havalimanı güç sürekliliği, disiplinler arası koordinasyon ve şantiye yönetimi.",
  "mods": [
   41,
   9,
   23,
   8
  ]
 }
];
const TEORI = {}, FOY = {}, DIAG = {};
var QBANK = {
"1": [
 {"q": "V=24 V, R=8 Ω ise akım kaç A?", "opts": ["2 A", "3 A", "4 A", "6 A"], "ans": 1, "ex": "I = V/R = 24/8 = 3 A."},
 {"q": "230 V prizden 8,7 A çeken bir ısıtıcının gücü yaklaşık kaç W'tır?", "opts": ["1000 W", "1500 W", "2000 W", "2500 W"], "ans": 2, "ex": "P = V × I = 230 × 8,7 ≈ 2000 W. Sahada etiket gücünden akımı, pensle ölçülen akımdan gücü bu bağıntıyla bulursun."},
 {"q": "Paralel devrede bir lamba patlarsa diğerleri ne olur?", "opts": ["Hepsi söner", "Yanmaya devam eder", "Daha parlak yanar ve patlar", "Akım sıfırlanır"], "ans": 1, "ex": "Paralel kollar bağımsızdır; biri arızalansa diğerleri çalışır."},
 {"q": "Seri devrede sabit kalan büyüklük?", "opts": ["Akım", "Gerilim", "Güç", "Direnç"], "ans": 0, "ex": "Seri devrede akım her elemandan aynı geçer; gerilim bölünür."},
 {"q": "R=10 Ω, I=2 A ise harcanan güç (P=I²R)?", "opts": ["20 W", "40 W", "80 W", "100 W"], "ans": 1, "ex": "P = I²·R = 2²·10 = 40 W."},
 {"q": "Konut tesisatında prizler ve lambalar neden birbirine paralel bağlanır?", "opts": ["Toplam akım azalır, daha ince kablo yeter", "Her cihaza eşit akım gider, sigorta daha az atar", "Gerilim cihazlar arasında paylaşılır, enerji tasarrufu olur", "Her cihaz 230 V görür, biri kapanınca diğerleri etkilenmez"], "ans": 3, "ex": "Paralel kollarda gerilim aynıdır (230 V); her cihaz kendi gücüne göre akım çeker ve diğerlerinden bağımsız çalışır. Toplam akım kol akımlarının toplamıdır, yani paralel bağlama akımı azaltmaz."},
 {"q": "Bakırın özgül direnci ρ = 0,0178 Ω·mm²/m. 100 m uzunluğunda 2,5 mm² bakır iletkenin direnci yaklaşık kaçtır?", "opts": ["0,07 Ω", "0,36 Ω", "0,71 Ω", "7,1 Ω"], "ans": 2, "ex": "R = ρ × L / S = 0,0178 × 100 / 2,5 ≈ 0,71 Ω. Gidiş-dönüş (200 m) hesaplanırsa 1,42 Ω olur; gerilim düşümü ve döngü empedansı hesaplarında bu değer kullanılır."},
 {"q": "Aynı uzunluktaki bir iletkenin kesiti 1,5 mm²'den 3 mm²'ye çıkarılırsa direnci ne olur?", "opts": ["İki katına çıkar", "Değişmez", "Dörtte birine iner", "Yarıya iner"], "ans": 3, "ex": "R = ρ·L/S; direnç kesitle ters orantılıdır. Kesit iki katına çıkınca direnç yarıya iner; bu yüzden uzun hatlarda gerilim düşümünü azaltmak için kesit büyütülür."},
 {"q": "Çalışma sırasında ısınan bakır iletkenin direnci nasıl değişir?", "opts": ["Azalır; kablo daha çok akım taşır", "Değişmez; bakırın direnci sabittir", "Yalnız alüminyumda artar, bakırda değişmez", "Artar; arıza döngü empedansı da yükselir"], "ans": 3, "ex": "Metallerin direnci sıcaklıkla artar. Çalışma sıcaklığındaki PVC kablonun direnci soğuk ölçüme göre yaklaşık %20 büyüktür; Zs kontrolünde bu pay hesaba katılır (bkz. Modül 26)."}
],
"2": [
 {"q": "Düz/T ek için kablo ne kadar soyulur?", "opts": ["15 mm", "25 mm", "50 mm", "100 mm"], "ans": 2, "ex": "Düz ve T ek için 50 mm (5 cm) soyulur."},
 {"q": "F (anten) konnektörde yalıtkan ne kadar soyulur?", "opts": ["5 mm", "15 mm", "30 mm", "50 mm"], "ans": 1, "ex": "Koaksiyel F konnektörde yalıtkan 15 mm soyulur."},
 {"q": "T568B sırasında 1. kablo rengi?", "opts": ["Turuncu-Beyaz", "Turuncu", "Yeşil-Beyaz", "Mavi"], "ans": 0, "ex": "T568B: Turuncu-Beyaz ile başlar."},
 {"q": "Buat içinde gevşek yapılmış bir ekin en büyük riski nedir?", "opts": ["Otomatik sigortanın hemen atması", "Kaçak akım rölesinin sürekli atması", "Hat geriliminin yükselmesi", "Isınma, yalıtımın erimesi ve yangın"], "ans": 3, "ex": "Gevşek ek temas direncini artırır; I²R ısısı yalıtımı eritir ve yangına kadar gidebilir. Otomat bu arızayı görmez, çünkü akım normal yük akımıdır."},
 {"q": "İki ucu da T568B dizilimine göre sonlandırılmış ağ kablosu hangi türdür?", "opts": ["Çapraz (cross) kablo", "Konsol kablosu", "Koaksiyel kablo", "Düz kablo"], "ans": 3, "ex": "Her iki uç aynı standartta ise düz kablodur; bir uç T568A, diğer uç T568B ise çapraz kablo elde edilir."},
 {"q": "UTP ağ kablosunda damar çiftlerinin kendi içinde bükülmesinin amacı nedir?", "opts": ["Kablonun çekme dayanımını artırmak", "İletken direncini düşürmek", "Kablonun esnekliğini artırmak", "Parazit ve çiftler arası karışmayı azaltmak"], "ans": 3, "ex": "Bükülen çiftte dış alanın iki damarda indüklediği gerilimler birbirini götürür; elektromanyetik parazit ve çiftler arası karışma (crosstalk) bastırılır."}
],
"3": [
 {"q": "Yeraltı (toprak altı) tesisat için uygun kablo?", "opts": ["NYA", "NYM", "NYY", "NYAF"], "ans": 2, "ex": "NYY yer altı için mekanik dayanımlı kablodur."},
 {"q": "Titreşimli motor bağlantısı için uygun kablo?", "opts": ["NYA", "NYY", "NYAF", "NYM"], "ans": 2, "ex": "NYAF çok telli/esnektir, titreşime dayanır."},
 {"q": "Nemli bir iç mekânda sıva altı tesisat için kılıflı, çok damarlı hangi kablo uygundur?", "opts": ["H05VV-F (TTR)", "NYA", "NYAF", "NYM (antigron)"], "ans": 3, "ex": "NYM PVC kılıflı çok damarlı tesisat kablosudur; kuru ve nemli iç mekânda sıva altı/üstü kullanılır. NYA ve NYAF tek damarlıdır, boru içinde çekilir; TTR seyyar kordondur, sabit tesisatta kullanılmaz."},
 {"q": "Sabit pano içi sert tek telli kablo?", "opts": ["NYAF", "NYY", "NYM", "NYA"], "ans": 3, "ex": "NYA tek telli, sabit pano/boru içi kullanılır."},
 {"q": "Kablo seçiminde 'Ib ≤ In ≤ Iz' eşitsizliği hangi şartı kontrol eder?", "opts": ["Gerilim düşümü sınırı", "Kısa devre dayanımı", "Mekanik dayanım", "Sigorta–kablo koruma uyumu"], "ans": 3, "ex": "Yük akımı (Ib) ≤ koruma anma akımı (In) ≤ kablonun düzeltilmiş taşıma kapasitesi (Iz). Sigorta kabloyu korur; bu sıra bozulursa kablo aşırı yükte ısınır ama koruma açmaz."},
 {"q": "Tavanda aynı boruda 3 priz devresi var, ortam 40 °C. B1 döşemede 2,5 mm² için Iz0 = 24 A, k1 = 0,87, k2 = 0,70. Sonuç nedir?", "opts": ["Iz ≈ 24 A; 16 A sigorta uygundur", "Iz ≈ 20,9 A; 16 A sigorta uygundur", "Iz ≈ 16,8 A; sınırda ama uygundur", "Iz ≈ 14,6 A; 16 A sigorta kabloyu korumaz"], "ans": 3, "ex": "Iz = 24 × 0,87 × 0,70 ≈ 14,6 A < 16 A; Ib ≤ In ≤ Iz bozulur. Çözüm 4 mm² (Iz ≈ 19,5 A) veya devreleri ayrı borulara dağıtmaktır."},
 {"q": "Aydınlatma devresi için standart kesit ve sigorta ikilisi hangisidir?", "opts": ["1,5 mm² – 10 A", "2,5 mm² – 16 A", "4 mm² – 25 A", "6 mm² – 32 A"], "ans": 0, "ex": "Aydınlatma: 1,5 mm² + 10 A (~2300 W). Priz devresi ise 2,5 mm² + 16 A ile çekilir."},
 {"q": "2,5 mm² kablo + 16 A sigortalı priz hattından güvenle çekilebilecek yaklaşık maksimum güç?", "opts": ["1500 W", "2300 W", "3600 W", "7360 W"], "ans": 2, "ex": "P ≈ V×I = 230×16 ≈ 3600 W. 2000 W'lık iki ısıtıcı (≈17,4 A) hattı sürekli aşırı yükler; bu kadar küçük aşımda B/C tipi sigorta hemen açmayabilir (1,13×In altında açmaz), bu yüzden böyle yükler aynı priz hattına planlanmaz."},
 {"q": "Şofben/fırın gibi 7 kW'a yaklaşan sabit yük için doğru hat?", "opts": ["1,5 mm² – 10 A", "2,5 mm² – 16 A", "6 mm² – 32 A", "Priz hattına takılır"], "ans": 2, "ex": "~7360 W için 6 mm² + 32 A müstakil hat gerekir; böyle yükler asla ortak priz devresine bağlanmaz."}
],
"4": [
 {"q": "Ampermetre devreye nasıl bağlanır?", "opts": ["Seri", "Paralel", "Çapraz", "Toprağa"], "ans": 0, "ex": "Ampermetre seri bağlanır; iç direnci çok düşüktür."},
 {"q": "Voltmetre devreye nasıl bağlanır?", "opts": ["Seri", "Paralel", "Toprağa", "Fark etmez"], "ans": 1, "ex": "Voltmetre paralel bağlanır; iç direnci çok yüksektir."},
 {"q": "2 kW ısıtıcı 3×2,5 mm² kabloyla besleniyor. Pens ampermetre ile yalnız faz damarı kavranırsa ekranda yaklaşık ne okunur?", "opts": ["0 A", "4,3 A", "8,7 A", "17,4 A"], "ans": 2, "ex": "I = P / U = 2000 / 230 ≈ 8,7 A. Kablo bütün olarak (L+N) kavranırsa ≈0 A okunur; bu nedenle pense tek iletken alınır."},
 {"q": "Direnç (ohmmetre) ölçümünde devre nasıl olmalı?", "opts": ["Enerjisiz", "Enerjili", "Yarı yüklü", "Kısa devre"], "ans": 0, "ex": "Ohm ölçümü devre enerjisizken yapılır."},
 {"q": "Ampermetre yanlışlıkla prize (paralel) bağlanırsa ne olur?", "opts": ["Şebeke gerilimini doğru olarak gösterir", "0 A gösterir, zarar oluşmaz", "Yalnız kaçak akımı gösterir", "Kısa devre olur; alet sigortası atar veya ark çıkar"], "ans": 3, "ex": "Ampermetrenin iç direnci çok düşüktür (≈0–1 Ω); gerilime paralel bağlanınca kaynağı kısa devre eder. Her ölçümden önce prob soketi ve kademe kontrol edilir."},
 {"q": "Pens ampermetreye faz+nötr birlikte alınırsa ekran?", "opts": ["İki katı gösterir", "0 A gösterir", "Yanar", "Değişmez"], "ans": 1, "ex": "Zıt yönlü alanlar birbirini götürür → 0 A."}
],
"5": [
 {"q": "LDR'nin direnci karanlıkta nasıldır?", "opts": ["Düşük", "Yüksek", "Sıfır", "Değişmez"], "ans": 1, "ex": "LDR karanlıkta yüksek dirençlidir."},
 {"q": "Büyük yükü küçük sinyalle anahtarlayan eleman?", "opts": ["Direnç", "Sigorta", "Kontaktör", "Kondansatör"], "ans": 2, "ex": "Kontaktör bobiniyle büyük gücü anahtarlar."},
 {"q": "Fotoselli çevre aydınlatması akşamları sürekli yanıp sönüyor. En olası neden nedir?", "opts": ["Kontaktör bobini yanmış, çekmiyor", "Kumanda sigortası atmış durumda", "Lambaların gücü gereğinden düşük", "Fotosel lambaların ışığını görüyor"], "ans": 3, "ex": "Fotosel yanan lambanın ışığını görünce 'gündüz' sanıp söndürür, karanlıkta tekrar yakar. Fotosel yönü değiştirilir veya histerezisi geniş model seçilir. Bobin yanık ya da sigorta atıksa lamba hiç yanmaz."},
 {"q": "Kontaktör hangi parçayla çeker?", "opts": ["Ana kontak", "Sigorta", "Klemens", "Bobin (A1-A2)"], "ans": 3, "ex": "Bobin enerjilenince kontaklar kapanır."},
 {"q": "Akşam ortam ışığı fotosel eşiğinin altına düştüğünde doğru işlem sırası hangisidir?", "opts": ["Fotosel kontağı açılır, kontaktör bırakır, lambalar söner", "Zaman rölesi sayar, lambalar 1 dk sonra söner", "Kontaktör çeker, kumanda sigortası atar", "Fotosel kontağı kapanır, kontaktör çeker, lambalar yanar"], "ans": 3, "ex": "Karanlık algılanınca fotosel kontağı kapanır, kontaktör bobini (A1-A2) enerjilenir, ana kontaklar lambaları besler. Kararma saati mevsime ve bölgeye göre değişir."},
 {"q": "Kontaktör hangi cihaza benzer ama yüksek akım içindir?", "opts": ["Röle", "Direnç", "Diyot", "Trafo"], "ans": 0, "ex": "Kontaktör röleye benzer; büyük güç yükleri içindir."},
 {"q": "Çevre aydınlatması gece 01:00'de sönsün, sabaha kadar yanmasın isteniyor. Fotosel kontağına seri eklenen eleman hangisidir?", "opts": ["Termik aşırı yük rölesi (bimetal)", "Faz sırası ve faz kaybı rölesi", "Kaçak akım rölesi (30 mA)", "Zaman saati (programlı/astronomik)"], "ans": 3, "ex": "Fotosel ile saat kontağı seri bağlanırsa lamba ancak 'karanlık VE program saati içinde' yanar. Termik ve faz sırası röleleri koruma elemanıdır, zamanlama yapmaz."}
],
"6": [
 {"q": "Üç zamanlı tarifede en pahalı dilim?", "opts": ["T1 gündüz", "T2 puant", "T3 gece", "Hepsi eşit"], "ans": 1, "ex": "T2 (puant, 17–22) en pahalı dilimdir."},
 {"q": "En ucuz dilim hangisidir?", "opts": ["T1", "T2", "T3 gece", "Fark etmez"], "ans": 2, "ex": "T3 (gece, 22–06) en ucuz dilimdir."},
 {"q": "Yüksek güçlü yükler hangi dilime kaydırılmalı?", "opts": ["T3 gece", "T2", "T1", "Kaydırılmaz"], "ans": 0, "ex": "Ertelenebilir büyük yükler ucuz T3 dilimine alınır."},
 {"q": "Bir işletme ay içinde 20.000 kWh aktif, 5.000 kVArh endüktif reaktif enerji çekmiş. Endüktif sınır %20 ise durum nedir?", "opts": ["Oran %25; sınır içinde, bedel yok", "Oran %4; sınır içinde, bedel yok", "Oran %40; yalnız kapasitif ceza doğar", "Oran %25; sınır aşıldı, reaktif bedel ödenir"], "ans": 3, "ex": "Oran = 5.000 / 20.000 = %25 > %20 → kompanzasyon yetersizdir, reaktif bedel faturaya yansır. Sınır tarifeye göre güncellenebilir."},
 {"q": "Reaktif ceza ödeyen bir atölye için kalıcı çözüm hangisidir?", "opts": ["Ana sigortayı bir üst değere çıkarmak", "Kolon kablo kesitini büyütmek", "Topraklama tesisatını yenilemek", "Otomatik kompanzasyon panosu kurmak"], "ans": 3, "ex": "Endüktif reaktifi yerinde kondansatörlerle karşılayan otomatik kompanzasyon panosu cos φ'yi hedef banda (≈0,95–1) çeker; sigorta, kesit ve topraklamanın reaktif enerjiyle ilgisi yoktur."},
 {"q": "T2 puant dilimi yaklaşık hangi saatler?", "opts": ["22–06", "06–17", "17–22", "00–06"], "ans": 2, "ex": "Puant genelde akşam 17–22 arasıdır."}
],
"7": [
 {"q": "Yük akımını güvenle kesebilen cihaz?", "opts": ["Ayırıcı", "Sigorta yuvası", "Kesici", "Klemens"], "ans": 2, "ex": "Kesici ark söndürme hazneli olup yük akımını keser."},
 {"q": "Yük altında AÇILMAMASI gereken cihaz?", "opts": ["Kesici", "Röle", "Kontaktör", "Ayırıcı"], "ans": 3, "ex": "Ayırıcı yük altında açılırsa ark patlaması olur."},
 {"q": "Doğru açma (enerji kesme) sırası?", "opts": ["Önce Kesici sonra Ayırıcı", "Önce Ayırıcı sonra Kesici", "Aynı anda", "Sırası önemsiz"], "ans": 0, "ex": "Önce Kesici, sonra Ayırıcı açılır."},
 {"q": "Enerji verme (kapama) sırası?", "opts": ["Önce Ayırıcı sonra Kesici", "Önce Kesici sonra Ayırıcı", "Sadece Kesici", "Sadece Ayırıcı"], "ans": 0, "ex": "Kapamada tersine: önce Ayırıcı, sonra Kesici."},
 {"q": "YG hücresinde gerilim yokluğu hangi araçla kontrol edilir?", "opts": ["AG tipi tornavida kontrol kalemi", "CAT II sınıfı dijital multimetre", "Pens ampermetrenin gerilim kademesi", "Gerilim seviyesine uygun YG dedektörü"], "ans": 3, "ex": "YG'de, işletme gerilimine uygun ve kullanımdan önce denenmiş gerilim dedektörü (ıstanka ile) kullanılır. AG kalemi ve CAT II alet YG'de hayati tehlike yaratır."},
 {"q": "5 altın kuralda 'gerilim yokluğunu doğrula' adımından hemen ÖNCE hangi adım gelir?", "opts": ["Toprakla ve kısa devre et", "Komşu canlı kısımları ört", "Yükü ölçüp kaydet", "Kilitle ve etiketle"], "ans": 3, "ex": "Sıra: 1) Aç (ayır) 2) Kilitle-etiketle 3) Gerilim yokluğunu doğrula 4) Toprakla-kısa devre et 5) Ört-perdele."}
],
"8": [
 {"q": "10 işçi 9 saat çalıştı. Adam-saat?", "opts": ["19", "90", "109", "900"], "ans": 1, "ex": "Adam-saat = 10 × 9 = 90."},
 {"q": "Hakediş tutarı temel olarak nasıl hesaplanır?", "opts": ["İşçi sayısı × çalışma saati", "Malzeme bedeli + %10 kâr", "Adam-saat × gün sayısı", "Metraj × birim fiyat"], "ans": 3, "ex": "Hakediş, yapılan işin ölçülen miktarı (metraj) ile sözleşmedeki birim fiyatın çarpımlarının toplamıdır."},
 {"q": "250 m kablo, 40 TL/m. Hakediş?", "opts": ["2.900 TL", "6.250 TL", "10.000 TL", "12.500 TL"], "ans": 2, "ex": "250 × 40 = 10.000 TL."},
 {"q": "4 buat arasına 3×2,5 mm² NYM kablo sırasıyla 12 m, 8,5 m ve 14,5 m çekildi. Bu kalemin metrajı kaç metredir?", "opts": ["32 m", "35 m", "36 m", "38 m"], "ans": 1, "ex": "Metraj yapılan işin ölçüsüdür: 12 + 8,5 + 14,5 = 35 m. Hakedişte bu miktar birim fiyatla çarpılır."},
 {"q": "Şantiyede puantaj kaydı neyi tutar?", "opts": ["Malzeme giriş-çıkışını", "Yapılan işin ölçüsünü (metraj)", "Hakediş ödemelerini", "Çalışanların günlük devam/çalışma saatini"], "ans": 3, "ex": "Puantaj, her çalışanın hangi gün kaç saat çalıştığının kaydıdır; ücret ve adam-saat hesabının temelidir."},
 {"q": "Yüklenicinin hazırladığı hakediş kime onaya sunulur?", "opts": ["Sahada çalışan taşeron işçilere", "Malzeme veren tedarikçi firmaya", "Bölgedeki elektrik dağıtım şirketine", "Kontrol mühendisi/müşavir ve işverene"], "ans": 3, "ex": "Hakediş metrajı kontrol mühendisi veya müşavir tarafından doğrulanır, işveren onayıyla ödenir."}
],
"9": [
 {"q": "Şebeke↔jeneratör otomatik geçişi yapan cihaz?", "opts": ["UPS", "LDR", "ATS", "SPD"], "ans": 2, "ex": "ATS (Otomatik Transfer Şalteri) geçişi yapar."},
 {"q": "Jeneratör gelene kadar kesintisiz köprüleyen?", "opts": ["UPS", "ATS", "Kontaktör", "Sigorta"], "ans": 0, "ex": "UPS aradaki boşluğu kesintisiz köprüler."},
 {"q": "ICAO Ek-14'e göre CAT II/III pistte eşik, orta hat ve konma bölgesi (TDZ) ışıkları için azami transfer süresi?", "opts": ["≤ 1 saniye", "≤ 15 saniye", "1 dakika", "Önemli değil"], "ans": 0, "ex": "CAT II/III'te eşik, son, orta hat, TDZ, iç 300 m yaklaşma ışıkları ve stop barlar için 1 s; pist kenar ışıkları ve yaklaşmanın diğer kısımları için 15 s tanınır."},
 {"q": "Alçak görüşte yaklaşma sırasında kritik pist ışıkları izin verilen transfer süresinde geri gelmezse pilot ne yapar?", "opts": ["Hiçbir şey olmaz, iniş sürer", "Yaklaşmayı keser ve pas geçer", "Daha hızlı alçalır", "Jeneratörü çalıştırır"], "ans": 1, "ex": "Karar anında pisti ışıklarla göremeyen pilot yaklaşmayı güvenli tamamlayamaz ve pas geçmek (tekrar tırmanmak) zorunda kalır."},
 {"q": "Pist ışıkları nasıl yük sınıfındadır?", "opts": ["Önemsiz", "Kritik yük", "Aydınlatma dışı", "Reaktif"], "ans": 1, "ex": "Pist ışıkları uçuş güvenliğinin parçası olan kritik yüktür; ikincil kaynağa geçiş süresi ICAO Ek-14'te ışık grubuna göre 1 s veya 15 s ile sınırlandırılmıştır."},
 {"q": "Online (çift dönüşümlü) UPS'te şebeke kesildiğinde aküye geçiş süresi yaklaşık ne kadardır?", "opts": ["Sıfıra yakın (kesintisiz)", "Yaklaşık 5 saniye", "Yaklaşık 30 saniye", "Yaklaşık 2 dakika"], "ans": 0, "ex": "Online UPS'te yük sürekli inverterden beslenir; şebeke kesilince inverter aküden beslenmeye devam eder, geçiş pratikte ≈0'dır. Jeneratörün devreye girmesi ise saniyeler sürer; aradaki boşluğu UPS köprüler."}
],
"10": [
 {"q": "Aşırı gerilimi toprağa akıtarak trafo ve hat teçhizatını koruyan eleman hangisidir?", "opts": ["Sigorta", "Sayaç", "Kontaktör", "Parafudr"], "ans": 3, "ex": "Parafudr normal gerilimde yalıtkandır; darbe gerilimi geldiğinde iletime geçer, darbe akımını toprağa akıtır ve teçhizatın gördüğü gerilimi sınırlar."},
 {"q": "TS EN 62305-3 yaklaşımında yıldırımdan korunma topraklaması için önerilen direnç hangisidir?", "opts": ["Mümkünse 100 Ω'un altı", "En az 10 kΩ", "1 MΩ'un üzeri", "Mümkünse 10 Ω'un altı"], "ans": 3, "ex": "Yıldırım topraklamasında düşük frekansta ölçülen direncin mümkünse 10 Ω'un altında olması önerilir. ≤1 Ω büyük iletim TM'lerinde veya bazı şartnamelerde istenen tasarım hedefidir, genel yıldırım kuralı değildir."},
 {"q": "Ölçülen topraklama direnci hedefin üstünde çıktı. Kalıcı ve doğru ilk çözüm hangisidir?", "opts": ["Kazıkların çevresine tuz dök", "Kazıkları 0,5 m aralıkla sık çak", "Su borusunu topraklayıcı olarak kullan", "Kazık ekle, aralığı kazık boyunun 2 katı tut"], "ans": 3, "ex": "Direnç, elektrot sayısı/boyu artırılarak ve kazıklar birbirinin etki alanına girmeyecek aralıkta (≥ 2 × kazık boyu) çakılarak düşürülür. Tuz kalıcı değildir ve korozyonu hızlandırır; su borusu topraklayıcı olarak kullanılmaz."},
 {"q": "Enerji nakil hattı iletkenleri üzerindeki turuncu-beyaz küreler ne işe yarar?", "opts": ["Titreşim sönümleme", "Ara yalıtım", "Yıldırım yakalama", "Hava aracı uyarısı"], "ans": 3, "ex": "İkaz küreleri hattı pilotlara görünür kılar; vadi geçişleri ve havalimanı çevresinde helikopter/uçak çarpmasını önler."},
 {"q": "Parafudrun topraklama direnci yüksekse ne olur?", "opts": ["Daha hızlı çalışır, koruma iyileşir", "Hiç iletime geçmez, devre dışı kalır", "Yalnız sızıntı akımı artar, etkisi yoktur", "Çalışır ama teçhizatın gördüğü gerilim artar"], "ans": 3, "ex": "Parafudr yine iletime geçer; ancak darbe akımı yüksek toprak direncinde ek gerilim oluşturur ve teçhizatın gördüğü gerilim artar. Bu yüzden parafudr toprağı kısa yoldan trafo tankına bağlanır, direnç düşük tutulur."},
 {"q": "Türkiye'de 154 kV ve 380 kV hangi şebeke kademesidir?", "opts": ["Orta gerilim dağıtım", "Alçak gerilim dağıtım", "Çok düşük gerilim", "İletim (yüksek gerilim)"], "ans": 3, "ex": "154 kV ve 380 kV iletim (YG) seviyeleridir; dağıtımda OG olarak çoğunlukla 34,5 kV, AG olarak 230/400 V kullanılır."}
],
"11": [
 {"q": "T = 20 ms ise frekans (f=1/T)?", "opts": ["20 Hz", "50 Hz", "100 Hz", "500 Hz"], "ans": 1, "ex": "f = 1/0,02 s = 50 Hz."},
 {"q": "Osiloskop ekranından ızgara (kare) sayılarak doğrudan hangi değer okunur?", "opts": ["Etkin (RMS) değer doğrudan", "Ortalama (DC) değer", "Tepe ve tepeden tepeye değer", "Güç faktörü (cos φ)"], "ans": 2, "ex": "Ekrandan kare sayısı × V/div ile tepe ve tepeden tepeye değer okunur; sinüste RMS = Vtepe / √2 ile hesaplanır veya dijital osiloskobun ölçüm menüsünden alınır."},
 {"q": "Vmax=100 V ise Vrms (=Vmax/√2)?", "opts": ["50 V", "≈70,7 V", "100 V", "141 V"], "ans": 1, "ex": "Vrms = 100/√2 ≈ 70,7 V."},
 {"q": "Bir saykıl nedir?", "opts": ["Yarım dalga", "İki dalga", "Sabit değer", "Bir tam dalga"], "ans": 3, "ex": "Saykıl bir tam dalgadır (pozitif+negatif alternans)."},
 {"q": "PCB dağlamada doğru oran?", "opts": ["1 Perhidrol + 3 Tuz Ruhu", "3 Perhidrol + 1 Tuz Ruhu", "1 + 1", "Sadece su"], "ans": 0, "ex": "1 ölçek Perhidrol + 3 ölçek Tuz Ruhu."},
 {"q": "PCB dağlama banyosunda plaket çok uzun süre kalırsa ne olur?", "opts": ["Korunmayan bakır yüzeyde kalır", "Plaketin yalıtkan tabanı erir", "Bakır kalınlaşır, iletkenlik artar", "Korunan yollar yandan aşınıp kopar"], "ans": 3, "ex": "Çözelti korunmayan bakırı eritir; süre aşılırsa maskenin altına yandan girer ve ince yolları inceltip koparır. Tipik süre 5–10 dakikadır."}
],
"12": [
 {"q": "Akımın birimi ve ölçü aleti?", "opts": ["Volt — Voltmetre", "Watt — Wattmetre", "Amper — Ampermetre", "Ohm — Ohmmetre"], "ans": 2, "ex": "Akım: Amper (A), Ampermetre ile ölçülür."},
 {"q": "Direnç birimi ve aleti?", "opts": ["Ohm — Ohmmetre", "Farad — LCRmetre", "Hertz — Frekansmetre", "Var — Varmetre"], "ans": 0, "ex": "Direnç: Ohm (Ω), Ohmmetre."},
 {"q": "Elektrik sayacında ay başı 12.450 kWh, ay sonu 12.870 kWh okunmuş. Aylık tüketim kaçtır?", "opts": ["42 kWh", "420 kWh", "4.200 kWh", "12.870 kWh"], "ans": 1, "ex": "Tüketim = son endeks − ilk endeks = 12.870 − 12.450 = 420 kWh. Fatura bu fark üzerinden hesaplanır."},
 {"q": "Endüktans (L) birimi ve aleti?", "opts": ["Farad — LCRmetre", "Watt — Wattmetre", "Volt — Voltmetre", "Henry — LCRmetre"], "ans": 3, "ex": "Endüktans: Henry (H), LCRmetre."},
 {"q": "Reaktif gücün birimi?", "opts": ["Var", "Watt", "Joule", "Hertz"], "ans": 0, "ex": "Reaktif güç Var ile ifade edilir."},
 {"q": "Güç faktörünü ölçen alet?", "opts": ["Wattmetre", "Frekansmetre", "Kosinüsfimetre", "Sayaç"], "ans": 2, "ex": "cosφ Kosinüsfimetre ile ölçülür."}
],
"13": [
 {"q": "Mutlak hata nasıl bulunur?", "opts": ["Xg + X", "Xg × X", "Xg / X", "|Xg − X|"], "ans": 3, "ex": "Mutlak hata ΔX = |Xg − X| (gerçek − ölçülen)."},
 {"q": "Bağıl hata formülü?", "opts": ["ΔX / Xg", "ΔX × Xg", "Xg / ΔX", "ΔX − Xg"], "ans": 0, "ex": "Bağıl hata ε = ΔX / Xg (×100 ile %)."},
 {"q": "Xg=200, X=196 → mutlak hata?", "opts": ["2", "4", "6", "8"], "ans": 1, "ex": "ΔX = |200−196| = 4."},
 {"q": "Xg=200, X=196 → bağıl hata (%)?", "opts": ["%1", "%2", "%4", "%8"], "ans": 1, "ex": "ε = 4/200 = 0,02 = %2."},
 {"q": "Analog ölçü aletinde doğruluk sınıfı (ör. 1,5) neyi belirtir?", "opts": ["Aletin kullanım konumunu (dik/yatay)", "Yalıtım deney gerilimini (kV)", "Tam skalaya göre izinli en büyük hatayı", "Ölçüm kategorisini (CAT II/III)"], "ans": 2, "ex": "Sınıf, tam skala değerinin yüzdesi olarak izinli en büyük hatadır. Kullanım konumu ⊥/⊓, yalıtım deneyi yıldız içindeki rakamla gösterilir."},
 {"q": "Sınıfı 1,5 olan 0–500 V pano voltmetresinin skala boyunca yapabileceği en büyük hata kaç volttur?", "opts": ["±1,5 V", "±5 V", "±7,5 V", "±15 V"], "ans": 2, "ex": "Hata = tam skala × sınıf / 100 = 500 × 1,5 / 100 = ±7,5 V. Bu hata skalanın her yerinde aynıdır; bu yüzden küçük değerler skala başında okunursa bağıl hata büyür."}
],
"14": [
 {"q": "Endüktif reaktans formülü?", "opts": ["XL = 2πfL", "XL = 1/(2πfL)", "XL = R·L", "XL = f/L"], "ans": 0, "ex": "XL = 2·π·f·L."},
 {"q": "DA'da (f=0) bobinin reaktansı?", "opts": ["Sonsuz", "1 Ω", "Sıfır", "Negatif"], "ans": 2, "ex": "f=0 → XL=0; bobin kısa devre gibi davranır."},
 {"q": "Frekans artarsa XL nasıl değişir?", "opts": ["Artar", "Azalır", "Değişmez", "Sıfırlanır"], "ans": 0, "ex": "XL frekansla doğru orantılıdır, artar."},
 {"q": "50 Hz şebekede 100 µF kondansatörün kapasitif reaktansı yaklaşık kaç ohm'dur? (XC = 1/(2πfC))", "opts": ["3,2 Ω", "15,9 Ω", "31,8 Ω", "318 Ω"], "ans": 2, "ex": "XC = 1 / (2 × 3,14 × 50 × 0,0001) ≈ 31,8 Ω. Frekans artarsa XC azalır; DC'de (f = 0) sonsuzdur."},
 {"q": "Kondansatör DA'da nasıl davranır?", "opts": ["Kısa devre", "Açık devre", "Direnç", "Bobin gibi"], "ans": 1, "ex": "DA'da XC→∞; kondansatör açık devredir."},
 {"q": "0,1 H endüktanslı bir bobinin 50 Hz'deki endüktif reaktansı yaklaşık kaçtır?", "opts": ["10 Ω", "31,4 Ω", "62,8 Ω", "314 Ω"], "ans": 1, "ex": "XL = 2πfL = 2 × 3,14 × 50 × 0,1 ≈ 31,4 Ω. Frekans iki katına çıkarsa XL de iki katına (62,8 Ω) çıkar."}
],
"15": [
 {"q": "Uzun süre açıkta kalmış akü kablosunun ucu kararmış. Pabuç takmadan önce ilk iş nedir?", "opts": ["Uca flux sürülüp doğrudan lehimlenir", "Kararmış uç zımparalanıp krimplenir", "Makaron geçirilip ısıtılır", "Oksitli uç (≈13 mm) kesilip atılır"], "ans": 3, "ex": "Kararmış (oksitli) bakır iyi bağlantı vermez; uçtaki yaklaşık ½ inç (≈13 mm) kesilir, yeni kesimde bakır parlak görünmelidir. Oksit derine ilerlediyse parlak bakıra kadar kesilir."},
 {"q": "Akü kablosu pabucu ısıtılırken alev yeşile dönerse ne anlama gelir?", "opts": ["Lehim erime sıcaklığına geldi, lehimle", "Flux tamamen buharlaştı, yenisini ekle", "Bakır aşırı ısınıp oksitleniyor, ısıyı kes", "Sıcaklık doğru, ısıtmaya devam et"], "ans": 2, "ex": "Yeşil alev bakırın aşırı ısınıp oksitlendiğini gösterir; ısı hemen kesilir. Oksitlenen bakır lehimi tutmaz."},
 {"q": "Makaron ne için KULLANILMAZ?", "opts": ["Çevresel koruma", "Kötü krimpi gizlemek", "Yalıtım", "Kozmetik"], "ans": 1, "ex": "Makaron hatalı bağlantıyı gizlemek için kullanılmaz."},
 {"q": "Lehimde nereyi ısıtmalı?", "opts": ["Kabloyu doğrudan", "Terminalin ucunu", "Makaronu", "Eldiveni"], "ans": 1, "ex": "Sadece terminal ucu ısıtılır; kablo doğrudan ısıtılırsa oksitlenir."},
 {"q": "Rosin flux kullanımı için doğru ifade hangisidir?", "opts": ["Bol kullanılır; lehimi güçlendirir", "Suyla seyreltilip sürülür", "Akü kablosunda hiç kullanılmaz", "Az kullanılır; kalıntısı korozyon yapar"], "ans": 3, "ex": "Flux yüzeyi temizleyip lehimin akmasını sağlar; ancak asidik kalıntısı zamanla korozyon yapar. Abartılmaz, taşan kısım temizlenir."},
 {"q": "Akü kablosu hazırlamada doğru adım sırası hangisidir?", "opts": ["Soyma → Oksit temizliği → Lehim → Krimp → Makaron", "Oksit temizliği → Krimp → Soyma → Makaron → Lehim", "Oksit temizliği → Soyma → Krimp → Lehim → Makaron", "Soyma → Makaron → Krimp → Oksit temizliği → Lehim"], "ans": 2, "ex": "Önce oksitli uç kesilir, sonra soyulur, pabuç krimplenir, gerekiyorsa lehimle desteklenir ve en son makaronla çevresel koruma yapılır."}
],
"16": [
 {"q": "Titreşimli bir motorun bağlantısında hangi iletken tipi kullanılmalıdır?", "opts": ["Tek telli (sınıf 1)", "Tek telli alüminyum", "Fark etmez, kesit yeterliyse olur", "İnce çok telli esnek (sınıf 5/6)"], "ans": 3, "ex": "Titreşim tek telli iletkeni yorar ve kırar; esnek çok telli iletken titreşimi taşır. Vidalı klemenste ucuna kesite uygun yüksük takılır."},
 {"q": "Kablo bıçakla çevresel kesilerek soyulurken iletkende çentik (yüzük atma) oluşursa ne olur?", "opts": ["Yalıtım güçlenir, bağlantı sıkılaşır", "Yalnız görünüş bozulur, sakıncası yoktur", "Kesit daralır, titreşimde tel oradan kırılır", "İletken direnci düşer, akım artar"], "ans": 2, "ex": "Çentik zayıf noktadır; kesiti daraltır, ısınır ve titreşimle kopar. Soyma, çentik açmayan kılıf sıyırıcı ile yapılır."},
 {"q": "Nox (anti-oksidan macun) bağlantıda neyi önler?", "opts": ["Aşırı akımda iletkenin ısınmasını", "Kısa devrede ark oluşmasını", "Titreşimle vidanın gevşemesini", "Farklı metal temasında korozyonu"], "ans": 3, "ex": "Macun temas yüzeyini hava ve nemden ayırır; özellikle Al iletkende ve Al-Cu geçişinde galvanik korozyonu önler. Al iletken önce tel fırçayla temizlenir, hemen macun sürülür."},
 {"q": "Dış mekânda pabuç/yüksük montajında 'suyu dışarı atma' kuralına uygun düzen hangisidir?", "opts": ["Giriş ağzı aşağıda, kabloda damla halkası var", "Giriş ağzı yukarıda, kablo üstten geliyor", "Giriş ağzı yana bakıyor, üstü bantlı", "Kablo kutuya üstten giriyor, silikonlu"], "ans": 0, "ex": "Kablo bağlantı noktasına aşağıdan gelir, pabucun kablo giriş ağzı aşağı bakar (uç yukarıyı gösterir). Kablo kutuya girmeden önce damla halkası yapar; su en alt noktadan damlar, bağlantıya ulaşmaz."},
 {"q": "Burmalı kapaklı klemens (konik yaylı ek klemensi) iletken uçlarının üzerine hangi yönde döndürülür?", "opts": ["Saat yönünde", "Saat yönünün tersine", "Döndürülmez, sadece bastırılır", "Yön önemsizdir"], "ans": 0, "ex": "Klemensin iç konik yayı saat yönünde sarılmıştır; saat yönünde döndürülünce teller yaya ve birbirine sıkıca oturur."},
 {"q": "Klemens bağlantısından sonra yapılan 'çekme testi' nasıl uygulanır?", "opts": ["Klemense 500 V DC uygulanır", "Vida torku iki katına çıkarılır", "Her iletken tek tek elle sertçe çekilir", "Bağlantı ısıtılıp rengine bakılır"], "ans": 2, "ex": "Her iletken klemensten tek tek çekilir; yerinden oynayan veya çıkan iletken yeniden soyulup bağlanır. Basit ama gevşek bağlantıyı enerji vermeden yakalar."}
],
"17": [
 {"q": "'~' sembolü neyi belirtir?", "opts": ["DC", "AC", "Topraklama", "Sigorta"], "ans": 1, "ex": "Dalgalı çizgi sadece AC içindir."},
 {"q": "'—' (düz çizgi) sembolü?", "opts": ["AC", "DC", "Hem DC hem AC", "Faz"], "ans": 1, "ex": "Düz çizgi sadece DC içindir."},
 {"q": "Ölçü aleti kadranındaki ⊥ (ters T) sembolü neyi belirtir?", "opts": ["Yatay konumda kullanılır", "60° eğik konumda kullanılır", "Yalnız DC ölçer", "Dik (dikey) konumda kullanılır"], "ans": 3, "ex": "⊥: alet dik konumda (pano ön yüzü) kullanılır; ⊓: yatay (masa üstü) kullanılır. Yanlış konumda analog alet ek hata yapar."},
 {"q": "⊓ (U) sembolü?", "opts": ["Dik kullan", "Yatay kullan", "DC", "Topraklama"], "ans": 1, "ex": "Alet yatay konumda kullanılmalıdır."},
 {"q": "Ölçü aleti kadranında yıldız içinde '2' rakamı neyi gösterir?", "opts": ["Yalıtımı 2 kV ile denenmiştir", "Doğruluk sınıfı 2'dir", "2 yılda bir kalibre edilir", "İki fazda ölçüm yapar"], "ans": 0, "ex": "Yıldız içindeki rakam yalıtım deney gerilimini (kV) gösterir; rakamsız yıldız 500 V'tur. Doğruluk sınıfı kadranda ayrı bir sayı olarak yazılır."},
 {"q": "Kadranda üçgen içinde ünlem (!) işareti ne anlama gelir?", "opts": ["Yalnız AC devrede kullan", "Yüksek gerilim, dokunma", "Dikkat, kullanım kılavuzuna bak", "Gövde topraklanmalıdır"], "ans": 2, "ex": "Üçgen içinde ünlem genel uyarıdır: aleti kullanmadan önce teknik dokümandaki özel koşullara bakılmalıdır. Yüksek gerilim uyarısı şimşek sembolüyle gösterilir."}
],
"18": [
 {"q": "Üç fazlı görünür güç formülü?", "opts": ["S=U·I", "S=√3·U·I", "S=U·I·cosφ", "S=3·U·I"], "ans": 1, "ex": "S = √3·U·I (kVA)."},
 {"q": "Üç fazlı aktif güç formülü?", "opts": ["P=√3·U·I·cosφ", "P=U·I", "P=√3·U·I", "P=U·I·sinφ"], "ans": 0, "ex": "P = √3·U·I·cosφ (kW)."},
 {"q": "Bir yükün aktif gücü 8 kW, reaktif gücü 6 kVAr'dır. Görünür güç ve cos φ nedir?", "opts": ["14 kVA; 0,57", "10 kVA; 0,6", "2 kVA; 0,75", "10 kVA; 0,8"], "ans": 3, "ex": "S = √(P² + Q²) = √(64 + 36) = 10 kVA; cos φ = P / S = 8 / 10 = 0,8."},
 {"q": "U = 400 V, I = 10 A, cos φ = 1 olan üç fazlı yükün aktif gücü yaklaşık kaçtır? (√3 ≈ 1,732)", "opts": ["2,31 kW", "4,0 kW", "6,93 kW", "12,0 kW"], "ans": 2, "ex": "P = √3 × U × I × cos φ = 1,732 × 400 × 10 × 1 ≈ 6928 W ≈ 6,93 kW."},
 {"q": "Güç faktörü cosφ nasıl bulunur?", "opts": ["P/S", "S/P", "P·S", "Q/P"], "ans": 0, "ex": "cosφ = P/S."},
 {"q": "Aynı aktif güç çekilirken cos φ 0,70'ten 0,95'e yükseltilirse hat akımı ne olur?", "opts": ["Yaklaşık %26 azalır", "Yaklaşık %36 artar", "Değişmez", "Yarıya iner"], "ans": 0, "ex": "Aynı P için I ∝ 1 / cos φ: 0,70 / 0,95 ≈ 0,74 → akım yaklaşık %26 azalır. Kablo ve trafo kayıpları (I²R) daha da fazla (≈ %46) düşer."},
 {"q": "Sadece dirençli devrede çekilen güç türü?", "opts": ["Reaktif", "Aktif (P)", "Görünür", "Yok"], "ans": 1, "ex": "Saf dirençli yük aktif güç (P, Watt) çeker."},
 {"q": "Saf bobin veya saf kondansatörden oluşan devre hangi gücü çeker?", "opts": ["Aktif güç (W)", "Isı gücü (W)", "Reaktif güç (VAr)", "Hiç güç çekmez"], "ans": 2, "ex": "Saf L veya C'de akım ile gerilim arasında 90° faz farkı vardır; ortalama aktif güç sıfırdır, yalnız reaktif güç (Q) alınıp verilir."}
],
"19": [
 {"q": "ADP neyin kısaltması?", "opts": ["Ana Dağıtım Panosu", "Acil Durum Panosu", "Alçak Direnç Panosu", "Ana Direnç Plakası"], "ans": 0, "ex": "ADP = Ana Dağıtım Panosu."},
 {"q": "Pano içinde yüksek akımı çıkışlara dağıtan iletken çubuğa ne denir?", "opts": ["Sigorta", "Klemens", "Kontaktör", "Bara"], "ans": 3, "ex": "Bara (bakır veya alüminyum lama) ana beslemeyi alıp çıkış şalterlerine dağıtır; kesiti akıma ve kısa devre dayanımına göre seçilir."},
 {"q": "Bir binada doğru dağıtım panosu hiyerarşisi hangisidir?", "opts": ["Ana → Tali → Kat/mahal", "Tali → Ana → Kat/mahal", "Kat/mahal → Ana → Tali", "Kat/mahal → Tali → Ana"], "ans": 0, "ex": "Enerji ADP'den tali panolara, oradan kat/mahal panolarına dağılır. Tek hat şeması da bu yönde okunur."},
 {"q": "IP koruma sınıfının 2. rakamı neyi belirtir?", "opts": ["Toz", "Su", "Darbe", "Sıcaklık"], "ans": 1, "ex": "1. rakam katı/toz, 2. rakam su korumasıdır."},
 {"q": "Düşük güç faktörünü düzelten pano?", "opts": ["Kompanzasyon panosu", "Yangın panosu", "Aydınlatma panosu", "Zayıf akım"], "ans": 0, "ex": "Kompanzasyon panosu reaktifi karşılar."},
 {"q": "TN-S ile beslenen bir tali panoda N ve PE baraları için doğru uygulama hangisidir?", "opts": ["Tek bara; N ve PE birlikte", "Ayrı baralar; her panoda köprülenir", "Ayrı baralar; aralarında köprü yok", "PE barası yok; gövdeler N'ye bağlı"], "ans": 2, "ex": "TN-S'de N ve PE besleme başından itibaren ayrıdır; N-PE bağlantısı yalnız besleme başında (PEN ayırma noktası) bir kez yapılır. Tali panoda köprülenirse nötr akımı PE'den döner, RCD'ler gereksiz açar."}
],
"20": [
 {"q": "Dizel jeneratörde elektriği üreten kısım?", "opts": ["Radyatör", "Alternatör", "Susturucu", "Akü"], "ans": 1, "ex": "Alternatör elektrik üretir."},
 {"q": "Şebeke kesilince jeneratöre çalış komutu verip yükü aktaran, şebeke dönünce geri alan düzen hangisidir?", "opts": ["UPS", "SPD", "RCD", "ATS"], "ans": 3, "ex": "ATS (otomatik transfer şalteri) şebekeyi izler, kesintide jeneratörü çalıştırır, gerilim/frekans uygun olunca yükü aktarır. Şebeke ile jeneratör arasında elektriksel ve mekanik kilit bulunur."},
 {"q": "'Standby' güç sınıfındaki bir jeneratör hangi durumda çalıştırılmak üzere seçilir?", "opts": ["Şebeke kesintisinde acil yedek olarak", "Sürekli, ana kaynak olarak", "Yalnız puant saatlerinde tasarruf için", "Şebekeye paralel enerji satışı için"], "ans": 0, "ex": "Standby, şebekenin olduğu tesiste kesinti süresince yedek besleme içindir; şebekesiz tesiste veya ana kaynak olarak Prime/Continuous değer esas alınır."},
 {"q": "Jeneratörleri paralel çalıştırmak için?", "opts": ["Topraklama", "Senkronizasyon", "Kompanzasyon", "Soğutma"], "ans": 1, "ex": "Gerilim, frekans ve faz eşitlenir (senkron)."},
 {"q": "Tesiste 400 kW yük var, ortalama cos φ = 0,8. Gerekli en küçük jeneratör görünür gücü kaç kVA'dır?", "opts": ["320 kVA", "400 kVA", "500 kVA", "640 kVA"], "ans": 2, "ex": "S = P / cos φ = 400 / 0,8 = 500 kVA. Jeneratörler kVA ile etiketlenir; motor kalkışı ve genişleme payı ayrıca eklenir."},
 {"q": "Soğutmayı sağlayan eleman?", "opts": ["Radyatör", "Alternatör", "Akü", "Egzoz"], "ans": 0, "ex": "Radyatör motor soğutmasını yapar."}
],
"21": [
 {"q": "Yıldırımdan korunma sisteminde yıldırımı ilk karşılayan en üst eleman hangisidir?", "opts": ["İniş iletkeni", "Topraklama barası", "Yakalama ucu", "Parafudr (SPD)"], "ans": 2, "ex": "Yakalama ucu (çubuk, çatı iletkeni veya örgü) yıldırımı karşılar, iniş iletkenleri toprağa taşır, topraklayıcı dağıtır."},
 {"q": "Yakalama ucunu topraklayıcıya bağlayan iletkene ne denir?", "opts": ["Koruma iletkeni (PE)", "Eşpotansiyel iletkeni", "Nötr iletkeni", "İniş iletkeni"], "ans": 3, "ex": "İniş iletkenleri yıldırım akımını en kısa ve düz yoldan topraklayıcıya iletir; keskin dönüşlerden kaçınılır."},
 {"q": "Yıldırımdan korunma topraklaması binadaki diğer topraklamalarla nasıl ilişkilendirilir?", "opts": ["Temel ve tesisat topraklamasıyla birleştirilir", "En az 20 m uzakta tamamen ayrı tutulur", "Yalnız su borusu üzerinden bağlanır", "Ana panonun nötr barasına bağlanır"], "ans": 0, "ex": "Yıldırım topraklaması temel topraklaması ve elektrik tesisatı topraklamasıyla birleştirilir; ayrı tutulan topraklayıcılar arasında yıldırım anında tehlikeli potansiyel farkı oluşur."},
 {"q": "İç tesisatı aşırı gerilimden koruyan?", "opts": ["Parafudur (SPD)", "Sayaç", "Sigorta yuvası", "Klemens"], "ans": 0, "ex": "SPD (parafudur) aşırı gerilimi sınırlar."},
 {"q": "Dış yıldırımlık (YKS) bulunan bir binanın ana girişinde hangi tip SPD kullanılır?", "opts": ["Tip 1", "Tip 2", "Tip 3", "Hiçbiri"], "ans": 0, "ex": "YKS varsa veya bina hava hattıyla besleniyorsa ana girişte 10/350 µs ile test edilen Tip 1 (veya Tip 1+2) kullanılır; YKS yoksa Tip 2 yeterli olabilir."},
 {"q": "Geniş yapıda örgü koruma yöntemi?", "opts": ["Faraday kafesi", "Yıldız bağlantı", "Delta", "Kompanzasyon"], "ans": 0, "ex": "Faraday kafesi örgü ile yüzey koruması sağlar."}
],
"22": [
 {"q": "Bahçede suya ve toza maruz dış mekân armatüründe aranan koruma derecesi hangisidir?", "opts": ["IP20 / IP21", "IP40 / IP41", "IP65 / IP67", "IP10 / IP11"], "ans": 2, "ex": "İlk rakam toz (6 = toz geçirmez), ikinci rakam su (5 = su jeti, 7 = geçici daldırma) korumasıdır. IP20/IP40 yalnız kuru iç mekân içindir."},
 {"q": "Bahçe aydınlatması için toprak altına döşenecek besleme kablosu hangisidir?", "opts": ["NYA", "NYAF", "NYM", "NYY"], "ans": 3, "ex": "NYY kalın PVC kılıflıdır, toprak altına uygundur (zırhlı değildir; taşlı zeminde boruya alınır). NYM toprağa gömülmez; NYA/NYAF tek damarlıdır."},
 {"q": "Yer altı kablosu yaklaşık kaç cm derine gömülür?", "opts": ["~5 cm", "~60 cm", "Yüzeye", "2 m"], "ans": 1, "ex": "~60 cm, üzerine ikaz bandı konur."},
 {"q": "Peyzaj aydınlatmasını otomatik yakıp söndürmek için hangi kumanda elemanları kullanılır?", "opts": ["Fotosel + zaman saati", "Termik aşırı yük rölesi", "Kaçak akım rölesi", "Faz koruma rölesi"], "ans": 0, "ex": "Fotosel karanlığı algılar, zaman saati gece yarısından sonra söndürür; ikisi seri bağlanarak birlikte kullanılabilir."},
 {"q": "Islak, dekoratif bahçe alanında (havuz, süs havuzu) tercih edilen besleme hangisidir?", "opts": ["230 V, RCD'siz doğrudan besleme", "400 V trifaze besleme", "12/24 V SELV (güvenlik trafosu ile)", "230 V, koruma sınıfı 0 armatür"], "ans": 2, "ex": "Islak alanda güvenlik transformatörüyle beslenen 12/24 V SELV tercih edilir; akım büyüdüğü için gerilim düşümü mutlaka hesaplanır."},
 {"q": "Koruma sınıfı II armatürün özelliği nedir?", "opts": ["Metal gövde PE'ye bağlanmalıdır", "Yalnız SELV ile beslenebilir", "Yalıtımı yoktur, topraklanarak korunur", "Çift/takviyeli yalıtım; PE bağlanmaz"], "ans": 3, "ex": "Sınıf II çift veya takviyeli yalıtımlıdır, koruma topraklaması gerekmez (⧈ sembolü). Sınıf I gövdesi PE'ye bağlanır; Sınıf III SELV ile beslenir."}
],
"23": [
 {"q": "Beton dökümünden ÖNCE elektrik ekibi döşeme ve perdelere ne yerleştirmelidir?", "opts": ["Geçiş kovanları (manşon) ve ankrajlar", "Armatürler, anahtarlar ve prizler", "Sayaç panosu ve dağıtım tablosu", "Kablo tavaları ve kablolar"], "ans": 0, "ex": "Sonradan kırım yapılmaması için kablo geçiş kovanları, gömme borular, kutular ve ankrajlar kalıp aşamasında yerleştirilir."},
 {"q": "Tavan boşluğunda kablo tavası ile en sık çakışma hangi disiplinle yaşanır?", "opts": ["Peyzaj (bahçe düzenlemesi)", "Mimari (zemin kaplaması)", "Mekanik (hava kanalı, sprinkler)", "Cephe (dış cephe boyası)"], "ans": 2, "ex": "Tavan boşluğunu en çok HVAC kanalları, sprinkler ve sıhhi borular paylaşır; güzergâhlar ortak kesitlerde koordine edilir."},
 {"q": "Veri kabloları güç kablolarından neden ayrı tava ve mesafeyle döşenir?", "opts": ["Kablo renklerinin karışması", "Tava ağırlığı", "Maliyet", "Elektromanyetik parazit"], "ans": 3, "ex": "Güç kablolarının manyetik alanı veri hatlarında parazit indükler; ayrı tava, ayırıcı perde ve yeterli mesafe kullanılır."},
 {"q": "Farklı disiplin modellerinin BIM ortamında üst üste konup çakışmaların inşaattan önce bulunmasına ne denir?", "opts": ["Çakışma kontrolü", "Metraj", "Uygulama (as-built) projesi", "Bilgi talebi (RFI)"], "ans": 0, "ex": "Çakışma kontrolü (clash detection) tava, kanal, boru ve kiriş çakışmalarını sahada değil modelde yakalar; düzeltme maliyeti en düşük aşamadır."},
 {"q": "Armatür ve tavan tipi elemanların (dedektör, menfez) yerleşimi hangi planla koordine edilir?", "opts": ["Statik kalıp planı", "Peyzaj planı", "Mimari tavan (asma tavan) planı", "Sıhhi tesisat kolon şeması"], "ans": 2, "ex": "Armatürler asma tavan modülüne ve mimari tavan planına oturtulur; menfez, sprinkler ve dedektörlerle çakışma bu planda çözülür."},
 {"q": "Asansör ve yangın güvenlik sistemleri nasıl beslenir?", "opts": ["Dairelerin genel priz linyesinden", "Ortak alan aydınlatma linyesinden", "En yakın kat panosundaki boş otomattan", "Ayrı ve güvenilir (yedekli) hattan"], "ans": 3, "ex": "Asansör, yangın pompası, duman tahliye gibi sistemler ayrı hatla ve yedek kaynaktan (jeneratör) beslenir; genel linyedeki bir arıza bu sistemleri durdurmamalıdır."}
],
"24": [
 {"q": "Transformatör hangi akımda çalışır?", "opts": ["Sadece DC", "Sadece AC", "Hem AC hem DC", "Hiçbiri"], "ans": 1, "ex": "Trafo değişken akı (indüksiyon) gerektirir; yalnız AC'de çalışır."},
 {"q": "Dönüştürme oranı bağıntısı?", "opts": ["N1/N2 = V1/V2", "N1·N2 = V1·V2", "N1/N2 = I1/I2", "N1+N2 = V1"], "ans": 0, "ex": "N1/N2 = V1/V2 = I2/I1."},
 {"q": "N2 > N1 olan trafo nedir?", "opts": ["Düşürücü", "Yükseltici", "Yalıtım", "Ölçü"], "ans": 1, "ex": "Sekonder sarımı fazlaysa gerilim yükselir → yükseltici."},
 {"q": "400 V / 230 V ideal bir trafonun sekonderinden 20 A çekiliyor. Primer akımı yaklaşık kaçtır?", "opts": ["8,7 A", "11,5 A", "20 A", "34,8 A"], "ans": 1, "ex": "İdeal trafoda güç korunur: U1·I1 = U2·I2 → I1 = 230 × 20 / 400 ≈ 11,5 A."},
 {"q": "Trafonun demir (nüve) kayıpları hangileridir?", "opts": ["Histerezis ve girdap akımı", "Sargı (bakır) kaybı", "Temas direnci kaybı", "Sürtünme ve vantilasyon kaybı"], "ans": 0, "ex": "Demir kayıpları histerezis ve girdap akımı kayıplarıdır, yükten bağımsızdır (boşta da vardır). Bakır kaybı ise yük akımının karesiyle artar."},
 {"q": "Primeri 1000 sarım olan trafoya 230 V uygulanıyor; sekonder 100 sarımdır. Sekonder gerilimi kaçtır?", "opts": ["11,5 V", "23 V", "115 V", "2300 V"], "ans": 1, "ex": "U2 = U1 × N2 / N1 = 230 × 100 / 1000 = 23 V."},
 {"q": "Üç fazda Δ sembolü neyi gösterir?", "opts": ["Yıldız", "Üçgen", "Toprak", "Nötr"], "ans": 1, "ex": "Δ üçgen, Y yıldız bağlantıyı gösterir."},
 {"q": "Trafo primerine DC uygulanırsa sekonderde neden gerilim indüklenmez?", "opts": ["Frekans çok yüksektir", "Nüve doyuma girmez", "Sabit akı gerilim indüklemez", "Sargı direnci sonsuzdur"], "ans": 2, "ex": "İndüksiyon akının değişimiyle olur; DC'de akı sabittir. Üstelik primer yalnız küçük sargı direnciyle sınırlanır, büyük akım çeker ve yanar."}
],
"25": [
 {"q": "Sanayide en yaygın kullanılan motor tipi hangisidir?", "opts": ["DA motoru", "Senkron motor", "Adım (step) motoru", "Asenkron (sincap kafesli)"], "ans": 3, "ex": "Sincap kafesli asenkron motor sağlam, ucuz ve az bakım gerektirir; hız kontrolü gerekirse frekans konvertörüyle yapılır."},
 {"q": "Yol alma akımını düşüren klasik yöntem?", "opts": ["Yıldız-üçgen", "Kompanzasyon", "Topraklama", "Parafudur"], "ans": 0, "ex": "Yıldız-üçgen yolverme başlangıç akımını azaltır."},
 {"q": "f=50 Hz, p=4 kutup → senkron hız (n=120f/p)?", "opts": ["750 d/d", "1500 d/d", "3000 d/d", "1000 d/d"], "ans": 1, "ex": "n = 120·50/4 = 1500 d/d."},
 {"q": "Motor hızını kademesiz ayarlayan cihaz?", "opts": ["Sürücü (VFD)", "Sigorta", "Kontaktör", "Trafo"], "ans": 0, "ex": "Frekans konvertörü (VFD) hızı kademesiz ayarlar."},
 {"q": "Senkron motorun asenkron motora göre ek faydası nedir?", "opts": ["Aşırı uyartımla cos φ'yi düzeltebilir", "Yapısı asenkrondan daha ucuzdur", "Yardımsız, kendi kendine kolay kalkar", "Rotor uyartımı gerektirmez"], "ans": 0, "ex": "Aşırı uyartılan senkron motor şebekeye kapasitif reaktif verir, tesis güç faktörünü düzeltir. Kalkışı ise yardımcı düzen ister."},
 {"q": "DA motorunun başlıca avantajı hangisidir?", "opts": ["Bakım gerektirmez", "Asenkrondan ucuzdur", "Hız kontrolü kolaydır", "Fırçasızdır"], "ans": 2, "ex": "DA motorunda hız, endüvi gerilimi veya uyartımla kolayca ayarlanır. Fırça-kolektör yapısı nedeniyle bakım ister."},
 {"q": "Yıldız-üçgen yolvermede başlangıç bağlantısı?", "opts": ["Üçgen", "Yıldız", "Karışık", "Seri"], "ans": 1, "ex": "Önce yıldız (düşük akım), sonra üçgen."},
 {"q": "Asenkron motorda dönen kısım?", "opts": ["Stator", "Rotor", "Nüve", "Klemens"], "ans": 1, "ex": "Rotor döner; stator sabit manyetik alanı oluşturur."},
 {"q": "Bir fazlı kondansatörlü asenkron motorda yardımcı sargıya seri bağlanan eleman ve görevi nedir?", "opts": ["Direnç; yardımcı sargı akımını sıfırlar", "Diyot; akımı doğrultup hızı artırır", "Kondansatör; faz kaydırıp kalkış momenti üretir", "Sigorta; kalkıştan sonra sargıyı ayırır"], "ans": 2, "ex": "Kondansatör yardımcı sargı akımını ana sargıya göre ileri kaydırır; iki sargı arasındaki faz farkı döner alan ve kalkış momenti oluşturur. Kalkıştan sonra yardımcı sargıyı ayıran eleman santrifüj anahtardır."},
 {"q": "4 kutuplu, 50 Hz asenkron motorun etiket hızı 1460 d/d'dir. Kayma yaklaşık yüzde kaçtır?", "opts": ["%1,3", "%2,7", "%4,0", "%5,4"], "ans": 1, "ex": "ns = 120 × 50 / 4 = 1500 d/d; s = (1500 − 1460) / 1500 ≈ 0,027 → %2,7."},
 {"q": "Etiketi 400/690 V olan motor 400 V şebekeye nasıl bağlanır?", "opts": ["Yıldız", "Üçgen", "Bağlanmaz", "Seri"], "ans": 1, "ex": "Küçük değer (400 V) şebekeye eşitse ÜÇGEN bağlanır; her sargı tam 400 V görür ve motor tam gücünü verir."},
 {"q": "Yıldız bağlantıda klemenste hangi uçlar köprülenir?", "opts": ["U1-V1-W1", "W2-U2-V2", "U1-W2", "Hiçbiri"], "ans": 1, "ex": "Yıldız noktası, sargı sonları W2-U2-V2 köprülenerek oluşur."},
 {"q": "400 V şebekede yıldız-üçgen yol verme hangi etiketli motora uygulanabilir?", "opts": ["230/400 V etiketli motor", "Tek fazlı kondansatörlü motor", "DA şönt motoru", "400/690 V etiketli motor"], "ans": 3, "ex": "Yıldız-üçgende motor sürekli çalışmada üçgen bağlıdır; bu yüzden sargılar üçgende 400 V'a uygun olmalıdır (400/690 V). 230/400 V motor 400 V'ta yıldız çalışır, üçgene geçirilemez."}
],
"26": [
 {"q": "Kaçak akım rölesi (RCD) çalışırken neyi algılar?", "opts": ["Faz ve nötr akımlarının farkını", "Faz akımının büyüklüğünü", "Faz-nötr gerilimini", "PE iletkenindeki gerilimi"], "ans": 0, "ex": "Faz ve nötr toroidden birlikte geçer; sağlam devrede akılar birbirini sıfırlar. Akımın bir kısmı PE veya insan üzerinden kaçarsa fark (IΔ) açma bobinini sürer."},
 {"q": "TT sistemde girişte 300 mA RCD var. RA × IΔn ≤ 50 V şartına göre izin verilen en büyük topraklama direnci kaçtır?", "opts": ["17 Ω", "50 Ω", "167 Ω", "1667 Ω"], "ans": 2, "ex": "RA ≤ 50 / 0,3 ≈ 167 Ω. 30 mA için bu sınır 1667 Ω'dur. Toprak direnci mevsime göre arttığından uygulamada çok daha düşük değer hedeflenir."},
 {"q": "TN-S sisteminde N ve PE?", "opts": ["Birleşik", "Ayrı", "Yok", "Aynı şey"], "ans": 1, "ex": "TN-S'de nötr (N) ve koruma (PE) ayrıdır."},
 {"q": "IT sisteminde kaynağın (trafo yıldız noktasının) durumu nedir?", "opts": ["Yıldız noktası doğrudan topraklı", "PEN iletkeniyle topraklı", "Topraktan yalıtılmış veya yüksek empedanslı", "Her gövde doğrudan nötre bağlı"], "ans": 2, "ex": "IT'de kaynak topraktan yalıtılmıştır; ilk arızada açma olmaz, izolasyon izleme cihazı alarm verir (ör. ameliyathane)."},
 {"q": "Eşpotansiyel bağlantının (baralamanın) amacı nedir?", "opts": ["Kaçak akımı artırmak", "Topraklama direncini ölçmek", "Nötr akımını taşımak", "Dokunma gerilimini azaltmak"], "ans": 3, "ex": "Aynı anda dokunulabilecek iletken kısımlar (boru, gövde, yapı elemanı) aynı potansiyele getirilir; aralarında tehlikeli gerilim oluşmaz."},
 {"q": "Yangın koruması için RCD eşiği?", "opts": ["10 mA", "30 mA", "~300 mA", "30 A"], "ans": 2, "ex": "Yangın koruması tipik olarak ~300 mA'dir."},
 {"q": "TT sisteminde cihaz gövdesi nereye bağlanır?", "opts": ["Tesisin kendi topraklayıcısına", "Dağıtım şebekesinin PEN iletkenine", "Tesis içindeki nötr iletkenine", "Gövde yalıtılır, bağlanmaz"], "ans": 0, "ex": "TT'de gövdeler, trafo topraklamasından bağımsız tesis topraklayıcısına (RA) bağlanır; arıza akımı toprak üzerinden döndüğü için küçüktür ve RCD pratikte zorunludur."},
 {"q": "TN-C-S tesiste C16 otomatlı linye var; anlık açma için Ia = 10 × In alınıyor. U0 = 230 V için izin verilen en büyük Zs kaçtır?", "opts": ["0,72 Ω", "1,44 Ω", "2,88 Ω", "14,4 Ω"], "ans": 1, "ex": "Zs ≤ U0 / Ia = 230 / 160 ≈ 1,44 Ω. Ölçülen değer sıcaklık payı için bu sınırın yaklaşık 2/3'ü (≈0,96 Ω) ile karşılaştırılır. B16 için sınır 2,88 Ω'dur."},
 {"q": "Elektrikli araç şarj istasyonu devresinde hangi tip kaçak akım rölesi kullanılmalıdır?", "opts": ["AC tipi", "A tipi", "B tipi", "S tipi"], "ans": 2, "ex": "EV şarjı düz DC kaçak üretebilir; B tipi bunu algılar. A tipi ancak 6 mA düz DC kaçağı algılayan düzenle (RDC-DD, çoğu şarj ünitesinde dahili) birlikte kullanılabilir; AC tipi uygun değildir."},
 {"q": "Kaçak akım rölesindeki 'A' harfi neyi ifade eder?", "opts": ["Sadece AC kaçakları algılar", "AC + darbeli DC kaçakları algılar", "Sadece DC algılar", "Gecikmeli açar"], "ans": 1, "ex": "A tipi, sinüzoidal AC'ye ek olarak darbeli DC kaçak akımlarını da algılar — çamaşır/bulaşık makinesi gibi elektronik yüklü modern evler için en uygun tiptir."},
 {"q": "S tipi kaçak akım rölesinin özelliği nedir?", "opts": ["Yüksek frekanslı kaçağı algılar", "Düz DC kaçağı algılar", "Gecikmeli açar (seçicilik sağlar)", "10 mA hassasiyetlidir"], "ans": 2, "ex": "S = selektif. IΔn'de 130–500 ms arasında açar; ana panoda kullanılır ki önce alttaki 30 mA genel tip röle açsın. Seçicilik için üstteki IΔn alttakinin en az 3 katıdır."},
 {"q": "30 mA genel tip RCD test cihazıyla denendi. Hangi sonuç RCD'nin ARIZALI olduğunu gösterir?", "opts": ["15 mA'de açmadı", "30 mA'de 24 ms'de açtı", "150 mA'de 12 ms'de açtı", "30 mA'de 420 ms'de açtı"], "ans": 3, "ex": "Genel tip RCD ½ IΔn'de açmamalı, 1 × IΔn'de en geç 300 ms, 5 × IΔn'de en geç 40 ms içinde açmalıdır. 420 ms > 300 ms olduğundan röle değiştirilir."},
 {"q": "Tek fazlı inverter klima ve ısı pompası devresi için tercih edilen röle tipi?", "opts": ["AC", "A", "F", "S"], "ans": 2, "ex": "F tipi; A tipine ek olarak tek fazlı frekans konvertörünün 1 kHz'e kadar karışık frekanslı kaçağını algılar. Üç fazlı sürücülerde B tipi gerekir."}
],
"27": [
 {"q": "C tipi otomatın açma aralığı?", "opts": ["3–5·In", "5–10·In", "10–20·In", "1–2·In"], "ans": 1, "ex": "C eğrisi 5–10·In; priz/motor devrelerinde yaygın."},
 {"q": "Koruma tekniğinde seçicilik (selektivite) ne demektir?", "opts": ["Tüm korumalar aynı anda açar", "Önce ana şalter açar", "Yalnız kaçak akım röleleri açar", "Yalnız arızaya en yakın koruma açar"], "ans": 3, "ex": "Arıza en yakın koruma elemanında temizlenir; üst kademe beslemede kalır. Akım ve zaman kademelendirmesiyle sağlanır."},
 {"q": "Kesicinin kesme kapasitesi birimi?", "opts": ["A", "kA", "V", "Hz"], "ans": 1, "ex": "Kesme kapasitesi kiloamper (kA) ile verilir."},
 {"q": "TS HD 60364-5-52 bilgi ekine göre (kamu şebekesinden beslemede) aydınlatma devresinde önerilen en büyük gerilim düşümü?", "opts": ["%3", "%5", "%10", "%1"], "ans": 0, "ex": "Standardın bilgi eki aydınlatmada ≈%3, diğer devrelerde ≈%5 önerir. Elektrik İç Tesisleri Yönetmeliği sayaçtan sonrası için ayrıca daha sıkı sınır (aydınlatma/priz %1,5) koyar."},
 {"q": "TS HD 60364-5-52 bilgi ekine göre kuvvet (motor) devrelerinde önerilen en büyük gerilim düşümü?", "opts": ["≤%3", "≤%5", "≤%15", "Sınır yok"], "ans": 1, "ex": "Standardın bilgi eki kuvvet devrelerinde ≈%5 önerir; İç Tesisleri Yönetmeliği sayaç sonrası motor devreleri için %3 sınırı koyar."},
 {"q": "Panoda beklenen kısa devre akımı 8 kA'dir. Hangi kesme kapasitesine sahip MCB seçilmelidir?", "opts": ["3 kA", "4,5 kA", "6 kA", "10 kA"], "ans": 3, "ex": "Kesme kapasitesi, bulunduğu noktadaki beklenen kısa devre akımından büyük olmalıdır: 10 kA ≥ 8 kA. Yetersiz kA'lı cihaz kısa devrede kontakları kaynatır ve patlayabilir."},
 {"q": "B tipi otomat hangi yük için uygun?", "opts": ["Yüksek başlangıç akımlı", "Dirençsel/aydınlatma", "Sadece motor", "Trafo"], "ans": 1, "ex": "B eğrisi düşük açma akımı; aydınlatma/dirençsel yükler için."},
 {"q": "230 V, 3000 W yük 30 m hatta 2,5 mm² bakır (k = 56) ile besleniyor. Gerilim düşümü yaklaşık yüzde kaçtır? (%e = 200·L·P / (k·S·U²))", "opts": ["%0,81", "%1,22", "%2,43", "%4,86"], "ans": 2, "ex": "%e = 200 × 30 × 3000 / (56 × 2,5 × 230²) ≈ %2,43 > %1,5 → kesit büyütülür (4 mm² ile ≈ %1,52; 6 mm² ile ≈ %1,01)."},
 {"q": "Üç fazlı akım formülü hangisidir?", "opts": ["I = P/(V·cosφ)", "I = P/(√3·V·cosφ)", "I = P·√3·V", "I = V/P"], "ans": 1, "ex": "Üç fazda I = P/(√3·U·cosφ); √3≈1,73. Tek fazda I = P/(V·cosφ)."},
 {"q": "Kablo kesitini belirleyen 3 kriterden hangisi seçilir?", "opts": ["En incesi", "En kalını", "Ortalaması", "Rastgele"], "ans": 1, "ex": "Akım kapasitesi, gerilim düşümü ve koruma uyumundan EN KALIN çıkan kesit seçilir."},
 {"q": "Sigorta–kablo uyumunda doğru sıralama hangisidir?", "opts": ["Ib ≤ In ≤ Iz", "Iz ≤ In ≤ Ib", "In ≤ Ib ≤ Iz", "Ib ≤ Iz ≤ In"], "ans": 0, "ex": "Yük akımı ≤ sigorta anma akımı ≤ kablonun taşıma kapasitesi. Böylece kablo aşırı ısınmadan koruma açar."}
],
"28": [
 {"q": "Aydınlık düzeyinin (yüzeye düşen ışık) birimi nedir?", "opts": ["Lümen (lm)", "Kandela (cd)", "Lüks (lx)", "Kelvin (K)"], "ans": 2, "ex": "Aydınlık düzeyi E, lüks ile ölçülür: 1 lx = 1 lm/m². Lümen ışık akısı, kandela ışık şiddeti, Kelvin renk sıcaklığıdır."},
 {"q": "Bir ışık kaynağının yaydığı toplam ışık akısının birimi nedir?", "opts": ["Lüks (lx)", "Kandela (cd)", "Watt (W)", "Lümen (lm)"], "ans": 3, "ex": "Işık akısı lümen ile ifade edilir; ışık verimi lm/W ile hesaplanır."},
 {"q": "1 lüks kaça eşittir?", "opts": ["1 lm/m²", "1 W/m²", "1 cd", "1 lm·m²"], "ans": 0, "ex": "1 lx = 1 lm/m²."},
 {"q": "Ofis için önerilen aydınlık düzeyi?", "opts": ["~100 lx", "~500 lx", "~50 lx", "~2000 lx"], "ans": 1, "ex": "Ofis çalışması için ~500 lx önerilir."},
 {"q": "Armatür verimi hangi birimle ifade edilir?", "opts": ["lm/W", "W/lm", "lx/m", "cd/W"], "ans": 0, "ex": "Verim lümen/Watt (lm/W) ile ifade edilir."},
 {"q": "En verimli ışık kaynağı?", "opts": ["Akkor", "Floresan", "LED", "Halojen"], "ans": 2, "ex": "LED en yüksek lm/W verime sahiptir."},
 {"q": "Renkleri gerçekçi gösterme ölçüsü?", "opts": ["CRI (Ra)", "Lümen", "Kelvin", "Lüks"], "ans": 0, "ex": "CRI (Ra) renksel geriverim indeksidir."},
 {"q": "Aydınlatma hesabında bakım faktörü neden kullanılır?", "opts": ["Kirlenme ve yaşlanmayla ışık azalır", "Renk sıcaklığı düzeltilir", "Kamaşma azaltılır", "Armatür maliyeti düşürülür"], "ans": 0, "ex": "Zamanla lamba akısı düşer, armatür ve oda yüzeyleri kirlenir; hedef aydınlık düzeyinin bakım dönemi sonunda da sağlanması için hesap bu faktörle yapılır."}
],
"29": [
 {"q": "Binaların iç tesisatına (hat, priz, pano, kablo döşeme) ilişkin kuralları hangi yönetmelik belirler?", "opts": ["Elektrik Kuvvetli Akım Tesisleri Yönetmeliği", "Elektrik Tesislerinde Topraklamalar Yönetmeliği", "Elektrik İç Tesisleri Yönetmeliği", "İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği"], "ans": 2, "ex": "İç tesisat kuralları Elektrik İç Tesisleri Yönetmeliği'ndedir. Kuvvetli Akım yönetmeliği üretim-iletim-dağıtım ve YG tesislerini, Topraklamalar yönetmeliği topraklama esaslarını düzenler."},
 {"q": "6331 sayılı Kanuna göre iş kazası SGK'ya en geç ne zaman bildirilir?", "opts": ["Aynı gün mesai bitimine kadar", "Olaydan sonraki 10 gün içinde", "Ay sonunda toplu olarak", "Olaydan sonraki 3 iş günü içinde"], "ans": 3, "ex": "İşveren iş kazasını olaydan sonraki üç iş günü içinde Sosyal Güvenlik Kurumu'na bildirir."},
 {"q": "LOTO uygulaması neyi ifade eder?", "opts": ["Kilitle-etiketle (enerji izolasyonu)", "Topraklama ve kısa devre etme", "Yük altında ayırıcı açma", "Periyodik kontrol ve raporlama"], "ans": 0, "ex": "Lockout-Tagout: açılan enerji ayırıcısı kişisel kilitle sabitlenir ve etiketlenir; iş bitene kadar kimse enerji veremez."},
 {"q": "Havalimanı elektrik tesislerinde ICAO standartlarına ek olarak hangi düzenleme ve denetim geçerlidir?", "opts": ["Belediye imar yönetmeliği", "Yalnız TSE belgelendirmesi", "SHGM düzenlemeleri (SHT) ve denetimi", "Ek düzenleme yoktur"], "ans": 2, "ex": "Havacılıkta Sivil Havacılık Genel Müdürlüğü düzenlemeleri ve talimatları (SHT) uygulanır; SHGM denetler."},
 {"q": "YG hücresinde manevra yapabilmek için hangisi gereklidir?", "opts": ["Sahadaki ustanın sözlü izni", "Yalnız MYK mesleki yeterlilik belgesi", "En az 5 yıllık saha tecrübesi", "EKAT belgesi ve işverenin yazılı yetkisi"], "ans": 3, "ex": "YG'de çalışmak için eğitim/yetki belgesi (EKAT) ve belirli tesis ile iş için işverenin yazılı görevlendirmesi gerekir; belge tek başına yetmez."},
 {"q": "İSG kontrol hiyerarşisinde kişisel koruyucu donanım (KKD) hangi sıradadır?", "opts": ["En son çare olarak", "İlk tercih olarak", "Mühendislik önleminden önce", "İkame ile aynı düzeyde"], "ans": 0, "ex": "Sıra: ortadan kaldırma → ikame → mühendislik önlemi → idari önlem → KKD. KKD kalan riske karşı son bariyerdir, tek başına yeterli sayılmaz."},
 {"q": "Topraklama sistemlerinin tasarım, ölçüm ve dokunma/adım gerilimi esaslarını hangi yönetmelik verir?", "opts": ["Elektrik İç Tesisleri Yönetmeliği", "Elektrik Kuvvetli Akım Tesisleri Yönetmeliği", "Elektrik Tesislerinde Topraklamalar Yönetmeliği", "İş Ekipmanları Yönetmeliği"], "ans": 2, "ex": "Topraklamalar Yönetmeliği; topraklama sistemlerinin tasarım, kurulum, ölçüm, kontrol esaslarını ve dokunma/adım gerilimi sınırlarını düzenler."},
 {"q": "Yazılı iş izni (çalışma izni) ne zaman alınır?", "opts": ["Yalnız gece vardiyasında", "Yalnız iş bittikten sonra", "Yalnız ofis içi işlerde", "Riskli ve YG çalışmalarından önce"], "ans": 3, "ex": "İş izni; iş tanımı, yer, süre, alınan önlemler ve sorumluları içerir. İş bitince izin kapatılmadan enerji verilmez."}
],
"30": [
 {"q": "Yarı iletkenin son yörüngesinde kaç elektron bulunur?", "opts": ["2", "4", "6", "8"], "ans": 1, "ex": "Yarı iletkenlerde valans yörüngesinde 4 elektron vardır."},
 {"q": "Elektronikte en yaygın kullanılan iki yarı iletken malzeme hangileridir?", "opts": ["Silisyum ve germanyum", "Bakır ve alüminyum", "Gümüş ve altın", "Karbon ve demir"], "ans": 0, "ex": "Silisyum (Si) ve germanyum (Ge) dört değerlikli yarı iletkenlerdir; bugün diyot ve transistörlerin büyük kısmı silisyumdur."},
 {"q": "5 değerlikli katkı ile elde edilen yarı iletken?", "opts": ["N tipi", "P tipi", "Yalıtkan", "İletken"], "ans": 0, "ex": "Fazla elektron → N tipi."},
 {"q": "Diyot akımı hangi yönde geçirir?", "opts": ["Yalnız katottan anoda", "Her iki yönde eşit", "Yalnız anottan katoda", "Hiçbir yönde"], "ans": 2, "ex": "Doğru polarmada (anot +) diyot iletir; ters polarmada tıkar."},
 {"q": "Diyot doğru polarmada nasıl davranır?", "opts": ["Tıkar", "İletir", "Patlar", "Isınmaz"], "ans": 1, "ex": "Doğru polarma (anot +) → iletir."},
 {"q": "Multimetre diyot kademesinde sağlam bir silisyum diyot doğru yönde yaklaşık ne gösterir?", "opts": ["0,1–0,2 V", "0,5–0,7 V", "1,5–2 V", "OL (açık devre)"], "ans": 1, "ex": "Sağlam Si diyot doğru yönde 0,5–0,7 V, ters yönde OL gösterir. İki yönde de ≈0 V kısa devre (delinmiş), iki yönde de OL açık devre (kopuk) demektir."},
 {"q": "2 V / 20 mA LED 12 V kaynaktan beslenecek. Gereken seri direnç kaçtır?", "opts": ["100 Ω", "500 Ω", "600 Ω", "1 kΩ"], "ans": 1, "ex": "R = (12 − 2) / 0,02 = 500 Ω (standart değer olarak 510 Ω seçilir). Dirençteki güç 10 × 0,02 = 0,2 W; en az 0,25 W, tercihen 0,5 W direnç kullanılır."},
 {"q": "P tipi yarı iletkende çoğunluk taşıyıcısı?", "opts": ["Elektron", "Oyuk (hole)", "Proton", "Nötron"], "ans": 1, "ex": "P tipinde çoğunluk taşıyıcı oyuktur."}
],
"31": [
 {"q": "Doğrultma işlemi nedir?", "opts": ["DC'yi AC'ye çevirme", "AC'yi DC'ye çevirme", "Gerilim yükseltme", "Akım ölçme"], "ans": 1, "ex": "Doğrultma AC'yi DC'ye çevirir."},
 {"q": "Tek fazlı doğrultucular devre yapısına göre kaç temel türde incelenir?", "opts": ["2", "3", "4", "5"], "ans": 1, "ex": "Yarım dalga (1 diyot), orta uçlu tam dalga (2 diyot) ve köprü tipi tam dalga (4 diyot). Köprü de bir tam dalga doğrultucudur."},
 {"q": "Yarım dalga doğrultucuda kaç diyot vardır?", "opts": ["1", "2", "4", "6"], "ans": 0, "ex": "Yarım dalga tek diyotludur."},
 {"q": "Köprü doğrultucuda kaç diyot vardır?", "opts": ["1", "2", "4", "8"], "ans": 2, "ex": "Köprü doğrultucu 4 diyotludur."},
 {"q": "Köprü tipi doğrultucunun orta uçlu tam dalga doğrultucuya göre avantajı nedir?", "opts": ["Tek diyotla çalışır", "Filtre kondansatörü gerektirmez", "Diyotlarda gerilim düşümü olmaz", "Orta uçlu trafo gerektirmez"], "ans": 3, "ex": "Köprü 4 diyotla, sıradan bir sekonder sargıdan tam dalga doğrultma yapar; orta uçlu trafo gerekmez. Yük akımı her yarım periyotta iki diyottan geçer."},
 {"q": "Tam dalga doğrultucunun yarım dalga doğrultucuya göre temel avantajı nedir?", "opts": ["Her iki alternansı da kullanır", "Daha az diyot kullanır", "Çıkışta AC verir", "Trafo gerektirmez"], "ans": 0, "ex": "Tam dalgada her iki alternans yüke aktarılır; ortalama DC gerilim iki katına çıkar ve dalgalanma frekansı 100 Hz olduğu için filtrelemek kolaylaşır."},
 {"q": "Doğrultucu çıkışındaki dalgalanmayı (ripple) azaltmak için yüke paralel bağlanan eleman hangisidir?", "opts": ["Seri bağlı sigorta", "Paralel varistör", "Filtre kondansatörü", "İlave diyot"], "ans": 2, "ex": "Kondansatör tepe değerlerde dolar, aralarda yüke boşalır; DC'yi düzleştirir. Kapasite ve yük akımı arttıkça dalgalanma değişir."},
 {"q": "Telefon adaptörü temelde ne yapar?", "opts": ["DC'yi AC yapar", "AC'yi DC yapar", "Frekans artırır", "Direnç ölçer"], "ans": 1, "ex": "Adaptör şebeke AC'sini cihaz DC'sine doğrultur."}
],
"32": [
 {"q": "Transistör kaç uçludur?", "opts": ["2", "3", "4", "5"], "ans": 1, "ex": "Beyz, Kolektör, Emiter — üç uç."},
 {"q": "Transistör türleri?", "opts": ["N ve P", "NPN ve PNP", "A ve B", "AC ve DC"], "ans": 1, "ex": "İki temel tür: NPN ve PNP."},
 {"q": "Transistörün iki temel işlevi?", "opts": ["Ölçme ve doğrultma", "Anahtarlama ve yükseltme", "Topraklama ve yalıtım", "Isıtma ve soğutma"], "ans": 1, "ex": "Anahtar (aç-kapa) ve yükselteç olarak çalışır."},
 {"q": "Transistörde kumanda ucu hangisidir?", "opts": ["Beyz", "Kolektör", "Emiter", "Toprak"], "ans": 0, "ex": "Beyz akımı C-E iletimini kontrol eder."},
 {"q": "Küçük beyz akımı neyi kontrol eder?", "opts": ["Büyük kolektör akımını", "Gerilimi sıfırlar", "Frekansı", "Direnci"], "ans": 0, "ex": "Küçük beyz sinyali büyük kolektör akımını sürer."},
 {"q": "Transistör neyin elektronik karşılığı sayılır?", "opts": ["Sigortanın", "Röle/anahtarın", "Trafonun", "Sayacın"], "ans": 1, "ex": "Küçük sinyalle büyük yükü sürdüğü için röle/anahtar gibidir."},
 {"q": "Dijital devrede transistör nasıl çalışır?", "opts": ["Aç-kapa anahtar", "Sadece yükselteç", "Doğrultucu", "Ölçü aleti"], "ans": 0, "ex": "Dijitalde ON/OFF anahtar olarak kullanılır."},
 {"q": "Yükselteçte transistörün görevi?", "opts": ["Küçük sinyali büyütmek", "Sinyali yok etmek", "DC üretmek", "Topraklamak"], "ans": 0, "ex": "Zayıf sinyali kazançla büyütür."}
],
"33": [
 {"q": "Elektrik çarpmasında tehlikeyi asıl belirleyen?", "opts": ["Gerilim", "Akım şiddeti", "Renk", "Frekans markası"], "ans": 1, "ex": "Vücuttan geçen akımın şiddeti tehlikeyi belirler."},
 {"q": "Vücuttan geçen yaklaşık 1 mA AC akımın tipik etkisi nedir?", "opts": ["Kalp durması", "Kas kilitlenmesi", "Solunum durması", "Hissetme eşiği"], "ans": 3, "ex": "≈1 mA hissetme eşiğidir; 10–15 mA civarında bırakamama, 30–50 mA ve üzerinde süreye bağlı fibrilasyon riski başlar."},
 {"q": "Kalp fibrilasyonu riski için doğru ifade hangisidir?", "opts": ["Akım şiddeti ve temas süresine birlikte bağlıdır", "Yalnız 1 A üzerindeki akımda oluşur", "Yalnız doğru akımda (DC) oluşur", "Yalnız gerilime bağlıdır, süre etkisizdir"], "ans": 0, "ex": "Eşik süreye bağlıdır: kısa temasta yüzlerce mA gerekirken ≈1 s ve üzeri temasta 30–50 mA fibrilasyon başlatabilir. 30 mA RCD bu yüzden seçilir."},
 {"q": "Vücuttan 15–25 mA AC akım geçtiğinde tipik etki nedir?", "opts": ["Yalnız hafif karıncalanma", "Deride yanık, iç etki yok", "Kas kasılması, iletkeni bırakamama", "Anında kalp durması"], "ans": 2, "ex": "Bırakamama eşiğinin üstünde kaslar kasılır, el iletkeni kavrar; temas uzar, deri direnci düşer ve akım artar."},
 {"q": "Eşit değerde hangisi daha tehlikelidir?", "opts": ["Doğru akım (DA)", "Alternatif akım (AA)", "İkisi eşit", "Hiçbiri"], "ans": 1, "ex": "AA (50 Hz) kalp ritmini bozmaya daha yatkındır."},
 {"q": "Akıma kapılmış birine İLK müdahale ne olmalıdır?", "opts": ["Hemen elinden çekmek", "Üzerine su dökmek", "Kalp masajına başlamak", "Önce enerjiyi kesmek"], "ans": 3, "ex": "Enerji kesilmeden dokunan ikinci kazazede olur. Kesilemiyorsa kazazede kuru yalıtkan bir cisimle kaynaktan ayrılır."},
 {"q": "Enerji kesilemiyorsa kazazede kaynaktan neyle ayrılır?", "opts": ["Kuru tahta veya plastik sopayla", "Çıplak elle hızlıca çekerek", "Islak bir bez yardımıyla", "Uzun bir metal boruyla"], "ans": 0, "ex": "Kuru, yalıtkan bir cisim kullanılır; kurtaran kişi de kuru ve yalıtkan zeminde durmalıdır. YG'de yaklaşılmaz."},
 {"q": "Kazazedenin bilinci ve normal solunumu yoksa ne yapılır?", "opts": ["Su içirilmeye çalışılır", "Ayağa kaldırılıp yürütülür", "112 aranır, CPR'ye başlanır", "Kendine gelmesi beklenir"], "ans": 2, "ex": "112 aranır, göğüs basısına başlanır (dakikada 100–120, 5–6 cm, 30:2); OED varsa hemen getirtilip bağlanır."}
],
"34": [
 {"q": "Bir 30 mA RCD altında her biri ≈1,2 mA sürekli kaçak akıtan 8 bilgisayar/TV/modem var; röle zaman zaman sebepsiz atıyor. Doğru çözüm?", "opts": ["RCD'yi 300 mA ile değiştirmek", "RCD'yi köprülemek", "Cihazların PE bağlantısını sökmek", "Devreleri iki ayrı 30 mA RCD'ye bölmek"], "ans": 3, "ex": "8 × 1,2 ≈ 9,6 mA, 30 mA'in yaklaşık %30'u sınırındadır; küçük bir nem kaçağı eklenince röle atar. Çözüm yükü bölmektir; hassasiyeti düşürmek veya köprülemek insan korumasını kaldırır."},
 {"q": "Otomatik sigorta (MCB) neye karşı korur?", "opts": ["Aşırı akım ve kısa devreye", "Toprağa kaçak akıma", "Şebekedeki aşırı gerilime", "Ters faz sırasına"], "ans": 0, "ex": "MCB termik açıcıyla aşırı yüke, manyetik açıcıyla kısa devreye karşı korur. Kaçak akım için RCD, aşırı gerilim için SPD/gerilim rölesi gerekir."},
 {"q": "Pano içinde DIN ray ne işe yarar?", "opts": ["Topraklama barası olarak", "Nötr dağıtımına", "Modüler cihazların montajına", "Kablo kanalı olarak"], "ans": 2, "ex": "35 mm DIN ray MCB, RCD, röle gibi modüler cihazların takılıp sabitlenmesini sağlar; bara veya iletken olarak kullanılmaz."},
 {"q": "Daire panosunda doğru besleme sırası hangisidir?", "opts": ["Sayaç → MCB → RCD → Ana şalter", "Ana şalter → Sayaç → MCB → RCD", "RCD → Sayaç → Ana şalter → MCB", "Sayaç → Ana şalter → RCD → MCB"], "ans": 3, "ex": "Enerji ölçülür, ana şalterden geçer, kaçak akım korumasından sonra linye otomatlarına dağılır."},
 {"q": "Nötr iletkeni rengi?", "opts": ["Mavi", "Kahverengi", "Sarı-yeşil", "Kırmızı"], "ans": 0, "ex": "Nötr mavidir."},
 {"q": "NYM 3×1,5 kablonun mavi damarı anahtar dönüş teli olarak kullanıldı. Doğru uygulama hangisidir?", "opts": ["İki ucu faz rengiyle işaretlenir", "Olduğu gibi bırakılır", "Nötr klemensine bağlanır", "Yeşil-sarı ile yer değiştirilir"], "ans": 0, "ex": "Mavi yalnız nötr içindir; başka amaçla kullanıldıysa iki ucu kahverengi/siyah bant veya kılıfla işaretlenir. Yeşil-sarı hiçbir koşulda faz veya dönüş olarak kullanılmaz."},
 {"q": "Daire panosundaki gerilim koruma rölesi ne yapar?", "opts": ["Aşırı akımda enerjiyi keser", "Kaçak akımda enerjiyi keser", "Aşırı/düşük gerilimde enerjiyi keser", "Kısa devrede enerjiyi keser"], "ans": 2, "ex": "Gerilim ayarlanan alt/üst sınırın dışına çıkınca (ör. nötr kopması) kontaktör veya şönt açıcıyla enerjiyi keser, gerilim normale dönünce gecikmeli geri verir."},
 {"q": "C16 etiketi neyi belirtir?", "opts": ["C eğrisi, 16 A", "16 V", "16 devre", "C sınıfı kablo"], "ans": 0, "ex": "C tipi açma eğrisi, 16 amper anma akımı."}
],
"35": [
 {"q": "Elektrik sayacı temel olarak neyi ölçer?", "opts": ["Anlık gerilimi (V)", "İletken direncini (Ω)", "Şebeke frekansını (Hz)", "Tüketilen aktif enerjiyi (kWh)"], "ans": 3, "ex": "Sayaç aktif enerjiyi kWh cinsinden ölçer; kombi sayaçlar reaktif enerjiyi (kVArh) de kaydeder."},
 {"q": "Ev tipi (monofaze) sayaç kaç iletkenle bağlanır?", "opts": ["Faz + nötr (2)", "3 faz + nötr", "Sadece faz", "5 iletken"], "ans": 0, "ex": "Monofaze: 1 faz + nötr."},
 {"q": "Trifaze sayaç bağlantısı?", "opts": ["1 faz + nötr", "3 faz + nötr", "2 faz", "Sadece nötr"], "ans": 1, "ex": "Trifaze: 3 faz + nötr (işyeri/sanayi)."},
 {"q": "Tüketici tesisinde doğru bağlantı sırası hangisidir?", "opts": ["Şebeke → ana kesici → sayaç → RCD → MCB", "Şebeke → sayaç → MCB → ana kesici → RCD", "Şebeke → RCD → sayaç → MCB → ana kesici", "Şebeke → MCB → RCD → sayaç → ana kesici"], "ans": 0, "ex": "Enerji girişi → sayaç önü koruma → ölçüm → kaçak akım koruması → linye otomatları sırasıyla ilerler."},
 {"q": "Sayacın giriş uçları nereye bağlanır?", "opts": ["Tesisata", "Şebekeye", "Toprağa", "Linyeye"], "ans": 1, "ex": "Giriş şebekeden, çıkış tesisata; uçlar karıştırılmaz."},
 {"q": "Sayaç/ana kesicideki mühüre müdahale?", "opts": ["Serbest", "Yasak (kaçak sayılır)", "İzinle serbest", "Sadece geceleri"], "ans": 1, "ex": "Mühürlü kısma müdahale kaçak elektrik sayılır ve yasaktır."},
 {"q": "Akım trafolu ölçü panosunda sayaç değiştirilecek. Akım trafosu sekonderi için doğru işlem nedir?", "opts": ["Sekonder açık bırakılır", "Sekonder topraktan ayrılır", "Önce sekonder kısa devre edilir", "Primer akımı yükseltilir"], "ans": 2, "ex": "Açık sekonderde tehlikeli yüksek gerilim indüklenir; sayaç sökülmeden önce test klemensinde sekonder kısa devre edilir."},
 {"q": "Yeşil-sarı damar hangi amaçla kullanılabilir?", "opts": ["Gerektiğinde anahtar dönüş teli", "Gerektiğinde nötr iletkeni", "Kumanda devresi fazı", "Yalnız koruma iletkeni (PE/PEN)"], "ans": 3, "ex": "Yeşil-sarı yalnız koruma iletkeni içindir (PEN'de ayrıca mavi işaret konur); başka hiçbir işte kullanılmaz."}
],
"36": [
 {"q": "230 V'ta 2300 W çeken bir ısıtıcının akımı ve direnci nedir?", "opts": ["10 A; 23 Ω", "10 A; 2,3 Ω", "1 A; 230 Ω", "100 A; 2,3 Ω"], "ans": 0, "ex": "I = P / U = 2300 / 230 = 10 A; R = U / I = 230 / 10 = 23 Ω."},
 {"q": "2 kW'lık ısıtıcı günde 3 saat, 30 gün çalışıyor. Aylık tüketim kaç kWh'tir?", "opts": ["60 kWh", "90 kWh", "180 kWh", "600 kWh"], "ans": 2, "ex": "E = P × t = 2 kW × 3 h × 30 = 180 kWh."},
 {"q": "Güç hangi birimle ifade edilir?", "opts": ["Volt", "Watt", "Joule", "Ohm"], "ans": 1, "ex": "Güç Watt (W) ile ifade edilir."},
 {"q": "1 kWh birim fiyat 3 TL ise 1500 W'lık klimanın 8 saatlik enerji maliyeti kaç TL'dir?", "opts": ["4,5 TL", "12 TL", "24 TL", "36 TL"], "ans": 3, "ex": "E = 1,5 kW × 8 h = 12 kWh; maliyet = 12 × 3 = 36 TL."},
 {"q": "Etiketinde 230 V / 4,5 A yazan bir cihazın gücü yaklaşık kaçtır? (cos φ ≈ 1)", "opts": ["≈ 51 W", "≈ 460 W", "≈ 1035 W", "≈ 2070 W"], "ans": 2, "ex": "P = U × I = 230 × 4,5 ≈ 1035 W ≈ 1 kW."},
 {"q": "Faturadaki tüketim (enerji) hangi birimledir?", "opts": ["Watt", "kWh", "Volt", "Amper"], "ans": 1, "ex": "Enerji tüketimi kWh (kilovatsaat) ile ölçülür."},
 {"q": "Faturada 1 kWh olarak görülen enerji aşağıdakilerden hangisine eşittir?", "opts": ["100 W gücün 1 saat çalışması", "1000 W gücün 1 dakika çalışması", "1 kW gücün 1 saniye çalışması", "1000 W gücün 1 saat çalışması"], "ans": 3, "ex": "kWh = kW × saat; 1000 W × 1 h = 1 kWh. Örneğin 100 W'lık lamba 10 saatte 1 kWh harcar."},
 {"q": "Su benzetmesinde 'Volt' neye benzer?", "opts": ["Debiye", "Basınca", "Darlığa", "Sıcaklığa"], "ans": 1, "ex": "Volt = basınç, Amper = debi, Ohm = borudaki darlık."}
],
"37": [
 {"q": "KNX bus hattının nominal besleme gerilimi kaçtır?", "opts": ["12V DC", "24V AC", "29V DC", "48V DC"], "ans": 2, "ex": "KNX güç kaynağı 29V DC SELV verir. Boşta ~30V ölçülür; cihazlar 21V'a kadar çalışabilir. SELV olduğu için şebekeden güvenli izolelidir."},
 {"q": "Bir KNX hat segmentine en fazla kaç cihaz bağlanabilir?", "opts": ["32", "128", "256", "64"], "ans": 3, "ex": "Segment başına sınır 64 cihazdır. Daha fazlası için repeater kullanılır veya line coupler ile yeni hat açılır."},
 {"q": "Yeşil KNX bus kablosunda (2x2x0.8) hangi damar çifti kullanılır ve polarite nasıldır?", "opts": ["Kırmızı +, siyah −", "Sarı +, beyaz −", "Kahve +, mavi −", "Siyah +, kırmızı −"], "ans": 0, "ex": "Kırmızı damar +, siyah damar − olarak bağlanır; sarı/beyaz çift yedektir. Polarite ters bağlanırsa cihaz haberleşemez — sahadaki en sık hatalardan biridir."},
 {"q": "1.1.5 şeklindeki KNX adresi neyi ifade eder?", "opts": ["Grup adresi: ana/orta/alt grup", "Fiziksel adres: Alan 1, Hat 1, Cihaz 5", "IP adresi kısaltması", "Telegram öncelik kodu"], "ans": 1, "ex": "Nokta ile ayrılan adres fiziksel adrestir (Alan.Hat.Cihaz) ve cihazın kimliğidir. Bölü ile ayrılan (1/2/3) ise fonksiyonu taşıyan grup adresidir."},
 {"q": "KNX sistemde bir buton lambayı nasıl yakar?", "opts": ["Butondan lambaya doğrudan 230 V gider", "Güç kaynağının akımını lambaya yönlendirir", "Grup adresine telegram yollar, aktör röleyi çeker", "Lambaya radyo frekansıyla enerji aktarır"], "ans": 2, "ex": "Buton (sensör) bus'a grup adresli telegram yayınlar; o adrese bağlı anahtarlama aktörü 230 V yük kontağını kapatır. Buton ile lamba arasında güç kablosu yoktur."},
 {"q": "Aşağıdakilerden hangisi bir AKTÖRDÜR?", "opts": ["Lüks sensörü", "Hareket dedektörü", "Jaluzi (panjur) aktörü", "Sıcaklık sensörü"], "ans": 2, "ex": "Aktörler telegramı alıp yükü sürer: röle aktörü, dimmer, jaluzi aktörü, vana aktörü. Sensörler ise ortamdan bilgi toplayıp telegram gönderir."},
 {"q": "KNX projesinde ETS yazılımının görevi nedir?", "opts": ["Enerji tüketimini faturalandırır", "Bus kablosunun direncini ölçer", "Yalnız tek marka cihazı yapılandırır", "Adres, parametre ve grup bağlantılarını programlar"], "ans": 3, "ex": "ETS üreticiden bağımsız resmi devreye alma aracıdır: topoloji, fiziksel adres, grup adresleri, parametreler ve indirme ETS ile yapılır. Proje dosyası mutlaka yedeklenir."},
 {"q": "KNX'te hat kuplörü (line coupler) ne işe yarar?", "opts": ["Hatları bağlar, filtre tablosuyla trafiği sınırlar", "Bus gerilimini 29 V'tan 230 V'a yükseltir", "Cihazlara otomatik fiziksel adres dağıtır", "Lambaların parlaklığını ayarlar"], "ans": 0, "ex": "Kuplör hem topolojik bağlantı hem trafik filtresidir; yalnız karşı hattı ilgilendiren telegramları geçirir."},
 {"q": "Devreye almada hat sonunda bus gerilimi ölçülüyor. Kaynak boşta ~30V iken cihaz ucunda en az kaç volt olmalıdır?", "opts": ["9V", "15V", "21V", "29V"], "ans": 2, "ex": "KNX cihazları 21-30V aralığında çalışır. Hat sonunda 21V'un altı ölçülüyorsa kablo çok uzundur, ek hatalıdır veya hatta aşırı cihaz vardır; cihazlar kararsız çalışır."},
 {"q": "Aynı fiziksel adresin iki cihaza verilmesi sahada nasıl bir soruna yol açar?", "opts": ["Hiçbir sorun olmaz, adresler paylaşılabilir", "Adres çakışması olur; programlama ve haberleşme kilitlenir", "Bus gerilimi iki katına çıkar", "Sadece lamba renkleri değişir"], "ans": 1, "ex": "Fiziksel adres cihazın benzersiz kimliğidir. Çakışmada ETS indirmeleri hata verir, telegramlar karışır. Çözüm: cihazlardan birine programlama moduna alıp yeni adres yüklemek."}
],
"38": [
 {"q": "Kontaktör bobininin bağlantı uçları hangileridir?", "opts": ["13-14", "95-96", "A1-A2", "1-2"], "ans": 2, "ex": "A1/A2 bobin uçlarıdır; A1'e kumanda gerilimi (faz veya 24V), A2'ye nötr/eksi bağlanır. 1-2/3-4/5-6 ana güç kontakları, 13-14 yardımcı NO kontaktır."},
 {"q": "Termik aşırı yük rölesi attığında 95-96 kontağı ne yapar?", "opts": ["Kapanır, motoru yeniden çalıştırır", "Açılır, güç kontaklarını kısa devre eder", "Açılır, bobin enerjisini keser", "Kapanır, arıza lambasını söndürür"], "ans": 2, "ex": "95-96 NC kontaktır; termik atınca açılır ve kumanda devresini keserek kontaktörü bıraktırır. 97-98 NO kontağı kapanıp arıza lambasını yakar."},
 {"q": "Sincap kafesli asenkron motorun yol alma/durdurma anahtarlaması için kontaktör hangi kullanım sınıfında seçilir?", "opts": ["AC-1", "AC-15", "DC-5", "AC-3"], "ans": 3, "ex": "AC-3, motorun 6-8 kat kalkış akımını anahtarlamaya uygun sınıftır. AC-1 rezistif yükler içindir; motorda AC-1 kontaktör seçilirse kontaklar erken yanar."},
 {"q": "Yıldız-üçgen zaman rölesinin kritik görevi nedir?", "opts": ["Motoru sürekli yıldız bağlantıda tutmak", "Motor akımını ölçüp kalkışı kaydetmek", "Faz sırasını algılayıp düzeltmek", "Yıldızı bırakıp ölü zamanla üçgene geçirmek"], "ans": 3, "ex": "Süre dolunca yıldız kontaktörü bırakılır, ≈50 ms ölü zamandan sonra üçgen çeker; iki kontaktörün aynı anda çekmesi fazlar arası kısa devredir. Ayrıca NC kontaklarla elektriksel kilit yapılır."},
 {"q": "Mühürleme (kendini tutma) devresinde kontaktörün hangi kontağı start butonuna paralel bağlanır?", "opts": ["95-96 NC", "21-22 NC", "13-14 NO", "A1-A2"], "ans": 2, "ex": "13-14 NO yardımcı kontak start'a paralel bağlanır; bobin çekince kapanır ve buton bırakılsa da akım bu kontaktan dolaşır."},
 {"q": "IEC renk standardına göre butonlarda kırmızı ve yeşilin anlamı nedir?", "opts": ["Kırmızı=çalıştır, yeşil=dur", "Kırmızı=dur/acil, yeşil=çalıştır", "İkisi de yalnızca sinyal içindir", "Renk seçimi tamamen serbesttir"], "ans": 1, "ex": "IEC 60204-1: kırmızı = durdurma/acil durdurma, yeşil = başlatma. Sinyal lambasında kırmızı arıza/tehlike, yeşil normal çalışma, sarı uyarı anlamındadır."},
 {"q": "Faz sırası rölesi hangi tehlikeyi önler?", "opts": ["Motorun ters yönde dönmesini", "Motorun aşırı ısınmasını", "Kumanda sigortasının atmasını", "Kontaktör kontaklarının yapışmasını"], "ans": 0, "ex": "İki fazın yeri değişirse döner alan ve motor yönü ters döner; asansör, pompa, konveyörde tehlikelidir. Röle sıra yanlışsa çıkış vermez, motor kalkmaz."},
 {"q": "Kumanda devresi ile güç devresi arasındaki temel fark nedir?", "opts": ["Kumanda devresi her zaman 400 V ile çalışır ve kalın kesitlidir", "İkisi aynı devredir; yalnız kablo renkleri farklıdır", "Güç devresi yükü besler; kumanda bobin-buton mantığını taşır", "Kumanda devresi sigortasız, doğrudan baradan beslenir"], "ans": 2, "ex": "Güç devresi 3×400 V ile motoru sürer (kalın kesit); kumanda devresi bobinleri, butonları ve lambaları yöneten ayrı sigortalı ince kesitli devredir (230 V veya trafo ile 24 V)."},
 {"q": "Merdiven otomatının çalışma prensibi nedir?", "opts": ["Her basışta konum değiştirir, süre yoktur", "Lamba sürekli yanar, buton söndürür", "Yalnız gün ışığı yokken kendiliğinden yakar", "Basınca süre boyunca yakar, sonra söndürür"], "ans": 3, "ex": "Merdiven otomatı bir zaman rölesidir: darbe alınca çıkışı çeker, ayarlanan süre dolunca söndürür. Her basışta konum değiştiren cihaz impuls (kalıcı) röledir."},
 {"q": "Ladder (merdiven) mantığında seri ve paralel bağlı kontaklar hangi mantık işlemine karşılık gelir?", "opts": ["Seri=OR, paralel=AND", "Seri=AND, paralel=OR", "İkisi de NOT", "Seri=XOR, paralel=NAND"], "ans": 1, "ex": "Seri kontakların HEPSİ kapalıysa akım geçer = AND. Paralel kollardan BİRİ kapalıysa yeter = OR. Mühürleme, çıkış kontağının start'a paralel (OR) bağlanmasıyla kurulan bir hafızadır."}
],
"39": [
 {"q": "Türkiye'de en yaygın OG dağıtım gerilimi ve AG değeri hangisidir?", "opts": ["11 kV / 0,23 kV", "34,5 kV / 0,4 kV", "66 kV / 0,4 kV", "154 kV / 0,4 kV"], "ans": 1, "ex": "Türkiye dağıtım şebekesinde standart OG 34,5 kV, AG ise 0,4 kV (400 V faz arası / 230 V faz-nötr) değeridir. 154 ve 380 kV iletim (YG) seviyeleridir."},
 {"q": "Trafo etiketindeki 'Dyn11' ifadesinde 'yn' neyi belirtir?", "opts": ["Sekonder yıldız, nötr dışarı alınmış", "Primer sargı üçgen bağlanmış", "Trafo yağlı ve hermetik tiptir", "Sekonder çıkış gerilimi 11 kV'tur"], "ans": 0, "ex": "D = primer üçgen, yn = sekonder yıldız ve nötr ucu dışarıda, 11 = 330° faz kayması. Yıldız sekonder AG'de nötr elde etmeyi sağlar."},
 {"q": "Buchholz rölesi ne zaman devreye girer?", "opts": ["Aşırı yükte gerilimi düşürmek için", "Kuru tip trafoda sargı sıcaklığı yükselince", "Yağlı trafoda iç arıza gazı veya ani yağ akışında", "Kompanzasyon kademesi değişince"], "ans": 2, "ex": "Buchholz kazan ile genleşme deposu arasındaki boruya takılır; gaz birikince alarm, ani yağ akışında açma verir. Yalnız yağlı trafolarda bulunur."},
 {"q": "NH bıçaklı sigortalarda boy-akım eşleşmesi hangisinde doğrudur?", "opts": ["NH00 ≤ 630 A", "NH1 ≤ 250 A", "NH2 ≤ 160 A", "NH3 ≤ 100 A"], "ans": 1, "ex": "Tipik sınırlar: NH00 ≤ 160 A, NH1 ≤ 250 A, NH2 ≤ 400 A, NH3 ≤ 630 A. Boy büyüdükçe hem akım hem fiziksel ölçü büyür; altlık ile buşon boyu aynı olmalıdır."},
 {"q": "Yük ayırıcılı OG hücre ile kesicili hücrenin temel farkı nedir?", "opts": ["Yük ayırıcı kısa devreyi keser; kesici yalnız yük akımını açar", "İkisi de yalnız boşta açma yapabilir", "Yük ayırıcı yalnız AG tesislerinde kullanılır", "Kesici kısa devreyi keser; yük ayırıcı yalnız yük akımını açar"], "ans": 3, "ex": "Yük ayırıcının kısa devre kesme kapasitesi yoktur; koruma seri OG sigortasıyla tamamlanır. Kesici röle komutuyla kısa devreyi kendisi keser."},
 {"q": "OG kesicilerde vakum teknolojisinin SF6'ya göre öne çıkan avantajı hangisidir?", "opts": ["Daha iyi yalıtkan gaz içermesi", "Sera gazı içermemesi ve dağıtım seviyesinde bakımsız uzun ömür", "Daha yüksek gerilimlere tek kademede çıkabilmesi", "Ark oluşturmaması"], "ans": 1, "ex": "SF6 mükemmel yalıtkan ve ark söndürücüdür ama çok güçlü bir sera gazıdır; kaçak takibi ister. Vakum kesici dağıtım gerilimlerinde standarttır: gaz yok, kontak aşınması az, bakım ihtiyacı minimum."},
 {"q": "AG panosunda iletken tanıma renkleri hangisinde doğru verilmiştir?", "opts": ["L1 kırmızı, L2 beyaz, L3 mavi, N siyah", "L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı", "L1 sarı, L2 yeşil, L3 mor, N gri", "Hepsi siyah olabilir, renk zorunlu değildir"], "ans": 1, "ex": "Güncel standart (IEC/TSE): fazlar kahverengi-siyah-gri, nötr açık mavi, koruma iletkeni yeşil-sarı. Yeşil-sarı başka hiçbir amaçla kullanılamaz."},
 {"q": "Kompanzasyonda hedef cos φ ve reaktif sınır mantığı hangisidir?", "opts": ["Hedef 0,95–1; endüktif ≈%20, kapasitif ≈%15 sınırı", "Hedef 0,50; endüktif tüketim serbesttir", "Hedef tam 1 kapasitif; kondansatör fazlası iyidir", "Ceza yalnız kapasitif tüketimde kesilir"], "ans": 0, "ex": "Röle cos φ'yi 0,95–1 endüktif bandında tutar. Aktif enerjiye oranla endüktif ≈%20, kapasitif ≈%15 aşılırsa bedel doğar; aşırı kondansatör de cezalıdır. Oranlar tarifeyle güncellenebilir."},
 {"q": "ADP'de girişte 400 A açık tip şalter, çıkışta 63 A NH sigorta var. Çıkış hattında kısa devre olunca doğru selektif davranış nedir?", "opts": ["Önce giriş şalteri açar, NH sağlam kalır", "İkisi aynı anda açar", "Yalnız 63 A NH açar, giriş şalteri kapalı kalır", "Hiçbiri açmaz, kablo arızayı taşır"], "ans": 2, "ex": "Seçicilikte arızaya en yakın koruma açar; giriş şalteri akım ve zaman kademelendirmesiyle daha yavaş ayarlanır, tek arıza tüm tesisi karartmaz."},
 {"q": "ATS/enversör bağlantısında en kritik kural hangisidir?", "opts": ["Jeneratör sürekli çalışır durumda bekletilir", "Transfer daima yük altında elle yapılır", "Nötr hiçbir sistemde transfer edilmez", "Şebeke ve jeneratör baraya asla aynı anda bağlanmaz"], "ans": 3, "ex": "İki kaynak aynı anda baraya girerse büyük dengeleme akımları akar; şebekeye ters besleme hatta çalışanı öldürebilir. Elektriksel + mekanik kilit zorunludur."},
 {"q": "Akım trafosunun sekonderi yük altında neden açık bırakılmaz?", "opts": ["Açık sekonderde tehlikeli yüksek gerilim oluşur", "Sayaç sıfırlanır ve kayıtlar silinir", "Primer devredeki akım tamamen kesilir", "Sekonder devresindeki sigorta hemen atar"], "ans": 0, "ex": "Akım trafosu akım kaynağı gibi davranır; sekonder açılırsa çekirdek doyar, uçlarda kV mertebesinde tepe gerilim oluşur. Önce sekonder kısa devre edilir."}
],
"40": [
 {"q": "Pano içindeki kablo kanalları en fazla ne kadar doldurulmalıdır?", "opts": ["%100 — boş hacim israftır", "Yaklaşık %70", "%10", "%50'nin altı yasaktır"], "ans": 1, "ex": "~%70 üstü dolulukta ısı atılamaz, yalıtım erken yaşlanır ve kablo ekleme/izleme imkansızlaşır. Kalan %30 hem havalandırma hem gelecekteki ilaveler içindir."},
 {"q": "TS EN 61439-2'ye göre 'Form 4' iç ayrım ne anlama gelir?", "opts": ["Yalnız baralar diğer kısımlardan ayrılmış", "Bara ve üniteler ayrı, klemensler ortak", "Bara, üniteler ve çıkış klemensleri ayrı bölmede", "Hiçbir iç bölme yok, tek hacim"], "ans": 2, "ex": "Form 1 bölmesiz; Form 2 baralar ayrı; Form 3 ek olarak fonksiyonel üniteler ayrı; Form 4 çıkış klemensleri de ayrı bölmededir."},
 {"q": "IP54 kodundaki rakamlar neyi ifade eder?", "opts": ["5: toz geçirmez, 4: su jetine dayanıklı", "5: 5 J darbe dayanımı, 4: 4 kapılı", "5: 5 bar basınç, 4: 4 m derinlik", "5: toz korumalı, 4: su sıçramasına dayanıklı"], "ans": 3, "ex": "İlk rakam katı cisim/toz (5 = toz korumalı, 6 = toz geçirmez), ikinci rakam su (4 = sıçrama, 5 = jet). Darbe dayanımı IK koduyla verilir."},
 {"q": "Pano ısıl hesabının ilk adımı nedir?", "opts": ["Tüm cihazların kayıp güçlerini (W) toplamak", "Katalogdan en büyük fanı seçmek", "Pano rengini açık seçmek", "Kapıya termometre takmak"], "ans": 0, "ex": "Önce toplam kayıp güç bulunur; panonun doğal ısı atımıyla (k × A × ΔT) karşılaştırılır, açık fan, eşanjör veya klimayla kapatılır."},
 {"q": "TN-S sistemde N ve PE panoda birleştirilirse ne olur?", "opts": ["Hiçbir şey olmaz, ikisi aynı potansiyeldedir", "Sigortalar daha hızlı atar, bu iyidir", "PE'den nötr akımı döner, RCD'ler gereksiz açar", "Kompanzasyon devre dışı kalır"], "ans": 2, "ex": "TN-S'de PE normalde akımsızdır. Birleştirilirse nötr akımı PE ve gövdeler üzerinden paylaşılır; RCD'ler dengesizliği kaçak sanıp açar."},
 {"q": "Motor termik rölesi hangi değere ayarlanır?", "opts": ["Motor etiket akımının 2 katına, gereksiz atmasın diye", "Motor etiketindeki anma akımına (In)", "Sigorta değeriyle aynı değere", "Mümkün olan en düşük değere"], "ans": 1, "ex": "Termik, motoru aşırı yüke karşı korur; referansı motorun etiket akımıdır. Yükseğe ayarlanırsa motor sargısı yanana kadar açmaz; çok düşüğe ayarlanırsa normal çalışmada gereksiz durdurur."},
 {"q": "Bara ek yerinin gevşek sıkılmasının tipik sonuç zinciri hangisidir?", "opts": ["Gerilim yükselir → izolasyon delinir → sigorta atar", "Akım düşer → motorlar yavaşlar → termik atar", "Kaçak akım artar → RCD atar → enerji kesilir", "Temas direnci → ısınma → oksit → ark → yangın"], "ans": 3, "ex": "Gevşek bağlantı ek direnç yaratır; I²R ısısı yüzeyi oksitler, direnç daha da artar ve ark ile biter. Çözüm tork anahtarı ve periyodik termal tarama."},
 {"q": "Ferrül (uç numarası) uygulamasının temel kuralı nedir?", "opts": ["İki uca, şemadaki hat numarasının aynısı takılır", "Yalnız güç kablolarına takılır", "Numara yerine renk yeterlidir", "Yalnız devreye almada geçici takılır"], "ans": 0, "ex": "Şemada 105 numaralı hat, panoda iki ucunda da 105 yazan kablodur; bu birebirlik arıza takibini hızlandırır."},
 {"q": "Farklı kesitteki iki iletkeni aynı klemens ağzına sıkarsak ne olur?", "opts": ["Daha sağlam, düşük dirençli bir bağlantı elde edilir", "Akım iki iletkene bölünür, bir sakıncası olmaz", "İnce iletken gevşek kalır, ısınma ve temassızlık olur", "Klemens yayı her iki iletkeni de eşit kavrar"], "ans": 2, "ex": "Klemens çenesi kalın iletkene göre kapanır, ince olan boşta kalır. Çift bağlantı için ikiz yüksük veya çift katlı klemens kullanılır."},
 {"q": "Sürekli atan bir sigortayı 'bir üst değere' koymak neden yanlıştır?", "opts": ["Üst değer sigorta daha pahalı olduğu için", "Sigorta yuvası üst değeri mekanik olarak kabul etmez", "Sayaç daha fazla tüketim yazmaya başlar", "Sigorta kabloyu korur; büyütülünce kablo aşırı ısınır"], "ans": 3, "ex": "Sigorta değeri kablo kesitine göre seçilir; büyütülürse kablo taşıyamayacağı akımda ısınır, yangın riski doğar, selektivite bozulur. Atma nedeni bulunmalıdır."}
],
"41": [
 {"q": "30 mA RCD, tüm fişler çekilmişken bile atıyor. En doğru sonraki adım hangisidir?", "opts": ["Devreleri ayırıp megger ile L-PE ve N-PE ölçmek", "Röleyi 300 mA'lik ile değiştirmek", "Röleyi köprüleyip tesisi izlemek", "Ana sigortayı bir üst değere çıkarmak"], "ans": 0, "ex": "Fişler çekiliyken atma sürüyorsa kaçak sabit tesisattadır; enerjisiz devrede nötrler ayrılarak her devre 500 V DC ile ölçülür. Röleyi büyütmek/köprülemek insan korumasını kaldırır."},
 {"q": "Üç fazlı motor start alınca homurduyor, dönmüyor ve ısınıyor. İlk yapılacak iş nedir?", "opts": ["Termiği resetleyip yeniden start vermek", "Motoru söküp sargı direncini ölçmek", "STOP'a basıp motor uçlarında üç fazı ölçmek", "Motora paralel kondansatör eklemek"], "ans": 2, "ex": "Homurtu tipik faz kaybı belirtisidir; iki fazda kalan motor kalkamaz ve dakikalar içinde yanar. Önce durdurulur, sonra üç faz ölçülür."},
 {"q": "Motor termik rölesi atmış. Ustaca yaklaşım hangisidir?", "opts": ["Resetleyip çalıştırmak, atarsa ayarı yükseltmek", "Termiği iptal edip motoru doğrudan beslemek", "Termiği bir üst değerdekiyle değiştirmek", "Üç faz akımını pensle ölçüp etiketle kıyaslamak"], "ans": 3, "ex": "Termik habercidir: aşırı yük, faz kaybı veya dengesizlik olabilir. Neden bulunmadan reset veya ayar yükseltme motoru yakar. Faz akımları arası dengesizlik %10'u geçmemelidir."},
 {"q": "B16 otomat, elektrikli ısıtıcı ve kettle aynı anda çalışınca 5-10 dakika sonra atıyor; anında atmıyor. Arızanın karakteri nedir?", "opts": ["Kısa devre (manyetik açma)", "Aşırı yük (termik açma)", "Kaçak akım", "Otomat arızası"], "ans": 1, "ex": "Gecikmeli atma, bimetalin ısınmasıyla oluşan TERMİK açmadır ve aşırı yükü gösterir. Anında (şak diye) atma manyetik açmadır ve kısa devreyi düşündürür. Çözüm otomatı büyütmek değil, yükü bölmektir — otomat kabloyu korur."},
 {"q": "Prizde kontrol kalemi HER İKİ delikte de yanıyor, cihaz çalışmıyor. En olası arıza nedir?", "opts": ["Nötr kopuğu", "Faz kopuğu", "Çift faz gelmesi", "Topraklama kopuğu"], "ans": 0, "ex": "Nötr koptuğunda faz, takılı cihazın direnci üzerinden nötr ucuna yansır; kalem iki tarafta da yanar. Bu yüzden kaleme güvenilmez, iki problu cihazla L-N ölçülür."},
 {"q": "Bir binada bazı lambalar aşırı parlak yanıp patlıyor, bazıları sönük. Bu tablo neyin işaretidir?", "opts": ["Kompanzasyon kademesinin arızası", "Trafo yağ seviyesinin düşmesi", "Ana nötrün kopması (yıldız kayması)", "Sayaçtaki ölçme devresi arızası"], "ans": 2, "ex": "Nötr zayıflarsa yıldız noktası kayar: az yüklü fazın gerilimi yükselir (ampul patlar), çok yüklü fazınki düşer. Derhal enerji kesilir, nötr onarılır."},
 {"q": "Pano termal taramasında bir klemens komşularından 25 °C daha sıcak. Doğru müdahale nedir?", "opts": ["Normal kabul edip yalnız kayda geçmek", "Kablo koyu renkli olduğu için yok saymak", "Enerjiliyken soğutucu sprey ile soğutmak", "Enerjisizken torkla sıkmak, yanık ucu yenilemek"], "ans": 3, "ex": "Noktasal ısı artışı gevşek bağlantının imzasıdır; müdahale enerji kesilip doğrulandıktan sonra yapılır."},
 {"q": "Şebeke kesildi, jeneratör normal çalışıyor ama tesis beslenmiyor. İlk kontrol edilecek nedir?", "opts": ["ATS seçici konumu (OTO?) ve alarmlar", "Jeneratörün yakıt filtresi", "Tesisteki tüm linye sigortaları", "Motorun yağ ve su seviyesi"], "ans": 0, "ex": "Motor çalışıyorsa sorun transfer tarafındadır; çoğunlukla MANUEL/OFF'ta unutulmuş seçici veya ATS alarmıdır."},
 {"q": "ATS'de şebeke kontaktörü yapışmış, jeneratör kontaktörü kilit yüzünden çekmiyor. Kilidi köprülemek neden ölümcül hatadır?", "opts": ["Jeneratörün yakıtı çok kısa sürede tükenir", "Kontaktör bobini aşırı ısınıp yanar", "Kaynaklar çakışır, ters besleme görevliyi öldürebilir", "Sayaç ters yönde sayıp tüketimi düşürür"], "ans": 2, "ex": "Köprülenirse jeneratör şebekeye ters besleme yapar; kesinti sanıp hatta çalışan ekip enerjiyle karşılaşır. Çözüm yapışık kontaktörü değiştirmektir."},
 {"q": "Kaçak akım pensi ile bir cihazın kaçağını ölçerken kelepçeden hangi iletkenler geçirilmelidir?", "opts": ["Yalnız faz", "Yalnız nötr", "Faz ve nötr birlikte (PE hariç)", "Faz, nötr ve PE birlikte"], "ans": 2, "ex": "Faz ve nötr birlikte kelepçelenince giden-dönen akımlar birbirini siler; fark (yani toprağa kaçan mA) okunur. Tek iletken kelepçelenirse yük akımı okunur, PE de dahil edilirse kaçak akım da silinip ölçülemez."}
],
"42": [
 {"q": "5 altın güvenlik kuralının doğru sırası hangisidir?", "opts": ["Yokla → Aç → Toprakla → Kilitle → Ört", "Aç → Yokla → Kilitle → Ört → Toprakla", "Kilitle → Aç → Toprakla → Yokla → Ört", "Aç → Kilitle → Yokla → Toprakla → Ört"], "ans": 3, "ex": "Önce tüm kaynaklardan ayırırsın, kimse geri kapatamasın diye kilitleyip etiketlersin, gerilim yokluğunu ölçersin, topraklayıp kısa devre edersin, en son komşu canlı kısımları perdelersin."},
 {"q": "Gerilim yokluğu doğrulamasında test cihazı neden önce ve sonra bilinen canlı bir kaynakta denenir?", "opts": ["Arızalı alet canlı hattı 0 V gösterebilir", "Probların sıfır ayarı için", "Aletin pilini şarj etmek için", "Ölçüm kategorisini belirlemek için"], "ans": 0, "ex": "Pili bitmiş veya arızalı dedektör her yerde 0 gösterir. Dene – ölç – tekrar dene sırası bu ölümcül yanılgıyı önler."},
 {"q": "Yük altındaki bir hattı ayırıcı (seksiyoner) ile açmak neden yasaktır?", "opts": ["Ayırıcı kontakları zamanla paslanır", "Hattaki tüm sigortalar aynı anda atar", "Ayırıcıda ark söndürme düzeneği yoktur", "Hat gerilimi tehlikeli şekilde yükselir"], "ans": 2, "ex": "Yük akımı kesilirken oluşan ark ayırıcıda söndürülemez; ark patlaması ve ağır yanık olur. Önce kesici, sonra ayırıcı açılır."},
 {"q": "PE (koruma iletkeni) neden asla nötr veya devre iletkeni olarak kullanılamaz?", "opts": ["Rengi farklı olduğu için karışıklık olur", "Kesiti genelde fazdan küçüktür", "Sayaç yük akımını ölçemez", "Yük akımı akarsa gövdeler gerilim altında kalır"], "ans": 3, "ex": "PE'nin tek görevi arıza akımını taşımak ve gövdeleri toprak potansiyelinde tutmaktır; üzerinden yük akarsa gövdelerde gerilim oluşur, koparsa her metal kasa faza kalır."},
 {"q": "Panoda LOTO uygulandı. Kilit ve etiketi kim kaldırabilir?", "opts": ["Yalnız kilidi/etiketi takan kişi", "İşletme müdürü", "Panonun başındaki herhangi bir elektrikçi", "Vardiya amiri her durumda"], "ans": 0, "ex": "Kilidi yalnız sahibi söker; sahibine ulaşılamıyorsa bu ancak yazılı özel prosedürle, sahanın boş olduğu doğrulanarak ve yetkili onayıyla yapılır."},
 {"q": "Çarpılan kişi kaynaktan ayrıldı; bilinci açık ve 'iyiyim' diyor. Doğru davranış nedir?", "opts": ["Su içirilip işe devam ettirilir", "Yarım saat dinlendirilip gönderilir", "112 aranır, hastane kontrolüne gönderilir", "Yalnız yanık varsa hastaneye götürülür"], "ans": 2, "ex": "Akım kalpten geçtiyse ritim bozukluğu saatler sonra çıkabilir; kişi iyi hissetse bile EKG ve gözlem gerekir."},
 {"q": "Bilinçsiz ve normal solunumu olmayan kazazedede CPR nasıl uygulanır?", "opts": ["60/dk, 2–3 cm, 15:2", "Yalnız suni solunum yapılır", "Önce su serpilir, uyanmazsa CPR", "100–120/dk, 5–6 cm, 30:2; OED getirtilir"], "ans": 3, "ex": "Göğüs merkezine dakikada 100–120 tempoda, 5–6 cm bası; 30 basıya 2 solunum. OED gelir gelmez bağlanır."},
 {"q": "400 V'luk bir AG panosunda canlı kısımların yakınında çalışırken pratikte standart olarak tercih edilen yalıtkan eldiven sınıfı hangisidir?", "opts": ["Sınıf 2 (17 kV) şarttır", "Deri montaj eldiveni yeterlidir", "Sınıf 0 (1000 V)", "Yalıtkan eldiven gerekmez, izoleli alet yeter"], "ans": 2, "ex": "TS EN 60903: Sınıf 00 = 500 V, 0 = 1000 V, 1 = 7,5 kV, 2 = 17 kV, 3 = 26,5 kV, 4 = 36 kV. 400 V için Sınıf 00 gerilim olarak yeterlidir ama pratikte güvenlik payı için Sınıf 0 tercih edilir. Eldiven her kullanımdan önce şişirilerek kontrol edilir, üzerine deri koruyucu giyilir."},
 {"q": "Enerji vermeden önceki son kontrolde hangisinin atlanması doğrudan kısa devre ve ark patlamasına yol açar?", "opts": ["Geçici topraklamaların söküldüğünün doğrulanması", "Motor dönüş yönü için faz sırası kontrolü", "Pano kapaklarının yerine takılması", "Yük listesinin güncellenmesi"], "ans": 0, "ex": "Unutulan geçici topraklama ile enerji verilirse doğrudan kısa devre olur. Takılan her topraklama numaralanır, iş iznine yazılır, sayı tutmadan enerji verilmez."},
 {"q": "Panoda ölçüme başlamadan önce multimetrede kontrol edilmesi gerekenler nelerdir?", "opts": ["Ekran ışığı ve pil yüzdesi", "Marka ve model yılı", "Kademe, prob soketi ve CAT III/IV uygunluğu", "Kılıf rengi ve kalibrasyon etiketi"], "ans": 2, "ex": "Amper/ohm kademesinde gerilim ölçmek aleti kısa devreye sokar; CAT II alet pano enerjisinde ark patlamasına dayanamaz."}
],
"43": [
 {"q": "Diazed buşonlu sigortada GRİ renk hangi akım değerini gösterir?", "opts": ["16 A", "10 A", "20 A", "25 A"], "ans": 0, "ex": "Diazed renk kodunda gri = 16 A'dir. Sıra: 2 A pembe, 4 A kahverengi, 6 A yeşil, 10 A kırmızı, 16 A gri, 20 A mavi, 25 A sarı, 35 A siyah, 50 A beyaz, 63 A bakır rengi. Pastilin rengine bakarak buşonu sökmeden değerini anlarsın."},
 {"q": "Aşağıdaki eşleştirmelerden hangisi YANLIŞTIR?", "opts": ["6 A - yeşil", "10 A - kırmızı", "25 A - mavi", "63 A - bakır/altın rengi"], "ans": 2, "ex": "25 A SARI, 20 A ise MAVİ'dir. Karıştırılması sık görülen bir çifttir; mavi buşonu 25 A sanıp takmak hattı gereğinden dar korur ya da tam tersi kabloyu aşırı yükte bırakır."},
 {"q": "Buşonlu sigorta altlığındaki ayar (pas) vidasının asıl görevi nedir?", "opts": ["Buşon kontak direncini azaltmak", "Buşon gövdesini topraklamak", "Buşonun daha hızlı soğumasını sağlamak", "Büyük akımlı buşonun takılmasını engellemek"], "ans": 3, "ex": "Her akım değerinin buşon pim çapı farklıdır; ayar vidası o çapa göredir. 16 A ayarlı altlığa 25 A buşon oturmaz. Sökülmesi yasaktır."},
 {"q": "Motor hattında gG yerine aM sigorta kullanılmasının sebebi nedir?", "opts": ["Yalnız kısa devreyi korur, kalkışta açmaz", "Aşırı yük ve kısa devreyi daha hassas korur", "Kaçak akımı da algılar", "gG'den daha ucuzdur"], "ans": 0, "ex": "aM yaklaşık 4 × In'e kadar açmaz, kalkış akımına göz yumar; aşırı yük korumasını termik röle veya motor koruma şalteri yapar."},
 {"q": "C eğrisi bir otomatik sigortanın ani (manyetik) açma bölgesi nedir?", "opts": ["3-5 × In", "5-10 × In", "10-20 × In", "20-40 × In"], "ans": 1, "ex": "B = 3-5×In (aydınlatma, priz, rezistif), C = 5-10×In (motor, trafo, LED sürücü, genel kullanım), D = 10-20×In (kaynak makinesi, ağır kalkışlı motor, trafo). Eğri harfi sadece manyetik eşiği belirtir; termik davranış benzerdir."},
 {"q": "MCB üzerinde yazan '6000' veya '6 kA' ifadesi neyi belirtir?", "opts": ["Anma akımını", "Açma süresini", "Kesme kapasitesini", "Test gerilimini"], "ans": 2, "ex": "kA değeri, cihazın güvenle kesebileceği en büyük kısa devre akımıdır; anma akımıyla (In) ilgisi yoktur."},
 {"q": "NH2 boyu bıçaklı sigorta hangi akıma kadar kullanılır?", "opts": ["160 A", "250 A", "630 A", "400 A"], "ans": 3, "ex": "NH boyları: NH000/NH00 ≤160 A, NH1 ≤250 A, NH2 ≤400 A, NH3 ≤630 A, NH4 ≤1250 A. Altlığın boyuna uygun NH seçilmelidir; yarım oturan bıçak temas direncini artırır, pabucu kızdırır ve yangın çıkarır."},
 {"q": "NH sigortayı yük altında (akım akarken) çekmenin başlıca tehlikesi nedir?", "opts": ["Sigorta erken yaşlanıp değeri düşer", "Gösterge (arıza) pimi kırılır", "Ölçü aletlerinde ölçüm hatası oluşur", "Ark oluşur; plazma yanık ve körlük yapar"], "ans": 3, "ex": "NH yük ayırıcısı değildir; 400 V'ta birkaç yüz amperlik ark çok yüksek sıcaklıkta plazma üretir. Önce yük kesilir, gerilim yokluğu doğrulanır, çekme sapı + siperle çekilir."},
 {"q": "Eriyen telli sigortalarda selektivite (seçicilik) için önerilen pratik kademe oranı nedir?", "opts": ["1 : 1,1", "1 : 1,6", "1 : 3", "1 : 5"], "ans": 1, "ex": "Üst kademe alt kademeden hem daha büyük hem daha yavaş olmalıdır; pratik kural yaklaşık 1:1,6 oranıdır (20-32-50-80-125 A dizisi). Ayrıca ana kademede S tipi (gecikmeli) kaçak akım rölesi, uçta 30 mA anlık RCD kullanılarak selektivite kaçak akım tarafında da sağlanır."},
 {"q": "Sigorta attı. En doğru ilk adım hangisidir?", "opts": ["Sebebi bulmak: yük akımı ve yalıtım ölçülür", "Hemen bir üst amperdekini takmak", "Buşonu telle köprülemek", "Daha düşük kA'lı ürünle denemek"], "ans": 0, "ex": "Sigorta arıza değil habercidir; pensle gerçek akım, megger ile yalıtım ölçülür. Onarımdan sonra aynı değer ve karakteristikte sigorta takılır."},
 {"q": "gG karakteristiğinin eski (önceki standarttaki) adı nedir ve neyi korur?", "opts": ["aM - sadece aşırı yük", "gL - hem aşırı yük hem kısa devre", "gR - sadece yarı iletken", "aR - sadece aşırı yük"], "ans": 1, "ex": "gG'nin eski adı gL'dir; piyasada 'gL/gG' etiketiyle de görülür. Tam aralık koruma sağlar: hem aşırı yükü hem kısa devreyi keser. Kablo, kolon, priz ve aydınlatma hatlarının koruması için doğru seçimdir."},
 {"q": "Diazed ve Neozed karşılaştırmasında hangisi doğrudur?", "opts": ["Neozed E27/E33 dişli ve daha büyüktür", "Neozed yalnız doğru akımda kullanılır", "DII = E27, DIII = E33; Neozed daha kompakttır", "Diazed kesme kapasitesi MCB'den düşüktür"], "ans": 2, "ex": "Diazed: DII = E27 (≤25 A), DIII = E33 (35–63 A). Neozed D01/D02/D03 daha küçük hacimlidir. Her iki ailenin kesme kapasitesi tipik MCB'lerden yüksektir."},
 {"q": "Uzun bir aydınlatma hattında B yerine D eğrisi otomat kullanılırsa ne olur?", "opts": ["Değişiklik olmaz, iki eğri eşdeğerdir", "Lamba kalkışlarında sık gereksiz açma yapar", "Kaçak akım koruması devre dışı kalır", "Zayıf kısa devrede manyetik açma olmaz, açma gecikir"], "ans": 3, "ex": "D eğrisinin manyetik eşiği 10–20 × In'dir; uzun hattın ucundaki kısa devre akımı bu eşiğin altında kalabilir ve yalnız termik (yavaş) açma olur."}
],
"44": [
 {"q": "Teknik çizimde antet (başlık bloğu) genellikle nerededir ve en kritik alanı hangisidir?", "opts": ["Sol üst; ölçek", "Sağ alt; revizyon", "Orta; proje adı", "Sol alt; tarih"], "ans": 1, "ex": "Antet sağ alttadır; eski revizyonla çalışmak sahada ciddi hatalara yol açar."},
 {"q": "Şemada 'KM3' etiketi neyi ifade eder?", "opts": ["3. klemens grubu", "3 numaralı kontaktör", "3 kutuplu şalter", "3. sayfa"], "ans": 1, "ex": "K/KM kontaktör ailesidir; sıra numarası aynı tip cihazları ayırt eder."},
 {"q": "Kontaktörün ana (güç) kontakları hangi numaraları taşır?", "opts": ["13-14, 23-24", "A1-A2", "1-2, 3-4, 5-6", "95-96"], "ans": 2, "ex": "Tek sayılar giriş (1,3,5), çift sayılar çıkış (2,4,6)."},
 {"q": "Yardımcı kontak numarasının sonu '3-4' ise kontak tipi nedir?", "opts": ["NC", "NO", "Gecikmeli NC", "Enversör"], "ans": 1, "ex": "Sonu 3-4 = NO, sonu 1-2 = NC. İlk rakam sıra numarasıdır (13-14, 23-24…)."},
 {"q": "95-96 numaralı kontak neye aittir ve nasıl bağlanır?", "opts": ["Termik NC; kumandaya seri", "Zaman rölesi NO; paralel", "Kontaktör bobin uçları", "Ana güç kontağı"], "ans": 0, "ex": "Termik atınca 95-96 açılır ve kumanda devresini keserek bobini düşürür."},
 {"q": "A1-A2 uçları neyi gösterir?", "opts": ["Ana kontakları", "Bobin uçlarını", "Mühürleme kontağını", "Klemens grubunu"], "ans": 1, "ex": "A1-A2 bobindir. Bobini görünce A1'e gelen yolu geriye izle: 'bunu ne çektiriyor?'"},
 {"q": "Kumanda şemaları devrenin hangi hâlini gösterir?", "opts": ["Enerjili ve motor çalışırken hâli", "Arıza oluştuğu andaki hâli", "Enerjisiz, butonlara basılmamış hâli", "Tam yükte çalışırken hâli"], "ans": 2, "ex": "'Normalde açık/kapalı'daki 'normal' budur. NO kontak sahada cihaz çekiliyken kapalıdır."},
 {"q": "Stop butonları ve termik kontağı neden seri ve NC bağlanır?", "opts": ["Daha az kablo kullanmak için", "Akımı artırmak için", "Butonları paralel çalıştırmak için", "Kablo kopunca motor dursun (güvenli arıza)"], "ans": 3, "ex": "NC seri durdurucularda kopukluk = durdurma; kopan kablo motoru asla başlatamaz (fail-safe)."},
 {"q": "START butonuna paralel bağlanan KM1 13-14 kontağının görevi nedir?", "opts": ["Mühürleme: el çekilince bobini tutmak", "Yıldız-üçgen arası elektriksel kilitleme", "Çalışıyor sinyal lambasının beslemesi", "Motorun aşırı yük (termik) koruması"], "ans": 0, "ex": "Mühürleme yoksa buton bırakılınca bobin düşer (yoklamalı/jog çalışma)."},
 {"q": "Yıldız-üçgen yol vermede kalkış akımı doğrudan yol vermeye göre yaklaşık kaçtır?", "opts": ["Yarısı", "1/3'ü", "2 katı", "Aynı"], "ans": 1, "ex": "Yıldızda sargılara faz gerilimi (400/√3=230 V) uygulanır; şebekeden çekilen akım ve moment ≈ 1/3'tür."},
 {"q": "Yıldız-üçgen şemasında süre dolunca zaman rölesinde ne olur?", "opts": ["15-18 açılır, 15-16 kapanır", "A1-A2 kısa devre olur", "15-16 açılır, 15-18 kapanır", "95-96 açılır"], "ans": 2, "ex": "15 ortaktır: gecikmeli NC (15-16) açılıp yıldız kontaktörünü (KM2) düşürür, gecikmeli NO (15-18) kapanıp üçgeni (KM3) çektirir."},
 {"q": "KM2 (yıldız) ile KM3 (üçgen) aynı anda çekerse ne olur?", "opts": ["Motor hızlanır", "Yalnız termik atar", "Motor yavaşlar", "Fazlar arası kısa devre"], "ans": 3, "ex": "Bu yüzden karşılıklı NC kontaklarla elektriksel kilitleme ve mümkünse mekanik kilit şarttır."},
 {"q": "Tek hat şeması nasıl okunur?", "opts": ["Kaynaktan yüke doğru", "Yükten kaynağa doğru", "Sağdan sola", "Alfabetik sırayla"], "ans": 0, "ex": "Enerji akış yönünde: şebeke → sayaç/trafo → ana pano → tali panolar → yükler."},
 {"q": "LOTO öncesi tek hat şemasından mutlaka ne çıkarılır?", "opts": ["Kullanılan kabloların renk kodları", "Panonun dış ölçüleri ve ağırlığı", "Devreyi besleyebilecek tüm kaynaklar", "Cihazların marka ve model listesi"], "ans": 2, "ex": "Şebeke + jeneratör + UPS + güneş + kondansatörler… Tek kaynağı kesip 'enerji yok' demek en tehlikeli varsayımdır."},
 {"q": "Şemada kontaklar arasındaki kesikli çizgi neyi gösterir?", "opts": ["Arızalı hattı", "Toprak iletkenini", "İptal edilmiş devreyi", "Mekanik bağlantıyı"], "ans": 3, "ex": "Kesikli çizgi kontakların mekanik olarak birlikte hareket ettiğini gösterir; örn. Q1 şalterinin üç kutbu tek kolla birlikte açılır."}
],
"45": [

]
};

const MYK_INFO = "<b>MYK Mesleki Yeterlilik — Elektrik Tesisatçısı (15UY0241)</b> sınavı iki aşamalıdır:\n<br>• <b>Teorik sınav:</b> en az 25 çoktan seçmeli (4 şıklı) soru, soru başına ~2 dakika, yanlış cevap doğruyu götürmez.\n<br>• <b>Performans (uygulama) sınavı:</b> gerçek/gerçeğe yakın iş ortamında yapılır; kritik adımların tamamı + genelde asgari %80 başarı gerekir.\n<br>• <b>Geçme notu:</b> Teorikte Seviye 3 için ≥ %70, Seviye 4 için ≥ %80. A1 (İSG, Çevre, İş Organizasyonu) birimi için ≥ 70.\n<br>• <b>Birimler:</b> A1 (zorunlu — İSG/Çevre/Organizasyon), B1 (Elektrik İç Tesisat Projesi Hazırlama), B2 (Elektrik İç Tesisat Uygulaması). Seçmelilerden en az biri.";
const MYK_Q = {
"isg": [
{
"q": "Gerilimsiz çalışmaya geçişte 5 altın kuralın İLK adımı hangisidir?",
"opts": [
"Gerilim yokluğunu ölçmek",
"Kilitleyip etiketlemek",
"Topraklayıp kısa devre etmek",
"Tüm kaynaklardan ayırmak"
],
"ans": 3,
"ex": "Sıra: 1) ayır (kes), 2) tekrar kapanmaya karşı kilitle-etiketle, 3) gerilim yokluğunu doğrula, 4) toprakla ve kısa devre et, 5) komşu canlı kısımları ört. Ayırma; şebeke, jeneratör, UPS, güneş inverteri ve kondansatör dahil tüm kaynakları kapsar.",
"birim": "A1"
},
{
"q": "Aşağıdakilerden hangisi 5 altın güvenlik kuralından biri DEĞİLDİR?",
"opts": [
"Tekrar kapanmaya karşı kilitlemek",
"Gerilim yokluğunu doğrulamak",
"Komşu canlı kısımları örtmek",
"Yalıtım direncini ölçmek"
],
"ans": 3,
"ex": "Kurallar: ayır, kilitle-etiketle, gerilim yokluğunu doğrula, toprakla-kısa devre et, ört-perdele. Yalıtım ölçümü devreye alma testidir; güvenlik kurallarından biri değildir.",
"birim": "A1"
},
{
"q": "LOTO (Lockout-Tagout) uygulaması ne anlama gelir?",
"opts": [
"Ölçme ve kontrol",
"Topraklama ve yalıtım",
"Kesme ve bağlama",
"Kilitleme ve etiketleme"
],
"ans": 3,
"ex": "Açılan şalter kişisel kilitle kilitlenir, üzerine kim-ne iş-telefon-tarih yazan etiket asılır. Etiket uyarıdır; kilit fiziksel engeldir. İkisi birlikte kullanılır.",
"birim": "A1"
},
{
"q": "Enerjili bir tesisteki elektrik yangınında KULLANILMAMASI gereken söndürücü hangisidir?",
"opts": [
"CO2 (karbondioksit)",
"Kuru kimyevi toz",
"Su (jet)",
"Temiz gazlı (halokarbon) söndürücü"
],
"ans": 2,
"ex": "Su iletkendir; enerjili tesiste su jeti çarpılmaya yol açar. Önce enerji kesilir; CO2, kuru kimyevi toz veya temiz gazlı söndürücü kullanılır.",
"birim": "A1"
},
{
"q": "Akıma kapılmış ve hâlâ iletkene temas eden bir kişiye ilk müdahale hangisidir?",
"opts": [
"Önce enerjiyi kesmek",
"Kişiyi hemen kolundan çekmek",
"Islak bezle kişiyi ayırmak",
"Önce kalp masajına başlamak"
],
"ans": 0,
"ex": "Enerji kesilmeden kazazedeye dokunan ikinci kazazede olur. AG'de şalter/fiş kesilir; kesilemiyorsa kuru yalıtkan zeminde durarak kuru tahta veya plastik gibi yalıtkan bir cisimle ayrılır.",
"birim": "A1"
},
{
"q": "Yüksekte çalışmada düşmeye karşı kullanılan temel KKD hangisidir?",
"opts": [
"Tam vücut emniyet kemeri",
"Bel tipi alet kemeri",
"Yalıtkan iş ayakkabısı",
"Çene bantlı baret"
],
"ans": 0,
"ex": "Düşmeyi durdurma için paraşüt tipi (tam vücut) emniyet kemeri ve uygun bir ankraj noktası kullanılır. Bel tipi alet kemeri düşme koruması sağlamaz.",
"birim": "A1"
},
{
"q": "15UY0241-3 Elektrik Tesisatçısı (Seviye 3) yeterliliğinde A1 İSG biriminin teorik sınavında başarı şartı nedir?",
"opts": [
"%50",
"%60",
"%70",
"%80"
],
"ans": 2,
"ex": "Seviye 3'te A1 teorik başarı şartı %70, Seviye 4'te %80'dir. Sınavdan önce belgelendirme kuruluşunun güncel sınav şartnamesi kontrol edilmelidir.",
"birim": "A1"
},
{
"q": "Yalıtkan (elektrikçi) eldiveni her kullanımdan önce nasıl kontrol edilir?",
"opts": [
"Suya batırılarak",
"Isıtılıp esnekliğine bakılarak",
"Multimetreyle direnç ölçülerek",
"Şişirilerek delik kontrolüyle"
],
"ans": 3,
"ex": "TS EN 60903 eldivenler her kullanımdan önce gözle ve hava ile şişirilerek delik kontrolünden geçer; periyodik elektriksel teste (tipik 6 ayda bir) gönderilir; üstüne deri koruyucu eldiven giyilir.",
"birim": "A1"
},
{
"q": "Tesisat işinden çıkan kablo artıkları ve hurda bakır için doğru uygulama hangisidir?",
"opts": [
"Ayrı toplayıp geri dönüşüme vermek",
"Molozla birlikte konteynere atmak",
"Yalıtımı yakılarak bakırı ayırmak",
"Dolgu malzemesi olarak kullanmak"
],
"ans": 0,
"ex": "Atıklar kaynağında ayrıştırılır; metal ve plastik artıklar lisanslı geri dönüşüme verilir. Kablo yakmak zehirli gaz (PVC'den klorlu bileşikler) çıkarır ve yasaktır.",
"birim": "A1"
},
{
"q": "YG veya canlı kısım yakınında çalışma gibi riskli işlerde başlamadan önce hangi yazılı belge düzenlenir?",
"opts": [
"Sevk irsaliyesi",
"Günlük şantiye raporu",
"Malzeme onay formu",
"İş izni (çalışma izni)"
],
"ans": 3,
"ex": "İş izni; iş tanımı, yer, süre, alınan önlemler ve sorumluların imzasını içerir. İzin kapatılmadan enerji verilmez.",
"birim": "A1"
},
{
"q": "Baret hangi riske karşı kullanılır?",
"opts": [
"Düşen cisim ve çarpma",
"Gürültü",
"Toz ve partikül",
"Titreşim"
],
"ans": 0,
"ex": "Baret başı düşen cisim ve çarpmalara karşı korur. Elektrik işlerinde metal parçasız, elektrik yalıtımlı tip (EN 397 / EN 50365) seçilir.",
"birim": "A1"
},
{
"q": "Geçici topraklama ve kısa devre takımının temel amacı nedir?",
"opts": [
"Çalışmayı hızlandırmak için",
"Faz yüklerini dengelemek için",
"Ölçüm yapmayı kolaylaştırmak",
"Olası gerilimi toprağa akıtmak"
],
"ans": 3,
"ex": "Yanlışlıkla verilen enerji, ters besleme, indüklenme ve kalıntı yük toprağa akıtılır ve koruma elemanı attırılır; çalışma süresince gerilimsizlik güvence altına alınır.",
"birim": "A1"
},
{
"q": "Geçici topraklama-kısa devre takımı takılırken doğru sıra hangisidir?",
"opts": [
"Önce toprak ucu, sonra fazlar",
"Önce faz uçları, sonra toprak",
"Önce orta faz, sonra toprak",
"Fazlar ve toprak aynı anda"
],
"ans": 0,
"ex": "Takarken önce toprak ucu, sonra yalıtkan ıstanka ile faz uçları; sökerken ters sıra. Tersi yapılırsa hat enerjiliyse faz ucunu tutan kişi toprağa bağlanmış olur.",
"birim": "A1"
},
{
"q": "Çoklu kilit mandalında bir çalışanın kişisel kilidini normal koşulda kim sökebilir?",
"opts": [
"Vardiya amiri",
"Bakım şefi",
"İşi en son bitiren kişi",
"Kilidin sahibi"
],
"ans": 3,
"ex": "Her kilidi yalnız sahibi söker. Sahibine ulaşılamıyorsa bu ancak yazılı özel prosedürle, sahanın boş olduğu doğrulanarak ve yetkili onayıyla yapılır.",
"birim": "A1"
},
{
"q": "Gerilim yokluğu kontrolünde doğru yöntem hangisidir?",
"opts": [
"Kontrol kalemiyle fazı yoklamak",
"Şalterin konumuna bakmak",
"Aleti dene – ölç – tekrar dene",
"Pens ampermetreyle akım okumak"
],
"ans": 2,
"ex": "İki kutuplu test cihazı önce bilinen canlı kaynakta denenir, çalışma yerinde tüm kombinasyonlar ölçülür, sonra alet yine bilinen kaynakta doğrulanır. Kontrol kalemi tek başına delil değildir.",
"birim": "A1"
},
{
"q": "L1, L2, L3, N ve PE bulunan bir çıkışta gerilim yokluğu için kaç ikili ölçüm yapılır?",
"opts": [
"4",
"6",
"8",
"10"
],
"ans": 3,
"ex": "5 iletkenin ikili kombinasyonu 5×4/2 = 10: üç faz-faz, üç faz-nötr ve dört iletken-PE (L1, L2, L3, N).",
"birim": "A1"
},
{
"q": "Aşağıdaki cihazlardan hangisi yük altında AÇILMAZ?",
"opts": [
"Kesici",
"Yük ayırıcısı",
"Ayırıcı (seksiyoner)",
"Motor koruma şalteri"
],
"ans": 2,
"ex": "Ayırıcının ark söndürme düzeni yoktur; yalnız görünür ayırma sağlar. Önce kesiciyle yük kesilir, sonra ayırıcı açılır.",
"birim": "A1"
},
{
"q": "400 V'luk bir AG panosunda yakın çalışma için TS EN 60903'e göre en düşük uygun yalıtkan eldiven sınıfı hangisidir?",
"opts": [
"Sınıf 00 (500 V)",
"Sınıf 1 (7,5 kV)",
"Sınıf 2 (17 kV)",
"Sınıf 3 (26,5 kV)"
],
"ans": 0,
"ex": "Sınıf 00: 500 V, Sınıf 0: 1000 V, Sınıf 1: 7,5 kV, Sınıf 2: 17 kV, Sınıf 3: 26,5 kV, Sınıf 4: 36 kV. 400 V için en az 00; pratikte güvenlik payı için Sınıf 0 tercih edilir.",
"birim": "A1"
},
{
"q": "Kontrol hiyerarşisinde EN ETKİLİ önlem hangisidir?",
"opts": [
"Uygun KKD kullandırmak",
"Uyarı levhaları asmak",
"Tehlikeyi ortadan kaldırmak",
"Çalışanları eğitmek"
],
"ans": 2,
"ex": "Sıra: ortadan kaldırma (enerjisiz çalışma) → ikame → mühendislik (bariyer, RCD) → idari (iş izni, eğitim) → KKD. KKD en son çaredir.",
"birim": "A1"
},
{
"q": "Kontrol hiyerarşisinde kişisel koruyucu donanımın (KKD) yeri için doğru ifade hangisidir?",
"opts": [
"Son çare olan önlemdir",
"İlk başvurulan önlemdir",
"Mühendislik önleminin yerini tutar",
"Risk değerlendirmesini gereksiz kılar"
],
"ans": 0,
"ex": "KKD riski ortadan kaldırmaz; kalan riske karşı son bariyerdir. Üst basamaklar uygulanmadan yalnız KKD'ye güvenmek sık yapılan hatadır.",
"birim": "A1"
},
{
"q": "5×5 risk matrisinde olasılığı 3, şiddeti 5 olan bir iş için risk skoru kaçtır?",
"opts": [
"8",
"15",
"20",
"25"
],
"ans": 1,
"ex": "Risk = Olasılık × Şiddet = 3 × 5 = 15 (yüksek). Önlemlerle olasılık 1'e indirilirse risk 5 olur.",
"birim": "A1"
},
{
"q": "'Zarar verme potansiyeli' tanımı hangi kavrama aittir?",
"opts": [
"Risk",
"İş kazası",
"Ramak kala",
"Tehlike"
],
"ans": 3,
"ex": "Tehlike zarar verme potansiyelidir (ör. enerjili bara). Risk, bu tehlikenin zarara dönüşme olasılığı ile sonucun şiddetinin birleşimidir.",
"birim": "A1"
},
{
"q": "6331 sayılı Kanuna göre İSG kurulu, altı aydan uzun süren sürekli işlerde en az kaç çalışanı olan işyerinde kurulur?",
"opts": [
"10",
"30",
"50",
"100"
],
"ans": 2,
"ex": "Elli veya daha fazla çalışanın bulunduğu ve altı aydan fazla süren sürekli işlerin yapıldığı işyerlerinde İSG kurulu kurulur.",
"birim": "A1"
},
{
"q": "İş kazası Sosyal Güvenlik Kurumu'na olaydan sonra en geç ne zaman bildirilir?",
"opts": [
"Üç iş günü içinde",
"Aynı gün içinde",
"Bir hafta içinde",
"Bir ay içinde"
],
"ans": 0,
"ex": "6331 sayılı Kanuna göre iş kazası, olaydan sonraki üç iş günü içinde SGK'ya bildirilir.",
"birim": "A1"
},
{
"q": "Ciddi ve yakın tehlikeyle karşılaşan çalışanın 6331 sayılı Kanuna göre hakkı hangisidir?",
"opts": [
"Önlem alınana dek çalışmaktan kaçınma",
"Ücretsiz izin talep etme",
"Tehlikeyi kendi başına giderme",
"Tutanak tutmadan işe devam etme"
],
"ans": 0,
"ex": "Çalışan İSG kuruluna (yoksa işverene) başvurur; önlem alınmazsa gerekli tedbir alınıncaya kadar çalışmaktan kaçınabilir. Tehlike önlenemeyecek kadar yakınsa işyerini terk edebilir.",
"birim": "A1"
},
{
"q": "Çok tehlikeli sınıftaki bir işyerinde çalışanların İSG eğitimi en az hangi sıklık ve sürede tekrarlanır?",
"opts": [
"Üç yılda bir, 8 saat",
"İki yılda bir, 12 saat",
"Yılda bir, 16 saat",
"Altı ayda bir, 4 saat"
],
"ans": 2,
"ex": "Asgari: çok tehlikeli yılda bir 16 saat, tehlikeli iki yılda bir 12 saat, az tehlikeli üç yılda bir 8 saat.",
"birim": "A1"
},
{
"q": "Çok tehlikeli sınıftaki bir işyerinde risk değerlendirmesi en geç kaç yılda bir yenilenir?",
"opts": [
"1",
"2",
"4",
"6"
],
"ans": 1,
"ex": "Çok tehlikelide 2, tehlikelide 4, az tehlikelide 6 yıl. Taşınma, yeni makine, iş kazası veya ramak kala olayda süre beklenmeden güncellenir.",
"birim": "A1"
},
{
"q": "İşyerlerinde topraklama tesisatının periyodik kontrolü genel olarak hangi aralıkla yapılır?",
"opts": [
"Ayda bir",
"Üç ayda bir",
"Yılda bir",
"Beş yılda bir"
],
"ans": 2,
"ex": "İç tesisat, topraklama ve yıldırımdan korunma tesisatı genel olarak yılda bir yetkili kişilerce kontrol edilir; nemli, patlayıcı ortam gibi özel koşullarda daha sık yapılabilir.",
"birim": "A1"
},
{
"q": "OG/YG tesislerinde çalışacak elektrikçiden istenen, eğitim sonrası verilen yetki belgesi hangisidir?",
"opts": [
"EKAT belgesi",
"İSG uzmanlık belgesi",
"SMM belgesi",
"Ustalık belgesi"
],
"ans": 0,
"ex": "EKAT (Elektrik Kuvvetli Akım Tesisleri) belgesi, özellikle OG/YG tesislerinde çalışacak personel için eğitim sonrası verilen yetki belgesidir. Geçerlilik koşulları güncel düzenlemeden kontrol edilir.",
"birim": "A1"
},
{
"q": "YG hücresinde manevra yapabilmek için belgeye ek olarak ne gerekir?",
"opts": [
"Kıdemli ustanın sözlü onayı",
"Çalışanın yazılı kendi beyanı",
"Dağıtım şirketine SMS bildirimi",
"İşverenin yazılı yetkilendirmesi"
],
"ans": 3,
"ex": "Belge tek başına yetmez; işveren eğitimini ve belgesini kontrol ettiği kişiyi belirli tesis ve iş türü için yazılı olarak görevlendirir.",
"birim": "A1"
},
{
"q": "Ark parlaması riski olan pano işlerinde sentetik iç giysi neden yasaktır?",
"opts": [
"Arkta eriyip deriye yapışır",
"Elektriği iyi iletir",
"Hareket alanını kısıtlar",
"Terlemeyi artırır"
],
"ans": 0,
"ex": "Sentetik kumaş ark ısısında erir ve deriye yapışarak yanığı ağırlaştırır. Pamuk veya aleve dayanıklı kumaş ile ark korumalı yüz siperi kullanılır.",
"birim": "A1"
},
{
"q": "Enerjili panoya girerken yüzük, saat ve kolyenin çıkarılmasının asıl nedeni nedir?",
"opts": [
"Yalnız iş disiplini gereğidir",
"Ölçü aletinin okumasını bozar",
"Pano içinde manyetik alan yaratır",
"Kısa devrede kızarıp ağır yanık yapar"
],
"ans": 3,
"ex": "Metal takı köprü kurabilir; kısa devre yolunda saniyeler içinde kızarır, erir ve ete yapışır.",
"birim": "A1"
},
{
"q": "Canlı kısmın hemen çevresindeki, içine vücut veya alet girince işin 'canlı çalışma' sayıldığı bölge hangisidir?",
"opts": [
"Yaklaşma bölgesi (DV)",
"Uyarı bölgesi",
"Güvenli bölge",
"Canlı çalışma bölgesi (DL)"
],
"ans": 3,
"ex": "TS EN 50110-1: DL canlı çalışma bölgesi, dışındaki DV yaklaşma bölgesidir. Sınırlar gerilime göre standart tablolarından alınır.",
"birim": "A1"
},
{
"q": "Kompanzasyon panosunda enerji kesildikten sonra kondansatörler için doğru uygulama hangisidir?",
"opts": [
"Deşarj beklenir, ölçerek doğrulanır",
"Enerji kesilince hemen çalışılır",
"Uçlar tornavidayla kısa devre edilir",
"Yalnız kontaktörler açılır"
],
"ans": 0,
"ex": "Depolanmış enerji boşaltılmadan çalışılmaz: deşarj dirençleri olsa da birkaç dakika beklenir ve gerilimin düştüğü ölçülerek doğrulanır.",
"birim": "A1"
},
{
"q": "Ortak nötr kullanılmış bir hatta nötr iletkenini sökmeden önce ne yapılmalıdır?",
"opts": [
"Nötr zararsızdır, doğrudan sökülür",
"İlgili faz sigortası büyütülür",
"Önce nötr PE'ye köprülenir",
"Pensle akım ve gerilim kontrol edilir"
],
"ans": 3,
"ex": "Ortak nötrde başka linyenin dönüş akımı akabilir; sökülen nötr ucunda gerilim oluşur. Ayırmadan önce pens ampermetre ve ölçüyle kontrol edilir.",
"birim": "A1"
},
{
"q": "Yetişkinde kalp masajı için doğru bası hızı ve derinliği hangisidir?",
"opts": [
"Dakikada 100–120, 5–6 cm",
"Dakikada 60–80, 2–3 cm",
"Dakikada 140–160, 7–8 cm",
"Dakikada 80–100, 3–4 cm"
],
"ans": 0,
"ex": "Göğüs kemiğinin alt yarısına, kollar düz, 5–6 cm derinlik, dakikada 100–120 hız; her basıdan sonra göğüs tam geri gelir.",
"birim": "A1"
},
{
"q": "Temel yaşam desteğinde yetişkin için bası/soluk oranı nedir?",
"opts": [
"15:1",
"15:2",
"30:2",
"5:1"
],
"ans": 2,
"ex": "30 bası : 2 soluk. Soluk vermeyi bilmeyen kişi kesintisiz göğüs basısı uygular; OED gelince hemen bağlanır.",
"birim": "A1"
},
{
"q": "Bilinci kapalı kazazedede solunum en fazla kaç saniye değerlendirilir?",
"opts": [
"5",
"10",
"30",
"60"
],
"ans": 1,
"ex": "Bak-dinle-hisset en fazla 10 saniye. Hıçkırık benzeri (agonal) solunum normal solunum sayılmaz; basıya başlanır.",
"birim": "A1"
},
{
"q": "Bilinci kapalı ama normal soluyan ve düşme şüphesi olmayan kazazede nasıl bırakılır?",
"opts": [
"Sırtüstü, bacaklar yukarıda",
"Yan yatış (derlenme) pozisyonunda",
"Oturur pozisyonda",
"Yüzüstü, baş yana dönük"
],
"ans": 1,
"ex": "Derlenme (koma) pozisyonu hava yolunu açık tutar; solunum sürekli izlenir. Yüksekten düşme varsa omurga korunarak gereksiz hareket ettirilmez.",
"birim": "A1"
},
{
"q": "Elektrik yanığında doğru ilk yardım uygulaması hangisidir?",
"opts": [
"Buzla soğutmak",
"Serin akan suyla uzun süre soğutmak",
"Yağ veya krem sürmek",
"Yapışan giysiyi çekip çıkarmak"
],
"ans": 1,
"ex": "Yanık serin (buzsuz) suyla yaklaşık 20 dakika soğutulur; buz, yağ, diş macunu sürülmez; yapışan giysi çekilmez; temiz örtüyle kapatılır.",
"birim": "A1"
},
{
"q": "Çarpılan ama kendine gelen ve 'iyiyim' diyen çalışan için doğru karar hangisidir?",
"opts": [
"Dinlenip işe dönebilir",
"Hastanede değerlendirilmeli",
"Bol su içirilip gözlenir",
"Yanık yoksa işe devam eder"
],
"ans": 1,
"ex": "İç doku yanığı ve saatler sonra ortaya çıkabilen kalp ritim bozukluğu dışarıdan görünmez; her çarpılan kişi sağlık kuruluşunda değerlendirilir.",
"birim": "A1"
},
{
"q": "Yere kopup düşmüş enerjili bir iletkenin yakınında kalan kişi nasıl uzaklaşmalıdır?",
"opts": [
"Koşarak ve geniş adımlar atarak",
"Ayaklarını ayırmadan küçük adımlarla",
"Yere çömelip sürünerek çekilerek",
"İletkenin üstünden atlayarak geçerek"
],
"ans": 1,
"ex": "İletkenin çevresinde adım gerilimi oluşur; adım açıldıkça gerilim artar. Ayaklar birbirinden ayrılmadan, sürüyerek küçük adımlarla uzaklaşılır.",
"birim": "A1"
},
{
"q": "YG hücresinde çarpılan bir kişiye müdahalede doğru yaklaşım hangisidir?",
"opts": [
"Kuru bir tahta sopayla kişiyi ayırmak",
"AG yalıtkan eldiveniyle hemen çekmek",
"Yetkili kesip topraklayana dek yaklaşmamak",
"Plastik boruyla kişiyi uzaktan itmek"
],
"ans": 2,
"ex": "Tahta sopa YG'ye karşı koruma sağlamaz; temas olmadan ark atlayabilir. Enerji yetkili personelce kesilip topraklanana kadar yaklaşılmaz; 112 ve dağıtım şirketi aranır.",
"birim": "A1"
},
{
"q": "50 Hz AC, el–ayak yolunda kişinin iletkeni kendi kas gücüyle bırakamadığı akım bölgesi yaklaşık hangisidir?",
"opts": [
"0,5–1 mA",
"1–5 mA",
"15–25 mA",
"Birkaç amper"
],
"ans": 2,
"ex": "15–25 mA civarında kaslar kontrolden çıkar, kişi iletkeni bırakamaz (let-go eşiği aşılır); temas uzadıkça deri direnci düşer, akım artar. IEC 60479-1 esas alınır.",
"birim": "A1"
},
{
"q": "Normal koşullarda sürekli kalmasına izin verilen sözleşmeli dokunma gerilimi sınırı (AC) nedir?",
"opts": [
"12 V",
"25 V",
"50 V",
"120 V"
],
"ans": 2,
"ex": "Normal koşullarda 50 V AC (dalgasız DC'de 120 V). Islak ve iletken ortamlar gibi özel koşullarda 25 V gibi daha düşük sınırlar uygulanır.",
"birim": "A1"
},
{
"q": "Sökülen floresan ve kompakt floresan lambalar neden evsel atığa atılmaz?",
"opts": [
"Cam kırığı içerdiği için",
"Cıva içerdiği için",
"Plastik gövdeli olduğu için",
"Hacimli oldukları için"
],
"ans": 1,
"ex": "Floresan lambalar cıva içerir; kırılmadan ayrı toplanır ve atık elektrikli-elektronik eşya olarak yetkili toplayıcıya verilir.",
"birim": "A1"
},
{
"q": "Kullanılmış akü ve piller için doğru uygulama hangisidir?",
"opts": [
"Metal hurdayla birlikte satılır",
"Ayrı toplanıp yetkili firmaya verilir",
"Evsel atık konteynerine atılır",
"Asidi boşaltılıp gövdesi atılır"
],
"ans": 1,
"ex": "Akü ve piller tehlikeli atıktır; ayrı ve sızdırmaz biçimde toplanıp yetkili toplama/geri kazanım firmasına teslim edilir. Asit boşaltmak çevre ve sağlık için tehlikelidir.",
"birim": "A1"
},
{
"q": "6 kişilik bir ekip günde 9 saat çalışıyorsa günlük işçilik kaç adam-saattir?",
"opts": [
"15",
"45",
"54",
"60"
],
"ans": 2,
"ex": "Adam-saat = çalışan sayısı × çalışılan saat = 6 × 9 = 54 adam-saat. Puantaj ve verimlilik takibi bu birimle yapılır.",
"birim": "A1"
},
{
"q": "Hakediş tutarının temel hesabı nasıldır?",
"opts": [
"Adam-saat × saat ücreti",
"Metraj × birim fiyat",
"Malzeme bedeli + %20",
"Keşif bedeli ÷ iş süresi"
],
"ans": 1,
"ex": "Birim fiyat sözleşmede hakediş = ölçülen iş miktarı (metraj) × poz birim fiyatı; kümülatif hesaplanır, önceki ödemeler ve kesintiler düşülür.",
"birim": "A1"
},
{
"q": "Uygulamada projeden farklı yapılan değişiklikler hangi belgeye işlenir?",
"opts": [
"Keşif özeti cetveli",
"As-built (son durum) projesi",
"Günlük puantaj cetveli",
"Malzeme onay formu"
],
"ans": 1,
"ex": "Sahadaki son durum as-built projesine işlenir; iş sürerken kırmızı kalemle işaretlenir, iş bitince sayısal çizime aktarılır.",
"birim": "A1"
},
{
"q": "Sahada verilen sözlü değişiklik talimatı için doğru uygulama hangisidir?",
"opts": [
"Uygulanır, kayda gerek yoktur",
"Günlük rapora veya tutanağa geçirilir",
"İş bitince hatırlanırsa yazılır",
"Yalnız taşerona iletilir"
],
"ans": 1,
"ex": "Sözlü talimat kayda geçmezse hakediş ve sorumluluk anlaşmazlığı doğar; günlük rapor, tutanak veya RFI ile yazılı hâle getirilir.",
"birim": "A1"
},
{
"q": "İş bitince 5 altın kuralın önlemleri hangi sırayla kaldırılır?",
"opts": [
"Aynı sırayla (1 → 5)",
"Ters sırayla (5 → 1)",
"Önce kilitler, sonra örtüler",
"Yalnız etiketler sökülür"
],
"ans": 1,
"ex": "Ters sıra: örtüler kaldırılır → geçici topraklamalar sökülür → kilit/etiketler sahiplerince sökülür → iş izni kapatılır → enerji verilir.",
"birim": "A1"
}
],
"meslek": [
{
"q": "Nemli yerlerde sıva altı ve sıva üstü tesisatta yaygın kullanılan, sahada 'antigron' diye bilinen kablo hangisidir?",
"opts": [
"NYA",
"H05V-K",
"NYAF",
"NYM"
],
"ans": 3,
"ex": "NYM (antigron) PVC dış kılıflı çok damarlı tesisat kablosudur; kuru ve nemli iç mekânda sıva altı/üstü kullanılır. NYA ve NYAF tek damarlı, boru içinde çekilen iletkenlerdir.",
"birim": "B1"
},
{
"q": "V = I·R bağıntısında akım I neye eşittir?",
"opts": [
"V·R",
"V−R",
"R/V",
"V/R"
],
"ans": 3,
"ex": "Ohm yasası: I = V / R. Örneğin 230 V'a bağlı 46 Ω'luk ısıtıcı 5 A çeker.",
"birim": "B1"
},
{
"q": "Üç fazlı dengeli bir yükün aktif gücü hangi formülle hesaplanır?",
"opts": [
"P = U·I",
"P = U·I·sinφ",
"P = √3·U·I",
"P = √3·U·I·cosφ"
],
"ans": 3,
"ex": "U hat (fazlar arası) gerilimi, I hat akımıdır. √3·U·I görünür güç (S), √3·U·I·sinφ reaktif güçtür (Q).",
"birim": "B1"
},
{
"q": "TS HD 60364-5-52 (Ek G) önerisine göre AG dağıtım şebekesinden beslenen bir tesiste aydınlatma devreleri için en büyük gerilim düşümü nedir?",
"opts": [
"%1",
"%3",
"%5",
"%10"
],
"ans": 1,
"ex": "TS HD 60364-5-52 Ek G: aydınlatma %3, diğer kullanımlar %5 (besleme noktasından itibaren). Türkiye iç tesis uygulamasında sayaç sonrası için aydınlatma-priz %1,5, motor %3 gibi daha sıkı değerler aranır; projede şartname ve yönetmelik esas alınır.",
"birim": "B1"
},
{
"q": "Türkiye iç tesis uygulamasında sayaçtan sonraki aydınlatma ve priz devreleri için yaygın kabul gören gerilim düşümü sınırı nedir?",
"opts": [
"%0,5",
"%1,5",
"%5",
"%10"
],
"ans": 1,
"ex": "Sayaç sonrası hat için yaygın sınırlar: aydınlatma ve priz devrelerinde yaklaşık %1,5, motor (kuvvet) devrelerinde yaklaşık %3. Projede şartname değeri esas alınır.",
"birim": "B1"
},
{
"q": "Türkiye iç tesis uygulamasında sayaçtan sonraki motor (kuvvet) devreleri için yaygın gerilim düşümü sınırı nedir?",
"opts": [
"%0,5",
"%1,5",
"%3",
"%10"
],
"ans": 2,
"ex": "Motor devrelerinde yaklaşık %3, aydınlatma ve priz devrelerinde yaklaşık %1,5 kabul edilir.",
"birim": "B1"
},
{
"q": "C eğrili otomatik sigortanın (MCB) anlık (manyetik) açma bölgesi hangisidir?",
"opts": [
"3–5·In",
"5–10·In",
"10–20·In",
"1,13–1,45·In"
],
"ans": 1,
"ex": "B: 3–5·In, C: 5–10·In, D: 10–20·In. 1,13–1,45·In aralığı her eğride aynı olan termik (aşırı yük) bölgesidir.",
"birim": "B1"
},
{
"q": "Kompanzasyon (paralel kondansatör) ile düzeltilen büyüklük hangisidir?",
"opts": [
"Şebeke gerilimi",
"İletken direnci",
"Şebeke frekansı",
"Güç faktörü (cosφ)"
],
"ans": 3,
"ex": "Kondansatör, endüktif yükün çektiği reaktif gücü yerinde karşılar; cosφ yükselir, hat akımı ve kayıplar azalır. Gerekli güç Qc = P·(tanφ1 − tanφ2).",
"birim": "B1"
},
{
"q": "Türkiye AG şebekesinde faz-nötr gerilimi yaklaşık kaç volttur?",
"opts": [
"110 V",
"230 V",
"400 V",
"690 V"
],
"ans": 1,
"ex": "Faz-nötr ≈ 230 V, fazlar arası ≈ 400 V (230·√3). Şebekede ±%10 (207–253 V) değişim normal kabul edilir.",
"birim": "B1"
},
{
"q": "Türkiye AG şebekesinde fazlar arası (hat) gerilimi yaklaşık kaç volttur?",
"opts": [
"230 V",
"400 V",
"690 V",
"110 V"
],
"ans": 1,
"ex": "Hat gerilimi = √3 × faz gerilimi ≈ 1,73 × 230 ≈ 400 V.",
"birim": "B1"
},
{
"q": "Seri bağlı elemanlardan oluşan bir devrede her elemanda aynı olan büyüklük hangisidir?",
"opts": [
"Akım",
"Gerilim",
"Güç",
"Direnç"
],
"ans": 0,
"ex": "Seride akım her elemandan aynı geçer, gerilim dirençlerle orantılı bölünür. Paralelde ise gerilim aynı, akım bölünür.",
"birim": "B1"
},
{
"q": "İletken kesitini belirleyen kriterler için hangisi doğrudur?",
"opts": [
"Akım, gerilim düşümü ve koruma uyumu",
"Yalnız hat uzunluğu",
"Yalnız taşınacak akım",
"Yalnız kablonun rengi ve tipi"
],
"ans": 0,
"ex": "Kesit; akım taşıma kapasitesi (döşeme ve düzeltme faktörleriyle), gerilim düşümü, Ib ≤ In ≤ Iz uyumu ve arıza/kısa devre şartının hepsini sağlamalıdır. En büyük kesiti isteyen kriter kazanır.",
"birim": "B1"
},
{
"q": "İç tesisat projesinde içi çarpılı daire (⊗) sembolü neyi gösterir?",
"opts": [
"Armatür (lamba sortisi)",
"Buat (ek kutusu)",
"Topraklı priz sortisi",
"Dağıtım tablosu"
],
"ans": 0,
"ex": "IEC 60617 kökenli gösterimde ⊗ lamba sortisidir; yanındaki yazı güç ve adedi verebilir. Okumaya her zaman projenin kendi lejantından başlanır.",
"birim": "B1"
},
{
"q": "Priz sembolünde yarım dairenin üstüne teğet düz çizgi eklenmesi neyi belirtir?",
"opts": [
"Topraklı priz",
"Zayıf akım (TV/DATA) prizi",
"İkili priz grubu",
"Trifaze kuvvet prizi"
],
"ans": 0,
"ex": "Üst çizgi PE'yi, yani topraklı prizi gösterir. Yanına yazılan 2 veya 3 ikili/üçlü grubu, TV-DATA-TEL yazısı zayıf akım prizini belirtir.",
"birim": "B1"
},
{
"q": "Plandaki bir hat üzerindeki üç kısa eğik çizgi neyi ifade eder?",
"opts": [
"3 mm² kesit",
"Üç fazlı besleme",
"3 numaralı linye",
"Üç iletken"
],
"ans": 3,
"ex": "Eğik çizgi sayısı iletken sayısıdır. Örneğin lamba sortisinde üç (dönüş, N, PE), anahtar sortisinde iki (L, dönüş) çizgi görülür.",
"birim": "B1"
},
{
"q": "Kolon şemasında '5×6 mm²' yazımı ne anlama gelir?",
"opts": [
"6 adet 5 mm² iletken",
"5 adet 6 mm² iletken",
"5 m boyunda 6 mm² kablo",
"5 A yük, 6 mm² kesit"
],
"ans": 1,
"ex": "Yazım 'adet × kesit' biçimindedir: 5×6 mm² = beş adet 6 mm² iletken (L1-L2-L3-N-PE), tipik bir trifaze kolon.",
"birim": "B1"
},
{
"q": "Projede bir hattın yanında yazan 'Ø16' ifadesi neyi gösterir?",
"opts": [
"16 A sigorta",
"16 mm² kesit",
"16 mm çaplı boru",
"16 numaralı sorti"
],
"ans": 2,
"ex": "Boru çapıyla yazılır: Ø16, Ø20 gibi. Örnek: '3×1,5 mm² NYA / Ø16' = üç adet 1,5 mm² NYA iletken, 16 mm boru içinde.",
"birim": "B1"
},
{
"q": "Dağıtım tablosundaki bir otomattan çıkıp bir grup kullanım noktasını besleyen hatta ne denir?",
"opts": [
"Linye",
"Kolon hattı",
"Sorti",
"Bağlantı hattı"
],
"ans": 0,
"ex": "Her linyenin bir numarası, koruma elemanı (ör. B16) ve kesiti (ör. 3×2,5 mm²) vardır; plandaki linye numarası tablodaki otomat numarasıyla eşleşir.",
"birim": "B1"
},
{
"q": "Linyeden ayrılıp tek bir armatüre veya prize giden son hat parçasına ne denir?",
"opts": [
"Sorti",
"Kolon",
"Gezgin tel",
"Branşman hattı"
],
"ans": 0,
"ex": "Sorti tek kullanım noktasına giden son hattır; keşif ve işçilik çoğunlukla sorti üzerinden yapılır (aydınlatma, priz, vavien sortisi).",
"birim": "B1"
},
{
"q": "Sayaçtan daire dağıtım tablosuna giden besleme hattına ne denir?",
"opts": [
"Linye",
"Sorti",
"Kolon hattı",
"Topraklama hattı"
],
"ans": 2,
"ex": "Kolon hattı dairenin bütün yükünü taşır; kesiti talep gücüne ve gerilim düşümüne göre hesaplanır.",
"birim": "B1"
},
{
"q": "Trifaze beslenen bir dairenin kolon hattında kaç iletken bulunur?",
"opts": [
"3",
"4",
"5",
"6"
],
"ans": 2,
"ex": "Trifaze: L1-L2-L3-N-PE = 5 iletken. Monofaze beslemede L-N-PE = 3 iletken.",
"birim": "B1"
},
{
"q": "Konut projesinde tipik aydınlatma linyesi kesiti ve otomat değeri hangisidir?",
"opts": [
"1,5 mm² – 10 A",
"2,5 mm² – 25 A",
"1 mm² – 16 A",
"4 mm² – 10 A"
],
"ans": 0,
"ex": "Tipik: aydınlatma 1,5 mm² + 10 A, priz 2,5 mm² + 16 A. Kesin kesit döşeme şekli ve hat boyuyla hesaplanarak doğrulanır.",
"birim": "B1"
},
{
"q": "Konut priz linyesi için tipik kesit ve otomat değeri hangisidir?",
"opts": [
"1,5 mm² – 16 A",
"2,5 mm² – 16 A",
"2,5 mm² – 25 A",
"4 mm² – 32 A"
],
"ans": 1,
"ex": "Priz linyesi tipik olarak 3×2,5 mm², 16 A (B veya C) ve 30 mA RCD ile korunur. 2,5 mm²'ye 25 A takmak kabloyu korumasız bırakır.",
"birim": "B1"
},
{
"q": "Kurulu gücü 12 kW olan bir dairede ilk 8 kW için %60, aşan kısım için %40 eşzamanlılıkla talep gücü kaç kW'tır?",
"opts": [
"3,6 kW",
"4,8 kW",
"5,6 kW",
"6,4 kW"
],
"ans": 3,
"ex": "8 × 0,60 = 4,8 kW; (12 − 8) × 0,40 = 1,6 kW; Pt = 4,8 + 1,6 = 6,4 kW. Katsayılar güncel yönetmelik ve dağıtım şirketi şartlarından kontrol edilir.",
"birim": "B1"
},
{
"q": "Kolon hattı, kolon sigortası ve sayaç bağlantısı hangi güce göre boyutlandırılır?",
"opts": [
"Kurulu güç",
"Tüm cihazların etiket toplamı",
"En büyük linye gücü",
"Talep gücü"
],
"ans": 3,
"ex": "Kolon talep gücüne (eşzamanlılık uygulanmış güç), her linye ise kendi kurulu gücüne göre boyutlandırılır.",
"birim": "B1"
},
{
"q": "Talep gücü 6,9 kW olan trifaze bir dairede (400 V, cosφ ≈ 1, dengeli yük) kolon akımı yaklaşık kaç amperdir?",
"opts": [
"10 A",
"17 A",
"30 A",
"40 A"
],
"ans": 0,
"ex": "I = P / (√3 × 400) = 6900 / 692,8 ≈ 10 A. Aynı daire monofaze beslenseydi 6900 / 230 = 30 A olurdu; yüksek güçlü dairelerin trifaze beslenme nedeni budur.",
"birim": "B1"
},
{
"q": "Aşağıdaki yüklerden hangisi projede kendi ayrı linyesiyle beslenmelidir?",
"opts": [
"Ankastre fırın",
"Salon aydınlatması",
"TV prizi",
"Koridor apliği"
],
"ans": 0,
"ex": "Fırın, çamaşır ve bulaşık makinesi, ocak, klima, termosifon/şofben gibi yüksek güçlü veya uzun süre sürekli çalışan yükler ayrı linyeden beslenir; ortak linyede otomat atar, klemensler ısınır.",
"birim": "B1"
},
{
"q": "Trifaze bir dairede iki aydınlatma linyesinin farklı fazlara bağlanmasının amacı nedir?",
"opts": [
"Kolon kesitini küçültebilmek",
"Anahtar sayısını azaltabilmek",
"RCD sayısını azaltabilmek",
"Tek faz kaybında evi karartmamak"
],
"ans": 3,
"ex": "Bir faz giderse evin tamamı karanlıkta kalmaz. Büyük yükler (fırın, çamaşır, bulaşık) de farklı fazlara dağıtılarak faz dengesi sağlanır.",
"birim": "B1"
},
{
"q": "Tek fazlı (230 V) bir linyede yüzde gerilim düşümü hangi formülle hesaplanır?",
"opts": [
"%e = 100·L·P / (k·S·U²)",
"%e = 200·L·P / (k·S·U²)",
"%e = 200·L·I / (k·S)",
"%e = L·P / (k·S·U)"
],
"ans": 1,
"ex": "Tek fazda 200 çarpanı gidiş ve dönüş iletkenini birlikte hesaba katar. Üç fazda %e = 100·L·P / (k·S·U²). L tek yön boy (m), bakırda k ≈ 56.",
"birim": "B1"
},
{
"q": "230 V, 2000 W'lık yük 20 m uzunluğunda 2,5 mm² bakır (k = 56) linyeyle besleniyor. Yüzde gerilim düşümü yaklaşık kaçtır?",
"opts": [
"%0,54",
"%0,72",
"%1,08",
"%2,16"
],
"ans": 2,
"ex": "%e = 200 × 20 × 2000 / (56 × 2,5 × 230²) = 8 000 000 / 7 406 000 ≈ %1,08.",
"birim": "B1"
},
{
"q": "400 V, 20 m, 5×6 mm² bakır kolonda 7920 W talep gücü için yüzde gerilim düşümü yaklaşık kaçtır?",
"opts": [
"%0,29",
"%0,58",
"%1,16",
"%2,32"
],
"ans": 0,
"ex": "Üç faz: %e = 100 × 20 × 7920 / (56 × 6 × 400²) = 15 840 000 / 53 760 000 ≈ %0,29.",
"birim": "B1"
},
{
"q": "Koruma elemanı ile kablo arasındaki temel uyum şartı hangisidir?",
"opts": [
"Ib ≤ In ≤ Iz",
"In ≤ Ib ≤ Iz",
"Iz ≤ In ≤ Ib",
"Ib ≤ Iz ≤ In"
],
"ans": 0,
"ex": "Yük akımı ≤ sigorta anma akımı ≤ kablonun akım taşıma kapasitesi. Ayrıca I2 ≤ 1,45·Iz aranır; MCB'de In ≤ Iz bunu sağlar, gG sigortada pratikte In ≤ 0,9·Iz gerekir.",
"birim": "B1"
},
{
"q": "Aynı boruda 3 priz devresi var (B1 yöntemi, 2,5 mm², Iz0 = 24 A); ortam 40 °C (k1 = 0,87), gruplama k2 = 0,70. Gerçek akım taşıma kapasitesi Iz yaklaşık kaçtır?",
"opts": [
"14,6 A",
"16,8 A",
"20,9 A",
"24,0 A"
],
"ans": 0,
"ex": "Iz = 24 × 0,87 × 0,70 ≈ 14,6 A < 16 A: Ib ≤ In ≤ Iz bozulur. Çözüm 4 mm² (32 × 0,87 × 0,70 ≈ 19,5 A) veya devreleri ayrı borulara dağıtmaktır.",
"birim": "B1"
},
{
"q": "Uzun bir bahçe hattında akım bakımından 2,5 mm² yeterli olsa da kesiti büyüten kriter genellikle hangisidir?",
"opts": [
"İletken renk kodu",
"Linye numarası",
"Boru çapı",
"Gerilim düşümü"
],
"ans": 3,
"ex": "Uzun hatlarda gerilim düşümü çoğu zaman kesiti belirler; ör. 230 V, 3000 W, 30 m: 2,5 mm²'de %2,43, 4 mm²'de %1,52, 6 mm²'de %1,01.",
"birim": "B1"
},
{
"q": "Doğrudan toprak altına döşenecek güç kablosu için uygun tip hangisidir?",
"opts": [
"NYA",
"NYM",
"NYY",
"H05VV-F"
],
"ans": 2,
"ex": "NYY PVC yalıtım + kalın PVC kılıflı, 0,6/1 kV kablodur; tipik 60–80 cm derinlikte kum yatağa döşenir, üstüne ikaz bandı konur. NYY zırhlı değildir; taşlı güzergâhta boru veya zırhlı kablo gerekir.",
"birim": "B1"
},
{
"q": "Hastane, AVM ve kaçış yollarında yangında duman ve halojen gazını azaltmak için seçilen kablo grubu hangisidir?",
"opts": [
"NYM / NYA",
"NYY / NYM",
"N2XH / NHXMH",
"NYAF / NYA"
],
"ans": 2,
"ex": "Halojensiz (LSZH) kablolar yandığında klorlu gaz çıkarmaz, duman yoğunluğu düşüktür. Hangi binada zorunlu olduğu yangın mevzuatı ve şartnameyle belirlenir.",
"birim": "B1"
},
{
"q": "Yangın pompası ve acil aydınlatma beslemesinde yangın süresince çalışması istenen kablo hangisidir?",
"opts": [
"N2XH-FE180",
"N2XH (halojensiz)",
"NYY (PVC kılıflı)",
"NYM-J (antigron)"
],
"ans": 0,
"ex": "FE180 gibi yangına dayanıklı kablolar belirli süre yangın altında çalışmayı sürdürür. Halojensiz olmak tek başına yangına dayanıklı olmak demek değildir.",
"birim": "B1"
},
{
"q": "NYM-J 3×2,5 kablo adındaki '-J' neyi gösterir?",
"opts": [
"Zırhlı yapıda olduğunu",
"İletkenin esnek olduğunu",
"Kılıfın halojensiz olduğunu",
"Yeşil-sarı damar içerdiğini"
],
"ans": 3,
"ex": "-J: damarlardan biri yeşil-sarı koruma iletkenidir; -O: yeşil-sarı damar yoktur. 3×2,5 = üç damar, her biri 2,5 mm².",
"birim": "B1"
},
{
"q": "Faz iletkeni 25 mm² bakır olan bir hatta en küçük PE kesiti kaç mm² olmalıdır?",
"opts": [
"4 mm²",
"6 mm²",
"10 mm²",
"16 mm²"
],
"ans": 3,
"ex": "PE kesiti: S ≤ 16 mm² ise PE = S; 16 < S ≤ 35 mm² ise 16 mm²; S > 35 mm² ise S/2.",
"birim": "B1"
},
{
"q": "En büyük PE kesiti 16 mm² olan bir binada ana eşpotansiyel iletkenin (Cu) kesiti ne seçilir?",
"opts": [
"6 mm²",
"10 mm²",
"16 mm²",
"25 mm²"
],
"ans": 1,
"ex": "Ana eşpotansiyel iletken en büyük PE'nin yarısı (16/2 = 8 mm²), en az 6 mm², 25 mm²'den büyüğü gerekmez; 8 mm²'nin bir üst standart kesiti 10 mm²'dir.",
"birim": "B1"
},
{
"q": "TS HD 60364-7-701'e göre banyoda bölge 1, bitmiş döşemeden hangi yüksekliğe kadar uzanır?",
"opts": [
"2,00 m",
"2,25 m",
"2,50 m",
"3,00 m"
],
"ans": 1,
"ex": "Bölge 0 küvet/duş teknesinin içi, bölge 1 bunun üstü 2,25 m'ye kadar, bölge 2 bölge 1 sınırından yatayda 0,6 m'lik şerittir.",
"birim": "B1"
},
{
"q": "Banyoda (standarttaki istisnalar hariç) prizin konabileceği yer ve koruması hangisidir?",
"opts": [
"Bölge 1, 300 mA RCD",
"Bölge 2, 30 mA RCD",
"Bölge dışı, 30 mA RCD",
"Bölge 0, SELV"
],
"ans": 2,
"ex": "Bölge 0, 1 ve 2'de prize izin verilmez (izolasyon trafolu tıraş prizi gibi istisnalar hariç); prizler bölge dışına konur ve 30 mA RCD ile korunur.",
"birim": "B1"
},
{
"q": "Bir lambanın beş ayrı yerden kumanda edilmesi için gereken anahtarlar hangisidir?",
"opts": [
"5 vavien",
"2 vavien + 3 ara anahtar",
"1 vavien + 4 ara anahtar",
"2 komütatör + 3 vavien"
],
"ans": 1,
"ex": "N yerden kumanda = 2 vavien + (N − 2) ara (kron) anahtar. 4–5 yerden fazlasında impuls röle veya merdiven otomatı daha ekonomiktir.",
"birim": "B1"
},
{
"q": "Bir avizenin kollarını iki grup hâlinde aynı yerden ayrı ayrı yakmak için projede hangi anahtar seçilir?",
"opts": [
"Adi anahtar",
"Vavien",
"Komütatör",
"Ara (kron) anahtar"
],
"ans": 2,
"ex": "Komütatör (seri anahtar) tek kasada iki anahtardır: ortak faz girişi, iki ayrı dönüş. Buattan komütatöre L, L'1, L'2 olmak üzere 3 iletken gider.",
"birim": "B1"
},
{
"q": "Apartman merdiveninde her katta buton bulunan ve lambaların ayarlanan süre sonunda sönmesi istenen devrede hangi cihaz seçilir?",
"opts": [
"Merdiven otomatı",
"İmpuls röle",
"Dimmer",
"Vavien"
],
"ans": 0,
"ex": "Merdiven otomatı butona basılınca lambaları ayarlı süre yakar. İmpuls röle ise süresizdir: her basışta yak/söndür.",
"birim": "B1"
},
{
"q": "8 × 6 m ofis için hedef 500 lx; armatür 4000 lm, kullanma faktörü η = 0,6, bakım faktörü d = 0,8. Gereken en az armatür sayısı kaçtır?",
"opts": [
"10",
"13",
"15",
"20"
],
"ans": 1,
"ex": "n = E·A / (Φ·η·d) = 500 × 48 / (4000 × 0,6 × 0,8) = 24 000 / 1920 ≈ 12,5 → en az 13. Düzgün yerleşim için pratikte 3 × 5 = 15 seçilebilir.",
"birim": "B1"
},
{
"q": "1 lüks (lx) aydınlık düzeyi neye eşittir?",
"opts": [
"1 cd/m²",
"1 lm/m²",
"1 lm/W",
"1 W/m²"
],
"ans": 1,
"ex": "Lüks, yüzeye düşen ışık akısının alana oranıdır: 1 lx = 1 lm/m². cd/m² parıltı, lm/W ışık verimi birimidir.",
"birim": "B1"
},
{
"q": "1000 cd'lik bir spot, altındaki masaya 2 m yükseklikten dik bakıyor. Masadaki aydınlık düzeyi kaç lükstür?",
"opts": [
"125 lx",
"250 lx",
"500 lx",
"2000 lx"
],
"ans": 1,
"ex": "Ters kare kanunu: E = I / d² = 1000 / 2² = 250 lx. Mesafe iki katına çıkarsa aydınlık dörtte birine düşer.",
"birim": "B1"
},
{
"q": "TS EN 12464-1'e göre ofiste yazma-okuma-bilgisayar işi için tipik ortalama aydınlık düzeyi kaç lükstür?",
"opts": [
"100 lx",
"300 lx",
"500 lx",
"1000 lx"
],
"ans": 2,
"ex": "Ofis yazma-okuma: Em 500 lx, UGRL 19, U0 0,60, Ra 80. Koridor için 100 lx yeterlidir.",
"birim": "B1"
},
{
"q": "Uzun bir konut priz linyesinde B16'nın C16'ya tercih edilme nedeni hangisidir?",
"opts": [
"Kesme kapasitesinin daha yüksek olması",
"Motor kalkış akımına daha dayanıklı olması",
"Düşük arıza akımında anlık açabilmesi",
"Termik açma bölgesinin daha dar olması"
],
"ans": 2,
"ex": "B16 en geç 5 × 16 = 80 A'de anlık açar (Zs ≤ 230/80 ≈ 2,9 Ω); C16 için 160 A gerekir (Zs ≤ 1,44 Ω). Hat uzadıkça arıza akımı düşer, B eğrisi açma şartını daha kolay sağlar.",
"birim": "B1"
},
{
"q": "MCB üzerinde kutu içinde yazan '6000' ifadesi neyi gösterir?",
"opts": [
"Anma akımını (A)",
"Yalıtım test gerilimini (V)",
"Mekanik ömrü (açma sayısı)",
"Kesme kapasitesini (A)"
],
"ans": 3,
"ex": "Icn = 6000 A: cihazın güvenle kesebileceği en büyük kısa devre akımı. Bulunduğu noktadaki olası kısa devre akımından küçük olmamalıdır; anma akımıyla ilgisi yoktur.",
"birim": "B1"
},
{
"q": "Çamaşır makinesi ve elektronik cihazlar bulunan modern bir konutta önerilen en düşük RCD tipi hangisidir?",
"opts": [
"AC",
"B",
"F",
"A"
],
"ans": 3,
"ex": "A tipi sinüzoidal AC'ye ek olarak darbeli DC kaçağı da algılar. F tek fazlı inverter klima/ısı pompası, B düz DC kaçaklı yükler (VFD, EV şarjı, bazı PV) içindir.",
"birim": "B1"
},
{
"q": "Ana panoda, alttaki 30 mA genel tip RCD'lerle seçici çalışacak üst RCD hangisi olmalıdır?",
"opts": [
"30 mA genel tip",
"100 mA genel tip",
"300 mA S tipi",
"10 mA genel tip"
],
"ans": 2,
"ex": "Seçicilik için üst RCD S tipi (gecikmeli) ve IΔn'si alttakinin en az üç katı olmalıdır. S tipi IΔn'de 130–500 ms arasında açar.",
"birim": "B1"
},
{
"q": "230 V'ta çalışan 3000 W'lık rezistif bir yükün akımı yaklaşık kaç amperdir?",
"opts": [
"6,5 A",
"10 A",
"13 A",
"16 A"
],
"ans": 2,
"ex": "I = P / U = 3000 / 230 ≈ 13 A (cosφ = 1). Bu yük tek başına bir 16 A linyenin büyük kısmını kullanır; ayrı linye gerekir.",
"birim": "B1"
},
{
"q": "Aktif gücü 8 kW, görünür gücü 10 kVA olan bir yükün güç faktörü (cosφ) nedir?",
"opts": [
"0,60",
"0,75",
"0,80",
"1,25"
],
"ans": 2,
"ex": "cosφ = P / S = 8 / 10 = 0,8. Reaktif güç Q = √(S² − P²) = 6 kVAr.",
"birim": "B1"
},
{
"q": "Ampermetre devreye nasıl bağlanır?",
"opts": [
"Seri",
"Paralel",
"Faz ile toprak arasına",
"Yükün iki ucuna"
],
"ans": 0,
"ex": "Ampermetrenin iç direnci çok düşüktür ve seri bağlanır; paralel bağlanırsa kaynağı kısa devre eder. Voltmetre yüksek iç dirençlidir ve paralel bağlanır.",
"birim": "B2"
},
{
"q": "İnsan hayatını korumak (ek koruma) için kullanılan kaçak akım rölesinin anma kaçak akımı (IΔn) nedir?",
"opts": [
"10 mA",
"30 mA",
"100 mA",
"300 mA"
],
"ans": 1,
"ex": "30 mA can güvenliği içindir; 32 A'e kadar prizlerde, banyo devrelerinde ve konut aydınlatma son devrelerinde istenir. 100–300 mA yangın koruması ve seçicilik içindir, insanı korumaz.",
"birim": "B2"
},
{
"q": "Topraklama direnciyle ilgili doğru ifade hangisidir?",
"opts": [
"Yüksek olması daha güvenlidir",
"Tuzla düşürülmesi kalıcı çözümdür",
"Yalnız yazın ölçülmesi yeterlidir",
"Düşük olmalı ve ölçülerek doğrulanmalıdır"
],
"ans": 3,
"ex": "Hedef değer tesise göre değişir (TT'de RA·IΔn ≤ 50 V, yıldırım topraklamasında mümkünse < 10 Ω) ve üç uçlu yöntemle ölçülür. Kuru yaz ve donda direnç artar; tuz korozyonu hızlandırır, kalıcı çözüm değildir.",
"birim": "B2"
},
{
"q": "RJ45 T568B diziliminde 1 numaralı pinin rengi hangisidir?",
"opts": [
"Turuncu",
"Mavi",
"Yeşil-beyaz",
"Turuncu-beyaz"
],
"ans": 3,
"ex": "T568B: turuncu-beyaz, turuncu, yeşil-beyaz, mavi, mavi-beyaz, yeşil, kahverengi-beyaz, kahverengi. T568A'da turuncu ve yeşil çiftler yer değiştirir.",
"birim": "B2"
},
{
"q": "Transformatör hangi tür gerilimle çalışır?",
"opts": [
"Yalnız DC",
"Darbeli DC",
"Hem AC hem DC",
"Yalnız AC"
],
"ans": 3,
"ex": "Trafo elektromanyetik indüksiyonla çalışır; değişken akı gerekir. DC'de sekonderde gerilim oluşmaz, primer sargı yalnız omik direnciyle sınırlanır ve aşırı ısınır.",
"birim": "B2"
},
{
"q": "Asenkron motorda kalkış (yol alma) akımını düşüren yöntem hangisidir?",
"opts": [
"Kompanzasyon yapmak",
"Parafudr takmak",
"Gövdeyi topraklamak",
"Yıldız-üçgen yol verme"
],
"ans": 3,
"ex": "Yıldız-üçgen yol vermede kalkış akımı ve momenti doğrudan yol vermenin yaklaşık 1/3'üne düşer. Yumuşak yol verici ve frekans konvertörü diğer seçeneklerdir.",
"birim": "B2"
},
{
"q": "Pano içinde akımı cihazlara dağıtan bakır iletken çubuğa ne denir?",
"opts": [
"Bara",
"Sigorta",
"Klemens",
"Kontaktör"
],
"ans": 0,
"ex": "Bara (busbar) kesiti üretici/standart bara akım tablosuna göre seçilir; kısa devre kuvvetlerine göre mesnetlenir.",
"birim": "B2"
},
{
"q": "Osiloskop ekranındaki sinüs dalgasından doğrudan okunan değer hangisidir?",
"opts": [
"Etkin (RMS) değer",
"Direnç",
"Ortalama güç",
"Tepe ve tepe-tepe değer"
],
"ans": 3,
"ex": "Osiloskop gerilimin zamana göre değişimini çizer; ekrandan tepe ve tepe-tepe değer okunur, sinüste RMS = Vtepe / √2 ile hesaplanır. Dijital osiloskoplar RMS'i ayrıca hesaplayabilir.",
"birim": "B2"
},
{
"q": "Adi anahtarlı bir lamba devresinde anahtar hangi iletkeni kesmelidir?",
"opts": [
"Faz",
"Nötr",
"PE",
"Faz ve PE"
],
"ans": 0,
"ex": "Faz anahtardan geçer; nötr ve PE doğrudan lambaya gider. Böylece anahtar açıkken duyda ve armatür içinde gerilim kalmaz.",
"birim": "B2"
},
{
"q": "Nötrü anahtarlanmış bir lamba devresinde anahtar açıkken (lamba sönük) duyun durumu nedir?",
"opts": [
"Tamamen gerilimsizdir",
"Lamba yarım parlaklıkta yanar",
"RCD'yi sürekli attırır",
"Faz altında kalır"
],
"ans": 3,
"ex": "Lamba söner ama duy ve armatür faz altındadır ('sönük ama canlı'); ampul değiştiren kişi çarpılabilir. Polarite testiyle yakalanır.",
"birim": "B2"
},
{
"q": "E27 vidalı duyda faz (dönüş teli) hangi kontağa bağlanır?",
"opts": [
"Orta (dip) kontağa",
"Vida gövdesine",
"Armatür gövdesine",
"Toprak klemensine"
],
"ans": 0,
"ex": "Faz orta (dip) kontağa, nötr vida gövdesine bağlanır; ampul takılırken parmağın değebileceği vida kısmı nötrde kalır.",
"birim": "B2"
},
{
"q": "Yeni tesiste adi anahtara buattan kaç aktif iletken (PE hariç) gider?",
"opts": [
"1",
"2",
"3",
"4"
],
"ans": 1,
"ex": "Anahtara yalnız faz (L) ve dönüş (L') gider. Metal kasa veya kapak varsa PE de getirilir; sonradan sensör takılabilmesi için nötr getirmek iyi alışkanlıktır.",
"birim": "B2"
},
{
"q": "Vavien devresinde iki vavien anahtar arasına çekilen iletkenlere ne denir?",
"opts": [
"Dönüş teli",
"Kumanda teli",
"PEN iletkeni",
"Gezgin (köprü) tel"
],
"ans": 3,
"ex": "Faz V1'in ortak ucuna girer, V1'in iki ucu iki gezgin telle V2'ye bağlanır, V2'nin ortak ucundan çıkan dönüş lambaya gider.",
"birim": "B2"
},
{
"q": "Vavien devresinde lamba yalnız bazı anahtar kombinasyonlarında yanıyorsa en olası hata nedir?",
"opts": [
"Ortak uç (COM) karıştırılmıştır",
"Lamba duyu temassızdır",
"Nötr iletkeni kopuktur",
"Otomat değeri küçük seçilmiştir"
],
"ans": 0,
"ex": "Ortak uç işaretliyse ('L', 'COM', 'P') ona göre bağlanır; işaret yoksa gerilimsizken süreklilik cihazıyla, iki konumda da bir uca bağlı kalan uç bulunur.",
"birim": "B2"
},
{
"q": "Ara (kron) anahtara kaç iletken bağlanır?",
"opts": [
"2",
"3",
"4",
"5"
],
"ans": 2,
"ex": "Ara anahtar dört uçludur: gelen iki gezgin ve giden iki gezgin. Gelen çift bir tarafa, giden çift diğer tarafa bağlanır; karışırsa zincir bazı kombinasyonlarda kopar.",
"birim": "B2"
},
{
"q": "Merdiven otomatına bağlı birden çok buton birbirine nasıl bağlanır?",
"opts": [
"Seri",
"Üçgen",
"Yıldız",
"Paralel"
],
"ans": 3,
"ex": "Butonlar lamba akımını taşımaz, yalnız kumanda sinyali verir; hepsi paralel bağlanır. Buton hattı genellikle iki iletkendir.",
"birim": "B2"
},
{
"q": "Merdiven otomatının lambaları sürekli yakmasına veya süreyi sürekli yenilemesine yol açabilen eleman hangisidir?",
"opts": [
"Işıklı buton",
"Topraklı priz",
"Kalın kesitli linye",
"B eğrili otomat"
],
"ans": 0,
"ex": "Işıklı butonlar basılı değilken de küçük akım geçirir; bazı otomatlar bunu basış sanır. Desteklenen ışıklı buton sayısı ve bağlantı şekli katalogdan kontrol edilir.",
"birim": "B2"
},
{
"q": "Dimmer (ışık ayarlayıcı) devreye nasıl bağlanır?",
"opts": [
"Faz üzerinde, lambaya seri",
"Nötr üzerinde, lambaya paralel",
"Faz ile PE arasına",
"Faz ile nötr arasına, paralel"
],
"ans": 0,
"ex": "Dimmer anahtarın yerine takılır, faz üzerinde lambaya seri bağlanır; her yarım periyodun bir kısmını keserek etkin gücü azaltır.",
"birim": "B2"
},
{
"q": "LED lambayı dimmerle kısmak için hangi iki şart birlikte aranır?",
"opts": [
"Lamba kısılabilir, dimmer LED uyumlu",
"Lamba 12 V, dimmer faz başı kesmeli",
"Lamba topraklı, dimmer 1000 W",
"Lamba E14, dimmer sensörlü"
],
"ans": 0,
"ex": "Lamba veya sürücü 'dimmable' olmalı, dimmer LED uyumlu olmalı ve minimum yük değeri sağlanmalıdır; aksi hâlde titreme, vızıltı veya tam sönmeme görülür.",
"birim": "B2"
},
{
"q": "Üç telli hareket sensörünün (PIR) kasasına hangi iletkenin getirilmesi gerekir?",
"opts": [
"Yalnız faz",
"PEN",
"İkinci bir faz",
"Nötr"
],
"ans": 3,
"ex": "Sensör kendi elektroniği için nötr ister: bağlantı L, N ve lamba çıkışı (L'). Nötrsüz iki telli tiplerde genellikle minimum yük şartı vardır.",
"birim": "B2"
},
{
"q": "Trifaze tesisatta L2 fazının renk kodu hangisidir?",
"opts": [
"Siyah",
"Kahverengi",
"Gri",
"Açık mavi"
],
"ans": 0,
"ex": "L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı (TS HD 60364-5-51, TS EN 60445).",
"birim": "B2"
},
{
"q": "Anahtar hattında mavi damar dönüş teli olarak kullanıldıysa ne yapılmalıdır?",
"opts": [
"İşaretlemeye gerek yoktur",
"Yalnız buattaki ucu bantlanır",
"Ucu PE barasına bağlanır",
"İki ucu faz rengiyle işaretlenir"
],
"ans": 3,
"ex": "Mavi nötr içindir; başka amaçla kullanılırsa iki ucu da faz rengi bant veya makaronla işaretlenir. Aksi hâlde sonraki usta onu nötr sanır.",
"birim": "B2"
},
{
"q": "Yeşil-sarı damar yalnız hangi amaçla kullanılabilir?",
"opts": [
"Koruma iletkeni (PE)",
"Anahtar dönüş teli",
"Nötr iletkeni (N)",
"Vavien gezgin teli"
],
"ans": 0,
"ex": "Yeşil-sarı yalnız PE (ve uçları mavi işaretli PEN) içindir; hiçbir koşulda faz, dönüş veya nötr olarak kullanılmaz.",
"birim": "B2"
},
{
"q": "İç tesisatta iletken eki nerede yapılabilir?",
"opts": [
"Boru içinde",
"Sıva içinde, bantlanarak",
"Buatta veya cihaz kutusunda",
"Asma tavan üstünde, açıkta"
],
"ans": 2,
"ex": "Ek yalnız buatta, kasada veya cihaz klemensinde yapılır; buat kapağı sonradan erişilebilir kalır. Burma ve bantlanan ek kalıcı tesisatta kabul görmez.",
"birim": "B2"
},
{
"q": "Buatta farklı linyelerin nötrlerini birleştirmenin sonucu hangisidir?",
"opts": [
"Gerilim düşümü azalır",
"Linye akımı yarıya iner",
"Faz dengesi iyileşir",
"RCD'ler sebepsiz açar"
],
"ans": 3,
"ex": "Nötr akımı başka RCD'nin toroidinden döner, iki RCD de fark görür. Ayrıca bir linyenin otomatı kapatılsa bile diğer linyenin akımı ortak nötrden dönmeye devam eder.",
"birim": "B2"
},
{
"q": "İnce çok telli (NYAF / H07V-K) iletken vidalı klemense nasıl bağlanır?",
"opts": [
"Doğrudan sıkılarak",
"Lehimle kalaylanarak",
"Uygun kesitte yüksükle",
"Ucu katlanarak"
],
"ans": 2,
"ex": "Yüksük kesiti iletken kesitine, metal boyu klemens soyma boyuna eşit seçilir ve yüksük pensesiyle sıkılır. Kalaylı uç zamanla akar, bağlantı gevşer.",
"birim": "B2"
},
{
"q": "Kablo soyarken bıçakla iletken çevresinde dairesel kesme (yüzük atma) neden yapılmaz?",
"opts": [
"Bakırda çentik açıp kırılmaya yol açar",
"Yalıtımın rengini ve baskısını bozar",
"Soyma boyunu gereğinden uzatır",
"Klemensin sıkma torkunu artırır"
],
"ans": 0,
"ex": "Çentik kesiti küçültür ve gerilme yığılması yaratır; iletken titreşim veya bükülmede oradan kırılır. Kesite ayarlı kablo sıyırıcı kullanılır.",
"birim": "B2"
},
{
"q": "Modüler sigorta klemensinin sıkma değeri nasıl belirlenir?",
"opts": [
"Ustanın el ayarına göre",
"Her zaman 10 Nm ile",
"Vida dönmeyene kadar",
"Üretici tork değerine göre"
],
"ans": 3,
"ex": "Değer cihaz etiketinde veya katalogda Nm olarak yazar (modüler cihazlarda tipik 2–3,5 Nm); tork tornavidasıyla uygulanır.",
"birim": "B2"
},
{
"q": "Bağlantı sonrası her iletkenin elle sertçe çekilerek kontrol edilmesine ne denir?",
"opts": [
"Çekme (yank) testi",
"Süreklilik testi",
"Polarite testi",
"Yalıtım testi"
],
"ans": 0,
"ex": "Oynayan iletken yeniden bağlanır. Birkaç saniyelik bu test gevşek bağlantıların çoğunu enerji verilmeden yakalar.",
"birim": "B2"
},
{
"q": "Aynı akımı taşıyan üç faz klemensinden biri diğerlerinden yaklaşık 17 °C daha sıcak ölçülüyor. Yaygın değerlendirmeye göre karar nedir?",
"opts": [
"Normal, izlenir",
"Planlı onarım",
"Acil onarım",
"Yük artırılıp tekrar bakılır"
],
"ans": 2,
"ex": "Benzer yükteki benzer elemanlar arası ΔT: 1–3 °C izle, ~4–15 °C planlı onarım, 15 °C'den fazla acil onarım. Isı akımın karesiyle artar; tam yükte fark daha da büyür.",
"birim": "B2"
},
{
"q": "230/400 V tesisatta yalıtım direnci hangi test gerilimiyle ölçülür ve en az kaç olmalıdır?",
"opts": [
"250 V DC – 0,5 MΩ",
"500 V DC – 1 MΩ",
"1000 V AC – 10 MΩ",
"500 V AC – 0,25 MΩ"
],
"ans": 1,
"ex": "TS HD 60364-6: 500 V'a kadar devrelerde 500 V DC, en az 1 MΩ; SELV/PELV'de 250 V DC, 0,5 MΩ. Sağlam tesisatta tipik değer yüzlerce MΩ'dur.",
"birim": "B2"
},
{
"q": "Yalıtım direnci ölçümünden önce ne yapılmalıdır?",
"opts": [
"Elektronik cihazlar devreden ayrılır",
"RCD test butonuna birkaç kez basılır",
"Nötr iletkeni PE barasına köprülenir",
"Tüm armatürlere ampul takılır"
],
"ans": 0,
"ex": "Dimmer, sensör, merdiven otomatı, LED sürücü, SPD gibi elektronikler ayrılmazsa hem zarar görür hem ölçüm düşük çıkar. Devre enerjisiz ve gerilim yokluğu doğrulanmış olmalıdır.",
"birim": "B2"
},
{
"q": "Devreye almada aşağıdaki testlerden hangisi enerji verilmeden YAPILAMAZ?",
"opts": [
"PE sürekliliği",
"Yalıtım direnci",
"Polarite (süreklilikle)",
"RCD açma süresi"
],
"ans": 3,
"ex": "Gerilimsiz: gözle kontrol, PE sürekliliği, yalıtım direnci, polarite. Enerjili: döngü empedansı (Zs), RCD testi, fonksiyon ve faz sırası.",
"birim": "B2"
},
{
"q": "Genel tip 30 mA RCD, 1 × IΔn test akımında en geç ne kadar sürede açmalıdır?",
"opts": [
"40 ms",
"130 ms",
"300 ms",
"500 ms"
],
"ans": 2,
"ex": "Genel tip RCD: ½·IΔn'de açmamalı, 1·IΔn'de en geç 300 ms, 5·IΔn'de en geç 40 ms içinde açmalı.",
"birim": "B2"
},
{
"q": "Genel tip 30 mA RCD, 5 × IΔn (150 mA) test akımında en geç ne kadar sürede açmalıdır?",
"opts": [
"10 ms",
"40 ms",
"300 ms",
"1 s"
],
"ans": 1,
"ex": "5·IΔn'de en geç 40 ms. Örnek sağlam RCD: 15 mA'de açmadı, 30 mA'de 24 ms, 150 mA'de 12 ms.",
"birim": "B2"
},
{
"q": "RCD test cihazıyla ½ × IΔn (30 mA'lik rölede 15 mA) uygulandığında beklenen sonuç nedir?",
"opts": [
"300 ms içinde açmalı",
"Anında açmalı",
"40 ms içinde açmalı",
"Açmamalı"
],
"ans": 3,
"ex": "RCD 0,5·IΔn'nin altında açmamalı, IΔn'de mutlaka açmalıdır; 30 mA'lik röle 15–30 mA arasında açar.",
"birim": "B2"
},
{
"q": "RCD üzerindeki test (T) butonu neyi doğrular?",
"opts": [
"Açma süresini",
"Açma akımını",
"Mekanizmanın çalıştığını",
"Topraklama direncini"
],
"ans": 2,
"ex": "Test butonu yalnız mekanizmayı dener, düzenli basılmalıdır; açma akımı ve süresi RCD test cihazıyla ölçülür.",
"birim": "B2"
},
{
"q": "RCD hangi durumda kişiyi KORUMAZ?",
"opts": [
"Faz ile nötre aynı anda dokunmada",
"Faz ile toprağa dokunmada",
"Kaçaklı cihaz gövdesine dokunmada",
"Islak zeminde faza dokunmada"
],
"ans": 0,
"ex": "Akım fazdan girip nötrden döndüğü için giden-dönen farkı oluşmaz; RCD açmaz. Bu yüzden RCD enerjisiz çalışmanın yerini tutmaz.",
"birim": "B2"
},
{
"q": "RCD'den sonra bir buatta nötr ile PE iletkeni temas ederse ne olur?",
"opts": [
"RCD hiç açmaz",
"Otomat manyetik açar",
"Faz gerilimi yükselir",
"Yük açılınca RCD atar"
],
"ans": 3,
"ex": "Nötr akımının bir kısmı PE'den, toroidin dışından döner; fark oluşur ve yük çalışınca RCD atar. N-PE arası 500 V DC yalıtım ölçümüyle, hat bölünerek bulunur.",
"birim": "B2"
},
{
"q": "Sürekli atan 30 mA'lik bir RCD için doğru yaklaşım hangisidir?",
"opts": [
"RCD'yi köprüleyip devam etmek",
"300 mA'lik RCD ile değiştirmek",
"Nedenini ölçerek bulup gidermek",
"Devreyi RCD'nin önüne almak"
],
"ans": 2,
"ex": "Köprülemek veya 300 mA'e çıkmak insan korumasını tamamen kaldırır. N-PE teması, ortak nötr, nem veya toplam sızıntı ölçülerek bulunur; gerekirse devreler iki RCD'ye bölünür.",
"birim": "B2"
},
{
"q": "U0 = 230 V olan TN sistemde B16 otomatın anlık açması için izin verilen en büyük döngü empedansı (Zs) yaklaşık kaçtır?",
"opts": [
"1,44 Ω",
"2,87 Ω",
"4,60 Ω",
"14,4 Ω"
],
"ans": 1,
"ex": "B16 en geç 5 × 16 = 80 A'de anlık açar: Zs ≤ U0 / Ia = 230 / 80 ≈ 2,87 Ω. C16 için Ia = 160 A → Zs ≤ 1,44 Ω.",
"birim": "B2"
},
{
"q": "TN sistemde ölçülen Zs değeri neden hesaplanan sınırın yaklaşık 2/3'ü ile karşılaştırılır?",
"opts": [
"Arızada iletken ısınıp direnci artar",
"Ölçü aletinin sınıf hatası büyüktür",
"Ölçümde RCD'nin açması önlenir",
"Arızada şebeke frekansı değişir"
],
"ans": 0,
"ex": "Ölçüm soğuk iletkenle ve küçük test akımıyla yapılır; arızada iletken ısınır, direnç (PVC'de ~%20) artar. Bu yüzden ölçülen değer sınırın belirgin altında olmalıdır.",
"birim": "B2"
},
{
"q": "TT sistemde 300 mA RCD ile koruma için topraklama direnci RA'nın teorik üst sınırı yaklaşık kaçtır?",
"opts": [
"1,67 Ω",
"16,7 Ω",
"167 Ω",
"1667 Ω"
],
"ans": 2,
"ex": "RA × IΔn ≤ 50 V → RA ≤ 50 / 0,3 ≈ 167 Ω (30 mA için ≈ 1667 Ω). Toprak direnci mevsime göre arttığından uygulamada çok daha düşük değer hedeflenir.",
"birim": "B2"
},
{
"q": "TT sistemde RCD'nin pratikte zorunlu olmasının nedeni nedir?",
"opts": [
"Arıza akımı küçük kalır, otomat açmaz",
"Nötr iletkeni hiç kullanılmaz",
"PE iletkeni daha kalın çekilir",
"Kısa devre akımı çok büyük olur"
],
"ans": 0,
"ex": "Arıza akımı RA ve RB üzerinden toprakta döner; ör. 230 / (30 + 5) ≈ 6,6 A. C16'nın anlık açması için 160 A gerekir; gövde gerilimi ≈ 197 V kalıcı olur. 30 mA RCD milisaniyeler içinde açar.",
"birim": "B2"
},
{
"q": "Üç uçlu topraklama direnci ölçümünde gerilim sondası, E–C mesafesinin yaklaşık yüzde kaçına konur?",
"opts": [
"%25",
"%50",
"%62",
"%90"
],
"ans": 2,
"ex": "Sonda %62'ye konur, sonra %52 ve %72'ye kaydırılır; üç sonuç yakınsa ölçüm geçerlidir. Ölçülen elektrot önce ayırma klemensiyle diğer topraklamalardan ayrılır.",
"birim": "B2"
},
{
"q": "Paralel çakılan topraklama kazıkları arasındaki mesafe en az ne olmalıdır?",
"opts": [
"Kazık boyunun yarısı",
"Kazık boyu kadar",
"Kazık boyunun iki katı",
"Sabit 0,5 m"
],
"ans": 2,
"ex": "Yakın kazıkların etki alanları örtüşür, paralel kazanç azalır. Aralık en az kazık boyunun iki katı tutulur (2 m kazık için 4 m).",
"birim": "B2"
},
{
"q": "Özgül direnci 100 Ω·m olan toprakta 2 m'lik tek kazığın yaklaşık direnci (R ≈ ρ / L) kaç ohmdur?",
"opts": [
"20 Ω",
"50 Ω",
"100 Ω",
"200 Ω"
],
"ans": 1,
"ex": "R ≈ 100 / 2 = 50 Ω. Aynı toprakta 20 m şerit: R ≈ 2ρ / L = 10 Ω. Hesap yaklaşıktır; değer mutlaka ölçülür.",
"birim": "B2"
},
{
"q": "Yeni binalarda en çok tercih edilen, sonradan yapılamayan topraklayıcı tipi hangisidir?",
"opts": [
"Kazık topraklayıcı",
"Şerit topraklayıcı",
"Temel topraklayıcısı",
"Levha topraklayıcı"
],
"ans": 2,
"ex": "Temel betonunun içine kapalı halka olarak döşenir; beton nemi tuttuğu için direnç düşük ve kararlıdır, iletken korozyondan korunur. İnşaat sırasında döşenmelidir.",
"birim": "B2"
},
{
"q": "Binaya giren su ve doğalgaz borularının topraklamadaki yeri nedir?",
"opts": [
"Topraklayıcı elektrot olarak kullanılır",
"PEN iletkeni olarak kullanılır",
"Hiçbir şekilde bağlanmaz",
"Yalnız eşpotansiyel bağlantıya alınır"
],
"ans": 3,
"ex": "Borular topraklayıcı olarak kullanılmaz; bina girişinde ana topraklama barasına eşpotansiyel bağlantıyla bağlanır.",
"birim": "B2"
},
{
"q": "TN-C-S sistemde PEN iletkeni N ve PE'ye ayrıldıktan sonra için doğru ifade hangisidir?",
"opts": [
"İhtiyaca göre tekrar birleştirilebilir",
"N ile PE bir daha birleştirilmez",
"Ayrılan PE sigortalanır",
"Ayrılan N topraklanır"
],
"ans": 1,
"ex": "PEN genellikle bina ana panosunda bir kez ayrılır ve bina topraklamasına bağlanır; ayırma noktasından sonra N ve PE bir daha birleştirilmez. PEN kesilmez, sigortalanmaz.",
"birim": "B2"
},
{
"q": "Sabit tesiste PEN iletkeni en az kaç mm² bakır olmalıdır?",
"opts": [
"2,5 mm²",
"6 mm²",
"10 mm²",
"16 mm²"
],
"ans": 2,
"ex": "PEN sabit tesiste en az 10 mm² bakır (16 mm² alüminyum) olur. TN-C'de PEN koparsa kopma noktasından sonraki gövdeler faz potansiyeline çıkabilir.",
"birim": "B2"
},
{
"q": "Pens ampermetrede faz ve nötr birlikte kavranırsa sağlam bir devrede ne okunur?",
"opts": [
"Faz akımının iki katı",
"Yaklaşık 0 A",
"Faz akımının yarısı",
"Hat gerilimi"
],
"ans": 1,
"ex": "Gidiş ve dönüş akımlarının manyetik alanları birbirini götürür. Kaçak akım pensiyle L+N birlikte kavrandığında okunan mA değeri kaçak akımdır.",
"birim": "B2"
},
{
"q": "Daire dağıtım panosunda ölçüm yapacak ölçü aletinin en az hangi ölçüm kategorisinde olması gerekir?",
"opts": [
"CAT I",
"CAT II",
"CAT III",
"CAT 5e"
],
"ans": 2,
"ex": "CAT III bina içi sabit tesisat (pano, bara, linye), CAT IV kaynak tarafı (sayaç, bina girişi), CAT II priz devreleridir. Alet ile probun düşük olan kategorisi esas alınır. CAT 5e bir ağ kablosu kategorisidir.",
"birim": "B2"
},
{
"q": "Üç fazlı asenkron motor ters dönüyorsa nasıl düzeltilir?",
"opts": [
"Nötr ile bir faz değiştirilir",
"Herhangi iki faz yer değiştirilir",
"PE bağlantısı sökülür",
"Üç faz sırayla kaydırılır"
],
"ans": 1,
"ex": "İki fazın yeri değiştirilince döner alanın yönü ters döner. Üç fazı döngüsel kaydırmak (L1→L2→L3→L1) sırayı değiştirmez; nötr ve PE'ye dokunulmaz.",
"birim": "B2"
},
{
"q": "Alüminyum iletken bakır baraya bağlanırken ne kullanılır?",
"opts": [
"Bakır pabuç",
"Bimetal (Al-Cu) pabuç",
"Alüminyum pabuç, doğrudan",
"Lehimli bakır yüksük"
],
"ans": 1,
"ex": "Bimetal pabucun gövdesi alüminyum, paleti bakırdır; Al-Cu teması nem girmeyen kaynak bölgesinde kalır. Oksit önleyici macun ve yaylı pul kullanılır.",
"birim": "B2"
},
{
"q": "NYM (antigron) kablo için hangisi YANLIŞ bir uygulamadır?",
"opts": [
"Sıva altı döşemek",
"Nemli iç mekânda kullanmak",
"Doğrudan toprağa gömmek",
"Sıva üstü kelepçelemek"
],
"ans": 2,
"ex": "NYM iç mekân tesisat kablosudur; doğrudan toprak altında ve güneş altında açıkta kullanılmaz. Toprak altı için NYY veya uygun kablo seçilir.",
"birim": "B2"
},
{
"q": "NYY kablo toprak altında tipik olarak hangi derinliğe döşenir?",
"opts": [
"10–20 cm",
"30–40 cm",
"60–80 cm",
"150–200 cm"
],
"ans": 2,
"ex": "NYY genellikle 60–80 cm derinliğe, kum yatak üzerine döşenir ve üzerine ikaz bandı konur; taşlı güzergâhta koruyucu boru veya zırhlı kablo gerekir.",
"birim": "B2"
},
{
"q": "Priz linyesinde PE iletkeninin buatta klemensle dağıtılmasının faydası nedir?",
"opts": [
"PE kesitinin küçülmesine olanak verir",
"RCD'nin açma hassasiyetini artırır",
"Priz sökülünce diğerlerinin PE'si kopmaz",
"Linyedeki gerilim düşümünü azaltır"
],
"ans": 2,
"ex": "PE buatta klemensle dağıtılırsa bir priz sökülse de diğer prizlerin PE sürekliliği korunur. PE asla anahtarlanmaz ve sigortalanmaz.",
"birim": "B2"
},
{
"q": "Polarite testinde ne kontrol edilir?",
"opts": [
"RCD'nin açma süresi",
"Tek kutuplu cihazların fazı kestiği",
"Topraklama elektrodunun direnci",
"İletkenler arası yalıtım direnci"
],
"ans": 1,
"ex": "Polarite testinde tek kutuplu anahtar ve otomatların fazı kestiği, duy orta kontağına fazın geldiği, prizlerde L-N-PE'nin doğru klemenste olduğu kontrol edilir.",
"birim": "B2"
},
{
"q": "Koruma iletkeni (PE) sürekliliği testi ne zaman yapılır?",
"opts": [
"Enerji verildikten sonra",
"Enerji vermeden önce",
"Yalnız periyodik kontrolde",
"RCD testinden sonra"
],
"ans": 1,
"ex": "Gerilimsiz testlerdendir: tablo PE barasından her prizin toprak kontağına ve her metal armatür gövdesine düşük dirençli yol olmalıdır.",
"birim": "B2"
},
{
"q": "Trifaze beslenen bir binada ortak (kolon) nötr koparsa az yüklü fazdaki cihazlar ne görür?",
"opts": [
"Sıfıra yakın gerilim",
"230 V'un çok üstünde gerilim",
"Değişmeden tam 230 V gerilim",
"Yarım dalga DC gerilim"
],
"ans": 1,
"ex": "Fazlara dağılmış yükler seri hâle gelir; az yüklü fazda gerilim 300 V'u, hatta 400 V'a yakın değerleri bulabilir, elektronik cihazlar yanar. Gerilim koruma rölesi bu nedenle kullanılır.",
"birim": "B2"
},
{
"q": "Topraklı prizde koruma iletkeni (PE) nereye bağlanır?",
"opts": [
"Yuvalardan birinin klemensine",
"Toprak (yan yaylı) kontaklarına",
"Nötr klemensine köprüyle",
"Priz kasasının montaj vidasına"
],
"ans": 1,
"ex": "Faz ve nötr iki yuvanın klemenslerine, PE ise topraklı fişin yan kontaklarına oturan toprak kontaklarına bağlanır.",
"birim": "B2"
},
{
"q": "Diazed (buşonlu) sigortada ayar (pas) vidasının görevi nedir?",
"opts": [
"Buşonun ısınmasını dengeler",
"Kısa devre akımını ölçer",
"Büyük amperli buşon takılmasını önler",
"Gösterge pastilini yerinde tutar"
],
"ans": 2,
"ex": "Her akım değerinin buşon pimi farklı çaptadır; 16 A ayar vidasına 25 A buşon oturmaz. Ayar vidasını sökmek kablo korumasını devre dışı bırakır, yasaktır.",
"birim": "B2"
},
{
"q": "Bir linye otomatı, kaldırılır kaldırılmaz tekrar atıyorsa en olası neden hangisidir?",
"opts": [
"Sürekli aşırı yük",
"Kısa devre veya kaçak",
"Düşük şebeke gerilimi",
"Faz sırası hatası"
],
"ans": 1,
"ex": "Hemen atma kısa devre veya kaçağa, bir süre çalıştıktan sonra atma aşırı yüke işaret eder. Hat ayrılıp 500 V DC ile yalıtım ölçülür, buattan bölünerek arıza daraltılır.",
"birim": "B2"
},
{
"q": "Sık atan bir 2,5 mm² priz linyesinde B16 yerine 25 A otomat takmak neden yanlıştır?",
"opts": [
"Otomat daha sık açmaya başlar",
"Kablo aşırı yükte korumasız kalır",
"RCD'nin çalışmasını engeller",
"Hat gerilimini düşürür"
],
"ans": 1,
"ex": "Sigorta kabloyu korur: Ib ≤ In ≤ Iz. 2,5 mm²'nin kapasitesini aşan 25 A'de kablo ısınır ama otomat açmaz; yalıtım bozulur, buat ve priz erir, yangın riski doğar.",
"birim": "B2"
}
]
};
const GLOSSARY = [
 ["Ohm Yasası", "Gerilim, akım ve direnç arasındaki temel bağıntı: V = I × R. Buradan I = V / R ve R = V / I türetilir.", 1],
 ["Güç (P)", "Birim zamanda yapılan iş; P = V·I = I²·R = V²/R, birimi watt (W). AC'de aktif güç P = U·I·cosφ ile hesaplanır.", 1],
 ["Seri devre", "Elemanların uç uca bağlandığı devre: akım her elemanda aynı, gerilim dirençlerle orantılı bölünür. Bir eleman koparsa devre tümüyle kesilir.", 1],
 ["Paralel devre", "Elemanların aynı iki noktaya bağlandığı devre: gerilim her kolda aynı, akım kollara bölünür. Kollar birbirinden bağımsız çalışır; eşdeğer direnç en küçük koldan da küçüktür.", 1],
 ["Ampermetre", "Akım ölçen alet; iç direnci çok düşüktür ve devreye SERİ bağlanır. Paralel bağlanırsa kaynağı kısa devre eder.", 4],
 ["Voltmetre", "Gerilim ölçen alet; iç direnci çok yüksektir (dijitalde tipik 10 MΩ) ve devreye PARALEL bağlanır.", 4],
 ["Pens ampermetre", "Devreyi açmadan, iletkenin manyetik alanından akım ölçen alet. Çeneye tek iletken alınır; faz ve nötr birlikte kavranırsa sağlam devrede ≈ 0 A okunur.", 4],
 ["Mutlak hata", "Ölçülen değer ile gerçek değer arasındaki fark: ΔX = |X − Xg|; ölçülen büyüklüğün biriminde ifade edilir.", 13],
 ["Bağıl hata", "Mutlak hatanın gerçek değere oranı: ε = ΔX / Xg; ×100 ile yüzde olarak yazılır. Aynı mutlak hata küçük değerlerde daha büyük bağıl hata demektir.", 13],
 ["Endüktif reaktans (XL)", "Bobinin AC'ye gösterdiği karşı koyma: XL = 2πfL. Frekansla artar; DC'de (f = 0) sıfırdır, akımı yalnız sargının omik direnci sınırlar.", 14],
 ["Kapasitif reaktans (XC)", "Kondansatörün AC'ye gösterdiği karşı koyma: XC = 1/(2πfC). Frekans arttıkça azalır; DC'de sonsuzdur, kondansatör DC'yi geçirmez.", 14],
 ["NYA / NYAF / NYM / NYY", "NYA: tek damarlı tek telli, boru içinde; NYAF: tek damarlı ince çok telli (esnek), pano içi ve titreşimli uçlar; NYM (antigron): PVC kılıflı çok damarlı iç tesisat kablosu; NYY: 0,6/1 kV, toprak altı ve dış mekân kablosu.", 3],
 ["RJ45 T568B", "Ağ kablosu sonlandırma renk sırası: turuncu-beyaz, turuncu, yeşil-beyaz, mavi, mavi-beyaz, yeşil, kahverengi-beyaz, kahverengi. T568A'da turuncu ve yeşil çiftler yer değiştirir.", 2],
 ["Kesici (güç kesicisi)", "Yük ve kısa devre akımını ark söndürme düzeniyle güvenle kesip kapatabilen anahtarlama cihazı.", 7],
 ["Ayırıcı (seksiyoner)", "Devreyi gözle görülür şekilde ayıran cihaz; ark söndürme düzeni yoktur, yük altında açılmaz ve kapatılmaz.", 7],
 ["Istanka", "YG manevrasında ve geçici topraklama takımı takılırken kullanılan yalıtkan uzun çubuk; gerilim sınıfına uygun olmalı ve yalıtkan eldiven, halı ile birlikte kullanılır.", 7],
 ["Kontrol kalemi (neon)", "Vücut kapasitesi üzerinden fazı gösteren tornavida tipi kalem. Eldiven veya yalıtkan ayakkabıyla gerilim varken yanmayabilir; gerilim yokluğunun tek başına kanıtı sayılmaz.", 4],
 ["Kontaktör", "Küçük bir bobin akımıyla büyük yükleri uzaktan açıp kapatan elektromanyetik şalter. Bobin uçları A1-A2, ana kontaklar 1-2 / 3-4 / 5-6'dır.", 38],
 ["LDR (foto direnç)", "Işığa bağlı direnç: aydınlıkta direnci düşük, karanlıkta yüksektir. Fotosel (alacakaranlık) rölelerinin algılama elemanıdır.", 5],
 ["Kompanzasyon", "Endüktif yüklerin çektiği reaktif gücü paralel kondansatörlerle yerinde karşılayarak cosφ'yi yükseltme. Gerekli güç Qc = P·(tanφ1 − tanφ2).", 18],
 ["Güç faktörü (cosφ)", "Aktif gücün görünür güce oranı: cosφ = P / S. 1'e yaklaştıkça aynı iş için daha az akım çekilir, kayıplar ve reaktif ceza azalır.", 18],
 ["Görünür / aktif / reaktif güç", "S (VA, kVA) / P (W, kW) / Q (VAr, kVAr). Güç üçgeninde S² = P² + Q²; üç fazda S = √3·U·I.", 18],
 ["ATS (otomatik transfer şalteri)", "Şebeke kesildiğinde jeneratörü çalıştırıp yükü ona aktaran, şebeke dönünce gecikmeyle geri aktaran düzen; iki kaynak mekanik ve elektriksel kilitle asla birleştirilmez.", 20],
 ["UPS (kesintisiz güç kaynağı)", "Akü ve evirici ile kesintisiz besleme sağlayan cihaz; jeneratör devreye girene kadar kritik yükleri köprüler. Online (çift dönüşümlü) tipte geçiş süresi ≈ 0'dır.", 9],
 ["Parafudr (SPD)", "Yıldırım ve anahtarlama kaynaklı darbe aşırı gerilimini sınırlayıp toprağa akıtan koruma elemanı. Tip 1 ana girişte, Tip 2 dağıtım panolarında, Tip 3 cihaz yanında kullanılır.", 21],
 ["Topraklama direnci", "Topraklayıcı ile referans toprak arasındaki direnç. Hedef tesise göre değişir: TT'de RA × IΔn ≤ 50 V; yıldırım topraklamasında mümkünse 10 Ω'un altı. Üç uçlu yöntemle ölçülür.", 26],
 ["Faraday kafesi (ağ yöntemi)", "Düz ve geniş çatılarda yakalama iletkenlerinin koruma seviyesine göre belirlenen göz aralığında (ör. Seviye III'te 15 × 15 m) ağ olarak döşendiği dış yıldırım koruma yöntemi.", 21],
 ["ADP (Ana Dağıtım Panosu)", "Binanın enerjisinin trafodan veya sayaçtan alınıp tali panolara dağıtıldığı ana pano; bara, ana şalter, çıkış korumaları, SPD ve PE barasını içerir.", 19],
 ["Bara (busbar)", "Pano içinde akımı cihazlara dağıtan bakır (veya alüminyum) iletken çubuk; kesiti akım tablosuna göre seçilir, kısa devre kuvvetlerine göre mesnetlenir.", 19],
 ["IP koruma sınıfı", "TS EN 60529'a göre iki rakamlı kod: birinci rakam katı cisim ve toza, ikinci rakam suya karşı korumayı gösterir (ör. IP65: toz geçirmez, su jetine dayanıklı).", 22],
 ["Alternatör", "Jeneratör grubunda mekanik enerjiyi elektrik enerjisine çeviren makine. Devir n = 120·f / p; 4 kutuplu alternatör 50 Hz için 1500 d/dk döner.", 20],
 ["Oksit önleyici kontak macunu", "Temas yüzeyini hava ve nemden ayırarak oksitlenmeyi ve galvanik korozyonu önleyen macun; özellikle alüminyum ve Al-Cu bağlantılarında kullanılır.", 16],
 ["Damla halkası", "Dış mekânda kablonun kutuya girmeden önce aşağı sarkıtılarak oluşturduğu kavis; su en alt noktadan damlar, bağlantıya ulaşmaz. Girişler kutunun altından yapılır.", 16],
 ["Çekme (yank) testi", "Bağlantı veya krimpten sonra her iletkenin elle sertçe çekilerek sağlamlığının kontrolü; oynayan iletken yeniden bağlanır.", 16],
 ["Periyot / frekans", "Periyot (T) bir saykılın süresidir; frekans birim zamandaki saykıl sayısıdır: f = 1/T (Hz). 50 Hz şebekede T = 20 ms.", 11],
 ["RMS (etkin değer)", "AC'nin aynı ısıyı üreten DC eşdeğeri; sinüste Vrms = Vtepe / √2 ≈ 0,707·Vtepe. Şebekenin 230 V değeri RMS'tir (tepe ≈ 325 V).", 11],
 ["Clash detection (çakışma tespiti)", "BIM (yapı bilgi modeli) üzerinde farklı disiplinlerin elemanlarının aynı hacme yerleşmesini yazılımla bulma; çakışma sahaya çıkmadan çözülür.", 23],
 ["Gerilim (V)", "İki nokta arasındaki potansiyel farkı; yükleri iten 'basınç'. Birimi volt (V).", 36],
 ["Akım (A)", "Birim zamanda bir kesitten geçen elektrik yükü miktarı. Birimi amper (A).", 36],
 ["Direnç (Ω)", "Malzemenin akıma karşı koyması; birimi ohm (Ω). İletkende R = ρ·L / S.", 36],
 ["Enerji (kWh)", "Güç ile sürenin çarpımı; faturada ölçülen büyüklüktür. 2 kW'lık cihaz 3 saatte 6 kWh tüketir.", 36],
 ["Özdirenç (ρ)", "Malzemenin 1 m boyunda 1 mm² kesitli iletkeninin direnci (Ω·mm²/m). Bakır ≈ 0,0178, alüminyum ≈ 0,028; alüminyumun özdirenci bakırın yaklaşık 1,6 katıdır.", 1],
 ["İletkenlik (k)", "Özdirencin tersi, m/(Ω·mm²). Gerilim düşümü hesabında bakır için k ≈ 56, alüminyum için k ≈ 35 alınır.", 1],
 ["Kirchhoff Akımlar Yasası (KAY)", "Bir düğüme giren akımların toplamı çıkan akımların toplamına eşittir.", 1],
 ["Kirchhoff Gerilimler Yasası (KGY)", "Kapalı bir çevrede kaynak gerilimlerinin toplamı, elemanlardaki gerilim düşümlerinin toplamına eşittir.", 1],
 ["Joule etkisi", "Akımın dirençte ısı üretmesi: P = I²·R. Gevşek bir klemensin küçük temas direnci de bu yüzden ısınır; akım iki katına çıkınca ısı dört katına çıkar.", 1],
 ["Kısa devre", "Faz-nötr, faz-faz veya faz-toprak arasında yüksüz doğrudan temas; akım anma değerinin onlarca-yüzlerce katına çıkar, koruma anlık (manyetik) açmalıdır.", 27],
 ["Aşırı yük", "Sağlam devrede akımın anma değerinin biraz üstüne çıkması; kablo yavaş ısınır, koruma termik bölgede dakikalar mertebesinde açar.", 27],
 ["Temas direnci", "İki iletkenin birleşim noktasındaki direnç; gevşek, oksitli veya yanlış yapılmış ekte artar ve I²R ile ısı üretir.", 2],
 ["Krimp", "Pabuç veya yüksüğün uygun kalıplı pense ile iletken üzerine sıkılarak soğuk bağlantı yapılması; kalıp pabuç kesitiyle aynı olmalıdır.", 16],
 ["Kablo pabucu", "Kalın iletkenin civatalı bağlantısı için ucuna sıkılan bağlantı elemanı; kesiti iletkene, deliği civataya uymalıdır ('50-8' = 50 mm², M8).", 16],
 ["Bimetal (Al-Cu) pabuç", "Gövdesi alüminyum, paleti bakır olan, iki metalin fabrikada kaynatıldığı pabuç; alüminyum iletkeni bakır baraya korozyonsuz bağlamak için kullanılır.", 16],
 ["Kablo yüksüğü", "İnce çok telli iletkenin tellerini metal tüpte toplayarak klemense düzgün yüzey sunan eleman; kesiti iletken kesitine, boyu soyma boyuna eşit seçilir.", 16],
 ["İkiz yüksük", "Bir klemense iki iletken girecekse ikisini tek tüpte birleştiren yüksük; iki ayrı yüksük üst üste sokulmaz.", 16],
 ["Kafesli (asansör tipi) klemens", "Vidanın iletkene doğrudan basmadığı, çelik kafesi çekerek iletkeni baraya sıkıştırdığı klemens; modüler sigorta ve RCD'lerin çoğu bu tiptir.", 16],
 ["Yaylı klemens", "Baskıyı vida yerine paslanmaz çelik yayın verdiği klemens; tork gerekmez, titreşim ve ısıl döngüde baskı korunur.", 16],
 ["Sıkma torku", "Vidalı bağlantıya uygulanması gereken döndürme momenti (Nm); üreticinin değeri tork tornavidası veya anahtarıyla uygulanır.", 16],
 ["Yüzük atma", "Kablo yalıtımını bıçakla iletken çevresinde dairesel keserek soyma; bakırda çentik bırakıp kırılmaya yol açtığı için yapılmaz.", 16],
 ["İletken sınıfı", "TS EN 60228'e göre iletken yapısı: Sınıf 1 tek telli, Sınıf 2 çok telli sert, Sınıf 5-6 ince çok telli (esnek). Titreşimli yerde esnek iletken zorunludur.", 16],
 ["Galvanik korozyon", "Farklı metaller nem varlığında temas edince daha az soy olan metalin (ör. alüminyum, çinko) aşınması; temas direnci artar, bağlantı ısınır.", 16],
 ["Sünme (soğuk akma)", "Özellikle alüminyumun sürekli baskı altında yavaşça şekil değiştirmesi; vida baskısı zamanla azalır, yaylı pul ve periyodik tork kontrolü gerekir.", 16],
 ["Sıcak nokta (ΔT)", "Termal kamerada, aynı akımı taşıyan benzer noktalara göre fazla ısınan bağlantı. Yaygın değerlendirme: 1–3 °C izle, ~4–15 °C planlı onarım, 15 °C üstü acil.", 16],
 ["Termal kamera", "Yüzeyin yaydığı kızılötesi ışınımı ölçerek sıcaklık haritası çıkaran cihaz; tarama devre yüklüyken yapılır, parlak metalde yayınım ayarına dikkat edilir.", 16],
 ["İletken renk kodu", "L1 kahverengi, L2 siyah, L3 gri, N açık mavi, PE yeşil-sarı; PEN yeşil-sarı + uçlarda mavi işaret. Renk bilgi verir, ölçümün yerine geçmez.", 16],
 ["Hedef işaretleme", "Pano içinde her damar ucuna karşı ucun bağlandığı cihaz ve klemensin yazılması (ör. -K1:A1 ucunda '-X1:5').", 16],
 ["Çift bükümlü kablo (UTP)", "Parazite karşı çiftleri birbirine bükülmüş zayıf akım (ağ) kablosu; U/UTP ekransız, F/UTP ve S/FTP ekranlı tiplerdir.", 2],
 ["PoE", "Power over Ethernet: ağ kablosu üzerinden veriyle birlikte cihaza (kamera, erişim noktası) besleme verilmesi.", 2],
 ["Akım taşıma kapasitesi (Iz)", "Kablonun yalıtımını izin verilen sıcaklığın (PVC 70 °C, XLPE 90 °C) üstüne çıkarmadan sürekli taşıyabildiği akım; Iz = Iz0 × k1 × k2.", 3],
 ["Döşeme yöntemi", "TS HD 60364-5-52'de kablonun ısıyı atma koşulunu tanımlayan harf kodu: A1 yalıtımlı duvarda boru, B1 duvarda boru, C duvara kelepçe, D toprak altı, E/F havada tava.", 3],
 ["Düzeltme faktörü", "Ortam sıcaklığı (k1) ve gruplamaya (k2) göre tablo akımını azaltan katsayı; ör. PVC 40 °C'de 0,87, aynı boruda 3 devre 0,70.", 3],
 ["Gerilim düşümü", "Hat direncinde akımın yol açtığı gerilim kaybı. Tek faz %e = 200·L·P/(k·S·U²), üç faz %e = 100·L·P/(k·S·U²); sayaç sonrası aydınlatma-prizde ~%1,5, motorda ~%3 sınırı yaygındır.", 3],
 ["Koruma uyumu (Ib ≤ In ≤ Iz)", "Yük akımı ≤ koruma anma akımı ≤ kablo kapasitesi şartı; ek olarak I2 ≤ 1,45·Iz aranır (gG sigortada pratikte In ≤ 0,9·Iz).", 3],
 ["Antigron", "Sahada NYM kablonun adı: PVC kılıflı çok damarlı iç tesisat kablosu (300/500 V); doğrudan toprak altında ve güneş altında kullanılmaz.", 3],
 ["Halojensiz kablo (LSZH)", "Yandığında halojen (klor) gazı çıkarmayan, düşük dumanlı kablo (N2XH, NHXMH); hastane, AVM, tünel, kaçış yollarında şartname gereği istenir.", 3],
 ["Yangına dayanıklı kablo", "Yangın altında belirli süre çalışmaya devam eden kablo (ör. N2XH-FE180); yangın pompası, acil aydınlatma, duman tahliye beslemesinde kullanılır.", 3],
 ["Kısa devre dayanımı (k²S²)", "Kablonun koruma açana kadar kısa devre ısısına dayanma şartı: I²·t ≤ k²·S²; bakırda PVC için k = 115, XLPE için k = 143.", 3],
 ["True RMS", "Dalga şekli bozuk (harmonikli) akım ve gerilimin gerçek etkin değerini ölçen yöntem; ortalama duyarlı aletler dimmer, LED sürücü, VFD devrelerinde %10–40 yanılabilir.", 4],
 ["LoZ modu", "Multimetrenin düşük empedanslı gerilim kademesi; boştaki uzun kablolardaki kapasitif 'hayalet gerilimi' yükleyerek söndürür.", 4],
 ["Hayalet gerilim", "Boştaki bir iletkende komşu hatlardan kapasitif kuplajla oluşan, yüksek empedanslı voltmetrenin gösterdiği sahte gerilim.", 4],
 ["Ölçüm kategorisi (CAT)", "TS EN 61010'a göre aletin darbe gerilimine dayanım sınıfı: CAT II priz devreleri, CAT III sabit tesisat ve panolar, CAT IV sayaç ve bina girişi.", 4],
 ["İki kutuplu gerilim test cihazı", "TS EN 61243-3'e uygun, iki problu gerilim dedektörü; gerilim yokluğu 'dene – ölç – tekrar dene' yöntemiyle bununla doğrulanır.", 4],
 ["Yalıtım direnci ölçer (megger)", "Yalıtıma yüksek DC gerilim uygulayıp sızıntıdan direnci MΩ olarak ölçen alet; 230/400 V devrede 500 V DC ile en az 1 MΩ aranır.", 4],
 ["Üç uçlu toprak ölçümü (%62 kuralı)", "Toprak ölçerin E (elektrot), P/S (gerilim) ve C/H (akım) kazıklarıyla R = U/I ölçmesi; P kazığı E–C mesafesinin ~%62'sine konur, %52 ve %72'de doğrulanır.", 4],
 ["Faz sırası göstergesi", "Üç fazın L1-L2-L3 sırasını (döner alan yönünü) gösteren alet; sıra tersse herhangi iki faz yer değiştirilir.", 4],
 ["RCD test cihazı", "Devreye kontrollü kaçak akım vererek RCD'nin açma akımını ve süresini (½, 1 ve 5 × IΔn) ölçen tesisat test cihazı.", 4],
 ["Dene – ölç – dene", "Gerilim yokluğu doğrulama sırası: aleti bilinen canlı kaynakta dene, çalışma yerinde tüm kombinasyonları ölç, aleti yeniden bilinen kaynakta dene.", 4],
 ["Fotosel rölesi", "Ortam ışığı ayarlanan eşiğin altına düşünce kontağını kapatan alacakaranlık şalteri; sensör kendi yaktığı lambayı görmeyecek yere konur.", 5],
 ["Astronomik saat", "Konum ve tarihe göre gün doğumu-batımı saatini hesaplayıp aydınlatmayı açıp kapatan zaman saati; sensörü kirlenmez, gölgeden etkilenmez.", 5],
 ["Zaman rölesi", "Kontağını ayarlanan gecikmeyle değiştiren röle: çekmede gecikmeli (on-delay) veya düşmede (bırakmada) gecikmeli (off-delay).", 5],
 ["Kullanım kategorisi (AC-1 / AC-3)", "Kontaktörün yük tipine göre anma değeri: AC-1 omik yükler, AC-3 sincap kafesli motorların normal yol verme ve durdurması.", 5],
 ["Üç zamanlı tarife", "Tüketimi T1 gündüz (06–17), T2 puant (17–22, en pahalı) ve T3 gece (22–06, en ucuz) dilimlerine göre fiyatlayan tarife.", 6],
 ["Reaktif enerji cezası", "Endüktif reaktif tüketim aktif tüketimin belirli oranını (ör. %20) ya da kapasitif reaktif belirli oranı (ör. %15) aşınca uygulanan bedel; oranlar güncel mevzuattan kontrol edilir.", 6],
 ["Yük ayırıcısı", "Nominal yük akımını açıp kapatabilen ama kısa devre akımını kesemeyen ayırıcı; sigortalı tipi kısa devreyi sigortayla keser.", 7],
 ["Topraklama ayırıcısı", "OG hücresinde hat tarafını toprağa bağlayan ayırıcı; ana ayırıcı/kesiciyle mekanik olarak kilitlidir, gerilim varken kapatılamaz.", 7],
 ["Mekanik kilitleme (interlock)", "İki cihazın hatalı sırayla veya aynı anda kapanmasını fiziksel olarak engelleyen düzen (ör. kesici kapalıyken ayırıcının açılamaması).", 7],
 ["AG / OG / YG", "AG 1 kV ve altı (tipik 0,4 kV); OG 1 kV üstünden 36 kV'a kadar dağıtım seviyesi (Türkiye'de yaygın 34,5 kV); YG iletim seviyesi (154/380 kV). Yönetmelik dili bazen yalnız iki sınıf kullanır: 1 kV'a kadar AG, üstü YG.", 39],
 ["SF6 / vakum kesici", "OG'de arkı kükürt hekzaflorür gazında veya vakum ortamında söndüren kesici tipleri.", 39],
 ["Adam-saat", "İşçilik ölçüsü: çalışan sayısı × çalışılan saat. 6 kişi × 9 saat = 54 adam-saat.", 8],
 ["Puantaj", "Çalışanların gün gün devam, mesai ve fazla mesai kaydı; işçilik maliyetinin ve hakedişin dayanağıdır.", 8],
 ["Metraj", "Yapılan veya yapılacak işin poz tarifindeki birimle (m, adet, sorti) ölçülmesi; kablo metrajında iniş-çıkış ve bağlantı payları eklenir.", 8],
 ["Keşif", "İşin metrajı ve birim fiyatlarıyla çıkarılan yaklaşık maliyet; iş sonunda ölçülerle kesin keşif yapılır.", 8],
 ["Poz", "Birim fiyat listesinde her iş kaleminin numarası ve kapsamını tanımlayan tarif; ne dahil ne hariç, poz tarifinden okunur.", 8],
 ["Hakediş", "Yükleniciye yapılan işin karşılığı olarak dönemsel ödenen tutar: metraj × birim fiyat; kümülatif hesaplanır, önceki ödemeler ve kesintiler düşülür.", 8],
 ["Günlük rapor (şantiye günlüğü)", "Tarih, hava, personel, yapılan işler, gelen malzeme, engeller ve talimatların yazıldığı günlük kayıt.", 8],
 ["CCR (sabit akım regülatörü)", "Havalimanı seri aydınlatma devresinde yük değişse de devre akımını (ör. 6,6 A) sabit tutan, parlaklık kademelerini sağlayan regülatör.", 9],
 ["Statik bypass", "UPS arızası veya aşırı yükte yükü kesintisiz olarak şebekeye aktaran elektronik anahtar.", 9],
 ["Otomatik tekrar kapama (79)", "Havai hatta geçici arızadan sonra kesiciyi belirli süre sonra otomatik yeniden kapatan koruma fonksiyonu.", 10],
 ["Osiloskop", "Gerilimin zamana göre değişimini ekranda çizen ölçü aleti; dikey eksen VOLTS/DIV, yatay eksen TIME/DIV ile okunur.", 11],
 ["Tepeden tepeye değer (Vpp)", "Dalganın pozitif ve negatif tepeleri arasındaki fark; sinüste Vpp = 2 × Vtepe.", 11],
 ["Darbe oranı (duty cycle)", "Kare dalgada işaretin 'açık' kaldığı sürenin periyoda oranı (%).", 11],
 ["Akım trafosu (AT)", "Büyük akımı ölçü aletinin okuyabileceği küçük sekonder akıma (ör. 200/5 A) dönüştüren trafo; sekonderi yük altındayken asla açık bırakılmaz.", 12],
 ["Sayaç sabiti", "Sayacın 1 kWh için verdiği impuls sayısı (imp/kWh); LED sayılarak anlık güç bulunur: P(kW) = 3600·n / (C·t).", 12],
 ["Wattmetre", "Aktif gücü ölçen alet; akım bobini seri, gerilim bobini paralel bağlanır.", 12],
 ["Kalibrasyon", "Ölçü aletini bilinen referansla karşılaştırıp sapma ve belirsizliği belgeleme; aleti düzeltmek ayrı bir işlemdir (ayar, justaj).", 13],
 ["Ölçüm belirsizliği", "Ölçüm sonucunun içinde bulunduğu kabul edilen aralık; sonuç 'değer ± belirsizlik' olarak yazılır.", 13],
 ["Doğruluk sınıfı", "Analog alette tam skala değerine göre izin verilen en büyük hata yüzdesi (ör. sınıf 1,5); küçük değer büyük kademede okunursa bağıl hata büyür.", 17],
 ["NO / NC kontak", "NO (normalde açık) bobin çekince kapanan, NC (normalde kapalı) bobin çekince açılan kontak; şemalar enerjisiz ve butona basılmamış hâli gösterir.", 17],
 ["Yalıtım deney gerilimi sembolü", "Ölçü aleti kadranındaki yıldız sembolü: içinde rakam yoksa 500 V, rakam varsa o kadar kV ile deney yapılmıştır; 0 ise deney yapılmamıştır.", 17],
 ["Endüktans (L)", "Bobinin manyetik alanda enerji depolama ve akım değişimine karşı koyma özelliği; birimi henry (H).", 14],
 ["Empedans (Z)", "AC devrede direnç ve reaktansın birlikte toplam karşı koyması; seri R–L'de Z = √(R² + XL²). R ile X doğrudan toplanmaz.", 14],
 ["Rezonans", "Seri R–L–C'de XL = XC olduğu frekans: f0 = 1/(2π√(LC)); akım en büyük olur, bobin ve kondansatör gerilimleri kaynağı aşabilir.", 14],
 ["Reaktörlü (detuned) kompanzasyon", "Harmonikli tesislerde kondansatöre seri reaktör eklenerek rezonansın harmonik frekanslarından uzaklaştırıldığı kompanzasyon.", 14],
 ["Kurulu güç (Pk)", "Yük cetvelindeki tüm linyelerin güçlerinin toplamı; her linye kendi kurulu gücüne göre boyutlandırılır.", 18],
 ["Eşzamanlılık katsayısı", "Tüm yüklerin aynı anda tam güçte çalışmadığını hesaba katan katsayı; konutta yaygın kabul ilk 8 kW için %60, aşan kısım için %40.", 18],
 ["Talep gücü (Pt)", "Kurulu güce eşzamanlılık katsayısı uygulanarak bulunan, kolonun gerçekte taşıyacağı güç; kolon, kolon sigortası ve sayaç buna göre seçilir.", 18],
 ["Güç üçgeni", "P (aktif), Q (reaktif) ve S (görünür) gücün dik üçgen ilişkisi: S² = P² + Q², cosφ = P/S.", 18],
 ["Tali pano", "Ana dağıtım panosundan beslenip bir kat, bölüm veya makine grubunu dağıtan ara pano.", 19],
 ["Icw (kısa süreli dayanım akımı)", "Pano barası ve yapısının belirtilen süre (genelde 1 s) boyunca hasarsız taşıyabildiği kısa devre akımı; bulunduğu noktadaki beklenen akımdan küçük olamaz.", 19],
 ["Açık tip şalter (ACB)", "Büyük akımlar (tipik 630–6300 A) için, çoğunlukla çekmeceli yapıda, elektronik koruma üniteli hava devre kesicisi; ADP girişinde kullanılır.", 19],
 ["LSIG ayarları", "Elektronik korumalı şalterde L uzun gecikme (aşırı yük), S kısa gecikme, I ani, G toprak arızası koruma ayarları.", 19],
 ["Form ayrımı", "TS EN 61439-2'ye göre pano içinin bölmelerle ayrılma düzeyi: Form 1 ayrım yok, Form 4'te her birimin çıkış klemensleri de ayrı bölmededir.", 19],
 ["IK kodu", "Muhafazanın mekanik darbeye dayanımını gösteren kod (IK00–IK10); üstüne basılan gömme armatür gibi yerlerde önemlidir.", 40],
 ["Ferrül", "Pano işçiliğinde kablo ucuna takılan eleman; sahada hem hat numarasını taşıyan numara makaronu hem de çok telli uç yüksüğü için kullanılır. Numara, şemadaki hat numarasıyla aynı olmalıdır.", 38],
 ["AVR (otomatik gerilim regülatörü)", "Alternatörün uyarma akımını ayarlayarak çıkış gerilimini sabit tutan düzen.", 20],
 ["Governor (hız regülatörü)", "Dizel motora giden yakıtı ayarlayarak devri, dolayısıyla frekansı sabit tutan düzen.", 20],
 ["Standby / Prime güç", "Jeneratör güç sınıfları: Standby yalnız şebeke kesintisinde sınırlı saat; Prime değişken yükte sınırsız saat çalışma içindir.", 20],
 ["Yuvarlanan küre yöntemi", "Seviyeye göre yarıçapı belirli (I: 20 m … IV: 60 m) hayali kürenin yapı üzerinde yuvarlanmasıyla yakalama noktalarını belirleyen yöntem; kürenin değdiği her nokta korunmalıdır.", 21],
 ["İniş iletkeni", "Yakalama sistemindeki yıldırım akımını birden fazla paralel yolla topraklamaya indiren iletken; kısa, düz ve döngüsüz götürülür.", 21],
 ["Ölçü (test) klemensi", "Her iniş iletkeninin toprağa girişine yakın konan, ölçüm için sökülebilen ayırma klemensi.", 21],
 ["Yıldırım koruma bölgesi (LPZ)", "Yapının tehdidin azaldığı bölgelere ayrılması: LPZ 0A/0B dış, LPZ 1 bina içi, LPZ 2 pano içi; her sınırda uygun tipte SPD konur.", 21],
 ["Up (koruma seviyesi)", "SPD'nin darbe sırasında geçirdiği gerilim; korunan cihazın dayanım geriliminin altında olmalıdır (son cihazlar için tipik < 1,5 kV).", 21],
 ["Koruma sınıfı (I / II / III)", "Sınıf I: metal gövde PE'ye bağlanır; Sınıf II: çift/takviyeli yalıtım, PE bağlanmaz (iç içe iki kare); Sınıf III: SELV ile beslenir.", 22],
 ["SELV", "Güvenlik amaçlı çok düşük gerilim (ör. 12/24 V); güvenlik transformatörüyle beslenir, topraktan ve diğer devrelerden ayrıktır.", 22],
 ["RFI (bilgi talebi)", "Projede belirsiz veya çelişkili bir konu için yükleniciden tasarımcıya yazılı olarak sorulan resmî soru.", 23],
 ["As-built (son durum) projesi", "Sahada gerçekte yapılanı gösteren proje; değişiklikler iş sürerken kırmızı kalemle işaretlenir, iş bitince çizime aktarılır.", 23],
 ["Dönüştürme oranı", "Trafonun primer ve sekonder gerilim (yaklaşık sarım sayısı) oranı: U1/U2 ≈ N1/N2.", 24],
 ["uk% (kısa devre gerilimi)", "Sekonder kısa devreyken anma akımını dolaştırmak için primere uygulanan gerilimin anma gerilimine oranı; Ik ≈ In / (uk/100).", 24],
 ["Dyn11", "Dağıtım trafolarının standart bağlantı grubu: YG üçgen, AG yıldız ve nötr dışarıda, AG fazörü YG'ye göre 30° ileride.", 24],
 ["Buchholz rölesi", "Yağlı trafoda iç arızada oluşan gazı ve ani yağ akışını algılayıp alarm veren veya trafoyu açtıran koruma rölesi.", 24],
 ["Senkron hız", "Döner manyetik alanın hızı: ns = 120·f / p; 50 Hz'de 4 kutuplu motor için 1500 d/d.", 25],
 ["Kayma", "Rotorun döner alandan geri kalma oranı: s = (ns − n) / ns; nominal yükte tipik %2–6.", 25],
 ["Yıldız / üçgen bağlantı", "Motor klemenslerinde köprülerle yapılan sargı bağlantısı; Δ 400 V / Y 690 V etiketli motor 400 V şebekede üçgen bağlanır.", 25],
 ["Direkt yol verme (DOL)", "Motora doğrudan tam gerilim verilerek yol verme; kalkış akımı nominalin yaklaşık 5–8 katıdır.", 25],
 ["Yıldız-üçgen yol verme", "Motor yıldızda kalkıp sonra üçgene geçirilir; kalkış akımı ve momenti doğrudan yol vermenin yaklaşık 1/3'üne düşer. Yalnız üçgende çalışacak motorlarda kullanılır.", 38],
 ["Termik aşırı yük rölesi", "Bimetal ile motor akımını izleyip aşırı yükte kumanda devresini kesen röle; 95-96 NC açılır, 97-98 NO kapanır. Ayar motor etiket akımına yapılır.", 38],
 ["Motor koruma şalteri (MKŞ)", "Aşırı yük (termik) ve kısa devre (manyetik) korumasını tek gövdede birleştiren, ayarlı motor şalteri.", 38],
 ["Açma sınıfı (Class)", "Termik rölenin kalkış süresine göre sınıfı; Class 10, ayar akımının 7,2 katında 4–10 s içinde açar. Uzun kalkışlı yüklerde daha yüksek sınıf seçilir.", 38],
 ["Mühürleme (self-holding)", "Start butonuna paralel bağlanan kontaktör NO yardımcı kontağının, buton bırakılınca bobini enerjili tutması.", 38],
 ["Enversör", "Motorun dönüş yönünü iki fazı kontaktörlerle yer değiştirerek değiştiren düzen; iki kontaktör elektriksel ve mekanik kilitle aynı anda çekmez.", 38],
 ["Dahlander motor", "Tek sargılı, kutup sayısı değiştirilerek iki hız (1:2) elde edilen motor; tipik bağlantı düşük hızda Δ, yüksek hızda YY'dir.", 38],
 ["Frekans konvertörü (VFD)", "Motora uygulanan frekans ve gerilimi değiştirerek hızı kademesiz ayarlayan sürücü; çıkışına kompanzasyon kondansatörü bağlanmaz.", 38],
 ["Yumuşak yol verici (soft starter)", "Kalkışta gerilimi rampa ile artırıp kalkış akımını ve mekanik darbeyi azaltan cihaz; frekansı değiştirmez, hız ayarı yapmaz.", 38],
 ["Koruma topraklaması", "Cihazların metal gövdelerinin PE ile topraklama sistemine bağlanması; yalıtım hatasında gövde gerilimini sınırlar ve korumanın açmasını sağlar.", 26],
 ["İşletme (sistem) topraklaması", "Şebekeye ait bir noktanın, genellikle trafo yıldız noktasının topraklanması; faz-toprak gerilimini sabit tutar.", 26],
 ["Dokunma gerilimi", "Arızada aynı anda dokunulabilen iki nokta (ör. gövde ile zemin) arasında oluşan gerilim; sözleşmeli sınır 50 V AC.", 26],
 ["Adım gerilimi", "Toprağa akım akan bir noktanın çevresinde iki ayak arasındaki mesafede oluşan gerilim; adım açıldıkça artar.", 26],
 ["TN-C sistemi", "Kaynak topraklı; N ve PE tek iletkende (PEN) birleşik. PEN koparsa sonraki gövdeler faz potansiyeline çıkabilir.", 26],
 ["TN-S sistemi", "Kaynak topraklı; N ve PE baştan sona ayrı iletken (üç fazda 3 faz + N + PE, beş iletken).", 26],
 ["TN-C-S sistemi", "Önce PEN ile gelen, bina girişinde N ve PE'ye bir kez ayrılan sistem; ayırma noktasından sonra N ile PE bir daha birleştirilmez.", 26],
 ["TT sistemi", "Kaynak topraklı, cihaz gövdeleri kendi topraklayıcısına (RA) bağlı; arıza akımı toprak üzerinden döner ve küçük kalır, RCD pratikte zorunludur.", 26],
 ["IT sistemi", "Kaynak topraktan yalıtılmış veya yüksek empedanslı; ilk arızada açma olmaz, izolasyon izleme cihazı alarm verir (ör. ameliyathane).", 26],
 ["PE (koruma iletkeni)", "Gövdeleri topraklama sistemine bağlayan yeşil-sarı iletken; asla anahtarlanmaz, sigortalanmaz, devre iletkeni olarak kullanılmaz.", 26],
 ["PEN iletkeni", "Koruma ve nötr görevini birlikte üstlenen iletken; kesilmez, sigortalanmaz, sabit tesiste en az 10 mm² Cu (16 mm² Al) olur.", 26],
 ["Döngü empedansı (Zs)", "Arıza akımının faz iletkeni ve PE üzerinden kaynağa dönüş yolunun empedansı: Zs = Ze + (R1 + R2). TN'de koruma şartı Zs × Ia ≤ U0.", 26],
 ["Eşpotansiyel bağlantı", "Aynı anda dokunulabilen iletken kısımları (su, gaz, kalorifer boruları, metal yapı) ana topraklama barasına bağlayarak aynı potansiyele getirme.", 26],
 ["Tamamlayıcı eşpotansiyel bağlantı", "Banyo, duş, havuz gibi mahallerde gövde ve metal boruların yerel olarak birbirine bağlanması; korumalı en az 2,5 mm², korumasız en az 4 mm² Cu.", 26],
 ["Ana topraklama barası", "Bina girişinde temel topraklayıcısı, PE, eşpotansiyel ve paratoner iniş iletkenlerinin toplandığı bara.", 26],
 ["Temel topraklayıcısı", "Temel betonu içine kapalı halka olarak döşenen topraklayıcı; direnci düşük ve kararlıdır, inşaat sırasında yapılmalıdır.", 26],
 ["Kazık topraklayıcı", "Düşey çakılan galvanizli veya bakır kaplı çelik çubuk (tipik 1,5–2 m); R ≈ ρ/L. Paralel kazık aralığı en az kazık boyunun iki katıdır.", 26],
 ["Kaçak akım rölesi (RCD)", "Faz ve nötr akımını toroidden geçirip giden-dönen akım farkı IΔn'ye ulaşınca devreyi açan koruma cihazı (sahada KAR, FI).", 26],
 ["IΔn (anma kaçak akımı)", "RCD'nin mutlaka açması gereken kaçak akım; 30 mA insan koruması, 100–300 mA yangın koruması ve seçicilik içindir. RCD 0,5·IΔn'nin altında açmamalıdır.", 26],
 ["RCCB / RCBO", "RCCB (TS EN 61008) yalnız kaçak akıma karşı korur; RCBO (TS EN 61009) kaçak akım ve aşırı akım korumasını tek gövdede birleştirir.", 26],
 ["RCD tipleri (AC / A / F / B)", "AC yalnız sinüzoidal, A ek olarak darbeli DC, F ek olarak karışık frekanslı, B ek olarak düz DC kaçağı algılar. Modern konut için en az A tipi.", 26],
 ["S tipi (selektif) RCD", "Gecikmeli açan RCD; IΔn'de 130–500 ms arasında açar. Üst kademede, alttaki genel tipin en az üç katı IΔn ile seçicilik sağlar.", 26],
 ["Ortak nötr hatası", "Farklı RCD veya linyelerin nötrlerinin birleştirilmesi ya da nötrün başka RCD'den alınması; RCD'ler sebepsiz açar, kapatılan hatta dönüş akımı sürer.", 26],
 ["Seçicilik (selektivite)", "Arızada yalnız arızaya en yakın koruma elemanının açması, üst kademenin devrede kalması; gG sigortalarda kademe oranı yaklaşık 1:1,6 tutulur.", 27],
 ["Kesme kapasitesi (Icn / Icu)", "Koruma cihazının güvenle kesebileceği en büyük kısa devre akımı (kA); MCB'de Icn, MCCB'de Icu. Anma akımıyla ilgisi yoktur.", 43],
 ["Kaskad (back-up) koruma", "Üstte akım sınırlayan bir koruma varken alttaki düşük kA'lı cihazın daha yüksek kısa devre akımında kullanılması; yalnız üretici tablosuyla yapılır.", 27],
 ["I²t (geçirme enerjisi)", "Koruma açarken devreye sızan ısıl enerjinin ölçüsü (A²s); korunan kablonun k²S² değerinden küçük olmalıdır.", 43],
 ["MCB (otomatik sigorta)", "TS EN 60898-1 minyatür devre kesici: termik (bimetal) aşırı yük ve manyetik kısa devre korumasını birlikte içerir; 1,13·In'de 1 saatte açmaz, 1,45·In'de açar.", 34],
 ["B / C / D eğrisi", "MCB'nin anlık (manyetik) açma bölgesi: B 3–5·In (aydınlatma, priz, uzun hat), C 5–10·In (genel, küçük motor), D 10–20·In (trafo, büyük motor).", 43],
 ["gG sigorta", "Tam aralık, genel amaçlı eriyen telli sigorta; hem aşırı yükü hem kısa devreyi korur. Kablo ve hat koruması için doğru seçimdir (eski adı gL).", 43],
 ["aM sigorta", "Kısmi aralık, motor devresi sigortası; yalnız kısa devreyi korur, yaklaşık 4·In'e kadar açmaz. Daima termik röle ile birlikte kullanılır.", 43],
 ["NH (bıçaklı) sigorta", "Seramik gövdeli, kuvars kum dolgulu, bıçak kontaklı yüksek kesme kapasiteli sigorta (NH000–NH4); yük altında çekilmez, çekme sapı ve KKD ile değiştirilir.", 43],
 ["Diazed / Neozed (buşonlu sigorta)", "Sahada 'kofta' denen vidalı buşonlu sigorta; Diazed E27/E33 dişli klasik tip, Neozed daha küçük hacimli yeni nesildir. Buşon üzerindeki renk akımı gösterir.", 43],
 ["Ayar (pas) vidası", "Buşonlu sigorta altlığında, akım değerine göre farklı delik çaplı kalibrasyon parçası; daha büyük amperli buşonun takılmasını mekanik olarak engeller.", 43],
 ["Akım sınırlama", "Eriyen telli sigortanın kısa devre akımını ilk yarım periyotta, beklenen tepe değere ulaşmadan kesmesi; kablonun gördüğü I²t çok küçük kalır.", 43],
 ["Lümen (lm)", "Işık akısı birimi: kaynaktan her yöne çıkan toplam ışık miktarı.", 28],
 ["Lüks (lx)", "Aydınlık düzeyi birimi: yüzeye düşen ışık akısının alana oranı, 1 lx = 1 lm/m². Lüksmetre ile ölçülür; tasarım hedefi lüks olarak verilir.", 28],
 ["Kandela (cd)", "Işık şiddeti birimi: belirli bir yöndeki ışık yoğunluğu. Nokta kaynakta E = I / d² (ters kare kanunu).", 28],
 ["Işık verimi (lm/W)", "Harcanan her watt için elde edilen lümen; akkor ~10–15, LED armatür ~100–160 lm/W ve üzeri.", 28],
 ["Lümen yöntemi", "İç mekânda armatür sayısı hesabı: n = E·A / (Φ·η·d); η kullanma faktörü, d bakım faktörüdür.", 28],
 ["Bakım faktörü", "Kirlenme ve lamba yaşlanmasıyla zamanla azalan ışığı tasarımda hesaba katan katsayı; temiz ortam ve düzenli bakımda yaklaşık 0,8.", 28],
 ["Düzgünlük (U0)", "En düşük aydınlık düzeyinin ortalamaya oranı: U0 = Emin / Eort; ofis çalışma alanında tipik ≥ 0,60.", 28],
 ["Renk sıcaklığı (K)", "Işığın rengini tanımlayan değer: 2700–3000 K sıcak beyaz, ~4000 K nötr beyaz, 5000 K ve üzeri soğuk beyaz.", 28],
 ["Renksel geriverim (CRI, Ra)", "Işık altında renklerin ne kadar doğru göründüğünün 0–100 ölçüsü; sürekli çalışılan iç mekânda Ra ≥ 80 aranır.", 28],
 ["UGR (birleşik kamaşma derecesi)", "İç mekânda armatürlerin yarattığı rahatsız edici kamaşmanın hesap değeri; küçüldükçe kamaşma azalır (ofis için sınır 19).", 28],
 ["6331 sayılı İSG Kanunu", "İş sağlığı ve güvenliğinin temel kanunu (2012); işverene risk değerlendirmesi, eğitim, KKD, acil durum planı ve kaza bildirimi gibi yükümlülükler getirir.", 29],
 ["Tehlike / risk", "Tehlike zarar verme potansiyelidir; risk, tehlikenin zarara dönüşme olasılığı ile şiddetinin birleşimidir (Risk = Olasılık × Şiddet).", 29],
 ["Risk değerlendirmesi", "Tehlikeleri tanımlama, riskleri derecelendirme, önlem alma, izleme ve yenileme süreci; çok tehlikeli işyerinde en geç 2 yılda bir yenilenir.", 29],
 ["Kontrol hiyerarşisi", "Önlemlerin etkinlik sırası: ortadan kaldırma → ikame → mühendislik → idari → KKD. KKD son çaredir.", 29],
 ["Tehlike sınıfı", "İşyerinin faaliyet koduna göre az tehlikeli, tehlikeli veya çok tehlikeli olarak sınıflandırılması; eğitim süresini ve risk değerlendirmesi yenileme süresini belirler.", 29],
 ["KKD (kişisel koruyucu donanım)", "Kalan riske karşı son bariyer olan donanım (yalıtkan eldiven, baret, yüz siperi, ark giysisi); işveren ücretsiz sağlar, çalışan kullanmakla yükümlüdür.", 29],
 ["Yalıtkan eldiven sınıfları", "TS EN 60903: Sınıf 00 500 V, 0 1000 V, 1 7,5 kV, 2 17 kV, 3 26,5 kV, 4 36 kV (AC azami kullanma gerilimi).", 29],
 ["İzoleli el aleti", "TS EN 60900'e göre 1000 V AC için test edilmiş, çift üçgen sembollü tornavida, pense gibi aletler.", 29],
 ["EKAT belgesi", "Kuvvetli akım (özellikle OG/YG) tesislerinde çalışacak personele eğitim sonrası verilen yetki belgesi; yanında işverenin yazılı yetkilendirmesi gerekir.", 29],
 ["MYK mesleki yeterlilik belgesi", "Ulusal yeterliliğe göre teorik ve performans sınavıyla verilen belge; elektrik tesisatçılığı belge zorunlu meslekler arasındadır.", 29],
 ["İş izni (çalışma izni)", "Riskli ve YG işleri öncesi düzenlenen yazılı izin: iş tanımı, yer, süre, önlemler, sorumlular ve imzalar; izin kapatılmadan enerji verilmez.", 29],
 ["5 altın kural", "Gerilimsiz çalışmaya geçiş sırası: ayır, tekrar kapanmaya karşı kilitle-etiketle, gerilim yokluğunu doğrula, toprakla ve kısa devre et, komşu canlı kısımları ört. İş bitince ters sıra.", 42],
 ["LOTO (kilitle-etiketle)", "Açılan enerji kaynağını kişisel kilitle kilitleme ve kim-ne iş-telefon-tarih yazan etiket asma; her çalışan kendi kilidini takar, yalnız kendisi söker.", 42],
 ["Geçici topraklama ve kısa devre", "Çalışma yerindeki iletkenleri toprağa ve birbirine bağlayan takım; takarken önce toprak ucu, sökerken önce faz uçları.", 42],
 ["Canlı çalışma bölgesi (DL)", "Canlı kısmın hemen çevresi; içine vücut veya alet giren iş canlı çalışma sayılır, özel eğitim, yetki ve yalıtkan alet gerekir.", 42],
 ["Yaklaşma bölgesi (DV)", "Canlı çalışma bölgesinin dışındaki sınırlı kuşak; buraya girmek 'yakınında çalışma'dır, örtü, bariyer ve gözcü gerekir.", 42],
 ["Ark parlaması (arc flash)", "Kısa devre arkında oluşan çok yüksek sıcaklık, erimiş metal ve basınç dalgası; temas olmadan ağır yanık ve göz hasarı yapabilir.", 33],
 ["Bırakamama (let-go) eşiği", "Kişinin iletkeni kendi kas gücüyle bırakabildiği en yüksek akım; 50 Hz'de yaklaşık 15–25 mA bölgesinde aşılır, temas süresi uzar.", 33],
 ["Ventrikül fibrilasyonu", "Kalp karıncıklarının düzenli kasılmak yerine titremesi; kalp kan pompalayamaz. Elektrik çarpmasındaki ölümlerin başlıca nedenidir, OED ile düzeltilebilir.", 33],
 ["Doğrudan / dolaylı temas", "Doğrudan: normalde gerilimli iletkene dokunma. Dolaylı: yalıtım hatası nedeniyle gerilim almış gövdeye dokunma.", 33],
 ["OED (otomatik eksternal defibrilatör)", "Kalp ritmini analiz edip gerekirse şok veren, sesli komutla kullanılan cihaz; elektrik çarpmasındaki fibrilasyonda erken kullanımı hayat kurtarır.", 33],
 ["Derlenme (yan yatış) pozisyonu", "Bilinci kapalı ama normal soluyan kazazedenin hava yolunu açık tutmak için yan yatırılması; solunum sürekli izlenir.", 33],
 ["DIN ray", "Modüler cihazların klipsle takıldığı 35 mm standart montaj rayı (TS EN 60715); bir modül yaklaşık 17,5–18 mm genişliktedir.", 34],
 ["Tarak bara", "Yan yana MCB'lerin faz girişlerini tek parça besleyen bakır tarak; tek tek köprü kablodan daha güvenli ve düzenlidir.", 34],
 ["Gerilim koruma rölesi", "Şebeke gerilimi ayarlanan alt/üst sınır dışına çıkınca yükü kesen, normale dönünce gecikmeyle bağlayan röle; nötr kopmasına karşı korur, darbe aşırı gerilime karşı korumaz.", 34],
 ["Ana şalter", "Panonun tamamını açıp kapatan eleman; monofaze dairede 2 kutuplu, trifazede 4 kutuplu seçilir, nötr de ayrılır.", 34],
 ["Kofre (bina bağlantı kutusu)", "Şebekeden gelen bağlantı hattının binaya girdiği, genellikle NH sigortalı ilk kutu; dağıtım şirketinin denetiminde ve mühürlüdür.", 35],
 ["Mühürlü bölge", "Kofre, sayaç öncesi sigorta, sayaç ve test klemensinden oluşan, dağıtım şirketince mühürlenen kısım; müdahale kaçak kullanım sayılır.", 35],
 ["Akım trafolu sayaç", "Yük akımı büyük olduğunda akım trafoları üzerinden ölçen sayaç (x/5 A); tüketim = endeks farkı × çarpan.", 35],
 ["Kombi sayaç", "Aktif enerjinin yanında endüktif ve kapasitif reaktif enerjiyi (kVArh) de ölçen sayaç.", 35],
 ["Daralan makaron", "Isıtılınca büzülerek pabuç gövdesini ve kablo yalıtımının ucunu saran yalıtım kılıfı; iç yüzeyi yapışkanlı tipi nem girişini de engeller (akü kablosu uçları gibi).", 15],
 ["Diyot", "Akımı yalnız anottan katoda geçiren yarı iletken eleman; silisyumda iletim eşiği yaklaşık 0,6–0,7 V.", 30],
 ["Serbest geçiş (söndürme) diyodu", "DC bobine ters paralel bağlanan diyot; akım kesilince oluşan ters gerilim darbesini söndürür, kontak ve transistörü korur.", 30],
 ["Zener diyot", "Ters yönde belirli gerilimde kontrollü iletime geçen diyot; seri dirençle basit gerilim sabitleme için kullanılır.", 30],
 ["Varistör (MOV)", "Gerilime bağlı, çift yönlü metal oksit direnç; aşırı gerilimi kıskaçlar, kA mertebesinde darbe akımı taşır, her büyük darbede yaşlanır.", 30],
 ["Köprü doğrultucu", "Dört diyotla AC'nin iki yarım dalgasını da aynı yönde çeviren tam dalga doğrultucu; dalgalanma frekansı 100 Hz'dir.", 31],
 ["Optokuplör", "Aynı kılıfta LED ve fototransistörden oluşan, iki devre arasında elektriksel bağlantı olmadan (galvanik yalıtımla) sinyal aktaran eleman.", 32],
 ["SSR (katı hâl rölesi)", "Kontaksız elektronik röle; AC tipinde triyak/tristör, DC tipinde MOSFET çıkışlıdır. Arızası çoğunlukla kısa devre şeklindedir.", 32],
 ["PNP / NPN çıkış", "PNP (source) çıkış yüke +24 V verir; NPN (sink) çıkış yükü 0 V'a çeker. Sensör ve PLC girişi aynı tipte olmalıdır.", 32],
 ["KNX", "Bina otomasyonu için dağıtık (merkezsiz) açık standart bus sistemi; cihazlar 29 V DC SELV bus hattı üzerinden telegramla haberleşir.", 37],
 ["Sensör / aktör (KNX)", "Sensör bilgi üretip telegram gönderir (buton, PIR, sıcaklık); aktör telegramı alıp yükü sürer (röle, dimmer, panjur aktörü).", 37],
 ["Grup adresi", "KNX'te sensör ile aktörü mantıksal olarak bağlayan adres (ör. 1/2/3); aynı gruptaki nesnelerin veri tipi (DPT) uyumlu olmalıdır.", 37],
 ["Yarıya bölme yöntemi", "Arıza aramada hattı ortadan ayırıp ölçerek arızalı bölümü her adımda yarıya indirme; birkaç ölçümde arıza yeri bulunur.", 41],
 ["Faz kaybı", "Üç fazlı beslemede bir fazın kesilmesi; motor iki fazda kalır, akımı artar, homurdar ve sargı yanabilir.", 41],
 ["Tek hat şeması", "Çok fazlı hatların tek çizgiyle, iletken sayısının eğik çizgilerle gösterildiği, enerjinin kaynaktan yüke yolunu ve korumaları veren şema.", 44],
 ["Antet", "Paftanın sağ alt köşesindeki başlık bloğu: proje adı, çizim no, sayfa, revizyon, çizen-onaylayan ve tarih.", 44],
 ["Kumanda şeması", "Bobin, buton ve kontakların akım yolunu gösteren şema; kontaklar enerjisiz ve butonlara basılmamış hâlde çizilir.", 44],
 ["Kolon hattı", "Sayaçtan (veya ana panodan) daire dağıtım tablosuna giden besleme hattı; talep gücü ve gerilim düşümüne göre boyutlandırılır, trifazede 5 iletkenlidir.", 45],
 ["Dağıtım tablosu (daire panosu)", "Kolonun bittiği, ana şalter, RCD ve linye otomatlarının bulunduğu pano; halk arasında 'sigorta kutusu'.", 45],
 ["Linye", "Dağıtım tablosundaki bir otomattan çıkıp bir grup kullanım noktasını besleyen hat; numarası, koruma elemanı (ör. B16) ve kesiti (ör. 3×2,5 mm²) vardır.", 45],
 ["Sorti", "Linyeden (buattan) ayrılıp tek bir armatüre veya prize giden son hat parçası; keşif ve işçilik çoğunlukla sorti üzerinden yapılır.", 45],
 ["Buat", "Linye ve sortilerin birleştirildiği kapaklı ek kutusu; ek yalnız buatta veya cihaz kutusunda yapılır, kapağı erişilebilir kalır.", 45],
 ["Kasa (anahtar-priz kutusu)", "Anahtar ve prizin gömüldüğü sıva altı kutu.", 45],
 ["Lejant", "Projede kullanılan sembollerin ve kısaltmaların açıklandığı tablo; proje okumaya lejanttan başlanır.", 45],
 ["Dönüş teli (L')", "Anahtarın çıkışından buata dönüp oradan lambaya giden, anahtarlanmış faz iletkeni; faz renginde olur.", 45],
 ["Adi anahtar", "Bir lambayı veya birlikte yanan lamba grubunu tek yerden yakıp söndüren tek kutuplu anahtar; fazı keser.", 45],
 ["Komütatör (seri anahtar)", "Tek kasada iki anahtar: ortak faz girişi ve iki ayrı dönüş; iki lamba grubunu aynı yerden ayrı ayrı yakar.", 45],
 ["Vavien anahtar", "Bir lambayı iki yerden kumanda etmeye yarayan iki konumlu değiştirici; ortak ucu (COM) iki uçtan birine bağlar.", 45],
 ["Ara (kron) anahtar", "İki gezgin telin arasına giren, düz ve çapraz konumlu dört uçlu anahtar; üç ve daha fazla yerden kumandada vavienlerin arasına konur.", 45],
 ["Gezgin (köprü) tel", "Vavien ve ara anahtarlar arasında çekilen iki iletken; anahtarlar aynı gezgini seçince lamba yanar.", 45],
 ["Merdiven otomatı", "Paralel bağlı butonlardan herhangi birine basılınca lambaları ayarlı süre yakıp sonra söndüren ray tipi cihaz.", 45],
 ["İmpuls röle (teleruptör)", "Her buton basışında kontağını değiştiren kalıcı röle (bas-yak, bas-söndür); çok yerden kumandada vavien-ara zinciri yerine kullanılır.", 45],
 ["Dimmer", "Faz üzerinde lambaya seri bağlanan, her yarım periyodun bir kısmını keserek etkin gücü azaltan ışık ayarlayıcı; faz başı ve faz sonu kesmeli tipleri vardır.", 45],
 ["Hareket sensörü (PIR)", "Isı yayan hareketli cismi algılayıp lambayı ayarlı süre yakan sensör; üç telli tipi L, N ve lamba çıkışı (L') ister.", 45],
 ["Yük (güç) cetveli", "Projede her linyenin kullanım yerini, kurulu gücünü, otomatını, kesitini ve fazını gösteren tablo; kurulu ve talep gücü buradan çıkar.", 45],
 ["Banyo bölgeleri", "TS HD 60364-7-701: bölge 0 küvet/duş içi, bölge 1 üstü 2,25 m'ye kadar, bölge 2 bölge 1'den yatayda 0,6 m. Bu bölgelere priz konmaz.", 45],
 ["Ayrı linye isteyen yük", "Çamaşır, bulaşık makinesi, fırın, ocak, klima, termosifon gibi yüksek güçlü veya uzun süre sürekli çalışan, kendi linyesinden beslenen cihaz.", 45],
 ["Faz dengesi", "Tek fazlı yüklerin trifaze beslemede fazlara yaklaşık eşit dağıtılması; nötr akımını ve gerilim düşümünü azaltır.", 45]
];
