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
scroll-legend.tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LegendItem {
  id: string
  name: string
}

interface ScrollLegendProps {
  items: LegendItem[]
  className?: string
}

export function ScrollLegend({ items, className }: ScrollLegendProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn("fixed left-4 top-1/2 -translate-y-1/2 z-50", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex items-center cursor-pointer group"
            onClick={() => scrollToSection(item.id)}
          >
            {/* Horizontal line indicator */}
            <div
              className={cn(
                "h-0.5 transition-all duration-200",
                activeSection === item.id
                  ? "w-6 bg-red-500"
                  : "w-4 bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-600 dark:group-hover:bg-gray-400",
              )}
            />

            {/* Section name - only visible on hover */}
            <span
              className={cn(
                "ml-4 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                "text-gray-300 dark:text-gray-400",
                activeSection === item.id && "text-red-500 dark:text-red-400",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none",
              )}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


code.demo.1751026311250.tsx
import { ScrollLegend } from "@/components/ui/scroll-legend"

const legendItems = [
  { id: "ai-chat", name: "AI Chat" },
  { id: "quick-ai", name: "Quick AI" },
  { id: "ai-extensions", name: "AI Extensions" },
  { id: "ai-commands", name: "AI Commands" },
  { id: "models", name: "Models" },
  { id: "privacy", name: "Privacy" },
  { id: "pricing", name: "Pricing" },
  { id: "faqs", name: "FAQs" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollLegend items={legendItems} />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">Scroll Legend</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Scroll down to explore our features</p>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="ai-chat" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">AI Chat</h2>
         
        </div>
      </section>

      {/* Quick AI Section */}
      <section id="quick-ai" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Quick AI</h2>
        
        </div>
      </section>

      {/* AI Extensions Section */}
      <section id="ai-extensions" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">AI Extensions</h2>
        </div>
      </section>

      {/* AI Commands Section */}
      <section id="ai-commands" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">AI Commands</h2>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Models</h2>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Privacy</h2>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Pricing</h2>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">FAQs</h2>
        
        </div>
      </section>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-legend.tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LegendItem {
  id: string
  name: string
}

interface ScrollLegendProps {
  items: LegendItem[]
  className?: string
}

export function ScrollLegend({ items, className }: ScrollLegendProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn("fixed left-4 top-1/2 -translate-y-1/2 z-50", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex items-center cursor-pointer group"
            onClick={() => scrollToSection(item.id)}
          >
            {/* Horizontal line indicator */}
            <div
              className={cn(
                "h-0.5 transition-all duration-200",
                activeSection === item.id
                  ? "w-6 bg-red-500"
                  : "w-4 bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-600 dark:group-hover:bg-gray-400",
              )}
            />

            {/* Section name - only visible on hover */}
            <span
              className={cn(
                "ml-4 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                "text-gray-300 dark:text-gray-400",
                activeSection === item.id && "text-red-500 dark:text-red-400",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none",
              )}
            >
              {item.name}
            </span>
          </div>
        ))}
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
