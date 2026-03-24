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
hero-4.tsx
// components/ui/hero-section.tsx

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { Button } from "@/components/ui/button"; // Using shadcn/ui Button
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Using shadcn/ui Avatar

// Define the props interface for type safety and reusability
export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  animatedTexts: string[];
  subtitle: string;
  infoBadgeText: string;
  ctaButtonText: string;
  socialProofText: string;
  avatars: {
    src: string;
    alt: string;
    fallback: string;
  }[];
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, title, animatedTexts, subtitle, infoBadgeText, ctaButtonText, socialProofText, avatars, ...props }, ref) => {
    const [textIndex, setTextIndex] = React.useState(0);
    const [displayText, setDisplayText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    // Effect for the typewriter animation
    React.useEffect(() => {
      const fullText = animatedTexts[textIndex];

      const handleTyping = () => {
        if (isDeleting) {
          // Deleting text
          setDisplayText((prev) => prev.substring(0, prev.length - 1));
        } else {
          // Typing text
          setDisplayText((prev) => fullText.substring(0, prev.length + 1));
        }
      };

      const typingSpeed = isDeleting ? 75 : 150;
      const typeInterval = setInterval(handleTyping, typingSpeed);

      // Logic to switch between typing and deleting
      if (!isDeleting && displayText === fullText) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        // Move to the next text in the array
        setTextIndex((prev) => (prev + 1) % animatedTexts.length);
      }

      // Cleanup interval on component unmount or state change
      return () => clearInterval(typeInterval);
    }, [displayText, isDeleting, textIndex, animatedTexts]);

    return (
      <section
        className={cn("container mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32", className)}
        ref={ref}
        {...props}
      >
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            <span className="relative mt-2 block w-fit mx-auto">
              {/* Dashed border effect */}
              <span className="absolute inset-0 -z-10 -m-2">
                <span className="absolute inset-0 border-2 border-dashed border-primary rounded-2xl"></span>
              </span>
              {/* Animated Text */}
              <span className="text-primary min-h-[1.2em] inline-block">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          {/* Info Badge */}
          <div className="inline-flex items-center rounded-lg bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium">
            {infoBadgeText}
          </div>

          {/* CTA Button */}
          <Button size="lg" className="px-8 py-6 text-lg">
            {ctaButtonText}
          </Button>

          {/* Social Proof */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex -space-x-4">
              {avatars.map((avatar, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="ml-4 text-sm font-medium text-muted-foreground">
              {socialProofText}
            </p>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };

code.demo.1758382405856.tsx
// demo.tsx

import { HeroSection } from "@/components/ui/hero-4"; // Adjust the import path as needed

// Demo data for avatars
const avatarData = [
  {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User 1",
    fallback: "U1",
  },
  {
    src: "https://i.pravatar.cc/150?img=2",
    alt: "User 2",
    fallback: "U2",
  },
  {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User 3",
    fallback: "U3",
  },
];

const HeroSectionDemo = () => {
  return (
    <div className="w-full bg-background">
      <HeroSection
        title={<>How to make money <br/></>}
        animatedTexts={[
          "in digital marketing?",
          "with content creation?",
          "through e-commerce",
          "by mastering SEO",
        ]}
        subtitle="Achieve your goals and learn high-income skills with Coursiv"
        infoBadgeText="Annual income of Social Media Marketer: $70,000*"
        ctaButtonText="Get started"
        socialProofText="More than 100,000+ people joined"
        avatars={avatarData}
      />
    </div>
  );
};

export default HeroSectionDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-4.tsx
// components/ui/hero-section.tsx

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { Button } from "@/components/ui/button"; // Using shadcn/ui Button
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Using shadcn/ui Avatar

// Define the props interface for type safety and reusability
export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  animatedTexts: string[];
  subtitle: string;
  infoBadgeText: string;
  ctaButtonText: string;
  socialProofText: string;
  avatars: {
    src: string;
    alt: string;
    fallback: string;
  }[];
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, title, animatedTexts, subtitle, infoBadgeText, ctaButtonText, socialProofText, avatars, ...props }, ref) => {
    const [textIndex, setTextIndex] = React.useState(0);
    const [displayText, setDisplayText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    // Effect for the typewriter animation
    React.useEffect(() => {
      const fullText = animatedTexts[textIndex];

      const handleTyping = () => {
        if (isDeleting) {
          // Deleting text
          setDisplayText((prev) => prev.substring(0, prev.length - 1));
        } else {
          // Typing text
          setDisplayText((prev) => fullText.substring(0, prev.length + 1));
        }
      };

      const typingSpeed = isDeleting ? 75 : 150;
      const typeInterval = setInterval(handleTyping, typingSpeed);

      // Logic to switch between typing and deleting
      if (!isDeleting && displayText === fullText) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        // Move to the next text in the array
        setTextIndex((prev) => (prev + 1) % animatedTexts.length);
      }

      // Cleanup interval on component unmount or state change
      return () => clearInterval(typeInterval);
    }, [displayText, isDeleting, textIndex, animatedTexts]);

    return (
      <section
        className={cn("container mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32", className)}
        ref={ref}
        {...props}
      >
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
            <span className="relative mt-2 block w-fit mx-auto">
              {/* Dashed border effect */}
              <span className="absolute inset-0 -z-10 -m-2">
                <span className="absolute inset-0 border-2 border-dashed border-primary rounded-2xl"></span>
              </span>
              {/* Animated Text */}
              <span className="text-primary min-h-[1.2em] inline-block">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          {/* Info Badge */}
          <div className="inline-flex items-center rounded-lg bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium">
            {infoBadgeText}
          </div>

          {/* CTA Button */}
          <Button size="lg" className="px-8 py-6 text-lg">
            {ctaButtonText}
          </Button>

          {/* Social Proof */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex -space-x-4">
              {avatars.map((avatar, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="ml-4 text-sm font-medium text-muted-foreground">
              {socialProofText}
            </p>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
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
