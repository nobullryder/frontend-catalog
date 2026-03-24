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
card-25.tsx
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Prop types remain the same
export interface Stat {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedHikeCardProps {
  title: string;
  images: string[];
  stats: Stat[];
  description: string;
  href: string;
  className?: string;
}

export const AnimatedHikeCard = React.forwardRef<
  HTMLAnchorElement,
  AnimatedHikeCardProps
>(({ title, images, stats, description, href, className }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative block w-full max-w-sm cursor-pointer rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg lg:max-w-md",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex flex-col">
        {/* Card Header: Title and Arrow */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
          <ArrowRight className="h-6 w-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </div>

        {/* Stacked Images with CORRECTED Hover Animation */}
        <div className="relative mb-6 h-32">
          {images.map((src, index) => (
            <div
              key={index}
              className={cn(
                "absolute h-full w-[40%] overflow-hidden rounded-lg border-2 border-background shadow-md transition-all duration-300 ease-in-out",
                // On hover, apply transforms using the CSS variables defined in `style`
                "group-hover:translate-x-[var(--tx)] group-hover:rotate-[var(--r)]"
              )}
              style={{
                // Set initial transform for the stacked look
                transform: `translateX(${index * 32}px)`,
                // Define CSS variables for the hover state transforms
                '--tx': `${index * 80}px`,
                '--r': `${index * 5 - 5}deg`,
                zIndex: images.length - index,
              }}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1.5">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
});

AnimatedHikeCard.displayName = "AnimatedHikeCard";

code.demo.1758281565185.tsx
import { AnimatedHikeCard, Stat } from "@/components/ui/card-25";
import { Clock, Zap, Mountain } from "lucide-react";

export default function AnimatedHikeCardDemo() {
  // Sample props to demonstrate the component's reusability
  const hikeProps = {
    title: "Mountain Hike",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    ],
    stats: [
      {
        icon: <Clock className="h-4 w-4" />,
        label: "~6 Hours",
      },
      {
        icon: <Mountain className="h-4 w-4" />,
        label: "8 km",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: "Medium",
      },
    ] as Stat[],
    description:
      "Hiking on a mountain blends physical challenge with natural beauty, offering sweeping views and a profound sense of accomplishment.",
    href: "#",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <AnimatedHikeCard {...hikeProps} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-25.tsx
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Prop types remain the same
export interface Stat {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedHikeCardProps {
  title: string;
  images: string[];
  stats: Stat[];
  description: string;
  href: string;
  className?: string;
}

export const AnimatedHikeCard = React.forwardRef<
  HTMLAnchorElement,
  AnimatedHikeCardProps
>(({ title, images, stats, description, href, className }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative block w-full max-w-sm cursor-pointer rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg lg:max-w-md",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex flex-col">
        {/* Card Header: Title and Arrow */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
          <ArrowRight className="h-6 w-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </div>

        {/* Stacked Images with CORRECTED Hover Animation */}
        <div className="relative mb-6 h-32">
          {images.map((src, index) => (
            <div
              key={index}
              className={cn(
                "absolute h-full w-[40%] overflow-hidden rounded-lg border-2 border-background shadow-md transition-all duration-300 ease-in-out",
                // On hover, apply transforms using the CSS variables defined in `style`
                "group-hover:translate-x-[var(--tx)] group-hover:rotate-[var(--r)]"
              )}
              style={{
                // Set initial transform for the stacked look
                transform: `translateX(${index * 32}px)`,
                // Define CSS variables for the hover state transforms
                '--tx': `${index * 80}px`,
                '--r': `${index * 5 - 5}deg`,
                zIndex: images.length - index,
              }}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1.5">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
});

AnimatedHikeCard.displayName = "AnimatedHikeCard";
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
