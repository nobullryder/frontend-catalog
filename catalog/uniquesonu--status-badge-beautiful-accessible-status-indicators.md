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
status-badge-beautiful-accessible-status-indicators.tsx
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils"; // Assumes shadcn's utility for class merging
import { AlertCircle, CheckCircle, Clock, XCircle, MinusCircle, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui Badge component

// Define the available standard statuses
export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'pending' | 'default';

// --- Internal Configuration ---

interface StatusConfig {
  icon: React.ElementType;
  /** Tailwind classes for the badge variant */
  classNames: string;
  /** ARIA role for accessibility */
  role: 'status' | 'alert' | 'none';
}

const STATUS_MAP: Record<StatusType, StatusConfig> = {
  success: {
    icon: CheckCircle,
    // Using custom classes that rely on shadcn/ui's monochrome variables for border/background
    classNames: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
    role: 'status',
  },
  error: {
    icon: XCircle,
    classNames: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30",
    role: 'alert',
  },
  warning: {
    icon: AlertCircle,
    classNames: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
    role: 'alert',
  },
  info: {
    icon: Info,
    classNames: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    role: 'status',
  },
  pending: {
    icon: Clock,
    classNames: "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
    role: 'status',
  },
  default: {
    icon: MinusCircle,
    // Uses shadcn/ui 'secondary' tokens for a monochrome, professional look
    classNames: "bg-secondary text-secondary-foreground border-secondary-border hover:bg-secondary/80",
    role: 'none',
  },
};

// --- 📦 API (Props) Definition ---
export interface StatusBadgeProps {
  /** The text content displayed inside the badge. */
  children: React.ReactNode;
  /** The predefined status type to determine color and icon. */
  status: StatusType;
  /** Optional custom Tailwind classes for further styling. */
  className?: string;
  /** If true, the icon will not be displayed. */
  hideIcon?: boolean;
}

/**
 * A professional, monochrome, and accessible component for displaying status or state.
 * It automatically selects color and icon based on the 'status' prop.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  status,
  className,
  hideIcon = false,
}) => {
  const config = useMemo(() => STATUS_MAP[status] || STATUS_MAP['default'], [status]);
  const IconComponent = config.icon;

  return (
    <Badge
      className={cn(
        "flex items-center gap-1 font-medium text-xs h-5 px-2 py-0 border transition-all duration-200 cursor-default",
        config.classNames,
        className
      )}
      role={config.role}
      aria-live={config.role === 'alert' ? 'assertive' : 'polite'}
    >
      {!hideIcon && (
        <IconComponent className="h-3 w-3" aria-hidden="true" />
      )}
      <span className="truncate">{children}</span>
    </Badge>
  );
};



const ExampleUsage = () => {
  return (
    <div className="flex flex-col gap-6 p-8 bg-background border rounded-lg max-w-4xl mx-auto shadow-md">
      <h3 className="text-xl font-semibold text-foreground mb-2">System Status Indicators</h3>
      
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="success">Active / Live</StatusBadge>
        <StatusBadge status="pending">In Review</StatusBadge>
        <StatusBadge status="info">Deployment v2.1</StatusBadge>
        <StatusBadge status="warning">Needs Attention</StatusBadge>
        <StatusBadge status="error">Failed / Disabled</StatusBadge>
        <StatusBadge status="default">Archived</StatusBadge>
        
        <StatusBadge status="success" hideIcon>Complete</StatusBadge>
        
        {/* Example of custom styling */}
        <StatusBadge status="pending" className="uppercase text-xs tracking-wider">
          Processing
        </StatusBadge>
      </div>

      <div className="bg-card p-4 rounded-md border">
        <p className="text-sm text-muted-foreground mb-2">
            Example Integration in a List Item:
        </p>
        <div className="flex items-center justify-between p-2 border-b last:border-b-0">
            <span className="font-medium text-foreground">API Gateway Service</span>
            <StatusBadge status="success">Operational</StatusBadge>
        </div>
        <div className="flex items-center justify-between p-2 border-b last:border-b-0">
            <span className="font-medium text-foreground">Database Sync Job</span>
            <StatusBadge status="error">Sync Error</StatusBadge>
        </div>
      </div>
    </div>
  );
};

export default ExampleUsage; 

