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
doctor-live-chat-card.tsx
import { CalendarHeart, MessageCircle, Star, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RuixenCard4() {
    return (
        <div className="max-w-sm w-full mx-auto bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden relative">
            {/* Status Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 font-medium">
                Online
            </div>

            {/* Header */}
            <div className="p-5 text-center border-b border-zinc-200 dark:border-zinc-700">
                <Image
                    src="https://github.com/shadcn.png"
                    width={64}
                    height={64}
                    alt="Doctor Avatar"
                    className="mx-auto rounded-full"
                />
                <h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                    Dr. Sarah Johnson
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Pediatric Specialist
                </p>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500" />
                        4.8 Rating
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        231 Chats
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <CalendarHeart className="w-4 h-4" />
                    Available Today · Until 7:00 PM
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-sm h-10"
                    >
                        Join Live Chat
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 h-9 text-sm"
                    >
                        <HeartHandshake className="w-4 h-4 mr-2" />
                        Bookmark Doctor
                    </Button>
                </div>
            </div>
        </div>
    );
}


code.demo.1749321461909.tsx
import RuixenCard4 from "@/components/ui/doctor-live-chat-card";

const DemoOne = () => {
  return <RuixenCard4 />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/doctor-live-chat-card.tsx
import { CalendarHeart, MessageCircle, Star, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RuixenCard4() {
    return (
        <div className="max-w-sm w-full mx-auto bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden relative">
            {/* Status Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 font-medium">
                Online
            </div>

            {/* Header */}
            <div className="p-5 text-center border-b border-zinc-200 dark:border-zinc-700">
                <Image
                    src="https://github.com/shadcn.png"
                    width={64}
                    height={64}
                    alt="Doctor Avatar"
                    className="mx-auto rounded-full"
                />
                <h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                    Dr. Sarah Johnson
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Pediatric Specialist
                </p>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500" />
                        4.8 Rating
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        231 Chats
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <CalendarHeart className="w-4 h-4" />
                    Available Today · Until 7:00 PM
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-sm h-10"
                    >
                        Join Live Chat
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 h-9 text-sm"
                    >
                        <HeartHandshake className="w-4 h-4 mr-2" />
                        Bookmark Doctor
                    </Button>
                </div>
            </div>
        </div>
    );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
