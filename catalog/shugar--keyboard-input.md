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
keyboard-input.tsx
import React from "react";
import clsx from "clsx";

interface KbdProps {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  ctrl?: boolean;
  small?: boolean;
  children?: React.ReactNode;
}

export const Kbd = ({ meta, shift, alt, ctrl, small, children }: KbdProps) => {
  return (
    <kbd className={clsx(
      "bg-background-100 text-gray-1000 border border-gray-alpha-400 inline-block text-center ml-1 leading-[1.7em] rounded font-sans space-x-1",
      small ? "text-[.75rem] min-h-5 min-w-5 px-1" : "text-[.875rem] min-w-6 min-h-6 px-1.5"
    )}>
      {meta && <span className="min-w-[1em] inline-block">⌘</span>}
      {shift && <span className="min-w-[1em] inline-block">⇧</span>}
      {alt && <span className="min-w-[1em] inline-block">⌥</span>}
      {ctrl && <span className="min-w-[1em] inline-block">⌃</span>}
      {children && <span className="min-w-[1em] inline-block">{children}</span>}
    </kbd>
  );
};

code.demo.1751388322005.tsx
import { Kbd } from "@/components/ui/keyboard-input";

export default function DefaultDemo() {
  return (
    <div className="flex">
      <Kbd meta />
      <Kbd shift />
      <Kbd alt />
      <Kbd ctrl />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/keyboard-input.tsx
import React from "react";
import clsx from "clsx";

interface KbdProps {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  ctrl?: boolean;
  small?: boolean;
  children?: React.ReactNode;
}

export const Kbd = ({ meta, shift, alt, ctrl, small, children }: KbdProps) => {
  return (
    <kbd className={clsx(
      "bg-background-100 text-gray-1000 border border-gray-alpha-400 inline-block text-center ml-1 leading-[1.7em] rounded font-sans space-x-1",
      small ? "text-[.75rem] min-h-5 min-w-5 px-1" : "text-[.875rem] min-w-6 min-h-6 px-1.5"
    )}>
      {meta && <span className="min-w-[1em] inline-block">⌘</span>}
      {shift && <span className="min-w-[1em] inline-block">⇧</span>}
      {alt && <span className="min-w-[1em] inline-block">⌥</span>}
      {ctrl && <span className="min-w-[1em] inline-block">⌃</span>}
      {children && <span className="min-w-[1em] inline-block">{children}</span>}
    </kbd>
  );
};
```

Install NPM dependencies:
```bash
clsx
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
