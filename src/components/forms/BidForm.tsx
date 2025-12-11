'use client';

import { useState } from 'react';
import { bidSchema, type BidFormData } from './validators';

interface BidFormProps {
  currentPrice: number;
  auctionId: string;
}

export function BidForm({ currentPrice, auctionId }: BidFormProps) {
  const [formData, setFormData] = useState<BidFormData>({
    bidAmount: currentPrice + 100000,
    autoBid: false,
    maxBidAmount: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked : name === 'bidAmount' || name === 'maxBidAmount'
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      bidSchema.parse(formData);
      setLoading(true);
      // TODO: Add API call
      console.log('Bid data:', { auctionId, ...formData });
      setLoading(false);
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">Place Your Bid</h2>
      <p className="mb-4 text-sm text-gray-600">Current price: Rp {currentPrice.toLocaleString('id-ID')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bid Amount (Rp)</label>
          <input
            type="number"
            name="bidAmount"
            value={formData.bidAmount}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            min={currentPrice + 1}
          />
          {errors.bidAmount && <p className="mt-1 text-xs text-red-600">{errors.bidAmount}</p>}
        </div>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="autoBid"
            checked={formData.autoBid}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Enable Auto Bid</span>
        </label>

        {formData.autoBid && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Bid Amount (Rp)</label>
            <input
              type="number"
              name="maxBidAmount"
              value={formData.maxBidAmount || ''}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              min={formData.bidAmount}
            />
            {errors.maxBidAmount && (
              <p className="mt-1 text-xs text-red-600">{errors.maxBidAmount}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              The system will automatically increase your bid to match other bidders up to your max amount.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-green-600 py-2 text-white font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Placing bid...' : 'Place Bid'}
        </button>
      </form>
    </div>
  );
}
