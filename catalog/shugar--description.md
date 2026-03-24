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
description.tsx
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface DescriptionProps {
  title: string;
  content: string;
  tooltip?: string;
}

const DescriptionIcon = () => (
  <svg
    height="16"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className="w-3.5 h-3.5"
  >
    <path
      d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
      fillOpacity="0.08"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4C7.44771 4 7 4.44772 7 5C7 5.55228 7.44771 6 8 6ZM7 7H6.25V8.5H7H7.24999V10.5V11.25H8.74999V10.5V8C8.74999 7.44772 8.30227 7 7.74999 7H7Z"
    />
  </svg>
);

export const Description = ({ title, content, tooltip }: DescriptionProps) => {
  return (
    <dl className="font-sans">
      <dt className="text-sm text-gray-900 capitalize flex items-center gap-1">
        {title}
        {tooltip && (
          <Tooltip text={tooltip} delay={false}>
            <DescriptionIcon />
          </Tooltip>
        )}
      </dt>
      <dd className="text-sm text-gray-1000 font-medium mt-1">{content}</dd>
    </dl>
  );
};

code.demo.tsx
import React from "react";
import { Description } from "@/components/ui/description";

export const Default = () => (
    <div className="flex flex-col gap-2">
        <Description
            content="Data about this section."
            title="Section Title"
            tooltip="Additional context about what this section refers to."
        />
    </div>
);
```

Copy-paste these files for dependencies:
```tsx
/components/ui/description.tsx
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface DescriptionProps {
  title: string;
  content: string;
  tooltip?: string;
}

const DescriptionIcon = () => (
  <svg
    height="16"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="16"
    className="w-3.5 h-3.5"
  >
    <path
      d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
      fillOpacity="0.08"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4C7.44771 4 7 4.44772 7 5C7 5.55228 7.44771 6 8 6ZM7 7H6.25V8.5H7H7.24999V10.5V11.25H8.74999V10.5V8C8.74999 7.44772 8.30227 7 7.74999 7H7Z"
    />
  </svg>
);

export const Description = ({ title, content, tooltip }: DescriptionProps) => {
  return (
    <dl className="font-sans">
      <dt className="text-sm text-gray-900 capitalize flex items-center gap-1">
        {title}
        {tooltip && (
          <Tooltip text={tooltip} delay={false}>
            <DescriptionIcon />
          </Tooltip>
        )}
      </dt>
      <dd className="text-sm text-gray-1000 font-medium mt-1">{content}</dd>
    </dl>
  );
};
```
```tsx
/components/ui/tooltip.tsx
import React, { useMemo } from "react";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const types = {
  success: "!bg-success !text-white",
  warning: "!bg-warning !text-black",
  error: "!bg-error !text-white",
  violet: "!bg-violet !text-white",
  default: "!bg-foreground !text-background-100",
};

interface TooltipProps {
  children: React.ReactNode;
  text: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: boolean;
  boxAlign?: "left" | "right" | "center";
  type?: keyof typeof types;
  tip?: boolean;
  center?: boolean;
}

export const Tooltip = ({
  children,
  text,
  position = "top",
  delay = true,
  boxAlign = "center",
  type = "default",
  tip = true,
  center = true
}: TooltipProps) => {
  const id = useMemo(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }, []);

  return (
    <div>
      <div id={id} className="font-sans">{children}</div>
      <ReactTooltip
        anchorSelect={`#${id}`}
        //@ts-ignore
        place={`${position}${{ left: "-start", right: "-end", center: "" }[boxAlign]}`}
        delayShow={delay ? 500 : 0}
        opacity={1}
        noArrow={!tip}
        className={`!font-sans !text-[13px] !max-w-52 !rounded-lg ${types[type]}${center ? " text-center" : " text-start"}`}
      >
        {text}
      </ReactTooltip>
    </div>
  );
};
```

Install NPM dependencies:
```bash
react-tooltip
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-900": "var(--ds-gray-900)",
        "gray-1000": "var(--ds-gray-1000)"
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
