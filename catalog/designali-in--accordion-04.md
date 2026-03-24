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
accordion-04.tsx
/* eslint-disable react/jsx-key */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Plus } from "@aliimam/icons";
import { cn } from "@/lib/utils"; 


const items = [
  {
    id: "01",
    title: "Who am I?",
    content:
      "I’m Ali Imam — a designer and creative developer focused on building digital experiences that are minimal, meaningful, and timeless.",
  },
  {
    id: "02",
    title: "What do I design?",
    content:
      "I create clean, functional interfaces, brand systems, and digital products. My work blends simplicity with clarity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    content:
      "For me, design isn’t just visuals — it’s how something feels and works. I focus on clarity, detail, and storytelling in every project.",
  },
  {
    id: "04",
    title: "Beyond design",
    content:
      "I bridge design and development, turning ideas into interactive experiences with modern tools and technology.",
  },
  {
    id: "05",
    title: "What inspires me",
    content:
      "Minimalism, architecture, and everyday details. I believe great design is found in the small things we often overlook.",
  }, 
];

export function Accordion02() {
  return (
    <div className="w-full max-w-xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full space-y-2">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="border last:border-b rounded-xl ">
            <AccordionTrigger className="text-left m-1 data-[state=open]:rounded-b-none bg-primary/10 data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden">
              <div className="flex flex-1 px-6 justify-between items-center gap-4">
                 <h3 className="text-2xl font-semibold">{item.title}</h3>
                <div className="relative">
                  <Plus
                    id="plus"
                    strokeWidth={2}
                    className={cn(
                      "h-6 w-6 shrink-0 transition-all duration-500",
                      "data-[state=open]:opacity-0 data-[state=closed]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                  <X
                  strokeWidth={2}
                    id="minus"
                    className={cn(
                      "absolute inset-0 opacity-100 transition-all duration-500",
                      "hover:opacity-100 [data-state=close]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                </div>
               
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-6">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}


code.demo.1760070246877.tsx
import { Accordion02 } from "@/components/ui/accordion-04";

export default function DemoOne() {
  return <Accordion02 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-04.tsx
/* eslint-disable react/jsx-key */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Plus } from "@aliimam/icons";
import { cn } from "@/lib/utils"; 


const items = [
  {
    id: "01",
    title: "Who am I?",
    content:
      "I’m Ali Imam — a designer and creative developer focused on building digital experiences that are minimal, meaningful, and timeless.",
  },
  {
    id: "02",
    title: "What do I design?",
    content:
      "I create clean, functional interfaces, brand systems, and digital products. My work blends simplicity with clarity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    content:
      "For me, design isn’t just visuals — it’s how something feels and works. I focus on clarity, detail, and storytelling in every project.",
  },
  {
    id: "04",
    title: "Beyond design",
    content:
      "I bridge design and development, turning ideas into interactive experiences with modern tools and technology.",
  },
  {
    id: "05",
    title: "What inspires me",
    content:
      "Minimalism, architecture, and everyday details. I believe great design is found in the small things we often overlook.",
  }, 
];

export function Accordion02() {
  return (
    <div className="w-full max-w-xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full space-y-2">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="border last:border-b rounded-xl ">
            <AccordionTrigger className="text-left m-1 data-[state=open]:rounded-b-none bg-primary/10 data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden">
              <div className="flex flex-1 px-6 justify-between items-center gap-4">
                 <h3 className="text-2xl font-semibold">{item.title}</h3>
                <div className="relative">
                  <Plus
                    id="plus"
                    strokeWidth={2}
                    className={cn(
                      "h-6 w-6 shrink-0 transition-all duration-500",
                      "data-[state=open]:opacity-0 data-[state=closed]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                  <X
                  strokeWidth={2}
                    id="minus"
                    className={cn(
                      "absolute inset-0 opacity-100 transition-all duration-500",
                      "hover:opacity-100 [data-state=close]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                </div>
               
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-6">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@aliimam/icons
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
