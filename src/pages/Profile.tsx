
import { useState, useEffect } from "react";
import { Award, BarChart, Camera, Dumbbell, Edit, LogOut, Settings, Trophy, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

// Mock data
const mockAchievements = [
  { title: "7-Day Streak", description: "Completed workouts for 7 consecutive days", date: "Jul 24, 2023" },
  { title: "First Milestone", description: "Completed 10 workouts", date: "Jul 15, 2023" },
  { title: "Early Bird", description: "Completed 5 workouts before 8am", date: "Jul 8, 2023" },
  { title: "Consistency King", description: "Completed 20 workouts in one month", date: "Jun 30, 2023" },
];

const mockPersonalRecords = [
  { exercise: "Bench Press", value: "185 lbs", date: "Jul 22, 2023" },
  { exercise: "Squats", value: "265 lbs", date: "Jul 18, 2023" },
  { exercise: "Deadlift", value: "315 lbs", date: "Jul 14, 2023" },
  { exercise: "5K Run", value: "22:45", date: "Jul 10, 2023" },
  { exercise: "Plank", value: "3:15", date: "Jul 5, 2023" },
];

const mockUserStats = [
  { label: "Workouts", value: "72", icon: Dumbbell },
  { label: "Achievements", value: "12", icon: Award },
  { label: "Records", value: "8", icon: Trophy },
  { label: "Streak", value: "7 days", icon: BarChart },
];

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("achievements");
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const tabItems = [
    { id: "achievements", label: "Achievements" },
    { id: "records", label: "Personal Records" },
    { id: "settings", label: "Settings" },
  ];
  
  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16">
      <Navbar />
      
      <main className="app-container py-6 sm:py-8 page-transition">
        {/* Profile header */}
        <section className="mb-8">
          <div className="relative mb-20 sm:mb-24">
            {/* Cover image */}
            <div className="h-36 sm:h-48 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-30"></div>
              <button className="absolute bottom-4 right-4 p-2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 transition-colors">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            {/* Profile image */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 sm:-bottom-20">
              <div className="relative">
                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-muted border-4 border-background overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 rounded-full bg-background shadow-md hover:bg-muted transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold sm:text-3xl tracking-tight mb-1">
              Alex Johnson
            </h1>
            <p className="text-muted-foreground mb-4">Fitness Enthusiast</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">Strength Training</span>
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">Running</span>
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">HIIT</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
              {mockUserStats.map((stat, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "bg-card border rounded-xl p-3 flex flex-col items-center justify-center",
                    "hover:border-primary/30 hover:shadow-soft transition-all duration-200",
                    "animate-fade-in",
                    isLoading && "opacity-0",
                    !isLoading && `animation-delay-${i * 100}`
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-medium">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tabs navigation */}
        <div className="border-b mb-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content */}
        <div className="animate-fade-in">
          {activeTab === "achievements" && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-medium mb-4">Your Achievements</h2>
              
              <div className="grid gap-4">
                {mockAchievements.map((achievement, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "p-4 border rounded-xl flex items-start gap-4 bg-card",
                      "hover:shadow-soft hover:border-primary/20 transition-all duration-200",
                      "animate-slide-up",
                      isLoading && "opacity-0",
                      !isLoading && `animation-delay-${200 + i * 100}`
                    )}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Earned on {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "records" && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-medium mb-4">Personal Records</h2>
              
              <div className="overflow-hidden border rounded-xl">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left px-4 py-3 text-sm font-medium">Exercise</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Record</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockPersonalRecords.map((record, i) => (
                      <tr 
                        key={i} 
                        className={cn(
                          "bg-card hover:bg-muted/30 transition-colors",
                          "animate-fade-in",
                          isLoading && "opacity-0",
                          !isLoading && `animation-delay-${200 + i * 100}`
                        )}
                      >
                        <td className="px-4 py-3 text-sm">{record.exercise}</td>
                        <td className="px-4 py-3 text-sm font-medium">{record.value}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{record.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-lg font-display font-medium mb-4">Account Settings</h2>
              
              <div className="border rounded-xl p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Johnson"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    defaultValue="alex.johnson@example.com"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea 
                    rows={3}
                    defaultValue="Fitness enthusiast focused on strength training and running. Working to improve every day."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div className="pt-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                    Update Profile
                  </button>
                </div>
              </div>
              
              <div className="border rounded-xl p-5 space-y-4">
                <h3 className="text-base font-medium">Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive workout reminders and updates</p>
                  </div>
                  <div className="h-6 w-11 bg-muted rounded-full relative">
                    <div className="absolute inset-0 flex items-center px-1">
                      <div className="h-5 w-5 rounded-full bg-primary transform translate-x-5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <div className="h-6 w-11 bg-muted rounded-full relative">
                    <div className="absolute inset-0 flex items-center px-1">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Workout Metrics</p>
                    <p className="text-xs text-muted-foreground">Display metrics in imperial or metric units</p>
                  </div>
                  <select className="px-3 py-1 border rounded-lg text-sm bg-background">
                    <option>Imperial (lbs, miles)</option>
                    <option>Metric (kg, km)</option>
                  </select>
                </div>
              </div>
              
              <div className="border border-destructive/10 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-destructive">Logout</p>
                    <p className="text-xs text-muted-foreground">Sign out from your account</p>
                  </div>
                  <button className="flex items-center text-sm font-medium text-destructive">
                    <LogOut className="w-4 h-4 mr-1" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
