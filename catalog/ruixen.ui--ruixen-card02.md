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
ruixen-card02.tsx
import { Calendar, Code2, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Skill {
    name: string;
    level: number;
}

interface RuixenCard02Props {
    name?: string;
    role?: string;
    image?: string;
    status?: string;
    skills?: Skill[];
    portfolio?: string;
}

const profileInfo = {
    name: "Ruixen",
    role: "Software Developer Engineer",
    image:
        "https://github.com/shadcn.png",
    status: "Available for Remote Projects",
    skills: [
        { name: "TypeScript", level: 5 },
        { name: "Node.js", level: 4 },
        { name: "AWS", level: 3 },
    ],
    portfolio: "https://github.com/ruixenui",
} satisfies Required<RuixenCard02Props>;

export default function RuixenCard02({
    name = profileInfo.name,
    role = profileInfo.role,
    image = profileInfo.image,
    status = profileInfo.status,
    skills = profileInfo.skills,
    portfolio = profileInfo.portfolio,
}: RuixenCard02Props = profileInfo) {
    return (
        <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-lg transition-shadow duration-300">

            {/* Banner */}
            <div className="relative h-28 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-end justify-start p-4">
                {/* <p className="text-xs text-white dark:text-white font-medium bg-white/30 px-3 py-1 rounded-md backdrop-blur-lg">
          Driven by Impact · Delivering Clean Code
        </p> */}
            </div>

            {/* Profile Image */}
            <div className="relative z-10 flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-900 shadow-md overflow-hidden">
                    <Image src={image} alt={name} width={80} height={80} className="object-cover" />
                </div>
            </div>

            {/* Info */}
            <div className="text-center mt-2 px-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg">
                    <Calendar className="w-3 h-3" />
                    {status}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-5 px-5 space-y-3">
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-zinc-900 dark:bg-zinc-100"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-6 px-5 pb-5 flex flex-wrap gap-2 sm:flex-nowrap">
                <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Portfolio
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <span className="w-4 h-4 mr-2">🤝</span>
                    Connect
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <Share2 className="w-4 h-4" />
                    Share
                </Button>
            </div>

        </div>
    );
}


code.demo.1749720714620.tsx
import RuixenCard02 from "@/components/ui/ruixen-card02";

const DemoOne = () => {
  return <RuixenCard02 />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-card02.tsx
import { Calendar, Code2, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Skill {
    name: string;
    level: number;
}

interface RuixenCard02Props {
    name?: string;
    role?: string;
    image?: string;
    status?: string;
    skills?: Skill[];
    portfolio?: string;
}

const profileInfo = {
    name: "Ruixen",
    role: "Software Developer Engineer",
    image:
        "https://github.com/shadcn.png",
    status: "Available for Remote Projects",
    skills: [
        { name: "TypeScript", level: 5 },
        { name: "Node.js", level: 4 },
        { name: "AWS", level: 3 },
    ],
    portfolio: "https://github.com/ruixenui",
} satisfies Required<RuixenCard02Props>;

export default function RuixenCard02({
    name = profileInfo.name,
    role = profileInfo.role,
    image = profileInfo.image,
    status = profileInfo.status,
    skills = profileInfo.skills,
    portfolio = profileInfo.portfolio,
}: RuixenCard02Props = profileInfo) {
    return (
        <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-lg transition-shadow duration-300">

            {/* Banner */}
            <div className="relative h-28 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-end justify-start p-4">
                {/* <p className="text-xs text-white dark:text-white font-medium bg-white/30 px-3 py-1 rounded-md backdrop-blur-lg">
          Driven by Impact · Delivering Clean Code
        </p> */}
            </div>

            {/* Profile Image */}
            <div className="relative z-10 flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-900 shadow-md overflow-hidden">
                    <Image src={image} alt={name} width={80} height={80} className="object-cover" />
                </div>
            </div>

            {/* Info */}
            <div className="text-center mt-2 px-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-lg">
                    <Calendar className="w-3 h-3" />
                    {status}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-5 px-5 space-y-3">
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-zinc-900 dark:bg-zinc-100"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-6 px-5 pb-5 flex flex-wrap gap-2 sm:flex-nowrap">
                <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Portfolio
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <span className="w-4 h-4 mr-2">🤝</span>
                    Connect
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <Share2 className="w-4 h-4" />
                    Share
                </Button>
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
