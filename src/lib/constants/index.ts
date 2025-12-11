// Auction related constants
export const AUCTION = {
  // Bid increment minimum (Rp)
  MIN_BID_INCREMENT: 10000,

  // Payment timeout (minutes)
  PAYMENT_TIMEOUT: 15,

  // OTP expiry (minutes)
  OTP_EXPIRY: 5,

  // Auction status
  STATUS: {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    ENDED: 'ENDED',
    SOLD: 'SOLD',
    CANCELLED: 'CANCELLED',
  },

  // Auction condition
  CONDITIONS: ['Baru', 'Bekas', 'Refurbished'],
} as const;

// User related constants
export const USER = {
  ROLES: {
    ADMIN: 'ADMIN',
    USER: 'USER',
  },
  STATUS: {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    DELETED: 'DELETED',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Currency
export const CURRENCY = {
  CODE: 'IDR',
  SYMBOL: 'Rp',
  DECIMALS: 0,
} as const;
