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
leather-button.tsx
"use client"

import type React from "react"

interface LeatherButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const LeatherButton: React.FC<LeatherButtonProps> = ({ children, onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`
                leather-button
                relative px-6 py-3 border-none rounded-lg
                text-[#F5DEB3] font-bold cursor-pointer
                transition-all duration-300 ease-in-out
                overflow-hidden
                hover:transform hover:-translate-y-0.5
                active:transform active:translate-y-0
                disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                ${className}
                ${disabled ? "disabled" : ""}
            `}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: `
                    radial-gradient(circle at 20% 30%, rgba(139, 105, 85, 0.3) 1px, transparent 1px),
                    radial-gradient(circle at 70% 60%, rgba(101, 67, 33, 0.2) 1px, transparent 1px),
                    radial-gradient(circle at 40% 80%, rgba(160, 120, 90, 0.25) 1px, transparent 1px),
                    linear-gradient(45deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #D2691E 75%, #8B4513 100%)
                `,
        backgroundSize: "15px 15px, 20px 20px, 18px 18px, 100% 100%",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        boxShadow: `
                    0 4px 8px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `,
      }}
    >
      <span className="relative z-10 block">{children}</span>
    </button>
  )
}

export default LeatherButton


code.demo.1753286890557.tsx
"use client"

import LeatherButton from "@/components/ui/leather-button"

export default function Component() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-8">
      <div className="space-y-8 text-center">
        <div className="space-y-6">
          <div>
            <LeatherButton onClick={() => alert("Clicked!")}>Click Me</LeatherButton>
          </div>

          <div>
            <LeatherButton disabled>Disabled Button</LeatherButton>
          </div>
        </div>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/leather-button.tsx
"use client"

import type React from "react"

interface LeatherButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const LeatherButton: React.FC<LeatherButtonProps> = ({ children, onClick, disabled = false, className = "" }) => {
  return (
    <button
      className={`
                leather-button
                relative px-6 py-3 border-none rounded-lg
                text-[#F5DEB3] font-bold cursor-pointer
                transition-all duration-300 ease-in-out
                overflow-hidden
                hover:transform hover:-translate-y-0.5
                active:transform active:translate-y-0
                disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                ${className}
                ${disabled ? "disabled" : ""}
            `}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: `
                    radial-gradient(circle at 20% 30%, rgba(139, 105, 85, 0.3) 1px, transparent 1px),
                    radial-gradient(circle at 70% 60%, rgba(101, 67, 33, 0.2) 1px, transparent 1px),
                    radial-gradient(circle at 40% 80%, rgba(160, 120, 90, 0.25) 1px, transparent 1px),
                    linear-gradient(45deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #D2691E 75%, #8B4513 100%)
                `,
        backgroundSize: "15px 15px, 20px 20px, 18px 18px, 100% 100%",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        boxShadow: `
                    0 4px 8px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `,
      }}
    >
      <span className="relative z-10 block">{children}</span>
    </button>
  )
}

export default LeatherButton

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
