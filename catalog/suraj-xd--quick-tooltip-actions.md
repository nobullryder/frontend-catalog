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
quick-tooltip-actions.tsx
"use client";

import Link from "next/link";
import { MessageCircle, PersonStanding, User, Users } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TickerOptions = [
  {
    icon: <MessageCircle className="h-4 w-4" />,
    tooltip: "Chat",
    href: (ticker: string) => `/${ticker}?activeTab=Chat`,
  },
  {
    icon: <PersonStanding className="h-4 w-4" />,
    tooltip: "Persona",
    href: (ticker: string) => `/${ticker}?activeTab=Persona`,
  },
  {
    icon: <Users className="h-4 w-4" />,
    tooltip: "Competitors",
    href: (ticker: string) => `/${ticker}?activeTab=Competitors`,
  },
];

export function QuickTickerOptions({ ticker }: { ticker: string }) {
  return (
    <div className="flex gap-2 justify-center items-center text-foreground border bg-background rounded-xl px-2 py-1.5">
      {TickerOptions.map((option) => (
        <TickerOptionPil
          key={option.tooltip}
          icon={option.icon}
          tooltip={option.tooltip}
          href={option.href}
          ticker={ticker}
        />
      ))}
    </div>
  );
}

function TickerOptionPil({
  icon,
  tooltip,
  href,
  ticker,
}: {
  icon: React.ReactNode;
  tooltip: string;
  href: (ticker: string) => string;
  ticker: string;
}) {
  return (
    <Link
      href={href(ticker)}
      className="p-1 group hover:bg-muted-foreground/10 rounded-full cursor-pointer flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-xs absolute -top-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-popover px-1 py-0.5 rounded-md text-center border">
        {tooltip}
      </p>
    </Link>
  );
}

export const Component = ()=> {
  const [ticker, setTicker] = useState("AAPL");
  return (
    <div className="flex w-full justify-center items-center h-[400px]">
      <TooltipProvider>
        <Tooltip key={ticker} delayDuration={0.2}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="rounded-full" size={"icon"}>
              <User className={"size-4"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={0}
            align="center"
            className="p-0 bg-popover rounded-xl ml-1"
          >
            <QuickTickerOptions ticker={ticker} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}


code.demo.1748972490038.tsx
import { Component } from "@/components/ui/quick-tooltip-actions";

const DemoOne = () => {
  return <Component />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/quick-tooltip-actions.tsx
"use client";

import Link from "next/link";
import { MessageCircle, PersonStanding, User, Users } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TickerOptions = [
  {
    icon: <MessageCircle className="h-4 w-4" />,
    tooltip: "Chat",
    href: (ticker: string) => `/${ticker}?activeTab=Chat`,
  },
  {
    icon: <PersonStanding className="h-4 w-4" />,
    tooltip: "Persona",
    href: (ticker: string) => `/${ticker}?activeTab=Persona`,
  },
  {
    icon: <Users className="h-4 w-4" />,
    tooltip: "Competitors",
    href: (ticker: string) => `/${ticker}?activeTab=Competitors`,
  },
];

export function QuickTickerOptions({ ticker }: { ticker: string }) {
  return (
    <div className="flex gap-2 justify-center items-center text-foreground border bg-background rounded-xl px-2 py-1.5">
      {TickerOptions.map((option) => (
        <TickerOptionPil
          key={option.tooltip}
          icon={option.icon}
          tooltip={option.tooltip}
          href={option.href}
          ticker={ticker}
        />
      ))}
    </div>
  );
}

function TickerOptionPil({
  icon,
  tooltip,
  href,
  ticker,
}: {
  icon: React.ReactNode;
  tooltip: string;
  href: (ticker: string) => string;
  ticker: string;
}) {
  return (
    <Link
      href={href(ticker)}
      className="p-1 group hover:bg-muted-foreground/10 rounded-full cursor-pointer flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-xs absolute -top-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-popover px-1 py-0.5 rounded-md text-center border">
        {tooltip}
      </p>
    </Link>
  );
}

export const Component = ()=> {
  const [ticker, setTicker] = useState("AAPL");
  return (
    <div className="flex w-full justify-center items-center h-[400px]">
      <TooltipProvider>
        <Tooltip key={ticker} delayDuration={0.2}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="rounded-full" size={"icon"}>
              <User className={"size-4"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={0}
            align="center"
            className="p-0 bg-popover rounded-xl ml-1"
          >
            <QuickTickerOptions ticker={ticker} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
