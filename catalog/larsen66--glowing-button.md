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
glowing-button.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function hexToRgba(hex: string, alpha: number = 1): string {
  let hexValue = hex.replace("#", "")

  if (hexValue.length === 3) {
    hexValue = hexValue
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error("Invalid hex color:", hex)
    return "rgba(0, 0, 0, 1)"
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function GlowingButton({
  children,
  className,
  glowColor = "#a3e635",
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  const glowColorRgba = hexToRgba(glowColor)
  const glowColorVia = hexToRgba(glowColor, 0.075)
  const glowColorTo = hexToRgba(glowColor, 0.2)

  return (
    <Button
      style={
        {
          "--glow-color": glowColorRgba,
          "--glow-color-via": glowColorVia,
          "--glow-color-to": glowColorTo,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-10 w-min items-center justify-center overflow-hidden rounded-md border border-r-0 bg-gradient-to-t !px-5 text-sm transition-colors duration-200",
        "border-zinc-100 from-white to-neutral-100 text-black hover:text-black/80 dark:border-zinc-800 dark:from-zinc-900 dark:to-neutral-800 dark:text-white dark:hover:text-white/80",
        "z-20 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:from-40% after:via-[var(--glow-color-via)] after:via-70% after:to-[var(--glow-color-to)] after:shadow-[rgba(255,_255,_255,_0.15)_0px_1px_0px_inset]",
        "z-10 before:absolute before:right-0 before:h-[60%] before:w-[5px] before:rounded-l before:bg-[var(--glow-color)] before:shadow-[-2px_0_10px_var(--glow-color)] before:transition-all before:duration-200 hover:before:translate-x-full",
        className
      )}
    >
      {children}
    </Button>
  )
}


code.demo.1754503812541.tsx
import { GlowingButton } from "@/components/ui/glowing-button"

export default function GlowingButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <GlowingButton>Hover me</GlowingButton>
      <GlowingButton glowColor="#ec4899">Hover Me</GlowingButton>
      <GlowingButton glowColor="#22d3ee">Hover Me</GlowingButton>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/glowing-button.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function hexToRgba(hex: string, alpha: number = 1): string {
  let hexValue = hex.replace("#", "")

  if (hexValue.length === 3) {
    hexValue = hexValue
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error("Invalid hex color:", hex)
    return "rgba(0, 0, 0, 1)"
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function GlowingButton({
  children,
  className,
  glowColor = "#a3e635",
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  const glowColorRgba = hexToRgba(glowColor)
  const glowColorVia = hexToRgba(glowColor, 0.075)
  const glowColorTo = hexToRgba(glowColor, 0.2)

  return (
    <Button
      style={
        {
          "--glow-color": glowColorRgba,
          "--glow-color-via": glowColorVia,
          "--glow-color-to": glowColorTo,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-10 w-min items-center justify-center overflow-hidden rounded-md border border-r-0 bg-gradient-to-t !px-5 text-sm transition-colors duration-200",
        "border-zinc-100 from-white to-neutral-100 text-black hover:text-black/80 dark:border-zinc-800 dark:from-zinc-900 dark:to-neutral-800 dark:text-white dark:hover:text-white/80",
        "z-20 after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:from-40% after:via-[var(--glow-color-via)] after:via-70% after:to-[var(--glow-color-to)] after:shadow-[rgba(255,_255,_255,_0.15)_0px_1px_0px_inset]",
        "z-10 before:absolute before:right-0 before:h-[60%] before:w-[5px] before:rounded-l before:bg-[var(--glow-color)] before:shadow-[-2px_0_10px_var(--glow-color)] before:transition-all before:duration-200 hover:before:translate-x-full",
        className
      )}
    >
      {children}
    </Button>
  )
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
