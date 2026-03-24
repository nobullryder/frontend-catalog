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
card-2.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Interface for each action item in the QuickLinksCard.
 * @property {React.ReactNode} icon - The icon to display for the action.
 * @property {string} label - The text label for the action button.
 * @property {() => void} onClick - The function to call when the button is clicked.
 */
export interface ActionItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * Props for the QuickLinksCard component.
 * @property {string} title - The main title of the card.
 * @property {string} [subtitle] - An optional subtitle or description.
 * @property {ActionItem[]} actions - An array of action items to be displayed as buttons.
 * @property {string} [className] - Optional additional class names for custom styling.
 */
interface QuickLinksCardProps {
  title: string;
  subtitle?: string;
  actions: ActionItem[];
  className?: string;
}

/**
 * A card component for displaying a set of "quick links" or actions.
 * It's designed to be reusable and theme-adaptive using shadcn/ui variables.
 */
export const QuickLinksCard = ({
  title,
  subtitle,
  actions,
  className,
}: QuickLinksCardProps) => {
  return (
    <Card className={cn('w-full max-w-sm rounded-2xl', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              onClick={action.onClick}
              aria-label={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-secondary text-secondary-foreground aspect-square focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            >
              <div className="h-6 w-6">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

code.demo.1757903659611.tsx
import {
  ArrowDownLeftFromSquare,
  ArrowUpRightFromSquare,
  ClipboardList,
} from 'lucide-react';

import { QuickLinksCard, ActionItem } from '@/components/ui/card-2';

/**
 * A demo component to showcase the QuickLinksCard.
 */
export default function QuickLinksCardDemo() {
  // Define the actions to be passed to the card component
  const quickLinks: ActionItem[] = [
    {
      icon: <ClipboardList className="h-full w-full" />,
      label: 'Request',
      onClick: () => alert('Request action triggered!'),
    },
    {
      icon: <ArrowUpRightFromSquare className="h-full w-full" />,
      label: 'Send',
      onClick: () => alert('Send action triggered!'),
    },
    {
      icon: <ArrowDownLeftFromSquare className="h-full w-full" />,
      label: 'Receive',
      onClick: () => alert('Receive action triggered!'),
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <QuickLinksCard
        title="Quick Links"
        subtitle="Essential dues"
        actions={quickLinks}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-2.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Interface for each action item in the QuickLinksCard.
 * @property {React.ReactNode} icon - The icon to display for the action.
 * @property {string} label - The text label for the action button.
 * @property {() => void} onClick - The function to call when the button is clicked.
 */
export interface ActionItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * Props for the QuickLinksCard component.
 * @property {string} title - The main title of the card.
 * @property {string} [subtitle] - An optional subtitle or description.
 * @property {ActionItem[]} actions - An array of action items to be displayed as buttons.
 * @property {string} [className] - Optional additional class names for custom styling.
 */
interface QuickLinksCardProps {
  title: string;
  subtitle?: string;
  actions: ActionItem[];
  className?: string;
}

/**
 * A card component for displaying a set of "quick links" or actions.
 * It's designed to be reusable and theme-adaptive using shadcn/ui variables.
 */
export const QuickLinksCard = ({
  title,
  subtitle,
  actions,
  className,
}: QuickLinksCardProps) => {
  return (
    <Card className={cn('w-full max-w-sm rounded-2xl', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              onClick={action.onClick}
              aria-label={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-secondary text-secondary-foreground aspect-square focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            >
              <div className="h-6 w-6">{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
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
