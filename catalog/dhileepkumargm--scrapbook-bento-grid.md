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
scrapbook-bento-grid.tsx
import React from 'react';

// Reusable BentoItem for the Scrapbook theme.
const BentoItem = ({ className, children, rotation }) => {
    const style = {
        '--rotation': rotation || '0deg',
    };
    return (
        <div className={`bento-item ${className}`} style={style}>
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default BentoItem;

code.demo.1758732791881.tsx
import BentoItem from "@/components/ui/scrapbook-bento-grid";

export default function DemoOne() {
    return (
            <div className="scrapbook-container scrapbook-scope">
                <div className="w-full max-w-6xl z-10 flex flex-col items-center">
                    <h1 className="scrapbook-title mb-12">Bits & Pieces</h1>

                    <div className="bento-grid">
                        <BentoItem className="item-1" rotation="-2deg">
                            <h2>Goals & Ideas</h2>
                            <ul>
                                <li>- Start a garden</li>
                                <li>- Learn to bake bread</li>
                                <li>- Plan a road trip</li>
                            </ul>
                        </BentoItem>
                        <BentoItem className="item-2" rotation="3deg">
                            <h2>Quote</h2>
                            <p>"Creativity is intelligence having fun."</p>
                        </BentoItem>
                        <BentoItem className="item-3" rotation="-1deg">
                            <h2>To-Do</h2>
                            <p>Finish reading that book!</p>
                        </BentoItem>
                        <BentoItem className="item-4" rotation="2deg">
                           <div className="w-full h-full bg-gray-300 border-4 border-gray-200 flex items-center justify-center text-gray-500 font-sans">[ Photo Placeholder ]</div>
                           <p className="absolute bottom-4 left-0 right-0 text-center">Summer '24</p>
                        </BentoItem>
                        <BentoItem className="item-5" rotation="1deg">
                            <h2>Favorite Recipe</h2>
                            <p>Lemon pasta: garlic, chili flakes, olive oil, parsley, and lots of lemon juice.</p>
                        </BentoItem>
                         <BentoItem className="item-6" rotation="-3deg">
                            <h2>Doodles</h2>
                            <p>Just some little sketches and thoughts here.</p>
                        </BentoItem>
                    </div>
                </div>
            </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scrapbook-bento-grid.tsx
import React from 'react';

// Reusable BentoItem for the Scrapbook theme.
const BentoItem = ({ className, children, rotation }) => {
    const style = {
        '--rotation': rotation || '0deg',
    };
    return (
        <div className={`bento-item ${className}`} style={style}>
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default BentoItem;
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
