'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="rounded-lg bg-blue-50 p-6">
      <h3 className="mb-2 font-semibold text-gray-900">Subscribe to Newsletter</h3>
      <p className="mb-4 text-sm text-gray-600">
        Get the latest auctions and updates delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Subscribing...' : <Mail className="h-4 w-4" />}
          </Button>
        </div>
        {isSuccess && (
          <p className="text-sm text-green-600">Thank you for subscribing!</p>
        )}
      </form>
    </div>
  );
}
