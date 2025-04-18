
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <div className={cn("syncsaga-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === 'up' && "text-green-500",
                  trend === 'down' && "text-red-500",
                  trend === 'neutral' && "text-muted-foreground"
                )}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 bg-secondary rounded-md">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
