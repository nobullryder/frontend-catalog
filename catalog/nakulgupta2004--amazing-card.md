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
amazing-card.tsx

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FashionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  title: string
  description?: string
  price: string
  badge?: string
  badgeColor?: "sale" | "new" | "exclusive" | "limited"
  aspect?: "portrait" | "landscape" | "square"
  glowEffect?: boolean
}

export function AmazingCard({
  image,
  title,
  description,
  price,
  badge,
  badgeColor = "new",
  aspect = "portrait",
  glowEffect = true,
  className,
  ...props
}: FashionCardProps) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      // This creates a natural feeling 3D tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotationX = (y - centerY) / 20;
      const rotationY = -(x - centerX) / 20;
      
      setRotation({ x: rotationX, y: rotationY });
    }
  };

  const handleMouseLeave = () => {
    // Return to neutral position when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  // Determine badge style based on type
  const badgeStyles = {
    sale: "bg-fashion-accent text-white",
    new: "bg-fashion-highlight text-fashion-charcoal",
    exclusive: "bg-fashion-charcoal text-fashion-cream",
    limited: "bg-gradient-to-r from-fashion-accent to-fashion-highlight text-white",
  };

  // Define aspect ratio classes
  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  };

  return (
    <div 
      className={cn("fashion-card-container group", className)}
      {...props}
    >
      <div
        ref={cardRef}
        className={cn(
          "fashion-card relative overflow-hidden rounded-xl",
          glowEffect && "animate-glow-pulse",
          "transition-all duration-300"
        )}
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The glass effect overlay */}
        <div className="fashion-card-glass absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Card main content */}
        <div className="fashion-card-content relative z-20 flex flex-col overflow-hidden rounded-xl">
          {/* Image section with parallax */}
          <div className={cn("parallax-image-container w-full", aspectClasses[aspect])}>
            <img
              src={image}
              alt={title}
              className="parallax-image w-full h-full object-cover"
            />
          </div>

          {/* Content section */}
          <div className="p-5 bg-white dark:bg-gray-900 flex flex-col space-y-2 flex-grow transition-all duration-300 group-hover:bg-opacity-80 dark:group-hover:bg-opacity-90 backdrop-blur-sm">
            <h3 className="font-serif text-lg md:text-xl font-medium leading-none tracking-tight gradient-text animate-fadeIn">
              {title}
            </h3>
            
            {description && (
              <p className="font-sans text-sm text-muted-foreground line-clamp-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                {description}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-3 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <p className="font-serif font-semibold text-lg md:text-xl">
                {price}
              </p>
              
              <button className="shine-effect relative rounded-full px-4 py-1.5 text-xs font-medium bg-fashion-charcoal text-white overflow-hidden hover:animate-shine transition transform duration-300 hover:scale-105">
                Shop now
              </button>
            </div>
          </div>
        </div>
        
        {/* Badge if provided */}
        {badge && (
          <div className={cn(
            "fashion-card-badge px-2.5 py-1 rounded-full text-xs font-medium capitalize animate-float",
            badgeStyles[badgeColor]
          )}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo component for displaying various card styles
export function FashionCardDemo() {
  return (
    <div className="p-8 bg-gradient-to-br from-fashion-cream to-fashion-beige min-h-screen">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-fashion-charcoal mb-8 text-center">New Arrivals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AmazingCard
          image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          title="Cashmere Blend Coat"
          description="Luxurious camel coat crafted from premium cashmere blend for ultimate warmth and style."
          price="$349.99"
          badge="new"
          badgeColor="new"
        />
        <AmazingCard
          image="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          title="Designer Handbag"
          description="Elegant structured handbag with gold hardware and adjustable strap."
          price="$189.99"
          badge="sale"
          badgeColor="sale"
          aspect="square"
        />
        <AmazingCard
          image="https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          title="Leather Chelsea Boots"
          description="Classic Chelsea boots crafted from genuine leather with durable rubber sole."
          price="$129.99"
          badge="exclusive"
          badgeColor="exclusive"
        />
      </div>
    </div>
  );
}

// Export variants for examples and documentation
export { AmazingCard as FashionCard };

code.demo.tsx
import * as React from "react";
import { AmazingCard, FashionCardDemo } from "@/components/ui/amazing-card";

// Demo variant showing a single card
export function SingleCardDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-[280px]">
        <AmazingCard
          image="https://images.unsplash.com/photo-1545911825-6bfa5b0c34a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          title="Premium Wool Sweater"
          description="Soft and warm premium wool sweater for the coldest winter days."
          price="$129.99"
          badge="limited"
          badgeColor="limited"
        />
      </div>
    </div>
  );
}

// Demo variant showcasing different aspect ratios
export function AspectRatioDemo() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <AmazingCard
        image="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
        title="Men's Blazer"
        price="$199.99"
        aspect="portrait"
      />
      <AmazingCard
        image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80"
        title="Designer Sunglasses"
        price="$89.99"
        aspect="square"
      />
      <AmazingCard
        image="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        title="Watch Collection"
        price="$299.99"
        aspect="landscape"
      />
    </div>
  );
}

