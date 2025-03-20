
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, BarChart3, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/workouts", label: "Workouts", icon: Activity },
    { path: "/progress", label: "Progress", icon: BarChart3 },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 px-4 py-3 transition-all duration-300 sm:top-0 sm:bottom-auto sm:py-4 sm:h-16",
        scrolled ? "sm:bg-background/80 sm:backdrop-blur-md sm:shadow-sm sm:border-b" : ""
      )}
    >
      <div className="app-container h-full flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-1">
          <span className="text-primary font-display font-semibold text-lg">
            ATHLETICA
          </span>
        </div>
        
        <div className="w-full flex justify-around items-center sm:w-auto sm:ml-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-colors rounded-lg sm:flex-row sm:p-3",
                "text-muted-foreground hover:text-primary hover:bg-secondary/50",
                location.pathname === item.path && "text-primary bg-secondary/70"
              )}
            >
              <item.icon className="h-5 w-5 sm:mr-2" />
              <span className="text-xs mt-1 sm:text-sm sm:mt-0">{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="hidden sm:flex items-center space-x-4">
          <button 
            className="size-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <User className="size-5 text-primary" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
