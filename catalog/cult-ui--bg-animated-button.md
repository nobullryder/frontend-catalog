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
bg-animated-button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const outerDivVariants = cva("relative inline-block overflow-hidden ", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
    rounded: {
      full: "rounded-full before:rounded-full",
      xl: "rounded-xl before:rounded-xl",
      "2xl": "rounded-2xl before:rounded-2xl",
      "3xl": "rounded-3xl before:rounded-3xl",
      sm: "rounded-sm before:rounded-sm",
      xs: "rounded-xs before:rounded-xs",
      base: "rounded before:rounded",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const innerSpanVariants = cva(
  [
    "absolute inset-[-1000%] m-auto block ",
  ],
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        "spin-fast": "animate-[spin_2s_linear_infinite]",
        "spin-slow": "animate-[spin_8s_linear_infinite]",
        spin: "animate-[spin_4s_linear_infinite]",
      },
      gradient: {
        sunrise: "text-black font-bold",
        ocean:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#a1c4fd_0%,#c2e9fb_50%,#a1c4fd_100%)] ",
        candy:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#fad0c4_90%,#ff9a9e_100%)] ",
        forest:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#85d797_0%,#1a806b_50%,#85d797_100%)] ",
        sunset:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#fe5d75_0%,#f5af19_50%,#fe5d75_100%)] ",
        nebula:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#A77BFE_0%,#8860D0_50%,#A77BFE_100%)] ",
        default:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] ",
      },
    },
    compoundVariants: [
      {
        animation: "spin",
        gradient: "sunrise",
        className: "duration-4s ease-linear",
      },
    ],
    defaultVariants: {
      animation: "spin",
      gradient: "forest",
    },
  }
)

const buttonVariants = cva(
  "relative px-6 py-2 transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 text-sm overflow-hidden",
  {
    variants: {
      size: {
        sm: "text-xs px-4 py-1",
        default: "text-sm px-6 py-2",
        lg: "text-base px-8 py-3",
      },
      shadow: {
        flat: "",
        soft: "shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.3)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.5)]",
        base: "shadow-[0_3px_5px_rgba(0,0,0,0.2),inset_0_0.5px_1px_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4)] dark:shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_0.5px_1px_rgba(0,0,0,0.2),inset_0_-2px_3px_rgba(0,0,0,0.6)]",
        deep: "shadow-[0_4px_6px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.7)]",
        deeper:
          "shadow-[0_6px_8px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.6)] dark:shadow-[0_6px_8px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(0,0,0,0.35),inset_0_-3px_6px_rgba(0,0,0,0.8)]",
      },
      gradient: {
        sunrise: "text-black font-bold",
        ocean: "text-black font-bold",
        candy: "text-black font-bold",
        forest: "text-black font-bold",
        sunset: "text-black font-bold",
        nebula: "text-white font-bold",
        default: "text-white font-bold",
      },
      rounded: {
        full: "rounded-full before:rounded-full",
        xl: "rounded-xl before:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl",
        "3xl": "rounded-3xl before:rounded-3xl",
        sm: "rounded-sm before:rounded-sm",
        xs: "rounded-xs before:rounded-xs",
        base: "rounded before:rounded",
      },
    },
    defaultVariants: {
      size: "default",
      shadow: "base",
      rounded: "xl",
    },
  }
)

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "secondary" | "destructive" | "ghost"
  size?: "sm" | "lg" | "default"
  shadow?: "flat" | "soft" | "base" | "deep" | "deeper"
  rounded?: "full" | "xl" | "2xl" | "3xl" | "sm" | "xs" | "base"
  asChild?: boolean
  showBackground?: boolean
  animation?: "spin" | "pulse" | "spin-slow" | "spin-fast"
  gradient?:
    | "sunrise"
    | "ocean"
    | "candy"
    | "default"
    | "forest"
    | "sunset"
    | "nebula"
}

const Component = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      showBackground = false,
      rounded = "full",
      shadow = "soft",
      gradient = null,
      animation = null,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(outerDivVariants({ size, rounded }), className)}
        ref={ref}
        {...props}
      >
        {gradient && (
          <span className={cn(innerSpanVariants({ gradient, animation }))} />
        )}

        <div
          className={cn(buttonVariants({ shadow, rounded, size, gradient }))}
        >
          {props.children || "Button"}
        </div>
      </Comp>
    )
  }
)

Component.displayName = "Component"

export { Component }

code.demo.1750442155630.tsx
import { Component } from "@/components/ui/bg-animated-button"

type Gradients =
  | "sunrise"
  | "ocean"
  | "candy"
  | "default"
  | "forest"
  | "sunset"
  | "nebula"

type Radius = "full" | "xl" | "2xl" | "3xl" | "sm"
type Animations = "spin" | "pulse" | "spin-slow" | "spin-fast"

const gradients: Gradients[] = [
  "sunrise",
  "ocean",
  "candy",
  "forest",
  "sunset",
  "default",
  "nebula",
]
const roundings: Radius[] = ["full", "xl", "2xl", "3xl", "sm"]
const animations: Animations[] = ["spin", "pulse", "spin-slow", "spin-fast"]

