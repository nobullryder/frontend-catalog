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
breadcrumb.tsx

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(
   ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
   ({ className, ...props }, ref) => (
      <ol
         ref={ref}
         className={cn(
            'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
            className
         )}
         {...props}
      />
   )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
   ({ className, ...props }, ref) => (
      <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
   )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
   HTMLAnchorElement,
   React.ComponentPropsWithoutRef<'a'> & {
      asChild?: boolean;
   }
>(({ asChild, className, ...props }, ref) => {
   const Comp = asChild ? Slot : 'a';

   return <Comp ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...props} />;
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
   ({ className, ...props }, ref) => (
      <span
         ref={ref}
         role="link"
         aria-disabled="true"
         aria-current="page"
         className={cn('font-normal text-foreground', className)}
         {...props}
      />
   )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<
   HTMLLIElement,
   React.ComponentPropsWithoutRef<'li'>
>(({ children, className, ...props }, ref) => (
   <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
   >
      {children ?? <ChevronRight />}
   </li>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = React.forwardRef<
   HTMLSpanElement,
   React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
   <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
   >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
   </span>
));
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
   BreadcrumbList,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbPage,
   BreadcrumbSeparator,
   BreadcrumbEllipsis,
};
export default Breadcrumb;

code.demo.1749312441276.tsx
// demo.tsx
import React from 'react';
import Breadcrumb, {
   BreadcrumbList,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbSeparator,
   BreadcrumbEllipsis,
   BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const BreadcrumbDemo = () => {
   return (
      <div className="flex w-full items-center justify-center p-4">
         <Breadcrumb>
            <BreadcrumbList>
               <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                  <BreadcrumbEllipsis />
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
               </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
      </div>
   );
};

export { BreadcrumbDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/breadcrumb.tsx

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(
   ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
   ({ className, ...props }, ref) => (
      <ol
         ref={ref}
         className={cn(
            'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
            className
         )}
         {...props}
      />
   )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
   ({ className, ...props }, ref) => (
      <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
   )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
   HTMLAnchorElement,
   React.ComponentPropsWithoutRef<'a'> & {
      asChild?: boolean;
   }
>(({ asChild, className, ...props }, ref) => {
   const Comp = asChild ? Slot : 'a';

   return <Comp ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...props} />;
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
   ({ className, ...props }, ref) => (
      <span
         ref={ref}
         role="link"
         aria-disabled="true"
         aria-current="page"
         className={cn('font-normal text-foreground', className)}
         {...props}
      />
   )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<
   HTMLLIElement,
   React.ComponentPropsWithoutRef<'li'>
>(({ children, className, ...props }, ref) => (
   <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
   >
      {children ?? <ChevronRight />}
   </li>
));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = React.forwardRef<
   HTMLSpanElement,
   React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
   <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
   >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
   </span>
));
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
   BreadcrumbList,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbPage,
   BreadcrumbSeparator,
   BreadcrumbEllipsis,
};
export default Breadcrumb;
```

Install NPM dependencies:
```bash
@radix-ui/react-slot, lucide-react
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
