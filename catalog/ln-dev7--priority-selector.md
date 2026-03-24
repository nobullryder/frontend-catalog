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
priority-selector.tsx
'use client';

import React, { forwardRef, useState, HTMLAttributes } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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

interface IconProps extends React.SVGProps<SVGSVGElement> {
   className?: string;
}

export const NoPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="No Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
      <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
      <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
   </svg>
);

const UrgentPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Urgent Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"></path>
   </svg>
);

const HighPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="High Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1"></rect>
   </svg>
);

const MediumPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Medium Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
   </svg>
);

const LowPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Low Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
   </svg>
);

export interface Priority {
   id: string;
   name: string;
   icon: React.FC<IconProps>;
}

export const priorities: Priority[] = [
   { id: 'no-priority', name: 'No priority', icon: NoPriorityIcon },
   { id: 'urgent', name: 'Urgent', icon: UrgentPriorityIcon },
   { id: 'high', name: 'High', icon: HighPriorityIcon },
   { id: 'medium', name: 'Medium', icon: MediumPriorityIcon },
   { id: 'low', name: 'Low', icon: LowPriorityIcon },
];

interface PrioritySelectorProps extends HTMLAttributes<HTMLDivElement> {
   value: string;
   onChange: (value: string) => void;
}

const PrioritySelector = forwardRef<HTMLDivElement, PrioritySelectorProps>(
   ({ value, onChange, className, ...props }, ref) => {
      const [open, setOpen] = useState(false);

      const handleSelect = (priorityId: string) => {
         onChange(priorityId);
         setOpen(false);
      };

      const selectedPriority = priorities.find((p) => p.id === value);
      const SelectedIcon = selectedPriority?.icon || NoPriorityIcon;

      return (
         <div ref={ref} className={cn(className)} {...props}>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     aria-expanded={open}
                     className="w-[180px] justify-between"
                  >
                     <div className="flex items-center gap-2">
                        <SelectedIcon className="size-4 text-muted-foreground" />
                        <span>{selectedPriority?.name || 'Set priority...'}</span>
                     </div>
                     <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[180px] p-0" align="start">
                  <Command>
                     <CommandInput placeholder="Set priority..." />
                     <CommandList>
                        <CommandEmpty>No priority found.</CommandEmpty>
                        <CommandGroup>
                           {priorities.map((item) => (
                              <CommandItem
                                 key={item.id}
                                 value={item.id}
                                 onSelect={() => handleSelect(item.id)}
                                 className="flex items-center justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <item.icon className="size-4 text-muted-foreground" />
                                    <span>{item.name}</span>
                                 </div>
                                 {value === item.id && <Check size={16} className="ml-auto" />}
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

PrioritySelector.displayName = 'PrioritySelector';

export default PrioritySelector;

code.demo.1749412324106.tsx
'use client';

import { useState } from 'react';
import PrioritySelector, { priorities } from '@/components/ui/priority-selector';
import { Ban, ListTodo } from 'lucide-react';

const PrioritySelectorDemo = () => {
   const [selectedPriorityId, setSelectedPriorityId] = useState<string>(priorities[2].id);

   const currentPriority = priorities.find((p) => p.id === selectedPriorityId);
   const CurrentIcon = currentPriority?.icon || Ban;

   return (
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
         <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-semibold">Priority Selector</h2>
            <p className="text-sm text-muted-foreground">Select a priority from the popover.</p>
         </div>

         <PrioritySelector value={selectedPriorityId} onChange={setSelectedPriorityId} />

         <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-lg border bg-background p-6 shadow-sm">
            <h3 className="flex items-center text-base font-medium text-muted-foreground">
               <ListTodo className="mr-2 size-4" />
               Current Priority
            </h3>
            <div className="flex items-center gap-3 text-lg font-semibold">
               <CurrentIcon className="size-6 text-foreground" />
               <span>{currentPriority?.name || 'None'}</span>
            </div>
         </div>
      </div>
   );
};

export { PrioritySelectorDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/priority-selector.tsx
'use client';

import React, { forwardRef, useState, HTMLAttributes } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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

interface IconProps extends React.SVGProps<SVGSVGElement> {
   className?: string;
}

export const NoPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="No Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
      <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
      <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" opacity="0.9"></rect>
   </svg>
);

const UrgentPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Urgent Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4L9 4L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"></path>
   </svg>
);

const HighPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="High Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1"></rect>
   </svg>
);

const MediumPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Medium Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
   </svg>
);

const LowPriorityIcon = ({ className, ...props }: IconProps) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-label="Low Priority"
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <rect x="1.5" y="8" width="3" height="6" rx="1"></rect>
      <rect x="6.5" y="5" width="3" height="9" rx="1" fillOpacity="0.4"></rect>
      <rect x="11.5" y="2" width="3" height="12" rx="1" fillOpacity="0.4"></rect>
   </svg>
);

export interface Priority {
   id: string;
   name: string;
   icon: React.FC<IconProps>;
}

export const priorities: Priority[] = [
   { id: 'no-priority', name: 'No priority', icon: NoPriorityIcon },
   { id: 'urgent', name: 'Urgent', icon: UrgentPriorityIcon },
   { id: 'high', name: 'High', icon: HighPriorityIcon },
   { id: 'medium', name: 'Medium', icon: MediumPriorityIcon },
   { id: 'low', name: 'Low', icon: LowPriorityIcon },
];

interface PrioritySelectorProps extends HTMLAttributes<HTMLDivElement> {
   value: string;
   onChange: (value: string) => void;
}

const PrioritySelector = forwardRef<HTMLDivElement, PrioritySelectorProps>(
   ({ value, onChange, className, ...props }, ref) => {
      const [open, setOpen] = useState(false);

      const handleSelect = (priorityId: string) => {
         onChange(priorityId);
         setOpen(false);
      };

      const selectedPriority = priorities.find((p) => p.id === value);
      const SelectedIcon = selectedPriority?.icon || NoPriorityIcon;

      return (
         <div ref={ref} className={cn(className)} {...props}>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     aria-expanded={open}
                     className="w-[180px] justify-between"
                  >
                     <div className="flex items-center gap-2">
                        <SelectedIcon className="size-4 text-muted-foreground" />
                        <span>{selectedPriority?.name || 'Set priority...'}</span>
                     </div>
                     <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[180px] p-0" align="start">
                  <Command>
                     <CommandInput placeholder="Set priority..." />
                     <CommandList>
                        <CommandEmpty>No priority found.</CommandEmpty>
                        <CommandGroup>
                           {priorities.map((item) => (
                              <CommandItem
                                 key={item.id}
                                 value={item.id}
                                 onSelect={() => handleSelect(item.id)}
                                 className="flex items-center justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <item.icon className="size-4 text-muted-foreground" />
                                    <span>{item.name}</span>
                                 </div>
                                 {value === item.id && <Check size={16} className="ml-auto" />}
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

PrioritySelector.displayName = 'PrioritySelector';

export default PrioritySelector;
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
