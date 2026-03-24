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
magnifier-lens.tsx
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 2.0,
  lensSize = 150,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localIsHovering, setLocalIsHovering] = useState(false);
  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg z-20 cursor-none"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
                    <div
            className="absolute pointer-events-none"
            style={{
              left: position.x - lensSize / 2,
              top: position.y - lensSize / 2,
              width: lensSize,
              height: lensSize,
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
              background: 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
            }}
          />
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                    mousePosition.x
                  }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${
                    lensSize / 2
                  }px at ${mousePosition.x}px ${
                    mousePosition.y
                  }px, black 100%, transparent 100%)`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  zIndex: 50,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  }}
                >
                  {children}
                </div>
              </motion.div>
                            <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute pointer-events-none z-[60]"
                style={{
                  left: mousePosition.x - lensSize / 2,
                  top: mousePosition.y - lensSize / 2,
                  width: lensSize,
                  height: lensSize,
                  borderRadius: '50%',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
                  background: 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
                }}
              />
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const MagnifyingGlassDemo = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Magnifying Glass Effect
          </h1>
          <p className="text-muted-foreground">
            Hover over the image to see the magnifying glass effect with optical distortion
          </p>
        </div>
        
        <div className="relative">
          <Lens 
            hovering={hovering} 
            setHovering={setHovering}
            zoomFactor={2.5}
            lensSize={180}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mountain landscape"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </Lens>
          
          <motion.div
            animate={{
              filter: hovering ? "blur(1px)" : "blur(0px)",
            }}
            className="mt-6 text-center"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Beautiful Mountain Vista
            </h2>
            <p className="text-muted-foreground">
              Experience the detailed beauty of nature with our interactive magnifying glass. 
              Move your cursor around to explore different areas of the image in stunning detail.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Component = MagnifyingGlassDemo;

code.demo.1749632825966.tsx
import { Component } from "@/components/ui/magnifier-lens";

const DemoOne = () => {
  return <Component />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/magnifier-lens.tsx
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 2.0,
  lensSize = 150,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localIsHovering, setLocalIsHovering] = useState(false);
  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg z-20 cursor-none"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                position.x
              }px ${position.y}px, black 100%, transparent 100%)`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
                    <div
            className="absolute pointer-events-none"
            style={{
              left: position.x - lensSize / 2,
              top: position.y - lensSize / 2,
              width: lensSize,
              height: lensSize,
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
              background: 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
            }}
          />
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
                    mousePosition.x
                  }px ${mousePosition.y}px, black 100%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${
                    lensSize / 2
                  }px at ${mousePosition.x}px ${
                    mousePosition.y
                  }px, black 100%, transparent 100%)`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  zIndex: 50,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  }}
                >
                  {children}
                </div>
              </motion.div>
                            <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute pointer-events-none z-[60]"
                style={{
                  left: mousePosition.x - lensSize / 2,
                  top: mousePosition.y - lensSize / 2,
                  width: lensSize,
                  height: lensSize,
                  borderRadius: '50%',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
                  background: 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
                }}
              />
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const MagnifyingGlassDemo = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Magnifying Glass Effect
          </h1>
          <p className="text-muted-foreground">
            Hover over the image to see the magnifying glass effect with optical distortion
          </p>
        </div>
        
        <div className="relative">
          <Lens 
            hovering={hovering} 
            setHovering={setHovering}
            zoomFactor={2.5}
            lensSize={180}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mountain landscape"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-[400px]"
            />
          </Lens>
          
          <motion.div
            animate={{
              filter: hovering ? "blur(1px)" : "blur(0px)",
            }}
            className="mt-6 text-center"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Beautiful Mountain Vista
            </h2>
            <p className="text-muted-foreground">
              Experience the detailed beauty of nature with our interactive magnifying glass. 
              Move your cursor around to explore different areas of the image in stunning detail.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Component = MagnifyingGlassDemo;
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
