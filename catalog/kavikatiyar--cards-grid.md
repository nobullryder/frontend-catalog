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
cards-grid.tsx
// components/ui/resource-cards-grid.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Define the type for each card item
export interface ResourceCardItem {
  iconSrc: string;
  title: string;
  lastUpdated: string;
  href: string;
}

// Define the props for the main grid component
interface ResourceCardsGridProps {
  items: ResourceCardItem[];
  className?: string;
}

// Animation variants for the container to orchestrate children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each card item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const ResourceCardsGrid = ({ items, className }: ResourceCardsGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={item.iconSrc} alt={`${item.title} icon`} className="h-10 w-10" />
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {item.lastUpdated}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

code.demo.1760425786559.tsx
// demo.tsx

import { ResourceCardsGrid, ResourceCardItem } from "@/components/ui/cards-grid";

// Sample data for the resource cards
const resourceData: ResourceCardItem[] = [
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-tRfo11d3TVT3JA1CtlD6iR8HZCvIQM.png&w=320&q=75",
    title: "SOPs",
    lastUpdated: "29 April 2025",
    href: "#",
  },
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-fs2N6IIs4VkGZQpjrS17tAgnWBFkbl.png&w=320&q=75",
    title: "Contracts",
    lastUpdated: "29 April 2025",
    href: "#",
  },
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-uqbQgvm8wfMxwP35nXRvS4ZteqmoCU.png&w=320&q=75",
    title: "Templates",
    lastUpdated: "29 April 2025",
    href: "#",
  },
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-vSXxF8u21GdIWRr8AtFn5sK74jIZN8.png&w=320&q=75",
    title: "Policies",
    lastUpdated: "29 April 2025",
    href: "#",
  },
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-OcGyav7XXTTVq0fDXxzmOVek6Noq7s.png&w=320&q=75",
    title: "Knowledge Base",
    lastUpdated: "29 April 2025",
    href: "#",
  },
  {
    iconSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-5zVOONIN28dJticozuMBCoSEjaw6VA.png&w=320&q=75",
    title: "Archive",
    lastUpdated: "29 April 2025",
    href: "#",
  },
];

const ResourceGridDemo = () => {
  return (
    <div className="w-full max-w-6xl p-4 md:p-8">
      <ResourceCardsGrid items={resourceData} />
    </div>
  );
};

export default ResourceGridDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cards-grid.tsx
// components/ui/resource-cards-grid.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Define the type for each card item
export interface ResourceCardItem {
  iconSrc: string;
  title: string;
  lastUpdated: string;
  href: string;
}

// Define the props for the main grid component
interface ResourceCardsGridProps {
  items: ResourceCardItem[];
  className?: string;
}

// Animation variants for the container to orchestrate children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each card item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const ResourceCardsGrid = ({ items, className }: ResourceCardsGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={item.iconSrc} alt={`${item.title} icon`} className="h-10 w-10" />
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {item.lastUpdated}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
