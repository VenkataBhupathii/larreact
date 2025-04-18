
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header />
        
        <main className="flex-grow overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
