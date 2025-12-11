'use client';

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'text';
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-white p-4">
            <div className="mb-4 h-48 w-full animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="space-y-3 rounded-lg border bg-white p-4">
        <div className="flex gap-4">
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
          <div className="flex-1">
            <div className="h-6 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
        </div>
        {Array.from({ length: count || 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-t pt-4">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count || 3 }).map((_, i) => (
        <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
