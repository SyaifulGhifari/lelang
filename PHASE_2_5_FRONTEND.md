# 🎨 Fase 2.5: Frontend UI & Component Setup

**Frontend Slicing & Reusable Component Library**

Status: ⏳ Ready to Implement  
Estimated Duration: 3-4 days  
Priority: HIGH (Foundation untuk semua UI)

---

## 📋 Overview

Fase 2.5 fokus pada:
1. Setup reusable component library (shadcn/ui)
2. Buat layout components (Header, Footer, Sidebar)
3. Buat shared components (Button, Card, Form, Modal, Toast, etc)
4. Buat page layouts untuk semua routes
5. Buat auction & dashboard components
6. Setup responsive design & global styles

---

## 🎯 Deliverables

### 1. UI Component Library Setup

```bash
# Install shadcn/ui
npx shadcn-ui@latest init

# Minimal components yang wajib:
- button
- input
- card
- form
- dialog / modal
- dropdown-menu
- select
- pagination
- toast
- avatar
- badge
- tabs
- alert
- separator
```

### 2. Layout Components (3 files)

| Component | Purpose | Lokasi |
|-----------|---------|--------|
| `Header.tsx` | Top navigation | `src/components/layout/` |
| `Footer.tsx` | Footer section | `src/components/layout/` |
| `Sidebar.tsx` | Admin sidebar | `src/components/layout/` |

### 3. Shared Components (10+ files)

| Component | Purpose | Features |
|-----------|---------|----------|
| `SearchBar.tsx` | Search auctions | Real-time search, filters |
| `Pagination.tsx` | Page navigation | Previous/Next/Jump to page |
| `LoadingSkeleton.tsx` | Loading state | Skeleton placeholder |
| `EmptyState.tsx` | Empty data | Icon + message |
| `ErrorBoundary.tsx` | Error handling | Catch errors |
| `Modal.tsx` | Dialog modal | Customizable content |
| `Toast.tsx` | Notifications | Success/Error/Warning/Info |
| `Badge.tsx` | Status badges | Different variants |
| `Avatar.tsx` | User avatar | Image + fallback |
| `Button.tsx` | Button variants | Primary/Secondary/Danger |

### 4. Form Components (5 files)

| Form | Purpose | Fields |
|------|---------|--------|
| `LoginForm.tsx` | Login | Email, Password |
| `RegisterForm.tsx` | Registration | Email, Phone, Password, Name |
| `AuctionForm.tsx` | Create Auction | Title, Description, Price, Images |
| `SearchFilters.tsx` | Advanced Search | Category, Price Range, Status |
| `BidForm.tsx` | Place Bid | Bid Amount, Auto-bid Toggle |

### 5. Auction Components (7 files)

```
src/components/auction/
├── AuctionCard.tsx          # Display auction summary
├── AuctionGrid.tsx          # Grid container
├── AuctionDetail.tsx        # Full detail page
├── AuctionGallery.tsx       # Image carousel
├── CountdownTimer.tsx       # Live timer
├── BidHistory.tsx           # Bid list
└── BidForm.tsx              # Bidding form
```

### 6. Dashboard Components (5 files)

```
src/components/dashboard/
├── StatsCard.tsx            # Stats widget
├── RecentActivity.tsx       # Activity log
├── UserStats.tsx            # User statistics
├── WonAuctions.tsx          # Won items list
└── BidHistory.tsx           # Bid history table
```

### 7. Page Structure

