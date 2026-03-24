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
workout-summary-card.tsx
// components/ui/workout-summary-card.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, X, Gauge, TrendingUp } from 'lucide-react';

// Define the type for each stat item
export interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  bgColor: string; // e.g., 'bg-green-100 dark:bg-green-900'
  textColor: string; // e.g., 'text-green-600 dark:text-green-400'
}

// Define the props for the main component
export interface WorkoutSummaryCardProps {
  date: string;
  activity: string;
  equipment: string;
  imageUrl: string;
  avgSpeed: string;
  avgIncline: string;
  stats: StatItem[];
  onLike?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

// Utility for formatting numbers with commas
const formatNumber = (num: number) => num.toLocaleString('en-US');

export const WorkoutSummaryCard: React.FC<WorkoutSummaryCardProps> = ({
  date,
  activity,
  equipment,
  imageUrl,
  avgSpeed,
  avgIncline,
  stats,
  onLike,
  onDelete,
  onClose,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full font-sans bg-card text-card-foreground rounded-3xl shadow-lg border p-6"
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Workout Summary</h2>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {onLike && (
            <button
              onClick={onLike}
              aria-label="Like workout"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label="Delete workout"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Trash2 className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close summary"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>

      {/* Main Activity Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-muted/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="sm:w-1/3 h-40 sm:h-auto overflow-hidden rounded-lg">
           <img
            src={imageUrl}
            alt={`${activity} workout`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{activity}</h3>
          <p className="text-sm text-muted-foreground mb-4">{equipment}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">AVG</p>
                <p className="font-bold">{avgSpeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">AVG</p>
                <p className="font-bold">{avgIncline}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats List */}
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {stats.map((stat, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-center justify-between bg-muted/50 rounded-full p-2 pl-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${stat.bgColor}`}
              >
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
              <span className="font-medium text-sm">{stat.label}</span>
            </div>
            <p className="text-lg font-bold">
              {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
              <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

code.demo.1759043779580.tsx
// demo.tsx
import {
  WorkoutSummaryCard,
  StatItem,
} from '@/components/ui/workout-summary-card';
import {
  BarChart3,
  Clock,
  Flame,
  Footprints,
} from 'lucide-react';
import React from 'react';

// Sample data for the demo
const workoutStats: StatItem[] = [
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Distance',
    value: '13.11',
    unit: 'km',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Duration',
    value: '1:10:00',
    unit: '',
    bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: <Flame className="w-5 h-5" />,
    label: 'Calories Burned',
    value: 940,
    unit: 'kcal',
    bgColor: 'bg-red-100 dark:bg-red-900/50',
    textColor: 'text-red-600 dark:text-red-400',
  },
  {
    icon: <Footprints className="w-5 h-5" />,
    label: 'Steps',
    value: 16000,
    unit: '',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
    textColor: 'text-yellow-600 dark:text-yellow-400',
  },
];

const WorkoutSummaryCardDemo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <WorkoutSummaryCard
        date="Sun, Feb 5, 18:14"
        activity="Running"
        equipment="Performed on MyRun Treadmill"
        imageUrl="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cnVufGVufDB8fDB8fHww?q=80&w=2070&auto=format&fit=crop"
        avgSpeed="11.2 km/h"
        avgIncline="0%"
        stats={workoutStats}
        onLike={() => console.log('Liked!')}
        onDelete={() => console.log('Deleted!')}
        onClose={() => console.log('Closed!')}
      />
    </div>
  );
};

export default WorkoutSummaryCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/workout-summary-card.tsx
// components/ui/workout-summary-card.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, X, Gauge, TrendingUp } from 'lucide-react';

// Define the type for each stat item
export interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  bgColor: string; // e.g., 'bg-green-100 dark:bg-green-900'
  textColor: string; // e.g., 'text-green-600 dark:text-green-400'
}

// Define the props for the main component
export interface WorkoutSummaryCardProps {
  date: string;
  activity: string;
  equipment: string;
  imageUrl: string;
  avgSpeed: string;
  avgIncline: string;
  stats: StatItem[];
  onLike?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

// Utility for formatting numbers with commas
const formatNumber = (num: number) => num.toLocaleString('en-US');

export const WorkoutSummaryCard: React.FC<WorkoutSummaryCardProps> = ({
  date,
  activity,
  equipment,
  imageUrl,
  avgSpeed,
  avgIncline,
  stats,
  onLike,
  onDelete,
  onClose,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full font-sans bg-card text-card-foreground rounded-3xl shadow-lg border p-6"
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Workout Summary</h2>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {onLike && (
            <button
              onClick={onLike}
              aria-label="Like workout"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label="Delete workout"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Trash2 className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close summary"
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>

      {/* Main Activity Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-muted/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="sm:w-1/3 h-40 sm:h-auto overflow-hidden rounded-lg">
           <img
            src={imageUrl}
            alt={`${activity} workout`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{activity}</h3>
          <p className="text-sm text-muted-foreground mb-4">{equipment}</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">AVG</p>
                <p className="font-bold">{avgSpeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">AVG</p>
                <p className="font-bold">{avgIncline}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats List */}
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {stats.map((stat, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-center justify-between bg-muted/50 rounded-full p-2 pl-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${stat.bgColor}`}
              >
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
              <span className="font-medium text-sm">{stat.label}</span>
            </div>
            <p className="text-lg font-bold">
              {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
              <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
