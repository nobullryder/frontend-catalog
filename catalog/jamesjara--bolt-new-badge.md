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
bolt-new-badge.tsx
import React, { useState, useEffect } from 'react';

interface BoltNewBadgeProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  variant?: 'auto' | 'light' | 'dark' | 'text';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const BoltNewBadge: React.FC<BoltNewBadgeProps> = ({
  position = 'bottom-right',
  variant = 'auto',
  size = 'medium',
  className = ''
}) => {

  const [detectedVariant, setDetectedVariant] = useState<'light' | 'dark' | 'text'>('light');
  const [isHovered, setIsHovered] = useState(false);

  // Auto-detect background color to choose appropriate badge variant
  useEffect(() => {
    if (variant === 'auto') {
      const detectBackgroundColor = () => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Convert RGB to brightness value
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          setDetectedVariant(brightness > 128 ? 'light' : 'dark');
        } else {
          // Default to light for unknown backgrounds
          setDetectedVariant('light');
        }
      };

      detectBackgroundColor();
      // Re-detect on window resize in case of responsive background changes
      window.addEventListener('resize', detectBackgroundColor);
      return () => window.removeEventListener('resize', detectBackgroundColor);
    } else if (variant !== 'auto') {
      setDetectedVariant(variant as 'light' | 'dark' | 'text');
    }
  }, [variant]);

  const getBadgeImage = () => {
    const finalVariant = variant === 'auto' ? detectedVariant : variant;
    
    switch (finalVariant) {
      case 'dark':
        return 'https://ik.imagekit.io/brandvirality/white_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
      case 'light':
        return 'https://ik.imagekit.io/brandvirality/black_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
      case 'text':
        return 'https://ik.imagekit.io/brandvirality/logotext_poweredby_360w.png?updatedAt=1749708269615&tr=n-ik_ml_thumbnail';
      default:
        return 'https://ik.imagekit.io/brandvirality/black_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
    }
  };

  const getPositionClasses = () => {
    const baseClasses = 'fixed z-50';
    switch (position) {
      case 'top-right':
        return `${baseClasses} top-4 right-4 md:top-6 md:right-6`;
      case 'top-left':
        return `${baseClasses} top-4 left-4 md:top-6 md:left-6`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4 md:bottom-6 md:left-6`;
      case 'bottom-right':
      default:
        return `${baseClasses} bottom-4 right-4 md:bottom-6 md:right-6`;
    }
  };

  const getSizeClasses = () => {
    const finalVariant = variant === 'auto' ? detectedVariant : variant;
    
    if (finalVariant === 'text') {
      // Text variant uses width-based sizing for better text readability
      switch (size) {
        case 'small':
          return 'w-20 h-auto md:w-24';
        case 'large':
          return 'w-32 h-auto md:w-40';
        case 'medium':
        default:
          return 'w-24 h-auto md:w-32';
      }
    } else {
      // Circle variants use square sizing
      switch (size) {
        case 'small':
          return 'w-10 h-10 md:w-12 md:h-12';
        case 'large':
          return 'w-16 h-16 md:w-20 md:h-20';
        case 'medium':
        default:
          return 'w-12 h-12 md:w-16 md:h-16';
      }
    }
  };

  const finalVariant = variant === 'auto' ? detectedVariant : variant;
  const isTextMode = finalVariant === 'text';

  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${getPositionClasses()}
        ${getSizeClasses()}
        group cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${!isTextMode ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Built with Bolt.new - Click to visit"
      title="Built with Bolt.new"
    >
      <div className="relative w-full h-full">
        {/* Background glow effect - only for non-text variants */}
        {!isTextMode && (
          <div 
            className={`
              absolute inset-0 rounded-full
              transition-all duration-300 ease-out
              ${isHovered ? 'bg-blue-500/20 scale-150 blur-md' : 'bg-transparent scale-100'}
            `}
          />
        )}
        
        {/* Badge container - conditional styling based on variant */}
        <div 
          className={`
            relative w-full h-full
            transition-all duration-300 ease-out
            ${!isTextMode ? `
              rounded-full
              bg-white/10 backdrop-blur-sm
              border border-white/20
              shadow-lg shadow-black/10
              ${isHovered ? 'shadow-xl shadow-black/20 bg-white/20' : ''}
              overflow-hidden
            ` : `
              ${isHovered ? 'opacity-80' : 'opacity-100'}
            `}
          `}
        >
          <img
            src={getBadgeImage()}
            alt="Bolt.new"
            className={`
              w-full h-full object-contain
              transition-all duration-300 ease-out
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </a>
  );
};

code.demo.1749788056066.tsx
import { BoltNewBadge } from "@/components/ui/bolt-new-badge";

const DemoAuto = () => {
  return <BoltNewBadge 
        position="bottom-left" 
        variant="auto" 
        size="medium"
         />;
};

const DemoText = () => {
  return <BoltNewBadge 
        position="bottom-left" 
        variant="text" 
        size="medium"
         />;
};

