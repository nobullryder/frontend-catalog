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
card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for classnames

// Define the props for the component
export interface HotelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  roomType: string;
  hotelName: string;
  location: string;
  rating: number;
  reviewCount: number;
  href?: string; // Optional link for the entire card
}

const HotelCard = React.forwardRef<HTMLDivElement, HotelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      roomType,
      hotelName,
      location,
      rating,
      reviewCount,
      href,
      ...props
    },
    ref
  ) => {
    // Determine the root component type: 'a' for link, 'div' otherwise
    const Component = href ? motion.a : motion.div;

    return (
      <Component
        ref={ref as any} // Type assertion needed for motion component polymorphism
        href={href}
        className={cn(
          "group flex flex-col md:flex-row overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        // Animation variants for framer-motion
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
        {...props}
      >
        {/* Image Section */}
        <div className="md:w-2/5 w-full h-56 md:h-auto overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-6 md:w-3/5 space-y-2">
          <span className="text-sm text-muted-foreground">{roomType}</span>
          <h3 className="text-2xl font-bold tracking-tight">{hotelName}</h3>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center pt-2 text-muted-foreground">
            <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            <span className="ml-1.5">({reviewCount.toLocaleString()} Reviews)</span>
          </div>
        </div>
      </Component>
    );
  }
);

HotelCard.displayName = "HotelCard";

export { HotelCard };

code.demo.1757929388925.tsx
import { HotelCard } from "@/components/ui/card"; // Adjust the import path

export default function HotelCardDemo() {
  return (
    <div className="flex w-full items-center justify-center bg-background p-8">
      <div className="w-full max-w-3xl">
        <HotelCard
          href="#" // Making the card a clickable link
          imageUrl="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
          imageAlt="Luxury hotel room with a pool view"
          roomType="Deluxe Room"
          hotelName="Sao Pulo Hotel"
          location="Ubud, Bali, Indonesia"
          rating={4.9}
          reviewCount={1092}
        />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for classnames

// Define the props for the component
export interface HotelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  roomType: string;
  hotelName: string;
  location: string;
  rating: number;
  reviewCount: number;
  href?: string; // Optional link for the entire card
}

const HotelCard = React.forwardRef<HTMLDivElement, HotelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      roomType,
      hotelName,
      location,
      rating,
      reviewCount,
      href,
      ...props
    },
    ref
  ) => {
    // Determine the root component type: 'a' for link, 'div' otherwise
    const Component = href ? motion.a : motion.div;

    return (
      <Component
        ref={ref as any} // Type assertion needed for motion component polymorphism
        href={href}
        className={cn(
          "group flex flex-col md:flex-row overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        // Animation variants for framer-motion
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
        {...props}
      >
        {/* Image Section */}
        <div className="md:w-2/5 w-full h-56 md:h-auto overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-6 md:w-3/5 space-y-2">
          <span className="text-sm text-muted-foreground">{roomType}</span>
          <h3 className="text-2xl font-bold tracking-tight">{hotelName}</h3>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center pt-2 text-muted-foreground">
            <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            <span className="ml-1.5">({reviewCount.toLocaleString()} Reviews)</span>
          </div>
        </div>
      </Component>
    );
  }
);

HotelCard.displayName = "HotelCard";

export { HotelCard };
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
