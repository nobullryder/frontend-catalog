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
scroll-fade-effect.tsx
import type { ComponentProps } from "react"

function cn(...c: (string|undefined|null|boolean)[]) { return c.filter(Boolean).join(" ") }

export type ScrollFadeEffectProps = ComponentProps<"div"> & {
  /** Scroll direction. @defaultValue "vertical" */
  orientation?: "horizontal" | "vertical"
}

export function ScrollFadeEffect({
  className,
  orientation = "vertical",
  style,
  ...props
}: ScrollFadeEffectProps) {
  const isH = orientation === "horizontal"
  const mask = isH
    ? "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)"
    : "linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)"
  return (
    <div
      className={cn(isH ? "overflow-x-auto" : "overflow-y-auto", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask, ...style }}
      {...props}
    />
  )
}


code.demo.1773282913237.tsx
import { ScrollFadeEffect } from "@/components/ui/scroll-fade-effect"

const items = Array.from({ length: 20 }, (_, i) => {
  const emojis = ["🎨", "⚡", "🌊", "🔥", "✨", "🎯", "🚀", "💎", "🌙", "🎪"]
  return { id: i, label: `Item ${i + 1}`, emoji: emojis[i % emojis.length]! }
})

export default function Demo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Vertical</p>
          <ScrollFadeEffect className="h-64 w-48 rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-2 p-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollFadeEffect>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Horizontal</p>
          <ScrollFadeEffect orientation="horizontal" className="w-64 rounded-xl border border-border bg-card">
            <div className="flex gap-2 p-3">
              {items.map((item) => (
                <div key={item.id} className="flex shrink-0 flex-col items-center gap-1 rounded-lg bg-muted/50 px-4 py-3 text-sm">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollFadeEffect>
        </div>
      </div>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/scroll-fade-effect.tsx
import type { ComponentProps } from "react"

function cn(...c: (string|undefined|null|boolean)[]) { return c.filter(Boolean).join(" ") }

export type ScrollFadeEffectProps = ComponentProps<"div"> & {
  /** Scroll direction. @defaultValue "vertical" */
  orientation?: "horizontal" | "vertical"
}

export function ScrollFadeEffect({
  className,
  orientation = "vertical",
  style,
  ...props
}: ScrollFadeEffectProps) {
  const isH = orientation === "horizontal"
  const mask = isH
    ? "linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)"
    : "linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)"
  return (
    <div
      className={cn(isH ? "overflow-x-auto" : "overflow-y-auto", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask, ...style }}
      {...props}
    />
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
