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
banner.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Variants for the banner container
const bannerVariants = cva(
  "group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg border p-4 text-left transition-all",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PromoBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const PromoBanner = React.forwardRef<HTMLDivElement, PromoBannerProps>(
  ({ className, variant, title, description, icon, href, ...props }, ref) => {
    // Animation variants for Framer Motion
    const cardAnimation = {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      hover: { scale: 1.02, transition: { duration: 0.2 } },
    };

    const content = (
      <motion.div
        ref={ref}
        className={cn(bannerVariants({ variant, className }))}
        variants={cardAnimation}
        initial="initial"
        animate="animate"
        whileHover="hover"
        {...props}
      >
        {/* Text content */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>

        {/* Icon container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {icon}
          </div>
        </div>
      </motion.div>
    );

    // Render as a link if href is provided, otherwise as a div
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

PromoBanner.displayName = "PromoBanner";

export { PromoBanner, bannerVariants };

code.demo.1758014543386.tsx
import { PromoBanner } from "@/components/ui/banner"; // Adjust the import path
import { Crown } from "lucide-react";

export default function PromoBannerDemo() {
  return (
    <div className="flex w-full max-w-md items-center justify-center p-4">
      <PromoBanner
        title="Taxita One"
        description="Join now and get 1 month free"
        href="https://example.com"
        icon={<Crown className="h-5 w-5" />}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/banner.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Variants for the banner container
const bannerVariants = cva(
  "group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg border p-4 text-left transition-all",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PromoBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const PromoBanner = React.forwardRef<HTMLDivElement, PromoBannerProps>(
  ({ className, variant, title, description, icon, href, ...props }, ref) => {
    // Animation variants for Framer Motion
    const cardAnimation = {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      hover: { scale: 1.02, transition: { duration: 0.2 } },
    };

    const content = (
      <motion.div
        ref={ref}
        className={cn(bannerVariants({ variant, className }))}
        variants={cardAnimation}
        initial="initial"
        animate="animate"
        whileHover="hover"
        {...props}
      >
        {/* Text content */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>

        {/* Icon container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {icon}
          </div>
        </div>
      </motion.div>
    );

    // Render as a link if href is provided, otherwise as a div
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

PromoBanner.displayName = "PromoBanner";

export { PromoBanner, bannerVariants };
```

Install NPM dependencies:
```bash
class-variance-authority, framer-motion
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
