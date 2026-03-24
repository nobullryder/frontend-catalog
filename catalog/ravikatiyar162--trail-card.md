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
trail-card.tsx
// components/ui/trail-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// Define the props interface for type safety and reusability
interface TrailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  mapImageUrl: string;
  title: string;
  location: string;
  difficulty: string;
  creators: string;
  distance: string;
  elevation: string;
  duration: string;
  onDirectionsClick?: () => void;
}

// Define stat item component for DRY principle
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty,
      creators,
      distance,
      elevation,
      duration,
      onDirectionsClick,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg",
          className
        )}
        whileHover={{ y: -5, scale: 1.02 }} // Subtle lift and scale animation on hover
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative h-60 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
            <div className="text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-white/90">{location}</p>
            </div>
            {/* The button will animate in on hover of the parent card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: 20 }} // Kept hidden by default
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button
                variant="secondary"
                onClick={onDirectionsClick}
                aria-label={`Get directions to ${title}`}
              >
                Directions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with trail details */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{difficulty}</p>
              <p className="text-xs text-muted-foreground">{creators}</p>
            </div>
            {/* Simple SVG or image representation of the trail map */}
            <img
              src={mapImageUrl}
              alt="Trail map"
              className="h-10 w-20 object-contain"
            />
          </div>
          <div className="my-4 h-px w-full bg-border" />
          <div className="flex justify-between">
            <StatItem label="Distance" value={distance} />
            <StatItem label="Elevation" value={elevation} />
            <StatItem label="Duration" value={duration} />
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };

code.demo.1758825195587.tsx
// demo.tsx
import { TrailCard } from "@/components/ui/trail-card";

export default function TrailCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <TrailCard
        title="Embercrest Ridge"
        location="Silverpine Mountains"
        difficulty="Hard"
        creators="1886 by Helen Rowe & Elias Mendez"
        distance="12.4km"
        elevation="870m"
        duration="4h 45m"
        // Using a placeholder image service for demonstration
        imageUrl="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
        // A placeholder for the map SVG/image
        mapImageUrl="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-3JYNLpogg5zknunPABpdOpEjJmZN5R.png&w=320&q=75"
        onDirectionsClick={() => alert("Directions clicked!")}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/trail-card.tsx
// components/ui/trail-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// Define the props interface for type safety and reusability
interface TrailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  mapImageUrl: string;
  title: string;
  location: string;
  difficulty: string;
  creators: string;
  distance: string;
  elevation: string;
  duration: string;
  onDirectionsClick?: () => void;
}

// Define stat item component for DRY principle
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty,
      creators,
      distance,
      elevation,
      duration,
      onDirectionsClick,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg",
          className
        )}
        whileHover={{ y: -5, scale: 1.02 }} // Subtle lift and scale animation on hover
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative h-60 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
            <div className="text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-white/90">{location}</p>
            </div>
            {/* The button will animate in on hover of the parent card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: 20 }} // Kept hidden by default
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button
                variant="secondary"
                onClick={onDirectionsClick}
                aria-label={`Get directions to ${title}`}
              >
                Directions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with trail details */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{difficulty}</p>
              <p className="text-xs text-muted-foreground">{creators}</p>
            </div>
            {/* Simple SVG or image representation of the trail map */}
            <img
              src={mapImageUrl}
              alt="Trail map"
              className="h-10 w-20 object-contain"
            />
          </div>
          <div className="my-4 h-px w-full bg-border" />
          <div className="flex justify-between">
            <StatItem label="Distance" value={distance} />
            <StatItem label="Elevation" value={elevation} />
            <StatItem label="Duration" value={duration} />
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };
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
