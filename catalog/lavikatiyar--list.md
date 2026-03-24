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
list.tsx
// components/ui/activity-list.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

// --- TYPE DEFINITIONS ---
export interface ActivityItem {
  id: string | number;
  name: string;
  description: string;
  avatarUrl: string;
  amount: number;
  date: string;
  currency: string;
}

interface ActivityListProps {
  title: string;
  items: ActivityItem[];
  className?: string;
}

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- HELPER FUNCTION ---
const formatCurrency = (amount: number, currency: string) => {
  const sign = amount > 0 ? '+' : '-';
  const absoluteAmount = Math.abs(amount).toLocaleString('en-US');
  return `${sign} ${currency} ${absoluteAmount}`;
};

// --- MAIN COMPONENT ---
const ActivityList = React.forwardRef<HTMLDivElement, ActivityListProps>(
  ({ title, items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
          className
        )}
      >
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {items.length > 0 ? (
          <motion.ul
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <motion.li key={item.id} className="flex items-center gap-4" variants={itemVariants}>
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>

                {/* Name and Description */}
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                {/* Amount and Date */}
                <div className="flex-shrink-0 text-right">
                  <p
                    className={cn(
                      'font-semibold',
                      item.amount > 0 ? 'text-emerald-500' : 'text-destructive'
                    )}
                  >
                    {formatCurrency(item.amount, item.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
            No recent activity.
          </div>
        )}
      </div>
    );
  }
);

ActivityList.displayName = 'ActivityList';

export { ActivityList };

code.demo.1758069432017.tsx
// demo.tsx

import { ActivityList, type ActivityItem } from '@/components/ui/list'; // Adjust path as needed

// --- MOCK DATA ---
const activities: ActivityItem[] = [
  {
    id: 1,
    name: 'Samantha',
    description: 'Ngopi Sore',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    amount: 35000,
    date: 'Sep 25, 2024',
    currency: 'IDR',
  },
  {
    id: 2,
    name: 'Karen William',
    description: 'Makan Bareng',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    amount: 125800,
    date: 'Sep 25, 2024',
    currency: 'IDR',
  },
  {
    id: 3,
    name: 'Angela Smith',
    description: 'Tiket Kereta',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    amount: -67500,
    date: 'Sep 25, 2024',
    currency: 'IDR',
  },
];

// --- DEMO COMPONENT ---
const ActivityListDemo = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <ActivityList title="Recent Activity" items={activities} />
    </div>
  );
};

export default ActivityListDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/list.tsx
// components/ui/activity-list.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

// --- TYPE DEFINITIONS ---
export interface ActivityItem {
  id: string | number;
  name: string;
  description: string;
  avatarUrl: string;
  amount: number;
  date: string;
  currency: string;
}

interface ActivityListProps {
  title: string;
  items: ActivityItem[];
  className?: string;
}

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- HELPER FUNCTION ---
const formatCurrency = (amount: number, currency: string) => {
  const sign = amount > 0 ? '+' : '-';
  const absoluteAmount = Math.abs(amount).toLocaleString('en-US');
  return `${sign} ${currency} ${absoluteAmount}`;
};

// --- MAIN COMPONENT ---
const ActivityList = React.forwardRef<HTMLDivElement, ActivityListProps>(
  ({ title, items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md rounded-xl border bg-card p-6 text-card-foreground shadow-sm',
          className
        )}
      >
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {items.length > 0 ? (
          <motion.ul
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item) => (
              <motion.li key={item.id} className="flex items-center gap-4" variants={itemVariants}>
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>

                {/* Name and Description */}
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>

                {/* Amount and Date */}
                <div className="flex-shrink-0 text-right">
                  <p
                    className={cn(
                      'font-semibold',
                      item.amount > 0 ? 'text-emerald-500' : 'text-destructive'
                    )}
                  >
                    {formatCurrency(item.amount, item.currency)}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
            No recent activity.
          </div>
        )}
      </div>
    );
  }
);

ActivityList.displayName = 'ActivityList';

export { ActivityList };
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
