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
card-3.tsx
// components/ui/property-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the props for the component
interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageAlt?: string;
}

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      location,
      price,
      rating,
      reviews,
      imageAlt = "Property Image",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, y: -5 }}
        {...props}
      >
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <motion.h3
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-lg font-semibold tracking-tight"
            >
              {name}
            </motion.h3>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.1s' }} // Stagger animation
              className="text-lg font-bold text-primary"
            >
              ${price}
              <span className="text-sm font-normal text-muted-foreground"> /Night</span>
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.2s' }} // Stagger animation
              className="flex items-center gap-1.5"
            >
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </motion.div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.3s' }} // Stagger animation
              className="flex items-center gap-1.5"
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              <span className="font-medium text-foreground">{rating}</span>
              <span>({reviews.toLocaleString()} Reviews)</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export { PropertyCard };

code.demo.1757930285736.tsx
// demo.tsx
import { PropertyCard } from "@/components/ui/card-3"; // Adjust path as needed

const PropertyCardDemo = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <PropertyCard
        imageUrl="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
        name="La Brisa Vales"
        location="Ubud, Bali, Indonesia"
        price={980}
        rating={4.9}
        reviews={1982}
        imageAlt="Luxury villa with a pool surrounded by palm trees"
        aria-label="View details for La Brisa Vales in Ubud, Bali"
      />
    </div>
  );
};

export default PropertyCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-3.tsx
// components/ui/property-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the props for the component
interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageAlt?: string;
}

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      location,
      price,
      rating,
      reviews,
      imageAlt = "Property Image",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, y: -5 }}
        {...props}
      >
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <motion.h3
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-lg font-semibold tracking-tight"
            >
              {name}
            </motion.h3>
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.1s' }} // Stagger animation
              className="text-lg font-bold text-primary"
            >
              ${price}
              <span className="text-sm font-normal text-muted-foreground"> /Night</span>
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.2s' }} // Stagger animation
              className="flex items-center gap-1.5"
            >
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </motion.div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.3s' }} // Stagger animation
              className="flex items-center gap-1.5"
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              <span className="font-medium text-foreground">{rating}</span>
              <span>({reviews.toLocaleString()} Reviews)</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export { PropertyCard };
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
