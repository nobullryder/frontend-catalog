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
accordion-1.tsx
"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export interface AccordionItem {
  id: string | number
  title: string
  content: React.ReactNode
}

interface BasicAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
  defaultExpandedIds?: Array<string | number>
}

export default function BasicAccordion({
  items,
  allowMultiple = false,
  className = "",
  defaultExpandedIds = [],
}: BasicAccordionProps) {
  const [expandedItems, setExpandedItems] =
    useState<Array<string | number>>(defaultExpandedIds)

  const toggleItem = (id: string | number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id))
    } else {
      if (allowMultiple) {
        setExpandedItems([...expandedItems, id])
      } else {
        setExpandedItems([id])
      }
    }
  }

  return (
    <div
      className={`divide-border flex w-full flex-col divide-y overflow-hidden rounded-lg border ${className}`}
    >
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id)

        return (
          <div key={item.id} className="overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="hover:bg-primary flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors"
              aria-expanded={isExpanded}
            >
              <h3 className="font-medium">{item.title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        duration: 0.3,
                      },
                      opacity: { duration: 0.25 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25 },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t px-4 py-3">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}


code.demo.1756780455254.tsx
"use client"

import React from "react"

import BasicAccordion from "@/components/ui/accordion-1"

const accordionItems = [
  {
    id: 1,
    title: "What is an animated accordion?",
    content: (
      <p className="text-sm">
        An accordion is a vertically stacked set of interactive headings that
        expand/collapse to reveal content. The animated version adds smooth
        transitions between states, improving user experience.
      </p>
    ),
  },
  {
    id: 2,
    title: "How to use this component?",
    content: (
      <div className="space-y-2 text-sm">
        <p>
          Import the component and provide an array of items with{" "}
          <code>id</code>, <code>title</code>, and <code>content</code>. You can
          also customize behavior with props like <code>allowMultiple</code> and{" "}
          <code>defaultExpandedIds</code>.
        </p>
        <pre className="bg-primary rounded border p-2">
          {`<BasicAccordion
  items={accordionItems}
  allowMultiple={true}
  defaultExpandedIds={[1]}
/>`}
        </pre>
      </div>
    ),
  },
  {
    id: 3,
    title: "Is it accessible?",
    content: (
      <p className="text-sm">
        Yes! The component follows accessibility guidelines by using proper ARIA
        attributes, supporting keyboard navigation, and maintaining focus
        properly through interactions.
      </p>
    ),
  },
]

const AccordionDemo = () => {
  return (
    <div className="w-full max-w-xl p-4">
      <BasicAccordion
        items={accordionItems}
        allowMultiple={true}
        defaultExpandedIds={[1]}
        className="bg-background border"
      />
    </div>
  )
}

export default AccordionDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion-1.tsx
"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export interface AccordionItem {
  id: string | number
  title: string
  content: React.ReactNode
}

interface BasicAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
  defaultExpandedIds?: Array<string | number>
}

export default function BasicAccordion({
  items,
  allowMultiple = false,
  className = "",
  defaultExpandedIds = [],
}: BasicAccordionProps) {
  const [expandedItems, setExpandedItems] =
    useState<Array<string | number>>(defaultExpandedIds)

  const toggleItem = (id: string | number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id))
    } else {
      if (allowMultiple) {
        setExpandedItems([...expandedItems, id])
      } else {
        setExpandedItems([id])
      }
    }
  }

  return (
    <div
      className={`divide-border flex w-full flex-col divide-y overflow-hidden rounded-lg border ${className}`}
    >
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id)

        return (
          <div key={item.id} className="overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="hover:bg-primary flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors"
              aria-expanded={isExpanded}
            >
              <h3 className="font-medium">{item.title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        duration: 0.3,
                      },
                      opacity: { duration: 0.25 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25 },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t px-4 py-3">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

```

Install NPM dependencies:
```bash
motion, lucide-react
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
