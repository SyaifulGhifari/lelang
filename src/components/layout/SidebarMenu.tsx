'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gavel,
  Trophy,
  Heart,
  Package,
  Plus,
  Settings,
  HelpCircle,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Bids',
    href: '/dashboard/my-bids',
    icon: Gavel,
  },
  {
    label: 'My Wins',
    href: '/dashboard/my-wins',
    icon: Trophy,
  },
  {
    label: 'Watchlist',
    href: '/watchlist',
    icon: Heart,
  },
  {
    label: 'My Auctions',
    href: '/dashboard/my-auctions',
    icon: Package,
  },
];

const actionItems = [
  {
    label: 'Create Auction',
    href: '/auctions/create',
    icon: Plus,
    className: 'text-blue-600',
  },
];

const otherItems = [
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
];

interface SidebarMenuProps {
  isCollapsed?: boolean;
}

export default function SidebarMenu({ isCollapsed = false }: SidebarMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {/* Main Menu */}
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-gray-200" />

      {/* Action Items */}
      {actionItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isCollapsed
                ? `text-center text-lg ${item.className}`
                : `w-full ${item.className} hover:bg-blue-50`
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        );
      })}

      {/* Divider */}
      <div className="my-3 h-px bg-gray-200" />

      {/* Other Items */}
      <div className="space-y-1">
        {otherItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
