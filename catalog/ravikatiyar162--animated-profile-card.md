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
animated-profile-card.tsx
// components/ui/profile-card.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Bookmark, Briefcase, Clock, DollarSign, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a lib/utils.ts for cn

// Define the types for the component props
export interface Tool {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  coverImageUrl: string;
  rating: number;
  duration: string;
  rate: string;
  tools: Tool[];
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onGetInTouch?: () => void;
  className?: string;
}

// Reusable stat item component
const StatItem = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <div className="flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="font-semibold text-foreground">{value}</span>
    </div>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

// Main ProfileCard component
export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl,
  coverImageUrl,
  rating,
  duration,
  rate,
  tools,
  isBookmarked = false,
  onBookmark,
  onGetInTouch,
  className,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
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
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        'relative w-full max-w-sm overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Cover Image */}
      <motion.div variants={itemVariants} className="h-32 w-full">
        <img src={coverImageUrl} alt={`${name}'s cover image`} className="h-full w-full object-cover" />
      </motion.div>

      {/* Bookmark Button */}
      <motion.button
        variants={itemVariants}
        onClick={onBookmark}
        aria-label="Bookmark profile"
        className="absolute top-3 right-3 z-10 rounded-full bg-background/50 p-2 backdrop-blur-sm transition-colors hover:bg-background/75"
      >
        <Bookmark className={cn('h-5 w-5 text-foreground', isBookmarked && 'fill-current text-yellow-500')} />
      </motion.button>

      <div className="relative p-6 pt-0">
        {/* Avatar */}
        <motion.div variants={itemVariants} className="relative -mt-12 flex justify-start">
          <img
            src={avatarUrl}
            alt={name}
            className="h-20 w-20 rounded-full border-4 border-card object-cover"
          />
        </motion.div>

        <div className="mt-4">
          {/* Name & Role */}
          <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground">
            {name}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            {role}
          </motion.p>

          {/* Tools */}
          <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium">Tools</span>
            <div className="flex items-center gap-2">
              {tools.map((tool, index) => (
                <div key={index} className="rounded-full bg-muted p-1.5">
                  <tool.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-6 grid grid-cols-3 items-center justify-items-center gap-4 rounded-lg bg-muted/50 p-3"
          >
            <StatItem icon={Star} value={rating.toFixed(1)} label="rating" />
            <div className="h-8 w-px bg-border" />
            <StatItem icon={Clock} value={duration} label="duration" />
            <div className="h-8 w-px bg-border" />
            <StatItem icon={DollarSign} value={rate} label="rate" />
          </motion.div>

          {/* Action Button */}
          <motion.button
            variants={itemVariants}
            onClick={onGetInTouch}
            className="mt-6 w-full rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Get in touch
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

code.demo.1758935883837.tsx
// demo.tsx

import React, { useState } from 'react';
import { ProfileCard, Tool } from '@/components/ui/animated-profile-card';

// Example icons, you can replace these with your preferred icon library
import { Code, Figma, Framer } from 'lucide-react';

const toolsData: Tool[] = [
  { name: 'Figma', icon: Figma },
  { name: 'Framer', icon: Framer },
  { name: 'VS Code', icon: Code },
];

const ProfileCardDemo = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    console.log('Bookmark toggled');
  };

  const handleGetInTouch = () => {
    console.log('Get in touch clicked');
    alert(`Contacting Henrie Ekemezie`);
  };

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <ProfileCard
        name="Henrie Ekemezie"
        role="Web & UI/UX Designer"
        avatarUrl="https://i.pravatar.cc/150?u=henrie"
        coverImageUrl="https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070&auto=format&fit=crop"
        rating={4.8}
        duration="8 Days"
        rate="$40/hr"
        tools={toolsData}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
        onGetInTouch={handleGetInTouch}
      />
    </div>
  );
};

export default ProfileCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-profile-card.tsx
// components/ui/profile-card.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Bookmark, Briefcase, Clock, DollarSign, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a lib/utils.ts for cn

// Define the types for the component props
export interface Tool {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  coverImageUrl: string;
  rating: number;
  duration: string;
  rate: string;
  tools: Tool[];
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onGetInTouch?: () => void;
  className?: string;
}

// Reusable stat item component
const StatItem = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <div className="flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="font-semibold text-foreground">{value}</span>
    </div>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

// Main ProfileCard component
export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl,
  coverImageUrl,
  rating,
  duration,
  rate,
  tools,
  isBookmarked = false,
  onBookmark,
  onGetInTouch,
  className,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
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
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        'relative w-full max-w-sm overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {/* Cover Image */}
      <motion.div variants={itemVariants} className="h-32 w-full">
        <img src={coverImageUrl} alt={`${name}'s cover image`} className="h-full w-full object-cover" />
      </motion.div>

      {/* Bookmark Button */}
      <motion.button
        variants={itemVariants}
        onClick={onBookmark}
        aria-label="Bookmark profile"
        className="absolute top-3 right-3 z-10 rounded-full bg-background/50 p-2 backdrop-blur-sm transition-colors hover:bg-background/75"
      >
        <Bookmark className={cn('h-5 w-5 text-foreground', isBookmarked && 'fill-current text-yellow-500')} />
      </motion.button>

      <div className="relative p-6 pt-0">
        {/* Avatar */}
        <motion.div variants={itemVariants} className="relative -mt-12 flex justify-start">
          <img
            src={avatarUrl}
            alt={name}
            className="h-20 w-20 rounded-full border-4 border-card object-cover"
          />
        </motion.div>

        <div className="mt-4">
          {/* Name & Role */}
          <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground">
            {name}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            {role}
          </motion.p>

          {/* Tools */}
          <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium">Tools</span>
            <div className="flex items-center gap-2">
              {tools.map((tool, index) => (
                <div key={index} className="rounded-full bg-muted p-1.5">
                  <tool.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-6 grid grid-cols-3 items-center justify-items-center gap-4 rounded-lg bg-muted/50 p-3"
          >
            <StatItem icon={Star} value={rating.toFixed(1)} label="rating" />
            <div className="h-8 w-px bg-border" />
            <StatItem icon={Clock} value={duration} label="duration" />
            <div className="h-8 w-px bg-border" />
            <StatItem icon={DollarSign} value={rate} label="rate" />
          </motion.div>

          {/* Action Button */}
          <motion.button
            variants={itemVariants}
            onClick={onGetInTouch}
            className="mt-6 w-full rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Get in touch
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
