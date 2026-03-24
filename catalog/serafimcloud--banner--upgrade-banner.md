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
banner.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const bannerVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        muted: "dark bg-muted",
        border: "border-b border-border",
      },
      size: {
        sm: "px-4 py-2",
        default: "px-4 py-3",
        lg: "px-4 py-3 md:py-2",
      },
      rounded: {
        none: "",
        default: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "none",
    }
  }
)

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
  isClosable?: boolean
  layout?: "row" | "center" | "complex"
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, size, rounded, icon, action, onClose, isClosable, layout = "row", children, ...props }, ref) => {
    const innerContent = (
      <div className={cn(
        "flex gap-2",
        layout === "center" && "justify-center",
        layout === "complex" && "md:items-center"
      )}>
        {layout === "complex" ? (
          <div className="flex grow gap-3 md:items-center">
            {icon && (
              <div className="flex shrink-0 items-center gap-3 max-md:mt-0.5">
                {icon}
              </div>
            )}
            <div className={cn(
              "flex grow",
              layout === "complex" && "flex-col justify-between gap-3 md:flex-row md:items-center"
            )}>
              {children}
            </div>
          </div>
        ) : (
          <>
            {icon && (
              <div className="flex shrink-0 items-center gap-3">
                {icon}
              </div>
            )}
            <div className="flex grow items-center justify-between gap-3">
              {children}
            </div>
          </>
        )}
        {(action || isClosable) && (
          <div className="flex items-center gap-3">
            {action}
            {isClosable && (
              <Button
                variant="ghost"
                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                onClick={onClose}
                aria-label="Close banner"
              >
                <X
                  size={16}
                  strokeWidth={2}
                  className="opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {innerContent}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner, type BannerProps }

code.demo.tsx
import { Banner } from "@/components/ui/banner"
import { Eclipse } from "lucide-react"

function BannerUpgrade() {
  return (
    <Banner variant="muted" className="dark text-foreground">
      <div className="w-full">
        <p className="flex items-center justify-center text-sm">
          <Eclipse
            className="-mt-0.5 me-3 inline-flex opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Get the most out of your app with real-time updates and analytics{" "}
          <span className="text-muted-foreground">·</span>{" "}
          <a href="#" className="font-medium underline hover:no-underline">
            Upgrade
          </a>
        </p>
      </div>
    </Banner>
  )
}

export { BannerUpgrade }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/banner.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const bannerVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        muted: "dark bg-muted",
        border: "border-b border-border",
      },
      size: {
        sm: "px-4 py-2",
        default: "px-4 py-3",
        lg: "px-4 py-3 md:py-2",
      },
      rounded: {
        none: "",
        default: "rounded-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "none",
    }
  }
)

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
  isClosable?: boolean
  layout?: "row" | "center" | "complex"
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, size, rounded, icon, action, onClose, isClosable, layout = "row", children, ...props }, ref) => {
    const innerContent = (
      <div className={cn(
        "flex gap-2",
        layout === "center" && "justify-center",
        layout === "complex" && "md:items-center"
      )}>
        {layout === "complex" ? (
          <div className="flex grow gap-3 md:items-center">
            {icon && (
              <div className="flex shrink-0 items-center gap-3 max-md:mt-0.5">
                {icon}
              </div>
            )}
            <div className={cn(
              "flex grow",
              layout === "complex" && "flex-col justify-between gap-3 md:flex-row md:items-center"
            )}>
              {children}
            </div>
          </div>
        ) : (
          <>
            {icon && (
              <div className="flex shrink-0 items-center gap-3">
                {icon}
              </div>
            )}
            <div className="flex grow items-center justify-between gap-3">
              {children}
            </div>
          </>
        )}
        {(action || isClosable) && (
          <div className="flex items-center gap-3">
            {action}
            {isClosable && (
              <Button
                variant="ghost"
                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                onClick={onClose}
                aria-label="Close banner"
              >
                <X
                  size={16}
                  strokeWidth={2}
                  className="opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {innerContent}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner, type BannerProps }
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
