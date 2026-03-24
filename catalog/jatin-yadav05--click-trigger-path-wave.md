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
click-trigger-path-wave.tsx
"use client"
import React, { useState } from 'react'

const ClickTriggerPathWave = () => {
    const [waves, setWaves] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newWave = {
            id: Date.now(),
            x,
            y
        }

        setWaves(prev => [...prev, newWave])

        setTimeout(() => {
            setWaves(prev => prev.filter(w => w.id !== newWave.id))
        }, 2000)
        }

        return (
        <div className="p-4 select-none">
            <div
            className='bg-white dark:bg-black shadow-lg border-2 border-black dark:border-white rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 text-black dark:text-white relative overflow-hidden min-h-[220px] flex items-center justify-center'
            onClick={handleClick}
            >
            <h3 className="text-xl font-semibold text-center">Click for wavy dots</h3>

            {/* Wavy dot effects */}
            {waves.map((wave) => (
                <div
                key={wave.id}
                className='absolute pointer-events-none'
                style={{
                    left: `${wave.x}px`,
                    top: `${wave.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
                >
                {Array.from({ length: 3 }, (_, i) => (
                    <div
                    key={i}
                    className='absolute w-3 h-3 bg-current rounded-full animate-[wavyPath_2s_ease-out_forwards]'
                    style={{
                        animationDelay: `${i * 0.2}s`
                    }}
                    />
                ))}
                </div>
            ))}
            </div>

            <style jsx global>{`
            @keyframes wavyPath {
                0% { 
                transform: translate(0, 0);
                opacity: 1;
                }
                25% { 
                transform: translate(30px, -20px);
                opacity: 0.8;
                }
                50% { 
                transform: translate(60px, 10px);
                opacity: 0.6;
                }
                75% { 
                transform: translate(90px, -15px);
                opacity: 0.4;
                }
                100% { 
                transform: translate(120px, 5px);
                opacity: 0;
                }
            }
            `}</style>
        </div>
        )
    }

    export default ClickTriggerPathWave


code.demo.1758216815835.tsx
import ClickTriggerPathWave from "@/components/ui/click-trigger-path-wave";

export default function DemoOne() {
  return <ClickTriggerPathWave />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/click-trigger-path-wave.tsx
"use client"
import React, { useState } from 'react'

const ClickTriggerPathWave = () => {
    const [waves, setWaves] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newWave = {
            id: Date.now(),
            x,
            y
        }

        setWaves(prev => [...prev, newWave])

        setTimeout(() => {
            setWaves(prev => prev.filter(w => w.id !== newWave.id))
        }, 2000)
        }

        return (
        <div className="p-4 select-none">
            <div
            className='bg-white dark:bg-black shadow-lg border-2 border-black dark:border-white rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 text-black dark:text-white relative overflow-hidden min-h-[220px] flex items-center justify-center'
            onClick={handleClick}
            >
            <h3 className="text-xl font-semibold text-center">Click for wavy dots</h3>

            {/* Wavy dot effects */}
            {waves.map((wave) => (
                <div
                key={wave.id}
                className='absolute pointer-events-none'
                style={{
                    left: `${wave.x}px`,
                    top: `${wave.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
                >
                {Array.from({ length: 3 }, (_, i) => (
                    <div
                    key={i}
                    className='absolute w-3 h-3 bg-current rounded-full animate-[wavyPath_2s_ease-out_forwards]'
                    style={{
                        animationDelay: `${i * 0.2}s`
                    }}
                    />
                ))}
                </div>
            ))}
            </div>

            <style jsx global>{`
            @keyframes wavyPath {
                0% { 
                transform: translate(0, 0);
                opacity: 1;
                }
                25% { 
                transform: translate(30px, -20px);
                opacity: 0.8;
                }
                50% { 
                transform: translate(60px, 10px);
                opacity: 0.6;
                }
                75% { 
                transform: translate(90px, -15px);
                opacity: 0.4;
                }
                100% { 
                transform: translate(120px, 5px);
                opacity: 0;
                }
            }
            `}</style>
        </div>
        )
    }

    export default ClickTriggerPathWave

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
