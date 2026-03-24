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
switch-button.tsx
import { motion } from "motion/react";
import { ReactNode } from "react";

type SwitchProps = {
  value: boolean;
  onToggle: () => void;
  iconOn: ReactNode;
  iconOff: ReactNode;
  className?: string;
};

export function Switch({
  value,
  onToggle,
  iconOn,
  iconOff,
  className = "",
}: SwitchProps) {
  return (
    <button
      className={`bg-card-foreground/15 flex w-12 cursor-pointer rounded-full p-0.5 ${
        value ? "justify-end" : "justify-start"
      } ${className}`}
      onClick={onToggle}
    >
      <motion.div
        className="flex justify-center items-center size-6 rounded-full bg-background"
        layout
        transition={{
          type: "spring",
          duration: 0.6,
          bounce: 0.2,
        }}
      >
        {value ? (
          <motion.div
            key="on"
            initial={{ opacity: 0, rotate: -60 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 60 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center size-5"
          >
            {iconOn}
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ opacity: 0, rotate: 60 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -60 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center size-5"
          >
            {iconOff}
          </motion.div>
        )}
      </motion.div>
    </button>
  );
}


code.demo.1756883788767.tsx
"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch-button";

export default function DemoSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background">
      <h1 className="text-xl font-semibold">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </h1>
      <Switch
        value={darkMode}
        onToggle={() => setDarkMode((prev) => !prev)}
        iconOn={<Moon className="size-4" />}
        iconOff={<Sun className="size-4" />}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch-button.tsx
import { motion } from "motion/react";
import { ReactNode } from "react";

type SwitchProps = {
  value: boolean;
  onToggle: () => void;
  iconOn: ReactNode;
  iconOff: ReactNode;
  className?: string;
};

export function Switch({
  value,
  onToggle,
  iconOn,
  iconOff,
  className = "",
}: SwitchProps) {
  return (
    <button
      className={`bg-card-foreground/15 flex w-12 cursor-pointer rounded-full p-0.5 ${
        value ? "justify-end" : "justify-start"
      } ${className}`}
      onClick={onToggle}
    >
      <motion.div
        className="flex justify-center items-center size-6 rounded-full bg-background"
        layout
        transition={{
          type: "spring",
          duration: 0.6,
          bounce: 0.2,
        }}
      >
        {value ? (
          <motion.div
            key="on"
            initial={{ opacity: 0, rotate: -60 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 60 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center size-5"
          >
            {iconOn}
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ opacity: 0, rotate: 60 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -60 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center size-5"
          >
            {iconOff}
          </motion.div>
        )}
      </motion.div>
    </button>
  );
}

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
