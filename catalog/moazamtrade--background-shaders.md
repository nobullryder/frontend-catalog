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
background-shaders.tsx
import { Warp } from "@paper-design/shaders-react"

export default function Wrapper() {
  return (
    <div className= "relative min-h-screen" >
    <div className="fixed inset-0 -z-10" >
      <Warp
          style={ { width: "100%", height: "100%" } }
  proportion = { 0.45}
  softness = { 1}
  distortion = { 0.25}
  swirl = { 0.8}
  swirlIterations = { 10}
  shape = "checks"
  shapeScale = { 0.1}
  scale = { 1}
  rotation = { 0}
  speed = { 1}
  colors = { ["hsl(203, 100%, 62%)", "hsl(255, 100%, 72%)", "hsl(158, 99%, 59%)", "hsl(264, 100%, 61%)"]}
    />
    </div>
    < div className = "absolute left-8 top-1/2 -translate-y-1/2 z-10" >
      </div>
      < div className = "relative z-10 p-8" >
        </div>
        < /div>
  )
}


code.demo.1756499155707.tsx
import Wrapper from "@/components/ui/background-shaders";

export default function DemoOne() {
  return <Wrapper/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/background-shaders.tsx
import { Warp } from "@paper-design/shaders-react"

export default function Wrapper() {
  return (
    <div className= "relative min-h-screen" >
    <div className="fixed inset-0 -z-10" >
      <Warp
          style={ { width: "100%", height: "100%" } }
  proportion = { 0.45}
  softness = { 1}
  distortion = { 0.25}
  swirl = { 0.8}
  swirlIterations = { 10}
  shape = "checks"
  shapeScale = { 0.1}
  scale = { 1}
  rotation = { 0}
  speed = { 1}
  colors = { ["hsl(203, 100%, 62%)", "hsl(255, 100%, 72%)", "hsl(158, 99%, 59%)", "hsl(264, 100%, 61%)"]}
    />
    </div>
    < div className = "absolute left-8 top-1/2 -translate-y-1/2 z-10" >
      </div>
      < div className = "relative z-10 p-8" >
        </div>
        < /div>
  )
}

```

Install NPM dependencies:
```bash
@paper-design/shaders-react
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
