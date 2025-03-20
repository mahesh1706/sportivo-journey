
import { useState, useEffect } from "react";
import { Activity, BarChart3, Calendar, Clock, Dumbbell, Heart, LineChart, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressChart from "@/components/ProgressChart";
import MetricsCard from "@/components/MetricsCard";
import { cn } from "@/lib/utils";

// Mock data
const mockStrengthData = [
  { date: "Jan", value: 100 },
  { date: "Feb", value: 120 },
  { date: "Mar", value: 115 },
  { date: "Apr", value: 130 },
  { date: "May", value: 135 },
  { date: "Jun", value: 150 },
  { date: "Jul", value: 140 },
];

const mockCardioData = [
  { date: "Jan", value: 3.2 },
  { date: "Feb", value: 4.5 },
  { date: "Mar", value: 3.8 },
  { date: "Apr", value: 5.1 },
  { date: "May", value: 4.7 },
  { date: "Jun", value: 6.2 },
  { date: "Jul", value: 5.5 },
];

const mockEnergyData = [
  { date: "Jan", value: 72 },
  { date: "Feb", value: 78 },
  { date: "Mar", value: 82 },
  { date: "Apr", value: 76 },
  { date: "May", value: 85 },
  { date: "Jun", value: 88 },
  { date: "Jul", value: 92 },
];

const mockHeartRateData = [
  { date: "Jan", value: 68 },
  { date: "Feb", value: 72 },
  { date: "Mar", value: 70 },
  { date: "Apr", value: 67 },
  { date: "May", value: 65 },
  { date: "Jun", value: 68 },
  { date: "Jul", value: 64 },
];

const mockTimeData = [
  { date: "Jan", value: 120 },
  { date: "Feb", value: 140 },
  { date: "Mar", value: 130 },
  { date: "Apr", value: 150 },
  { date: "May", value: 145 },
  { date: "Jun", value: 160 },
  { date: "Jul", value: 175 },
];

const mockMetrics = [
  { title: "Workouts Completed", value: 72, icon: Activity },
  { title: "Total Time", value: "54 hrs", icon: Clock },
  { title: "Achievements", value: 12, icon: Trophy },
  { title: "Avg. Workout Length", value: "45 min", icon: Calendar },
];

const timeRanges = ["1W", "1M", "3M", "6M", "1Y", "ALL"];

const Progress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimeRange, setActiveTimeRange] = useState("6M");
  
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
          <h1 className="text-2xl font-display font-semibold sm:text-3xl tracking-tight mb-4">
            Progress & Analytics
          </h1>
          
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">
              Track your fitness progress and see your improvements over time
            </p>
            
            <div className="flex items-center rounded-lg border bg-card">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors",
                    activeTimeRange === range
                      ? "bg-primary text-primary-foreground rounded-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </header>
        
        <div className="space-y-8">
          {/* Summary metrics */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          
          {/* Progress charts */}
          <section>
            <h2 className="text-lg font-display font-medium mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressChart
                title="Strength Progress"
                data={mockStrengthData}
                metric="strength"
                className={cn(
                  "animate-scale-in",
                  isLoading && "opacity-0",
                  !isLoading && "animation-delay-400"
                )}
              />
              <ProgressChart
                title="Cardio Distance"
                data={mockCardioData}
                metric="cardio"
                className={cn(
                  "animate-scale-in",
                  isLoading && "opacity-0",
                  !isLoading && "animation-delay-500"
                )}
              />
              <ProgressChart
                title="Energy Level"
                data={mockEnergyData}
                metric="energy"
                className={cn(
                  "animate-scale-in",
                  isLoading && "opacity-0",
                  !isLoading && "animation-delay-600"
                )}
              />
              <ProgressChart
                title="Resting Heart Rate"
                data={mockHeartRateData}
                metric="heart"
                className={cn(
                  "animate-scale-in",
                  isLoading && "opacity-0",
                  !isLoading && "animation-delay-700"
                )}
              />
            </div>
          </section>
          
          {/* Workout duration */}
          <section>
            <h2 className="text-lg font-display font-medium mb-4">Training Time</h2>
            <div className="bg-card border rounded-2xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-medium">Workout Duration</h3>
                  <p className="text-sm text-muted-foreground">Minutes per month</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-muted-foreground">Duration</span>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ProgressChart
                  title=""
                  data={mockTimeData}
                  metric="time"
                  className={cn(
                    isLoading && "opacity-0",
                    !isLoading && "animation-delay-800"
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-medium">54 hrs</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-xl font-medium">45 min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longest</p>
                  <p className="text-xl font-medium">90 min</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shortest</p>
                  <p className="text-xl font-medium">15 min</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Progress;
