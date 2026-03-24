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
package-installer-tabs.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si"; // React icons

interface PackageTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  command: string;
  packageName: string;
  extra: string;
}

const tabs: PackageTab[] = [
  {
    id: "npm",
    label: "npm",
    icon: <SiNpm className="w-4 h-4" />,
    command: "npx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "pnpm",
    label: "pnpm",
    icon: <SiPnpm className="w-4 h-4" />,
    command: "pnpm dlx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "yarn",
    label: "yarn",
    icon: <SiYarn className="w-4 h-4" />,
    command: "yarn dlx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "bun",
    label: "bun",
    icon: <SiBun className="w-4 h-4" />,
    command: "bunx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
];

const PackageInstallerTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("npm");
  const [copied, setCopied] = useState(false);

  const activeCommand = tabs.find((tab) => tab.id === activeTab)!;

  const handleCopy = () => {
    const commandText = `${activeCommand.command} ${activeCommand.packageName} ${activeCommand.extra}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(commandText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="p-4 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <pre className="font-mono text-sm bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md w-full overflow-x-auto">
            <span className="text-amber-400">{activeCommand.command}</span>{" "}
            <span className="text-teal-500">{activeCommand.packageName}</span>{" "}
            <span className="text-zinc-700 dark:text-zinc-300">
              {activeCommand.extra}
            </span>
          </pre>
          <Button
            variant="outline"
            className="ml-2 flex items-center gap-1"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInstallerTabs;


code.demo.1758921258731.tsx
"use client";

import React from "react";
import PackageInstallerTabs from "@/components/ui/package-installer-tabs";

const DemoPage = () => {
  return (
    <PackageInstallerTabs />
  );
};

export default DemoPage;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/package-installer-tabs.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { SiNpm, SiPnpm, SiYarn, SiBun } from "react-icons/si"; // React icons

interface PackageTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  command: string;
  packageName: string;
  extra: string;
}

const tabs: PackageTab[] = [
  {
    id: "npm",
    label: "npm",
    icon: <SiNpm className="w-4 h-4" />,
    command: "npx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "pnpm",
    label: "pnpm",
    icon: <SiPnpm className="w-4 h-4" />,
    command: "pnpm dlx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "yarn",
    label: "yarn",
    icon: <SiYarn className="w-4 h-4" />,
    command: "yarn dlx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
  {
    id: "bun",
    label: "bun",
    icon: <SiBun className="w-4 h-4" />,
    command: "bunx",
    packageName: "dlx shadcn@latest add https://ruixen.com/r/staggered-faq-section",
    extra: "add button",
  },
];

const PackageInstallerTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("npm");
  const [copied, setCopied] = useState(false);

  const activeCommand = tabs.find((tab) => tab.id === activeTab)!;

  const handleCopy = () => {
    const commandText = `${activeCommand.command} ${activeCommand.packageName} ${activeCommand.extra}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(commandText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="p-4 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <pre className="font-mono text-sm bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md w-full overflow-x-auto">
            <span className="text-amber-400">{activeCommand.command}</span>{" "}
            <span className="text-teal-500">{activeCommand.packageName}</span>{" "}
            <span className="text-zinc-700 dark:text-zinc-300">
              {activeCommand.extra}
            </span>
          </pre>
          <Button
            variant="outline"
            className="ml-2 flex items-center gap-1"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageInstallerTabs;

```

Install NPM dependencies:
```bash
lucide-react, react-icons
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
