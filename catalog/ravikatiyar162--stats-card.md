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
stats-card.tsx
// components/ui/freelancer-stats-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for merging classes

// Type definitions for the component props for type-safety and clarity
type SubStat = {
  value: string | number;
  label: string;
  subLabel: string;
};

type AvailabilityBar = {
  level: number; // A value between 0 and 1 representing the fill percentage
};

interface FreelancerStatsCardProps {
  /** The main title of the card */
  title: string;
  /** The text for the time frame display */
  timeFrame: string;
  /** Main earnings statistics */
  earnings: {
    amount: number;
    change: number;
    changePeriod: string;
  };
  /** An array of two sub-statistics */
  subStats: [SubStat, SubStat];
  /** Ranking information */
  ranking: {
    place: string;
    category: string;
    icon?: React.ReactNode;
  };
  /** Availability data */
  availability: {
    title: string;
    bars: AvailabilityBar[];
    label: string;
  };
  /** Optional additional class names */
  className?: string;
}

/**
 * A card component to display freelancer statistics with an animated availability chart.
 * Built with shadcn/ui principles, it's responsive and theme-adaptive.
 */
export const FreelancerStatsCard = React.forwardRef<
  HTMLDivElement,
  FreelancerStatsCardProps
>(({ title, timeFrame, earnings, subStats, ranking, availability, className }, ref) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numberFormatter = new Intl.NumberFormat("en-US");

  // Animation variants for the availability bars container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for each child
      },
    },
  };

  // Animation variants for each individual bar
  const barVariants = {
    hidden: { height: "0%", opacity: 0 },
    visible: { height: "100%", opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  // Custom color stops for the gradient effect on the bars
  const barColors = [
    '#3b82f6', '#4f46e5', '#a855f7', '#d946ef', '#ec4899', '#ef4444'
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-sm rounded-2xl bg-card text-card-foreground p-6 shadow-lg font-sans flex flex-col gap-6 border",
        className
      )}
      aria-labelledby="stats-card-title"
    >
      {/* Card Header */}
      <header className="flex justify-between items-center">
        <h2 id="stats-card-title" className="text-xl font-bold">{title}</h2>
        <div className="text-sm font-medium px-3 py-1 rounded-md bg-muted text-muted-foreground">
          {timeFrame}
        </div>
      </header>

      {/* Main Earnings Section */}
      <section aria-label="Earnings">
        <p className="text-sm text-muted-foreground">Earnings</p>
        <h3 className="text-5xl font-bold tracking-tighter mt-1">
          {currencyFormatter.format(earnings.amount)}
        </h3>
        <p
          className={cn(
            "text-sm font-semibold mt-2",
            earnings.change >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {earnings.change >= 0 ? "+" : ""}
          {currencyFormatter.format(earnings.change)} {earnings.changePeriod}
        </p>
      </section>

      {/* Sub-Stats Grid */}
      <section className="grid grid-cols-2 gap-4" aria-label="Projects and Clients">
        {subStats.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <p className="text-2xl font-bold">{stat.value} <span className="text-base font-normal text-muted-foreground">{stat.label}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{stat.subLabel}</p>
          </div>
        ))}
      </section>

      {/* Ranking Section */}
      <section
        className="flex items-center justify-between bg-primary-foreground text-primary p-4 rounded-lg"
        aria-label={`Ranking: ${ranking.place}`}
      >
        <div>
          <h4 className="text-xl font-bold">{ranking.place}</h4>
          <p className="text-sm text-primary/80">{ranking.category}</p>
        </div>
        {ranking.icon && <div aria-hidden="true">{ranking.icon}</div>}
      </section>

      {/* Availability Section */}
      <section aria-labelledby="availability-title">
        <h4 id="availability-title" className="text-md font-semibold">{availability.title}</h4>
        <motion.div
          className="flex items-end gap-1 h-12 mt-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Availability chart"
        >
          {availability.bars.map((bar, index) => {
            // Determine the color based on the index
            const colorIndex = Math.floor((index / availability.bars.length) * (barColors.length - 1));
            const color = bar.level > 0 ? barColors[colorIndex] : 'hsl(var(--muted))';

            return (
              <div key={index} className="w-full h-full rounded-sm flex items-end" style={{ backgroundColor: bar.level > 0 ? 'transparent' : 'hsl(var(--muted))'}}>
                 <motion.div
                    className="w-full rounded-sm"
                    style={{ 
                        height: `${bar.level * 100}%`,
                        backgroundColor: color,
                     }}
                    variants={barVariants}
                 />
              </div>
            );
          })}
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2">{availability.label}</p>
      </section>
    </div>
  );
});

