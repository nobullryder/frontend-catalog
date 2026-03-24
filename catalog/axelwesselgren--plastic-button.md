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
plastic-button.tsx
import { cn } from "@/lib/utils";

export function PlasticButton({ text }: { text: string; }) {
  return (
    <button
      className={cn(
        "relative inline-block px-4 py-1.75 rounded-full text-white font-medium text-sm transition-all duration-200",
        "bg-gradient-to-b from-blue-500 to-blue-600",
        "active:scale-[0.98] flex justify-center items-center"
      )}
      style={{
        background: `linear-gradient(to bottom, rgb(59, 130, 246), rgb(37, 99, 235))`,
        boxShadow: `0 2px 8px 0 rgba(37, 99, 235, 0.35), 0 1.5px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 8px 0 rgba(37, 99, 235, 0.5) inset`,
      }}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute left-1/2 top-0 z-20 w-[80%] h-2/5 -translate-x-1/2 rounded-t-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%, transparent 100%)",
          filter: "blur(1.5px)",
        }}
      />
      <span
        className="absolute inset-0 z-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 2px rgba(255,255,255,0.10) inset, 0 1.5px 0 0 rgba(255,255,255,0.18) inset, 0 -2px 8px 0 rgba(37, 99, 235, 0.18) inset",
        }}
      />
    </button>
  );
}

code.demo.1749335812699.tsx
import { PlasticButton } from "@/components/ui/plastic-button";

export function Demo() {
  return <PlasticButton text="Click Me" />;
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/plastic-button.tsx
import { cn } from "@/lib/utils";

export function PlasticButton({ text }: { text: string; }) {
  return (
    <button
      className={cn(
        "relative inline-block px-4 py-1.75 rounded-full text-white font-medium text-sm transition-all duration-200",
        "bg-gradient-to-b from-blue-500 to-blue-600",
        "active:scale-[0.98] flex justify-center items-center"
      )}
      style={{
        background: `linear-gradient(to bottom, rgb(59, 130, 246), rgb(37, 99, 235))`,
        boxShadow: `0 2px 8px 0 rgba(37, 99, 235, 0.35), 0 1.5px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 8px 0 rgba(37, 99, 235, 0.5) inset`,
      }}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute left-1/2 top-0 z-20 w-[80%] h-2/5 -translate-x-1/2 rounded-t-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%, transparent 100%)",
          filter: "blur(1.5px)",
        }}
      />
      <span
        className="absolute inset-0 z-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 2px rgba(255,255,255,0.10) inset, 0 1.5px 0 0 rgba(255,255,255,0.18) inset, 0 -2px 8px 0 rgba(37, 99, 235, 0.18) inset",
        }}
      />
    </button>
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
