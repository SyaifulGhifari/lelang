'use client';

import { useState } from 'react';
import { type SearchFiltersData } from './validators';
import { DUMMY_CATEGORIES } from '@/lib/constants/dummyData';

interface SearchFiltersProps {
  onFilterChange?: (filters: SearchFiltersData) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersData>({
    searchQuery: '',
    categoryId: '',
    minPrice: undefined,
    maxPrice: undefined,
    status: '',
    sortBy: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: name === 'minPrice' || name === 'maxPrice' ? parseFloat(value) || undefined : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const cleared = {
      searchQuery: '',
      categoryId: '',
      minPrice: undefined,
      maxPrice: undefined,
      status: '',
      sortBy: '',
    };
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleChange}
            placeholder="Search auctions..."
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="categoryId"
            value={filters.categoryId}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">All categories</option>
            {DUMMY_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice || ''}
              onChange={handleChange}
              placeholder="Min price"
              className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleChange}
              placeholder="Max price"
              className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ENDING">Ending Soon</option>
            <option value="ENDED">Ended</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="ending_soon">Ending Soon</option>
            <option value="most_bids">Most Bids</option>
          </select>
        </div>
      </div>
    </div>
  );
}
