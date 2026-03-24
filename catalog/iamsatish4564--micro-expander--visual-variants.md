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
micro-expander.tsx
'use client';

import * as React from 'react';
import {
  motion,
  type HTMLMotionProps,
  type Variants,
  AnimatePresence,
} from 'motion/react';
import { Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MicroExpander component.
 */
interface MicroExpanderProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** The label text to display when the button is hovered/expanded. */
  text: string;
  /** An optional custom icon. Defaults to a Plus icon if not provided. */
  icon?: React.ReactNode;
  /** The visual style variant of the button. */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** If true, displays a spinner, disables interaction, and collapses the button. */
  isLoading?: boolean;
}

/**
 * A micro-interaction button that expands from a circular icon to a pill shape
 * containing text upon hover. It handles loading states by reverting to the
 * circular shape and displaying a spinner.
 */
const MicroExpander = React.forwardRef<HTMLButtonElement, MicroExpanderProps>(
  (
    {
      text,
      icon,
      variant = 'default',
      isLoading = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants: Variants = {
      initial: { width: '48px' },
      hover: { width: 'auto' },
      loading: { width: '48px' },
    };

    const textVariants: Variants = {
      initial: { opacity: 0, x: -10 },
      hover: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.3, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        x: -5,
        transition: { duration: 0.1, ease: 'linear' },
      },
    };

    const variantStyles = {
      default: 'bg-primary text-primary-foreground border border-primary',
      outline:
        'bg-transparent border border-input text-foreground hover:border-primary',
      ghost:
        'bg-accent/50 border border-transparent text-accent-foreground hover:bg-accent',
      destructive:
        'bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) return;
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative flex h-12 items-center overflow-hidden rounded-full',
          'whitespace-nowrap font-medium text-sm uppercase tracking-wide',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isLoading && 'cursor-not-allowed',
          variantStyles[variant],
          className
        )}
        initial='initial'
        animate={isLoading ? 'loading' : isHovered ? 'hover' : 'initial'}
        variants={containerVariants}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={handleClick}
        disabled={isLoading}
        {...props}
        aria-label={text}
      >
        <div className='grid h-12 w-12 place-items-center shrink-0 z-10'>
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              <motion.div
                key='spinner'
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : (
              <motion.div
                key='icon'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {icon || <Plus className='h-5 w-5' />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div variants={textVariants} className='pr-6 pl-1'>
          {text}
        </motion.div>
      </motion.button>
    );
  }
);

MicroExpander.displayName = 'MicroExpander';

export { MicroExpander };

code.demo.1767626727445.tsx
'use client';

import { MicroExpander } from '@/components/ui/micro-expander';
import { Plus, Eye, Settings, Trash2 } from 'lucide-react';

export default function MicroExpanderVariants() {
return (
  <div className="w-full min-h-[200px] grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-8 place-items-center p-4">
    {/* NOTE: This layout uses container queries (@md, @lg).
        For this to work in your own application, the parent element of this component
        must have the Tailwind CSS class "@container". */}
    
    {/* Default Variant */}
    <MicroExpander text="Create New" icon={<Plus className="w-5 h-5" />} />

    {/* Outline Variant */}
    <MicroExpander 
      text="View Details" 
      variant="outline" 
      icon={<Eye className="w-5 h-5" />} 
    />

    {/* Ghost Variant */}
    <MicroExpander 
      text="Settings" 
      variant="ghost" 
      icon={<Settings className="w-5 h-5" />} 
    />

    {/* Destructive Variant */}
    <MicroExpander 
      text="Delete Item" 
      variant="destructive" 
      icon={<Trash2 className="w-5 h-5" />} 
    />
  </div>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/micro-expander.tsx
'use client';

import * as React from 'react';
import {
  motion,
  type HTMLMotionProps,
  type Variants,
  AnimatePresence,
} from 'motion/react';
import { Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MicroExpander component.
 */
interface MicroExpanderProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** The label text to display when the button is hovered/expanded. */
  text: string;
  /** An optional custom icon. Defaults to a Plus icon if not provided. */
  icon?: React.ReactNode;
  /** The visual style variant of the button. */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** If true, displays a spinner, disables interaction, and collapses the button. */
  isLoading?: boolean;
}

/**
 * A micro-interaction button that expands from a circular icon to a pill shape
 * containing text upon hover. It handles loading states by reverting to the
 * circular shape and displaying a spinner.
 */
const MicroExpander = React.forwardRef<HTMLButtonElement, MicroExpanderProps>(
  (
    {
      text,
      icon,
      variant = 'default',
      isLoading = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants: Variants = {
      initial: { width: '48px' },
      hover: { width: 'auto' },
      loading: { width: '48px' },
    };

    const textVariants: Variants = {
      initial: { opacity: 0, x: -10 },
      hover: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.15, duration: 0.3, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        x: -5,
        transition: { duration: 0.1, ease: 'linear' },
      },
    };

    const variantStyles = {
      default: 'bg-primary text-primary-foreground border border-primary',
      outline:
        'bg-transparent border border-input text-foreground hover:border-primary',
      ghost:
        'bg-accent/50 border border-transparent text-accent-foreground hover:bg-accent',
      destructive:
        'bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) return;
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative flex h-12 items-center overflow-hidden rounded-full',
          'whitespace-nowrap font-medium text-sm uppercase tracking-wide',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isLoading && 'cursor-not-allowed',
          variantStyles[variant],
          className
        )}
        initial='initial'
        animate={isLoading ? 'loading' : isHovered ? 'hover' : 'initial'}
        variants={containerVariants}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={handleClick}
        disabled={isLoading}
        {...props}
        aria-label={text}
      >
        <div className='grid h-12 w-12 place-items-center shrink-0 z-10'>
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              <motion.div
                key='spinner'
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : (
              <motion.div
                key='icon'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {icon || <Plus className='h-5 w-5' />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div variants={textVariants} className='pr-6 pl-1'>
          {text}
        </motion.div>
      </motion.button>
    );
  }
);

MicroExpander.displayName = 'MicroExpander';

export { MicroExpander };
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
