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
reaction-chip.tsx
"use client"

import { useMemo, useState } from "react"

type MessageWithReactionsProps = {
  text: string
  reactionOptions?: string[]
}

export function MessageWithReactions({ text, reactionOptions = ["👍", "❤️", "😂", "🎉"] }: MessageWithReactionsProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [bump, setBump] = useState(false)

  function handleSelect(emoji: string) {
    // Toggle off if clicking the same emoji again
    setSelectedReaction((prev) => {
      const next = prev === emoji ? null : emoji
      // trigger bump when adding or changing to a different emoji
      if (next) {
        setBump(true)
        setTimeout(() => setBump(false), 180)
      }
      return next
    })
  }

  // Only one active reaction max
  const activeReactions = useMemo(() => {
    return selectedReaction ? ([[selectedReaction, 1]] as const) : []
  }, [selectedReaction])

  return (
    <div className="flex w-full justify-center p-6">
      <div
        className={[
          "group relative inline-block max-w-sm",
          "rounded-lg border border-border bg-card px-3 py-2",
          "text-sm text-foreground shadow-sm",
        ].join(" ")}
      >
        <p className="text-pretty">{text}</p>

        {/* Reactions row */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-live="polite" aria-atomic="false">
          {activeReactions.map(([emoji, count]) => (
            <span
              key={emoji}
              className={[
                "inline-flex items-center gap-1 rounded-full",
                "bg-muted px-2 py-0.5 text-xs text-foreground/80 ring-1 ring-border",
                "transition-transform duration-200 ease-out",
                bump ? "scale-110" : "scale-100",
              ].join(" ")}
              aria-label={`${emoji} ${count}`}
              title={`${emoji} ${count}`}
            >
              <span aria-hidden="true">{emoji}</span>
              <span className="tabular-nums">{count}</span>
            </span>
          ))}
        </div>

        {/* Hover reaction chip (appears on hover/focus) */}
        <div
          className={[
            "pointer-events-none absolute -top-3 right-0 z-10",
            "translate-y-1 opacity-0",
            "transition-all duration-200 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto",
            "focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto",
          ].join(" ")}
        >
          <ReactionChip onSelect={handleSelect} emojis={reactionOptions} selected={selectedReaction ?? undefined} />
        </div>
      </div>
    </div>
  )
}

type ReactionChipProps = {
  onSelect: (emoji: string) => void
  className?: string
  emojis?: string[]
  selected?: string // indicates the currently selected reaction
}

function ReactionChip({
  onSelect,
  className = "",
  emojis = ["👍", "❤️", "😂", "🎉"],
  selected,
}: ReactionChipProps) {
  return (
    <div
      className={[
        "pointer-events-auto flex items-center gap-1 rounded-full",
        "bg-card/90 px-2 py-1 shadow-sm ring-1 ring-border backdrop-blur",
        "transition-shadow",
        className,
      ].join(" ")}
      role="group"
      aria-label="Add reaction"
    >
      {emojis.map((em) => {
        const isActive = selected === em
        return (
          <button
            key={em}
            type="button"
            // - onMouseDown preventDefault stops mouse clicks from focusing the button
            // - onClick blurs (especially for keyboard activation) after selecting
            onMouseDown={(evt) => evt.preventDefault()}
            onClick={(evt) => {
              const btn = evt.currentTarget as HTMLButtonElement
              onSelect(em)
              setTimeout(() => btn.blur(), 0)
            }}
            aria-pressed={isActive}
            className={[
              "rounded-full p-1 text-base leading-none",
              "transition-transform duration-150 ease-out",
              "hover:scale-110 focus:scale-110 focus:outline-none",
              isActive ? "bg-muted ring-1 ring-border dark:bg-muted/70" : "",
            ].join(" ")}
            aria-label={`React with ${em}`}
            title={`React with ${em}`}
          >
            {em}
          </button>
        )
      })}
    </div>
  )
}


code.demo.1756743519633.tsx
import { MessageWithReactions } from "@/components/ui/reaction-chip";

export default function DemoOne() {
  return <MessageWithReactions text="This is a small message. Hover me to react!" />

}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/reaction-chip.tsx
"use client"

import { useMemo, useState } from "react"

type MessageWithReactionsProps = {
  text: string
  reactionOptions?: string[]
}

export function MessageWithReactions({ text, reactionOptions = ["👍", "❤️", "😂", "🎉"] }: MessageWithReactionsProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [bump, setBump] = useState(false)

  function handleSelect(emoji: string) {
    // Toggle off if clicking the same emoji again
    setSelectedReaction((prev) => {
      const next = prev === emoji ? null : emoji
      // trigger bump when adding or changing to a different emoji
      if (next) {
        setBump(true)
        setTimeout(() => setBump(false), 180)
      }
      return next
    })
  }

  // Only one active reaction max
  const activeReactions = useMemo(() => {
    return selectedReaction ? ([[selectedReaction, 1]] as const) : []
  }, [selectedReaction])

  return (
    <div className="flex w-full justify-center p-6">
      <div
        className={[
          "group relative inline-block max-w-sm",
          "rounded-lg border border-border bg-card px-3 py-2",
          "text-sm text-foreground shadow-sm",
        ].join(" ")}
      >
        <p className="text-pretty">{text}</p>

        {/* Reactions row */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5" aria-live="polite" aria-atomic="false">
          {activeReactions.map(([emoji, count]) => (
            <span
              key={emoji}
              className={[
                "inline-flex items-center gap-1 rounded-full",
                "bg-muted px-2 py-0.5 text-xs text-foreground/80 ring-1 ring-border",
                "transition-transform duration-200 ease-out",
                bump ? "scale-110" : "scale-100",
              ].join(" ")}
              aria-label={`${emoji} ${count}`}
              title={`${emoji} ${count}`}
            >
              <span aria-hidden="true">{emoji}</span>
              <span className="tabular-nums">{count}</span>
            </span>
          ))}
        </div>

        {/* Hover reaction chip (appears on hover/focus) */}
        <div
          className={[
            "pointer-events-none absolute -top-3 right-0 z-10",
            "translate-y-1 opacity-0",
            "transition-all duration-200 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto",
            "focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto",
          ].join(" ")}
        >
          <ReactionChip onSelect={handleSelect} emojis={reactionOptions} selected={selectedReaction ?? undefined} />
        </div>
      </div>
    </div>
  )
}

type ReactionChipProps = {
  onSelect: (emoji: string) => void
  className?: string
  emojis?: string[]
  selected?: string // indicates the currently selected reaction
}

function ReactionChip({
  onSelect,
  className = "",
  emojis = ["👍", "❤️", "😂", "🎉"],
  selected,
}: ReactionChipProps) {
  return (
    <div
      className={[
        "pointer-events-auto flex items-center gap-1 rounded-full",
        "bg-card/90 px-2 py-1 shadow-sm ring-1 ring-border backdrop-blur",
        "transition-shadow",
        className,
      ].join(" ")}
      role="group"
      aria-label="Add reaction"
    >
      {emojis.map((em) => {
        const isActive = selected === em
        return (
          <button
            key={em}
            type="button"
            // - onMouseDown preventDefault stops mouse clicks from focusing the button
            // - onClick blurs (especially for keyboard activation) after selecting
            onMouseDown={(evt) => evt.preventDefault()}
            onClick={(evt) => {
              const btn = evt.currentTarget as HTMLButtonElement
              onSelect(em)
              setTimeout(() => btn.blur(), 0)
            }}
            aria-pressed={isActive}
            className={[
              "rounded-full p-1 text-base leading-none",
              "transition-transform duration-150 ease-out",
              "hover:scale-110 focus:scale-110 focus:outline-none",
              isActive ? "bg-muted ring-1 ring-border dark:bg-muted/70" : "",
            ].join(" ")}
            aria-label={`React with ${em}`}
            title={`React with ${em}`}
          >
            {em}
          </button>
        )
      })}
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
