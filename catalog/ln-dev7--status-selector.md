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
status-selector.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon } from 'lucide-react';

export interface Status {
   id: string;
   name: string;
   color: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const BacklogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#bec2c8"
         strokeWidth="2"
         strokeDasharray="1.4 1.74"
         strokeDashoffset="0.65"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#bec2c8"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const PausedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#0ea5e9"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#0ea5e9"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const ToDoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#e2e2e2"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#e2e2e2"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const InProgressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#facc15"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#facc15"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const TechnicalReviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#22c55e"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#22c55e"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const CompletedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#8b5cf6"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <path
         d="M4.5 7L6.5 9L9.5 5"
         stroke="#8b5cf6"
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export const allStatus: Status[] = [
   { id: 'backlog', name: 'Backlog', color: '#ec4899', icon: BacklogIcon },
   { id: 'to-do', name: 'Todo', color: '#f97316', icon: ToDoIcon },
   { id: 'in-progress', name: 'In Progress', color: '#facc15', icon: InProgressIcon },
   {
      id: 'technical-review',
      name: 'Technical Review',
      color: '#22c55e',
      icon: TechnicalReviewIcon,
   },
   { id: 'paused', name: 'Paused', color: '#0ea5e9', icon: PausedIcon },
   { id: 'completed', name: 'Completed', color: '#8b5cf6', icon: CompletedIcon },
];

interface StatusSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
   status: Status;
   onChange: (newStatus: Status) => void;
}

