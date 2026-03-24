You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
hud-area-chart-1.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AreaChart, Area, YAxis, ResponsiveContainer } from "recharts";

interface HudAreaChartProps {
  showYAxis: boolean;
  data: { time: string; value: number }[];
  gradientColor?: string;
  borderColor?: string;
  dotColor?: string;
  dotSize?: number;
  dotOpacity?: number;
  scale?: number;
}

export function HudAreaChart({
  showYAxis = false,
  data = [],
  gradientColor = "#ffffff",
  borderColor = "#ffffff",
  dotColor = "#ffffff",
  dotSize = 0.8,
  dotOpacity = 0.1,
  scale = 1,
}: HudAreaChartProps) {
  const [hoveredData, setHoveredData] = useState<{
    time: string;
    value: number;
  } | null>(null);

  const handleMouseMove = (state: { activePayload?: Array<{ payload: { time: string; value: number } }> }) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      setHoveredData({
        time: state.activePayload[0].payload.time,
        value: state.activePayload[0].payload.value,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <div 
      className="relative w-96 h-80"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* SVG Frame Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 152 149" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dotted grid pattern */}
            <pattern id="dotGrid" x="0" y="0" width="16.89" height="14.9" patternUnits="userSpaceOnUse">
              <circle cx="8.445" cy="7.45" r={dotSize} fill={dotColor} opacity={dotOpacity} />
            </pattern>
            
            {/* Clipping path for the chart area */}
            <clipPath id="chartClip">
              <path d="M1 1h149.894v131.772L135.145 147.521H1V1z" />
            </clipPath>
          </defs>
          
          {/* Grid background */}
          <rect x="1" y="1" width="150.894" height="146.521" fill="url(#dotGrid)" />
          
          {/* Frame border */}
          <path 
            d="M136.145 148.521H0V0H151.894V132.772L136.145 148.521ZM1 147.521H135.73L150.894 132.358V1H1V147.521Z" 
            fill={borderColor}
          />
        </svg>
      </div>

      {/* Graph Container with clipping */}
      <div 
        className="absolute inset-y-4 -left-3 right-7 bottom-0 z-0"
        style={{
          clipPath: "polygon(0.6% 0.7%, 99.3% 0.7%, 99.3% 89.2%, 89.5% 99%, 0.6% 99%)"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 1, left: -18, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              {/* Radial gradient to eliminate baseline visibility */}
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.4} />
                <stop offset="20%" stopColor={gradientColor} stopOpacity={0.25} />
                <stop offset="40%" stopColor={gradientColor} stopOpacity={0.15} />
                <stop offset="70%" stopColor={gradientColor} stopOpacity={0.05} />
                <stop offset="90%" stopColor={gradientColor} stopOpacity={0.01} />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: gradientColor, fontSize: 10 }}
              className={cn(showYAxis ? "opacity-100" : "opacity-0")}
            />

            {/* Area with baseline-friendly gradient */}
            <Area
              type="monotone"
              dataKey="value"
              stroke={borderColor}
              strokeWidth={1.5}
              fill="url(#gradient)"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Left Data Display */}
      {hoveredData && (
        <div className="absolute bottom-4 left-10 text-primary font-mono text-xs z-20">
          {hoveredData.time} : {hoveredData.value}
        </div>
      )}
    </div>
  );
}


code.demo.1748971163257.tsx
"use client";
import { useTheme } from "next-themes";
import { HudAreaChart } from "@/components/ui/hud-area-chart-1";

