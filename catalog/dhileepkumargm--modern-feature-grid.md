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
modern-feature-grid.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for class name merging ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Feature Card Sub-component ---
const FeatureCard = React.forwardRef(
  ({ Icon, title, description, className }, ref) => {
    const titleId = React.useId();
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-4 p-6 rounded-2xl border bg-black/5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent-foreground/20 hover:bg-black/10 dark:bg-black/30 dark:hover:bg-black/50",
          className
        )}
        aria-labelledby={titleId}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary text-secondary-foreground">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <h3 id={titleId} className="text-lg font-bold leading-none tracking-tight text-card-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
FeatureCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

// --- Main FeatureGrid Component ---
export const FeatureGrid = React.forwardRef(
  ({ sectionTitle, sectionDescription, features = [], className, ...props }, ref) => {
    const titleId = React.useId();

    return (
      <section
        ref={ref}
        className={cn("w-full py-12", className)}
        aria-labelledby={titleId}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id={titleId} className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              {sectionDescription}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
FeatureGrid.displayName = "FeatureGrid";
FeatureGrid.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionDescription: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({
      Icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
};


code.demo.1757051899109.tsx
import React from 'react';
import { FeatureGrid } from "@/components/ui/modern-feature-grid";

// --- Mock Icons ---
const ZapIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);
const CodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);
const PaletteIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
    </svg>
);

// --- Demo Content ---
const featureData = [
  {
    Icon: ZapIcon,
    title: "Blazing Fast Performance",
    description: "Optimized for speed, our components deliver a seamless user experience without compromising on features."
  },
  {
    Icon: CodeIcon,
    title: "Developer-Friendly",
    description: "Clean, reusable code that follows best practices, making integration and customization a breeze."
  },
  {
    Icon: PaletteIcon,
    title: "Easily Themeable",
    description: "Built with CSS variables, allowing you to easily adapt the look and feel to match your brand's design system."
  }
];

export default function DemoOne() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  React.useEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <div 
        className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 md:p-8 font-sans antialiased overflow-hidden"
        onMouseMove={handleMouseMove}
    >
        <div 
            className="pointer-events-none absolute -inset-px transition duration-500"
            style={{
                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            }}
        />
        <FeatureGrid
            sectionTitle="Everything You Need to Build Great UIs"
            sectionDescription="Our components are designed to be composable, accessible, and beautiful right out of the box."
            features={featureData}
        />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modern-feature-grid.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for class name merging ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Feature Card Sub-component ---
const FeatureCard = React.forwardRef(
  ({ Icon, title, description, className }, ref) => {
    const titleId = React.useId();
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-4 p-6 rounded-2xl border bg-black/5 shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-accent-foreground/20 hover:bg-black/10 dark:bg-black/30 dark:hover:bg-black/50",
          className
        )}
        aria-labelledby={titleId}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary text-secondary-foreground">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <h3 id={titleId} className="text-lg font-bold leading-none tracking-tight text-card-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
FeatureCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

// --- Main FeatureGrid Component ---
export const FeatureGrid = React.forwardRef(
  ({ sectionTitle, sectionDescription, features = [], className, ...props }, ref) => {
    const titleId = React.useId();

    return (
      <section
        ref={ref}
        className={cn("w-full py-12", className)}
        aria-labelledby={titleId}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id={titleId} className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              {sectionDescription}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);
FeatureGrid.displayName = "FeatureGrid";
FeatureGrid.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionDescription: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({
      Icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

```

Install NPM dependencies:
```bash
clsx, prop-types, tailwind-merge
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