FreelancerStatsCard.displayName = "FreelancerStatsCard";

code.demo.1758440507101.tsx
// demo.tsx
import * as React from "react";
import { FreelancerStatsCard } from "@/components/ui/stats-card";

// A simple SVG icon to be passed as a prop, as seen in the design.
const LaurelIcon = () => (
  <svg
    width="80"
    height="36"
    viewBox="0 0 80 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-20"
    aria-hidden="true"
  >
    <path
      d="M26.6667 35C20 35 15.3333 30.8333 12.6667 22.3333C10 13.8333 10 1 10 1M53.3333 35C60 35 64.6667 30.8333 67.3333 22.3333C70 13.8333 70 1 70 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 6.83331C19.1667 7.49998 22.3 9.7 20.5 13.5C18.7 17.3 14.8333 15.6666 14 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3333 12.3333C22.5 13 25.6333 15.2 23.8333 19C22.0333 22.8 18.1667 21.1666 17.3333 20.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.6667 17.8333C25.8333 18.5 28.9667 20.7 27.1667 24.5C25.3667 28.3 21.5 26.6666 20.6667 26"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M62 6.83331C60.8333 7.49998 57.7 9.7 59.5 13.5C61.3 17.3 65.1667 15.6666 66 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M58.6667 12.3333C57.5 13 54.3667 15.2 56.1667 19C57.9667 22.8 61.8333 21.1666 62.6667 20.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M55.3333 17.8333C54.1667 18.5 51.0333 20.7 52.8333 24.5C54.6333 28.3 58.5 26.6666 59.3333 26"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


// Mock data for the demo
const statsCardData = {
  title: "Stats",
  timeFrame: "All Time",
  earnings: {
    amount: 9787.32,
    change: 2456.12,
    changePeriod: "since last month",
  },
  subStats: [
    { value: 36, label: "projects", subLabel: "5 this month" },
    { value: 10, label: "clients", subLabel: "3 this month" },
  ] as [any, any], // Type assertion for fixed-length array
  ranking: {
    place: "5th place",
    category: "top-hire freelancers",
    icon: <LaurelIcon />,
  },
  availability: {
    title: "Availability",
    bars: [
      { level: 1 }, { level: 1 }, { level: 1 }, { level: 1 }, { level: 1 },
      { level: 0.8 }, { level: 0.8 }, { level: 0.8 }, { level: 0.8 },
      { level: 0.6 }, { level: 0.6 }, { level: 0.6 }, { level: 0.6 },
      { level: 0.4 }, { level: 0.4 }, { level: 0.4 },
      { level: 0.2 }, { level: 0.2 }, { level: 0.2 },
      { level: 0.1 }, { level: 0.1 }, { level: 0.1 }, { level: 0.1 }, { level: 0.1 },
    ],
    label: "100h/month",
  },
};


export default function FreelancerStatsCardDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <FreelancerStatsCard {...statsCardData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stats-card.tsx
// components/ui/freelancer-stats-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for merging classes

// Type definitions for the component props for type-safety and clarity
type SubStat = {
  value: string | number;
  label: string;
  subLabel: string;
};

type AvailabilityBar = {
  level: number; // A value between 0 and 1 representing the fill percentage
};

interface FreelancerStatsCardProps {
  /** The main title of the card */
  title: string;
  /** The text for the time frame display */
  timeFrame: string;
  /** Main earnings statistics */
  earnings: {
    amount: number;
    change: number;
    changePeriod: string;
  };
  /** An array of two sub-statistics */
  subStats: [SubStat, SubStat];
  /** Ranking information */
  ranking: {
    place: string;
    category: string;
    icon?: React.ReactNode;
  };
  /** Availability data */
  availability: {
    title: string;
    bars: AvailabilityBar[];
    label: string;
  };
  /** Optional additional class names */
  className?: string;
}

/**
 * A card component to display freelancer statistics with an animated availability chart.
 * Built with shadcn/ui principles, it's responsive and theme-adaptive.
 */
export const FreelancerStatsCard = React.forwardRef<
  HTMLDivElement,
  FreelancerStatsCardProps
>(({ title, timeFrame, earnings, subStats, ranking, availability, className }, ref) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const numberFormatter = new Intl.NumberFormat("en-US");

  // Animation variants for the availability bars container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for each child
      },
    },
  };

  // Animation variants for each individual bar
  const barVariants = {
    hidden: { height: "0%", opacity: 0 },
    visible: { height: "100%", opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  // Custom color stops for the gradient effect on the bars
  const barColors = [
    '#3b82f6', '#4f46e5', '#a855f7', '#d946ef', '#ec4899', '#ef4444'
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-sm rounded-2xl bg-card text-card-foreground p-6 shadow-lg font-sans flex flex-col gap-6 border",
        className
      )}
      aria-labelledby="stats-card-title"
    >
      {/* Card Header */}
      <header className="flex justify-between items-center">
        <h2 id="stats-card-title" className="text-xl font-bold">{title}</h2>
        <div className="text-sm font-medium px-3 py-1 rounded-md bg-muted text-muted-foreground">
          {timeFrame}
        </div>
      </header>

      {/* Main Earnings Section */}
      <section aria-label="Earnings">
        <p className="text-sm text-muted-foreground">Earnings</p>
        <h3 className="text-5xl font-bold tracking-tighter mt-1">
          {currencyFormatter.format(earnings.amount)}
        </h3>
        <p
          className={cn(
            "text-sm font-semibold mt-2",
            earnings.change >= 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {earnings.change >= 0 ? "+" : ""}
          {currencyFormatter.format(earnings.change)} {earnings.changePeriod}
        </p>
      </section>

      {/* Sub-Stats Grid */}
      <section className="grid grid-cols-2 gap-4" aria-label="Projects and Clients">
        {subStats.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <p className="text-2xl font-bold">{stat.value} <span className="text-base font-normal text-muted-foreground">{stat.label}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{stat.subLabel}</p>
          </div>
        ))}
      </section>

      {/* Ranking Section */}
      <section
        className="flex items-center justify-between bg-primary-foreground text-primary p-4 rounded-lg"
        aria-label={`Ranking: ${ranking.place}`}
      >
        <div>
          <h4 className="text-xl font-bold">{ranking.place}</h4>
          <p className="text-sm text-primary/80">{ranking.category}</p>
        </div>
        {ranking.icon && <div aria-hidden="true">{ranking.icon}</div>}
      </section>

      {/* Availability Section */}
      <section aria-labelledby="availability-title">
        <h4 id="availability-title" className="text-md font-semibold">{availability.title}</h4>
        <motion.div
          className="flex items-end gap-1 h-12 mt-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Availability chart"
        >
          {availability.bars.map((bar, index) => {
            // Determine the color based on the index
            const colorIndex = Math.floor((index / availability.bars.length) * (barColors.length - 1));
            const color = bar.level > 0 ? barColors[colorIndex] : 'hsl(var(--muted))';

            return (
              <div key={index} className="w-full h-full rounded-sm flex items-end" style={{ backgroundColor: bar.level > 0 ? 'transparent' : 'hsl(var(--muted))'}}>
                 <motion.div
                    className="w-full rounded-sm"
                    style={{ 
                        height: `${bar.level * 100}%`,
                        backgroundColor: color,
                     }}
                    variants={barVariants}
                 />
              </div>
            );
          })}
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2">{availability.label}</p>
      </section>
    </div>
  );
});

FreelancerStatsCard.displayName = "FreelancerStatsCard";
```

Install NPM dependencies:
```bash
framer-motion
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
