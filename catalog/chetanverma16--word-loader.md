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
word-loader.tsx

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface WordLoaderProps {
words?: string[];
className?: string;
}

const WordLoader: React.FC<WordLoaderProps> = ({
words = [
  "branding",
  "design",
  "development",
  "ecommerce",
  "mobile apps",
  "packaging",
],
className,
}) => {
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    const tl = gsap.timeline({ repeat: -1 });
    const wordDelay = 0.3; // Delay between words
    const wordDuration = 0.8; // Total duration per word (in + out)

    // Animate each word with blur in/out effect
    words.forEach((_, index) => {
      const startTime = index * (wordDuration + wordDelay);

      // Animate characters in
      tl.fromTo(
        `.word-${index} .char`,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        startTime
      );

      // Animate characters out
      tl.to(
        `.word-${index} .char`,
        {
          opacity: 0,
          y: -5,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
        },
        startTime + 0.5
      );
    });
  },
  { scope: containerRef, dependencies: [words] }
);

return (
  <div
    ref={containerRef}
    className={cn("flex flex-col gap-y-6 w-full", className)}
  >
    <div className="relative h-12 flex items-center justify-center">
      {words.map((word, index) => (
        <span
          key={index}
          className={`word-${index} absolute text-xl tracking-wider font-bold flex gap-x-1`}
        >
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="char">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);
};

export default WordLoader;


code.demo.1760464429711.tsx
import WordLoader from "@/components/ui/word-loader";

export default function DemoOne() {
  return <WordLoader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/word-loader.tsx

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface WordLoaderProps {
words?: string[];
className?: string;
}

const WordLoader: React.FC<WordLoaderProps> = ({
words = [
  "branding",
  "design",
  "development",
  "ecommerce",
  "mobile apps",
  "packaging",
],
className,
}) => {
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    const tl = gsap.timeline({ repeat: -1 });
    const wordDelay = 0.3; // Delay between words
    const wordDuration = 0.8; // Total duration per word (in + out)

    // Animate each word with blur in/out effect
    words.forEach((_, index) => {
      const startTime = index * (wordDuration + wordDelay);

      // Animate characters in
      tl.fromTo(
        `.word-${index} .char`,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        startTime
      );

      // Animate characters out
      tl.to(
        `.word-${index} .char`,
        {
          opacity: 0,
          y: -5,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
        },
        startTime + 0.5
      );
    });
  },
  { scope: containerRef, dependencies: [words] }
);

return (
  <div
    ref={containerRef}
    className={cn("flex flex-col gap-y-6 w-full", className)}
  >
    <div className="relative h-12 flex items-center justify-center">
      {words.map((word, index) => (
        <span
          key={index}
          className={`word-${index} absolute text-xl tracking-wider font-bold flex gap-x-1`}
        >
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="char">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);
};

export default WordLoader;

```

Install NPM dependencies:
```bash
gsap, @gsap/react
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
