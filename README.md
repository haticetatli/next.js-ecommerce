# Tatli.com - Full-Stack E-Commerce Platform

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
  <strong>Production-ready e-commerce web application engineered with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.</strong>
</p>

<p align="center">
  <a href="#project-overview">Overview</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#key-functional-modules">Features</a> •
  <a href="#technology-stack-breakdown">Tech Stack</a> •
  <a href="#automated-unit-testing">Tests</a> •
  <a href="#local-installation--setup">Getting Started</a> •
  <a href="#author--engineering-contact">Author</a>
</p>

</div>

---

## Project Overview

Tatli.com is an enterprise-grade full-stack e-commerce web platform developed by **Hatice Tatlı**. Designed with clean architecture, strict TypeScript typing, offline-resilient data fallbacks, and modern UI/UX design patterns, the application showcases complete end-to-end web engineering capabilities.

The platform includes a curated 30-item catalog across 6 distinct categories, real-time URL query synchronized search and multi-criteria sorting, a tiered shipping progress calculator, an interactive coupon discount engine, multi-step checkout with printable receipts, an administrative backoffice, and an interactive shipment tracking timeline.

---

## System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Presentation Layer (Browser)"]
        UI["Tailwind CSS v4 Responsive Layout"]
        CartStore["useCart Hook (LocalStorage + Coupon Engine)"]
        Wishlist["Wishlist State (Custom Window Events)"]
        FilterEngine["URL Sync Search & Filter Utilities"]
    end

    subgraph AppRouterLayer ["Next.js 15 App Router"]
        HomePage["/ (Showcase, Categories & Products Grid)"]
        ProductPage["/product/:id (Detail, Specs & Reviews)"]
        CartPage["/cart (Shipping Progress & Coupons)"]
        CheckoutPage["/checkout (Address & Delivery Wizard)"]
        SuccessPage["/checkout/success (Printable Order Receipt)"]
        TrackPage["/tracking (Interactive Shipment Timeline)"]
        AdminArea["/admin & /admin/products (Backoffice Suite)"]
        Corporate["/about, /contact, /faq, /returns, /deals"]
    end

    subgraph BackendLayer ["Backend Route Handlers"]
        ProductsAPI["/api/products (GET, POST)"]
        ProductDetailAPI["/api/products/:id (GET, PUT, DELETE)"]
        RegisterAPI["/api/register (POST)"]
        AuthRoute["/api/auth/[...nextauth]"]
    end

    subgraph DataResilience ["Data Layer with Automatic Resilience"]
        PrismaClient["Prisma ORM 6.1"]
        MongoAtlas[("MongoDB Atlas Cloud Cluster")]
        InMemoryStore[("In-Memory Local Resilient Fallback")]
    end

    UI --> AppRouterLayer
    CartStore --> CartPage
    CartStore --> CheckoutPage
    Wishlist --> AppRouterLayer
    FilterEngine --> HomePage
    AppRouterLayer --> BackendLayer
    BackendLayer --> PrismaClient
    PrismaClient -->|Primary: Cluster Active| MongoAtlas
    PrismaClient -.->|Fallback: Network or DNS Timeout| InMemoryStore
```

---

## Key Functional Modules

### 1. Multi-Category Product Catalog (30 Products)
- Six structured categories: Phones, Laptops, Smartwatches, Audio Accessories, Shoes, and Backpacks (5 products per category).
- Universal image adapter supporting external HTTPS CDN links, relative static assets, and Base64 strings without cumulative layout shift.
- Realistic pricing, technical descriptions, stock status indicators, and customer review scores.

### 2. URL-Synchronized Search, Filter & Sort Engine
- Native Next.js URL parameter synchronization (`?category=...&search=...`) ensuring query states are bookmarkable and shareable across sessions.
- Multi-criteria sorting:
  - Price: Low to High
  - Price: High to Low
  - Highest Customer Rating
  - Alphabetical: A to Z
  - Featured Items
- Instant in-stock filter toggle with zero latency.
- Bilingually normalized category matching (supporting both Turkish and English labels).

### 3. Shopping Cart & Dynamic Coupon Engine
- Threshold-based free shipping progress indicator (configured for orders over 500 TRY).
- Interactive promo code validation:
  - `TATLI10`: Applies 10% discount to the cart total.
  - `TATLI20`: Applies 20% discount on carts valued at 1,000 TRY or higher.
  - `KARGO`: Eliminates the 49.90 TRY shipping charge.
- SSR hydration-safe storage model using custom `isMounted` guards to prevent hydration mismatches.

### 4. Multi-Step Checkout & Order Fulfillment
- Recipient address validation (Full Name, Phone, City, District, and Street Address).
- Shipping method selection between Standard Carrier Delivery and Express Courier Service.
- Simulated 3D Secure credit card payment authorization.
- Printable order confirmation screen (`/checkout/success`) providing alphanumeric tracking codes (e.g., `#ORD-829143-TR`), estimated arrival windows, and itemized receipts.

### 5. Interactive Shipment Tracking (`/tracking`)
- Real-time parcel status inquiry by order identifier or phone number.
- Five-stage logistics timeline: Order Placed, Preparing & Packing, Handed to Carrier, Out for Delivery, Delivered.
- One-click test chips for instant demonstration.

### 6. Persistent Wishlist (`/favorites`)
- Client-side heart toggle on product cards with browser storage persistence.
- Custom window event broadcasting that updates navbar badge counters across independent components.
- Direct transfer of favorited products into the active shopping cart.

### 7. Administrative Backoffice Suite (`/admin`)
- Metric summary cards: Total Revenue, Total Orders, Active Catalog Items, and User Count.
- Inventory control table with live search, stock status toggles, in-place edit modals, and delete confirmations.
- Dedicated product creation wizard (`/admin/products/new`) with live image preview.

