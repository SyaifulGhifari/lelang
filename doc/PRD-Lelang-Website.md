# 📋 Product Requirements Document (PRD)
# Website Lelang Online

**Versi:** 1.0  
**Tanggal:** 10 Desember 2025  
**Author:** Development Team Lead  

---

## 📌 1. Executive Summary

Website lelang online adalah platform yang memungkinkan pengguna untuk menjual dan membeli barang melalui sistem lelang (auction). Platform ini dibangun menggunakan **Next.js 14+** dengan App Router sebagai full-stack framework, menggabungkan frontend dan backend dalam satu project yang sama.

---

## 🎯 2. Tujuan Proyek

- Membangun platform lelang online yang aman, cepat, dan user-friendly
- Menyediakan real-time bidding experience
- Mendukung berbagai metode pembayaran
- Scalable untuk pertumbuhan pengguna di masa depan

---

## 🛠️ 3. Tech Stack

### 3.1 Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x / 15.x | Full-stack framework (Frontend + Backend) |
| **React** | 18.x / 19.x | UI Library |
| **TypeScript** | 5.x | Type-safe development |

### 3.2 Database & ORM
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary relational database |
| **Prisma** | ORM untuk database management |
| **Redis** | Caching & real-time data (bidding) |

### 3.3 Authentication & Authorization
| Technology | Purpose |
|------------|---------|
| **NextAuth.js (Auth.js)** | Authentication provider |
| **JWT** | Token-based authentication |
| **bcrypt** | Password hashing |

### 3.4 OTP & Messaging
| Technology | Purpose |
|------------|---------|
| **Fonnte / WhatsApp Business API** | WhatsApp OTP & notifications |
| **Nodemailer / Resend** | Email notifications |

### 3.4 Real-time Features
| Technology | Purpose |
|------------|---------|
| **Socket.io** atau **Pusher** | Real-time bidding updates |
| **Server-Sent Events (SSE)** | Alternative untuk live updates |

### 3.5 Payment Gateway
| Technology | Purpose |
|------------|---------|
| **Midtrans** | Payment gateway Indonesia |
| **Xendit** | Alternative payment gateway |
| **Stripe** | International payments (optional) |

### 3.6 File Storage
| Technology | Purpose |
|------------|---------|
| **Cloudinary** | Image optimization & storage |
| **AWS S3** | File storage (alternative) |
| **UploadThing** | Easy file uploads untuk Next.js |

### 3.7 UI & Styling
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Pre-built UI components |
| **Framer Motion** | Animations |
| **Lucide Icons** | Icon library |

### 3.8 Form & Validation
| Technology | Purpose |
|------------|---------|
| **React Hook Form** | Form management |
| **Zod** | Schema validation |

### 3.9 State Management
| Technology | Purpose |
|------------|---------|
| **Zustand** | Global state management |
| **TanStack Query** | Server state & caching |

### 3.10 Development Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **Jest** | Unit testing |
| **Playwright** | E2E testing |

### 3.11 Deployment & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Vercel** | Hosting & deployment |
| **Docker** | Containerization (optional) |
| **GitHub Actions** | CI/CD pipeline |

---

## 📁 4. Project Structure

