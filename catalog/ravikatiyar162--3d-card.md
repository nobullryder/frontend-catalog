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
3d-card.tsx
import React, { useState, useEffect } from 'react';

// Component for the individual photo cards
const PhotoCard = ({ src, alt, rotation, text, index, style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 700 + (index * 300));
    return () => clearTimeout(timer);
  }, [index]);

  const cardStyle = {
    position: 'absolute',
    transform: `rotate(${rotation}deg) ${isHovered ? `rotate(${rotation + 2}deg) scale(1.05)` : `rotate(${rotation}deg) scale(1)`}`,
    zIndex: isHovered ? 20 : (index === 1 ? 2 : 1),
    transition: 'all 0.3s ease-out',
    opacity: isVisible ? 1 : 0,
    ...style
  };

  return (
    <div
      className="w-[162px] h-[240px] bg-white p-2 rounded-md shadow-2xl cursor-pointer"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-[85%] bg-muted rounded-sm overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src='https://placehold.co/162x200/e2e8f0/94a3b8?text=Image';
            setIsLoaded(true);
          }}
        />
      </div>
      <div className="h-[15%] flex items-center justify-center">
        <p style={{ fontFamily: '"Zeyada", cursive' }} className="text-sm text-muted-foreground tracking-tighter text-center">
          {text}
        </p>
      </div>
    </div>
  );
};

// Animated Gradient Grid Background Component
// Animated Gradient Grid Background Component
const AnimatedGrid = () => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 0.5) % 40);
    }, 80);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main grid with gradient fade - Light theme */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, #ffffff 50%, #ffffff 100%),
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: 'cover, 40px 40px, 40px 40px',
          backgroundPosition: `center, ${offset}px ${offset}px, ${offset}px ${offset}px`,
        }}
      />
      
      {/* Main grid with gradient fade - Dark theme */}
      <div 
        className="absolute inset-0 hidden dark:block bg-background"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, #0f172a 50%, #0f172a 100%),
            linear-gradient(#374151 1px, transparent 1px),
            linear-gradient(90deg, #374151 1px, transparent 1px)
          `,
          backgroundSize: 'cover, 40px 40px, 40px 40px',
          backgroundPosition: `center, ${offset}px ${offset}px, ${offset}px ${offset}px`,
        }}
      />
      
      {/* Subtle moving overlay for depth - Light theme */}
      <div 
        className="absolute inset-0 opacity-30 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at ${50 + Math.sin(offset * 0.1) * 20}% ${50 + Math.cos(offset * 0.1) * 20}%, rgba(107, 114, 128, 0.1) 0%, transparent 60%)
          `,
        }}
      />
      
      {/* Subtle moving overlay for depth - Dark theme */}
      <div 
        className="absolute inset-0 opacity-30 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at ${50 + Math.sin(offset * 0.1) * 20}% ${50 + Math.cos(offset * 0.1) * 20}%, rgba(156, 163, 175, 0.15) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
};

