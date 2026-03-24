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
status-dot.tsx
import React from "react";

const states = {
  QUEUED: "bg-accents-2",
  BUILDING: "bg-warning",
  ERROR: "bg-error",
  READY: "bg-cyan",
  CANCELED: "bg-accents-2"
};

const titles = {
  QUEUED: "This deployment is queued.",
  BUILDING: "This deployment is building.",
  ERROR: "This deployment had an error.",
  READY: "This deployment is ready.",
  CANCELED: "This deployment was canceled."
};

interface StatusDotProps {
  state: keyof typeof states;
  label?: boolean;
}

export const StatusDot = ({ state, label }: StatusDotProps) => {
  return (
    <span
      aria-label={titles[state]}
      className="inline-flex items-center gap-2"
      title={titles[state]}
    >
      <span className={`inline-block w-2.5 h-2.5 rounded-[5px] ${states[state]}`} />
      {label && (
        <span className="font-sans text-[14px] leading-4 text-gray-1000 capitalize">
          {state.toLowerCase()}
        </span>
      )}
    </span>
  );
};

code.demo.tsx
import React from "react";
import { StatusDot } from "@/components/ui/status-dot";

export const Default = () => (
    <div className="flex flex-col gap-4">
        <div className="font-bold text-xl dark:text-white">Default</div>
        <StatusDot state="QUEUED" />
        <StatusDot state="BUILDING" />
        <StatusDot state="ERROR" />
        <StatusDot state="READY" />
        <StatusDot state="CANCELED" />
    </div>
);


export const Label = () => (
    <div className="flex flex-col gap-4">
        <div className="font-bold text-xl dark:text-white">Label</div>
        <StatusDot label state="QUEUED" />
        <StatusDot label state="BUILDING" />
        <StatusDot label state="ERROR" />
        <StatusDot label state="READY" />
        <StatusDot label state="CANCELED" />
    </div>
);
```

Copy-paste these files for dependencies:
```tsx
/components/ui/status-dot.tsx
import React from "react";

const states = {
  QUEUED: "bg-accents-2",
  BUILDING: "bg-warning",
  ERROR: "bg-error",
  READY: "bg-cyan",
  CANCELED: "bg-accents-2"
};

const titles = {
  QUEUED: "This deployment is queued.",
  BUILDING: "This deployment is building.",
  ERROR: "This deployment had an error.",
  READY: "This deployment is ready.",
  CANCELED: "This deployment was canceled."
};

interface StatusDotProps {
  state: keyof typeof states;
  label?: boolean;
}

export const StatusDot = ({ state, label }: StatusDotProps) => {
  return (
    <span
      aria-label={titles[state]}
      className="inline-flex items-center gap-2"
      title={titles[state]}
    >
      <span className={`inline-block w-2.5 h-2.5 rounded-[5px] ${states[state]}`} />
      {label && (
        <span className="font-sans text-[14px] leading-4 text-gray-1000 capitalize">
          {state.toLowerCase()}
        </span>
      )}
    </span>
  );
};
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-1000": "var(--ds-gray-1000)",
        "error": "var(--geist-error)",
        "warning": "var(--geist-warning)",
        "cyan": "var(--geist-cyan)",
        "accents-2": "var(--accents-2)"
      }
    }
  }
}
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
