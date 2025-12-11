import { useState, useCallback } from 'react';
import { DUMMY_AUCTIONS } from '@/lib/constants/dummyData';
import type { Auction } from '@/types';

interface SearchResult {
  auctions: Auction[];
  totalCount: number;
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult>({ auctions: [], totalCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ auctions: [], totalCount: 0 });
      setQuery('');
      return;
    }

    setIsLoading(true);
    setQuery(searchQuery);

    // Simulate API call
    const timer = setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = DUMMY_AUCTIONS.filter(
        (auction) =>
          auction.title.toLowerCase().includes(lowerQuery) ||
          auction.description.toLowerCase().includes(lowerQuery)
      );

      setResults({
        auctions: filtered,
        totalCount: filtered.length,
      });
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const clearSearch = useCallback(() => {
    setResults({ auctions: [], totalCount: 0 });
    setQuery('');
  }, []);

  return {
    results,
    isLoading,
    query,
    search,
    clearSearch,
  };
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  const addSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== query);
      return [query, ...filtered].slice(0, 5); // Keep last 5 searches
    });
  }, []);

  const clearSearches = useCallback(() => {
    setSearches([]);
  }, []);

  return {
    searches,
    addSearch,
    clearSearches,
  };
}
