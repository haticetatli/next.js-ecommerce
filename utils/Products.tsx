export const products = [
  // ==================== TELEFON ====================
  {
    id: "prod-tel-1",
    name: "Apple iPhone 16 Pro Max 256GB Çöl Titanyum",
    description:
      "A18 Pro çip, 48 MP Fusion kamera, Kamera Denetimi ve havacılık standartlarında titanyum tasarım. 6.9 inç Super Retina XDR ekran ve gün boyu süren gelişmiş pil ömrü.",
    price: 102999,
    brand: "Apple",
    category: "Telefon",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-tel-1",
        rating: 5,
        comment: "Kamera ve batarya performansı harika! Çöl titanyumu rengi muazzam görünüyor.",
        createdDate: "2025-01-14T10:20:00.000Z",
        user: { name: "Eren Yılmaz", image: null },
      },
    ],
  },
  {
    id: "prod-tel-2",
    name: "Apple iPhone 16 128GB Pembe",
    description:
      "A18 çip, yeni Kamera Denetimi, 48 MP Fusion kamera ve gelişmiş renkli arka cam tasarım. USB-C bağlantısı ve dinamik ada.",
    price: 59000,
    brand: "Apple",
    category: "Telefon",
    inStock: true,
    image:
      "https://productimages.hepsiburada.net/s/777/424-600/110000767686501.jpg/format:webp",
    reviews: [
      {
        id: "rev-tel-2",
        rating: 5,
        comment: "Rengi çok tatlı, günlük kullanımda inanılmaz akıcı.",
        createdDate: "2025-02-01T14:15:00.000Z",
        user: { name: "Selin Kaya", image: null },
      },
    ],
  },
  {
    id: "prod-tel-3",
    name: "Samsung Galaxy S24 Ultra 512GB Titanyum Gri",
    description:
      "Galaxy AI özellikleri, yerleşik S Pen, 200 MP ana kamera, Snapdragon 8 Gen 3 işlemci ve 120Hz parlak Dynamic AMOLED 2X ekran.",
    price: 74999,
    brand: "Samsung",
    category: "Telefon",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-tel-3",
        rating: 5,
        comment: "Ekran yansımasız cam sayesinde güneşte bile mükemmel netlik sunuyor. Yapay zeka tercüme özelliği hayat kurtarıcı.",
        createdDate: "2025-01-20T09:00:00.000Z",
        user: { name: "Murat Demir", image: null },
      },
    ],
  },
  {
    id: "prod-tel-4",
    name: "Xiaomi 14 Ultra 512GB Leica Dörtlü Kamera",
    description:
      "Leica Summilux optik lens sistemi, 1 inç sensör, Snapdragon 8 Gen 3 çipset ve 90W HyperCharge hızlı şarj desteği.",
    price: 58999,
    brand: "Xiaomi",
    category: "Telefon",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-tel-5",
    name: "Google Pixel 8 Pro 128GB Obsidian Siyah",
    description:
      "Google Tensor G3 işlemci, profesyonel üçlü arka kamera, yapay zeka fotoğraf düzenleme araçları ve saf Android 14 deneyimi.",
    price: 39500,
    brand: "Google",
    category: "Telefon",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-tel-5",
        rating: 4,
        comment: "Kamera yapay zekası inanılmaz, stokta bulunca kaçırmayın.",
        createdDate: "2024-12-11T18:30:00.000Z",
        user: { name: "Canan Aksoy", image: null },
      },
    ],
  },

  // ==================== LAPTOP ====================
  {
    id: "prod-lap-1",
    name: "Apple MacBook Pro 14 M4 Pro 24GB 512GB Uzay Siyahı",
    description:
      "Yeni nesil 14 çekirdekli M4 Pro çip, 24GB birleşik bellek, Liquid Retina XDR ekran, Thunderbolt 5 desteği ve 24 saate varan pil ömrü.",
    price: 100000,
    brand: "Apple",
    category: "Laptop",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-lap-1",
        rating: 5,
        comment: "Yazılım geliştirme ve video kurgu için piyasanın en güçlü ve sessiz canavarı.",
        createdDate: "2025-01-05T12:00:00.000Z",
        user: { name: "Ahmet Vural", image: null },
      },
    ],
  },
  {
    id: "prod-lap-2",
    name: "Apple MacBook Air M2 16GB 256GB Gece Yarısı",
    description:
      "Yalnızca 1.24 kg hafifliğinde gövde, 13.6 inç Liquid Retina ekran, MagSafe şarj, fansız sessiz çalışma ve 18 saat pil ömrü.",
    price: 38999,
    brand: "Apple",
    category: "Laptop",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-lap-2",
        rating: 5,
        comment: "Üniversite ve ofis işleri için kesinlikle en iyi seçenek, şarjı 2 gün rahat gidiyor.",
        createdDate: "2025-01-18T16:45:00.000Z",
        user: { name: "Gizem Çetin", image: null },
      },
    ],
  },
  {
    id: "prod-lap-3",
    name: "ASUS ROG Zephyrus G16 OLED Intel Core Ultra 9 32GB RTX 4080",
    description:
      "2.5K 240Hz ROG Nebula OLED ekran, NVIDIA GeForce RTX 4080 12GB grafik kartı, 1TB NVMe PCIe 4.0 SSD ve ince CNC alüminyum kasa.",
    price: 94999,
    brand: "ASUS",
    category: "Laptop",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-lap-3",
        rating: 5,
        comment: "Hem profesyonel mühendislik simülasyonları hem 4K ultra oyunlar için mükemmel.",
        createdDate: "2025-02-10T11:20:00.000Z",
        user: { name: "Kaan Arslan", image: null },
      },
    ],
  },
  {
    id: "prod-lap-4",
    name: "Dell XPS 15 9530 Intel Core i7 32GB 1TB SSD RTX 4060",
    description:
      "3.5K OLED InfinityEdge dokunmatik ekran, Waves MaxxAudio ses sistemi, CNC işlenmiş alüminyum ve karbon fiber gövde.",
    price: 68500,
    brand: "Dell",
    category: "Laptop",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-lap-5",
    name: "Lenovo ThinkPad X1 Carbon Gen 11 Intel i7 16GB 512GB",
    description:
      "Askeri standartlarda dayanıklılık (MIL-STD 810H), efsanevi ThinkPad klavye hissiyatı, 1.12 kg ultra hafif gövde ve parmak izi güvenliği.",
    price: 54900,
    brand: "Lenovo",
    category: "Laptop",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },

  // ==================== SAAT ====================
  {
    id: "prod-wat-1",
    name: "Apple Watch Series 9 GPS 45mm Yıldız Işığı",
    description:
      "S9 SiP işlemci ile Çift Dokunma (Double Tap) hareketi, 2000 nit parlak ekran, EKG, kanda oksijen ölçümü ve sıcaklık sensörü.",
    price: 21499,
    brand: "Apple",
    category: "Saat",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-wat-1",
        rating: 5,
        comment: "Çift dokunma hareketi eliniz doluyken aramalara cevap vermek için harika!",
        createdDate: "2025-01-25T15:30:00.000Z",
        user: { name: "Büşra Yıldız", image: null },
      },
    ],
  },
  {
    id: "prod-wat-2",
    name: "Apple Watch Ultra 2 Titanyum Kasa GPS + Cellular 49mm",
    description:
      "Havacılık ve uzay sınıfı titanyum gövde, 3000 nit ekstrem ekran parlaklığı, 100m suya dayanıklılık, dalış bilgisayarı ve 72 saat pil ömrü.",
    price: 45999,
    brand: "Apple",
    category: "Saat",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-wat-2",
        rating: 5,
        comment: "Outdoor sporları ve trekking için tam bir canavar. Dayanıklılığı şaka gibi.",
        createdDate: "2025-02-04T08:12:00.000Z",
        user: { name: "Tolga Sezgin", image: null },
      },
    ],
  },
  {
    id: "prod-wat-3",
    name: "Samsung Galaxy Watch 6 Classic 47mm Dönen Çerçeveli",
    description:
      "İkonik döner bezelli safir cam kadran, Biyoelektrik Empedans Analizi (BIA) vücut kompozisyonu ölçümü, uyku koçluğu ve Wear OS.",
    price: 8999,
    brand: "Samsung",
    category: "Saat",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-wat-3",
        rating: 4,
        comment: "Mekanik hissi veren döner çerçevesi çok zevkli, şarjı 1.5 gün gidiyor.",
        createdDate: "2024-12-28T19:00:00.000Z",
        user: { name: "Emre Koç", image: null },
      },
    ],
  },
  {
    id: "prod-wat-4",
    name: "Huawei Watch GT 4 Pro Paslanmaz Çelik Kordon",
    description:
      "Sekizgen şık tasarım, TruSeen 5.5+ kalp atış hızı takibi, SpO2, kalori takibi ve 14 güne kadar kesintisiz pil ömrü.",
    price: 11499,
    brand: "Huawei",
    category: "Saat",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-wat-5",
    name: "Garmin Fenix 7X Sapphire Solar Titanyum GPS Spor Saati",
    description:
      "Power Sapphire güneş enerjisiyle şarj camı, dahili LED fener, TopoActive haritalar ve ekstrem arazi dayanıklılığı.",
    price: 34500,
    brand: "Garmin",
    category: "Saat",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },

  // ==================== AKSESUAR ====================
  {
    id: "prod-acc-1",
    name: "Apple AirPods Pro 2. Nesil USB-C MagSafe Şarj Kutulu",
    description:
      "H2 çip, 2 kat daha güçlü Aktif Gürültü Engelleme (ANC), Şeffaf Mod, Kişiselleştirilmiş Uzamsal Ses ve toza/suya dayanıklı IP54 tasarım.",
    price: 9499,
    brand: "Apple",
    category: "Aksesuar",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-acc-1",
        rating: 5,
        comment: "Uçakta ve ofiste gürültüyü bıçak gibi kesiyor. Ses kalitesi harika!",
        createdDate: "2025-01-30T17:40:00.000Z",
        user: { name: "Zeynep Doğan", image: null },
      },
    ],
  },
  {
    id: "prod-acc-2",
    name: "Sony WH-1000XM5 Kablosuz ANC Kulak Üstü Kulaklık Gümüş",
    description:
      "Sektör lideri gürültü engelleme, 8 mikrofonlu sistem, Auto NC Optimizer, Hi-Res Audio kablosuz ses ve 30 saat pil ömrü.",
    price: 14499,
    brand: "Sony",
    category: "Aksesuar",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-acc-2",
        rating: 5,
        comment: "Kulağı hiç yormuyor, ses sahnesi çok geniş ve baslar doyurucu.",
        createdDate: "2025-02-12T13:25:00.000Z",
        user: { name: "Oğuzhan Tekin", image: null },
      },
    ],
  },
  {
    id: "prod-acc-3",
    name: "Anker Prime 20.000mAh 200W PowerBank Akıllı Ekranlı",
    description:
      "Aynı anda 2 laptopu ultra hızlı şarj edebilen 200W toplam çıkış, dijital LCD durum ekranı ve kompakt Power Delivery 3.0 teknolojisi.",
    price: 3699,
    brand: "Anker",
    category: "Aksesuar",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-acc-4",
    name: "Belkin MagSafe 3'ü 1 Arada 15W Hızlı Kablosuz Şarj Standı",
    description:
      "iPhone, Apple Watch ve AirPods için aynı anda tek stand üzerinden orijinal 15W MagSafe hızlı şarj imkanı. Şık paslanmaz çelik ayak.",
    price: 4999,
    brand: "Belkin",
    category: "Aksesuar",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-acc-5",
    name: "Logitech MX Master 3S Bluetooth Lazer Mouse Grafit",
    description:
      "8000 DPI Quiet Click sessiz tuşlar, MagSpeed elektromanyetik tekerlek, ergonomik avuç içi formu ve cam dahil her yüzeyde çalışma.",
    price: 3999,
    brand: "Logitech",
    category: "Aksesuar",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },

  // ==================== AYAKKABI ====================
  {
    id: "prod-sho-1",
    name: "Nike Air Jordan 1 Retro High OG Chicago Lost & Found",
    description:
      "Efsanevi basketbol ikonu, vintage deri kaplama, Air-Sole topuk yastıklaması ve klasik kırmızı-siyah-beyaz renk bloğu.",
    price: 8499,
    brand: "Nike",
    category: "Ayakkabı",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-sho-1",
        rating: 5,
        comment: "Koleksiyonumun en değerli parçası oldu. Kalıbı tam, kalitesi üst düzey.",
        createdDate: "2025-01-08T11:00:00.000Z",
        user: { name: "Barış Gündüz", image: null },
      },
    ],
  },
  {
    id: "prod-sho-2",
    name: "Nike Air Zoom Pegasus 40 Yol Koşu Ayakkabısı",
    description:
      "Çift Zoom Air birimi, React köpük teknolojisi, nefes alabilen özel file saya ve enerji geri dönüşümü sunan dayanıklı kauçuk taban.",
    price: 4899,
    brand: "Nike",
    category: "Ayakkabı",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-sho-2",
        rating: 5,
        comment: "Haftalık maraton antrenmanlarımda kullanıyorum, dizlere binen yükü inanılmaz azaltıyor.",
        createdDate: "2025-02-09T08:45:00.000Z",
        user: { name: "Merve Polat", image: null },
      },
    ],
  },
  {
    id: "prod-sho-3",
    name: "Adidas Ultraboost Light Sneaker Cloud White",
    description:
      "En hafif Boost kapsül taban, Primeknit+ ayağı saran kumaş saya, Continental kauçuk dış taban ve %30 daha az karbon ayak izi.",
    price: 5499,
    brand: "Adidas",
    category: "Ayakkabı",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-sho-4",
    name: "New Balance 9060 Unisex Retro Fütüristik Sneaker Gri",
    description:
      "Y2K estetiği ve klasik 99X serisi tasarımından ilham alan ABZORB ve SBS yastıklamalı ikonik chunky taban silüeti.",
    price: 7299,
    brand: "New Balance",
    category: "Ayakkabı",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-sho-4",
        rating: 5,
        comment: "Hem sokak stili hem inanılmaz rahat bir taban. Gün boyu ayaktaysanız kesinlikle tavsiye.",
        createdDate: "2025-01-22T19:30:00.000Z",
        user: { name: "Derya Şimşek", image: null },
      },
    ],
  },
  {
    id: "prod-sho-5",
    name: "Puma Slipstream Leather Retro Sneaker Beyaz/Yeşil",
    description:
      "80'lerin nostaljik basketbol mirası, hakiki deri saya, süet katmanlar ve dayanıklı vulkanize kauçuk taban yapısı.",
    price: 3299,
    brand: "Puma",
    category: "Ayakkabı",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },

  // ==================== ÇANTA ====================
  {
    id: "prod-bag-1",
    name: "Samsonite Guardit 2.0 15.6 inç Laptop Sırt Çantası",
    description:
      "Polyester suya dayanıklı doku, özel dolgulu laptop ve tablet bölmeleri, akıllı kılıf bavul askısı ve organizasyon cepleri.",
    price: 3499,
    brand: "Samsonite",
    category: "Çanta",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-bag-1",
        rating: 5,
        comment: "İş seyahatlerimde bilgisayar ve aksesuarlarımı güvenle taşıyorum. Çok ergonomik ve kaliteli.",
        createdDate: "2025-01-16T14:10:00.000Z",
        user: { name: "Volkan Erdem", image: null },
      },
    ],
  },
  {
    id: "prod-bag-2",
    name: "Herschel Little America Klasik Dağcı Sırt Çantası 25L",
    description:
      "İkonik manyetik deri kayışlar, polar astarlı 15 inç laptop kılıfı, büzgülü kordon kapama ve nefes alan hava kanallı sırt desteği.",
    price: 4799,
    brand: "Herschel",
    category: "Çanta",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-bag-2",
        rating: 5,
        comment: "Hem şehir içi hem hafta sonu kampları için çok havalı ve geniş bir çanta.",
        createdDate: "2025-02-02T10:00:00.000Z",
        user: { name: "Aslı Tezcan", image: null },
      },
    ],
  },
  {
    id: "prod-bag-3",
    name: "Eastpak Padded Pak'r Günlük Sırt Çantası Siyah",
    description:
      "Dayanıklı Cordura kumaş, ikonik fermuarlı ön cep, dolgulu omuz askıları ve günlük 24 litrelik pratik taşıma kapasitesi.",
    price: 2299,
    brand: "Eastpak",
    category: "Çanta",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-bag-4",
    name: "Thule Subterra 30L Seyahat ve Laptop Sırt Çantası",
    description:
      "PowerPocket kablo yönetim sistemi, SafeZone darbe emici gözlük bölmesi, nefes alabilen EVA omuz askıları ve su itici kumaş.",
    price: 6199,
    brand: "Thule",
    category: "Çanta",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=600&auto=format&fit=crop&q=80",
    reviews: [],
  },
  {
    id: "prod-bag-5",
    name: "Tommy Hilfiger Hakiki Deri Postacı Omuz Çantası Taba",
    description:
      "Birinci sınıf eskitme deri, ayarlanabilir monogram dokuma omuz askısı, tablet bölmesi ve şık metal TH logo detayı.",
    price: 4499,
    brand: "Tommy Hilfiger",
    category: "Çanta",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    reviews: [
      {
        id: "rev-bag-5",
        rating: 5,
        comment: "Deri kalitesi mükemmel, takım elbiseyle de günlük kıyafetle de çok şık duruyor.",
        createdDate: "2024-12-19T13:40:00.000Z",
        user: { name: "Kemal Uçar", image: null },
      },
    ],
  },
];
