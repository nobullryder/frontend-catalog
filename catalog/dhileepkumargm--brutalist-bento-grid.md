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
brutalist-bento-grid.tsx

import React from 'react';

// Reusable BentoItem for the Brutalist theme.
const BentoItem = ({ className, children }) => {
    return (
        <div className={`bento-item ${className}`}>
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default BentoItem;


code.demo.1758731779292.tsx
import BentoItem from "@/components/ui/brutalist-bento-grid";

export default function DemoOne() {
    return (
            <div className="brutalist-container brutalist-scope">
                <div className="w-full max-w-6xl z-10 flex flex-col items-center">
                    <h1 className="brutalist-title text-4xl sm:text-5xl text-center mb-12">Foundation Blocks</h1>

                    <div className="bento-grid">
                        <BentoItem className="item-1">
                            <h2>Core Module</h2>
                            <p>The central processing unit. All logic originates here.</p>
                        </BentoItem>
                        <BentoItem className="item-2">
                            <h2>Primary Structure</h2>
                            <p>Load-bearing framework and architectural integrity.</p>
                        </BentoItem>
                        <BentoItem className="item-3">
                            <h2>Input</h2>
                            <p>Data ingress.</p>
                        </BentoItem>
                        <BentoItem className="item-4">
                            <h2>Output</h2>
                            <p>Data egress.</p>
                        </BentoItem>
                        <BentoItem className="item-5">
                            <h2>Sub-System Support</h2>
                            <p>Auxiliary services and operational support infrastructure.</p>
                        </BentoItem>
                    </div>
                </div>
            </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/brutalist-bento-grid.tsx

import React from 'react';

// Reusable BentoItem for the Brutalist theme.
const BentoItem = ({ className, children }) => {
    return (
        <div className={`bento-item ${className}`}>
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