export default function Page() {
  const { theme } = useTheme();
  // Sample data for the graph
  const data = [
    { time: "00:00", value: 20 },
    { time: "04:00", value: 35 },
    { time: "08:00", value: 65 },
    { time: "12:00", value: 10 },
    { time: "16:00", value: 45 },
    { time: "20:00", value: 30 },
    { time: "24:00", value: 25 },
  ];
  return (
    <div className="bg-background min-h-screen overflow-hidden flex items-center justify-center">
      <HudAreaChart
        showYAxis={false}
        data={data}
        gradientColor={theme === "dark" ? "#ffffff" : "#000000"}
        borderColor={theme === "dark" ? "#ffffff" : "#000000"}
        dotColor={theme === "dark" ? "#ffffff" : "#000000"}
        dotSize={0.8}
        dotOpacity={0.1}
        scale={1}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hud-area-chart-1.tsx
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AreaChart, Area, YAxis, ResponsiveContainer } from "recharts";

interface HudAreaChartProps {
  showYAxis: boolean;
  data: { time: string; value: number }[];
  gradientColor?: string;
  borderColor?: string;
  dotColor?: string;
  dotSize?: number;
  dotOpacity?: number;
  scale?: number;
}

export function HudAreaChart({
  showYAxis = false,
  data = [],
  gradientColor = "#ffffff",
  borderColor = "#ffffff",
  dotColor = "#ffffff",
  dotSize = 0.8,
  dotOpacity = 0.1,
  scale = 1,
}: HudAreaChartProps) {
  const [hoveredData, setHoveredData] = useState<{
    time: string;
    value: number;
  } | null>(null);

  const handleMouseMove = (state: { activePayload?: Array<{ payload: { time: string; value: number } }> }) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      setHoveredData({
        time: state.activePayload[0].payload.time,
        value: state.activePayload[0].payload.value,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <div 
      className="relative w-96 h-80"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* SVG Frame Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 152 149" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dotted grid pattern */}
            <pattern id="dotGrid" x="0" y="0" width="16.89" height="14.9" patternUnits="userSpaceOnUse">
              <circle cx="8.445" cy="7.45" r={dotSize} fill={dotColor} opacity={dotOpacity} />
            </pattern>
            
            {/* Clipping path for the chart area */}
            <clipPath id="chartClip">
              <path d="M1 1h149.894v131.772L135.145 147.521H1V1z" />
            </clipPath>
          </defs>
          
          {/* Grid background */}
          <rect x="1" y="1" width="150.894" height="146.521" fill="url(#dotGrid)" />
          
          {/* Frame border */}
          <path 
            d="M136.145 148.521H0V0H151.894V132.772L136.145 148.521ZM1 147.521H135.73L150.894 132.358V1H1V147.521Z" 
            fill={borderColor}
          />
        </svg>
      </div>

      {/* Graph Container with clipping */}
      <div 
        className="absolute inset-y-4 -left-3 right-7 bottom-0 z-0"
        style={{
          clipPath: "polygon(0.6% 0.7%, 99.3% 0.7%, 99.3% 89.2%, 89.5% 99%, 0.6% 99%)"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 1, left: -18, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              {/* Radial gradient to eliminate baseline visibility */}
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.4} />
                <stop offset="20%" stopColor={gradientColor} stopOpacity={0.25} />
                <stop offset="40%" stopColor={gradientColor} stopOpacity={0.15} />
                <stop offset="70%" stopColor={gradientColor} stopOpacity={0.05} />
                <stop offset="90%" stopColor={gradientColor} stopOpacity={0.01} />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: gradientColor, fontSize: 10 }}
              className={cn(showYAxis ? "opacity-100" : "opacity-0")}
            />

            {/* Area with baseline-friendly gradient */}
            <Area
              type="monotone"
              dataKey="value"
              stroke={borderColor}
              strokeWidth={1.5}
              fill="url(#gradient)"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Left Data Display */}
      {hoveredData && (
        <div className="absolute bottom-4 left-10 text-primary font-mono text-xs z-20">
          {hoveredData.time} : {hoveredData.value}
        </div>
      )}
    </div>
  );
}

```

Install NPM dependencies:
```bash
recharts
```

Implementation Guidelines
1. Analyze the component structure and identify all required dependencies
2. Review the component's argumens and state
3. Identify any required context providers or hooks and install them
4. Questions to Ask
- What data/props will be passed to this component?
- Are there any specific state management requirements?
- Are there any required assets (images, icons, etc.)?
- What is the expected responsive behavior?
- What is the best place to use this component in the app?

Steps to integrate
0. Copy paste all the code above in the correct directories
1. Install external dependencies
2. Fill image assets with Unsplash stock images you know exist
3. Use lucide-react icons for svgs or logos if component requires them

Remember: Do not change the component's code unless it's required to integrate or the user asks you to.
IMPORTANT: Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.
