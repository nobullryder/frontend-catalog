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
figma-file-button.tsx
import { Button } from "@/components/ui/button";

const ButtonFigmaDemo = () => {
  return (
    <>
      <div className="w-fit h-fit inline-flex items-center justify-center rounded-md bg-linear-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] py-px px-[0.5px]">
        <Button className="bg-background hover:bg-background text-foreground cursor-pointer">
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-figma.svg"
            alt="figma"
            className="h-4 w-4"
          />
          Get Figma File
        </Button>
      </div>
    </>
  );
};

export default ButtonFigmaDemo;


code.demo.1773078067204.tsx
import ButtonFigmaDemo from "@/components/ui/figma-file-button";

export default function DemoOne() {
  return <ButtonFigmaDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/figma-file-button.tsx
import { Button } from "@/components/ui/button";

const ButtonFigmaDemo = () => {
  return (
    <>
      <div className="w-fit h-fit inline-flex items-center justify-center rounded-md bg-linear-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] py-px px-[0.5px]">
        <Button className="bg-background hover:bg-background text-foreground cursor-pointer">
          <img
            src="https://images.shadcnspace.com/assets/svgs/icon-figma.svg"
            alt="figma"
            className="h-4 w-4"
          />
          Get Figma File
        </Button>
      </div>
    </>
  );
};

export default ButtonFigmaDemo;

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
