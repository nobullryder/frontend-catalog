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
slider.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slider as SliderPrimitive } from 'radix-ui';

function Slider({ className, children, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn('relative flex h-4 w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-accent">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {children}
    </SliderPrimitive.Root>
  );
}

function SliderThumb({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        'box-content block size-4 shrink-0 cursor-pointer rounded-full border-[2px] border-primary bg-primary-foreground shadow-xs shadow-black/5 outline-hidden focus:outline-hidden',
        className,
      )}
      {...props}
    />
  );
}

export { Slider, SliderThumb };


code.demo.1752687252758.tsx
'use client';

import { useEffect, useState } from 'react';
import { Slider, SliderThumb } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function SliderDemo() {
  const [value, setValue] = useState<number[]>([100, 450]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="w-full md:w-[400px]">
      <Slider
        defaultValue={[100, 450]}
        min={0}
        max={600}
        step={1}
        onValueChange={(val) => {
          setValue(val);
        }}
      >
        <TooltipProvider>
          <Tooltip open={isOpen}>
            <TooltipTrigger asChild>
              <SliderThumb />
            </TooltipTrigger>
            <TooltipContent side="top" forceMount>
              {value[1] ?? 0}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip open={isOpen}>
            <TooltipTrigger asChild>
              <SliderThumb />
            </TooltipTrigger>
            <TooltipContent side="top" forceMount>
              {value[1] ?? 0}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Slider>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/slider.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slider as SliderPrimitive } from 'radix-ui';

function Slider({ className, children, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn('relative flex h-4 w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-accent">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {children}
    </SliderPrimitive.Root>
  );
}

function SliderThumb({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        'box-content block size-4 shrink-0 cursor-pointer rounded-full border-[2px] border-primary bg-primary-foreground shadow-xs shadow-black/5 outline-hidden focus:outline-hidden',
        className,
      )}
      {...props}
    />
  );
}

export { Slider, SliderThumb };

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
