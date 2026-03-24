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
test.tsx
'use client'
import React from 'react'
import { motion, useSpring, useMotionTemplate } from 'framer-motion'
import { Home, Book, Brain, MessageCircle } from 'lucide-react'

const Links = [
  { name: 'Home', icon: Home },
  { name: 'Learn', icon: Book },
  { name: 'Quiz', icon: Brain },
  { name: 'Ask', icon: MessageCircle },
]

export function HoverClip() {
  const HoverClipLink = ({
    label,
    icon: Icon,
  }: {
    label: string
    icon: React.ElementType
  }) => {
    const clipPath = useSpring(100, { stiffness: 120, damping: 12 })
    const clipStyle = useMotionTemplate`inset(0% ${clipPath}% 0% 0%)`

    return (
      <div
        onMouseEnter={() => clipPath.set(0)}
        onMouseLeave={() => clipPath.set(100)}
        className="relative overflow-hidden cursor-pointer px-4 py-2 text-foreground"
      >
        {/* Hover overlay */}
        <motion.div
          style={{ clipPath: clipStyle }}
          className="absolute top-0 left-0 w-full h-full border-b-2 border-b-blue-500 text-blue-500 flex items-center justify-center font-semibold"
        >
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </motion.div>

        {/* Base text */}
        <div
          style={{ clipPath: clipStyle }}
          className="w-full h-full border-b-2 border-b-transparent text-foreground flex items-center justify-center font-semibold"
        >
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 p-10 bg-backgorund min-h-fit items-center justify-center">
      {Links.map((link) => (
        <HoverClipLink key={link.name} label={link.name} icon={link.icon} />
      ))}
    </div>
  )
}

code.demo.1771101659814.tsx
import { HoverClip } from '@/components/ui/test'

export default function DemoOne() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col leading-tight font-mono items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-8">
        HoverClip Animation Demo
      </h1>

      {/* Container for hover links */}
      <div className="bg-background p-8 rounded-2xl shadow-xl">
        <HoverClip />
      </div>

      <p className="mt-8 text-foreground text-center max-w-md">
        Hover over the links above to see the smooth clip-path animation in action.
      </p>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/test.tsx
'use client'
import React from 'react'
import { motion, useSpring, useMotionTemplate } from 'framer-motion'
import { Home, Book, Brain, MessageCircle } from 'lucide-react'

const Links = [
  { name: 'Home', icon: Home },
  { name: 'Learn', icon: Book },
  { name: 'Quiz', icon: Brain },
  { name: 'Ask', icon: MessageCircle },
]

export function HoverClip() {
  const HoverClipLink = ({
    label,
    icon: Icon,
  }: {
    label: string
    icon: React.ElementType
  }) => {
    const clipPath = useSpring(100, { stiffness: 120, damping: 12 })
    const clipStyle = useMotionTemplate`inset(0% ${clipPath}% 0% 0%)`

    return (
      <div
        onMouseEnter={() => clipPath.set(0)}
        onMouseLeave={() => clipPath.set(100)}
        className="relative overflow-hidden cursor-pointer px-4 py-2 text-foreground"
      >
        {/* Hover overlay */}
        <motion.div
          style={{ clipPath: clipStyle }}
          className="absolute top-0 left-0 w-full h-full border-b-2 border-b-blue-500 text-blue-500 flex items-center justify-center font-semibold"
        >
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </motion.div>

        {/* Base text */}
        <div
          style={{ clipPath: clipStyle }}
          className="w-full h-full border-b-2 border-b-transparent text-foreground flex items-center justify-center font-semibold"
        >
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 p-10 bg-backgorund min-h-fit items-center justify-center">
      {Links.map((link) => (
        <HoverClipLink key={link.name} label={link.name} icon={link.icon} />
      ))}
    </div>
  )
}
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
