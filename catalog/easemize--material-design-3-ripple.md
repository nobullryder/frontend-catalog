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
material-design-3-ripple.tsx
import React, {
  useCallback,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";

// --- 1. PHYSICS CONSTANTS ---
// We keep the logic from the button, but make DURATION dynamic
const MINIMUM_PRESS_MS = 300;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const ANIMATION_FILL = "forwards";
const TOUCH_DELAY_MS = 150;
const EASING_STANDARD = "cubic-bezier(0.2, 0, 0, 1)";

// --- 2. TYPES ---
enum RippleState {
  INACTIVE,
  TOUCH_DELAY,
  HOLDING,
  WAITING_FOR_CLICK,
}

interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tailwind text color class for the ripple (e.g., "text-white", "text-blue-500").
   * Defaults to "text-current" (inherits parent text color).
   */
  color?: string;
  /**
   * Base opacity when fully pressed. Default: 0.12
   */
  opacity?: number;
  disabled?: boolean;
}

// --- 3. THE LOGIC (Converted to be self-contained) ---
const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      className,
      children,
      color = "text-current",
      opacity = 0.12,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);
    
    // Internal State
    const stateRef = useRef(RippleState.INACTIVE);
    const rippleStartEventRef = useRef<React.PointerEvent | null>(null);
    const growAnimationRef = useRef<Animation | null>(null);
    
    // Visual State (for opacity transitions)
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Determines if we are wrapping content or sitting inside it
    const isWrapper = React.Children.count(children) > 0;

    // --- GEOMETRY & ANIMATION ---
    const determineRippleSize = () => {
      if (!containerRef.current) return { size: "0px", scale: 1, duration: 450 };
      
      const { height, width } = containerRef.current.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(
        SOFT_EDGE_CONTAINER_RATIO * maxDim,
        SOFT_EDGE_MINIMUM_SIZE
      );

      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;

      // DYNAMIC SPEED CALCULATION
      // Standard button (~200px) gets ~450ms. Large cards get slower.
      // We clamp it between 400ms (fastest) and 1000ms (slowest)
      const dynamicDuration = Math.min(Math.max(400, hypotenuse * 1.5), 1000);

      const rippleScale = (maxRadius + softEdgeSize) / initialSize;

      return {
        size: `${initialSize}px`,
        scale: rippleScale,
        duration: dynamicDuration
      };
    };

    const getTranslationCoordinates = (event?: React.PointerEvent) => {
      if (!containerRef.current) return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
      const { height, width, left, top } = containerRef.current.getBoundingClientRect();
      
      // We need the initial size again for centering
      const maxDim = Math.max(height, width);
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

      const endPoint = {
        x: (width - initialSize) / 2,
        y: (height - initialSize) / 2,
      };

      let startPoint;
      if (event) {
        startPoint = {
          x: event.clientX - left,
          y: event.clientY - top,
        };
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2,
        };
      }

      startPoint = {
        x: startPoint.x - initialSize / 2,
        y: startPoint.y - initialSize / 2,
      };

      return { startPoint, endPoint };
    };

    const startPressAnimation = (event?: React.PointerEvent) => {
      setIsPressed(true);
      if (!rippleRef.current) return;

      growAnimationRef.current?.cancel();
      
      const { size, scale, duration } = determineRippleSize();
      const { startPoint, endPoint } = getTranslationCoordinates(event);

      // Apply initial size immediately
      rippleRef.current.style.width = size;
      rippleRef.current.style.height = size;

      growAnimationRef.current = rippleRef.current.animate(
        {
          top: [0, 0],
          left: [0, 0],
          transform: [
            `translate(${startPoint.x}px, ${startPoint.y}px) scale(1)`,
            `translate(${endPoint.x}px, ${endPoint.y}px) scale(${scale})`,
          ],
        },
        {
          duration: duration, // DYNAMIC DURATION
          easing: EASING_STANDARD,
          fill: ANIMATION_FILL,
        }
      );
    };

    const endPressAnimation = async () => {
      rippleStartEventRef.current = null;
      stateRef.current = RippleState.INACTIVE;
      
      const animation = growAnimationRef.current;
      let pressAnimationPlayState = Infinity;
      
      if (animation && typeof animation.currentTime === 'number') {
          pressAnimationPlayState = animation.currentTime;
      }

      if (pressAnimationPlayState < MINIMUM_PRESS_MS) {
        await new Promise((resolve) => {
          setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
        });
      }

      if (growAnimationRef.current !== animation) {
        return;
      }

      setIsPressed(false);
    };

    // --- EVENT HANDLERS ---
    const isTouch = (event: React.PointerEvent) => event.pointerType === "touch";

    const shouldReactToEvent = (event: React.PointerEvent) => {
      if (disabled || !event.isPrimary) return false;
      if (rippleStartEventRef.current && rippleStartEventRef.current.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return isTouch(event) || isPrimaryButton;
    };

    const handlePointerDown = async (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      rippleStartEventRef.current = event;

      if (!isTouch(event)) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        startPressAnimation(event);
        return;
      }

      stateRef.current = RippleState.TOUCH_DELAY;
      await new Promise((resolve) => setTimeout(resolve, TOUCH_DELAY_MS));

      if (stateRef.current !== RippleState.TOUCH_DELAY) {
        return;
      }

      stateRef.current = RippleState.HOLDING;
      startPressAnimation(event);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      if (stateRef.current === RippleState.HOLDING) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        return;
      }
      if (stateRef.current === RippleState.TOUCH_DELAY) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        startPressAnimation(rippleStartEventRef.current || undefined);
        return;
      }
    };

    const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      setIsHovered(false);
      if (stateRef.current !== RippleState.INACTIVE) {
          endPressAnimation();
      }
    };

    const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!shouldReactToEvent(event)) return;
        setIsHovered(true);
    }

    const handleClick = () => {
      if (disabled) return;
      if (stateRef.current === RippleState.WAITING_FOR_CLICK) {
          endPressAnimation();
          return;
      }
      if (stateRef.current === RippleState.INACTIVE) {
          startPressAnimation();
          endPressAnimation();
      }
    };

    // Forward ref to container
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    return (
      <div
        ref={containerRef}
        className={cn(
          // 1. Layout Mode: Relative (Wrapper) or Absolute (Overlay)
          isWrapper ? "relative" : "absolute inset-0",
          // 2. Base Styles
          "overflow-hidden isolate z-0 rounded-[inherit]",
          color, // Apply text color for currentcolor inheritance
          className
        )}
        style={style}
        // Event Binding
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Child Content (if any) */}
        {children && (
            <div className="relative z-10 pointer-events-none">
                {children}
            </div>
        )}

        {/* --- RIPPLE LAYERS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            {/* 1. State Layer (Hover) */}
            <div 
                className={cn(
                    "absolute inset-0 bg-current transition-opacity duration-200 ease-linear",
                    isHovered ? "opacity-[0.08]" : "opacity-0"
                )} 
            />
            
            {/* 2. Ripple Effect (Press) */}
            <div 
                ref={rippleRef}
                className="absolute rounded-full opacity-0 bg-current"
                style={{
                    // Exact Gradient from Material Button
                    background: "radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)",
                    transition: "opacity 375ms linear",
                    opacity: isPressed ? opacity : "0",
                    transitionDuration: isPressed ? "105ms" : "375ms"
                }}
            />
        </div>
      </div>
    );
  }
);

