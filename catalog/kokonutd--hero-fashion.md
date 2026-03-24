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
hero-fashion.tsx
"use client";

import { motion } from "motion/react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="grid md:grid-cols-2 gap-8 relative overflow-x-hidden">
                    <div className="md:order-2 relative">
                        <div className="absolute -z-10 w-72 h-72 rounded-full bg-[#f8b3c4] blur-3xl opacity-20 -top-10 -left-10"></div>
                        <img
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
                            alt="Fashion model"
                            className="rounded-2xl shadow-2xl w-full object-cover filter brightness-105"
                        />
                    </div>
                    <div className="md:order-1 flex flex-col justify-between">
                        <div className="flex flex-col h-full justify-between">
                            <h1 className="text-7xl font-bold text-black leading-tight tracking-tighter">
                                Kokonut.
                            </h1>
                            <ul className="space-y-2 tracking-tighter text-lg text-black/90">
                                {[
                                    "Ready-to-wear",
                                    "Accessories",
                                    "Footwear",
                                    "Leather goods",
                                    "Jewelry",
                                ].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{
                                            opacity: 1,
                                            y: -3,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                            },
                                        }}
                                        transition={{
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <a href="#" className="cursor-pointer">
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            <div>
                                <h2 className="text-2xl font-medium text-black mt-auto pt-8">
                                    SUMMER 2025
                                </h2>
                                <p className="text-lg text-black/95 max-w-md pt-4 tracking-tight">
                                    <a
                                        href="https://kokonutui.com/"
                                        className="underline"
                                    >
                                        "The Bright Young"
                                    </a>{" "}
                                    draws inspiration from Anglomania,
                                    redefining sartorial elegance and school
                                    uniforms with a nod to British heritage.
                                    Suits of the collection are tailored out of
                                    English cloth, crafted from 1920's inspired
                                    cashmeres and wools, rewoven...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


code.demo.tsx
import HomePage from "@/components/blocks/hero-fashion"


export function DemoPage() {
    return <HomePage />
}
```

Copy-paste these files for dependencies:
```tsx
/components/blocks/hero-fashion.tsx
"use client";

import { motion } from "motion/react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="grid md:grid-cols-2 gap-8 relative overflow-x-hidden">
                    <div className="md:order-2 relative">
                        <div className="absolute -z-10 w-72 h-72 rounded-full bg-[#f8b3c4] blur-3xl opacity-20 -top-10 -left-10"></div>
                        <img
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
                            alt="Fashion model"
                            className="rounded-2xl shadow-2xl w-full object-cover filter brightness-105"
                        />
                    </div>
                    <div className="md:order-1 flex flex-col justify-between">
                        <div className="flex flex-col h-full justify-between">
                            <h1 className="text-7xl font-bold text-black leading-tight tracking-tighter">
                                Kokonut.
                            </h1>
                            <ul className="space-y-2 tracking-tighter text-lg text-black/90">
                                {[
                                    "Ready-to-wear",
                                    "Accessories",
                                    "Footwear",
                                    "Leather goods",
                                    "Jewelry",
                                ].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{
                                            opacity: 1,
                                            y: -3,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                            },
                                        }}
                                        transition={{
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <a href="#" className="cursor-pointer">
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            <div>
                                <h2 className="text-2xl font-medium text-black mt-auto pt-8">
                                    SUMMER 2025
                                </h2>
                                <p className="text-lg text-black/95 max-w-md pt-4 tracking-tight">
                                    <a
                                        href="https://kokonutui.com/"
                                        className="underline"
                                    >
                                        "The Bright Young"
                                    </a>{" "}
                                    draws inspiration from Anglomania,
                                    redefining sartorial elegance and school
                                    uniforms with a nod to British heritage.
                                    Suits of the collection are tailored out of
                                    English cloth, crafted from 1920's inspired
                                    cashmeres and wools, rewoven...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

```

Install NPM dependencies:
```bash
motion
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
