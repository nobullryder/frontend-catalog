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
radio-group.tsx
"use client";

import { RadioGroup } from "@ark-ui/react/radio-group";

export default function Basic() {
  const options = ["Pizza", "Burger", "Sushi"];

  return (
    <RadioGroup.Root className="flex flex-col space-y-2">
      <RadioGroup.Indicator />
      {options.map((option) => (
        <RadioGroup.Item
          key={option}
          value={option}
          className="flex items-center gap-2 cursor-pointer"
        >
          <RadioGroup.ItemControl className="group size-4 bg-white border-2 border-gray-300 rounded-full data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-hover:border-gray-400 data-focus:ring-2 data-focus:ring-blue-500/50 transition-all duration-200 flex items-center justify-center text-white">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity"
            >
              <circle cx="3" cy="3" r="3"></circle>
            </svg>
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText className="text-sm font-medium">
            {option}
          </RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}


code.demo.1756195294393.tsx
"use client";

import { RadioGroup } from "@ark-ui/react/radio-group";

export default function Plans() {
  const plans = [
    { value: "starter", name: "Starter", price: "$12/mo", badge: null },
    { value: "pro", name: "Pro", price: "$39/mo", badge: "Most Popular" },
    { value: "business", name: "Business", price: "$79/mo", badge: null },
    {
      value: "enterprise",
      name: "Enterprise",
      price: "Contact us",
      badge: null,
    },
  ];

  return (
    <div className="space-y-4 w-full max-w-xs">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Select your subscription
      </h3>

      <RadioGroup.Root
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        defaultValue="plus"
      >
        {plans.map((plan, index) => (
          <RadioGroup.Item
            key={plan.value}
            value={plan.value}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 data-[state=checked]:bg-blue-50 dark:hover:bg-gray-700 dark:data-[state=checked]:bg-blue-950/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <RadioGroup.ItemControl className="group size-4 bg-white border-2 border-gray-300 rounded-full data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-hover:border-gray-400 data-focus:ring-2 data-focus:ring-blue-500/50 transition-all duration-200 flex items-center justify-center text-white">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity"
                >
                  <circle cx="3" cy="3" r="3"></circle>
                </svg>
              </RadioGroup.ItemControl>

              <div className="flex items-center gap-2">
                <RadioGroup.ItemText className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {plan.name}
                </RadioGroup.ItemText>
                {plan.badge && (
                  <span className="px-1.5 py-0.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {plan.price}
            </div>

            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group.tsx
"use client";

import { RadioGroup } from "@ark-ui/react/radio-group";

export default function Basic() {
  const options = ["Pizza", "Burger", "Sushi"];

  return (
    <RadioGroup.Root className="flex flex-col space-y-2">
      <RadioGroup.Indicator />
      {options.map((option) => (
        <RadioGroup.Item
          key={option}
          value={option}
          className="flex items-center gap-2 cursor-pointer"
        >
          <RadioGroup.ItemControl className="group size-4 bg-white border-2 border-gray-300 rounded-full data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-hover:border-gray-400 data-focus:ring-2 data-focus:ring-blue-500/50 transition-all duration-200 flex items-center justify-center text-white">
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="currentcolor"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity"
            >
              <circle cx="3" cy="3" r="3"></circle>
            </svg>
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText className="text-sm font-medium">
            {option}
          </RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
