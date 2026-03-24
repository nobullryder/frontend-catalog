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
pricing-for-teams.tsx
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * A reusable, high-quality pricing card component.
 *
 * @param {{
 * planName: string;
 * price: string;
 * priceFrequency: string;
 * description: string;
 * features: string[];
 * ctaText: string;
 * href: string;
 * isFeatured?: boolean;
 * }} props - The props for the component.
 * @returns {JSX.Element} The rendered pricing card.
 */
const PricingCard = ({
  planName,
  price,
  priceFrequency,
  description,
  features,
  ctaText,
  href,
  isFeatured = false,
}) => {
  const cardClasses = `
    relative flex flex-col h-full p-8 bg-white rounded-2xl shadow-sm border
    ${isFeatured ? 'border-blue-500' : 'border-gray-200'}
    dark:bg-gray-800 dark:border-gray-700
    ${isFeatured ? 'dark:border-blue-500' : ''}
  `;

  const buttonClasses = `
    inline-flex items-center justify-center w-full px-5 py-3 font-medium rounded-lg text-center
    transition-colors duration-200
    ${isFeatured
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
    }
  `;

  return (
    <div className={cardClasses}>
      {isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          Most Popular
        </div>
      )}

      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{planName}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        <div className="mt-6">
          <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">${price}</span>
          <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">{priceFrequency}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-500" />
              <span className="ml-3 text-base text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a href={href} className={buttonClasses}>
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PricingCard;


code.demo.1757219867452.tsx
import PricingCard from "@/components/ui/pricing-for-teams";

export default function DemoOne() {
  const pricingPlans = [
    {
      planName: "Starter",
      price: "29",
      priceFrequency: "/month",
      description: "For individuals and small teams getting started.",
      features: [
        "10 Projects",
        "5 GB Storage",
        "Basic Analytics",
        "Community Support",
      ],
      ctaText: "Choose Starter",
      href: "#starter",
    },
    {
      planName: "Pro",
      price: "99",
      priceFrequency: "/month",
      description: "For growing businesses that need more power.",
      features: [
        "Unlimited Projects",
        "100 GB Storage",
        "Advanced Analytics",
        "Priority Email Support",
        "API Access",
      ],
      ctaText: "Choose Pro",
      href: "#pro",
      isFeatured: true,
    },
    {
      planName: "Enterprise",
      price: "Custom",
      priceFrequency: "",
      description: "For large organizations with custom needs.",
      features: [
        "Everything in Pro",
        "Dedicated Account Manager",
        "Custom Integrations",
        "24/7 Phone Support",
        "SLA Guarantee",
      ],
      ctaText: "Contact Sales",
      href: "#enterprise",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans text-gray-900 antialiased dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Flexible Pricing for Teams of Any Size
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Choose the plan that's right for you. All plans come with a 14-day free trial, no credit card required.
          </p>
        </header>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-for-teams.tsx
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * A reusable, high-quality pricing card component.
 *
 * @param {{
 * planName: string;
 * price: string;
 * priceFrequency: string;
 * description: string;
 * features: string[];
 * ctaText: string;
 * href: string;
 * isFeatured?: boolean;
 * }} props - The props for the component.
 * @returns {JSX.Element} The rendered pricing card.
 */
const PricingCard = ({
  planName,
  price,
  priceFrequency,
  description,
  features,
  ctaText,
  href,
  isFeatured = false,
}) => {
  const cardClasses = `
    relative flex flex-col h-full p-8 bg-white rounded-2xl shadow-sm border
    ${isFeatured ? 'border-blue-500' : 'border-gray-200'}
    dark:bg-gray-800 dark:border-gray-700
    ${isFeatured ? 'dark:border-blue-500' : ''}
  `;

  const buttonClasses = `
    inline-flex items-center justify-center w-full px-5 py-3 font-medium rounded-lg text-center
    transition-colors duration-200
    ${isFeatured
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
    }
  `;

  return (
    <div className={cardClasses}>
      {isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          Most Popular
        </div>
      )}

      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{planName}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        <div className="mt-6">
          <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">${price}</span>
          <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">{priceFrequency}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-500" />
              <span className="ml-3 text-base text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a href={href} className={buttonClasses}>
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default PricingCard;

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
