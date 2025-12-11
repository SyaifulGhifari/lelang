'use client';

import { AuctionCard } from './AuctionCard';
import { LoadingSkeleton, EmptyState } from '@/components/shared';
import type { Auction } from '@/types';

interface AuctionGridProps {
  auctions: Auction[];
  isLoading?: boolean;
  watchlist?: string[];
}

export function AuctionGrid({ auctions, isLoading = false, watchlist = [] }: AuctionGridProps) {
  if (isLoading) {
    return <LoadingSkeleton variant="card" count={8} />;
  }

  if (auctions.length === 0) {
    return <EmptyState title="No auctions found" description="Try adjusting your filters" />;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          auction={auction}
          onWatchlist={watchlist.includes(auction.id)}
        />
      ))}
    </div>
  );
}
