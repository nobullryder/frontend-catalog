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
base-accordion.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Accordion } from '@base-ui-components/react/accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Plus } from 'lucide-react';

// Variants
const accordionRootVariants = cva('', {
  variants: {
    variant: {
      default: '',
      outline: 'space-y-2',
      solid: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b border-border',
      outline: 'border border-border rounded-lg px-4',
      solid: 'rounded-lg bg-accent/70 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionHeaderVariants = cva('flex', {
  variants: {
    variant: {
      default: '',
      outline: '',
      solid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 gap-2.5 text-foreground font-medium transition-all [&[data-panel-open]>svg]:rotate-180 cursor-pointer',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        solid: '',
      },
      indicator: {
        arrow: '',
        plus: '[&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-panel-open]>svg>path:last-child]:rotate-90 [&[data-panel-open]>svg>path:last-child]:opacity-0 [&[data-panel-open]>svg]:rotate-180',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      indicator: 'arrow',
    },
  },
);

const accordionPanelVariants = cva(
  'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-accent-foreground transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        solid: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// Context
type AccordionContextType = {
  variant?: 'default' | 'outline' | 'solid';
  indicator?: 'arrow' | 'plus' | 'none';
};

const AccordionContext = React.createContext<AccordionContextType>({
  variant: 'default',
  indicator: 'arrow',
});

// Base UI Accordion Root
interface AccordionRootProps
  extends React.ComponentProps<typeof Accordion.Root>,
    VariantProps<typeof accordionRootVariants> {
  indicator?: 'arrow' | 'plus' | 'none';
}

function AccordionRoot(props: AccordionRootProps) {
  const { className, variant = 'default', indicator = 'arrow', children, ...rest } = props;

  return (
    <AccordionContext.Provider value={{ variant: variant || 'default', indicator }}>
      <Accordion.Root data-slot="accordion" className={cn(accordionRootVariants({ variant }), className)} {...rest}>
        {children}
      </Accordion.Root>
    </AccordionContext.Provider>
  );
}

// Base UI Accordion Item
function AccordionItem(props: React.ComponentProps<typeof Accordion.Item>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Item data-slot="accordion-item" className={cn(accordionItemVariants({ variant }), className)} {...rest}>
      {children}
    </Accordion.Item>
  );
}

// Base UI Accordion Header
function AccordionHeader(props: React.ComponentProps<typeof Accordion.Header>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Header
      data-slot="accordion-header"
      className={cn(accordionHeaderVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </Accordion.Header>
  );
}

// Base UI Accordion Trigger
function AccordionTrigger(props: React.ComponentProps<typeof Accordion.Trigger>) {
  const { className, children, ...rest } = props;
  const { variant, indicator } = React.useContext(AccordionContext);

  return (
    <Accordion.Trigger
      data-slot="accordion-trigger"
      className={cn(accordionTriggerVariants({ variant, indicator }), className)}
      {...rest}
    >
      {children}
      {indicator === 'plus' && <Plus className="size-4 shrink-0 transition-transform duration-200" strokeWidth={1} />}
      {indicator === 'arrow' && (
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200" strokeWidth={1} />
      )}
    </Accordion.Trigger>
  );
}

// Base UI Accordion Panel
function AccordionPanel(props: React.ComponentProps<typeof Accordion.Panel>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={cn(accordionPanelVariants({ variant }), className)}
      {...rest}
    >
      <div className={cn('pb-5 pt-0')}>{children}</div>
    </Accordion.Panel>
  );
}

// Exports with proper naming to match Base UI pattern
export { AccordionRoot as Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };



code.demo.1758780821537.tsx
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/components/ui/base-accordion';

export default function Component() {
  return (
    <div className="flex w-full h-screen justify-center items-center p-10">
        <Accordion variant="outline" openMultiple={false} className="w-full lg:w-[75%]">
        <AccordionItem value="reui-1">
            <AccordionHeader>
            <AccordionTrigger>What is ReUI?</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>ReUI provides ready-to-use CRUD examples for developers.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="reui-2">
            <AccordionHeader>
            <AccordionTrigger>Who benefits from ReUI?</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>Developers looking to save time with pre-built CRUD solutions.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="reui-3">
            <AccordionHeader>
            <AccordionTrigger>Why choose ReUI?</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>ReUI simplifies development with plug-and-play CRUDs.</AccordionPanel>
        </AccordionItem>
        </Accordion>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/base-accordion.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Accordion } from '@base-ui-components/react/accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Plus } from 'lucide-react';

// Variants
const accordionRootVariants = cva('', {
  variants: {
    variant: {
      default: '',
      outline: 'space-y-2',
      solid: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b border-border',
      outline: 'border border-border rounded-lg px-4',
      solid: 'rounded-lg bg-accent/70 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionHeaderVariants = cva('flex', {
  variants: {
    variant: {
      default: '',
      outline: '',
      solid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 gap-2.5 text-foreground font-medium transition-all [&[data-panel-open]>svg]:rotate-180 cursor-pointer',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        solid: '',
      },
      indicator: {
        arrow: '',
        plus: '[&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-panel-open]>svg>path:last-child]:rotate-90 [&[data-panel-open]>svg>path:last-child]:opacity-0 [&[data-panel-open]>svg]:rotate-180',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      indicator: 'arrow',
    },
  },
);

const accordionPanelVariants = cva(
  'h-[var(--accordion-panel-height)] overflow-hidden text-sm text-accent-foreground transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        solid: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// Context
type AccordionContextType = {
  variant?: 'default' | 'outline' | 'solid';
  indicator?: 'arrow' | 'plus' | 'none';
};

const AccordionContext = React.createContext<AccordionContextType>({
  variant: 'default',
  indicator: 'arrow',
});

// Base UI Accordion Root
interface AccordionRootProps
  extends React.ComponentProps<typeof Accordion.Root>,
    VariantProps<typeof accordionRootVariants> {
  indicator?: 'arrow' | 'plus' | 'none';
}

function AccordionRoot(props: AccordionRootProps) {
  const { className, variant = 'default', indicator = 'arrow', children, ...rest } = props;

  return (
    <AccordionContext.Provider value={{ variant: variant || 'default', indicator }}>
      <Accordion.Root data-slot="accordion" className={cn(accordionRootVariants({ variant }), className)} {...rest}>
        {children}
      </Accordion.Root>
    </AccordionContext.Provider>
  );
}

// Base UI Accordion Item
function AccordionItem(props: React.ComponentProps<typeof Accordion.Item>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Item data-slot="accordion-item" className={cn(accordionItemVariants({ variant }), className)} {...rest}>
      {children}
    </Accordion.Item>
  );
}

// Base UI Accordion Header
function AccordionHeader(props: React.ComponentProps<typeof Accordion.Header>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Header
      data-slot="accordion-header"
      className={cn(accordionHeaderVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </Accordion.Header>
  );
}

// Base UI Accordion Trigger
function AccordionTrigger(props: React.ComponentProps<typeof Accordion.Trigger>) {
  const { className, children, ...rest } = props;
  const { variant, indicator } = React.useContext(AccordionContext);

  return (
    <Accordion.Trigger
      data-slot="accordion-trigger"
      className={cn(accordionTriggerVariants({ variant, indicator }), className)}
      {...rest}
    >
      {children}
      {indicator === 'plus' && <Plus className="size-4 shrink-0 transition-transform duration-200" strokeWidth={1} />}
      {indicator === 'arrow' && (
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200" strokeWidth={1} />
      )}
    </Accordion.Trigger>
  );
}

// Base UI Accordion Panel
function AccordionPanel(props: React.ComponentProps<typeof Accordion.Panel>) {
  const { className, children, ...rest } = props;
  const { variant } = React.useContext(AccordionContext);

  return (
    <Accordion.Panel
      data-slot="accordion-panel"
      className={cn(accordionPanelVariants({ variant }), className)}
      {...rest}
    >
      <div className={cn('pb-5 pt-0')}>{children}</div>
    </Accordion.Panel>
  );
}

// Exports with proper naming to match Base UI pattern
export { AccordionRoot as Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };


```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority, @base-ui-components/react
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
