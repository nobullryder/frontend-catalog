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
service-grid.tsx
// components/ui/service-grid.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

/**
 * Interface for a single service item.
 * @property {string} name - The name of the service.
 * @property {string} imageUrl - The URL for the service's representative image.
 * @property {string} href - The URL to navigate to when the service is clicked.
 */
export interface Service {
  name: string;
  imageUrl: string;
  href: string;
}

/**
 * Props for the ServiceGrid component.
 * @property {string} title - The main heading for the grid.
 * @property {string} [subtitle] - An optional subheading displayed below the title.
 * @property {Service[]} services - An array of service objects to display in the grid.
 * @property {string} [className] - Optional additional CSS classes for the container.
 */
export interface ServiceGridProps {
  title: string;
  subtitle?: string;
  services: Service[];
  className?: string;
}

const ServiceGrid = React.forwardRef<HTMLDivElement, ServiceGridProps>(
  ({ title, subtitle, services, className, ...props }, ref) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1, // Stagger the animation of children by 0.1s
        },
      },
    };

    // Animation variants for each grid item
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full py-12 md:py-16 lg:py-20", className)}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Animated Grid Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.a
                key={index}
                href={service.href}
                className="group flex flex-col items-center justify-start gap-3 text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }} // Hover animation
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} service icon`}
                    width={100}
                    height={100}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {service.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

ServiceGrid.displayName = "ServiceGrid";

export { ServiceGrid };

code.demo.1758849231647.tsx
// demo.tsx

import { ServiceGrid, Service } from "@/components/ui/service-grid";

// Sample data for the services, mimicking the provided image
const expertServices: Service[] = [
  {
    name: "Chefs",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-5pHkFAOH2PdoeZ65oD86FZ0ikKXAvV.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Prepared meals",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-cmFCjM4wAXdV4xpW6gHOyY8kbJo6B9.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Catering",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-HbCnYirZv0o05ffcBstUMZcPgOwlWQ.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Photography",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wnpD2WiW7gwjbHcIAcPhCbEuj7JNwY.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Personal training",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-oOxheUAwi87JIuaG4ebMbN4RqB9P8S.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Massage",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ZlnEb5GHMXqPR4L7WVSlbGZ6czxGrv.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Spa treatments",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-bkdUNYIhdtrWnm5wKkRmKHaRfiGOAx.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Hair styling",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-d0GAO5ycNDeZ700WGF58zQs6P3yEAi.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Makeup",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-n8G31Cqh3JyKkxXgC4UC1NDwW6tD3A.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Nails",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-FxF3nHvIyj3ximtxnyw76Q8BaiscEM.png&w=320&q=75",
    href: "#",
  },
];

export default function ServiceGridDemo() {
  return (
    <div className="w-full bg-background">
      <ServiceGrid
        title="A world of experts, at your service"
        subtitle="Choose from thousands of services in 260 cities—provided by trusted pros."
        services={expertServices}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/service-grid.tsx
// components/ui/service-grid.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

/**
 * Interface for a single service item.
 * @property {string} name - The name of the service.
 * @property {string} imageUrl - The URL for the service's representative image.
 * @property {string} href - The URL to navigate to when the service is clicked.
 */
export interface Service {
  name: string;
  imageUrl: string;
  href: string;
}

/**
 * Props for the ServiceGrid component.
 * @property {string} title - The main heading for the grid.
 * @property {string} [subtitle] - An optional subheading displayed below the title.
 * @property {Service[]} services - An array of service objects to display in the grid.
 * @property {string} [className] - Optional additional CSS classes for the container.
 */
export interface ServiceGridProps {
  title: string;
  subtitle?: string;
  services: Service[];
  className?: string;
}

const ServiceGrid = React.forwardRef<HTMLDivElement, ServiceGridProps>(
  ({ title, subtitle, services, className, ...props }, ref) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1, // Stagger the animation of children by 0.1s
        },
      },
    };

    // Animation variants for each grid item
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <section
        ref={ref}
        className={cn("w-full py-12 md:py-16 lg:py-20", className)}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Animated Grid Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.a
                key={index}
                href={service.href}
                className="group flex flex-col items-center justify-start gap-3 text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }} // Hover animation
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
                  <img
                    src={service.imageUrl}
                    alt={`${service.name} service icon`}
                    width={100}
                    height={100}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {service.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
);

ServiceGrid.displayName = "ServiceGrid";

export { ServiceGrid };
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
