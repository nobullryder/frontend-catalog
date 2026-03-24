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
prime-button.tsx
'use client';

import * as React from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { Loader2, Check, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants: Variants = {
  hidden: {
    y: 12,
    opacity: 0,
    filter: 'blur(4px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      mass: 0.5,
    },
  },
  exit: {
    y: -12,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.15,
    },
  },
};

type ActionState = 'idle' | 'loading' | 'success' | 'error';

interface PrimeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Current interactive state of the button. */
  actionState?: ActionState;
  /** Text to display during the 'loading' state. */
  loadingText?: string;
  /** Text to display during the 'success' state. */
  successText?: string;
  /** Text to display during the 'error' state. */
  errorText?: string;
  /** Duration (in ms) before the button reverts from success/error back to idle. */
  resetDelay?: number;
}

/**
 * An interactive button component that manages async action states (loading, success, error)
 * with built-in layout animations and auto-reset functionality.
 */
export const PrimeButton = React.forwardRef<
  HTMLButtonElement,
  PrimeButtonProps
>(
  (
    {
      className,
      variant,
      size,
      actionState = 'idle',
      loadingText = 'Processing',
      successText = 'Saved',
      errorText = 'Error',
      resetDelay = 2500,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalState, setInternalState] =
      React.useState<ActionState>(actionState);

    React.useEffect(() => {
      setInternalState(actionState);
    }, [actionState]);

    React.useEffect(() => {
      if (
        (internalState === 'success' || internalState === 'error') &&
        resetDelay
      ) {
        const timer = setTimeout(() => {
          setInternalState('idle');
        }, resetDelay);
        return () => clearTimeout(timer);
      }
    }, [internalState, resetDelay]);

    const stateStyles = {
      idle: '',
      loading: 'cursor-wait opacity-90',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-600 border-emerald-600 ring-offset-emerald-600',
      error:
        'bg-red-600 text-white hover:bg-red-600 border-red-600 ring-offset-red-600',
    };

    const isIconOnly = size === 'icon';

    return (
      <motion.button
        ref={ref}
        // Automates width animations when content changes (e.g., "Save" -> "Saving...")
        layout
        className={cn(
          buttonVariants({ variant, size, className }),
          stateStyles[internalState],
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
        )}
        onClick={onClick}
        whileTap={internalState === 'idle' ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        {...(props as any)} // Cast required to resolve conflict between Motion props and HTMLButton attributes
      >
        <AnimatePresence mode='popLayout' initial={false}>
          {internalState === 'loading' ? (
            <motion.span
              key='loading'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2'
            >
              <Loader2 className='h-4 w-4 animate-spin' />
              {!isIconOnly && <span>{loadingText}</span>}
            </motion.span>
          ) : internalState === 'success' ? (
            <motion.span
              key='success'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2 font-semibold'
            >
              <Check className='h-4 w-4' strokeWidth={3} />
              {!isIconOnly && <span>{successText}</span>}
            </motion.span>
          ) : internalState === 'error' ? (
            <motion.span
              key='error'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2 font-semibold'
            >
              <X className='h-4 w-4' strokeWidth={3} />
              {!isIconOnly && <span>{errorText}</span>}
            </motion.span>
          ) : (
            <motion.span
              key='idle'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2'
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

PrimeButton.displayName = 'PrimeButton';

code.demo.1767632917239.tsx
'use client';

import { useState } from 'react';
import { PrimeButton } from '@/components/ui/prime-button';
import { Trash2, CloudUpload, UserPlus } from 'lucide-react';

export default function DemoPrimeButtonVariants() {
// State for independent buttons
const [deleteStatus, setDeleteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
const [inviteStatus, setInviteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleAction = (
  setter: React.Dispatch<React.SetStateAction<'idle' | 'loading' | 'success' | 'error'>>
) => {
  setter('loading');
  setTimeout(() => setter('success'), 1500);
};

// NOTE: This layout uses container queries (@sm, @lg, etc.).
// For this to work in your own application, the parent element of this component
// must have the Tailwind CSS class "@container".
return (
  <div className="grid w-full grid-cols-1 gap-8 rounded-lg border border-dashed bg-background p-8 @md:grid-cols-3">
    
    {/* Destructive Variant */}
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-muted-foreground">Destructive</span>
      <PrimeButton
        variant="destructive"
        actionState={deleteStatus}
        onClick={() => handleAction(setDeleteStatus)}
        successText="Deleted"
        loadingText="Deleting..."
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Account
      </PrimeButton>
    </div>

    {/* Outline Variant */}
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-muted-foreground">Outline</span>
      <PrimeButton
        variant="outline"
        actionState={uploadStatus}
        onClick={() => handleAction(setUploadStatus)}
        loadingText="Uploading"
        successText="Done"
      >
        <CloudUpload className="mr-2 h-4 w-4" />
        Upload File
      </PrimeButton>
    </div>

    {/* Secondary + Large Size */}
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-muted-foreground">Secondary (lg)</span>
      <PrimeButton
        variant="secondary"
        size="lg"
        actionState={inviteStatus}
        onClick={() => handleAction(setInviteStatus)}
        successText="Sent!"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Team
      </PrimeButton>
    </div>
  </div>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/prime-button.tsx
'use client';

import * as React from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { Loader2, Check, X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants: Variants = {
  hidden: {
    y: 12,
    opacity: 0,
    filter: 'blur(4px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      mass: 0.5,
    },
  },
  exit: {
    y: -12,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.15,
    },
  },
};

type ActionState = 'idle' | 'loading' | 'success' | 'error';

interface PrimeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Current interactive state of the button. */
  actionState?: ActionState;
  /** Text to display during the 'loading' state. */
  loadingText?: string;
  /** Text to display during the 'success' state. */
  successText?: string;
  /** Text to display during the 'error' state. */
  errorText?: string;
  /** Duration (in ms) before the button reverts from success/error back to idle. */
  resetDelay?: number;
}

/**
 * An interactive button component that manages async action states (loading, success, error)
 * with built-in layout animations and auto-reset functionality.
 */
export const PrimeButton = React.forwardRef<
  HTMLButtonElement,
  PrimeButtonProps
>(
  (
    {
      className,
      variant,
      size,
      actionState = 'idle',
      loadingText = 'Processing',
      successText = 'Saved',
      errorText = 'Error',
      resetDelay = 2500,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalState, setInternalState] =
      React.useState<ActionState>(actionState);

    React.useEffect(() => {
      setInternalState(actionState);
    }, [actionState]);

    React.useEffect(() => {
      if (
        (internalState === 'success' || internalState === 'error') &&
        resetDelay
      ) {
        const timer = setTimeout(() => {
          setInternalState('idle');
        }, resetDelay);
        return () => clearTimeout(timer);
      }
    }, [internalState, resetDelay]);

    const stateStyles = {
      idle: '',
      loading: 'cursor-wait opacity-90',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-600 border-emerald-600 ring-offset-emerald-600',
      error:
        'bg-red-600 text-white hover:bg-red-600 border-red-600 ring-offset-red-600',
    };

    const isIconOnly = size === 'icon';

    return (
      <motion.button
        ref={ref}
        // Automates width animations when content changes (e.g., "Save" -> "Saving...")
        layout
        className={cn(
          buttonVariants({ variant, size, className }),
          stateStyles[internalState],
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
        )}
        onClick={onClick}
        whileTap={internalState === 'idle' ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        {...(props as any)} // Cast required to resolve conflict between Motion props and HTMLButton attributes
      >
        <AnimatePresence mode='popLayout' initial={false}>
          {internalState === 'loading' ? (
            <motion.span
              key='loading'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2'
            >
              <Loader2 className='h-4 w-4 animate-spin' />
              {!isIconOnly && <span>{loadingText}</span>}
            </motion.span>
          ) : internalState === 'success' ? (
            <motion.span
              key='success'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2 font-semibold'
            >
              <Check className='h-4 w-4' strokeWidth={3} />
              {!isIconOnly && <span>{successText}</span>}
            </motion.span>
          ) : internalState === 'error' ? (
            <motion.span
              key='error'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2 font-semibold'
            >
              <X className='h-4 w-4' strokeWidth={3} />
              {!isIconOnly && <span>{errorText}</span>}
            </motion.span>
          ) : (
            <motion.span
              key='idle'
              variants={textVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center gap-2'
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

PrimeButton.displayName = 'PrimeButton';
```

Install NPM dependencies:
```bash
motion, lucide-react, class-variance-authority
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
