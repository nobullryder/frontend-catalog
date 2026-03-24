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
feature-sections.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <section className="w-full py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>


      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold">Powerful Features</h1>
        <p className="text-sm text-slate-500 mt-2">
          Everything you need to manage, track, and grow your finances, securely and efficiently.
        </p>
      </div>

      {/* Блок карточек */}
      <div className="flex flex-wrap items-start justify-center gap-10">
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Feedback analyser</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">User management</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Better invoicing</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>
      </div>
    </section>
  );
}


code.demo.1757568317457.tsx
import React from "react";

export default function Example() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="relative mx-auto max-w-5xl px-4">
                <div className="absolute -z-50 size-[400px] -top-10 -left-20 aspect-square rounded-full bg-indigo-500/30 blur-3xl"></div>
                <p className="text-slate-800 text-lg text-left max-w-3xl">PrebuiltUI helps you build faster by transforming your design vision into fully functional, production-ready UI components.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
                    <div className="md:col-span-2">
                        <img alt="features showcase" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-4.png" /></div>
                    <div className="md:col-span-1">
                        <img alt="features showcase" className="hover:-translate-y-0.5 transition duration-300" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png" />
                        <h3 className="text-[24px]/7.5 text-slate-800 font-medium mt-6">Better design with highest revenue and profits </h3>
                        <p className="text-slate-600 mt-2">PrebuiltUI empowers you to build beautifully and scale effortlessly.</p>
                        <a href="https://prebuiltui.com" className="group flex items-center gap-2 mt-4 text-indigo-600 hover:text-indigo-700 transition">
                            Learn more about the product
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right size-5 group-hover:translate-x-0.5 transition duration-300" aria-hidden="true">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-sections.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <section className="w-full py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>


      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-semibold">Powerful Features</h1>
        <p className="text-sm text-slate-500 mt-2">
          Everything you need to manage, track, and grow your finances, securely and efficiently.
        </p>
      </div>

      {/* Блок карточек */}
      <div className="flex flex-wrap items-start justify-center gap-10">
        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Feedback analyser</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">User management</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>

        <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
          <img
            className="rounded-xl"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png"
            alt=""
          />
          <h3 className="text-base font-semibold text-slate-700 mt-4">Better invoicing</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>
      </div>
    </section>
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
