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
pricing-section.tsx
'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export const Component = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const discountRate = 20;

  const pricingPlans = [
    {
      name: 'Basic Plan',
      monthlyPrice: 10,
      description: 'Basic features for up to 10 users.',
      features: [
        'Access to essential tools',
        'Basic chat and email support',
        'Limited storage capacity',
        'Monthly usage reports',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Business Plan',
      monthlyPrice: 25,
      description: 'Advanced tools for up to 20 users.',
      features: [
        'Advanced tools for power users',
        'Priority support with live chat',
        'More storage and bandwidth',
        'Detailed analytics',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Enterprise Plan',
      monthlyPrice: 40,
      description: 'Advanced features + unlimited users.',
      features: [
        'Custom solutions for big teams',
        'Dedicated account manager',
        'Unlimited storage and bandwidth',
        'Advanced analytics and reporting',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
  ];

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * (1 - discountRate / 100);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 mt-5">
        <div className="text-4xl sm:text-6xl">Our Pricing Plans</div>
        <span className="text-center text-gray-300 text-sm sm:text-base">
          Select from our range of affordable plans <br /> tailored to suit every budget.
        </span>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div
          className={`${billingCycle === 'annually' ? 'bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600' : 'bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600'} w-56 h-9 rounded-full flex justify-between items-center px-1 z-50`}
        >
          <span
            className={`px-5 py-1 rounded-full text-sm cursor-pointer ${billingCycle === 'monthly' ? 'bg-black text-white' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={`px-2 py-1 rounded-full text-sm cursor-pointer ${billingCycle === 'annually' ? 'bg-black text-white' : ''}`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually<span className="bg-white text-black rounded-full px-1 ml-1 text-xs">-{discountRate}%</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 px-2 mb-3 mt-6">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="bg-white w-80 rounded-2xl h-auto pb-10 shadow-lg z-50">
            <div className="p-5 rounded-2xl">
              <span className="text-black">{plan.name}</span>
              <div className="mt-3 mb-2">
                <span className="text-black text-3xl">
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-600 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-black animatedButton text-white w-full h-10 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  aria-label={`Get started with the ${plan.name}`}
                >
                  Get started
                </button>
              </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl pl-5 pt-2">
              <span className="text-black">Features</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="text-slate-600 text-sm flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

code.demo.1750533480296.tsx
// This is a demo of a preview
'use client'
import { Component } from "@/components/ui/pricing-section";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component />
    </div>
  );
};

export default DemoOne;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-section.tsx
'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export const Component = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const discountRate = 20;

  const pricingPlans = [
    {
      name: 'Basic Plan',
      monthlyPrice: 10,
      description: 'Basic features for up to 10 users.',
      features: [
        'Access to essential tools',
        'Basic chat and email support',
        'Limited storage capacity',
        'Monthly usage reports',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Business Plan',
      monthlyPrice: 25,
      description: 'Advanced tools for up to 20 users.',
      features: [
        'Advanced tools for power users',
        'Priority support with live chat',
        'More storage and bandwidth',
        'Detailed analytics',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
    {
      name: 'Enterprise Plan',
      monthlyPrice: 40,
      description: 'Advanced features + unlimited users.',
      features: [
        'Custom solutions for big teams',
        'Dedicated account manager',
        'Unlimited storage and bandwidth',
        'Advanced analytics and reporting',
      ],
      link: 'https://i.imgur.com/VRtqhGC.png',
    },
  ];

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return monthlyPrice * 12 * (1 - discountRate / 100);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 mt-5">
        <div className="text-4xl sm:text-6xl">Our Pricing Plans</div>
        <span className="text-center text-gray-300 text-sm sm:text-base">
          Select from our range of affordable plans <br /> tailored to suit every budget.
        </span>
      </div>

      <div className="flex justify-center items-center mt-5">
        <div
          className={`${billingCycle === 'annually' ? 'bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600' : 'bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600'} w-56 h-9 rounded-full flex justify-between items-center px-1 z-50`}
        >
          <span
            className={`px-5 py-1 rounded-full text-sm cursor-pointer ${billingCycle === 'monthly' ? 'bg-black text-white' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <span
            className={`px-2 py-1 rounded-full text-sm cursor-pointer ${billingCycle === 'annually' ? 'bg-black text-white' : ''}`}
            onClick={() => setBillingCycle('annually')}
          >
            Annually<span className="bg-white text-black rounded-full px-1 ml-1 text-xs">-{discountRate}%</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-3 px-2 mb-3 mt-6">
        {pricingPlans.map((plan) => (
          <div key={plan.name} className="bg-white w-80 rounded-2xl h-auto pb-10 shadow-lg z-50">
            <div className="p-5 rounded-2xl">
              <span className="text-black">{plan.name}</span>
              <div className="mt-3 mb-2">
                <span className="text-black text-3xl">
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : calculateAnnualPrice(plan.monthlyPrice).toFixed(2)}{' '}
                  <span className="text-xs">{billingCycle === 'annually' ? 'annually' : 'per month'}</span>
                </span>
              </div>
              <span className="text-slate-600 text-sm">{plan.description}</span>
              <div className="mt-5">
              <Link href={plan.link} target='_blank'>
                <button
                  className="bg-black animatedButton text-white w-full h-10 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  aria-label={`Get started with the ${plan.name}`}
                >
                  Get started
                </button>
              </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl pl-5 pt-2">
              <span className="text-black">Features</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="text-slate-600 text-sm flex items-center gap-1 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
next
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
