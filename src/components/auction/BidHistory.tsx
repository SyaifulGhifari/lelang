'use client';

import { useState } from 'react';
import { Pagination, Badge, Avatar } from '@/components/shared';
import type { Bid } from '@/types';

interface BidHistoryProps {
  bids: Bid[];
  winnerId?: string;
}

export function BidHistory({ bids, winnerId }: BidHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(bids.length / itemsPerPage);

  const paginatedBids = bids.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-lg font-bold">Bid History ({bids.length} bids)</h2>

      {bids.length === 0 ? (
        <p className="text-center text-gray-600">No bids yet</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {paginatedBids.map((bid) => (
              <div key={bid.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar name={`Bidder ${bid.id}`} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {bid.id.substring(0, 8)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(bid.createdAt).toLocaleDateString('id-ID', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      Rp {bid.amount.toLocaleString('id-ID')}
                    </p>
                    {bid.autoBid && (
                      <Badge variant="info" size="sm">
                        Auto
                      </Badge>
                    )}
                  </div>

                  {winnerId === bid.bidderId && (
                    <Badge variant="success" size="sm">
                      Winner
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
