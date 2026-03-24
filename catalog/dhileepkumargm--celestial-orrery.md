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
celestial-orrery.tsx
import React from 'react';

export const Component = () => {

  return (

            <main className="hero-section w-full h-screen flex items-center justify-center">
                <div className="glyph-field">
                    <div className="glyph-container glyph-1">
                         <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div><div className="glyph-part part-3"></div>
                    </div>
                    <div className="glyph-container glyph-2">
                        <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div>
                    </div>
                    <div className="glyph-container glyph-3">
                        <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div><div className="glyph-part part-3"></div>
                    </div>
                </div>

                <div className="orrery-field">
                    <div className="orbit orbit-1"><div className="planet"></div></div>
                    <div className="orbit orbit-2"><div className="planet"></div></div>
                    <div className="orbit orbit-3"><div className="planet"></div></div>
                    <div className="orbit orbit-4"><div className="planet"></div></div>
                </div>

                {/* The content container is empty */}
                <div className="relative z-10 text-center p-8 max-w-2xl">
                </div>
            </main>
  );
};


code.demo.1758727270931.tsx
import { Component } from "@/components/ui/celestial-orrery";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/celestial-orrery.tsx
import React from 'react';

export const Component = () => {

  return (

            <main className="hero-section w-full h-screen flex items-center justify-center">
                <div className="glyph-field">
                    <div className="glyph-container glyph-1">
                         <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div><div className="glyph-part part-3"></div>
                    </div>
                    <div className="glyph-container glyph-2">
                        <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div>
                    </div>
                    <div className="glyph-container glyph-3">
                        <div className="glyph-part part-1"></div><div className="glyph-part part-2"></div><div className="glyph-part part-3"></div>
                    </div>
                </div>

                <div className="orrery-field">
                    <div className="orbit orbit-1"><div className="planet"></div></div>
                    <div className="orbit orbit-2"><div className="planet"></div></div>
                    <div className="orbit orbit-3"><div className="planet"></div></div>
                    <div className="orbit orbit-4"><div className="planet"></div></div>
                </div>

                {/* The content container is empty */}
                <div className="relative z-10 text-center p-8 max-w-2xl">
                </div>
            </main>
  );
};

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
