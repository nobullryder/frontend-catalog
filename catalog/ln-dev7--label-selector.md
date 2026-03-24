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
label-selector.tsx
'use client';

import { forwardRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Check, TagIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Interface and example data remain the same
export interface LabelInterface {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export const labels: LabelInterface[] = [
  { id: 'bug', name: 'Bug', color: '#d73a4a' },
  { id: 'feature', name: 'Feature', color: '#0e8a16' },
  { id: 'enhancement', name: 'Enhancement', color: '#a2eeef' },
  { id: 'documentation', name: 'Documentation', color: '#534cb3' },
  { id: 'design', name: 'Design', color: '#d876e3' },
  { id: 'question', name: 'Question', color: '#fcca42' },
  { id: 'performance', name: 'Performance', color: '#fbca04' },
];

interface LabelSelectorProps extends HTMLAttributes<HTMLDivElement> {
  selectedLabels: LabelInterface[];
  onChange: (labels: LabelInterface[]) => void;
}

const LabelSelector = forwardRef<HTMLDivElement, LabelSelectorProps>(
  ({ className, selectedLabels, onChange, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const handleLabelToggle = (label: LabelInterface) => {
      const isSelected = selectedLabels.some((l) => l.id === label.id);
      const newLabels = isSelected
        ? selectedLabels.filter((l) => l.id !== label.id)
        : [...selectedLabels, label];
      onChange(newLabels);
    };

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-auto justify-start px-2"
              role="combobox"
              aria-expanded={open}
            >
              {selectedLabels.length > 0 ? (
                // --- ИЗМЕНЕНИЕ ЗДЕСЬ / CHANGE IS HERE ---
                // Добавлен `py-0.5` для вертикальных отступов внутри бейджа
                // Added `py-0.5` for vertical padding inside the badge
                <Badge
                  variant="secondary"
                  className="flex items-center gap-x-1 rounded-sm px-1.5 py-0.5 font-normal"
                >
                  <TagIcon className="size-4" />
                  <div className="flex -space-x-1.5">
                    {selectedLabels.slice(0, 3).map((label) => (
                      <div
                        key={label.id}
                        className="size-4 rounded-full border-2 border-background"
                        style={{ backgroundColor: label.color }}
                      />
                    ))}
                    {selectedLabels.length > 3 && (
                      <div className="flex size-4 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                        +{selectedLabels.length - 3}
                      </div>
                    )}
                  </div>
                </Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <TagIcon className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Set label...</span>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          {/* Popover Content remains the same */}
          <PopoverContent
            className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search labels..." />
              <CommandList>
                <CommandEmpty>No labels found.</CommandEmpty>
                <CommandGroup>
                  {labels.map((label) => {
                    const isSelected = selectedLabels.some((l) => l.id === label.id);
                    return (
                      <CommandItem
                        key={label.id}
                        value={label.name}
                        onSelect={() => handleLabelToggle(label)}
                      >
                        <div
                          className={cn(
                            'mr-2 flex size-4 items-center justify-center rounded-sm border',
                            isSelected ? 'border-primary' : 'border-muted-foreground'
                          )}
                        >
                          {isSelected && <Check className="size-3 text-primary" />}
                        </div>
                        <div
                          className="mr-2 size-3 rounded-full"
                          style={{ backgroundColor: label.color }}
                        />
                        <span>{label.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
LabelSelector.displayName = 'LabelSelector';

export default LabelSelector;

code.demo.1749410045803.tsx
'use client';

import { useState } from 'react';
import LabelSelector, { labels } from '@/components/ui/label-selector';
import type { LabelInterface } from '@/components/ui/label-selector';

const LabelSelectorDemo = () => {
   const [selected, setSelected] = useState<LabelInterface[]>([labels[0], labels[2]]);

   return (
      <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
         <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-semibold">Label Selector</h2>
            <p className="text-sm text-muted-foreground">Click to select or deselect labels.</p>
         </div>

         <LabelSelector selectedLabels={selected} onChange={setSelected} />

         <div className="w-full max-w-sm rounded-lg border bg-background p-4">
            <h3 className="mb-2 font-medium">Currently Selected Labels:</h3>
            {selected.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                  {selected.map((label) => (
                     <span
                        key={label.id}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                           backgroundColor: `${label.color}33`,
                           color: label.color,
                           border: `1px solid ${label.color}`,
                        }}
                     >
                        {label.name}
                     </span>
                  ))}
               </div>
            ) : (
               <p className="text-sm text-muted-foreground">No labels selected.</p>
            )}
         </div>
      </div>
   );
};

export { LabelSelectorDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/label-selector.tsx
'use client';

import { forwardRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Check, TagIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Interface and example data remain the same
export interface LabelInterface {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export const labels: LabelInterface[] = [
  { id: 'bug', name: 'Bug', color: '#d73a4a' },
  { id: 'feature', name: 'Feature', color: '#0e8a16' },
  { id: 'enhancement', name: 'Enhancement', color: '#a2eeef' },
  { id: 'documentation', name: 'Documentation', color: '#534cb3' },
  { id: 'design', name: 'Design', color: '#d876e3' },
  { id: 'question', name: 'Question', color: '#fcca42' },
  { id: 'performance', name: 'Performance', color: '#fbca04' },
];

interface LabelSelectorProps extends HTMLAttributes<HTMLDivElement> {
  selectedLabels: LabelInterface[];
  onChange: (labels: LabelInterface[]) => void;
}

const LabelSelector = forwardRef<HTMLDivElement, LabelSelectorProps>(
  ({ className, selectedLabels, onChange, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const handleLabelToggle = (label: LabelInterface) => {
      const isSelected = selectedLabels.some((l) => l.id === label.id);
      const newLabels = isSelected
        ? selectedLabels.filter((l) => l.id !== label.id)
        : [...selectedLabels, label];
      onChange(newLabels);
    };

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-auto justify-start px-2"
              role="combobox"
              aria-expanded={open}
            >
              {selectedLabels.length > 0 ? (
                // --- ИЗМЕНЕНИЕ ЗДЕСЬ / CHANGE IS HERE ---
                // Добавлен `py-0.5` для вертикальных отступов внутри бейджа
                // Added `py-0.5` for vertical padding inside the badge
                <Badge
                  variant="secondary"
                  className="flex items-center gap-x-1 rounded-sm px-1.5 py-0.5 font-normal"
                >
                  <TagIcon className="size-4" />
                  <div className="flex -space-x-1.5">
                    {selectedLabels.slice(0, 3).map((label) => (
                      <div
                        key={label.id}
                        className="size-4 rounded-full border-2 border-background"
                        style={{ backgroundColor: label.color }}
                      />
                    ))}
                    {selectedLabels.length > 3 && (
                      <div className="flex size-4 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                        +{selectedLabels.length - 3}
                      </div>
                    )}
                  </div>
                </Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <TagIcon className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Set label...</span>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          {/* Popover Content remains the same */}
          <PopoverContent
            className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search labels..." />
              <CommandList>
                <CommandEmpty>No labels found.</CommandEmpty>
                <CommandGroup>
                  {labels.map((label) => {
                    const isSelected = selectedLabels.some((l) => l.id === label.id);
                    return (
                      <CommandItem
                        key={label.id}
                        value={label.name}
                        onSelect={() => handleLabelToggle(label)}
                      >
                        <div
                          className={cn(
                            'mr-2 flex size-4 items-center justify-center rounded-sm border',
                            isSelected ? 'border-primary' : 'border-muted-foreground'
                          )}
                        >
                          {isSelected && <Check className="size-3 text-primary" />}
                        </div>
                        <div
                          className="mr-2 size-3 rounded-full"
                          style={{ backgroundColor: label.color }}
                        />
                        <span>{label.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
LabelSelector.displayName = 'LabelSelector';

export default LabelSelector;
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
