'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllAuctions } from '@/lib/hooks/useAuctions';

export default function AuctionsPage() {
  const { auctions, loading } = useAllAuctions();

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Auctions</h1>
        <p className="text-gray-600">Browse and bid on available auctions</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading auctions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 bg-gray-200">
                <img
                  src={auction.images[0] || 'https://via.placeholder.com/300x200'}
                  alt={auction.title}
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute right-2 top-2" variant="outline">
                  {auction.status}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{auction.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600">Current Price</p>
                    <p className="text-lg font-bold text-gray-900">
                      Rp {auction.currentPrice.toString()}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>⭐ {auction.rating}</span>
                    <span>🔨 {auction.bidCount} bids</span>
                  </div>
                  <button className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
