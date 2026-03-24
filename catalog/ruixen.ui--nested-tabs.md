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
nested-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NestedSubTab {
  value: string;
  label: string;
  content?: React.ReactNode;
}

export interface NestedTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
  subTabs?: NestedSubTab[];
}

interface NestedTabsProps {
  items?: NestedTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function NestedTabs({
  items = [
    {
      value: "dashboard",
      label: "Dashboard",
      content: "Main Dashboard Overview",
      subTabs: [
        { value: "dash-stats", label: "Stats", content: "Detailed stats here." },
        { value: "dash-reports", label: "Reports", content: "Reports content here." },
      ],
    },
    {
      value: "settings",
      label: "Settings",
      content: "General settings content",
      subTabs: [
        { value: "profile", label: "Profile", content: "Profile settings here." },
        { value: "account", label: "Account", content: "Account settings here." },
        { value: "security", label: "Security", content: "Security settings here." },
      ],
    },
    {
      value: "docs",
      label: "Documentation",
      content: "Developer documentation content",
      subTabs: [
        { value: "api", label: "API", content: "API reference here." },
        { value: "guides", label: "Guides", content: "Guides and tutorials here." },
      ],
    },
  ],
  defaultValue = "dashboard",
  className,
}: NestedTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [activeSub, setActiveSub] = React.useState<string | null>(null);

  const currentMain = items.find((i) => i.value === active);

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <Tabs value={active} onValueChange={setActive} className="w-full max-w-2xl">
        {/* Main Tabs */}
        <TabsList className="flex gap-2 bg-background/30">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                active === item.value
                  ? "text-white shadow-xl bg-primary/10"
                  : "bg-background/50 text-foreground/40 hover:text-foreground"
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sub Tabs (expandable) */}
        <AnimatePresence>
          {currentMain?.subTabs && (
            <motion.div
              key={currentMain.value}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2"
            >
              <Tabs
                value={activeSub || currentMain.subTabs[0].value}
                onValueChange={setActiveSub}
              >
                <TabsList className="flex gap-2 bg-background/20">
                  {currentMain.subTabs.map((sub) => (
                    <TabsTrigger
                      key={sub.value}
                      value={sub.value}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        activeSub === sub.value
                          ? "bg-primary text-white"
                          : "bg-background/40 text-foreground/40 hover:text-foreground"
                      )}
                    >
                      {sub.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Sub Tab Content */}
                <div className="mt-3 p-4 rounded-lg bg-card">
                  {currentMain.subTabs.map((sub) => (
                    <TabsContent key={sub.value} value={sub.value}>
                      {sub.content}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tab Content (without subTabs) */}
        {!currentMain?.subTabs && (
          <div className="mt-4 p-4 rounded-lg bg-card">{currentMain?.content}</div>
        )}
      </Tabs>
    </div>
  );
}


code.demo.1758470511205.tsx
import NestedTabs, { NestedTabItem } from "@/components/ui/nested-tabs";

const demoItems: NestedTabItem[] = [
  {
    value: "dashboard",
    label: "Dashboard",
    content: "Main Dashboard Overview",
    subTabs: [
      { value: "dash-stats", label: "Stats", content: "Detailed statistics and metrics." },
      { value: "dash-reports", label: "Reports", content: "Reports and exports section." },
    ],
  },
  {
    value: "settings",
    label: "Settings",
    content: "General settings content",
    subTabs: [
      { value: "profile", label: "Profile", content: " Manage your profile details." },
      { value: "account", label: "Account", content: "Account-related preferences." },
      { value: "security", label: "Security", content: "Security and password settings." },
    ],
  },
  {
    value: "docs",
    label: "Documentation",
    content: "Developer documentation content",
    subTabs: [
      { value: "api", label: "API", content: "API reference with endpoints." },
      { value: "guides", label: "Guides", content: "Step-by-step guides and tutorials." },
    ],
  },
];

export default function DemoOne() {
  return <NestedTabs items={demoItems} defaultValue="dashboard" />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/nested-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NestedSubTab {
  value: string;
  label: string;
  content?: React.ReactNode;
}

export interface NestedTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
  subTabs?: NestedSubTab[];
}

interface NestedTabsProps {
  items?: NestedTabItem[];
  defaultValue?: string;
  className?: string;
}

export default function NestedTabs({
  items = [
    {
      value: "dashboard",
      label: "Dashboard",
      content: "Main Dashboard Overview",
      subTabs: [
        { value: "dash-stats", label: "Stats", content: "Detailed stats here." },
        { value: "dash-reports", label: "Reports", content: "Reports content here." },
      ],
    },
    {
      value: "settings",
      label: "Settings",
      content: "General settings content",
      subTabs: [
        { value: "profile", label: "Profile", content: "Profile settings here." },
        { value: "account", label: "Account", content: "Account settings here." },
        { value: "security", label: "Security", content: "Security settings here." },
      ],
    },
    {
      value: "docs",
      label: "Documentation",
      content: "Developer documentation content",
      subTabs: [
        { value: "api", label: "API", content: "API reference here." },
        { value: "guides", label: "Guides", content: "Guides and tutorials here." },
      ],
    },
  ],
  defaultValue = "dashboard",
  className,
}: NestedTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [activeSub, setActiveSub] = React.useState<string | null>(null);

  const currentMain = items.find((i) => i.value === active);

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <Tabs value={active} onValueChange={setActive} className="w-full max-w-2xl">
        {/* Main Tabs */}
        <TabsList className="flex gap-2 bg-background/30">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                active === item.value
                  ? "text-white shadow-xl bg-primary/10"
                  : "bg-background/50 text-foreground/40 hover:text-foreground"
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sub Tabs (expandable) */}
        <AnimatePresence>
          {currentMain?.subTabs && (
            <motion.div
              key={currentMain.value}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2"
            >
              <Tabs
                value={activeSub || currentMain.subTabs[0].value}
                onValueChange={setActiveSub}
              >
                <TabsList className="flex gap-2 bg-background/20">
                  {currentMain.subTabs.map((sub) => (
                    <TabsTrigger
                      key={sub.value}
                      value={sub.value}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        activeSub === sub.value
                          ? "bg-primary text-white"
                          : "bg-background/40 text-foreground/40 hover:text-foreground"
                      )}
                    >
                      {sub.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Sub Tab Content */}
                <div className="mt-3 p-4 rounded-lg bg-card">
                  {currentMain.subTabs.map((sub) => (
                    <TabsContent key={sub.value} value={sub.value}>
                      {sub.content}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tab Content (without subTabs) */}
        {!currentMain?.subTabs && (
          <div className="mt-4 p-4 rounded-lg bg-card">{currentMain?.content}</div>
        )}
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
