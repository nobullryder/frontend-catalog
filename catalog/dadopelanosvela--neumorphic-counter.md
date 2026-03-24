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
neumorphic-counter.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);
  const [isPressed, setIsPressed] = useState({ minus: false, plus: false });

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
      <div className={cn(
        "flex flex-col items-center gap-8 p-8 rounded-3xl",

        "bg-gray-200 shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff]"
      )}>
       
        <div className={cn(
          "px-6 py-3 rounded-2xl",
          "bg-gray-200 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
        )}>
          <h1 className="text-2xl font-bold text-gray-700 mb-1">neumorphic counter</h1>
          <p className="text-sm text-gray-500 text-center">Neumorphic design example</p>
        </div>

        
        <div className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center",
          "bg-gray-200 shadow-[inset_15px_15px_30px_#bebebe,inset_-15px_-15px_30px_#ffffff]"
        )}>
          <h2 className="text-4xl font-bold text-gray-600">{count}</h2>
        </div>

        
        <div className="flex gap-6">
          
          <button
            onMouseDown={() => setIsPressed(prev => ({ ...prev, minus: true }))}
            onMouseUp={() => setIsPressed(prev => ({ ...prev, minus: false }))}
            onMouseLeave={() => setIsPressed(prev => ({ ...prev, minus: false }))}
            onClick={() => setCount((prev) => prev - 1)}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600",
              "bg-gray-200 transition-all duration-150 ease-in-out",
              "hover:text-red-500",
              isPressed.minus 
                ? "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]" 
                : "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#bebebe,-12px_-12px_20px_#ffffff]"
            )}
          >
            −
          </button>

          
          <button
            onMouseDown={() => setIsPressed(prev => ({ ...prev, plus: true }))}
            onMouseUp={() => setIsPressed(prev => ({ ...prev, plus: false }))}
            onMouseLeave={() => setIsPressed(prev => ({ ...prev, plus: false }))}
            onClick={() => setCount((prev) => prev + 1)}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600",
              "bg-gray-200 transition-all duration-150 ease-in-out",
              "hover:text-green-500",
              isPressed.plus 
                ? "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]" 
                : "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#bebebe,-12px_-12px_20px_#ffffff]"
            )}
          >
            +
          </button>
        </div>

        
        <button
          onClick={() => setCount(0)}
          className={cn(
            "px-8 py-3 rounded-2xl text-gray-600 font-medium",
            "bg-gray-200 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]",
            "hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]",
            "active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]",
            "transition-all duration-150 ease-in-out",
            "hover:text-blue-500"
          )}
        >
          Restart
        </button>

        
        <div className="flex gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-4 h-4 rounded-full",
                "bg-gray-200 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

code.demo.1756699209149.tsx
import { Component } from "@/components/ui/neumorphic-counter";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/neumorphic-counter.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);
  const [isPressed, setIsPressed] = useState({ minus: false, plus: false });

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
      <div className={cn(
        "flex flex-col items-center gap-8 p-8 rounded-3xl",

        "bg-gray-200 shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff]"
      )}>
       
        <div className={cn(
          "px-6 py-3 rounded-2xl",
          "bg-gray-200 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]"
        )}>
          <h1 className="text-2xl font-bold text-gray-700 mb-1">neumorphic counter</h1>
          <p className="text-sm text-gray-500 text-center">Neumorphic design example</p>
        </div>

        
        <div className={cn(
          "w-32 h-32 rounded-full flex items-center justify-center",
          "bg-gray-200 shadow-[inset_15px_15px_30px_#bebebe,inset_-15px_-15px_30px_#ffffff]"
        )}>
          <h2 className="text-4xl font-bold text-gray-600">{count}</h2>
        </div>

        
        <div className="flex gap-6">
          
          <button
            onMouseDown={() => setIsPressed(prev => ({ ...prev, minus: true }))}
            onMouseUp={() => setIsPressed(prev => ({ ...prev, minus: false }))}
            onMouseLeave={() => setIsPressed(prev => ({ ...prev, minus: false }))}
            onClick={() => setCount((prev) => prev - 1)}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600",
              "bg-gray-200 transition-all duration-150 ease-in-out",
              "hover:text-red-500",
              isPressed.minus 
                ? "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]" 
                : "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#bebebe,-12px_-12px_20px_#ffffff]"
            )}
          >
            −
          </button>

          
          <button
            onMouseDown={() => setIsPressed(prev => ({ ...prev, plus: true }))}
            onMouseUp={() => setIsPressed(prev => ({ ...prev, plus: false }))}
            onMouseLeave={() => setIsPressed(prev => ({ ...prev, plus: false }))}
            onClick={() => setCount((prev) => prev + 1)}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600",
              "bg-gray-200 transition-all duration-150 ease-in-out",
              "hover:text-green-500",
              isPressed.plus 
                ? "shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]" 
                : "shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#bebebe,-12px_-12px_20px_#ffffff]"
            )}
          >
            +
          </button>
        </div>

        
        <button
          onClick={() => setCount(0)}
          className={cn(
            "px-8 py-3 rounded-2xl text-gray-600 font-medium",
            "bg-gray-200 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]",
            "hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]",
            "active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]",
            "transition-all duration-150 ease-in-out",
            "hover:text-blue-500"
          )}
        >
          Restart
        </button>

        
        <div className="flex gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-4 h-4 rounded-full",
                "bg-gray-200 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
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
