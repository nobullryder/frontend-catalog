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
user-profile-card.tsx
"use client";

import * as React from 'react';
import { User, ArrowUpRight, CheckCircle, Activity, Star } from 'lucide-react';
import { motion, type Transition } from 'framer-motion';

const transition: Transition = { type: 'spring', stiffness: 300, damping: 30 };

const textSwitchTransition: Transition = { duration: 0.22, ease: 'easeInOut' };
const summaryTextVariants = { collapsed: { opacity: 1, y: 0 }, expanded: { opacity: 0, y: -16 } };
const actionTextVariants = { collapsed: { opacity: 0, y: 16 }, expanded: { opacity: 1, y: 0 } };

const stats = [
    { label: 'Profile Completion', value: '90%', Icon: CheckCircle },
    { label: 'Activity Level', value: '75%', Icon: Activity },
    { label: 'Reputation', value: '85%', Icon: Star },
];

export const Component = () => {
    return (
        <motion.div
            className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-3 shadow-md"
            initial="collapsed"
            whileHover="expanded"
        >
            <motion.div
                layout="position"
                transition={transition}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-4 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <img src="https://avatar.vercel.sh/alex.png" alt="Alex" className="size-12 rounded-full" />
                    <div>
                        <h1 className="text-sm font-semibold">Alex Morgan</h1>
                        <p className="text-xs text-neutral-500 font-medium">Product Designer</p>
                    </div>
                </div>

                <motion.div
                    variants={{
                        collapsed: { height: 0, opacity: 0, marginTop: 0 },
                        expanded: { height: 'auto', opacity: 1, marginTop: '16px' }
                    }}
                    transition={{ staggerChildren: 0.1, ...transition }}
                    className="overflow-hidden"
                >
                   {stats.map(({ label, value, Icon }) => (
                       <motion.div
                           key={label}
                           variants={{ collapsed: { opacity: 0, y: 10 }, expanded: { opacity: 1, y: 0 } }}
                           transition={transition}
                           className="mt-2"
                       >
                           <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-1">
                               <div className='flex items-center gap-1.5'><Icon className='size-3.5' /> {label}</div>
                               <span>{value}</span>
                           </div>
                           <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full">
                               <motion.div
                                   className="h-1.5 bg-sky-500 rounded-full"
                                   variants={{ collapsed: { width: 0 }, expanded: { width: value } }}
                                   transition={transition}
                               />
                           </div>
                       </motion.div>
                   ))}
                </motion.div>
            </motion.div>

            <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                    <User className="size-3" />
                </div>
                <span className="grid">
                    <motion.span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 row-start-1 col-start-1" variants={summaryTextVariants}>Team Profile</motion.span>
                    <motion.a href="#" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1 cursor-pointer select-none row-start-1 col-start-1" variants={actionTextVariants}>View Full Profile <ArrowUpRight className="size-4" /></motion.a>
                </span>
            </div>
        </motion.div>
    );
}

code.demo.1757034070026.tsx
import { Component } from "@/components/ui/user-profile-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/user-profile-card.tsx
"use client";

import * as React from 'react';
import { User, ArrowUpRight, CheckCircle, Activity, Star } from 'lucide-react';
import { motion, type Transition } from 'framer-motion';

const transition: Transition = { type: 'spring', stiffness: 300, damping: 30 };

const textSwitchTransition: Transition = { duration: 0.22, ease: 'easeInOut' };
const summaryTextVariants = { collapsed: { opacity: 1, y: 0 }, expanded: { opacity: 0, y: -16 } };
const actionTextVariants = { collapsed: { opacity: 0, y: 16 }, expanded: { opacity: 1, y: 0 } };

const stats = [
    { label: 'Profile Completion', value: '90%', Icon: CheckCircle },
    { label: 'Activity Level', value: '75%', Icon: Activity },
    { label: 'Reputation', value: '85%', Icon: Star },
];

export const Component = () => {
    return (
        <motion.div
            className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-3 shadow-md"
            initial="collapsed"
            whileHover="expanded"
        >
            <motion.div
                layout="position"
                transition={transition}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-4 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <img src="https://avatar.vercel.sh/alex.png" alt="Alex" className="size-12 rounded-full" />
                    <div>
                        <h1 className="text-sm font-semibold">Alex Morgan</h1>
                        <p className="text-xs text-neutral-500 font-medium">Product Designer</p>
                    </div>
                </div>

                <motion.div
                    variants={{
                        collapsed: { height: 0, opacity: 0, marginTop: 0 },
                        expanded: { height: 'auto', opacity: 1, marginTop: '16px' }
                    }}
                    transition={{ staggerChildren: 0.1, ...transition }}
                    className="overflow-hidden"
                >
                   {stats.map(({ label, value, Icon }) => (
                       <motion.div
                           key={label}
                           variants={{ collapsed: { opacity: 0, y: 10 }, expanded: { opacity: 1, y: 0 } }}
                           transition={transition}
                           className="mt-2"
                       >
                           <div className="flex items-center justify-between text-xs font-medium text-neutral-500 mb-1">
                               <div className='flex items-center gap-1.5'><Icon className='size-3.5' /> {label}</div>
                               <span>{value}</span>
                           </div>
                           <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full">
                               <motion.div
                                   className="h-1.5 bg-sky-500 rounded-full"
                                   variants={{ collapsed: { width: 0 }, expanded: { width: value } }}
                                   transition={transition}
                               />
                           </div>
                       </motion.div>
                   ))}
                </motion.div>
            </motion.div>

            <div className="flex items-center gap-2">
                <div className="size-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                    <User className="size-3" />
                </div>
                <span className="grid">
                    <motion.span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 row-start-1 col-start-1" variants={summaryTextVariants}>Team Profile</motion.span>
                    <motion.a href="#" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1 cursor-pointer select-none row-start-1 col-start-1" variants={actionTextVariants}>View Full Profile <ArrowUpRight className="size-4" /></motion.a>
                </span>
            </div>
        </motion.div>
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