const DemoDark = () => {
  return <BoltNewBadge 
        position="bottom-left" 
        variant="dark" 
        size="medium"
         />;
};

const DemoLigth = () => {
  return <BoltNewBadge 
        position="bottom-left" 
        variant="ligth" 
        size="medium"
         />;
};

export { DemoAuto, DemoText, DemoDark, DemoLigth };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bolt-new-badge.tsx
import React, { useState, useEffect } from 'react';

interface BoltNewBadgeProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  variant?: 'auto' | 'light' | 'dark' | 'text';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const BoltNewBadge: React.FC<BoltNewBadgeProps> = ({
  position = 'bottom-right',
  variant = 'auto',
  size = 'medium',
  className = ''
}) => {

  const [detectedVariant, setDetectedVariant] = useState<'light' | 'dark' | 'text'>('light');
  const [isHovered, setIsHovered] = useState(false);

  // Auto-detect background color to choose appropriate badge variant
  useEffect(() => {
    if (variant === 'auto') {
      const detectBackgroundColor = () => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Convert RGB to brightness value
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          setDetectedVariant(brightness > 128 ? 'light' : 'dark');
        } else {
          // Default to light for unknown backgrounds
          setDetectedVariant('light');
        }
      };

      detectBackgroundColor();
      // Re-detect on window resize in case of responsive background changes
      window.addEventListener('resize', detectBackgroundColor);
      return () => window.removeEventListener('resize', detectBackgroundColor);
    } else if (variant !== 'auto') {
      setDetectedVariant(variant as 'light' | 'dark' | 'text');
    }
  }, [variant]);

  const getBadgeImage = () => {
    const finalVariant = variant === 'auto' ? detectedVariant : variant;
    
    switch (finalVariant) {
      case 'dark':
        return 'https://ik.imagekit.io/brandvirality/white_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
      case 'light':
        return 'https://ik.imagekit.io/brandvirality/black_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
      case 'text':
        return 'https://ik.imagekit.io/brandvirality/logotext_poweredby_360w.png?updatedAt=1749708269615&tr=n-ik_ml_thumbnail';
      default:
        return 'https://ik.imagekit.io/brandvirality/black_circle_360x360.png?updatedAt=1749708269684&tr=n-ik_ml_thumbnail';
    }
  };

  const getPositionClasses = () => {
    const baseClasses = 'fixed z-50';
    switch (position) {
      case 'top-right':
        return `${baseClasses} top-4 right-4 md:top-6 md:right-6`;
      case 'top-left':
        return `${baseClasses} top-4 left-4 md:top-6 md:left-6`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4 md:bottom-6 md:left-6`;
      case 'bottom-right':
      default:
        return `${baseClasses} bottom-4 right-4 md:bottom-6 md:right-6`;
    }
  };

  const getSizeClasses = () => {
    const finalVariant = variant === 'auto' ? detectedVariant : variant;
    
    if (finalVariant === 'text') {
      // Text variant uses width-based sizing for better text readability
      switch (size) {
        case 'small':
          return 'w-20 h-auto md:w-24';
        case 'large':
          return 'w-32 h-auto md:w-40';
        case 'medium':
        default:
          return 'w-24 h-auto md:w-32';
      }
    } else {
      // Circle variants use square sizing
      switch (size) {
        case 'small':
          return 'w-10 h-10 md:w-12 md:h-12';
        case 'large':
          return 'w-16 h-16 md:w-20 md:h-20';
        case 'medium':
        default:
          return 'w-12 h-12 md:w-16 md:h-16';
      }
    }
  };

  const finalVariant = variant === 'auto' ? detectedVariant : variant;
  const isTextMode = finalVariant === 'text';

  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${getPositionClasses()}
        ${getSizeClasses()}
        group cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${!isTextMode ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Built with Bolt.new - Click to visit"
      title="Built with Bolt.new"
    >
      <div className="relative w-full h-full">
        {/* Background glow effect - only for non-text variants */}
        {!isTextMode && (
          <div 
            className={`
              absolute inset-0 rounded-full
              transition-all duration-300 ease-out
              ${isHovered ? 'bg-blue-500/20 scale-150 blur-md' : 'bg-transparent scale-100'}
            `}
          />
        )}
        
        {/* Badge container - conditional styling based on variant */}
        <div 
          className={`
            relative w-full h-full
            transition-all duration-300 ease-out
            ${!isTextMode ? `
              rounded-full
              bg-white/10 backdrop-blur-sm
              border border-white/20
              shadow-lg shadow-black/10
              ${isHovered ? 'shadow-xl shadow-black/20 bg-white/20' : ''}
              overflow-hidden
            ` : `
              ${isHovered ? 'opacity-80' : 'opacity-100'}
            `}
          `}
        >
          <img
            src={getBadgeImage()}
            alt="Bolt.new"
            className={`
              w-full h-full object-contain
              transition-all duration-300 ease-out
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </a>
  );
};
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
