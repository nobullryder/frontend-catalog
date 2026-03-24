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
animated-blur-blob-background.tsx
import { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const blur1Ref = useRef<HTMLDivElement>(null);
  const blur2Ref = useRef<HTMLDivElement>(null);
  const blur3Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const blurElements = [blur1Ref.current, blur2Ref.current, blur3Ref.current].filter(Boolean);
    
    // Random value generators
    const randomX = (direction = 1) => (Math.random() * 800 - 400) * direction;
    const randomY = (direction = 1) => (Math.random() * 400 - 200) * direction;
    const randomTime = () => Math.random() * 6 + 6;
    const randomTime2 = () => Math.random() * 1 + 5;
    const randomAngle = (direction = 1) => (Math.random() * 180 - 30) * direction;
    
    // Initial positions
    blurElements.forEach((blur) => {
      if (blur) {
        blur.style.transform = `translate(${randomX(-1)}px, ${randomX(1)}px) rotate(${randomAngle(-1)}deg)`;
      }
    });
    
    // Animation functions
    const rotate = (target: HTMLElement, direction: number) => {
      const duration = randomTime2() * 1000;
      const angle = randomAngle(direction);
      
      const startTime = performance.now();
      const startAngle = parseFloat(target.style.transform.split('rotate(')[1]?.split('deg')[0] || '0');
      
      const animateRotation = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentAngle = startAngle + (angle - startAngle) * easing;
        
        // Extract existing translate values
        const transform = target.style.transform;
        const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
        const translateX = translateMatch ? translateMatch[1] : '0px';
        const translateY = translateMatch ? translateMatch[2] : '0px';
        
        target.style.transform = `translate(${translateX}, ${translateY}) rotate(${currentAngle}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Continue with opposite direction
          setTimeout(() => rotate(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateRotation);
    };
    
    const moveX = (target: HTMLElement, direction: number) => {
      const duration = randomTime() * 1000;
      const targetX = randomX(direction);
      
      const startTime = performance.now();
      const transform = target.style.transform;
      const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
      const startX = parseFloat(translateMatch ? translateMatch[1] : '0');
      const currentY = translateMatch ? translateMatch[2] : '0px';
      
      const animateX = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentX = startX + (targetX - startX) * easing;
        
        // Extract existing rotation
        const rotateMatch = transform.match(/rotate\((.*?)deg\)/);
        const rotation = rotateMatch ? rotateMatch[1] : '0';
        
        target.style.transform = `translate(${currentX}px, ${currentY}) rotate(${rotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateX);
        } else {
          // Continue with opposite direction
          setTimeout(() => moveX(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateX);
    };
    
    const moveY = (target: HTMLElement, direction: number) => {
      const duration = randomTime() * 1000;
      const targetY = randomY(direction);
      
      const startTime = performance.now();
      const transform = target.style.transform;
      const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
      const currentX = translateMatch ? translateMatch[1] : '0px';
      const startY = parseFloat(translateMatch ? translateMatch[2] : '0');
      
      const animateY = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentY = startY + (targetY - startY) * easing;
        
        // Extract existing rotation
        const rotateMatch = transform.match(/rotate\((.*?)deg\)/);
        const rotation = rotateMatch ? rotateMatch[1] : '0';
        
        target.style.transform = `translate(${currentX}, ${currentY}px) rotate(${rotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateY);
        } else {
          // Continue with opposite direction
          setTimeout(() => moveY(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateY);
    };
    
    // Start animations for each blur element
    blurElements.forEach((blur) => {
      if (blur) {
        moveX(blur, 1);
        moveY(blur, -1);
        rotate(blur, 1);
      }
    });
    
    return () => {
      // Cleanup would go here if needed
    };
  }, []);
  
  return (
    <section className="wrapper">
      <div ref={blur1Ref} className="blur"></div>
      <div ref={blur2Ref} className="blur"></div>
      <div ref={blur3Ref} className="blur"></div>
    </section>
  );
};

export {AnimatedBackground}

code.demo.1748400362108.tsx
import { AnimatedBackground } from "@/components/ui/animated-blur-blob-background";

const DemoOne = () => {
  return (
      <AnimatedBackground />
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-blur-blob-background.tsx
import { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const blur1Ref = useRef<HTMLDivElement>(null);
  const blur2Ref = useRef<HTMLDivElement>(null);
  const blur3Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const blurElements = [blur1Ref.current, blur2Ref.current, blur3Ref.current].filter(Boolean);
    
    // Random value generators
    const randomX = (direction = 1) => (Math.random() * 800 - 400) * direction;
    const randomY = (direction = 1) => (Math.random() * 400 - 200) * direction;
    const randomTime = () => Math.random() * 6 + 6;
    const randomTime2 = () => Math.random() * 1 + 5;
    const randomAngle = (direction = 1) => (Math.random() * 180 - 30) * direction;
    
    // Initial positions
    blurElements.forEach((blur) => {
      if (blur) {
        blur.style.transform = `translate(${randomX(-1)}px, ${randomX(1)}px) rotate(${randomAngle(-1)}deg)`;
      }
    });
    
    // Animation functions
    const rotate = (target: HTMLElement, direction: number) => {
      const duration = randomTime2() * 1000;
      const angle = randomAngle(direction);
      
      const startTime = performance.now();
      const startAngle = parseFloat(target.style.transform.split('rotate(')[1]?.split('deg')[0] || '0');
      
      const animateRotation = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentAngle = startAngle + (angle - startAngle) * easing;
        
        // Extract existing translate values
        const transform = target.style.transform;
        const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
        const translateX = translateMatch ? translateMatch[1] : '0px';
        const translateY = translateMatch ? translateMatch[2] : '0px';
        
        target.style.transform = `translate(${translateX}, ${translateY}) rotate(${currentAngle}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Continue with opposite direction
          setTimeout(() => rotate(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateRotation);
    };
    
    const moveX = (target: HTMLElement, direction: number) => {
      const duration = randomTime() * 1000;
      const targetX = randomX(direction);
      
      const startTime = performance.now();
      const transform = target.style.transform;
      const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
      const startX = parseFloat(translateMatch ? translateMatch[1] : '0');
      const currentY = translateMatch ? translateMatch[2] : '0px';
      
      const animateX = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentX = startX + (targetX - startX) * easing;
        
        // Extract existing rotation
        const rotateMatch = transform.match(/rotate\((.*?)deg\)/);
        const rotation = rotateMatch ? rotateMatch[1] : '0';
        
        target.style.transform = `translate(${currentX}px, ${currentY}) rotate(${rotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateX);
        } else {
          // Continue with opposite direction
          setTimeout(() => moveX(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateX);
    };
    
    const moveY = (target: HTMLElement, direction: number) => {
      const duration = randomTime() * 1000;
      const targetY = randomY(direction);
      
      const startTime = performance.now();
      const transform = target.style.transform;
      const translateMatch = transform.match(/translate\((.*?),(.*?)\)/);
      const currentX = translateMatch ? translateMatch[1] : '0px';
      const startY = parseFloat(translateMatch ? translateMatch[2] : '0');
      
      const animateY = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Simple easing function (sine ease in-out)
        const easing = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        const currentY = startY + (targetY - startY) * easing;
        
        // Extract existing rotation
        const rotateMatch = transform.match(/rotate\((.*?)deg\)/);
        const rotation = rotateMatch ? rotateMatch[1] : '0';
        
        target.style.transform = `translate(${currentX}, ${currentY}px) rotate(${rotation}deg)`;
        
        if (progress < 1) {
          requestAnimationFrame(animateY);
        } else {
          // Continue with opposite direction
          setTimeout(() => moveY(target, direction * -1), 0);
        }
      };
      
      requestAnimationFrame(animateY);
    };
    
    // Start animations for each blur element
    blurElements.forEach((blur) => {
      if (blur) {
        moveX(blur, 1);
        moveY(blur, -1);
        rotate(blur, 1);
      }
    });
    
    return () => {
      // Cleanup would go here if needed
    };
  }, []);
  
  return (
    <section className="wrapper">
      <div ref={blur1Ref} className="blur"></div>
      <div ref={blur2Ref} className="blur"></div>
      <div ref={blur3Ref} className="blur"></div>
    </section>
  );
};

export {AnimatedBackground}
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
