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
accordion-space.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FileText, Folder, LucideIcon, Settings, Users } from "lucide-react";

const data: {
  value: string;
  title: string;
  subtitle: string;
  content: string;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
}[] = [
  {
    value: "documents",
    title: "Documents",
    subtitle: "Manage your files",
    content:
      "View, upload, and organize all your documents in one place. Keep everything structured and easy to find.",
    icon: FileText,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    value: "projects",
    title: "Projects",
    subtitle: "Organize your work",
    content:
      "Group related files and tasks into projects to keep your workflow clean and efficient.",
    icon: Folder,
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    value: "settings",
    title: "Settings",
    subtitle: "Customize your experience",
    content:
      "Adjust preferences, update account details, and configure application behavior.",
    icon: Settings,
    textColor: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    value: "team",
    title: "Team Members",
    subtitle: "Manage users and roles",
    content:
      "Invite new members, assign roles, and control access permissions for your team.",
    icon: Users,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const AccordionDemo = () => (
  <div className="flex items-center justify-center max-w-md w-full">
    <Accordion
      className="w-full -space-y-px"
      defaultValue={[data[0].value]}
    >
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className=" border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-xl",
                    item.bgColor,
                    item.textColor
                  )}
                >
                  <Icon size={20} className="size-5" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ps-14">
              <p className="text-muted-foreground">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  </div>
);

export default AccordionDemo;


code.demo.1772631277915.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText, Folder, Handshake, MinusIcon, PlusIcon, Users } from "lucide-react";

// Static data instead of faker
const items = [
  {
    id: "item-1",
    title: "Company Overview",
    icon: FileText,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    collapsibles: [
      {
        id: "collapsible-1-1",
        title: "Mission Statement",
        content:
          "Our mission is to deliver high-quality products that improve the lives of our customers.",
      },
      {
        id: "collapsible-1-2",
        title: "Core Values",
        content:
          "Integrity, innovation, and customer satisfaction are at the heart of everything we do.",
      },
    ],
  },
  {
    id: "item-2",
    title: "Products & Services",
    icon: Folder,
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
    collapsibles: [
      {
        id: "collapsible-2-1",
        title: "Software Solutions",
        content:
          "We offer a range of software tools designed to enhance business efficiency and productivity.",
      },
      {
        id: "collapsible-2-2",
        title: "Consulting Services",
        content:
          "Our consulting team helps clients identify opportunities, streamline operations, and drive growth.",
      },
    ],
  },
  {
    id: "item-3",
    title: "Team & Culture",
    icon: Handshake,
    textColor: "text-teal-400",
    bgColor: "bg-teal-400/10",
    collapsibles: [
      {
        id: "collapsible-3-1",
        title: "Leadership Team",
        content:
          "Our leadership team is composed of experienced professionals committed to innovation and growth.",
      },
      {
        id: "collapsible-3-2",
        title: "Work Environment",
        content:
          "We foster a collaborative and inclusive culture where everyone can thrive.",
      },
    ],
  },
  {
    id: "item-4",
    title: "Contact Information",
    icon: Users,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
    collapsibles: [
      {
        id: "collapsible-4-1",
        title: "Support",
        content:
          "Reach out to our support team via email or phone for any inquiries or assistance.",
      },
      {
        id: "collapsible-4-2",
        title: "Locations",
        content:
          "Our offices are located in New York, San Francisco, and London to serve clients globally.",
      },
    ],
  },
];

const AccordionMultiLevelDemo = () => (
  <div className="flex items-center justify-center max-w-md w-full">
    <Accordion
      className="w-full -space-y-1"
      defaultValue={[items[0].id]}
    >
      {items.map((item) => (
        <AccordionItem
          className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b"
          key={item.id}
          value={item.id}
        >
          <AccordionTrigger className="group px-4 py-3 hover:no-underline last:[&>svg]:hidden">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-xl",
                    item.bgColor,
                    item.textColor
                  )}
                >
                  <item.icon size={20} className="size-5" />
                </div>
                <span className="flex-1 text-left">{item.title}</span>
              </div>
              <div className="relative size-4 shrink-0">
                <PlusIcon className="absolute inset-0 size-4 text-muted-foreground transition-opacity duration-200 group-data-[panel-open]:opacity-0" />
                <MinusIcon className="absolute inset-0 size-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-data-[panel-open]:opacity-100" />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            {item.collapsibles.map((collapsible) => (
              <Collapsible
                className="space-y-1 border-t border-border bg-accent px-4 py-3"
                key={collapsible.id}
              >
                <CollapsibleTrigger className="flex items-center gap-2 font-medium [&[data-state=open]>svg]:rotate-180">
                  <ChevronDown
                    aria-hidden="true"
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    size={16}
                    strokeWidth={2}
                  />
                  {collapsible.title}
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden ps-6 text-sm text-muted-foreground transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  {collapsible.content}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default AccordionMultiLevelDemo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-space.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FileText, Folder, LucideIcon, Settings, Users } from "lucide-react";

const data: {
  value: string;
  title: string;
  subtitle: string;
  content: string;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
}[] = [
  {
    value: "documents",
    title: "Documents",
    subtitle: "Manage your files",
    content:
      "View, upload, and organize all your documents in one place. Keep everything structured and easy to find.",
    icon: FileText,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    value: "projects",
    title: "Projects",
    subtitle: "Organize your work",
    content:
      "Group related files and tasks into projects to keep your workflow clean and efficient.",
    icon: Folder,
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    value: "settings",
    title: "Settings",
    subtitle: "Customize your experience",
    content:
      "Adjust preferences, update account details, and configure application behavior.",
    icon: Settings,
    textColor: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    value: "team",
    title: "Team Members",
    subtitle: "Manage users and roles",
    content:
      "Invite new members, assign roles, and control access permissions for your team.",
    icon: Users,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

const AccordionDemo = () => (
  <div className="flex items-center justify-center max-w-md w-full">
    <Accordion
      className="w-full -space-y-px"
      defaultValue={[data[0].value]}
    >
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className=" border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-xl",
                    item.bgColor,
                    item.textColor
                  )}
                >
                  <Icon size={20} className="size-5" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ps-14">
              <p className="text-muted-foreground">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  </div>
);

export default AccordionDemo;

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
