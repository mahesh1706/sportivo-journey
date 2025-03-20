
import { useState, useEffect } from "react";
import { Calendar, Filter, ListFilter, Plus, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";
import { cn } from "@/lib/utils";

// Mock data
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
    title: "Lower Body Focus",
    type: "Strength",
    duration: "50 min",
    exercises: [
      { name: "Squats", sets: 4, reps: 12 },
      { name: "Deadlifts", sets: 3, reps: 10 },
      { name: "Lunges", sets: 3, reps: 12 },
      { name: "Calf Raises", sets: 3, reps: 20 },
    ],
    completed: false,
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
  {
    title: "Core & Abs",
    type: "Core",
    duration: "25 min",
    exercises: [
      { name: "Planks", sets: 3, reps: 60 },
      { name: "Russian Twists", sets: 3, reps: 20 },
      { name: "Leg Raises", sets: 3, reps: 15 },
      { name: "Mountain Climbers", sets: 3, reps: 20 },
    ],
    completed: true,
  },
  {
    title: "Full Body Workout",
    type: "Strength",
    duration: "60 min",
    exercises: [
      { name: "Push-ups", sets: 4, reps: 15 },
      { name: "Kettlebell Swings", sets: 3, reps: 20 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 },
      { name: "Lunges", sets: 3, reps: 12 },
      { name: "Shoulder Press", sets: 3, reps: 12 },
    ],
    completed: false,
  },
  {
    title: "Endurance Run",
    type: "Cardio",
    duration: "40 min",
    exercises: [
      { name: "Treadmill Run", sets: 1, reps: 1 },
      { name: "Cool Down", sets: 1, reps: 1 },
    ],
    completed: true,
  },
];

type FilterType = "all" | "completed" | "upcoming";
type SortType = "recent" | "duration" | "type";

const Workouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeSort, setActiveSort] = useState<SortType>("recent");
  const [filteredWorkouts, setFilteredWorkouts] = useState(mockWorkouts);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = [...mockWorkouts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (activeFilter === "completed") {
      filtered = filtered.filter(workout => workout.completed);
    } else if (activeFilter === "upcoming") {
      filtered = filtered.filter(workout => !workout.completed);
    }
    
    // Apply sorting
    if (activeSort === "duration") {
      filtered = filtered.sort((a, b) => {
        const durationA = parseInt(a.duration.split(" ")[0]);
        const durationB = parseInt(b.duration.split(" ")[0]);
        return durationB - durationA;
      });
    } else if (activeSort === "type") {
      filtered = filtered.sort((a, b) => a.type.localeCompare(b.type));
    }
    
    setFilteredWorkouts(filtered);
  }, [searchQuery, activeFilter, activeSort]);
  
  const filterOptions: Array<{ value: FilterType; label: string }> = [
    { value: "all", label: "All Workouts" },
    { value: "completed", label: "Completed" },
    { value: "upcoming", label: "Upcoming" },
  ];
  
  const sortOptions: Array<{ value: SortType; label: string }> = [
    { value: "recent", label: "Recent" },
    { value: "duration", label: "Duration" },
    { value: "type", label: "Type" },
  ];
  
  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16">
      <Navbar />
      
      <main className="app-container py-6 sm:py-8 page-transition">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-display font-semibold sm:text-3xl tracking-tight">
              Workouts
            </h1>
            <button className="rounded-full bg-primary text-primary-foreground h-10 px-4 flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Plus className="size-5 mr-2" />
              <span className="text-sm font-medium">New Workout</span>
            </button>
          </div>
          
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <button className="h-10 px-4 flex items-center justify-center border rounded-lg gap-2 hover:bg-secondary/70 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>
                
                <div className="absolute right-0 top-12 z-10 bg-card rounded-lg border shadow-lg p-2 w-48 animate-fade-in">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      className={cn(
                        "w-full px-3 py-2 text-sm rounded-md text-left transition-colors",
                        activeFilter === option.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                      onClick={() => setActiveFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <button className="h-10 px-4 flex items-center justify-center border rounded-lg gap-2 hover:bg-secondary/70 transition-colors">
                  <ListFilter className="h-4 w-4" />
                  <span className="text-sm font-medium">Sort</span>
                </button>
                
                <div className="absolute right-0 top-12 z-10 bg-card rounded-lg border shadow-lg p-2 w-48 animate-fade-in">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={cn(
                        "w-full px-3 py-2 text-sm rounded-md text-left transition-colors",
                        activeSort === option.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                      onClick={() => setActiveSort(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="h-10 px-4 flex items-center justify-center border rounded-lg gap-2 hover:bg-secondary/70 transition-colors">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Calendar</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Workouts grid */}
        <section>
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWorkouts.map((workout, i) => (
                <WorkoutCard
                  key={i}
                  {...workout}
                  className={cn(
                    "animate-slide-up",
                    isLoading && "opacity-0",
                    !isLoading && `animation-delay-${i * 100}`
                  )}
                  onClick={() => console.log(`Clicked on ${workout.title}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl">
              <p className="text-muted-foreground">No workouts found. Try a different search or filter.</p>
              <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                Create New Workout
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Workouts;
