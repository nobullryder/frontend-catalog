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
tags-breadcrumb.tsx
import { Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagBreadcrumbProps {
  className?: string
  tags?: Array<{ name: string; href: string; count?: number }>
}

export function Breadcrumb({
  className,
  tags = [
    { name: "design", href: "#", count: 128 },
    { name: "ui", href: "#", count: 86 },
    { name: "ux", href: "#", count: 54 },
    { name: "inspiration", href: "#", count: 32 },
  ],
}: TagBreadcrumbProps) {
  return (
    <div
      className={cn("p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100", className)}
    >
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
        <Hash className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-gray-600 dark:text-zinc-400" />
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {tags.map((tag) => (
            <a
              key={tag.name}
              href={tag.href}
              className="inline-flex items-center rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-700"
            >
              <span className="truncate max-w-[80px] sm:max-w-none">{tag.name}</span>
              {tag.count !== undefined && (
                <span className="ml-1 sm:ml-1.5 inline-flex items-center justify-center rounded-full px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-xs bg-gray-300 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300">
                  {tag.count}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}


code.demo.1756723395585.tsx
import { Breadcrumb } from "@/components/ui/tags-breadcrumb";

export default function DemoOne() {
  return <Breadcrumb
        tags={[
            { name: "design", href: "#", count: 128 },
            { name: "ui", href: "#", count: 86 },
            { name: "ux", href: "#", count: 54 },
            { name: "inspiration", href: "#", count: 32 },
          ]}
      />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tags-breadcrumb.tsx
import { Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagBreadcrumbProps {
  className?: string
  tags?: Array<{ name: string; href: string; count?: number }>
}

export function Breadcrumb({
  className,
  tags = [
    { name: "design", href: "#", count: 128 },
    { name: "ui", href: "#", count: 86 },
    { name: "ux", href: "#", count: 54 },
    { name: "inspiration", href: "#", count: 32 },
  ],
}: TagBreadcrumbProps) {
  return (
    <div
      className={cn("p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100", className)}
    >
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
        <Hash className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-gray-600 dark:text-zinc-400" />
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {tags.map((tag) => (
            <a
              key={tag.name}
              href={tag.href}
              className="inline-flex items-center rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-700"
            >
              <span className="truncate max-w-[80px] sm:max-w-none">{tag.name}</span>
              {tag.count !== undefined && (
                <span className="ml-1 sm:ml-1.5 inline-flex items-center justify-center rounded-full px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-xs bg-gray-300 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300">
                  {tag.count}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
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
