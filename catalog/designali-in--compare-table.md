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
compare-table.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const features = [
  { name: "Basic Designs", included: "starter" },
  { name: "Up to 5 team members", included: "starter" },
  { name: "Changes requests", included: "starter" },
  { name: "Advanced Analytics", included: "pro" },
  { name: "Up to 20 team members", included: "pro" },
  { name: "Priority support", included: "pro" },
  { name: "Custom integrations", included: "all" },
  { name: "Unlimited team members", included: "all" },
  { name: "24/7 phone support", included: "all" },
]

const plans = [
  {
    name: "Free",
    price: { monthly: 15, yearly: 144 },
    level: "starter",
  },
  {
    name: "Pro",
    price: { monthly: 49, yearly: 470 },
    level: "pro",
    popular: true,
  },
  {
    name: "Startup",
    price: { monthly: 99, yearly: 990 },
    level: "all",
  },
]

export function CompareTable() {
  return <PricingTable features={features} plans={plans} />
}

type PlanLevel = "starter" | "pro" | "all" | string

interface PricingFeature {
  name: string
  included: PlanLevel | null
}

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
}

interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: PricingFeature[]
  plans: PricingPlan[]
}

export function PricingTable({ features, plans, ...props }: PricingTableProps) {
  return (
    <section>
      <div className={"border-x"} {...props}>
        <div className="divide-y last:border-b">
          <div className="sticky top-20 z-10 mt-2 flex items-center border-t bg-neutral-50 pl-6 dark:bg-neutral-900">
            <div className="flex-1 text-sm font-medium">Features</div>
            <div className="flex items-center text-sm">
              {plans.map((plan) => (
                <div
                  key={plan.level}
                  className="w-20 border-r p-6 text-center font-medium first:border-l last:border-0 md:w-40 lg:w-60 xl:w-68"
                >
                  {plan.name}
                </div>
              ))}
            </div>
          </div>

          {features.map((feature) => (
            <div
              key={feature.name}
              className={cn("flex items-center pl-6 transition-colors")}
            >
              <div className="flex-1 pr-4 text-sm">{feature.name}</div>
              <div className="flex items-center text-sm">
                {plans.map((plan) => (
                  <div
                    key={plan.level}
                    className={cn(
                      "flex w-20 justify-center border-r py-6 first:border-l last:border-0 md:w-40 lg:w-60 xl:w-68",
                      plan.level && "font-medium"
                    )}
                  >
                    {shouldShowCheck(feature.included, plan.level) ? (
                      <Check className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <span className="text-neutral-300 dark:text-neutral-700">
                        -
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function shouldShowCheck(
  included: PricingFeature["included"],
  level: string
): boolean {
  if (included === "all") return true
  if (included === "pro" && (level === "pro" || level === "all")) return true
  if (
    included === "starter" &&
    (level === "starter" || level === "pro" || level === "all")
  )
    return true
  return false
}


code.demo.1756979237099.tsx
import { CompareTable } from "@/components/ui/compare-table";

export default function DemoOne() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <CompareTable />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/compare-table.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const features = [
  { name: "Basic Designs", included: "starter" },
  { name: "Up to 5 team members", included: "starter" },
  { name: "Changes requests", included: "starter" },
  { name: "Advanced Analytics", included: "pro" },
  { name: "Up to 20 team members", included: "pro" },
  { name: "Priority support", included: "pro" },
  { name: "Custom integrations", included: "all" },
  { name: "Unlimited team members", included: "all" },
  { name: "24/7 phone support", included: "all" },
]

const plans = [
  {
    name: "Free",
    price: { monthly: 15, yearly: 144 },
    level: "starter",
  },
  {
    name: "Pro",
    price: { monthly: 49, yearly: 470 },
    level: "pro",
    popular: true,
  },
  {
    name: "Startup",
    price: { monthly: 99, yearly: 990 },
    level: "all",
  },
]

export function CompareTable() {
  return <PricingTable features={features} plans={plans} />
}

type PlanLevel = "starter" | "pro" | "all" | string

interface PricingFeature {
  name: string
  included: PlanLevel | null
}

interface PricingPlan {
  name: string
  level: PlanLevel
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
}

interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: PricingFeature[]
  plans: PricingPlan[]
}

export function PricingTable({ features, plans, ...props }: PricingTableProps) {
  return (
    <section>
      <div className={"border-x"} {...props}>
        <div className="divide-y last:border-b">
          <div className="sticky top-20 z-10 mt-2 flex items-center border-t bg-neutral-50 pl-6 dark:bg-neutral-900">
            <div className="flex-1 text-sm font-medium">Features</div>
            <div className="flex items-center text-sm">
              {plans.map((plan) => (
                <div
                  key={plan.level}
                  className="w-20 border-r p-6 text-center font-medium first:border-l last:border-0 md:w-40 lg:w-60 xl:w-68"
                >
                  {plan.name}
                </div>
              ))}
            </div>
          </div>

          {features.map((feature) => (
            <div
              key={feature.name}
              className={cn("flex items-center pl-6 transition-colors")}
            >
              <div className="flex-1 pr-4 text-sm">{feature.name}</div>
              <div className="flex items-center text-sm">
                {plans.map((plan) => (
                  <div
                    key={plan.level}
                    className={cn(
                      "flex w-20 justify-center border-r py-6 first:border-l last:border-0 md:w-40 lg:w-60 xl:w-68",
                      plan.level && "font-medium"
                    )}
                  >
                    {shouldShowCheck(feature.included, plan.level) ? (
                      <Check className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <span className="text-neutral-300 dark:text-neutral-700">
                        -
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function shouldShowCheck(
  included: PricingFeature["included"],
  level: string
): boolean {
  if (included === "all") return true
  if (included === "pro" && (level === "pro" || level === "all")) return true
  if (
    included === "starter" &&
    (level === "starter" || level === "pro" || level === "all")
  )
    return true
  return false
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
