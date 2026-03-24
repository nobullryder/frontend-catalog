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
card-4.tsx
import * as React from "react";
import { motion } from "framer-motion";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Variants for the tags/badges
const tagVariants = cva(
  "inline-block rounded-full px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        highlight:
          "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Define the props for the component
export interface ProfileCardProps {
  /**
   * URL for the profile avatar image.
   */
  imageUrl: string;
  /**
   * The name of the person.
   */
  name: string;
  /**
   * A short descriptive string, like age or role.
   */
  subtitle: string;
  /**
   * A longer description or bio.
   */
  description: string;
  /**
   * An array of tags to display, each with text and an optional variant.
   */
  tags: {
    text: string;
    variant?: VariantProps<typeof tagVariants>["variant"];
  }[];
  /**
   * Optional additional class names for custom styling.
   */
  className?: string;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ imageUrl, name, subtitle, description, tags, className }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
          className
        )}
      >
        {/* Header section with avatar and name */}
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={`${name}'s profile picture`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-card-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Description section */}
        <p className="mt-4 text-base text-muted-foreground line-clamp-3">
          {description}
        </p>

        {/* Tags section */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className={cn(tagVariants({ variant: tag.variant }))}>
              {tag.text}
            </span>
          ))}
        </div>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export { ProfileCard };

code.demo.1757904473942.tsx
import { ProfileCard, ProfileCardProps } from "@/components/ui/card-4"; // Adjust the import path

const ProfileCardDemo = () => {
  // Sample data for the profile card
  const trainerData: ProfileCardProps = {
    name: "Joshua Thompson",
    subtitle: "34 years old",
    imageUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=256&h=256&fit=crop",
    description:
      "Joshua is a personal trainer specializing in weight loss and body transformation. He creates personalized workout plans to help clients achieve their fitness goals effectively and safely.",
    tags: [
      { text: "Weight Loss Workouts" },
      { text: "5 times/week", variant: "highlight" },
    ],
  };

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <ProfileCard {...trainerData} />
    </div>
  );
};

export default ProfileCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-4.tsx
import * as React from "react";
import { motion } from "framer-motion";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Variants for the tags/badges
const tagVariants = cva(
  "inline-block rounded-full px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        highlight:
          "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Define the props for the component
export interface ProfileCardProps {
  /**
   * URL for the profile avatar image.
   */
  imageUrl: string;
  /**
   * The name of the person.
   */
  name: string;
  /**
   * A short descriptive string, like age or role.
   */
  subtitle: string;
  /**
   * A longer description or bio.
   */
  description: string;
  /**
   * An array of tags to display, each with text and an optional variant.
   */
  tags: {
    text: string;
    variant?: VariantProps<typeof tagVariants>["variant"];
  }[];
  /**
   * Optional additional class names for custom styling.
   */
  className?: string;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ imageUrl, name, subtitle, description, tags, className }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
          className
        )}
      >
        {/* Header section with avatar and name */}
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={`${name}'s profile picture`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-card-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Description section */}
        <p className="mt-4 text-base text-muted-foreground line-clamp-3">
          {description}
        </p>

        {/* Tags section */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className={cn(tagVariants({ variant: tag.variant }))}>
              {tag.text}
            </span>
          ))}
        </div>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

export { ProfileCard };
```

Install NPM dependencies:
```bash
framer-motion, class-variance-authority
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
