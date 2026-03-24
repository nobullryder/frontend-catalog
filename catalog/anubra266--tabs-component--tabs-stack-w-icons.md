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
tabs-component.tsx
"use client";

import { Tabs } from "@ark-ui/react/tabs";

const tabs = [
  {
    value: "tab1",
    label: "Dashboard",
    content: "Main dashboard with key metrics and insights.",
  },
  {
    value: "tab2",
    label: "Analytics",
    content: "Track performance with detailed reports.",
  },
  {
    value: "tab3",
    label: "Settings",
    content: "Configure preferences and account options.",
  },
];

export default function TabsBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Tabs.Root
        defaultValue="tab1"
        className="w-full flex flex-col items-center"
      >
        <Tabs.List className="flex gap-1 p-1 bg-gray-100 rounded-lg dark:bg-gray-700 w-fit mb-8">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md transition-all data-selected:bg-white data-selected:text-gray-900 data-selected:shadow-sm dark:text-gray-300 dark:data-selected:bg-gray-800 dark:data-selected:text-gray-100"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Content
            key={tab.value}
            value={tab.value}
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}


code.demo.1756152302655.tsx
"use client";

import { Tabs } from "@ark-ui/react/tabs";
import { User, CreditCard, Shield } from "lucide-react";

const tabs = [
  {
    value: "tab1",
    label: "Profile",
    icon: User,
    content: "Update your personal information and avatar.",
  },
  {
    value: "tab2",
    label: "Billing",
    icon: CreditCard,
    content: "Manage subscriptions and payment methods.",
  },
  {
    value: "tab3",
    label: "Privacy",
    icon: Shield,
    content: "Configure data protection and security.",
  },
];

export default function TabsStackWithIcons() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Tabs.Root
        defaultValue="tab1"
        className="w-full flex flex-col items-center max-w-md"
      >
        <Tabs.List className="w-full flex justify-center gap-0.5 mb-0 before:bg-gray-200 dark:before:bg-gray-600 relative before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 bg-gray-100 rounded-t-lg border border-gray-200 border-b-0 py-2 px-6 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors data-selected:text-gray-900 data-selected:bg-white data-selected:border-b-0 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:text-gray-200 dark:data-selected:text-gray-100 dark:data-selected:bg-gray-800 data-selected:z-10"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <div className="w-full">
          {tabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="p-4 text-center text-gray-600 dark:text-gray-300 text-sm"
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tabs-component.tsx
"use client";

import { Tabs } from "@ark-ui/react/tabs";

const tabs = [
  {
    value: "tab1",
    label: "Dashboard",
    content: "Main dashboard with key metrics and insights.",
  },
  {
    value: "tab2",
    label: "Analytics",
    content: "Track performance with detailed reports.",
  },
  {
    value: "tab3",
    label: "Settings",
    content: "Configure preferences and account options.",
  },
];

export default function TabsBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Tabs.Root
        defaultValue="tab1"
        className="w-full flex flex-col items-center"
      >
        <Tabs.List className="flex gap-1 p-1 bg-gray-100 rounded-lg dark:bg-gray-700 w-fit mb-8">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md transition-all data-selected:bg-white data-selected:text-gray-900 data-selected:shadow-sm dark:text-gray-300 dark:data-selected:bg-gray-800 dark:data-selected:text-gray-100"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Content
            key={tab.value}
            value={tab.value}
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
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
