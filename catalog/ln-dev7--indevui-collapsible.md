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
indevui-collapsible.tsx
'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const Collapsible = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>((props, ref) => <CollapsiblePrimitive.Root ref={ref} {...props} />);
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>((props, ref) => <CollapsiblePrimitive.Trigger ref={ref} {...props} />);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>((props, ref) => <CollapsiblePrimitive.Content ref={ref} {...props} />);
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

code.demo.1749316951793.tsx
import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import Button from '@/components/ui/button';
import {
   Collapsible,
   CollapsibleTrigger,
   CollapsibleContent,
} from '@/components/ui/indevui-collapsible';

const CollapsibleDemo = () => {
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <div className="flex w-full items-center justify-center p-4">
         <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
               <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
               <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                     <ChevronsUpDown className="h-4 w-4" />
                     <span className="sr-only">Toggle</span>
                  </Button>
               </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
               @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
               <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @radix-ui/colors
               </div>
               <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @stitches/react
               </div>
            </CollapsibleContent>
         </Collapsible>
      </div>
   );
};

export { CollapsibleDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/indevui-collapsible.tsx
'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const Collapsible = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>((props, ref) => <CollapsiblePrimitive.Root ref={ref} {...props} />);
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>((props, ref) => <CollapsiblePrimitive.Trigger ref={ref} {...props} />);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>((props, ref) => <CollapsiblePrimitive.Content ref={ref} {...props} />);
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
```

Install NPM dependencies:
```bash
@radix-ui/react-collapsible
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
