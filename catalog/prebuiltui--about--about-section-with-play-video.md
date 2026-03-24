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
about.tsx
"use client";

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
            <h1 className="text-3xl font-semibold text-center mx-auto">About our apps</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                A visual collection of our most recent works - each piece crafted with intention, emotion and style.
            </p>
            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-16">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Lightning-Fast Performance</h3>
                        <p className="text-sm text-slate-500">Built with speed — minimal load times and optimized.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Beautifully Designed Components</h3>
                        <p className="text-sm text-slate-500">Modern, pixel-perfect UI components ready for any project.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Plug-and-Play Integration</h3>
                        <p className="text-sm text-slate-500">Simple setup with support for React, Next.js and Tailwind css.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/bookEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Clear & Comprehensive</h3>
                        <p className="text-sm text-slate-500">Get started fast with usage examples, live previews and code.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/boxEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Fully Customizable</h3>
                        <p className="text-sm text-slate-500">Easily adapt styles, colors and layout to match your brand or product.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/brainEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Accessibility First</h3>
                        <p className="text-sm text-slate-500">Built with WCAG standards in mind to ensure inclusive user experiences.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

code.demo.1757058416898.tsx
"use client";

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
            <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
                <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
                        alt="" />
                    <div className="gap-1 max-w-72 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white size-16 flex items-center justify-center aspect-square backdrop-blur rounded-full">
                        <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z"
                                fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-slate-700">What we do?</h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
                    <p className="mt-8">PrebuiltUI helps you build faster by transforming your design vision into fully functional,
                        production-ready UI components. </p>
                    <p className="mt-4">Whether you're launching a SaaS app, landing page or dashboard, our collection of Tailwind
                        CSS components is crafted to boost your development speed and improve user experience.</p>
                    <p className="mt-4">From UI design systems to automation-ready layouts, PrebuiltUI empowers you to build
                        beautifully and scale effortlessly.</p>
                    <button
                        className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white">
                        <span>Read more</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#fff" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/about.tsx
"use client";

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
            <h1 className="text-3xl font-semibold text-center mx-auto">About our apps</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                A visual collection of our most recent works - each piece crafted with intention, emotion and style.
            </p>
            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-16">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Lightning-Fast Performance</h3>
                        <p className="text-sm text-slate-500">Built with speed — minimal load times and optimized.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Beautifully Designed Components</h3>
                        <p className="text-sm text-slate-500">Modern, pixel-perfect UI components ready for any project.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Plug-and-Play Integration</h3>
                        <p className="text-sm text-slate-500">Simple setup with support for React, Next.js and Tailwind css.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/bookEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Clear & Comprehensive</h3>
                        <p className="text-sm text-slate-500">Get started fast with usage examples, live previews and code.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/boxEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Fully Customizable</h3>
                        <p className="text-sm text-slate-500">Easily adapt styles, colors and layout to match your brand or product.</p>
                    </div>
                </div>
                <div>
                    <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/brainEmoji.png" alt="" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium text-slate-600">Accessibility First</h3>
                        <p className="text-sm text-slate-500">Built with WCAG standards in mind to ensure inclusive user experiences.</p>
                    </div>
                </div>
            </div>
        </>
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
