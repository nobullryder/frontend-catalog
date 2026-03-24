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
click-trigger-particles.tsx
"use client"
import React, { useState } from 'react'

const ClickTriggerParticles = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Create multiple particles
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y
        }))
        
        setParticles(prev => [...prev, ...newParticles])
        
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
        }, 800)
    }

    return (
        <div className="p-4 select-none">
            <div
                className='bg-white dark:bg-black shadow-lg border-2 border-black dark:border-white rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 text-black dark:text-white relative overflow-hidden min-h-[220px] flex items-center justify-center'
                onClick={handleClick}
            >
                <h3 className="text-xl font-semibold text-center">Click for particle burst effect</h3>

                {/* Particle effects */}
                {particles.map((particle, index) => (
                    <div 
                        key={particle.id}
                        className='absolute w-3 h-3 bg-black dark:bg-white rounded-full animate-[particleBurst_0.8s_ease-out_forwards]'
                        style={{ 
                            left: `${particle.x}px`, 
                            top: `${particle.y}px`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${index * 0.05}s`,
                            '--particle-angle': `${(index * 45)}deg`
                        } as React.CSSProperties & { '--particle-angle': string }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes particleBurst {
                    0% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(0) scale(1);
                    }
                    70% { 
                        opacity: 0.6;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(60px) scale(0.8);
                    }
                    100% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(80px) scale(0.3);
                    }
                }
            `}</style>
        </div>
    )
}

export default ClickTriggerParticles


code.demo.1758216199748.tsx
import ClickTriggerParticles from "@/components/ui/click-trigger-particles";

export default function DemoOne() {
  return <ClickTriggerParticles />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/click-trigger-particles.tsx
"use client"
import React, { useState } from 'react'

const ClickTriggerParticles = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Create multiple particles
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y
        }))
        
        setParticles(prev => [...prev, ...newParticles])
        
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
        }, 800)
    }

    return (
        <div className="p-4 select-none">
            <div
                className='bg-white dark:bg-black shadow-lg border-2 border-black dark:border-white rounded-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 text-black dark:text-white relative overflow-hidden min-h-[220px] flex items-center justify-center'
                onClick={handleClick}
            >
                <h3 className="text-xl font-semibold text-center">Click for particle burst effect</h3>

                {/* Particle effects */}
                {particles.map((particle, index) => (
                    <div 
                        key={particle.id}
                        className='absolute w-3 h-3 bg-black dark:bg-white rounded-full animate-[particleBurst_0.8s_ease-out_forwards]'
                        style={{ 
                            left: `${particle.x}px`, 
                            top: `${particle.y}px`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${index * 0.05}s`,
                            '--particle-angle': `${(index * 45)}deg`
                        } as React.CSSProperties & { '--particle-angle': string }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes particleBurst {
                    0% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(0) scale(1);
                    }
                    70% { 
                        opacity: 0.6;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(60px) scale(0.8);
                    }
                    100% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(80px) scale(0.3);
                    }
                }
            `}</style>
        </div>
    )
}

export default ClickTriggerParticles

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
