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
hero-1.tsx
import React from 'react';

interface GlowHeroProps {
  label?: string;
  glowText: string;
  labelSize?: 'sm' | 'md' | 'lg';
  glowTextSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GlowHero: React.FC<GlowHeroProps> = ({ 
  label, 
  glowText, 
  labelSize = 'md',
  glowTextSize = 'lg',
  className = '' 
}) => {
  const labelSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  };

  const glowTextSizeClasses = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl'
  };

  return (
    <>
      <style jsx>{`
        .glow-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #00cfff, #a600ff, #ff006e, #ff8800);
          filter: blur(20px) brightness(0.8);
          opacity: 0.7;
          border-radius: 100px;
          z-index: -1;
          pointer-events: none;
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
        }
        
        .glow-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-size: inherit;
          font-weight: inherit;
          font-family: inherit;
          letter-spacing: inherit;
          background: linear-gradient(90deg, #00cfff, #a600ff, #ff006e, #ff8800);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          mix-blend-mode: color-burn;
          filter: blur(3px) brightness(1.3);
          z-index: 0;
          pointer-events: none;
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {label && (
          <div className={`${labelSizeClasses[labelSize]} font-medium text-foreground mb-4 text-center transition-opacity duration-300 ease-out`}>
            {label} 
          </div>
        )}
        <div className="relative">
          <div 
            className={`glow-text relative ${glowTextSizeClasses[glowTextSize]} font-medium text-center text-white tracking-tight brightness-110 z-10`}
            data-text={glowText}
          >
            {glowText}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlowHero;

code.demo.1756027155385.tsx
import React from "react";
import GlowHero from "@/components/ui/hero-1";

const Demo: React.FC = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center p-8 font-sans transition-colors">
      <GlowHero
        label="MacBook Pro"
        glowText="Built for Apple Intelligence."
        glowTextSize="xl"
      />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-1.tsx
import React from 'react';

interface GlowHeroProps {
  label?: string;
  glowText: string;
  labelSize?: 'sm' | 'md' | 'lg';
  glowTextSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GlowHero: React.FC<GlowHeroProps> = ({ 
  label, 
  glowText, 
  labelSize = 'md',
  glowTextSize = 'lg',
  className = '' 
}) => {
  const labelSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  };

  const glowTextSizeClasses = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl'
  };

  return (
    <>
      <style jsx>{`
        .glow-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #00cfff, #a600ff, #ff006e, #ff8800);
          filter: blur(20px) brightness(0.8);
          opacity: 0.7;
          border-radius: 100px;
          z-index: -1;
          pointer-events: none;
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
        }
        
        .glow-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-size: inherit;
          font-weight: inherit;
          font-family: inherit;
          letter-spacing: inherit;
          background: linear-gradient(90deg, #00cfff, #a600ff, #ff006e, #ff8800);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          mix-blend-mode: color-burn;
          filter: blur(3px) brightness(1.3);
          z-index: 0;
          pointer-events: none;
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {label && (
          <div className={`${labelSizeClasses[labelSize]} font-medium text-foreground mb-4 text-center transition-opacity duration-300 ease-out`}>
            {label} 
          </div>
        )}
        <div className="relative">
          <div 
            className={`glow-text relative ${glowTextSizeClasses[glowTextSize]} font-medium text-center text-white tracking-tight brightness-110 z-10`}
            data-text={glowText}
          >
            {glowText}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlowHero;
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
