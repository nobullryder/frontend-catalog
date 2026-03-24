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
star-button.tsx
import React from "react"

const Button = () => {
  return (
    <button
      className="
        group relative px-[35px] py-[12px] 
        text-[17px] font-medium 
        text-[#181818] 
        bg-[#fec195] 
        border-[3px] border-[#fec195] 
        rounded-md 
        shadow-[0_0_0_#fec1958c] 
        transition-all duration-300 ease-in-out 
        cursor-pointer
        hover:bg-transparent hover:text-[#fec195] hover:shadow-[0_0_25px_#fec1958c]
        active:scale-95
      "
    >
      Button

      {/* Star 1 */}
      <div
        className="
          absolute top-[20%] left-[20%] w-[25px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[-80%] group-hover:left-[-30%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 2 */}
      <div
        className="
          absolute top-[45%] left-[45%] w-[15px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[-25%] group-hover:left-[10%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 3 */}
      <div
        className="
          absolute top-[40%] left-[40%] w-[5px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[55%] group-hover:left-[25%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 4 */}
      <div
        className="
          absolute top-[20%] left-[40%] w-[8px] z-[-5] 
          transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[30%] group-hover:left-[80%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 5 */}
      <div
        className="
          absolute top-[25%] left-[45%] w-[15px] z-[-5] 
          transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[25%] group-hover:left-[115%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 6 */}
      <div
        className="
          absolute top-[5%] left-[50%] w-[5px] z-[-5] 
          transition-all duration-[800ms] ease-in-out 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[5%] group-hover:left-[60%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>
    </button>
  )
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className="
      w-full h-auto 
      fill-[#fec195] 
      dark:fill-[#fffdef]
    "
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
)

export default Button


code.demo.1756107155194.tsx
import Component from "@/components/ui/star-button";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/star-button.tsx
import React from "react"

const Button = () => {
  return (
    <button
      className="
        group relative px-[35px] py-[12px] 
        text-[17px] font-medium 
        text-[#181818] 
        bg-[#fec195] 
        border-[3px] border-[#fec195] 
        rounded-md 
        shadow-[0_0_0_#fec1958c] 
        transition-all duration-300 ease-in-out 
        cursor-pointer
        hover:bg-transparent hover:text-[#fec195] hover:shadow-[0_0_25px_#fec1958c]
        active:scale-95
      "
    >
      Button

      {/* Star 1 */}
      <div
        className="
          absolute top-[20%] left-[20%] w-[25px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[-80%] group-hover:left-[-30%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 2 */}
      <div
        className="
          absolute top-[45%] left-[45%] w-[15px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[-25%] group-hover:left-[10%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 3 */}
      <div
        className="
          absolute top-[40%] left-[40%] w-[5px] z-[-5] 
          transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[55%] group-hover:left-[25%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 4 */}
      <div
        className="
          absolute top-[20%] left-[40%] w-[8px] z-[-5] 
          transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[30%] group-hover:left-[80%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 5 */}
      <div
        className="
          absolute top-[25%] left-[45%] w-[15px] z-[-5] 
          transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[25%] group-hover:left-[115%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>

      {/* Star 6 */}
      <div
        className="
          absolute top-[5%] left-[50%] w-[5px] z-[-5] 
          transition-all duration-[800ms] ease-in-out 
          drop-shadow-[0_0_0_var(--tw-shadow-color)] 
          group-hover:top-[5%] group-hover:left-[60%] 
          group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] group-hover:z-[2]
        "
      >
        <Star />
      </div>
    </button>
  )
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className="
      w-full h-auto 
      fill-[#fec195] 
      dark:fill-[#fffdef]
    "
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
)

export default Button

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
