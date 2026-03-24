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
smart-breadcrumb.tsx
"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
}

interface SmartBreadcrumbProps {
  items: BreadcrumbItemType[];
  showIcons?: boolean;
  showEllipsis?: boolean;
  separator?: React.ReactNode;
  maxVisible?: number; // show ellipsis after these many
  className?: string;
}

export function SmartBreadcrumb({
  items,
  showIcons = true,
  showEllipsis = true,
  separator = <ChevronRight className="size-4 stroke-2" />,
  maxVisible = 4,
  className = "",
}: SmartBreadcrumbProps) {
  const visibleItems =
    showEllipsis && items.length > maxVisible
      ? [
          ...items.slice(0, 1),
          { label: "...", isEllipsis: true },
          ...items.slice(items.length - (maxVisible - 1)),
        ]
      : items;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = (item as any).isEllipsis;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isEllipsis ? (
                  <BreadcrumbEllipsis />
                ) : isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {showIcons && item.icon}
                    <span>{item.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {showIcons && item.icon}
                    <span>{item.label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}


code.demo.1760545346534.tsx
"use client";

import { SmartBreadcrumb } from "@/components/ui/smart-breadcrumb";
import {
  Home,
  Folder,
  FileText,
  BarChart,
  Settings,
} from "lucide-react";

export default function SmartBreadcrumbDemo() {
  const items1 = [
    { label: "Home", href: "/", icon: <Home className="size-4 stroke-[1.8]" /> },
    { label: "Projects", href: "/projects", icon: <Folder className="size-4 stroke-[1.8]" /> },
    { label: "Reports", href: "/reports", icon: <BarChart className="size-4 stroke-[1.8]" /> },
    { label: "Overview", isCurrent: true, icon: <FileText className="size-4 stroke-[1.8]" /> },
  ];

  const items2 = [
    { label: "Dashboard", href: "/", icon: <Home className="size-4 stroke-[1.8]" /> },
    { label: "Analytics", href: "/analytics", icon: <BarChart className="size-4 stroke-[1.8]" /> },
    { label: "Users", href: "/users", icon: <Folder className="size-4 stroke-[1.8]" /> },
    { label: "Reports", href: "/reports", icon: <FileText className="size-4 stroke-[1.8]" /> },
    { label: "Settings", isCurrent: true, icon: <Settings className="size-4 stroke-[1.8]" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-12 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Smart Breadcrumb Demo</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          A dynamic, configurable breadcrumb component built with Lucide icons, tooltips,
          ellipsis handling, and hover effects for modern interfaces.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">Basic Breadcrumb</h2>
          <SmartBreadcrumb items={items1} />
        </div>

        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">With Ellipsis & Custom Separator</h2>
          <SmartBreadcrumb
            items={items2}
            showIcons
            showEllipsis
            maxVisible={4}
            separator={<span className="text-gray-500">›</span>}
          />
        </div>

        <div className="p-6 w-full max-w-md">
          <h2 className="font-semibold mb-3">Without Icons</h2>
          <SmartBreadcrumb
            items={items2}
            showIcons={false}
            showEllipsis={false}
          />
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/smart-breadcrumb.tsx
"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
}

interface SmartBreadcrumbProps {
  items: BreadcrumbItemType[];
  showIcons?: boolean;
  showEllipsis?: boolean;
  separator?: React.ReactNode;
  maxVisible?: number; // show ellipsis after these many
  className?: string;
}

export function SmartBreadcrumb({
  items,
  showIcons = true,
  showEllipsis = true,
  separator = <ChevronRight className="size-4 stroke-2" />,
  maxVisible = 4,
  className = "",
}: SmartBreadcrumbProps) {
  const visibleItems =
    showEllipsis && items.length > maxVisible
      ? [
          ...items.slice(0, 1),
          { label: "...", isEllipsis: true },
          ...items.slice(items.length - (maxVisible - 1)),
        ]
      : items;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = (item as any).isEllipsis;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isEllipsis ? (
                  <BreadcrumbEllipsis />
                ) : isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {showIcons && item.icon}
                    <span>{item.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {showIcons && item.icon}
                    <span>{item.label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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
