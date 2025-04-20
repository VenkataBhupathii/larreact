
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Package, MessageSquare, Settings, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Package },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Architecture', path: '/architecture', icon: BrainCircuit },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`border-r border-border bg-card transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-[60px]' : 'w-[250px]'
      }`}
    >
      <div className="h-16 border-b border-border flex items-center px-4">
        <div className="flex items-center w-full">
          {!isCollapsed && (
            <div className="font-bold text-lg">SyncSaga</div>
          )}
          <Button 
            onClick={toggleSidebar} 
            variant="ghost" 
            size="icon"
            className={`ml-auto h-8 w-8 ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-md text-sm
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-2'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t border-border">
        {!isCollapsed && isAuthenticated && (
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SyncSaga
          </div>
        )}
      </div>
    </div>
  );
}
