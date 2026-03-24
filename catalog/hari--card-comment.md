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
card-comment.tsx
interface ComponentProps {
  commenter: string;
  replier: string;
}

export const Component = ({ commenter, replier }: ComponentProps) => {
  return (
    <div className="storybook-fix group mx-auto h-48 w-full max-w-md rounded-xl bg-white p-4 shadow">
      <div className="relative flex h-40 flex-col space-y-4 overflow-hidden rounded-md bg-neutral-50 text-black shadow-sm hover:shadow-lg">
        <div className="h-fit p-4 transition-all group-hover:-translate-y-1/3">
          <h3 className="text-sm font-semibold">{commenter} commented</h3>
          <div className="my-2 h-3 w-full animate-pulse rounded-md bg-neutral-300" />
          <div className="my-2 h-3 w-2/5 animate-pulse rounded-md bg-neutral-300" />
        </div>

        <div className="w-full px-4 opacity-0 transition-all group-hover:-translate-y-1/3 group-hover:opacity-100">
          <div className="h-40 w-full rounded-md bg-green-500 p-4">
            <h3 className="text-sm font-semibold text-white">{replier} replied</h3>
            <div className="line my-2 h-3 w-full animate-pulse rounded-lg bg-white/50" />
            <div className="line my-2 h-3 w-full animate-pulse rounded-lg bg-white/50" />
            <div className="line2 my-2 h-3 w-2/5 animate-pulse rounded-lg bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

code.demo.1750177692885.tsx
// This is a demo of a preview
import React from "react";
import { Component } from "@/components/ui/card-comment";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component commenter="Alice" replier="Bob" />
    </div>
  );
};

export default DemoOne;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-comment.tsx
interface ComponentProps {
  commenter: string;
  replier: string;
}

export const Component = ({ commenter, replier }: ComponentProps) => {
  return (
    <div className="storybook-fix group mx-auto h-48 w-full max-w-md rounded-xl bg-white p-4 shadow">
      <div className="relative flex h-40 flex-col space-y-4 overflow-hidden rounded-md bg-neutral-50 text-black shadow-sm hover:shadow-lg">
        <div className="h-fit p-4 transition-all group-hover:-translate-y-1/3">
          <h3 className="text-sm font-semibold">{commenter} commented</h3>
          <div className="my-2 h-3 w-full animate-pulse rounded-md bg-neutral-300" />
          <div className="my-2 h-3 w-2/5 animate-pulse rounded-md bg-neutral-300" />
        </div>

        <div className="w-full px-4 opacity-0 transition-all group-hover:-translate-y-1/3 group-hover:opacity-100">
          <div className="h-40 w-full rounded-md bg-green-500 p-4">
            <h3 className="text-sm font-semibold text-white">{replier} replied</h3>
            <div className="line my-2 h-3 w-full animate-pulse rounded-lg bg-white/50" />
            <div className="line my-2 h-3 w-full animate-pulse rounded-lg bg-white/50" />
            <div className="line2 my-2 h-3 w-2/5 animate-pulse rounded-lg bg-white/50" />
          </div>
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
