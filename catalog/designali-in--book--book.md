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
book.tsx

import { cn } from '@/lib/utils';
import React from 'react';

interface BookProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  texture?: boolean;
  depth?: number;
  variant?: 'default' | 'simple';
  illustration?: React.ReactNode;
  width?: number;
}

export function Book(props: BookProps) {
  const {
    children,
    color = '#f50537',
    depth,
    texture,
    variant = 'default',
    textColor,
    illustration,
    width,
  } = props;
  return (
    <div
      className={cn('w-fit [perspective:900px] inline-block group')}
      style={
        {
          '--book-color': color,
          '--text-color': textColor,
          '--book-depth': (depth || 4) + 'cqw',
          '--book-width': (width || 196) + 'px',
        } as React.CSSProperties
      }
    >
      <div className="contain-inline-size aspect-[49/60] w-fit rotate-0 relative [transform-style:preserve-3d] min-w-[calc(var(--book-width))] transition-transform duration-500 ease-out group-hover:[transform:rotateY(-20deg)_scale(1.066)translateX(-8px)]">
        <Stack
          align="stretch"
          className="rounded-l border border-border rounded-r shadow-book  bg-stone-100 dark:bg-stone-800 bg-[var(--book-color)] size-full absolute overflow-hidden"
        >
          {variant !== 'simple' && (
            <Stack
              shrink
              grow
              direction="row"
              className={cn(
                'min-w-[calc(var(--book-width))] bg-[var(--book-color)] relative overflow-hidden',
              )}
            >
              <div className="absolute inset-y-0 mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg" />
              {illustration && (
                <div className="object-cover">{illustration}</div>
              )}
            </Stack>
          )}
          <Stack grow={variant === 'simple'} direction="row" className="h-fit">
            <div className="mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg h-full" />
            <div className="contain-inline-size w-full">{children}</div>
          </Stack>
          {texture && (
            <div
              aria-hidden={true}
              className="absolute bg-ali bg-no-repeat bg-cover inset-0 mix-blend-hard-light opacity-60"
            />
          )}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute bg-book-pages w-[calc(var(--book-depth)-2px)] h-[calc(100%-2*6px)] top-[3px]"
          style={{
            transform:
              'translateX(calc(var(--book-width) - var(--book-depth) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))',
          }}
        />
        <div
          aria-hidden={true}
          className="rounded-l-md rounded-r bg-[var(--book-color)] book-bg absolute left-0 w-full h-full"
          style={{
            transform: 'translateZ(calc(-1 * var(--book-depth)))',
          }}
        />
      </div>
    </div>
  );
}

 
import { ComponentProps } from 'react';

type FlexAlignItems = 'stretch' | 'start' | 'end' | 'center';
type FlexJustifyContent =
  | 'stretch'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'center';

interface StackProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  direction?: 'column' | 'row';
  align?: FlexAlignItems;
  justify?: FlexJustifyContent;
  gap?: number;
  padding?: number;
  grow?: boolean;
  shrink?: boolean;
  wrap?: boolean;
  className?: string;
}

function Stack(props: StackProps) {
  const {
    children,
    shrink = false,
    grow = false,
    justify = 'start',
    align = 'start',
    wrap = false,
    padding = 0,
    gap = 0,
    direction = 'column',
    className,
    ...etc
  } = props;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flex: 'initial',
        flexDirection: direction,
        alignItems:
          align === 'start'
            ? 'flex-start'
            : align === 'end'
              ? 'flex-end'
              : align,
        justifyContent:
          justify === 'start'
            ? 'flex-start'
            : justify === 'end'
              ? 'flex-end'
              : justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        padding: padding * 4 + 'px',
        gap: gap * 4 + 'px',
      }}
      {...etc}
    >
      {children}
    </div>
  );
}

export { Book, Stack }

code.demo.tsx
import { Book } from "@/components/ui/book";
import { DIcons } from "dicons";