```
src/app/
├── (auth)/
│   ├── layout.tsx                    # Auth layout
│   ├── login/page.tsx               # Login page
│   ├── register/page.tsx            # Register page
│   └── forgot-password/page.tsx     # Forgot password
│
├── (main)/
│   ├── layout.tsx                    # Main layout
│   ├── page.tsx                      # Home page
│   ├── auctions/
│   │   ├── page.tsx                 # Auctions list
│   │   └── [id]/page.tsx            # Auction detail
│   ├── categories/
│   │   ├── page.tsx                 # Categories list
│   │   └── [slug]/page.tsx          # Category detail
│   └── dashboard/
│       ├── page.tsx                 # User dashboard
│       ├── my-bids/page.tsx         # My bids
│       ├── my-wins/page.tsx         # Won auctions
│       └── settings/page.tsx        # Settings
│
├── admin/
│   ├── layout.tsx                    # Admin layout
│   ├── page.tsx                      # Admin dashboard
│   ├── auctions/
│   │   ├── page.tsx                 # List auctions
│   │   ├── create/page.tsx          # Create form
│   │   └── [id]/page.tsx            # Edit auction
│   ├── users/
│   │   ├── page.tsx                 # List users
│   │   └── [id]/page.tsx            # User detail
│   ├── categories/
│   │   ├── page.tsx                 # List categories
│   │   └── [id]/page.tsx            # Edit category
│   └── transactions/page.tsx        # Transaction log
│
├── layout.tsx                        # Root layout
├── page.tsx                          # Home page
├── not-found.tsx                     # 404 page
└── globals.css                       # Global styles
```

---

## 📐 Component Architecture

### Header Component Structure
```
<Header>
  ├── Logo
  ├── Navigation Menu
  │   ├── Home
  │   ├── Auctions
  │   ├── Categories
  │   └── About
  ├── Search Bar
  ├── User Menu (if logged in)
  │   ├── Dashboard
  │   ├── My Bids
  │   ├── Settings
  │   └── Logout
  └── Auth Links (if not logged in)
      ├── Login
      └── Register
```

### Page Layout Structure
```
<Layout>
  ├── <Header />
  ├── <main>
  │   └── {page content}
  ├── <Footer />
  └── <Toast Provider />
```

### Auction Card Structure
```
<AuctionCard>
  ├── Image
  ├── Badge (Status)
  ├── Title
  ├── Description (truncated)
  ├── Current Price
  ├── Bid Count
  ├── Time Remaining
  └── View Button
```

---

## 🎨 Design System

### Color Palette
```
Primary:   #007AFF (Blue)
Secondary: #5AC8FA (Light Blue)
Danger:    #FF3B30 (Red)
Success:   #34C759 (Green)
Warning:   #FF9500 (Orange)
Gray:      #F5F5F5 - #333333 (Various)
```

### Typography
```
Headings:    Bold, 1.5x - 3x base size
Body:        Regular, base size (16px)
Small:       Regular, 0.875x base size
Mono:        Monospace, code snippets
```

### Spacing
```
xs: 0.25rem (4px)
sm: 0.5rem  (8px)
md: 1rem    (16px)
lg: 1.5rem  (24px)
xl: 2rem    (32px)
```

### Breakpoints (Tailwind)
```
Mobile:        0px - 767px    (@media max-width: 767px)
Tablet:        768px - 1023px (@media min-width: 768px)
Desktop:       1024px - 1439px (@media min-width: 1024px)
Large Desktop: 1440px+        (@media min-width: 1440px)
```

---

## 📝 Implementation Steps

### Step 1: Setup shadcn/ui (30 mins)
```bash
cd e:\latihan\lelang
npx shadcn-ui@latest init
# Pilih Tailwind CSS + ts
```

### Step 2: Create Folder Structure (30 mins)
```bash
mkdir -p src/components/layout
mkdir -p src/components/shared
mkdir -p src/components/forms
mkdir -p src/components/auction
mkdir -p src/components/dashboard
mkdir -p src/types
```

### Step 3: Create Base Components (2 hours)
- Header.tsx
- Footer.tsx
- Button variants
- Card wrapper
- Form components

### Step 4: Create Page Layouts (3 hours)
- (auth) layout & pages
- (main) layout & pages
- admin layout & pages

### Step 5: Create Feature Components (2 hours)
- Auction components
- Dashboard components
- Search/Filter components

