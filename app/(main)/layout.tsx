'use client';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { useCurrentUser } from '@/lib/hooks/useUser';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <div className="flex flex-1">
        <Sidebar currentUser={user} />
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
