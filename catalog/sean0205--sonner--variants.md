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
sonner.tsx
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="group toaster [&_[data-type=success]>[data-icon]]:text-success [&_[data-type=success]_[data-title]]:text-success [&_[data-type=info]_[data-title]]:text-info [&_[data-type=error]>[data-icon]]:text-destructive [&_[data-type=error]_[data-title]]:text-destructive"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground! group-[.toaster]:border-border group-[.toaster]:shadow-lg has-[[role=alert]]:border-0! has-[[role=alert]]:shadow-none! has-[[role=alert]]:bg-transparent!',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:rounded-md! group-[.toast]:bg-primary group-[.toast]:text-primary-foreground!',
          cancelButton:
            'group-[.toast]:rounded-md! group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };


code.demo.1752689348770.tsx
'use client';

import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert-1';
import { Button } from '@/components/ui/button-1';
import { RiCheckboxCircleFill, RiErrorWarningFill, RiSpam3Fill } from '@remixicon/react';
import { toast } from 'sonner';

export default function SonnerDemo() {
  return (
    <div className="flex gap-6">
      <Button
        variant="outline"
        className="text-green-500"
        size="sm"
        onClick={() =>
          toast.custom(
            (t) => (
              <Alert variant="mono" icon="success" onClose={() => toast.dismiss(t)}>
                <AlertIcon>
                  <RiCheckboxCircleFill />
                </AlertIcon>
                <AlertTitle>This is a success toast</AlertTitle>
              </Alert>
            ),
            {
              duration: 5000,
            },
          )
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        className="text-violet-500"
        size="sm"
        onClick={() =>
          toast.custom(
            (t) => (
              <Alert variant="mono" icon="info" onClose={() => toast.dismiss(t)}>
                <AlertIcon>
                  <RiCheckboxCircleFill />
                </AlertIcon>
                <AlertTitle>This is an info toast</AlertTitle>
              </Alert>
            ),
            {
              duration: 5000,
            },
          )
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        className="text-yellow-500"
        size="sm"
        onClick={() =>
          toast.custom(
            (t) => (
              <Alert variant="mono" icon="warning" onClose={() => toast.dismiss(t)}>
                <AlertIcon>
                  <RiSpam3Fill />
                </AlertIcon>
                <AlertTitle>This is a warning toast</AlertTitle>
              </Alert>
            ),
            {
              duration: 5000,
            },
          )
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        className="text-destructive"
        size="sm"
        onClick={() =>
          toast.custom(
            (t) => (
              <Alert variant="mono" icon="destructive" onClose={() => toast.dismiss(t)}>
                <AlertIcon>
                  <RiErrorWarningFill />
                </AlertIcon>
                <AlertTitle>This is a destructive toast</AlertTitle>
              </Alert>
            ),
            {
              duration: 5000,
            },
          )
        }
      >
        Destructive
      </Button>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sonner.tsx
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="group toaster [&_[data-type=success]>[data-icon]]:text-success [&_[data-type=success]_[data-title]]:text-success [&_[data-type=info]_[data-title]]:text-info [&_[data-type=error]>[data-icon]]:text-destructive [&_[data-type=error]_[data-title]]:text-destructive"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground! group-[.toaster]:border-border group-[.toaster]:shadow-lg has-[[role=alert]]:border-0! has-[[role=alert]]:shadow-none! has-[[role=alert]]:bg-transparent!',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:rounded-md! group-[.toast]:bg-primary group-[.toast]:text-primary-foreground!',
          cancelButton:
            'group-[.toast]:rounded-md! group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

```

Install NPM dependencies:
```bash
next-themes, sonner
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
