'use client';

import Link from 'next/link';
import { Gavel } from 'lucide-react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { User } from '@/types';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

export default function Header({ user = null, onLogout, onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Gavel className="h-6 w-6 text-blue-600" />
          <span className="text-xl text-gray-900">Lelang</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden flex-1 px-8 md:block">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Mobile search button */}
          <div className="md:hidden">
            <SearchBar onSearch={onSearch} placeholder="Search..." />
          </div>

          {/* Notifications */}
          {user && <NotificationBell notifications={[]} />}

          {/* User Menu */}
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
