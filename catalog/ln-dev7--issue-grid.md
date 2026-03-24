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
issue-grid.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDrag, useDrop, useDragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { format } from 'date-fns';
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/avatar';
import ContextMenu, {
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from '@/components/ui/indevui-context-menu';
import {
   UserCircle,
   Pencil,
   Copy,
   Trash2,
   LucideIcon,
   Signal,
   Circle,
   Component,
} from 'lucide-react';

export interface User {
   name: string;
   avatarUrl: string;
}

export interface Label {
   name: string;
   color: string;
}

export interface Project {
   name: string;
   icon: LucideIcon;
}

export interface Issue {
   id: string;
   identifier: string;
   title: string;
   status: { icon: LucideIcon };
   priority: { icon: LucideIcon };
   labels: Label[];
   project?: Project;
   assignee: User | null;
   createdAt: string;
}

export const IssueDragType = 'ISSUE';

const IssueCardContent: React.FC<{ issue: Issue }> = ({ issue }) => {
   const PriorityIcon = issue.priority.icon;
   const StatusIcon = issue.status.icon;

   return (
      <>
         <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
               <PriorityIcon className="size-4 text-muted-foreground" />
               <span className="text-xs font-medium text-muted-foreground">{issue.identifier}</span>
            </div>
            <StatusIcon className="size-4 text-muted-foreground" />
         </div>
         <h3 className="mb-3 line-clamp-2 text-sm font-semibold">{issue.title}</h3>
         <div className="mb-3 flex min-h-[1.5rem] flex-wrap gap-1.5">
            {issue.labels.map((label) => (
               <div
                  key={label.name}
                  className="flex items-center gap-1.5 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground"
               >
                  <span
                     className="size-1.5 rounded-full"
                     style={{ backgroundColor: label.color }}
                  ></span>
                  {label.name}
               </div>
            ))}
            {issue.project && (
               <div className="flex items-center gap-1.5 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                  <issue.project.icon className="size-3" />
                  {issue.project.name}
               </div>
            )}
         </div>
         <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
               {format(new Date(issue.createdAt), 'MMM dd')}
            </span>
            {issue.assignee ? (
               <Avatar className="size-6">
                  <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
                  <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
               </Avatar>
            ) : (
               <UserCircle className="size-6 text-muted-foreground" />
            )}
         </div>
      </>
   );
};

const IssueDragPreview: React.FC<{ issue: Issue }> = ({ issue }) => {
   return (
      <div className="overflow-hidden rounded-md border border-border/50 bg-background p-3">
         <IssueCardContent issue={issue} />
      </div>
   );
};

export function CustomDragLayer() {
   const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
      item: monitor.getItem() as Issue,
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
   }));

   if (!isDragging || itemType !== IssueDragType || !currentOffset) {
      return null;
   }

   return (
      <div
         className="pointer-events-none fixed left-0 top-0 z-50"
         style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            width: '320px',
         }}
      >
         <IssueDragPreview issue={item} />
      </div>
   );
}

interface IssueGridProps extends React.HTMLAttributes<HTMLDivElement> {
   issue: Issue;
}

const IssueGrid = React.forwardRef<HTMLDivElement, IssueGridProps>(
   ({ issue, className, ...props }, ref) => {
      const [{ isDragging }, drag, preview] = useDrag(() => ({
         type: IssueDragType,
         item: issue,
         collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
         }),
      }));

      React.useEffect(() => {
         preview(getEmptyImage(), { captureDraggingState: true });
      }, [preview]);

      const [, drop] = useDrop(() => ({ accept: IssueDragType }));

      return (
         <ContextMenu>
            <ContextMenuTrigger asChild>
               <motion.div
                  ref={drag(drop(ref))}
                  className={cn(
                     'w-full cursor-default rounded-md border border-border/50 bg-background p-3 shadow-xs',
                     className
                  )}
                  layoutId={`issue-grid-${issue.id}`}
                  style={{
                     opacity: isDragging ? 0.5 : 1,
                     cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  {...props}
               >
                  <IssueCardContent issue={issue} />
               </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent>
               <ContextMenuItem>
                  <Pencil className="mr-2 size-4" /> Rename
               </ContextMenuItem>
               <ContextMenuItem>
                  <Copy className="mr-2 size-4" /> Duplicate
               </ContextMenuItem>
               <ContextMenuItem variant="destructive">
                  <Trash2 className="mr-2 size-4" /> Delete
               </ContextMenuItem>
            </ContextMenuContent>
         </ContextMenu>
      );
   }
);
IssueGrid.displayName = 'IssueGrid';

