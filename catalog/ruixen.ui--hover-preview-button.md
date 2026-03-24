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
hover-preview-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HoverPreviewButtonProps {
  label: string
  previewContent: React.ReactNode
  className?: string
}

export default function HoverPreviewButton({
  label,
  previewContent,
  className,
}: HoverPreviewButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Button className={cn("relative", className)}>{label}</Button>

      {isHovered && (
        <div className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-2 rounded-lg border bg-background shadow-lg">
          {previewContent}
        </div>
      )}
    </div>
  )
}


code.demo.1758651245602.tsx
"use client"

import HoverPreviewButton from "@/components/ui/hover-preview-button"

export default function HoverPreviewButtonDemo() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <HoverPreviewButton
        label="View Report"
        previewContent={
          <div className="text-sm">
            <p className="font-semibold mb-1">Sales Report</p>
            <p>Total Revenue: $12,340</p>
            <p>New Customers: 120</p>
          </div>
        }
      />

      <HoverPreviewButton
        label="Preview Image"
        previewContent={
          <img
            src="https://placekitten.com/200/150"
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
        }
      />

      <HoverPreviewButton
        label="Mini Chart"
        previewContent={
          <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
            Chart Preview
          </div>
        }
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-preview-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HoverPreviewButtonProps {
  label: string
  previewContent: React.ReactNode
  className?: string
}

export default function HoverPreviewButton({
  label,
  previewContent,
  className,
}: HoverPreviewButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Button className={cn("relative", className)}>{label}</Button>

      {isHovered && (
        <div className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-2 rounded-lg border bg-background shadow-lg">
          {previewContent}
        </div>
      )}
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
