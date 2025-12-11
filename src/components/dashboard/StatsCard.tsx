'use client';

import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ icon, label, value, change }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`mt-2 text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}% this month
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
