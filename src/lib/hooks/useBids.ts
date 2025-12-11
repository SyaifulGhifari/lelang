'use client';

import { useState, useEffect } from 'react';
import { DUMMY_BIDS, DUMMY_AUCTIONS } from '@/lib/constants/dummyData';
import { Bid } from '@/types';

export function useBids(auctionId?: string) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        if (auctionId) {
          const filtered = DUMMY_BIDS.filter((bid) => bid.auctionId === auctionId);
          setBids(filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
        } else {
          setBids(DUMMY_BIDS);
        }
        setError(null);
      }, 300);
    } catch (err) {
      setError('Failed to load bids');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [auctionId]);

  return { bids, loading, error };
}

export function useUserBids(userId: string) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const userBids = DUMMY_BIDS.filter((bid) => bid.bidderId === userId);
      // Enrich with auction info
      const enrichedBids = userBids.map((bid) => {
        const auction = DUMMY_AUCTIONS.find((a) => a.id === bid.auctionId);
        return {
          ...bid,
          auctionTitle: auction?.title,
          auctionCurrentPrice: auction?.currentPrice,
        };
      });
      setBids(enrichedBids as any);
      setLoading(false);
    }, 300);
  }, [userId]);

  return { bids, loading };
}