export default IssueGrid;

code.demo.1749401382264.tsx
// demo.tsx
'use client';

import * as React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import IssueGrid, { CustomDragLayer, IssueDragType } from '@/components/ui/issue-grid';
import type { Issue } from '@/components/ui/issue-grid';
import { Circle, CircleDot, Signal, Component } from 'lucide-react';

const initialIssues: Record<string, Issue[]> = {
   todo: [
      {
         id: '1',
         identifier: 'PROJ-101',
         title: 'Implement user authentication flow',
         status: { icon: Circle },
         priority: { icon: Signal },
         labels: [{ name: 'Feature', color: '#0e8a16' }],
         project: { name: 'WebApp', icon: Component },
         assignee: { name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=a' },
         createdAt: '2023-10-26T10:00:00Z',
      },
      {
         id: '2',
         identifier: 'PROJ-102',
         title: 'Fix critical bug in payment gateway',
         status: { icon: Circle },
         priority: { icon: Signal },
         labels: [{ name: 'Bug', color: '#d73a4a' }],
         assignee: null,
         createdAt: '2023-10-25T14:30:00Z',
      },
   ],
   inProgress: [
      {
         id: '3',
         identifier: 'PROJ-103',
         title: 'Design new marketing landing page',
         status: { icon: CircleDot },
         priority: { icon: Signal },
         labels: [{ name: 'Design', color: '#d876e3' }],
         project: { name: 'Website', icon: Component },
         assignee: { name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=b' },
         createdAt: '2023-10-24T09:00:00Z',
      },
   ],
};

const Column: React.FC<{
   title: string;
   status: string;
   issues: Issue[];
   className?: string;
}> = ({ title, status, issues, className }) => {
   const [, drop] = useDrop(() => ({
      accept: IssueDragType,
      drop: () => ({ status }),
   }));

   return (
      <div ref={drop} className="flex h-full w-80 shrink-0 flex-col">
         <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <span className="text-sm text-muted-foreground">{issues.length}</span>
         </div>
         <div className="flex flex-col gap-3 overflow-y-auto">{issues.map((issue) => (
            <IssueGrid key={issue.id} issue={issue} />
         ))}</div>
      </div>
   );
};

const IssueGridDemo = () => {
   const [issues, setIssues] = React.useState(initialIssues);

   const handleDrop = (item: Issue, status: string) => {
      setIssues((prev) => {
         const newIssues = { ...prev };
         // Remove from all lists
         Object.keys(newIssues).forEach((key) => {
            newIssues[key] = newIssues[key].filter((i) => i.id !== item.id);
         });
         // Add to the new list
         newIssues[status] = [...newIssues[status], item];
         return newIssues;
      });
   };

   return (
      <DndProvider backend={HTML5Backend}>
         <CustomDragLayer />
         <div className="flex w-full items-center justify-center p-4">
            <div className="flex gap-8">
               <Column title="To Do" status="todo" issues={issues.todo} />
               <Column title="In Progress" status="inProgress" issues={issues.inProgress} />
            </div>
         </div>
      </DndProvider>
   );
};

export { IssueGridDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/issue-grid.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDrag, useDrop, useDragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { format } from 'date-fns';
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from '@/components/ui/avatar';
import ContextMenu, {
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from '@/components/ui/indevui-context-menu';
import {
   UserCircle,
   Pencil,
   Copy,
   Trash2,
   LucideIcon,
   Signal,
   Circle,
   Component,
} from 'lucide-react';

export interface User {
   name: string;
   avatarUrl: string;
}

export interface Label {
   name: string;
   color: string;
}

export interface Project {
   name: string;
   icon: LucideIcon;
}

export interface Issue {
   id: string;
   identifier: string;
   title: string;
   status: { icon: LucideIcon };
   priority: { icon: LucideIcon };
   labels: Label[];
   project?: Project;
   assignee: User | null;
   createdAt: string;
}

export const IssueDragType = 'ISSUE';

const IssueCardContent: React.FC<{ issue: Issue }> = ({ issue }) => {
   const PriorityIcon = issue.priority.icon;
   const StatusIcon = issue.status.icon;

   return (
      <>
         <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
               <PriorityIcon className="size-4 text-muted-foreground" />
               <span className="text-xs font-medium text-muted-foreground">{issue.identifier}</span>
            </div>
            <StatusIcon className="size-4 text-muted-foreground" />
         </div>
         <h3 className="mb-3 line-clamp-2 text-sm font-semibold">{issue.title}</h3>
         <div className="mb-3 flex min-h-[1.5rem] flex-wrap gap-1.5">
            {issue.labels.map((label) => (
               <div
                  key={label.name}
                  className="flex items-center gap-1.5 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground"
               >
                  <span
                     className="size-1.5 rounded-full"
                     style={{ backgroundColor: label.color }}
                  ></span>
                  {label.name}
               </div>
            ))}
            {issue.project && (
               <div className="flex items-center gap-1.5 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                  <issue.project.icon className="size-3" />
                  {issue.project.name}
               </div>
            )}
         </div>
         <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
               {format(new Date(issue.createdAt), 'MMM dd')}
            </span>
            {issue.assignee ? (
               <Avatar className="size-6">
                  <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
                  <AvatarFallback>{issue.assignee.name.charAt(0)}</AvatarFallback>
               </Avatar>
            ) : (
               <UserCircle className="size-6 text-muted-foreground" />
            )}
         </div>
      </>
   );
};

const IssueDragPreview: React.FC<{ issue: Issue }> = ({ issue }) => {
   return (
      <div className="overflow-hidden rounded-md border border-border/50 bg-background p-3">
         <IssueCardContent issue={issue} />
      </div>
   );
};

export function CustomDragLayer() {
   const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
      item: monitor.getItem() as Issue,
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
   }));

   if (!isDragging || itemType !== IssueDragType || !currentOffset) {
      return null;
   }

   return (
      <div
         className="pointer-events-none fixed left-0 top-0 z-50"
         style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            width: '320px',
         }}
      >
         <IssueDragPreview issue={item} />
      </div>
   );
}