```
lelang/
├── 📁 src/
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 (auth)/                   # Auth route group
│   │   │   ├── 📁 login/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 register/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 (main)/                   # Main app route group
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── page.tsx             # User dashboard (bidder)
│   │   │   │   ├── 📁 my-bids/
│   │   │   │   │   └── page.tsx         # View bids history
│   │   │   │   ├── 📁 my-wins/
│   │   │   │   │   └── page.tsx         # View won auctions
│   │   │   │   ├── 📁 transactions/
│   │   │   │   │   └── page.tsx         # View transactions
│   │   │   │   └── 📁 settings/
│   │   │   │       └── page.tsx         # User settings
│   │   │   │
│   │   │   ├── 📁 auctions/
│   │   │   │   ├── page.tsx             # Auction listing (public)
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── page.tsx         # Auction detail (public)
│   │   │   │
│   │   │   ├── 📁 categories/
│   │   │   │   ├── page.tsx
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 admin/                    # Admin panel (eksklusif)
│   │   │   ├── page.tsx                 # Admin dashboard
│   │   │   ├── 📁 auctions/
│   │   │   │   ├── page.tsx             # Auction management
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   └── page.tsx         # Edit auction
│   │   │   │   └── 📁 create/
│   │   │   │       └── page.tsx         # Create auction
│   │   │   ├── 📁 users/
│   │   │   │   ├── page.tsx             # User management
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── page.tsx         # User detail
│   │   │   ├── 📁 categories/
│   │   │   │   ├── page.tsx             # Category management
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── page.tsx         # Edit category
│   │   │   ├── 📁 transactions/
│   │   │   │   └── page.tsx             # Transaction logs
│   │   │   ├── 📁 reports/
│   │   │   │   └── page.tsx             # Analytics & reports
│   │   │   └── layout.tsx
│   │   │
│   │   ├── 📁 api/                      # API Routes (Backend)
│   │   │   ├── 📁 auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 auctions/
│   │   │   │   ├── route.ts             # GET all, POST create
│   │   │   │   ├── 📁 [id]/
│   │   │   │   │   ├── route.ts         # GET, PUT, DELETE single
│   │   │   │   │   └── 📁 bids/
│   │   │   │   │       └── route.ts     # Bidding endpoint
│   │   │   │   └── 📁 search/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 users/
│   │   │   │   ├── route.ts
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 categories/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── 📁 payments/
│   │   │   │   ├── route.ts
│   │   │   │   └── 📁 webhook/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 upload/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── 📁 notifications/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Home page
│   │   ├── loading.tsx                  # Global loading
│   │   ├── error.tsx                    # Global error
│   │   ├── not-found.tsx                # 404 page
│   │   └── globals.css
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navbar.tsx
│   │   │
│   │   ├── 📁 auction/
│   │   │   ├── auction-card.tsx
│   │   │   ├── auction-grid.tsx
│   │   │   ├── auction-detail.tsx
│   │   │   ├── bid-form.tsx
│   │   │   ├── bid-history.tsx
│   │   │   ├── countdown-timer.tsx
│   │   │   └── auction-gallery.tsx
│   │   │
│   │   ├── 📁 forms/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── auction-form.tsx
│   │   │   └── profile-form.tsx
│   │   │
│   │   ├── 📁 dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   └── charts.tsx
│   │   │
│   │   └── 📁 shared/
│   │       ├── search-bar.tsx
│   │       ├── pagination.tsx
│   │       ├── filter-sidebar.tsx
│   │       ├── image-upload.tsx
│   │       └── loading-skeleton.tsx
│   │
│   ├── 📁 lib/
│   │   ├── 📁 db/
│   │   │   └── prisma.ts                # Prisma client instance
│   │   │
│   │   ├── 📁 auth/
│   │   │   ├── auth.ts                  # NextAuth config
│   │   │   └── auth-options.ts
│   │   │
│   │   ├── 📁 validators/
│   │   │   ├── auth.schema.ts
│   │   │   ├── auction.schema.ts
│   │   │   └── bid.schema.ts
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── cn.ts                    # className utility
│   │   │   ├── format.ts                # Format helpers
│   │   │   ├── date.ts                  # Date utilities
│   │   │   └── currency.ts              # Currency formatter
│   │   │
│   │   ├── 📁 api/
│   │   │   └── api-client.ts            # API fetcher
│   │   │
│   │   └── 📁 constants/
│   │       ├── routes.ts
│   │       └── config.ts
│   │
│   ├── 📁 hooks/
│   │   ├── use-auth.ts
│   │   ├── use-auction.ts
│   │   ├── use-bid.ts
│   │   ├── use-socket.ts
│   │   ├── use-countdown.ts
│   │   └── use-debounce.ts
│   │
│   ├── 📁 store/
│   │   ├── auth-store.ts
│   │   ├── auction-store.ts
│   │   └── notification-store.ts
│   │
│   ├── 📁 types/
│   │   ├── index.ts
│   │   ├── auction.ts
│   │   ├── user.ts
│   │   ├── bid.ts
│   │   └── api.ts
│   │
│   ├── 📁 services/
│   │   ├── auction.service.ts
│   │   ├── user.service.ts
│   │   ├── bid.service.ts
│   │   ├── payment.service.ts
│   │   ├── email.service.ts
│   │   └── notification.service.ts
│   │
│   └── 📁 middleware/
│       └── middleware.ts                # Next.js middleware
│
├── 📁 prisma/
│   ├── schema.prisma                    # Database schema
│   ├── 📁 migrations/                   # Database migrations
│   └── seed.ts                          # Database seeder
│
├── 📁 public/
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── favicon.ico
│
├── 📁 tests/
│   ├── 📁 unit/
│   ├── 📁 integration/
│   └── 📁 e2e/
│
├── .env                                 # Environment variables
├── .env.example                         # Example env file
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🗃️ 5. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== ENUMS ====================

enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

enum AuctionStatus {
  DRAFT
  PENDING_APPROVAL
  ACTIVE
  ENDED
  SOLD
  CANCELLED
}

enum BidStatus {
  ACTIVE
  OUTBID
  WON
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  EXPIRED
}

enum TransactionType {
  PAYMENT
  REFUND
  COMMISSION
}

// ==================== MODELS ====================

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  emailVerified     DateTime?
  password          String?
  name              String
  username          String?   @unique
  avatar            String?
  phone             String?
  address           String?
  city              String?
  province          String?
  postalCode        String?
  role              UserRole  @default(USER)
  status            UserStatus @default(ACTIVE)
  
  // OTP & Verification
  phoneVerified     Boolean   @default(false)
  emailVerified     DateTime?
  otpCode           String?
  otpExpiredAt      DateTime?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?
  
  // Relations
  auctions          Auction[]
  bids              Bid[]
  transactions      Transaction[]
  notifications     Notification[]
  reviews           Review[]        @relation("ReviewAuthor")
  receivedReviews   Review[]        @relation("ReviewTarget")
  watchlist         Watchlist[]
  accounts          Account[]
  sessions          Session[]
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model Category {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  description String?
  icon        String?
  image       String?
  parentId    String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  auctions    Auction[]
  isActive    Boolean    @default(true)
  sortOrder   Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@map("categories")
}

model Auction {
  id              String        @id @default(cuid())
  title           String
  slug            String        @unique
  description     String        @db.Text
  condition       String        // NEW, LIKE_NEW, GOOD, FAIR
  
  // Pricing
  startingPrice   Decimal       @db.Decimal(15, 2)
  reservePrice    Decimal?      @db.Decimal(15, 2)  // Minimum price to sell
  buyNowPrice     Decimal?      @db.Decimal(15, 2)  // Instant buy price
  currentPrice    Decimal       @db.Decimal(15, 2)
  bidIncrement    Decimal       @default(10000) @db.Decimal(15, 2)
  
  // Timing
  startTime       DateTime
  endTime         DateTime
  
  // Status
  status          AuctionStatus @default(DRAFT)
  isHighlighted   Boolean       @default(false)
  isFeatured      Boolean       @default(false)
  viewCount       Int           @default(0)
  
  // Shipping
  weight          Decimal?      @db.Decimal(10, 2)
  shippingCost    Decimal?      @db.Decimal(15, 2)
  shippingInfo    String?
  location        String?
  
  // Relations (Admin/Owner as seller)
  sellerId        String        // Always admin/owner ID
  seller          User          @relation(fields: [sellerId], references: [id])
  categoryId      String
  category        Category      @relation(fields: [categoryId], references: [id])
  images          AuctionImage[]
  bids            Bid[]
  watchlist       Watchlist[]
  winnerId        String?       // User yang memenangkan lelang
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@index([status, endTime])
  @@index([categoryId])
  @@index([sellerId])
  @@map("auctions")
}

model AuctionImage {
  id         String   @id @default(cuid())
  url        String
  publicId   String?  // Cloudinary public ID
  isPrimary  Boolean  @default(false)
  sortOrder  Int      @default(0)
  auctionId  String
  auction    Auction  @relation(fields: [auctionId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  
  @@map("auction_images")
}

model Bid {
  id         String    @id @default(cuid())
  amount     Decimal   @db.Decimal(15, 2)
  status     BidStatus @default(ACTIVE)
  isAutoBid  Boolean   @default(false)
  maxBid     Decimal?  @db.Decimal(15, 2)  // For auto-bidding
  
  auctionId  String
  auction    Auction   @relation(fields: [auctionId], references: [id])
  bidderId   String
  bidder     User      @relation(fields: [bidderId], references: [id])
  
  createdAt  DateTime  @default(now())
  
  @@index([auctionId, amount])
  @@index([bidderId])
  @@map("bids")
}

model Transaction {
  id              String          @id @default(cuid())
  type            TransactionType
  amount          Decimal         @db.Decimal(15, 2)
  fee             Decimal         @default(0) @db.Decimal(15, 2)
  status          PaymentStatus   @default(PENDING)
  
  // Payment gateway info
  paymentMethod   String?
  paymentId       String?         // External payment ID
  paymentUrl      String?
  paymentData     Json?
  
  // References
  userId          String
  user            User            @relation(fields: [userId], references: [id])
  auctionId       String?
  
  notes           String?
  paidAt          DateTime?
  expiredAt       DateTime?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  @@index([userId])
  @@index([status])
  @@map("transactions")
}

model Notification {
  id         String   @id @default(cuid())
  type       String   // BID_PLACED, OUTBID, AUCTION_WON, AUCTION_ENDED, etc.
  title      String
  message    String
  data       Json?
  isRead     Boolean  @default(false)
  
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt  DateTime @default(now())
  
  @@index([userId, isRead])
  @@map("notifications")
}

model Review {
  id          String   @id @default(cuid())
  rating      Int      // 1-5
  comment     String?  @db.Text
  
  authorId    String
  author      User     @relation("ReviewAuthor", fields: [authorId], references: [id])
  targetId    String
  target      User     @relation("ReviewTarget", fields: [targetId], references: [id])
  auctionId   String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([authorId, targetId, auctionId])
  @@map("reviews")
}

model Watchlist {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  auctionId  String
  auction    Auction  @relation(fields: [auctionId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  
  @@unique([userId, auctionId])
  @@map("watchlist")
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  type      String   @default("string") // string, number, boolean, json
  group     String   @default("general")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("settings")
}
```

