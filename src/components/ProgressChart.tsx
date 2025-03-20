
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { BarChart3, Battery, Clock, Dumbbell, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricType = "strength" | "cardio" | "energy" | "heart" | "time";

interface ChartData {
  date: string;
  value: number;
}

interface ProgressChartProps {
  title: string;
  data: ChartData[];
  metric: MetricType;
  className?: string;
}

const metricConfig = {
  strength: {
    label: "Strength",
    color: "#4f46e5",
    icon: Dumbbell,
    unit: "kg"
  },
  cardio: {
    label: "Cardio",
    color: "#06b6d4",
    icon: BarChart3,
    unit: "km"
  },
  energy: {
    label: "Energy",
    color: "#eab308",
    icon: Battery,
    unit: "%"
  },
  heart: {
    label: "Heart Rate",
    color: "#ef4444", 
    icon: Heart,
    unit: "bpm"
  },
  time: {
    label: "Time",
    color: "#8b5cf6",
    icon: Clock,
    unit: "min"
  }
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-background border rounded-lg shadow-sm text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary font-semibold">
          {payload[0].value} {payload[0].unit}
        </p>
      </div>
    );
  }
  return null;
};

export function ProgressChart({ title, data, metric, className }: ProgressChartProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { color, icon: Icon, unit } = metricConfig[metric];

  useEffect(() => {
    // Create animation effect by gradually revealing data points
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      setChartData(data);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [data]);
  
  return (
    <div 
      className={cn(
        "p-5 rounded-2xl bg-card border",
        "animate-scale-in hover:shadow-soft transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center" 
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <h3 className="font-display font-medium text-base">{title}</h3>
            <p className="text-xs text-muted-foreground">{metricConfig[metric].label}</p>
          </div>
        </div>
      </div>
      
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={animationComplete ? chartData : []}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0, fill: color }}
              unit={unit}
              animationDuration={1500}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;
