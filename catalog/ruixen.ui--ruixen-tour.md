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
ruixen-tour.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Dialog02() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Let's Get Started",
      description: "Kick off your experience with a brief introduction to our toolkit.",
    },
    {
      title: "Designed For Flexibility",
      description: "Drag, drop, and build with fully customizable components.",
    },
    {
      title: "Scalable Codebase",
      description: "Every block is built to be reusable and scalable with your projects.",
    },
    {
      title: "Join Our Community",
      description: "Get help, share ideas, and grow with developers worldwide.",
    },
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <Dialog onOpenChange={(open) => open && setStep(0)}>
      <DialogTrigger asChild>
        <Button variant="outline">Start Tour</Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-3xl p-0 overflow-hidden rounded-xl border shadow-2xl",
          "bg-white text-black",
          "dark:bg-black dark:text-white dark:border-neutral-800",
          "data-[state=open]:animate-none data-[state=closed]:animate-none"
        )}
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-neutral-800">
            <div className="flex flex-col gap-3">
              <Image
                src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/ruixen_ui_logo_dark.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-neutral-800"
                unoptimized
              />
              <h2 className="text-lg font-medium">Origin UI Onboarding</h2>
              <p className="text-sm opacity-80">
                Explore our features step-by-step to get the best out of your experience.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 text-sm transition",
                      index === step
                        ? "font-semibold"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {index < step ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white/40" />
                    )}
                    <span className="font-normal">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={steps[step].title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-medium"
                  >
                    {steps[step].title}
                  </motion.h2>
                </AnimatePresence>

                <div className="min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={steps[step].description}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-600 dark:text-gray-400 text-base opacity-90"
                    >
                      {steps[step].description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </DialogHeader>

              {/* Image */}
              <div className="w-full h-60 bg-gray-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center">
                <img
                  src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"
                  alt="Step Visual"
                  className="h-full object-contain rounded-lg border-4 border-gray-200 dark:border-neutral-800"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <DialogClose asChild>
                <Button variant="outline">Skip</Button>
              </DialogClose>

              {step < steps.length - 1 ? (
                <Button variant="outline" onClick={next}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button variant="outline">Finish</Button>
                </DialogClose>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


code.demo.1749710130359.tsx
import Dialog02 from "@/components/ui/ruixen-tour";

const DemoOne = () => {
  return <Dialog02 />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-tour.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Dialog02() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Let's Get Started",
      description: "Kick off your experience with a brief introduction to our toolkit.",
    },
    {
      title: "Designed For Flexibility",
      description: "Drag, drop, and build with fully customizable components.",
    },
    {
      title: "Scalable Codebase",
      description: "Every block is built to be reusable and scalable with your projects.",
    },
    {
      title: "Join Our Community",
      description: "Get help, share ideas, and grow with developers worldwide.",
    },
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  return (
    <Dialog onOpenChange={(open) => open && setStep(0)}>
      <DialogTrigger asChild>
        <Button variant="outline">Start Tour</Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-3xl p-0 overflow-hidden rounded-xl border shadow-2xl",
          "bg-white text-black",
          "dark:bg-black dark:text-white dark:border-neutral-800",
          "data-[state=open]:animate-none data-[state=closed]:animate-none"
        )}
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-neutral-800">
            <div className="flex flex-col gap-3">
              <Image
                src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/ruixen_ui_logo_dark.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-neutral-800"
                unoptimized
              />
              <h2 className="text-lg font-medium">Origin UI Onboarding</h2>
              <p className="text-sm opacity-80">
                Explore our features step-by-step to get the best out of your experience.
              </p>
              <div className="flex flex-col gap-3 mt-6">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 text-sm transition",
                      index === step
                        ? "font-semibold"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    {index < step ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white/40" />
                    )}
                    <span className="font-normal">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={steps[step].title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-medium"
                  >
                    {steps[step].title}
                  </motion.h2>
                </AnimatePresence>

                <div className="min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={steps[step].description}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-600 dark:text-gray-400 text-base opacity-90"
                    >
                      {steps[step].description}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </DialogHeader>

              {/* Image */}
              <div className="w-full h-60 bg-gray-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center">
                <img
                  src="https://raw.githubusercontent.com/ruixenui/RUIXEN_ASSESTS/refs/heads/main/component_assests/tour.png"
                  alt="Step Visual"
                  className="h-full object-contain rounded-lg border-4 border-gray-200 dark:border-neutral-800"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <DialogClose asChild>
                <Button variant="outline">Skip</Button>
              </DialogClose>

              {step < steps.length - 1 ? (
                <Button variant="outline" onClick={next}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button variant="outline">Finish</Button>
                </DialogClose>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, next, framer-motion
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
