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
thanos-snap-effect.tsx
/** 
 * Highly inspired by Mikhail Bespalov's codepen
 * https://codepen.io/Mikhail-Bespalov/pen/yLmpxOG
*/

import { useRef, type PropsWithChildren } from 'react';
import {
  m,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';

const DURATION_SECONDS = 0.6;
const MAX_DISPLACEMENT = 300;
const OPACITY_CHANGE_START = 0.5;
const transition = {
  duration: DURATION_SECONDS,
  ease: (time: number) => 1 - Math.pow(1 - time, 3),
};

export function ThanosSnapEffect({ children }: PropsWithChildren) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const dissolveTargetRef = useRef<HTMLDivElement>(null);
  const displacement = useMotionValue(0);

  useMotionValueEvent(displacement, "change", (latest) => {
    displacementMapRef.current?.setAttribute('scale', latest.toString());
  });

  const handleClick = async () => {
    if (scope.current.dataset.isAnimating === 'true') return;
    scope.current.dataset.isAnimating = 'true';

    await Promise.all([
      animate(
        dissolveTargetRef.current!,
        { scale: 1.2, opacity: [1, 1, 0] },
        { ...transition, times: [0, OPACITY_CHANGE_START, 1] }
      ),
      animate(displacement, MAX_DISPLACEMENT, transition)
    ]);

    setTimeout(() => {
      animate(dissolveTargetRef.current!, { scale: 1, opacity: 1 }, { duration: 0 });
      displacement.set(0);
      scope.current.dataset.isAnimating = 'false';
    }, 500);
  };

  return (
    <div ref={scope}>
      <m.div
        ref={dissolveTargetRef}
        onClick={handleClick}
        className="cursor-pointer filter-[url(#dissolve-filter)]"
      >
        {children}
      </m.div>

      <svg width="0" height="0" className="absolute -z-1">
        <defs>
          <filter
            id="dissolve-filter"
            x="-300%"
            y="-300%"
            width="600%"
            height="600%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="1"
              result="bigNoise"
            />
            <feComponentTransfer
              in="bigNoise"
              result="bigNoiseAdjusted"
            >
              <feFuncR type="linear" slope="0.5" intercept="-0.2" />
              <feFuncG type="linear" slope="3" intercept="-0.6" />
            </feComponentTransfer>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="2"
              result="fineNoise"
            />
            <feMerge result="combinedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="combinedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};


code.demo.1749657553218.tsx
import {
  AnimatePresence,
} from "motion/react"
import { Trash2 } from "lucide-react"

import { ThanosSnapEffect } from "@/components/ui/thanos-snap-effect";

const DemoOne = () => {
  return (
    <div className="text-white">
      <AnimatePresence mode="wait">
        <ThanosSnapEffect>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90 h-9 px-4 py-2 gap-2">
            <Trash2 size={16} strokeWidth={2} />
            Click to delete
          </button>
        </ThanosSnapEffect>
      </AnimatePresence>
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/thanos-snap-effect.tsx
/** 
 * Highly inspired by Mikhail Bespalov's codepen
 * https://codepen.io/Mikhail-Bespalov/pen/yLmpxOG
*/

import { useRef, type PropsWithChildren } from 'react';
import {
  m,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';

const DURATION_SECONDS = 0.6;
const MAX_DISPLACEMENT = 300;
const OPACITY_CHANGE_START = 0.5;
const transition = {
  duration: DURATION_SECONDS,
  ease: (time: number) => 1 - Math.pow(1 - time, 3),
};

export function ThanosSnapEffect({ children }: PropsWithChildren) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const dissolveTargetRef = useRef<HTMLDivElement>(null);
  const displacement = useMotionValue(0);

  useMotionValueEvent(displacement, "change", (latest) => {
    displacementMapRef.current?.setAttribute('scale', latest.toString());
  });

  const handleClick = async () => {
    if (scope.current.dataset.isAnimating === 'true') return;
    scope.current.dataset.isAnimating = 'true';

    await Promise.all([
      animate(
        dissolveTargetRef.current!,
        { scale: 1.2, opacity: [1, 1, 0] },
        { ...transition, times: [0, OPACITY_CHANGE_START, 1] }
      ),
      animate(displacement, MAX_DISPLACEMENT, transition)
    ]);

    setTimeout(() => {
      animate(dissolveTargetRef.current!, { scale: 1, opacity: 1 }, { duration: 0 });
      displacement.set(0);
      scope.current.dataset.isAnimating = 'false';
    }, 500);
  };

  return (
    <div ref={scope}>
      <m.div
        ref={dissolveTargetRef}
        onClick={handleClick}
        className="cursor-pointer filter-[url(#dissolve-filter)]"
      >
        {children}
      </m.div>

      <svg width="0" height="0" className="absolute -z-1">
        <defs>
          <filter
            id="dissolve-filter"
            x="-300%"
            y="-300%"
            width="600%"
            height="600%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="1"
              result="bigNoise"
            />
            <feComponentTransfer
              in="bigNoise"
              result="bigNoiseAdjusted"
            >
              <feFuncR type="linear" slope="0.5" intercept="-0.2" />
              <feFuncG type="linear" slope="3" intercept="-0.6" />
            </feComponentTransfer>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="2"
              result="fineNoise"
            />
            <feMerge result="combinedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="combinedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
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
