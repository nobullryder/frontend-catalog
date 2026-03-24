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
zoom-depth-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DepthTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface ZoomDepthTabsProps {
  items?: DepthTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function ZoomDepthTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview with rich info and stats." },
    { value: "activity", label: "Activity", content: "Activity with graphs and timelines." },
    { value: "settings", label: "Settings", content: "Settings with controls and toggles." },
    { value: "faq", label: "FAQ", content: "Common questions and helpful answers." },
  ],
  defaultValue,
  className,
}: ZoomDepthTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[60vh]", className)}>
      <Tabs value={active} onValueChange={setActive} className="w-full max-w-3xl">
        {/* Tab List */}
        <TabsList className="flex gap-4 p-2 overflow-x-auto rounded-xl bg-background/30 scrollbar-none">
          {items.map((item) => {
            const isActive = item.value === active;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="px-6 py-3 rounded-xl text-sm font-medium shadow-md relative"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.1 : 0.95,
                    rotateX: isActive ? 0 : -5,
                    rotateY: isActive ? 0 : 5,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "block",
                    isActive ? "text-white bg-primary px-6 py-2 rounded-lg" : "text-foreground/70"
                  )}
                >
                  {item.label}
                </motion.span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-6 w-full max-w-3xl relative">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{
                  opacity: active === item.value ? 1 : 0,
                  y: active === item.value ? 0 : 10,
                  scale: 1,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="p-6 bg-card rounded-xl shadow-lg"
              >
                {item.content}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}


code.demo.1758469560869.tsx
import ZoomDepthTabs from "@/components/ui/zoom-depth-tabs";

export default function DemoOne() {
  return (
    <ZoomDepthTabs
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">
                Here you can see a summary of your analytics, quick stats, and recent activity.
              </p>
            </div>
          ),
        },
        {
          value: "reports",
          label: "Reports",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Reports Section</h2>
              <p className="text-muted-foreground">
                Generate detailed reports and export them as PDF, CSV, or Excel.
              </p>
            </div>
          ),
        },
        {
          value: "settings",
          label: "Settings",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">User Settings</h2>
              <p className="text-muted-foreground">
                Manage account preferences, notification settings, and integrations.
              </p>
            </div>
          ),
        },
        {
          value: "help",
          label: "Help",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Help & Support</h2>
              <p className="text-muted-foreground">
                Find FAQs, tutorials, or reach out to our support team.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/zoom-depth-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DepthTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface ZoomDepthTabsProps {
  items?: DepthTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function ZoomDepthTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview with rich info and stats." },
    { value: "activity", label: "Activity", content: "Activity with graphs and timelines." },
    { value: "settings", label: "Settings", content: "Settings with controls and toggles." },
    { value: "faq", label: "FAQ", content: "Common questions and helpful answers." },
  ],
  defaultValue,
  className,
}: ZoomDepthTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[60vh]", className)}>
      <Tabs value={active} onValueChange={setActive} className="w-full max-w-3xl">
        {/* Tab List */}
        <TabsList className="flex gap-4 p-2 overflow-x-auto rounded-xl bg-background/30 scrollbar-none">
          {items.map((item) => {
            const isActive = item.value === active;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="px-6 py-3 rounded-xl text-sm font-medium shadow-md relative"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.1 : 0.95,
                    rotateX: isActive ? 0 : -5,
                    rotateY: isActive ? 0 : 5,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "block",
                    isActive ? "text-white bg-primary px-6 py-2 rounded-lg" : "text-foreground/70"
                  )}
                >
                  {item.label}
                </motion.span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-6 w-full max-w-3xl relative">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{
                  opacity: active === item.value ? 1 : 0,
                  y: active === item.value ? 0 : 10,
                  scale: 1,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="p-6 bg-card rounded-xl shadow-lg"
              >
                {item.content}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

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
