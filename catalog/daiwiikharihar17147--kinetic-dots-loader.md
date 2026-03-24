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
kinetic-dots-loader.tsx
'use client';

import { cn } from "@/lib/utils";
'use client'

export default function KineticDotsLoader() {
  const dots = 4; // Increased to 4 for better rhythm

  return (
    <div className='flex items-center justify-center min-h-[250px] p-8 bg-slate-950/0'>
      <div className='flex gap-5'>
        {[...Array(dots)].map((_, i) => (
          <div
            key={i}
            className='relative flex flex-col items-center justify-end h-20 w-6'
          >
            {/* 1. THE BOUNCING DOT */}
            <div
              className='relative w-5 h-5 z-10'
              style={{
                animation: 'gravity-bounce 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                animationDelay: `${i * 0.15}s`,
                willChange: 'transform'
              }}
            >
              <div 
                className='w-full h-full rounded-full bg-gradient-to-b from-cyan-300 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                style={{
                  animation: 'rubber-morph 1.4s linear infinite',
                  animationDelay: `${i * 0.15}s`,
                  willChange: 'transform'
                }} 
              />
              
              {/* Specular highlight for liquid look */}
              <div className='absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]' />
            </div>

            {/* 2. FLOOR RIPPLE (Shockwave on impact) */}
            <div 
               className='absolute bottom-0 w-10 h-3 border border-cyan-500/30 rounded-[100%] opacity-0'
               style={{
                 animation: 'ripple-expand 1.4s linear infinite',
                 animationDelay: `${i * 0.15}s`,
               }}
            />

            {/* 3. REFLECTIVE SHADOW */}
            <div 
              className='absolute -bottom-1 w-5 h-1.5 rounded-[100%] bg-cyan-500/40 blur-sm'
              style={{
                animation: 'shadow-breathe 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        /* * 1. Gravity Bounce
         * Simulates the object falling and jumping up.
         * 0% = Ground (Hit)
         * 50% = Peak Height (Slowest)
         * 100% = Ground (Hit)
         */
        @keyframes gravity-bounce {
          0% { transform: translateY(0); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); } /* Hit ground, start jump fast */
          50% { transform: translateY(-40px); animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0); } /* Hover at top, start fall slow */
          100% { transform: translateY(0); } /* Hit ground */
        }

        /* * 2. Rubber Morph (Squash & Stretch)
         * We decouple this from the translation to have finer control over the shape.
         */
        @keyframes rubber-morph {
          0% { transform: scale(1.4, 0.6); } /* Impact: Squashed flat */
          5% { transform: scale(0.9, 1.1); } /* Rebound: Slight stretch */
          15% { transform: scale(1, 1); }    /* Normal shape rising */
          50% { transform: scale(1, 1); }    /* Peak: Perfect sphere */
          85% { transform: scale(0.9, 1.1); } /* Falling: Stretch */
          100% { transform: scale(1.4, 0.6); } /* Impact: Squashed flat */
        }

        /* * 3. Shadow Breathe
         * Shadow shrinks and fades when object is high.
         */
        @keyframes shadow-breathe {
          0% { transform: scale(1.4); opacity: 0.6; }
          50% { transform: scale(0.5); opacity: 0.1; }
          100% { transform: scale(1.4); opacity: 0.6; }
        }

        /* * 4. Ripple Expand
         * Only appears briefly at 0% and 100% when the ball hits.
         */
        @keyframes ripple-expand {
          0% { transform: scale(0.5); opacity: 0; border-width: 4px; }
          5% { opacity: 0.8; }
          30% { transform: scale(1.5); opacity: 0; border-width: 0px; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

code.demo.1769967584872.tsx
import KineticDotsLoader from "@/components/ui/kinetic-dots-loader";

export default function DemoOne() {
  return <KineticDotsLoader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/kinetic-dots-loader.tsx
'use client';

import { cn } from "@/lib/utils";
'use client'

export default function KineticDotsLoader() {
  const dots = 4; // Increased to 4 for better rhythm

  return (
    <div className='flex items-center justify-center min-h-[250px] p-8 bg-slate-950/0'>
      <div className='flex gap-5'>
        {[...Array(dots)].map((_, i) => (
          <div
            key={i}
            className='relative flex flex-col items-center justify-end h-20 w-6'
          >
            {/* 1. THE BOUNCING DOT */}
            <div
              className='relative w-5 h-5 z-10'
              style={{
                animation: 'gravity-bounce 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                animationDelay: `${i * 0.15}s`,
                willChange: 'transform'
              }}
            >
              <div 
                className='w-full h-full rounded-full bg-gradient-to-b from-cyan-300 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                style={{
                  animation: 'rubber-morph 1.4s linear infinite',
                  animationDelay: `${i * 0.15}s`,
                  willChange: 'transform'
                }} 
              />
              
              {/* Specular highlight for liquid look */}
              <div className='absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]' />
            </div>

            {/* 2. FLOOR RIPPLE (Shockwave on impact) */}
            <div 
               className='absolute bottom-0 w-10 h-3 border border-cyan-500/30 rounded-[100%] opacity-0'
               style={{
                 animation: 'ripple-expand 1.4s linear infinite',
                 animationDelay: `${i * 0.15}s`,
               }}
            />

            {/* 3. REFLECTIVE SHADOW */}
            <div 
              className='absolute -bottom-1 w-5 h-1.5 rounded-[100%] bg-cyan-500/40 blur-sm'
              style={{
                animation: 'shadow-breathe 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        /* * 1. Gravity Bounce
         * Simulates the object falling and jumping up.
         * 0% = Ground (Hit)
         * 50% = Peak Height (Slowest)
         * 100% = Ground (Hit)
         */
        @keyframes gravity-bounce {
          0% { transform: translateY(0); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); } /* Hit ground, start jump fast */
          50% { transform: translateY(-40px); animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0); } /* Hover at top, start fall slow */
          100% { transform: translateY(0); } /* Hit ground */
        }

        /* * 2. Rubber Morph (Squash & Stretch)
         * We decouple this from the translation to have finer control over the shape.
         */
        @keyframes rubber-morph {
          0% { transform: scale(1.4, 0.6); } /* Impact: Squashed flat */
          5% { transform: scale(0.9, 1.1); } /* Rebound: Slight stretch */
          15% { transform: scale(1, 1); }    /* Normal shape rising */
          50% { transform: scale(1, 1); }    /* Peak: Perfect sphere */
          85% { transform: scale(0.9, 1.1); } /* Falling: Stretch */
          100% { transform: scale(1.4, 0.6); } /* Impact: Squashed flat */
        }

        /* * 3. Shadow Breathe
         * Shadow shrinks and fades when object is high.
         */
        @keyframes shadow-breathe {
          0% { transform: scale(1.4); opacity: 0.6; }
          50% { transform: scale(0.5); opacity: 0.1; }
          100% { transform: scale(1.4); opacity: 0.6; }
        }

        /* * 4. Ripple Expand
         * Only appears briefly at 0% and 100% when the ball hits.
         */
        @keyframes ripple-expand {
          0% { transform: scale(0.5); opacity: 0; border-width: 4px; }
          5% { opacity: 0.8; }
          30% { transform: scale(1.5); opacity: 0; border-width: 0px; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
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
