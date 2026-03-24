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
badge-1.tsx
import React from "react";
import Link from "next/link";
import clsx from "clsx";

const variants = {
  gray: "bg-gray-700 text-white fill-white",
  "gray-subtle": "bg-gray-200 text-gray-1000 fill-gray-1000",
  blue: "bg-blue-700 text-white fill-white",
  "blue-subtle": "bg-blue-200 text-blue-900 fill-blue-900",
  purple: "bg-purple-700 text-white fill-white",
  "purple-subtle": "bg-purple-200 text-purple-900 fill-purple-900",
  amber: "bg-amber-700 text-black fill-black",
  "amber-subtle": "bg-amber-200 text-amber-900 fill-amber-900",
  red: "bg-red-700 text-white fill-white",
  "red-subtle": "bg-red-200 text-red-900 fill-red-900",
  pink: "bg-pink-700 text-white fill-white",
  "pink-subtle": "bg-pink-300 text-pink-900 fill-pink-900",
  green: "bg-green-700 text-white fill-white",
  "green-subtle": "bg-green-200 text-green-900 fill-green-900",
  teal: "bg-teal-700 text-white fill-white",
  "teal-subtle": "bg-teal-300 text-teal-900 fill-teal-900",
  inverted: "bg-gray-1000 text-gray-100 fill-gray-100",
  trial: "bg-gradient-to-br from-trial-start to-trial-end text-white fill-white",
  turbo: "bg-gradient-to-br from-turbo-start to-turbo-end text-white fill-white",
  pill: "bg-background text-foreground fill-foreground border border-gray-alpha-400"
};

const sizes = {
  sm: "text-[11px] h-5 px-1.5 tracking-[0.2px] gap-[3px]",
  md: "text-[12px] h-6 px-2.5 tracking-normal gap-1",
  lg: "text-[14px] h-8 px-3 tracking-normal gap-1.5"
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  capitalize?: boolean;
  icon?: React.ReactNode;
  as?: typeof Link;
  href?: string;
}

const Content = ({ icon, size, children }: BadgeProps) => (
  <>
    <style>
      {`
          .smIconContainer svg {
              width: 11px;
              height: 11px;
          }
          .mdIconContainer svg {
              width: 14px;
              height: 14px;
          }
          .lgIconContainer svg {
              width: 16px;
              height: 16px;
          }
        `}
    </style>
    {icon && <span className={`${size}IconContainer`}>{icon}</span>}
    {children}
  </>
);

export const Badge = ({ children, variant = "gray", size = "md", capitalize = true, icon, as, href }: BadgeProps) => {
  if (as === Link && href) {
    return (
      <Link
        className={clsx(
          "!no-underline inline-flex justify-center items-center shrink-0 rounded-[9999px] font-sans font-medium whitespace-nowrap tabular-nums",
          capitalize && "capitalize",
          variants[variant],
          sizes[size]
        )}
        href={href}
      >
        <Content icon={icon} size={size} children={children} />
      </Link>
    );
  }

  return (
    <div className={clsx(
      "inline-flex justify-center items-center shrink-0 rounded-[9999px] font-sans font-medium whitespace-nowrap tabular-nums",
      capitalize && "capitalize",
      variants[variant],
      sizes[size]
    )}>
      <Content icon={icon} size={size} children={children} />
    </div>
  );
};

code.demo.1751438779240.tsx
import { Badge } from "@/components/ui/badge-1";

export default function DefaultDemo() {
  return (
    <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Badge variant="gray">gray</Badge>
            <Badge variant="gray-subtle">gray-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="blue">blue</Badge>
            <Badge variant="blue-subtle">blue-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="purple">purple</Badge>
            <Badge variant="purple-subtle">purple-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="amber">amber</Badge>
            <Badge variant="amber-subtle">amber-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="red">red</Badge>
            <Badge variant="red-subtle">red-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="pink">pink</Badge>
            <Badge variant="pink-subtle">pink-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="green">green</Badge>
            <Badge variant="green-subtle">green-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="teal">teal</Badge>
            <Badge variant="teal-subtle">teal-subtle</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="inverted">inverted</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="trial">trial</Badge>
          </div>
          <div className="flex gap-1">
            <Badge variant="turbo">turborepo</Badge>
          </div>
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/badge-1.tsx
import React from "react";
import Link from "next/link";
import clsx from "clsx";

const variants = {
  gray: "bg-gray-700 text-white fill-white",
  "gray-subtle": "bg-gray-200 text-gray-1000 fill-gray-1000",
  blue: "bg-blue-700 text-white fill-white",
  "blue-subtle": "bg-blue-200 text-blue-900 fill-blue-900",
  purple: "bg-purple-700 text-white fill-white",
  "purple-subtle": "bg-purple-200 text-purple-900 fill-purple-900",
  amber: "bg-amber-700 text-black fill-black",
  "amber-subtle": "bg-amber-200 text-amber-900 fill-amber-900",
  red: "bg-red-700 text-white fill-white",
  "red-subtle": "bg-red-200 text-red-900 fill-red-900",
  pink: "bg-pink-700 text-white fill-white",
  "pink-subtle": "bg-pink-300 text-pink-900 fill-pink-900",
  green: "bg-green-700 text-white fill-white",
  "green-subtle": "bg-green-200 text-green-900 fill-green-900",
  teal: "bg-teal-700 text-white fill-white",
  "teal-subtle": "bg-teal-300 text-teal-900 fill-teal-900",
  inverted: "bg-gray-1000 text-gray-100 fill-gray-100",
  trial: "bg-gradient-to-br from-trial-start to-trial-end text-white fill-white",
  turbo: "bg-gradient-to-br from-turbo-start to-turbo-end text-white fill-white",
  pill: "bg-background text-foreground fill-foreground border border-gray-alpha-400"
};

const sizes = {
  sm: "text-[11px] h-5 px-1.5 tracking-[0.2px] gap-[3px]",
  md: "text-[12px] h-6 px-2.5 tracking-normal gap-1",
  lg: "text-[14px] h-8 px-3 tracking-normal gap-1.5"
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  capitalize?: boolean;
  icon?: React.ReactNode;
  as?: typeof Link;
  href?: string;
}

const Content = ({ icon, size, children }: BadgeProps) => (
  <>
    <style>
      {`
          .smIconContainer svg {
              width: 11px;
              height: 11px;
          }
          .mdIconContainer svg {
              width: 14px;
              height: 14px;
          }
          .lgIconContainer svg {
              width: 16px;
              height: 16px;
          }
        `}
    </style>
    {icon && <span className={`${size}IconContainer`}>{icon}</span>}
    {children}
  </>
);

export const Badge = ({ children, variant = "gray", size = "md", capitalize = true, icon, as, href }: BadgeProps) => {
  if (as === Link && href) {
    return (
      <Link
        className={clsx(
          "!no-underline inline-flex justify-center items-center shrink-0 rounded-[9999px] font-sans font-medium whitespace-nowrap tabular-nums",
          capitalize && "capitalize",
          variants[variant],
          sizes[size]
        )}
        href={href}
      >
        <Content icon={icon} size={size} children={children} />
      </Link>
    );
  }

  return (
    <div className={clsx(
      "inline-flex justify-center items-center shrink-0 rounded-[9999px] font-sans font-medium whitespace-nowrap tabular-nums",
      capitalize && "capitalize",
      variants[variant],
      sizes[size]
    )}>
      <Content icon={icon} size={size} children={children} />
    </div>
  );
};
```

Install NPM dependencies:
```bash
clsx, next
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
