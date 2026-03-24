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
click-trigger.tsx
"use client"
import React, { useState } from 'react'

const ClickTrigger = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        setClickPosition({ x, y })
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 600)
    }

    return (
        <div className="p-4 select-none">
            <div
                className='bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-neutral-800 rounded-lg p-6 cursor-pointer hover:shadow-xl dark:hover:shadow-neutral-800/50 transition-shadow duration-300 text-neutral-800 dark:text-gray-200 relative overflow-hidden min-h-[200px] flex items-center justify-center'
                onClick={handleClick}
            >
                <h3 className="text-lg font-medium">Click anywhere on this card</h3>

                {/* Animated rectangles forming a plus */}
                {isClicked && (
                    <>
                        {/* Top */}
                        <div 
                            className='absolute w-1 h-3 bg-black dark:bg-white rounded-sm animate-[slideUp_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Right */}
                        <div 
                            className='absolute w-3 h-1 bg-black dark:bg-white rounded-sm animate-[slideRight_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Bottom */}
                        <div 
                            className='absolute w-1 h-3 bg-black dark:bg-white rounded-sm animate-[slideDown_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Left */}
                        <div 
                            className='absolute w-3 h-1 bg-black dark:bg-white rounded-sm animate-[slideLeft_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </>
                )}
            </div>

            <style jsx global>{`
                @keyframes slideUp {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateY(-40px); opacity: 0; }
                }
                @keyframes slideRight {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateX(40px); opacity: 0; }
                }
                @keyframes slideDown {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateY(40px); opacity: 0; }
                }
                @keyframes slideLeft {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateX(-40px); opacity: 0; }
                }
            `}</style>
        </div>
    )
}

export default ClickTrigger

code.demo.1758215817363.tsx
import ClickTrigger from "@/components/ui/click-trigger";

export default function DemoOne() {
  return <ClickTrigger />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/click-trigger.tsx
"use client"
import React, { useState } from 'react'

const ClickTrigger = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        setClickPosition({ x, y })
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 600)
    }

    return (
        <div className="p-4 select-none">
            <div
                className='bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-neutral-800 rounded-lg p-6 cursor-pointer hover:shadow-xl dark:hover:shadow-neutral-800/50 transition-shadow duration-300 text-neutral-800 dark:text-gray-200 relative overflow-hidden min-h-[200px] flex items-center justify-center'
                onClick={handleClick}
            >
                <h3 className="text-lg font-medium">Click anywhere on this card</h3>

                {/* Animated rectangles forming a plus */}
                {isClicked && (
                    <>
                        {/* Top */}
                        <div 
                            className='absolute w-1 h-3 bg-black dark:bg-white rounded-sm animate-[slideUp_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Right */}
                        <div 
                            className='absolute w-3 h-1 bg-black dark:bg-white rounded-sm animate-[slideRight_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Bottom */}
                        <div 
                            className='absolute w-1 h-3 bg-black dark:bg-white rounded-sm animate-[slideDown_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                        {/* Left */}
                        <div 
                            className='absolute w-3 h-1 bg-black dark:bg-white rounded-sm animate-[slideLeft_0.6s_ease-out_forwards]'
                            style={{ 
                                left: `${clickPosition.x}px`, 
                                top: `${clickPosition.y}px`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </>
                )}
            </div>

            <style jsx global>{`
                @keyframes slideUp {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateY(-40px); opacity: 0; }
                }
                @keyframes slideRight {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateX(40px); opacity: 0; }
                }
                @keyframes slideDown {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateY(40px); opacity: 0; }
                }
                @keyframes slideLeft {
                    0% { opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateX(-40px); opacity: 0; }
                }
            `}</style>
        </div>
    )
}

export default ClickTrigger
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
