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
card-3.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card-2";

/**
 * Type definition for individual stats.
 * This makes the 'stats' prop strongly-typed.
 */
interface Stat {
  label: string;
  value: string | number;
}

/**
 * Props for the ProfileCard component.
 * JSDoc comments explain the purpose of each prop.
 */
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL for the avatar image. */
  imageUrl: string;
  /** Fallback text for the avatar, typically user's initials. */
  fallbackText: string;
  /** The full name of the user. */
  name: string;
  /** The user's title or profession. */
  title: string;
  /** An array of stat objects to display. Must contain a label and a value. */
  stats: Stat[];
  /** The label for the primary action button. */
  primaryActionLabel: string;
  /** The label for the secondary action button. */
  secondaryActionLabel: string;
  /** Optional click handler for the primary action button. */
  onPrimaryAction?: () => void;
  /** Optional click handler for the secondary action button. */
  onSecondaryAction?: () => void;
}

/**
 * A responsive and theme-adaptive profile card component.
 * Note: This component uses path aliases (@/) standard in shadcn/ui.
 * Ensure your project's tsconfig.json and bundler are configured for them.
 */
const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      className,
      imageUrl,
      fallbackText,
      name,
      title,
      stats,
      primaryActionLabel,
      secondaryActionLabel,
      onPrimaryAction,
      onSecondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        className={cn("w-full max-w-sm rounded-2xl", className)}
        ref={ref}
        {...props}
      >
        <CardContent className="p-6 flex flex-col gap-6">
          {/* Header: Avatar and Name/Title */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} alt={`${name}'s profile picture`} />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>

          {/* Stats Section: Dynamically rendered from props */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-muted rounded-lg p-3"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-card-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button size="lg" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
            <Button size="lg" variant="secondary" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProfileCard.displayName = "ProfileCard";

export { ProfileCard };

code.demo.1757402917798.tsx
import { ProfileCard, ProfileCardProps } from "@/components/ui/card-3"; // Adjust path if needed

const ProfileCardDemo = () => {
  // Sample data for the component, easily fetched from an API
  const userProfile: ProfileCardProps = {
    imageUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=256&h=256&auto=format&fit=crop",
    fallbackText: "SR",
    name: "Sam Rivers",
    title: "Photographer",
    stats: [
      { label: "Countries Visited", value: 28 },
      { label: "Exhibitions Held", value: 10 },
      { label: "Rating", value: 4.9 },
    ],
    primaryActionLabel: "Explore Portfolio",
    secondaryActionLabel: "Message",
    onPrimaryAction: () => alert("Exploring Portfolio!"),
    onSecondaryAction: () => alert("Sending a message!"),
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <ProfileCard {...userProfile} />
    </div>
  );
};

export default ProfileCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-3.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card-2";

/**
 * Type definition for individual stats.
 * This makes the 'stats' prop strongly-typed.
 */
interface Stat {
  label: string;
  value: string | number;
}

/**
 * Props for the ProfileCard component.
 * JSDoc comments explain the purpose of each prop.
 */
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL for the avatar image. */
  imageUrl: string;
  /** Fallback text for the avatar, typically user's initials. */
  fallbackText: string;
  /** The full name of the user. */
  name: string;
  /** The user's title or profession. */
  title: string;
  /** An array of stat objects to display. Must contain a label and a value. */
  stats: Stat[];
  /** The label for the primary action button. */
  primaryActionLabel: string;
  /** The label for the secondary action button. */
  secondaryActionLabel: string;
  /** Optional click handler for the primary action button. */
  onPrimaryAction?: () => void;
  /** Optional click handler for the secondary action button. */
  onSecondaryAction?: () => void;
}

/**
 * A responsive and theme-adaptive profile card component.
 * Note: This component uses path aliases (@/) standard in shadcn/ui.
 * Ensure your project's tsconfig.json and bundler are configured for them.
 */
const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      className,
      imageUrl,
      fallbackText,
      name,
      title,
      stats,
      primaryActionLabel,
      secondaryActionLabel,
      onPrimaryAction,
      onSecondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        className={cn("w-full max-w-sm rounded-2xl", className)}
        ref={ref}
        {...props}
      >
        <CardContent className="p-6 flex flex-col gap-6">
          {/* Header: Avatar and Name/Title */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} alt={`${name}'s profile picture`} />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>

          {/* Stats Section: Dynamically rendered from props */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-muted rounded-lg p-3"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-card-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button size="lg" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
            <Button size="lg" variant="secondary" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProfileCard.displayName = "ProfileCard";

export { ProfileCard };
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
