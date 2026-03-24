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
hud-status-1.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";

interface StatusProps {
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "warning";
  scale?: number;
  text?: string;
  customColors?: {
    gradientStart?: string;
    gradientEnd?: string;
    stroke?: string;
    text?: string;
  };
}

export function Status({ 
  className, 
  variant = "primary", 
  scale = 1,
  text = "ACTIVE",
  customColors 
}: StatusProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted ? theme === "dark" : true; // Default to dark mode during SSR

  // Theme-aware color system matching HudButton
  const getColors = () => {
    if (customColors) {
      return {
        gradientStart: customColors.gradientStart || (isDark ? "#4ade80" : "#16a34a"),
        gradientEnd: customColors.gradientEnd || (isDark ? "#15803d" : "#166534"),
        stroke: customColors.stroke || (isDark ? "#4ade80" : "#16a34a"),
        text: customColors.text || (isDark ? "text-green-300" : "text-white/80")
      };
    }

    switch (variant) {
      case "primary":
        return {
          gradientStart: isDark ? "#4ade80" : "#16a34a", // green-400 for dark, green-600 for light
          gradientEnd: isDark ? "#15803d" : "#166534",   // green-700 for dark, green-800 for light
          stroke: isDark ? "#4ade80" : "#16a34a",        // green-400 for dark, green-600 for light
          text: isDark ? "text-green-300" : "text-white/80"
        };
      case "secondary":
        return {
          gradientStart: isDark ? "#64748b" : "#374151", // slate-500 for dark, gray-700 for light
          gradientEnd: isDark ? "#334155" : "#1f2937",   // slate-700 for dark, gray-800 for light
          stroke: isDark ? "#64748b" : "#374151",        // slate-500 for dark, gray-700 for light
          text: isDark ? "text-slate-300" : "text-white/80"
        };
      case "danger":
        return {
          gradientStart: isDark ? "#f87171" : "#dc2626", // red-400 for dark, red-600 for light
          gradientEnd: isDark ? "#b91c1c" : "#991b1b",   // red-700 for dark, red-800 for light
          stroke: isDark ? "#f87171" : "#dc2626",        // red-400 for dark, red-600 for light
          text: isDark ? "text-red-300" : "text-white/80"
        };
      case "warning":
        return {
          gradientStart: isDark ? "#fbbf24" : "#d97706", // amber-400 for dark, amber-600 for light
          gradientEnd: isDark ? "#b45309" : "#92400e",   // amber-700 for dark, amber-800 for light
          stroke: isDark ? "#fbbf24" : "#d97706",        // amber-400 for dark, amber-600 for light
          text: isDark ? "text-amber-300" : "text-white/80"
        };
      default:
        return {
          gradientStart: isDark ? "#4ade80" : "#16a34a",
          gradientEnd: isDark ? "#15803d" : "#166534",
          stroke: isDark ? "#4ade80" : "#16a34a",
          text: isDark ? "text-green-300" : "text-white/80"
        };
    }
  };

  const colors = getColors();

  const containerVariants = {
    hidden: { 
      opacity: 0,
      x: -100,
      scale: scale
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: scale,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ transformOrigin: "left center" }}
    >
      <div className="relative">
        <svg 
          width="180" 
          height="36" 
          viewBox="0 0 180 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="activeSystemsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.gradientStart} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.gradientEnd} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path 
            d="M0 0H180V24H8L0 16V0Z"
            fill="url(#activeSystemsGradient)"
            stroke={colors.stroke}
            strokeWidth="1.5"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-start pl-4 pb-3">
          <HyperText
            text={text}
            className={`${colors.text} text-sm font-mono tracking-wider font-semibold`}
            duration={1000}
            animateOnLoad={true}
            trigger={true}
          />
        </div>
      </div>
    </motion.div>
  );
} 

code.demo.1748975039404.tsx
"use client";

import { Status } from "@/components/ui/hud-status-1";

