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
alert.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const alertVariants = cva(
  'flex items-stretch w-full gap-2 group-[.toaster]:w-(--width)',
  {
    variants: {
      variant: {
        secondary: '',
        primary: '',
        destructive: '',
        success: '',
        info: '',
        mono: '',
        warning: '',
      },
      icon: {
        primary: '',
        destructive: '',
        success: '',
        info: '',
        warning: '',
      },
      appearance: {
        solid: '',
        outline: '',
        light: '',
        stroke: 'text-foreground',
      },
      size: {
        lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:mt-0.5 *:data-slot=alert-close:-me-0.5',
        md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:-me-0.5',
        sm: 'rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4 *:data-alert-icon:mt-0.5 *:data-slot=alert-close:-me-0.5 [&>[data-slot=alert-close]>svg]:size-3.5!',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        appearance: 'solid',
        className:
          'bg-muted text-foreground *:data-alert-close:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'solid',
        className:
          'bg-primary text-primary-foreground *:data-alert-close:text-primary-foreground',
      },
      {
        variant: 'destructive',
        appearance: 'solid',
        className:
          'bg-destructive text-destructive-foreground *:data-alert-close:text-destructive-foreground',
      },
      {
        variant: 'success',
        appearance: 'solid',
        className: 'bg-green-500 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'info',
        appearance: 'solid',
        className: 'bg-violet-600 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'warning',
        appearance: 'solid',
        className: 'bg-yellow-500 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'mono',
        appearance: 'solid',
        className:
          'bg-mono text-mono-foreground *:data-alert-close:text-mono-foreground',
      },

      {
        variant: 'secondary',
        appearance: 'outline',
        className:
          'border border-border bg-background text-foreground *:data-alert-close:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'outline',
        className:
          'border border-border bg-background text-primary *:data-alert-close:text-foreground',
      },
      {
        variant: 'destructive',
        appearance: 'outline',
        className:
          'border border-border bg-background text-destructive *:data-alert-close:text-foreground',
      },
      {
        variant: 'success',
        appearance: 'outline',
        className:
          'border border-border bg-background text-green-500 *:data-alert-close:text-foreground',
      },
      {
        variant: 'info',
        appearance: 'outline',
        className:
          'border border-border bg-background text-violet-600 *:data-alert-close:text-foreground',
      },
      {
        variant: 'warning',
        appearance: 'outline',
        className:
          'border border-border bg-background text-yellow-500 *:data-alert-close:text-foreground',
      },
      {
        variant: 'mono',
        appearance: 'outline',
        className:
          'border border-border bg-background text-mono *:data-alert-close:text-foreground',
      },

      {
        variant: 'secondary',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'destructive',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'success',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'info',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-violet-600',
      },
      {
        variant: 'warning',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-yellow-500',
      },
      {
        variant: 'mono',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-mono',
      },

      {
        variant: 'secondary',
        appearance: 'light',
        className: 'bg-muted border border-border text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'light',
        className:
          'bg-primary/5 border border-primary/10 text-foreground [&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'destructive',
        appearance: 'light',
        className:
          'bg-destructive/5 border border-destructive/10 text-foreground [&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'success',
        appearance: 'light',
        className:
          'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-950/50 text-foreground [&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'info',
        appearance: 'light',
        className:
          'bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-950/50 text-foreground [&>div:first-of-type>svg]:text-violet-600',
      },
      {
        variant: 'warning',
        appearance: 'light',
        className:
          'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-950/50 text-foreground [&>div:first-of-type>svg]:text-yellow-500',
      },

      {
        variant: 'mono',
        icon: 'primary',
        className: '[&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'mono',
        icon: 'warning',
        className: '[&>div:first-of-type>svg]:text-yellow-500',
      },
      {
        variant: 'mono',
        icon: 'success',
        className: '[&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'mono',
        icon: 'destructive',
        className: '[&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'mono',
        icon: 'info',
        className: '[&>div:first-of-type>svg]:text-violet-600',
      },
    ],
    defaultVariants: {
      variant: 'secondary',
      appearance: 'solid',
      size: 'md',
    },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  close?: boolean;
  onClose?: () => void;
}

interface AlertIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({
  className,
  variant,
  size,
  icon,
  appearance,
  close = false,
  onClose,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        alertVariants({ variant, size, icon, appearance }),
        className,
      )}
      {...props}
    >
      {children}
      {close && (
        <Button
          size="sm"
          variant="inverse"
          mode="icon"
          onClick={onClose}
          aria-label="Dismiss"
          data-alert-close="true"
          className={cn('group shrink-0 size-4')}
        >
          <X className="opacity-60! group-hover:opacity-100! size-4!" />
        </Button>
      )}
    </div>
  );
}

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('grow tracking-tight', className)}
      {...props}
    />
  );
}

