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
"q": "Gerilim altındaki bir tesiste çalışmaya başlamadan önce yapılması gereken İLK iş?",
"opts": [
"Enerjiyi kesmek",
"Ölçüm almak",
"Eldiven giymek",
"Etiket asmak"
],
"ans": 0,
"ex": "5 altın kuralın ilki: enerjiyi kes."
},
{
"q": "İş güvenliğinde 'beş altın kural'dan biri DEĞİLDİR?",
"opts": [
"Enerjiyi kesmek",
"Gerilimsizliği doğrulamak",
"Topraklama ve kısa devre etmek",
"Sigortayı büyütmek"
],
"ans": 3,
"ex": "Kurallar: kes, tekrar kapanmayı önle, gerilimsizliği doğrula, toprakla/kısa devre et, yalıt."
},
{
"q": "LOTO (Lockout-Tagout) ne anlama gelir?",
"opts": [
"Ölçüm-kontrol",
"Kilitle-etiketle",
"Topraklama-yalıtım",
"Kesme-bağlama"
],
"ans": 1,
"ex": "Enerji izolasyonunu kilitleyip etiketlemek."
},
{
"q": "Elektrik yangınında KULLANILMAMASI gereken söndürücü?",
"opts": [
"CO2 (karbondioksit)",
"Kuru kimyevi toz",
"Su (jet)",
"Temiz gazlı (halokarbon) söndürücü"
],
"ans": 2,
"ex": "Su iletkendir; enerjili tesiste su jeti çarpılmaya yol açar. Önce enerji kesilir; CO2, kuru kimyevi toz veya temiz gazlı söndürücü kullanılır."
},
{
"q": "Akıma kapılmış bir kişiye ilk müdahale?",
"opts": [
"Hemen elinden çekmek",
"Önce enerjiyi/akımı kesmek",
"Su dökmek",
"Beklemek"
],
"ans": 1,
"ex": "Önce kişiyi akımdan ayır/enerjiyi kes, sonra müdahale et."
},
{
"q": "Yüksekte çalışmada zorunlu KKD?",
"opts": [
"Emniyet kemeri/paraşüt tipi",
"Sadece eldiven",
"Gözlük yeterli",
"Maske"
],
"ans": 0,
"ex": "Düşmeye karşı tam vücut emniyet kemeri kullanılır."
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
"ex": "Seviye 3'te A1 teorik başarı şartı %70, Seviye 4'te %80'dir. Sınavdan önce belgelendirme kuruluşunun güncel sınav şartnamesi kontrol edilmelidir."
},
{
"q": "Yalıtkan eldivenin amacı?",
"opts": [
"Sıcaktan korunma",
"Elektrik çarpmasından korunma",
"Kesilmeyi önleme",
"Kir tutmama"
],
"ans": 1,
"ex": "Yalıtkan eldiven çarpılmaya karşı korur; periyodik test edilir."
},
{
"q": "Atık kablo/kılıfların doğru yönetimi?",
"opts": [
"Çöpe atmak",
"Yakmak",
"Ayrı toplayıp geri dönüşüme vermek",
"Gömme"
],
"ans": 2,
"ex": "Çevre koruma: atıklar ayrıştırılıp geri dönüşüme verilir."
},
{
"q": "Riskli/YG çalışmasına başlamadan önce hangi belge alınır?",
"opts": [
"Fatura",
"İş izni (work permit)",
"Garanti",
"İrsaliye"
],
"ans": 1,
"ex": "Riskli işlerde iş izni/çalışma izni alınır."
},
{
"q": "Baret hangi riske karşı kullanılır?",
"opts": [
"Gürültü",
"Düşen cisim/çarpma",
"Toz",
"Titreşim"
],
"ans": 1,
"ex": "Baret kafayı düşen cisim ve çarpmalara karşı korur."
},
{
"q": "Topraklama ve kısa devre etmenin amacı?",
"opts": [
"Daha hızlı çalışmak",
"Çalışma süresince gerilimsizliği güvence altına almak",
"Aydınlatma",
"Ölçüm kolaylığı"
],
"ans": 1,
"ex": "Beklenmedik gerilime karşı çalışanı korur."
}
],
"meslek": [
{
"q": "Nemli yerlerde sıva altı ve sıva üstü tesisatta yaygın kullanılan, sahada 'antigron' diye bilinen kablo hangisidir?",
"opts": [
"NYA",
"NYM",
"NYAF",
"H05V-K"
],
"ans": 1,
"ex": "NYM (antigron) PVC dış kılıflı çok damarlı tesisat kablosudur; kuru ve nemli yerlerde sıva altı/üstü kullanılır. NYA ve NYAF tek damarlı, boru içinde çekilen iletkenlerdir."
},
{
"q": "Ampermetre devreye nasıl bağlanır?",
"opts": [
"Seri",
"Paralel",
"Çapraz",
"Toprağa"
],
"ans": 0,
"ex": "Ampermetre seri bağlanır."
},
{
"q": "Kaçak akım rölesinde can güvenliği eşiği?",
"opts": [
"10 mA",
"30 mA",
"100 mA",
"300 mA"
],
"ans": 1,
"ex": "İnsan koruması için 30 mA."
},
{
"q": "V = I·R bağıntısında akım I neye eşittir?",
"opts": [
"V·R",
"V/R",
"R/V",
"V−R"
],
"ans": 1,
"ex": "I = V/R."
},
{
"q": "Üç fazlı aktif güç formülü?",
"opts": [
"U·I",
"√3·U·I·cosφ",
"√3·U·I",
"U·I·sinφ"
],
"ans": 1,
"ex": "P = √3·U·I·cosφ."
},
{
"q": "Yıldırım/koruma topraklamasında istenen direnç?",
"opts": [
"Yüksek",
"Düşük",
"Sonsuz",
"Önemsiz"
],
"ans": 1,
"ex": "Topraklama direnci düşük olmalıdır."
},
{
"q": "RJ45 T568B diziliminde ilk renk?",
"opts": [
"Turuncu",
"Turuncu-Beyaz",
"Yeşil-Beyaz",
"Mavi"
],
"ans": 1,
"ex": "İlk sıra Turuncu-Beyaz."
},
{
"q": "TS HD 60364-5-52'ye göre AG dağıtım şebekesinden beslenen bir tesiste aydınlatma devreleri için önerilen en büyük gerilim düşümü?",
"opts": [
"%3",
"%5",
"%10",
"%1"
],
"ans": 0,
"ex": "TS HD 60364-5-52 (Ek G): aydınlatma %3, diğer kullanımlar %5. Proje ve şartnamede daha sıkı değer istenebilir; ulusal yönetmelik ve dağıtım şirketi şartları ayrıca kontrol edilir."
},
{
"q": "C tipi otomatın açma akımı aralığı?",
"opts": [
"3–5·In",
"5–10·In",
"10–20·In",
"1–2·In"
],
"ans": 1,
"ex": "C eğrisi 5–10·In."
},
{
"q": "Transformatör hangi akımda çalışır?",
"opts": [
"DC",
"AC",
"Hem AC hem DC",
"Hiçbiri"
],
"ans": 1,
"ex": "Trafo yalnız AC'de çalışır."
},
{
"q": "Asenkron motorda yol alma akımını düşüren yöntem?",
"opts": [
"Kompanzasyon",
"Yıldız-üçgen",
"Topraklama",
"Parafudur"
],
"ans": 1,
"ex": "Yıldız-üçgen yolverme başlangıç akımını düşürür."
},
{
"q": "Kompanzasyon neyi düzeltir?",
"opts": [
"Gerilimi",
"Güç faktörünü (cosφ)",
"Frekansı",
"Direnci"
],
"ans": 1,
"ex": "Kompanzasyon cosφ'yi düzeltir."
},
{
"q": "Pano içinde akımı dağıtan iletken çubuk?",
"opts": [
"Bara",
"Sigorta",
"Klemens",
"Kontaktör"
],
"ans": 0,
"ex": "Bara (busbar) akımı dağıtır."
},
{
"q": "Türkiye şebekesinde faz-nötr gerilimi yaklaşık?",
"opts": [
"110 V",
"230 V",
"400 V",
"12 V"
],
"ans": 1,
"ex": "Faz-nötr ≈ 230 V."
},
{
"q": "Fazlar arası (hat) gerilimi yaklaşık?",
"opts": [
"230 V",
"400 V",
"690 V",
"110 V"
],
"ans": 1,
"ex": "Hat gerilimi ≈ 400 V (√3·230)."
},
{
"q": "Seri devrede sabit kalan büyüklük?",
"opts": [
"Akım",
"Gerilim",
"Güç",
"Direnç"
],
"ans": 0,
"ex": "Seri devrede akım her elemandan aynı geçer."
},
{
"q": "Osiloskop ekranında sinüs dalgasından doğrudan okunan değer hangisidir?",
"opts": [
"Etkin (RMS) değer",
"Tepe (maksimum) ve tepe-tepe değer",
"Ortalama güç",
"Direnç"
],
"ans": 1,
"ex": "Osiloskop gerilimin zamana göre anlık değişimini çizer; ekrandan tepe ve tepe-tepe değer okunur, sinüste RMS = Vtepe/√2 ile hesaplanır. Dijital osiloskoplar RMS'i ayrıca hesaplayıp gösterebilir."
},
{
"q": "İletken kesiti (mm²) neye göre seçilir?",
"opts": [
"Renge",
"Taşınacak akıma",
"Markaya",
"Uzunluğa bakılmaz"
],
"ans": 1,
"ex": "Kesit, taşınacak akıma göre seçilir."
}
]
};
const GLOSSARY = [
 ["Ohm Yasası", "V = I × R; gerilim, akım ve direnç ilişkisi."],
 ["Güç (P)", "P = V·I = I²R = V²/R, birimi Watt."],
 ["Seri devre", "Akım sabit, gerilim bölünür; biri kopar tümü söner."],
 ["Paralel devre", "Gerilim sabit, akım bölünür; kollar bağımsız."],
 ["Ampermetre", "Akım ölçer, SERİ bağlanır, düşük iç direnç."],
 ["Voltmetre", "Gerilim ölçer, PARALEL bağlanır, yüksek iç direnç."],
 ["Pens ampermetre", "Manyetik alanla akım ölçer; içine tek hat alınır."],
 ["Mutlak hata", "ΔX = |Xg − X|."],
 ["Bağıl hata", "ε = ΔX / Xg (×100 ile %)."],
 ["Reaktans (XL)", "XL = 2πfL; DA'da (f=0) sıfırdır."],
 ["Reaktans (XC)", "XC = 1/(2πfC); DA'da sonsuzdur."],
 ["NYA / NYAF / NYM / NYY", "Sırasıyla: pano içi tek tel / esnek motor / nemli sıva altı / yer altı kablosu."],
 ["RJ45 T568B", "Ağ kablosu renk sırası standardı."],
 ["Kesici (Breaker)", "Yük akımını güvenle kesen, ark hazneli cihaz."],
 ["Ayırıcı (Isolator)", "Görünür ayrım sağlar; yük altında açılamaz."],
 ["Istanka / Neon", "Gerilim olup olmadığını kontrol aracı."],
 ["Kontaktör", "Bobinle büyük yükü anahtarlayan elektromekanik şalter."],
 ["LDR", "Işığa duyarlı direnç (foto direnç)."],
 ["Kompanzasyon", "Kondansatörle güç faktörünü (cosφ) düzeltme."],
 ["Güç faktörü (cosφ)", "P/S oranı; 1'e yakın olması istenir."],
 ["Görünür/Aktif/Reaktif güç", "S (kVA) / P (kW) / Q (kVAR); S²=P²+Q²."],
 ["ATS", "Otomatik Transfer Şalteri (şebeke↔jeneratör)."],
 ["UPS", "Kesintisiz güç kaynağı; jeneratöre kadar köprüler."],
 ["Parafudr (SPD)", "Aşırı gerilimi (yıldırım, anahtarlama darbesi) sınırlayıp toprağa akıtan koruma elemanı; Tip 1/2/3."],
 ["Topraklama direnci", "Topraklayıcı ile referans toprak arasındaki direnç. Hedef tesise göre değişir: TT'de RA·IΔn ≤ 50 V; yıldırım topraklamasında mümkünse <10 Ω."],
 ["Faraday kafesi", "Örgü ile yapı yüzeyi yıldırım koruması."],
 ["ADP", "Ana Dağıtım Panosu."],
 ["Bara (busbar)", "Pano içinde akımı dağıtan bakır çubuk."],
 ["IP koruma sınıfı", "Toz/su koruma derecesi (örn. IP65)."],
 ["Alternatör", "Jeneratörde elektrik üreten kısım."],
 ["Nox", "Korozyonu önleyen anti-oksidan pasta."],
 ["Shed water", "Dış mekânda yüksüğü yukarı yerleştirme prensibi."],
 ["Yank testi", "Bağlantı sonrası teli çekerek sağlamlık kontrolü."],
 ["Periyot / Frekans", "T süresi; f = 1/T (Hz)."],
 ["RMS", "Etkin değer; Vrms = Vmax/√2."],
 ["Clash detection", "Disiplinler arası çakışma tespiti (BIM)."]
];
