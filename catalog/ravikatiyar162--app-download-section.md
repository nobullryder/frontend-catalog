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
app-download-section.tsx
// components/ui/app-download-section.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for clsx

// Define the types for the props to ensure type safety and clarity
interface Feature {
  icon: React.ReactNode;
  title: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
}

export interface AppDownloadSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  benefits: Benefit[];
  qrCodeUrl: string;
  qrCodeAlt: string;
  mainImageUrl: string;
  mainImageAlt: string;
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    },
  },
};

const imageVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.9 },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            duration: 1.2,
            bounce: 0.3,
        }
    }
}

export const AppDownloadSection = ({
  title,
  subtitle,
  features,
  benefits,
  qrCodeUrl,
  qrCodeAlt,
  mainImageUrl,
  mainImageAlt,
  className,
}: AppDownloadSectionProps) => {
  return (
    <section className={cn('w-full bg-background text-foreground py-12 lg:py-24', className)}>
      <motion.div 
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Left Content Column */}
        <div className="flex flex-col space-y-8">
          <motion.div className="space-y-2" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </motion.div>

          {/* Features Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} className="flex flex-col items-center text-center space-y-2" variants={itemVariants}>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium">{feature.title}</span>
              </motion.div>
            ))}
          </div>

          {/* QR Code Section */}
          <motion.div className="flex flex-col items-center space-y-2" variants={itemVariants}>
            <img src={qrCodeUrl} alt={qrCodeAlt} className="w-36 h-36 rounded-lg border" />
            <p className="text-sm text-muted-foreground">Scan QR Code to Download</p>
          </motion.div>

          {/* Benefits Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
             {benefits.map((benefit, index) => (
              <motion.div key={index} className="flex items-center space-x-2" variants={itemVariants}>
                <div className='text-primary'>{benefit.icon}</div>
                <span className="text-sm font-medium">{benefit.title}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Image Column */}
        <motion.div className="flex items-center justify-center" variants={imageVariants}>
          <img
            src={mainImageUrl}
            alt={mainImageAlt}
            className="max-w-md w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

code.demo.1759083001986.tsx
// demo.tsx
import { AppDownloadSection } from '@/components/ui/app-download-section';
import {
  Archive,
  Percent,
  Gem,
  Coins,
  Truck,
  HandCoins,
  ShieldCheck,
} from 'lucide-react';

const AppDownloadDemo = () => {
  // Define the props for the component
  const componentProps = {
    title: 'Download realme Store App',
    subtitle: 'Explore more fun activities and get surprise benefits',
    features: [
      { icon: <Archive size={24} />, title: 'Full Range of Products' },
      { icon: <Percent size={24} />, title: 'Enjoy Exclusive Discount' },
      { icon: <Gem size={24} />, title: 'Join Membership Club' },
      { icon: <Coins size={24} />, title: 'Redeem in Coins Market' },
    ],
    benefits: [
      { icon: <Truck size={20} />, title: 'Free Shipping*' },
      { icon: <HandCoins size={20} />, title: 'Cash on Delivery*' },
      { icon: <ShieldCheck size={20} />, title: 'Secured Payments' },
    ],
    qrCodeUrl: 'https://ik.imagekit.io/fpxbgsota/Untitled.png', // Replace with your actual QR code URL
    qrCodeAlt: 'QR code to download the realme store app',
    mainImageUrl: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wp0lyIxuyGtDkw1H7AU8Kl8TP0o2t6.png&w=1000&q=75', // Replace with your actual promotional image URL
    mainImageAlt: 'Promotional image showing app benefits like coupons and gifts',
  };

  return (
    <div className="w-full">
      <AppDownloadSection {...componentProps} />
    </div>
  );
};

export default AppDownloadDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/app-download-section.tsx
// components/ui/app-download-section.tsx
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for clsx

// Define the types for the props to ensure type safety and clarity
interface Feature {
  icon: React.ReactNode;
  title: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
}

export interface AppDownloadSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  benefits: Benefit[];
  qrCodeUrl: string;
  qrCodeAlt: string;
  mainImageUrl: string;
  mainImageAlt: string;
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    },
  },
};

const imageVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.9 },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            duration: 1.2,
            bounce: 0.3,
        }
    }
}

export const AppDownloadSection = ({
  title,
  subtitle,
  features,
  benefits,
  qrCodeUrl,
  qrCodeAlt,
  mainImageUrl,
  mainImageAlt,
  className,
}: AppDownloadSectionProps) => {
  return (
    <section className={cn('w-full bg-background text-foreground py-12 lg:py-24', className)}>
      <motion.div 
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Left Content Column */}
        <div className="flex flex-col space-y-8">
          <motion.div className="space-y-2" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </motion.div>

          {/* Features Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} className="flex flex-col items-center text-center space-y-2" variants={itemVariants}>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium">{feature.title}</span>
              </motion.div>
            ))}
          </div>

          {/* QR Code Section */}
          <motion.div className="flex flex-col items-center space-y-2" variants={itemVariants}>
            <img src={qrCodeUrl} alt={qrCodeAlt} className="w-36 h-36 rounded-lg border" />
            <p className="text-sm text-muted-foreground">Scan QR Code to Download</p>
          </motion.div>

          {/* Benefits Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
             {benefits.map((benefit, index) => (
              <motion.div key={index} className="flex items-center space-x-2" variants={itemVariants}>
                <div className='text-primary'>{benefit.icon}</div>
                <span className="text-sm font-medium">{benefit.title}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Image Column */}
        <motion.div className="flex items-center justify-center" variants={imageVariants}>
          <img
            src={mainImageUrl}
            alt={mainImageAlt}
            className="max-w-md w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
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
