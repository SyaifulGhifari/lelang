'use client';

import { useState } from 'react';
import { AuctionGrid } from '@/components/auction';
import { SearchFilters } from '@/components/forms';
import { useAuctions } from '@/hooks';
import type { SearchFiltersData } from '@/components/forms/validators';

export default function AuctionsPage() {
  const [filters, setFilters] = useState<SearchFiltersData>({
    searchQuery: '',
    categoryId: '',
    minPrice: undefined,
    maxPrice: undefined,
    status: undefined,
    sortBy: '',
  });

  const { auctions, isLoading } = useAuctions(filters);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Auctions</h1>
        <p className="text-gray-600">Browse and bid on available auctions</p>
      </div>

      <SearchFilters onFilterChange={setFilters} />

      <AuctionGrid auctions={auctions} isLoading={isLoading} />
    </div>
  );
}
