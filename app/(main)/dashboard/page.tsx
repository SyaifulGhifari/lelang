'use client';

import { StatsCard, UserProfileCard, RecentActivity, WonAuctions, MyBidsTable } from '@/components/dashboard';
import { DUMMY_AUCTIONS, DUMMY_BIDS, DUMMY_USERS } from '@/lib/constants/dummyData';

export default function Dashboard() {
  const currentUser = DUMMY_USERS[0];
  const userBids = DUMMY_BIDS.slice(0, 5);
  const wonAuctions = DUMMY_AUCTIONS.filter(a => a.status === 'SOLD').slice(0, 3);
  
  // Create activities from bids and auctions
  const activities = [
    { id: '1', type: 'bid' as const, title: 'Rolex Watch', description: 'Placed a bid on Rolex Watch', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), icon: '🔨' },
    { id: '2', type: 'won' as const, title: 'iPhone 15 Pro Max', description: 'Won iPhone 15 Pro Max', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), icon: '🏆' },
    { id: '3', type: 'listed' as const, title: 'Vintage Leather Jacket', description: 'Listed Vintage Leather Jacket', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), icon: '📦' },
  ];

  // Create auction map for MyBidsTable
  const auctionMap = new Map(DUMMY_AUCTIONS.map(a => [a.id, a]));

  const stats = [
    { icon: '🔨', label: 'Active Bids', value: '5', change: { value: 2, isPositive: true } },
    { icon: '🏆', label: 'Won Auctions', value: '12', change: { value: 1, isPositive: true } },
    { icon: '📦', label: 'Items Listed', value: '3', change: { value: 0, isPositive: false } },
    { icon: '💰', label: 'Account Balance', value: 'Rp 2.5M', change: { value: 25, isPositive: true } },
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your auction activity overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <RecentActivity activities={activities} />

          {/* My Active Bids */}
          <MyBidsTable bids={userBids} auctions={auctionMap} />

          {/* Won Auctions */}
          <WonAuctions auctions={wonAuctions} />
        </div>

        {/* Right Column */}
        <div>
          {/* User Profile Card */}
          <UserProfileCard user={currentUser} />
        </div>
      </div>
    </div>
  );
}
