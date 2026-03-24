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
card-1.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single partner
export interface Partner {
  name: string;
  cashback: string;
  logo: React.ReactNode;
  href: string;
}

// Define the props for the main component
export interface CashbackPartnersCardProps {
  title: string;
  partners: Partner[];
  viewAllHref?: string;
  className?: string;
}

/**
 * A responsive, theme-adaptive card component to display cashback partners.
 * Features a grid layout and subtle animations on load.
 */
export const CashbackPartnersCard = ({
  title,
  partners,
  viewAllHref = "#",
  className,
}: CashbackPartnersCardProps) => {
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

  // Animation variants for each partner item
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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a
          href={viewAllHref}
          aria-label="View all partners"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>

      {/* Partners Grid */}
      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {partners.map((partner, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-border bg-transparent p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent hover:shadow-md"
            >
              {/* Partner Logo */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted/50">
                {partner.logo}
              </div>
              {/* Partner Info */}
              <div>
                <p className="font-medium text-card-foreground">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{`Cashback ${partner.cashback}`}</p>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};

code.demo.1757903345267.tsx
import * as React from "react";
import { CashbackPartnersCard, Partner } from "@/components/ui/card-1";

// --- Logo Components using external SVG URLs ---
const GoogleLogo = () => (
  <img src="https://svgl.app/library/google.svg" alt="Google logo" className="h-6 w-6" />
);

const AppleLogo = () => (
  <img src="https://svgl.app/library/n8n.svg" alt="Apple logo" className="h-7 w-7" />
);

const Slack = () => (
  <img src="https://svgl.app/library/slack.svg" alt="Mailchimp logo" className="h-7 w-7" />
);

const FigmaLogo = () => (
  <img src="https://svgl.app/library/figma.svg" alt="Figma logo" className="h-7 w-7" />
);


// --- Demo Component ---
const CashbackPartnersDemo = () => {
  const partnersData: Partner[] = [
    {
      name: "Google",
      cashback: "1.5%",
      logo: <GoogleLogo />,
      href: "#",
    },
    {
      name: "N8n",
      cashback: "1.1%",
      logo: <AppleLogo />,
      href: "#",
    },
    {
      name: "Slack",
      cashback: "3.2%",
      logo: <Slack />,
      href: "#",
    },
    {
      name: "Figma",
      cashback: "2.8%",
      logo: <FigmaLogo />,
      href: "#",
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <CashbackPartnersCard 
        title="Cashback From Partners" 
        partners={partnersData} 
      />
    </div>
  );
};

export default CashbackPartnersDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-1.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single partner
export interface Partner {
  name: string;
  cashback: string;
  logo: React.ReactNode;
  href: string;
}

// Define the props for the main component
export interface CashbackPartnersCardProps {
  title: string;
  partners: Partner[];
  viewAllHref?: string;
  className?: string;
}

/**
 * A responsive, theme-adaptive card component to display cashback partners.
 * Features a grid layout and subtle animations on load.
 */
export const CashbackPartnersCard = ({
  title,
  partners,
  viewAllHref = "#",
  className,
}: CashbackPartnersCardProps) => {
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

  // Animation variants for each partner item
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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <a
          href={viewAllHref}
          aria-label="View all partners"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>

      {/* Partners Grid */}
      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {partners.map((partner, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border border-border bg-transparent p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent hover:shadow-md"
            >
              {/* Partner Logo */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted/50">
                {partner.logo}
              </div>
              {/* Partner Info */}
              <div>
                <p className="font-medium text-card-foreground">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{`Cashback ${partner.cashback}`}</p>
              </div>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
