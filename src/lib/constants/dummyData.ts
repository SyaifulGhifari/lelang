/**
 * Dummy Data untuk Frontend Development
 * Gunakan data ini di custom hooks sampai backend API siap
 */

import { User, Category, Auction, Bid, Transaction, Review } from '@/types';

// Dummy Users
export const DUMMY_USERS: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+62812345678',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'USER',
    status: 'ACTIVE',
    rating: 4.8,
    totalReviews: 25,
    memberSince: new Date('2023-01-15'),
    bio: 'Passionate collector of vintage items',
    points: 1500,
    activeBids: 3,
    wonCount: 12,
    sellingCount: 2,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+62812345679',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'USER',
    status: 'ACTIVE',
    rating: 4.9,
    totalReviews: 42,
    memberSince: new Date('2022-06-20'),
    bio: 'Electronics seller',
    points: 3200,
    activeBids: 5,
    wonCount: 28,
    sellingCount: 8,
  },
  {
    id: 'user-3',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+62812345680',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    role: 'USER',
    status: 'ACTIVE',
    rating: 4.6,
    totalReviews: 18,
    memberSince: new Date('2023-08-10'),
    bio: 'Fashion enthusiast',
    points: 890,
    activeBids: 2,
    wonCount: 7,
    sellingCount: 1,
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+62812345681',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'ADMIN',
    status: 'ACTIVE',
    rating: 5.0,
    totalReviews: 50,
    memberSince: new Date('2022-01-05'),
    bio: 'Platform admin',
    points: 5000,
  },
  {
    id: 'user-5',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+62812345682',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'USER',
    status: 'ACTIVE',
    rating: 4.7,
    totalReviews: 35,
    memberSince: new Date('2023-03-12'),
    bio: 'Tech gadget collector',
    points: 2100,
    activeBids: 4,
    wonCount: 15,
    sellingCount: 3,
  },
];

// Dummy Categories
export const DUMMY_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: '📱',
    parentId: null,
  },
  {
    id: 'cat-2',
    name: 'Phones',
    slug: 'phones',
    description: 'Mobile phones and accessories',
    image: '📞',
    parentId: 'cat-1',
  },
  {
    id: 'cat-3',
    name: 'Vintage & Collectibles',
    slug: 'vintage',
    description: 'Vintage and collectible items',
    image: '⌚',
    parentId: null,
  },
  {
    id: 'cat-4',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    description: 'Clothing, shoes, and accessories',
    image: '👗',
    parentId: null,
  },
  {
    id: 'cat-5',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Furniture and home decor',
    image: '🏠',
    parentId: null,
  },
];

// Dummy Auctions
export const DUMMY_AUCTIONS: Auction[] = [
  {
    id: 'auction-1',
    title: 'Vintage Rolex Submariner Watch',
    slug: 'vintage-rolex-submariner',
    description:
      'Authentic Rolex Submariner from 1970s in excellent condition. Fully functional with original box and papers. Rare find for collectors!',
    categoryId: 'cat-3',
    sellerId: 'user-2',
    startingPrice: 5000000,
    currentPrice: 7500000,
    reservePrice: 4000000,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7cb9c7db7d?w=500&h=500&fit=crop',
    ],
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    bidCount: 18,
    rating: 4.9,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'auction-2',
    title: 'iPhone 15 Pro Max 256GB Space Black',
    slug: 'iphone-15-pro-max',
    description:
      'Brand new, sealed in original box. Never opened. All accessories included. 12-month warranty. Genuine Apple product.',
    categoryId: 'cat-2',
    sellerId: 'user-1',
    startingPrice: 12000000,
    currentPrice: 13500000,
    reservePrice: 11000000,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25e4be54?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1592286927505-1def25e4be54?w=500&h=500&fit=crop'],
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    bidCount: 34,
    rating: 4.7,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'auction-3',
    title: 'Premium Vintage Leather Jacket',
    slug: 'vintage-leather-jacket',
    description:
      'Genuine Italian leather, brown color, slightly used. Perfect condition. Size L. Vintage 1980s piece. Authentic and rare.',
    categoryId: 'cat-4',
    sellerId: 'user-2',
    startingPrice: 500000,
    currentPrice: 800000,
    reservePrice: 450000,
    status: 'ENDED',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop'],
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    bidCount: 12,
    rating: 4.6,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'auction-4',
    title: 'MacBook Pro 16" M3 Max 2024',
    slug: 'macbook-pro-16-m3',
    description:
      '16-inch MacBook Pro with M3 Max chip. 36GB RAM, 512GB SSD. Silver color. Barely used, like new condition. Original packaging included.',
    categoryId: 'cat-1',
    sellerId: 'user-3',
    startingPrice: 25000000,
    currentPrice: 28500000,
    reservePrice: 24000000,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop'],
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    bidCount: 28,
    rating: 4.8,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'auction-5',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    slug: 'sony-headphones-wh-1000xm5',
    description:
      'Premium noise-cancelling headphones. Black color. Original packaging and all accessories. Excellent sound quality. Factory sealed.',
    categoryId: 'cat-1',
    sellerId: 'user-5',
    startingPrice: 2500000,
    currentPrice: 3200000,
    reservePrice: 2200000,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    bidCount: 15,
    rating: 4.9,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'auction-6',
    title: 'Antique Wooden Desk - Victorian Era',
    slug: 'antique-wooden-desk',
    description:
      'Beautiful antique wooden desk from Victorian era. Hand-carved details. Solid oak wood. Minor wear adds to character. Collectible piece.',
    categoryId: 'cat-5',
    sellerId: 'user-4',
    startingPrice: 3000000,
    currentPrice: 4200000,
    reservePrice: 2800000,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop'],
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    bidCount: 9,
    rating: 4.5,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
];

