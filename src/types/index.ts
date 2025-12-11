/**
 * Type definitions untuk aplikasi Lelang Online
 */

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  rating: number;
  totalReviews: number;
  memberSince: Date;
  bio?: string;
  points?: number;
  activeBids?: number;
  wonCount?: number;
  sellingCount?: number;
}

// Auction Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string | null;
}

export interface Auction {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  sellerId: string;
  startingPrice: number;
  currentPrice: number;
  reservePrice?: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'ENDED' | 'SOLD' | 'CANCELLED';
  image: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  bidCount: number;
  rating: number;
  createdAt: Date;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  status: 'ACTIVE' | 'OUTBID' | 'WON' | 'CANCELLED';
  createdAt: Date;
  autoBid?: boolean;
  maxAutoBidAmount?: number;
}

export interface Transaction {
  id: string;
  auctionId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'EXPIRED';
  type: 'PAYMENT' | 'REFUND' | 'COMMISSION';
  createdAt: Date;
}

export interface Review {
  id: string;
  auctionId: string;
  authorId: string;
  targetId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Watchlist {
  id: string;
  userId: string;
  auctionId: string;
  createdAt: Date;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface CreateAuctionFormData {
  title: string;
  description: string;
  categoryId: string;
  startingPrice: number;
  reservePrice?: number;
  duration: number;
  images: File[];
}

export interface PlaceBidFormData {
  amount: number;
  autoBid?: boolean;
  maxAutoBidAmount?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Filter Types
export interface AuctionFilters {
  category?: string;
  status?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'ending_soon';
  search?: string;
}
