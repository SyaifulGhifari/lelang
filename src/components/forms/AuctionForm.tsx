'use client';

import { useState } from 'react';
import { createAuctionSchema, type CreateAuctionFormData } from './validators';
import { DUMMY_CATEGORIES } from '@/lib/constants/dummyData';

export function AuctionForm() {
  const [formData, setFormData] = useState<CreateAuctionFormData>({
    title: '',
    description: '',
    categoryId: '',
    startingPrice: 0,
    reservePrice: undefined,
    duration: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'startingPrice' || name === 'reservePrice' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      createAuctionSchema.parse(formData);
      setLoading(true);
      // TODO: Add API call
      console.log('Auction data:', formData);
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
    <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-8 shadow">
      <h1 className="mb-2 text-2xl font-bold">Create New Auction</h1>
      <p className="mb-6 text-sm text-gray-600">Fill in the details of your item</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Vintage Rolex Watch"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Describe your item in detail..."
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {DUMMY_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select duration</option>
              <option value="1day">1 Day</option>
              <option value="3days">3 Days</option>
              <option value="7days">7 Days</option>
              <option value="14days">14 Days</option>
            </select>
            {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Price (Rp)</label>
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="1000000"
            />
            {errors.startingPrice && (
              <p className="mt-1 text-xs text-red-600">{errors.startingPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reserve Price (Rp)</label>
            <input
              type="number"
              name="reservePrice"
              value={formData.reservePrice || ''}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Optional"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating auction...' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
}
