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
post-scheduler.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronDown, X } from "lucide-react";

export interface PostSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostScheduler = React.forwardRef<HTMLDivElement, PostSchedulerProps>(
  ({ className, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        <div
          className="relative z-10 w-80 border border-slate-200 bg-white text-slate-900 dark:border-slate-200 dark:bg-white dark:text-slate-900"
          style={{ borderRadius: 25 }}
        >
          <div className="p-2">
            <textarea
              placeholder="What's happening?"
              className="w-full resize-none bg-white p-2 outline-none placeholder:text-slate-400 dark:bg-white dark:placeholder:text-slate-400"
            />
          </div>
          <div className="relative pt-10">
            <AnimatePresence>
              {open && (
                <motion.div
                  className="absolute top-0 size-full px-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                >
                  <div className="relative flex h-10 items-center justify-between overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-200 dark:bg-slate-100">
                    <div className="flex w-[90%] items-center justify-between rounded-full bg-white dark:bg-white">
                      <div className="flex h-10 w-full items-center justify-between border-r border-slate-200 p-2 dark:border-slate-200">
                        <span className="text-sm">01, Jan 2025</span>
                        <ChevronDown size={20} />
                      </div>
                      <div className="flex h-10 w-full items-center justify-between p-2">
                        <span className="text-sm">12:00 AM</span>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                    <button
                      className="flex h-10 w-10 items-center justify-center"
                      onClick={() => setOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative flex items-center justify-end gap-2 p-2">
              <motion.button
                className="flex size-10 items-center justify-center border border-slate-200 bg-slate-100 transition-opacity duration-300 dark:border-slate-200 dark:bg-slate-100"
                style={{
                  borderRadius: 25,
                  opacity: open ? 0 : 1,
                }}
                onClick={() => setOpen(true)}
              >
                <CalendarDays />
              </motion.button>
              <motion.button
                className="bg-zinc-900 py-2 px-8 text-white dark:bg-zinc-900"
                layoutId="schedule"
                style={{ borderRadius: 25 }}
              >
                Post
              </motion.button>
              <AnimatePresence>
                {open && (
                  <div className="absolute inset-0 flex size-full items-center justify-center p-2">
                    <motion.button
                      layoutId="schedule"
                      className="h-10 w-full bg-zinc-900 py-2 px-8 text-white dark:bg-zinc-900"
                      style={{ borderRadius: 25 }}
                    >
                      Schedule
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -62 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -62 }}
              className="absolute -bottom-10 flex w-full items-center justify-center rounded-b-[25px] border border-slate-200 bg-slate-100 p-3 pt-8 dark:border-slate-200 dark:bg-slate-100"
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                Will be posted on 01 Jan 2025 at 12:00 AM
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

PostScheduler.displayName = "PostScheduler";

export default PostScheduler;

code.demo.1749420988373.tsx
// demo.tsx
import * as React from "react";
import PostScheduler from "@/components/ui/post-scheduler";

const PostSchedulerDemo = () => {
  return (
    <div className="flex h-[450px] w-full items-start justify-center bg-background p-10 pt-20">
      <PostScheduler />
    </div>
  );
};

export { PostSchedulerDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/post-scheduler.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronDown, X } from "lucide-react";

export interface PostSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PostScheduler = React.forwardRef<HTMLDivElement, PostSchedulerProps>(
  ({ className, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        <div
          className="relative z-10 w-80 border border-slate-200 bg-white text-slate-900 dark:border-slate-200 dark:bg-white dark:text-slate-900"
          style={{ borderRadius: 25 }}
        >
          <div className="p-2">
            <textarea
              placeholder="What's happening?"
              className="w-full resize-none bg-white p-2 outline-none placeholder:text-slate-400 dark:bg-white dark:placeholder:text-slate-400"
            />
          </div>
          <div className="relative pt-10">
            <AnimatePresence>
              {open && (
                <motion.div
                  className="absolute top-0 size-full px-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                >
                  <div className="relative flex h-10 items-center justify-between overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-200 dark:bg-slate-100">
                    <div className="flex w-[90%] items-center justify-between rounded-full bg-white dark:bg-white">
                      <div className="flex h-10 w-full items-center justify-between border-r border-slate-200 p-2 dark:border-slate-200">
                        <span className="text-sm">01, Jan 2025</span>
                        <ChevronDown size={20} />
                      </div>
                      <div className="flex h-10 w-full items-center justify-between p-2">
                        <span className="text-sm">12:00 AM</span>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                    <button
                      className="flex h-10 w-10 items-center justify-center"
                      onClick={() => setOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative flex items-center justify-end gap-2 p-2">
              <motion.button
                className="flex size-10 items-center justify-center border border-slate-200 bg-slate-100 transition-opacity duration-300 dark:border-slate-200 dark:bg-slate-100"
                style={{
                  borderRadius: 25,
                  opacity: open ? 0 : 1,
                }}
                onClick={() => setOpen(true)}
              >
                <CalendarDays />
              </motion.button>
              <motion.button
                className="bg-zinc-900 py-2 px-8 text-white dark:bg-zinc-900"
                layoutId="schedule"
                style={{ borderRadius: 25 }}
              >
                Post
              </motion.button>
              <AnimatePresence>
                {open && (
                  <div className="absolute inset-0 flex size-full items-center justify-center p-2">
                    <motion.button
                      layoutId="schedule"
                      className="h-10 w-full bg-zinc-900 py-2 px-8 text-white dark:bg-zinc-900"
                      style={{ borderRadius: 25 }}
                    >
                      Schedule
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -62 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -62 }}
              className="absolute -bottom-10 flex w-full items-center justify-center rounded-b-[25px] border border-slate-200 bg-slate-100 p-3 pt-8 dark:border-slate-200 dark:bg-slate-100"
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                Will be posted on 01 Jan 2025 at 12:00 AM
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

PostScheduler.displayName = "PostScheduler";

export default PostScheduler;
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
