import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import TopNav from './TopNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col h-screen">
          <TopNav />
          <main className="flex-1 overflow-auto p-4 pb-20">
            {children}
          </main>
          <MobileNav />
        </div>
      )}
    </div>
  );
}