### 8. Corporate & Customer Support Suite
- Company Profile (`/about`): Corporate history, mission, vision, and operational metrics.
- Support & Inquiry (`/contact`): Validated messaging form, customer service hotline, and location data.
- Returns Policy (`/returns`): Step-by-step 14-day return and exchange guidelines.
- Help Center (`/faq`): Categorized accordion view addressing common buyer inquiries.
- Legal Documentation (`/privacy`, `/terms`): KVKK and GDPR compliant terms and privacy statements.

---

## Zero-Downtime Data Layer Resilience

Cloud database instances (such as free-tier MongoDB Atlas clusters) may undergo maintenance, pause during inactivity, or encounter DNS resolution delays in corporate networks. 

To eliminate single points of failure, Tatli.com implements a resilient fallback architecture:
- If Prisma successfully establishes a connection to MongoDB Atlas, all read and write queries execute against the cloud cluster.
- If a connection timeout or DNS error occurs, the API route handlers automatically route requests to an in-memory replica store initialized from `utils/Products.tsx`.
- This ensures that recruiters, visitors, and automated test runners experience zero downtime or 500 errors.

---

## Automated Unit Testing

The repository maintains an automated test suite executed via **Vitest**:

```bash
# Run unit tests once:
npm run test

# Run unit tests in watch mode:
npm run test:watch
```

### Test Coverage Summary:
- **`tests/cartUtils.test.ts` (8 Tests):**
  - Subtotal computation across varying item quantities.
  - Free shipping threshold qualification logic.
  - Percentage discount coupons (`TATLI10`, `TATLI20`) and shipping waivers (`KARGO`).
  - Turkish Lira (`TRY`) currency formatting.
- **`tests/filterUtils.test.ts` (5 Tests):**
  - Case-insensitive category filtering with bilingual normalization.
  - Multi-attribute text search across product names, brands, and descriptions.
  - Stock availability isolation.
  - Ascending and descending price ordering algorithms.

---

## Technology Stack Breakdown

| Layer | Technology | Function |
|---|---|---|
| **Framework** | Next.js 15.4 (App Router) | Server and Client Components, API Route Handlers, Streaming SSR |
| **Frontend Core** | React 19.0 | Concurrent features, hooks, component architecture |
| **Language** | TypeScript 5.0 | Strict type safety across domain models, API payloads, and state |
| **Styling** | Tailwind CSS v4 | High-performance CSS utility architecture |
| **Database & ORM** | MongoDB Atlas + Prisma 6.1 | NoSQL cloud database model with typed schema client |
| **Authentication** | NextAuth.js 4 + Bcrypt | Secure JWT session handling, credentials login, password hashing |
| **Unit Testing** | Vitest 5.0 | Sub-second test execution engine |
| **Component Kit** | React Icons, Material UI | Rating components and iconography |
| **Alert System** | React Hot Toast | Lightweight notifications |
| **CI Automation** | GitHub Actions | Automated build, lint, and test validation on commit |

---

## Project Directory Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI pipeline
├── app/
│   ├── about/                   # Company history and metrics
│   ├── admin/                   # Administrative dashboard and inventory control
│   ├── api/                     # REST Route Handlers
│   ├── cart/                    # Shopping cart with coupon calculations
│   ├── checkout/                # Checkout wizard and receipt generation
│   ├── contact/                 # Customer service contact form
│   ├── deals/                   # Promotional campaigns and coupon codes
│   ├── faq/                     # Searchable accordion FAQ
│   ├── favorites/               # Wishlist management
│   ├── login/ & register/       # User authentication routes
│   ├── privacy/ & terms/        # Legal compliance documents
│   ├── product/[productId]/     # Dynamic product detail pages
│   ├── profile/                 # User profile and order history
│   ├── returns/                 # Return and exchange guidelines
│   ├── tracking/                # Shipment tracking timeline
│   ├── components/              # Modular UI components
│   ├── layout.tsx               # Root Layout with Suspense boundaries
│   └── page.tsx                 # Main showcase page
├── hooks/
│   └── useCart.tsx              # Cart state and coupon management
├── prisma/
│   └── schema.prisma            # MongoDB database models
├── tests/                       # Automated Vitest test suites
├── types/                       # Universal TypeScript interfaces
├── utils/
│   ├── cartUtils.ts             # Financial and shipping calculation functions
│   ├── filterUtils.ts           # Filtering and sorting functions
│   └── Products.tsx             # 30-item curated fallback dataset
└── package.json
```

---

## Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/haticetatli/next.js-ecommerce.git
cd next.js-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the sample environment file:
```bash
cp .env.example .env
```

Configure your credentials:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/shop?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your_nextauth_secret_key"
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
```

*(Note: If no database URL is supplied, the platform executes using the built-in resilient local fallback).*

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Local Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) (or the active port reported in terminal).

### 6. Production Build
```bash
npm run build
npm run start
```

---

## Available Test Coupons

| Coupon Code | Value | Usage Terms |
|---|---|---|
| **`TATLI10`** | 10% Discount | Valid across all catalog items |
| **`TATLI20`** | 20% Discount | Requires minimum cart total of 1,000 TRY |
| **`KARGO`** | Free Delivery | Waives the standard 49.90 TRY shipping fee |

---

## Author & Engineering Contact

### **Hatice Tatlı**
**Computer Engineer & Full-Stack Software Developer**

- **GitHub Profile:** [https://github.com/haticetatli](https://github.com/haticetatli)
- **Academic / Engineering Email:** `20227170018@ogr.oku.edu.tr`
- **Primary Specialization:** Next.js, React, TypeScript, Node.js, Full-Stack Web Development, Clean Architecture.

---

## License

This project is licensed under the [MIT License](LICENSE).
