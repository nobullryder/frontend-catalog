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
frosted-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the FrostedCard component.
 */
export interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the background image. */
  imageUrl: string;
  /** The primary, large title text. */
  title: string;
  /** Optional smaller text displayed above the main title. */
  preTitle?: string;
  /** Optional date or short text at the bottom right. */
  date?: string;
  /** Alt text for the background image for accessibility. */
  alt: string;
}

const FrostedCard = React.forwardRef<HTMLDivElement, FrostedCardProps>(
  ({ className, imageUrl, title, preTitle, date, alt, ...props }, ref) => {
    // State to hold the rotation values for the 3D effect
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

    // Handle mouse movement over the card to calculate rotation
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { width, height } = rect;
      
      // Calculate rotation, maxing out at ~15 degrees
      const rotateY = (x / width - 0.5) * 30; 
      const rotateX = -(y / height - 0.5) * 30;

      setRotate({ x: rotateX, y: rotateY });
    };

    // Reset rotation when the mouse leaves the card
    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }} // Apply perspective to the parent for 3D effect
        className={cn(
          "group relative w-full h-96 max-w-sm overflow-hidden rounded-xl bg-card shadow-lg",
          className
        )}
        {...props}
      >
        <div
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`,
            transition: "transform 0.1s ease-out",
          }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-card-foreground">
            {preTitle && (
              <p className="mb-1 text-sm text-white/80 transition-transform duration-300 group-hover:-translate-y-1">
                {preTitle}
              </p>
            )}
            <h2 
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/95 to-white/70 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
            >
              {title}
            </h2>
          </div>

          {date && (
            <div className="absolute bottom-4 right-4 text-xs text-white/70">
              {date}
            </div>
          )}
        </div>
      </div>
    );
  }
);
FrostedCard.displayName = "FrostedCard";

export { FrostedCard };

code.demo.1758820018480.tsx
import { FrostedCard } from "@/components/ui/frosted-card"; // Adjust the import path as needed

/**
 * A demo component to showcase the FrostedCard.
 */
export default function FrostedCardDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <FrostedCard
        imageUrl="https://plus.unsplash.com/premium_photo-1669799891975-8f668765be09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fEElMjBmcm9zdHklMjBibHVlJTIwaG91c2UlMjByb29mJTIwY292ZXJlZCUyMGluJTIwc25vd3xlbnwwfHwwfHx8MA%3D%3D?q=80&w=1965&auto=format&fit=crop"
        title="Frost"
        preTitle="Elegance in"
        date="06.12.2024"
        alt="A frosty blue house roof covered in snow."
        // You can control the size of the card from here
        className="w-full max-w-[350px] h-[350px] md:max-w-sm md:h-96"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/frosted-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the FrostedCard component.
 */
export interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the background image. */
  imageUrl: string;
  /** The primary, large title text. */
  title: string;
  /** Optional smaller text displayed above the main title. */
  preTitle?: string;
  /** Optional date or short text at the bottom right. */
  date?: string;
  /** Alt text for the background image for accessibility. */
  alt: string;
}

const FrostedCard = React.forwardRef<HTMLDivElement, FrostedCardProps>(
  ({ className, imageUrl, title, preTitle, date, alt, ...props }, ref) => {
    // State to hold the rotation values for the 3D effect
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

    // Handle mouse movement over the card to calculate rotation
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { width, height } = rect;
      
      // Calculate rotation, maxing out at ~15 degrees
      const rotateY = (x / width - 0.5) * 30; 
      const rotateX = -(y / height - 0.5) * 30;

      setRotate({ x: rotateX, y: rotateY });
    };

    // Reset rotation when the mouse leaves the card
    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }} // Apply perspective to the parent for 3D effect
        className={cn(
          "group relative w-full h-96 max-w-sm overflow-hidden rounded-xl bg-card shadow-lg",
          className
        )}
        {...props}
      >
        <div
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`,
            transition: "transform 0.1s ease-out",
          }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-card-foreground">
            {preTitle && (
              <p className="mb-1 text-sm text-white/80 transition-transform duration-300 group-hover:-translate-y-1">
                {preTitle}
              </p>
            )}
            <h2 
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white/95 to-white/70 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}
            >
              {title}
            </h2>
          </div>

          {date && (
            <div className="absolute bottom-4 right-4 text-xs text-white/70">
              {date}
            </div>
          )}
        </div>
      </div>
    );
  }
);
FrostedCard.displayName = "FrostedCard";

export { FrostedCard };
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
