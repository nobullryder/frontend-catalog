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
circular-reveal-heading.tsx
"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}


const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-xs',
        tracking: 'tracking-[0.25em]',
        radius: 160,
        gap: 40,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.3em]',
        radius: 160,
        gap: 30,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.35em]',
        radius: 160,
        gap: 20,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    }
};

const usePreloadImages = (images: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
    }, [images]);

    return loaded;
};





const ImagePreloader = ({ images }: { images: string[] }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);
export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image));

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems; // Total space for gaps
        const availableDegrees = 360 - totalGapDegrees; // Remaining space for text
        const segmentDegrees = availableDegrees / totalItems; // Space per text segment
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            filter: 'url(#textShadow)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <textPath
                            href="#curve"
                            className="fill-[url(#textGradient)] hover:fill-[#2d3436]"
                            startOffset={startOffset}
                            textLength={`${segmentDegrees * 1.8}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                whileHover={{
                    boxShadow: "20px 20px 40px #bebebe, -20px -20px 40px #ffffff"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full bg-[#e6e6e6]",
                    "shadow-[16px_16px_32px_#bebebe,-16px_-16px_32px_#ffffff]",
                    "transition-all duration-500 ease-out",
                    className
                )}
            >
                <AnimatePresence>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} size={size} />
                    )}
                </AnimatePresence>

                <motion.div
                    className="absolute inset-[2px] rounded-full bg-[#e6e6e6]"
                    style={{
                        boxShadow: "inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff"
                    }}
                />

                <motion.div
                    className="absolute inset-[12px] rounded-full bg-[#e6e6e6]"
                    style={{
                        boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff"
                    }}
                />

                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 p-6 rounded-3xl bg-[#e6e6e6]"
                                whileHover={{
                                    boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff"
                                }}
                            >
                                {centerText}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#666666" />
                                <stop offset="100%" stopColor="#444444" />
                            </linearGradient>
                        </defs>
                        <path
                            id="curve"
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </>
    );
};

code.demo.tsx
import {CircularRevealHeading} from "@/components/ui/circular-reveal-heading";
// Note: ***When you hover on text it takes some time to load image***
 const items = [
        {
            text: "STRATEGY",
            image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkceCYjHtyWSduj04chzxgP3pt1Dvo8KfCsHnwk"
        },
        {
            text: "DESIGN",
            image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcZY3vRlCe5wpMsRmKntGfIu4E6OSxhgzL3kU1"
        },
        {
            text: "GROWTH",
            image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcz9VsoNLlt5AKuj9HqWQm3NeDUywcLSxB6Yo1"
        },
        {
            text: "INNOVATION",
            image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcypc1wWQBS4VNPtfqkpIhO7M6XUva5TzWomdZ"
        }
    ];

export function MediumCircularRevealHeadingDemo() {


    return (
        <div className="p-16  min-h-screen flex items-center justify-center">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-xl font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="md"
            />
        </div>
    );
}


export function LargeCircularRevealHeadingDemo() {


    return (
        <div className="p-16  min-h-screen flex items-center justify-center">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-2xl font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="lg"
            />
        </div>
    );
}

export function SmallCircularRevealHeadingDemo() {


    return (
        <div className="p-16  min-h-screen flex items-center justify-center">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-sm font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="sm"
            />
        </div>
    );
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/circular-reveal-heading.tsx
"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}


const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-xs',
        tracking: 'tracking-[0.25em]',
        radius: 160,
        gap: 40,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.3em]',
        radius: 160,
        gap: 30,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.35em]',
        radius: 160,
        gap: 20,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    }
};

const usePreloadImages = (images: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
    }, [images]);

    return loaded;
};





const ImagePreloader = ({ images }: { images: string[] }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);
export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image));

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems; // Total space for gaps
        const availableDegrees = 360 - totalGapDegrees; // Remaining space for text
        const segmentDegrees = availableDegrees / totalItems; // Space per text segment
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            filter: 'url(#textShadow)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <textPath
                            href="#curve"
                            className="fill-[url(#textGradient)] hover:fill-[#2d3436]"
                            startOffset={startOffset}
                            textLength={`${segmentDegrees * 1.8}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                whileHover={{
                    boxShadow: "20px 20px 40px #bebebe, -20px -20px 40px #ffffff"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full bg-[#e6e6e6]",
                    "shadow-[16px_16px_32px_#bebebe,-16px_-16px_32px_#ffffff]",
                    "transition-all duration-500 ease-out",
                    className
                )}
            >
                <AnimatePresence>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} size={size} />
                    )}
                </AnimatePresence>

                <motion.div
                    className="absolute inset-[2px] rounded-full bg-[#e6e6e6]"
                    style={{
                        boxShadow: "inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff"
                    }}
                />

                <motion.div
                    className="absolute inset-[12px] rounded-full bg-[#e6e6e6]"
                    style={{
                        boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff"
                    }}
                />

                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 p-6 rounded-3xl bg-[#e6e6e6]"
                                whileHover={{
                                    boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff"
                                }}
                            >
                                {centerText}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#666666" />
                                <stop offset="100%" stopColor="#444444" />
                            </linearGradient>
                        </defs>
                        <path
                            id="curve"
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </>
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
