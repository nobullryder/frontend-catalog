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
animated-text-with-staggered-effect.tsx
import React from 'react';

const AnimatedText = ({ text, className, baseDelay = 0, spaceClassName }) => {
  const characters = text.split('');

 
  const getAnimationDelay = (index) => {
    let delay = baseDelay;
    if ((index + 1) % 7 === 0) {
      delay -= 1000;
    } else if ((index + 1) % 5 === 0) {
      delay -= 500;
    } else if ((index + 1) % 3 === 0) {
      delay -= 250;
    }
    return `${delay}ms`;
  };

  return (
    <div className={`absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 ${className}`}>
      {characters.map((char, index) => {
        if (char === ' ') {
          // Render a responsive spacer for space characters
          return <span key={index} className={spaceClassName}></span>;
        }
        return (
          <span
            key={index}
            className="m-0 [animation:fontSkew_2000ms_steps(1,end)_infinite,fontScale_1000ms_steps(1,end)_infinite]"
            style={{ animationDelay: getAnimationDelay(index) }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};


const AnimatedFollowerCount = () => {
  const mainText = "1300 Followers";
  const threadsText = "On Threads";
  // Define responsive classes for the space between words.
  const spaceClassName = "mx-2 sm:mx-3 lg:mx-[1.5vmin]";

  return (
    <div className="relative w-fit-content text-6xl sm:text-8xl lg:text-[15vmin]">
      <AnimatedText
        text={mainText}
        className="font-['Londrina_Solid'] text-orange-600 dark:text-orange-400"
        baseDelay={200}
        spaceClassName={spaceClassName}
      />
      
      <AnimatedText
        text={mainText}
        className="font-['Londrina_Sketch'] text-gray-900 dark:text-gray-100"
        baseDelay={0}
        spaceClassName={spaceClassName}
      />
      <div className="font-['Londrina_Solid'] absolute text-3xl sm:text-4xl lg:text-[8vmin] text-gray-800 dark:text-gray-200 whitespace-nowrap 
        transform 
        translate-x-[7rem] translate-y-[2.75rem] 
        sm:translate-x-[11rem] sm:translate-y-[4.5rem] 
        lg:translate-x-0 lg:translate-y-0 lg:[transform:translate(27vmin,11vmin)]">
        {threadsText}
      </div>
    </div>
  );
};

export default AnimatedFollowerCount;

code.demo.1755253630809.tsx
import AnimatedFollowerCount from "@/components/ui/animated-text-with-staggered-effect";
export default function DemoOne() {
  const animationKeyframes = `
    @keyframes fontSkew {
      0% { transform: skew(6deg, 0deg); }
      20% { transform: skew(-4deg, 0deg); }
      40% { transform: skew(8deg, 0deg); }
      60% { transform: skew(-6deg, 0deg); }
      80% { transform: skew(2deg, 0deg); }
      100% { transform: skew(-10deg, 0deg); }
    }
    @keyframes fontScale {
      0% { transform: scale(1); }
      20% { transform: scale(1.1); }
      40% { transform: scale(0.9); }
      60% { transform: scale(1.05); }
      80% { transform: scale(0.9); }
      100% { transform: scale(1.2); }
    }
  `;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      {/* Import Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@400&family=Londrina+Sketch&display=swap" rel="stylesheet" />
      
      {/* Inject Keyframes */}
      <style>{animationKeyframes}</style>

      <AnimatedFollowerCount />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-text-with-staggered-effect.tsx
import React from 'react';

const AnimatedText = ({ text, className, baseDelay = 0, spaceClassName }) => {
  const characters = text.split('');

 
  const getAnimationDelay = (index) => {
    let delay = baseDelay;
    if ((index + 1) % 7 === 0) {
      delay -= 1000;
    } else if ((index + 1) % 5 === 0) {
      delay -= 500;
    } else if ((index + 1) % 3 === 0) {
      delay -= 250;
    }
    return `${delay}ms`;
  };

  return (
    <div className={`absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 ${className}`}>
      {characters.map((char, index) => {
        if (char === ' ') {
          // Render a responsive spacer for space characters
          return <span key={index} className={spaceClassName}></span>;
        }
        return (
          <span
            key={index}
            className="m-0 [animation:fontSkew_2000ms_steps(1,end)_infinite,fontScale_1000ms_steps(1,end)_infinite]"
            style={{ animationDelay: getAnimationDelay(index) }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};


const AnimatedFollowerCount = () => {
  const mainText = "1300 Followers";
  const threadsText = "On Threads";
  // Define responsive classes for the space between words.
  const spaceClassName = "mx-2 sm:mx-3 lg:mx-[1.5vmin]";

  return (
    <div className="relative w-fit-content text-6xl sm:text-8xl lg:text-[15vmin]">
      <AnimatedText
        text={mainText}
        className="font-['Londrina_Solid'] text-orange-600 dark:text-orange-400"
        baseDelay={200}
        spaceClassName={spaceClassName}
      />
      
      <AnimatedText
        text={mainText}
        className="font-['Londrina_Sketch'] text-gray-900 dark:text-gray-100"
        baseDelay={0}
        spaceClassName={spaceClassName}
      />
      <div className="font-['Londrina_Solid'] absolute text-3xl sm:text-4xl lg:text-[8vmin] text-gray-800 dark:text-gray-200 whitespace-nowrap 
        transform 
        translate-x-[7rem] translate-y-[2.75rem] 
        sm:translate-x-[11rem] sm:translate-y-[4.5rem] 
        lg:translate-x-0 lg:translate-y-0 lg:[transform:translate(27vmin,11vmin)]">
        {threadsText}
      </div>
    </div>
  );
};

export default AnimatedFollowerCount;
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