const StatusSelector = React.forwardRef<HTMLDivElement, StatusSelectorProps>(
   ({ status, onChange, className, ...props }, ref) => {
      const id = React.useId();
      const [open, setOpen] = React.useState<boolean>(false);
      const [value, setValue] = React.useState<string>(status.id);

      React.useEffect(() => {
         setValue(status.id);
      }, [status.id]);

      const handleStatusChange = (statusId: string) => {
         const newStatus = allStatus.find((s) => s.id === statusId);
         if (newStatus) {
            setValue(newStatus.id);
            onChange(newStatus);
         }
         setOpen(false);
      };

      const SelectedIcon = allStatus.find((item) => item.id === value)?.icon || ToDoIcon;

      return (
         <div ref={ref} className={cn(className)} {...props}>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     id={id}
                     className="flex size-7 items-center justify-center"
                     size="icon"
                     variant="ghost"
                     role="combobox"
                     aria-expanded={open}
                  >
                     <SelectedIcon />
                  </Button>
               </PopoverTrigger>
               <PopoverContent
                  className="w-[200px] border-input p-0"
                  align="start"
               >
                  <Command>
                     <CommandInput placeholder="Set status..." />
                     <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                           {allStatus.map((item) => (
                              <CommandItem
                                 key={item.id}
                                 value={item.id}
                                 onSelect={handleStatusChange}
                                 className="flex cursor-pointer items-center justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <item.icon />
                                    <span>{item.name}</span>
                                 </div>
                                 {value === item.id && <CheckIcon size={16} className="ml-auto" />}
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     </CommandList>
                  </Command>
               </PopoverContent>
            </Popover>
         </div>
      );
   }
);
StatusSelector.displayName = 'StatusSelector';

export default StatusSelector;

code.demo.1749370380026.tsx
// demo.tsx
'use client';

import * as React from 'react';
import StatusSelector, { allStatus } from '@/components/ui/status-selector';
import type { Status } from '@/components/ui/status-selector';

const StatusSelectorDemo = () => {
   const [currentStatus, setCurrentStatus] = React.useState<Status>(allStatus[1]);

   const handleStatusChange = (newStatus: Status) => {
      setCurrentStatus(newStatus);
   };

   const CurrentStatusIcon = currentStatus.icon;

   return (
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
         <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-semibold">Status Selector Demo</h2>
            <p className="text-sm text-muted-foreground">
               Click the icon to change the current status.
            </p>
         </div>

         <StatusSelector status={currentStatus} onChange={handleStatusChange} />

         <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-lg border bg-background p-6 shadow-sm">
            <h3 className="text-base font-medium text-muted-foreground">Current Status</h3>
            <div
               className="flex items-center gap-2.5 text-lg font-semibold"
               style={{ color: currentStatus.color }}
            >
               <CurrentStatusIcon className="size-5" />
               <span>{currentStatus.name}</span>
            </div>
         </div>
      </div>
   );
};

export { StatusSelectorDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/status-selector.tsx
// component.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon } from 'lucide-react';

export interface Status {
   id: string;
   name: string;
   color: string;
   icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const BacklogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#bec2c8"
         strokeWidth="2"
         strokeDasharray="1.4 1.74"
         strokeDashoffset="0.65"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#bec2c8"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const PausedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#0ea5e9"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#0ea5e9"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const ToDoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#e2e2e2"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#e2e2e2"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const InProgressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#facc15"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#facc15"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const TechnicalReviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#22c55e"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <circle
         cx="7"
         cy="7"
         r="2"
         fill="none"
         stroke="#22c55e"
         strokeWidth="4"
         transform="rotate(-90 7 7)"
      ></circle>
   </svg>
);

export const CompletedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle
         cx="7"
         cy="7"
         r="6"
         fill="none"
         stroke="#8b5cf6"
         strokeWidth="2"
         strokeDasharray="3.14 0"
         strokeDashoffset="-0.7"
      ></circle>
      <path
         d="M4.5 7L6.5 9L9.5 5"
         stroke="#8b5cf6"
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
      />
   </svg>
);

export const allStatus: Status[] = [
   { id: 'backlog', name: 'Backlog', color: '#ec4899', icon: BacklogIcon },
   { id: 'to-do', name: 'Todo', color: '#f97316', icon: ToDoIcon },
   { id: 'in-progress', name: 'In Progress', color: '#facc15', icon: InProgressIcon },
   {
      id: 'technical-review',
      name: 'Technical Review',
      color: '#22c55e',
      icon: TechnicalReviewIcon,
   },
   { id: 'paused', name: 'Paused', color: '#0ea5e9', icon: PausedIcon },
   { id: 'completed', name: 'Completed', color: '#8b5cf6', icon: CompletedIcon },
];

interface StatusSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
   status: Status;
   onChange: (newStatus: Status) => void;
}

const StatusSelector = React.forwardRef<HTMLDivElement, StatusSelectorProps>(
   ({ status, onChange, className, ...props }, ref) => {
      const id = React.useId();
      const [open, setOpen] = React.useState<boolean>(false);
      const [value, setValue] = React.useState<string>(status.id);

      React.useEffect(() => {
         setValue(status.id);
      }, [status.id]);

      const handleStatusChange = (statusId: string) => {
         const newStatus = allStatus.find((s) => s.id === statusId);
         if (newStatus) {
            setValue(newStatus.id);
            onChange(newStatus);
         }
         setOpen(false);
      };

      const SelectedIcon = allStatus.find((item) => item.id === value)?.icon || ToDoIcon;

      return (
         <div ref={ref} className={cn(className)} {...props}>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     id={id}
                     className="flex size-7 items-center justify-center"
                     size="icon"
                     variant="ghost"
                     role="combobox"
                     aria-expanded={open}
                  >
                     <SelectedIcon />
                  </Button>
               </PopoverTrigger>
               <PopoverContent
                  className="w-[200px] border-input p-0"
                  align="start"
               >
                  <Command>
                     <CommandInput placeholder="Set status..." />
                     <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                           {allStatus.map((item) => (
                              <CommandItem
                                 key={item.id}
                                 value={item.id}
                                 onSelect={handleStatusChange}
                                 className="flex cursor-pointer items-center justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <item.icon />
                                    <span>{item.name}</span>
                                 </div>
                                 {value === item.id && <CheckIcon size={16} className="ml-auto" />}
                              </CommandItem>
                           ))}
                        </CommandGroup>
                     </CommandList>
                  </Command>
               </PopoverContent>
            </Popover>
         </div>
      );
   }
);
StatusSelector.displayName = 'StatusSelector';

export default StatusSelector;
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
