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
project-banner.tsx
import React from "react";
import clsx from "clsx";

interface ProjectBannerProps {
  variant?: "success" | "warning" | "error";
  label: React.ReactNode;
  icon?: React.ReactNode;
  callToAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const ProjectBanner = ({
  variant = "success",
  label,
  icon,
  callToAction
}: ProjectBannerProps) => {
  return (
    <aside className={clsx(
      "flex z-30 gap-x-2 justify-center items-center py-2 border-y min-h-10 translate-y-[-1px] text-sm font-sans",
      variant === "success" && "text-blue-900 fill-blue-900 bg-blue-100 border-blue-400",
      variant === "warning" && "text-amber-900 fill-amber-900 bg-amber-100 border-amber-400",
      variant === "error" && "text-red-900 fill-red-900 bg-red-100 border-red-400"
    )}>
      <div className="flex flex-col gap-2 px-6 w-full md:justify-center md:flex-row md:items-center">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4">
            {icon}
          </div>
          <p>{label}</p>
        </div>
        {callToAction && (
          <div className="ml-6 md:ml-0">
            {callToAction.href && (
              <a
                href={callToAction.href}
                className={clsx(
                  "font-medium underline underline-offset-[5px] duration-100",
                  variant === "success" && "text-blue-1000 decoration-blue-400 hover:text-blue-900 hover:decoration-blue-500",
                  variant === "warning" && "text-amber-1000 decoration-amber-400 hover:text-amber-900 hover:decoration-amber-500",
                  variant === "error" && "text-red-1000 decoration-red-400 hover:text-red-900 hover:decoration-red-500"
                )}
              >
                {callToAction.label}
              </a>
            )}
            {callToAction.onClick && (
              <div
                onClick={callToAction.onClick}
                className={clsx(
                  "font-medium underline underline-offset-[5px] duration-100 cursor-pointer",
                  variant === "success" && "text-blue-1000 decoration-blue-400 hover:text-blue-900 hover:decoration-blue-500",
                  variant === "warning" && "text-amber-1000 decoration-amber-400 hover:text-amber-900 hover:decoration-amber-500",
                  variant === "error" && "text-red-1000 decoration-red-400 hover:text-red-900 hover:decoration-red-500"
                )}
              >
                {callToAction.label}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

code.demo.1752064016688.tsx
import { ProjectBanner } from "@/components/ui/project-banner";

const Warning = () => (
  <svg
    height="16"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.55846 2H7.44148L1.88975 13.5H14.1102L8.55846 2ZM9.90929 1.34788C9.65902 0.829456 9.13413 0.5 8.55846 0.5H7.44148C6.86581 0.5 6.34092 0.829454 6.09065 1.34787L0.192608 13.5653C-0.127943 14.2293 0.355835 15 1.09316 15H14.9068C15.6441 15 16.1279 14.2293 15.8073 13.5653L9.90929 1.34788ZM8.74997 4.75V5.5V8V8.75H7.24997V8V5.5V4.75H8.74997ZM7.99997 12C8.55226 12 8.99997 11.5523 8.99997 11C8.99997 10.4477 8.55226 10 7.99997 10C7.44769 10 6.99997 10.4477 6.99997 11C6.99997 11.5523 7.44769 12 7.99997 12Z"
    />
  </svg>
);

export default function ErrorDemo() {
  return <ProjectBanner
          callToAction={{
            label: "Add Credit Card",
            href: `/$`
          }}
          icon={<Warning />}
          label={
            <>
              Payment failed, update credit card information before your
              account is shut down
            </>
          }
          variant="error"
        />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/project-banner.tsx
import React from "react";
import clsx from "clsx";

interface ProjectBannerProps {
  variant?: "success" | "warning" | "error";
  label: React.ReactNode;
  icon?: React.ReactNode;
  callToAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const ProjectBanner = ({
  variant = "success",
  label,
  icon,
  callToAction
}: ProjectBannerProps) => {
  return (
    <aside className={clsx(
      "flex z-30 gap-x-2 justify-center items-center py-2 border-y min-h-10 translate-y-[-1px] text-sm font-sans",
      variant === "success" && "text-blue-900 fill-blue-900 bg-blue-100 border-blue-400",
      variant === "warning" && "text-amber-900 fill-amber-900 bg-amber-100 border-amber-400",
      variant === "error" && "text-red-900 fill-red-900 bg-red-100 border-red-400"
    )}>
      <div className="flex flex-col gap-2 px-6 w-full md:justify-center md:flex-row md:items-center">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4">
            {icon}
          </div>
          <p>{label}</p>
        </div>
        {callToAction && (
          <div className="ml-6 md:ml-0">
            {callToAction.href && (
              <a
                href={callToAction.href}
                className={clsx(
                  "font-medium underline underline-offset-[5px] duration-100",
                  variant === "success" && "text-blue-1000 decoration-blue-400 hover:text-blue-900 hover:decoration-blue-500",
                  variant === "warning" && "text-amber-1000 decoration-amber-400 hover:text-amber-900 hover:decoration-amber-500",
                  variant === "error" && "text-red-1000 decoration-red-400 hover:text-red-900 hover:decoration-red-500"
                )}
              >
                {callToAction.label}
              </a>
            )}
            {callToAction.onClick && (
              <div
                onClick={callToAction.onClick}
                className={clsx(
                  "font-medium underline underline-offset-[5px] duration-100 cursor-pointer",
                  variant === "success" && "text-blue-1000 decoration-blue-400 hover:text-blue-900 hover:decoration-blue-500",
                  variant === "warning" && "text-amber-1000 decoration-amber-400 hover:text-amber-900 hover:decoration-amber-500",
                  variant === "error" && "text-red-1000 decoration-red-400 hover:text-red-900 hover:decoration-red-500"
                )}
              >
                {callToAction.label}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
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
