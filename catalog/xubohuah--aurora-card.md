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
aurora-card.tsx
'use client'

import { useState } from 'react'

export function AuroraCard() {
    const themes = [
        {
            id: 'original',
            name: 'Original',
            background: '#110026',
            border: 'linear-gradient(90deg, rgba(140, 68, 36, 0.5) 0%, rgba(245, 62, 2, 0.4) 25%, rgba(255, 182, 0, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'sunset',
            name: 'Sunset',
            background: '#1A1520',
            border: 'linear-gradient(90deg, rgba(140, 68, 36, 0.5) 0%, rgba(245, 62, 2, 0.4) 25%, rgba(255, 182, 0, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'ocean',
            name: 'Ocean',
            background: '#151E2D',
            border: 'linear-gradient(90deg, rgba(0, 87, 255, 0.5) 0%, rgba(0, 144, 255, 0.4) 25%, rgba(0, 200, 255, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'forest',
            name: 'Forest',
            background: '#1A2023',
            border: 'linear-gradient(90deg, rgba(20, 83, 45, 0.5) 0%, rgba(34, 197, 94, 0.4) 25%, rgba(163, 230, 53, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'galaxy',
            name: 'Galaxy',
            background: '#1F1A2E',
            border: 'linear-gradient(90deg, rgba(88, 28, 135, 0.5) 0%, rgba(168, 85, 247, 0.4) 25%, rgba(216, 180, 254, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'coral',
            name: 'Coral',
            background: '#4A2B2D',
            border: 'linear-gradient(90deg, rgba(251, 146, 140, 0.5) 0%, rgba(251, 113, 133, 0.4) 25%, rgba(244, 63, 94, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'mint',
            name: 'Mint',
            background: '#2D4A3E',
            border: 'linear-gradient(90deg, rgba(167, 243, 208, 0.5) 0%, rgba(110, 231, 183, 0.4) 25%, rgba(52, 211, 153, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'yellow',
            name: 'Yellow',
            background: '#FFB600',
            border: 'linear-gradient(90deg, rgba(253, 224, 71, 0.5) 0%, rgba(250, 204, 21, 0.4) 25%, rgba(234, 179, 8, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        }
    ]

    const [currentTheme, setCurrentTheme] = useState(themes[0])

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8 transition-colors duration-700"
            style={{ background: currentTheme.background }}>
            
            {/* Theme Selector */}
            <div className="flex gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentTheme(theme)}
                        className={`w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${currentTheme.id === theme.id ? 'scale-110 ring-2 ring-white' : ''}`}
                        style={{ background: theme.background }}
                        title={theme.name}
                    />
                ))}
            </div>

            {/* Card */}
            <div className="relative w-[660px] h-[412px] rounded-[40px] overflow-hidden before:absolute before:inset-0 before:p-[3px] before:rounded-[40px] before:content-[''] transition-all duration-700"
                style={{
                    background: 'radial-gradient(100% 100% at 100% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
                    backdropFilter: 'blur(21px)',
                }}>
                <div className="absolute inset-0 rounded-[40px] transition-all duration-700" style={{
                    background: currentTheme.border,
                    opacity: 0.8,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '3px',
                }}></div>
                
                {/* Card circles */}
                <div className="absolute right-[40px] top-[40px] flex">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#FF4F38]"></div>
                    <div className="w-[70px] h-[70px] rounded-full bg-[#FFB600] -ml-[35px]"></div>
                </div>

                {/* Card details */}
                <div className="absolute bottom-[88px] left-[60px]">
                    <h2 className="text-[#F1F1F1] text-[20px] leading-[20px] font-semibold font-sans">
                        KAIN XU
                    </h2>
                </div>

                {/* Expiry date */}
                <div className="absolute bottom-[88px] left-[425px]">
                    <p className="text-[#F1F1F1] text-[20px] leading-[20px] font-semibold font-sans">
                        01/27
                    </p>
                </div>

                {/* Card number */}
                <div className="absolute bottom-[40px] left-[60px]">
                    <p className="text-[#F1F1F1] text-[32px] leading-[32px] font-semibold tracking-[0.15em] font-sans">
                        1225  0127  0228  3698
                    </p>
                </div>
            </div>
        </div>
    )
}

code.demo.1749186078018.tsx
import { AuroraCard } from "@/components/ui/aurora-card";

