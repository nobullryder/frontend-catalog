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
accordion-1.tsx
import { Accordion } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

export default function BasicAccordion() {
  const items = [
    {
      id: "react",
      title: "Building Interactive Websites",
      content:
        "Discover the art of crafting beautiful, responsive websites that engage users with smooth animations, intuitive navigation, and modern design principles.",
    },
    {
      id: "solid",
      title: "Creating Digital Art",
      content:
        "Express your creativity through digital mediums, exploring color theory, composition, and modern tools to bring your artistic vision to life.",
    },
    {
      id: "vue",
      title: "Learning Photography",
      content:
        "Master the fundamentals of photography, from understanding light and composition to post-processing techniques that make your images truly stunning.",
    },
    {
      id: "svelte",
      title: "Exploring Space",
      content:
        "Journey beyond our planet to discover distant galaxies, mysterious black holes, and the endless wonders that await in the cosmic frontier.",
    },
  ];

  return (
    <Accordion.Root
      defaultValue={["react"]}
      collapsible
      className="w-full max-w-md mx-auto bg-linear-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xs"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="group border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
        >
          <Accordion.ItemTrigger className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-linear-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200">
            <span className="font-medium text-gray-900 dark:text-white">
              {item.title}
            </span>
            <Accordion.ItemIndicator className="ml-2 transition-transform duration-200 data-[state=open]:rotate-180">
              <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className="px-4 pb-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="pt-3">{item.content}</div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}


code.demo.1756477598764.tsx
import { Accordion } from "@ark-ui/react/accordion";
import {
  ChevronDownIcon,
  Sparkles,
  Settings,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function WithIconAndChevronAccordion() {
  const items = [
    {
      id: "creative-talents",
      title: "Discover hidden creative talents",
      content:
        "Unlock your inner artist by exploring new mediums, experimenting with bold techniques, and embracing the creative process without fear of judgment.",
      icon: Sparkles,
    },
    {
      id: "customize-workspace",
      title: "Customize your workspace perfectly",
      content:
        "Transform your environment into a productivity powerhouse with smart organization, ergonomic setups, and personalized touches that inspire daily success.",
      icon: Settings,
    },
    {
      id: "time-management",
      title: "Master efficient time management",
      content:
        "Develop powerful habits that maximize your daily potential through strategic planning, priority setting, and mindful focus techniques.",
      icon: Clock,
    },
    {
      id: "effective-communication",
      title: "Learn the art of effective communication",
      content:
        "Build meaningful connections through active listening, empathy, and clear expression that resonates with others on a deeper level.",
      icon: HelpCircle,
    },
  ];

  return (
    <Accordion.Root
      defaultValue={["creative-talents"]}
      collapsible
      className="w-full max-w-md mx-auto bg-linear-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xs"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="group border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
        >
          <Accordion.ItemTrigger className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-linear-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200">
            <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="font-medium text-gray-900 dark:text-white">
              {item.title}
            </span>
            <Accordion.ItemIndicator className="ml-2 transition-transform duration-200 data-[state=open]:rotate-180">
              <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className="px-4 pb-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="pt-3 pl-7">{item.content}</div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-1.tsx
import { Accordion } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

export default function BasicAccordion() {
  const items = [
    {
      id: "react",
      title: "Building Interactive Websites",
      content:
        "Discover the art of crafting beautiful, responsive websites that engage users with smooth animations, intuitive navigation, and modern design principles.",
    },
    {
      id: "solid",
      title: "Creating Digital Art",
      content:
        "Express your creativity through digital mediums, exploring color theory, composition, and modern tools to bring your artistic vision to life.",
    },
    {
      id: "vue",
      title: "Learning Photography",
      content:
        "Master the fundamentals of photography, from understanding light and composition to post-processing techniques that make your images truly stunning.",
    },
    {
      id: "svelte",
      title: "Exploring Space",
      content:
        "Journey beyond our planet to discover distant galaxies, mysterious black holes, and the endless wonders that await in the cosmic frontier.",
    },
  ];

  return (
    <Accordion.Root
      defaultValue={["react"]}
      collapsible
      className="w-full max-w-md mx-auto bg-linear-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xs"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="group border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
        >
          <Accordion.ItemTrigger className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-linear-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200">
            <span className="font-medium text-gray-900 dark:text-white">
              {item.title}
            </span>
            <Accordion.ItemIndicator className="ml-2 transition-transform duration-200 data-[state=open]:rotate-180">
              <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className="px-4 pb-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="pt-3">{item.content}</div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, @ark-ui/react
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
