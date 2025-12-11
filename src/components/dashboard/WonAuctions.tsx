'use client';

import Link from 'next/link';
import { Badge } from '@/components/shared';
import type { Auction } from '@/types';

interface WonAuctionsProps {
  auctions: Auction[];
}

export function WonAuctions({ auctions }: WonAuctionsProps) {
  if (auctions.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow text-center">
        <p className="text-gray-600">You haven't won any auctions yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">Your Won Auctions</h2>

      <div className="space-y-4">
        {auctions.map((auction) => (
          <Link key={auction.id} href={`/auctions/${auction.id}`}>
            <div className="flex gap-4 rounded border border-transparent hover:border-blue-300 hover:bg-blue-50 p-3 transition cursor-pointer">
              <img
                src={auction.image}
                alt={auction.title}
                className="h-24 w-24 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{auction.title}</h3>
                <p className="mt-1 text-sm text-gray-600">Category: {auction.categoryId}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    Rp {auction.currentPrice.toLocaleString('id-ID')}
                  </span>
                  <Badge variant="success" size="sm">
                    Won
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-xs text-gray-500">
                  {auction.endDate.toLocaleDateString('id-ID')}
                </p>
                <Badge variant="default" size="sm">
                  Pending Payment
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
