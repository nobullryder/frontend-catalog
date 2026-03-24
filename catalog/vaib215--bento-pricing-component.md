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
bento-pricing-component.tsx
import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckIcon, XIcon } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Feature[];
  isPopular?: boolean;
  ctaText: string;
  /**
   * Tailwind CSS grid classes to apply to the card for bento layout.
   * E.g., 'md:col-span-2 lg:col-span-2 xl:col-span-2' for a wider card.
   */
  gridClasses?: string;
  popularBadgeText?: string;
}

interface PricingBentoProps {
  plans: PricingPlan[];
  className?: string; // For the overall section container
}

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => (
  <li className="flex items-start gap-2">
    {feature.included ? (
      <CheckIcon className="h-4 w-4 flex-shrink-0 text-green-500 mt-1" />
    ) : (
      <XIcon className="h-4 w-4 flex-shrink-0 text-gray-400 mt-1" />
    )}
    <span className={cn(feature.included ? 'text-foreground' : 'text-muted-foreground')}>
      {feature.text}
    </span>
  </li>
);

export const PricingBento: React.FC<PricingBentoProps> = ({ plans, className }) => {
  const [isYearly, setIsYearly] = useState(false);

  const handleCtaClick = (planId: string) => {
    console.log(`Selected plan: ${planId}, Billing: ${isYearly ? 'Yearly' : 'Monthly'}`);
    // Here you would typically redirect to a checkout page or trigger a subscription flow
  };

  const getPriceDisplay = (plan: PricingPlan) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const period = isYearly ? '/year' : '/month';
    const monthlyEquivalentYearly = plan.yearlyPrice / 12;
    const savings = isYearly && plan.monthlyPrice > monthlyEquivalentYearly
      ? Math.round((1 - (monthlyEquivalentYearly / plan.monthlyPrice)) * 100)
      : 0;

    return (
      <div className="flex items-baseline space-x-2">
        <p className="text-5xl font-extrabold tracking-tight">
          ${price}
        </p>
        <span className="text-xl font-normal text-muted-foreground">{period}</span>
        {isYearly && savings > 0 && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            (Save {savings}%)
          </span>
        )}
      </div>
    );
  };

  // Sort plans to ensure 'isPopular' plans appear first, which can help with bento layout visually
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return 0;
  });

  return (
    <section className={cn('container py-12 md:py-24', className)}>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Flexible Pricing for Everyone</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for you, and start building today.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-3">
          <Label htmlFor="billing-toggle-monthly" className={cn(!isYearly && 'font-bold text-primary')}>Monthly</Label>
          <Switch
            id="billing-toggle-monthly"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
          />
          <Label htmlFor="billing-toggle-monthly" className={cn(isYearly && 'font-bold text-primary')}>Yearly (Save ~17%)</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {sortedPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'flex flex-col justify-between p-6 transition-all duration-300 ease-in-out',
              plan.isPopular && 'border-2 border-primary shadow-lg dark:shadow-primary/20 scale-[1.02]', // Emphasize popular plan
              plan.gridClasses // Apply custom grid classes for bento layout
            )}
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold flex items-center">
                {plan.name}
                {plan.isPopular && (
                  <span className="ml-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.popularBadgeText || 'Most Popular'}
                  </span>
                )}
              </CardTitle>
              <CardDescription className="mt-2 text-base text-muted-foreground">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0 mb-6">
              {getPriceDisplay(plan)}
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index} feature={feature} />
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-0 mt-auto">
              <Button
                className={cn('w-full', plan.isPopular && 'bg-primary hover:bg-primary/90 text-primary-foreground')}
                onClick={() => handleCtaClick(plan.id)}
              >
                {plan.ctaText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};


