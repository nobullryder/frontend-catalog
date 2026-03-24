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
background-gradient-snippet.tsx
export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#38bdf8,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#38bdf820_1px,transparent_1px),linear-gradient(to_bottom,#38bdf820_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
  );
}


code.demo.1756797835870.tsx
export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db33_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db33_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-20 blur-[120px]" />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/background-gradient-snippet.tsx
export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#38bdf8,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#38bdf820_1px,transparent_1px),linear-gradient(to_bottom,#38bdf820_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
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
