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
skills-showcase.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const skills = [
  { name: "Design", level: 95 },
  { name: "Development", level: 90 },
  { name: "Branding", level: 85 },
  { name: "Motion", level: 78 },
  { name: "Strategy", level: 82 },
]

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col w-full max-w-md">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-12 bg-foreground/20 dark:bg-foreground/10" />
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">Expertise</span>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "relative flex items-center justify-between py-5 px-4 -mx-4 cursor-pointer",
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "rounded-lg",
                hoveredIndex === index ? "bg-foreground/[0.03] dark:bg-foreground/[0.05]" : "bg-transparent",
              )}
            >
              {/* Left side - skill name with animated elements */}
              <div className="relative flex items-center gap-4">
                <div
                  className={cn(
                    "h-5 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index ? "bg-accent scale-y-100 opacity-100" : "bg-border scale-y-50 opacity-0",
                  )}
                />

                {/* Skill name */}
                <span
                  className={cn(
                    "text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index ? "text-foreground translate-x-0" : "text-muted-foreground -translate-x-5",
                  )}
                >
                  {skill.name}
                </span>
              </div>

              {/* Right side - progress visualization */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-1 rounded-full overflow-hidden bg-border/50 dark:bg-border/30">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />

                  {/* Animated fill */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "bg-gradient-to-r from-accent/80 to-accent",
                    )}
                    style={{
                      width: hoveredIndex === index ? `${skill.level}%` : "0%",
                      transitionDelay: hoveredIndex === index ? "100ms" : "0ms",
                    }}
                  />

                  {/* Shine effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                      "transition-transform duration-700 ease-out",
                      hoveredIndex === index ? "translate-x-full" : "-translate-x-full",
                    )}
                    style={{
                      transitionDelay: hoveredIndex === index ? "300ms" : "0ms",
                    }}
                  />
                </div>

                <div className="relative w-10 overflow-hidden">
                  <span
                    className={cn(
                      "block text-sm font-mono tabular-nums text-right",
                      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === index
                        ? "text-foreground opacity-100 translate-y-0 blur-0"
                        : "text-muted-foreground/40 opacity-0 translate-y-3 blur-sm",
                    )}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>

            {index < skills.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-px transition-all duration-500",
                  hoveredIndex === index || hoveredIndex === index + 1
                    ? "bg-transparent"
                    : "bg-border/30 dark:bg-border/20",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border/30 dark:border-border/20">
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
        <p className="text-[11px] text-muted-foreground tracking-wide">Hover to explore</p>
      </div>
    </div>
  )
}


code.demo.1765261140643.tsx


import { Skills } from "@/components/ui/skills-showcase"

export default function Page() {

  return (
    <main className="min-h-screen transition-colors duration-500 w-full">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 w-full">
        <Skills />
      </div>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/skills-showcase.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const skills = [
  { name: "Design", level: 95 },
  { name: "Development", level: 90 },
  { name: "Branding", level: 85 },
  { name: "Motion", level: 78 },
  { name: "Strategy", level: 82 },
]

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col w-full max-w-md">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-12 bg-foreground/20 dark:bg-foreground/10" />
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">Expertise</span>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "relative flex items-center justify-between py-5 px-4 -mx-4 cursor-pointer",
                "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "rounded-lg",
                hoveredIndex === index ? "bg-foreground/[0.03] dark:bg-foreground/[0.05]" : "bg-transparent",
              )}
            >
              {/* Left side - skill name with animated elements */}
              <div className="relative flex items-center gap-4">
                <div
                  className={cn(
                    "h-5 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index ? "bg-accent scale-y-100 opacity-100" : "bg-border scale-y-50 opacity-0",
                  )}
                />

                {/* Skill name */}
                <span
                  className={cn(
                    "text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    hoveredIndex === index ? "text-foreground translate-x-0" : "text-muted-foreground -translate-x-5",
                  )}
                >
                  {skill.name}
                </span>
              </div>

              {/* Right side - progress visualization */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-1 rounded-full overflow-hidden bg-border/50 dark:bg-border/30">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />

                  {/* Animated fill */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "bg-gradient-to-r from-accent/80 to-accent",
                    )}
                    style={{
                      width: hoveredIndex === index ? `${skill.level}%` : "0%",
                      transitionDelay: hoveredIndex === index ? "100ms" : "0ms",
                    }}
                  />

                  {/* Shine effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                      "transition-transform duration-700 ease-out",
                      hoveredIndex === index ? "translate-x-full" : "-translate-x-full",
                    )}
                    style={{
                      transitionDelay: hoveredIndex === index ? "300ms" : "0ms",
                    }}
                  />
                </div>

                <div className="relative w-10 overflow-hidden">
                  <span
                    className={cn(
                      "block text-sm font-mono tabular-nums text-right",
                      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      hoveredIndex === index
                        ? "text-foreground opacity-100 translate-y-0 blur-0"
                        : "text-muted-foreground/40 opacity-0 translate-y-3 blur-sm",
                    )}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>

            {index < skills.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-px transition-all duration-500",
                  hoveredIndex === index || hoveredIndex === index + 1
                    ? "bg-transparent"
                    : "bg-border/30 dark:bg-border/20",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border/30 dark:border-border/20">
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
        <p className="text-[11px] text-muted-foreground tracking-wide">Hover to explore</p>
      </div>
    </div>
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
