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
ruixen-card-01.tsx
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface RuixenCardProps {
    title?: string;
    subtitle?: string;
    image?: string;
    badge?: {
        text: string;
        variant: "pink" | "indigo" | "orange";
    };
    href?: string;
    id?: string;
}


export default function RuixenCard({
    title = "Build Stunning Interfaces",
    subtitle = "Harness the power of elegant components built for speed and clarity with RUIXEN UI",
    image = "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge = { text: "New", variant: "orange" },
    href = "#",
    id = title,
}: RuixenCardProps) {
    const badgeColors = {
        pink: "bg-pink-600 text-white",
        indigo: "bg-indigo-600 text-white",
        orange: "bg-orange-500 text-white",
    };

  return (
        <div className="w-full max-w-[300px] flex flex-col group">
            <Link href={href} className="relative block overflow-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-white/50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]">
                {/* Image */}
                <div className="relative h-[300px] w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                </div>

                <div className="absolute top-4 -left-10 transform -rotate-45">
                    <div className={cn("px-3 py-0.5 text-xs font-bold shadow-md", badgeColors[badge.variant])}>
                        {badge.text}
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 group-hover:scale-[1.01] group-hover:translate-y-[-4px] transform transition-all duration-300 ease-out bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/10 dark:border-zinc-700">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                            {subtitle}
                        </p>
                        <div className="flex justify-end mt-2">
                            <div
                                className="group relative w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100/70 dark:bg-zinc-800/60 transition-all duration-300 hover:scale-110 hover:shadow-md"
                            >
                                <ArrowUpRight
                                    className="w-3.5 h-3.5 text-zinc-700 dark:text-white transition-transform duration-300 group-hover:rotate-45"
                                />
                                <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
  );
};


code.demo.1749311825175.tsx
import RuixenCard from "@/components/ui/ruixen-card-01";

const DemoOne = () => {
  return <RuixenCard />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-card-01.tsx
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface RuixenCardProps {
    title?: string;
    subtitle?: string;
    image?: string;
    badge?: {
        text: string;
        variant: "pink" | "indigo" | "orange";
    };
    href?: string;
    id?: string;
}


export default function RuixenCard({
    title = "Build Stunning Interfaces",
    subtitle = "Harness the power of elegant components built for speed and clarity with RUIXEN UI",
    image = "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    badge = { text: "New", variant: "orange" },
    href = "#",
    id = title,
}: RuixenCardProps) {
    const badgeColors = {
        pink: "bg-pink-600 text-white",
        indigo: "bg-indigo-600 text-white",
        orange: "bg-orange-500 text-white",
    };

  return (
        <div className="w-full max-w-[300px] flex flex-col group">
            <Link href={href} className="relative block overflow-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-white/50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]">
                {/* Image */}
                <div className="relative h-[300px] w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                </div>

                <div className="absolute top-4 -left-10 transform -rotate-45">
                    <div className={cn("px-3 py-0.5 text-xs font-bold shadow-md", badgeColors[badge.variant])}>
                        {badge.text}
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 group-hover:scale-[1.01] group-hover:translate-y-[-4px] transform transition-all duration-300 ease-out bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/10 dark:border-zinc-700">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                            {subtitle}
                        </p>
                        <div className="flex justify-end mt-2">
                            <div
                                className="group relative w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100/70 dark:bg-zinc-800/60 transition-all duration-300 hover:scale-110 hover:shadow-md"
                            >
                                <ArrowUpRight
                                    className="w-3.5 h-3.5 text-zinc-700 dark:text-white transition-transform duration-300 group-hover:rotate-45"
                                />
                                <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
  );
};

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
