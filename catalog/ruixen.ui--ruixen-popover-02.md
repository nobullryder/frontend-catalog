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
ruixen-popover-02.tsx
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const notifications = [
  {
    title: "Welcome to the app!",
    message: "Let's get started by completing your profile.",
    time: "Just now",
  },
  {
    title: "Your plan is active",
    message: "You're now on the Pro plan.",
    time: "5 minutes ago",
  },
  {
    title: "Try Ruixen!",
    message: "Explore powerful UI tools for modern apps.",
    time: "Today",
    cta: {
      text: "@ruixen",
      href: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
    },
  },
  {
    title: "Invite your team",
    message: "You can add up to 10 team members for free.",
    time: "1 day ago",
  },
];

export default function Popover_02() {
  const [step, setStep] = useState(0);
  const maxSteps = notifications.length;

  const next = () => setStep((prev) => Math.min(prev + 1, maxSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const current = notifications[step];

  return (
    <div className="flex justify-center h-screen items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Bell size={16} className="mr-2" />
            Notifications
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[350px] border border-gray-200 dark:border-gray-800 p-0"
        >
          <ScrollArea className="max-h-80 p-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {current.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {current.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{current.time}</p>
                {current.cta && (
                  <Link
                    href={current.cta.href}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    {current.cta.text}
                  </Link>
                )}
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-xs text-muted-foreground">
              {step + 1} / {maxSteps}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={next}
              disabled={step === maxSteps - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


code.demo.1753441149021.tsx
"use client";

import Popover_02 from "@/components/ui/ruixen-popover-02";

export default function DemoOne() {
  return <Popover_02 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-popover-02.tsx
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const notifications = [
  {
    title: "Welcome to the app!",
    message: "Let's get started by completing your profile.",
    time: "Just now",
  },
  {
    title: "Your plan is active",
    message: "You're now on the Pro plan.",
    time: "5 minutes ago",
  },
  {
    title: "Try Ruixen!",
    message: "Explore powerful UI tools for modern apps.",
    time: "Today",
    cta: {
      text: "@ruixen",
      href: "https://ruixen.com/?utm_source=21stdev&utm_medium=popover&utm_campaign=ruixen",
    },
  },
  {
    title: "Invite your team",
    message: "You can add up to 10 team members for free.",
    time: "1 day ago",
  },
];

export default function Popover_02() {
  const [step, setStep] = useState(0);
  const maxSteps = notifications.length;

  const next = () => setStep((prev) => Math.min(prev + 1, maxSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const current = notifications[step];

  return (
    <div className="flex justify-center h-screen items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Bell size={16} className="mr-2" />
            Notifications
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[350px] border border-gray-200 dark:border-gray-800 p-0"
        >
          <ScrollArea className="max-h-80 p-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {current.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {current.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{current.time}</p>
                {current.cta && (
                  <Link
                    href={current.cta.href}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline mt-2 inline-block"
                  >
                    {current.cta.text}
                  </Link>
                )}
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-xs text-muted-foreground">
              {step + 1} / {maxSteps}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={next}
              disabled={step === maxSteps - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

```

Install NPM dependencies:
```bash
clsx, next, lucide-react
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
