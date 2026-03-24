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
morphing-loader.tsx
import React, { useState, useEffect } from 'react';

const MorphingLoader = ({ 
  size = 60, 
  text = "Loading", 
  subtitle = "Please wait while we prepare your content",
  showText = true,
  showSubtitle = true,
  className = "",
  colors = [
    ['#3b82f6', '#8b5cf6'],
    ['#10b981', '#3b82f6'],
    ['#f59e0b', '#ec4899'],
    ['#8b5cf6', '#ec4899'],
    ['#3b82f6', '#10b981']
  ]
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex(prev => (prev + 1) % colors.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [colors.length]);

  const currentColors = colors[currentColorIndex];

  const morphKeyframes = `
    @keyframes morph-${currentColorIndex} {
      0%, 100% {
        border-radius: 50%;
        transform: scale(1) rotate(0deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      12.5% {
        border-radius: 70% 30% 30% 70% / 60% 60% 40% 40%;
        transform: scale(0.85) rotate(45deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      25% {
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        transform: scale(0.95) rotate(90deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      37.5% {
        border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
        transform: scale(1.05) rotate(135deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      50% {
        border-radius: 20% 80% 50% 50% / 50% 15% 85% 50%;
        transform: scale(1.1) rotate(180deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      62.5% {
        border-radius: 60% 40% 70% 30% / 40% 60% 40% 60%;
        transform: scale(1.05) rotate(225deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      75% {
        border-radius: 60% 40% 30% 70% / 60% 40% 60% 40%;
        transform: scale(0.95) rotate(270deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      87.5% {
        border-radius: 30% 70% 40% 60% / 70% 30% 70% 30%;
        transform: scale(0.85) rotate(315deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
    }
  `;

  return (
    <div className={`flex flex-col items-center justify-center space-y-8 ${className}`}>
      <style>{`
        ${morphKeyframes}
        
        .morph-loader {
          position: relative;
          animation: spin 2s linear infinite, pulse 1.5s ease-in-out infinite, deform 3s ease-in-out infinite;
        }
        
        .morph-loader::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
          border-radius: 50%;
          animation: morph-${currentColorIndex} 4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes deform {
          0%, 100% { transform: skewX(0deg) skewY(0deg); }
          25% { transform: skewX(10deg) skewY(5deg); }
          50% { transform: skewX(-5deg) skewY(10deg); }
          75% { transform: skewX(5deg) skewY(-5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .loading-text {
          font-weight: 600;
          color: #3b82f6;
          animation: textPulse 2s ease-in-out infinite;
        }
        
        @keyframes textPulse {
          0%, 100% {
            opacity: 0.7;
            letter-spacing: 0px;
          }
          50% {
            opacity: 1;
            letter-spacing: 1px;
          }
        }
        
        .dots::after {
          content: '.';
          animation: dots 1.5s steps(5, end) infinite;
        }
        
        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60% { content: '...'; }
          80%, 100% { content: ''; }
        }
      `}</style>
      
      <div 
        className="morph-loader mx-auto" 
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      
      {showText && (
        <div className="loading-text text-xl flex justify-center">
          <span>{text}</span>
          <span className="dots"></span>
        </div>
      )}
      
      {showSubtitle && (
        <p className="text-gray-500 text-sm mt-4">{subtitle}</p>
      )}
    </div>
  );
};

export default MorphingLoader

code.demo.1754981403327.tsx
import MorphingLoader from "@/components/ui/morphing-loader";

export default function DemoOne() {
  return <div className="bg-gray-50 min-h-screen w-full p-8 space-y-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Morphing Loader Component</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Default loader */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-lg text-gray-800 font-semibold mb-4 text-center">Default</h3>
          <MorphingLoader />
        </div>
        
        {/* Custom text and colors */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Custom Text & Colors</h3>
          <MorphingLoader 
            text="Processing"
            subtitle="Analyzing your data..."
            colors={[
              ['#ef4444', '#f97316'],
              ['#8b5cf6', '#ec4899'],
              ['#06b6d4', '#3b82f6']
            ]}
          />
        </div>
        
        
      </div>
      
      
    </div>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/morphing-loader.tsx
import React, { useState, useEffect } from 'react';

const MorphingLoader = ({ 
  size = 60, 
  text = "Loading", 
  subtitle = "Please wait while we prepare your content",
  showText = true,
  showSubtitle = true,
  className = "",
  colors = [
    ['#3b82f6', '#8b5cf6'],
    ['#10b981', '#3b82f6'],
    ['#f59e0b', '#ec4899'],
    ['#8b5cf6', '#ec4899'],
    ['#3b82f6', '#10b981']
  ]
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex(prev => (prev + 1) % colors.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [colors.length]);

  const currentColors = colors[currentColorIndex];

  const morphKeyframes = `
    @keyframes morph-${currentColorIndex} {
      0%, 100% {
        border-radius: 50%;
        transform: scale(1) rotate(0deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      12.5% {
        border-radius: 70% 30% 30% 70% / 60% 60% 40% 40%;
        transform: scale(0.85) rotate(45deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      25% {
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        transform: scale(0.95) rotate(90deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      37.5% {
        border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
        transform: scale(1.05) rotate(135deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      50% {
        border-radius: 20% 80% 50% 50% / 50% 15% 85% 50%;
        transform: scale(1.1) rotate(180deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      62.5% {
        border-radius: 60% 40% 70% 30% / 40% 60% 40% 60%;
        transform: scale(1.05) rotate(225deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
      75% {
        border-radius: 60% 40% 30% 70% / 60% 40% 60% 40%;
        transform: scale(0.95) rotate(270deg);
        background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
      }
      87.5% {
        border-radius: 30% 70% 40% 60% / 70% 30% 70% 30%;
        transform: scale(0.85) rotate(315deg);
        background: linear-gradient(45deg, ${currentColors[1]}, ${currentColors[0]});
      }
    }
  `;

  return (
    <div className={`flex flex-col items-center justify-center space-y-8 ${className}`}>
      <style>{`
        ${morphKeyframes}
        
        .morph-loader {
          position: relative;
          animation: spin 2s linear infinite, pulse 1.5s ease-in-out infinite, deform 3s ease-in-out infinite;
        }
        
        .morph-loader::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, ${currentColors[0]}, ${currentColors[1]});
          border-radius: 50%;
          animation: morph-${currentColorIndex} 4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes deform {
          0%, 100% { transform: skewX(0deg) skewY(0deg); }
          25% { transform: skewX(10deg) skewY(5deg); }
          50% { transform: skewX(-5deg) skewY(10deg); }
          75% { transform: skewX(5deg) skewY(-5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .loading-text {
          font-weight: 600;
          color: #3b82f6;
          animation: textPulse 2s ease-in-out infinite;
        }
        
        @keyframes textPulse {
          0%, 100% {
            opacity: 0.7;
            letter-spacing: 0px;
          }
          50% {
            opacity: 1;
            letter-spacing: 1px;
          }
        }
        
        .dots::after {
          content: '.';
          animation: dots 1.5s steps(5, end) infinite;
        }
        
        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60% { content: '...'; }
          80%, 100% { content: ''; }
        }
      `}</style>
      
      <div 
        className="morph-loader mx-auto" 
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      
      {showText && (
        <div className="loading-text text-xl flex justify-center">
          <span>{text}</span>
          <span className="dots"></span>
        </div>
      )}
      
      {showSubtitle && (
        <p className="text-gray-500 text-sm mt-4">{subtitle}</p>
      )}
    </div>
  );
};

export default MorphingLoader
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
