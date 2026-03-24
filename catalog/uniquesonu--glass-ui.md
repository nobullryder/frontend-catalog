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
glass-ui.tsx
import React from 'react';

const GlassmorphismAnimation = () => {
  const backgroundImage = 'https://512pixels.net/wp-content/uploads/2025/06/11-0-Color-Day-thumbnails.jpg';
  
  return (
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {/* Glass orb 1 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 2 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-1">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 3 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-2">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 4 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-3">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      <style jsx>{`
        @keyframes glass-move {
          0% { top: 10%; left: 10%; }
          25% { top: 10%; left: calc(90% - 25vmin); }
          50% { top: calc(90% - 25vmin); left: calc(90% - 25vmin); }
          75% { top: calc(90% - 25vmin); left: 10%; }
          100% { top: 10%; left: 10%; }
        }

        .animate-glass-move {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
        }

        .animate-glass-move-delay-1 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -3s;
        }

        .animate-glass-move-delay-2 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -2s;
        }

        .animate-glass-move-delay-3 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -1s;
        }
      `}</style>
    </div>
  );
};

export default GlassmorphismAnimation;

code.demo.1754818393925.tsx
import GlassmorphismAnimation from "@/components/ui/glass-ui";

export default function DemoOne() {
  return <GlassmorphismAnimation />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/glass-ui.tsx
import React from 'react';

const GlassmorphismAnimation = () => {
  const backgroundImage = 'https://512pixels.net/wp-content/uploads/2025/06/11-0-Color-Day-thumbnails.jpg';
  
  return (
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {/* Glass orb 1 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 2 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-1">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 3 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-2">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      {/* Glass orb 4 */}
      <div className="absolute w-[25vmin] h-[25vmin] rounded-full overflow-hidden shadow-[0.1vw_0.1vw_0_rgba(255,255,255,0.2)] animate-glass-move-delay-3">
        <div 
          className="absolute inset-[5%] rounded-full bg-cover bg-center bg-no-repeat bg-fixed blur-[2.5vmin]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute -inset-1/4 backdrop-blur-[2.5vmin] backdrop-contrast-[500%]" />
      </div>

      <style jsx>{`
        @keyframes glass-move {
          0% { top: 10%; left: 10%; }
          25% { top: 10%; left: calc(90% - 25vmin); }
          50% { top: calc(90% - 25vmin); left: calc(90% - 25vmin); }
          75% { top: calc(90% - 25vmin); left: 10%; }
          100% { top: 10%; left: 10%; }
        }

        .animate-glass-move {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
        }

        .animate-glass-move-delay-1 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -3s;
        }

        .animate-glass-move-delay-2 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -2s;
        }

        .animate-glass-move-delay-3 {
          animation: glass-move 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
          animation-delay: -1s;
        }
      `}</style>
    </div>
  );
};

export default GlassmorphismAnimation;
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
