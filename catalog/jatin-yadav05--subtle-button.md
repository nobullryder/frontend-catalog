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
subtle-button.tsx
'use client'
import React, { useState } from 'react'

export default function BorderButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-br from-black/90 to-black'>
      <button 
        className='group relative border-2 flex justify-center items-center gap-3 border-white/70 rounded-full w-[9.3rem] h-12 
                   transition-all duration-500 ease-out hover:border-white hover:shadow-lg hover:shadow-white/20 
                   hover:scale-105 active:scale-95 overflow-hidden backdrop-blur-sm
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                   before:via-white/5 before:to-transparent before:translate-x-[-100%] 
                   hover:before:translate-x-[100%] before:transition-transform before:duration-700'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {/* Subtle glow effect */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/0 via-amber-200/10 to-amber-200/0 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        
        {/* Text */}
        <span className='text-white font-medium tracking-wide text-sm transition-all duration-300 
                         group-hover:text-amber-50 relative z-10'>
          Get Started
        </span>
        
        {/* Animated dot */}
        <span className={`relative z-10 w-4 h-4 bg-amber-200 rounded-full transition-all duration-500 ease-out
                         ${isHovered ? 'bg-amber-300 shadow-lg shadow-amber-300/50 scale-110' : ''}
                         ${isPressed ? 'scale-90' : ''}
                         before:absolute before:inset-0 before:bg-amber-400 before:rounded-full 
                         before:animate-pulse before:opacity-0 group-hover:before:opacity-30`}>
          {/* Ripple effect */}
          <div className='absolute inset-0 rounded-full bg-amber-200 animate-ping opacity-0 group-hover:opacity-75'
               style={{ animationDuration: '2s' }}></div>
        </span>
        
        {/* Hover state border animation */}
        <div className='absolute inset-0 rounded-full border-2 border-amber-200/0 
                        group-hover:border-amber-200/30 transition-all duration-500 
                        animate-pulse opacity-0 group-hover:opacity-100'></div>
      </button>
    </div>
  )
}

code.demo.1751214526442.tsx
import Component from "@/components/ui/subtle-button";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/subtle-button.tsx
'use client'
import React, { useState } from 'react'

export default function BorderButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-br from-black/90 to-black'>
      <button 
        className='group relative border-2 flex justify-center items-center gap-3 border-white/70 rounded-full w-[9.3rem] h-12 
                   transition-all duration-500 ease-out hover:border-white hover:shadow-lg hover:shadow-white/20 
                   hover:scale-105 active:scale-95 overflow-hidden backdrop-blur-sm
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                   before:via-white/5 before:to-transparent before:translate-x-[-100%] 
                   hover:before:translate-x-[100%] before:transition-transform before:duration-700'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {/* Subtle glow effect */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/0 via-amber-200/10 to-amber-200/0 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        
        {/* Text */}
        <span className='text-white font-medium tracking-wide text-sm transition-all duration-300 
                         group-hover:text-amber-50 relative z-10'>
          Get Started
        </span>
        
        {/* Animated dot */}
        <span className={`relative z-10 w-4 h-4 bg-amber-200 rounded-full transition-all duration-500 ease-out
                         ${isHovered ? 'bg-amber-300 shadow-lg shadow-amber-300/50 scale-110' : ''}
                         ${isPressed ? 'scale-90' : ''}
                         before:absolute before:inset-0 before:bg-amber-400 before:rounded-full 
                         before:animate-pulse before:opacity-0 group-hover:before:opacity-30`}>
          {/* Ripple effect */}
          <div className='absolute inset-0 rounded-full bg-amber-200 animate-ping opacity-0 group-hover:opacity-75'
               style={{ animationDuration: '2s' }}></div>
        </span>
        
        {/* Hover state border animation */}
        <div className='absolute inset-0 rounded-full border-2 border-amber-200/0 
                        group-hover:border-amber-200/30 transition-all duration-500 
                        animate-pulse opacity-0 group-hover:opacity-100'></div>
      </button>
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
