# 🚀 Implementation Guide - Website Lelang Online

**Panduan lengkap pembuatan Website Lelang Online dari awal hingga akhir**

---

## 📋 Fase Pengembangan

1. [Fase 1: Project Setup](#fase-1-project-setup)
2. [Fase 2: Database & Prisma Setup](#fase-2-database--prisma-setup)
3. [Fase 3: Authentication System](#fase-3-authentication-system)
4. [Fase 4: Auction CRUD](#fase-4-auction-crud)
5. [Fase 5: Bidding System](#fase-5-bidding-system)
6. [Fase 6: Payment Integration](#fase-6-payment-integration)
7. [Fase 7: Notifications](#fase-7-notifications)
8. [Fase 8: Admin Panel](#fase-8-admin-panel)
9. [Fase 9: Testing & Optimization](#fase-9-testing--optimization)
10. [Fase 10: Deployment](#fase-10-deployment)

---

## Fase 1: Project Setup

### 1.1 Initialize Next.js Project

```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest lelang --typescript --tailwind

# Navigate to project directory
cd lelang

# Install additional dependencies
npm install \
  @prisma/client \
  next-auth \
  bcryptjs \
  zod \
  react-hook-form \
  @hookform/resolvers \
  zustand \
  @tanstack/react-query \
  axios \
  socket.io-client \
  date-fns \
  slugify \
  nanoid

# Dev dependencies
npm install -D \
  prisma \
  @types/node \
  eslint \
  prettier \
  husky \
  jest \
  @testing-library/react \
  playwright
```

### 1.2 Setup Environment Variables

**File: `.env.example`**

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
NEXTAUTH_SECRET=your-super-secret-key-here-min-32-chars

# WhatsApp OTP (Fonnte)
FONNTE_API_KEY=your-fonnte-api-key
FONNTE_DEVICE_ID=your-device-id

# Payment Gateway (Midtrans)
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_IS_PRODUCTION=false

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@lelang.com

# Real-time
PUSHER_APP_ID=your-pusher-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=ap1
```

**Copy ke `.env.local`:**
```bash
cp .env.example .env.local
# Edit .env.local dengan credentials yang sebenarnya
```

### 1.3 Configure TypeScript & Tools

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "node",
    "allowJs": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 1.4 Setup Prettier & ESLint

**File: `.prettierrc`**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**File: `.eslintrc.json`**
```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 1.5 Configure Tailwind CSS

**File: `tailwind.config.ts`**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5AC8FA',
        danger: '#FF3B30',
        success: '#34C759',
        warning: '#FF9500',
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## Fase 2: Database & Prisma Setup

### 2.1 Setup PostgreSQL Database

```bash
# Install PostgreSQL (jika belum)
# Windows: Download dari https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql

# Create database
createdb lelang_db

# Verify connection
psql -U postgres -d lelang_db
```

### 2.2 Initialize Prisma

```bash
# Initialize Prisma
npx prisma init

# Update .env dengan DATABASE_URL
# DATABASE_URL="postgresql://user:password@localhost:5432/lelang_db"
```

### 2.3 Create Prisma Schema

**File: `prisma/schema.prisma`**

Copy seluruh database schema dari PRD-Lelang-Website.md (section 5. Database Schema)

### 2.4 Run Database Migrations

```bash
# Create first migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

### 2.5 Setup Prisma Client

**File: `src/lib/db/prisma.ts`**
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## Fase 3: Authentication System

### 3.1 Setup NextAuth Configuration

**File: `src/lib/auth/auth.ts`**
```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
};
```

### 3.2 Create Auth API Routes

**File: `src/app/api/auth/[...nextauth]/route.ts`**
```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### 3.3 Create OTP Service

**File: `src/lib/services/otp.service.ts`**
```typescript
import { prisma } from '@/lib/db/prisma';
import { nanoid } from 'nanoid';

const OTP_EXPIRY_MINUTES = 5;

export async function generateOTP(phone: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Simpan OTP ke database
  await prisma.user.update({
    where: { phone },
    data: {
      otpCode: code,
      otpExpiredAt: expiresAt,
    },
  });

  return { code, expiresAt };
}

export async function verifyOTP(phone: string, code: string) {
  const user = await prisma.user.findUnique({
    where: { phone },
  });

  if (!user || !user.otpCode || !user.otpExpiredAt) {
    throw new Error('OTP not found');
  }

  if (user.otpExpiredAt < new Date()) {
    throw new Error('OTP expired');
  }

  if (user.otpCode !== code) {
    throw new Error('Invalid OTP');
  }

  // Clear OTP after verification
  await prisma.user.update({
    where: { phone },
    data: {
      otpCode: null,
      otpExpiredAt: null,
      phoneVerified: true,
    },
  });

  return user;
}
```

### 3.4 Create Auth Validators

**File: `src/lib/validators/auth.schema.ts`**
```typescript
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^62\d{9,12}$/, 'Invalid phone number'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const otpSchema = z.object({
  phone: z.string().regex(/^62\d{9,12}$/, 'Invalid phone number'),
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OTPInput = z.infer<typeof otpSchema>;
```

### 3.5 Create Register & Login API

**File: `src/app/api/auth/register/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validators/auth.schema';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phone: validatedData.phone },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email or phone already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        phone: validatedData.phone,
        name: validatedData.name,
        password: hashedPassword,
        role: 'USER',
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    );
  }
}
```

---

## Fase 4: Auction CRUD

### 4.1 Create Auction Types

**File: `src/types/auction.ts`**
```typescript
export interface Auction {
  id: string;
  title: string;
  slug: string;
  description: string;
  condition: string;
  startingPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
  currentPrice: number;
  bidIncrement: number;
  startTime: Date;
  endTime: Date;
  status: 'DRAFT' | 'ACTIVE' | 'ENDED' | 'SOLD' | 'CANCELLED';
  isHighlighted: boolean;
  isFeatured: boolean;
  viewCount: number;
  weight?: number;
  shippingCost?: number;
  shippingInfo?: string;
  location?: string;
  sellerId: string;
  categoryId: string;
  winnerId?: string;
  images: AuctionImage[];
  bids: Bid[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuctionImage {
  id: string;
  url: string;
  publicId?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Bid {
  id: string;
  amount: number;
  status: 'ACTIVE' | 'OUTBID' | 'WON' | 'CANCELLED';
  isAutoBid: boolean;
  maxBid?: number;
  auctionId: string;
  bidderId: string;
  createdAt: Date;
}
```

### 4.2 Create Auction Service

**File: `src/services/auction.service.ts`**
```typescript
import { prisma } from '@/lib/db/prisma';
import { Auction } from '@/types/auction';

export async function getAuctions(
  page: number = 1,
  limit: number = 12,
  filters?: {
    categoryId?: string;
    status?: string;
    search?: string;
  }
) {
  const skip = (page - 1) * limit;

  const auctions = await prisma.auction.findMany({
    where: {
      status: 'ACTIVE',
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.search && {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
    },
    include: {
      images: true,
      _count: {
        select: { bids: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await prisma.auction.count({
    where: {
      status: 'ACTIVE',
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.search && {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
    },
  });

  return {
    data: auctions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getAuctionById(id: string) {
  return await prisma.auction.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      bids: {
        include: { bidder: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
      },
      category: true,
      seller: { select: { name: true, avatar: true } },
    },
  });
}

export async function createAuction(data: {
  title: string;
  description: string;
  categoryId: string;
  startingPrice: number;
  bidIncrement: number;
  startTime: Date;
  endTime: Date;
  images: { url: string; isPrimary: boolean }[];
}) {
  return await prisma.auction.create({
    data: {
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      currentPrice: data.startingPrice,
      status: 'ACTIVE',
      sellerId: 'admin-id', // Should be from session
      images: {
        create: data.images,
      },
    },
    include: { images: true },
  });
}
```

### 4.3 Create Auction API Routes

**File: `src/app/api/auctions/route.ts`** - GET/POST auctions
**File: `src/app/api/auctions/[id]/route.ts`** - GET/PUT/DELETE single auction
**File: `src/app/api/admin/auctions/create/route.ts`** - Admin create auction (admin-only)

### 4.4 Create Auction List Page

Create pages under `src/app/(main)/auctions/` to display auctions and auction details

---

## Fase 5: Bidding System

### 5.1 Create Bid Service

**File: `src/services/bid.service.ts`**
```typescript
import { prisma } from '@/lib/db/prisma';

export async function placeBid(
  auctionId: string,
  bidderId: string,
  amount: number
) {
  // Get current auction
  const auction = await prisma.auction.findUnique({
    where: { id: auctionId },
    include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
  });

  if (!auction) {
    throw new Error('Auction not found');
  }

  if (auction.status !== 'ACTIVE') {
    throw new Error('Auction is not active');
  }

  if (new Date() > auction.endTime) {
    throw new Error('Auction has ended');
  }

  // Validate bid amount
  const minimumBid = auction.currentPrice + auction.bidIncrement;
  if (amount < minimumBid) {
    throw new Error(`Minimum bid is Rp ${minimumBid.toLocaleString('id-ID')}`);
  }

  // Prevent self-bidding
  if (auction.bids[0]?.bidderId === bidderId) {
    throw new Error('You cannot outbid yourself');
  }

  // Create new bid
  const bid = await prisma.bid.create({
    data: {
      amount,
      auctionId,
      bidderId,
      status: 'ACTIVE',
    },
  });

  // Update auction current price
  await prisma.auction.update({
    where: { id: auctionId },
    data: { currentPrice: amount },
  });

  // Mark previous highest bid as OUTBID
  if (auction.bids.length > 0) {
    await prisma.bid.update({
      where: { id: auction.bids[0].id },
      data: { status: 'OUTBID' },
    });
  }

  return bid;
}

export async function endAuction(auctionId: string) {
  const auction = await prisma.auction.findUnique({
    where: { id: auctionId },
    include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
  });

  if (!auction) {
    throw new Error('Auction not found');
  }

  const winningBid = auction.bids[0];

  if (winningBid) {
    // Mark winning bid
    await prisma.bid.update({
      where: { id: winningBid.id },
      data: { status: 'WON' },
    });

    // Update auction status
    await prisma.auction.update({
      where: { id: auctionId },
      data: {
        status: 'SOLD',
        winnerId: winningBid.bidderId,
      },
    });

    // Create payment transaction
    await prisma.transaction.create({
      data: {
        type: 'PAYMENT',
        amount: winningBid.amount,
        status: 'PENDING',
        userId: winningBid.bidderId,
        auctionId,
        expiredAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });
  } else {
    // No bids, auction ends without sale
    await prisma.auction.update({
      where: { id: auctionId },
      data: { status: 'ENDED' },
    });
  }
}
```

### 5.2 Create Bid API Endpoint

**File: `src/app/api/auctions/[id]/bids/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth';
import { placeBid } from '@/services/bid.service';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Invalid bid amount' },
        { status: 400 }
      );
    }

    const bid = await placeBid(params.id, session.user.id, amount);

    return NextResponse.json({ data: bid }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to place bid' },
      { status: 400 }
    );
  }
}
```

---

## Fase 6: Payment Integration

### 6.1 Setup Midtrans

```bash
npm install midtrans-client
```

**File: `src/lib/services/midtrans.service.ts`**
```typescript
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export interface CreateTransactionParams {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    firstName: string;
    email: string;
    phone: string;
  };
  itemDetails: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
}

export async function createPaymentTransaction(params: CreateTransactionParams) {
  try {
    const transactionToken = await snap.createTransactionToken({
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.grossAmount,
      },
      customer_details: {
        first_name: params.customerDetails.firstName,
        email: params.customerDetails.email,
        phone: params.customerDetails.phone,
      },
      item_details: params.itemDetails.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
    });

    return { token: transactionToken };
  } catch (error) {
    throw new Error(
      `Failed to create payment token: ${error instanceof Error ? error.message : ''}`
    );
  }
}

export async function getTransactionStatus(orderId: string) {
  try {
    const status = await snap.transaction.status(orderId);
    return status;
  } catch (error) {
    throw new Error(
      `Failed to get transaction status: ${error instanceof Error ? error.message : ''}`
    );
  }
}
```

### 6.2 Create Payment Checkout API

**File: `src/app/api/payments/checkout/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { createPaymentTransaction } from '@/lib/services/midtrans.service';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { auctionId } = body;

    // Get auction and winning bid
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        bids: { where: { bidderId: session.user.id }, orderBy: { amount: 'desc' } },
      },
    });

    if (!auction) {
      return NextResponse.json({ message: 'Auction not found' }, { status: 404 });
    }

    const winningBid = auction.bids[0];
    if (!winningBid) {
      return NextResponse.json(
        { message: 'No winning bid found' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, phone: true },
    });

    if (!user?.phone) {
      return NextResponse.json(
        { message: 'Please complete your phone number first' },
        { status: 400 }
      );
    }

    // Create Midtrans transaction
    const paymentResult = await createPaymentTransaction({
      orderId: `LELANG-${auctionId}-${Date.now()}`,
      grossAmount: Math.round(winningBid.amount),
      customerDetails: {
        firstName: user.name || 'User',
        email: user.email || '',
        phone: user.phone,
      },
      itemDetails: [
        {
          id: auction.id,
          name: auction.title,
          price: Math.round(winningBid.amount),
          quantity: 1,
        },
      ],
    });

    // Save transaction to database
    await prisma.transaction.update({
      where: { id: auctionId }, // Assuming transaction was created before
      data: {
        paymentId: paymentResult.token,
        paymentUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${paymentResult.token}`,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ data: paymentResult });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Failed to create payment',
      },
      { status: 400 }
    );
  }
}
```

### 6.3 Create Payment Webhook Handler

**File: `src/app/api/payments/webhook/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify webhook signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const orderId = body.order_id;
    const statusCode = body.status_code;
    const grossAmount = body.gross_amount;

    const signature = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex');

    if (signature !== body.signature_key) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Handle payment status
    const transactionStatus = body.transaction_status;
    let paymentStatus: 'PAID' | 'FAILED' | 'PENDING' = 'PENDING';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      paymentStatus = 'PAID';
    } else if (
      transactionStatus === 'deny' ||
      transactionStatus === 'cancel' ||
      transactionStatus === 'expire'
    ) {
      paymentStatus = 'FAILED';
    }

    // Update transaction
    await prisma.transaction.updateMany({
      where: { paymentId: orderId },
      data: {
        status: paymentStatus,
        paidAt: paymentStatus === 'PAID' ? new Date() : null,
      },
    });

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
```

---

## Fase 7: Notifications

### 7.1 Setup WhatsApp OTP Service

**File: `src/lib/services/whatsapp.service.ts`**
```typescript
import axios from 'axios';

const fontneBaseUrl = 'https://api.fonnte.com';

export async function sendWhatsAppOTP(
  phone: string,
  otpCode: string
) {
  try {
    const response = await axios.post(`${fontneBaseUrl}/send`, {
      target: phone,
      message: `Your OTP verification code: ${otpCode}\n\nDo not share this code with anyone. Valid for 5 minutes.`,
      countryCode: '62',
    }, {
      headers: {
        Authorization: process.env.FONNTE_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to send WhatsApp OTP: ${error instanceof Error ? error.message : ''}`
    );
  }
}

export async function sendWhatsAppNotification(
  phone: string,
  message: string
) {
  try {
    const response = await axios.post(`${fontneBaseUrl}/send`, {
      target: phone,
      message,
      countryCode: '62',
    }, {
      headers: {
        Authorization: process.env.FONNTE_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to send WhatsApp notification: ${error instanceof Error ? error.message : ''}`
    );
  }
}
```

### 7.2 Setup Email Notification Service

**File: `src/lib/services/email.service.ts`**
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP Verification Code',
      html: `
        <h2>Verification Code</h2>
        <p>Your OTP code: <strong>${otp}</strong></p>
        <p>Valid for 5 minutes. Do not share this code with anyone.</p>
      `,
    });
  } catch (error) {
    throw new Error(
      `Failed to send OTP email: ${error instanceof Error ? error.message : ''}`
    );
  }
}

export async function sendPaymentConfirmation(
  email: string,
  orderId: string,
  amount: number,
  auctionTitle: string
) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Payment Confirmation',
      html: `
        <h2>Payment Successful</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Auction:</strong> ${auctionTitle}</p>
        <p><strong>Amount:</strong> Rp ${amount.toLocaleString('id-ID')}</p>
        <p>Thank you for your purchase!</p>
      `,
    });
  } catch (error) {
    throw new Error(
      `Failed to send confirmation email: ${error instanceof Error ? error.message : ''}`
    );
  }
}
```

---

## Fase 8: Admin Panel

### 8.1 Create Admin Dashboard

**File: `src/app/admin/page.tsx`**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface DashboardStats {
  totalUsers: number;
  totalAuctions: number;
  totalBids: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  if (session?.user?.role !== 'ADMIN') {
    redirect('/');
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      {stats && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Auctions</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {stats.totalAuctions}
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Bids</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {stats.totalBids}
            </p>
          </div>

          <div className="rounded-lg bg-orange-50 p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              Rp {stats.totalRevenue.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 8.2 Create Admin Auction Management

Create pages:
- `src/app/admin/auctions/page.tsx` - List all auctions with edit/delete options
- `src/app/admin/auctions/create/page.tsx` - Create new auction form
- `src/app/admin/auctions/[id]/page.tsx` - Edit auction

API routes:
- `src/app/api/admin/auctions/route.ts` - GET all auctions (admin-only)
- `src/app/api/admin/auctions/create/route.ts` - POST create auction (admin-only)
- `src/app/api/admin/auctions/[id]/route.ts` - PUT/DELETE auction (admin-only)

---

## Fase 9: Testing & Optimization

### 9.1 Setup Jest Testing

**File: `jest.config.js`**
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 9.2 Performance Optimization

- Enable image optimization with Next.js Image
- Use dynamic imports for code splitting
- Implement caching strategies with Redis
- Optimize database queries with proper indexing

### 9.3 E2E Testing with Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

---

## Fase 10: Deployment

### 10.1 Prepare for Production

```bash
# Build the application
npm run build

# Test the build locally
npm run start
```

### 10.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 10.3 Setup Environment Variables on Vercel

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all production environment variables

### 10.4 Setup Database for Production

```bash
# Use managed PostgreSQL service (e.g., Vercel Postgres, Railway, Heroku)
# Or install PostgreSQL on your server

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### 10.5 Setup CI/CD with GitHub Actions

**File: `.github/workflows/deploy.yml`**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📚 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Database
npx prisma studio   # Open Prisma Studio
npx prisma migrate dev --name migration_name
npx prisma db seed

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests

# Production
npm run build        # Build for production
npm run start        # Start production server
```

---

## 🔍 Important Checklist

- [ ] Database setup dan migrations completed
- [ ] Authentication system fully working
- [ ] OTP WhatsApp integration tested
- [ ] Auction CRUD operations working
- [ ] Bidding system functional
- [ ] Payment gateway (Midtrans) integrated
- [ ] Webhook handling verified
- [ ] Email notifications setup
- [ ] Admin panel created and tested
- [ ] Security audit completed
- [ ] Performance optimized
- [ ] Responsive design verified
- [ ] SSL certificate configured
- [ ] Monitoring and alerts setup
- [ ] Backup strategy implemented
- [ ] Documentation completed
- [ ] Legal pages (ToS, Privacy Policy) added
- [ ] Ready for production deployment

---

## 🎯 Next Steps After MVP Launch

1. Collect user feedback
2. Monitor analytics and error logs
3. Optimize based on user behavior
4. Implement future features gradually
5. Maintain regular updates and security patches

---

*Last updated: December 10, 2025*
