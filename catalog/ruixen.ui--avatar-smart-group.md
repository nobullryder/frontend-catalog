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
avatar-smart-group.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface User {
  name: string;
  role?: string;
  image?: string;
}

interface AvatarSmartGroupProps {
  users: User[];
  variant?: "centered" | "uniform"; // two display modes
  size?: number; // base size in px
  sizeStep?: number; // size difference for centered variant
  overlap?: number; // negative for overlap
  ringColor?: string; // ring color class
  hoverScale?: number;
  tooltipBg?: string;
}

export function AvatarSmartGroup({
  users,
  variant = "uniform",
  size = 56,
  sizeStep = 8,
  overlap = -10,
  ringColor = "ring-background",
  hoverScale = 1.1,
  tooltipBg = "bg-popover",
}: AvatarSmartGroupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const centerIndex = Math.floor(users.length / 2);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center" style={{ gap: `${overlap}px` }}>
        {users.map((user, index) => {
          const isCenter = variant === "centered" && index === centerIndex;
          const avatarSize =
            variant === "centered"
              ? isCenter
                ? size + sizeStep
                : size
              : size;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`rounded-full ring-2 ${ringColor} transition-transform duration-200 cursor-pointer`}
                  style={{
                    transform:
                      activeIndex === index
                        ? `scale(${hoverScale})`
                        : "scale(1)",
                    zIndex: isCenter ? 10 : 0,
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <Avatar
                    className="border-none"
                    style={{
                      width: avatarSize,
                      height: avatarSize,
                    }}
                  >
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent
                className={`${tooltipBg} text-foreground shadow-md rounded-lg px-3 py-2`}
              >
                <p className="font-semibold">{user.name}</p>
                {user.role && <p className="text-xs opacity-80">{user.role}</p>}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}


code.demo.1760544505620.tsx
"use client";

import { AvatarSmartGroup } from "@/components/ui/avatar-smart-group";

export default function AvatarSmartGroupDemo() {
const users = [
  {
    name: "Olivia Anderson",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Liam Patel",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Nguyen",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ethan Rodriguez",
    role: "Marketing Lead",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Ava Thompson",
    role: "Quality Engineer",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];


  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Avatar Smart Group Demo</h1>
        <p className="text-gray-600">
          Two styles — uniform or centered — with configurable size, hover, and tooltips.
        </p>
      </div>

      {/* 🟢 Uniform Variant */}
      <div className="space-y-2 text-center">
        <h2 className="font-semibold text-lg">Uniform Variant</h2>
        <AvatarSmartGroup users={users} variant="uniform" size={56} overlap={-12} />
      </div>

      {/* 🔵 Centered Variant */}
      <div className="space-y-2 text-center">
        <h2 className="font-semibold text-lg">Centered Variant</h2>
        <AvatarSmartGroup
          users={users}
          variant="centered"
          size={56}
          sizeStep={12}
          overlap={-14}
          ringColor="ring-white"
          hoverScale={1.15}
          tooltipBg="bg-[#27F535] text-white"
        />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-smart-group.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface User {
  name: string;
  role?: string;
  image?: string;
}

interface AvatarSmartGroupProps {
  users: User[];
  variant?: "centered" | "uniform"; // two display modes
  size?: number; // base size in px
  sizeStep?: number; // size difference for centered variant
  overlap?: number; // negative for overlap
  ringColor?: string; // ring color class
  hoverScale?: number;
  tooltipBg?: string;
}

export function AvatarSmartGroup({
  users,
  variant = "uniform",
  size = 56,
  sizeStep = 8,
  overlap = -10,
  ringColor = "ring-background",
  hoverScale = 1.1,
  tooltipBg = "bg-popover",
}: AvatarSmartGroupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const centerIndex = Math.floor(users.length / 2);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center" style={{ gap: `${overlap}px` }}>
        {users.map((user, index) => {
          const isCenter = variant === "centered" && index === centerIndex;
          const avatarSize =
            variant === "centered"
              ? isCenter
                ? size + sizeStep
                : size
              : size;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`rounded-full ring-2 ${ringColor} transition-transform duration-200 cursor-pointer`}
                  style={{
                    transform:
                      activeIndex === index
                        ? `scale(${hoverScale})`
                        : "scale(1)",
                    zIndex: isCenter ? 10 : 0,
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <Avatar
                    className="border-none"
                    style={{
                      width: avatarSize,
                      height: avatarSize,
                    }}
                  >
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent
                className={`${tooltipBg} text-foreground shadow-md rounded-lg px-3 py-2`}
              >
                <p className="font-semibold">{user.name}</p>
                {user.role && <p className="text-xs opacity-80">{user.role}</p>}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

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