---

## ⚙️ 5.1 Payment Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PAYMENT FLOW (Direct)                   │
└─────────────────────────────────────────────────────────────┘

1. User places bid on auction
   ↓
2. Bid wins (highest bid saat auction ends)
   ↓
3. System creates payment transaction
   ↓
4. User redirected to Payment Gateway (Midtrans)
   ↓
5. User memilih payment method:
   - Transfer Bank
   - QRIS
   - E-Wallet (OVO, Dana, LinkAja)
   - Bank card
   ↓
6. User complete payment di payment gateway
   ↓
7. Payment gateway sends webhook to server
   ↓
8. Server validates payment & updates transaction status
   ↓
9. Send WhatsApp & Email confirmation to user
   ↓
10. Order/Shipping process starts

KEY POINTS:
- NO wallet balance system
- NO top up/deposit mechanism
- DIRECT payment to payment gateway
- Payment timeout: 15 minutes (auto-cancel if not paid)
- Transaction history saved for audit
```

---

## ✨ 6. MVP (Minimum Viable Product) - Fitur Dasar

> **Catatan:** Fitur-fitur ini adalah fitur inti yang WAJIB ada saat launch pertama kali.

### 6.1 MVP - Fitur Pengguna (User)

#### 🔐 Authentication & Account
- [x] Registrasi dengan nomor WhatsApp + email
- [x] Login dengan email/password
- [x] OTP verification via WhatsApp
- [x] Forgot password (OTP via WhatsApp)
- [x] Profile management

#### 🛍️ MVP - Auction Features (User)
- [x] Browse auctions dengan filter & search
- [x] View auction detail dengan image gallery
- [x] Real-time bidding
- [x] Countdown timer
- [x] Bid history

#### 📦 MVP - Bidder Features
- [x] View all available auctions
- [x] Search & filter auctions
- [x] View auction detail
- [x] View bid history
- [x] Place bids on auctions
- [x] View won auctions
- [x] Bidder dashboard

#### 💳 MVP - Payment
- [x] Direct payment to payment gateway (Transfer Bank, E-Wallet)
- [x] Multiple payment methods (Transfer Bank, QRIS, E-Wallet)
- [x] Transaction history
- [x] Payment confirmation via WhatsApp & Email

#### 🔔 MVP - Notifications
- [x] WhatsApp notifications (OTP, outbid, won)
- [x] Email notifications (summary, receipt)
- [x] In-app notifications

### 6.2 MVP - Fitur Admin/Pemilik Web

#### 📊 MVP - Dashboard Admin
- [x] Overview statistics (total users, auctions, bids, revenue)
- [x] Recent activities

#### 👥 MVP - User Management
- [x] View all users
- [x] Edit user details
- [x] Suspend/ban users

#### 🏷️ MVP - Auction Management (Admin Only)
- [x] Create auction listing
- [x] Upload multiple images
- [x] Set starting price & bid increment
- [x] Choose auction duration
- [x] Edit/cancel auction
- [x] View all auctions

#### 📁 MVP - Category Management
- [x] CRUD categories

#### 💰 MVP - Transaction Management
- [x] View all transactions

---

## 🚀 7. Future Features (Fitur Masa Depan)

> **Catatan:** Fitur-fitur ini akan dikembangkan setelah MVP launch dan berdasarkan feedback user.

### 7.1 Future - User Features

#### 🔐 Enhanced Authentication
- [ ] OAuth login (Google, Facebook)
- [ ] Two-factor authentication (2FA) optional
- [ ] Biometric login (mobile app)

#### 🛍️ Advanced Auction Features
- [ ] Auto-bid feature (set max bid)
- [ ] Buy Now option
- [ ] Watchlist / favorite auctions
- [ ] Auction reminder notifications
- [ ] Bid sniping protection (soft close)
- [ ] Proxy bidding

#### 💳 Enhanced Payment
- [ ] Escrow system (uang ditahan sampai transaksi selesai)
- [ ] Credit card payment
- [ ] Installment payment (cicilan)
- [ ] Payment refund to original payment method

#### 🔔 Advanced Notifications
- [ ] Push notifications (mobile/web)
- [ ] Auction ending soon alerts
- [ ] Price drop alerts
- [ ] Scheduled notification preferences

#### ⭐ Social Features
- [ ] Reviews & Ratings system
- [ ] User reputation system
- [ ] Share to social media
- [ ] Invite friends & referral bonus

#### 📱 Mobile Experience
- [ ] Progressive Web App (PWA)
- [ ] Native mobile app (React Native)

### 7.2 Future - Admin Features

#### 📊 Advanced Dashboard
- [ ] Revenue charts & analytics
- [ ] User growth metrics
- [ ] Auction performance metrics
- [ ] Export reports (PDF, Excel)

#### 👥 Enhanced User Management
- [ ] User activity logs
- [ ] Manage user wallet manually
- [ ] KYC verification (optional)
- [ ] Bulk user actions

#### 🏷️ Advanced Auction Management
- [ ] Reserve price feature
- [ ] Buy Now price feature
- [ ] Feature/highlight auctions
- [ ] Scheduled auctions
- [ ] Bulk auction upload (CSV)
- [ ] Auction templates
- [ ] Handle disputes

#### 📁 Enhanced Category Management
- [ ] Nested categories (sub-categories)
- [ ] Category ordering
- [ ] Category images/icons

#### 💰 Advanced Transaction Management
- [ ] Process withdrawals
- [ ] Refund management
- [ ] Fee/commission configuration
- [ ] Financial reports

#### ⚙️ Enhanced Settings
- [ ] Site settings customization
- [ ] Email templates editor
- [ ] WhatsApp templates editor
- [ ] Payment gateway configuration
- [ ] SEO settings

### 7.3 Future - Technical Improvements
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Advanced search with Elasticsearch
- [ ] Image compression & CDN
- [ ] Performance optimization
- [ ] A/B testing capability
- [ ] Analytics integration (Google Analytics, Mixpanel)

---

## 🔄 8. API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user (bidders only)
POST   /api/auth/login            - Login user
POST   /api/auth/logout           - Logout user
POST   /api/auth/send-otp         - Send OTP via WhatsApp
POST   /api/auth/verify-otp       - Verify OTP code
POST   /api/auth/forgot-password  - Request password reset (via OTP)
POST   /api/auth/reset-password   - Reset password with OTP
GET    /api/auth/session          - Get current session
```

