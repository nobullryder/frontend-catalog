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
issue-context-menu.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
   ContextMenuContent,
   ContextMenuGroup,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
} from '@/components/ui/context-menu';
import {
   CircleCheck,
   User,
   BarChart3,
   Tag,
   Pencil,
   Link as LinkIcon,
   Copy as CopyIcon,
   Bell,
   Star,
   AlarmClock,
   Trash2,
   Clipboard,
   LucideIcon,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const BacklogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeDasharray="1.4 1.74"
         strokeDashoffset="0.65"
      />
   </svg>
);

export const PausedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
   </svg>
);

export const ToDoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
   </svg>
);

export const InProgressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M 7 1 A 6 6 0 0 1 13 7" stroke="currentColor" strokeWidth="2" fill="none" />
   </svg>
);

export const CompletedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
         d="M4.5 7L6.5 9L9.5 5"
         stroke="currentColor"
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export interface Status {
   id: string;
   name: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>>;
   color: string;
}
export interface Priority {
   id: string;
   name: string;
   icon: LucideIcon;
}
export interface User {
   id: string;
   name: string;
   avatarUrl: string;
}
export interface Label {
   id: string;
   name: string;
   color: string;
}

interface IssueContextMenuProps extends React.ComponentPropsWithoutRef<typeof ContextMenuContent> {
   statusList: Status[];
   priorityList: Priority[];
   userList: User[];
   labelList: Label[];
   isSubscribed?: boolean;
   isFavorite?: boolean;
   onAction: (action: string, value?: any) => void;
}

const IssueContextMenu = React.forwardRef<
   React.ElementRef<typeof ContextMenuContent>,
   IssueContextMenuProps
