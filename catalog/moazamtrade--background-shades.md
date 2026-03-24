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
background-shades.tsx
"use client"

import { PulsingBorder, LiquidMetal } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShadersBackground() {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0.7, scale: 1.02, rotate: 2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        >
          <LiquidMetal
            style={{ width: "100%", height: "100%", filter: "blur(10px)" }}
            colorBack="hsl(0, 0%, 0%, 0)"
            colorTint="hsl(29, 77%, 49%)"
            repetition={4}
            softness={0.6}
            shiftRed={0.25}
            shiftBlue={0.25}
            distortion={0.12}
            contour={1}
            shape="plane"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={25}
            speed={2}
          />
        </motion.div>
      </div>
    </div>
  )
}

code.demo.1756563418343.tsx
import ShadersBackground from "@/components/ui/background-shades";

export default function DemoOne() {
  return <ShadersBackground />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/background-shades.tsx
"use client"

import { PulsingBorder, LiquidMetal } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShadersBackground() {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0.7, scale: 1.02, rotate: 2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        >
          <LiquidMetal
            style={{ width: "100%", height: "100%", filter: "blur(10px)" }}
            colorBack="hsl(0, 0%, 0%, 0)"
            colorTint="hsl(29, 77%, 49%)"
            repetition={4}
            softness={0.6}
            shiftRed={0.25}
            shiftBlue={0.25}
            distortion={0.12}
            contour={1}
            shape="plane"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={25}
            speed={2}
          />
        </motion.div>
      </div>
    </div>
  )
}
```

Install NPM dependencies:
```bash
@paper-design/shaders-react, framer-motion
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
