'use client';

import Link from 'next/link';
import { Badge, Pagination } from '@/components/shared';
import { useState } from 'react';
import type { Auction, Bid } from '@/types';

interface MyBidsTableProps {
  bids: Bid[];
  auctions: Map<string, Auction>;
}

export function MyBidsTable({ bids, auctions }: MyBidsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(bids.length / itemsPerPage);

  const paginatedBids = bids.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (bids.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow text-center">
        <p className="text-gray-600">You haven't placed any bids yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">My Bids</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Auction</th>
              <th className="px-4 py-3 text-left font-semibold">Your Bid</th>
              <th className="px-4 py-3 text-left font-semibold">Current Price</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Time Left</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBids.map((bid) => {
              const auction = auctions.get(bid.auctionId);
              const timeLeft = Math.max(0, auction?.endDate.getTime() || 0 - Date.now());
              const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
              const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

              return (
                <tr key={bid.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/auctions/${bid.auctionId}`} className="text-blue-600 hover:underline font-medium line-clamp-2">
                      {auction?.title || 'Unknown Auction'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    Rp {bid.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    Rp {(auction?.currentPrice || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    {bid.status === 'ACTIVE' && <Badge variant="success" size="sm">Winning</Badge>}
                    {bid.status === 'OUTBID' && <Badge variant="warning" size="sm">Outbid</Badge>}
                    {bid.status === 'CANCELLED' && <Badge variant="danger" size="sm">Cancelled</Badge>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {daysLeft}d {hoursLeft}h
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
