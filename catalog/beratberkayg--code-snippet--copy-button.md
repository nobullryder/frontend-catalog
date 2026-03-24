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
code-snippet.tsx
import { CopyButton } from "@/demos/copyButton";



export const Component = () => {

  return (
    <div  className= "relative" >
    <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border rounded-t-lg w-[300px]" >
      <div className="flex space-x-2" >
        <div className="h-3 w-3 rounded-full bg-red-500" > </div>
          < div className = "h-3 w-3 rounded-full bg-yellow-500" > </div>
            < div className = "h-3 w-3 rounded-full bg-green-500" > </div>
              < /div>
              < CopyButton value = { "https://uicat.vercel.app/"} />
                </div>
                < pre className = "p-4 rounded-b-lg bg-muted border-x border-b overflow-x-auto font-mono" >
                  <code className="text-sm font-mono" >
                    { "https://uicat.vercel.app/"}
                    < /code>
                    < /pre>
                    < /div>
  );
};


code.demo.1752780235267.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
   // await navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
      {hasCopied ? (
        <CheckIcon className="h-4 w-4" color="green" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/code-snippet.tsx
import { CopyButton } from "@/demos/copyButton";



export const Component = () => {

  return (
    <div  className= "relative" >
    <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border rounded-t-lg w-[300px]" >
      <div className="flex space-x-2" >
        <div className="h-3 w-3 rounded-full bg-red-500" > </div>
          < div className = "h-3 w-3 rounded-full bg-yellow-500" > </div>
            < div className = "h-3 w-3 rounded-full bg-green-500" > </div>
              < /div>
              < CopyButton value = { "https://uicat.vercel.app/"} />
                </div>
                < pre className = "p-4 rounded-b-lg bg-muted border-x border-b overflow-x-auto font-mono" >
                  <code className="text-sm font-mono" >
                    { "https://uicat.vercel.app/"}
                    < /code>
                    < /pre>
                    < /div>
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
