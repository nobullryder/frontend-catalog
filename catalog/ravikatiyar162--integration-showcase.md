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
integration-showcase.tsx
// components/ui/integration-showcase.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

/**
 * Type definition for a single integration item.
 * @property {string} name - The name of the integration (e.g., "Notion").
 * @property {string} description - A brief description of the integration.
 * @property {string} iconSrc - The URL for the integration's icon.
 */
export interface Integration {
  name: string;
  description: string;
  iconSrc: string;
}

/**
 * Props for the IntegrationShowcase component.
 * @property {string} title - The main heading. Use `~` to wrap the word you want to highlight (e.g., "Connect your ~favorite~ tools").
 * @property {string} subtitle - The descriptive text below the title.
 * @property {string} illustrationSrc - The URL for the decorative illustration.
 * @property {string} illustrationAlt - Alt text for the illustration.
 * @property {Integration[]} integrations - An array of integration objects to display in the grid.
 * @property {string} [className] - Optional additional class names for the container.
 */
export interface IntegrationShowcaseProps {
  title: string;
  subtitle: string;
  illustrationSrc: string;
  illustrationAlt: string;
  integrations: Integration[];
  className?: string;
}

// Function to parse the title and wrap the highlighted word in a span
const HighlightedTitle = ({ text }: { text: string }) => {
  const parts = text.split(/~/);
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {parts.map((part, index) =>
        index === 1 ? (
          <span key={index} className="relative whitespace-nowrap">
            <span className="relative">{part}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute -bottom-1.5 left-0 h-auto w-full text-primary"
              preserveAspectRatio="none"
            >
              <path
                d="M203.371.916c-26.013-2.078-76.686 1.98-114.243 8.919-37.556 6.939-78.622 17.103-122.256 28.703-43.633 11.6-4.984 14.306 43.123 7.021 48.107-7.285 93.638-16.096 146.446-17.742 52.808-1.646 105.706 5.429 158.649 14.13 52.943 8.701 105.886 19.342 158.826 29.483 52.94 10.141 52.94 10.141-11.41-19.043C371.18 14.363 322.753 5.488 281.339 2.143 239.925-1.201 203.371.916 203.371.916z"
                fill="currentColor"
              />
            </svg>
          </span>
        ) : (
          part
        ),
      )}
    </h2>
  );
};

export const IntegrationShowcase = React.forwardRef<
  HTMLElement,
  IntegrationShowcaseProps
