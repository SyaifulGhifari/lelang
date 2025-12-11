'use client';

import { AuctionForm } from '@/components/forms';

export default function CreateAuctionPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Auction</h1>
        <p className="text-gray-600">List your item for auction</p>
      </div>

      <div className="max-w-2xl">
        <AuctionForm />
      </div>
    </div>
  );
}