### Users
```
GET    /api/users                 - List users (admin)
GET    /api/users/:id             - Get user detail
PUT    /api/users/:id             - Update user
DELETE /api/users/:id             - Delete user (admin)
GET    /api/users/:id/auctions    - Get user's auctions
GET    /api/users/:id/bids        - Get user's bids
GET    /api/users/:id/reviews     - Get user's reviews
```

### Auctions (Admin Only untuk POST/PUT/DELETE)
```
GET    /api/auctions              - List auctions (with filters) - Public
POST   /api/auctions              - Create auction (Admin only)
GET    /api/auctions/:id          - Get auction detail - Public
PUT    /api/auctions/:id          - Update auction (Admin only)
DELETE /api/auctions/:id          - Delete auction (Admin only)
GET    /api/auctions/:id/bids     - Get auction bids - Public
POST   /api/auctions/:id/bids     - Place bid (Authenticated user only)
GET    /api/auctions/search       - Search auctions - Public
GET    /api/auctions/featured     - Get featured auctions - Public
```

### Categories
```
GET    /api/categories            - List categories
POST   /api/categories            - Create category (admin)
PUT    /api/categories/:id        - Update category (admin)
DELETE /api/categories/:id        - Delete category (admin)
```

### Payments
```
POST   /api/payments/checkout     - Create payment transaction for auction
GET    /api/payments/history      - Get transaction history
GET    /api/payments/receipt/:id  - Get payment receipt
POST   /api/payments/webhook      - Payment gateway webhook
POST   /api/payments/cancel/:id   - Cancel payment (within timeout)
```

