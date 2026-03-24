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
text-color.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div>
      <div className=" mb-10 mt-4 md:mt-6">
        <div className="px-2">
          <div className="relative p-8 w-full h-full border border-slate-200 dark:border-slate-800 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]">
            <h1 className="tracking-tighter flex select-none px-3 py-2 flex-col text-center text-7xl font-extrabold leading-none sm:text-8xl md:flex-col lg:flex-row">
              <Plus className="absolute -left-4 -top-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -right-4 -top-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-indigo-500" />

              <span
                data-content="Develop."
                className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0  before:w-full before:px-2 before:content-[attr(data-content)]  sm:before:top-0"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Develop.
                </span>
              </span>
              <span
                data-content="Preview."
                className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Preview.
                </span>
              </span>
              <span
                data-content="Ship."
                className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Ship.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}


code.demo.tsx
import { TextColor } from "@/components/ui/text-color";

export function HomePage() {
  return (
    <main className="overflow-hidden">
      <TextColor />
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/text-color.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div>
      <div className=" mb-10 mt-4 md:mt-6">
        <div className="px-2">
          <div className="relative p-8 w-full h-full border border-slate-200 dark:border-slate-800 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]">
            <h1 className="tracking-tighter flex select-none px-3 py-2 flex-col text-center text-7xl font-extrabold leading-none sm:text-8xl md:flex-col lg:flex-row">
              <Plus className="absolute -left-4 -top-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -right-4 -top-4 h-8 w-8 text-indigo-500" />
              <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-indigo-500" />

              <span
                data-content="Develop."
                className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0  before:w-full before:px-2 before:content-[attr(data-content)]  sm:before:top-0"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Develop.
                </span>
              </span>
              <span
                data-content="Preview."
                className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Preview.
                </span>
              </span>
              <span
                data-content="Ship."
                className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Ship.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
lucide-react
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
