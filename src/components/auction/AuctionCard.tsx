'use client';

import Link from 'next/link';
import { Badge } from '@/components/shared/Badge';
import type { Auction } from '@/types';

interface AuctionCardProps {
  auction: Auction;
  onWatchlist?: boolean;
}

export function AuctionCard({ auction, onWatchlist = false }: AuctionCardProps) {
  const timeLeft = Math.max(0, auction.endDate.getTime() - Date.now());
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <Link href={`/auctions/${auction.id}`}>
      <div className="overflow-hidden rounded-lg border bg-white shadow hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gray-200">
          <img
            src={auction.image}
            alt={auction.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant={
                auction.status === 'ACTIVE'
                  ? 'success'
                  : auction.status === 'SOLD'
                    ? 'danger'
                    : 'warning'
              }
            >
              {auction.status}
            </Badge>
          </div>
          {onWatchlist && (
            <button className="absolute top-3 left-3 rounded-full bg-white p-2 hover:bg-gray-100">
              ❤️
            </button>
          )}
        </div>

        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">{auction.title}</h3>

          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
              {auction.categoryId}
            </span>
          </div>

          <div className="mb-3 border-t pt-3">
            <p className="text-lg font-bold text-gray-900">
              Rp {auction.currentPrice.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500">Current bid</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{auction.rating}</span>
              <span className="text-gray-500">({auction.bidCount})</span>
            </div>
            <span className="text-gray-600">
              ⏱️ {daysLeft}d {hoursLeft}h
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