### Notifications
```
GET    /api/notifications         - Get user notifications
PUT    /api/notifications/:id     - Mark as read
DELETE /api/notifications/:id     - Delete notification
POST   /api/notifications/read-all - Mark all as read
```

### Watchlist (Future)
```
GET    /api/watchlist             - Get user's watchlist
POST   /api/watchlist             - Add to watchlist
DELETE /api/watchlist/:auctionId  - Remove from watchlist
```

### Upload
```
POST   /api/upload/image          - Upload image
DELETE /api/upload/image/:id      - Delete image
```

---

## 🔒 9. Security Considerations

### 9.1 Role-Based Access Control (RBAC)
- Admin role untuk membuat/mengelola lelang
- User role untuk bidding dan pembelian
- API endpoints dilindungi dengan middleware authentication
- Authorization checks pada setiap endpoint sensitive

### 9.2 Authentication Security
- Password hashing dengan bcrypt (minimum 12 rounds)
- OTP expiration (5 menit)
- Rate limiting pada OTP request
- JWT dengan short expiration time (15 menit) + refresh token
- Rate limiting pada login endpoint
- Account lockout setelah failed attempts

### 9.3 Data Protection
- Input validation dengan Zod
- SQL injection prevention (Prisma ORM)
- XSS prevention (React auto-escaping)
- CSRF protection
- Secure HTTP headers (Helmet)

