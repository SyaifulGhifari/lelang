'use client';

import { Badge, Avatar } from '@/components/shared';
import { AuctionGallery } from './AuctionGallery';
import { CountdownTimer } from './CountdownTimer';
import { BidHistory } from './BidHistory';
import { BidForm } from '@/components/forms/BidForm';
import { AuctionGrid } from './AuctionGrid';
import type { Auction, Bid } from '@/types';

interface AuctionDetailProps {
  auction: Auction;
  seller: any;
  bids: Bid[];
  similarAuctions: Auction[];
  currentUserBid?: Bid;
}

export function AuctionDetail({
  auction,
  seller,
  bids,
  similarAuctions,
  currentUserBid,
}: AuctionDetailProps) {
  const isActive = auction.status === 'ACTIVE';
  const winnerId = bids.length > 0 ? bids[0].bidderId : undefined;

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Gallery & Details */}
        <div className="lg:col-span-2 space-y-6">
          <AuctionGallery images={auction.images} title={auction.title} />

          <div className="rounded-lg border bg-white p-6">
            <h1 className="mb-4 text-3xl font-bold">{auction.title}</h1>

            <div className="mb-4 flex items-center gap-2">
              <Badge variant="success">{auction.status}</Badge>
              <span className="text-sm text-gray-600">Category: {auction.categoryId}</span>
            </div>

            <div className="mb-6 space-y-2">
              <p className="text-gray-600">{auction.description}</p>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6">
              <p className="mb-3 text-sm text-gray-600">Sold by</p>
              <div className="flex items-center gap-3">
                <Avatar name={seller?.name || 'Unknown'} size="md" />
                <div>
                  <p className="font-semibold">{seller?.name}</p>
                  <p className="text-sm text-gray-600">
                    ⭐ {seller?.rating} ({seller?.totalReviews} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid History */}
          <BidHistory bids={bids} winnerId={winnerId} />

          {/* Similar Auctions */}
          {similarAuctions.length > 0 && (
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Similar Auctions</h2>
              <AuctionGrid auctions={similarAuctions} />
            </div>
          )}
        </div>

        {/* Right: Pricing & Bid */}
        <div className="space-y-4">
          {/* Pricing Card */}
          <div className="rounded-lg border bg-white p-6">
            <p className="mb-2 text-sm text-gray-600">Current bid</p>
            <p className="mb-4 text-3xl font-bold text-blue-600">
              Rp {auction.currentPrice.toLocaleString('id-ID')}
            </p>

            {auction.reservePrice && (
              <div className="mb-4 border-t pt-4">
                <p className="text-sm text-gray-600">Reserve price: Rp {auction.reservePrice.toLocaleString('id-ID')}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">Total bids: {auction.bidCount}</p>
            </div>
          </div>

          {/* Timer */}
          <CountdownTimer endDate={auction.endDate} />

          {/* Your Bid Info */}
          {currentUserBid && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Your bid</p>
              <p className="font-bold text-green-600">
                Rp {currentUserBid.amount.toLocaleString('id-ID')}
              </p>
              {currentUserBid.status === 'ACTIVE' && (
                <Badge variant="success" size="sm">
                  Winning
                </Badge>
              )}
              {currentUserBid.status === 'OUTBID' && (
                <Badge variant="warning" size="sm">
                  Outbid
                </Badge>
              )}
            </div>
          )}

          {/* Bid Form */}
          {isActive && <BidForm currentPrice={auction.currentPrice} auctionId={auction.id} />}

          {!isActive && (
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-gray-600">This auction has ended</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
