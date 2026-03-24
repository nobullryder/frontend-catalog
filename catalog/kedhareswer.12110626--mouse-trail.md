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
mouse-trail.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { ImageTrailController } from '@/lib/utils';

const flairImages = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

export function MouseTrailComponent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ImageTrailController | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const flairElements = Array.from(
      contentRef.current.querySelectorAll('.flair')
    ) as HTMLElement[];

    const controller = new ImageTrailController(flairElements, 100);
    controllerRef.current = controller;
    controller.init();

    const handleMouseMove = (e: MouseEvent) => {
      controller.setMousePos(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      controller.destroy();
    };
  }, []);

  return (
    <>
      <p>wiggle your mouse around.</p>
      <div className="content" ref={contentRef}>
        {flairImages.map((src, index) => (
          <img
            key={index}
            className="flair"
            src={src}
            alt=""
          />
        ))}
      </div>
    </>
  );
}


code.demo.1759682904404.tsx
'use client';

import { MouseTrailComponent } from '@/components/ui/mouse-trail';

export default function DefaultDemo() {
  return (
    <div className="demo-container">
      <MouseTrailComponent />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/mouse-trail.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { ImageTrailController } from '@/lib/utils';

const flairImages = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

export function MouseTrailComponent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ImageTrailController | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const flairElements = Array.from(
      contentRef.current.querySelectorAll('.flair')
    ) as HTMLElement[];

    const controller = new ImageTrailController(flairElements, 100);
    controllerRef.current = controller;
    controller.init();

    const handleMouseMove = (e: MouseEvent) => {
      controller.setMousePos(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      controller.destroy();
    };
  }, []);

  return (
    <>
      <p>wiggle your mouse around.</p>
      <div className="content" ref={contentRef}>
        {flairImages.map((src, index) => (
          <img
            key={index}
            className="flair"
            src={src}
            alt=""
          />
        ))}
      </div>
    </>
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