### 9.4 Bidding Security
- Server-side bid validation
- Prevent bid sniping dengan soft close (extend waktu jika ada bid di menit terakhir)
- Prevent self-bidding
- Bid amount validation

### 9.5 Payment Security
- Direct payment to payment gateway (no wallet/balance system)
- Secure webhook verification
- Transaction logging
- Payment timeout validation (automatic cancellation after 15 minutes)
- Fraud detection

---

## 🚀 10. Performance Optimization

### 9.1 Frontend
- Next.js Image optimization
- Code splitting & lazy loading
- Skeleton loading states
- Optimistic updates
- Service worker untuk offline support

### 9.2 Backend
- Redis caching untuk hot data
- Database indexing
- Query optimization
- Connection pooling

### 9.3 Real-time
- WebSocket connection pooling
- Debounce bid updates
- Selective broadcasting

---

## 📱 11. Responsive Design

Mendukung semua ukuran layar:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

---

## 🧪 12. Testing Strategy

### Unit Tests
- Component testing dengan Jest + React Testing Library
- Service function testing
- Utility function testing

### Integration Tests
- API endpoint testing
- Database integration tests

### E2E Tests
- Critical user flows dengan Playwright
- Bidding flow
- Payment flow
- Authentication flow

---

## 📈 13. Monitoring & Analytics

