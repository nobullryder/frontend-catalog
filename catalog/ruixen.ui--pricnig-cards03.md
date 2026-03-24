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
pricnig-cards03.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const plans = [
    {
        title: "Starter Pack - Yearly Subscription",
        price: "$19",
        billing: "charged annually",
        features: [
            "Includes 40+ UI components and patterns",
            "Access to 3 production-ready templates",
            "License for personal and freelance projects",
            "Continue using components after subscription ends",
        ],
        button: "Subscribe for a Year",
    },
    {
        title: "Pro Pack - Lifetime Access",
        price: "$39",
        billing: "one-time fee",
        recommended: true,
        features: [
            "Includes 40+ UI components and patterns",
            "3 production templates built with React & Tailwind",
            "Commercial license for client work",
            "Lifetime usage with no renewals",
            "Free access to all future updates and additions",
        ],
        button: "Buy Lifetime Access",
    },
    {
        title: "Enterprise Pack",
        price: "$59",
        billing: "single payment",
        features: [
            "Everything from the Pro plan",
            "Up to 20 team members included",
            "Priority support & onboarding help",
        ],
        button: "Get Enterprise Plan",
    },
];

export default function Pricing_03() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="relative grid grid-cols-1 md:grid-cols-2">
                <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                {plans.slice(0, 2).map((plan, index) => (
                    <Card
                        key={index}
                        className={`flex flex-col rounded-none shadow-lg hover:shadow-xl transition-all duration-300 ${plan.recommended ? "border-4 border-green-200 shadow-2xl" : "border"
                            }`}
                    >
                        <CardContent className="p-6 flex flex-col gap-5 flex-1">
                            {plan.recommended && (
                                <span className="text-sm font-medium text-green-600">Recommended</span>
                            )}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                                <p className="text-4xl font-extrabold mt-2 text-foreground">{plan.price}</p>
                                <p className="text-sm text-muted-foreground">{plan.billing}</p>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[15px]">
                                        <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                                        <span className="text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <div className="relative w-full">
                                {/* {plan.price == "$199" && <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />} */}
                                    <Button className="w-full relative z-[1] mt-4" asChild>
                                        <Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">{plan.button}</Link>
                                    </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="relative grid grid-cols-1">
                <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <Card className="rounded-none shadow-lg border hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex flex-col gap-5">
                        <h3 className="text-2xl font-bold text-foreground">{plans[2].title}</h3>
                        <p className="text-4xl font-extrabold mt-2 text-foreground">{plans[2].price}</p>
                        <p className="text-sm text-muted-foreground">{plans[2].billing}</p>
                        <ul className="space-y-3 mt-2">
                            {plans[2].features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[15px]">
                                    <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative w-full mx-auto">
                            <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />
                            <Button className="w-full relative z-[1]"><Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">
                                {plans[2].button}</Link></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}


code.demo.1752779252906.tsx
import Pricing_03 from "@/components/ui/pricnig-cards03";

export default function DemoOne() {
  return <Pricing_03 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricnig-cards03.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const plans = [
    {
        title: "Starter Pack - Yearly Subscription",
        price: "$19",
        billing: "charged annually",
        features: [
            "Includes 40+ UI components and patterns",
            "Access to 3 production-ready templates",
            "License for personal and freelance projects",
            "Continue using components after subscription ends",
        ],
        button: "Subscribe for a Year",
    },
    {
        title: "Pro Pack - Lifetime Access",
        price: "$39",
        billing: "one-time fee",
        recommended: true,
        features: [
            "Includes 40+ UI components and patterns",
            "3 production templates built with React & Tailwind",
            "Commercial license for client work",
            "Lifetime usage with no renewals",
            "Free access to all future updates and additions",
        ],
        button: "Buy Lifetime Access",
    },
    {
        title: "Enterprise Pack",
        price: "$59",
        billing: "single payment",
        features: [
            "Everything from the Pro plan",
            "Up to 20 team members included",
            "Priority support & onboarding help",
        ],
        button: "Get Enterprise Plan",
    },
];

export default function Pricing_03() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="relative grid grid-cols-1 md:grid-cols-2">
                <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                {plans.slice(0, 2).map((plan, index) => (
                    <Card
                        key={index}
                        className={`flex flex-col rounded-none shadow-lg hover:shadow-xl transition-all duration-300 ${plan.recommended ? "border-4 border-green-200 shadow-2xl" : "border"
                            }`}
                    >
                        <CardContent className="p-6 flex flex-col gap-5 flex-1">
                            {plan.recommended && (
                                <span className="text-sm font-medium text-green-600">Recommended</span>
                            )}
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                                <p className="text-4xl font-extrabold mt-2 text-foreground">{plan.price}</p>
                                <p className="text-sm text-muted-foreground">{plan.billing}</p>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[15px]">
                                        <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                                        <span className="text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <div className="relative w-full">
                                {/* {plan.price == "$199" && <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />} */}
                                    <Button className="w-full relative z-[1] mt-4" asChild>
                                        <Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">{plan.button}</Link>
                                    </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="relative grid grid-cols-1">
                <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                <Card className="rounded-none shadow-lg border hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex flex-col gap-5">
                        <h3 className="text-2xl font-bold text-foreground">{plans[2].title}</h3>
                        <p className="text-4xl font-extrabold mt-2 text-foreground">{plans[2].price}</p>
                        <p className="text-sm text-muted-foreground">{plans[2].billing}</p>
                        <ul className="space-y-3 mt-2">
                            {plans[2].features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[15px]">
                                    <CheckCircle2 className="text-green-500 w-4 h-4 mt-1" />
                                    <span className="text-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="relative w-full mx-auto">
                            <div className="absolute inset-0 rounded-xl z-0 animate-rainbow-glow blur-xl" />
                            <Button className="w-full relative z-[1]"><Link href="https://ruixen.com/?utm_source=21stdev&utm_medium=button&utm_campaign=ruixen_pricing">
                                {plans[2].button}</Link></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
