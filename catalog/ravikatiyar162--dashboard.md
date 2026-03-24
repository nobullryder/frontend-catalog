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
dashboard.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types remain the same for a consistent API
interface StorageCategory {
  name: string;
  size: number;
  color: string;
}

interface ApplicationItem {
  name: string;
  size: number;
  icon: React.ReactNode;
}

export interface StorageCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  seeAllHref?: string;
  totalStorage: number;
  categories: StorageCategory[];
  applications: ApplicationItem[];
  alertMessage?: React.ReactNode;
}

const StorageCard = React.forwardRef<
  HTMLDivElement,
  StorageCardProps
>(({ 
  className,
  title,
  seeAllHref = "#",
  totalStorage,
  categories,
  applications,
  alertMessage,
  ...props 
}, ref) => {
  const usedStorage = React.useMemo(
    () => categories.reduce((acc, category) => acc + category.size, 0),
    [categories]
  );

  return (
    <Card className={cn("w-full max-w-md", className)} ref={ref} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <a
            href={seeAllHref}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            See All
          </a>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <div 
            className="relative flex h-3 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={usedStorage}
            aria-valuemin={0}
            aria-valuemax={totalStorage}
            aria-label="Storage usage breakdown"
          >
            {categories.map((category, index) => {
              const percentage = (category.size / totalStorage) * 100;
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "h-full", 
                    category.color,
                    index < categories.length - 1 && "border-r-2 border-card"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  style={{ flexShrink: 0 }}
                />
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", category.color)} />
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground sm:mt-0">
              {usedStorage} GB of {totalStorage} GB Used
            </p>
          </div>
        </div>
        
        {alertMessage && (
          <div className="rounded-lg border border-yellow-200/60 bg-yellow-50/50 p-4 text-sm text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-950/50 dark:text-yellow-200">
            “{alertMessage}”
          </div>
        )}

        {/* --- FIX STARTS HERE --- */}
        {/* The entire application list is now wrapped to control padding and borders */}
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Application</h3>
          {/* This new container adds the outer border and controls the inset look */}
          <div className="mt-2 overflow-hidden rounded-lg border">
            {applications.map((app, index) => (
              <a
                key={index}
                href="#"
                className={cn(
                  "flex items-center justify-between p-4 transition-colors hover:bg-muted/50",
                  // The border is now correctly constrained within the padded container
                  index < applications.length - 1 && "border-b"
                )}
              >
                <div className="flex items-center gap-4">
                  {app.icon}
                  <span className="font-medium">{app.name}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{app.size} GB</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* --- FIX ENDS HERE --- */}

      </CardContent>
    </Card>
  );
});
StorageCard.displayName = "StorageCard";

export { StorageCard };

code.demo.1757852319904.tsx
import { StorageCard, StorageCardProps } from "@/components/ui/dashboard";

// Helper components for icons now include their own distinct backgrounds
const FigmaIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black p-1.5">

    <svg width="30" height="30" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#figma__clip0_912_3)"><path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"/><path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"/><path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"/><path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"/><path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"/></g><defs><clipPath id="figma__clip0_912_3"><rect width="53.3333" height="80" fill="white"/></clipPath></defs></svg>
  </div>
);

const TelegramIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2AABEE]">
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="256" height="256" preserveAspectRatio="xMidYMid"><defs><linearGradient id="telegram__a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2AABEE"/><stop offset="100%" stop-color="#229ED9"/></linearGradient></defs><path fill="url(#telegram__a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"/><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"/></svg>
  </div>
);

const SlackIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg p-1.5 bg-[#541554]">
    <svg enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
  </div>
);

export default function StorageCardDemo() {
  const demoData: Omit<StorageCardProps, 'className' | 'title'> = {
    totalStorage: 128,
    categories: [
      { name: "Applications", size: 60, color: "bg-[#8B5CF6]" },
      { name: "Photos", size: 30, color: "bg-[#C4B5FD]" },
      { name: "Mail", size: 20, color: "bg-[#67E8F9]" },
      { name: "Cloud", size: 10, color: "bg-muted" },
    ],
    applications: [
      { name: "Figma Apps", size: 54, icon: <FigmaIcon /> },
      { name: "Telegram", size: 28, icon: <TelegramIcon /> },
      { name: "Slack", size: 3, icon: <SlackIcon /> },
    ],
    alertMessage: (
      <>
        Your cloud storage almost full. To continue saving your photos, videos, and
        important files without interruptions, consider upgrading to the{" "}
        <strong className="font-semibold text-current">Pro Plan.</strong>
      </>
    )
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/20 p-4">
      <StorageCard title="Storage" {...demoData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dashboard.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types remain the same for a consistent API
interface StorageCategory {
  name: string;
  size: number;
  color: string;
}

interface ApplicationItem {
  name: string;
  size: number;
  icon: React.ReactNode;
}

export interface StorageCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  seeAllHref?: string;
  totalStorage: number;
  categories: StorageCategory[];
  applications: ApplicationItem[];
  alertMessage?: React.ReactNode;
}

const StorageCard = React.forwardRef<
  HTMLDivElement,
  StorageCardProps
>(({ 
  className,
  title,
  seeAllHref = "#",
  totalStorage,
  categories,
  applications,
  alertMessage,
  ...props 
}, ref) => {
  const usedStorage = React.useMemo(
    () => categories.reduce((acc, category) => acc + category.size, 0),
    [categories]
  );

  return (
    <Card className={cn("w-full max-w-md", className)} ref={ref} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <a
            href={seeAllHref}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            See All
          </a>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <div 
            className="relative flex h-3 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={usedStorage}
            aria-valuemin={0}
            aria-valuemax={totalStorage}
            aria-label="Storage usage breakdown"
          >
            {categories.map((category, index) => {
              const percentage = (category.size / totalStorage) * 100;
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "h-full", 
                    category.color,
                    index < categories.length - 1 && "border-r-2 border-card"
                  )}
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  style={{ flexShrink: 0 }}
                />
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", category.color)} />
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground sm:mt-0">
              {usedStorage} GB of {totalStorage} GB Used
            </p>
          </div>
        </div>
        
        {alertMessage && (
          <div className="rounded-lg border border-yellow-200/60 bg-yellow-50/50 p-4 text-sm text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-950/50 dark:text-yellow-200">
            “{alertMessage}”
          </div>
        )}

        {/* --- FIX STARTS HERE --- */}
        {/* The entire application list is now wrapped to control padding and borders */}
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Application</h3>
          {/* This new container adds the outer border and controls the inset look */}
          <div className="mt-2 overflow-hidden rounded-lg border">
            {applications.map((app, index) => (
              <a
                key={index}
                href="#"
                className={cn(
                  "flex items-center justify-between p-4 transition-colors hover:bg-muted/50",
                  // The border is now correctly constrained within the padded container
                  index < applications.length - 1 && "border-b"
                )}
              >
                <div className="flex items-center gap-4">
                  {app.icon}
                  <span className="font-medium">{app.name}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{app.size} GB</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* --- FIX ENDS HERE --- */}

      </CardContent>
    </Card>
  );
});
StorageCard.displayName = "StorageCard";

export { StorageCard };
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
