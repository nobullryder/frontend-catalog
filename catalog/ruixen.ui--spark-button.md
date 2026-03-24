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
spark-button.tsx
import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface CosmicGlowButtonProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children?: React.ReactNode
}

const CosmicGlowButton = <T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "5s",
  children,
  ...props
}: CosmicGlowButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CosmicGlowButtonProps<T>>) => {
  const Component = as || "button"
  const glowColor = color || "hsl(var(--foreground))"
  const content = children ?? "Click me"

  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center py-4 px-8 rounded-2xl font-semibold text-base cursor-pointer",
        "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
        "text-white shadow-lg shadow-[rgba(0,0,0,0.4)]",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <span
        className="absolute inset-0 rounded-2xl blur-lg opacity-40 animate-glow-scale"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 10%, transparent 60%)`,
          animationDuration: speed,
          zIndex: 0,
        }}
      />
      <span
        className="absolute inset-0 rounded-2xl opacity-20 animate-glow-slide"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0deg, ${glowColor} 120deg, transparent 240deg)`,
          animationDuration: speed,
          zIndex: 0,
        }}
      />
      <span className="relative z-10">{content}</span>
    </Component>
  )
}

export { CosmicGlowButton }


code.demo.1749228021846.tsx
import { CosmicGlowButton } from "@/components/ui/spark-button";

const DemoOne = () => {
  return (
    <>
      <CosmicGlowButton color="hsl(240, 80%, 60%)" speed="7s" className="w-48">
        Click me
      </CosmicGlowButton> 
    </>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spark-button.tsx
import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface CosmicGlowButtonProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children?: React.ReactNode
}

const CosmicGlowButton = <T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "5s",
  children,
  ...props
}: CosmicGlowButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CosmicGlowButtonProps<T>>) => {
  const Component = as || "button"
  const glowColor = color || "hsl(var(--foreground))"
  const content = children ?? "Click me"

  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center py-4 px-8 rounded-2xl font-semibold text-base cursor-pointer",
        "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
        "text-white shadow-lg shadow-[rgba(0,0,0,0.4)]",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <span
        className="absolute inset-0 rounded-2xl blur-lg opacity-40 animate-glow-scale"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 10%, transparent 60%)`,
          animationDuration: speed,
          zIndex: 0,
        }}
      />
      <span
        className="absolute inset-0 rounded-2xl opacity-20 animate-glow-slide"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0deg, ${glowColor} 120deg, transparent 240deg)`,
          animationDuration: speed,
          zIndex: 0,
        }}
      />
      <span className="relative z-10">{content}</span>
    </Component>
  )
}

export { CosmicGlowButton }

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
