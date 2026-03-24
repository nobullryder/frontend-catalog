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
stripe-like-gradient-shader.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GradFlow } from 'gradflow'

// Want to create stunning backgrounds and play with the colors and valies check: Check out https://gradflow.meera.dev/

export const Component = () => {

  return (
    <div className="relative h-screen w-full">
      <GradFlow config={{
        color1: { r: 255, g: 255, b: 255 },
        color2: { r: 66, g: 255, b: 233 },
        color3: { r: 129, g: 6, b: 190 },
        speed: 0.4,
        scale: 1,
        type: 'stripe',
        noise: 0.08
      }} />
      {/* Your content here */}
    </div>
  );
};


code.demo.1761130704227.tsx
import { Component } from "@/components/ui/stripe-like-gradient-shader";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stripe-like-gradient-shader.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GradFlow } from 'gradflow'

// Want to create stunning backgrounds and play with the colors and valies check: Check out https://gradflow.meera.dev/

export const Component = () => {

  return (
    <div className="relative h-screen w-full">
      <GradFlow config={{
        color1: { r: 255, g: 255, b: 255 },
        color2: { r: 66, g: 255, b: 233 },
        color3: { r: 129, g: 6, b: 190 },
        speed: 0.4,
        scale: 1,
        type: 'stripe',
        noise: 0.08
      }} />
      {/* Your content here */}
    </div>
  );
};

```

Install NPM dependencies:
```bash
gradflow
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
