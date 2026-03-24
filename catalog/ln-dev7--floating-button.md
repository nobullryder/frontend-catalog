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
floating-button.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface CircularMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
}

const CircularMenu = React.forwardRef<HTMLDivElement, CircularMenuProps>(
  ({ images, className, ...props }, ref) => {
    const [active, setActive] = useState(false);

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center gap-4 ${className}`}
        {...props}
      >
        <motion.div
          className="absolute left-0 z-10 w-full rounded-[40px] bg-white"
          animate={{
            x: active ? "calc(100% + 20px)" : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.button
            className="flex size-12 items-center justify-center rounded-full bg-zinc-400 sm:size-20"
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            <Plus size={40} strokeWidth={3} className="text-white" />
          </motion.button>
        </motion.div>
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="size-10 rounded-full object-cover sm:size-16"
            animate={{
              filter: active ? "blur(0px)" : "blur(2px)",
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : 45,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </div>
    );
  }
);

CircularMenu.displayName = "CircularMenu";

export default CircularMenu;

code.demo.1749421483716.tsx
// demo.tsx
import * as React from "react";
import CircularMenu from "@/components/ui/floating-button";

const CircularMenuDemo = () => {
  const images = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  ];

  return (
    <div className="relative flex min-h-[450px] w-full items-center justify-center bg-background p-10">
      <CircularMenu images={images} />
    </div>
  );
};

export { CircularMenuDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/floating-button.tsx
// component.tsx
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface CircularMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
}

const CircularMenu = React.forwardRef<HTMLDivElement, CircularMenuProps>(
  ({ images, className, ...props }, ref) => {
    const [active, setActive] = useState(false);

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center gap-4 ${className}`}
        {...props}
      >
        <motion.div
          className="absolute left-0 z-10 w-full rounded-[40px] bg-white"
          animate={{
            x: active ? "calc(100% + 20px)" : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.button
            className="flex size-12 items-center justify-center rounded-full bg-zinc-400 sm:size-20"
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            <Plus size={40} strokeWidth={3} className="text-white" />
          </motion.button>
        </motion.div>
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className="size-10 rounded-full object-cover sm:size-16"
            animate={{
              filter: active ? "blur(0px)" : "blur(2px)",
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : 45,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </div>
    );
  }
);

CircularMenu.displayName = "CircularMenu";

export default CircularMenu;
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
