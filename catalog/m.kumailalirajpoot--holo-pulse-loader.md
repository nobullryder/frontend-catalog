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
holo-pulse-loader.tsx
'use client'
import React from 'react'
import { PlusIcon } from 'lucide-react'

export function HoloPulse() {
  const [dots, setDots] = React.useState('')

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-screen bg-background flex flex-col justify-center items-center gap-4'>
      {/* Compact Mini-Hologram Loader */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-150 animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="absolute w-[1px] h-16 bg-blue-500" />
            <div className="absolute w-16 h-[1px] bg-blue-500" />
        </div>

        {/* Main Ring System */}
        <div className="relative p-2 border border-dashed border-blue-500/20 rounded-full animate-[spin_2s_linear_infinite]">
            
            <div className="w-14 h-14 border border-dashed border-blue-400/40 rounded-full flex justify-center items-center animate-[spin_1.2s_linear_infinite_reverse]">
                <div className="relative z-10 p-1 bg-background rounded-full border border-blue-500/30 shadow-[0_0_15px_-5px_#3b82f6]">
                    <PlusIcon size={16} className="text-blue-500 animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
            </div>
            
            {/* 4 Orbiting Dots at Cardinal Points */}
            {/* Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Left */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Right */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase">
          Loading{dots}
        </p>
      </div>
    </div>
  )
}


code.demo.1768163660528.tsx
import { HoloPulse } from "@/components/ui/holo-pulse-loader";

export default function DemoOne() {
  return <HoloPulse />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/holo-pulse-loader.tsx
'use client'
import React from 'react'
import { PlusIcon } from 'lucide-react'

export function HoloPulse() {
  const [dots, setDots] = React.useState('')

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full h-screen bg-background flex flex-col justify-center items-center gap-4'>
      {/* Compact Mini-Hologram Loader */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-150 animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="absolute w-[1px] h-16 bg-blue-500" />
            <div className="absolute w-16 h-[1px] bg-blue-500" />
        </div>

        {/* Main Ring System */}
        <div className="relative p-2 border border-dashed border-blue-500/20 rounded-full animate-[spin_2s_linear_infinite]">
            
            <div className="w-14 h-14 border border-dashed border-blue-400/40 rounded-full flex justify-center items-center animate-[spin_1.2s_linear_infinite_reverse]">
                <div className="relative z-10 p-1 bg-background rounded-full border border-blue-500/30 shadow-[0_0_15px_-5px_#3b82f6]">
                    <PlusIcon size={16} className="text-blue-500 animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
            </div>
            
            {/* 4 Orbiting Dots at Cardinal Points */}
            {/* Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Left */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
            {/* Right */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase">
          Loading{dots}
        </p>
      </div>
    </div>
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
