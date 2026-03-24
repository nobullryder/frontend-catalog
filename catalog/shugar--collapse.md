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
collapse.tsx
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface CollapseProps {
  size?: "small" | "large";
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface CollapseGroupProps {
  multiple?: boolean;
  children: React.ReactNode;
}

const ArrowIcon = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

const Collapse = ({ size = "large", title, children, defaultExpanded, isOpen, onToggle, className }: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [_isOpen, set_isOpen] = useState<boolean>(defaultExpanded || false);

  useEffect(() => {
    if (isOpen !== undefined) {
      set_isOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <div className={clsx("text-left border-y border-accents-2 overflow-hidden font-sans", className)}>
      <h3 className={clsx("text-gray-1000", size === "small" ? "text-base font-medium" : "text-2xl font-semibold")}>
        <button
          onClick={onToggle && isOpen !== undefined ? onToggle : () => set_isOpen(!_isOpen)}
          className="cursor-pointer w-full transition"
        >
          <span className={clsx("flex justify-between items-center w-full", size === "small" ? "py-3" : "py-6")}>
            {title}
            <span className={clsx("fill-gray-1000 flex duration-200", _isOpen && "rotate-180")}>
              <ArrowIcon />
            </span>
          </span>
        </button>
      </h3>
      <div
        ref={contentRef}
        className="transition-all ease-in-out duration-200 overflow-hidden"
        style={{ maxHeight: _isOpen ? `${contentRef?.current?.scrollHeight}px` : 0 }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

const CollapseGroup = ({ multiple = false, children }: CollapseGroupProps) => {
  const collapses = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CollapseProps> =>
      React.isValidElement(child) && "props" in child
  );

  const [openStates, setOpenStates] = useState(() =>
    collapses.map((child) => child.props.defaultExpanded || false)
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) =>
      multiple
        ? prev.map((state, i) => (i === index ? !state : state))
        : prev.map((state, i) => (i === index ? !state : false))
    );
  };

  return (
    <div className="border-t border-accents-2">
      {collapses.map((child, index) =>
        React.cloneElement(child, {
          isOpen: openStates[index],
          onToggle: () => handleToggle(index),
          className: "border-t-0"
        })
      )}
    </div>
  );
};

export { CollapseGroup, Collapse };


code.demo.tsx
import React from "react";
import { Collapse, CollapseGroup } from "@/components/ui/collapse";
import { Text } from "@/components/ui/text";

export const Default = () => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <div className="font-bold text-xl dark:text-white">Default</div>
      <CollapseGroup>
        <Collapse title="Question A">
          <Text className="mb-4" size={16}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title="Question B">
          <Text className="mb-4" size={16}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </Text>
        </Collapse>
      </CollapseGroup>
    </div>
  );
};

export const Expanded = () => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <div className="font-bold text-xl dark:text-white">Expanded</div>
      <CollapseGroup>
        <Collapse title="Question A">
          <Text className="mb-4" size={16}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse defaultExpanded title="Question B">
          <Text className="mb-4" size={16}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </Text>
        </Collapse>
      </CollapseGroup>
    </div>
  );
};

export const Multiple = () => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <div className="font-bold text-xl dark:text-white">Multiple</div>
      <CollapseGroup multiple>
        <Collapse title="Question A">
          <Text className="mb-4" size={16}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title="Question B">
          <Text className="mb-4" size={16}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </Text>
        </Collapse>
      </CollapseGroup>
    </div>
  );
};

export const Small = () => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <div className="font-bold text-xl dark:text-white">Small</div>
      <Collapse size="small" title="Question A">
        <Text className="mb-4" size={16}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Text>
      </Collapse>
    </div>
  );
};
```

Copy-paste these files for dependencies:
```tsx
/components/ui/collapse.tsx
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface CollapseProps {
  size?: "small" | "large";
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

interface CollapseGroupProps {
  multiple?: boolean;
  children: React.ReactNode;
}

const ArrowIcon = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

const Collapse = ({ size = "large", title, children, defaultExpanded, isOpen, onToggle, className }: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [_isOpen, set_isOpen] = useState<boolean>(defaultExpanded || false);

  useEffect(() => {
    if (isOpen !== undefined) {
      set_isOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <div className={clsx("text-left border-y border-accents-2 overflow-hidden font-sans", className)}>
      <h3 className={clsx("text-gray-1000", size === "small" ? "text-base font-medium" : "text-2xl font-semibold")}>
        <button
          onClick={onToggle && isOpen !== undefined ? onToggle : () => set_isOpen(!_isOpen)}
          className="cursor-pointer w-full transition"
        >
          <span className={clsx("flex justify-between items-center w-full", size === "small" ? "py-3" : "py-6")}>
            {title}
            <span className={clsx("fill-gray-1000 flex duration-200", _isOpen && "rotate-180")}>
              <ArrowIcon />
            </span>
          </span>
        </button>
      </h3>
      <div
        ref={contentRef}
        className="transition-all ease-in-out duration-200 overflow-hidden"
        style={{ maxHeight: _isOpen ? `${contentRef?.current?.scrollHeight}px` : 0 }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

const CollapseGroup = ({ multiple = false, children }: CollapseGroupProps) => {
  const collapses = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CollapseProps> =>
      React.isValidElement(child) && "props" in child
  );

  const [openStates, setOpenStates] = useState(() =>
    collapses.map((child) => child.props.defaultExpanded || false)
  );

  const handleToggle = (index: number) => {
    setOpenStates((prev) =>
      multiple
        ? prev.map((state, i) => (i === index ? !state : state))
        : prev.map((state, i) => (i === index ? !state : false))
    );
  };

  return (
    <div className="border-t border-accents-2">
      {collapses.map((child, index) =>
        React.cloneElement(child, {
          isOpen: openStates[index],
          onToggle: () => handleToggle(index),
          className: "border-t-0"
        })
      )}
    </div>
  );
};

export { CollapseGroup, Collapse };

```

Install NPM dependencies:
```bash
clsx
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-1000": "var(--ds-gray-1000)",
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
