'use client';

import { useState, useEffect } from 'react';
import { DUMMY_AUCTIONS, filterAuctions } from '@/lib/constants/dummyData';
import { Auction } from '@/types';

interface UseAuctionsParams {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  page?: number;
}

export function useAuctions(params?: UseAuctionsParams) {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = filterAuctions({
          category: params?.category,
          status: params?.status,
          search: params?.search,
        });

        // Pagination
        const limit = params?.limit || 10;
        const page = params?.page || 1;
        const start = (page - 1) * limit;
        const paginatedAuctions = filtered.slice(start, start + limit);

        setAuctions(paginatedAuctions);
        setError(null);
      }, 300);
    } catch (err) {
      setError('Failed to load auctions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params?.category, params?.status, params?.search, params?.limit, params?.page]);

  return {
    auctions,
    loading,
    error,
    total: filterAuctions({
      category: params?.category,
      status: params?.status,
      search: params?.search,
    }).length,
  };
}

export function useAllAuctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAuctions(DUMMY_AUCTIONS);
      setLoading(false);
    }, 300);
  }, []);

  return { auctions, loading };
}
