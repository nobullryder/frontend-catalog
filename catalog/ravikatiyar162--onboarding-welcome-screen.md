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
onboarding-welcome-screen.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define the props for the WelcomeScreen component
interface WelcomeScreenProps {
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryActionText?: string;
  onSecondaryActionClick?: () => void;
  className?: string;
}

/**
 * A responsive and animated welcome screen component.
 * It uses framer-motion for animations and is styled with shadcn/ui theme variables.
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  onButtonClick,
  secondaryActionText,
  onSecondaryActionClick,
  className,
}) => {
  // Animation variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };
  
  const imageVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
      },
    },
  };

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-between bg-background',
        className
      )}
    >
      {/* Top Image Section with a curved clip-path */}
      <motion.div 
        className="relative w-full"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <img
          src={imageUrl}
          alt="Welcome"
          className="h-auto w-full object-cover"
          style={{ clipPath: 'ellipse(100% 60% at 50% 40%)' }}
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-md text-muted-foreground"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </motion.div>
      
      {/* Actions Section */}
      <motion.div 
        className="w-full space-y-4 p-8 pt-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Primary Button */}
        <motion.div variants={itemVariants}>
          <Button onClick={onButtonClick} className="w-full" size="lg">
            {buttonText}
          </Button>
        </motion.div>

        {/* Secondary Action Link */}
        {secondaryActionText && onSecondaryActionClick && (
          <motion.div variants={itemVariants} className="text-center">
            <Button
              variant="link"
              onClick={onSecondaryActionClick}
              className="text-sm text-muted-foreground"
            >
              {secondaryActionText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

code.demo.1758008546210.tsx
import { WelcomeScreen } from '@/components/ui/onboarding-welcome-screen';

const WelcomeScreenDemo = () => {
  // Handlers for button clicks
  const handleGetStarted = () => {
    alert('Get Started button clicked!');
  };

  const handleLogin = () => {
    alert('Login link clicked!');
  };

  return (
    <div className="relative mx-auto my-12 h-[812px] w-[975px] max-w-sm overflow-hidden rounded-3xl border shadow-lg">
      <WelcomeScreen
        imageUrl="https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title={
          <>
            Welcome To <span className="text-primary">Doorin</span>
          </>
        }
        description="Discover and book hotels effortlessly with Doorin, your personalized hotel booking app."
        buttonText="Let's get started"
        onButtonClick={handleGetStarted}
        secondaryActionText={
          <>
            Already have an account? <span className="font-semibold text-primary">Login Now</span>
          </>
        }
        onSecondaryActionClick={handleLogin}
      />
    </div>
  );
};

export default WelcomeScreenDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/onboarding-welcome-screen.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define the props for the WelcomeScreen component
interface WelcomeScreenProps {
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryActionText?: string;
  onSecondaryActionClick?: () => void;
  className?: string;
}

/**
 * A responsive and animated welcome screen component.
 * It uses framer-motion for animations and is styled with shadcn/ui theme variables.
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  onButtonClick,
  secondaryActionText,
  onSecondaryActionClick,
  className,
}) => {
  // Animation variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };
  
  const imageVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
      },
    },
  };

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-between bg-background',
        className
      )}
    >
      {/* Top Image Section with a curved clip-path */}
      <motion.div 
        className="relative w-full"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <img
          src={imageUrl}
          alt="Welcome"
          className="h-auto w-full object-cover"
          style={{ clipPath: 'ellipse(100% 60% at 50% 40%)' }}
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-md text-muted-foreground"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </motion.div>
      
      {/* Actions Section */}
      <motion.div 
        className="w-full space-y-4 p-8 pt-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Primary Button */}
        <motion.div variants={itemVariants}>
          <Button onClick={onButtonClick} className="w-full" size="lg">
            {buttonText}
          </Button>
        </motion.div>

        {/* Secondary Action Link */}
        {secondaryActionText && onSecondaryActionClick && (
          <motion.div variants={itemVariants} className="text-center">
            <Button
              variant="link"
              onClick={onSecondaryActionClick}
              className="text-sm text-muted-foreground"
            >
              {secondaryActionText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
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
