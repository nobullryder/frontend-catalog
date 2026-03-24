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
avatar-hover-card.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";

export interface NativeHoverCardProps {
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Display name
   */
  name: string;
  /**
   * Username or handle
   */
  username?: string;
  /**
   * Description or bio text
   */
  description?: string;
  /**
   * Button text
   * Default: "View Profile"
   */
  buttonText?: string;
  /**
   * Button click handler
   */
  onButtonClick?: () => void;
  /**
   * Custom button component
   */
  buttonContent?: ReactNode;
  /**
   * Size of the image when collapsed
   * Default: "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Card variant style
   */
  variant?: "default" | "glass" | "bordered";
}

const imageSizeVariants = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

const cardWidthVariants = {
  sm: "w-56",
  md: "w-72",
  lg: "w-80",
  xl: "w-96",
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function Component({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  variant = "default",
}: NativeHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-background/80 backdrop-blur-md border border-border/50";
      case "bordered":
        return "bg-card border-2 border-primary/20";
      default:
        return "bg-card border border-border";
    }
  };

  // Avatar component - renders a fresh instance to ensure updates/animations work
  const avatarElement = (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt || name}
      />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: isHovered ? "auto" : "fit-content",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className={cn(
          "relative rounded-full overflow-hidden",
          imageSizeVariants[size]
        )}
        layout
        animate={{
          padding: isHovered ? "8px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {avatarElement}
      </motion.div>

      {/* Expanded Card Content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-0 left-0 rounded-xl shadow-lg overflow-hidden z-10",
              cardWidthVariants[size],
              getVariantStyles()
            )}
            style={{ pointerEvents: "auto" }}
          >
            {/* Background with gradient overlay on image */}
            <div className="relative">
              <motion.div
                className={cn("relative p-2", imageSizeVariants[size])}
              >
                {avatarElement}
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                }}
                className="p-4 space-y-3"
              >
                {/* Name */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg font-bold text-foreground leading-tight"
                  >
                    {name}
                  </motion.h3>

                  {/* Username */}
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-sm text-muted-foreground"
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-foreground/80 leading-relaxed line-clamp-2"
                  >
                    {description}
                  </motion.p>
                )}

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button
                      onClick={onButtonClick}
                      size="sm"
                      className="w-full"
                    >
                      {buttonText}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


code.demo.1768413711275.tsx
import { Component } from "@/components/ui/avatar-hover-card";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";

export default function DemoOne() {
  return <Component  
  imageSrc="https://github.com/shadcn.png"
        imageAlt="Profile"
        name="shadcn"
        username="shadcn"
        description="Community manager and content creator."
        buttonContent={
          <div className="flex gap-2 w-full">
            <Button size="sm" variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button size="sm" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>
        }
  
   />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-hover-card.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";

export interface NativeHoverCardProps {
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Display name
   */
  name: string;
  /**
   * Username or handle
   */
  username?: string;
  /**
   * Description or bio text
   */
  description?: string;
  /**
   * Button text
   * Default: "View Profile"
   */
  buttonText?: string;
  /**
   * Button click handler
   */
  onButtonClick?: () => void;
  /**
   * Custom button component
   */
  buttonContent?: ReactNode;
  /**
   * Size of the image when collapsed
   * Default: "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Card variant style
   */
  variant?: "default" | "glass" | "bordered";
}

const imageSizeVariants = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

const cardWidthVariants = {
  sm: "w-56",
  md: "w-72",
  lg: "w-80",
  xl: "w-96",
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function Component({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  variant = "default",
}: NativeHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-background/80 backdrop-blur-md border border-border/50";
      case "bordered":
        return "bg-card border-2 border-primary/20";
      default:
        return "bg-card border border-border";
    }
  };

  // Avatar component - renders a fresh instance to ensure updates/animations work
  const avatarElement = (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt || name}
      />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: isHovered ? "auto" : "fit-content",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className={cn(
          "relative rounded-full overflow-hidden",
          imageSizeVariants[size]
        )}
        layout
        animate={{
          padding: isHovered ? "8px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {avatarElement}
      </motion.div>

      {/* Expanded Card Content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-0 left-0 rounded-xl shadow-lg overflow-hidden z-10",
              cardWidthVariants[size],
              getVariantStyles()
            )}
            style={{ pointerEvents: "auto" }}
          >
            {/* Background with gradient overlay on image */}
            <div className="relative">
              <motion.div
                className={cn("relative p-2", imageSizeVariants[size])}
              >
                {avatarElement}
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                }}
                className="p-4 space-y-3"
              >
                {/* Name */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg font-bold text-foreground leading-tight"
                  >
                    {name}
                  </motion.h3>

                  {/* Username */}
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-sm text-muted-foreground"
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-foreground/80 leading-relaxed line-clamp-2"
                  >
                    {description}
                  </motion.p>
                )}

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button
                      onClick={onButtonClick}
                      size="sm"
                      className="w-full"
                    >
                      {buttonText}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
