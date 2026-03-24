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
material-design-3-button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// --- 1. TUNED CONSTANTS (Physics Configuration) ---
const PRESS_GROW_MS = 450; 
const MINIMUM_PRESS_MS = 300; 
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const ANIMATION_FILL = "forwards";
const TOUCH_DELAY_MS = 150;

const EASING_STANDARD = "cubic-bezier(0.2, 0, 0, 1)";

// --- 2. TYPES & STATE MACHINE ---
enum RippleState {
  INACTIVE,
  TOUCH_DELAY,
  HOLDING,
  WAITING_FOR_CLICK,
}

// --- 3. THE HOOK (FIXED) ---
const useMaterialRipple = (disabled = false) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const rippleEffectRef = React.useRef<HTMLDivElement>(null);

  const stateRef = React.useRef(RippleState.INACTIVE);
  const rippleStartEventRef = React.useRef<React.PointerEvent | null>(null);
  const growAnimationRef = React.useRef<Animation | null>(null);
  
  const initialSizeRef = React.useRef(0);
  const rippleScaleRef = React.useRef("");
  const rippleSizeRef = React.useRef("");

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

  const determineRippleSize = () => {
    if (!surfaceRef.current) return;
    const { height, width } = surfaceRef.current.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE
    );

    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    initialSizeRef.current = initialSize;
    const rippleScale = (maxRadius + softEdgeSize) / initialSize;
    
    rippleScaleRef.current = `${rippleScale}`;
    rippleSizeRef.current = `${initialSize}px`;
  };

  const getTranslationCoordinates = (event?: React.PointerEvent) => {
    if (!surfaceRef.current) return { startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 } };
    const { height, width, left, top } = surfaceRef.current.getBoundingClientRect();
    
    const endPoint = {
      x: (width - initialSizeRef.current) / 2,
      y: (height - initialSizeRef.current) / 2,
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
      x: startPoint.x - initialSizeRef.current / 2,
      y: startPoint.y - initialSizeRef.current / 2,
    };

    return { startPoint, endPoint };
  };

  const startPressAnimation = (event?: React.PointerEvent) => {
    // FIXED: Always set pressed state first, regardless of refs
    setPressed(true);
    
    // Only run animation if refs are available (for ripple effect)
    if (!rippleEffectRef.current) return;
    
    growAnimationRef.current?.cancel();
    determineRippleSize();
    
    const { startPoint, endPoint } = getTranslationCoordinates(event);
    
    growAnimationRef.current = rippleEffectRef.current.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [rippleSizeRef.current, rippleSizeRef.current],
        width: [rippleSizeRef.current, rippleSizeRef.current],
        transform: [
          `translate(${startPoint.x}px, ${startPoint.y}px) scale(1)`,
          `translate(${endPoint.x}px, ${endPoint.y}px) scale(${rippleScaleRef.current})`,
        ],
      },
      {
        duration: PRESS_GROW_MS,
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

    // Always clear pressed state
    setPressed(false);
  };

  const handlePointerDown = async (event: React.PointerEvent) => {
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

  const handlePointerUp = (event: React.PointerEvent) => {
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

  const handlePointerEnter = (event: React.PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(true);
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(false);
    if (stateRef.current !== RippleState.INACTIVE) {
        endPressAnimation();
    }
  };

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

  return {
    surfaceRef,
    rippleEffectRef,
    hovered,
    pressed,
    events: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onClick: handleClick,
      onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
      }
    }
  };
};

// --- 4. RIPPLE COMPONENT ---
const Ripple = React.forwardRef<HTMLDivElement, { hovered: boolean, pressed: boolean, rippleEffectRef: React.RefObject<HTMLDivElement> }>(
  ({ hovered, pressed, rippleEffectRef }, ref) => {
    return (
      <div 
        ref={ref} 
        className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0 surface"
        aria-hidden="true"
      >
        <div 
            className={cn(
                "absolute inset-0 bg-current transition-opacity duration-[15ms] linear",
                hovered ? "opacity-[0.08]" : "opacity-0" 
            )} 
        />
        <div 
            ref={rippleEffectRef}
            className="absolute rounded-full opacity-0 bg-current"
            style={{
                background: "radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)",
                transition: "opacity 375ms linear",
                opacity: pressed ? "0.12" : "0",
                transitionDuration: pressed ? "105ms" : "375ms"
            }}
        />
      </div>
    );
  }
);
Ripple.displayName = "Ripple";

