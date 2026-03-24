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
timer.tsx
"use client"

import { Timer } from "@ark-ui/react/timer"

export const Basic = () => (
  <div className="flex justify-center w-full items-center min-h-screen">
    <Timer.Root
      targetMs={60 * 60 * 1000} // 1 hour
      className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center border"
    >
      {/* Timer Display (Hours : Minutes : Seconds only) */}
      <Timer.Area className="flex items-center gap-3 text-2xl font-mono font-bold text-gray-800">
        <Timer.Item type="hours" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="minutes" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="seconds" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
      </Timer.Area>

      {/* Controls */}
      <Timer.Control className="flex gap-3 mt-4">
        <Timer.ActionTrigger
          action="start"
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
        >
          ▶ Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger
          action="pause"
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          ⏸ Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger
          action="resume"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition"
        >
          ⏵ Resume
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer.Root>
  </div>
)


code.demo.1756458250457.tsx
import { Basic } from "@/components/ui/timer";

export default function DemoOne() {
  return <Basic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timer.tsx
"use client"

import { Timer } from "@ark-ui/react/timer"

export const Basic = () => (
  <div className="flex justify-center w-full items-center min-h-screen">
    <Timer.Root
      targetMs={60 * 60 * 1000} // 1 hour
      className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center border"
    >
      {/* Timer Display (Hours : Minutes : Seconds only) */}
      <Timer.Area className="flex items-center gap-3 text-2xl font-mono font-bold text-gray-800">
        <Timer.Item type="hours" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="minutes" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
        <Timer.Separator>:</Timer.Separator>
        <Timer.Item type="seconds" className="px-3 py-1 rounded-md bg-gray-100 shadow-sm" />
      </Timer.Area>

      {/* Controls */}
      <Timer.Control className="flex gap-3 mt-4">
        <Timer.ActionTrigger
          action="start"
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
        >
          ▶ Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger
          action="pause"
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          ⏸ Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger
          action="resume"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition"
        >
          ⏵ Resume
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer.Root>
  </div>
)

```

Install NPM dependencies:
```bash
@ark-ui/react
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