// Dummy Bids
export const DUMMY_BIDS: Bid[] = [
  {
    id: 'bid-1',
    auctionId: 'auction-1',
    bidderId: 'user-1',
    amount: 7500000,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    autoBid: false,
  },
  {
    id: 'bid-2',
    auctionId: 'auction-1',
    bidderId: 'user-3',
    amount: 7200000,
    status: 'OUTBID',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    autoBid: true,
    maxAutoBidAmount: 8000000,
  },
  {
    id: 'bid-3',
    auctionId: 'auction-2',
    bidderId: 'user-1',
    amount: 13500000,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    autoBid: false,
  },
  {
    id: 'bid-4',
    auctionId: 'auction-2',
    bidderId: 'user-5',
    amount: 13200000,
    status: 'OUTBID',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    autoBid: true,
    maxAutoBidAmount: 14000000,
  },
  {
    id: 'bid-5',
    auctionId: 'auction-4',
    bidderId: 'user-3',
    amount: 28500000,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    autoBid: false,
  },
];

// Dummy Transactions
export const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    auctionId: 'auction-3',
    buyerId: 'user-1',
    sellerId: 'user-2',
    amount: 800000,
    paymentStatus: 'PAID',
    type: 'PAYMENT',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'txn-2',
    auctionId: 'auction-3',
    buyerId: 'user-1',
    sellerId: 'user-2',
    amount: 80000,
    paymentStatus: 'PAID',
    type: 'COMMISSION',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'txn-3',
    auctionId: 'auction-5',
    buyerId: 'user-4',
    sellerId: 'user-5',
    amount: 3200000,
    paymentStatus: 'PENDING',
    type: 'PAYMENT',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

// Dummy Reviews
export const DUMMY_REVIEWS: Review[] = [
  {
    id: 'review-1',
    auctionId: 'auction-3',
    authorId: 'user-1',
    targetId: 'user-2',
    rating: 5,
    comment: 'Item exactly as described, great seller! Very professional and fast shipping.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'review-2',
    auctionId: 'auction-3',
    authorId: 'user-2',
    targetId: 'user-1',
    rating: 5,
    comment: 'Perfect buyer! Fast payment and good communication. Would trade again.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'review-3',
    auctionId: 'auction-2',
    authorId: 'user-5',
    targetId: 'user-1',
    rating: 4,
    comment: 'Good seller, item as described. Shipping took a bit longer than expected.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

// Helper function untuk mendapatkan user dengan ID
export function getUserById(userId: string): User | undefined {
  return DUMMY_USERS.find((user) => user.id === userId);
}

// Helper function untuk mendapatkan auction dengan ID
export function getAuctionById(auctionId: string): Auction | undefined {
  return DUMMY_AUCTIONS.find((auction) => auction.id === auctionId);
}

// Helper function untuk mendapatkan bids untuk auction
export function getBidsForAuction(auctionId: string): Bid[] {
  return DUMMY_BIDS.filter((bid) => bid.auctionId === auctionId).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

// Helper function untuk filter auctions
export function filterAuctions(filters: {
  category?: string;
  status?: string;
  search?: string;
}): Auction[] {
  return DUMMY_AUCTIONS.filter((auction) => {
    if (filters.category && auction.categoryId !== filters.category) {
      return false;
    }
    if (filters.status && auction.status !== filters.status) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!auction.title.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    return true;
  });
}
