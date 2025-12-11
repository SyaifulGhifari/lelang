'use client';

import { Badge } from '@/components/shared';

interface ActivityItem {
  id: string;
  type: 'bid' | 'won' | 'listed' | 'message';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getColor = (type: string) => {
    switch (type) {
      case 'bid':
        return 'text-blue-600 bg-blue-50';
      case 'won':
        return 'text-green-600 bg-green-50';
      case 'listed':
        return 'text-orange-600 bg-orange-50';
      case 'message':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'bid':
        return 'info' as const;
      case 'won':
        return 'success' as const;
      case 'listed':
        return 'warning' as const;
      case 'message':
        return 'default' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-bold">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-center text-gray-600">No activities yet</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4 border-b pb-4 last:border-b-0">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg ${getColor(activity.type)}`}>
                {activity.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <Badge variant={getBadgeVariant(activity.type)} size="sm">
                    {activity.type}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {activity.timestamp.toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
