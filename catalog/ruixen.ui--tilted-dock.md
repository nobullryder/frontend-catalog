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
tilted-dock.tsx
"use client";
import { motion } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const icons = [
  { id: 1, icon: <Home size={28} />, label: "Home" },
  { id: 2, icon: <Search size={28} />, label: "Search" },
  { id: 3, icon: <Bell size={28} />, label: "Alerts" },
  { id: 4, icon: <User size={28} />, label: "Profile" },
  { id: 5, icon: <Settings size={28} />, label: "Settings" },
];

export default function TiltedDock() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex gap-10 px-12 py-6 rounded-3xl 
                   backdrop-blur-2xl bg-white/30 dark:bg-black/30 
                   border border-white/20 dark:border-white/10 
                   shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: 18, // stage tilt
          rotateY: mouse.x * 10, // subtle parallax left/right
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {icons.map((item) => (
          <motion.div
            key={item.id}
            className="relative flex flex-col items-center justify-center"
            onHoverStart={() => setHovered(item.id)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              scale: hovered === item.id ? 1.4 : 1,
              z: hovered === item.id ? 120 : hovered ? -20 : 0, // depth layers
              opacity: hovered && hovered !== item.id ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotateX: hovered === item.id ? -10 : 0,
                rotateY: hovered === item.id ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-gray-900 dark:text-gray-100"
            >
              {item.icon}
            </motion.div>

            {/* Label */}
            <motion.span
              className="absolute -bottom-8 text-xs font-medium 
                         text-gray-800 dark:text-gray-200"
              animate={{ opacity: hovered === item.id ? 1 : 0, y: hovered === item.id ? 0 : 5 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


code.demo.1758251893925.tsx
import TiltedDock from "@/components/ui/tilted-dock";

export default function DemoOne() {
  return <TiltedDock />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tilted-dock.tsx
"use client";
import { motion } from "framer-motion";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const icons = [
  { id: 1, icon: <Home size={28} />, label: "Home" },
  { id: 2, icon: <Search size={28} />, label: "Search" },
  { id: 3, icon: <Bell size={28} />, label: "Alerts" },
  { id: 4, icon: <User size={28} />, label: "Profile" },
  { id: 5, icon: <Settings size={28} />, label: "Settings" },
];

export default function TiltedDock() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex gap-10 px-12 py-6 rounded-3xl 
                   backdrop-blur-2xl bg-white/30 dark:bg-black/30 
                   border border-white/20 dark:border-white/10 
                   shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: 18, // stage tilt
          rotateY: mouse.x * 10, // subtle parallax left/right
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {icons.map((item) => (
          <motion.div
            key={item.id}
            className="relative flex flex-col items-center justify-center"
            onHoverStart={() => setHovered(item.id)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              scale: hovered === item.id ? 1.4 : 1,
              z: hovered === item.id ? 120 : hovered ? -20 : 0, // depth layers
              opacity: hovered && hovered !== item.id ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotateX: hovered === item.id ? -10 : 0,
                rotateY: hovered === item.id ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-gray-900 dark:text-gray-100"
            >
              {item.icon}
            </motion.div>

            {/* Label */}
            <motion.span
              className="absolute -bottom-8 text-xs font-medium 
                         text-gray-800 dark:text-gray-200"
              animate={{ opacity: hovered === item.id ? 1 : 0, y: hovered === item.id ? 0 : 5 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
