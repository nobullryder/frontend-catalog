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
user-avatars.tsx
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, KeyboardEvent } from "react";

interface User {
  id: string | number;
  name?: string;
  image: string;
}

interface UserAvatarsProps {
  /** List of users with id, name, and image */
  users: User[];
  /** Avatar size in px (default: 56) */
  size?: number | string;
  /** Extra classNames for container */
  className?: string;
  /** Max number of visible avatars before showing +X bubble (default: 7) */
  maxVisible?: number;
  /** Overlap percentage between avatars (default: 60) */
  overlap?: number;
  /** Hover scale factor (default: 1.2) */
  focusScale?: number;
  /** Display avatars from right to left (default: false) */
  isRightToLeft?: boolean;
  /** Only overlap avatars, no shifting on hover (default: false) */
  isOverlapOnly?: boolean;
  /** Tooltip placement (default: "bottom") */
  tooltipPlacement?: "top" | "bottom";
}

export const UserAvatars = ({
  users,
  size = 56,
  className,
  maxVisible = 7,
  isRightToLeft = false,
  isOverlapOnly = false,
  overlap = 60,
  focusScale = 1.2,
  tooltipPlacement = "bottom",
}: UserAvatarsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const slicedUsers = users.slice(
    0,
    Math.min(maxVisible + 1, users.length + 1)
  );
  const exceedMaxLength = users.length > maxVisible;

  const handleKeyEnter = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      setHoveredIndex(index);
    }
  };

  return (
    <div className={cn("flex items-center relative", className)}>
      {slicedUsers.map((user, index) => {
        const isHoveredOne = hoveredIndex === index;
        const isLengthBubble = exceedMaxLength && maxVisible === index;

        const diff = 1 - overlap / 100;
        const zIndex =
          isHoveredOne && isOverlapOnly
            ? slicedUsers.length
            : isRightToLeft
            ? slicedUsers.length - index
            : index;

        const shouldScale =
          isHoveredOne &&
          (!exceedMaxLength || slicedUsers.length - 1 !== index);

        const shouldShift =
          hoveredIndex !== null &&
          (isRightToLeft ? index < hoveredIndex : index > hoveredIndex) &&
          !isOverlapOnly;

        const baseGap = Number(size) * (overlap / 100);
        const neededGap = (Number(size) * (1 + focusScale)) / 2;
        const shift = Math.max(0, neededGap - baseGap);

        return (
          <motion.div
            key={user.id}
            role="img"
            aria-label={user.name || "User avatar"}
            className="relative cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
            style={{
              width: size,
              height: size,
              zIndex,
              marginLeft: index === 0 ? 0 : -Number(size) * diff,
            }}
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onKeyDown={(e) => handleKeyEnter(e, index)}
            animate={{
              scale: shouldScale ? focusScale : 1,
              x: shouldShift ? shift * (isRightToLeft ? -1 : 1) : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Avatar bubble */}
            <div className="w-full h-full rounded-full overflow-hidden border border-white shadow-md">
              {isLengthBubble ? (
                <div className="flex h-full w-full items-center justify-center bg-background text-xs font-medium">
                  +{users.length - maxVisible}
                </div>
              ) : (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {shouldScale && user.name && (
                <motion.div
                  role="tooltip"
                  initial={{
                    opacity: 0,
                    y: tooltipPlacement === "bottom" ? 8 : -8,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: tooltipPlacement === "bottom" ? 8 : -8,
                  }}
                  transition={{ duration: 0.18 }}
                  // IMPORTANT: don't put -translate-x on this element
                  className={cn(
                    "absolute left-1/2 z-50",
                    tooltipPlacement === "bottom"
                      ? "top-full mt-2"
                      : "bottom-full mb-2"
                  )}
                >
                  {/* Inner wrapper applies the translateX via CSS (not overridden by Framer) */}
                  <div className="transform -translate-x-1/2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow-lg">
                    {user.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};


code.demo.1756881761584.tsx
// demo.tsx
import { UserAvatars } from "@/components/ui/user-avatars"

export default function DemoOne() {
  const users = [
    { id: 1, name: "Alice", image: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob", image: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie", image: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Diana", image: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eve", image: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Frank", image: "https://i.pravatar.cc/150?img=6" },
    { id: 7, name: "Grace", image: "https://i.pravatar.cc/150?img=7" },
    { id: 8, name: "Hank", image: "https://i.pravatar.cc/150?img=8" },
  ]

  return (
    <div className="flex justify-center p-10">
      <UserAvatars users={users} maxVisible={5} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/user-avatars.tsx
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, KeyboardEvent } from "react";

interface User {
  id: string | number;
  name?: string;
  image: string;
}

interface UserAvatarsProps {
  /** List of users with id, name, and image */
  users: User[];
  /** Avatar size in px (default: 56) */
  size?: number | string;
  /** Extra classNames for container */
  className?: string;
  /** Max number of visible avatars before showing +X bubble (default: 7) */
  maxVisible?: number;
  /** Overlap percentage between avatars (default: 60) */
  overlap?: number;
  /** Hover scale factor (default: 1.2) */
  focusScale?: number;
  /** Display avatars from right to left (default: false) */
  isRightToLeft?: boolean;
  /** Only overlap avatars, no shifting on hover (default: false) */
  isOverlapOnly?: boolean;
  /** Tooltip placement (default: "bottom") */
  tooltipPlacement?: "top" | "bottom";
}

export const UserAvatars = ({
  users,
  size = 56,
  className,
  maxVisible = 7,
  isRightToLeft = false,
  isOverlapOnly = false,
  overlap = 60,
  focusScale = 1.2,
  tooltipPlacement = "bottom",
}: UserAvatarsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const slicedUsers = users.slice(
    0,
    Math.min(maxVisible + 1, users.length + 1)
  );
  const exceedMaxLength = users.length > maxVisible;

  const handleKeyEnter = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      setHoveredIndex(index);
    }
  };

  return (
    <div className={cn("flex items-center relative", className)}>
      {slicedUsers.map((user, index) => {
        const isHoveredOne = hoveredIndex === index;
        const isLengthBubble = exceedMaxLength && maxVisible === index;

        const diff = 1 - overlap / 100;
        const zIndex =
          isHoveredOne && isOverlapOnly
            ? slicedUsers.length
            : isRightToLeft
            ? slicedUsers.length - index
            : index;

        const shouldScale =
          isHoveredOne &&
          (!exceedMaxLength || slicedUsers.length - 1 !== index);

        const shouldShift =
          hoveredIndex !== null &&
          (isRightToLeft ? index < hoveredIndex : index > hoveredIndex) &&
          !isOverlapOnly;

        const baseGap = Number(size) * (overlap / 100);
        const neededGap = (Number(size) * (1 + focusScale)) / 2;
        const shift = Math.max(0, neededGap - baseGap);

        return (
          <motion.div
            key={user.id}
            role="img"
            aria-label={user.name || "User avatar"}
            className="relative cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
            style={{
              width: size,
              height: size,
              zIndex,
              marginLeft: index === 0 ? 0 : -Number(size) * diff,
            }}
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onKeyDown={(e) => handleKeyEnter(e, index)}
            animate={{
              scale: shouldScale ? focusScale : 1,
              x: shouldShift ? shift * (isRightToLeft ? -1 : 1) : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Avatar bubble */}
            <div className="w-full h-full rounded-full overflow-hidden border border-white shadow-md">
              {isLengthBubble ? (
                <div className="flex h-full w-full items-center justify-center bg-background text-xs font-medium">
                  +{users.length - maxVisible}
                </div>
              ) : (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {shouldScale && user.name && (
                <motion.div
                  role="tooltip"
                  initial={{
                    opacity: 0,
                    y: tooltipPlacement === "bottom" ? 8 : -8,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: tooltipPlacement === "bottom" ? 8 : -8,
                  }}
                  transition={{ duration: 0.18 }}
                  // IMPORTANT: don't put -translate-x on this element
                  className={cn(
                    "absolute left-1/2 z-50",
                    tooltipPlacement === "bottom"
                      ? "top-full mt-2"
                      : "bottom-full mb-2"
                  )}
                >
                  {/* Inner wrapper applies the translateX via CSS (not overridden by Framer) */}
                  <div className="transform -translate-x-1/2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow-lg">
                    {user.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

```

Install NPM dependencies:
```bash
motion
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
