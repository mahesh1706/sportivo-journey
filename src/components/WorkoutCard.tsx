
import { Clock, Dumbbell, Plus, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutCardProps {
  title: string;
  type: string;
  duration: string;
  exercises: Exercise[];
  completed?: boolean;
  className?: string;
  onClick?: () => void;
}

export function WorkoutCard({
  title,
  type,
  duration,
  exercises,
  completed = false,
  className,
  onClick
}: WorkoutCardProps) {
  return (
    <div 
      className={cn(
        "group bg-card rounded-2xl border p-4 transition-all duration-300",
        "hover:shadow-soft hover-scale hover:bg-card/95 cursor-pointer",
        completed && "bg-muted/30 hover:bg-muted/40",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full bg-primary/10",
              "group-hover:bg-primary/15 transition-colors"
            )}>
              <Dumbbell className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{type}</span>
          </div>
          <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          {completed ? (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              Scheduled
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <div className="text-sm text-muted-foreground mb-2">Exercises:</div>
        <ul className="space-y-1.5">
          {exercises.slice(0, 2).map((exercise, i) => (
            <li key={i} className="text-sm flex justify-between">
              <span>{exercise.name}</span>
              <span className="text-muted-foreground">{exercise.sets} × {exercise.reps}</span>
            </li>
          ))}
          
          {exercises.length > 2 && (
            <li className="text-sm text-muted-foreground pt-1">
              + {exercises.length - 2} more exercises
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutCard;
