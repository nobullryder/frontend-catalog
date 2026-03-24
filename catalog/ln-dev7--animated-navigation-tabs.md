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
animated-navigation-tabs.tsx
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedNavigationTabs({ items }: Props) {
  const [active, setActive] = useState<Props>(items[0]);
  const [isHover, setIsHover] = useState<Props | null>(null);
  return (
     <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="relative">
        <ul className="flex items-center justify-center">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn("py-2 relative duration-300 transition-colors hover:!text-primary",
              active.id === item.id ? "text-primary" : "text-muted-foreground"
              )}

              onClick={() => setActive(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="px-5 py-2 relative">
                {item.tile}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </ul>
      </div>
    </main>
  );
}

type Props = {
  id: number;
  tile: string;
};


code.demo.tsx
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs"

const AnimatedNavigationTabsDemo = () => (
    <div className="bg-background h-40 flex items-center justify-center"><AnimatedNavigationTabs items={ITEMS} /></div>
);

export default { AnimatedNavigationTabsDemo };

const ITEMS = [
  { id: 1, tile: "Overview" },
  { id: 2, tile: "Activity" },
  { id: 3, tile: "Domains" },
  { id: 4, tile: "AI" },
  { id: 5, tile: "Settings" },
];
```

Copy-paste these files for dependencies:
```tsx
/components/ui/animated-navigation-tabs.tsx
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedNavigationTabs({ items }: Props) {
  const [active, setActive] = useState<Props>(items[0]);
  const [isHover, setIsHover] = useState<Props | null>(null);
  return (
     <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="relative">
        <ul className="flex items-center justify-center">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn("py-2 relative duration-300 transition-colors hover:!text-primary",
              active.id === item.id ? "text-primary" : "text-muted-foreground"
              )}

              onClick={() => setActive(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="px-5 py-2 relative">
                {item.tile}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </ul>
      </div>
    </main>
  );
}

type Props = {
  id: number;
  tile: string;
};

```

Install NPM dependencies:
```bash
motion
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
