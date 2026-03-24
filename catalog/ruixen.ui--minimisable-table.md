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
minimisable-table.tsx
"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Mail, MapPin, User, DollarSign, ShieldCheck } from "lucide-react"

type ColumnKey = "name" | "email" | "location" | "status" | "balance"

const initialData = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    location: "Bangalore, IN",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Hannah Park",
    email: "hannah.park@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    location: "Manchester, UK",
    status: "Inactive",
    balance: "$650.00",
  },
];

const columnConfig: {
  key: ColumnKey
  label: string
  icon: React.ReactNode
  align?: string
}[] = [
  { key: "name", label: "Name", icon: <User className="h-4 w-4" /> },
  { key: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
  { key: "location", label: "Location", icon: <MapPin className="h-4 w-4" /> },
  { key: "status", label: "Status", icon: <ShieldCheck className="h-4 w-4" /> },
  {
    key: "balance",
    label: "Balance",
    icon: <DollarSign className="h-4 w-4" />,
    align: "text-right",
  },
]

export default function MinimisableTable() {
  const [minimized, setMinimized] = React.useState<ColumnKey[]>([])

  const toggleMinimise = (col: ColumnKey) => {
    setMinimized((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  return (
    <div className="w-full space-y-4 px-4 max-w-xl">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Manage Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columnConfig.map((col) => (
              <DropdownMenuItem
                key={col.key}
                onClick={() => toggleMinimise(col.key)}
                className="flex justify-between"
              >
                <span>
                  {minimized.includes(col.key)
                    ? `Expand ${col.label}`
                    : `Minimise ${col.label}`}
                </span>
                {minimized.includes(col.key) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columnConfig.map((col) => (
              <TableHead
                key={col.key}
                className={`${col.align ?? ""} ${
                  minimized.includes(col.key) ? "w-12 text-center" : ""
                }`}
              >
                {minimized.includes(col.key) ? col.icon : col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((row) => (
            <TableRow key={row.id}>
              {columnConfig.map((col) => (
                <TableCell
                  key={col.key}
                  className={`${col.align ?? ""} ${
                    minimized.includes(col.key) ? "w-12 text-center" : ""
                  }`}
                >
                  {minimized.includes(col.key)
                    ? col.icon
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


code.demo.1757839056939.tsx
import MinimisableTable from "@/components/ui/minimisable-table";

export default function DemoOne() {
  return <MinimisableTable />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/minimisable-table.tsx
"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Mail, MapPin, User, DollarSign, ShieldCheck } from "lucide-react"

type ColumnKey = "name" | "email" | "location" | "status" | "balance"

const initialData = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@company.com",
    location: "Bangalore, IN",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Hannah Park",
    email: "hannah.park@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Oliver Scott",
    email: "oliver.scott@company.com",
    location: "Manchester, UK",
    status: "Inactive",
    balance: "$650.00",
  },
];

const columnConfig: {
  key: ColumnKey
  label: string
  icon: React.ReactNode
  align?: string
}[] = [
  { key: "name", label: "Name", icon: <User className="h-4 w-4" /> },
  { key: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
  { key: "location", label: "Location", icon: <MapPin className="h-4 w-4" /> },
  { key: "status", label: "Status", icon: <ShieldCheck className="h-4 w-4" /> },
  {
    key: "balance",
    label: "Balance",
    icon: <DollarSign className="h-4 w-4" />,
    align: "text-right",
  },
]

export default function MinimisableTable() {
  const [minimized, setMinimized] = React.useState<ColumnKey[]>([])

  const toggleMinimise = (col: ColumnKey) => {
    setMinimized((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  return (
    <div className="w-full space-y-4 px-4 max-w-xl">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Manage Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columnConfig.map((col) => (
              <DropdownMenuItem
                key={col.key}
                onClick={() => toggleMinimise(col.key)}
                className="flex justify-between"
              >
                <span>
                  {minimized.includes(col.key)
                    ? `Expand ${col.label}`
                    : `Minimise ${col.label}`}
                </span>
                {minimized.includes(col.key) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columnConfig.map((col) => (
              <TableHead
                key={col.key}
                className={`${col.align ?? ""} ${
                  minimized.includes(col.key) ? "w-12 text-center" : ""
                }`}
              >
                {minimized.includes(col.key) ? col.icon : col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((row) => (
            <TableRow key={row.id}>
              {columnConfig.map((col) => (
                <TableCell
                  key={col.key}
                  className={`${col.align ?? ""} ${
                    minimized.includes(col.key) ? "w-12 text-center" : ""
                  }`}
                >
                  {minimized.includes(col.key)
                    ? col.icon
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
