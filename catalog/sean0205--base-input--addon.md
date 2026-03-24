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
base-input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input as BaseInput } from '@base-ui-components/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

// Define input size variants
const inputVariants = cva(
  `
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent 
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,
  {
    variants: {
      variant: {
        lg: 'h-10 px-4 text-sm rounded-md file:pe-4 file:me-4',
        md: 'h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3',
        sm: 'h-7 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);

const inputAddonVariants = cva(
  'flex items-center shrink-0 justify-center bg-muted border border-input shadow-xs shadow-[rgba(0,0,0,0.05)] text-secondary-foreground [&_svg]:text-secondary-foreground/60',
  {
    variants: {
      variant: {
        sm: 'rounded-md h-7 min-w-7 text-xs px-2.5 [&_svg:not([class*=size-])]:size-3.5',
        md: 'rounded-md h-8.5 min-w-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4.5',
        lg: 'rounded-md h-10 min-w-10 px-4 text-sm [&_svg:not([class*=size-])]:size-4.5',
      },
      mode: {
        default: '',
        icon: 'px-0 justify-center',
      },
    },
    defaultVariants: {
      variant: 'md',
      mode: 'default',
    },
  },
);

const inputGroupVariants = cva(
  `
    flex items-stretch
    [&_[data-slot=input]]:grow
    [&_[data-slot=input-addon]:has(+[data-slot=input])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=input])]:border-e-0
    [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0 
    [&_[data-slot=input]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=input]+[data-slot=input-addon]]:border-s-0
    [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=button]]:rounded-s-none
    [&_[data-slot=button]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=datefield]]:[&_[data-slot=input]]:rounded-s-none
    [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_[data-slot=input]]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:rounded-e-none
    [&_[data-slot=datefield]]:grow
    [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0
  `,
  {
    variants: {},
    defaultVariants: {},
  },
);

const inputWrapperVariants = cva(
  `
    flex items-center gap-1.5
    has-[:focus-visible]:ring-ring/30 
    has-[:focus-visible]:border-ring
    has-[:focus-visible]:outline-none 
    has-[:focus-visible]:ring-[3px]

    [&_[data-slot=datefield]]:grow 
    [&_[data-slot=input]]:data-focus-within:ring-transparent  
    [&_[data-slot=input]]:data-focus-within:ring-0 
    [&_[data-slot=input]]:data-focus-within:border-0 
    [&_[data-slot=input]]:flex 
    [&_[data-slot=input]]:w-full 
    [&_[data-slot=input]]:outline-none 
    [&_[data-slot=input]]:transition-colors 
    [&_[data-slot=input]]:text-foreground
    [&_[data-slot=input]]:placeholder:text-muted-foreground 
    [&_[data-slot=input]]:border-0 
    [&_[data-slot=input]]:bg-transparent 
    [&_[data-slot=input]]:p-0
    [&_[data-slot=input]]:shadow-none 
    [&_[data-slot=input]]:focus-visible:ring-0 
    [&_[data-slot=input]]:h-auto 
    [&_[data-slot=input]]:disabled:cursor-not-allowed
    [&_[data-slot=input]]:disabled:opacity-50    

    [&_svg]:text-muted-foreground 

    has-[[aria-invalid=true]]:border-destructive/60 
    has-[[aria-invalid=true]]:ring-destructive/10 
    dark:has-[[aria-invalid=true]]:border-destructive 
    dark:has-[[aria-invalid=true]]:ring-destructive/20    
  `,
  {
    variants: {
      variant: {
        sm: 'gap-1.25 [&_svg:not([class*=size-])]:size-3.5',
        md: 'gap-1.5 [&_svg:not([class*=size-])]:size-4',
        lg: 'gap-1.5 [&_svg:not([class*=size-])]:size-4',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<typeof BaseInput> & VariantProps<typeof inputVariants>) {
  return <input data-slot="input" type={type} className={cn(inputVariants({ variant }), className)} {...props} />;
}

function InputAddon({
  className,
  variant,
  mode,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputAddonVariants>) {
  return <div data-slot="input-addon" className={cn(inputAddonVariants({ variant, mode }), className)} {...props} />;
}

function InputGroup({ className, ...props }: React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
  return <div data-slot="input-group" className={cn(inputGroupVariants(), className)} {...props} />;
}

function InputWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputWrapperVariants>) {
  return (
    <div
      data-slot="input-wrapper"
      className={cn(inputVariants({ variant }), inputWrapperVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, InputAddon, InputGroup, InputWrapper, inputVariants, inputAddonVariants };


code.demo.1758883778654.tsx
import { Input, InputAddon, InputGroup } from '@/components/ui/base-input';
import { Euro, TicketPercent } from 'lucide-react';

export default function InputDemo() {
  return (
    <div className="space-y-5 w-80">
      <InputGroup>
        <InputAddon>Addon</InputAddon>
        <Input type="email" placeholder="Start addon" />
      </InputGroup>
      <InputGroup>
        <Input type="email" placeholder="End addon" />
        <InputAddon>Addon</InputAddon>
      </InputGroup>
      <InputGroup>
        <InputAddon mode="icon">
          <Euro />
        </InputAddon>
        <Input type="email" placeholder="Start icon addon" />
      </InputGroup>
      <InputGroup>
        <Input type="email" placeholder="End icon addon" />
        <InputAddon mode="icon">
          <TicketPercent />
        </InputAddon>
      </InputGroup>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/base-input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input as BaseInput } from '@base-ui-components/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

// Define input size variants
const inputVariants = cva(
  `
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent 
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,
  {
    variants: {
      variant: {
        lg: 'h-10 px-4 text-sm rounded-md file:pe-4 file:me-4',
        md: 'h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3',
        sm: 'h-7 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);

const inputAddonVariants = cva(
  'flex items-center shrink-0 justify-center bg-muted border border-input shadow-xs shadow-[rgba(0,0,0,0.05)] text-secondary-foreground [&_svg]:text-secondary-foreground/60',
  {
    variants: {
      variant: {
        sm: 'rounded-md h-7 min-w-7 text-xs px-2.5 [&_svg:not([class*=size-])]:size-3.5',
        md: 'rounded-md h-8.5 min-w-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4.5',
        lg: 'rounded-md h-10 min-w-10 px-4 text-sm [&_svg:not([class*=size-])]:size-4.5',
      },
      mode: {
        default: '',
        icon: 'px-0 justify-center',
      },
    },
    defaultVariants: {
      variant: 'md',
      mode: 'default',
    },
  },
);

const inputGroupVariants = cva(
  `
    flex items-stretch
    [&_[data-slot=input]]:grow
    [&_[data-slot=input-addon]:has(+[data-slot=input])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=input])]:border-e-0
    [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0 
    [&_[data-slot=input]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=input]+[data-slot=input-addon]]:border-s-0
    [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=button]]:rounded-s-none
    [&_[data-slot=button]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=datefield]]:[&_[data-slot=input]]:rounded-s-none
    [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_[data-slot=input]]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:rounded-e-none
    [&_[data-slot=datefield]]:grow
    [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0
  `,
  {
    variants: {},
    defaultVariants: {},
  },
);

const inputWrapperVariants = cva(
  `
    flex items-center gap-1.5
    has-[:focus-visible]:ring-ring/30 
    has-[:focus-visible]:border-ring
    has-[:focus-visible]:outline-none 
    has-[:focus-visible]:ring-[3px]

    [&_[data-slot=datefield]]:grow 
    [&_[data-slot=input]]:data-focus-within:ring-transparent  
    [&_[data-slot=input]]:data-focus-within:ring-0 
    [&_[data-slot=input]]:data-focus-within:border-0 
    [&_[data-slot=input]]:flex 
    [&_[data-slot=input]]:w-full 
    [&_[data-slot=input]]:outline-none 
    [&_[data-slot=input]]:transition-colors 
    [&_[data-slot=input]]:text-foreground
    [&_[data-slot=input]]:placeholder:text-muted-foreground 
    [&_[data-slot=input]]:border-0 
    [&_[data-slot=input]]:bg-transparent 
    [&_[data-slot=input]]:p-0
    [&_[data-slot=input]]:shadow-none 
    [&_[data-slot=input]]:focus-visible:ring-0 
    [&_[data-slot=input]]:h-auto 
    [&_[data-slot=input]]:disabled:cursor-not-allowed
    [&_[data-slot=input]]:disabled:opacity-50    

    [&_svg]:text-muted-foreground 

    has-[[aria-invalid=true]]:border-destructive/60 
    has-[[aria-invalid=true]]:ring-destructive/10 
    dark:has-[[aria-invalid=true]]:border-destructive 
    dark:has-[[aria-invalid=true]]:ring-destructive/20    
  `,
  {
    variants: {
      variant: {
        sm: 'gap-1.25 [&_svg:not([class*=size-])]:size-3.5',
        md: 'gap-1.5 [&_svg:not([class*=size-])]:size-4',
        lg: 'gap-1.5 [&_svg:not([class*=size-])]:size-4',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<typeof BaseInput> & VariantProps<typeof inputVariants>) {
  return <input data-slot="input" type={type} className={cn(inputVariants({ variant }), className)} {...props} />;
}

function InputAddon({
  className,
  variant,
  mode,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputAddonVariants>) {
  return <div data-slot="input-addon" className={cn(inputAddonVariants({ variant, mode }), className)} {...props} />;
}

function InputGroup({ className, ...props }: React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
  return <div data-slot="input-group" className={cn(inputGroupVariants(), className)} {...props} />;
}

function InputWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputWrapperVariants>) {
  return (
    <div
      data-slot="input-wrapper"
      className={cn(inputVariants({ variant }), inputWrapperVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, InputAddon, InputGroup, InputWrapper, inputVariants, inputAddonVariants };

```

Install NPM dependencies:
```bash
class-variance-authority, @base-ui-components/react
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