>(
   (
      {
         className,
         statusList,
         priorityList,
         userList,
         labelList,
         isSubscribed,
         isFavorite,
         onAction,
         ...props
      },
      ref
   ) => (
      <ContextMenuContent ref={ref} className={cn('w-64', className)} {...props}>
         <ContextMenuGroup>
            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <CircleCheck className="mr-2 size-4" /> Status
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {statusList.map((s) => (
                     <ContextMenuItem key={s.id} onClick={() => onAction('status', s.id)}>
                        <s.icon className="mr-2 size-3.5" style={{ color: s.color }} />
                        <span>{s.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <User className="mr-2 size-4" /> Assignee
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  <ContextMenuItem onClick={() => onAction('assignee', null)}>
                     <User className="mr-2 size-4" /> Unassigned
                  </ContextMenuItem>
                  {userList.map((user) => (
                     <ContextMenuItem key={user.id} onClick={() => onAction('assignee', user.id)}>
                        <Avatar className="mr-2 size-5">
                           <AvatarImage src={user.avatarUrl} alt={user.name} />
                           <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <BarChart3 className="mr-2 size-4" /> Priority
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {priorityList.map((p) => (
                     <ContextMenuItem key={p.id} onClick={() => onAction('priority', p.id)}>
                        <p.icon className="mr-2 size-4" /> <span>{p.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <Tag className="mr-2 size-4" /> Labels
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {labelList.map((label) => (
                     <ContextMenuItem key={label.id} onClick={() => onAction('label', label.id)}>
                        <span
                           className="mr-2 inline-block size-2 rounded-full"
                           style={{ backgroundColor: label.color }}
                        />
                        <span>{label.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem onClick={() => onAction('rename')}>
               <Pencil className="mr-2 size-4" /> Rename...
               <ContextMenuShortcut>R</ContextMenuShortcut>
            </ContextMenuItem>
         </ContextMenuGroup>

         <ContextMenuSeparator />

         <ContextMenuItem onClick={() => onAction('addLink')}>
            <LinkIcon className="mr-2 size-4" /> Add link...
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('duplicate')}>
            <CopyIcon className="mr-2 size-4" /> Make a copy...
         </ContextMenuItem>

         <ContextMenuSeparator />

         <ContextMenuItem onClick={() => onAction('subscribe')}>
            <Bell className="mr-2 size-4" /> {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            <ContextMenuShortcut>S</ContextMenuShortcut>
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('favorite')}>
            <Star className="mr-2 size-4" /> {isFavorite ? 'Unfavorite' : 'Favorite'}
            <ContextMenuShortcut>F</ContextMenuShortcut>
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('copyId')}>
            <Clipboard className="mr-2 size-4" /> Copy issue ID
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('remind')}>
            <AlarmClock className="mr-2 size-4" /> Remind me
            <ContextMenuShortcut>H</ContextMenuShortcut>
         </ContextMenuItem>

         <ContextMenuSeparator />

         <ContextMenuItem variant="destructive" onClick={() => onAction('delete')}>
            <Trash2 className="mr-2 size-4" /> Delete...
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
         </ContextMenuItem>
      </ContextMenuContent>
   )
);
IssueContextMenu.displayName = 'IssueContextMenu';

export default IssueContextMenu;

code.demo.1749371901757.tsx
// demo.tsx
'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
   AlertCircle,
   BarChartHorizontal,
   SignalHigh,
   SignalLow,
   SignalMedium,
   LucideIcon,
} from 'lucide-react';
import IssueContextMenu, {
   ToDoIcon,
   InProgressIcon,
   CompletedIcon,
   BacklogIcon,
   PausedIcon,
} from '@/components/ui/issue-context-menu';
import type { Status, Priority, User, Label } from '@/components/ui/issue-context-menu';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';

const statusList: Status[] = [
   { id: 'backlog', name: 'Backlog', icon: BacklogIcon, color: '#a1a1aa' },
   { id: 'todo', name: 'To-Do', icon: ToDoIcon, color: '#f97316' },
   { id: 'in-progress', name: 'In Progress', icon: InProgressIcon, color: '#facc15' },
   { id: 'paused', name: 'Paused', icon: PausedIcon, color: '#0ea5e9' },
   { id: 'completed', name: 'Completed', icon: CompletedIcon, color: '#8b5cf6' },
];

const priorityList: Priority[] = [
   { id: 'no-priority', name: 'No Priority', icon: BarChartHorizontal },
   { id: 'low', name: 'Low', icon: SignalLow },
   { id: 'medium', name: 'Medium', icon: SignalMedium },
   { id: 'high', name: 'High', icon: SignalHigh },
   { id: 'urgent', name: 'Urgent', icon: AlertCircle },
];

const userList: User[] = [
   { id: 'usr_1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
   { id: 'usr_2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
   { id: 'usr_3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
];

const labelList: Label[] = [
   { id: 'lbl_1', name: 'Bug', color: '#d73a4a' },
   { id: 'lbl_2', name: 'Feature', color: '#0e8a16' },
   { id: 'lbl_3', name: 'Design', color: '#d876e3' },
];

const IssueContextMenuDemo = () => {
   const [isSubscribed, setIsSubscribed] = React.useState(false);
   const [isFavorite, setIsFavorite] = React.useState(false);

   const handleAction = (action: string, value?: any) => {
      switch (action) {
         case 'status':
            toast.success(`Status changed to ${statusList.find((s) => s.id === value)?.name}`);
            break;
         case 'assignee':
            const name = value ? userList.find((u) => u.id === value)?.name : 'Unassigned';
            toast.success(`Assigned to ${name}`);
            break;
         case 'priority':
            toast.success(`Priority set to ${priorityList.find((p) => p.id === value)?.name}`);
            break;
         case 'label':
            toast.info(`Toggled label: ${labelList.find((l) => l.id === value)?.name}`);
            break;
         case 'subscribe':
            setIsSubscribed((prev) => !prev);
            toast.success(isSubscribed ? 'Unsubscribed from issue' : 'Subscribed to issue');
            break;
         case 'favorite':
            setIsFavorite((prev) => !prev);
            toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
            break;
         case 'copyId':
            navigator.clipboard.writeText('ISSUE-123');
            toast.success('Issue ID copied to clipboard');
            break;
         case 'delete':
            toast.error('Issue has been deleted');
            break;
         default:
            toast('Action triggered', { description: `${action} ${value || ''}` });
      }
   };

   return (
      <div className="flex w-full items-center justify-center p-8">
         <ContextMenu>
            <ContextMenuTrigger>
               <div className="flex w-full max-w-sm cursor-context-menu flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
                  <h3 className="font-medium">Right-Click Me</h3>
                  <p className="text-sm text-muted-foreground">
                     An issue context menu will appear.
                  </p>
               </div>
            </ContextMenuTrigger>
            <IssueContextMenu
               statusList={statusList}
               priorityList={priorityList}
               userList={userList}
               labelList={labelList}
               isSubscribed={isSubscribed}
               isFavorite={isFavorite}
               onAction={handleAction}
            />
         </ContextMenu>
      </div>
   );
};

export { IssueContextMenuDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/issue-context-menu.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
   ContextMenuContent,
   ContextMenuGroup,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
} from '@/components/ui/context-menu';
import {
   CircleCheck,
   User,
   BarChart3,
   Tag,
   Pencil,
   Link as LinkIcon,
   Copy as CopyIcon,
   Bell,
   Star,
   AlarmClock,
   Trash2,
   Clipboard,
   LucideIcon,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const BacklogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeDasharray="1.4 1.74"
         strokeDashoffset="0.65"
      />
   </svg>
);

export const PausedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
   </svg>
);

export const ToDoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
   </svg>
);

export const InProgressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M 7 1 A 6 6 0 0 1 13 7" stroke="currentColor" strokeWidth="2" fill="none" />
   </svg>
);

export const CompletedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
         d="M4.5 7L6.5 9L9.5 5"
         stroke="currentColor"
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export interface Status {
   id: string;
   name: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>>;
   color: string;
}
export interface Priority {
   id: string;
   name: string;
   icon: LucideIcon;
}
export interface User {
   id: string;
   name: string;
   avatarUrl: string;
}
export interface Label {
   id: string;
   name: string;
   color: string;
}

interface IssueContextMenuProps extends React.ComponentPropsWithoutRef<typeof ContextMenuContent> {
   statusList: Status[];
   priorityList: Priority[];
   userList: User[];
   labelList: Label[];
   isSubscribed?: boolean;
   isFavorite?: boolean;
   onAction: (action: string, value?: any) => void;
}

const IssueContextMenu = React.forwardRef<
   React.ElementRef<typeof ContextMenuContent>,
   IssueContextMenuProps
>(
   (
      {
         className,
         statusList,
         priorityList,
         userList,
         labelList,
         isSubscribed,
         isFavorite,
         onAction,
         ...props
      },
      ref
   ) => (
      <ContextMenuContent ref={ref} className={cn('w-64', className)} {...props}>
         <ContextMenuGroup>
            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <CircleCheck className="mr-2 size-4" /> Status
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {statusList.map((s) => (
                     <ContextMenuItem key={s.id} onClick={() => onAction('status', s.id)}>
                        <s.icon className="mr-2 size-3.5" style={{ color: s.color }} />
                        <span>{s.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <User className="mr-2 size-4" /> Assignee
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  <ContextMenuItem onClick={() => onAction('assignee', null)}>
                     <User className="mr-2 size-4" /> Unassigned
                  </ContextMenuItem>
                  {userList.map((user) => (
                     <ContextMenuItem key={user.id} onClick={() => onAction('assignee', user.id)}>
                        <Avatar className="mr-2 size-5">
                           <AvatarImage src={user.avatarUrl} alt={user.name} />
                           <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <BarChart3 className="mr-2 size-4" /> Priority
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {priorityList.map((p) => (
                     <ContextMenuItem key={p.id} onClick={() => onAction('priority', p.id)}>
                        <p.icon className="mr-2 size-4" /> <span>{p.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
               <ContextMenuSubTrigger>
                  <Tag className="mr-2 size-4" /> Labels
               </ContextMenuSubTrigger>
               <ContextMenuSubContent className="w-48">
                  {labelList.map((label) => (
                     <ContextMenuItem key={label.id} onClick={() => onAction('label', label.id)}>
                        <span
                           className="mr-2 inline-block size-2 rounded-full"
                           style={{ backgroundColor: label.color }}
                        />
                        <span>{label.name}</span>
                     </ContextMenuItem>
                  ))}
               </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem onClick={() => onAction('rename')}>
               <Pencil className="mr-2 size-4" /> Rename...
               <ContextMenuShortcut>R</ContextMenuShortcut>
            </ContextMenuItem>
         </ContextMenuGroup>

         <ContextMenuSeparator />

         <ContextMenuItem onClick={() => onAction('addLink')}>
            <LinkIcon className="mr-2 size-4" /> Add link...
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('duplicate')}>
            <CopyIcon className="mr-2 size-4" /> Make a copy...
         </ContextMenuItem>

         <ContextMenuSeparator />

         <ContextMenuItem onClick={() => onAction('subscribe')}>
            <Bell className="mr-2 size-4" /> {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            <ContextMenuShortcut>S</ContextMenuShortcut>
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('favorite')}>
            <Star className="mr-2 size-4" /> {isFavorite ? 'Unfavorite' : 'Favorite'}
            <ContextMenuShortcut>F</ContextMenuShortcut>
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('copyId')}>
            <Clipboard className="mr-2 size-4" /> Copy issue ID
         </ContextMenuItem>
         <ContextMenuItem onClick={() => onAction('remind')}>
            <AlarmClock className="mr-2 size-4" /> Remind me
            <ContextMenuShortcut>H</ContextMenuShortcut>
         </ContextMenuItem>

         <ContextMenuSeparator />

         <ContextMenuItem variant="destructive" onClick={() => onAction('delete')}>
            <Trash2 className="mr-2 size-4" /> Delete...
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
         </ContextMenuItem>
      </ContextMenuContent>
   )
);
IssueContextMenu.displayName = 'IssueContextMenu';

export default IssueContextMenu;
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
