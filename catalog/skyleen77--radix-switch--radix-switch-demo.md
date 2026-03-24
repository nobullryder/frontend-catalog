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
radix-switch.tsx
'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  thumbIcon?: React.ElementType;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      style,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      thumbIcon: ThumbIcon,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      props?.checked ?? props?.defaultChecked ?? false,
    );
    const [isTapped, setIsTapped] = React.useState(false);

    React.useEffect(() => {
      setIsChecked(props?.checked ?? props?.defaultChecked ?? false);
    }, [props?.checked, props?.defaultChecked]);

    return (
      <SwitchPrimitives.Root
        {...props}
        onCheckedChange={(checked) => {
          setIsChecked(checked);
          props.onCheckedChange?.(checked);
        }}
        asChild
      >
        <motion.button
          ref={ref}
          className={cn(
            'relative flex p-[3px] h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
            className,
          )}
          style={{
            ...style,
            justifyContent: isChecked ? 'flex-end' : 'flex-start',
          }}
          whileTap="tap"
          initial={false}
          onTapStart={() => setIsTapped(true)}
          onTapCancel={() => setIsTapped(false)}
          onTap={() => setIsTapped(false)}
        >
          {LeftIcon && (
            <motion.div
              animate={
                isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ type: 'spring', bounce: 0 }}
              className="absolute left-1 top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
            >
              <LeftIcon className="size-3" />
            </motion.div>
          )}

          {RightIcon && (
            <motion.div
              animate={
                isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
              }
              transition={{ type: 'spring', bounce: 0 }}
              className="absolute right-1 top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
            >
              <RightIcon className="size-3" />
            </motion.div>
          )}

          <SwitchPrimitives.Thumb asChild>
            <motion.div
              whileTap="tab"
              className={cn(
                'relative z-[1] flex items-center justify-center rounded-full bg-background shadow-lg ring-0 dark:text-neutral-400 text-neutral-500',
              )}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: 18,
                height: 18,
              }}
              animate={
                isTapped
                  ? { width: 21, transition: { duration: 0.1 } }
                  : { width: 18, transition: { duration: 0.1 } }
              }
            >
              {ThumbIcon && <ThumbIcon className="size-3" />}
            </motion.div>
          </SwitchPrimitives.Thumb>
        </motion.button>
      </SwitchPrimitives.Root>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };


code.demo.tsx
import { Switch } from "@/components/ui/radix-switch";

export const RadixSwitchDemo = () => (
    <div className="flex items-center space-x-2">
        <label htmlFor="airplane-mode" className="text-sm leading-none font-medium select-none">Airplane mode</label>
        <Switch defaultChecked id="airplane-mode" />
    </div>
);

```

Copy-paste these files for dependencies:
```tsx
/components/ui/radix-switch.tsx
'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  thumbIcon?: React.ElementType;
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      style,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      thumbIcon: ThumbIcon,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      props?.checked ?? props?.defaultChecked ?? false,
    );
    const [isTapped, setIsTapped] = React.useState(false);

    React.useEffect(() => {
      setIsChecked(props?.checked ?? props?.defaultChecked ?? false);
    }, [props?.checked, props?.defaultChecked]);

    return (
      <SwitchPrimitives.Root
        {...props}
        onCheckedChange={(checked) => {
          setIsChecked(checked);
          props.onCheckedChange?.(checked);
        }}
        asChild
      >
        <motion.button
          ref={ref}
          className={cn(
            'relative flex p-[3px] h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
            className,
          )}
          style={{
            ...style,
            justifyContent: isChecked ? 'flex-end' : 'flex-start',
          }}
          whileTap="tap"
          initial={false}
          onTapStart={() => setIsTapped(true)}
          onTapCancel={() => setIsTapped(false)}
          onTap={() => setIsTapped(false)}
        >
          {LeftIcon && (
            <motion.div
              animate={
                isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ type: 'spring', bounce: 0 }}
              className="absolute left-1 top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
            >
              <LeftIcon className="size-3" />
            </motion.div>
          )}

          {RightIcon && (
            <motion.div
              animate={
                isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
              }
              transition={{ type: 'spring', bounce: 0 }}
              className="absolute right-1 top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
            >
              <RightIcon className="size-3" />
            </motion.div>
          )}

          <SwitchPrimitives.Thumb asChild>
            <motion.div
              whileTap="tab"
              className={cn(
                'relative z-[1] flex items-center justify-center rounded-full bg-background shadow-lg ring-0 dark:text-neutral-400 text-neutral-500',
              )}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: 18,
                height: 18,
              }}
              animate={
                isTapped
                  ? { width: 21, transition: { duration: 0.1 } }
                  : { width: 18, transition: { duration: 0.1 } }
              }
            >
              {ThumbIcon && <ThumbIcon className="size-3" />}
            </motion.div>
          </SwitchPrimitives.Thumb>
        </motion.button>
      </SwitchPrimitives.Root>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };

```

Install NPM dependencies:
```bash
motion, @radix-ui/react-switch
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
