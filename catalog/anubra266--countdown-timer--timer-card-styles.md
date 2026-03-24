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
countdown-timer.tsx
"use client";

import { Timer } from "@ark-ui/react/timer";
import { Pause, Play, RotateCcw } from "lucide-react";

export default function TimerBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Timer.Root
        targetMs={60 * 60 * 1000}
        className="flex flex-col items-center gap-4"
      >
        <Timer.Area className="flex items-center gap-1 text-2xl font-mono text-gray-900 dark:text-gray-100">
          <Timer.Item type="hours" className="min-w-[3ch] text-center" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="minutes" className="min-w-[2ch] text-center" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="seconds" className="min-w-[2ch] text-center" />
        </Timer.Area>

        <Timer.Control className="flex items-center gap-2">
          <Timer.ActionTrigger
            action="start"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            <Play className="w-3 h-3" />
            Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger
            action="pause"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            <Pause className="w-3 h-3" />
            Pause
          </Timer.ActionTrigger>
          <Timer.ActionTrigger
            action="reset"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Timer.ActionTrigger>
        </Timer.Control>
      </Timer.Root>
    </div>
  );
}


code.demo.1756146847285.tsx
"use client";

import { Timer } from "@ark-ui/react/timer";
import { Clock, Play, Pause } from "lucide-react";

export default function TimerCardStyle() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Timer.Root targetMs={45 * 60 * 1000} className="w-full max-w-sm">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Meeting Timer
            </h3>
          </div>

          <Timer.Area className="flex items-center justify-center gap-1 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-200 dark:border-gray-600">
              <Timer.Item
                type="hours"
                className="text-xl font-mono text-gray-900 dark:text-gray-100 min-w-[2ch] text-center"
              />
            </div>
            <Timer.Separator className="text-gray-400 mx-1">:</Timer.Separator>
            <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-200 dark:border-gray-600">
              <Timer.Item
                type="minutes"
                className="text-xl font-mono text-gray-900 dark:text-gray-100 min-w-[2ch] text-center"
              />
            </div>
            <Timer.Separator className="text-gray-400 mx-1">:</Timer.Separator>
            <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-200 dark:border-gray-600">
              <Timer.Item
                type="seconds"
                className="text-xl font-mono text-gray-900 dark:text-gray-100 min-w-[2ch] text-center"
              />
            </div>
          </Timer.Area>

          <Timer.Control className="flex gap-2">
            <Timer.ActionTrigger
              action="start"
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              Start
            </Timer.ActionTrigger>
            <Timer.ActionTrigger
              action="pause"
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <Pause className="w-4 h-4" />
              Pause
            </Timer.ActionTrigger>
          </Timer.Control>
        </div>
      </Timer.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/countdown-timer.tsx
"use client";

import { Timer } from "@ark-ui/react/timer";
import { Pause, Play, RotateCcw } from "lucide-react";

export default function TimerBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Timer.Root
        targetMs={60 * 60 * 1000}
        className="flex flex-col items-center gap-4"
      >
        <Timer.Area className="flex items-center gap-1 text-2xl font-mono text-gray-900 dark:text-gray-100">
          <Timer.Item type="hours" className="min-w-[3ch] text-center" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="minutes" className="min-w-[2ch] text-center" />
          <Timer.Separator>:</Timer.Separator>
          <Timer.Item type="seconds" className="min-w-[2ch] text-center" />
        </Timer.Area>

        <Timer.Control className="flex items-center gap-2">
          <Timer.ActionTrigger
            action="start"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            <Play className="w-3 h-3" />
            Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger
            action="pause"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            <Pause className="w-3 h-3" />
            Pause
          </Timer.ActionTrigger>
          <Timer.ActionTrigger
            action="reset"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </Timer.ActionTrigger>
        </Timer.Control>
      </Timer.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
