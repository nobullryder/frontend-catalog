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
download-options-section.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, Apple, Grid2x2, Smartphone } from 'lucide-react';

// Defines the props for a single button within a card
interface CardButton {
  text: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'link';
  onClick?: () => void;
}

// Defines the props for a single download card
interface DownloadCardProps {
  title: string;
  description: string;
  lightImage: string;
  darkImage: string;
  mockupImage: string;
  buttons: CardButton[];
}

// The reusable DownloadCard component with animation
const DownloadCard: React.FC<DownloadCardProps> = ({
  title,
  description,
  lightImage,
  darkImage,
  mockupImage,
  buttons,
}) => {
  return (
    <div className="group relative flex w-full flex-col justify-between gap-4 overflow-hidden rounded-xl border bg-transparent p-6 transition-all duration-300 hover:border-primary/50">
      {/* Background Gradient Images */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          alt="background gradient light"
          className="h-full w-full object-cover opacity-50 transition-all duration-300 group-hover:scale-105 dark:hidden"
          src={lightImage}
        />
        <img
          alt="background gradient dark"
          className="hidden h-full w-full object-cover opacity-50 transition-all duration-300 group-hover:scale-105 dark:block"
          src={darkImage}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="mb-1 text-lg font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Animated Mockup Image */}
      <img
        alt={`${title} mockup`}
        className="animate-float relative z-10 mx-auto aspect-square w-full max-w-[200px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
        src={mockupImage}
      />

      {/* Action Buttons */}
      <div className="relative z-10 flex w-full flex-col gap-2">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'secondary'}
            className="w-full"
            onClick={button.onClick}
          >
            {button.icon && <span className="mr-2 h-4 w-4">{button.icon}</span>}
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

// The main component that showcases all download cards
export const DownloadShowcase = () => {
  // Data for the cards with updated images
  const downloadOptions: DownloadCardProps[] = [
    {
      title: 'Desktop App',
      description: 'Search on your desktop',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://ik.imagekit.io/fpxbgsota/image.png?updatedAt=1753515680365',
      buttons: [
        { text: 'Download on Mac', icon: <Apple className="h-4 w-4" /> },
        { text: 'Download on Windows', icon: <Grid2x2 className="h-4 w-4" /> },
      ],
    },
    {
      title: 'iOS & Android App',
      description: 'Take the experience on the go',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://www.perplexity.ai/static/images/onboarding/download-mobile.webp',
      buttons: [{ text: 'Download on Mobile', icon: <Smartphone className="h-4 w-4" /> }],
    },
    {
      title: 'Browser Extension',
      description: 'Integrate directly into your browser',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://www.perplexity.ai/static/images/onboarding/download-extension.webp',
      buttons: [{ text: 'Join the waitlist', variant: 'secondary' }],
    },
  ];

  return (
    <>
      {/* Keyframes for the floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col items-center gap-8">
          <h2 className="max-w-md text-center text-3xl font-semibold text-foreground">
            Use The Experience Anywhere You Ask Questions
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {downloadOptions.map((card, index) => (
              <DownloadCard key={index} {...card} />
            ))}
          </div>
          <Button size="lg" className="w-full max-w-xs">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};


code.demo.1753528574306.tsx
import { DownloadShowcase } from '@/components/ui/download-options-section';

const Demo = () => {
  return (
    <DownloadShowcase />
  );
};

export default Demo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/download-options-section.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, Apple, Grid2x2, Smartphone } from 'lucide-react';

// Defines the props for a single button within a card
interface CardButton {
  text: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'link';
  onClick?: () => void;
}

// Defines the props for a single download card
interface DownloadCardProps {
  title: string;
  description: string;
  lightImage: string;
  darkImage: string;
  mockupImage: string;
  buttons: CardButton[];
}

// The reusable DownloadCard component with animation
const DownloadCard: React.FC<DownloadCardProps> = ({
  title,
  description,
  lightImage,
  darkImage,
  mockupImage,
  buttons,
}) => {
  return (
    <div className="group relative flex w-full flex-col justify-between gap-4 overflow-hidden rounded-xl border bg-transparent p-6 transition-all duration-300 hover:border-primary/50">
      {/* Background Gradient Images */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          alt="background gradient light"
          className="h-full w-full object-cover opacity-50 transition-all duration-300 group-hover:scale-105 dark:hidden"
          src={lightImage}
        />
        <img
          alt="background gradient dark"
          className="hidden h-full w-full object-cover opacity-50 transition-all duration-300 group-hover:scale-105 dark:block"
          src={darkImage}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="mb-1 text-lg font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Animated Mockup Image */}
      <img
        alt={`${title} mockup`}
        className="animate-float relative z-10 mx-auto aspect-square w-full max-w-[200px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
        src={mockupImage}
      />

      {/* Action Buttons */}
      <div className="relative z-10 flex w-full flex-col gap-2">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'secondary'}
            className="w-full"
            onClick={button.onClick}
          >
            {button.icon && <span className="mr-2 h-4 w-4">{button.icon}</span>}
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

// The main component that showcases all download cards
export const DownloadShowcase = () => {
  // Data for the cards with updated images
  const downloadOptions: DownloadCardProps[] = [
    {
      title: 'Desktop App',
      description: 'Search on your desktop',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://ik.imagekit.io/fpxbgsota/image.png?updatedAt=1753515680365',
      buttons: [
        { text: 'Download on Mac', icon: <Apple className="h-4 w-4" /> },
        { text: 'Download on Windows', icon: <Grid2x2 className="h-4 w-4" /> },
      ],
    },
    {
      title: 'iOS & Android App',
      description: 'Take the experience on the go',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://www.perplexity.ai/static/images/onboarding/download-mobile.webp',
      buttons: [{ text: 'Download on Mobile', icon: <Smartphone className="h-4 w-4" /> }],
    },
    {
      title: 'Browser Extension',
      description: 'Integrate directly into your browser',
      lightImage: 'https://img.freepik.com/free-vector/abstract-background-with-squares_23-2148995948.jpg?w=740',
      darkImage: 'https://ik.imagekit.io/fpxbgsota/image%2012-modified.png?updatedAt=1753515589830',
      mockupImage: 'https://www.perplexity.ai/static/images/onboarding/download-extension.webp',
      buttons: [{ text: 'Join the waitlist', variant: 'secondary' }],
    },
  ];

  return (
    <>
      {/* Keyframes for the floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col items-center gap-8">
          <h2 className="max-w-md text-center text-3xl font-semibold text-foreground">
            Use The Experience Anywhere You Ask Questions
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {downloadOptions.map((card, index) => (
              <DownloadCard key={index} {...card} />
            ))}
          </div>
          <Button size="lg" className="w-full max-w-xs">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

```

Install NPM dependencies:
```bash
lucide-react
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