Ripple.displayName = "Ripple";

export { Ripple };

code.demo.1768893474466.tsx
import React, { useState } from "react";
import { Ripple } from "@/components/ui/material-design-3-ripple";
import { Fingerprint, Lock, Unlock, ChevronRight } from "lucide-react";

export default function SpotlightRippleDemo() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative min-h-[600px] h-screen w-full flex items-center justify-center bg-[#09090b] overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* 1. DOTTED BACKGROUND */}
      {/* We create a pattern using radial gradients */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 2. SHINY SPOTLIGHT EFFECT */}
      {/* A massive gradient glow from the top to simulate a light source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. THE HERO CARD */}
      <div className="relative z-10 group">
        
        {/* Glow behind the card */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        
        {/* Main Container */}
        <div className="relative w-[340px] bg-zinc-950 rounded-[30px] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            
            {/* --- RIPPLE LAYER --- */}
            {/* We place the ripple here as an overlay. 
                Using 'text-white' allows the currentColor to be white, 
                creating a "Flash" effect on the dark card. */}
            <Ripple 
                className="cursor-pointer" 
                color="text-white" 
                opacity={0.15} // Higher opacity for dramatic effect
                onClick={() => setUnlocked(!unlocked)}
            >
                {/* CARD CONTENT */}
                <div className="h-full w-full p-8 flex flex-col justify-between relative z-20 pointer-events-none">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-[0.2em]">Security Level</h3>
                            <p className="text-white font-bold text-xl">Class A</p>
                        </div>
                        <div className={`p-2 rounded-full border transition-colors duration-500 ${unlocked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                            {unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        </div>
                    </div>

                    {/* Central Graphic */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            <div className={`absolute inset-0 bg-indigo-500 blur-[40px] transition-opacity duration-700 ${unlocked ? 'opacity-40' : 'opacity-0'}`} />
                            <Fingerprint 
                                className={`w-24 h-24 transition-all duration-700 ${unlocked ? 'text-indigo-400 scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]' : 'text-zinc-700 scale-100'}`} 
                                strokeWidth={1} 
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="space-y-6">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-xs">Biometric Scan</p>
                                <p className="text-zinc-300 text-sm font-medium mt-0.5">
                                    {unlocked ? "Access Granted" : "Touch to Authorize"}
                                </p>
                            </div>
                            
                            {/* Small decorative arrow that moves on hover */}
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                                <ChevronRight className="w-5 h-5 text-zinc-400" />
                            </div>
                        </div>
                    </div>

                </div>
            </Ripple>

        </div>
      </div>

      {/* Instruction Label */}
      <div className="absolute bottom-12 text-zinc-500 text-xs font-mono tracking-widest opacity-60">
        INTERACTIVE SURFACE • CLICK ANYWHERE
      </div>

    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/material-design-3-ripple.tsx
import React, {
  useCallback,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";

// --- 1. PHYSICS CONSTANTS ---
// We keep the logic from the button, but make DURATION dynamic
const MINIMUM_PRESS_MS = 300;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const ANIMATION_FILL = "forwards";
const TOUCH_DELAY_MS = 150;
const EASING_STANDARD = "cubic-bezier(0.2, 0, 0, 1)";

// --- 2. TYPES ---
enum RippleState {
  INACTIVE,
  TOUCH_DELAY,
  HOLDING,
  WAITING_FOR_CLICK,
}

interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tailwind text color class for the ripple (e.g., "text-white", "text-blue-500").
   * Defaults to "text-current" (inherits parent text color).
   */
  color?: string;
  /**
   * Base opacity when fully pressed. Default: 0.12
   */
  opacity?: number;
  disabled?: boolean;
}

// --- 3. THE LOGIC (Converted to be self-contained) ---
const Ripple = forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      className,
      children,
      color = "text-current",
      opacity = 0.12,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);
    
    // Internal State
    const stateRef = useRef(RippleState.INACTIVE);
    const rippleStartEventRef = useRef<React.PointerEvent | null>(null);
    const growAnimationRef = useRef<Animation | null>(null);
    
    // Visual State (for opacity transitions)
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Determines if we are wrapping content or sitting inside it
    const isWrapper = React.Children.count(children) > 0;

    // --- GEOMETRY & ANIMATION ---
    const determineRippleSize = () => {
      if (!containerRef.current) return { size: "0px", scale: 1, duration: 450 };
      
      const { height, width } = containerRef.current.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(
        SOFT_EDGE_CONTAINER_RATIO * maxDim,
        SOFT_EDGE_MINIMUM_SIZE
      );

      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;

      // DYNAMIC SPEED CALCULATION
      // Standard button (~200px) gets ~450ms. Large cards get slower.
      // We clamp it between 400ms (fastest) and 1000ms (slowest)
      const dynamicDuration = Math.min(Math.max(400, hypotenuse * 1.5), 1000);

      const rippleScale = (maxRadius + softEdgeSize) / initialSize;

      return {
        size: `${initialSize}px`,
        scale: rippleScale,
        duration: dynamicDuration
      };
    };

    const getTranslationCoordinates = (event?: React.PointerEvent) => {
      if (!containerRef.current) return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
      const { height, width, left, top } = containerRef.current.getBoundingClientRect();
      
      // We need the initial size again for centering
      const maxDim = Math.max(height, width);
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

      const endPoint = {
        x: (width - initialSize) / 2,
        y: (height - initialSize) / 2,
      };

      let startPoint;
      if (event) {
        startPoint = {
          x: event.clientX - left,
          y: event.clientY - top,
        };
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2,
        };
      }

      startPoint = {
        x: startPoint.x - initialSize / 2,
        y: startPoint.y - initialSize / 2,
      };

      return { startPoint, endPoint };
    };

    const startPressAnimation = (event?: React.PointerEvent) => {
      setIsPressed(true);
      if (!rippleRef.current) return;

      growAnimationRef.current?.cancel();
      
      const { size, scale, duration } = determineRippleSize();
      const { startPoint, endPoint } = getTranslationCoordinates(event);

      // Apply initial size immediately
      rippleRef.current.style.width = size;
      rippleRef.current.style.height = size;

      growAnimationRef.current = rippleRef.current.animate(
        {
          top: [0, 0],
          left: [0, 0],
          transform: [
            `translate(${startPoint.x}px, ${startPoint.y}px) scale(1)`,
            `translate(${endPoint.x}px, ${endPoint.y}px) scale(${scale})`,
          ],
        },
        {
          duration: duration, // DYNAMIC DURATION
          easing: EASING_STANDARD,
          fill: ANIMATION_FILL,
        }
      );
    };

    const endPressAnimation = async () => {
      rippleStartEventRef.current = null;
      stateRef.current = RippleState.INACTIVE;
      
      const animation = growAnimationRef.current;
      let pressAnimationPlayState = Infinity;
      
      if (animation && typeof animation.currentTime === 'number') {
          pressAnimationPlayState = animation.currentTime;
      }

      if (pressAnimationPlayState < MINIMUM_PRESS_MS) {
        await new Promise((resolve) => {
          setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
        });
      }

      if (growAnimationRef.current !== animation) {
        return;
      }

      setIsPressed(false);
    };

    // --- EVENT HANDLERS ---
    const isTouch = (event: React.PointerEvent) => event.pointerType === "touch";

    const shouldReactToEvent = (event: React.PointerEvent) => {
      if (disabled || !event.isPrimary) return false;
      if (rippleStartEventRef.current && rippleStartEventRef.current.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return isTouch(event) || isPrimaryButton;
    };

    const handlePointerDown = async (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      rippleStartEventRef.current = event;

      if (!isTouch(event)) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        startPressAnimation(event);
        return;
      }

      stateRef.current = RippleState.TOUCH_DELAY;
      await new Promise((resolve) => setTimeout(resolve, TOUCH_DELAY_MS));

      if (stateRef.current !== RippleState.TOUCH_DELAY) {
        return;
      }

      stateRef.current = RippleState.HOLDING;
      startPressAnimation(event);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      if (stateRef.current === RippleState.HOLDING) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        return;
      }
      if (stateRef.current === RippleState.TOUCH_DELAY) {
        stateRef.current = RippleState.WAITING_FOR_CLICK;
        startPressAnimation(rippleStartEventRef.current || undefined);
        return;
      }
    };

    const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!shouldReactToEvent(event)) return;
      setIsHovered(false);
      if (stateRef.current !== RippleState.INACTIVE) {
          endPressAnimation();
      }
    };

    const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!shouldReactToEvent(event)) return;
        setIsHovered(true);
    }

    const handleClick = () => {
      if (disabled) return;
      if (stateRef.current === RippleState.WAITING_FOR_CLICK) {
          endPressAnimation();
          return;
      }
      if (stateRef.current === RippleState.INACTIVE) {
          startPressAnimation();
          endPressAnimation();
      }
    };

    // Forward ref to container
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    return (
      <div
        ref={containerRef}
        className={cn(
          // 1. Layout Mode: Relative (Wrapper) or Absolute (Overlay)
          isWrapper ? "relative" : "absolute inset-0",
          // 2. Base Styles
          "overflow-hidden isolate z-0 rounded-[inherit]",
          color, // Apply text color for currentcolor inheritance
          className
        )}
        style={style}
        // Event Binding
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Child Content (if any) */}
        {children && (
            <div className="relative z-10 pointer-events-none">
                {children}
            </div>
        )}

        {/* --- RIPPLE LAYERS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            {/* 1. State Layer (Hover) */}
            <div 
                className={cn(
                    "absolute inset-0 bg-current transition-opacity duration-200 ease-linear",
                    isHovered ? "opacity-[0.08]" : "opacity-0"
                )} 
            />
            
            {/* 2. Ripple Effect (Press) */}
            <div 
                ref={rippleRef}
                className="absolute rounded-full opacity-0 bg-current"
                style={{
                    // Exact Gradient from Material Button
                    background: "radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)",
                    transition: "opacity 375ms linear",
                    opacity: isPressed ? opacity : "0",
                    transitionDuration: isPressed ? "105ms" : "375ms"
                }}
            />
        </div>
      </div>
    );
  }
);

Ripple.displayName = "Ripple";

export { Ripple };
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
