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
tree.tsx
"use client"

import { ChevronRightIcon, InfoIcon } from "lucide-react"
import {
  Tree as AriaTree, // Use stable Tree if available
  TreeItem as AriaTreeItem, // Use stable TreeItem if available
  TreeItemContent as AriaTreeItemContent, // Use stable TreeItemContent
  TreeProps as AriaTreeProps,
  Button,
  ButtonProps,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const TreeItemContent = AriaTreeItemContent

function Tree<T extends object>({ className, ...props }: AriaTreeProps<T>) {
  return (
    <AriaTree
      className={cn(
        "flex flex-col gap-1 overflow-auto p-1 outline-none",
        className
      )}
      {...props}
    />
  )
}

function TreeItemExpandButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button slot="chevron" className={cn("outline-none", className)} {...props}>
      {composeRenderProps(children, (children) => (
        <>
          <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[expanded]:rotate-90" />
          {children}
        </>
      ))}
    </Button>
  )
}

function TreeItemInfoButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      aria-label="Info"
      className={cn(
        "ml-auto flex items-center justify-center rounded-md ring-offset-background",
        /* Disabled */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
        /* Focus Visible */
        "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <InfoIcon className="size-4 shrink-0" />
        </>
      ))}
    </Button>
  )
}

function TreeItem<T extends object>({
  className,
  ...props
}: AriaTreeItemProps<T>) {
  return (
    <AriaTreeItem
      className={cn(
        "group relative flex items-center gap-2 rounded-md p-1 pl-[calc((var(--tree-item-level)_-_1)_*_2.25rem)] font-medium outline-none ring-offset-background data-[has-child-rows]:pl-[calc((var(--tree-item-level)_-_1)_*_1.5rem)]",
        /* Disabled */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
        /* Focus Visible */
        "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemExpandButton,
  TreeItemInfoButton,
}

code.demo.1754523723629.tsx
"use client"

import { Collection } from "react-aria-components"

import { Checkbox } from "@/components/ui/checkbox-1"
import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemExpandButton,
  TreeItemInfoButton,
} from "@/components/ui/tree"

let items = [
  {
    id: 1,
    title: "Documents",
    children: [
      {
        id: 2,
        title: "Project",
        children: [{ id: 3, title: "Weekly Report", children: [] }],
      },
    ],
  },
  {
    id: 4,
    title: "Photos",
    children: [
      { id: 5, title: "Image 1", children: [] },
      { id: 6, title: "Image 2", children: [] },
    ],
  },
]

export default function TreeDemo() {
  return (
    <Tree
      className="w-[250px]"
      aria-label="Files"
      selectionMode="multiple"
      items={items}
    >
      {function renderItem(item) {
        return (
          <TreeItem textValue={item.title}>
            <TreeItemContent>
              {item.children.length ? <TreeItemExpandButton /> : null}
              <Checkbox slot="selection" />
              {item.title}
              <TreeItemInfoButton />
            </TreeItemContent>
            <Collection items={item.children}>{renderItem}</Collection>
          </TreeItem>
        )
      }}
    </Tree>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tree.tsx
"use client"

import { ChevronRightIcon, InfoIcon } from "lucide-react"
import {
  Tree as AriaTree, // Use stable Tree if available
  TreeItem as AriaTreeItem, // Use stable TreeItem if available
  TreeItemContent as AriaTreeItemContent, // Use stable TreeItemContent
  TreeProps as AriaTreeProps,
  Button,
  ButtonProps,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const TreeItemContent = AriaTreeItemContent

function Tree<T extends object>({ className, ...props }: AriaTreeProps<T>) {
  return (
    <AriaTree
      className={cn(
        "flex flex-col gap-1 overflow-auto p-1 outline-none",
        className
      )}
      {...props}
    />
  )
}

function TreeItemExpandButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button slot="chevron" className={cn("outline-none", className)} {...props}>
      {composeRenderProps(children, (children) => (
        <>
          <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[expanded]:rotate-90" />
          {children}
        </>
      ))}
    </Button>
  )
}

function TreeItemInfoButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      aria-label="Info"
      className={cn(
        "ml-auto flex items-center justify-center rounded-md ring-offset-background",
        /* Disabled */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
        /* Focus Visible */
        "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <InfoIcon className="size-4 shrink-0" />
        </>
      ))}
    </Button>
  )
}

function TreeItem<T extends object>({
  className,
  ...props
}: AriaTreeItemProps<T>) {
  return (
    <AriaTreeItem
      className={cn(
        "group relative flex items-center gap-2 rounded-md p-1 pl-[calc((var(--tree-item-level)_-_1)_*_2.25rem)] font-medium outline-none ring-offset-background data-[has-child-rows]:pl-[calc((var(--tree-item-level)_-_1)_*_1.5rem)]",
        /* Disabled */
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
        /* Focus Visible */
        "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemExpandButton,
  TreeItemInfoButton,
}
```

Install NPM dependencies:
```bash
lucide-react, react-aria-components
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
