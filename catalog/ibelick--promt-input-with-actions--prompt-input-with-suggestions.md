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
promt-input-with-actions.tsx
"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Globe, Mic, MoreHorizontal, Plus } from "lucide-react"
import type React from "react"
import { useState } from "react"

function PromptInputWithActions() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    if (!prompt.trim()) return

    setIsLoading(true)

    // Simulate API call
    console.log("Processing:", prompt)
    setTimeout(() => {
      setPrompt("")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5">
      <PromptInput
        isLoading={isLoading}
        value={prompt}
        onValueChange={setPrompt}
        onSubmit={handleSubmit}
        className="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
      >
        <div className="flex flex-col">
          <PromptInputTextarea
            placeholder="Ask anything"
            className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
          />

          <PromptInputActions className="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3">
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Add a new action">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Plus size={18} />
                </Button>
              </PromptInputAction>

              <PromptInputAction tooltip="Search">
                <Button variant="outline" className="rounded-full">
                  <Globe size={18} />
                  Search
                </Button>
              </PromptInputAction>

              <PromptInputAction tooltip="More actions">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <MoreHorizontal size={18} />
                </Button>
              </PromptInputAction>
            </div>
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Voice input">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Mic size={18} />
                </Button>
              </PromptInputAction>

              <Button
                size="icon"
                disabled={!prompt.trim() || isLoading}
                onClick={handleSubmit}
                className="size-9 rounded-full"
              >
                {!isLoading ? (
                  <ArrowUp size={18} />
                ) : (
                  <span className="size-3 rounded-xs bg-white" />
                )}
              </Button>
            </div>
          </PromptInputActions>
        </div>
      </PromptInput>
    </div>
  )
}

export { PromptInputWithActions }


code.demo.1755906580165.tsx
"use client"

import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, BrainIcon } from "lucide-react"
import { useState } from "react"

const suggestionGroups = [
  {
    label: "Summary",
    highlight: "Summarize",
    items: [
      "Summarize a document",
      "Summarize a video",
      "Summarize a podcast",
      "Summarize a book",
    ],
  },
  {
    label: "Code",
    highlight: "Help me",
    items: [
      "Help me write React components",
      "Help me debug code",
      "Help me learn Python",
      "Help me learn SQL",
    ],
  },
  {
    label: "Design",
    highlight: "Design",
    items: [
      "Design a small logo",
      "Design a hero section",
      "Design a landing page",
      "Design a social media post",
    ],
  },
  {
    label: "Research",
    highlight: "Research",
    items: [
      "Research the best practices for SEO",
      "Research the best running shoes",
      "Research the best restaurants in Paris",
      "Research the best AI tools",
    ],
  },
]

export default function PromptInputWithSuggestions() {
  const [inputValue, setInputValue] = useState("")
  const [activeCategory, setActiveCategory] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("Sending:", inputValue)
      setInputValue("")
      setActiveCategory("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePromptInputValueChange = (value: string) => {
    setInputValue(value)
    // Clear active category when typing something different
    if (value.trim() === "") {
      setActiveCategory("")
    }
  }

  // Get suggestions based on active category
  const activeCategoryData = suggestionGroups.find(
    (group) => group.label === activeCategory
  )

  // Determine which suggestions to show
  const showCategorySuggestions = activeCategory !== ""

  return (
    <div className="absolute inset-x-0 top-1/2 mx-auto flex max-w-3xl -translate-y-1/2 flex-col items-center justify-center gap-4 px-3 pb-3 md:px-5 md:pb-5">
      <PromptInput
        className="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
        value={inputValue}
        onValueChange={handlePromptInputValueChange}
        onSubmit={handleSend}
      >
        <PromptInputTextarea
          placeholder="Ask anything..."
          className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
          onKeyDown={handleKeyDown}
        />
        <PromptInputActions className="mt-5 flex w-full items-end justify-end gap-2 px-3 pb-3">
          <Button
            size="sm"
            className="h-9 w-9 rounded-full"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </PromptInputActions>
      </PromptInput>

      <div className="relative flex w-full flex-col items-center justify-center space-y-2">
        <div className="absolute top-0 left-0 h-[70px] w-full">
          {showCategorySuggestions ? (
            <div className="flex w-full flex-col space-y-1">
              {activeCategoryData?.items.map((suggestion) => (
                <PromptSuggestion
                  key={suggestion}
                  highlight={activeCategoryData.highlight}
                  onClick={() => {
                    setInputValue(suggestion)
                    // Optional: auto-send
                    // handleSend()
                  }}
                >
                  {suggestion}
                </PromptSuggestion>
              ))}
            </div>
          ) : (
            <div className="relative flex w-full flex-wrap items-stretch justify-start gap-2">
              {suggestionGroups.map((suggestion) => (
                <PromptSuggestion
                  key={suggestion.label}
                  onClick={() => {
                    setActiveCategory(suggestion.label)
                    setInputValue("") // Clear input when selecting a category
                  }}
                  className="capitalize"
                >
                  <BrainIcon className="mr-2 h-4 w-4" />
                  {suggestion.label}
                </PromptSuggestion>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/promt-input-with-actions.tsx
"use client"

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Globe, Mic, MoreHorizontal, Plus } from "lucide-react"
import type React from "react"
import { useState } from "react"

function PromptInputWithActions() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    if (!prompt.trim()) return

    setIsLoading(true)

    // Simulate API call
    console.log("Processing:", prompt)
    setTimeout(() => {
      setPrompt("")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5">
      <PromptInput
        isLoading={isLoading}
        value={prompt}
        onValueChange={setPrompt}
        onSubmit={handleSubmit}
        className="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
      >
        <div className="flex flex-col">
          <PromptInputTextarea
            placeholder="Ask anything"
            className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
          />

          <PromptInputActions className="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3">
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Add a new action">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Plus size={18} />
                </Button>
              </PromptInputAction>

              <PromptInputAction tooltip="Search">
                <Button variant="outline" className="rounded-full">
                  <Globe size={18} />
                  Search
                </Button>
              </PromptInputAction>

              <PromptInputAction tooltip="More actions">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <MoreHorizontal size={18} />
                </Button>
              </PromptInputAction>
            </div>
            <div className="flex items-center gap-2">
              <PromptInputAction tooltip="Voice input">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full"
                >
                  <Mic size={18} />
                </Button>
              </PromptInputAction>

              <Button
                size="icon"
                disabled={!prompt.trim() || isLoading}
                onClick={handleSubmit}
                className="size-9 rounded-full"
              >
                {!isLoading ? (
                  <ArrowUp size={18} />
                ) : (
                  <span className="size-3 rounded-xs bg-white" />
                )}
              </Button>
            </div>
          </PromptInputActions>
        </div>
      </PromptInput>
    </div>
  )
}

export { PromptInputWithActions }

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
