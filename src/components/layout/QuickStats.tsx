'use client';

import { User as UserType } from '@/types';

interface QuickStatsProps {
  user: UserType | null;
  isCollapsed?: boolean;
}

export default function QuickStats({ user, isCollapsed = false }: QuickStatsProps) {
  if (!user || isCollapsed) {
    return null;
  }

  const stats = [
    {
      label: 'Active Bids',
      value: user.activeBids || 0,
    },
    {
      label: 'Won',
      value: user.wonCount || 0,
    },
    {
      label: 'Selling',
      value: user.sellingCount || 0,
    },
  ];

  return (
    <div className="border-t border-gray-200 p-4">
      <p className="mb-3 text-xs font-semibold uppercase text-gray-500">Quick Stats</p>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
