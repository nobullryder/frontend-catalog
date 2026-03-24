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
squiggly-underline.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href?: string;
}

export const SquigglyUnderline = ({
  items,
}: {
  items?: NavItem[];
}) => {
  const navigation: NavItem[] = items || [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
  ];
  const [selectedLink, setSelectedLink] = useState(navigation[0]?.name || "");

  return (
    <div className="flex gap-16">
      {navigation.map((item) => {
        const isSelected = item.name === selectedLink;
        return (
          <a
            key={item.name}
            href={item.href || "#"}
            onClick={(e) => {
              e.preventDefault();
              setSelectedLink(item.name);
            }}
            className={`relative text-sm leading-6 no-underline ${
              isSelected ? "font-semibold text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {item.name}
            {isSelected && (
              <motion.div
                layoutId="squiggly"
                className="absolute -bottom-[1px] left-0 right-0 h-[8px]"
              >
                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                  <motion.path
                    d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                    stroke="#7043EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      strokeDasharray: 84.20591735839844,
                      strokeDashoffset: 84.20591735839844,
                    }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
              </motion.div>
            )}
          </a>
        );
      })}
    </div>
  );
};


code.demo.1773393734249.tsx
"use client";
import React from "react";
import { SquigglyUnderline } from "../components/ui/squiggly-underline";

export default function SquigglyUnderlineDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black p-8">
      <div className="flex flex-col items-center gap-12">
        <SquigglyUnderline />
        <SquigglyUnderline
          items={[
            { name: "Products", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
          ]}
        />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/squiggly-underline.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href?: string;
}

export const SquigglyUnderline = ({
  items,
}: {
  items?: NavItem[];
}) => {
  const navigation: NavItem[] = items || [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
  ];
  const [selectedLink, setSelectedLink] = useState(navigation[0]?.name || "");

  return (
    <div className="flex gap-16">
      {navigation.map((item) => {
        const isSelected = item.name === selectedLink;
        return (
          <a
            key={item.name}
            href={item.href || "#"}
            onClick={(e) => {
              e.preventDefault();
              setSelectedLink(item.name);
            }}
            className={`relative text-sm leading-6 no-underline ${
              isSelected ? "font-semibold text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {item.name}
            {isSelected && (
              <motion.div
                layoutId="squiggly"
                className="absolute -bottom-[1px] left-0 right-0 h-[8px]"
              >
                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                  <motion.path
                    d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                    stroke="#7043EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      strokeDasharray: 84.20591735839844,
                      strokeDashoffset: 84.20591735839844,
                    }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
              </motion.div>
            )}
          </a>
        );
      })}
    </div>
  );
};

```

Install NPM dependencies:
```bash
framer-motion
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
