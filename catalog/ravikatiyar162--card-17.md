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
card-17.tsx
// components/ui/location-card.tsx
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button is in this path
import { cn } from "@/lib/utils"; // Assuming shadcn/ui utility for classnames

// Define the props for the LocationCard component
interface LocationCardProps {
  city: string;
  address: string;
  imageUrl: string;
  directionsUrl: string;
  className?: string;
}

// The main LocationCard component
export const LocationCard = ({
  city,
  address,
  imageUrl,
  directionsUrl,
  className,
}: LocationCardProps) => {
  // Framer Motion hooks for creating the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Create transforms for rotation based on mouse position
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

  // Handle mouse movement over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  // Reset the tilt effect when the mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative w-full h-80 rounded-xl bg-cover bg-center",
        "shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imageUrl})`,
        }}
        className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] place-content-end rounded-xl bg-cover bg-center shadow-lg"
      >
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Content */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="p-6 text-white flex justify-between items-end w-full"
        >
          <div>
            <h3 className="text-2xl font-bold">{city}</h3>
            <p className="text-sm text-white/80">{address}</p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="secondary"
              aria-label={`Get directions to our ${city} office`}
            >
              Get directions
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

code.demo.1758027475153.tsx
// demo.tsx
import { LocationCard } from "@/components/ui/card-17";

// Sample data for the locations
const locations = [
  {
    city: "India",
    address: "Hawa Mahal, Pink City, Jaipur, Rajasthan India",
    imageUrl: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2070&auto=format&fit=crop", // Replace with your actual image URL
    directionsUrl: "https://maps.app.goo.gl/TWAmMefs3B22wU5LA",
  },
  {
    city: "Sydney",
    address: "456 Ocean View Road, Bondi Beach, NSW 2026",
    imageUrl: "https://images.unsplash.com/photo-1540448051910-09cfadd5df61?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxTeWRuZXl8ZW58MHx8MHx8fDA%3D?q=80&w=1974&auto=format&fit=crop", // Replace with your actual image URL
    directionsUrl: "https://maps.app.goo.gl/3qXzH4fSjK6rB7yP8",
  },
];

const LocationCardDemo = () => {
  return (
    <div className="w-full bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            LOCATIONS
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Our Offices
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find us at our offices in Sydney and New York.
          </p>
        </div>
        
        {/* Responsive grid for the location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
          {locations.map((location) => (
            <LocationCard
              key={location.city}
              city={location.city}
              address={location.address}
              imageUrl={location.imageUrl}
              directionsUrl={location.directionsUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-17.tsx
// components/ui/location-card.tsx
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button is in this path
import { cn } from "@/lib/utils"; // Assuming shadcn/ui utility for classnames

// Define the props for the LocationCard component
interface LocationCardProps {
  city: string;
  address: string;
  imageUrl: string;
  directionsUrl: string;
  className?: string;
}

// The main LocationCard component
export const LocationCard = ({
  city,
  address,
  imageUrl,
  directionsUrl,
  className,
}: LocationCardProps) => {
  // Framer Motion hooks for creating the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Create transforms for rotation based on mouse position
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

  // Handle mouse movement over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  // Reset the tilt effect when the mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative w-full h-80 rounded-xl bg-cover bg-center",
        "shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imageUrl})`,
        }}
        className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] place-content-end rounded-xl bg-cover bg-center shadow-lg"
      >
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Content */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="p-6 text-white flex justify-between items-end w-full"
        >
          <div>
            <h3 className="text-2xl font-bold">{city}</h3>
            <p className="text-sm text-white/80">{address}</p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="secondary"
              aria-label={`Get directions to our ${city} office`}
            >
              Get directions
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
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
