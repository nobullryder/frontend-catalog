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
animated-spinner.tsx
"use client"

interface AnimatedSpinnerProps {
  size?: string
  className?: string
}

export function AnimatedSpinner({ size = "10rem", className = "" }: AnimatedSpinnerProps) {
  return (
    <>
      <style jsx>{`
        @property --deg {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: true;
        }

        @property --p {
          syntax: "<percentage>";
          initial-value: 0%;
          inherits: true;
        }

        @property --line-width {
          syntax: "<length>";
          initial-value: 1rem;
          inherits: true;
        }

        .animated-spinner {
          --size: ${size};
          --color: #ffeb3b;
          --color-2: #9c27b0;
          --color-3: #03a9f4;
          width: var(--size);
          background: conic-gradient(
            from var(--deg),
            var(--color),
            var(--color-2),
            var(--color-3),
            transparent var(--p)
          );
          mask: radial-gradient(
            circle,
            transparent calc(var(--size) / 2 - var(--line-width, 1rem)),
            black calc(var(--size) / 2 - var(--line-width, 1rem))
          );
          filter: drop-shadow(1rem 0 2rem var(--color-3));
          border-radius: 50%;
          aspect-ratio: 1;
          animation: rotate 1.1s ease infinite, line-width 3.3s ease infinite;
        }

        @keyframes rotate {
          from {
            --p: 20%;
          }
          50% {
            --p: 50%;
          }
          70% {
            --p: 30%;
          }
          90% {
            --p: 10%;
          }
          to {
            --p: 20%;
            --deg: -360deg;
          }
        }

        @keyframes line-width {
          from, 20%, 70%, to {
            --line-width: 1rem;
          }
          
          50% {
            --line-width: .1rem;
          }
        }
      `}</style>
      <div className={`animated-spinner ${className}`} />
    </>
  )
}


code.demo.1755236725870.tsx
import { AnimatedSpinner } from "@/components/ui/animated-spinner";

export default function DemoOne() {
   return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <AnimatedSpinner />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-spinner.tsx
"use client"

interface AnimatedSpinnerProps {
  size?: string
  className?: string
}

export function AnimatedSpinner({ size = "10rem", className = "" }: AnimatedSpinnerProps) {
  return (
    <>
      <style jsx>{`
        @property --deg {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: true;
        }

        @property --p {
          syntax: "<percentage>";
          initial-value: 0%;
          inherits: true;
        }

        @property --line-width {
          syntax: "<length>";
          initial-value: 1rem;
          inherits: true;
        }

        .animated-spinner {
          --size: ${size};
          --color: #ffeb3b;
          --color-2: #9c27b0;
          --color-3: #03a9f4;
          width: var(--size);
          background: conic-gradient(
            from var(--deg),
            var(--color),
            var(--color-2),
            var(--color-3),
            transparent var(--p)
          );
          mask: radial-gradient(
            circle,
            transparent calc(var(--size) / 2 - var(--line-width, 1rem)),
            black calc(var(--size) / 2 - var(--line-width, 1rem))
          );
          filter: drop-shadow(1rem 0 2rem var(--color-3));
          border-radius: 50%;
          aspect-ratio: 1;
          animation: rotate 1.1s ease infinite, line-width 3.3s ease infinite;
        }

        @keyframes rotate {
          from {
            --p: 20%;
          }
          50% {
            --p: 50%;
          }
          70% {
            --p: 30%;
          }
          90% {
            --p: 10%;
          }
          to {
            --p: 20%;
            --deg: -360deg;
          }
        }

        @keyframes line-width {
          from, 20%, 70%, to {
            --line-width: 1rem;
          }
          
          50% {
            --line-width: .1rem;
          }
        }
      `}</style>
      <div className={`animated-spinner ${className}`} />
    </>
  )
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
