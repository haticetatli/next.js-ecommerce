# 🛒 Modern Full-Stack E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-purple?style=for-the-badge&logo=auth0&logoColor=white)](https://next-auth.js.org/)

Modern, performanslı ve ölçeklenebilir bir tam yığın (Full-Stack) E-Ticaret web uygulaması. Next.js App Router mimarisi, Prisma ORM, MongoDB Atlas ve NextAuth entegrasyonu ile geliştirilmiştir.

---

## 🚀 Özellikler (Features)

### 🔐 Kimlik Doğrulama & Güvenlik (Authentication & Authorization)
- **NextAuth.js** ile güvenli oturum yönetimi.
- **Google OAuth** ile tek tıkla sosyal giriş.
- **E-posta & Şifre** ile klasik kayıt/giriş mekanizması.
- **Bcrypt** ile güvenli şifre hash'leme.
- Rol tabanlı yetkilendirme sistemi (`USER` ve `ADMIN`).

### 🛍️ Ürün Kataloğu & Alışveriş Deneyimi
- Dinamik ürün listeleme ve kategori bazlı filtreleme.
- Anlık arama (Search) ve vitrin banner alanı.
- Detaylı ürün sayfası (`/product/[id]`), stok durumu ve ürün özellikleri.
- Müşteri yorumları ve puanlama (Star Rating & Review) sistemi.

### 🧺 Sepet Yönetimi (Shopping Cart)
- Sepete ürün ekleme, çıkarma ve miktar güncelleme.
- Anlık fiyat ve toplam tutar hesaplama.
- Responsive sepet çekmecesi ve sepet sayacı.

### 🛠️ Yönetici Paneli (Admin Dashboard)
- Yöneticilere özel sidebar ve navigasyon.
- Yeni ürün ekleme formu (başlık, açıklama, kategori, marka, fiyat, görsel URL, stok durumu).
- Ürün kataloğunu yönetme ve güncelleme paneli.

---

## 🏗️ Teknoloji Yığını (Tech Stack)

| Alan | Teknoloji | Açıklama |
|---|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript | Modern bileşen mimarisi & Server Components |
| **Stil / Tasarım** | Tailwind CSS, Material UI (@mui/material) | Duyarlı (Responsive) ve modern UI bileşenleri |
| **Backend / API** | Next.js App Router, Route Handlers, Server Actions | Optimize edilmiş sunucu tarafı veri yönetimi |
| **Veritabanı & ORM** | MongoDB Atlas, Prisma ORM | NoSQL bulut veritabanı ve tip güvenli sorgular |
| **Kimlik Doğrulama** | NextAuth.js, Bcrypt | Güvenli JWT oturumları ve Google Provider |
| **Depolama** | Firebase / Cloud Storage | Ürün ve profil görselleri yönetimi |

---

## 📂 Proje Yapısı (Directory Structure)

```text
├── app/
│   ├── actions/          # Sunucu taraflı eylemler (Server Actions)
│   ├── admin/            # Yönetici paneli ve ürün yönetimi sayfaları
│   ├── api/              # Next.js API Route Handlers (auth, products vb.)
│   ├── cart/             # Sepet sayfası ve sepet state yönetimi
│   ├── login/            # Kullanıcı giriş sayfası
│   ├── product/          # Ürün detay sayfaları ([id])
│   ├── register/         # Kullanıcı kayıt sayfası
│   └── components/       # Yeniden kullanılabilir UI bileşenleri
│       ├── admin/        # Admin Sidebar ve paneller
│       ├── auth/         # Login & Register Client bileşenleri
│       ├── cart/         # Sepet bileşeni
│       ├── detail/       # Ürün detay ve yorum bileşenleri
│       ├── general/      # Buton, input, avatar vb. atomik bileşenler
│       ├── home/         # Banner, kategori ve ürün kartları
│       └── navbar/       # Arama, sepet sayacı, menü ve kullanıcı profili
├── hooks/                # Özel React kancaları (Custom Hooks - useCart vb.)
├── libs/                 # Prisma istemcisi ve ortak yardımcı kütüphaneler
├── prisma/
│   └── schema.prisma     # MongoDB veri modelleri (User, Product, Review, Account)
├── provider/             # Tema, Auth ve Toast Context sağlayıcıları
└── public/               # Statik görsel ve ikon varlıkları
```

---

## ⚙️ Kurulum ve Çalıştırma (Getting Started)

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/haticetatli/<repo-adi>.git
cd <repo-adi>
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini (Environment Variables) Ayarlayın
Kök dizinde `.env.example` dosyasını referans alarak bir `.env` dosyası oluşturun:
```bash
cp .env.example .env
```
Ardından `.env` dosyasını kendi bilgilerinize göre doldurun:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/shop?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your_nextauth_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 4. Prisma İstemcisini Oluşturun
```bash
npx prisma generate
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızdan `http://localhost:3000` adresini açarak uygulamayı görüntüleyebilirsiniz.

---

## 🗄️ Veritabanı Modelleri (Prisma Schema)

* **User:** Kullanıcı bilgileri, şifre hash'i, rol (`USER` / `ADMIN`), hesaplar ve yorum ilişkileri.
* **Product:** Ürün adı, açıklama, marka, kategori, fiyat, stok durumu, görsel ve yorumlar.
* **Review:** Kullanıcı derecelendirmesi (1-5 puan), yorum metni ve ürün-kullanıcı bağıntısı.
* **Account:** NextAuth OAuth sağlayıcı bilgileri (Google).

---

## 👩‍💻 Geliştirici

**Hatice Tatlı**  
* 🎓 Bilgisayar Mühendisi (Computer Engineer)
* 🌐 GitHub: [@haticetatli](https://github.com/haticetatli)
