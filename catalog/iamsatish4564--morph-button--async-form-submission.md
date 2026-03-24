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
morph-button.tsx
'use client';

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MorphButton component.
 */
interface MorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The label text to display in the button. */
  text: string;
  /** If true, replaces text with a spinner and shrinks the button width. */
  isLoading?: boolean;
  /** Optional icon to display to the left of the text. */
  icon?: React.ReactNode;
  /** Visual style variant of the button. */
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * A specialized button that performs a fluid width transition between
 * its standard text state and a circular loading state.
 */
const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  (
    {
      text,
      isLoading = false,
      icon,
      variant = 'primary',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Physics: Low stiffness (150) + high damping (25) creates the signature
    // "fluid" feel with zero elastic jitter.
    const transition: Transition = {
      type: 'spring',
      stiffness: 150,
      damping: 25,
      mass: 1,
    };

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-sm',
      secondary:
        'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground shadow-sm',
      ghost:
        'bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground',
    };

    return (
      <MotionConfig transition={transition}>
        <motion.button
          ref={ref}
          layout
          className={cn(
            'relative flex h-12 items-center justify-center overflow-hidden rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            isLoading ? 'px-0' : 'px-8',
            variantStyles[variant],
            (props.disabled || isLoading) &&
              'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
          onClick={(e) => !isLoading && onClick?.(e)}
          whileTap={!isLoading ? { scale: 0.98 } : undefined}
          {...(props as any)}
        >
          {/* 
            mode='popLayout' ensures the exiting element is removed from the flow immediately,
            allowing the parent container to animate its width smoothly without layout jumps.
          */}
          <AnimatePresence mode='popLayout' initial={false}>
            {isLoading ? (
              <motion.div
                key='loader'
                className='flex items-center justify-center'
                style={{ width: '3rem' }}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              >
                <Loader2 className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : (
              <motion.div
                key='content'
                className='flex items-center gap-2 whitespace-nowrap'
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              >
                {icon && <motion.span layout>{icon}</motion.span>}
                <motion.span layout>{text}</motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MotionConfig>
    );
  }
);

MorphButton.displayName = 'MorphButton';

export { MorphButton };

code.demo.1767628408233.tsx
'use client';

import * as React from 'react';
import { MorphButton } from '@/components/ui/morph-button';
import { ArrowRight, Mail, Check } from 'lucide-react';

export default function MorphButtonFormDemo() {
const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle');
const [email, setEmail] = React.useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');
  
  // Simulate network request
  setTimeout(() => {
    setStatus('success');
    // Reset after showing success state
    setTimeout(() => {
      setStatus('idle');
      setEmail('');
    }, 2000);
  }, 1500);
};

return (
  <div className="flex w-full items-center justify-center bg-muted/20 p-6">
    <div className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-4 space-y-1">
        <h3 className="font-semibold leading-none tracking-tight">Subscribe</h3>
        <p className="text-sm text-muted-foreground">
          Join our newsletter for weekly updates.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <MorphButton
            type="submit"
            disabled={status !== 'idle' || !email}
            isLoading={status === 'loading'}
            text={status === 'success' ? 'Subscribed!' : 'Join Now'}
            icon={
              status === 'success' ? (
                <Check className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )
            }
            className={status === 'success' ? 'bg-green-600 border-green-600 hover:bg-green-700' : ''}
          />
        </div>
      </form>
    </div>
  </div>
);
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/morph-button.tsx
'use client';

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MorphButton component.
 */
interface MorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The label text to display in the button. */
  text: string;
  /** If true, replaces text with a spinner and shrinks the button width. */
  isLoading?: boolean;
  /** Optional icon to display to the left of the text. */
  icon?: React.ReactNode;
  /** Visual style variant of the button. */
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * A specialized button that performs a fluid width transition between
 * its standard text state and a circular loading state.
 */
const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  (
    {
      text,
      isLoading = false,
      icon,
      variant = 'primary',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Physics: Low stiffness (150) + high damping (25) creates the signature
    // "fluid" feel with zero elastic jitter.
    const transition: Transition = {
      type: 'spring',
      stiffness: 150,
      damping: 25,
      mass: 1,
    };

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-sm',
      secondary:
        'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground shadow-sm',
      ghost:
        'bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground',
    };

    return (
      <MotionConfig transition={transition}>
        <motion.button
          ref={ref}
          layout
          className={cn(
            'relative flex h-12 items-center justify-center overflow-hidden rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            isLoading ? 'px-0' : 'px-8',
            variantStyles[variant],
            (props.disabled || isLoading) &&
              'opacity-50 cursor-not-allowed pointer-events-none',
            className
          )}
          onClick={(e) => !isLoading && onClick?.(e)}
          whileTap={!isLoading ? { scale: 0.98 } : undefined}
          {...(props as any)}
        >
          {/* 
            mode='popLayout' ensures the exiting element is removed from the flow immediately,
            allowing the parent container to animate its width smoothly without layout jumps.
          */}
          <AnimatePresence mode='popLayout' initial={false}>
            {isLoading ? (
              <motion.div
                key='loader'
                className='flex items-center justify-center'
                style={{ width: '3rem' }}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              >
                <Loader2 className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : (
              <motion.div
                key='content'
                className='flex items-center gap-2 whitespace-nowrap'
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              >
                {icon && <motion.span layout>{icon}</motion.span>}
                <motion.span layout>{text}</motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MotionConfig>
    );
  }
);

MorphButton.displayName = 'MorphButton';

export { MorphButton };
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
