import { useState, useEffect } from 'react';
import { DUMMY_BIDS } from '@/lib/constants/dummyData';
import type { Bid } from '@/types';

interface UseBidsReturn {
  bids: Bid[];
  isLoading: boolean;
  error: string | null;
}

export function useBids(): UseBidsReturn {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      try {
        setBids(DUMMY_BIDS);
        setError(null);
      } catch (err) {
        setError('Failed to load bids');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { bids, isLoading, error };
}

export function useBidsByAuction(auctionId: string): UseBidsReturn {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const filtered = DUMMY_BIDS.filter((b) => b.auctionId === auctionId).sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        setBids(filtered);
        setError(null);
      } catch (err) {
        setError('Failed to load bids');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [auctionId]);

  return { bids, isLoading, error };
}

export function useBidsByUser(userId: string): UseBidsReturn {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const filtered = DUMMY_BIDS.filter((b) => b.bidderId === userId).sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        setBids(filtered);
        setError(null);
      } catch (err) {
        setError('Failed to load bids');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [userId]);

  return { bids, isLoading, error };
}
