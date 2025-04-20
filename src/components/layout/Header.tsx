
import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"`,
      });
      // In a real implementation, you would use this to trigger a search
    }
  };

  const unreadNotifications = 3; // This would come from a real notifications system

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 z-20">
      <div className="flex items-center gap-2">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 w-[200px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-[10px] text-white rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="mt-2 space-y-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm font-medium">New task assigned</p>
                  <p className="text-xs text-muted-foreground">John assigned you a new task</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm font-medium">Project status updated</p>
                  <p className="text-xs text-muted-foreground">Marketing Campaign is now completed</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm font-medium">New message</p>
                  <p className="text-xs text-muted-foreground">Sarah sent you a message in Design project</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">View all notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {children}
      </div>
    </header>
  );
}