>(({ title, subtitle, illustrationSrc, illustrationAlt, integrations, className }, ref) => {
  // Animation variants for the container and items
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className={cn('w-full py-16 sm:py-24', className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <HighlightedTitle text={title} />
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-center">
            <img 
              src={illustrationSrc} 
              alt={illustrationAlt} 
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>

        {/* Integrations Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Can be changed to whileInView for scroll-triggered animation
          viewport={{ once: true, amount: 0.2 }}
        >
          {integrations.map((item) => (
            <motion.div key={item.name} variants={itemVariants} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img 
                  src={item.iconSrc} 
                  alt={`${item.name} logo`} 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

IntegrationShowcase.displayName = 'IntegrationShowcase';

code.demo.1759480550758.tsx
// demo.tsx

import React from 'react';
import { IntegrationShowcase, Integration } from '@/components/ui/integration-showcase';

// Sample data for the integrations grid
const integrationsData: Integration[] = [
  {
    name: 'Notion',
    description: 'Send submissions to Notion.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg',
  },
  {
    name: 'Google Sheets',
    description: 'Send submissions to a sheet.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/google-sheets-logo-icon.svg',
  },
  {
    name: 'Airtable',
    description: 'Send submissions to Airtable.',
    iconSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAjVBMVEVHcEz+uwD9tQDtnB/9tQD9tAD8tAD/tAD+tQD+tQD+tgD9tQD9tAD9tgDfJ1a8IEi6EEv/uAD9tAD9tQAOwP8Xv/8YwP/5K2DnJ1m5H0e6IEe8HUnxJ2AXwP8Wv/8Yv/8Yv/8YwP/5K2DDIUv9tQANx/8OwP8YwP8Uwv8UwP/WJFK9IEnAIEj5LGD5K2Cg/8aNAAAAL3RSTlMAJmwOVdb/HoR9NKfqiK7GUke6t1XEueL//+yMLzOT9v/h//+5D1zdJpr/mkSwqkV2VRMAAADASURBVHgBvc5FFgJBEATRxN3G3d3ufzxacGqWENv/SvCHJtPphJbZfLFkLeazL1qtBQnerN5ou1u+tdveZTbdL7/aTyVul2QTqZPD/mtwvRJ0PJ2Bi/JK6gXQdIOhadmO62G2WdyfncEPwiiKOSZWattiPNvv2VBe6BGvFJgkTNn4DKyqZkNvmDQ2r0VeSnhDoacOfkRhYjEC/JDC3gNGcGBEoyACYwAeIxINiAgM6wojqBc5QGIY+CCrQkPDr7sCTOYgaxntCWQAAAAASUVORK5CYII=',
  },
  {
    name: 'Webhooks',
    description: 'Send events for new submissions to HTTP endpoints.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/webhooks.svg',
  },
  {
    name: 'Slack',
    description: 'Send Slack messages for new submissions.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  },
  {
    name: 'Coda',
    description: 'Send submissions to Coda.',
    iconSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAiklEQVR4AWNwL/ChKx5YC79khSQC8X8q40SsFgIlOEAKaIQ5sFkoQ0MLZYa9hfyjFpKKDwNxIBBrQ3EdbVIpZj5DNo8f6pDDID61LKwjoZSh3EKQPnpa+HA4W4hIffS2cA6dLCScUqH58SEIU9FCRHxCM3sgFM8ZLUtpbuFIqfHp34iifzNx+Le8AdWFLhdVBCcKAAAAAElFTkSuQmCC',
  },
  {
    name: 'Google Analytics',
    description: 'Analyze traffic sources, visitor behavior and time spent.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/google-analytics-3.svg',
  },
  {
    name: 'Meta Pixel',
    description: 'Measure and optimize your ad campaigns.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/meta-3.svg',
  },
  {
    name: 'Zapier',
    description: 'Send submissions to your favorite tools.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
  },
  {
    name: 'Make',
    description: 'Send submissions to your favorite tools.',
    iconSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAwFBMVEX//////f/RY/LKYvDy4PvZwPF3ANGPTNeqhN/n3PVqAMuLS9X33/3GAO++GuyxAOnId/DFoOqEFtV+INLMteuDPdPhYPfNDvHEIu7UkvOsbOOJINeEJ9Tt4/jbAPXXF/SSGduTKdvxW/vnDvnbivT49PyQANuZW9v/2//yAPzpzPmHGNe6keb/Vf/mhvjNmu//AP+5ZumnJeWDANfzhPz/0//37f2jAOSnVeL/g//lxPfCjev/Sf+3TurZuPKIMda9K89qAAAAt0lEQVR4Ad3QAQfCYBDG8f9tu7e3WVRUBUCRCFDfH4gAAhkgCKWoNmZZTcy26QvswXF+nsPR3sifxRFJVfKAvAC8wgL5JfYj8Gvoi0R+jt2ouFUUrUXOxmBPaQPHSjaam++AXMtnl5KAaEpfoN5UyCahJnBs4NLtGI1xhtgp6yCtoAKDEIHrSWrNjQsdh62STYFZBT2gu8eDoQsP1mXcacAF7kafLvTsYVX97XYPgPfOWAy4hbQrHxHNJ3cZ8ThmAAAAAElFTkSuQmCC', // Make.com was Integromat
  },
  {
    name: 'Pipedream',
    description: 'Send submissions to your favorite tools.',
    iconSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEUz0ow004s00os00osz0Ywr0Ygc0INC1ZJV2Zxw3qrN8+GJ5buw7dD////i+e+i6ccrH71KAAAABXRSTlMIiuv/iksBsyIAAACfSURBVHgBY2BUNoYDIwcGZ2MkYMgAkkRIMwAJ07Tg0IowMB/EjVy1ddeqNa0wbvTdV3fv3l2B4ILALSTuvXV3706Fc++1pa+9ewzOvW9suvfuMmTuvLvPULnX8HKf4TLqTmn4WSSL7p6cf/duK5Ij3yI7EgReIrh3/t5904zg3jevKDZG4gJJXFzLV6+RueYd7XCuMigo4QGLFuxokQIA5VCQSPPORxwAAAAASUVORK5CYII=',
  },
  {
    name: 'And many more',
    description: 'Integrate with thousands of tools using Zapier, Make or Pipedream.',
    iconSrc: 'https://img.icons8.com/ios-glyphs/60/plus-math.png',
  },
];

const IntegrationShowcaseDemo = () => {
  return (
    <div className="w-full bg-background">
      <IntegrationShowcase
        title="Connect your ~favorite~ tools"
        subtitle="Save time using popular integrations to sync your form submissions."
        illustrationSrc="https://tally.so/images/demo/v2/strategy.png"
        illustrationAlt="A person working on a checklist"
        integrations={integrationsData}
      />
    </div>
  );
};

export default IntegrationShowcaseDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/integration-showcase.tsx
// components/ui/integration-showcase.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility from shadcn

/**
 * Type definition for a single integration item.
 * @property {string} name - The name of the integration (e.g., "Notion").
 * @property {string} description - A brief description of the integration.
 * @property {string} iconSrc - The URL for the integration's icon.
 */
export interface Integration {
  name: string;
  description: string;
  iconSrc: string;
}

/**
 * Props for the IntegrationShowcase component.
 * @property {string} title - The main heading. Use `~` to wrap the word you want to highlight (e.g., "Connect your ~favorite~ tools").
 * @property {string} subtitle - The descriptive text below the title.
 * @property {string} illustrationSrc - The URL for the decorative illustration.
 * @property {string} illustrationAlt - Alt text for the illustration.
 * @property {Integration[]} integrations - An array of integration objects to display in the grid.
 * @property {string} [className] - Optional additional class names for the container.
 */
export interface IntegrationShowcaseProps {
  title: string;
  subtitle: string;
  illustrationSrc: string;
  illustrationAlt: string;
  integrations: Integration[];
  className?: string;
}

// Function to parse the title and wrap the highlighted word in a span
const HighlightedTitle = ({ text }: { text: string }) => {
  const parts = text.split(/~/);
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {parts.map((part, index) =>
        index === 1 ? (
          <span key={index} className="relative whitespace-nowrap">
            <span className="relative">{part}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute -bottom-1.5 left-0 h-auto w-full text-primary"
              preserveAspectRatio="none"
            >
              <path
                d="M203.371.916c-26.013-2.078-76.686 1.98-114.243 8.919-37.556 6.939-78.622 17.103-122.256 28.703-43.633 11.6-4.984 14.306 43.123 7.021 48.107-7.285 93.638-16.096 146.446-17.742 52.808-1.646 105.706 5.429 158.649 14.13 52.943 8.701 105.886 19.342 158.826 29.483 52.94 10.141 52.94 10.141-11.41-19.043C371.18 14.363 322.753 5.488 281.339 2.143 239.925-1.201 203.371.916 203.371.916z"
                fill="currentColor"
              />
            </svg>
          </span>
        ) : (
          part
        ),
      )}
    </h2>
  );
};

export const IntegrationShowcase = React.forwardRef<
  HTMLElement,
  IntegrationShowcaseProps
>(({ title, subtitle, illustrationSrc, illustrationAlt, integrations, className }, ref) => {
  // Animation variants for the container and items
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className={cn('w-full py-16 sm:py-24', className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <HighlightedTitle text={title} />
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-center">
            <img 
              src={illustrationSrc} 
              alt={illustrationAlt} 
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>

        {/* Integrations Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Can be changed to whileInView for scroll-triggered animation
          viewport={{ once: true, amount: 0.2 }}
        >
          {integrations.map((item) => (
            <motion.div key={item.name} variants={itemVariants} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img 
                  src={item.iconSrc} 
                  alt={`${item.name} logo`} 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

IntegrationShowcase.displayName = 'IntegrationShowcase';
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
