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
sending-loader.tsx
import React from 'react';

interface TerminalLoaderProps {
  text?: string;
  className?: string;
}

export const Component: React.FC<TerminalLoaderProps> = ({ 
  text = "Sending...", 
  className = "" 
}) => {
  return (
    <div className={`terminal-loader relative bg-gray-900 border border-gray-600 font-mono text-base p-6 pt-4 w-48 shadow-lg rounded border-opacity-80 overflow-hidden ${className}`}>
      <div className="terminal-header absolute top-0 left-0 right-0 h-6 bg-gray-700 rounded-t px-2 flex items-center justify-between">
        <div className="terminal-title text-gray-200 text-sm leading-6">
          Status
        </div>
        <div className="terminal-controls flex gap-2">
          <div className="control close w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="control minimize w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="control maximize w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="text text-green-400 inline-block whitespace-nowrap overflow-hidden mt-6">
        {text}
      </div>
    </div>
  );
};


code.demo.1755029016439.tsx
import { Component } from "@/components/ui/sending-loader";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sending-loader.tsx
import React from 'react';

interface TerminalLoaderProps {
  text?: string;
  className?: string;
}

export const Component: React.FC<TerminalLoaderProps> = ({ 
  text = "Sending...", 
  className = "" 
}) => {
  return (
    <div className={`terminal-loader relative bg-gray-900 border border-gray-600 font-mono text-base p-6 pt-4 w-48 shadow-lg rounded border-opacity-80 overflow-hidden ${className}`}>
      <div className="terminal-header absolute top-0 left-0 right-0 h-6 bg-gray-700 rounded-t px-2 flex items-center justify-between">
        <div className="terminal-title text-gray-200 text-sm leading-6">
          Status
        </div>
        <div className="terminal-controls flex gap-2">
          <div className="control close w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="control minimize w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="control maximize w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="text text-green-400 inline-block whitespace-nowrap overflow-hidden mt-6">
        {text}
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