// --- 5. BUTTON COMPONENT ---
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-[0.01em] transition-all duration-600 delay-250 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 disabled:shadow-none",
  {
    variants: {
      variant: {
        filled: "bg-primary text-primary-foreground shadow-sm",
        elevated: "bg-secondary text-primary shadow-md data-[pressed=true]:shadow-none",
        tonal: "bg-secondary text-secondary-foreground shadow-none",
        outlined: "border border-border bg-transparent text-primary shadow-none",
        text: "bg-transparent text-primary shadow-none",
        destructive: "bg-destructive text-destructive-foreground shadow-sm",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        fab: "h-14 w-14 text-base",
      },
      shape: {
        round: "rounded-full data-[pressed=true]:rounded-xl data-[pressed=true]:duration-0 data-[pressed=true]:delay-0",
        square: "rounded-xl data-[pressed=true]:rounded-xl data-[pressed=true]:duration-0 data-[pressed=true]:delay-0",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
      shape: "round",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  noRipple?: boolean;
  noMorph?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, noRipple = false, noMorph = false, onClick, style, children, ...props }, ref) => {
    
    // Optimization: If both visual effects are disabled, disable the hook logic
    const isRippleLogicDisabled = props.disabled || (noRipple && noMorph);
    const { surfaceRef, rippleEffectRef, hovered, pressed, events } = useMaterialRipple(isRippleLogicDisabled);

    // Common props for both Button and Slot
    const componentProps = {
      className: cn(buttonVariants({ variant, size, shape, className })),
      style: style,
      "data-pressed": noMorph ? undefined : pressed,
      ...events,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        events.onClick();
        onClick?.(e);
      },
      ...props
    };

    // RENDER LOGIC:
    if (asChild) {
       const child = React.Children.only(children) as React.ReactElement;
       
       return (
         <Slot ref={ref} {...componentProps}>
            {React.cloneElement(child, {
              children: (
                <>
                   {/* Inject Ripple inside the custom child */}
                   {!noRipple && (
                     <Ripple 
                       ref={surfaceRef} 
                       rippleEffectRef={rippleEffectRef}
                       hovered={hovered} 
                       pressed={pressed} 
                     />
                   )}
                   {/* Wrap content to ensure z-index layering above ripple */}
                   <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                     {child.props.children}
                   </span>
                </>
              )
            })}
         </Slot>
       );
    }

    return (
      <button ref={ref} {...componentProps}>
         {!noRipple && (
            <Ripple 
                ref={surfaceRef} 
                rippleEffectRef={rippleEffectRef}
                hovered={hovered} 
                pressed={pressed} 
            />
         )}
         <span className="relative z-10 flex items-center gap-2 pointer-events-none">
           {children}
         </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

code.demo.1768417358525.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/material-design-3-button";
import { 
  Plus, 
  Settings, 
  Share2, 
  Trash2, 
  ArrowLeft,
  ArrowRight,
  LayoutGrid
} from "lucide-react";

/**
 * Main Interactive Demo Component
 * Manages view state and transition animations.
 */
export default function InteractiveDemo() {
  const [showAll, setShowAll] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleSeeAll = () => {
    setIsFading(true);
    setTimeout(() => {
      setShowAll(true);
      setIsFading(false);
    }, 300);
  };

  const handleBack = () => {
    setIsFading(true);
    setTimeout(() => {
      setShowAll(false);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-8 font-sans">
      <div className={`transition-all duration-300 ease-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} w-full flex justify-center`}>
        {showAll ? (
          <AllButtonsView onBack={handleBack} />
        ) : (
          <SimpleButtonGrid onSeeAll={handleSeeAll} />
        )}
      </div>
    </div>
  );
}

// --- VIEW 1: Simple Grid Table (Fixed Dimensions) ---
function SimpleButtonGrid({ onSeeAll }: { onSeeAll: () => void }) {
  // Using fixed dimensions: 192px x 192px

  return (
    <div className="w-fit shadow-2xl rounded-2xl overflow-hidden border border-border/50 bg-card">
      
      {/* The 2x2 Grid with fixed-size cells */}
      <div className="grid grid-cols-2 gap-8 p-6 bg-border/20">
        
        {/* Button 1 */}
        <div className={`flex items-center justify-center `}>
          <Button variant="filled">
            <Plus className="w-5 h-5" /> Create
          </Button>
        </div>

        {/* Button 2 */}
        <div className={`flex items-center justify-center `}>
          <Button variant="tonal">
            <Settings className="w-5 h-5" /> Settings
          </Button>
        </div>

        {/* Button 3 */}
        <div className={`flex items-center justify-center `}>
          <Button variant="outlined">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>

        {/* Button 4 */}
        <div className={`flex items-center justify-center `}>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>

      </div>

      {/* Bottom "See All" Action Area */}
      <div className="border-t border-border/20 p-4">
        <Button 
          variant="text" 
          className="w-full"
          size="lg" 
          onClick={onSeeAll}
        >
          See All Components <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  );
}

// --- VIEW 2: All Buttons Showcase ---
function AllButtonsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full max-w-3xl bg-card rounded-[32px] p-8 shadow-xl border border-border/50">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="tonal" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Component Showcase</h2>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* 1. Main Variants */}
        <div className="flex flex-col gap-4">
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-70">Standard</span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="filled">Filled</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="outlined" shape="square">Square</Button>
            <Button variant="outlined" noMorph>No Morph</Button>
            <Button variant="tonal" noRipple>No Ripple</Button>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        {/* 2. Icons and Special Variants */}
        <div className="flex flex-col gap-4">
          <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-70">Icons and Destructive</span>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="filled">
              <Plus className="w-[18px] h-[18px]" /> Icon Left
            </Button>
            <div className="flex gap-4">
              <Button variant="filled" size="icon">
                <Plus className="w-6 h-6" />
              </Button>
              <Button variant="tonal" size="icon">
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button variant="outlined" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/material-design-3-button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// --- 1. TUNED CONSTANTS (Physics Configuration) ---
const PRESS_GROW_MS = 450; 
const MINIMUM_PRESS_MS = 300; 
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const ANIMATION_FILL = "forwards";
const TOUCH_DELAY_MS = 150;

const EASING_STANDARD = "cubic-bezier(0.2, 0, 0, 1)";

// --- 2. TYPES & STATE MACHINE ---
enum RippleState {
  INACTIVE,
  TOUCH_DELAY,
  HOLDING,
  WAITING_FOR_CLICK,
}

// --- 3. THE HOOK (FIXED) ---
const useMaterialRipple = (disabled = false) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const rippleEffectRef = React.useRef<HTMLDivElement>(null);

  const stateRef = React.useRef(RippleState.INACTIVE);
  const rippleStartEventRef = React.useRef<React.PointerEvent | null>(null);
  const growAnimationRef = React.useRef<Animation | null>(null);
  
  const initialSizeRef = React.useRef(0);
  const rippleScaleRef = React.useRef("");
  const rippleSizeRef = React.useRef("");

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

  const determineRippleSize = () => {
    if (!surfaceRef.current) return;
    const { height, width } = surfaceRef.current.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE
    );

    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    initialSizeRef.current = initialSize;
    const rippleScale = (maxRadius + softEdgeSize) / initialSize;
    
    rippleScaleRef.current = `${rippleScale}`;
    rippleSizeRef.current = `${initialSize}px`;
  };

  const getTranslationCoordinates = (event?: React.PointerEvent) => {
    if (!surfaceRef.current) return { startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 } };
    const { height, width, left, top } = surfaceRef.current.getBoundingClientRect();
    
    const endPoint = {
      x: (width - initialSizeRef.current) / 2,
      y: (height - initialSizeRef.current) / 2,
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
      x: startPoint.x - initialSizeRef.current / 2,
      y: startPoint.y - initialSizeRef.current / 2,
    };

    return { startPoint, endPoint };
  };

  const startPressAnimation = (event?: React.PointerEvent) => {
    // FIXED: Always set pressed state first, regardless of refs
    setPressed(true);
    
    // Only run animation if refs are available (for ripple effect)
    if (!rippleEffectRef.current) return;
    
    growAnimationRef.current?.cancel();
    determineRippleSize();
    
    const { startPoint, endPoint } = getTranslationCoordinates(event);
    
    growAnimationRef.current = rippleEffectRef.current.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [rippleSizeRef.current, rippleSizeRef.current],
        width: [rippleSizeRef.current, rippleSizeRef.current],
        transform: [
          `translate(${startPoint.x}px, ${startPoint.y}px) scale(1)`,
          `translate(${endPoint.x}px, ${endPoint.y}px) scale(${rippleScaleRef.current})`,
        ],
      },
      {
        duration: PRESS_GROW_MS,
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

    // Always clear pressed state
    setPressed(false);
  };

  const handlePointerDown = async (event: React.PointerEvent) => {
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

  const handlePointerUp = (event: React.PointerEvent) => {
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

  const handlePointerEnter = (event: React.PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(true);
  };

  const handlePointerLeave = (event: React.PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(false);
    if (stateRef.current !== RippleState.INACTIVE) {
        endPressAnimation();
    }
  };

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

  return {
    surfaceRef,
    rippleEffectRef,
    hovered,
    pressed,
    events: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onClick: handleClick,
      onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
      }
    }
  };
};

// --- 4. RIPPLE COMPONENT ---
const Ripple = React.forwardRef<HTMLDivElement, { hovered: boolean, pressed: boolean, rippleEffectRef: React.RefObject<HTMLDivElement> }>(
  ({ hovered, pressed, rippleEffectRef }, ref) => {
    return (
      <div 
        ref={ref} 
        className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0 surface"
        aria-hidden="true"
      >
        <div 
            className={cn(
                "absolute inset-0 bg-current transition-opacity duration-[15ms] linear",
                hovered ? "opacity-[0.08]" : "opacity-0" 
            )} 
        />
        <div 
            ref={rippleEffectRef}
            className="absolute rounded-full opacity-0 bg-current"
            style={{
                background: "radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)",
                transition: "opacity 375ms linear",
                opacity: pressed ? "0.12" : "0",
                transitionDuration: pressed ? "105ms" : "375ms"
            }}
        />
      </div>
    );
  }
);
Ripple.displayName = "Ripple";

// --- 5. BUTTON COMPONENT ---
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-[0.01em] transition-all duration-600 delay-250 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 disabled:shadow-none",
  {
    variants: {
      variant: {
        filled: "bg-primary text-primary-foreground shadow-sm",
        elevated: "bg-secondary text-primary shadow-md data-[pressed=true]:shadow-none",
        tonal: "bg-secondary text-secondary-foreground shadow-none",
        outlined: "border border-border bg-transparent text-primary shadow-none",
        text: "bg-transparent text-primary shadow-none",
        destructive: "bg-destructive text-destructive-foreground shadow-sm",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        fab: "h-14 w-14 text-base",
      },
      shape: {
        round: "rounded-full data-[pressed=true]:rounded-xl data-[pressed=true]:duration-0 data-[pressed=true]:delay-0",
        square: "rounded-xl data-[pressed=true]:rounded-xl data-[pressed=true]:duration-0 data-[pressed=true]:delay-0",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
      shape: "round",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  noRipple?: boolean;
  noMorph?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, noRipple = false, noMorph = false, onClick, style, children, ...props }, ref) => {
    
    // Optimization: If both visual effects are disabled, disable the hook logic
    const isRippleLogicDisabled = props.disabled || (noRipple && noMorph);
    const { surfaceRef, rippleEffectRef, hovered, pressed, events } = useMaterialRipple(isRippleLogicDisabled);

    // Common props for both Button and Slot
    const componentProps = {
      className: cn(buttonVariants({ variant, size, shape, className })),
      style: style,
      "data-pressed": noMorph ? undefined : pressed,
      ...events,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        events.onClick();
        onClick?.(e);
      },
      ...props
    };

    // RENDER LOGIC:
    if (asChild) {
       const child = React.Children.only(children) as React.ReactElement;
       
       return (
         <Slot ref={ref} {...componentProps}>
            {React.cloneElement(child, {
              children: (
                <>
                   {/* Inject Ripple inside the custom child */}
                   {!noRipple && (
                     <Ripple 
                       ref={surfaceRef} 
                       rippleEffectRef={rippleEffectRef}
                       hovered={hovered} 
                       pressed={pressed} 
                     />
                   )}
                   {/* Wrap content to ensure z-index layering above ripple */}
                   <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                     {child.props.children}
                   </span>
                </>
              )
            })}
         </Slot>
       );
    }

    return (
      <button ref={ref} {...componentProps}>
         {!noRipple && (
            <Ripple 
                ref={surfaceRef} 
                rippleEffectRef={rippleEffectRef}
                hovered={hovered} 
                pressed={pressed} 
            />
         )}
         <span className="relative z-10 flex items-center gap-2 pointer-events-none">
           {children}
         </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

Install NPM dependencies:
```bash
@radix-ui/react-slot, class-variance-authority
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
