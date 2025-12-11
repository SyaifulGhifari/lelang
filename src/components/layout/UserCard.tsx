'use client';

import { User as UserType } from '@/types';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCardProps {
  user: UserType | null;
  isCollapsed?: boolean;
}

export default function UserCard({ user, isCollapsed = false }: UserCardProps) {
  if (!user) {
    return null;
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-gray-900">{user.name}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <p className="text-xs text-gray-600">{user.rating.toFixed(1)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
