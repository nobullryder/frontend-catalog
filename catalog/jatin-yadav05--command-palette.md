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
command-palette.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function CommandPalette({
  placeholder = "Search or type a command...",
  onSearch,
  className,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setIsOpen(false)
    setQuery("")
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
      setQuery("")
    }
  }

  return (
    <>
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Command Palette</h1>
            <p className="text-sm text-muted-foreground">Professional search with keyboard shortcuts</p>
          </div>

          <div className="space-y-4 flex justify-center items-center">
            {/* Trigger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "flex items-center min-w-64 gap-2 px-3 py-2 text-sm",
                "border border-border rounded-lg bg-background",
                "hover:border-ring/40 hover:bg-muted/50",
                "transition-all duration-200",
                "text-muted-foreground",
                className,
              )}
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded-lg">
                ⌘K
              </kbd>{" "}
              or{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded-lg">
                Ctrl+K
              </kbd>{" "}
              to open search
            </p>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={handleBackdropClick}>
          <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg">
            <div className="mx-4 rounded-lg border bg-background shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center border-b px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex h-12 w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                {/* Results area - can be extended */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {query ? (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">Press Enter to search for "{query}"</div>
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">Type to search...</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


code.demo.1756203329508.tsx
// This is a file with a demo for your CommandPalatte

import { CommandPalette } from "@/components/ui/command-palette";

export default function DemoOne() {
  return <CommandPalette />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/command-palette.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandPaletteProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function CommandPalette({
  placeholder = "Search or type a command...",
  onSearch,
  className,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setIsOpen(false)
    setQuery("")
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
      setQuery("")
    }
  }

  return (
    <>
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Command Palette</h1>
            <p className="text-sm text-muted-foreground">Professional search with keyboard shortcuts</p>
          </div>

          <div className="space-y-4 flex justify-center items-center">
            {/* Trigger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={cn(
                "flex items-center min-w-64 gap-2 px-3 py-2 text-sm",
                "border border-border rounded-lg bg-background",
                "hover:border-ring/40 hover:bg-muted/50",
                "transition-all duration-200",
                "text-muted-foreground",
                className,
              )}
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <Command className="h-3 w-3" />K
                </kbd>
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded-lg">
                ⌘K
              </kbd>{" "}
              or{" "}
              <kbd className="px-1.5 py-0.5 text-xs font-semibold text-foreground bg-muted border border-border rounded-lg">
                Ctrl+K
              </kbd>{" "}
              to open search
            </p>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={handleBackdropClick}>
          <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg">
            <div className="mx-4 rounded-lg border bg-background shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center border-b px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex h-12 w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                {/* Results area - can be extended */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {query ? (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">Press Enter to search for "{query}"</div>
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">Type to search...</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

```

Install NPM dependencies:
```bash
lucide-react
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