function AlertIcon({ children, className, ...props }: AlertIconProps) {
  return (
    <div
      data-slot="alert-icon"
      className={cn('shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertToolbar({ children, className, ...props }: AlertIconProps) {
  return (
    <div data-slot="alert-toolbar" className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-sm [&_p]:leading-relaxed [&_p]:mb-2', className)}
      {...props}
    />
  );
}

function AlertContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-content"
      className={cn(
        'space-y-2 [&_[data-slot=alert-title]]:font-semibold',
        className,
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertToolbar,
};


code.demo.1748399906867.tsx
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertToolbar,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiNotificationFill,
  RiSpam3Fill,
  RiSpamFill,
} from '@remixicon/react';

const DemoOne = () => {
  return (
    <div className="flex flex-col gap-5 p-10 w-full mx-auto max-w-[600px] h-screen justify-center items-center">
      <Alert variant="primary" close={true}>
        <AlertIcon>
          <RiNotificationFill />
        </AlertIcon>
        <AlertTitle>This is a primary alert</AlertTitle>
        <AlertToolbar>
          <Button
            variant="inverse"
            mode="link"
            underlined="solid"
            size="sm"
            className="flex mt-0.5"
          >
            Upgrade
          </Button>
        </AlertToolbar>
      </Alert>
      <Alert variant="success" close={true}>
        <AlertIcon>
          <RiCheckboxCircleFill />
        </AlertIcon>
        <AlertTitle>This is a success alert</AlertTitle>
        <AlertToolbar>
          <Button
            variant="inverse"
            mode="link"
            underlined="solid"
            size="sm"
            className="flex mt-0.5"
          >
            Upgrade
          </Button>
        </AlertToolbar>
      </Alert>
      <Alert variant="destructive" close={true}>
        <AlertIcon>
          <RiErrorWarningFill />
        </AlertIcon>
        <AlertTitle>This is a destructive alert</AlertTitle>
        <AlertToolbar>
          <Button
            variant="inverse"
            mode="link"
            underlined="solid"
            size="sm"
            className="flex mt-0.5"
          >
            Upgrade
          </Button>
        </AlertToolbar>
      </Alert>
      <Alert variant="info" close={true}>
        <AlertIcon>
          <RiSpamFill />
        </AlertIcon>
        <AlertTitle>This is an info alert</AlertTitle>
        <AlertToolbar>
          <Button
            variant="inverse"
            mode="link"
            underlined="solid"
            size="sm"
            className="flex mt-0.5"
          >
            Upgrade
          </Button>
        </AlertToolbar>
      </Alert>
      <Alert variant="warning" close={true}>
        <AlertIcon>
          <RiSpam3Fill />
        </AlertIcon>
        <AlertTitle>This is a warning alert</AlertTitle>
        <AlertToolbar>
          <Button
            variant="inverse"
            mode="link"
            underlined="solid"
            size="sm"
            className="flex mt-0.5"
          >
            Upgrade
          </Button>
        </AlertToolbar>
      </Alert>
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/alert.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const alertVariants = cva(
  'flex items-stretch w-full gap-2 group-[.toaster]:w-(--width)',
  {
    variants: {
      variant: {
        secondary: '',
        primary: '',
        destructive: '',
        success: '',
        info: '',
        mono: '',
        warning: '',
      },
      icon: {
        primary: '',
        destructive: '',
        success: '',
        info: '',
        warning: '',
      },
      appearance: {
        solid: '',
        outline: '',
        light: '',
        stroke: 'text-foreground',
      },
      size: {
        lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:mt-0.5 *:data-slot=alert-close:-me-0.5',
        md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:-me-0.5',
        sm: 'rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4 *:data-alert-icon:mt-0.5 *:data-slot=alert-close:-me-0.5 [&>[data-slot=alert-close]>svg]:size-3.5!',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        appearance: 'solid',
        className:
          'bg-muted text-foreground *:data-alert-close:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'solid',
        className:
          'bg-primary text-primary-foreground *:data-alert-close:text-primary-foreground',
      },
      {
        variant: 'destructive',
        appearance: 'solid',
        className:
          'bg-destructive text-destructive-foreground *:data-alert-close:text-destructive-foreground',
      },
      {
        variant: 'success',
        appearance: 'solid',
        className: 'bg-green-500 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'info',
        appearance: 'solid',
        className: 'bg-violet-600 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'warning',
        appearance: 'solid',
        className: 'bg-yellow-500 text-white *:data-alert-close:text-white',
      },
      {
        variant: 'mono',
        appearance: 'solid',
        className:
          'bg-mono text-mono-foreground *:data-alert-close:text-mono-foreground',
      },

      {
        variant: 'secondary',
        appearance: 'outline',
        className:
          'border border-border bg-background text-foreground *:data-alert-close:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'outline',
        className:
          'border border-border bg-background text-primary *:data-alert-close:text-foreground',
      },
      {
        variant: 'destructive',
        appearance: 'outline',
        className:
          'border border-border bg-background text-destructive *:data-alert-close:text-foreground',
      },
      {
        variant: 'success',
        appearance: 'outline',
        className:
          'border border-border bg-background text-green-500 *:data-alert-close:text-foreground',
      },
      {
        variant: 'info',
        appearance: 'outline',
        className:
          'border border-border bg-background text-violet-600 *:data-alert-close:text-foreground',
      },
      {
        variant: 'warning',
        appearance: 'outline',
        className:
          'border border-border bg-background text-yellow-500 *:data-alert-close:text-foreground',
      },
      {
        variant: 'mono',
        appearance: 'outline',
        className:
          'border border-border bg-background text-mono *:data-alert-close:text-foreground',
      },

      {
        variant: 'secondary',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'destructive',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'success',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'info',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-violet-600',
      },
      {
        variant: 'warning',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-yellow-500',
      },
      {
        variant: 'mono',
        appearance: 'stroke',
        className:
          'border border-border bg-background [&>div:first-of-type>svg]:text-mono',
      },

      {
        variant: 'secondary',
        appearance: 'light',
        className: 'bg-muted border border-border text-foreground',
      },
      {
        variant: 'primary',
        appearance: 'light',
        className:
          'bg-primary/5 border border-primary/10 text-foreground [&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'destructive',
        appearance: 'light',
        className:
          'bg-destructive/5 border border-destructive/10 text-foreground [&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'success',
        appearance: 'light',
        className:
          'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-950/50 text-foreground [&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'info',
        appearance: 'light',
        className:
          'bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-950/50 text-foreground [&>div:first-of-type>svg]:text-violet-600',
      },
      {
        variant: 'warning',
        appearance: 'light',
        className:
          'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-950/50 text-foreground [&>div:first-of-type>svg]:text-yellow-500',
      },

      {
        variant: 'mono',
        icon: 'primary',
        className: '[&>div:first-of-type>svg]:text-primary',
      },
      {
        variant: 'mono',
        icon: 'warning',
        className: '[&>div:first-of-type>svg]:text-yellow-500',
      },
      {
        variant: 'mono',
        icon: 'success',
        className: '[&>div:first-of-type>svg]:text-green-500',
      },
      {
        variant: 'mono',
        icon: 'destructive',
        className: '[&>div:first-of-type>svg]:text-destructive',
      },
      {
        variant: 'mono',
        icon: 'info',
        className: '[&>div:first-of-type>svg]:text-violet-600',
      },
    ],
    defaultVariants: {
      variant: 'secondary',
      appearance: 'solid',
      size: 'md',
    },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  close?: boolean;
  onClose?: () => void;
}

interface AlertIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({
  className,
  variant,
  size,
  icon,
  appearance,
  close = false,
  onClose,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        alertVariants({ variant, size, icon, appearance }),
        className,
      )}
      {...props}
    >
      {children}
      {close && (
        <Button
          size="sm"
          variant="inverse"
          mode="icon"
          onClick={onClose}
          aria-label="Dismiss"
          data-alert-close="true"
          className={cn('group shrink-0 size-4')}
        >
          <X className="opacity-60! group-hover:opacity-100! size-4!" />
        </Button>
      )}
    </div>
  );
}

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('grow tracking-tight', className)}
      {...props}
    />
  );
}

function AlertIcon({ children, className, ...props }: AlertIconProps) {
  return (
    <div
      data-slot="alert-icon"
      className={cn('shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertToolbar({ children, className, ...props }: AlertIconProps) {
  return (
    <div data-slot="alert-toolbar" className={cn(className)} {...props}>
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-sm [&_p]:leading-relaxed [&_p]:mb-2', className)}
      {...props}
    />
  );
}

function AlertContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-content"
      className={cn(
        'space-y-2 [&_[data-slot=alert-title]]:font-semibold',
        className,
      )}
      {...props}
    />
  );
}

export {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  AlertToolbar,
};

```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
