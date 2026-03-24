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
card-1.tsx
import * as React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming 'cn' utility from shadcn setup

// Interface for component props for type-safety and reusability
export interface ReviewCardProps {
  name: string;
  handle: string;
  review: string;
  rating: number;
  imageUrl: string;
  className?: string;
}

const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  ({ name, handle, review, rating, imageUrl, className }, ref) => {
    // Animation variants for framer-motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground border rounded-xl p-6 shadow-sm w-full max-w-md",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        // ARIA attributes for accessibility
        role="article"
        aria-labelledby="review-author"
        aria-describedby="review-content"
      >
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={imageUrl}
              alt={`Avatar of ${name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 id="review-author" className="text-lg font-semibold">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{handle}</p>
            </div>
          </div>
          {/* Rating Section */}
          <div className="flex items-center gap-1 text-lg font-bold">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Card Body */}
        <p id="review-content" className="mt-4 text-sm text-muted-foreground">
          {review}
        </p>
      </motion.div>
    );
  }
);

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };

code.demo.1757929857702.tsx
import { ReviewCard } from "@/components/ui/card-1"; // Adjust the import path as needed

export default function ReviewCardDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <ReviewCard
        name="Jamal Abdul"
        handle="New user On Doorin"
        review="This app is a game-changer! Easy to use, tons of options, and amazing deals. My go-to for all travel plans. Highly recommended!"
        rating={5.0}
        imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-1.tsx
import * as React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming 'cn' utility from shadcn setup

// Interface for component props for type-safety and reusability
export interface ReviewCardProps {
  name: string;
  handle: string;
  review: string;
  rating: number;
  imageUrl: string;
  className?: string;
}

const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  ({ name, handle, review, rating, imageUrl, className }, ref) => {
    // Animation variants for framer-motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-card text-card-foreground border rounded-xl p-6 shadow-sm w-full max-w-md",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        // ARIA attributes for accessibility
        role="article"
        aria-labelledby="review-author"
        aria-describedby="review-content"
      >
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={imageUrl}
              alt={`Avatar of ${name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 id="review-author" className="text-lg font-semibold">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{handle}</p>
            </div>
          </div>
          {/* Rating Section */}
          <div className="flex items-center gap-1 text-lg font-bold">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Card Body */}
        <p id="review-content" className="mt-4 text-sm text-muted-foreground">
          {review}
        </p>
      </motion.div>
    );
  }
);

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };
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
