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
aurora-background-2.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// Extend JSX to recognize <lottie-player>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          background: string;
          speed: string;
          loop?: boolean;
          autoplay?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * AuroraBackground
 *
 * Creates a mesmerizing aurora-like animated background
 * using blurred, colored radial gradients and Framer Motion.
 */
const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main>
      <div
        className={`relative flex flex-col h-screen items-center justify-center bg-zinc-900 text-slate-900 transition-bg dark:bg-zinc-900 dark:text-slate-200 ${className}`}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base blurred gradient */}
          <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-400 via-rose-400 to-lime-400 opacity-20 [filter:blur(120px)]"></div>

          {/* Animated blobs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />
        </div>

        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;


code.demo.1759054853457.tsx
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background-2";

const DemoOne = () => {
  useEffect(() => {
    // Dynamically load the lottie-player script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: "easeInOut" }}
        >
          <lottie-player
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            background="transparent"
            speed="1"
            style={{ width: "250px", height: "250px" }}
            loop
            autoplay
          ></lottie-player>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: "easeInOut" }}
          className="text-4xl font-bold text-white md:text-6xl"
        >
          Aurora Background
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: "easeInOut" }}
          className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg"
        >
          A beautiful and unique aurora-like background effect using Framer Motion.
        </motion.p>
      </div>
    </AuroraBackground>
  );
};

export default DemoOne;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/aurora-background-2.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// Extend JSX to recognize <lottie-player>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          background: string;
          speed: string;
          loop?: boolean;
          autoplay?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * AuroraBackground
 *
 * Creates a mesmerizing aurora-like animated background
 * using blurred, colored radial gradients and Framer Motion.
 */
const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main>
      <div
        className={`relative flex flex-col h-screen items-center justify-center bg-zinc-900 text-slate-900 transition-bg dark:bg-zinc-900 dark:text-slate-200 ${className}`}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base blurred gradient */}
          <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-400 via-rose-400 to-lime-400 opacity-20 [filter:blur(120px)]"></div>

          {/* Animated blobs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />
        </div>

        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;

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
