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
pixel-button.tsx
import React from 'react';

export const Button02 = ({ text = "Pixel-Tetris" }) => {
  return (
    <a href="#" className="button02 w-inline-block">
      <span className="button02_bg">
        <span className="button02_bg-left">
          {[...Array(8)].map((_, index) => (
            <span key={`left-${index}`} className="button02_bg-pixel"></span>
          ))}
        </span>
        <span className="button02_bg-mid"></span>
        <span className="button02_bg-right">
          {[...Array(8)].map((_, index) => (
            <span key={`right-${index}`} className="button02_bg-pixel"></span>
          ))}
        </span>
      </span>
      <span data-text={text} className="button02_inner">
        <span className="button02_text">{text}</span>
      </span>
    </a>
  );
};


code.demo.1756657821127.tsx
import { Button02 } from "@/components/ui/pixel-button";

export default function DemoOne() {
  return <Button02 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pixel-button.tsx
import React from 'react';

export const Button02 = ({ text = "Pixel-Tetris" }) => {
  return (
    <a href="#" className="button02 w-inline-block">
      <span className="button02_bg">
        <span className="button02_bg-left">
          {[...Array(8)].map((_, index) => (
            <span key={`left-${index}`} className="button02_bg-pixel"></span>
          ))}
        </span>
        <span className="button02_bg-mid"></span>
        <span className="button02_bg-right">
          {[...Array(8)].map((_, index) => (
            <span key={`right-${index}`} className="button02_bg-pixel"></span>
          ))}
        </span>
      </span>
      <span data-text={text} className="button02_inner">
        <span className="button02_text">{text}</span>
      </span>
    </a>
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
