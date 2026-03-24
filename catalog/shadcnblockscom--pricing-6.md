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
pricing-6.tsx
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Pricing6Props {
  heading: string;
  description?: string;
  price?: string | number;
  priceSuffix?: string;
  features?: string[][];
  buttonText?: string;
}

const defaultFeatures = [
  ["Unlimited", "Integrations", "24/7 support"],
  ["Live collaborations", "Unlimited storage", "30-day money back"],
  ["Unlimited members", "Customization", "Unlimited users"],
];

export const Pricing6 = ({
  heading = "Pricing",
  description = "Simple pricing with a free 7 day trial.",
  price = 29,
  priceSuffix = "/mo",
  features = defaultFeatures,
  buttonText = "Start free trial",
}: Pricing6Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {heading}
          </h2>
          <p className="max-w-md text-muted-foreground lg:text-xl">
            {description}
          </p>
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
            <div className="flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
              <span className="self-end text-muted-foreground">
                {priceSuffix}
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
            <Button>{buttonText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};


code.demo.1747798351382.tsx
import { Pricing6 } from "@/components/ui/pricing-6";

const DemoOne = () => {
  return (
    <Pricing6 />
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-6.tsx
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Pricing6Props {
  heading: string;
  description?: string;
  price?: string | number;
  priceSuffix?: string;
  features?: string[][];
  buttonText?: string;
}

const defaultFeatures = [
  ["Unlimited", "Integrations", "24/7 support"],
  ["Live collaborations", "Unlimited storage", "30-day money back"],
  ["Unlimited members", "Customization", "Unlimited users"],
];

export const Pricing6 = ({
  heading = "Pricing",
  description = "Simple pricing with a free 7 day trial.",
  price = 29,
  priceSuffix = "/mo",
  features = defaultFeatures,
  buttonText = "Start free trial",
}: Pricing6Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {heading}
          </h2>
          <p className="max-w-md text-muted-foreground lg:text-xl">
            {description}
          </p>
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
            <div className="flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
              <span className="self-end text-muted-foreground">
                {priceSuffix}
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
            <Button>{buttonText}</Button>
          </div>
        </div>
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