code.demo.1758875561022.tsx
import ExampleUsage from "@/components/ui/status-badge-beautiful-accessible-status-indicators";

export default function DemoOne() {
  return <ExampleUsage />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/status-badge-beautiful-accessible-status-indicators.tsx
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils"; // Assumes shadcn's utility for class merging
import { AlertCircle, CheckCircle, Clock, XCircle, MinusCircle, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui Badge component

// Define the available standard statuses
export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'pending' | 'default';

// --- Internal Configuration ---

interface StatusConfig {
  icon: React.ElementType;
  /** Tailwind classes for the badge variant */
  classNames: string;
  /** ARIA role for accessibility */
  role: 'status' | 'alert' | 'none';
}

const STATUS_MAP: Record<StatusType, StatusConfig> = {
  success: {
    icon: CheckCircle,
    // Using custom classes that rely on shadcn/ui's monochrome variables for border/background
    classNames: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
    role: 'status',
  },
  error: {
    icon: XCircle,
    classNames: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30",
    role: 'alert',
  },
  warning: {
    icon: AlertCircle,
    classNames: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
    role: 'alert',
  },
  info: {
    icon: Info,
    classNames: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    role: 'status',
  },
  pending: {
    icon: Clock,
    classNames: "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
    role: 'status',
  },
  default: {
    icon: MinusCircle,
    // Uses shadcn/ui 'secondary' tokens for a monochrome, professional look
    classNames: "bg-secondary text-secondary-foreground border-secondary-border hover:bg-secondary/80",
    role: 'none',
  },
};

// --- 📦 API (Props) Definition ---
export interface StatusBadgeProps {
  /** The text content displayed inside the badge. */
  children: React.ReactNode;
  /** The predefined status type to determine color and icon. */
  status: StatusType;
  /** Optional custom Tailwind classes for further styling. */
  className?: string;
  /** If true, the icon will not be displayed. */
  hideIcon?: boolean;
}

/**
 * A professional, monochrome, and accessible component for displaying status or state.
 * It automatically selects color and icon based on the 'status' prop.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  status,
  className,
  hideIcon = false,
}) => {
  const config = useMemo(() => STATUS_MAP[status] || STATUS_MAP['default'], [status]);
  const IconComponent = config.icon;

  return (
    <Badge
      className={cn(
        "flex items-center gap-1 font-medium text-xs h-5 px-2 py-0 border transition-all duration-200 cursor-default",
        config.classNames,
        className
      )}
      role={config.role}
      aria-live={config.role === 'alert' ? 'assertive' : 'polite'}
    >
      {!hideIcon && (
        <IconComponent className="h-3 w-3" aria-hidden="true" />
      )}
      <span className="truncate">{children}</span>
    </Badge>
  );
};



const ExampleUsage = () => {
  return (
    <div className="flex flex-col gap-6 p-8 bg-background border rounded-lg max-w-4xl mx-auto shadow-md">
      <h3 className="text-xl font-semibold text-foreground mb-2">System Status Indicators</h3>
      
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="success">Active / Live</StatusBadge>
        <StatusBadge status="pending">In Review</StatusBadge>
        <StatusBadge status="info">Deployment v2.1</StatusBadge>
        <StatusBadge status="warning">Needs Attention</StatusBadge>
        <StatusBadge status="error">Failed / Disabled</StatusBadge>
        <StatusBadge status="default">Archived</StatusBadge>
        
        <StatusBadge status="success" hideIcon>Complete</StatusBadge>
        
        {/* Example of custom styling */}
        <StatusBadge status="pending" className="uppercase text-xs tracking-wider">
          Processing
        </StatusBadge>
      </div>

      <div className="bg-card p-4 rounded-md border">
        <p className="text-sm text-muted-foreground mb-2">
            Example Integration in a List Item:
        </p>
        <div className="flex items-center justify-between p-2 border-b last:border-b-0">
            <span className="font-medium text-foreground">API Gateway Service</span>
            <StatusBadge status="success">Operational</StatusBadge>
        </div>
        <div className="flex items-center justify-between p-2 border-b last:border-b-0">
            <span className="font-medium text-foreground">Database Sync Job</span>
            <StatusBadge status="error">Sync Error</StatusBadge>
        </div>
      </div>
    </div>
  );
};

export default ExampleUsage; 
```

Install NPM dependencies:
```bash
lucide-react
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
