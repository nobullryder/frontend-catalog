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
button-group.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-text',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground text-text',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const ButtonGroupContext = React.createContext<{
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  hasDivider?: boolean
  itemClassName?: string
  dividerClassName?: string
  itemCount: number
  itemIndex: number
}>({
  itemCount: 0,
  itemIndex: 0
})

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    hasDivider?: boolean
    itemClassName?: string
    dividerClassName?: string
  }
>(({ 
  children, 
  variant = 'default', 
  size = 'default', 
  hasDivider = true, 
  className,
  itemClassName,
  dividerClassName,
  ...props 
}, ref) => {
  const childrenArray = React.Children.toArray(children)
  const itemCount = childrenArray.length

  let index = 0

  return (
    <div 
      ref={ref}
      className={cn(
        'inline-flex relative items-center',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        return (
          <ButtonGroupContext.Provider
            value={{
              variant,
              size,
              hasDivider,
              itemClassName,
              dividerClassName,
              itemCount,
              itemIndex: index++
            }}
          >
            {child}
          </ButtonGroupContext.Provider>
        )
      })}
    </div>
  )
})

ButtonGroup.displayName = 'ButtonGroup'

const useButtonGroupContext = () => {
  const context = React.useContext(ButtonGroupContext)
  if (!context) {
    throw new Error('ButtonGroupItem must be used within ButtonGroup')
  }
  return context
}

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    roundedRadius?: string
  }
>(({ className, variant, size, children, roundedRadius = '2', ...props }, ref) => {
  const {
    variant: contextVariant,
    size: contextSize,
    hasDivider,
    itemClassName,
    dividerClassName,
    itemCount,
    itemIndex
  } = useButtonGroupContext()

  const positionClassName = 
    itemCount === 1 ? `rounded-${roundedRadius}` :
    itemIndex === 0 ? `rounded-l-${roundedRadius} rounded-r-none` :
    itemIndex === itemCount - 1 ? `rounded-r-${roundedRadius} rounded-l-none` :
    `rounded-none`

  return (
    <React.Fragment>
      <button
        ref={ref}
        className={cn(
          buttonVariants({ 
            variant: variant || contextVariant, 
            size: size || contextSize 
          }),
          positionClassName,
          'relative',
          itemClassName,
          className,
          cn(hasDivider && itemIndex < itemCount - 1 && "border-r-2", dividerClassName),
          cn(hasDivider && itemIndex > 0 && "border-l-0")
        )}
        {...props}
      >
        {children}
      </button>
      
    </React.Fragment>
  )
})

ButtonGroupItem.displayName = 'ButtonGroupItem'

export { ButtonGroup, ButtonGroupItem } 

code.demo.1749456481511.tsx
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Play, ShieldBan, Flame } from "lucide-react"

const DemoOne = () => {
  return (
    <ButtonGroup>
      <ButtonGroupItem variant="default" size="lg">
        <div className="inline-flex items-center justify-center gap-2 h-full">
          <div>Run</div>
          <Play />
        </div>
      </ButtonGroupItem>
      <ButtonGroupItem size="lg">
        <ShieldBan />
        <span>Rules</span>
      </ButtonGroupItem>
      <ButtonGroupItem size="lg" variant="destructive">
        <Flame />
        <span>Reset</span>
      </ButtonGroupItem>
    </ButtonGroup>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-group.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-text',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground text-text',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const ButtonGroupContext = React.createContext<{
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  hasDivider?: boolean
  itemClassName?: string
  dividerClassName?: string
  itemCount: number
  itemIndex: number
}>({
  itemCount: 0,
  itemIndex: 0
})

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    hasDivider?: boolean
    itemClassName?: string
    dividerClassName?: string
  }
>(({ 
  children, 
  variant = 'default', 
  size = 'default', 
  hasDivider = true, 
  className,
  itemClassName,
  dividerClassName,
  ...props 
}, ref) => {
  const childrenArray = React.Children.toArray(children)
  const itemCount = childrenArray.length

  let index = 0

  return (
    <div 
      ref={ref}
      className={cn(
        'inline-flex relative items-center',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        return (
          <ButtonGroupContext.Provider
            value={{
              variant,
              size,
              hasDivider,
              itemClassName,
              dividerClassName,
              itemCount,
              itemIndex: index++
            }}
          >
            {child}
          </ButtonGroupContext.Provider>
        )
      })}
    </div>
  )
})

ButtonGroup.displayName = 'ButtonGroup'

const useButtonGroupContext = () => {
  const context = React.useContext(ButtonGroupContext)
  if (!context) {
    throw new Error('ButtonGroupItem must be used within ButtonGroup')
  }
  return context
}

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    roundedRadius?: string
  }
>(({ className, variant, size, children, roundedRadius = '2', ...props }, ref) => {
  const {
    variant: contextVariant,
    size: contextSize,
    hasDivider,
    itemClassName,
    dividerClassName,
    itemCount,
    itemIndex
  } = useButtonGroupContext()

  const positionClassName = 
    itemCount === 1 ? `rounded-${roundedRadius}` :
    itemIndex === 0 ? `rounded-l-${roundedRadius} rounded-r-none` :
    itemIndex === itemCount - 1 ? `rounded-r-${roundedRadius} rounded-l-none` :
    `rounded-none`

  return (
    <React.Fragment>
      <button
        ref={ref}
        className={cn(
          buttonVariants({ 
            variant: variant || contextVariant, 
            size: size || contextSize 
          }),
          positionClassName,
          'relative',
          itemClassName,
          className,
          cn(hasDivider && itemIndex < itemCount - 1 && "border-r-2", dividerClassName),
          cn(hasDivider && itemIndex > 0 && "border-l-0")
        )}
        {...props}
      >
        {children}
      </button>
      
    </React.Fragment>
  )
})

ButtonGroupItem.displayName = 'ButtonGroupItem'

export { ButtonGroup, ButtonGroupItem } 
```

Install NPM dependencies:
```bash
class-variance-authority
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
