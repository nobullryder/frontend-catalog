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
import { Tooltip } from "@/components/ui/tooltip-1";

const RotateCounterClockwise = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 8C13.5 4.96643 11.0257 2.5 7.96452 2.5C5.42843 2.5 3.29365 4.19393 2.63724 6.5H5.25H6V8H5.25H0.75C0.335787 8 0 7.66421 0 7.25V2.75V2H1.5V2.75V5.23347C2.57851 2.74164 5.06835 1 7.96452 1C11.8461 1 15 4.13001 15 8C15 11.87 11.8461 15 7.96452 15C5.62368 15 3.54872 13.8617 2.27046 12.1122L1.828 11.5066L3.03915 10.6217L3.48161 11.2273C4.48831 12.6051 6.12055 13.5 7.96452 13.5C11.0257 13.5 13.5 11.0336 13.5 8Z"
    />
  </svg>
);

export default function WarningDemo() {
  return <ProjectBanner
          callToAction={{
            label: "Undo Rollback",
            onClick: () => {
              alert("Button clicked");
            }
          }}
          icon={<RotateCounterClockwise />}
          label={
            <div className="flex gap-1">
              This project was rolled back by
              <Tooltip
                className="underline decoration-dashed underline-offset-[5px]"
                text="Yesterday for project marketing-website"
              >
                @johnphamous
              </Tooltip>
            </div>
          }
          variant="warning"
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
