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
table.tsx
"use client"

import { ArrowUpDown } from "lucide-react"
import {
  Cell as AriaCell,
  Column as AriaColumn,
  ColumnProps as AriaColumnProps,
  ResizableTableContainer as AriaResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  CellProps,
  ColumnResizer,
  composeRenderProps,
  Group,
  ResizableTableContainerProps,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button-1"

const ResizableTableContainer = AriaResizableTableContainer

const Table = ({ className, ...props }: TableProps) => (
  <AriaTable
    className={composeRenderProps(className, (className) =>
      cn(
        "w-full caption-bottom text-sm -outline-offset-2 data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  />
)

const TableHeader = <T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) => (
  <AriaTableHeader
    className={composeRenderProps(className, (className) =>
      cn("[&_tr]:border-b", className)
    )}
    {...props}
  />
)

export interface ColumnProps extends AriaColumnProps {
  isResizable?: boolean
}

const Column = ({ className, children, ...props }: ColumnProps) => (
  <AriaColumn
    className={composeRenderProps(className, (className) =>
      cn(
        "h-12 text-left align-middle font-medium text-muted-foreground -outline-offset-2 data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, { allowsSorting }) => (
      <div className="flex items-center">
        <Group
          role="presentation"
          tabIndex={-1}
          className={cn(
            "flex h-10 flex-1 items-center gap-1 overflow-hidden rounded-md px-4",
            allowsSorting &&
              "p-2 data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
            "focus-visible:outline-none  data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring [&:has([slot=selection])]:pr-0"
          )}
        >
          <span className="truncate">{children}</span>
          {allowsSorting && <ArrowUpDown className="ml-2 size-4" />}
        </Group>
        {props.isResizable && (
          <ColumnResizer className="data-[focus-visible]:ring-rin box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded bg-muted-foreground bg-clip-content px-[8px]  py-1 focus-visible:outline-none data-[resizing]:w-[2px] data-[resizing]:bg-primary data-[resizing]:pl-[7px] data-[focus-visible]:ring-1  data-[focus-visible]:ring-ring" />
        )}
      </div>
    ))}
  </AriaColumn>
)

const TableBody = <T extends object>({
  className,
  ...props
}: TableBodyProps<T>) => (
  <AriaTableBody
    className={composeRenderProps(className, (className) =>
      cn(
        "-outline-offset-2 data-[empty]:h-24 data-[empty]:text-center data-[focus-visible]:outline-ring [&_tr:last-child]:border-0",
        className
      )
    )}
    {...props}
  />
)

const Row = <T extends object>({ className, ...props }: RowProps<T>) => (
  <AriaRow
    className={composeRenderProps(className, (className) =>
      cn(
        "border-b -outline-offset-2 transition-colors data-[hovered]:bg-muted/50 data-[selected]:bg-muted data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  />
)

const Cell = ({ className, ...props }: CellProps) => (
  <AriaCell
    className={composeRenderProps(className, (className) =>
      cn(
        "p-4 align-middle -outline-offset-2 data-[focus-visible]:outline-ring [&:has([role=checkbox])]:pr-0",
        className
      )
    )}
    {...props}
  />
)

export {
  Table,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  ResizableTableContainer,
}


code.demo.1754518288565.tsx
"use client"

import { useAsyncList } from "react-stately"

import {
  Cell,
  Column,
  ResizableTableContainer,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table"

export default function TableSortable() {
  interface Character {
    name: string
    height: number
    mass: number
    birth_year: number
  }

  let list = useAsyncList<Character>({
    async load({ signal }) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      })
      let json = await res.json()
      return {
        items: json.results,
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          // @ts-ignore
          let first = a[sortDescriptor.column]
          // @ts-ignore
          let second = b[sortDescriptor.column]
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1
          if (sortDescriptor.direction === "descending") {
            cmp *= -1
          }
          return cmp
        }),
      }
    },
  })

  return (
    <div className="flex size-full items-center justify-center p-12">
      <div className="relative w-full overflow-auto rounded-md border">
        <Table
          aria-label="Example table with client side sorting"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader>
            <Column id="name" isRowHeader allowsSorting>
              Name
            </Column>
            <Column id="height" allowsSorting>
              Height
            </Column>
            <Column id="mass" allowsSorting>
              Mass
            </Column>
            <Column id="birth_year" allowsSorting>
              Birth Year
            </Column>
          </TableHeader>
          <TableBody
            items={list.items}
            renderEmptyState={() => "No results found."}
          >
            {(item) => (
              <Row id={item.name}>
                <Cell>{item.name}</Cell>
                <Cell>{item.height}</Cell>
                <Cell>{item.mass}</Cell>
                <Cell>{item.birth_year}</Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/table.tsx
"use client"

import { ArrowUpDown } from "lucide-react"
import {
  Cell as AriaCell,
  Column as AriaColumn,
  ColumnProps as AriaColumnProps,
  ResizableTableContainer as AriaResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  CellProps,
  ColumnResizer,
  composeRenderProps,
  Group,
  ResizableTableContainerProps,
  RowProps,
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button-1"

const ResizableTableContainer = AriaResizableTableContainer

const Table = ({ className, ...props }: TableProps) => (
  <AriaTable
    className={composeRenderProps(className, (className) =>
      cn(
        "w-full caption-bottom text-sm -outline-offset-2 data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  />
)

const TableHeader = <T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) => (
  <AriaTableHeader
    className={composeRenderProps(className, (className) =>
      cn("[&_tr]:border-b", className)
    )}
    {...props}
  />
)

export interface ColumnProps extends AriaColumnProps {
  isResizable?: boolean
}

const Column = ({ className, children, ...props }: ColumnProps) => (
  <AriaColumn
    className={composeRenderProps(className, (className) =>
      cn(
        "h-12 text-left align-middle font-medium text-muted-foreground -outline-offset-2 data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, { allowsSorting }) => (
      <div className="flex items-center">
        <Group
          role="presentation"
          tabIndex={-1}
          className={cn(
            "flex h-10 flex-1 items-center gap-1 overflow-hidden rounded-md px-4",
            allowsSorting &&
              "p-2 data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
            "focus-visible:outline-none  data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring [&:has([slot=selection])]:pr-0"
          )}
        >
          <span className="truncate">{children}</span>
          {allowsSorting && <ArrowUpDown className="ml-2 size-4" />}
        </Group>
        {props.isResizable && (
          <ColumnResizer className="data-[focus-visible]:ring-rin box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded bg-muted-foreground bg-clip-content px-[8px]  py-1 focus-visible:outline-none data-[resizing]:w-[2px] data-[resizing]:bg-primary data-[resizing]:pl-[7px] data-[focus-visible]:ring-1  data-[focus-visible]:ring-ring" />
        )}
      </div>
    ))}
  </AriaColumn>
)

const TableBody = <T extends object>({
  className,
  ...props
}: TableBodyProps<T>) => (
  <AriaTableBody
    className={composeRenderProps(className, (className) =>
      cn(
        "-outline-offset-2 data-[empty]:h-24 data-[empty]:text-center data-[focus-visible]:outline-ring [&_tr:last-child]:border-0",
        className
      )
    )}
    {...props}
  />
)

const Row = <T extends object>({ className, ...props }: RowProps<T>) => (
  <AriaRow
    className={composeRenderProps(className, (className) =>
      cn(
        "border-b -outline-offset-2 transition-colors data-[hovered]:bg-muted/50 data-[selected]:bg-muted data-[focus-visible]:outline-ring",
        className
      )
    )}
    {...props}
  />
)

const Cell = ({ className, ...props }: CellProps) => (
  <AriaCell
    className={composeRenderProps(className, (className) =>
      cn(
        "p-4 align-middle -outline-offset-2 data-[focus-visible]:outline-ring [&:has([role=checkbox])]:pr-0",
        className
      )
    )}
    {...props}
  />
)

export {
  Table,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  ResizableTableContainer,
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
