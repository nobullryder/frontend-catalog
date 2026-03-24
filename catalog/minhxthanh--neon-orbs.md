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
neon-orbs.tsx
"use client"

import { useEffect, useState } from "react"

export function NeonOrbs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-[#050a18] transition-colors duration-500">
      {/* Top-left orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
        style={{
          top: "-40%",
          left: "-20%",
          width: "80vw",
          height: "80vw",
          maxWidth: "800px",
          maxHeight: "800px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-center orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vw",
          maxWidth: "1000px",
          maxHeight: "1000px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-right orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-500 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        style={{
          top: "-30%",
          right: "-25%",
          width: "70vw",
          height: "70vw",
          maxWidth: "700px",
          maxHeight: "700px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-right orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-35%",
          right: "-15%",
          width: "75vw",
          height: "75vw",
          maxWidth: "750px",
          maxHeight: "750px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Center text */}
      <div className="relative z-10 text-center text-indigo-900 dark:text-white transition-colors duration-500">
        <h1 
          className={`text-4xl md:text-7xl font-extralight tracking-[0.2em] mb-4 transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {"BEYOND LIMITS".split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${800 + i * 50}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p 
          className={`text-lg md:text-xl font-light tracking-widest text-indigo-600/60 dark:text-white/60 transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          THE FUTURE IS NOW
        </p>
      </div>

      <style jsx global>{`
        .beam-container {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          will-change: transform;
        }
        
        .beam-light {
          position: absolute;
          top: 0;
          left: 50%;
          width: 60px;
          height: 4px;
          margin-left: -30px;
          border-radius: 2px;
          transform: translateY(-50%);
          transition: all 0.5s;
          background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.5) 30%, rgba(129, 140, 248, 0.9) 70%, rgba(99, 102, 241, 1) 100%);
          box-shadow: 0 0 20px 4px rgba(99, 102, 241, 0.6), 0 0 40px 8px rgba(129, 140, 248, 0.3);
        }
        
        .dark .beam-light {
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 30%, rgba(150, 200, 255, 0.9) 70%, white 100%);
          box-shadow: 0 0 20px 4px rgba(100, 180, 255, 0.8), 0 0 40px 8px rgba(59, 130, 246, 0.4);
        }
        
        .orb-light {
          background: radial-gradient(circle at 50% 50%, #f0f4ff 0%, #f0f4ff 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(99, 102, 241, 0.3),
            0 0 100px 5px rgba(99, 102, 241, 0.15),
            inset 0 0 60px 2px rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.4);
        }
        
        .dark .orb-light {
          background: radial-gradient(circle at 50% 50%, #050a18 0%, #050a18 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(59, 130, 246, 0.4),
            0 0 100px 5px rgba(59, 130, 246, 0.2),
            inset 0 0 60px 2px rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(100, 180, 255, 0.3);
        }
        
        .beam-spin-6 {
          animation: spin 6s linear infinite;
        }
        
        .beam-spin-7-reverse {
          animation: spin-reverse 7s linear infinite;
        }
        
        .beam-spin-8 {
          animation: spin 8s linear infinite;
        }
        
        .beam-spin-10-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

code.demo.1764337353769.tsx
import { NeonOrbs } from "@/components/ui/neon-orbs";

export default function DemoOne() {
  return <NeonOrbs />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/neon-orbs.tsx
"use client"

import { useEffect, useState } from "react"

export function NeonOrbs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-[#050a18] transition-colors duration-500">
      {/* Top-left orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
        style={{
          top: "-40%",
          left: "-20%",
          width: "80vw",
          height: "80vw",
          maxWidth: "800px",
          maxHeight: "800px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-center orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-50%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vw",
          maxWidth: "1000px",
          maxHeight: "1000px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-right orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-500 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        style={{
          top: "-30%",
          right: "-25%",
          width: "70vw",
          height: "70vw",
          maxWidth: "700px",
          maxHeight: "700px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-right orb */}
      <div
        className={`absolute transition-all duration-1000 ease-out delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          bottom: "-35%",
          right: "-15%",
          width: "75vw",
          height: "75vw",
          maxWidth: "750px",
          maxHeight: "750px",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Center text */}
      <div className="relative z-10 text-center text-indigo-900 dark:text-white transition-colors duration-500">
        <h1 
          className={`text-4xl md:text-7xl font-extralight tracking-[0.2em] mb-4 transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {"BEYOND LIMITS".split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${800 + i * 50}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p 
          className={`text-lg md:text-xl font-light tracking-widest text-indigo-600/60 dark:text-white/60 transition-all duration-1000 ease-out ${
            mounted 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          THE FUTURE IS NOW
        </p>
      </div>

      <style jsx global>{`
        .beam-container {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          will-change: transform;
        }
        
        .beam-light {
          position: absolute;
          top: 0;
          left: 50%;
          width: 60px;
          height: 4px;
          margin-left: -30px;
          border-radius: 2px;
          transform: translateY(-50%);
          transition: all 0.5s;
          background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.5) 30%, rgba(129, 140, 248, 0.9) 70%, rgba(99, 102, 241, 1) 100%);
          box-shadow: 0 0 20px 4px rgba(99, 102, 241, 0.6), 0 0 40px 8px rgba(129, 140, 248, 0.3);
        }
        
        .dark .beam-light {
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 30%, rgba(150, 200, 255, 0.9) 70%, white 100%);
          box-shadow: 0 0 20px 4px rgba(100, 180, 255, 0.8), 0 0 40px 8px rgba(59, 130, 246, 0.4);
        }
        
        .orb-light {
          background: radial-gradient(circle at 50% 50%, #f0f4ff 0%, #f0f4ff 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(99, 102, 241, 0.3),
            0 0 100px 5px rgba(99, 102, 241, 0.15),
            inset 0 0 60px 2px rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.4);
        }
        
        .dark .orb-light {
          background: radial-gradient(circle at 50% 50%, #050a18 0%, #050a18 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(59, 130, 246, 0.4),
            0 0 100px 5px rgba(59, 130, 246, 0.2),
            inset 0 0 60px 2px rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(100, 180, 255, 0.3);
        }
        
        .beam-spin-6 {
          animation: spin 6s linear infinite;
        }
        
        .beam-spin-7-reverse {
          animation: spin-reverse 7s linear infinite;
        }
        
        .beam-spin-8 {
          animation: spin 8s linear infinite;
        }
        
        .beam-spin-10-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
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
