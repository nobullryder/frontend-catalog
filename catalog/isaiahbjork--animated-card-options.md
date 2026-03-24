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
animated-card-options.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";

export interface CardOption {
  id: string;
  icon: ReactNode;
  name: string;
}

interface AnimatedCardOptionsProps {
  options: CardOption[];
  columns?: number;
  onSelect?: (option: CardOption) => void;
}

export function AnimatedCardOptions({ 
  options, 
  columns = 4, 
  onSelect 
}: AnimatedCardOptionsProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [fadingCards, setFadingCards] = useState<Set<string>>(new Set());

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: (index: number) => ({
      opacity: 1,
      scale: [0.8, 1.01, 1], // Overshoot then settle
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05, // Staggered delay of 50ms per card
        type: "spring",
        stiffness: 500,
        damping: 25,
        scale: {
          type: "tween", // Use tween for keyframes support
          duration: 0.5,
          ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for overshoot
        },
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const handleCardClick = (option: CardOption) => {
    if (selectedCard) return;
    
    setSelectedCard(option.id);
    
    // Create random delays for other cards to fade out
    const otherCards = options.filter(opt => opt.id !== option.id);
    
    otherCards.forEach((card) => {
      setTimeout(() => {
        setFadingCards(prev => new Set([...prev, card.id]));
      }, Math.random() * 300); // Random delay up to 300ms
    });
    
    onSelect?.(option);
  };

  const shouldShowCard = (cardId: string) => {
    if (!selectedCard) return true;
    if (selectedCard === cardId) return true;
    return !fadingCards.has(cardId);
  };

  return (
    <div
      className={`grid gap-3 max-w-4xl mx-auto relative`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {options.map((option, index) => (
        <div key={option.id} className="relative">
          {/* Always maintain grid cell structure */}
          <AnimatePresence mode="wait">
            {shouldShowCard(option.id) ? (
              <motion.div
                key={`card-${option.id}`}
                className={`relative group cursor-pointer ${selectedCard === option.id ? 'z-10' : ''}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={index}
                whileHover={selectedCard ? {} : "hover"}
                onClick={() => handleCardClick(option)}
              >
                <motion.div variants={hoverVariants}>
                  <Card className="h-24 w-full border border-border/50 hover:border-border transition-colors duration-200 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center h-full px-4 space-x-3">
                      <div className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200 truncate">
                          {option.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
              <div key={`placeholder-${option.id}`} className="h-24 w-full" />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}


code.demo.1748626346507.tsx
"use client";

import { AnimatedCardOptions, CardOption } from "@/components/ui/animated-card-options";

export default function Demo() {
  const cardOptions: CardOption[] = [
    {
      id: "1",
      icon: "🎵",
      name: "Music Generation"
    },
    {
      id: "2", 
      icon: "🎙️",
      name: "Voice Synthesis"
    },
    {
      id: "3",
      icon: "🎧",
      name: "Audio Enhancement"
    },
    {
      id: "4",
      icon: "🎼",
      name: "Music Composition"
    },
    {
      id: "5",
      icon: "🎤",
      name: "Voice Cloning"
    },
    {
      id: "6",
      icon: "🔊",
      name: "Sound Effects"
    },
    {
      id: "7",
      icon: "🎶",
      name: "Melody Creator"
    },
    {
      id: "8",
      icon: "🎚️",
      name: "Audio Mixing"
    },
    {
      id: "9",
      icon: "🎹",
      name: "Instrument Synthesis"
    },
    {
      id: "10",
      icon: "🎸",
      name: "Guitar Effects"
    },
    {
      id: "11",
      icon: "🥁",
      name: "Drum Programming"
    },
    {
      id: "12",
      icon: "🎺",
      name: "Orchestral Arrangement"
    },
    {
      id: "13",
      icon: "🎻",
      name: "String Section"
    },
    {
      id: "14",
      icon: "🎪",
      name: "Circus Music"
    },
    {
      id: "15",
      icon: "🎭",
      name: "Theatrical Scores"
    },
    {
      id: "16",
      icon: "🎬",
      name: "Film Scoring"
    }
  ];
  
  const handleCardSelect = (option: CardOption) => {
    console.log("Selected:", option.name);
  };

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Audio Tools
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose from our collection of powerful AI-powered audio tools
          </p>
        </div>
        
        <AnimatedCardOptions 
          options={cardOptions}
          columns={4}
          onSelect={handleCardSelect}
        />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-card-options.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";

export interface CardOption {
  id: string;
  icon: ReactNode;
  name: string;
}

interface AnimatedCardOptionsProps {
  options: CardOption[];
  columns?: number;
  onSelect?: (option: CardOption) => void;
}

export function AnimatedCardOptions({ 
  options, 
  columns = 4, 
  onSelect 
}: AnimatedCardOptionsProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [fadingCards, setFadingCards] = useState<Set<string>>(new Set());

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    animate: (index: number) => ({
      opacity: 1,
      scale: [0.8, 1.01, 1], // Overshoot then settle
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05, // Staggered delay of 50ms per card
        type: "spring",
        stiffness: 500,
        damping: 25,
        scale: {
          type: "tween", // Use tween for keyframes support
          duration: 0.5,
          ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for overshoot
        },
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const handleCardClick = (option: CardOption) => {
    if (selectedCard) return;
    
    setSelectedCard(option.id);
    
    // Create random delays for other cards to fade out
    const otherCards = options.filter(opt => opt.id !== option.id);
    
    otherCards.forEach((card) => {
      setTimeout(() => {
        setFadingCards(prev => new Set([...prev, card.id]));
      }, Math.random() * 300); // Random delay up to 300ms
    });
    
    onSelect?.(option);
  };

  const shouldShowCard = (cardId: string) => {
    if (!selectedCard) return true;
    if (selectedCard === cardId) return true;
    return !fadingCards.has(cardId);
  };

  return (
    <div
      className={`grid gap-3 max-w-4xl mx-auto relative`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {options.map((option, index) => (
        <div key={option.id} className="relative">
          {/* Always maintain grid cell structure */}
          <AnimatePresence mode="wait">
            {shouldShowCard(option.id) ? (
              <motion.div
                key={`card-${option.id}`}
                className={`relative group cursor-pointer ${selectedCard === option.id ? 'z-10' : ''}`}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={index}
                whileHover={selectedCard ? {} : "hover"}
                onClick={() => handleCardClick(option)}
              >
                <motion.div variants={hoverVariants}>
                  <Card className="h-24 w-full border border-border/50 hover:border-border transition-colors duration-200 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center h-full px-4 space-x-3">
                      <div className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200 truncate">
                          {option.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
              <div key={`placeholder-${option.id}`} className="h-24 w-full" />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

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
