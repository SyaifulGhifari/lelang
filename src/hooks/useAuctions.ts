import { useState, useEffect } from 'react';
import { DUMMY_AUCTIONS, DUMMY_CATEGORIES } from '@/lib/constants/dummyData';
import type { Auction } from '@/types';

interface AuctionFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  searchQuery?: string;
  sortBy?: string;
}

interface UseAuctionsReturn {
  auctions: Auction[];
  isLoading: boolean;
  error: string | null;
  filters: AuctionFilters;
  setFilters: (filters: AuctionFilters) => void;
  totalCount: number;
}

export function useAuctions(initialFilters?: AuctionFilters): UseAuctionsReturn {
  const [filters, setFilters] = useState<AuctionFilters>(initialFilters || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFilteredAuctions = (): Auction[] => {
    let result = [...DUMMY_AUCTIONS];

    // Filter by category
    if (filters.categoryId) {
      result = result.filter((a) => a.categoryId === filters.categoryId);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((a) => a.currentPrice >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((a) => a.currentPrice <= filters.maxPrice!);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter((a) => a.status === filters.status);
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          result.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price_high':
          result.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'ending_soon':
          result.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
          break;
        case 'most_bids':
          result.sort((a, b) => b.bidCount - a.bidCount);
          break;
      }
    }

    return result;
  };

  const auctions = getFilteredAuctions();

  return {
    auctions,
    isLoading,
    error,
    filters,
    setFilters,
    totalCount: auctions.length,
  };
}

export function useAuctionById(auctionId: string) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const found = DUMMY_AUCTIONS.find((a) => a.id === auctionId);
      setAuction(found || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [auctionId]);

  return { auction, isLoading };
}

export function useCategoryById(categoryId: string) {
  const category = DUMMY_CATEGORIES.find((c) => c.id === categoryId);
  return category;
}
