
import { Bell, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { notifications } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface HeaderProps {
  sidebarExpanded: boolean;
  onToggleSidebar: () => void;
}

export function Header() {
  const isMobile = useIsMobile();
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 z-20">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="syncsaga-input pl-9 w-[200px] lg:w-[300px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-secondary text-foreground relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-[10px] text-white rounded-full min-w-[16px] h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
