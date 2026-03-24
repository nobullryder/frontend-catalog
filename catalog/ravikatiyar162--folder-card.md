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
folder-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"; // Your path to shadcn's cn utility

// Defines the variants for the card's color scheme
const folderCardVariants = cva(
  "relative overflow-hidden flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200/50 dark:border-purple-800/50",
        project: "bg-gradient-to-br from-fuchsia-50/50 to-fuchsia-100/50 dark:from-fuchsia-950/50 dark:to-fuchsia-900/50 border-fuchsia-200/50 dark:border-fuchsia-800/50",
        system: "bg-gradient-to-br from-cyan-50/50 to-cyan-100/50 dark:from-cyan-950/50 dark:to-cyan-900/50 border-cyan-200/50 dark:border-cyan-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Defines the props for the FolderCard component
export interface FolderCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof folderCardVariants> {
  /** The icon to be displayed in the card. */
  icon: React.ReactNode;
  /** The title or name of the folder. */
  title: string;
  /** The size of the folder, e.g., "25 MB". */
  size: string;
}

const FolderCard = React.forwardRef<HTMLDivElement, FolderCardProps>(
  ({ className, variant, icon, title, size, ...props }, ref) => {
    
    // Animation properties for framer-motion
    const cardAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      whileHover: { scale: 1.03, y: -4, transition: { duration: 0.2 } },
    };

    return (
      <motion.div
        className={cn(folderCardVariants({ variant }), className)}
        ref={ref}
        {...cardAnimation}
        {...props}
      >
        {/* Icon container */}
        <div className="mb-6">
          {icon}
        </div>
        
        {/* Text content container */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-card-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {size}
          </p>
        </div>
      </motion.div>
    );
  }
);
FolderCard.displayName = "FolderCard";

export { FolderCard };

code.demo.1758014110485.tsx
import { Folder, FolderKanban, FolderClock } from "lucide-react";
import { FolderCard } from "@/components/ui/folder-card"; // Adjust the import path

const folders = [
  {
    title: "Documents & Reports",
    size: "25 MB",
    icon: <Folder className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    variant: "default",
  },
  {
    title: "Project Files",
    size: "10 MB",
    icon: <FolderKanban className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />,
    variant: "project",
  },
  {
    title: "System Backups",
    size: "64 MB",
    icon: <FolderClock className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />,
    variant: "system",
  },
];

export default function FolderCardDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-background">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Folder
        </h2>
        <a 
          href="#" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          See All
        </a>
      </div>

      {/* Responsive grid for the cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder, index) => (
          <FolderCard
            key={index}
            title={folder.title}
            size={folder.size}
            icon={folder.icon}
            variant={folder.variant as "default" | "project" | "system"}
            // Stagger animation for each card
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/folder-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"; // Your path to shadcn's cn utility

// Defines the variants for the card's color scheme
const folderCardVariants = cva(
  "relative overflow-hidden flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200/50 dark:border-purple-800/50",
        project: "bg-gradient-to-br from-fuchsia-50/50 to-fuchsia-100/50 dark:from-fuchsia-950/50 dark:to-fuchsia-900/50 border-fuchsia-200/50 dark:border-fuchsia-800/50",
        system: "bg-gradient-to-br from-cyan-50/50 to-cyan-100/50 dark:from-cyan-950/50 dark:to-cyan-900/50 border-cyan-200/50 dark:border-cyan-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Defines the props for the FolderCard component
export interface FolderCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof folderCardVariants> {
  /** The icon to be displayed in the card. */
  icon: React.ReactNode;
  /** The title or name of the folder. */
  title: string;
  /** The size of the folder, e.g., "25 MB". */
  size: string;
}

const FolderCard = React.forwardRef<HTMLDivElement, FolderCardProps>(
  ({ className, variant, icon, title, size, ...props }, ref) => {
    
    // Animation properties for framer-motion
    const cardAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      whileHover: { scale: 1.03, y: -4, transition: { duration: 0.2 } },
    };

    return (
      <motion.div
        className={cn(folderCardVariants({ variant }), className)}
        ref={ref}
        {...cardAnimation}
        {...props}
      >
        {/* Icon container */}
        <div className="mb-6">
          {icon}
        </div>
        
        {/* Text content container */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-card-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {size}
          </p>
        </div>
      </motion.div>
    );
  }
);
FolderCard.displayName = "FolderCard";

export { FolderCard };
```

Install NPM dependencies:
```bash
framer-motion, class-variance-authority
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
