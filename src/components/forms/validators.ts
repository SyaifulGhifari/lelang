import { z } from 'zod';

// Login Form Validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Form Validation
export const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val, 'You must agree to terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Create Auction Form Validation
export const createAuctionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  categoryId: z.string().min(1, 'Please select a category'),
  startingPrice: z.number().min(1000, 'Starting price must be at least 1000'),
  reservePrice: z.number().optional(),
  duration: z.string().min(1, 'Please select duration'),
});

export type CreateAuctionFormData = z.infer<typeof createAuctionSchema>;

// Bid Form Validation
export const bidSchema = z
  .object({
    bidAmount: z.number().min(1000, 'Bid must be at least 1000'),
    autoBid: z.boolean().optional(),
    maxBidAmount: z.number().optional(),
  })
  .refine((data) => {
    if (data.autoBid && !data.maxBidAmount) return false;
    return true;
  }, {
    message: 'Max bid amount is required for auto bid',
    path: ['maxBidAmount'],
  });

export type BidFormData = z.infer<typeof bidSchema>;

// Search Filters Validation
export const searchFiltersSchema = z.object({
  searchQuery: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
});

export type SearchFiltersData = z.infer<typeof searchFiltersSchema>;
