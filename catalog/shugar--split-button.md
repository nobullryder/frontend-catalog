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
split-button.tsx
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button-1";
import clsx from "clsx";
import { Menu, MenuButton, MenuContainer, MenuItem, TMenuPosition } from "@/components/ui/menu";

interface MenuProps {
  width?: number;
}

interface SplitButtonProps {
  buttonProps?: ButtonProps;
  menuAlignment?: TMenuPosition;
  menuButtonLabel?: string;
  menuItems?: React.ReactNode;
  menuProps?: MenuProps;
  children?: React.ReactNode;
}

const ArrowBottom = () => (
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

export const SplitButton = ({
  buttonProps,
  menuAlignment,
  menuButtonLabel,
  menuItems,
  menuProps,
  children
}: SplitButtonProps) => {
  return (
    <MenuContainer position={menuAlignment}>
      <Button
        className="rounded-r-none border-r-0 float-left focus:shadow-none"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          buttonProps?.onClick && buttonProps?.onClick(event);
        }}
        {...buttonProps}
      >
        {children}
      </Button>
      <MenuButton
        aria-label={menuButtonLabel}
        svgOnly
        variant={buttonProps?.variant}
        type={buttonProps?.type}
        size={buttonProps?.size}
        shadow={buttonProps?.shadow}
        className={clsx(
          "rounded-l-none focus:shadow-none",
          buttonProps?.type === "secondary" && "border-l-gray-300",
          (buttonProps?.type === "error" || buttonProps?.type === "warning") && "border-l border-l-gray-300",
          (buttonProps?.type === "primary" || buttonProps?.type === undefined) && "border-l border-l-[#404040] dark:border-[#cdcdcd]"
        )}
      >
        <ArrowBottom />
      </MenuButton>
      <Menu {...menuProps}>
        {menuItems}
      </Menu>
    </MenuContainer>
  );
};

interface MenuItemProps {
  onClick?: () => void;
}

interface SplitButtonMenuItemProps {
  title?: string;
  description?: string;
  menuItemProps?: MenuItemProps;
}

export const SplitButtonMenuItem = ({ title, description, menuItemProps }: SplitButtonMenuItemProps) => {
  return (
    <MenuItem className="h-fit p-2" {...menuItemProps}>
      <span className="flex flex-col">
        <span className="text-gray-1000 text-sm font-medium">{title}</span>
        <span className="text-gray-900 text-sm">{description}</span>
      </span>
    </MenuItem>
  );
};

code.demo.1752149088917.tsx
import { ButtonProps } from "@/components/ui/button-1";
import { SplitButton, SplitButtonMenuItem } from "@/components/ui/split-button";

const SIZES: ButtonProps["size"][] = ["small", "medium", "large"];
const TYPES: Extract<ButtonProps["type"], "primary" | "secondary">[] = [
  "primary",
  "secondary"
];

export default function DefaultDemo() {
  return (
    <div className="flex gap-10">
        {TYPES.map((type, i) => {
          return (
            <div className="flex flex-col gap-4" key={type + i}>
              {SIZES.map((size, j) => {
                return (
                  <SplitButton
                    buttonProps={{
                      onClick: () => {
                        alert("Clicked Saved");
                      },
                      size,
                      type
                    }}
                    key={`${type}-${i}-${j}`}
                    menuButtonLabel="Select save method"
                    menuItems={
                      <>
                        <SplitButtonMenuItem
                          description="Save changes"
                          menuItemProps={{
                            onClick: () => {
                              alert("Clicked Save");
                            }
                          }}
                          title="Save"
                        />
                        <SplitButtonMenuItem
                          description="Save changes and create a new production deployment"
                          menuItemProps={{
                            onClick: () => {
                              alert("Clicked Save + Redeploy");
                            }
                          }}
                          title="Save + Redeploy"
                        />
                      </>
                    }
                    menuProps={{ width: 264 }}
                  >
                    Save
                  </SplitButton>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/split-button.tsx
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button-1";
import clsx from "clsx";
import { Menu, MenuButton, MenuContainer, MenuItem, TMenuPosition } from "@/components/ui/menu";

interface MenuProps {
  width?: number;
}

interface SplitButtonProps {
  buttonProps?: ButtonProps;
  menuAlignment?: TMenuPosition;
  menuButtonLabel?: string;
  menuItems?: React.ReactNode;
  menuProps?: MenuProps;
  children?: React.ReactNode;
}

const ArrowBottom = () => (
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

export const SplitButton = ({
  buttonProps,
  menuAlignment,
  menuButtonLabel,
  menuItems,
  menuProps,
  children
}: SplitButtonProps) => {
  return (
    <MenuContainer position={menuAlignment}>
      <Button
        className="rounded-r-none border-r-0 float-left focus:shadow-none"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          buttonProps?.onClick && buttonProps?.onClick(event);
        }}
        {...buttonProps}
      >
        {children}
      </Button>
      <MenuButton
        aria-label={menuButtonLabel}
        svgOnly
        variant={buttonProps?.variant}
        type={buttonProps?.type}
        size={buttonProps?.size}
        shadow={buttonProps?.shadow}
        className={clsx(
          "rounded-l-none focus:shadow-none",
          buttonProps?.type === "secondary" && "border-l-gray-300",
          (buttonProps?.type === "error" || buttonProps?.type === "warning") && "border-l border-l-gray-300",
          (buttonProps?.type === "primary" || buttonProps?.type === undefined) && "border-l border-l-[#404040] dark:border-[#cdcdcd]"
        )}
      >
        <ArrowBottom />
      </MenuButton>
      <Menu {...menuProps}>
        {menuItems}
      </Menu>
    </MenuContainer>
  );
};

interface MenuItemProps {
  onClick?: () => void;
}

interface SplitButtonMenuItemProps {
  title?: string;
  description?: string;
  menuItemProps?: MenuItemProps;
}

export const SplitButtonMenuItem = ({ title, description, menuItemProps }: SplitButtonMenuItemProps) => {
  return (
    <MenuItem className="h-fit p-2" {...menuItemProps}>
      <span className="flex flex-col">
        <span className="text-gray-1000 text-sm font-medium">{title}</span>
        <span className="text-gray-900 text-sm">{description}</span>
      </span>
    </MenuItem>
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
