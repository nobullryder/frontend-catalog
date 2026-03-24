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
card-7.tsx
// components/ui/travel-route-card.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props for the component
interface TravelRouteCardProps {
  title: string;
  author: string;
  distance: string;
  initialLikes: number;
  imageUrl: string;
  className?: string;
}

// Helper for formatting large numbers
const formatLikes = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const TravelRouteCard: React.FC<TravelRouteCardProps> = ({
  title,
  author,
  distance,
  initialLikes,
  imageUrl,
  className,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={cn(
        'relative w-full max-w-md h-56 rounded-2xl overflow-hidden p-6 text-white shadow-lg flex items-end isolate',
        className
      )}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <img src={imageUrl} alt="Route map" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-500/60 dark:bg-blue-800/70" />
      </div>
      
      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-3 gap-4 items-end">
        {/* Left Section: Info & Likes */}
        <div className="col-span-2 flex flex-col justify-end h-full">
          <div className="space-y-2">
            <motion.h2 variants={itemVariants} className="text-xl font-bold leading-tight">
              {title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm opacity-80">
              {author}
            </motion.p>
          </div>
          <motion.button
            variants={itemVariants}
            onClick={handleLikeClick}
            className={cn(
              'mt-4 flex items-center gap-2 w-fit px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300',
              isLiked
                ? 'bg-red-500/80 text-white'
                : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
            )}
          >
            <motion.div whileTap={{ scale: 1.3 }}>
              <Heart
                className={cn('w-5 h-5 transition-all', isLiked ? 'fill-current' : 'fill-transparent')}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span
                key={likes}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-10 text-left"
              >
                {formatLikes(likes)}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Right Section: Distance */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 flex items-center justify-center"
        >
          <h1 className="text-8xl font-bold tracking-tighter text-white/90 select-none">
            {distance}
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

code.demo.1758073775404.tsx
// demo.tsx

import React from 'react';
import { TravelRouteCard } from '@/components/ui/card-7';

const TravelRouteCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <TravelRouteCard
        title="Rute dalam kota sekalian wisata"
        author="By Pak Eko"
        distance="12K"
        initialLikes={1527}
        imageUrl="https://plus.unsplash.com/premium_photo-1672046217997-4e40a3d7987d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHJ1bnxlbnwwfHwwfHx8MA%3D%3D?q=80&w=2542&auto=format&fit=crop"
        className="font-sans"
      />
    </div>
  );
};

export default TravelRouteCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-7.tsx
// components/ui/travel-route-card.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props for the component
interface TravelRouteCardProps {
  title: string;
  author: string;
  distance: string;
  initialLikes: number;
  imageUrl: string;
  className?: string;
}

// Helper for formatting large numbers
const formatLikes = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const TravelRouteCard: React.FC<TravelRouteCardProps> = ({
  title,
  author,
  distance,
  initialLikes,
  imageUrl,
  className,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={cn(
        'relative w-full max-w-md h-56 rounded-2xl overflow-hidden p-6 text-white shadow-lg flex items-end isolate',
        className
      )}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <img src={imageUrl} alt="Route map" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-500/60 dark:bg-blue-800/70" />
      </div>
      
      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-3 gap-4 items-end">
        {/* Left Section: Info & Likes */}
        <div className="col-span-2 flex flex-col justify-end h-full">
          <div className="space-y-2">
            <motion.h2 variants={itemVariants} className="text-xl font-bold leading-tight">
              {title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm opacity-80">
              {author}
            </motion.p>
          </div>
          <motion.button
            variants={itemVariants}
            onClick={handleLikeClick}
            className={cn(
              'mt-4 flex items-center gap-2 w-fit px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300',
              isLiked
                ? 'bg-red-500/80 text-white'
                : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
            )}
          >
            <motion.div whileTap={{ scale: 1.3 }}>
              <Heart
                className={cn('w-5 h-5 transition-all', isLiked ? 'fill-current' : 'fill-transparent')}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span
                key={likes}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-10 text-left"
              >
                {formatLikes(likes)}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Right Section: Distance */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 flex items-center justify-center"
        >
          <h1 className="text-8xl font-bold tracking-tighter text-white/90 select-none">
            {distance}
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
