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
slider.tsx
"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full border-2 border-border bg-bw">
      <SliderPrimitive.Range className="absolute h-full bg-main" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-border bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

code.demo.tsx
import { Slider } from '@/components/ui/slider'

export const Demo = () => (
    <Slider className="w-[400px]" defaultValue={[33]} max={100} step={1} />
)
```

Copy-paste these files for dependencies:
```tsx
/components/ui/slider.tsx
"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full border-2 border-border bg-bw">
      <SliderPrimitive.Range className="absolute h-full bg-main" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-border bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

Install NPM dependencies:
```bash
@radix-ui/react-slider
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "main": "var(--main)",
        "overlay": "var(--overlay)",
        "bg": "var(--bg)",
        "bw": "var(--bw)",
        "blank": "var(--blank)",
        "text": "var(--text)",
        "mtext": "var(--mtext)",
        "border": "var(--border)",
        "ring": "var(--ring)",
        "ringOffset": "var(--ring-offset)",
        "secondaryBlack": "#212121"
      },
      "borderRadius": {
        "base": "5px"
      },
      "boxShadow": {
        "shadow": "var(--shadow)"
      },
      "translate": {
        "boxShadowX": "4px",
        "boxShadowY": "4px",
        "reverseBoxShadowX": "-4px",
        "reverseBoxShadowY": "-4px"
      },
      "fontWeight": {
        "base": "500",
        "heading": "700"
      }
    }
  }
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
