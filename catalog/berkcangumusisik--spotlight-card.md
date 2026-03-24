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
spotlight-card.tsx
import { cn } from "@/lib/utils";
import React, { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  ...props
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition-colors hover:border-neutral-700",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

code.demo.1765391065894.tsx
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Layers, ShieldCheck, Zap } from "lucide-react";

export default function DemoSpotlight() {
  return (
    <div className="min-h-[500px] w-full flex items-center justify-center bg-black p-4 sm:p-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl w-full">
        
        {/* Card 1: Default White Spotlight */}
        <SpotlightCard className="p-6 h-full flex flex-col gap-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700">
            <Layers className="text-white h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Seamless UX</h3>
            <p className="text-sm text-neutral-400">
              Smooth, mouse-responsive interactions that elevate the user experience to the next level.
            </p>
          </div>
        </SpotlightCard>

        {/* Card 2: Sky Blue Spotlight */}
        <SpotlightCard className="p-6 h-full flex flex-col gap-4" spotlightColor="rgba(14, 165, 233, 0.25)">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-sky-900/20 border border-sky-800/50">
            <ShieldCheck className="text-sky-400 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Secure By Design</h3>
            <p className="text-sm text-neutral-400">
              Built with modern security standards, ensuring your data is protected with end-to-end encryption.
            </p>
          </div>
        </SpotlightCard>

        {/* Card 3: Purple Spotlight */}
        <SpotlightCard className="p-6 h-full flex flex-col gap-4" spotlightColor="rgba(168, 85, 247, 0.25)">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-900/20 border border-purple-800/50">
            <Zap className="text-purple-400 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Lightning Fast</h3>
            <p className="text-sm text-neutral-400">
              Optimized for performance. Import the component and start building without configuration overhead.
            </p>
          </div>
        </SpotlightCard>

      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spotlight-card.tsx
import { cn } from "@/lib/utils";
import React, { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.15)",
  ...props
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 transition-colors hover:border-neutral-700",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
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
