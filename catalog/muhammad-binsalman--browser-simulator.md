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
browser-simulator.tsx
import React from 'react';

const Browser = () => {
  return (
    <div 
      className="w-[300px] h-[250px] bg-neutral-100 rounded-lg flex flex-col overflow-hidden relative"
      style={{ boxShadow: '5px 5px 10px rgba(31, 31, 31, 0.245)' }}
    >
      {/* Tabs Header */}
      <div className="bg-[#353535] h-[40px] flex justify-between items-end pl-5">
        <div className="flex">
          <div className="relative w-[100px] h-[34px] rounded-tl-[7px] rounded-tr-[7px] bg-[#515151] flex items-start justify-between gap-1 p-[4px_8px]">
            {/* Right Mask */}
            <div className="absolute top-0 right-0 h-[24px] w-[20px] translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 0 7px' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            {/* Left Mask */}
            <div className="absolute top-0 left-0 h-[24px] w-[20px] -translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 7px 0' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            <span className="text-white text-[10px]">21st.dev</span>
            <div className="text-white text-[9px] p-[1px_4px] rounded-full cursor-default hover:bg-[#5d5d5d]">✕</div>
          </div>
        </div>
        
        <div className="flex">
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#515151c8]">-</button>
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#515151c8]">□</button>
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#ff3434]">✕</button>
        </div>
      </div>
      
      {/* Browser Header */}
      <div className="absolute top-[30px] w-full h-[40px] bg-[#515151] p-[7px] flex gap-[5px] rounded-tl-[7px] rounded-tr-[7px]">
        <button className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d]">←</button>
        <button disabled className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 opacity-40 hover:bg-transparent">→</button>
        <input 
          type="text" 
          placeholder="Search Google or type URL" 
          value="21st.dev"
          className="bg-[#3b3b3b] text-sm border-2 border-transparent h-full rounded-full outline-none text-white px-[15px] flex-1 transition ease-in-out duration-200 hover:bg-[#5d5d5d] focus:border-[#add6ff] focus:bg-[#3b3b3b] focus:transition-none placeholder-white"
        />
        <button className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d]">⋮</button>
        <button className="text-white absolute right-[45px] top-1/2 -translate-y-1/2 text-[15px] opacity-70 h-[18px] w-[19px] flex items-center justify-center pb-[3px]">✰</button>
      </div>
    </div>
  );
};

export {Browser};

code.demo.1755450859925.tsx
import { Browser } from "@/components/ui/browser-simulator";

export default function DemoOne() {
  return <Browser />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/browser-simulator.tsx
import React from 'react';

const Browser = () => {
  return (
    <div 
      className="w-[300px] h-[250px] bg-neutral-100 rounded-lg flex flex-col overflow-hidden relative"
      style={{ boxShadow: '5px 5px 10px rgba(31, 31, 31, 0.245)' }}
    >
      {/* Tabs Header */}
      <div className="bg-[#353535] h-[40px] flex justify-between items-end pl-5">
        <div className="flex">
          <div className="relative w-[100px] h-[34px] rounded-tl-[7px] rounded-tr-[7px] bg-[#515151] flex items-start justify-between gap-1 p-[4px_8px]">
            {/* Right Mask */}
            <div className="absolute top-0 right-0 h-[24px] w-[20px] translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 0 7px' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            {/* Left Mask */}
            <div className="absolute top-0 left-0 h-[24px] w-[20px] -translate-x-full overflow-hidden bg-[#515151]">
              <div style={{ borderRadius: '0 0 7px 0' }} className="w-full h-full bg-[#353535]"></div>
            </div>
            
            <span className="text-white text-[10px]">21st.dev</span>
            <div className="text-white text-[9px] p-[1px_4px] rounded-full cursor-default hover:bg-[#5d5d5d]">✕</div>
          </div>
        </div>
        
        <div className="flex">
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#515151c8]">-</button>
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#515151c8]">□</button>
          <button className="h-[30px] w-[30px] border-none bg-transparent transition ease-out duration-100 text-white mb-[10px] hover:bg-[#ff3434]">✕</button>
        </div>
      </div>
      
      {/* Browser Header */}
      <div className="absolute top-[30px] w-full h-[40px] bg-[#515151] p-[7px] flex gap-[5px] rounded-tl-[7px] rounded-tr-[7px]">
        <button className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d]">←</button>
        <button disabled className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 opacity-40 hover:bg-transparent">→</button>
        <input 
          type="text" 
          placeholder="Search Google or type URL" 
          value="21st.dev"
          className="bg-[#3b3b3b] text-sm border-2 border-transparent h-full rounded-full outline-none text-white px-[15px] flex-1 transition ease-in-out duration-200 hover:bg-[#5d5d5d] focus:border-[#add6ff] focus:bg-[#3b3b3b] focus:transition-none placeholder-white"
        />
        <button className="w-[27px] h-[25px] border-none bg-transparent text-white rounded-full transition ease-in-out duration-200 hover:bg-[#5d5d5d]">⋮</button>
        <button className="text-white absolute right-[45px] top-1/2 -translate-y-1/2 text-[15px] opacity-70 h-[18px] w-[19px] flex items-center justify-center pb-[3px]">✰</button>
      </div>
    </div>
  );
};

export {Browser};
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
