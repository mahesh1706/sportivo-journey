import { useState, useEffect } from "react";
import { Activity, BarChart3, Dumbbell, Heart, Plus, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricsCard from "@/components/MetricsCard";
import WorkoutCard from "@/components/WorkoutCard";
import ProgressChart from "@/components/ProgressChart";
import ActivityFeed from "@/components/ActivityFeed";
import { cn } from "@/lib/utils";

// Mock data
const mockMetrics = [
  { title: "Workouts", value: 18, change: { value: "12%", positive: true }, icon: Activity, trend: "up" as const },
  { title: "Calories Burned", value: "12,456", change: { value: "8%", positive: true }, icon: BarChart3, trend: "up" as const },
  { title: "Personal Records", value: 5, change: { value: "2", positive: true }, icon: Trophy, trend: "up" as const },
  { title: "Avg Heart Rate", value: "72 bpm", change: { value: "3%", positive: false }, icon: Heart, trend: "down" as const },
];

const mockWorkouts = [
  {
    title: "Upper Body Strength",
    type: "Strength",
    duration: "45 min",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 12 },
      { name: "Pull-Ups", sets: 3, reps: 10 },
      { name: "Shoulder Press", sets: 3, reps: 12 },
      { name: "Bicep Curls", sets: 3, reps: 15 },
    ],
    completed: true,
  },
  {
    title: "HIIT Cardio",
    type: "Cardio",
    duration: "30 min",
    exercises: [
      { name: "Burpees", sets: 3, reps: 15 },
      { name: "Mountain Climbers", sets: 3, reps: 20 },
      { name: "Jump Squats", sets: 3, reps: 15 },
    ],
    completed: false,
  },
];

const mockProgressData = {
  strength: [
    { date: "Mon", value: 100 },
    { date: "Tue", value: 120 },
    { date: "Wed", value: 115 },
    { date: "Thu", value: 130 },
    { date: "Fri", value: 135 },
    { date: "Sat", value: 145 },
    { date: "Sun", value: 140 },
  ],
  cardio: [
    { date: "Mon", value: 3.2 },
    { date: "Tue", value: 4.5 },
    { date: "Wed", value: 3.8 },
    { date: "Thu", value: 5.1 },
    { date: "Fri", value: 4.7 },
    { date: "Sat", value: 6.2 },
    { date: "Sun", value: 5.5 },
  ]
};

const mockActivities = [
  {
    id: "1",
    type: "workout" as const,
    title: "Completed Workout",
    description: "You completed Upper Body Strength workout",
    time: "Today, 9:30 AM",
    icon: "check" as const,
  },
  {
    id: "2",
    type: "achievement" as const,
    title: "New Achievement",
    description: "Achieved 7-day workout streak",
    time: "Yesterday, 6:15 PM",
    icon: "award" as const,
  },
  {
    id: "3",
    type: "record" as const,
    title: "New Personal Record",
    description: "Bench Press: 185 lbs",
    time: "2 days ago",
    icon: "user" as const,
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16">
      <Navbar />
      
      <main className="app-container py-6 sm:py-8 page-transition">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm text-primary/70 block mb-1">Welcome back</span>
              <h1 className="text-2xl font-display font-semibold sm:text-3xl tracking-tight">
                Your Dashboard
              </h1>
            </div>
            <button className="rounded-full bg-primary text-primary-foreground size-10 flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Plus className="size-5" />
            </button>
          </div>
          <p className="text-muted-foreground text-sm">
            Track your fitness journey and monitor your progress
          </p>
        </header>
        
        <div className="space-y-8">
          {/* Metrics section */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mockMetrics.map((metric, i) => (
                <MetricsCard
                  key={i}
                  {...metric}
                  className={cn(
                    "animate-slide-up",
                    isLoading && "opacity-0",
                    !isLoading && `animation-delay-${i * 100}`
                  )}
                />
              ))}
            </div>
          </section>
          
          {/* Workout and Activity section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-medium">Next Workouts</h2>
                <a href="/workouts" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockWorkouts.map((workout, i) => (
                  <WorkoutCard
                    key={i}
                    {...workout}
                    className={cn(
                      "animate-slide-up",
                      isLoading && "opacity-0",
                      !isLoading && `animation-delay-${300 + i * 100}`
                    )}
                    onClick={() => console.log(`Clicked on ${workout.title}`)}
                  />
                ))}
              </div>
              
              {/* Progress charts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-medium">Progress Overview</h2>
                  <a href="/progress" className="text-sm text-primary hover:underline">
                    View details
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ProgressChart
                    title="Strength Progress"
                    data={mockProgressData.strength}
                    metric="strength"
                    className={cn(
                      isLoading && "opacity-0",
                      !isLoading && "animation-delay-500"
                    )}
                  />
                  <ProgressChart
                    title="Cardio Distance"
                    data={mockProgressData.cardio}
                    metric="cardio"
                    className={cn(
                      isLoading && "opacity-0",
                      !isLoading && "animation-delay-600"
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <ActivityFeed
                activities={mockActivities}
                className={cn(
                  "animate-slide-up",
                  isLoading && "opacity-0",
                  !isLoading && "animation-delay-700"
                )}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
