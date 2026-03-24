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
import { Coffee, Pause, Play, RotateCcw } from "lucide-react";

export default function TimerPomodoro() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Timer.Root
        countdown
        startMs={25 * 60 * 1000}
        className="w-full max-w-sm"
      >
        <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Focus Time
            </h3>
          </div>

          <Timer.Area className="text-center mb-6">
            <div className="inline-flex text-4xl font-bold font-mono text-red-600 dark:text-red-400">
              <Timer.Item type="minutes" className="min-w-[2ch] text-center" />
              <Timer.Separator>:</Timer.Separator>
              <Timer.Item type="seconds" className="min-w-[2ch] text-center" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              25 minutes of focused work
            </div>
          </Timer.Area>

          <Timer.Control className="flex justify-center gap-2">
            <Timer.ActionTrigger
              action="start"
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              Start
            </Timer.ActionTrigger>
            <Timer.ActionTrigger
              action="pause"
              className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Pause className="w-4 h-4" />
            </Timer.ActionTrigger>
            <Timer.ActionTrigger
              action="reset"
              className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
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
