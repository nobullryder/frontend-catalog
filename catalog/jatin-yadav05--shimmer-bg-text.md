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
shimmer-bg-text.tsx
'use client'
import React from 'react';

export default function TextHoverEffect() {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-white to-slate-200 dark:from-black/90 dark:to-black transition-colors duration-500">
            <div
                className="relative group cursor-pointer select-none px-2 py-1"
                style={{ perspective: 800 }}
            >
                <span
                    className={`
                        text-6xl font-bold tracking-tight text-transparent bg-clip-text
                        bg-gradient-to-r from-black via-slate-700 to-black
                        dark:from-white dark:via-slate-300 dark:to-white
                        transition-all duration-700 ease-out
                        inline-block
                    `}
                >
                    Hover Me
                </span>
                {/* Shimmer overlay only */}
                <span
                    className={`
                        pointer-events-none absolute inset-0 rounded
                        bg-gradient-to-r from-black/0 via-black/20 to-black/0
                        dark:from-white/0 dark:via-white/20 dark:to-white/0
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-700
                        animate-shimmer
                    `}
                    style={{
                        mixBlendMode: 'overlay',
                    }}
                />
                <style jsx>{`
                    @keyframes shimmer {
                        0% {
                            background-position: -200% 0;
                        }
                        100% {
                            background-position: 200% 0;
                        }
                    }
                    .animate-shimmer {
                        background-size: 200% 100%;
                        animation: shimmer 2.2s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}

code.demo.1751216955667.tsx
import Component from "@/components/ui/shimmer-bg-text";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/shimmer-bg-text.tsx
'use client'
import React from 'react';

export default function TextHoverEffect() {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-white to-slate-200 dark:from-black/90 dark:to-black transition-colors duration-500">
            <div
                className="relative group cursor-pointer select-none px-2 py-1"
                style={{ perspective: 800 }}
            >
                <span
                    className={`
                        text-6xl font-bold tracking-tight text-transparent bg-clip-text
                        bg-gradient-to-r from-black via-slate-700 to-black
                        dark:from-white dark:via-slate-300 dark:to-white
                        transition-all duration-700 ease-out
                        inline-block
                    `}
                >
                    Hover Me
                </span>
                {/* Shimmer overlay only */}
                <span
                    className={`
                        pointer-events-none absolute inset-0 rounded
                        bg-gradient-to-r from-black/0 via-black/20 to-black/0
                        dark:from-white/0 dark:via-white/20 dark:to-white/0
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-700
                        animate-shimmer
                    `}
                    style={{
                        mixBlendMode: 'overlay',
                    }}
                />
                <style jsx>{`
                    @keyframes shimmer {
                        0% {
                            background-position: -200% 0;
                        }
                        100% {
                            background-position: 200% 0;
                        }
                    }
                    .animate-shimmer {
                        background-size: 200% 100%;
                        animation: shimmer 2.2s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
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
