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
gooey-marquee.tsx
"use client"

interface GooeyMarqueeProps {
  text: string
  className?: string
  speed?: number
}

export function GooeyMarquee({ text, className = "", speed = 16 }: GooeyMarqueeProps) {
  return (
    <div className={`relative w-full h-32 text-8xl flex items-center justify-center overflow-hidden ${className}`}>
      {/* Blur layer with gooey effect */}
      <div
        className="absolute inset-0 hidden dark:flex items-center justify-center"
        style={{
          backgroundColor: "black",
          backgroundImage: `
            linear-gradient(to right, white, 1rem, transparent 50%),
            linear-gradient(to left, white, 1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            filter: "blur(0.07em)",
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      <div
        className="absolute dark:hidden inset-0 flex items-center justify-center"
        style={{
          backgroundColor: "white",
          backgroundImage: `
            linear-gradient(to right, black,  1rem, transparent 50%),
            linear-gradient(to left, black,  1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            filter: "blur(0.07em)",
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      {/* Clear text layer on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(70%); }
          to { transform: translateX(-70%); }
        }
        .animate-marquee {
          animation: marquee ${speed}s infinite linear;
        }
      `}</style>
    </div>
  )
}


code.demo.1755409447487.tsx
import { GooeyMarquee } from "@/components/ui/gooey-marquee";

export default function DemoOne() {
 return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <GooeyMarquee text="Design creates culture." />

        <p className="text-xl mt-8 text-primary/60">
          The component uses two text layers - a blurred background layer with high contrast filtering and linear gradients for the gooey effect, and a clean foreground layer for readability.
        </p>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/gooey-marquee.tsx
"use client"

interface GooeyMarqueeProps {
  text: string
  className?: string
  speed?: number
}

export function GooeyMarquee({ text, className = "", speed = 16 }: GooeyMarqueeProps) {
  return (
    <div className={`relative w-full h-32 text-8xl flex items-center justify-center overflow-hidden ${className}`}>
      {/* Blur layer with gooey effect */}
      <div
        className="absolute inset-0 hidden dark:flex items-center justify-center"
        style={{
          backgroundColor: "black",
          backgroundImage: `
            linear-gradient(to right, white, 1rem, transparent 50%),
            linear-gradient(to left, white, 1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            filter: "blur(0.07em)",
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      <div
        className="absolute dark:hidden inset-0 flex items-center justify-center"
        style={{
          backgroundColor: "white",
          backgroundImage: `
            linear-gradient(to right, black,  1rem, transparent 50%),
            linear-gradient(to left, black,  1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            filter: "blur(0.07em)",
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      {/* Clear text layer on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="absolute min-w-full whitespace-nowrap animate-marquee"
          style={{
            animation: `marquee ${speed}s infinite linear`,
          }}
        >
          {text}
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(70%); }
          to { transform: translateX(-70%); }
        }
        .animate-marquee {
          animation: marquee ${speed}s infinite linear;
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
