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

export default function Colors() {
  return (
    <RadioGroup.Root className="flex gap-3" defaultValue="red">
      <RadioGroup.Item value="red" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-red-500 rounded-full data-[state=checked]:border-red-500 hover:border-red-500 data-focus:ring-2 data-focus:ring-red-500/50 transition-all duration-200 flex items-center justify-center bg-red-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>

      <RadioGroup.Item value="blue" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-blue-500 rounded-full data-[state=checked]:border-blue-500 hover:border-blue-500 data-focus:ring-2 data-focus:ring-blue-500/50 transition-all duration-200 flex items-center justify-center bg-blue-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>

      <RadioGroup.Item value="green" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-green-500 rounded-full data-[state=checked]:border-green-500 hover:border-green-500 data-focus:ring-2 data-focus:ring-green-500/50 transition-all duration-200 flex items-center justify-center bg-green-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>

      <RadioGroup.Item value="yellow" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-yellow-500 rounded-full data-[state=checked]:border-yellow-500 hover:border-yellow-500 data-focus:ring-2 data-focus:ring-yellow-500/50 transition-all duration-200 flex items-center justify-center bg-yellow-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>

      <RadioGroup.Item value="purple" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-purple-500 rounded-full data-[state=checked]:border-purple-500 hover:border-purple-500 data-focus:ring-2 data-focus:ring-purple-500/50 transition-all duration-200 flex items-center justify-center bg-purple-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>

      <RadioGroup.Item value="pink" className="cursor-pointer">
        <RadioGroup.ItemControl className="group size-6 border-2 border-pink-500 rounded-full data-[state=checked]:border-pink-500 hover:border-pink-500 data-focus:ring-2 data-focus:ring-pink-500/50 transition-all duration-200 flex items-center justify-center bg-pink-500">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-0 group-data-[state=checked]:opacity-100 transition-opacity text-white"
          >
            <circle cx="6" cy="6" r="6"></circle>
          </svg>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    </RadioGroup.Root>
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
