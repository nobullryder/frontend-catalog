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
shine-border.tsx
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Flame } from "lucide-react";
import {cn} from "@/lib/utils";

/* ============================= */
/* ShineBorder (Reusable Wrapper) */
/* ============================= */

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  gradient?: string;
};

const ShineBorder = ({
  children,
  className,
  borderWidth = 2,
  duration = 3,
  gradient = "from-blue-500 via-red-500 to-teal-400",
}: ShineBorderProps) => {
  return (
    <div
      className={cn("relative rounded-2xl", className)}
      style={{ padding: borderWidth }}
    >
      {/* Animated Gradient Layer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div
          className={cn(
            "absolute -inset-full blur-sm animate-spin bg-conic",
            gradient
          )}
          style={{ animationDuration: `${duration}s` }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative rounded-2xl bg-card">
        {children}
      </div>
    </div>
  );
};

/* ============================= */
/* Pricing Card */
/* ============================= */

type PricingPlan = {
  plan_name: string;
  plan_descp: string;
  plan_price: number;
  plan_feature: string[];
};

const pricingData: PricingPlan = {
  plan_name: "Pro Plus",
  plan_descp:
    "Scale with confidence using premium blocks, templates, and included strategy guidance.",
  plan_price: 3800,
  plan_feature: [
    "Everything in Pro",
    "Premium templates & more sections",
    "Early access to new components",
    "Private Discord & priority support",
    "Monthly strategy & growth sessions",
  ],
};

const PricingCard = ({
  plan_name,
  plan_descp,
  plan_price,
  plan_feature,
}: PricingPlan) => {
  return (
    <Card className="relative h-full rounded-2xl p-8 gap-8 border-0 ring-0">
      <CardHeader className="p-0">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-medium text-primary">
              {plan_name}
            </CardTitle>
            <Badge className="py-1 px-3 text-sm font-medium leading-5 w-fit h-7 flex items-center gap-1.5 [&>svg]:size-4!">
              <Flame size={16} /> Recommend
            </Badge>
          </div>
          <CardDescription className="text-base font-normal max-w-2xl">
            {plan_descp}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-8 p-0">
        <div className="flex items-baseline gap-1">
          <span className="text-foreground text-4xl sm:text-5xl font-medium">
            ${plan_price}
          </span>
          <span className="text-muted-foreground text-base font-normal">
            /month
          </span>
        </div>

        <Separator />

        <ul className="flex flex-col gap-4 flex-1">
          {plan_feature.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-base font-normal text-muted-foreground"
            >
              <Check className="size-4 text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button className="w-full h-12">Get started</Button>
      </CardContent>
    </Card>
  );
};

/* ============================= */
/* Demo */
/* ============================= */

export default function ShineBorderDemo() {
  return (
    <ShineBorder
      borderWidth={2}
      duration={4}
      gradient="from-blue-500 via-red-500 to-teal-400"
      className="w-fit"
    >
      <PricingCard {...pricingData} />
    </ShineBorder>
  );
}


code.demo.1772718920490.tsx
import ShineBorderDemo from "@/components/ui/shine-border";

export default function DemoOne() {
  return (
    <div className="p-16 flex justify-center">
      <div className="max-w-sm w-full">
        <ShineBorderDemo />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/shine-border.tsx
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Flame } from "lucide-react";
import {cn} from "@/lib/utils";

/* ============================= */
/* ShineBorder (Reusable Wrapper) */
/* ============================= */

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  gradient?: string;
};

const ShineBorder = ({
  children,
  className,
  borderWidth = 2,
  duration = 3,
  gradient = "from-blue-500 via-red-500 to-teal-400",
}: ShineBorderProps) => {
  return (
    <div
      className={cn("relative rounded-2xl", className)}
      style={{ padding: borderWidth }}
    >
      {/* Animated Gradient Layer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div
          className={cn(
            "absolute -inset-full blur-sm animate-spin bg-conic",
            gradient
          )}
          style={{ animationDuration: `${duration}s` }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative rounded-2xl bg-card">
        {children}
      </div>
    </div>
  );
};

/* ============================= */
/* Pricing Card */
/* ============================= */

type PricingPlan = {
  plan_name: string;
  plan_descp: string;
  plan_price: number;
  plan_feature: string[];
};

const pricingData: PricingPlan = {
  plan_name: "Pro Plus",
  plan_descp:
    "Scale with confidence using premium blocks, templates, and included strategy guidance.",
  plan_price: 3800,
  plan_feature: [
    "Everything in Pro",
    "Premium templates & more sections",
    "Early access to new components",
    "Private Discord & priority support",
    "Monthly strategy & growth sessions",
  ],
};

const PricingCard = ({
  plan_name,
  plan_descp,
  plan_price,
  plan_feature,
}: PricingPlan) => {
  return (
    <Card className="relative h-full rounded-2xl p-8 gap-8 border-0 ring-0">
      <CardHeader className="p-0">
        <div className="flex flex-col gap-3 self-stretch">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-medium text-primary">
              {plan_name}
            </CardTitle>
            <Badge className="py-1 px-3 text-sm font-medium leading-5 w-fit h-7 flex items-center gap-1.5 [&>svg]:size-4!">
              <Flame size={16} /> Recommend
            </Badge>
          </div>
          <CardDescription className="text-base font-normal max-w-2xl">
            {plan_descp}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-8 p-0">
        <div className="flex items-baseline gap-1">
          <span className="text-foreground text-4xl sm:text-5xl font-medium">
            ${plan_price}
          </span>
          <span className="text-muted-foreground text-base font-normal">
            /month
          </span>
        </div>

        <Separator />

        <ul className="flex flex-col gap-4 flex-1">
          {plan_feature.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-base font-normal text-muted-foreground"
            >
              <Check className="size-4 text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button className="w-full h-12">Get started</Button>
      </CardContent>
    </Card>
  );
};

/* ============================= */
/* Demo */
/* ============================= */

export default function ShineBorderDemo() {
  return (
    <ShineBorder
      borderWidth={2}
      duration={4}
      gradient="from-blue-500 via-red-500 to-teal-400"
      className="w-fit"
    >
      <PricingCard {...pricingData} />
    </ShineBorder>
  );
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
