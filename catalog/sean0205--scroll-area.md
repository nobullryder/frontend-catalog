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
scroll-area.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

function ScrollArea({
  className,
  viewportClassName,
  children,
  viewportRef,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.Ref<HTMLDivElement>;
  viewportClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };


code.demo.1752746277920.tsx
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge-2';
import { Button } from '@/components/ui/button-1';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';

// User data
const users = [
  {
    id: '1',
    name: 'Kathryn Campbell',
    availability: 'online',
    avatar: 'men/21.jpg',
    status: 'active',
    email: 'kathryn@apple.com',
  },
  {
    id: '2',
    name: 'Robert Smith',
    availability: 'away',
    avatar: 'men/71.jpg',
    status: 'inactive',
    email: 'robert@openai.com',
  },
  {
    id: '3',
    name: 'Sophia Johnson',
    availability: 'busy',
    avatar: 'women/31.jpg',
    status: 'active',
    email: 'sophia@meta.com',
  },
  {
    id: '4',
    name: 'Lucas Walker',
    availability: 'offline',
    avatar: 'women/60.jpg',
    status: 'inactive',
    email: 'lucas@tesla.com',
  },
  {
    id: '5',
    name: 'Emily Davis',
    availability: 'online',
    avatar: 'men/82.jpg',
    status: 'active',
    email: 'emily@sap.com',
  },
  {
    id: '6',
    name: 'Michael Brown',
    availability: 'online',
    avatar: 'men/31.jpg',
    status: 'active',
    email: 'michael@amazon.com',
  },
  {
    id: '7',
    name: 'Jessica Lee',
    availability: 'away',
    avatar: 'women/71.jpg',
    status: 'inactive',
    email: 'jessica@google.com',
  },
  {
    id: '8',
    name: 'David Wilson',
    availability: 'busy',
    avatar: 'men/11.jpg',
    status: 'active',
    email: 'david@microsoft.com',
  },
  {
    id: '9',
    name: 'Sarah Taylor',
    availability: 'offline',
    avatar: 'men/21.jpg',
    status: 'inactive',
    email: 'sarah@ibm.com',
  },
  {
    id: '10',
    name: 'James Anderson',
    availability: 'online',
    avatar: 'men/1.jpg',
    status: 'active',
    email: 'james@oracle.com',
  },
];

export default function CardDemo() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardHeading>
          <CardTitle>Recent Users</CardTitle>
        </CardHeading>
        <CardToolbar>
          <Button mode="icon" variant="outline" size="sm">
            <Settings />
          </Button>
        </CardToolbar>
      </CardHeader>
      <CardContent className="py-3 pe-1.5">
        <ScrollArea className="h-[300px] pe-3.5">
          {users.map((user) => {
            return (
              <div
                key={user.id}
                className="flex items-center justify-between gap-2 py-2 border-b border-dashed last:border-none"
              >
                {/* Left: Avatar and User Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={`https://randomuser.me/api/portraits/${user.avatar}`} alt={user.name} />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href="#" className="text-sm font-medium text-foreground hover:text-primary">
                      {user.name}
                    </Link>
                    <div className="text-sm font-normal text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                {/* Right: Status Badge */}
                <Badge appearance="outline" variant={user.status === 'active' ? 'success' : 'secondary'}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed">
          <Link href="#">Learn more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-area.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

function ScrollArea({
  className,
  viewportClassName,
  children,
  viewportRef,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.Ref<HTMLDivElement>;
  viewportClassName?: string;
}) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };

```

Install NPM dependencies:
```bash
radix-ui
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
