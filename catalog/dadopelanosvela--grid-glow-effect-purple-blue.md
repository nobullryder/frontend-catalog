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
grid-glow-effect-purple-blue.tsx
"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white" | "blue-purple";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const gradients = {
  default: `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
            radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
            radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
            radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
            repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              #dd7bbb 0%,
              #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
              #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
              #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
              #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
            )`,
  white: `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            #000,
            #000 calc(25% / var(--repeating-conic-gradient-times))
          )`,
  "blue-purple": `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 30%),
                  radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.3) 0%, transparent 30%),
                  radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 30%),
                  radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.4) 0%, transparent 30%),
                  repeating-conic-gradient(
                    from calc(var(--start) * 1deg) at 50% 50%,
                    rgba(59, 130, 246, 0.9) 0%,
                    rgba(147, 51, 234, 1) calc(25% / var(--repeating-conic-gradient-times)),
                    rgba(168, 85, 247, 0.95) calc(50% / var(--repeating-conic-gradient-times)),
                    rgba(99, 102, 241, 0.9) calc(75% / var(--repeating-conic-gradient-times)),
                    rgba(59, 130, 246, 0.9) calc(100% / var(--repeating-conic-gradient-times))
                  )`,
};

export const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 25,
    variant = "blue-purple",
    glow = false,
    className,
    movementDuration = 1,
    borderWidth = 2,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;

          // Normalize angle difference to [-180, 180]
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        {/* Border overlay */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-500",
            glow && "opacity-100",
            variant === "white" && "border-white",
            variant === "blue-purple" && "border-blue-400/30",
            disabled && "!block"
          )}
        />
        {/* Glow container */}
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "4",
              "--gradient": gradients[variant] ?? gradients.default,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-500",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow rounded-[inherit] h-full w-full",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-500 after:ease-out",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff_calc(var(--spread)*0.8deg),#fff_calc(var(--spread)*1.2deg),#00000000_calc(var(--spread)*2deg))]",
              variant === "blue-purple" && [
                "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
                "before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-indigo-500/10",
                "before:opacity-[calc(var(--active)*0.3)] before:transition-opacity before:duration-500",
                "before:blur-xl before:-z-10",
              ]
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

code.demo.1756836579663.tsx
import { GlowingEffect } from "@/components/ui/grid-glow-effect-purple-blue";
import { cn } from "@/lib/utils";
import { Cpu, Code2, ShieldCheck, Zap, SearchCheck } from "lucide-react";

export default function GlowingEffectDemo() {
  return (
    <div className="p-6 bg-black min-h-screen flex items-center justify-center">
      <ul
        className={cn(
          "grid gap-0 w-full max-w-6xl h-[38rem]",
          "grid-cols-[1fr_1fr_0.1fr_1fr_1fr]",
          "grid-rows-[1fr_1fr_0.1fr_1fr_1fr]"
        )}
      >
        <GridItem
          area="col-[4/6] row-[1/3]"
          icon={<Cpu className="h-4 w-4" />}
          title="Build the Right Way"
          description="Modern and efficient tools for developers who aim for excellence."
        />
        <GridItem
          area="col-[1/3] row-[1/3]"
          icon={<Code2 className="h-4 w-4" />}
          title="The Best AI Code Editor"
          description="Boost your productivity with integrated AI and advanced features."
        />
        <GridItem
          area="col-[1/3] row-[4/6]"
          icon={<ShieldCheck className="h-4 w-4" />}
          title="Security and Performance"
          description="Enterprise-grade protection with the speed required for critical projects."
        />
        <GridItem
          area="col-[4/6] row-[4/6]"
          icon={<Zap className="h-4 w-4" />}
          title="Lightning-fast Experiences"
          description="Create interfaces that captivate users with smooth animations."
        />
        <li className="col-[3/4] row-[3/4] flex items-center justify-center">
          <div className="relative w-8 h-8 rounded-full bg-white/80 dark:bg-black border border-slate-200/70 dark:border-slate-700/40 shadow-lg shadow-blue-500/30 dark:shadow-blue-900/50">
            <GlowingEffect
              spread={45}
              glow={true}
              disabled={false}
              proximity={70}
              inactiveZone={0.05}
              borderWidth={2}
              variant="blue-purple"
              blur={1}
              movementDuration={2}
            />
            <div className="absolute inset-1 rounded-full bg-black/80 dark:bg-black" />
          </div>
        </li>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("list-none min-h-[12rem]", area)}>
      <div className="relative h-full rounded-[1.25rem] border border-slate-200/60 dark:border-slate-700/40 p-3 md:rounded-[1.5rem] md:p-4 bg-white/50 dark:bg-black backdrop-blur-sm shadow-lg">
        <GlowingEffect
          spread={45}
          glow={true}
          disabled={false}
          proximity={70}
          inactiveZone={0.05}
          borderWidth={2}
          variant="blue-purple"
          blur={1}
          movementDuration={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100/70 dark:border-slate-700/30 bg-white/80 dark:bg-black backdrop-blur-sm p-7 md:p-7 shadow-sm dark:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.3)]">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-slate-200/50 dark:border-slate-600/40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-2.5 shadow-sm">
              <div className="text-blue-600 dark:text-blue-400">{icon}</div>
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/grid-glow-effect-purple-blue.tsx
"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white" | "blue-purple";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const gradients = {
  default: `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
            radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
            radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
            radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
            repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              #dd7bbb 0%,
              #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
              #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
              #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
              #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
            )`,
  white: `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            #000,
            #000 calc(25% / var(--repeating-conic-gradient-times))
          )`,
  "blue-purple": `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 30%),
                  radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.3) 0%, transparent 30%),
                  radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 30%),
                  radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.4) 0%, transparent 30%),
                  repeating-conic-gradient(
                    from calc(var(--start) * 1deg) at 50% 50%,
                    rgba(59, 130, 246, 0.9) 0%,
                    rgba(147, 51, 234, 1) calc(25% / var(--repeating-conic-gradient-times)),
                    rgba(168, 85, 247, 0.95) calc(50% / var(--repeating-conic-gradient-times)),
                    rgba(99, 102, 241, 0.9) calc(75% / var(--repeating-conic-gradient-times)),
                    rgba(59, 130, 246, 0.9) calc(100% / var(--repeating-conic-gradient-times))
                  )`,
};

export const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 25,
    variant = "blue-purple",
    glow = false,
    className,
    movementDuration = 1,
    borderWidth = 2,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const centerX = left + width / 2;
          const centerY = top + height / 2;
          const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;

          // Normalize angle difference to [-180, 180]
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        {/* Border overlay */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-500",
            glow && "opacity-100",
            variant === "white" && "border-white",
            variant === "blue-purple" && "border-blue-400/30",
            disabled && "!block"
          )}
        />
        {/* Glow container */}
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "4",
              "--gradient": gradients[variant] ?? gradients.default,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-500",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow rounded-[inherit] h-full w-full",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-500 after:ease-out",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff_calc(var(--spread)*0.8deg),#fff_calc(var(--spread)*1.2deg),#00000000_calc(var(--spread)*2deg))]",
              variant === "blue-purple" && [
                "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
                "before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-indigo-500/10",
                "before:opacity-[calc(var(--active)*0.3)] before:transition-opacity before:duration-500",
                "before:blur-xl before:-z-10",
              ]
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";
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
