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
avatar-chips.tsx
"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// simple utility like shadcn's `cn`
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type ChipItem = {
  label: string;
  avatar?: string;   // image url
  initial?: string;  // fallback letter
  color?: "blue" | "green" | "gray";
  variant?: "filled" | "outlined";
};

interface AvatarChipsProps {
  chips: ChipItem[];
  className?: string;
  onChipClick?: (chip: ChipItem) => void;
}

const colorClasses: Record<
  string,
  { filled: string; outlined: string }
> = {
  blue: {
    filled: "!bg-blue-100 !text-blue-800 dark:!bg-blue-900 dark:!text-blue-100",
    outlined:
      "!border !border-blue-300 !text-blue-700 dark:!border-blue-600 dark:!text-blue-200",
  },
  green: {
    filled: "!bg-green-100 !text-green-800 dark:!bg-green-900 dark:!text-green-100",
    outlined:
      "!border !border-green-300 !text-green-700 dark:!border-green-600 dark:!text-green-200",
  },
  gray: {
    filled: "!bg-gray-100 !text-gray-800 dark:!bg-gray-800 dark:!text-gray-100",
    outlined:
      "!border !border-gray-300 !text-gray-700 dark:!border-gray-600 dark:!text-gray-200",
  },
};

function AvatarChips({ chips, className, onChipClick }: AvatarChipsProps) {
  return (
    <div
      className={cn(
        "flex w-full mx-auto items-center justify-between p-4 bg-white dark:bg-gray-900",
        className
      )}
    >
      <Stack direction="row" spacing={2}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            avatar={
              chip.avatar ? (
                <Avatar alt={chip.label} src={chip.avatar} />
              ) : (
                <Avatar>{chip.initial || chip.label.charAt(0)}</Avatar>
              )
            }
            label={chip.label}
            variant={chip.variant === "outlined" ? "outlined" : "filled"}
            onClick={() => onChipClick?.(chip)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer",
              chip.color
                ? colorClasses[chip.color][chip.variant || "filled"]
                : ""
            )}
          />
        ))}
      </Stack>
    </div>
  );
}


export function AvatarChipsDemo() {
  const users = [
    { label: "Mathew", initial: "M", color: "blue" },
    {
      label: "Natacha",
      avatar: "/static/images/avatar/1.jpg",
      color: "gray",
      variant: "outlined",
    },
    {
      label: "Sophie",
      avatar: "/static/images/avatar/2.jpg",
      color: "green",
    },
  ];

  return (
    <div><AvatarChips
      chips={users}
      onChipClick={(chip) => alert(`Clicked on ${chip.label}`)}
    /></div>
  );
}


code.demo.1757572077316.tsx
import { AvatarChipsDemo } from "@/components/ui/avatar-chips";

export default function DemoOne() {
  return <AvatarChipsDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-chips.tsx
"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// simple utility like shadcn's `cn`
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type ChipItem = {
  label: string;
  avatar?: string;   // image url
  initial?: string;  // fallback letter
  color?: "blue" | "green" | "gray";
  variant?: "filled" | "outlined";
};

interface AvatarChipsProps {
  chips: ChipItem[];
  className?: string;
  onChipClick?: (chip: ChipItem) => void;
}

const colorClasses: Record<
  string,
  { filled: string; outlined: string }
> = {
  blue: {
    filled: "!bg-blue-100 !text-blue-800 dark:!bg-blue-900 dark:!text-blue-100",
    outlined:
      "!border !border-blue-300 !text-blue-700 dark:!border-blue-600 dark:!text-blue-200",
  },
  green: {
    filled: "!bg-green-100 !text-green-800 dark:!bg-green-900 dark:!text-green-100",
    outlined:
      "!border !border-green-300 !text-green-700 dark:!border-green-600 dark:!text-green-200",
  },
  gray: {
    filled: "!bg-gray-100 !text-gray-800 dark:!bg-gray-800 dark:!text-gray-100",
    outlined:
      "!border !border-gray-300 !text-gray-700 dark:!border-gray-600 dark:!text-gray-200",
  },
};

function AvatarChips({ chips, className, onChipClick }: AvatarChipsProps) {
  return (
    <div
      className={cn(
        "flex w-full mx-auto items-center justify-between p-4 bg-white dark:bg-gray-900",
        className
      )}
    >
      <Stack direction="row" spacing={2}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            avatar={
              chip.avatar ? (
                <Avatar alt={chip.label} src={chip.avatar} />
              ) : (
                <Avatar>{chip.initial || chip.label.charAt(0)}</Avatar>
              )
            }
            label={chip.label}
            variant={chip.variant === "outlined" ? "outlined" : "filled"}
            onClick={() => onChipClick?.(chip)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer",
              chip.color
                ? colorClasses[chip.color][chip.variant || "filled"]
                : ""
            )}
          />
        ))}
      </Stack>
    </div>
  );
}


export function AvatarChipsDemo() {
  const users = [
    { label: "Mathew", initial: "M", color: "blue" },
    {
      label: "Natacha",
      avatar: "/static/images/avatar/1.jpg",
      color: "gray",
      variant: "outlined",
    },
    {
      label: "Sophie",
      avatar: "/static/images/avatar/2.jpg",
      color: "green",
    },
  ];

  return (
    <div><AvatarChips
      chips={users}
      onChipClick={(chip) => alert(`Clicked on ${chip.label}`)}
    /></div>
  );
}

```

Install NPM dependencies:
```bash
@mui/material
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
