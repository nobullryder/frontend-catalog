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
process-pillars.tsx
"use client";

import { motion } from "framer-motion";

export const ProcessPillars = () => {
  const pillars = [
    { label: "Step 1", height: "h-12", delay: 0 },
    { label: "Step 2", height: "h-24", delay: 0.2 },
    { label: "Step 3", height: "h-48", delay: 0.4 },
    { label: "Step 4", height: "h-96", delay: 0.6 },
    { label: "Step 5", height: "h-full", delay: 0.8 },
  ];

  return (
    <div className="flex items-end gap-2 pointer-events-none">
      {pillars.map((pillar, index) => (
        <div
          key={pillar.label}
          className="flex flex-col border border-gray-950/[.1] dark:border-gray-50/[.1] rounded-md h-30 w-20"
        >
          {index < 4 && (
            <div className="h-full rounded-md"></div>
          )}
          <motion.div
            className={`bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 ${
              index < 4 ? "rounded-b-md" : "rounded-md h-full"
            } ${pillar.height}`}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: pillar.delay,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            <motion.p
              className={`text-center text-sm text-white font-medium ${
                index === 0
                  ? "pt-2"
                  : index === 1
                  ? "pt-4"
                  : index === 2
                  ? "pt-6"
                  : index === 3
                  ? "pt-8"
                  : "pt-10"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: pillar.delay + 0.4,
              }}
            >
              {pillar.label}
            </motion.p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};


code.demo.1750694659965.tsx


import { ProcessPillars } from "@/components/ui/process-pillars";

export default function DemoOne() {
  return <ProcessPillars />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/process-pillars.tsx
"use client";

import { motion } from "framer-motion";

export const ProcessPillars = () => {
  const pillars = [
    { label: "Step 1", height: "h-12", delay: 0 },
    { label: "Step 2", height: "h-24", delay: 0.2 },
    { label: "Step 3", height: "h-48", delay: 0.4 },
    { label: "Step 4", height: "h-96", delay: 0.6 },
    { label: "Step 5", height: "h-full", delay: 0.8 },
  ];

  return (
    <div className="flex items-end gap-2 pointer-events-none">
      {pillars.map((pillar, index) => (
        <div
          key={pillar.label}
          className="flex flex-col border border-gray-950/[.1] dark:border-gray-50/[.1] rounded-md h-30 w-20"
        >
          {index < 4 && (
            <div className="h-full rounded-md"></div>
          )}
          <motion.div
            className={`bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 ${
              index < 4 ? "rounded-b-md" : "rounded-md h-full"
            } ${pillar.height}`}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: pillar.delay,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            <motion.p
              className={`text-center text-sm text-white font-medium ${
                index === 0
                  ? "pt-2"
                  : index === 1
                  ? "pt-4"
                  : index === 2
                  ? "pt-6"
                  : index === 3
                  ? "pt-8"
                  : "pt-10"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: pillar.delay + 0.4,
              }}
            >
              {pillar.label}
            </motion.p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

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
