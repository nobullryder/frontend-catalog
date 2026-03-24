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
animated-glow-card.tsx
import React from 'react';

const CardCanvas = ({ children, className = "" }) => {
  return (
    <div className={`card-canvas ${className}`}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0"></feColorMatrix>
        </filter>
      </svg>
      <div className="card-backdrop"></div>
      {children}
    </div>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div className={`glow-card ${className}`}>
      <div className="border-element border-left"></div>
      <div className="border-element border-right"></div>
      <div className="border-element border-top"></div>
      <div className="border-element border-bottom"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export { CardCanvas, Card };

code.demo.1748414320630.tsx
import { Card, CardCanvas } from "@/components/ui/animated-glow-card";
import { XCard } from "@/components/ui/x-gradient-card"

const XCardDummyData = {
    authorName: "EaseMise",
    authorHandle: "easemize",
    authorImage: "https://pbs.twimg.com/profile_images/1854916060807675904/KtBJsyWr_400x400.jpg",
    content: [
        "The Outer container with border and dots its the actual Card",
        "Wrap it around anything to have a cool card like this",
    ],
    isVerified: true,
    timestamp: "Today",
    reply: {
        authorName: "GoodGuy",
        authorHandle: "gdguy",
        authorImage:
            "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
        content: "Its Easy to Use great to customize",
        isVerified: true,
        timestamp: "10 mintes ago",
    },
};

function XCardDemoDefault() {
    return <XCard {...XCardDummyData} />
}

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black">
      <CardCanvas>
        <Card className="w-auto p-6">
          <div className="dark">
            <XCard {...XCardDummyData} />
          </div>
        </Card>
      </CardCanvas>
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-glow-card.tsx
import React from 'react';

const CardCanvas = ({ children, className = "" }) => {
  return (
    <div className={`card-canvas ${className}`}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0"></feColorMatrix>
        </filter>
      </svg>
      <div className="card-backdrop"></div>
      {children}
    </div>
  );
};

const Card = ({ children, className = "" }) => {
  return (
    <div className={`glow-card ${className}`}>
      <div className="border-element border-left"></div>
      <div className="border-element border-right"></div>
      <div className="border-element border-top"></div>
      <div className="border-element border-bottom"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export { CardCanvas, Card };
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