### Application Monitoring
- Error tracking dengan Sentry
- Performance monitoring
- API response time tracking

### Business Analytics
- User registration metrics
- Auction success rate
- Revenue tracking
- User behavior analytics (Google Analytics / Mixpanel)

---

## 🗓️ 14. Development Phases

### Phase 1: Foundation (2-3 minggu)
- [ ] Project setup & configuration
- [ ] Database schema & Prisma setup
- [ ] Authentication system
- [ ] Basic UI components

### Phase 2: Core Features (3-4 minggu)
- [ ] User dashboard (for bidders)
- [ ] Auction CRUD (Admin only)
- [ ] Category management (Admin only)
- [ ] Image upload (Admin only)
- [ ] Search & filter (Public)
- [ ] Auction listing page (Public)

### Phase 3: Bidding System (2-3 minggu)
- [ ] Real-time bidding
- [ ] Bid validation
- [ ] Auto-bid feature
- [ ] Countdown timer
- [ ] Notifications

### Phase 4: Payment Integration (2 minggu)
- [ ] Payment gateway integration (Midtrans)
- [ ] Payment checkout flow
- [ ] Transaction management
- [ ] Webhook handling for payment confirmations
- [ ] Payment timeout mechanism

### Phase 5: Admin Panel (2 minggu)
- [ ] Admin dashboard
- [ ] User management
- [ ] Auction moderation
- [ ] Reports & analytics

### Phase 6: Polish & Launch (1-2 minggu)
- [ ] Testing & bug fixes
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Deployment

---

## 📝 15. Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Lelang Online"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lelang_db"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key

# WhatsApp OTP (Fonnte)
FONNTE_API_KEY=
FONNTE_DEVICE_ID=

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Resend / Nodemailer)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=noreply@lelang.com

# Real-time (Pusher / Socket.io)
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=

# Sentry (Optional)
SENTRY_DSN=
```

---

## 📚 16. Recommended Libraries

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    
    // Database
    "@prisma/client": "^5.0.0",
    "ioredis": "^5.0.0",
    
    // Auth
    "next-auth": "^4.24.0",
    "bcryptjs": "^2.4.3",
    
    // Validation
    "zod": "^3.22.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    
    // UI
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0",
    
    // State & Data Fetching
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    
    // Real-time
    "socket.io-client": "^4.7.0",
    "pusher-js": "^8.3.0",
    
    // Payment
    "midtrans-client": "^1.3.0",
    
    // File Upload
    "cloudinary": "^1.41.0",
    "@uploadthing/react": "^6.0.0",
    
    // Utilities
    "date-fns": "^2.30.0",
    "slugify": "^1.6.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "playwright": "^1.40.0"
  }
}
```

---

## ✅ 17. Checklist Sebelum Launch

- [ ] All features tested
- [ ] Security audit completed
- [ ] Performance optimized
- [ ] Mobile responsive verified
- [ ] SEO configured
- [ ] Analytics setup
- [ ] Error tracking active
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Legal pages (ToS, Privacy Policy)
- [ ] Payment gateway tested with real transactions
- [ ] SSL certificate configured
- [ ] CDN configured
- [ ] Monitoring alerts setup

---

## 📞 18. Contact & Support

Untuk pertanyaan teknis terkait dokumen ini, silakan hubungi:
- **Technical Lead:** [Your Name]
- **Email:** tech@example.com

---

*Dokumen ini akan di-update secara berkala sesuai dengan perkembangan proyek.*
