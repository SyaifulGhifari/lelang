'use client';

import { useParams } from 'next/navigation';
import { AuctionDetail } from '@/components/auction';
import { useAuctionById } from '@/hooks';
import { DUMMY_BIDS, DUMMY_AUCTIONS, DUMMY_USERS } from '@/lib/constants/dummyData';

export default function AuctionDetailPage() {
  const params = useParams();
  const auctionId = params.id as string;
  const { auction, isLoading } = useAuctionById(auctionId);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!auction) {
    return <div className="p-6 text-center">Auction not found</div>;
  }

  // Get related data
  const seller = DUMMY_USERS.find(u => u.id === auction.sellerId) || DUMMY_USERS[0];
  const bids = DUMMY_BIDS.filter(b => b.auctionId === auctionId);
  const similarAuctions = DUMMY_AUCTIONS.filter(
    a => a.categoryId === auction.categoryId && a.id !== auctionId
  ).slice(0, 4);

  return (
    <div className="p-6 lg:p-8">
      <AuctionDetail 
        auction={auction}
        seller={seller}
        bids={bids}
        similarAuctions={similarAuctions}
      />
    </div>
  );
}

