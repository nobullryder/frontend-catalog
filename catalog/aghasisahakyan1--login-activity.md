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
login-activity.tsx
"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type LoginActivityProps = {
  cardTitle?: string;
  cardDescription?: string;
  data?: number[]; // last 10 bars
};

export const LoginActivity = ({
  cardTitle = "Login activity",
  cardDescription = "Recent successful sign-ins across regions.",
  data = [6, 4, 7, 5, 8, 9, 5, 7, 6, 10],
}: LoginActivityProps) => {
  const max = Math.max(1, ...data);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "relative",
        "flex flex-col justify-between",
        "h-[20rem] w-[350px] max-w-[350px]",
        "rounded-md border bg-neutral-50 p-4 dark:bg-neutral-900",
      )}
    >
      <div>
        <h3 className="text-sm font-semibold text-primary">{cardTitle}</h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          {cardDescription}
        </p>
      </div>

      <div className="mt-4 flex h-40 items-end justify-between gap-2">
        {data.map((value, i) => {
          const height = (value / max) * 100;
          return (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0.6 }}
              animate={{
                height: `${height}%`,
                opacity: 1,
                scale: hovered ? 1.05 : 1,
                boxShadow: hovered
                  ? "0 8px 24px rgba(34, 211, 238, 0.25)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="w-6 rounded-sm bg-gradient-to-b from-primary/80 to-primary/60"
            />
          );
        })}
      </div>

      <motion.div
        className="mt-3 text-[10px] text-neutral-500"
        animate={{ opacity: hovered ? 1 : 0.8 }}
      >
        last 24h
      </motion.div>
    </motion.div>
  );
};

export default LoginActivity;




code.demo.1757030250417.tsx
import { LoginActivity } from "@/components/ui/login-activity";

export default function DemoOne() {
  return <LoginActivity />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/login-activity.tsx
"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type LoginActivityProps = {
  cardTitle?: string;
  cardDescription?: string;
  data?: number[]; // last 10 bars
};

export const LoginActivity = ({
  cardTitle = "Login activity",
  cardDescription = "Recent successful sign-ins across regions.",
  data = [6, 4, 7, 5, 8, 9, 5, 7, 6, 10],
}: LoginActivityProps) => {
  const max = Math.max(1, ...data);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "relative",
        "flex flex-col justify-between",
        "h-[20rem] w-[350px] max-w-[350px]",
        "rounded-md border bg-neutral-50 p-4 dark:bg-neutral-900",
      )}
    >
      <div>
        <h3 className="text-sm font-semibold text-primary">{cardTitle}</h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          {cardDescription}
        </p>
      </div>

      <div className="mt-4 flex h-40 items-end justify-between gap-2">
        {data.map((value, i) => {
          const height = (value / max) * 100;
          return (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0.6 }}
              animate={{
                height: `${height}%`,
                opacity: 1,
                scale: hovered ? 1.05 : 1,
                boxShadow: hovered
                  ? "0 8px 24px rgba(34, 211, 238, 0.25)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="w-6 rounded-sm bg-gradient-to-b from-primary/80 to-primary/60"
            />
          );
        })}
      </div>

      <motion.div
        className="mt-3 text-[10px] text-neutral-500"
        animate={{ opacity: hovered ? 1 : 0.8 }}
      >
        last 24h
      </motion.div>
    </motion.div>
  );
};

export default LoginActivity;



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
