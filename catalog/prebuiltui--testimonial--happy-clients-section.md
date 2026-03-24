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
testimonial.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                    </div>
                </div>
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                    </div>
                </div>
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                    </div>
                </div>
            </div>
        </>
    );
};

code.demo.1757777696462.tsx
export default function Example() {
    return (
        <div className="flex flex-col items-center text-slate-800">
            <h2 className="text-3xl font-medium mb-10">
                Happy
                <span className="text-indigo-500 font-bold">
                    Clients
                </span>
            </h2>
            <div className="flex items-center -space-x-3">
                <div className="relative group flex flex-col items-center">
                    <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">Michael</p>
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                        className="w-20 h-20 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110" />
                </div>
                <div className="relative group flex flex-col items-center">
                    <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">James</p>
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                        className="w-20 h-20 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110" />
                </div>
                <div className="relative group flex flex-col items-center">
                    <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">Emily</p>
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                        alt="image" className="w-20 h-20 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110" />
                </div>
                <div className="relative group flex flex-col items-center">
                    <p className="opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition duration-300 mb-3 px-2 py-1 text-sm font-medium">John</p>
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="image"
                        className="w-20 h-20 rounded-full border-4 border-white hover:-translate-y-1 transition hover:scale-110" />
                </div>
            </div>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonial.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                    </div>
                </div>
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
                    </div>
                </div>
                <div className="max-w-80 bg-black text-white rounded-2xl">
                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop" alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                    </div>
                    <div className="px-4 pb-4">
                        <p className="font-medium border-b border-gray-600 pb-5">“Radiant made undercutting all of our competitors an absolute breeze.”</p>
                        <p className="mt-4">— John Doe</p>
                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">Content Marketing</p>
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
