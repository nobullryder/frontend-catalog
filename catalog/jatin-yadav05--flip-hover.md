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
flip-hover.tsx
"use client"
import React, { useState } from 'react'

interface FlipHoverProps {
    imageUrl: string;
}

const FlipHover = ({ imageUrl }: FlipHoverProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleHover = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            setTimeout(() => setIsFlipped(false), 700);
        }
    };

    return (
        <div 
            className="w-44 h-60 [perspective:1000px]"
            onMouseEnter={handleHover}
        >
            <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
                isFlipped 
                    ? '[transform:rotateY(180deg)_translateY(-40px)]' 
                    : '[transform:rotateY(0deg)_translateY(0px)]'
            }`}>
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl [backface-visibility:hidden]">
                    <img
                        src={imageUrl}
                        alt="Front"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <img
                        src={imageUrl}
                        alt="Back"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default FlipHover;

code.demo.1758213434010.tsx
import FlipHover from "@/components/ui/flip-hover";

export default function DemoOne() {
  return (
    <div className='p-10 flex h-screen justify-center items-center'>
      <FlipHover
      imageUrl='https://images.unsplash.com/photo-1757642520329-b89ba3181784?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8'
       />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flip-hover.tsx
"use client"
import React, { useState } from 'react'

interface FlipHoverProps {
    imageUrl: string;
}

const FlipHover = ({ imageUrl }: FlipHoverProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleHover = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            setTimeout(() => setIsFlipped(false), 700);
        }
    };

    return (
        <div 
            className="w-44 h-60 [perspective:1000px]"
            onMouseEnter={handleHover}
        >
            <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
                isFlipped 
                    ? '[transform:rotateY(180deg)_translateY(-40px)]' 
                    : '[transform:rotateY(0deg)_translateY(0px)]'
            }`}>
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl [backface-visibility:hidden]">
                    <img
                        src={imageUrl}
                        alt="Front"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <img
                        src={imageUrl}
                        alt="Back"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default FlipHover;
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
