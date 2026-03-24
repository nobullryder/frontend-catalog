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
response.tsx
"use client"

import { memo, type ComponentProps } from "react"
import { Streamdown } from "streamdown"

import { cn } from "@/lib/utils"

type ResponseProps = ComponentProps<typeof Streamdown>

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
)

Response.displayName = "Response"


code.demo.1760005114570.tsx
"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

export default function Example() {
  const tokens = [
    "### Welcome",
    "\n\n",
    "This is a **rich markdown** showcase with multiple features.",
    "\n\n---\n\n",
    "## Data Table\n\n",
    "| Name | Role | Status |\n",
    "|------|------|--------|\n",
    "| Alice | Engineer | Active |\n",
    "| Bob | Designer | Active |\n",
    "| Carol | PM | Active |\n\n",
    "## Inspiration\n\n",
    "> *Simplicity is the ultimate sophistication.*\n",
    "> — Leonardo da Vinci\n\n",
    "## Inline and Block Code\n\n",
    "Use `let total = items.length` to count elements.\n\n",
    "```python\n",
    "def greet(name):\n",
    "    return f\"Hello, {name}!\"\n",
    "print(greet(\"World\"))\n",
    "```\n\n",
    "## Math\n\n",
    "Inline math: $a^2 + b^2 = c^2$.\n\n",
    "Displayed equation:\n\n",
    "$$\\\\int_0^1 x^2\\\\,dx = \\\\frac{1}{3}$$\n",
  ]

  const [content, setContent] = useState("")

  useEffect(() => {
    let i = 0
    let acc = ""
    const id = setInterval(() => {
      if (i < tokens.length) {
        acc += tokens[i++]
        setContent(acc)
      } else {
        clearInterval(id)
      }
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="p-10 prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/response.tsx
"use client"

import { memo, type ComponentProps } from "react"
import { Streamdown } from "streamdown"

import { cn } from "@/lib/utils"

type ResponseProps = ComponentProps<typeof Streamdown>

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
)

Response.displayName = "Response"

```

Install NPM dependencies:
```bash
streamdown
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
