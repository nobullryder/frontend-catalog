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
pricing-card-component.tsx
// component-variation1.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import NumberFlow from "@number-flow/react";

type Plan = {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
};

interface Props {
  plans: Plan[];
  heading?: string;
  subheading?: string;
}

export const Component = ({ 
  plans, 
  heading = "Pricing Made Simple", 
  subheading = "Pick a plan that matches your needs." 
}: Props) => {
  return (
    <section className="container py-20">
      <div className="mb-12 text-center space-y-3">
        <h2 className="text-4xl font-bold">{heading}</h2>
        <p className="text-muted-foreground">{subheading}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? -2 : 2 }}
            className={cn(
              "relative flex w-[300px] flex-col rounded-2xl border p-6 shadow-md bg-card transition",
              plan.isPopular && "border-primary shadow-lg scale-105"
            )}
          >
            {plan.isPopular && (
              <span className="absolute right-3 top-3 flex items-center rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                <Star className="mr-1 h-3 w-3 fill-current" /> Popular
              </span>
            )}
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <div className="mt-4 flex items-end gap-1">
              <NumberFlow
                value={Number(plan.price)}
                formatter={(v) => `$${v}`}
                className="text-4xl font-bold"
              />
              <span className="text-sm text-muted-foreground">
                / {plan.period}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-6 w-full"
              )}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


code.demo.1759611554406.tsx
// demo.tsx
import { Component } from "@/components/ui/pricing-card-component";

export default function DemoPricing() {
  return (
    <Component
      plans={[
        {
          name: "Starter",
          price: "19",
          yearlyPrice: "15",
          period: "month",
          features: ["Basic analytics", "100 leads", "Email support"],
          description: "Great for small teams getting started.",
          buttonText: "Get Started",
          href: "#",
          isPopular: false,
        },
        {
          name: "Pro",
          price: "49",
          yearlyPrice: "39",
          period: "month",
          features: ["Advanced analytics", "1000 leads", "Priority support"],
          description: "Perfect for growing businesses.",
          buttonText: "Upgrade",
          href: "#",
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "99",
          yearlyPrice: "79",
          period: "month",
          features: ["Unlimited leads", "Dedicated account manager"],
          description: "Best for large organizations.",
          buttonText: "Contact Sales",
          href: "#",
          isPopular: false,
        },
      ]}
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-card-component.tsx
// component-variation1.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import NumberFlow from "@number-flow/react";

type Plan = {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
};

interface Props {
  plans: Plan[];
  heading?: string;
  subheading?: string;
}

export const Component = ({ 
  plans, 
  heading = "Pricing Made Simple", 
  subheading = "Pick a plan that matches your needs." 
}: Props) => {
  return (
    <section className="container py-20">
      <div className="mb-12 text-center space-y-3">
        <h2 className="text-4xl font-bold">{heading}</h2>
        <p className="text-muted-foreground">{subheading}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? -2 : 2 }}
            className={cn(
              "relative flex w-[300px] flex-col rounded-2xl border p-6 shadow-md bg-card transition",
              plan.isPopular && "border-primary shadow-lg scale-105"
            )}
          >
            {plan.isPopular && (
              <span className="absolute right-3 top-3 flex items-center rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                <Star className="mr-1 h-3 w-3 fill-current" /> Popular
              </span>
            )}
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <div className="mt-4 flex items-end gap-1">
              <NumberFlow
                value={Number(plan.price)}
                formatter={(v) => `$${v}`}
                className="text-4xl font-bold"
              />
              <span className="text-sm text-muted-foreground">
                / {plan.period}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-6 w-full"
              )}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

```

Install NPM dependencies:
```bash
framer-motion, next, lucide-react, @number-flow/react
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
