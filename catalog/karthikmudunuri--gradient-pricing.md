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
gradient-pricing.tsx
import { CheckIcon } from "lucide-react";

export const Component = () => {
  return (
    <section className="overflow-hidden py-24  text-neutral-800 dark:text-neutral-50 lg:pb-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="mb-4 text-6xl tracking-tighter">
            Pricing & Plans
          </h2>
          <p className="text-xl tracking-tight">
            Use and reuse tons of responsive sections to create the perfect
            layout. Sections are ready.
          </p>
        </div>
        <div className="-m-6 flex flex-wrap *:mx-auto">
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="h-full transform-gpu rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900 ">
              <div className="border-b border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Solo</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tight">
                    From $29/mo
                  </p>
                  <p className="tracking-tight">
                    The ideal plan for larger businesses who require heavy
                    usage.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <ul className="-m-1.5 mb-11">
                  <FeatureItem>50 Users</FeatureItem>
                  <FeatureItem>Unlimited Projects</FeatureItem>
                  <FeatureItem>Project Schedule</FeatureItem>
                  <FeatureItem>150+ Integrations</FeatureItem>
                  <FeatureItem>Priority Email Support</FeatureItem>
                </ul>
                <PricingButton noCardRequired={true}>
                  Try 14 Days Free Trial
                </PricingButton>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div
              className="transform-gpu overflow-hidden rounded-2xl p-px transition duration-500 hover:-translate-y-2"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="h-full rounded-2xl bg-white dark:bg-neutral-900">
                <div
                  className="p-12"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pr-9">
                    <h4 className="mb-6 text-6xl tracking-tighter text-white">
                      Startup
                    </h4>
                    <p className="mb-2 text-xl font-semibold tracking-tighter text-white">
                      From $99/mo
                    </p>
                    <p className="tracking-tight text-white">
                      The ideal plan for larger businesses who require heavy
                      usage.
                    </p>
                  </div>
                </div>
                <div className="p-12 pb-11">
                  <ul className="-m-1.5 mb-11">
                    <FeatureItem>50 Users</FeatureItem>
                    <FeatureItem>Unlimited Projects</FeatureItem>
                    <FeatureItem>Project Schedule</FeatureItem>
                    <FeatureItem>150+ Integrations</FeatureItem>
                    <FeatureItem>Priority Email Support</FeatureItem>
                  </ul>
                  <PricingButton noCardRequired={true}>
                    Try 14 Days Free Trial
                  </PricingButton>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="flex h-full transform-gpu flex-col justify-between rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900">
              <div className="border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Custom</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tighter">
                    From $399/mo
                  </p>
                  <p className="tracking-tight">
                    We can customize a plan that suits the exact needs of your
                    business.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <PricingButton>Contact sales</PricingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: string }) => {
  return (
    <li className="flex items-center py-1.5">
      <CheckIcon className="mr-3 size-3" />
      <span className="font-medium tracking-tight">{children}</span>
    </li>
  );
};

const PricingButton = ({
  children,
  href,
  noCardRequired,
}: {
  children: string;
  href?: string;
  noCardRequired?: boolean;
}) => {
  return (
    <>
      <a
        className="inline-block w-full rounded-lg border border-neutral-700  bg-transparent px-5 py-4 text-center font-semibold tracking-tight transition duration-200 hover:scale-105 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-800"
        href={href ?? ""}
      >
        {children}
      </a>
      {noCardRequired && (
        <span className="text-sm tracking-tight text-neutral-600">
          No credit card required
        </span>
      )}
    </>
  );
};

code.demo.1750539705738.tsx
import { Component } from "@/components/ui/gradient-pricing";

const Demo = () => {
  return (
    <div className="w-full bg-white dark:bg-neutral-950">
      <Component />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/gradient-pricing.tsx
import { CheckIcon } from "lucide-react";

export const Component = () => {
  return (
    <section className="overflow-hidden py-24  text-neutral-800 dark:text-neutral-50 lg:pb-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="mb-4 text-6xl tracking-tighter">
            Pricing & Plans
          </h2>
          <p className="text-xl tracking-tight">
            Use and reuse tons of responsive sections to create the perfect
            layout. Sections are ready.
          </p>
        </div>
        <div className="-m-6 flex flex-wrap *:mx-auto">
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="h-full transform-gpu rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900 ">
              <div className="border-b border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Solo</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tight">
                    From $29/mo
                  </p>
                  <p className="tracking-tight">
                    The ideal plan for larger businesses who require heavy
                    usage.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <ul className="-m-1.5 mb-11">
                  <FeatureItem>50 Users</FeatureItem>
                  <FeatureItem>Unlimited Projects</FeatureItem>
                  <FeatureItem>Project Schedule</FeatureItem>
                  <FeatureItem>150+ Integrations</FeatureItem>
                  <FeatureItem>Priority Email Support</FeatureItem>
                </ul>
                <PricingButton noCardRequired={true}>
                  Try 14 Days Free Trial
                </PricingButton>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div
              className="transform-gpu overflow-hidden rounded-2xl p-px transition duration-500 hover:-translate-y-2"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="h-full rounded-2xl bg-white dark:bg-neutral-900">
                <div
                  className="p-12"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pr-9">
                    <h4 className="mb-6 text-6xl tracking-tighter text-white">
                      Startup
                    </h4>
                    <p className="mb-2 text-xl font-semibold tracking-tighter text-white">
                      From $99/mo
                    </p>
                    <p className="tracking-tight text-white">
                      The ideal plan for larger businesses who require heavy
                      usage.
                    </p>
                  </div>
                </div>
                <div className="p-12 pb-11">
                  <ul className="-m-1.5 mb-11">
                    <FeatureItem>50 Users</FeatureItem>
                    <FeatureItem>Unlimited Projects</FeatureItem>
                    <FeatureItem>Project Schedule</FeatureItem>
                    <FeatureItem>150+ Integrations</FeatureItem>
                    <FeatureItem>Priority Email Support</FeatureItem>
                  </ul>
                  <PricingButton noCardRequired={true}>
                    Try 14 Days Free Trial
                  </PricingButton>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="flex h-full transform-gpu flex-col justify-between rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900">
              <div className="border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Custom</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tighter">
                    From $399/mo
                  </p>
                  <p className="tracking-tight">
                    We can customize a plan that suits the exact needs of your
                    business.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <PricingButton>Contact sales</PricingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: string }) => {
  return (
    <li className="flex items-center py-1.5">
      <CheckIcon className="mr-3 size-3" />
      <span className="font-medium tracking-tight">{children}</span>
    </li>
  );
};

const PricingButton = ({
  children,
  href,
  noCardRequired,
}: {
  children: string;
  href?: string;
  noCardRequired?: boolean;
}) => {
  return (
    <>
      <a
        className="inline-block w-full rounded-lg border border-neutral-700  bg-transparent px-5 py-4 text-center font-semibold tracking-tight transition duration-200 hover:scale-105 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-800"
        href={href ?? ""}
      >
        {children}
      </a>
      {noCardRequired && (
        <span className="text-sm tracking-tight text-neutral-600">
          No credit card required
        </span>
      )}
    </>
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
