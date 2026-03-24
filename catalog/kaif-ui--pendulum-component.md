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
pendulum-component.tsx
"use client";
 
// Visit https://kaif-ui.vercel.app/ for more components like this
 
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
 
interface PendulumProps {
  className?: string;
}
 
const Pendulum: React.FC<PendulumProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-screen overflow-hidden h-screen flex items-start justify-center",
        className
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Pendulum */}
        <motion.div
          className="pendulum flex flex-col items-center justify-center"
          style={{
            transformOrigin: "50% 0%",
          }}
          animate={{
            rotate: [60, -60, 60],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: [0.6, 0, 0.4, 1],
          }}
        >
          {/* Stick */}
          <div className="w-[1px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-white"></div>
 
          {/* Ball */}
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white"
            style={{
              boxShadow: "inset 0 0 80px white, 0 0 30px white",
            }}
            animate={{
              boxShadow: [
                "inset 0 0 50px white, 0 0 20px white",
                "inset 0 0 80px white, 0 0 30px white",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
 
export default Pendulum;

code.demo.1750167344179.tsx

import Pendulum from "@/components/ui/pendulum-component"; 

export default function PendulumDemo() {
  return (
    <>
      <main className="flex items-center justify-center w-screen h-screen bg-black-900">
        <Pendulum />
      </main>
    </>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pendulum-component.tsx
"use client";
 
// Visit https://kaif-ui.vercel.app/ for more components like this
 
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
 
interface PendulumProps {
  className?: string;
}
 
const Pendulum: React.FC<PendulumProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-screen overflow-hidden h-screen flex items-start justify-center",
        className
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Pendulum */}
        <motion.div
          className="pendulum flex flex-col items-center justify-center"
          style={{
            transformOrigin: "50% 0%",
          }}
          animate={{
            rotate: [60, -60, 60],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: [0.6, 0, 0.4, 1],
          }}
        >
          {/* Stick */}
          <div className="w-[1px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-white"></div>
 
          {/* Ball */}
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white"
            style={{
              boxShadow: "inset 0 0 80px white, 0 0 30px white",
            }}
            animate={{
              boxShadow: [
                "inset 0 0 50px white, 0 0 20px white",
                "inset 0 0 80px white, 0 0 30px white",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
 
export default Pendulum;
```

Install NPM dependencies:
```bash
framer-motion
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
