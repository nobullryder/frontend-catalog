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
social-button.tsx
import { Button } from "@/components/ui/button";

const ButtonSocialDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* google */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
          alt="google icon"
          className="h-4 w-4"
        />
        Sign in with Google
      </Button>
      {/* github */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
          alt="github icon"
          className="dark:hidden h-4 w-4"
        />
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
          alt="github icon"
          className="hidden dark:block h-4 w-4"
        />
        Sign in with Github
      </Button>
      {/* linkedin */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-linkedin.svg"
          alt="linkedin icon"
          className="h-4 w-4"
        />
        Continue with Linkedin
      </Button>
    </div>
  );
};

export default ButtonSocialDemo;


code.demo.1773078174417.tsx
import ButtonSocialDemo from "@/components/ui/social-button";

export default function DemoOne() {
  return <ButtonSocialDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/social-button.tsx
import { Button } from "@/components/ui/button";

const ButtonSocialDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {/* google */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
          alt="google icon"
          className="h-4 w-4"
        />
        Sign in with Google
      </Button>
      {/* github */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
          alt="github icon"
          className="dark:hidden h-4 w-4"
        />
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
          alt="github icon"
          className="hidden dark:block h-4 w-4"
        />
        Sign in with Github
      </Button>
      {/* linkedin */}
      <Button
        variant="outline"
        type="button"
        className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg cursor-pointer"
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/icon-linkedin.svg"
          alt="linkedin icon"
          className="h-4 w-4"
        />
        Continue with Linkedin
      </Button>
    </div>
  );
};

export default ButtonSocialDemo;

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
