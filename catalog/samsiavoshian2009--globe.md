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
globe.tsx
// Component.tsx
import { cn } from "@/lib/utils";

export const Component = () => {
  return (
    <div
      className={cn(
        "relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl p-8 md:p-12 border backdrop-blur",
        // Light mode
        "bg-white/90 border-neutral-200 text-black",
        // Dark mode
        "dark:bg-neutral-900/90 dark:border-neutral-800 dark:text-white"
      )}
    >
      {/* Ambient glow (adapts) */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/20" />

      <div className="relative flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Top-level performance
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Made for static sites while avoiding heavy assets, your website will
          feel snappy and load instantly.
        </p>

        {/* Globe illustration */}
        <div className="mt-10 h-64 w-64 md:h-80 md:w-80 overflow-hidden">
          <svg
            viewBox="0 0 300 300"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow hub - adaptive to theme */}
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="rgba(34,211,238,0.9)" // cyan‑500
                />
                <stop
                  offset="100%"
                  stopColor="rgba(59,130,246,0.1)" // blue‑500 faint
                />
              </radialGradient>
              {/* Line trail gradients - dark mode */}
              <linearGradient id="trailBright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />{/* cyan-400 */}
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />{/* indigo-500 */}
              </linearGradient>
              <linearGradient id="trailDim" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
              {/* Light mode gradients */}
              <linearGradient id="trailBrightLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />{/* cyan-600 */}
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.6" />{/* indigo-600 */}
              </linearGradient>
              <linearGradient id="trailDimLight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Enhanced globe group - no rotation */}
            <g>
              {/* Latitude lines - enhanced visibility */}
              {[...Array(6)].map((_, i) => (
                <ellipse
                  key={`lat-${i}`}
                  cx="150"
                  cy="150"
                  rx={120}
                  ry={40 + i * 12}
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="5 5"
                  style={{ animation: "flowAnimation 10s linear infinite" }}
                  opacity={0.8}
                  transform="rotate(-25,150,150)"
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Longitude lines - enhanced visibility */}
              {[...Array(8)].map((_, i) => (
                <path
                  key={`lon-${i}`}
                  d="M150,30 A120,120 0 0,1 150,270"
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="4 4"
                  style={{ animation: "flowAnimation 12s linear infinite reverse" }}
                  opacity={0.8}
                  transform={`rotate(${i * 22.5},150,150)`}
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Orbital trails - enhanced visibility */}
              <ellipse
                cx="150"
                cy="150"
                rx="140"
                ry="60"
                stroke="url(#trailBright)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 10"
                style={{ animation: "flowAnimation 14s linear infinite" }}
                opacity="1"
                transform="rotate(20,150,150)"
                className="dark:stroke-[url(#trailBright)] stroke-[url(#trailBrightLight)]"
              />
              <ellipse
                cx="150"
                cy="150"
                rx="130"
                ry="50"
                stroke="url(#trailDim)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="12 12"
                style={{ animation: "flowAnimation 9s linear infinite reverse" }}
                opacity="0.9"
                transform="rotate(-40,150,150)"
                className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
              />

            </g>
          </svg>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes flowAnimation {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
};


code.demo.1757479246975.tsx
import { Component } from "@/components/ui/globe";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/globe.tsx
// Component.tsx
import { cn } from "@/lib/utils";

export const Component = () => {
  return (
    <div
      className={cn(
        "relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl p-8 md:p-12 border backdrop-blur",
        // Light mode
        "bg-white/90 border-neutral-200 text-black",
        // Dark mode
        "dark:bg-neutral-900/90 dark:border-neutral-800 dark:text-white"
      )}
    >
      {/* Ambient glow (adapts) */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/20" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/20" />

      <div className="relative flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Top-level performance
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Made for static sites while avoiding heavy assets, your website will
          feel snappy and load instantly.
        </p>

        {/* Globe illustration */}
        <div className="mt-10 h-64 w-64 md:h-80 md:w-80 overflow-hidden">
          <svg
            viewBox="0 0 300 300"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow hub - adaptive to theme */}
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="rgba(34,211,238,0.9)" // cyan‑500
                />
                <stop
                  offset="100%"
                  stopColor="rgba(59,130,246,0.1)" // blue‑500 faint
                />
              </radialGradient>
              {/* Line trail gradients - dark mode */}
              <linearGradient id="trailBright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />{/* cyan-400 */}
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />{/* indigo-500 */}
              </linearGradient>
              <linearGradient id="trailDim" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
              {/* Light mode gradients */}
              <linearGradient id="trailBrightLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />{/* cyan-600 */}
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.6" />{/* indigo-600 */}
              </linearGradient>
              <linearGradient id="trailDimLight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Enhanced globe group - no rotation */}
            <g>
              {/* Latitude lines - enhanced visibility */}
              {[...Array(6)].map((_, i) => (
                <ellipse
                  key={`lat-${i}`}
                  cx="150"
                  cy="150"
                  rx={120}
                  ry={40 + i * 12}
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="5 5"
                  style={{ animation: "flowAnimation 10s linear infinite" }}
                  opacity={0.8}
                  transform="rotate(-25,150,150)"
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Longitude lines - enhanced visibility */}
              {[...Array(8)].map((_, i) => (
                <path
                  key={`lon-${i}`}
                  d="M150,30 A120,120 0 0,1 150,270"
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="4 4"
                  style={{ animation: "flowAnimation 12s linear infinite reverse" }}
                  opacity={0.8}
                  transform={`rotate(${i * 22.5},150,150)`}
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Orbital trails - enhanced visibility */}
              <ellipse
                cx="150"
                cy="150"
                rx="140"
                ry="60"
                stroke="url(#trailBright)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 10"
                style={{ animation: "flowAnimation 14s linear infinite" }}
                opacity="1"
                transform="rotate(20,150,150)"
                className="dark:stroke-[url(#trailBright)] stroke-[url(#trailBrightLight)]"
              />
              <ellipse
                cx="150"
                cy="150"
                rx="130"
                ry="50"
                stroke="url(#trailDim)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="12 12"
                style={{ animation: "flowAnimation 9s linear infinite reverse" }}
                opacity="0.9"
                transform="rotate(-40,150,150)"
                className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
              />

            </g>
          </svg>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes flowAnimation {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
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
