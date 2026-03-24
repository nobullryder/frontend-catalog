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
accordian.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Info, Settings, Code, Accessibility } from "lucide-react";


const items = [
    {
        id: "1",
        icon: Info,
        title: "What is the core philosophy of Origin UI?",
        content:
            "Origin UI emphasizes developer experience by offering lightweight, accessible components with strong TypeScript support and excellent documentation.",
    },
    {
        id: "2",
        icon: Settings,
        title: "How do I customize styles in Origin UI?",
        content:
            "You can easily customize styles using CSS variables, Tailwind, or traditional CSS by overriding classNames or using the style prop.",
    },
    {
        id: "3",
        icon: Code,
        title: "How performant is Origin UI?",
        content:
            "Optimized for performance with minimal bundle size, tree shaking, and fast rendering to keep your apps light and fast.",
    },
    {
        id: "4",
        icon: Accessibility,
        title: "Is accessibility a priority in Origin UI?",
        content:
            "Absolutely! All components follow WAI-ARIA guidelines and support keyboard navigation and screen readers out of the box.",
    },
];

export const Component = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleItem = (id: string) => {
        setOpenItem((current) => (current === id ? null : id));
    };

  return (
        <div
            className="
        max-w-md
        bg-white/30 dark:bg-black/30
        backdrop-blur-md
        border border-gray-300 dark:border-gray-700
        rounded-lg
        shadow-lg shadow-black/20 dark:shadow-white/10
        transition-colors duration-500
      "
        >
            <h2 className="text-2xl font-extrabold text-black dark:text-white px-5 pt-5 select-none">
                FAQs
            </h2>

            <div>
                {items.map(({ id, icon: Icon, title, content }) => {
                    const isOpen = openItem === id;

                    return (
                        <div
                            key={id}
                            className="border-t border-gray-300 dark:border-gray-700 last:border-b-0"
                        >
                            <button
                                onClick={() => toggleItem(id)}
                                aria-expanded={isOpen}
                                className={`
                                    flex items-center justify-between w-full
                                    px-5 py-4
                                    text-black dark:text-white
                                    text-base font-medium
                                    cursor-pointer
                                    bg-transparent
                                    transition-colors duration-300
                                    hover:bg-black/5 dark:hover:bg-white/10
                                    select-none
                                    focus:outline-none
                                    `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className="w-4 h-4 text-black dark:text-white"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    <span>{title}</span>
                                </div>

                                <div className="relative w-4 h-4 flex-shrink-0">
                                    <Plus
                                        className={`absolute inset-0 text-black dark:text-white transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                                            }`}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    <Minus
                                        className={`absolute inset-0 text-black dark:text-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                                            }`}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>
                            </button>

                            {/* Content wrapper */}
                            <motion.div
                                initial={false}
                                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <div
                                    ref={(el) => {
                                        contentRefs.current[id] = el;
                                    }}
                                    className="px-5 pb-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed select-text"
                                >
                                    {content}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
  );
};


code.demo.1749226200341.tsx
import { Component } from "@/components/ui/accordian";

const DemoOne = () => {
  return <Component />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordian.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Info, Settings, Code, Accessibility } from "lucide-react";


const items = [
    {
        id: "1",
        icon: Info,
        title: "What is the core philosophy of Origin UI?",
        content:
            "Origin UI emphasizes developer experience by offering lightweight, accessible components with strong TypeScript support and excellent documentation.",
    },
    {
        id: "2",
        icon: Settings,
        title: "How do I customize styles in Origin UI?",
        content:
            "You can easily customize styles using CSS variables, Tailwind, or traditional CSS by overriding classNames or using the style prop.",
    },
    {
        id: "3",
        icon: Code,
        title: "How performant is Origin UI?",
        content:
            "Optimized for performance with minimal bundle size, tree shaking, and fast rendering to keep your apps light and fast.",
    },
    {
        id: "4",
        icon: Accessibility,
        title: "Is accessibility a priority in Origin UI?",
        content:
            "Absolutely! All components follow WAI-ARIA guidelines and support keyboard navigation and screen readers out of the box.",
    },
];

export const Component = () => {
    const [openItem, setOpenItem] = useState<string | null>(null);
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleItem = (id: string) => {
        setOpenItem((current) => (current === id ? null : id));
    };

  return (
        <div
            className="
        max-w-md
        bg-white/30 dark:bg-black/30
        backdrop-blur-md
        border border-gray-300 dark:border-gray-700
        rounded-lg
        shadow-lg shadow-black/20 dark:shadow-white/10
        transition-colors duration-500
      "
        >
            <h2 className="text-2xl font-extrabold text-black dark:text-white px-5 pt-5 select-none">
                FAQs
            </h2>

            <div>
                {items.map(({ id, icon: Icon, title, content }) => {
                    const isOpen = openItem === id;

                    return (
                        <div
                            key={id}
                            className="border-t border-gray-300 dark:border-gray-700 last:border-b-0"
                        >
                            <button
                                onClick={() => toggleItem(id)}
                                aria-expanded={isOpen}
                                className={`
                                    flex items-center justify-between w-full
                                    px-5 py-4
                                    text-black dark:text-white
                                    text-base font-medium
                                    cursor-pointer
                                    bg-transparent
                                    transition-colors duration-300
                                    hover:bg-black/5 dark:hover:bg-white/10
                                    select-none
                                    focus:outline-none
                                    `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        className="w-4 h-4 text-black dark:text-white"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    <span>{title}</span>
                                </div>

                                <div className="relative w-4 h-4 flex-shrink-0">
                                    <Plus
                                        className={`absolute inset-0 text-black dark:text-white transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                                            }`}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    <Minus
                                        className={`absolute inset-0 text-black dark:text-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                                            }`}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>
                            </button>

                            {/* Content wrapper */}
                            <motion.div
                                initial={false}
                                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <div
                                    ref={(el) => {
                                        contentRefs.current[id] = el;
                                    }}
                                    className="px-5 pb-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed select-text"
                                >
                                    {content}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
  );
};

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