// Export all demo variants
export { SingleCardDemo, AspectRatioDemo, FashionCardDemo };

// This component is for local development preview only
const Index = () => {
  return (
    <div className="min-h-screen">
      <AspectRatioDemo />
    </div>
  );
};

export default Index;

```

Copy-paste these files for dependencies:
```tsx
/components/ui/amazing-card.tsx

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FashionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  title: string
  description?: string
  price: string
  badge?: string
  badgeColor?: "sale" | "new" | "exclusive" | "limited"
  aspect?: "portrait" | "landscape" | "square"
  glowEffect?: boolean
}

export function AmazingCard({
  image,
  title,
  description,
  price,
  badge,
  badgeColor = "new",
  aspect = "portrait",
  glowEffect = true,
  className,
  ...props
}: FashionCardProps) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      // This creates a natural feeling 3D tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotationX = (y - centerY) / 20;
      const rotationY = -(x - centerX) / 20;
      
      setRotation({ x: rotationX, y: rotationY });
    }
  };

  const handleMouseLeave = () => {
    // Return to neutral position when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  // Determine badge style based on type
  const badgeStyles = {
    sale: "bg-fashion-accent text-white",
    new: "bg-fashion-highlight text-fashion-charcoal",
    exclusive: "bg-fashion-charcoal text-fashion-cream",
    limited: "bg-gradient-to-r from-fashion-accent to-fashion-highlight text-white",
  };

  // Define aspect ratio classes
  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  };

  return (
    <div 
      className={cn("fashion-card-container group", className)}
      {...props}
    >
      <div
        ref={cardRef}
        className={cn(
          "fashion-card relative overflow-hidden rounded-xl",
          glowEffect && "animate-glow-pulse",
          "transition-all duration-300"
        )}
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The glass effect overlay */}
        <div className="fashion-card-glass absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Card main content */}
        <div className="fashion-card-content relative z-20 flex flex-col overflow-hidden rounded-xl">
          {/* Image section with parallax */}
          <div className={cn("parallax-image-container w-full", aspectClasses[aspect])}>
            <img
              src={image}
              alt={title}
              className="parallax-image w-full h-full object-cover"
            />
          </div>

          {/* Content section */}
          <div className="p-5 bg-white dark:bg-gray-900 flex flex-col space-y-2 flex-grow transition-all duration-300 group-hover:bg-opacity-80 dark:group-hover:bg-opacity-90 backdrop-blur-sm">
            <h3 className="font-serif text-lg md:text-xl font-medium leading-none tracking-tight gradient-text animate-fadeIn">
              {title}
            </h3>
            
            {description && (
              <p className="font-sans text-sm text-muted-foreground line-clamp-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                {description}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-3 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <p className="font-serif font-semibold text-lg md:text-xl">
                {price}
              </p>
              
              <button className="shine-effect relative rounded-full px-4 py-1.5 text-xs font-medium bg-fashion-charcoal text-white overflow-hidden hover:animate-shine transition transform duration-300 hover:scale-105">
                Shop now
              </button>
            </div>
          </div>
        </div>
        
        {/* Badge if provided */}
        {badge && (
          <div className={cn(
            "fashion-card-badge px-2.5 py-1 rounded-full text-xs font-medium capitalize animate-float",
            badgeStyles[badgeColor]
          )}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}

// Demo component for displaying various card styles
export function FashionCardDemo() {
  return (
    <div className="p-8 bg-gradient-to-br from-fashion-cream to-fashion-beige min-h-screen">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-fashion-charcoal mb-8 text-center">New Arrivals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AmazingCard
          image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          title="Cashmere Blend Coat"
          description="Luxurious camel coat crafted from premium cashmere blend for ultimate warmth and style."
          price="$349.99"
          badge="new"
          badgeColor="new"
        />
        <AmazingCard
          image="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          title="Designer Handbag"
          description="Elegant structured handbag with gold hardware and adjustable strap."
          price="$189.99"
          badge="sale"
          badgeColor="sale"
          aspect="square"
        />
        <AmazingCard
          image="https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          title="Leather Chelsea Boots"
          description="Classic Chelsea boots crafted from genuine leather with durable rubber sole."
          price="$129.99"
          badge="exclusive"
          badgeColor="exclusive"
        />
      </div>
    </div>
  );
}

// Export variants for examples and documentation
export { AmazingCard as FashionCard };
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
