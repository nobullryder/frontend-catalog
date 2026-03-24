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
ruixen-accordian02.tsx
// components/Accordion_02.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Accordion_02() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Have questions?</h2>
          <p className="text-muted-foreground text-lg">
            We're here to help you understand how everything works. If you still have
            doubts, feel free to{" "}
            <a href="/contact" className="underline">
              reach out to our team
            </a>
            .
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-10">
          {/* General Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              General
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="gen-1">
                <AccordionTrigger>
                  What is the purpose of this platform?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="gen-2">
                <AccordionTrigger>
                  Is this service available worldwide?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we support users across the globe. Some regional features may vary.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Billing Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Billing
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="bill-1">
                <AccordionTrigger>
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 7-day refund policy. If you're unsatisfied, just contact our support within that time frame.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bill-2">
                <AccordionTrigger>
                  Can I change my plan later?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Technical Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Technical
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="tech-1">
                <AccordionTrigger>
                  Does this integrate with other tools?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We support integrations with Slack, Notion, Zapier, and many more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2">
                <AccordionTrigger>
                  Is there an API available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}


code.demo.1749919565742.tsx
import Accordion_02 from "@/components/ui/ruixen-accordian02";

const DemoOne = () => {
  return <Accordion_02 />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-accordian02.tsx
// components/Accordion_02.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Accordion_02() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left Column */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Have questions?</h2>
          <p className="text-muted-foreground text-lg">
            We're here to help you understand how everything works. If you still have
            doubts, feel free to{" "}
            <a href="/contact" className="underline">
              reach out to our team
            </a>
            .
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-10">
          {/* General Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              General
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="gen-1">
                <AccordionTrigger>
                  What is the purpose of this platform?
                </AccordionTrigger>
                <AccordionContent>
                  Our platform is designed to simplify your workflow and save you hours every week using automation and AI-powered tools.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="gen-2">
                <AccordionTrigger>
                  Is this service available worldwide?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we support users across the globe. Some regional features may vary.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Billing Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Billing
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="bill-1">
                <AccordionTrigger>
                  Do you offer refunds?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a 7-day refund policy. If you're unsatisfied, just contact our support within that time frame.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bill-2">
                <AccordionTrigger>
                  Can I change my plan later?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can upgrade or downgrade your plan anytime from your account dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Technical Section */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Technical
            </h3>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="tech-1">
                <AccordionTrigger>
                  Does this integrate with other tools?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We support integrations with Slack, Notion, Zapier, and many more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tech-2">
                <AccordionTrigger>
                  Is there an API available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our public API is available for all Pro users. Documentation can be found in the developer portal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
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