### Step 6: Setup Global Styles (1 hour)
- globals.css
- Custom Tailwind components
- Responsive utilities

### Step 7: Testing & Refinement (2 hours)
- Test responsive design
- Visual consistency check
- Browser compatibility

---

## 🚀 Getting Started Commands

```bash
# 1. Initialize shadcn/ui
npx shadcn-ui@latest init

# 2. Add components satu-satu atau batch
npx shadcn-ui@latest add button input card form

# 3. Create component files
# (Ada template di bawah)

# 4. Test dev server
npm run dev
# Akses http://localhost:3000
```

---

## 📦 File Templates

### Basic Component Template
```typescript
'use client';

import { ReactNode } from 'react';

interface ComponentNameProps {
  children?: ReactNode;
  className?: string;
}

export default function ComponentName({
  children,
  className = '',
}: ComponentNameProps) {
  return (
    <div className={`component-base ${className}`}>
      {children}
    </div>
  );
}
```

### Page Template
```typescript
import { ReactNode } from 'react';

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Page Title</h1>
      {/* Page content */}
    </main>
  );
}
```

### Layout Template
```typescript
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
```

---

## ✅ Checklist

### Components
- [ ] shadcn/ui initialized
- [ ] Header component
- [ ] Footer component
- [ ] Sidebar component
- [ ] Button variants
- [ ] Card component
- [ ] Form components
- [ ] Modal component
- [ ] Toast component
- [ ] Search bar
- [ ] Pagination
- [ ] Loading skeleton
- [ ] Empty state
- [ ] Error boundary
- [ ] Auction card
- [ ] Auction detail
- [ ] Auction gallery
- [ ] Countdown timer
- [ ] Bid form
- [ ] Bid history
- [ ] Dashboard stats
- [ ] Recent activity

### Pages
- [ ] Home page
- [ ] Login page
- [ ] Register page
- [ ] Auctions list page
- [ ] Auction detail page
- [ ] Categories page
- [ ] User dashboard
- [ ] Admin dashboard
- [ ] Admin auctions
- [ ] Admin users
- [ ] 404 page

### Styling
- [ ] Global CSS
- [ ] Color system
- [ ] Typography scale
- [ ] Spacing system
- [ ] Responsive breakpoints
- [ ] Custom components
- [ ] Dark mode (optional)

### Quality
- [ ] Responsive design tested
- [ ] Cross-browser tested
- [ ] Accessibility checked
- [ ] Performance optimized
- [ ] Mobile-friendly

---

## 📊 Estimated Timeline

| Task | Duration | Status |
|------|----------|--------|
| shadcn/ui setup | 30 min | ⏳ |
| Folder structure | 30 min | ⏳ |
| Layout components | 2 hours | ⏳ |
| Shared components | 2 hours | ⏳ |
| Form components | 1.5 hours | ⏳ |
| Page layouts | 3 hours | ⏳ |
| Feature components | 2 hours | ⏳ |
| Global styles | 1 hour | ⏳ |
| Testing & polish | 2 hours | ⏳ |
| **TOTAL** | **14 hours** | ⏳ |

**Optimal Schedule**: 3-4 hari kerja dengan 4-5 hours per hari

---

## 🔗 Dependencies Sudah Ada

Semua yang dibutuhkan sudah installed di Fase 1:
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ React Hook Form
- ✅ Zod (validation)

Tinggal tambah shadcn/ui components!

---

## 📚 Resources

- **shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Hook Form**: https://react-hook-form.com/
- **Next.js App Router**: https://nextjs.org/docs/app

---

## 🎯 Success Criteria

✅ Semua components reusable & maintainable  
✅ Responsive design tested di semua breakpoints  
✅ Consistent design system (colors, fonts, spacing)  
✅ Ready untuk integration dengan backend (Fase 3)  
✅ Performance optimized (code splitting, lazy loading)  

---

**Ready to start Fase 2.5? Atau ada yang ingin didiskusikan dulu?** 🚀
