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
indevui-context-menu.tsx
// component.tsx
'use client';

import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const ContextMenu = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>
>(({ ...props }, ref) => (
   <ContextMenuPrimitive.Root ref={ref} data-slot="context-menu" {...props} />
));
ContextMenu.displayName = ContextMenuPrimitive.Root.displayName;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
      inset?: boolean;
   }
>(({ className, inset, children, ...props }, ref) => (
   <ContextMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
         "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
   </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.SubContent
      ref={ref}
      data-slot="context-menu-sub-content"
      className={cn(
         'z-50 min-w-[8rem] origin-[var(--radix-context-menu-content-transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
         className
      )}
      {...props}
   />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
         ref={ref}
         data-slot="context-menu-content"
         className={cn(
            'z-50 min-w-[8rem] origin-[var(--radix-context-menu-content-transform-origin)] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
         )}
         {...props}
      />
   </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
      inset?: boolean;
      variant?: 'default' | 'destructive';
   }
>(({ className, inset, variant = 'default', ...props }, ref) => (
   <ContextMenuPrimitive.Item
      ref={ref}
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
   <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="context-menu-checkbox-item"
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      checked={checked}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <CheckIcon className="h-4 w-4" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
   <ContextMenuPrimitive.RadioItem
      ref={ref}
      data-slot="context-menu-radio-item"
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <CircleIcon className="h-2 w-2 fill-current" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
      inset?: boolean;
   }
>(({ className, inset, ...props }, ref) => (
   <ContextMenuPrimitive.Label
      ref={ref}
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:pl-8', className)}
      {...props}
   />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.Separator
      ref={ref}
      data-slot="context-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
   />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
   return (
      <span
         data-slot="context-menu-shortcut"
         className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
         {...props}
      />
   );
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export default ContextMenu;
export {
   ContextMenuTrigger,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuCheckboxItem,
   ContextMenuRadioItem,
   ContextMenuLabel,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuGroup,
   ContextMenuPortal,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuRadioGroup,
};

code.demo.1749317114666.tsx
// demo.tsx
'use client';

import * as React from 'react';
import {
   Cloud,
   CreditCard,
   Github,
   Keyboard,
   LifeBuoy,
   LogOut,
   Mail,
   MessageSquare,
   Plus,
   PlusCircle,
   Settings,
   User,
   UserPlus,
   Users,
} from 'lucide-react';

import ContextMenu, {
   ContextMenuContent,
   ContextMenuGroup,
   ContextMenuItem,
   ContextMenuLabel,
   ContextMenuPortal,
   ContextMenuRadioGroup,
   ContextMenuRadioItem,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuTrigger,
   ContextMenuCheckboxItem,
} from '@/components/ui/indevui-context-menu';

function ContextMenuDemo() {
   const [showStatusBar, setShowStatusBar] = React.useState(true);
   const [showActivityBar, setShowActivityBar] = React.useState(false);
   const [panel, setPanel] = React.useState('console');

   return (
      <div className="flex h-64 items-center justify-center">
         <ContextMenu>
            <ContextMenuTrigger className="flex h-48 w-72 items-center justify-center rounded-md border border-dashed text-sm">
               Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
               <ContextMenuItem inset>
                  Back
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
               </ContextMenuItem>
               <ContextMenuItem inset disabled>
                  Forward
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
               </ContextMenuItem>
               <ContextMenuItem inset>
                  Reload
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
               </ContextMenuItem>
               <ContextMenuSub>
                  <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                  <ContextMenuPortal>
                     <ContextMenuSubContent className="w-48">
                        <ContextMenuItem>
                           Save Page As...
                           <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                        <ContextMenuItem>Name Window...</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Developer Tools</ContextMenuItem>
                     </ContextMenuSubContent>
                  </ContextMenuPortal>
               </ContextMenuSub>
               <ContextMenuSeparator />
               <ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                  Show Status Bar
               </ContextMenuCheckboxItem>
               <ContextMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                  disabled
               >
                  Show Activity Bar
               </ContextMenuCheckboxItem>
               <ContextMenuSeparator />
               <ContextMenuRadioGroup value={panel} onValueChange={setPanel}>
                  <ContextMenuLabel inset>Panel</ContextMenuLabel>
                  <ContextMenuRadioItem value="console">Console</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="terminal">Terminal</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="output">Output</ContextMenuRadioItem>
               </ContextMenuRadioGroup>
               <ContextMenuSeparator />
               <ContextMenuItem variant="destructive" inset>
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
               </ContextMenuItem>
            </ContextMenuContent>
         </ContextMenu>
      </div>
   );
}

export { ContextMenuDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/indevui-context-menu.tsx
// component.tsx
'use client';

import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const ContextMenu = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>
>(({ ...props }, ref) => (
   <ContextMenuPrimitive.Root ref={ref} data-slot="context-menu" {...props} />
));
ContextMenu.displayName = ContextMenuPrimitive.Root.displayName;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
      inset?: boolean;
   }
>(({ className, inset, children, ...props }, ref) => (
   <ContextMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
         "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
   </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.SubContent
      ref={ref}
      data-slot="context-menu-sub-content"
      className={cn(
         'z-50 min-w-[8rem] origin-[var(--radix-context-menu-content-transform-origin)] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
         className
      )}
      {...props}
   />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
         ref={ref}
         data-slot="context-menu-content"
         className={cn(
            'z-50 min-w-[8rem] origin-[var(--radix-context-menu-content-transform-origin)] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
         )}
         {...props}
      />
   </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
      inset?: boolean;
      variant?: 'default' | 'destructive';
   }
>(({ className, inset, variant = 'default', ...props }, ref) => (
   <ContextMenuPrimitive.Item
      ref={ref}
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
   <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="context-menu-checkbox-item"
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      checked={checked}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <CheckIcon className="h-4 w-4" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
   <ContextMenuPrimitive.RadioItem
      ref={ref}
      data-slot="context-menu-radio-item"
      className={cn(
         "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
         className
      )}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <CircleIcon className="h-2 w-2 fill-current" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
      inset?: boolean;
   }
>(({ className, inset, ...props }, ref) => (
   <ContextMenuPrimitive.Label
      ref={ref}
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:pl-8', className)}
      {...props}
   />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.Separator
      ref={ref}
      data-slot="context-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
   />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
   return (
      <span
         data-slot="context-menu-shortcut"
         className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
         {...props}
      />
   );
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export default ContextMenu;
export {
   ContextMenuTrigger,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuCheckboxItem,
   ContextMenuRadioItem,
   ContextMenuLabel,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuGroup,
   ContextMenuPortal,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuRadioGroup,
};
```

Install NPM dependencies:
```bash
@radix-ui/react-context-menu, lucide-react
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
