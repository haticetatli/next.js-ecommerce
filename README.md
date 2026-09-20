# Tatli.com - Modern Full-Stack E-Ticaret Platformu

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)](https://vitest.dev/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-8E44AD?style=for-the-badge&logo=auth0&logoColor=white)](https://next-auth.js.org/)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/haticetatli/next.js-ecommerce/actions)

<p align="center">
  <strong>Next.js 15 App Router, React 19, TypeScript ve Tailwind CSS v4 ile geliştirilmiş üretime hazır tam kapsamlı e-ticaret platformu.</strong>
</p>

<p align="center">
  <a href="#proje-özeti">Proje Özeti</a> •
  <a href="#sistem-mimarisi">Sistem Mimarisi</a> •
  <a href="#temel-fonksiyonel-modüller">Temel Modüller</a> •
  <a href="#teknoloji-yığını">Teknoloji Yığını</a> •
  <a href="#otomatik-birim-testleri">Birim Testleri</a> •
  <a href="#yerel-kurulum--çalıştırma">Kurulum Rehberi</a> •
  <a href="#geliştirici--iletişim">İletişim</a>
</p>

</div>

---

## Proje Özeti

Tatli.com, **Hatice Tatlı** tarafından modern web mimarisi standartları gözetilerek geliştirilmiş, kurumsal seviyede bir full-stack e-ticaret platformudur. Temiz mimari (Clean Architecture), katı TypeScript tip güvenliği, sıfır kesinti toleranslı veri yedekleme katmanı ve kullanıcı odaklı UI/UX tasarımıyla uçtan uca eksiksiz bir yazılım mühendisliği portföy çalışması sunar.

Platform; 6 farklı kategoride zenginleştirilmiş 30 ürünlük katalog, tarayıcı URL parametreleriyle gerçek zamanlı senkronize çalışan arama ve çok kriterli sıralama mekanizması, baremli ücretsiz kargo hesaplayıcısı, interaktif kupon ve promosyon motoru, yazdırılabilir makbuz destekli çok adımlı sipariş tamamlama süreci, yönetim paneli (Backoffice) ve canlı sipariş kargo takip zaman çizelgesi gibi modern e-ticaret gereksinimlerinin tümünü bünyesinde barındırır.

---

## Sistem Mimarisi

```mermaid
flowchart TD
    subgraph IstemciKatmani ["İstemci Sunum Katmanı (Tarayıcı)"]
        UI["Tailwind CSS v4 Duyarlı Arayüz"]
        CartStore["useCart Hook (LocalStorage + Kupon Motoru)"]
        Wishlist["Favoriler Durumu (Özel Window Event)"]
        FilterEngine["URL Senkronize Arama & Filtreleme"]
    end

    subgraph AppRouterKatmani ["Next.js 15 App Router Katmanı"]
        HomePage["/ (Vitrin, Kategoriler & Ürün Izgarası)"]
        ProductPage["/product/:id (Detay, Özellikler & Yorumlar)"]
        CartPage["/cart (Kargo İlerlemesi & İndirim Kuponları)"]
        CheckoutPage["/checkout (Adres & Teslimat Sihirbazı)"]
        SuccessPage["/checkout/success (Yazdırılabilir Sipariş Fişi)"]
        TrackPage["/tracking (İnteraktif Kargo Takip Çizelgesi)"]
        AdminArea["/admin & /admin/products (Yönetim Paneli)"]
        Corporate["/about, /contact, /faq, /returns, /deals"]
    end

    subgraph SunucuKatmani ["Sunucu API Uç Noktaları"]
        ProductsAPI["/api/products (GET, POST)"]
        ProductDetailAPI["/api/products/:id (GET, PUT, DELETE)"]
        RegisterAPI["/api/register (POST)"]
        AuthRoute["/api/auth/[...nextauth]"]
    end

    subgraph VeriDayanikligi ["Otomatik Dayanıklılık Destekli Veri Katmanı"]
        PrismaClient["Prisma ORM 6.1"]
        MongoAtlas[("MongoDB Atlas Bulut Kümesi")]
        InMemoryStore[("Bellek İçi Yerel Yedek Veri Deposu")]
    end

    UI --> AppRouterKatmani
    CartStore --> CartPage
    CartStore --> CheckoutPage
    Wishlist --> AppRouterKatmani
    FilterEngine --> HomePage
    AppRouterKatmani --> SunucuKatmani
    SunucuKatmani --> PrismaClient
    PrismaClient -->|Birincil: Bulut Kümesi Aktif| MongoAtlas
    PrismaClient -.->|Yedekleme: Ağ veya DNS Zaman Aşımı| InMemoryStore
```

---

## Temel Fonksiyonel Modüller

### 1. Zengin Ürün Kataloğu (30 Adet Ürün)
- 6 yapılandırılmış kategori: Telefon, Laptop, Saat, Aksesuar, Ayakkabı ve Çanta (her kategoride 5 detaylı ürün).
- Harici HTTPS CDN bağlantılarını, yerel statik varlıkları ve Base64 formatlarını kümülatif düzen kayması (CLS) olmadan işleyen evrensel görsel bağdaştırıcısı.
- Gerçekçi fiyatlandırma, teknik açıklamalar, dinamik stok durumu ve müşteri değerlendirme puanları.

### 2. URL ile Senkronize Arama, Filtreleme ve Sıralama
- Next.js yerel URL parametreleri (`?category=...&search=...`) ile tam senkronize çalışan, oturumlar arası paylaşılabilir ve yer imlerine eklenebilir filtre durumu.
- Çoklu sıralama algoritmaları:
  - Fiyata Göre: Artan (En Düşük)
  - Fiyata Göre: Azalan (En Yüksek)
  - En Yüksek Müşteri Puanı
  - Alfabetik Sıralama: A'dan Z'ye
  - Öne Çıkan Ürünler
- Sıfır gecikmeli "Sadece Stoktakiler" filtre anahtarı.
- Türkçe ve İngilizce kategori etiketlerini otomatik eşleyen normalizasyon altyapısı.

### 3. Alışveriş Sepeti & Dinamik Kupon Motoru
- 500 TL üzeri siparişlerde otomatik devreye giren baremli ücretsiz kargo ilerleme çubuğu.
- İnteraktif promosyon kodu doğrulama sistemi:
  - `TATLI10`: Sepet toplamına anında %10 indirim uygular.
  - `TATLI20`: 1.000 TL ve üzeri sepetlerde %20 indirim sağlar.
  - `KARGO`: 49,90 TL kargo ücretini sıfırlar.
- SSR hidrasyon hatalarını engelleyen `isMounted` denetimli yerel depolama modeli.

### 4. Çok Adımlı Sipariş Tamamlama (Checkout) & Makbuz
- Alıcı adres doğrulama (Ad Soyad, Telefon, İl, İlçe ve Açık Adres kontrolü).
- Standart Teslimat veya Hızlı Kargo seçenekleri.
- Güvenli 3D Secure kredi kartı ödeme simülasyonu.
- Sipariş onay ekranı (`/checkout/success`) üzerinden alfanümerik takip kodu üretimi (`#TAT-XXXXXX`), tahmini teslimat tarihi gösterimi ve tek tıkla yazdırılabilir profesyonel sipariş fişi.

### 5. İnteraktif Kargo Takip Sistemi (`/tracking`)
- Takip numarası veya kayıtlı telefon numarası ile anlık kargo durumu sorgulama.
- 5 aşamalı görsel lojistik zaman çizelgesi: Sipariş Alındı, Hazırlanıyor & Paketleniyor, Kargoya Verildi, Dağıtımda, Teslim Edildi.
- Test amaçlı tek tıkla otomatik doldurulan örnek takip kodları.

### 6. Kalıcı Favoriler Listesi (`/favorites`)
- Ürün kartları ve detay sayfalarında tarayıcı belleğine (LocalStorage) kaydedilen favori butonu.
- Bağımsız bileşenler arasında navbar sayaçlarını anında senkronize eden özel `window` etkinlikleri.
- Beğenilen ürünleri favoriler ekranından doğrudan sepete taşıma desteği.

### 7. Yönetim Paneli & Envanter Kontrolü (`/admin`)
- Özet metrik paneli: Toplam Ciro, Toplam Sipariş, Aktif Ürün Sayısı ve Kayıtlı Kullanıcı Adedi.
- Canlı arama, stok açma/kapama, modal üzerinden anlık ürün güncelleme ve silme desteği sunan envanter yönetim tablosu.
- Yeni ürün ekleme sihirbazı (`/admin/products/new`) ve gerçek zamanlı görsel önizleme alanı.

### 8. Kurumsal Bilgi & Müşteri Hizmetleri Sayfaları
- Kurumsal (`/about`): Şirket vizyonu, misyonu ve operasyonel güvenilirlik metrikleri.
- İletişim (`/contact`): Doğrulamalı mesaj gönderme formu, doğrudan çağrı ve e-posta kanalları.
- Kolay İade & Değişim (`/returns`): 14 gün koşulsuz iade sürecini açıklayan 4 adımlı rehber.
- Sıkça Sorulan Sorular (`/faq`): Akordeon yapısında kategorize edilmiş arama destekli soru-cevap merkezi.
- Yasal Belgeler (`/privacy`, `/terms`): KVKK ve GDPR uyumlu gizlilik sözleşmeleri.

---

## Sıfır Kesinti & Veri Katmanı Dayanıklılığı

Ücretsiz katmandaki bulut veritabanları (MongoDB Atlas gibi) zaman zaman bakım moduna geçebilir, hareketsizlik nedeniyle uykuya dalabilir veya kurumsal ağlardaki DNS kısıtlamalarına takılabilir.

Platformda kullanıcı ve test deneyiminin asla kesintiye uğramaması adına çift katmanlı dayanıklılık mimarisi uygulanmıştır:
- Prisma ORM üzerinden MongoDB Atlas kümesine bağlantı başarılıysa tüm okuma ve yazma işlemleri doğrudan bulut veritabanında yürütülür.
- Herhangi bir bağlantı gecikmesi veya DNS zaman aşımı oluşursa, API uç noktaları istekleri kesintisiz şekilde `utils/Products.tsx` tabanlı bellek içi yerel veri deposuna yönlendirir.
- Bu sayede İK uzmanları, değerlendiriciler ve otomatik test araçları hiçbir koşulda 500 sunucu hatasıyla karşılaşmaz.

---

## Otomatik Birim Testleri

Proje, **Vitest** test altyapısı ile otomatikleştirilmiş birim test paketine sahiptir:

```bash
# Birim testlerini tek seferlik çalıştır:
npm run test

# Testleri izleme (watch) modunda çalıştır:
npm run test:watch
```

### Test Kapsamı ve Detayları:
- **`tests/cartUtils.test.ts` (8 Test):**
  - Farklı ürün adetlerine göre ara toplam ve genel toplam hesaplama.
  - Baremli ücretsiz kargo eşik kontrol mekanizması.
  - Yüzdelik indirim kuponları (`TATLI10`, `TATLI20`) ve kargo muafiyeti (`KARGO`).
  - Türk Lirası (`TRY`) para birimi formatlama algoritması.
- **`tests/filterUtils.test.ts` (5 Test):**
  - Büyük/küçük harf duyarsız ve iki dilli normalizasyonlu kategori filtreleme.
  - Ürün adı, marka ve açıklama alanlarında çok kriterli metin araması.
  - Stok durumuna göre ürün ayıklama.
  - Artan ve azalan fiyat sıralama doğruluk kontrolleri.

---

## Teknoloji Yığını

| Katman | Teknoloji | Görevi ve Sorumluluğu |
|---|---|---|
| **Web Çatısı** | Next.js 15.4 (App Router) | Sunucu ve İstemci Bileşenleri, API Route Handlers, Streaming SSR |
| **Frontend Çekirdeği** | React 19.0 | Concurrent özellikler, modern hooks mimarisi |
| **Programlama Dili** | TypeScript 5.0 | Katı tip güvenliği, veri modelleri ve arayüz sözleşmeleri |
| **Stil ve Tasarım** | Tailwind CSS v4 | Yüksek performanslı CSS yardımcı sınıf mimarisi |
| **Veritabanı & ORM** | MongoDB Atlas + Prisma 6.1 | NoSQL bulut veritabanı ve tipli şema istemcisi |
| **Kimlik Doğrulama** | NextAuth.js 4 + Bcrypt | Güvenli JWT oturum yönetimi, parola hashleme |
| **Birim Testleri** | Vitest 5.0 | Yüksek hızlı modern test çalıştırma motoru |
| **Bileşen Seti** | React Icons, Material UI | İkonografi ve puanlama yıldızları bileşenleri |
| **Bildirim Sistemi** | React Hot Toast | Hafif ve duyarlı kullanıcı bildirimleri |
| **Sürekli Entegrasyon** | GitHub Actions | Otomatik derleme, lint ve test doğrulama hattı |

---

## Proje Dizin Yapısı

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Otomatik CI derleme ve test hattı
├── app/
│   ├── about/                   # Kurumsal bilgiler ve şirket vizyonu
│   ├── admin/                   # Yönetim paneli ve ürün envanter kontrolü
│   ├── api/                     # REST API sunucu uç noktaları
│   ├── cart/                    # Alışveriş sepeti ve kupon hesaplamaları
│   ├── checkout/                # Ödeme sihirbazı ve sipariş fişi üretimi
│   ├── contact/                 # Müşteri hizmetleri iletişim formu
│   ├── deals/                   # Kampanyalar ve indirim kuponları
│   ├── faq/                     # Kategorize edilmiş Sıkça Sorulan Sorular
│   ├── favorites/               # Favori ürünler listesi
│   ├── login/ & register/       # Kullanıcı giriş ve kayıt sayfaları
│   ├── privacy/ & terms/        # KVKK ve yasal sözleşmeler
│   ├── product/[productId]/     # Dinamik ürün detay sayfaları
│   ├── profile/                 # Kullanıcı profili ve sipariş geçmişi
│   ├── returns/                 # İade ve değişim süreçleri rehberi
│   ├── tracking/                # İnteraktif kargo takip ekranı
│   ├── components/              # Modüler arayüz bileşenleri
│   ├── layout.tsx               # Kök layout ve sağlayıcılar
│   └── page.tsx                 # Ana vitrin sayfası
├── hooks/
│   └── useCart.tsx              # Sepet durumu ve kupon yönetimi
├── prisma/
│   └── schema.prisma            # MongoDB veri modelleri
├── tests/                       # Otomatik Vitest test paketleri
├── types/                       # Evrensel TypeScript tip tanımları
├── utils/
│   ├── cartUtils.ts             # Finansal ve kargo hesaplama fonksiyonları
│   ├── filterUtils.ts           # Arama, filtreleme ve sıralama algoritmaları
│   └── Products.tsx             # 30 ürünlük yedek katalog veri seti
└── package.json
```

---

## Yerel Kurulum & Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/haticetatli/next.js-ecommerce.git
cd next.js-ecommerce
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Tanımlayın
Örnek ortam dosyasını kopyalayın:
```bash
cp .env.example .env
```

`.env` dosyanızı yapılandırın:
```env
DATABASE_URL="mongodb+srv://<kullanici_adi>:<parola>@cluster0.mongodb.net/shop?retryWrites=true&w=majority"
NEXTAUTH_SECRET="guvenli_nextauth_gizli_anahtari"
GOOGLE_CLIENT_ID="google_oauth_istemci_id"
GOOGLE_CLIENT_SECRET="google_oauth_istemci_parolasi"
```

*(Not: Veritabanı adresi girilmediğinde sistem dahili yerel veri yedekleme katmanında çalışmaya devam eder).*

### 4. Prisma İstemcisini Oluşturun
```bash
npx prisma generate
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızdan [http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

### 6. Canlı Sürüm Derlemesi (Production Build)
```bash
npm run build
npm run start
```

---

## Aktif Test Kuponları

| Kupon Kodu | İndirim Değeri | Kullanım Şartı |
|---|---|---|
| **`TATLI10`** | %10 İndirim | Tüm katalog ürünlerinde geçerlidir |
| **`TATLI20`** | %20 İndirim | Minimum 1.000 TL sepet tutarında geçerlidir |
| **`KARGO`** | Ücretsiz Kargo | Standart 49,90 TL kargo ücretini sıfırlar |

---

## Geliştirici & İletişim

<div align="center">

### **Hatice Tatlı**
**Bilgisayar Mühendisi & Full-Stack Yazılım Geliştirici**

[![GitHub](https://img.shields.io/badge/GitHub-haticetatli-181717?style=for-the-badge&logo=github)](https://github.com/haticetatli)
[![Email](https://img.shields.io/badge/Email-htatli158%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:htatli158@gmail.com)

*Next.js, React ve TypeScript ekosisteminde ölçeklenebilir, modern ve temiz mimarili web sistemleri geliştirme odağına sahip bilgisayar mühendisi.*

</div>

- **GitHub Profili:** [https://github.com/haticetatli](https://github.com/haticetatli)
- **Doğrudan İletişim E-Postası:** [htatli158@gmail.com](mailto:htatli158@gmail.com)
- **Temel Uzmanlık Alanları:** Next.js, React, TypeScript, Node.js, Full-Stack Web Geliştirme, Temiz Mimari.

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) kapsamında lisanslanmıştır.
