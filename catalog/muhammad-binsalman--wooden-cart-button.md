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
wooden-cart-button.tsx
import React from 'react';

const WoodenCartButton = () => {
  return (
    <button
      className="
        relative inline-flex items-center px-7 py-3 border-none
        bg-gradient-to-b from-[#f5deb3] to-[#deb887] rounded-full
        shadow-[inset_0_5px_10px_rgba(255,255,255,0.5),inset_0_-5px_10px_rgba(0,0,0,0.2),0_5px_15px_rgba(0,0,0,0.3)]
        cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        transform perspective-500 rotate-x-5
        before:content-[''] before:absolute before:inset-0
        before:bg-[linear-gradient(45deg,rgba(139,90,43,0.1)_25%,transparent_25%,transparent_75%,rgba(139,90,43,0.1)_75%)]
        before:bg-[length:10px_10px] before:opacity-50 before:rounded-full
        before:transition-all before:duration-400 before:ease-in
        before:-translate-z-1
        hover:transform hover:perspective-500 hover:rotate-x-0 hover:-translate-y-[3px]
        hover:shadow-[inset_0_6px_12px_rgba(255,255,255,0.6),inset_0_-6px_12px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.35)]
        hover:bg-gradient-to-b hover:from-[#f5e0c0] hover:to-[#e0c49c]
        active:transform active:perspective-500 active:rotate-x-2 active:translate-y-2
        active:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.2)]
        active:bg-gradient-to-b active:from-[#e0c49c] active:to-[#c19a6b]"
    >
      <svg
        viewBox="0 0 24 24"
        className="
          w-6 h-6 mr-2.5 fill-[#5c4033]
          transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          transform translate-z-10
          group-hover:transform group-hover:translate-z-15 group-hover:scale-110 group-hover:rotate-5
          group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]
          group-active:transform group-active:translate-z-5 group-active:scale-90 group-active:-rotate-5
          group-active:drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
      >
        <path
          d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 21.42 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
        />
      </svg>
      <span
        className="
          relative z-10 text-[#5c4033] font-arial font-bold text-base
          transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          transform translate-z-10
          group-hover:transform group-hover:translate-z-15 group-hover:translate-x-1
          group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
          group-active:transform group-active:translate-z-5 group-active:translate-y-px
          group-active:drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
      >
        Add to cart
      </span>
    </button>
  );
};

export default WoodenCartButton;

code.demo.1756884278120.tsx
import WoodenCartButton from "@/components/ui/wooden-cart-button";

export default function DemoOne() {
  return <WoodenCartButton/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wooden-cart-button.tsx
import React from 'react';

const WoodenCartButton = () => {
  return (
    <button
      className="
        relative inline-flex items-center px-7 py-3 border-none
        bg-gradient-to-b from-[#f5deb3] to-[#deb887] rounded-full
        shadow-[inset_0_5px_10px_rgba(255,255,255,0.5),inset_0_-5px_10px_rgba(0,0,0,0.2),0_5px_15px_rgba(0,0,0,0.3)]
        cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        transform perspective-500 rotate-x-5
        before:content-[''] before:absolute before:inset-0
        before:bg-[linear-gradient(45deg,rgba(139,90,43,0.1)_25%,transparent_25%,transparent_75%,rgba(139,90,43,0.1)_75%)]
        before:bg-[length:10px_10px] before:opacity-50 before:rounded-full
        before:transition-all before:duration-400 before:ease-in
        before:-translate-z-1
        hover:transform hover:perspective-500 hover:rotate-x-0 hover:-translate-y-[3px]
        hover:shadow-[inset_0_6px_12px_rgba(255,255,255,0.6),inset_0_-6px_12px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.35)]
        hover:bg-gradient-to-b hover:from-[#f5e0c0] hover:to-[#e0c49c]
        active:transform active:perspective-500 active:rotate-x-2 active:translate-y-2
        active:shadow-[inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.2)]
        active:bg-gradient-to-b active:from-[#e0c49c] active:to-[#c19a6b]"
    >
      <svg
        viewBox="0 0 24 24"
        className="
          w-6 h-6 mr-2.5 fill-[#5c4033]
          transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          transform translate-z-10
          group-hover:transform group-hover:translate-z-15 group-hover:scale-110 group-hover:rotate-5
          group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]
          group-active:transform group-active:translate-z-5 group-active:scale-90 group-active:-rotate-5
          group-active:drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
      >
        <path
          d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 21.42 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
        />
      </svg>
      <span
        className="
          relative z-10 text-[#5c4033] font-arial font-bold text-base
          transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          transform translate-z-10
          group-hover:transform group-hover:translate-z-15 group-hover:translate-x-1
          group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
          group-active:transform group-active:translate-z-5 group-active:translate-y-px
          group-active:drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
      >
        Add to cart
      </span>
    </button>
  );
};

export default WoodenCartButton;
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
