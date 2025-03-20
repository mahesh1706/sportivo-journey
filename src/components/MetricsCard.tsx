
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: LucideIcon;
  className?: string;
  valueClassName?: string;
  trend?: "up" | "down" | "neutral";
}

export function MetricsCard({
  title,
  value,
  change,
  icon: Icon,
  className,
  valueClassName,
  trend
}: MetricsCardProps) {
  return (
    <div 
      className={cn(
        "p-5 rounded-2xl bg-card border transition-all duration-200 animate-fade-in",
        "hover:shadow-soft hover:border-primary/10",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <h3 
          className={cn(
            "text-2xl font-display font-semibold tracking-tight",
            valueClassName
          )}
        >
          {value}
        </h3>
        
        {change && (
          <p 
            className={cn(
              "text-xs font-medium mt-1",
              change.positive ? "text-green-500" : "text-red-500"
            )}
          >
            {change.positive ? "↑" : "↓"} {change.value}
            <span className="ml-1 text-muted-foreground">vs last week</span>
          </p>
        )}
        
        {trend && (
          <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full w-2/3",
                trend === "up" && "bg-green-500",
                trend === "down" && "bg-red-500",
                trend === "neutral" && "bg-amber-500"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricsCard;
