
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, CheckSquare, Users, Settings, 
  Bell, LogOut, Menu, X, Code, Network
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { currentUser } from '@/data/mockData';

const navItems = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
  { name: 'Projects', icon: <Code className="w-5 h-5" />, path: '/projects' },
  { name: 'Chat', icon: <MessageSquare className="w-5 h-5" />, path: '/chat' },
  { name: 'Tasks', icon: <CheckSquare className="w-5 h-5" />, path: '/tasks' },
  { name: 'Team', icon: <Users className="w-5 h-5" />, path: '/team' },
  { name: 'Architecture', icon: <Network className="w-5 h-5" />, path: '/architecture' },
  { name: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/notifications' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(!isMobile);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cn(
      "bg-sidebar transition-all duration-300 border-r border-sidebar-border flex flex-col z-30",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", expanded ? "justify-between w-full" : "justify-center")}>
          {expanded && (
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-md font-bold">
                SS
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">SyncSaga</span>
            </Link>
          )}
          {!expanded && (
            <div className="bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-md font-bold">
              SS
            </div>
          )}
          <button onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent rounded-md p-1">
            {expanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow py-4 overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md hover:bg-sidebar-accent font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-sidebar-foreground hover:text-sidebar-foreground",
                expanded ? "justify-start" : "justify-center"
              )}
            >
              {item.icon}
              {expanded && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer",
          expanded ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full"
            />
            {expanded && (
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[120px]">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">{currentUser.email}</span>
              </div>
            )}
          </div>
          {expanded && (
            <LogOut className="w-4 h-4 text-sidebar-foreground hover:text-primary" />
          )}
        </div>
      </div>
    </div>
  );
}
