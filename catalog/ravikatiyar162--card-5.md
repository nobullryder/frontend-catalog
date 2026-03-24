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
card-5.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

// Define the types for the props to ensure type safety and clarity
interface Stat {
  label: string;
  value: string | number;
}

interface Action extends ButtonProps {
  label: string;
  onClick: () => void;
}

export interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  handle: string;
  bio: string;
  stats: Stat[];
  actions: Action[];
  className?: string;
}

/**
 * A responsive and theme-adaptive profile card component.
 * @param avatarSrc - URL for the user's avatar image.
 * @param name - The user's full name.
 * @param handle - The user's role or username (e.g., "Photographer").
 * @param bio - A short biography of the user.
 * @param stats - An array of statistic objects { label, value }.
 * @param actions - An array of action objects { label, onClick, variant, ... }.
 * @param className - Optional additional class names for custom styling.
 */
export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ avatarSrc, name, handle, bio, stats, actions, className }, ref) => {
    // Animation variants for Framer Motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
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
        ref={ref}
        className={cn(
          "max-w-sm w-full rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-6",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <img
            src={avatarSrc}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">{handle}</p>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
          {bio}
        </motion.p>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between text-center border-t border-b py-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Actions Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {actions.map(({ label, ...props }, index) => (
            <Button key={index} {...props} className="flex-1">
              {label}
            </Button>
          ))}
        </motion.div>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";

code.demo.1757412787864.tsx
import { ProfileCard } from "@/components/ui/card-5";

export default function ProfileCardDemo() {
  const userStats = [
    { label: "Countries Visited", value: 28 },
    { label: "Exhibitions Held", value: 10 },
    { label: "Today Rating", value: 4.9 },
  ];

  const userActions = [
    {
      label: "Explore Portfolio",
      variant: "default" as const, // Specify variant for styling
      onClick: () => alert("Exploring portfolio..."),
    },
    {
      label: "Message",
      variant: "secondary" as const,
      onClick: () => alert("Opening message..."),
    },
  ];

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <ProfileCard
        avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        name="Sam Rivers"
        handle="Photographer"
        bio="Based in Sydney, I capture breathtaking landscapes and cultural moments across the globe."
        stats={userStats}
        actions={userActions}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-5.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

// Define the types for the props to ensure type safety and clarity
interface Stat {
  label: string;
  value: string | number;
}

interface Action extends ButtonProps {
  label: string;
  onClick: () => void;
}

export interface ProfileCardProps {
  avatarSrc: string;
  name: string;
  handle: string;
  bio: string;
  stats: Stat[];
  actions: Action[];
  className?: string;
}

/**
 * A responsive and theme-adaptive profile card component.
 * @param avatarSrc - URL for the user's avatar image.
 * @param name - The user's full name.
 * @param handle - The user's role or username (e.g., "Photographer").
 * @param bio - A short biography of the user.
 * @param stats - An array of statistic objects { label, value }.
 * @param actions - An array of action objects { label, onClick, variant, ... }.
 * @param className - Optional additional class names for custom styling.
 */
export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ avatarSrc, name, handle, bio, stats, actions, className }, ref) => {
    // Animation variants for Framer Motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
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
        ref={ref}
        className={cn(
          "max-w-sm w-full rounded-2xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-6",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <img
            src={avatarSrc}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">{handle}</p>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
          {bio}
        </motion.p>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between text-center border-t border-b py-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Actions Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {actions.map(({ label, ...props }, index) => (
            <Button key={index} {...props} className="flex-1">
              {label}
            </Button>
          ))}
        </motion.div>
      </motion.div>
    );
  }
);

ProfileCard.displayName = "ProfileCard";
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
