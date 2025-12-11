# 🔥 Lelang Online - Auction Platform

Production-grade Next.js full-stack auction platform built with modern technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm/yarn
- PostgreSQL 13+ (local or cloud)
- Git

### Installation

```bash
# Clone repository
git clone <repo-url>
cd lelang

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma Client
npx prisma generate

# Create and run database migration
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router (pages & API)
├── components/          # Reusable React components
├── lib/                 # Core logic & utilities
│   ├── auth/           # Authentication logic
│   ├── db/             # Database client
│   ├── validators/     # Zod schemas
│   ├── services/       # Business logic
│   └── constants/      # App constants
├── hooks/              # Custom React hooks
├── middleware/         # Next.js middleware
├── services/           # External services
├── store/              # Zustand state management
└── types/              # TypeScript types

prisma/
└── schema.prisma       # Database schema

public/                 # Static assets
```

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Prisma 5** - ORM
- **PostgreSQL** - Database
- **NextAuth 4** - Authentication
- **Midtrans** - Payment gateway
- **Fonnte** - WhatsApp OTP

## 📜 Available Scripts

```bash
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npx prisma migrate     # Run database migrations
npx prisma studio     # Open Prisma Studio GUI
```

## 📚 Documentation

- [Phase 1 Complete ✅](./PHASE_1_COMPLETE.md) - Project setup
- [PRD Document](./PRD-Lelang-Website.md) - Product requirements
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Development phases

---

**Last Updated:** December 11, 2025

