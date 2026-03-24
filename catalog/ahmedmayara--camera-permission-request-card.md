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
camera-permission-request-card.tsx
import { RiAppleFill, RiQuestionLine } from "@remixicon/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export const Component = () => {
  return (
    <Card className="flex w-full max-w-[500px] flex-col rounded-[14px] bg-muted/40 p-[4px] shadow-none">
      <CardContent className="relative flex flex-col items-center justify-center overflow-hidden rounded-[10px] bg-background p-0 ring-1 ring-border">
        <div className="z-10 flex w-full flex-col items-center justify-center gap-4.5 px-6 py-8 text-center">
          <img
            src="https://icons-app-two.vercel.app/camera-app-icon.svg"
            alt="camera icon"
            className="size-12 rounded-xl"
          />
          <div className="flex max-w-96 flex-col gap-1.5">
            <CardTitle className="text-lg">Camera permission required</CardTitle>
            <CardDescription className="tracking-[-0.006em]">
              To make video calls, please turn on the camera permission in your
              app by clicking the notification.
            </CardDescription>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl bg-accent/70 p-6 ring-1 ring-border ring-inset dark:bg-popover">
            <div className="ml-8 grid w-full grid-cols-[70px_1fr] overflow-hidden rounded-xl bg-card ring-1 ring-border drop-shadow-xl">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden border-r bg-[repeating-linear-gradient(-60deg,var(--color-border)_0_0.5px,transparent_0.5px_8px)]">
                <img
                  src="https://icons-app-two.vercel.app/camera-app-icon.svg"
                  alt="camera icon"
                  className="ml-10 size-16 rounded-xl"
                />
                <span className="absolute top-3 left-3 size-[11px] rounded-full bg-gradient-to-b from-green-600 via-green-500 to-green-400 inset-shadow-sm inset-shadow-green-300"></span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-0.5 text-left">
                  <h3 className="text-sm font-medium tracking-[-0.006em]">
                    Allow camera access
                  </h3>
                  <p className="text-xs tracking-[-0.006em] text-muted-foreground">
                    Allow camera access to make video calls
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-xs text-muted-foreground"
                  >
                    Deny
                  </Button>
                  <Button variant="link" size="sm" className="p-0 text-xs">
                    Allow
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Accordion
            type="single"
            variant="solid"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem
              value="item-1"
              className="ring-1 ring-border dark:bg-popover"
            >
              <AccordionTrigger className="text-sm dark:bg-popover">
                <div className="flex items-center gap-1.5">
                  <RiQuestionLine className="size-4 text-muted-foreground" />
                  Step-by-step guide
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ol className="ml-9.5 list-decimal space-y-2 text-left tracking-[-0.006em]">
                  <li>
                    Click the{" "}
                    <span className="inline-flex items-center gap-1 font-bold">
                      Apple menu
                      <RiAppleFill className="size-4" />
                    </span>{" "}
                    in the top-left corner.
                  </li>

                  <li>
                    Select <span className="font-bold">System Settings</span>{" "}
                    (or <span className="font-bold">System Preferences</span>).
                  </li>
                  <li>
                    In the sidebar, click{" "}
                    <span className="font-bold">Privacy & Security</span>.
                  </li>
                  <li>
                    Scroll down and select{" "}
                    <span className="font-bold">Camera</span>.
                  </li>
                  <li>Find our app in the list and toggle it on!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="z-10 flex w-full items-center justify-between border-t bg-background px-6 py-4">
          <Button variant="outline">Didn’t get a notification?</Button>
          <Button>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
};


code.demo.1757772824905.tsx
import { Component } from "@/components/ui/camera-permission-request-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/camera-permission-request-card.tsx
import { RiAppleFill, RiQuestionLine } from "@remixicon/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export const Component = () => {
  return (
    <Card className="flex w-full max-w-[500px] flex-col rounded-[14px] bg-muted/40 p-[4px] shadow-none">
      <CardContent className="relative flex flex-col items-center justify-center overflow-hidden rounded-[10px] bg-background p-0 ring-1 ring-border">
        <div className="z-10 flex w-full flex-col items-center justify-center gap-4.5 px-6 py-8 text-center">
          <img
            src="https://icons-app-two.vercel.app/camera-app-icon.svg"
            alt="camera icon"
            className="size-12 rounded-xl"
          />
          <div className="flex max-w-96 flex-col gap-1.5">
            <CardTitle className="text-lg">Camera permission required</CardTitle>
            <CardDescription className="tracking-[-0.006em]">
              To make video calls, please turn on the camera permission in your
              app by clicking the notification.
            </CardDescription>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl bg-accent/70 p-6 ring-1 ring-border ring-inset dark:bg-popover">
            <div className="ml-8 grid w-full grid-cols-[70px_1fr] overflow-hidden rounded-xl bg-card ring-1 ring-border drop-shadow-xl">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden border-r bg-[repeating-linear-gradient(-60deg,var(--color-border)_0_0.5px,transparent_0.5px_8px)]">
                <img
                  src="https://icons-app-two.vercel.app/camera-app-icon.svg"
                  alt="camera icon"
                  className="ml-10 size-16 rounded-xl"
                />
                <span className="absolute top-3 left-3 size-[11px] rounded-full bg-gradient-to-b from-green-600 via-green-500 to-green-400 inset-shadow-sm inset-shadow-green-300"></span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-0.5 text-left">
                  <h3 className="text-sm font-medium tracking-[-0.006em]">
                    Allow camera access
                  </h3>
                  <p className="text-xs tracking-[-0.006em] text-muted-foreground">
                    Allow camera access to make video calls
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-xs text-muted-foreground"
                  >
                    Deny
                  </Button>
                  <Button variant="link" size="sm" className="p-0 text-xs">
                    Allow
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Accordion
            type="single"
            variant="solid"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem
              value="item-1"
              className="ring-1 ring-border dark:bg-popover"
            >
              <AccordionTrigger className="text-sm dark:bg-popover">
                <div className="flex items-center gap-1.5">
                  <RiQuestionLine className="size-4 text-muted-foreground" />
                  Step-by-step guide
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ol className="ml-9.5 list-decimal space-y-2 text-left tracking-[-0.006em]">
                  <li>
                    Click the{" "}
                    <span className="inline-flex items-center gap-1 font-bold">
                      Apple menu
                      <RiAppleFill className="size-4" />
                    </span>{" "}
                    in the top-left corner.
                  </li>

                  <li>
                    Select <span className="font-bold">System Settings</span>{" "}
                    (or <span className="font-bold">System Preferences</span>).
                  </li>
                  <li>
                    In the sidebar, click{" "}
                    <span className="font-bold">Privacy & Security</span>.
                  </li>
                  <li>
                    Scroll down and select{" "}
                    <span className="font-bold">Camera</span>.
                  </li>
                  <li>Find our app in the list and toggle it on!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="z-10 flex w-full items-center justify-between border-t bg-background px-6 py-4">
          <Button variant="outline">Didn’t get a notification?</Button>
          <Button>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
};

```

Install NPM dependencies:
```bash
@remixicon/react
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
