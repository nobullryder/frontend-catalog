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
avatars.tsx
"use client";

import * as Avatar from "@radix-ui/react-avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center justify-center gap-x-12">
      <Avatar.Root className="bg-white h-6 w-6 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/79.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-8 w-8 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-10 w-10 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-12 w-12 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/86.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-16 w-16 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}


code.demo.1755359850538.tsx
import AvatarDemo from "@/components/ui/avatars";

export default function DemoOne() {
  return <AvatarDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatars.tsx
"use client";

import * as Avatar from "@radix-ui/react-avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center justify-center gap-x-12">
      <Avatar.Root className="bg-white h-6 w-6 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/79.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-8 w-8 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-10 w-10 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-12 w-12 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/86.jpg"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="bg-white h-16 w-16 overflow-hidden rounded-full">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
        <Avatar.Fallback delayMs={600}>CT</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@radix-ui/react-avatar
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
