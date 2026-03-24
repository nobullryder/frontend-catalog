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
list-box.tsx
"use client"

import { Check } from "lucide-react"
import {
  Collection as AriaCollection,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  ListBoxSection as AriaListBoxSection,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const ListBoxSection = AriaListBoxSection

const ListBoxCollection = AriaCollection

function ListBox<T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) {
  return (
    <AriaListBox
      className={composeRenderProps(className, (className) =>
        cn(
          className,
          "group overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          /* Empty */
          "data-[empty]:p-6 data-[empty]:text-center data-[empty]:text-sm"
        )
      )}
      {...props}
    />
  )
}

const ListBoxItem = <T extends object>({
  className,
  children,
  ...props
}: AriaListBoxItemProps<T>) => {
  return (
    <AriaListBoxItem
      textValue={
        props.textValue || (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
          /* Disabled */
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          /* Focused */
          "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
          /* Hovered */
          "data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
          /* Selection */
          "data-[selection-mode]:pl-8",
          className
        )
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {renderProps.isSelected && (
            <span className="absolute left-2 flex size-4 items-center justify-center">
              <Check className="size-4" />
            </span>
          )}
          {children}
        </>
      ))}
    </AriaListBoxItem>
  )
}

function ListBoxHeader({
  className,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  return (
    <AriaHeader
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  )
}

export {
  ListBox,
  ListBoxItem,
  ListBoxHeader,
  ListBoxSection,
  ListBoxCollection,
}


code.demo.1754506371448.tsx
"use client"

import { isTextDropItem, useDragAndDrop } from "react-aria-components"
import { useListData } from "react-stately"

import { ListBox, ListBoxItem } from "@/components/ui/list-box"

interface FileItem {
  id: string
  name: string
  type: string
}

interface DndListBoxProps {
  initialItems: FileItem[]
  "aria-label": string
}

function DndListBox(props: DndListBoxProps) {
  let list = useListData({
    initialItems: props.initialItems,
  })

  let { dragAndDropHooks } = useDragAndDrop({
    // Provide drag data in a custom format as well as plain text.
    getItems(keys) {
      // @ts-expect-error
      return [...keys].map((key) => {
        let item = list.getItem(key)
        return {
          "custom-app-type": JSON.stringify(item),
          // @ts-expect-error RAC bug
          "text/plain": item.name,
        }
      })
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ["custom-app-type"],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => "move",

    // Handle drops between items from other lists.
    async onInsert(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async (item) =>
            JSON.parse(await item.getText("custom-app-type"))
          )
      )
      if (e.target.dropPosition === "before") {
        list.insertBefore(e.target.key, ...processedItems)
      } else if (e.target.dropPosition === "after") {
        list.insertAfter(e.target.key, ...processedItems)
      }
    },

    // Handle drops on the collection when empty.
    async onRootDrop(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async (item) =>
            JSON.parse(await item.getText("custom-app-type"))
          )
      )
      list.append(...processedItems)
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys)
      }
    },

    // Remove the items from the source list on drop
    // if they were moved to a different list.
    onDragEnd(e) {
      if (e.dropOperation === "move" && !e.isInternal) {
        // @ts-expect-error
        list.remove(...e.keys)
      }
    },
  })

  return (
    <ListBox
      className={"max-h-[200px]"}
      aria-label={props["aria-label"]}
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
      renderEmptyState={() => "Drop items here"}
    >
      {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
  )
}

export default function ListBoxDragBetween() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <DndListBox
        initialItems={[
          { id: "1", type: "file", name: "Adobe Photoshop" },
          { id: "2", type: "file", name: "Adobe XD" },
          { id: "3", type: "folder", name: "Documents" },
          { id: "4", type: "file", name: "Adobe InDesign" },
          { id: "5", type: "folder", name: "Utilities" },
          { id: "6", type: "file", name: "Adobe AfterEffects" },
        ]}
        aria-label="First ListBox"
      />
      <DndListBox
        initialItems={[
          { id: "7", type: "folder", name: "Pictures" },
          { id: "8", type: "file", name: "Adobe Fresco" },
          { id: "9", type: "folder", name: "Apps" },
          { id: "10", type: "file", name: "Adobe Illustrator" },
          { id: "11", type: "file", name: "Adobe Lightroom" },
          { id: "12", type: "file", name: "Adobe Dreamweaver" },
        ]}
        aria-label="Second ListBox"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/list-box.tsx
"use client"

import { Check } from "lucide-react"
import {
  Collection as AriaCollection,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  ListBoxSection as AriaListBoxSection,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const ListBoxSection = AriaListBoxSection

const ListBoxCollection = AriaCollection

function ListBox<T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) {
  return (
    <AriaListBox
      className={composeRenderProps(className, (className) =>
        cn(
          className,
          "group overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          /* Empty */
          "data-[empty]:p-6 data-[empty]:text-center data-[empty]:text-sm"
        )
      )}
      {...props}
    />
  )
}

const ListBoxItem = <T extends object>({
  className,
  children,
  ...props
}: AriaListBoxItemProps<T>) => {
  return (
    <AriaListBoxItem
      textValue={
        props.textValue || (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
          /* Disabled */
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          /* Focused */
          "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
          /* Hovered */
          "data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
          /* Selection */
          "data-[selection-mode]:pl-8",
          className
        )
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {renderProps.isSelected && (
            <span className="absolute left-2 flex size-4 items-center justify-center">
              <Check className="size-4" />
            </span>
          )}
          {children}
        </>
      ))}
    </AriaListBoxItem>
  )
}

function ListBoxHeader({
  className,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  return (
    <AriaHeader
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  )
}

export {
  ListBox,
  ListBoxItem,
  ListBoxHeader,
  ListBoxSection,
  ListBoxCollection,
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
