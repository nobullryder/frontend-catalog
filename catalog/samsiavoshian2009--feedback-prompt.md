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
feedback-prompt.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";

export const Component = () => {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-start gap-2 text-gray-800 dark:text-gray-200">
      {/* Question */}
      <span className="text-sm">Was this page helpful?</span>

      {/* Buttons / result */}
      {feedback ? (
        <div
          className={cn(
            "flex items-center gap-2 text-sm text-green-600 dark:text-green-400",
            "animate-fade-in"
          )}
        >
          <CheckCircle className="h-4 w-4" />
          Thanks for your feedback!
        </div>
      ) : (
        <div className="flex gap-2 animate-fade-in">
          {/* Yes button */}
          <button
            onClick={() => setFeedback("yes")}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
              "transition-all duration-200 ease-out",
              "hover:scale-105 active:scale-95",
              "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes
          </button>

          {/* No button */}
          <button
            onClick={() => setFeedback("no")}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
              "transition-all duration-200 ease-out",
              "hover:scale-105 active:scale-95",
              "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            No
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Tailwind animations (add to globals.css if not using Tailwind's animate plugin):
 *
 * @layer utilities {
 *   @keyframes fade-in {
 *     from { opacity: 0; transform: translateY(4px); }
 *     to   { opacity: 1; transform: translateY(0); }
 *   }
 *   .animate-fade-in {
 *     animation: fade-in 0.25s ease-out forwards;
 *   }
 * }
 */

code.demo.1757711607080.tsx
import { Component } from "@/components/ui/feedback-prompt";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feedback-prompt.tsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";

export const Component = () => {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-start gap-2 text-gray-800 dark:text-gray-200">
      {/* Question */}
      <span className="text-sm">Was this page helpful?</span>

      {/* Buttons / result */}
      {feedback ? (
        <div
          className={cn(
            "flex items-center gap-2 text-sm text-green-600 dark:text-green-400",
            "animate-fade-in"
          )}
        >
          <CheckCircle className="h-4 w-4" />
          Thanks for your feedback!
        </div>
      ) : (
        <div className="flex gap-2 animate-fade-in">
          {/* Yes button */}
          <button
            onClick={() => setFeedback("yes")}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
              "transition-all duration-200 ease-out",
              "hover:scale-105 active:scale-95",
              "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes
          </button>

          {/* No button */}
          <button
            onClick={() => setFeedback("no")}
            className={cn(
              "flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm",
              "transition-all duration-200 ease-out",
              "hover:scale-105 active:scale-95",
              "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <ThumbsDown className="h-4 w-4" />
            No
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Tailwind animations (add to globals.css if not using Tailwind's animate plugin):
 *
 * @layer utilities {
 *   @keyframes fade-in {
 *     from { opacity: 0; transform: translateY(4px); }
 *     to   { opacity: 1; transform: translateY(0); }
 *   }
 *   .animate-fade-in {
 *     animation: fade-in 0.25s ease-out forwards;
 *   }
 * }
 */
```

Install NPM dependencies:
```bash
lucide-react
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
