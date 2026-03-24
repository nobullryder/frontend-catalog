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
avatar.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';

const avatarStatusVariants = cva('flex items-center rounded-full size-2 border-2 border-background', {
  variants: {
    variant: {
      online: 'bg-green-600',
      offline: 'bg-zinc-600 dark:bg-zinc-300',
      busy: 'bg-yellow-600',
      away: 'bg-blue-600',
    },
  },
  defaultVariants: {
    variant: 'online',
  },
});

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" className={cn('relative flex shrink-0 size-10', className)} {...props} />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square h-full w-full')} {...props} />
    </div>
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full border border-border bg-accent text-accent-foreground text-xs',
        className,
      )}
      {...props}
    />
  );
}

function AvatarIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-indicator"
      className={cn('absolute flex size-6 items-center justify-center', className)}
      {...props}
    />
  );
}

function AvatarStatus({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarStatusVariants>) {
  return <div data-slot="avatar-status" className={cn(avatarStatusVariants({ variant }), className)} {...props} />;
}

export { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus, avatarStatusVariants };



code.demo.1751453758313.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button-1';

export default function AvatarDemo() {
  return (
    <div className="flex -space-x-2">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="@reui" className="border-2 border-background hover:z-10" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="@reui" className="border-2 border-background hover:z-10" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="@reui" className="border-2 border-background hover:z-10" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
       <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="@reui" className="border-2 border-background hover:z-10" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <Button
        variant="secondary"
        mode="icon"
        shape="circle"
        className="relative size-10 border-2 border-background hover:z-10"
      >
        +7
      </Button>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';

const avatarStatusVariants = cva('flex items-center rounded-full size-2 border-2 border-background', {
  variants: {
    variant: {
      online: 'bg-green-600',
      offline: 'bg-zinc-600 dark:bg-zinc-300',
      busy: 'bg-yellow-600',
      away: 'bg-blue-600',
    },
  },
  defaultVariants: {
    variant: 'online',
  },
});

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" className={cn('relative flex shrink-0 size-10', className)} {...props} />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square h-full w-full')} {...props} />
    </div>
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full border border-border bg-accent text-accent-foreground text-xs',
        className,
      )}
      {...props}
    />
  );
}

function AvatarIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-indicator"
      className={cn('absolute flex size-6 items-center justify-center', className)}
      {...props}
    />
  );
}

function AvatarStatus({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarStatusVariants>) {
  return <div data-slot="avatar-status" className={cn(avatarStatusVariants({ variant }), className)} {...props} />;
}

export { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus, avatarStatusVariants };


```

Install NPM dependencies:
```bash
radix-ui, class-variance-authority
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
