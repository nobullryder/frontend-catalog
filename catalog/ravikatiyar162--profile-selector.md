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
profile-selector.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming a 'utils' file for cn

// Define the shape of a single profile object
// The icon can now be a URL string or a React component
interface Profile {
  id: string;
  label: string;
  icon: string | React.ReactNode;
}

// Define the props for the main ProfileSelector component
interface ProfileSelectorProps {
  /** The main title displayed above the profiles */
  title?: string;
  /** An array of profile objects to display */
  profiles: Profile[];
  /** Callback function when a profile is selected */
  onProfileSelect: (id:string) => void;
  /** Optional custom class names */
  className?: string;
}

/**
 * A responsive and theme-adaptive component for selecting a user profile.
 * Supports both image URLs and React components for profile icons.
 */
export const ProfileSelector = ({
  title = "Who's watching?",
  profiles,
  onProfileSelect,
  className,
}: ProfileSelectorProps) => {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center bg-background p-4",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-10 text-3xl font-medium text-foreground md:text-5xl">
          {title}
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-center gap-3 group">
              <button
                onClick={() => onProfileSelect(profile.id)}
                aria-label={`Select profile: ${profile.label}`}
                className="group relative h-28 w-28 rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-36 md:w-36"
              >
                <div className="absolute inset-0 rounded-full bg-muted transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"></div>
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                  {/* Conditionally render an image or a React node */}
                  {typeof profile.icon === 'string' ? (
                    <img
                      src={profile.icon}
                      alt={`${profile.label} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profile.icon
                  )}
                </div>
              </button>
              <p className="text-lg text-muted-foreground transition-colors group-hover:text-foreground">
                {profile.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// This helper component is still useful for non-image icons like the 'Add' button
export const ProfileIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center text-4xl text-foreground/80 md:text-5xl",
      className
    )}
  >
    {children}
  </div>
);

code.demo.1760420860128.tsx
import { ProfileSelector, ProfileIcon } from "@/components/ui/profile-selector"; // Adjust path as needed
import { Plus } from "lucide-react"; // Using lucide-react for icons

/**
 * A demo showcasing the ProfileSelector component with image URLs.
 */
export default function ProfileSelectorDemo() {
  // Sample data using image URLs for profiles
  const sampleProfiles = [
    {
      id: "Ravi",
      label: "Ravi",
      // Using a placeholder image service for the demo icon
      icon: "https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png",
    },
    {
      id: "vaib",
      label: "Vaib",
      // Using a placeholder image service for the demo icon
      icon: "https://plus.unsplash.com/premium_photo-1739163838574-27c663e8a22b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "kids",
      label: "Kids",
      // Using a placeholder image service for the demo icon
      icon: "https://plus.unsplash.com/premium_photo-1739206781762-6b28bac44141?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHwyfDB8fHww&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "add",
      label: "Add",
      // The 'Add' button can still be a React component for flexibility
      icon: (
        <ProfileIcon className="bg-foreground/5">
          <Plus className="h-12 w-12 text-muted-foreground" />
        </ProfileIcon>
      ),
    },
  ];

  // Handler for when a profile is selected
  const handleProfileSelect = (id: string) => {
    if (id === "add") {
      alert("Add new profile action triggered!");
    } else {
      alert(`Profile selected: ${id}`);
    }
  };

  return (
    <ProfileSelector profiles={sampleProfiles} onProfileSelect={handleProfileSelect} />
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/profile-selector.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming a 'utils' file for cn

// Define the shape of a single profile object
// The icon can now be a URL string or a React component
interface Profile {
  id: string;
  label: string;
  icon: string | React.ReactNode;
}

// Define the props for the main ProfileSelector component
interface ProfileSelectorProps {
  /** The main title displayed above the profiles */
  title?: string;
  /** An array of profile objects to display */
  profiles: Profile[];
  /** Callback function when a profile is selected */
  onProfileSelect: (id:string) => void;
  /** Optional custom class names */
  className?: string;
}

/**
 * A responsive and theme-adaptive component for selecting a user profile.
 * Supports both image URLs and React components for profile icons.
 */
export const ProfileSelector = ({
  title = "Who's watching?",
  profiles,
  onProfileSelect,
  className,
}: ProfileSelectorProps) => {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center bg-background p-4",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-10 text-3xl font-medium text-foreground md:text-5xl">
          {title}
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-center gap-3 group">
              <button
                onClick={() => onProfileSelect(profile.id)}
                aria-label={`Select profile: ${profile.label}`}
                className="group relative h-28 w-28 rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-36 md:w-36"
              >
                <div className="absolute inset-0 rounded-full bg-muted transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"></div>
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                  {/* Conditionally render an image or a React node */}
                  {typeof profile.icon === 'string' ? (
                    <img
                      src={profile.icon}
                      alt={`${profile.label} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profile.icon
                  )}
                </div>
              </button>
              <p className="text-lg text-muted-foreground transition-colors group-hover:text-foreground">
                {profile.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// This helper component is still useful for non-image icons like the 'Add' button
export const ProfileIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center text-4xl text-foreground/80 md:text-5xl",
      className
    )}
  >
    {children}
  </div>
);
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
