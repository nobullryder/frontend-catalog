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


code.demo.1756146847284.tsx
"use client";

import { Timer } from "@ark-ui/react/timer";
import { Play, Square } from "lucide-react";

export default function TimerWithLabels() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Timer.Root
        targetMs={90 * 60 * 1000}
        className="flex flex-col items-center gap-4"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Study Session
        </h3>

        <Timer.Area className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col items-center">
            <Timer.Item
              type="hours"
              className="text-2xl font-mono min-w-[2ch] text-center"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Timer.Item
              type="minutes"
              className="text-2xl font-mono min-w-[2ch] text-center"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minutes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Timer.Item
              type="seconds"
              className="text-2xl font-mono min-w-[2ch] text-center"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Seconds
            </span>
          </div>
        </Timer.Area>

        <Timer.Control className="flex gap-2">
          <Timer.ActionTrigger
            action="start"
            className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger
            action="pause"
            className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            <Square className="w-4 h-4" />
            Stop
          </Timer.ActionTrigger>
        </Timer.Control>
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
