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
code.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button-1';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Copy } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';

export function useCopyToClipboard() {
  const [copied, setCopied] = React.useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return { copied, copy };
}

export interface CodeProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof codeVariants> {
  asChild?: boolean;
  showCopyButton?: boolean;
  copyText?: string;
}

const codeVariants = cva('relative rounded-md bg-muted font-mono text-sm font-medium', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground',
      destructive: 'bg-destructive/10 text-destructive',
      outline: 'border border-border bg-background text-foreground',
    },
    size: {
      default: 'text-sm px-2.5 py-1.5',
      sm: 'text-xs px-2 py-1.5',
      lg: 'text-base px-3 py-1.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Code({
  className,
  variant,
  size,
  asChild = false,
  showCopyButton = false,
  copyText,
  children,
  ...props
}: CodeProps) {
  const { copy, copied } = useCopyToClipboard();
  const Comp = asChild ? SlotPrimitive.Slot : 'code';
  const textToCopy = copyText || (typeof children === 'string' ? children : '');

  return (
    <span className={cn('inline-flex items-center gap-2', className)} data-slot="code">
      <Comp data-slot="code-panel" className={cn(codeVariants({ variant, size }))} {...props}>
        {children}
      </Comp>
      {showCopyButton && textToCopy && (
        <Button
          mode="icon"
          size="sm"
          variant="ghost"
          className="h-4 w-4 p-0 opacity-60 hover:opacity-100"
          onClick={() => copy(textToCopy)}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      )}
    </span>
  );
}

export { Code, codeVariants };


code.demo.1753163592183.tsx
import { Code } from '@/components/ui/code';

export default function Component() {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <Code size="sm">Small size</Code>
      <Code size="default">Default size</Code>
      <Code size="lg">Large size</Code>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/code.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button-1';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Copy } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';

export function useCopyToClipboard() {
  const [copied, setCopied] = React.useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return { copied, copy };
}

export interface CodeProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof codeVariants> {
  asChild?: boolean;
  showCopyButton?: boolean;
  copyText?: string;
}

const codeVariants = cva('relative rounded-md bg-muted font-mono text-sm font-medium', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground',
      destructive: 'bg-destructive/10 text-destructive',
      outline: 'border border-border bg-background text-foreground',
    },
    size: {
      default: 'text-sm px-2.5 py-1.5',
      sm: 'text-xs px-2 py-1.5',
      lg: 'text-base px-3 py-1.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Code({
  className,
  variant,
  size,
  asChild = false,
  showCopyButton = false,
  copyText,
  children,
  ...props
}: CodeProps) {
  const { copy, copied } = useCopyToClipboard();
  const Comp = asChild ? SlotPrimitive.Slot : 'code';
  const textToCopy = copyText || (typeof children === 'string' ? children : '');

  return (
    <span className={cn('inline-flex items-center gap-2', className)} data-slot="code">
      <Comp data-slot="code-panel" className={cn(codeVariants({ variant, size }))} {...props}>
        {children}
      </Comp>
      {showCopyButton && textToCopy && (
        <Button
          mode="icon"
          size="sm"
          variant="ghost"
          className="h-4 w-4 p-0 opacity-60 hover:opacity-100"
          onClick={() => copy(textToCopy)}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      )}
    </span>
  );
}

export { Code, codeVariants };

```

Install NPM dependencies:
```bash
class-variance-authority, lucide-react, radix-ui
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