export function Book01() {
  return (
    <main className="flex items-center gap-6">
      <Book depth={10}>
        <div className="p-3 mb-2 grid gap-3">
          <h1 className="font-semibold">
            Your complete platform for the Design.
          </h1>
          <DIcons.Designali className="w-4 h-4" />
        </div>
      </Book>
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/book.tsx

import { cn } from '@/lib/utils';
import React from 'react';

interface BookProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  texture?: boolean;
  depth?: number;
  variant?: 'default' | 'simple';
  illustration?: React.ReactNode;
  width?: number;
}

export function Book(props: BookProps) {
  const {
    children,
    color = '#f50537',
    depth,
    texture,
    variant = 'default',
    textColor,
    illustration,
    width,
  } = props;
  return (
    <div
      className={cn('w-fit [perspective:900px] inline-block group')}
      style={
        {
          '--book-color': color,
          '--text-color': textColor,
          '--book-depth': (depth || 4) + 'cqw',
          '--book-width': (width || 196) + 'px',
        } as React.CSSProperties
      }
    >
      <div className="contain-inline-size aspect-[49/60] w-fit rotate-0 relative [transform-style:preserve-3d] min-w-[calc(var(--book-width))] transition-transform duration-500 ease-out group-hover:[transform:rotateY(-20deg)_scale(1.066)translateX(-8px)]">
        <Stack
          align="stretch"
          className="rounded-l border border-border rounded-r shadow-book  bg-stone-100 dark:bg-stone-800 bg-[var(--book-color)] size-full absolute overflow-hidden"
        >
          {variant !== 'simple' && (
            <Stack
              shrink
              grow
              direction="row"
              className={cn(
                'min-w-[calc(var(--book-width))] bg-[var(--book-color)] relative overflow-hidden',
              )}
            >
              <div className="absolute inset-y-0 mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg" />
              {illustration && (
                <div className="object-cover">{illustration}</div>
              )}
            </Stack>
          )}
          <Stack grow={variant === 'simple'} direction="row" className="h-fit">
            <div className="mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg h-full" />
            <div className="contain-inline-size w-full">{children}</div>
          </Stack>
          {texture && (
            <div
              aria-hidden={true}
              className="absolute bg-ali bg-no-repeat bg-cover inset-0 mix-blend-hard-light opacity-60"
            />
          )}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute bg-book-pages w-[calc(var(--book-depth)-2px)] h-[calc(100%-2*6px)] top-[3px]"
          style={{
            transform:
              'translateX(calc(var(--book-width) - var(--book-depth) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))',
          }}
        />
        <div
          aria-hidden={true}
          className="rounded-l-md rounded-r bg-[var(--book-color)] book-bg absolute left-0 w-full h-full"
          style={{
            transform: 'translateZ(calc(-1 * var(--book-depth)))',
          }}
        />
      </div>
    </div>
  );
}

 
import { ComponentProps } from 'react';

type FlexAlignItems = 'stretch' | 'start' | 'end' | 'center';
type FlexJustifyContent =
  | 'stretch'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'center';

interface StackProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  direction?: 'column' | 'row';
  align?: FlexAlignItems;
  justify?: FlexJustifyContent;
  gap?: number;
  padding?: number;
  grow?: boolean;
  shrink?: boolean;
  wrap?: boolean;
  className?: string;
}

function Stack(props: StackProps) {
  const {
    children,
    shrink = false,
    grow = false,
    justify = 'start',
    align = 'start',
    wrap = false,
    padding = 0,
    gap = 0,
    direction = 'column',
    className,
    ...etc
  } = props;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flex: 'initial',
        flexDirection: direction,
        alignItems:
          align === 'start'
            ? 'flex-start'
            : align === 'end'
              ? 'flex-end'
              : align,
        justifyContent:
          justify === 'start'
            ? 'flex-start'
            : justify === 'end'
              ? 'flex-end'
              : justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        padding: padding * 4 + 'px',
        gap: gap * 4 + 'px',
      }}
      {...etc}
    >
      {children}
    </div>
  );
}

export { Book, Stack }
```
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

Install NPM dependencies:
```bash
@radix-ui/react-slot, class-variance-authority
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "keyframes": {
        "accordion-down": {
          "from": {
            "height": "0"
          },
          "to": {
            "height": "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          "from": {
            "height": "var(--radix-accordion-content-height)"
          },
          "to": {
            "height": "0"
          }
        }
      },
      "backgroundImage": {
        "gradient-button": "linear-gradient(-90deg,#007cf0,#00dfd8,#ff0080,#007cf0)",
        "trial": "linear-gradient(135deg,#0070f3,#f81ce5)",
        "book-bind-bg": "linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0) 12%,hsla(0,0%,100%,.25) 29.25%,hsla(0,0%,100%,0) 50.5%,hsla(0,0%,100%,0) 75.25%,hsla(0,0%,100%,.25) 91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,.03),rgba(0,0,0,.1) 12%,transparent 30%,rgba(0,0,0,.02) 50%,rgba(0,0,0,.2) 73.5%,rgba(0,0,0,.5) 75.25%,rgba(0,0,0,.15) 85.25%,transparent)",
        "book-pages": "repeating-linear-gradient(90deg,#fff,#efefef 1px,#fff 3px,#9a9a9a 0)"
      },
      "boxShadow": {
        "book": "0 1.8px 3.6px rgba(0,0,0,.05),0 10.8px 21.6px rgba(0,0,0,.08),inset 0 -.9px 0 rgba(0,0,0,.1),inset 0 1.8px 1.8px hsla(0,0%,100%,.1),inset 3.6px 0 3.6px rgba(0,0,0,.1)"
      },
      "borderRadius": {
        "lg": "var(--radius)",
        "md": "calc(var(--radius) - 2px)",
        "sm": "calc(var(--radius) - 4px)"
      },
      "animation": {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  }
}
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
