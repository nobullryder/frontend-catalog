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

export default function Feedback() {
  const ratings = [
    { value: "very-bad", emoji: "😠", label: "Very Bad" },
    { value: "bad", emoji: "🙁", label: "Bad" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
    { value: "good", emoji: "🙂", label: "Good" },
    { value: "very-good", emoji: "😄", label: "Very Good" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        How do you feel about this product?
      </h3>

      <RadioGroup.Root className="flex gap-2" defaultValue="">
        {ratings.map((rating) => (
          <RadioGroup.Item
            key={rating.value}
            value={rating.value}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <RadioGroup.ItemControl className="size-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-md opacity-60 data-[state=checked]:opacity-100 data-[state=checked]:border-blue-500 hover:opacity-80 hover:border-gray-400 dark:border-gray-600 dark:data-[state=checked]:border-blue-500 dark:hover:border-gray-500 transition-all duration-200">
              {rating.emoji}
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.ItemControl>

            <RadioGroup.ItemText className="text-xs font-medium text-gray-600 dark:text-gray-400 opacity-0 data-[state=checked]:opacity-100 transition-opacity">
              {rating.label}
            </RadioGroup.ItemText>
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
