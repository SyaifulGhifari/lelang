'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import UserCard from './UserCard';
import SidebarMenu from './SidebarMenu';
import QuickStats from './QuickStats';
import { User as UserType } from '@/types';
import { useCurrentUser } from '@/lib/hooks/useUser';

interface SidebarProps {
  currentUser?: UserType | null;
}

export default function Sidebar({ currentUser: propUser }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user: hookUser } = useCurrentUser();

  const user = propUser || hookUser;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsCollapsed(window.innerWidth < 768);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header dengan toggle button */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        {!isCollapsed && <h2 className="font-bold text-gray-900">Menu</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1 hover:bg-gray-100 md:hidden"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* User Card */}
      <UserCard user={user} isCollapsed={isCollapsed} />

      {/* Menu Items */}
      <SidebarMenu isCollapsed={isCollapsed} />

      {/* Quick Stats */}
      <QuickStats user={user} isCollapsed={isCollapsed} />

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-3">
        <button className="w-full rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
          {!isCollapsed && 'Logout'}
          {isCollapsed && '🚪'}
        </button>
      </div>
    </aside>
  );
}
