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
notification.tsx
import React from "react";
import { motion } from "framer-motion";

interface NotificationCardProps {
  aiName?: string;
  userName?: string;
  paperTopic?: string;
  doctorName?: string;
  earnings?: string;
  weekTotal?: string;
}

const Component = ({
  aiName = "AI name",
  userName = "User",
  paperTopic = "general topic",
  doctorName = "AI Doctor",
  earnings = "$0.20c",
  weekTotal = "$400",
}: NotificationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      }}
      className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md"
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.3,
          }}
          className="relative mb-4 flex items-center"
        >
          <div className="relative mr-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-800 text-xl font-bold text-white">
              {aiName[0]}
            </div>
          </div>

          <span className="text-lg font-semibold text-muted-foreground">{aiName}</span>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% - 20px)" }}
            transition={{
              delay: 1.0,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="absolute left-[19px] top-0 mt-3 w-1 bg-gray-100"
          />

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{
              delay: 1.0,
              duration: 0.8,
              type: "tween",
            }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.6,
              }}
              className="mb-4 pl-12 text-gray-700 dark:text-gray-300"
            >
              <p className="text-black">
                Hey {userName}, your paper on {paperTopic} was used by{" "}
                <span className="underline" style={{ color: "#006622" }}>
                  {doctorName}
                </span>{" "}
                to give an assessment to a patient today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4,
                duration: 0.6,
              }}
              className="ml-12 rounded-md p-3"
              style={{ backgroundColor: "#EFECE7" }}
            >
              <div className="flex items-start">
                <p className="text-sm" style={{ color: "#4C4843" }}>
                  You've earned {earnings} because a new doctor LLM used your knowledge. This
                  week's total: {weekTotal}.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Component;

code.demo.1750178605634.tsx
// This is a demo of a preview

"use client";
import React from "react";
import Component from "@/components/ui/notification";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component />
    </div>
  );
};

export default DemoOne;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/notification.tsx
import React from "react";
import { motion } from "framer-motion";

interface NotificationCardProps {
  aiName?: string;
  userName?: string;
  paperTopic?: string;
  doctorName?: string;
  earnings?: string;
  weekTotal?: string;
}

const Component = ({
  aiName = "AI name",
  userName = "User",
  paperTopic = "general topic",
  doctorName = "AI Doctor",
  earnings = "$0.20c",
  weekTotal = "$400",
}: NotificationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      }}
      className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md"
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.3,
          }}
          className="relative mb-4 flex items-center"
        >
          <div className="relative mr-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-800 text-xl font-bold text-white">
              {aiName[0]}
            </div>
          </div>

          <span className="text-lg font-semibold text-muted-foreground">{aiName}</span>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% - 20px)" }}
            transition={{
              delay: 1.0,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="absolute left-[19px] top-0 mt-3 w-1 bg-gray-100"
          />

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{
              delay: 1.0,
              duration: 0.8,
              type: "tween",
            }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.6,
              }}
              className="mb-4 pl-12 text-gray-700 dark:text-gray-300"
            >
              <p className="text-black">
                Hey {userName}, your paper on {paperTopic} was used by{" "}
                <span className="underline" style={{ color: "#006622" }}>
                  {doctorName}
                </span>{" "}
                to give an assessment to a patient today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4,
                duration: 0.6,
              }}
              className="ml-12 rounded-md p-3"
              style={{ backgroundColor: "#EFECE7" }}
            >
              <div className="flex items-start">
                <p className="text-sm" style={{ color: "#4C4843" }}>
                  You've earned {earnings} because a new doctor LLM used your knowledge. This
                  week's total: {weekTotal}.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Component;
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
