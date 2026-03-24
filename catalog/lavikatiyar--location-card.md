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
location-card.tsx
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classname merging

// Interface for the component props for type-safety and reusability
export interface LocationCardProps {
  imageUrl: string;
  location: string;
  country: string;
  href: string;
  className?: string;
}

const LocationCard = React.forwardRef<HTMLDivElement, LocationCardProps>(
  ({ imageUrl, location, country, href, className }, ref) => {
    const controls = useAnimation();
    const iconControls = useAnimation();

    // Animation variants for the main card container
    const cardVariants = {
      initial: { scale: 1, y: 0 },
      hover: { scale: 1.03, y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } },
    };

    // Animation variants for the button's text
    const textVariants = {
      initial: { opacity: 1 },
      hover: { opacity: 0, transition: { duration: 0.1 } },
    };

    // Animation variants for the icon
    const iconVariants = {
      initial: { x: 0 },
      hover: { x: 50, transition: { type: "spring", stiffness: 300, damping: 15 } },
    };

    const handleHoverStart = () => {
      controls.start("hover");
      iconControls.start("hover");
    };

    const handleHoverEnd = () => {
      controls.start("initial");
      iconControls.start("initial");
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-xs overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        // Accessibility: Announce the component as a group
        role="group"
        aria-labelledby="location-title"
      >
        {/* Image Section */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={`A scenic view of ${location}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 id="location-title" className="font-semibold text-card-foreground">
              {location},
            </h3>
            <p className="text-sm text-muted-foreground">{country}</p>
          </div>
          
          {/* Animated Button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-10 w-32 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground"
            aria-label={`Get directions to ${location}`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              variants={textVariants}
              animate={controls}
              className="absolute"
            >
              Directions
            </motion.span>
            <motion.span
              variants={iconVariants}
              animate={controls}
              className="absolute left-4"
            >
              <Send size={16} />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    );
  }
);

LocationCard.displayName = "LocationCard";

export { LocationCard };

code.demo.1758519025947.tsx
import { LocationCard } from "@/components/ui/location-card"; // Adjust the import path accordingly

const LocationCardDemo = () => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <LocationCard
        imageUrl="https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2070&auto=format&fit=crop"
        location="Dolomites"
        country="Italy"
        href="https://www.google.com/maps/place/Dolomites"
      />
    </div>
  );
};

export default LocationCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/location-card.tsx
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classname merging

// Interface for the component props for type-safety and reusability
export interface LocationCardProps {
  imageUrl: string;
  location: string;
  country: string;
  href: string;
  className?: string;
}

const LocationCard = React.forwardRef<HTMLDivElement, LocationCardProps>(
  ({ imageUrl, location, country, href, className }, ref) => {
    const controls = useAnimation();
    const iconControls = useAnimation();

    // Animation variants for the main card container
    const cardVariants = {
      initial: { scale: 1, y: 0 },
      hover: { scale: 1.03, y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } },
    };

    // Animation variants for the button's text
    const textVariants = {
      initial: { opacity: 1 },
      hover: { opacity: 0, transition: { duration: 0.1 } },
    };

    // Animation variants for the icon
    const iconVariants = {
      initial: { x: 0 },
      hover: { x: 50, transition: { type: "spring", stiffness: 300, damping: 15 } },
    };

    const handleHoverStart = () => {
      controls.start("hover");
      iconControls.start("hover");
    };

    const handleHoverEnd = () => {
      controls.start("initial");
      iconControls.start("initial");
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-xs overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        // Accessibility: Announce the component as a group
        role="group"
        aria-labelledby="location-title"
      >
        {/* Image Section */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={`A scenic view of ${location}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 id="location-title" className="font-semibold text-card-foreground">
              {location},
            </h3>
            <p className="text-sm text-muted-foreground">{country}</p>
          </div>
          
          {/* Animated Button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-10 w-32 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground"
            aria-label={`Get directions to ${location}`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              variants={textVariants}
              animate={controls}
              className="absolute"
            >
              Directions
            </motion.span>
            <motion.span
              variants={iconVariants}
              animate={controls}
              className="absolute left-4"
            >
              <Send size={16} />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    );
  }
);

LocationCard.displayName = "LocationCard";

export { LocationCard };
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
