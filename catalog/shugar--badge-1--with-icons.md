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

code.demo.1751438779241.tsx
import { Badge } from "@/components/ui/badge-1";

const Shield = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 4.057V9.52717C3.5 10.9221 4.27429 12.2018 5.50997 12.849L8 14.1533L10.49 12.849C11.7257 12.2018 12.5 10.9221 12.5 9.52717V4.057C12.3094 4.00405 12.1074 3.9513 11.8932 3.89539C11.746 3.85699 11.5932 3.81709 11.4344 3.7746C10.8476 3.61758 10.204 3.43066 9.61101 3.17017C9.02666 2.91351 8.44336 2.56529 8 2.05704C7.55664 2.56529 6.97334 2.91351 6.38899 3.17017C5.79596 3.43066 5.15243 3.61758 4.5656 3.7746C4.40682 3.81709 4.25396 3.85699 4.10684 3.89539C3.89262 3.9513 3.69055 4.00405 3.5 4.057ZM7.25 0C7.25 0.467199 7.10537 0.796772 6.87802 1.06132C6.6357 1.34329 6.26955 1.58432 5.78576 1.79681C5.30375 2.00853 4.75351 2.17155 4.17787 2.32558C4.04421 2.36134 3.90727 2.39707 3.76932 2.43305C3.33687 2.54586 2.89458 2.66124 2.51283 2.78849L2 2.95943V3.5V9.52717C2 11.4801 3.084 13.2716 4.81396 14.1778L7.65199 15.6644L8 15.8467L8.34801 15.6644L11.186 14.1778C12.916 13.2716 14 11.4801 14 9.52717V3.5V2.95943L13.4872 2.78849C13.1054 2.66124 12.6631 2.54586 12.2307 2.43305C12.0927 2.39707 11.9558 2.36134 11.8221 2.32558C11.2465 2.17155 10.6962 2.00853 10.2142 1.79681C9.73045 1.58432 9.3643 1.34329 9.12198 1.06132C8.89463 0.796772 8.75 0.467199 8.75 0H7.25Z"
    />
  </svg>
);

export default function WithIconsDemo() {
  return (
    <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="gray" size="lg">gray</Badge>
            <Badge icon={<Shield />} variant="gray" size="md">gray</Badge>
            <Badge icon={<Shield />} variant="gray" size="sm">gray</Badge>
            <Badge icon={<Shield />} variant="gray-subtle" size="sm">gray-subtle</Badge>
            <Badge icon={<Shield />} variant="gray-subtle" size="md">gray-subtle</Badge>
            <Badge icon={<Shield />} variant="gray-subtle" size="lg">gray-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="blue" size="lg">blue</Badge>
            <Badge icon={<Shield />} variant="blue" size="md">blue</Badge>
            <Badge icon={<Shield />} variant="blue" size="sm">blue</Badge>
            <Badge icon={<Shield />} variant="blue-subtle" size="sm">blue-subtle</Badge>
            <Badge icon={<Shield />} variant="blue-subtle" size="md">blue-subtle</Badge>
            <Badge icon={<Shield />} variant="blue-subtle" size="lg">blue-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="purple" size="lg">purple</Badge>
            <Badge icon={<Shield />} variant="purple" size="md">purple</Badge>
            <Badge icon={<Shield />} variant="purple" size="sm">purple</Badge>
            <Badge icon={<Shield />} variant="purple-subtle" size="sm">purple-subtle</Badge>
            <Badge icon={<Shield />} variant="purple-subtle" size="md">purple-subtle</Badge>
            <Badge icon={<Shield />} variant="purple-subtle" size="lg">purple-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="amber" size="lg">amber</Badge>
            <Badge icon={<Shield />} variant="amber" size="md">amber</Badge>
            <Badge icon={<Shield />} variant="amber" size="sm">amber</Badge>
            <Badge icon={<Shield />} variant="amber-subtle" size="sm">amber-subtle</Badge>
            <Badge icon={<Shield />} variant="amber-subtle" size="md">amber-subtle</Badge>
            <Badge icon={<Shield />} variant="amber-subtle" size="lg">amber-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="red" size="lg">red</Badge>
            <Badge icon={<Shield />} variant="red" size="md">red</Badge>
            <Badge icon={<Shield />} variant="red" size="sm">red</Badge>
            <Badge icon={<Shield />} variant="red-subtle" size="sm">red-subtle</Badge>
            <Badge icon={<Shield />} variant="red-subtle" size="md">red-subtle</Badge>
            <Badge icon={<Shield />} variant="red-subtle" size="lg">red-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="pink" size="lg">pink</Badge>
            <Badge icon={<Shield />} variant="pink" size="md">pink</Badge>
            <Badge icon={<Shield />} variant="pink" size="sm">pink</Badge>
            <Badge icon={<Shield />} variant="pink-subtle" size="sm">pink-subtle</Badge>
            <Badge icon={<Shield />} variant="pink-subtle" size="md">pink-subtle</Badge>
            <Badge icon={<Shield />} variant="pink-subtle" size="lg">pink-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="green" size="lg">green</Badge>
            <Badge icon={<Shield />} variant="green" size="md">green</Badge>
            <Badge icon={<Shield />} variant="green" size="sm">green</Badge>
            <Badge icon={<Shield />} variant="green-subtle" size="sm">green-subtle</Badge>
            <Badge icon={<Shield />} variant="green-subtle" size="md">green-subtle</Badge>
            <Badge icon={<Shield />} variant="green-subtle" size="lg">green-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="teal" size="lg">teal</Badge>
            <Badge icon={<Shield />} variant="teal" size="md">teal</Badge>
            <Badge icon={<Shield />} variant="teal" size="sm">teal</Badge>
            <Badge icon={<Shield />} variant="teal-subtle" size="sm">teal-subtle</Badge>
            <Badge icon={<Shield />} variant="teal-subtle" size="md">teal-subtle</Badge>
            <Badge icon={<Shield />} variant="teal-subtle" size="lg">teal-subtle</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="inverted" size="lg">inverted</Badge>
            <Badge icon={<Shield />} variant="inverted" size="md">inverted</Badge>
            <Badge icon={<Shield />} variant="inverted" size="sm">inverted</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="trial" size="lg">trial</Badge>
            <Badge icon={<Shield />} variant="trial" size="md">trial</Badge>
            <Badge icon={<Shield />} variant="trial" size="sm">trial</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Badge icon={<Shield />} variant="turbo" size="lg">turborepo</Badge>
            <Badge icon={<Shield />} variant="turbo" size="md">turborepo</Badge>
            <Badge icon={<Shield />} variant="turbo" size="sm">turborepo</Badge>
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
