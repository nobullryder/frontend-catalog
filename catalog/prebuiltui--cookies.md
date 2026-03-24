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
cookies.tsx
import React from "react";

export default function Example() {
    return (
        <div className="flex flex-col items-center w-80 bg-white text-gray-500 p-4 md:p-6 rounded-lg border border-gray-500/30 text-sm">
            <div className="flex items-center justify-center relative w-full gap-2 pb-3">
                <img className="absolute -top-12" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage2.svg" alt="cookieImage2" />
                <h2 className="text-gray-800 text-xl font-medium text-left w-full pt-3">Your privacy is important to us</h2>
            </div>
            <p>We process your personal information to measure and improve our sites and services, to assist our campaigns and to provide personalised content. For more information see our <a href="#" className="font-medium underline">Privacy Policy.</a></p>
            <div className="flex items-center justify-between mt-6 gap-3 w-full">
                <a className="underline" href="#">More Option</a>
                <button type="button" className="bg-indigo-600 px-6 py-2 rounded text-white font-medium active:scale-95 transition">Accept</button>
            </div>
        </div>
    );
};

code.demo.1757564166655.tsx
import Example from "@/components/ui/cookies";

export default function DemoOne() {
  return <Example />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cookies.tsx
import React from "react";

export default function Example() {
    return (
        <div className="flex flex-col items-center w-80 bg-white text-gray-500 p-4 md:p-6 rounded-lg border border-gray-500/30 text-sm">
            <div className="flex items-center justify-center relative w-full gap-2 pb-3">
                <img className="absolute -top-12" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/cookies/cookieImage2.svg" alt="cookieImage2" />
                <h2 className="text-gray-800 text-xl font-medium text-left w-full pt-3">Your privacy is important to us</h2>
            </div>
            <p>We process your personal information to measure and improve our sites and services, to assist our campaigns and to provide personalised content. For more information see our <a href="#" className="font-medium underline">Privacy Policy.</a></p>
            <div className="flex items-center justify-between mt-6 gap-3 w-full">
                <a className="underline" href="#">More Option</a>
                <button type="button" className="bg-indigo-600 px-6 py-2 rounded text-white font-medium active:scale-95 transition">Accept</button>
            </div>
        </div>
    );
};
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
