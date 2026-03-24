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
hybrid-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HybridTabItem {
  value: string;
  icon: React.ElementType;
  label: string;
  content?: React.ReactNode;
}

interface HybridTabsProps {
  items?: HybridTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function HybridTabs({
  items = [
    { value: "home", icon: Home, label: "Home", content: "Welcome Home!" },
    { value: "search", icon: Search, label: "Search", content: "Find what you need." },
    { value: "notifications", icon: Bell, label: "Alerts", content: "You have no new notifications." },
    { value: "profile", icon: User, label: "Profile", content: "Your profile info here." },
    { value: "settings", icon: Settings, label: "Settings", content: "Adjust your preferences." },
  ],
  defaultValue = "home",
  className,
}: HybridTabsProps) {
  const [active, setActive] = React.useState(defaultValue);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[70vh]", className)}>
      <Tabs defaultValue={defaultValue} onValueChange={setActive} className="w-full max-w-lg">
        <TabsList className="flex justify-center gap-2 bg-background/60 backdrop-blur-md p-2 rounded-xl border">
          {items.map((item) => {
            const isActive = active === item.value;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "relative flex items-center gap-2 rounded-full transition-all px-3 py-2",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}


code.demo.1758452912190.tsx
import HybridTabs from "@/components/ui/hybrid-tabs";

export default function DemoOne() {
  return <HybridTabs />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hybrid-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HybridTabItem {
  value: string;
  icon: React.ElementType;
  label: string;
  content?: React.ReactNode;
}

interface HybridTabsProps {
  items?: HybridTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function HybridTabs({
  items = [
    { value: "home", icon: Home, label: "Home", content: "Welcome Home!" },
    { value: "search", icon: Search, label: "Search", content: "Find what you need." },
    { value: "notifications", icon: Bell, label: "Alerts", content: "You have no new notifications." },
    { value: "profile", icon: User, label: "Profile", content: "Your profile info here." },
    { value: "settings", icon: Settings, label: "Settings", content: "Adjust your preferences." },
  ],
  defaultValue = "home",
  className,
}: HybridTabsProps) {
  const [active, setActive] = React.useState(defaultValue);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[70vh]", className)}>
      <Tabs defaultValue={defaultValue} onValueChange={setActive} className="w-full max-w-lg">
        <TabsList className="flex justify-center gap-2 bg-background/60 backdrop-blur-md p-2 rounded-xl border">
          {items.map((item) => {
            const isActive = active === item.value;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "relative flex items-center gap-2 rounded-full transition-all px-3 py-2",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
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
