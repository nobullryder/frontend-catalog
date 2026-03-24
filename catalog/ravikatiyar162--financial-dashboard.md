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
financial-dashboard.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  History,
  Library,
  Search,
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// --- TYPE DEFINITIONS ---
type QuickAction = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type Activity = {
  icon: React.ReactNode; // Changed to ReactNode to be more flexible
  title: string;
  time: string;
  amount: number;
};

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  isPremium?: boolean;
  hasAction?: boolean;
};

interface FinancialDashboardProps {
  quickActions: QuickAction[];
  recentActivity: Activity[];
  financialServices: Service[];
}

// --- HELPER COMPONENTS ---
const IconWrapper = ({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className?: string;
}) => (
  <div
    className={cn(
      'p-2 rounded-full flex items-center justify-center',
      className
    )}
  >
    <Icon className="w-5 h-5" />
  </div>
);

// --- MAIN COMPONENT ---
export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  quickActions,
  recentActivity,
  financialServices,
}) => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card text-card-foreground rounded-2xl border shadow-sm max-w-2xl mx-auto font-sans"
    >
      <div className="p-4 md:p-6">
        {/* Search Bar */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, payments, or type a command..."
            className="bg-background w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center text-xs font-mono text-muted-foreground bg-muted p-1 rounded-md">
            ⌘K
          </kbd>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--muted))' }}
              className="group text-center p-3 rounded-xl cursor-pointer transition-colors"
            >
              <IconWrapper
                icon={action.icon}
                className="mx-auto mb-2 bg-muted group-hover:bg-background"
              />
              <p className="text-sm font-medium">{action.title}</p>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Recent activity</h2>
          </div>
          <motion.ul
            variants={containerVariants}
            className="space-y-4"
          >
            {recentActivity.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* --- FIX IS HERE --- */}
                  {/* Use React.isValidElement to check if the icon is a component or an element */}
                  {React.isValidElement(activity.icon) ? (
                    activity.icon
                  ) : (
                    <IconWrapper
                      icon={activity.icon as React.ElementType}
                      className="bg-muted text-muted-foreground"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'text-sm font-mono p-1 px-2 rounded',
                    activity.amount > 0
                      ? 'text-green-600 dark:text-green-400 bg-green-500/10'
                      : 'text-red-600 dark:text-red-400 bg-red-500/10'
                  )}
                >
                  {activity.amount > 0 ? '+' : '-'}$
                  {Math.abs(activity.amount).toFixed(2)}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Financial Services */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Library className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Financial services</h2>
          </div>
          <motion.div
            variants={containerVariants}
            className="space-y-2"
          >
            {financialServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 4px 10px hsla(var(--foreground), 0.05)',
                  backgroundColor: 'hsl(var(--muted))',
                }}
                className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <IconWrapper
                    icon={service.icon}
                    className="bg-muted-foreground/10"
                  />
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      {service.title}
                      {service.isPremium && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                {service.hasAction && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

code.demo.1759039352149.tsx
import React from 'react';
import { FinancialDashboard } from '@/components/ui/financial-dashboard';

// Import Lucide icons for the demo
import {
  ArrowLeftRight,
  CreditCard,
  Landmark,
  LineChart,
  ShieldCheck,
  SwitchCamera,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

// --- Fallback Icon for Logo ---
const LogoIcon = ({
  letter,
  className,
}: {
  letter: string;
  className?: string;
}) => (
  <div
    className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-white text-sm ${className}`}
  >
    {letter}
  </div>
);

// --- DEMO DATA ---
const quickActionsData = [
  { icon: ArrowLeftRight, title: 'Transfer', description: 'Send Money' },
  { icon: Landmark, title: 'Pay', description: 'Bills & Payments' },
  { icon: TrendingUp, title: 'Invest', description: 'Grow Wealth' },
  { icon: CreditCard, title: 'Cards', description: 'Manage Cards' },
];

const recentActivityData = [
  {
    icon: <LogoIcon letter="N" className="bg-red-600" />,
    title: 'Netflix Subscription',
    time: '2 hours ago',
    amount: -15.99,
  },
  {
    icon: <LogoIcon letter="S" className="bg-green-500" />,
    title: 'Salary Deposit',
    time: '1 day ago',
    amount: 3450.0,
  },
  {
    icon: LineChart,
    title: 'Investment Transfer',
    time: '2 days ago',
    amount: -500.0,
  },
];

const financialServicesData = [
  {
    icon: ShieldCheck,
    title: 'Wealth Management',
    description: 'Investment portfolios & advisory',
    isPremium: true,
  },
  {
    icon: Target,
    title: 'Savings Goals',
    description: 'Set & track financial goals',
    hasAction: true,
  },
  {
    icon: SwitchCamera,
    title: 'Cash Flow',
    description: 'Income & expense analysis',
  },
  {
    icon: Users,
    title: 'Joint Accounts',
    description: 'Family & business accounts',
  },
];

// --- DEMO COMPONENT ---
export default function FinancialDashboardDemo() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <FinancialDashboard
        quickActions={quickActionsData}
        recentActivity={recentActivityData}
        financialServices={financialServicesData}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/financial-dashboard.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  History,
  Library,
  Search,
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// --- TYPE DEFINITIONS ---
type QuickAction = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type Activity = {
  icon: React.ReactNode; // Changed to ReactNode to be more flexible
  title: string;
  time: string;
  amount: number;
};

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  isPremium?: boolean;
  hasAction?: boolean;
};

interface FinancialDashboardProps {
  quickActions: QuickAction[];
  recentActivity: Activity[];
  financialServices: Service[];
}

// --- HELPER COMPONENTS ---
const IconWrapper = ({
  icon: Icon,
  className,
}: {
  icon: React.ElementType;
  className?: string;
}) => (
  <div
    className={cn(
      'p-2 rounded-full flex items-center justify-center',
      className
    )}
  >
    <Icon className="w-5 h-5" />
  </div>
);

// --- MAIN COMPONENT ---
export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  quickActions,
  recentActivity,
  financialServices,
}) => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-card text-card-foreground rounded-2xl border shadow-sm max-w-2xl mx-auto font-sans"
    >
      <div className="p-4 md:p-6">
        {/* Search Bar */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, payments, or type a command..."
            className="bg-background w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center text-xs font-mono text-muted-foreground bg-muted p-1 rounded-md">
            ⌘K
          </kbd>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--muted))' }}
              className="group text-center p-3 rounded-xl cursor-pointer transition-colors"
            >
              <IconWrapper
                icon={action.icon}
                className="mx-auto mb-2 bg-muted group-hover:bg-background"
              />
              <p className="text-sm font-medium">{action.title}</p>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Recent activity</h2>
          </div>
          <motion.ul
            variants={containerVariants}
            className="space-y-4"
          >
            {recentActivity.map((activity, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* --- FIX IS HERE --- */}
                  {/* Use React.isValidElement to check if the icon is a component or an element */}
                  {React.isValidElement(activity.icon) ? (
                    activity.icon
                  ) : (
                    <IconWrapper
                      icon={activity.icon as React.ElementType}
                      className="bg-muted text-muted-foreground"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'text-sm font-mono p-1 px-2 rounded',
                    activity.amount > 0
                      ? 'text-green-600 dark:text-green-400 bg-green-500/10'
                      : 'text-red-600 dark:text-red-400 bg-red-500/10'
                  )}
                >
                  {activity.amount > 0 ? '+' : '-'}$
                  {Math.abs(activity.amount).toFixed(2)}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Financial Services */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Library className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Financial services</h2>
          </div>
          <motion.div
            variants={containerVariants}
            className="space-y-2"
          >
            {financialServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 4px 10px hsla(var(--foreground), 0.05)',
                  backgroundColor: 'hsl(var(--muted))',
                }}
                className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <IconWrapper
                    icon={service.icon}
                    className="bg-muted-foreground/10"
                  />
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      {service.title}
                      {service.isPremium && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                {service.hasAction && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react, clsx, tailwind-merge
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
