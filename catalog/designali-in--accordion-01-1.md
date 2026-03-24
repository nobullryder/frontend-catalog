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
accordion-01-1.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "@aliimam/icons";
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
  {
    id: "06",
    title: "Who I work with",
    content:
      "I collaborate with startups, brands, and individuals who value thoughtful design and want to create lasting impact.",
  },
  {
    id: "07",
    title: "My toolkit",
    content:
      "Figma, Next.js, and modern frameworks are part of my process — but for me, tools always serve the idea, not the other way around.",
  },
  {
    id: "08",
    title: "Let’s connect",
    content:
      "You can reach me through contact@aliimam.in or on social platforms. I’m always open to new projects, collaborations, and conversations.",
  },
];

export function Accordion01() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Accordion type="single" defaultValue="04" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1>{item.id}</h1>
                  <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground pb-6 pr-20">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}


code.demo.1760032297719.tsx
import { Accordion01 } from "@/components/ui/accordion-01-1";

export default function DemoOne() {
  return <Accordion01 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-01-1.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "@aliimam/icons";
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
  {
    id: "06",
    title: "Who I work with",
    content:
      "I collaborate with startups, brands, and individuals who value thoughtful design and want to create lasting impact.",
  },
  {
    id: "07",
    title: "My toolkit",
    content:
      "Figma, Next.js, and modern frameworks are part of my process — but for me, tools always serve the idea, not the other way around.",
  },
  {
    id: "08",
    title: "Let’s connect",
    content:
      "You can reach me through contact@aliimam.in or on social platforms. I’m always open to new projects, collaborations, and conversations.",
  },
];

export function Accordion01() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Accordion type="single" defaultValue="04" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger className="text-left hover:pl-3 hover:[&_div.bg-primary]:bg-secondary duration-1000 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden hover:[&_svg]:rotate-90 hover:[&_svg]:text-primary">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h1>{item.id}</h1>
                  <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                </div>
                <div className="bg-primary duration-500 rounded-sm flex items-center p-2">
                  <Plus
                    className={cn(
                      "text-primary-foreground size-4 shrink-0 transition-transform duration-1000",
                      "[data-state=open]:rotate-90"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground pb-6 pr-20">
              {item.content}
            </AccordionContent>
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
