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
masonry-grid.tsx
// components/ui/masonry-grid.tsx
import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the MasonryGrid component.
 * @template T - The type of the items in the grid.
 */
interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  gap?: string;
  staggerDelay?: number;
}

// ✨ NEW: A self-contained GridItem component to handle advanced animations
const GridItem = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smoother transform changes
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position into 3D rotation
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['10deg', '-10deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-10deg', '10deg']
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    // Normalize mouse position to a range of -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const MasonryGrid = <T,>({
  items,
  renderItem,
  className,
  gap = '1rem',
  staggerDelay = 0.05,
}: MasonryGridProps<T>) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('w-full', className)}
      style={{ columnGap: gap }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      role="list"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-4 break-inside-avoid"
          variants={itemVariants}
          role="listitem"
        >
          {/* ✨ Using the new GridItem wrapper for the parallax effect */}
          <GridItem>{renderItem(item, index)}</GridItem>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;

code.demo.1758365643113.tsx
// demo.tsx
import React from 'react';
import MasonryGrid from '@/components/ui/masonry-grid'; // Adjust path as needed

// Sample data for the demo
const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1757351122506-3c6a394e9cd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
  { id: 2, src: 'https://images.unsplash.com/photo-1756804528328-8ac54d25b49e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg1fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
  { id: 3, src: 'https://images.unsplash.com/photo-1756634355438-3a6837b62e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDk2fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D?w=800&h=1000' },
  { id: 4, src: 'https://images.unsplash.com/photo-1756489362450-72d440d52a2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExNHx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 5, src: 'https://images.unsplash.com/photo-1534083220759-4c3c00112ea0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzM3x0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 6, src: 'https://images.unsplash.com/photo-1756408263381-ed1488d9b1ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOXx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 7, src: 'https://images.unsplash.com/photo-1755529905229-e0536cf889d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0MXx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 8, src: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI1Mnx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 9, src: 'https://images.unsplash.com/photo-1594234591488-128c2968837a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4MHx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 10, src: 'https://images.unsplash.com/photo-1753828335589-8fee07cb4cec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4NHx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 11, src: 'https://images.unsplash.com/photo-1700234272458-cdad09b6b7ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5OHx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8' },
  { id: 12, src: 'https://images.unsplash.com/photo-1676211505690-673cb85feaa4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8' },
  { id: 13, src: 'https://images.unsplash.com/photo-1683660107710-c8464f63d1b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8' },
  { id: 8, src: 'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 9, src: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 10, src: 'https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 11, src: 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 12, src: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 13, src: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D' }
];

const MasonryGridDemo = () => {
  return (
    <div className="w-full min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
            Inspiration Gallery
          </h1>
          <p className="text-lg text-muted-foreground">
            A showcase of nature's beauty
          </p>
        </div>

        <MasonryGrid
          items={galleryItems}
          // Responsive columns controlled by Tailwind classes
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          gap="1rem"
          renderItem={(item) => (
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card">
              <img
                src={item.src}
                alt={`Gallery item ${item.id}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MasonryGridDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/masonry-grid.tsx
// components/ui/masonry-grid.tsx
import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the MasonryGrid component.
 * @template T - The type of the items in the grid.
 */
interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  gap?: string;
  staggerDelay?: number;
}

// ✨ NEW: A self-contained GridItem component to handle advanced animations
const GridItem = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smoother transform changes
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform mouse position into 3D rotation
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['10deg', '-10deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-10deg', '10deg']
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    // Normalize mouse position to a range of -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const MasonryGrid = <T,>({
  items,
  renderItem,
  className,
  gap = '1rem',
  staggerDelay = 0.05,
}: MasonryGridProps<T>) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('w-full', className)}
      style={{ columnGap: gap }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      role="list"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-4 break-inside-avoid"
          variants={itemVariants}
          role="listitem"
        >
          {/* ✨ Using the new GridItem wrapper for the parallax effect */}
          <GridItem>{renderItem(item, index)}</GridItem>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;
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
