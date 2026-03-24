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
image-stack.tsx
'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, PanInfo, Variants } from 'framer-motion';

interface Card {
  id: number;
  src: string;
  zIndex: number;
}

interface ImgStackProps {
  images: string[];
}

export default function ImgStack({ images }: ImgStackProps) {
    const [cards, setCards] = useState<Card[]>(
        images.map((src, index) => ({
            id: index,
            src: src,
            zIndex: 50 - (index * 10)
        }))
    );
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const minDragDistance: number = 50;

    const getCardStyles = (index: number) => {
        // Always return tiled state - no initial animation to prevent jumping
        const baseRotation = 2; // Base tilt angle
        const rotationIncrement = 3; // Additional tilt per card
        const offsetIncrement = -12; // Horizontal offset per card
        const verticalOffset = -8; // Vertical offset per card

        return {
            x: index * offsetIncrement,
            y: index * verticalOffset,
            // Keep first card straight (index 0), others get tilt
            rotate: index === 0 ? 0 : -(baseRotation + (index * rotationIncrement)),
            scale: 1,
            transition: { duration: 0.5 }
        };
    };

    const handleDragStart = (_: any, info: PanInfo) => {
        dragStartPos.current = { x: info.point.x, y: info.point.y };
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const dragDistance = Math.sqrt(
            Math.pow(info.point.x - dragStartPos.current.x, 2) +
            Math.pow(info.point.y - dragStartPos.current.y, 2)
        );

        if (isAnimating) return;

        if (dragDistance < minDragDistance) {
            // Let Motion handle the snap-back automatically by not doing anything
            return;
        }

        setIsAnimating(true);

        // Move card to back and reassign proper z-index values
        setCards(prevCards => {
            const newCards = [...prevCards];
            const cardToMove = newCards.shift()!; // Remove first card
            newCards.push(cardToMove); // Add to end

            // Reassign z-index values to maintain proper stacking order
            return newCards.map((card, index) => ({
                ...card,
                zIndex: 50 - (index * 10) // Top card gets 50, next gets 40, etc.
            }));
        });

        // Brief delay to allow the position change to register
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="relative flex items-center justify-center w-96 h-96 my-12">
            {cards.map((card: Card, index: number) => {
                const isTopCard = index === 0;
                const cardStyles = getCardStyles(index);
                const canDrag = isTopCard && !isAnimating;

                return (
                    <motion.div
                        key={card.id}
                        className="absolute w-64 origin-bottom-center overflow-hidden rounded-xl shadow-xl bg-white cursor-grab active:cursor-grabbing border border-gray-100"
                        style={{
                            zIndex: card.zIndex,
                            aspectRatio: '5/7'
                        }}
                        animate={cardStyles}
                        drag={canDrag}
                        dragElastic={0.2}
                        dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                        dragSnapToOrigin={true}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        whileHover={isTopCard ? {
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        } : {}}
                        whileDrag={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            transition: { duration: 0.1 }
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={`Card ${card.id + 1}`}
                            fill
                            className="object-cover rounded-lg pointer-events-none"
                            sizes="(max-width: 768px) 100vw, 200px"
                            draggable={false}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

code.demo.1758733431540.tsx
import ImgStack from "@/components/ui/image-stack";

export default function DemoOne() {
  const imageUrls: string[] = [
    'https://res.cloudinary.com/dctgknnt7/image/upload/v1758731403/1_d8uozd.jpg',
    'https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/5_ionpyy.jpg',
    'https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/4_zeoqje.jpg',
    'https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/3_nfdtim.jpg',
    'https://res.cloudinary.com/dctgknnt7/image/upload/v1758731402/2_hme6yu.jpg',
  ];

  return (
    <main className="w-full p-6 flex">
      <div className="w-full flex-1">
        <div className="h-full flex items-center justify-center">
          <ImgStack images={imageUrls} />
        </div>
      </div>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-stack.tsx
'use client'
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, PanInfo, Variants } from 'framer-motion';

interface Card {
  id: number;
  src: string;
  zIndex: number;
}

interface ImgStackProps {
  images: string[];
}

export default function ImgStack({ images }: ImgStackProps) {
    const [cards, setCards] = useState<Card[]>(
        images.map((src, index) => ({
            id: index,
            src: src,
            zIndex: 50 - (index * 10)
        }))
    );
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const minDragDistance: number = 50;

    const getCardStyles = (index: number) => {
        // Always return tiled state - no initial animation to prevent jumping
        const baseRotation = 2; // Base tilt angle
        const rotationIncrement = 3; // Additional tilt per card
        const offsetIncrement = -12; // Horizontal offset per card
        const verticalOffset = -8; // Vertical offset per card

        return {
            x: index * offsetIncrement,
            y: index * verticalOffset,
            // Keep first card straight (index 0), others get tilt
            rotate: index === 0 ? 0 : -(baseRotation + (index * rotationIncrement)),
            scale: 1,
            transition: { duration: 0.5 }
        };
    };

    const handleDragStart = (_: any, info: PanInfo) => {
        dragStartPos.current = { x: info.point.x, y: info.point.y };
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const dragDistance = Math.sqrt(
            Math.pow(info.point.x - dragStartPos.current.x, 2) +
            Math.pow(info.point.y - dragStartPos.current.y, 2)
        );

        if (isAnimating) return;

        if (dragDistance < minDragDistance) {
            // Let Motion handle the snap-back automatically by not doing anything
            return;
        }

        setIsAnimating(true);

        // Move card to back and reassign proper z-index values
        setCards(prevCards => {
            const newCards = [...prevCards];
            const cardToMove = newCards.shift()!; // Remove first card
            newCards.push(cardToMove); // Add to end

            // Reassign z-index values to maintain proper stacking order
            return newCards.map((card, index) => ({
                ...card,
                zIndex: 50 - (index * 10) // Top card gets 50, next gets 40, etc.
            }));
        });

        // Brief delay to allow the position change to register
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="relative flex items-center justify-center w-96 h-96 my-12">
            {cards.map((card: Card, index: number) => {
                const isTopCard = index === 0;
                const cardStyles = getCardStyles(index);
                const canDrag = isTopCard && !isAnimating;

                return (
                    <motion.div
                        key={card.id}
                        className="absolute w-64 origin-bottom-center overflow-hidden rounded-xl shadow-xl bg-white cursor-grab active:cursor-grabbing border border-gray-100"
                        style={{
                            zIndex: card.zIndex,
                            aspectRatio: '5/7'
                        }}
                        animate={cardStyles}
                        drag={canDrag}
                        dragElastic={0.2}
                        dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                        dragSnapToOrigin={true}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        whileHover={isTopCard ? {
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        } : {}}
                        whileDrag={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            transition: { duration: 0.1 }
                        }}
                    >
                        <Image
                            src={card.src}
                            alt={`Card ${card.id + 1}`}
                            fill
                            className="object-cover rounded-lg pointer-events-none"
                            sizes="(max-width: 768px) 100vw, 200px"
                            draggable={false}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
```

Install NPM dependencies:
```bash
next, framer-motion
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
