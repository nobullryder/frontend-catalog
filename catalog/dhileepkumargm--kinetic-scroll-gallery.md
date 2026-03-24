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
kinetic-scroll-gallery.tsx
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const images = [
    "https://images.pexels.com/photos/1010648/pexels-photo-1010648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8665530/pexels-photo-8665530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const KineticGridItem = ({ image, scrollVelocity }) => {
    // Smooth the velocity value for a more gradual effect
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    // Transform the smoothed velocity into a skew value.
    // The faster the scroll, the more it skews.
    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg"
            style={{ skewX: skew }}
        >
            <img
                src={image}
                alt="A landscape"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                     transform: "scale(1.15)" // Slight zoom to prevent edges showing on skew
                }}
            />
        </motion.div>
    );
};

export default function KineticScrollGallery() {
    const { scrollYProgress } = useScroll();
    
    // Framer Motion's useScroll provides scrollYVelocity, which is a MotionValue
    // representing the velocity of the scroll in pixels per second.
    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000], 
        { clamp: false }
    );

    return (
         <div className="bg-neutral-900 text-neutral-50 min-h-screen">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                 <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Kinetic Scroll Gallery
                    </h1>
                    <p className="mt-4 text-lg text-neutral-300">
                        The faster you scroll, the more the images will distort.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <KineticGridItem 
                            key={index} 
                            image={img} 
                            scrollVelocity={scrollYVelocity} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};



code.demo.1757572096742.tsx
import KineticScrollGallery from "@/components/ui/kinetic-scroll-gallery";

export default function DemoOne() {
  return <div className="App">
  <KineticScrollGallery  />
  </div>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/kinetic-scroll-gallery.tsx
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const images = [
    "https://images.pexels.com/photos/1010648/pexels-photo-1010648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8665530/pexels-photo-8665530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const KineticGridItem = ({ image, scrollVelocity }) => {
    // Smooth the velocity value for a more gradual effect
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    // Transform the smoothed velocity into a skew value.
    // The faster the scroll, the more it skews.
    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg"
            style={{ skewX: skew }}
        >
            <img
                src={image}
                alt="A landscape"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                     transform: "scale(1.15)" // Slight zoom to prevent edges showing on skew
                }}
            />
        </motion.div>
    );
};

export default function KineticScrollGallery() {
    const { scrollYProgress } = useScroll();
    
    // Framer Motion's useScroll provides scrollYVelocity, which is a MotionValue
    // representing the velocity of the scroll in pixels per second.
    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000], 
        { clamp: false }
    );

    return (
         <div className="bg-neutral-900 text-neutral-50 min-h-screen">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                 <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Kinetic Scroll Gallery
                    </h1>
                    <p className="mt-4 text-lg text-neutral-300">
                        The faster you scroll, the more the images will distort.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <KineticGridItem 
                            key={index} 
                            image={img} 
                            scrollVelocity={scrollYVelocity} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


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
