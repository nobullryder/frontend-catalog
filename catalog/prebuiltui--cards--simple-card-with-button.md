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
cards.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Контейнер с колонкой */}
      <div className="flex flex-col items-center w-full">
        {/* Заголовок сверху */}
        <h1 className="text-3xl font-semibold">Latest Blog</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg text-center">
          Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
        </p>

        {/* Карточки */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Color Psychology in UI: How to Choose the Right Palette
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Understanding Typography: Crafting a Visual Voice for Your Brand
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Branding</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Design Thinking in Practice: How to Solve Real User Problems
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Product Design</p>
          </div>
        </div>
      </div>
    </>
  );
}


code.demo.1757563124378.tsx
import React from "react";


export default function Example() {
    return (
        <div className="p-4 bg-white rounded-lg shadow text-sm max-w-80">
            <img className="rounded-md max-h-40 w-full object-cover" src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400" alt="officeImage" />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">Your Card Title</p>
            <p className="text-gray-500 mt-3 ml-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..</p>
            <button type="button" className="bg-indigo-600 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">Learn More</button>
        </div>
    );
};


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cards.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Контейнер с колонкой */}
      <div className="flex flex-col items-center w-full">
        {/* Заголовок сверху */}
        <h1 className="text-3xl font-semibold">Latest Blog</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg text-center">
          Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
        </p>

        {/* Карточки */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Color Psychology in UI: How to Choose the Right Palette
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Understanding Typography: Crafting a Visual Voice for Your Brand
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Branding</p>
          </div>

          <div className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
              alt=""
            />
            <h3 className="text-base text-slate-900 font-medium mt-3">
              Design Thinking in Practice: How to Solve Real User Problems
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Product Design</p>
          </div>
        </div>
      </div>
    </>
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