const BgAnimateButtonsDemo = () => {
  return (
    <div className="w-full max-w-4xl">
      <div className=" sm:px-12 md:px-24 flex flex-col justify-center  rounded-lg space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(0, 2).map((rounding, i) => (
            <Component
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </Component>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {roundings.slice(2, 5).map((rounding, i) => (
            <Component
              gradient={gradients[i + 1]}
              key={rounding}
              rounded={rounding}
            >
              {rounding}
            </Component>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {animations.map((animationType, i) => (
            <Component
              key={animationType}
              gradient={gradients[i + 2]}
              variant="ghost"
              animation={animationType}
            >
              {animationType}
            </Component>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BgAnimateButtonsDemo
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bg-animated-button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const outerDivVariants = cva("relative inline-block overflow-hidden ", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
    rounded: {
      full: "rounded-full before:rounded-full",
      xl: "rounded-xl before:rounded-xl",
      "2xl": "rounded-2xl before:rounded-2xl",
      "3xl": "rounded-3xl before:rounded-3xl",
      sm: "rounded-sm before:rounded-sm",
      xs: "rounded-xs before:rounded-xs",
      base: "rounded before:rounded",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const innerSpanVariants = cva(
  [
    "absolute inset-[-1000%] m-auto block ",
  ],
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        "spin-fast": "animate-[spin_2s_linear_infinite]",
        "spin-slow": "animate-[spin_8s_linear_infinite]",
        spin: "animate-[spin_4s_linear_infinite]",
      },
      gradient: {
        sunrise: "text-black font-bold",
        ocean:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#a1c4fd_0%,#c2e9fb_50%,#a1c4fd_100%)] ",
        candy:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#fad0c4_90%,#ff9a9e_100%)] ",
        forest:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#85d797_0%,#1a806b_50%,#85d797_100%)] ",
        sunset:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#fe5d75_0%,#f5af19_50%,#fe5d75_100%)] ",
        nebula:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#A77BFE_0%,#8860D0_50%,#A77BFE_100%)] ",
        default:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] ",
      },
    },
    compoundVariants: [
      {
        animation: "spin",
        gradient: "sunrise",
        className: "duration-4s ease-linear",
      },
    ],
    defaultVariants: {
      animation: "spin",
      gradient: "forest",
    },
  }
)

const buttonVariants = cva(
  "relative px-6 py-2 transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 text-sm overflow-hidden",
  {
    variants: {
      size: {
        sm: "text-xs px-4 py-1",
        default: "text-sm px-6 py-2",
        lg: "text-base px-8 py-3",
      },
      shadow: {
        flat: "",
        soft: "shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.3)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.5)]",
        base: "shadow-[0_3px_5px_rgba(0,0,0,0.2),inset_0_0.5px_1px_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4)] dark:shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_0.5px_1px_rgba(0,0,0,0.2),inset_0_-2px_3px_rgba(0,0,0,0.6)]",
        deep: "shadow-[0_4px_6px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.7)]",
        deeper:
          "shadow-[0_6px_8px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.6)] dark:shadow-[0_6px_8px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(0,0,0,0.35),inset_0_-3px_6px_rgba(0,0,0,0.8)]",
      },
      gradient: {
        sunrise: "text-black font-bold",
        ocean: "text-black font-bold",
        candy: "text-black font-bold",
        forest: "text-black font-bold",
        sunset: "text-black font-bold",
        nebula: "text-white font-bold",
        default: "text-white font-bold",
      },
      rounded: {
        full: "rounded-full before:rounded-full",
        xl: "rounded-xl before:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl",
        "3xl": "rounded-3xl before:rounded-3xl",
        sm: "rounded-sm before:rounded-sm",
        xs: "rounded-xs before:rounded-xs",
        base: "rounded before:rounded",
      },
    },
    defaultVariants: {
      size: "default",
      shadow: "base",
      rounded: "xl",
    },
  }
)

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "secondary" | "destructive" | "ghost"
  size?: "sm" | "lg" | "default"
  shadow?: "flat" | "soft" | "base" | "deep" | "deeper"
  rounded?: "full" | "xl" | "2xl" | "3xl" | "sm" | "xs" | "base"
  asChild?: boolean
  showBackground?: boolean
  animation?: "spin" | "pulse" | "spin-slow" | "spin-fast"
  gradient?:
    | "sunrise"
    | "ocean"
    | "candy"
    | "default"
    | "forest"
    | "sunset"
    | "nebula"
}

const Component = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      showBackground = false,
      rounded = "full",
      shadow = "soft",
      gradient = null,
      animation = null,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(outerDivVariants({ size, rounded }), className)}
        ref={ref}
        {...props}
      >
        {gradient && (
          <span className={cn(innerSpanVariants({ gradient, animation }))} />
        )}

        <div
          className={cn(buttonVariants({ shadow, rounded, size, gradient }))}
        >
          {props.children || "Button"}
        </div>
      </Comp>
    )
  }
)

Component.displayName = "Component"

export { Component }
```

Install NPM dependencies:
```bash
@radix-ui/react-slot, class-variance-authority
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
