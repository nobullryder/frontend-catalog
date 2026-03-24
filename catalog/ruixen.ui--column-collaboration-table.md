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
column-collaboration-table.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleFadingPlus } from "lucide-react";

const columns = ["Name", "Email", "Location", "Status", "Balance"];

const items = [
  { id: "1", Name: "Arjun Mehta", Email: "arjun.mehta@company.com", Location: "Bangalore, IN", Status: "Active", Balance: "$1,250.00" },
  { id: "2", Name: "Hannah Park", Email: "hannah.park@company.com", Location: "Seoul, KR", Status: "Active", Balance: "$600.00" },
  { id: "3", Name: "Oliver Scott", Email: "oliver.scott@company.com", Location: "Manchester, UK", Status: "Inactive", Balance: "$650.00" },
  { id: "4", Name: "Camila Torres", Email: "camila.torres@company.com", Location: "Bogotá, CO", Status: "Active", Balance: "$0.00" },
  { id: "5", Name: "Kenji Tanaka", Email: "kenji.tanaka@company.com", Location: "Osaka, JP", Status: "Active", Balance: "-$1,000.00" },
];

export default function ColumnCollaborationTable() {
  const [comments, setComments] = React.useState<{ [key: string]: string[] }>({});
  const [newComment, setNewComment] = React.useState<{ [key: string]: string }>({});

  const addComment = (column: string) => {
    if (!newComment[column]) return;
    setComments((prev) => ({
      ...prev,
      [column]: [...(prev[column] || []), newComment[column]],
    }));
    setNewComment((prev) => ({ ...prev, [column]: "" }));
  };

  return (
    <div className="bg-background p-4 rounded-lg border">
      <ScrollArea className="max-h-[400px]">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader className="sticky top-0 bg-background/90 backdrop-blur-sm z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="relative">
                  <div className="flex items-center justify-between">
                    {col}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" className="ml-2 p-1">
                          <CircleFadingPlus className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="flex flex-col gap-2">
                          <ScrollArea className="max-h-32">
                            <ul className="space-y-1">
                              {(comments[col] || []).map((cmt, i) => (
                                <li key={i} className="text-sm border-b pb-1">{cmt}</li>
                              ))}
                              {(!comments[col] || comments[col].length === 0) && (
                                <li className="text-sm text-muted-foreground">No comments</li>
                              )}
                            </ul>
                          </ScrollArea>
                          <div className="flex gap-2">
                            <Input
                              value={newComment[col] || ""}
                              onChange={(e) =>
                                setNewComment((prev) => ({ ...prev, [col]: e.target.value }))
                              }
                              placeholder="Add comment"
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => addComment(col)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col}>{item[col as keyof typeof item]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-background/50 sticky bottom-0 backdrop-blur-sm">
            <TableRow>
              <TableCell colSpan={columns.length} className="text-right font-medium">
                Total Rows: {items.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  );
}


code.demo.1757840602905.tsx
import ColumnCollaborationTable from "@/components/ui/column-collaboration-table";

export default function DemoOne() {
  return <ColumnCollaborationTable />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/column-collaboration-table.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleFadingPlus } from "lucide-react";

const columns = ["Name", "Email", "Location", "Status", "Balance"];

const items = [
  { id: "1", Name: "Arjun Mehta", Email: "arjun.mehta@company.com", Location: "Bangalore, IN", Status: "Active", Balance: "$1,250.00" },
  { id: "2", Name: "Hannah Park", Email: "hannah.park@company.com", Location: "Seoul, KR", Status: "Active", Balance: "$600.00" },
  { id: "3", Name: "Oliver Scott", Email: "oliver.scott@company.com", Location: "Manchester, UK", Status: "Inactive", Balance: "$650.00" },
  { id: "4", Name: "Camila Torres", Email: "camila.torres@company.com", Location: "Bogotá, CO", Status: "Active", Balance: "$0.00" },
  { id: "5", Name: "Kenji Tanaka", Email: "kenji.tanaka@company.com", Location: "Osaka, JP", Status: "Active", Balance: "-$1,000.00" },
];

export default function ColumnCollaborationTable() {
  const [comments, setComments] = React.useState<{ [key: string]: string[] }>({});
  const [newComment, setNewComment] = React.useState<{ [key: string]: string }>({});

  const addComment = (column: string) => {
    if (!newComment[column]) return;
    setComments((prev) => ({
      ...prev,
      [column]: [...(prev[column] || []), newComment[column]],
    }));
    setNewComment((prev) => ({ ...prev, [column]: "" }));
  };

  return (
    <div className="bg-background p-4 rounded-lg border">
      <ScrollArea className="max-h-[400px]">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader className="sticky top-0 bg-background/90 backdrop-blur-sm z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col} className="relative">
                  <div className="flex items-center justify-between">
                    {col}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" className="ml-2 p-1">
                          <CircleFadingPlus className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="flex flex-col gap-2">
                          <ScrollArea className="max-h-32">
                            <ul className="space-y-1">
                              {(comments[col] || []).map((cmt, i) => (
                                <li key={i} className="text-sm border-b pb-1">{cmt}</li>
                              ))}
                              {(!comments[col] || comments[col].length === 0) && (
                                <li className="text-sm text-muted-foreground">No comments</li>
                              )}
                            </ul>
                          </ScrollArea>
                          <div className="flex gap-2">
                            <Input
                              value={newComment[col] || ""}
                              onChange={(e) =>
                                setNewComment((prev) => ({ ...prev, [col]: e.target.value }))
                              }
                              placeholder="Add comment"
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => addComment(col)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col}>{item[col as keyof typeof item]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-background/50 sticky bottom-0 backdrop-blur-sm">
            <TableRow>
              <TableCell colSpan={columns.length} className="text-right font-medium">
                Total Rows: {items.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
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
