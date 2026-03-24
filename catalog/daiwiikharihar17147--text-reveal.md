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
text-reveal.tsx
'use client';

import { cn } from "@/lib/utils";
import { useState } from 'react';

interface TextRevealProps {
  word?: string;
  className?: string;
}

export default function TextReveal({ word = "Cinematic Reveal", className = "" }: TextRevealProps) {
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={`text-reveal-container ${className}`}>
      
      <div key={key} className="text-wrapper">
        <h1 className="title" aria-label={word}>
          {word.split("").map((char, i) => (
            <span
              key={`${key}-${i}`}
              className="char"
              style={{
                "--index": i,
              } as React.CSSProperties}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      <button className="replay-button" onClick={replay}>
        <span className="btn-text">Replay Animation</span>
        <div className="btn-shine" />
      </button>

      <style jsx>{`
        /* --- THEME VARIABLES --- */
        .text-reveal-container {
          /* Light Mode Defaults (Zinc Theme) */
          --bg-color: #ffffff;
          --text-color: #18181b;      /* Zinc-900 */
          --btn-bg: #f4f4f5;          /* Zinc-100 */
          --btn-text: #18181b;
          --btn-border: #e4e4e7;      /* Zinc-200 */
          --btn-hover: #e4e4e7;
          --shine-color: rgba(0, 0, 0, 0.1);
          --container-border: #e4e4e7;
        }

        /* Dark Mode Overrides (System Preference OR .dark class) */
        @media (prefers-color-scheme: dark) {
          .text-reveal-container {
            --bg-color: #09090b;      /* Zinc-950 */
            --text-color: #fafafa;    /* Zinc-50 */
            --btn-bg: #27272a;        /* Zinc-800 */
            --btn-text: #ffffff;
            --btn-border: #3f3f46;    /* Zinc-700 */
            --btn-hover: #3f3f46;
            --shine-color: rgba(255, 255, 255, 0.15);
            --container-border: #27272a;
          }
        }

        /* Support for manual class-based dark mode (e.g., Tailwind's 'dark' class) */
        :global(.dark) .text-reveal-container {
          --bg-color: #09090b;
          --text-color: #fafafa;
          --btn-bg: #27272a;
          --btn-text: #ffffff;
          --btn-border: #3f3f46;
          --btn-hover: #3f3f46;
          --shine-color: rgba(255, 255, 255, 0.15);
          --container-border: #27272a;
        }

        /* --- Layout & Container --- */
        .text-reveal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          
          /* Use Variables */
          background-color: var(--bg-color); 
          color: var(--text-color);
          border: 1px solid var(--container-border);
          
          border-radius: 12px;
          overflow: hidden;
          min-height: 300px;
          width: 100%;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .text-wrapper {
          position: relative;
          z-index: 10;
        }

        /* --- Typography --- */
        .title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          color: var(--text-color);
          transition: color 0.3s ease;
        }

        /* --- Character Animation --- */
        .char {
          display: inline-block;
          opacity: 0;
          filter: blur(12px);
          transform: translateY(40%) scale(1.1) translateZ(0);
          animation: cinematic-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(0.04s * var(--index));
          will-change: transform, opacity, filter;
        }

        /* --- Button Styles --- */
        .replay-button {
          margin-top: 2.5rem;
          position: relative;
          padding: 0.75rem 1.5rem;
          
          /* Use Variables */
          background-color: var(--btn-bg);
          color: var(--btn-text);
          border: 1px solid var(--btn-border);
          
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          z-index: 20;
        }

        .replay-button:hover {
          background-color: var(--btn-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .replay-button:active {
          transform: translateY(0);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--shine-color),
            transparent
          );
          transform: skewX(-20deg);
          animation: shine 4s infinite;
          pointer-events: none;
        }

        /* --- Keyframes --- */
        @keyframes cinematic-reveal {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(40%) scale(1.1);
          }
          50% {
             opacity: 0.7;
             filter: blur(4px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .char {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

code.demo.1770138202558.tsx
import TextReveal from "@/components/ui/text-reveal";

export default function DemoOne() {
  return (
    // 'bg-zinc-50' for light, 'dark:bg-black' for dark mode
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black p-4 transition-colors">
      <div className="w-full max-w-3xl">
        <TextReveal word="Theme Aware" />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-reveal.tsx
'use client';

import { cn } from "@/lib/utils";
import { useState } from 'react';

interface TextRevealProps {
  word?: string;
  className?: string;
}

export default function TextReveal({ word = "Cinematic Reveal", className = "" }: TextRevealProps) {
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={`text-reveal-container ${className}`}>
      
      <div key={key} className="text-wrapper">
        <h1 className="title" aria-label={word}>
          {word.split("").map((char, i) => (
            <span
              key={`${key}-${i}`}
              className="char"
              style={{
                "--index": i,
              } as React.CSSProperties}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      <button className="replay-button" onClick={replay}>
        <span className="btn-text">Replay Animation</span>
        <div className="btn-shine" />
      </button>

      <style jsx>{`
        /* --- THEME VARIABLES --- */
        .text-reveal-container {
          /* Light Mode Defaults (Zinc Theme) */
          --bg-color: #ffffff;
          --text-color: #18181b;      /* Zinc-900 */
          --btn-bg: #f4f4f5;          /* Zinc-100 */
          --btn-text: #18181b;
          --btn-border: #e4e4e7;      /* Zinc-200 */
          --btn-hover: #e4e4e7;
          --shine-color: rgba(0, 0, 0, 0.1);
          --container-border: #e4e4e7;
        }

        /* Dark Mode Overrides (System Preference OR .dark class) */
        @media (prefers-color-scheme: dark) {
          .text-reveal-container {
            --bg-color: #09090b;      /* Zinc-950 */
            --text-color: #fafafa;    /* Zinc-50 */
            --btn-bg: #27272a;        /* Zinc-800 */
            --btn-text: #ffffff;
            --btn-border: #3f3f46;    /* Zinc-700 */
            --btn-hover: #3f3f46;
            --shine-color: rgba(255, 255, 255, 0.15);
            --container-border: #27272a;
          }
        }

        /* Support for manual class-based dark mode (e.g., Tailwind's 'dark' class) */
        :global(.dark) .text-reveal-container {
          --bg-color: #09090b;
          --text-color: #fafafa;
          --btn-bg: #27272a;
          --btn-text: #ffffff;
          --btn-border: #3f3f46;
          --btn-hover: #3f3f46;
          --shine-color: rgba(255, 255, 255, 0.15);
          --container-border: #27272a;
        }

        /* --- Layout & Container --- */
        .text-reveal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          
          /* Use Variables */
          background-color: var(--bg-color); 
          color: var(--text-color);
          border: 1px solid var(--container-border);
          
          border-radius: 12px;
          overflow: hidden;
          min-height: 300px;
          width: 100%;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .text-wrapper {
          position: relative;
          z-index: 10;
        }

        /* --- Typography --- */
        .title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          color: var(--text-color);
          transition: color 0.3s ease;
        }

        /* --- Character Animation --- */
        .char {
          display: inline-block;
          opacity: 0;
          filter: blur(12px);
          transform: translateY(40%) scale(1.1) translateZ(0);
          animation: cinematic-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(0.04s * var(--index));
          will-change: transform, opacity, filter;
        }

        /* --- Button Styles --- */
        .replay-button {
          margin-top: 2.5rem;
          position: relative;
          padding: 0.75rem 1.5rem;
          
          /* Use Variables */
          background-color: var(--btn-bg);
          color: var(--btn-text);
          border: 1px solid var(--btn-border);
          
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          z-index: 20;
        }

        .replay-button:hover {
          background-color: var(--btn-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .replay-button:active {
          transform: translateY(0);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--shine-color),
            transparent
          );
          transform: skewX(-20deg);
          animation: shine 4s infinite;
          pointer-events: none;
        }

        /* --- Keyframes --- */
        @keyframes cinematic-reveal {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(40%) scale(1.1);
          }
          50% {
             opacity: 0.7;
             filter: blur(4px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .char {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            animation: none !important;
          }
        }
      `}</style>
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
