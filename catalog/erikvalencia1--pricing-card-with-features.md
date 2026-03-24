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
pricing-card-with-features.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export const Box = (): JSX.Element => {
  const features = [
    { label: "Complete App development", info: "End-to-end GPT app delivery." },
    { label: "Custom UI/UX Interfaces for ChatGPT", info: "Optimized conversational design." },
    { label: "Backend API integration", info: "Seamless OpenAI + third-party API integration." },
    { label: "OAuth authentication setup trough OpenAI", info: "Implements secure OAuth sign-in." },
    { label: "Production deployment", info: "Deployment on Vercel or preferred host." },
    { label: "Updates every 48h", info: "Frequent feature & patch releases." },
    { label: "30-90 days post-launch support", info: "Ongoing stability & support." },
    { label: "Handling submission process with OpenAI", info: "App review & approval assistance." },
  ];

  return (
    <TooltipProvider>
      <Card className="w-[464px] rounded-[38px] border border-border bg-card text-card-foreground p-[23px] flex flex-col gap-6 shadow-sm">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold leading-[24px]">
            Full GPT App Development
          </h2>
          <p className="text-base text-muted-foreground leading-[19px]">
            Tailor solution for your case
          </p>
        </div>

        {/* Features */}
        <CardContent className="rounded-[33px] border border-border bg-background px-[27px] py-[30px] flex flex-col gap-[25px]">
          {features.map((f, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
                  <FaCheck className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="text-base leading-[19px]">{f.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[260px] text-sm bg-popover text-popover-foreground border border-border rounded-xl px-3 py-2 shadow-md"
              >
                {f.info}
              </TooltipContent>
            </Tooltip>
          ))}
        </CardContent>

        {/* Footer */}
        <div className="flex items-center justify-between px-[6px]">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-[34px] font-medium leading-[41px]">$3499</span>
          </div>

          {/* Simple gradient button */}
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-[220px] h-[64px] rounded-[39px] text-[20px] font-medium text-white",
              "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500",
              "border-[3px] border-blue-600",
              "shadow-sm hover:opacity-90 transition-all duration-150"
            )}
          >
            <FaPhoneAlt className="w-[20px] h-[20px]" />
            <span>Book a call</span>
          </Button>
        </div>
      </Card>
    </TooltipProvider>
  );
};


code.demo.1759819408275.tsx
import { Box } from "@/components/ui/pricing-card-with-features";

export default function DemoOne() {
  return <Box />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pricing-card-with-features.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export const Box = (): JSX.Element => {
  const features = [
    { label: "Complete App development", info: "End-to-end GPT app delivery." },
    { label: "Custom UI/UX Interfaces for ChatGPT", info: "Optimized conversational design." },
    { label: "Backend API integration", info: "Seamless OpenAI + third-party API integration." },
    { label: "OAuth authentication setup trough OpenAI", info: "Implements secure OAuth sign-in." },
    { label: "Production deployment", info: "Deployment on Vercel or preferred host." },
    { label: "Updates every 48h", info: "Frequent feature & patch releases." },
    { label: "30-90 days post-launch support", info: "Ongoing stability & support." },
    { label: "Handling submission process with OpenAI", info: "App review & approval assistance." },
  ];

  return (
    <TooltipProvider>
      <Card className="w-[464px] rounded-[38px] border border-border bg-card text-card-foreground p-[23px] flex flex-col gap-6 shadow-sm">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold leading-[24px]">
            Full GPT App Development
          </h2>
          <p className="text-base text-muted-foreground leading-[19px]">
            Tailor solution for your case
          </p>
        </div>

        {/* Features */}
        <CardContent className="rounded-[33px] border border-border bg-background px-[27px] py-[30px] flex flex-col gap-[25px]">
          {features.map((f, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
                  <FaCheck className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="text-base leading-[19px]">{f.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[260px] text-sm bg-popover text-popover-foreground border border-border rounded-xl px-3 py-2 shadow-md"
              >
                {f.info}
              </TooltipContent>
            </Tooltip>
          ))}
        </CardContent>

        {/* Footer */}
        <div className="flex items-center justify-between px-[6px]">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-[34px] font-medium leading-[41px]">$3499</span>
          </div>

          {/* Simple gradient button */}
          <Button
            className={cn(
              "flex items-center justify-center gap-3 w-[220px] h-[64px] rounded-[39px] text-[20px] font-medium text-white",
              "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500",
              "border-[3px] border-blue-600",
              "shadow-sm hover:opacity-90 transition-all duration-150"
            )}
          >
            <FaPhoneAlt className="w-[20px] h-[20px]" />
            <span>Book a call</span>
          </Button>
        </div>
      </Card>
    </TooltipProvider>
  );
};

```

Install NPM dependencies:
```bash
react-icons
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