export default function Page() {
  return (
    <div className="bg-background w-full min-h-screen overflow-hidden flex items-center justify-center">
      <Status />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hud-status-1.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";

interface StatusProps {
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "warning";
  scale?: number;
  text?: string;
  customColors?: {
    gradientStart?: string;
    gradientEnd?: string;
    stroke?: string;
    text?: string;
  };
}

export function Status({ 
  className, 
  variant = "primary", 
  scale = 1,
  text = "ACTIVE",
  customColors 
}: StatusProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted ? theme === "dark" : true; // Default to dark mode during SSR

  // Theme-aware color system matching HudButton
  const getColors = () => {
    if (customColors) {
      return {
        gradientStart: customColors.gradientStart || (isDark ? "#4ade80" : "#16a34a"),
        gradientEnd: customColors.gradientEnd || (isDark ? "#15803d" : "#166534"),
        stroke: customColors.stroke || (isDark ? "#4ade80" : "#16a34a"),
        text: customColors.text || (isDark ? "text-green-300" : "text-white/80")
      };
    }

    switch (variant) {
      case "primary":
        return {
          gradientStart: isDark ? "#4ade80" : "#16a34a", // green-400 for dark, green-600 for light
          gradientEnd: isDark ? "#15803d" : "#166534",   // green-700 for dark, green-800 for light
          stroke: isDark ? "#4ade80" : "#16a34a",        // green-400 for dark, green-600 for light
          text: isDark ? "text-green-300" : "text-white/80"
        };
      case "secondary":
        return {
          gradientStart: isDark ? "#64748b" : "#374151", // slate-500 for dark, gray-700 for light
          gradientEnd: isDark ? "#334155" : "#1f2937",   // slate-700 for dark, gray-800 for light
          stroke: isDark ? "#64748b" : "#374151",        // slate-500 for dark, gray-700 for light
          text: isDark ? "text-slate-300" : "text-white/80"
        };
      case "danger":
        return {
          gradientStart: isDark ? "#f87171" : "#dc2626", // red-400 for dark, red-600 for light
          gradientEnd: isDark ? "#b91c1c" : "#991b1b",   // red-700 for dark, red-800 for light
          stroke: isDark ? "#f87171" : "#dc2626",        // red-400 for dark, red-600 for light
          text: isDark ? "text-red-300" : "text-white/80"
        };
      case "warning":
        return {
          gradientStart: isDark ? "#fbbf24" : "#d97706", // amber-400 for dark, amber-600 for light
          gradientEnd: isDark ? "#b45309" : "#92400e",   // amber-700 for dark, amber-800 for light
          stroke: isDark ? "#fbbf24" : "#d97706",        // amber-400 for dark, amber-600 for light
          text: isDark ? "text-amber-300" : "text-white/80"
        };
      default:
        return {
          gradientStart: isDark ? "#4ade80" : "#16a34a",
          gradientEnd: isDark ? "#15803d" : "#166534",
          stroke: isDark ? "#4ade80" : "#16a34a",
          text: isDark ? "text-green-300" : "text-white/80"
        };
    }
  };

  const colors = getColors();

  const containerVariants = {
    hidden: { 
      opacity: 0,
      x: -100,
      scale: scale
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: scale,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ transformOrigin: "left center" }}
    >
      <div className="relative">
        <svg 
          width="180" 
          height="36" 
          viewBox="0 0 180 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="activeSystemsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.gradientStart} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.gradientEnd} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path 
            d="M0 0H180V24H8L0 16V0Z"
            fill="url(#activeSystemsGradient)"
            stroke={colors.stroke}
            strokeWidth="1.5"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-start pl-4 pb-3">
          <HyperText
            text={text}
            className={`${colors.text} text-sm font-mono tracking-wider font-semibold`}
            duration={1000}
            animateOnLoad={true}
            trigger={true}
          />
        </div>
      </div>
    </motion.div>
  );
} 
```

Install NPM dependencies:
```bash
next-themes, framer-motion
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