const DemoOne = () => {
  return <AuroraCard />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/aurora-card.tsx
'use client'

import { useState } from 'react'

export function AuroraCard() {
    const themes = [
        {
            id: 'original',
            name: 'Original',
            background: '#110026',
            border: 'linear-gradient(90deg, rgba(140, 68, 36, 0.5) 0%, rgba(245, 62, 2, 0.4) 25%, rgba(255, 182, 0, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'sunset',
            name: 'Sunset',
            background: '#1A1520',
            border: 'linear-gradient(90deg, rgba(140, 68, 36, 0.5) 0%, rgba(245, 62, 2, 0.4) 25%, rgba(255, 182, 0, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'ocean',
            name: 'Ocean',
            background: '#151E2D',
            border: 'linear-gradient(90deg, rgba(0, 87, 255, 0.5) 0%, rgba(0, 144, 255, 0.4) 25%, rgba(0, 200, 255, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'forest',
            name: 'Forest',
            background: '#1A2023',
            border: 'linear-gradient(90deg, rgba(20, 83, 45, 0.5) 0%, rgba(34, 197, 94, 0.4) 25%, rgba(163, 230, 53, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'galaxy',
            name: 'Galaxy',
            background: '#1F1A2E',
            border: 'linear-gradient(90deg, rgba(88, 28, 135, 0.5) 0%, rgba(168, 85, 247, 0.4) 25%, rgba(216, 180, 254, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'coral',
            name: 'Coral',
            background: '#4A2B2D',
            border: 'linear-gradient(90deg, rgba(251, 146, 140, 0.5) 0%, rgba(251, 113, 133, 0.4) 25%, rgba(244, 63, 94, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'mint',
            name: 'Mint',
            background: '#2D4A3E',
            border: 'linear-gradient(90deg, rgba(167, 243, 208, 0.5) 0%, rgba(110, 231, 183, 0.4) 25%, rgba(52, 211, 153, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        },
        {
            id: 'yellow',
            name: 'Yellow',
            background: '#FFB600',
            border: 'linear-gradient(90deg, rgba(253, 224, 71, 0.5) 0%, rgba(250, 204, 21, 0.4) 25%, rgba(234, 179, 8, 0.3) 50%, rgba(255, 255, 255, 0.6) 100%)',
        }
    ]

    const [currentTheme, setCurrentTheme] = useState(themes[0])

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8 transition-colors duration-700"
            style={{ background: currentTheme.background }}>
            
            {/* Theme Selector */}
            <div className="flex gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentTheme(theme)}
                        className={`w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${currentTheme.id === theme.id ? 'scale-110 ring-2 ring-white' : ''}`}
                        style={{ background: theme.background }}
                        title={theme.name}
                    />
                ))}
            </div>

            {/* Card */}
            <div className="relative w-[660px] h-[412px] rounded-[40px] overflow-hidden before:absolute before:inset-0 before:p-[3px] before:rounded-[40px] before:content-[''] transition-all duration-700"
                style={{
                    background: 'radial-gradient(100% 100% at 100% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
                    backdropFilter: 'blur(21px)',
                }}>
                <div className="absolute inset-0 rounded-[40px] transition-all duration-700" style={{
                    background: currentTheme.border,
                    opacity: 0.8,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '3px',
                }}></div>
                
                {/* Card circles */}
                <div className="absolute right-[40px] top-[40px] flex">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#FF4F38]"></div>
                    <div className="w-[70px] h-[70px] rounded-full bg-[#FFB600] -ml-[35px]"></div>
                </div>

                {/* Card details */}
                <div className="absolute bottom-[88px] left-[60px]">
                    <h2 className="text-[#F1F1F1] text-[20px] leading-[20px] font-semibold font-sans">
                        KAIN XU
                    </h2>
                </div>

                {/* Expiry date */}
                <div className="absolute bottom-[88px] left-[425px]">
                    <p className="text-[#F1F1F1] text-[20px] leading-[20px] font-semibold font-sans">
                        01/27
                    </p>
                </div>

                {/* Card number */}
                <div className="absolute bottom-[40px] left-[60px]">
                    <p className="text-[#F1F1F1] text-[32px] leading-[32px] font-semibold tracking-[0.15em] font-sans">
                        1225  0127  0228  3698
                    </p>
                </div>
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
