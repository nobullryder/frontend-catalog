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
material.tsx
import React from "react";

const types = {
  base: "rounded-md shadow-border",
  small: "rounded-md shadow-border-small",
  medium: "rounded-xl shadow-border-medium",
  large: "rounded-xl shadow-border-large",
  tooltip: "rounded-md shadow-tooltip",
  menu: "rounded-xl shadow-menu",
  modal: "rounded-xl shadow-modal",
  fullscreen: "rounded-2xl shadow-fullscreen"
};

interface MaterialProps {
  type: keyof typeof types;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Material = ({ type, children, className, ref }: MaterialProps) => {
  return (
    <div className={`bg-background-100 ${types[type]}${className ? ` ${className}` : ""}`} ref={ref}>
      {children}
    </div>
  );
};

code.demo.tsx
import React from "react";
import { Material } from "@/components/ui/material";

const Placeholder = ({ type }) => (
  <div className="flex flex-col h-[80px] justify-center items-center">{type}</div>
);

export const Default = () => (
    <div className="flex flex-col gap-6 w-full">
        <Material type="base">
            <Placeholder type="Base" />
        </Material>
        <Material type="small">
            <Placeholder type="Small" />
        </Material>
        <Material type="medium">
            <Placeholder type="Medium" />
        </Material>
        <Material type="large">
            <Placeholder type="Large" />
        </Material>
        <Material type="tooltip">
            <Placeholder type="Tooltip" />
        </Material>
        <Material type="menu">
            <Placeholder type="Menu" />
        </Material>
        <Material type="modal">
            <Placeholder type="Modal" />
        </Material>
        <Material type="fullscreen">
            <Placeholder type="Fullscreen" />
        </Material>
    </div>
);
```

Copy-paste these files for dependencies:
```tsx
/components/ui/material.tsx
import React from "react";

const types = {
  base: "rounded-md shadow-border",
  small: "rounded-md shadow-border-small",
  medium: "rounded-xl shadow-border-medium",
  large: "rounded-xl shadow-border-large",
  tooltip: "rounded-md shadow-tooltip",
  menu: "rounded-xl shadow-menu",
  modal: "rounded-xl shadow-modal",
  fullscreen: "rounded-2xl shadow-fullscreen"
};

interface MaterialProps {
  type: keyof typeof types;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Material = ({ type, children, className, ref }: MaterialProps) => {
  return (
    <div className={`bg-background-100 ${types[type]}${className ? ` ${className}` : ""}`} ref={ref}>
      {children}
    </div>
  );
};
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "background-100": "var(--ds-background-100)"
      },
      "boxShadow": {
        "border": "var(--ds-shadow-border)",
        "small": "var(--ds-shadow-small)",
        "border-small": "var(--ds-shadow-border-small)",
        "medium": "var(--ds-shadow-medium)",
        "border-medium": "var(--ds-shadow-border-medium)",
        "large": "var(--ds-shadow-large)",
        "border-large": "var(--ds-shadow-border-large)",
        "tooltip": "var(--ds-shadow-tooltip)",
        "menu": "var(--ds-shadow-menu)",
        "modal": "var(--ds-shadow-modal)",
        "fullscreen": "var(--ds-shadow-fullscreen)"
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
