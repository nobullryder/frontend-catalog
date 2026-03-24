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
pricing-component.tsx
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "For your hobby",
      features: [
        "Basic design tools",
        "Limited fabric and color options",
        "Standard customer support",
        "Access to community forums"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: isAnnual ? "₹1099" : "₹99",
      description: "For small business",
      features: [
        "Advanced design tools",
        "Unlimited fabric and color options",
        "Priority customer support",
        "Access to exclusive design templates",
        "High resolution 2D previews",
        "Feedback and adjustment tools"
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For multiple teams",
      features: [
        "All pro features",
        "Custom branding options",
        "Dedicated account manager",
        "Enterprise-level support",
        "Custom integrations",
        "Bulk design options"
      ],
      cta: "Start with Enterprise",
      highlighted: false
    }
  ];

  return (
    <div className="bg-white dark:bg-black mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Plans and Pricing
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Receive unlimited credits when you pay yearly, and save on your plan
          </p>

          <div className="inline-flex items-center bg-black/[0.03] dark:bg-white/[0.03] rounded-full p-1">
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${!isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${plan.highlighted
                  ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] scale-[1.02] shadow-xl'
                  : 'border-black/[0.08] dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/10'
                } p-6 transition-all duration-300`}
            >
              {plan.highlighted && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full blur-[2px]" />

                      <div className="relative px-4 py-1.5 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-sm rounded-full border border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-black/60 dark:bg-white/60 animate-pulse" />
                          <span className="text-xs font-medium text-black/80 dark:text-white/80">Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      per user/{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-black/30 dark:text-white/30" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${plan.highlighted
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90'
                    : 'border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                  }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

code.demo.1753625549000.tsx
import Pricing from "@/components/ui/pricing-component";

export default function DemoOne() {
  return <Pricing />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-component.tsx
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "For your hobby",
      features: [
        "Basic design tools",
        "Limited fabric and color options",
        "Standard customer support",
        "Access to community forums"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: isAnnual ? "₹1099" : "₹99",
      description: "For small business",
      features: [
        "Advanced design tools",
        "Unlimited fabric and color options",
        "Priority customer support",
        "Access to exclusive design templates",
        "High resolution 2D previews",
        "Feedback and adjustment tools"
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For multiple teams",
      features: [
        "All pro features",
        "Custom branding options",
        "Dedicated account manager",
        "Enterprise-level support",
        "Custom integrations",
        "Bulk design options"
      ],
      cta: "Start with Enterprise",
      highlighted: false
    }
  ];

  return (
    <div className="bg-white dark:bg-black mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Plans and Pricing
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Receive unlimited credits when you pay yearly, and save on your plan
          </p>

          <div className="inline-flex items-center bg-black/[0.03] dark:bg-white/[0.03] rounded-full p-1">
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${!isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${plan.highlighted
                  ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] scale-[1.02] shadow-xl'
                  : 'border-black/[0.08] dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/10'
                } p-6 transition-all duration-300`}
            >
              {plan.highlighted && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full blur-[2px]" />

                      <div className="relative px-4 py-1.5 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-sm rounded-full border border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-black/60 dark:bg-white/60 animate-pulse" />
                          <span className="text-xs font-medium text-black/80 dark:text-white/80">Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      per user/{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-black/30 dark:text-white/30" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${plan.highlighted
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90'
                    : 'border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                  }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
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
