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
step-breadcrumb.tsx
"use client"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepBreadcrumbProps {
  className?: string
  steps?: Array<{ id: string; name: string; status: "complete" | "current" | "upcoming" }>
}

export function Breadcrumb({
  className,
  steps = [
    { id: "01", name: "Cart", status: "complete" },
    { id: "02", name: "Shipping", status: "current" },
    { id: "03", name: "Payment", status: "upcoming" },
    { id: "04", name: "Confirmation", status: "upcoming" },
  ],
}: StepBreadcrumbProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  return (
    <nav
      className={cn(
        "p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 overflow-x-auto scrollbar-hide",
        className,
      )}
      aria-label="Progress"
    >
      <ol className={cn("flex w-full min-w-max", isMobile ? "flex-col space-y-3" : "items-center justify-between")}>
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("relative", !isMobile && stepIdx !== steps.length - 1 && "pr-8 md:pr-16")}>
            {!isMobile && stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-7 -ml-px mt-0.5 h-0.5 w-full",
                  step.status === "complete" ? "bg-green-600 dark:bg-green-500" : "bg-gray-300 dark:bg-zinc-700",
                )}
                aria-hidden="true"
              />
            )}
            <div className={cn("group flex", isMobile ? "items-center" : "items-start")}>
              <span className="flex items-center">
                <span
                  className={cn(
                    "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full",
                    step.status === "complete"
                      ? "bg-green-600 dark:bg-green-500 text-white"
                      : step.status === "current"
                        ? "border-2 border-green-600 dark:border-green-500 bg-white dark:bg-zinc-900"
                        : "border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900",
                  )}
                >
                  {step.status === "complete" ? (
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" aria-hidden="true" />
                  ) : (
                    <span
                      className={cn(
                        "text-[10px] sm:text-xs",
                        step.status === "current"
                          ? "text-green-600 dark:text-green-500"
                          : "text-gray-500 dark:text-zinc-500",
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </span>
              </span>
              <span className="ml-2 text-[10px] sm:text-xs">
                <span
                  className={cn(
                    "font-medium",
                    step.status === "complete"
                      ? "text-gray-900 dark:text-zinc-100"
                      : step.status === "current"
                        ? "text-green-600 dark:text-green-500"
                        : "text-gray-500 dark:text-zinc-500",
                  )}
                >
                  {step.name}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}


code.demo.1756723802123.tsx
import { Breadcrumb } from "@/components/ui/step-breadcrumb";

export default function DemoOne() {
  return <Breadcrumb
        steps={[
            { id: "01", name: "Cart", status: "complete" },
            { id: "02", name: "Shipping", status: "current" },
            { id: "03", name: "Payment", status: "upcoming" },
            { id: "04", name: "Confirmation", status: "upcoming" },
          ]}
      />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/step-breadcrumb.tsx
"use client"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepBreadcrumbProps {
  className?: string
  steps?: Array<{ id: string; name: string; status: "complete" | "current" | "upcoming" }>
}

export function Breadcrumb({
  className,
  steps = [
    { id: "01", name: "Cart", status: "complete" },
    { id: "02", name: "Shipping", status: "current" },
    { id: "03", name: "Payment", status: "upcoming" },
    { id: "04", name: "Confirmation", status: "upcoming" },
  ],
}: StepBreadcrumbProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  return (
    <nav
      className={cn(
        "p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 overflow-x-auto scrollbar-hide",
        className,
      )}
      aria-label="Progress"
    >
      <ol className={cn("flex w-full min-w-max", isMobile ? "flex-col space-y-3" : "items-center justify-between")}>
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("relative", !isMobile && stepIdx !== steps.length - 1 && "pr-8 md:pr-16")}>
            {!isMobile && stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-7 -ml-px mt-0.5 h-0.5 w-full",
                  step.status === "complete" ? "bg-green-600 dark:bg-green-500" : "bg-gray-300 dark:bg-zinc-700",
                )}
                aria-hidden="true"
              />
            )}
            <div className={cn("group flex", isMobile ? "items-center" : "items-start")}>
              <span className="flex items-center">
                <span
                  className={cn(
                    "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full",
                    step.status === "complete"
                      ? "bg-green-600 dark:bg-green-500 text-white"
                      : step.status === "current"
                        ? "border-2 border-green-600 dark:border-green-500 bg-white dark:bg-zinc-900"
                        : "border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900",
                  )}
                >
                  {step.status === "complete" ? (
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" aria-hidden="true" />
                  ) : (
                    <span
                      className={cn(
                        "text-[10px] sm:text-xs",
                        step.status === "current"
                          ? "text-green-600 dark:text-green-500"
                          : "text-gray-500 dark:text-zinc-500",
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </span>
              </span>
              <span className="ml-2 text-[10px] sm:text-xs">
                <span
                  className={cn(
                    "font-medium",
                    step.status === "complete"
                      ? "text-gray-900 dark:text-zinc-100"
                      : step.status === "current"
                        ? "text-green-600 dark:text-green-500"
                        : "text-gray-500 dark:text-zinc-500",
                  )}
                >
                  {step.name}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

```

Install NPM dependencies:
```bash
lucide-react
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
