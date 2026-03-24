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
x-scroll.tsx
'use client';

import * as React from "react";
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface XScrollProps extends ScrollAreaProps {}

export default function XScroll({ children, className, ...props }: XScrollProps) {
  return (
    <div className="flex">
      <ScrollArea className={cn('w-1 flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

code.demo.tsx
'use client';

import * as React from "react"
import XScroll from '@/components/ui/x-scroll';

function Demo() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="mx-auto w-[50vw] rounded-md border border-dashed">
        <XScroll>
          <div className="flex gap-4 p-6">
            {Array.from({ length: 20 }, (v, i) => (
              <div key={i} className="grid size-32 shrink-0 place-items-center rounded-md bg-gray-200 shadow-md">
                {i}
              </div>
            ))}
          </div>
        </XScroll>
      </div>
    </div>
  );
}

export {
    Demo
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/x-scroll.tsx
'use client';

import * as React from "react";
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface XScrollProps extends ScrollAreaProps {}

export default function XScroll({ children, className, ...props }: XScrollProps) {
  return (
    <div className="flex">
      <ScrollArea className={cn('w-1 flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
```

Install NPM dependencies:
```bash
@radix-ui/react-scroll-area
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
