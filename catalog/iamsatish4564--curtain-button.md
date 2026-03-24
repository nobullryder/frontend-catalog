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
curtain-button.tsx
'use client';

import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurtainButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** The label text to display within the button. */
  text: string;
  /** If true, displays a spinner and disables interaction. */
  isLoading?: boolean;
  /** If true, visually greys out the button and prevents interaction. */
  isDisabled?: boolean;
  /** The visual style of the button. */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** The size dimensions of the button. */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * A button component featuring a "curtain" hover effect where the background
 * slides up and text color inverts. Includes built-in handling for loading states.
 */
const CurtainButton = React.forwardRef<HTMLButtonElement, CurtainButtonProps>(
  (
    {
      text,
      isLoading = false,
      isDisabled = false,
      variant = 'default',
      size = 'default',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Expo out easing: fast start, very slow settling for a snappy feel
    const transition = {
      duration: 0.4,
      ease: [0.19, 1, 0.22, 1] as const,
    };

    const variantStyles = {
      default: {
        button: 'bg-primary border border-primary text-primary-foreground',
        curtain: 'bg-primary-foreground',
        textInitial: 'text-primary-foreground',
        textHover: 'text-primary',
      },
      destructive: {
        button:
          'bg-destructive border border-destructive text-destructive-foreground',
        curtain: 'bg-destructive-foreground',
        textInitial: 'text-destructive-foreground',
        textHover: 'text-destructive',
      },
      outline: {
        button:
          'bg-background border border-input text-primary hover:border-primary',
        curtain: 'bg-primary',
        textInitial: 'text-primary',
        textHover: 'text-primary-foreground',
      },
      ghost: {
        button: 'bg-transparent border border-transparent text-foreground',
        curtain: 'bg-accent',
        textInitial: 'text-foreground',
        textHover: 'text-accent-foreground',
      },
    };

    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };

    const currentStyle = variantStyles[variant];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-md font-medium ring-offset-background transition-colors',
          'inline-flex items-center justify-center whitespace-nowrap text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          (isDisabled || isLoading) && 'pointer-events-none opacity-50',
          currentStyle.button,
          sizeStyles[size],
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileTap={!(isLoading || isDisabled) ? { scale: 0.98 } : undefined}
        disabled={isDisabled || isLoading}
        {...props}
      >
        <motion.div
          className={cn('absolute inset-0 z-0', currentStyle.curtain)}
          initial={{ y: '100%' }}
          animate={isHovered ? { y: 0 } : { y: '100%' }}
          transition={transition}
        />

        <AnimatePresence mode='popLayout'>
          {isLoading && (
            <motion.div
              key='loader'
              className='absolute inset-0 z-20 flex items-center justify-center'
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={transition}
            >
              <Loader2
                className={cn(
                  'h-4 w-4 animate-spin',
                  isHovered ? currentStyle.textHover : currentStyle.textInitial
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className='relative z-10 flex h-5 flex-col items-center justify-start overflow-hidden'
          animate={
            isLoading ? { y: '-150%', opacity: 0 } : { y: 0, opacity: 1 }
          }
          transition={transition}
        >
          {/* Hidden text ensures the button retains width while actual text is absolute/animating */}
          <span className='invisible whitespace-nowrap opacity-0'>{text}</span>

          <motion.div
            className='absolute left-0 right-0 top-0 flex flex-col text-center'
            animate={isHovered ? { y: '-50%' } : { y: 0 }}
            transition={transition}
          >
            <span
              className={cn(
                'flex h-5 items-center justify-center whitespace-nowrap',
                currentStyle.textInitial
              )}
            >
              {text}
            </span>

            <span
              className={cn(
                'flex h-5 items-center justify-center whitespace-nowrap',
                currentStyle.textHover
              )}
              aria-hidden='true'
            >
              {text}
            </span>
          </motion.div>
        </motion.div>
      </motion.button>
    );
  }
);

CurtainButton.displayName = 'CurtainButton';

export { CurtainButton };

code.demo.1767626147953.tsx
'use client';

import * as React from 'react';
import { CurtainButton } from '@/components/ui/curtain-button';
import { ArrowRight } from 'lucide-react';

export default function CurtainButtonShowcase() {
const [isLoading, setIsLoading] = React.useState(false);

const handleClick = () => {
  setIsLoading(true);
  setTimeout(() => setIsLoading(false), 2000);
};

return (
  <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-4">
    
    {/* Section: Variants */}
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground font-mono">Variants</h4>
      <div className="flex flex-wrap gap-4">
        <CurtainButton text="Default" variant="default" />
        <CurtainButton text="Outline" variant="outline" />
        <CurtainButton text="Destructive" variant="destructive" />
        <CurtainButton text="Ghost" variant="ghost" />
      </div>
    </div>

    {/* Section: Sizes */}
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground font-mono">Sizes</h4>
      <div className="flex flex-wrap items-center gap-4">
        <CurtainButton text="Small" size="sm" />
        <CurtainButton text="Default" size="default" />
        <CurtainButton text="Large Button" size="lg" />
      </div>
    </div>

    {/* Section: States */}
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground font-mono">States</h4>
      <div className="flex flex-wrap gap-4">
        <CurtainButton 
          text="Disabled" 
          isDisabled 
        />
        <CurtainButton 
          text={isLoading ? "Saving..." : "Click to Load"} 
          isLoading={isLoading} 
          onClick={handleClick}
        />
      </div>
    </div>

  </div>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/curtain-button.tsx
'use client';

import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurtainButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** The label text to display within the button. */
  text: string;
  /** If true, displays a spinner and disables interaction. */
  isLoading?: boolean;
  /** If true, visually greys out the button and prevents interaction. */
  isDisabled?: boolean;
  /** The visual style of the button. */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** The size dimensions of the button. */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * A button component featuring a "curtain" hover effect where the background
 * slides up and text color inverts. Includes built-in handling for loading states.
 */
const CurtainButton = React.forwardRef<HTMLButtonElement, CurtainButtonProps>(
  (
    {
      text,
      isLoading = false,
      isDisabled = false,
      variant = 'default',
      size = 'default',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Expo out easing: fast start, very slow settling for a snappy feel
    const transition = {
      duration: 0.4,
      ease: [0.19, 1, 0.22, 1] as const,
    };

    const variantStyles = {
      default: {
        button: 'bg-primary border border-primary text-primary-foreground',
        curtain: 'bg-primary-foreground',
        textInitial: 'text-primary-foreground',
        textHover: 'text-primary',
      },
      destructive: {
        button:
          'bg-destructive border border-destructive text-destructive-foreground',
        curtain: 'bg-destructive-foreground',
        textInitial: 'text-destructive-foreground',
        textHover: 'text-destructive',
      },
      outline: {
        button:
          'bg-background border border-input text-primary hover:border-primary',
        curtain: 'bg-primary',
        textInitial: 'text-primary',
        textHover: 'text-primary-foreground',
      },
      ghost: {
        button: 'bg-transparent border border-transparent text-foreground',
        curtain: 'bg-accent',
        textInitial: 'text-foreground',
        textHover: 'text-accent-foreground',
      },
    };

    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };

    const currentStyle = variantStyles[variant];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-md font-medium ring-offset-background transition-colors',
          'inline-flex items-center justify-center whitespace-nowrap text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          (isDisabled || isLoading) && 'pointer-events-none opacity-50',
          currentStyle.button,
          sizeStyles[size],
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileTap={!(isLoading || isDisabled) ? { scale: 0.98 } : undefined}
        disabled={isDisabled || isLoading}
        {...props}
      >
        <motion.div
          className={cn('absolute inset-0 z-0', currentStyle.curtain)}
          initial={{ y: '100%' }}
          animate={isHovered ? { y: 0 } : { y: '100%' }}
          transition={transition}
        />

        <AnimatePresence mode='popLayout'>
          {isLoading && (
            <motion.div
              key='loader'
              className='absolute inset-0 z-20 flex items-center justify-center'
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={transition}
            >
              <Loader2
                className={cn(
                  'h-4 w-4 animate-spin',
                  isHovered ? currentStyle.textHover : currentStyle.textInitial
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className='relative z-10 flex h-5 flex-col items-center justify-start overflow-hidden'
          animate={
            isLoading ? { y: '-150%', opacity: 0 } : { y: 0, opacity: 1 }
          }
          transition={transition}
        >
          {/* Hidden text ensures the button retains width while actual text is absolute/animating */}
          <span className='invisible whitespace-nowrap opacity-0'>{text}</span>

          <motion.div
            className='absolute left-0 right-0 top-0 flex flex-col text-center'
            animate={isHovered ? { y: '-50%' } : { y: 0 }}
            transition={transition}
          >
            <span
              className={cn(
                'flex h-5 items-center justify-center whitespace-nowrap',
                currentStyle.textInitial
              )}
            >
              {text}
            </span>

            <span
              className={cn(
                'flex h-5 items-center justify-center whitespace-nowrap',
                currentStyle.textHover
              )}
              aria-hidden='true'
            >
              {text}
            </span>
          </motion.div>
        </motion.div>
      </motion.button>
    );
  }
);

CurtainButton.displayName = 'CurtainButton';

export { CurtainButton };
```

Install NPM dependencies:
```bash
motion, lucide-react
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
