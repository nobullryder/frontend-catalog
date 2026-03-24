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
infinite-slider-horizontal.tsx
'use client';
 
// Visit https://kaif-ui.vercel.app/ for more components like this
 
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';
 
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};
 
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
 
  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
 
    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }
 
    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);
 
  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          console.log('hello');
 
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};
 
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

code.demo.1750167021097.tsx
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal"
import Image from "next/image";
 
const images = [
  {
    title: "Image 1",
    image:
      "https://cdn.pixabay.com/photo/2024/09/20/05/39/panda-9060543_640.jpg",
  },
  {
    title: "Image 2",
    image:
      "https://cdn.pixabay.com/photo/2024/04/12/18/18/ai-generated-8692405_1280.jpg",
  },
  {
    title: "Image 3",
    image:
      "https://cdn.pixabay.com/photo/2024/01/10/03/29/ai-generated-8498790_1280.jpg",
  },
  {
    title: "Image 4",
    image:
      "https://cdn.pixabay.com/photo/2024/05/30/17/23/bicycle-8798997_640.jpg",
  },
  {
    title: "Image 5",
    image:
      "https://cdn.pixabay.com/photo/2024/05/26/10/26/ai-generated-8788505_960_720.jpg",
  },
  {
    title: "Image 1 second row",
    image:
      "https://cdn.pixabay.com/photo/2024/09/20/05/39/panda-9060543_640.jpg",
  },
  {
    title: "Image 2 second row",
    image:
      "https://cdn.pixabay.com/photo/2024/04/12/18/18/ai-generated-8692405_1280.jpg",
  },
  {
    title: "Image 3 second row",
    image:
      "https://cdn.pixabay.com/photo/2024/01/10/03/29/ai-generated-8498790_1280.jpg",
  },
  {
    title: "Image 4 second row",
    image:
      "https://cdn.pixabay.com/photo/2024/05/30/17/23/bicycle-8798997_640.jpg",
  },
  {
    title: "Image 5 second row",
    image:
      "https://cdn.pixabay.com/photo/2024/05/26/10/26/ai-generated-8788505_960_720.jpg",
  },
];
 
export function InfiniteSliderHorizontal() {
  return (
    <div className="h-[400px] flex flex-col justify-center gap-4">
      <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
        <InfiniteSlider direction="horizontal">
          {images.map((image) => (
            <div className="aspect-square w-[120px] rounded-[4px]">
              <Image
                key={image.title}
                src={image.image}
                alt={image.title}
                width={1200}
                height={1200}
                className="object-cover h-full w-full rounded-[4px]"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
      <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
        <InfiniteSlider direction="horizontal" reverse>
          {images.map((image) => (
            <div className="aspect-square w-[120px] rounded-[4px]">
              <Image
                key={image.title}
                src={image.image}
                alt={image.title}
                width={1200}
                height={1200}
                className="object-cover h-full w-full rounded-[4px]"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/infinite-slider-horizontal.tsx
'use client';
 
// Visit https://kaif-ui.vercel.app/ for more components like this
 
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';
 
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};
 
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
 
  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
 
    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }
 
    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);
 
  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          console.log('hello');
 
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};
 
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

Install NPM dependencies:
```bash
framer-motion, react-use-measure
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
