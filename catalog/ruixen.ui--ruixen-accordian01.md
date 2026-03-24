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
ruixen-accordian01.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  LayoutList,
  Settings,
  Accessibility,
} from "lucide-react";
import { ElementType } from "react";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};

const accordionItems: AccordionItemType[] = [
  {
    icon: HelpCircle,
    value: "item-1",
    question: "Is this an accordion component?",
    answer:
      "Yes. This is an accordion component built with Radix UI and styled with Tailwind CSS.",
  },
  {
    icon: LayoutList,
    value: "item-2",
    question: "How do I use this component?",
    answer:
      "You can use this component to organize content in collapsible sections. It's perfect for FAQs, settings panels, or any content that benefits from progressive disclosure.",
  },
  {
    icon: Settings,
    value: "item-3",
    question: "Can I customize the styling?",
    answer:
      "Absolutely! This component uses Tailwind CSS for styling, so you can easily customize the appearance by modifying the class names. The component is also built with accessibility in mind.",
  },
  {
    icon: Accessibility,
    value: "item-4",
    question: "Is it accessible?",
    answer:
      "Yes! This accordion component is built on top of Radix UI's Accordion primitive, which provides full keyboard navigation and proper ARIA attributes for screen readers.",
  },
];

export default function Accordion_01() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      <Accordion type="single" collapsible className="space-y-3">
        {accordionItems.map(({ icon: Icon, value, question, answer }) => (
          <AccordionItem
            key={value}
            value={value}
            className="group border border-black/10 dark:border-white/10 rounded-md overflow-hidden transition-all duration-300"
          >
            <AccordionTrigger
              className="flex items-center justify-between w-full px-4 py-3 bg-transparent text-left group-data-[state=open]:bg-black/[0.04] dark:group-data-[state=open]:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className="w-5 h-5 transition-colors duration-300 text-black/60 dark:text-white/60 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white" />
                <span className="text-base font-medium text-black dark:text-white">
                  {question}
                </span>
              </div>
              {/* No chevron rotation */}
              <span className="text-xs text-black/40 dark:text-white/40 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white">
                {value.toUpperCase()}
              </span>
            </AccordionTrigger>

            <AccordionContent className="relative px-4 py-3 text-sm text-black dark:text-white border-t border-black/10 dark:border-white/10 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-black dark:before:bg-white before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}


code.demo.1749663308666.tsx
import Accordion_01 from "@/components/ui/ruixen-accordian01";

const DemoOne = () => {
  return <Accordion_01 />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-accordian01.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  LayoutList,
  Settings,
  Accessibility,
} from "lucide-react";
import { ElementType } from "react";

type AccordionItemType = {
  icon: ElementType;
  value: string;
  question: string;
  answer: string;
};

const accordionItems: AccordionItemType[] = [
  {
    icon: HelpCircle,
    value: "item-1",
    question: "Is this an accordion component?",
    answer:
      "Yes. This is an accordion component built with Radix UI and styled with Tailwind CSS.",
  },
  {
    icon: LayoutList,
    value: "item-2",
    question: "How do I use this component?",
    answer:
      "You can use this component to organize content in collapsible sections. It's perfect for FAQs, settings panels, or any content that benefits from progressive disclosure.",
  },
  {
    icon: Settings,
    value: "item-3",
    question: "Can I customize the styling?",
    answer:
      "Absolutely! This component uses Tailwind CSS for styling, so you can easily customize the appearance by modifying the class names. The component is also built with accessibility in mind.",
  },
  {
    icon: Accessibility,
    value: "item-4",
    question: "Is it accessible?",
    answer:
      "Yes! This accordion component is built on top of Radix UI's Accordion primitive, which provides full keyboard navigation and proper ARIA attributes for screen readers.",
  },
];

export default function Accordion_01() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      <Accordion type="single" collapsible className="space-y-3">
        {accordionItems.map(({ icon: Icon, value, question, answer }) => (
          <AccordionItem
            key={value}
            value={value}
            className="group border border-black/10 dark:border-white/10 rounded-md overflow-hidden transition-all duration-300"
          >
            <AccordionTrigger
              className="flex items-center justify-between w-full px-4 py-3 bg-transparent text-left group-data-[state=open]:bg-black/[0.04] dark:group-data-[state=open]:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className="w-5 h-5 transition-colors duration-300 text-black/60 dark:text-white/60 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white" />
                <span className="text-base font-medium text-black dark:text-white">
                  {question}
                </span>
              </div>
              {/* No chevron rotation */}
              <span className="text-xs text-black/40 dark:text-white/40 group-data-[state=open]:text-black dark:group-data-[state=open]:text-white">
                {value.toUpperCase()}
              </span>
            </AccordionTrigger>

            <AccordionContent className="relative px-4 py-3 text-sm text-black dark:text-white border-t border-black/10 dark:border-white/10 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-black dark:before:bg-white before:opacity-0 group-data-[state=open]:before:opacity-100 transition-all duration-300">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

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
