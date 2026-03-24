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
tooltip.tsx
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

code.demo.tsx
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export const Default = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Default</div>
    <div className="flex justify-between gap-4">
      <Tooltip text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Top</span>
      </Tooltip>
      <Tooltip position="bottom" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Bottom</span>
      </Tooltip>
      <Tooltip position="left" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Left</span>
      </Tooltip>
      <Tooltip position="right" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Right</span>
      </Tooltip>
    </div>
  </div>
)

export const NoDelay = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">No delay</div>
    <div className="flex justify-between gap-4">
      <Tooltip text="The Evil Rabbit Jumped over the Fence" delay={false}>
        <span className="dark:text-white">Top</span>
      </Tooltip>
      <Tooltip position="bottom" text="The Evil Rabbit Jumped over the Fence" delay={false}>
        <span className="dark:text-white">Bottom</span>
      </Tooltip>
      <Tooltip position="left" text="The Evil Rabbit Jumped over the Fence" delay={false}>
        <span className="dark:text-white">Left</span>
      </Tooltip>
      <Tooltip position="right" text="The Evil Rabbit Jumped over the Fence" delay={false}>
        <span className="dark:text-white">Right</span>
      </Tooltip>
    </div>
  </div>
)

export const BoxAlign = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Box align</div>
    <div className="flex justify-between gap-4">
      <div className="text-center">
        <Tooltip position="bottom" boxAlign="left" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Bottom/Left</span>
        </Tooltip>
        <Tooltip position="left" boxAlign="left" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Left/Left</span>
        </Tooltip>
        <Tooltip position="right" boxAlign="left" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Right/Left</span>
        </Tooltip>
      </div>
      <div className="text-center">
        <Tooltip position="bottom" boxAlign="center" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Bottom/Center</span>
        </Tooltip>
        <Tooltip position="left" boxAlign="center" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Left/Center</span>
        </Tooltip>
        <Tooltip position="right" boxAlign="center" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Right/Center</span>
        </Tooltip>
      </div>
      <div className="text-center">
        <Tooltip position="bottom" boxAlign="right" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Bottom/Right</span>
        </Tooltip>
        <Tooltip position="left" boxAlign="right" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Left/Right</span>
        </Tooltip>
        <Tooltip position="right" boxAlign="right" text="The Evil Rabbit Jumped over the Fence">
          <span className="dark:text-white">Right/Right</span>
        </Tooltip>
      </div>
    </div>
  </div>
)

export const CustomContent = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Custom content</div>
    <div className="flex justify-between gap-4">
      <Tooltip
        text={
          <>
            The <b>Evil Rabbit</b> Jumped over the <i>Fence</i>.
          </>
        }
      >
        <span className="dark:text-white">Top</span>
      </Tooltip>
      <Tooltip
        position="bottom"
        text={
          <>
            The <b>Evil Rabbit</b> Jumped over the <i>Fence</i>.
          </>
        }
      >
        <span className="dark:text-white">Bottom</span>
      </Tooltip>
      <Tooltip
        position="left"
        text={
          <>
            The <b>Evil Rabbit</b> Jumped over the <i>Fence</i>.
          </>
        }
      >
        <span className="dark:text-white">Left</span>
      </Tooltip>
      <Tooltip
        position="right"
        text={
          <>
            The <b>Evil Rabbit</b> Jumped over the <i>Fence</i>.
          </>
        }
      >
        <span className="dark:text-white">Right</span>
      </Tooltip>
    </div>
  </div>
)

export const CustomType = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Custom type</div>
    <div className="flex justify-between gap-4">
      <Tooltip type="success" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Top</span>
      </Tooltip>
      <Tooltip position="bottom" type="error" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Bottom</span>
      </Tooltip>
      <Tooltip position="left" type="warning" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Left</span>
      </Tooltip>
      <Tooltip position="right" type="violet" text="The Evil Rabbit Jumped over the Fence">
        <span className="dark:text-white">Right</span>
      </Tooltip>
    </div>
  </div>
)

export const Components = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Components</div>
    <div className="flex justify-between items-center gap-4">
      <Tooltip position="bottom" text="The Evil Rabbit Jumped over the Fence">
        <Button size="small">Bottom</Button>
      </Tooltip>
      <Tooltip position="left" text="The Evil Rabbit Jumped over the Fence">
        <Badge size="sm">LEFT</Badge>
      </Tooltip>
      <Tooltip position="right" text="The Evil Rabbit Jumped over the Fence">
        <Spinner />
      </Tooltip>
    </div>
  </div>
)

export const Other = () => (
  <div className="flex flex-col gap-2 px-96 w-full">
    <div className="font-bold text-xl dark:text-white">Other</div>
    <div className="flex justify-between gap-4">
      <Tooltip text="The Evil Rabbit Jumped over the Fence" tip={false}>
        <span className="dark:text-white">No tip indicator</span>
      </Tooltip>
      <Tooltip text="The Evil Rabbit Jumped over the Fence" center={false}>
        <span className="dark:text-white">No center text</span>
      </Tooltip>
    </div>
  </div>
)
```

Copy-paste these files for dependencies:
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
        "background-100": "var(--ds-background-100)",
        "success": "var(--geist-success)",
        "error": "var(--geist-error)",
        "warning": "var(--geist-warning)",
        "violet": "var(--geist-violet)",
        "foreground": "var(--geist-foreground)"
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
