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
cvui-badge.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

type BadgeProps = {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  onClick?: () => void;
  removable?: boolean;
  className?: string;
  maxWidth?: string | number;
  appearance?: "solid" | "outline" | "subtle";
  onRemove?: () => void;
  isLoading?: boolean;
};

export const Badge = ({
  label,
  variant = "primary",
  size = "medium",
  icon,
  onClick,
  removable = false,
  className,
  maxWidth,
  appearance = "solid",
  onRemove,
  isLoading = false,
}: BadgeProps) => {
  const variantStyles = {
    primary: {
      solid: "bg-[#11111198] text-white",
      outline: "border-2 border-[#11111198] text-[#11111198]",
      subtle: "bg-[#11111140] text-[#11111198]",
    },
    secondary: {
      solid: "bg-secondary text-secondary-foreground",
      outline: "border-2 border-secondary text-secondary",
      subtle: "bg-secondary/20 text-secondary",
    },
    success: {
      solid: "bg-green-600 text-white",
      outline: "border-2 border-green-600 text-green-600",
      subtle: "bg-green-100 text-green-600",
    },
    warning: {
      solid: "bg-yellow-500 text-white",
      outline: "border-2 border-yellow-500 text-yellow-500",
      subtle: "bg-yellow-100 text-yellow-500",
    },
    error: {
      solid: "bg-destructive text-destructive-foreground",
      outline: "border-2 border-destructive text-destructive",
      subtle: "bg-destructive/20 text-destructive",
    },
  };

  const sizeStyles = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-2",
    large: "text-base px-4 py-3",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "spring" }}
      whileHover={{
        scale: onClick ? 1.05 : 1,
        backgroundColor: onClick ? "#111111d1" : undefined,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
          type: "spring",
        },
      }}
      onClick={handleClick}
      style={{ maxWidth }}
      className={cn(
        "rounded-xl font-medium shadow-[0_0_20px_rgba(0,0,0,0.2)] inline-flex items-center gap-2 backdrop-blur-sm",
        variantStyles[variant][appearance],
        sizeStyles[size],
        onClick && "cursor-pointer",
        className
      )}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex-shrink-0"
        >
          <Loader2 className="h-4 w-4" />
        </motion.div>
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      <span className="truncate">{label}</span>
      {removable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
              type: "spring",
            },
          }}
          className="p-1 opacity-60 hover:opacity-100 bg-[#11111198] hover:bg-[#11111198] rounded-md flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(e);
          }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  );
};


code.demo.tsx
"use client";
import { Badge } from "@/components/ui/cvui-badge"
import { Bell, Check, AlertTriangle, X, Info } from "lucide-react";
export const BadgeDemo = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* Variants */}
      <div className="flex gap-4 flex-wrap">
        <Badge label="Primary" variant="primary" />
        <Badge label="Secondary" variant="secondary" />
        <Badge label="Success" variant="success" />
        <Badge label="Warning" variant="warning" />
        <Badge label="Error" variant="error" />
      </div>

      {/* Sizes */}
      <div className="flex gap-4 flex-wrap items-center">
        <Badge label="Small" size="small" />
        <Badge label="Medium" size="medium" />
        <Badge label="Large" size="large" />
      </div>

      {/* Appearances */}
      <div className="flex gap-4 flex-wrap">
        <Badge label="Solid" appearance="solid" />
        <Badge label="Outline" appearance="outline" />
        <Badge label="Subtle" appearance="subtle" />
      </div>

      {/* With Icons */}
      <div className="flex gap-4 flex-wrap">
        <Badge label="Notification" icon={<Bell className="w-4 h-4" />} />
        <Badge
          label="Success"
          variant="success"
          icon={<Check className="w-4 h-4" />}
        />
        <Badge
          label="Warning"
          variant="warning"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <Badge label="Error" variant="error" icon={<X className="w-4 h-4" />} />
        <Badge
          label="Info"
          variant="primary"
          icon={<Info className="w-4 h-4" />}
        />
      </div>

      {/* Interactive */}
      <div className="flex gap-4 flex-wrap">
        <Badge label="Clickable" onClick={() => alert("Clicked!")} />
        <Badge label="Removable" removable onRemove={() => alert("Removed!")} />
        <Badge label="Max Width" maxWidth={100} />
      </div>

      {/* Combined Features */}
      <Badge
        label="Complete Example"
        size="large"
        icon={<Check className="w-4 h-4" />}
        onClick={() => alert("Clicked!")}
        removable
        maxWidth={200}
      />
      {/* Loading */}
      <Badge label="Loading" isLoading />
    </div>
  );
};


```

Copy-paste these files for dependencies:
```tsx
/components/ui/cvui-badge.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

type BadgeProps = {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  onClick?: () => void;
  removable?: boolean;
  className?: string;
  maxWidth?: string | number;
  appearance?: "solid" | "outline" | "subtle";
  onRemove?: () => void;
  isLoading?: boolean;
};

export const Badge = ({
  label,
  variant = "primary",
  size = "medium",
  icon,
  onClick,
  removable = false,
  className,
  maxWidth,
  appearance = "solid",
  onRemove,
  isLoading = false,
}: BadgeProps) => {
  const variantStyles = {
    primary: {
      solid: "bg-[#11111198] text-white",
      outline: "border-2 border-[#11111198] text-[#11111198]",
      subtle: "bg-[#11111140] text-[#11111198]",
    },
    secondary: {
      solid: "bg-secondary text-secondary-foreground",
      outline: "border-2 border-secondary text-secondary",
      subtle: "bg-secondary/20 text-secondary",
    },
    success: {
      solid: "bg-green-600 text-white",
      outline: "border-2 border-green-600 text-green-600",
      subtle: "bg-green-100 text-green-600",
    },
    warning: {
      solid: "bg-yellow-500 text-white",
      outline: "border-2 border-yellow-500 text-yellow-500",
      subtle: "bg-yellow-100 text-yellow-500",
    },
    error: {
      solid: "bg-destructive text-destructive-foreground",
      outline: "border-2 border-destructive text-destructive",
      subtle: "bg-destructive/20 text-destructive",
    },
  };

  const sizeStyles = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-2",
    large: "text-base px-4 py-3",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "spring" }}
      whileHover={{
        scale: onClick ? 1.05 : 1,
        backgroundColor: onClick ? "#111111d1" : undefined,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
          type: "spring",
        },
      }}
      onClick={handleClick}
      style={{ maxWidth }}
      className={cn(
        "rounded-xl font-medium shadow-[0_0_20px_rgba(0,0,0,0.2)] inline-flex items-center gap-2 backdrop-blur-sm",
        variantStyles[variant][appearance],
        sizeStyles[size],
        onClick && "cursor-pointer",
        className
      )}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex-shrink-0"
        >
          <Loader2 className="h-4 w-4" />
        </motion.div>
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      <span className="truncate">{label}</span>
      {removable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
              type: "spring",
            },
          }}
          className="p-1 opacity-60 hover:opacity-100 bg-[#11111198] hover:bg-[#11111198] rounded-md flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(e);
          }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

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
