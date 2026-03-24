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
faqsection.tsx
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  faqsLeft: FAQItem[];
  faqsRight: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = "Product & Account Help",
  subtitle = "Frequently Asked Questions",
  description = "Get instant answers to the most common questions about your account, product setup, and updates.",
  buttonLabel = "Browse All FAQs →",
  onButtonClick,
  faqsLeft,
  faqsRight,
  className,
}: FAQSectionProps) {
  return (
    <section className={cn("w-full max-w-5xl mx-auto py-16 px-4", className)}>
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm text-muted-foreground font-medium tracking-wide mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          {description}
        </p>
        <Button variant="default" className="rounded-full" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>

      {/* FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {[faqsLeft, faqsRight].map((faqColumn, columnIndex) => (
          <Accordion
            key={columnIndex}
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqColumn.map((faq, i) => (
              <AccordionItem key={i} value={`item-${columnIndex}-${i}`}>
                <AccordionTrigger className="text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  <div className="min-h-[40px] transition-all duration-200 ease-in-out">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </section>
  );
}


code.demo.1760638768341.tsx
import { FAQSection } from "@/components/ui/faqsection";

export default function FAQDemoPage() {
  const faqsLeft = [
    {
      question: "What makes this platform different?",
      answer:
        "Our platform combines AI-driven insights with human-centered design to help you build and scale digital experiences faster than ever.",
    },
    {
      question: "Can I use it for both personal and commercial projects?",
      answer:
        "Absolutely. You can use it freely for your personal projects, startups, or client work as long as you comply with our license terms.",
    },
    {
      question: "Does it support collaboration?",
      answer:
        "Yes, teams can collaborate in real-time using shared workspaces. You can invite members and manage permissions directly from your dashboard.",
    },
    {
      question: "How does the analytics system work?",
      answer:
        "We track anonymous performance metrics to help you understand usage trends and improve user experience. You have full control over data collection.",
    },
    {
      question: "Is there a mobile version available?",
      answer:
        "Yes, our mobile app offers key features such as notifications, dashboards, and workspace access for on-the-go productivity.",
    },
  ];

  const faqsRight = [
    {
      question: "How often are new updates released?",
      answer:
        "We roll out major updates every quarter, along with smaller improvements and bug fixes on a biweekly basis.",
    },
    {
      question: "Can I integrate it with external APIs?",
      answer:
        "Yes, the system provides REST and GraphQL APIs that make integration with third-party tools and custom workflows easy.",
    },
    {
      question: "Does the platform support dark mode?",
      answer:
        "Of course! You can toggle between light and dark themes, and your preference will be saved automatically across sessions.",
    },
    {
      question: "What happens if I lose my data?",
      answer:
        "All your data is backed up automatically every 24 hours. You can restore it from any previous snapshot in your account settings.",
    },
    {
      question: "Can I customize the UI components?",
      answer:
        "Yes, every component is built to be theme-aware and fully customizable using Tailwind CSS variables or your own design tokens.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FAQSection
        title="Platform & Product Support"
        subtitle="Frequently Asked Questions"
        description="Everything you need to know about how our platform works, from setup and customization to integrations and updates."
        buttonLabel="See Full Help Center →"
        faqsLeft={faqsLeft}
        faqsRight={faqsRight}
      />
    </main>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/faqsection.tsx
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  faqsLeft: FAQItem[];
  faqsRight: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = "Product & Account Help",
  subtitle = "Frequently Asked Questions",
  description = "Get instant answers to the most common questions about your account, product setup, and updates.",
  buttonLabel = "Browse All FAQs →",
  onButtonClick,
  faqsLeft,
  faqsRight,
  className,
}: FAQSectionProps) {
  return (
    <section className={cn("w-full max-w-5xl mx-auto py-16 px-4", className)}>
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm text-muted-foreground font-medium tracking-wide mb-2">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          {description}
        </p>
        <Button variant="default" className="rounded-full" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>

      {/* FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {[faqsLeft, faqsRight].map((faqColumn, columnIndex) => (
          <Accordion
            key={columnIndex}
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqColumn.map((faq, i) => (
              <AccordionItem key={i} value={`item-${columnIndex}-${i}`}>
                <AccordionTrigger className="text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  <div className="min-h-[40px] transition-all duration-200 ease-in-out">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </section>
  );
}

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
