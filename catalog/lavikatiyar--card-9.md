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
card-9.tsx
// 1. IMPORT LIBRARIES
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 2. IMPORT UTILITIES
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// 3. DEFINE COMPONENT PROP TYPES
interface ChallengeCardProps {
  /** The main title of the challenge */
  title: string;
  /** A brief description of the challenge */
  description: string;
  /** Text to display on the action button */
  buttonText: string;
  /** Custom class name for overriding or extending styles */
  className?: string;
  /** Background color using tailwind classes */
  backgroundColor?: string;
}

// 4. DEFINE HOVER ANIMATION VARIANTS
const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0px 10px 20px -5px hsl(var(--card) / 0.1)",
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 15px 30px -5px hsl(var(--card) / 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

// 5. CREATE THE COMPONENT
const ChallengeCard = React.forwardRef<HTMLDivElement, ChallengeCardProps>(
  (
    {
      title,
      description,
      buttonText,
      className,
      backgroundColor = "bg-green-500", // Default background color
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl p-8 text-white",
          backgroundColor,
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        aria-label={`${title}: ${description}`}
      >
        {/* Card Content */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="max-w-xs text-base font-medium opacity-80">{description}</p>
        </div>

        {/* Action Button */}
        <button
          className="group mt-8 flex w-full items-center justify-between rounded-full bg-white pl-6 pr-2 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          aria-label={buttonText}
        >
          <span>{buttonText}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900">
            <motion.div variants={arrowVariants}>
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </button>
      </motion.div>
    );
  }
);

ChallengeCard.displayName = "ChallengeCard";

export { ChallengeCard };

code.demo.1758265780269.tsx
import { ChallengeCard } from "@/components/ui/card-9"; // Adjust the import path

export default function ChallengeCardDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <ChallengeCard
        title="End March 160 KM Challenge"
        description="Complete 160 KM until end of March and you will get a surprise gift."
        buttonText="Join Challenge"
        // Example of custom background color
        // backgroundColor="bg-blue-500"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-9.tsx
// 1. IMPORT LIBRARIES
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 2. IMPORT UTILITIES
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// 3. DEFINE COMPONENT PROP TYPES
interface ChallengeCardProps {
  /** The main title of the challenge */
  title: string;
  /** A brief description of the challenge */
  description: string;
  /** Text to display on the action button */
  buttonText: string;
  /** Custom class name for overriding or extending styles */
  className?: string;
  /** Background color using tailwind classes */
  backgroundColor?: string;
}

// 4. DEFINE HOVER ANIMATION VARIANTS
const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0px 10px 20px -5px hsl(var(--card) / 0.1)",
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 15px 30px -5px hsl(var(--card) / 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

// 5. CREATE THE COMPONENT
const ChallengeCard = React.forwardRef<HTMLDivElement, ChallengeCardProps>(
  (
    {
      title,
      description,
      buttonText,
      className,
      backgroundColor = "bg-green-500", // Default background color
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl p-8 text-white",
          backgroundColor,
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        aria-label={`${title}: ${description}`}
      >
        {/* Card Content */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="max-w-xs text-base font-medium opacity-80">{description}</p>
        </div>

        {/* Action Button */}
        <button
          className="group mt-8 flex w-full items-center justify-between rounded-full bg-white pl-6 pr-2 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
          aria-label={buttonText}
        >
          <span>{buttonText}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900">
            <motion.div variants={arrowVariants}>
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </button>
      </motion.div>
    );
  }
);

ChallengeCard.displayName = "ChallengeCard";

export { ChallengeCard };
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
