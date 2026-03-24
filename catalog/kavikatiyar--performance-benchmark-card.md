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
performance-benchmark-card.tsx
import * as React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { Utensils, Sandwich, Hamburger, Share, Copy, BarChartHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions for the component props
interface Competitor {
  name: string;
  value: number;
  icon: React.ReactNode;
}

interface PerformanceLevel {
  label: string;
  value: number;
  color: string;
}

interface PerformanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  headerIcon: React.ReactNode;
  mainValue: number;
  percentageChange: number;
  benchmarkAverage: number;
  competitors: Competitor[];
  performanceLevels: PerformanceLevel[];
}

// Animated number component
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

// Main PerformanceCard component
export const PerformanceCard = React.forwardRef<
  HTMLDivElement,
  PerformanceCardProps
>(
  (
    {
      className,
      title,
      headerIcon,
      mainValue,
      percentageChange,
      benchmarkAverage,
      competitors,
      performanceLevels,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    const maxValue = Math.max(
      mainValue,
      benchmarkAverage,
      ...competitors.map((c) => c.value)
    );
    const totalLevelValue = performanceLevels[performanceLevels.length - 1].value;

    return (
      <Card
        ref={cardRef}
        className={cn("w-full max-w-lg mx-auto", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {headerIcon}
              <span>{title}</span>
            </div>
            <Select defaultValue="delivery">
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="dine-in">Dine-in</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Main Metric Section */}
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-4xl font-bold tracking-tight">
                <AnimatedNumber value={mainValue} />
              </p>
              <p
                className={cn(
                  "text-xs font-medium",
                  percentageChange > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                ▲ {percentageChange}% to last period
              </p>
            </div>
            <div className="w-1/2">
              <div className="relative h-2 rounded-full bg-muted">
                <motion.div
                  className="absolute h-2 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${(mainValue / maxValue) * 100}%` : 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute h-2 -translate-y-1/2 top-1/2"
                  style={{
                    left: `${(benchmarkAverage / maxValue) * 100}%`,
                    width: '1px',
                    height: '16px',
                    backgroundColor: 'hsl(var(--foreground))',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Benchmark average</span>
                <span>{benchmarkAverage.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Competitors Section */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium">Main competitors</h3>
            {competitors.map((competitor, i) => (
              <div key={competitor.name} className="flex items-center gap-3">
                <div className="text-muted-foreground">{competitor.icon}</div>
                <span className="flex-1 text-sm">{competitor.name}</span>
                <span className="text-sm font-medium">
                  {competitor.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Performance Levels Section */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <BarChartHorizontal className="w-4 h-4 text-muted-foreground" />
              <span>Performance benchmark levels</span>
            </h3>
            <div className="relative flex w-full h-2 rounded-full overflow-hidden">
              {performanceLevels.map((level, i) => {
                  const prevValue = i > 0 ? performanceLevels[i-1].value : 0;
                  const width = ((level.value - prevValue) / totalLevelValue) * 100;
                  return (
                    <div
                      key={level.label}
                      className={level.color}
                      style={{ width: `${width}%`}}
                    />
                  );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {performanceLevels.map((level) => (
                <span key={level.label}>{level.label}</span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Share className="w-3 h-3 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Copy className="w-3 h-3 mr-2" />
              Copy link
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PerformanceCard.displayName = "PerformanceCard";

code.demo.1759907015017.tsx
import { PerformanceCard } from "@/components/ui/performance-benchmark-card";
import { Utensils, Sandwich, Bubbles, Banana } from "lucide-react";

export default function PerformanceCardDemo() {
  const foodData = {
    title: "Food",
    headerIcon: <Utensils className="w-4 h-4" />,
    mainValue: 1256,
    percentageChange: 8.6,
    benchmarkAverage: 960,
    competitors: [
      {
        name: "Banana Shake",
        value: 2292,
        icon: <Banana className="w-4 h-4" />,
      },
      {
        name: "Big Fernand",
        value: 1694,
        icon: <Sandwich className="w-4 h-4" />,
      },
      {
        name: "Manhatt'n's Burgers",
        value: 998,
        icon: <Bubbles className="w-4 h-4" />,
      },
    ],
    performanceLevels: [
        { label: "0", value: 800, color: "bg-red-500" },
        { label: "800", value: 1100, color: "bg-orange-400" },
        { label: "1100", value: 1400, color: "bg-yellow-400" },
        { label: "+1400", value: 2500, color: "bg-green-500" },
    ],
  };

  return (
    <div className="flex items-center justify-center h-full bg-background p-4">
      <PerformanceCard
        title={foodData.title}
        headerIcon={foodData.headerIcon}
        mainValue={foodData.mainValue}
        percentageChange={foodData.percentageChange}
        benchmarkAverage={foodData.benchmarkAverage}
        competitors={foodData.competitors}
        performanceLevels={foodData.performanceLevels}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/performance-benchmark-card.tsx
import * as React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { Utensils, Sandwich, Hamburger, Share, Copy, BarChartHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions for the component props
interface Competitor {
  name: string;
  value: number;
  icon: React.ReactNode;
}

interface PerformanceLevel {
  label: string;
  value: number;
  color: string;
}

interface PerformanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  headerIcon: React.ReactNode;
  mainValue: number;
  percentageChange: number;
  benchmarkAverage: number;
  competitors: Competitor[];
  performanceLevels: PerformanceLevel[];
}

// Animated number component
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

// Main PerformanceCard component
export const PerformanceCard = React.forwardRef<
  HTMLDivElement,
  PerformanceCardProps
>(
  (
    {
      className,
      title,
      headerIcon,
      mainValue,
      percentageChange,
      benchmarkAverage,
      competitors,
      performanceLevels,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    const maxValue = Math.max(
      mainValue,
      benchmarkAverage,
      ...competitors.map((c) => c.value)
    );
    const totalLevelValue = performanceLevels[performanceLevels.length - 1].value;

    return (
      <Card
        ref={cardRef}
        className={cn("w-full max-w-lg mx-auto", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {headerIcon}
              <span>{title}</span>
            </div>
            <Select defaultValue="delivery">
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="dine-in">Dine-in</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Main Metric Section */}
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-4xl font-bold tracking-tight">
                <AnimatedNumber value={mainValue} />
              </p>
              <p
                className={cn(
                  "text-xs font-medium",
                  percentageChange > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                ▲ {percentageChange}% to last period
              </p>
            </div>
            <div className="w-1/2">
              <div className="relative h-2 rounded-full bg-muted">
                <motion.div
                  className="absolute h-2 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${(mainValue / maxValue) * 100}%` : 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute h-2 -translate-y-1/2 top-1/2"
                  style={{
                    left: `${(benchmarkAverage / maxValue) * 100}%`,
                    width: '1px',
                    height: '16px',
                    backgroundColor: 'hsl(var(--foreground))',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Benchmark average</span>
                <span>{benchmarkAverage.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Competitors Section */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium">Main competitors</h3>
            {competitors.map((competitor, i) => (
              <div key={competitor.name} className="flex items-center gap-3">
                <div className="text-muted-foreground">{competitor.icon}</div>
                <span className="flex-1 text-sm">{competitor.name}</span>
                <span className="text-sm font-medium">
                  {competitor.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Performance Levels Section */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <BarChartHorizontal className="w-4 h-4 text-muted-foreground" />
              <span>Performance benchmark levels</span>
            </h3>
            <div className="relative flex w-full h-2 rounded-full overflow-hidden">
              {performanceLevels.map((level, i) => {
                  const prevValue = i > 0 ? performanceLevels[i-1].value : 0;
                  const width = ((level.value - prevValue) / totalLevelValue) * 100;
                  return (
                    <div
                      key={level.label}
                      className={level.color}
                      style={{ width: `${width}%`}}
                    />
                  );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {performanceLevels.map((level) => (
                <span key={level.label}>{level.label}</span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full">
              <Share className="w-3 h-3 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Copy className="w-3 h-3 mr-2" />
              Copy link
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PerformanceCard.displayName = "PerformanceCard";
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