// Main App Component
export function Component() {
  return (
    <>
      {/* Adding the Google Font 'Zeyada' for the handwritten text */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Zeyada&display=swap" rel="stylesheet" />

      <div className="bg-background min-h-screen flex items-center justify-center w-full p-8 relative">
        
        {/* Animated Grid Background */}
        <AnimatedGrid />
        {/* Photo Cards Container - positioned exactly like your image */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          
          {/* Back Photo Card - rotated left, positioned behind */}
          <PhotoCard
            src="https://framerusercontent.com/images/iTYf5BdHF9LFJQ3JBv65nwyo730.jpg"
            alt="A person standing in a field with mountains in the background"
            rotation={-8}
            text="Some of my recent photography"
            index={0}
            style={{ top: '20px', left: '0px' }}
          />
          
          {/* Front Photo Card - rotated right, positioned on top */}
          <PhotoCard
            src="https://framerusercontent.com/images/uOHOKF6VtoSK07qQRm4AYoxI.jpg"
            alt="A close-up of a person's face"
            rotation={15}
            text="Some of my recent photography"
            index={1}
            style={{ top: '10px', right: '0px' }}
          />
          
          
        </div>
      </div>
    </>
  );
}

code.demo.1752999832295.tsx
import { Component } from "@/components/ui/3d-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/3d-card.tsx
import React, { useState, useEffect } from 'react';

// Component for the individual photo cards
const PhotoCard = ({ src, alt, rotation, text, index, style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 700 + (index * 300));
    return () => clearTimeout(timer);
  }, [index]);

  const cardStyle = {
    position: 'absolute',
    transform: `rotate(${rotation}deg) ${isHovered ? `rotate(${rotation + 2}deg) scale(1.05)` : `rotate(${rotation}deg) scale(1)`}`,
    zIndex: isHovered ? 20 : (index === 1 ? 2 : 1),
    transition: 'all 0.3s ease-out',
    opacity: isVisible ? 1 : 0,
    ...style
  };

  return (
    <div
      className="w-[162px] h-[240px] bg-white p-2 rounded-md shadow-2xl cursor-pointer"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-[85%] bg-muted rounded-sm overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src='https://placehold.co/162x200/e2e8f0/94a3b8?text=Image';
            setIsLoaded(true);
          }}
        />
      </div>
      <div className="h-[15%] flex items-center justify-center">
        <p style={{ fontFamily: '"Zeyada", cursive' }} className="text-sm text-muted-foreground tracking-tighter text-center">
          {text}
        </p>
      </div>
    </div>
  );
};

// Animated Gradient Grid Background Component
// Animated Gradient Grid Background Component
const AnimatedGrid = () => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 0.5) % 40);
    }, 80);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main grid with gradient fade - Light theme */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, #ffffff 50%, #ffffff 100%),
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: 'cover, 40px 40px, 40px 40px',
          backgroundPosition: `center, ${offset}px ${offset}px, ${offset}px ${offset}px`,
        }}
      />
      
      {/* Main grid with gradient fade - Dark theme */}
      <div 
        className="absolute inset-0 hidden dark:block bg-background"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, #0f172a 50%, #0f172a 100%),
            linear-gradient(#374151 1px, transparent 1px),
            linear-gradient(90deg, #374151 1px, transparent 1px)
          `,
          backgroundSize: 'cover, 40px 40px, 40px 40px',
          backgroundPosition: `center, ${offset}px ${offset}px, ${offset}px ${offset}px`,
        }}
      />
      
      {/* Subtle moving overlay for depth - Light theme */}
      <div 
        className="absolute inset-0 opacity-30 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at ${50 + Math.sin(offset * 0.1) * 20}% ${50 + Math.cos(offset * 0.1) * 20}%, rgba(107, 114, 128, 0.1) 0%, transparent 60%)
          `,
        }}
      />
      
      {/* Subtle moving overlay for depth - Dark theme */}
      <div 
        className="absolute inset-0 opacity-30 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at ${50 + Math.sin(offset * 0.1) * 20}% ${50 + Math.cos(offset * 0.1) * 20}%, rgba(156, 163, 175, 0.15) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
};

// Main App Component
export function Component() {
  return (
    <>
      {/* Adding the Google Font 'Zeyada' for the handwritten text */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Zeyada&display=swap" rel="stylesheet" />

      <div className="bg-background min-h-screen flex items-center justify-center w-full p-8 relative">
        
        {/* Animated Grid Background */}
        <AnimatedGrid />
        {/* Photo Cards Container - positioned exactly like your image */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          
          {/* Back Photo Card - rotated left, positioned behind */}
          <PhotoCard
            src="https://framerusercontent.com/images/iTYf5BdHF9LFJQ3JBv65nwyo730.jpg"
            alt="A person standing in a field with mountains in the background"
            rotation={-8}
            text="Some of my recent photography"
            index={0}
            style={{ top: '20px', left: '0px' }}
          />
          
          {/* Front Photo Card - rotated right, positioned on top */}
          <PhotoCard
            src="https://framerusercontent.com/images/uOHOKF6VtoSK07qQRm4AYoxI.jpg"
            alt="A close-up of a person's face"
            rotation={15}
            text="Some of my recent photography"
            index={1}
            style={{ top: '10px', right: '0px' }}
          />
          
          
        </div>
      </div>
    </>
  );
}
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