interface IssueGridProps extends React.HTMLAttributes<HTMLDivElement> {
   issue: Issue;
}

const IssueGrid = React.forwardRef<HTMLDivElement, IssueGridProps>(
   ({ issue, className, ...props }, ref) => {
      const [{ isDragging }, drag, preview] = useDrag(() => ({
         type: IssueDragType,
         item: issue,
         collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
         }),
      }));

      React.useEffect(() => {
         preview(getEmptyImage(), { captureDraggingState: true });
      }, [preview]);

      const [, drop] = useDrop(() => ({ accept: IssueDragType }));

      return (
         <ContextMenu>
            <ContextMenuTrigger asChild>
               <motion.div
                  ref={drag(drop(ref))}
                  className={cn(
                     'w-full cursor-default rounded-md border border-border/50 bg-background p-3 shadow-xs',
                     className
                  )}
                  layoutId={`issue-grid-${issue.id}`}
                  style={{
                     opacity: isDragging ? 0.5 : 1,
                     cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  {...props}
               >
                  <IssueCardContent issue={issue} />
               </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent>
               <ContextMenuItem>
                  <Pencil className="mr-2 size-4" /> Rename
               </ContextMenuItem>
               <ContextMenuItem>
                  <Copy className="mr-2 size-4" /> Duplicate
               </ContextMenuItem>
               <ContextMenuItem variant="destructive">
                  <Trash2 className="mr-2 size-4" /> Delete
               </ContextMenuItem>
            </ContextMenuContent>
         </ContextMenu>
      );
   }
);
IssueGrid.displayName = 'IssueGrid';

export default IssueGrid;
```

Install NPM dependencies:
```bash
framer-motion, react-dnd, react-dnd-html5-backend, date-fns, lucide-react
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
