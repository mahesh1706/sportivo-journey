
import { Award, Calendar, CheckCircle, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "workout" | "achievement" | "goal" | "record";
  title: string;
  description: string;
  time: string;
  icon?: "award" | "check" | "calendar" | "user";
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getIcon = (type: Activity["type"], iconName?: Activity["icon"]) => {
    if (iconName === "award") return Award;
    if (iconName === "check") return CheckCircle;
    if (iconName === "calendar") return Calendar;
    if (iconName === "user") return User;
    
    // Default icons based on type
    if (type === "workout") return CheckCircle;
    if (type === "achievement") return Award;
    if (type === "goal") return Calendar;
    if (type === "record") return User;
    
    return CheckCircle;
  };
  
  const getColor = (type: Activity["type"]) => {
    if (type === "workout") return "bg-blue-100 text-blue-600";
    if (type === "achievement") return "bg-amber-100 text-amber-600";
    if (type === "goal") return "bg-green-100 text-green-600";
    if (type === "record") return "bg-purple-100 text-purple-600";
    return "bg-gray-100 text-gray-600";
  };
  
  return (
    <div className={cn("rounded-2xl bg-card border", className)}>
      <div className="px-5 py-4 border-b">
        <h3 className="font-display font-medium">Recent Activity</h3>
      </div>
      
      <div className="divide-y">
        {activities.map((activity) => {
          const IconComponent = getIcon(activity.type, activity.icon);
          return (
            <div 
              key={activity.id} 
              className="px-5 py-4 flex items-start gap-4 transition-colors hover:bg-muted/20"
            >
              <div className={cn(
                "mt-0.5 flex-shrink-0 rounded-full p-2",
                getColor(activity.type)
              )}>
                <IconComponent className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length === 0 && (
        <div className="px-5 py-8 text-center">
          <p className="text-muted-foreground text-sm">No recent activity</p>
        </div>
      )}
    </div>
  );
}

export default ActivityFeed;
