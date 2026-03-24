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
accordion-03.tsx
/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const items = [
  {
    id: "01",
    title: "Who am I?",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg",
    content:
      "I’m Ali Imam — a multidisciplinary designer and creative developer crafting thoughtful digital experiences with purpose and precision.",
  },
  {
    id: "02",
    title: "What do I design?",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-ui.jpg",
    content:
      "I design intuitive interfaces, visual identities, and digital products that connect clarity with emotion — always guided by simplicity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-icons.jpg",
    content:
      "Every project begins with understanding. I combine logic, emotion, and craft to create experiences that feel effortless and meaningful.",
  },
  {
    id: "04",
    title: "Philosophy & values",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-fonts.jpg",
    content:
      "Design should be timeless — not trendy. I value honesty in visuals, restraint in detail, and intention in every decision I make.",
  },
  {
    id: "05",
    title: "Beyond design",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-agency.jpg",
    content:
      "Outside of work, I explore photography, motion, and creative coding — all ways to see and shape the world differently.",
  },
];


export function Accordion03() {
  return (
    <div className="w-full border max-w-3xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem className="relative" value={item.id} key={item.id}>
            <AccordionTrigger className="pl-6 hover:no-underline [&>svg]:hidden">
              <h1 className="text-lg md:text-xl font-semibold">{item.title}</h1>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-muted-foreground w-full h-full md:h-full grid md:grid-cols-2">
              <div className="px-6 space-y-6">
                <p> {item.content}</p>
                <Button>View More</Button>
              </div>
              <img
                className="h-full md:border-l border-t md:border-t-0 md:absolute md:w-1/2 object-cover right-0 top-0"
                src={item.img}
                alt={item.img}
                aria-hidden="true"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}


code.demo.1760068669190.tsx
import { Accordion03 } from "@/components/ui/accordion-03";

export default function DemoOne() {
  return <Accordion03 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-03.tsx
/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const items = [
  {
    id: "01",
    title: "Who am I?",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg",
    content:
      "I’m Ali Imam — a multidisciplinary designer and creative developer crafting thoughtful digital experiences with purpose and precision.",
  },
  {
    id: "02",
    title: "What do I design?",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-ui.jpg",
    content:
      "I design intuitive interfaces, visual identities, and digital products that connect clarity with emotion — always guided by simplicity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-icons.jpg",
    content:
      "Every project begins with understanding. I combine logic, emotion, and craft to create experiences that feel effortless and meaningful.",
  },
  {
    id: "04",
    title: "Philosophy & values",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-fonts.jpg",
    content:
      "Design should be timeless — not trendy. I value honesty in visuals, restraint in detail, and intention in every decision I make.",
  },
  {
    id: "05",
    title: "Beyond design",
    img: "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-agency.jpg",
    content:
      "Outside of work, I explore photography, motion, and creative coding — all ways to see and shape the world differently.",
  },
];


export function Accordion03() {
  return (
    <div className="w-full border max-w-3xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem className="relative" value={item.id} key={item.id}>
            <AccordionTrigger className="pl-6 hover:no-underline [&>svg]:hidden">
              <h1 className="text-lg md:text-xl font-semibold">{item.title}</h1>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-muted-foreground w-full h-full md:h-full grid md:grid-cols-2">
              <div className="px-6 space-y-6">
                <p> {item.content}</p>
                <Button>View More</Button>
              </div>
              <img
                className="h-full md:border-l border-t md:border-t-0 md:absolute md:w-1/2 object-cover right-0 top-0"
                src={item.img}
                alt={item.img}
                aria-hidden="true"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
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
