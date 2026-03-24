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
card-24.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assumes shadcn `cn` utility

/**
 * Props for the StatusCard component.
 */
interface StatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An optional icon component to display at the top of the card.
   */
  icon?: React.ReactNode;
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * The descriptive text below the title.
   */
  description: string;
  /**
   * The URL for the illustration image in the bottom-right corner.
   */
  illustration: string;
  /**
   * The alt text for the illustration image, for accessibility.
   */
  illustrationAlt?: string;
  /**
   * Optional children to render additional content, like buttons or links.
   */
  children?: React.ReactNode;
}

const StatusCard = React.forwardRef<HTMLDivElement, StatusCardProps>(
  ({ className, icon, title, description, illustration, illustrationAlt = "Decorative illustration", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border bg-card p-8 text-card-foreground shadow-sm",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        {...props}
      >
        <div className="flex flex-col h-full">
          {/* Icon */}
          {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
          
          {/* Main Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          {/* Optional Children */}
          {children && <div className="mt-6">{children}</div>}
        </div>

        {/* Illustration */}
        <div className="pointer-events-none absolute -bottom-2 -right-2 w-40 h-32 -z-0">
          <img
            src={illustration}
            alt={illustrationAlt}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    );
  }
);

StatusCard.displayName = "StatusCard";

export { StatusCard };

code.demo.1758175367265.tsx
import { StatusCard } from "@/components/ui/card-24"; // Adjust import path
import { Button } from "@/components/ui/button"; // Example: using shadcn button
import { PackageCheck } from "lucide-react"; // Restored for the icon

// The demo component that showcases the StatusCard
export default function StatusCardDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <StatusCard
        icon={<PackageCheck className="h-6 w-6" />}
        title="On its way"
        description="Your order has been dispatched and is now with the courier."
        illustration="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-uBD2X8E9FMFPGgAZv0YYRXCMZbaJTt.png&w=320&q=75"
        illustrationAlt="An illustration of a person on a bicycle with a delivery package."
      >
        <Button variant="outline" size="sm">
          Track Package
        </Button>
      </StatusCard>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-24.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assumes shadcn `cn` utility

/**
 * Props for the StatusCard component.
 */
interface StatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An optional icon component to display at the top of the card.
   */
  icon?: React.ReactNode;
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * The descriptive text below the title.
   */
  description: string;
  /**
   * The URL for the illustration image in the bottom-right corner.
   */
  illustration: string;
  /**
   * The alt text for the illustration image, for accessibility.
   */
  illustrationAlt?: string;
  /**
   * Optional children to render additional content, like buttons or links.
   */
  children?: React.ReactNode;
}

const StatusCard = React.forwardRef<HTMLDivElement, StatusCardProps>(
  ({ className, icon, title, description, illustration, illustrationAlt = "Decorative illustration", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border bg-card p-8 text-card-foreground shadow-sm",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        {...props}
      >
        <div className="flex flex-col h-full">
          {/* Icon */}
          {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
          
          {/* Main Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>

          {/* Optional Children */}
          {children && <div className="mt-6">{children}</div>}
        </div>

        {/* Illustration */}
        <div className="pointer-events-none absolute -bottom-2 -right-2 w-40 h-32 -z-0">
          <img
            src={illustration}
            alt={illustrationAlt}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    );
  }
);

StatusCard.displayName = "StatusCard";

export { StatusCard };
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