code.demo.1756024107978.tsx
import { PricingBento, PricingPlan } from '@/components/ui/bento-pricing-component';

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started and personal projects.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: '1 User', included: true },
      { text: '500 MB Storage', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Community Support', included: true },
      { text: 'Custom Domain', included: false },
      { text: 'Advanced Security', included: false },
    ],
    ctaText: 'Get Started Free',
    gridClasses: 'lg:col-span-1', // Default 1 column span on large screens
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Unlock essential features for small teams and growing needs.',
    monthlyPrice: 19,
    yearlyPrice: 199, // ~16.58/month, so savings: (19 - 16.58) / 19 = ~12.7%
    features: [
      { text: '5 Users', included: true },
      { text: '5 GB Storage', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Custom Domain', included: false },
      { text: 'Priority Support', included: false },
      { text: 'API Access', included: false },
    ],
    ctaText: 'Start 14-day Free Trial',
    gridClasses: 'lg:col-span-1', // Default 1 column span on large screens
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Everything you need for growing businesses and serious projects.',
    monthlyPrice: 49,
    yearlyPrice: 499, // ~41.58/month, so savings: (49 - 41.58) / 49 = ~15.2%
    features: [
      { text: 'Unlimited Users', included: true },
      { text: '50 GB Storage', included: true },
      { text: 'Real-time Analytics & Reporting', included: true },
      { text: 'Priority Email & Chat Support', included: true },
      { text: 'Custom Domain', included: true },
      { text: 'Dedicated Account Manager', included: false },
      { text: 'Advanced Security & SSO', included: true },
      { text: 'Full API Access', included: true },
    ],
    isPopular: true,
    popularBadgeText: 'Recommended',
    // This plan spans 2 columns on medium, large and extra-large screens
    // This creates the bento effect by making it visually larger.
    gridClasses: 'md:col-span-2 lg:col-span-2 xl:col-span-2',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions and dedicated support for large organizations.',
    monthlyPrice: 99, // Placeholder for display
    yearlyPrice: 999, // Placeholder for display
    features: [
      { text: 'Unlimited Users & Storage', included: true },
      { text: 'Advanced Security & Compliance', included: true },
      { text: '24/7 Phone & On-site Support', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Custom Integrations & SLAs', included: true },
      { text: 'SAML SSO & Audit Logs', included: true },
      { text: 'White-glove Onboarding', included: true },
    ],
    ctaText: 'Contact Sales',
    gridClasses: 'md:col-span-2 lg:col-span-2 xl:col-span-4',
  },
];

export default function PricingBentoDemo() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <PricingBento plans={pricingPlans} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bento-pricing-component.tsx
import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckIcon, XIcon } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Feature[];
  isPopular?: boolean;
  ctaText: string;
  /**
   * Tailwind CSS grid classes to apply to the card for bento layout.
   * E.g., 'md:col-span-2 lg:col-span-2 xl:col-span-2' for a wider card.
   */
  gridClasses?: string;
  popularBadgeText?: string;
}

interface PricingBentoProps {
  plans: PricingPlan[];
  className?: string; // For the overall section container
}

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => (
  <li className="flex items-start gap-2">
    {feature.included ? (
      <CheckIcon className="h-4 w-4 flex-shrink-0 text-green-500 mt-1" />
    ) : (
      <XIcon className="h-4 w-4 flex-shrink-0 text-gray-400 mt-1" />
    )}
    <span className={cn(feature.included ? 'text-foreground' : 'text-muted-foreground')}>
      {feature.text}
    </span>
  </li>
);

export const PricingBento: React.FC<PricingBentoProps> = ({ plans, className }) => {
  const [isYearly, setIsYearly] = useState(false);

  const handleCtaClick = (planId: string) => {
    console.log(`Selected plan: ${planId}, Billing: ${isYearly ? 'Yearly' : 'Monthly'}`);
    // Here you would typically redirect to a checkout page or trigger a subscription flow
  };

  const getPriceDisplay = (plan: PricingPlan) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const period = isYearly ? '/year' : '/month';
    const monthlyEquivalentYearly = plan.yearlyPrice / 12;
    const savings = isYearly && plan.monthlyPrice > monthlyEquivalentYearly
      ? Math.round((1 - (monthlyEquivalentYearly / plan.monthlyPrice)) * 100)
      : 0;

    return (
      <div className="flex items-baseline space-x-2">
        <p className="text-5xl font-extrabold tracking-tight">
          ${price}
        </p>
        <span className="text-xl font-normal text-muted-foreground">{period}</span>
        {isYearly && savings > 0 && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            (Save {savings}%)
          </span>
        )}
      </div>
    );
  };

  // Sort plans to ensure 'isPopular' plans appear first, which can help with bento layout visually
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return 0;
  });

  return (
    <section className={cn('container py-12 md:py-24', className)}>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Flexible Pricing for Everyone</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for you, and start building today.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-3">
          <Label htmlFor="billing-toggle-monthly" className={cn(!isYearly && 'font-bold text-primary')}>Monthly</Label>
          <Switch
            id="billing-toggle-monthly"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
          />
          <Label htmlFor="billing-toggle-monthly" className={cn(isYearly && 'font-bold text-primary')}>Yearly (Save ~17%)</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {sortedPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'flex flex-col justify-between p-6 transition-all duration-300 ease-in-out',
              plan.isPopular && 'border-2 border-primary shadow-lg dark:shadow-primary/20 scale-[1.02]', // Emphasize popular plan
              plan.gridClasses // Apply custom grid classes for bento layout
            )}
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold flex items-center">
                {plan.name}
                {plan.isPopular && (
                  <span className="ml-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.popularBadgeText || 'Most Popular'}
                  </span>
                )}
              </CardTitle>
              <CardDescription className="mt-2 text-base text-muted-foreground">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0 mb-6">
              {getPriceDisplay(plan)}
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index} feature={feature} />
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-0 mt-auto">
              <Button
                className={cn('w-full', plan.isPopular && 'bg-primary hover:bg-primary/90 text-primary-foreground')}
                onClick={() => handleCtaClick(plan.id)}
              >
                {plan.ctaText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

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
