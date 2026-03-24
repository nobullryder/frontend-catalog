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
pricing-card.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, HelpCircle, Sparkles } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

interface PricingCardProps {
  title?: string;
  description?: string;
  price?: {
    monthly: number;
    annually: number;
  };
  features?: PricingFeature[];
  popular?: boolean;
  highlighted?: boolean;
  ctaText?: string;
  discount?: number;
}

export const Component = ({
  title = "Professional",
  description = "Perfect for growing businesses and teams.",
  price = {
    monthly: 29,
    annually: 290,
  },
  features = [
    { name: "Up to 10 team members", included: true, highlight: true },
    { name: "Unlimited projects", included: true, highlight: true },
    { name: "Advanced analytics", included: true },
    { name: "Priority support", included: true },
    {
      name: "Custom integrations",
      included: false,
      tooltip: "Available on Enterprise plan",
    },
    { name: "AI-powered insights", included: false },
  ],
  popular = true,
  highlighted = false,
  ctaText = "Get Started",
  discount = 15,
}: PricingCardProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [isHovered, setIsHovered] = useState(false);

  const currentPrice =
    billingCycle === "monthly" ? price.monthly : price.annually;
  const annualSavings = price.monthly * 12 - price.annually;

  return (
    <Card
      className={`w-full max-w-sm relative overflow-hidden transition-all duration-300 ${
        highlighted ? "border-primary shadow-lg" : ""
      } ${isHovered ? "shadow-xl" : "shadow-md"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      {highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      )}

      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="absolute -right-11 top-3 rotate-45 bg-primary py-1 px-10 text-xs font-semibold text-primary-foreground shadow-sm">
              Popular
            </div>
          </div>
        </div>
      )}

      <CardHeader className={`pb-8 ${popular ? "pt-12" : ""}`}>
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {highlighted && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 gap-1"
            >
              <Sparkles className="h-3 w-3" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="pt-1.5">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold">${currentPrice}</span>
              <span className="text-muted-foreground">
                /{billingCycle === "monthly" ? "month" : "year"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs ${
                  billingCycle === "monthly"
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={(checked) =>
                  setBillingCycle(checked ? "annually" : "monthly")
                }
              />
              <span
                className={`text-xs ${
                  billingCycle === "annually"
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                Annually
              </span>
            </div>
          </div>

          {billingCycle === "annually" && (
            <div className="text-xs text-emerald-600 font-medium">
              Save ${annualSavings} ({discount}%) with annual billing
            </div>
          )}
        </div>

        {/* Features list */}
        <div className="space-y-3">
          <div className="text-sm font-medium">What's included:</div>
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`mt-0.5 rounded-full p-0.5 ${
                    feature.included
                      ? feature.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-sm ${
                      !feature.included ? "text-muted-foreground" : ""
                    }`}
                  >
                    {feature.name}
                  </span>
                  {feature.tooltip && (
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          className={`w-full ${
            highlighted ? "bg-primary hover:bg-primary/90" : ""
          }`}
          variant={highlighted ? "default" : "outline"}
          size="lg"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}


code.demo.1752612132068.tsx
import { Component } from "@/components/ui/pricing-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-card.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, HelpCircle, Sparkles } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

interface PricingCardProps {
  title?: string;
  description?: string;
  price?: {
    monthly: number;
    annually: number;
  };
  features?: PricingFeature[];
  popular?: boolean;
  highlighted?: boolean;
  ctaText?: string;
  discount?: number;
}

export const Component = ({
  title = "Professional",
  description = "Perfect for growing businesses and teams.",
  price = {
    monthly: 29,
    annually: 290,
  },
  features = [
    { name: "Up to 10 team members", included: true, highlight: true },
    { name: "Unlimited projects", included: true, highlight: true },
    { name: "Advanced analytics", included: true },
    { name: "Priority support", included: true },
    {
      name: "Custom integrations",
      included: false,
      tooltip: "Available on Enterprise plan",
    },
    { name: "AI-powered insights", included: false },
  ],
  popular = true,
  highlighted = false,
  ctaText = "Get Started",
  discount = 15,
}: PricingCardProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [isHovered, setIsHovered] = useState(false);

  const currentPrice =
    billingCycle === "monthly" ? price.monthly : price.annually;
  const annualSavings = price.monthly * 12 - price.annually;

  return (
    <Card
      className={`w-full max-w-sm relative overflow-hidden transition-all duration-300 ${
        highlighted ? "border-primary shadow-lg" : ""
      } ${isHovered ? "shadow-xl" : "shadow-md"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      {highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      )}

      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="absolute -right-11 top-3 rotate-45 bg-primary py-1 px-10 text-xs font-semibold text-primary-foreground shadow-sm">
              Popular
            </div>
          </div>
        </div>
      )}

      <CardHeader className={`pb-8 ${popular ? "pt-12" : ""}`}>
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {highlighted && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 gap-1"
            >
              <Sparkles className="h-3 w-3" />
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="pt-1.5">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold">${currentPrice}</span>
              <span className="text-muted-foreground">
                /{billingCycle === "monthly" ? "month" : "year"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs ${
                  billingCycle === "monthly"
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={(checked) =>
                  setBillingCycle(checked ? "annually" : "monthly")
                }
              />
              <span
                className={`text-xs ${
                  billingCycle === "annually"
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                Annually
              </span>
            </div>
          </div>

          {billingCycle === "annually" && (
            <div className="text-xs text-emerald-600 font-medium">
              Save ${annualSavings} ({discount}%) with annual billing
            </div>
          )}
        </div>

        {/* Features list */}
        <div className="space-y-3">
          <div className="text-sm font-medium">What's included:</div>
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`mt-0.5 rounded-full p-0.5 ${
                    feature.included
                      ? feature.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-sm ${
                      !feature.included ? "text-muted-foreground" : ""
                    }`}
                  >
                    {feature.name}
                  </span>
                  {feature.tooltip && (
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          className={`w-full ${
            highlighted ? "bg-primary hover:bg-primary/90" : ""
          }`}
          variant={highlighted ? "default" : "outline"}
          size="lg"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}

```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
