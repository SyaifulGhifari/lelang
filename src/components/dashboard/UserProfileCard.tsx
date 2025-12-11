'use client';

import { Avatar, Badge } from '@/components/shared';
import type { User } from '@/types';

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar name={user.name} size="lg" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.phone}</p>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span className="font-semibold">{user.rating}</span>
              <span className="text-sm text-gray-600">({user.totalReviews} reviews)</span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Member since {user.memberSince.toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>

        <Badge variant="success">Active</Badge>
      </div>

      {user.bio && (
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-700">{user.bio}</p>
        </div>
      )}

      <div className="mt-4 grid gap-3 border-t pt-4 grid-cols-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{user.activeBids || 0}</p>
          <p className="text-xs text-gray-600">Active Bids</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{user.wonCount || 0}</p>
          <p className="text-xs text-gray-600">Won</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{user.sellingCount || 0}</p>
          <p className="text-xs text-gray-600">Selling</p>
        </div>
      </div>
    </div>
  );
}
