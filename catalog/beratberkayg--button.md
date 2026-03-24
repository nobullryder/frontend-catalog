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
button.tsx
import React from "react";
import { Icon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement<Icon>;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  gradientLight?: { from: string; via: string; to: string };
  gradientDark?: { from: string; via: string; to: string };
}

export const Component: React.FC<ButtonProps> = ({
  icon,
  title,
  subtitle,
  size = "md",
  gradientLight = { from: "from-indigo-500/40", via: "via-indigo-400/40", to: "to-indigo-500/60" },
  gradientDark = { from: "from-indigo-800/30", via: "via-black/50", to: "to-black/70" },
  ...props
}) => {
  const sizes = {
    sm: "p-3 rounded-xl",
    md: "p-4 rounded-2xl",
    lg: "p-6 rounded-3xl",
  };

  return (
    <button
      {...props}
      className={`group relative overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out 
                  shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95
                  ${sizes[size]} 
                  border-indigo-500/40 bg-gradient-to-br ${gradientLight.from} ${gradientLight.via} ${gradientLight.to} 
                  dark:${gradientDark.from} dark:${gradientDark.via} dark:${gradientDark.to}`}
    >
      {/* Moving gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      {/* Overlay glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-indigo-300/10 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/50 to-indigo-400/30 backdrop-blur-sm group-hover:from-indigo-400/60 group-hover:to-indigo-500/40 transition-all duration-300">
          {React.cloneElement(icon, {
            className:
              "w-7 h-7 text-white group-hover:text-white/90 transition-all duration-300 group-hover:scale-110 drop-shadow-lg",
          })}
        </div>

        {/* Texts */}
        <div className="flex-1 text-left">
          <p className="text-white font-bold text-lg group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
            {title}
          </p>
          {subtitle && (
            <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="w-5 h-5 text-white"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
};


code.demo.1755293295530.tsx
import { Component } from "@/components/ui/button";
import { Twitter } from "lucide-react";

export default function DemoOne() {
  return<div className="w-full h-screen flex items-center justify-center mx-auto relative" > <Component icon={<Twitter />}
  title="Twiiter"
  subtitle="Join community"
  size="md"
  /> <div
  className = "absolute w-full h-full -z-10"
  style = {{
    backgroundImage:
    "url('data:image/svg+xml,%3Csvg width=\\'4\\' height=\\'4\\' viewBox=\\'0 0 6 6\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'6\\' cy=\\'6\\' r=\\'1\\' fill=\\'%23aaa\\' fill-opacity=\\'0.25\\' /%3E%3C/svg%3E')",
      backgroundColor: "transparent",
                }
}
              > </div></div > ;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button.tsx
import React from "react";
import { Icon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement<Icon>;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  gradientLight?: { from: string; via: string; to: string };
  gradientDark?: { from: string; via: string; to: string };
}

export const Component: React.FC<ButtonProps> = ({
  icon,
  title,
  subtitle,
  size = "md",
  gradientLight = { from: "from-indigo-500/40", via: "via-indigo-400/40", to: "to-indigo-500/60" },
  gradientDark = { from: "from-indigo-800/30", via: "via-black/50", to: "to-black/70" },
  ...props
}) => {
  const sizes = {
    sm: "p-3 rounded-xl",
    md: "p-4 rounded-2xl",
    lg: "p-6 rounded-3xl",
  };

  return (
    <button
      {...props}
      className={`group relative overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out 
                  shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95
                  ${sizes[size]} 
                  border-indigo-500/40 bg-gradient-to-br ${gradientLight.from} ${gradientLight.via} ${gradientLight.to} 
                  dark:${gradientDark.from} dark:${gradientDark.via} dark:${gradientDark.to}`}
    >
      {/* Moving gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      {/* Overlay glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-indigo-300/10 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/50 to-indigo-400/30 backdrop-blur-sm group-hover:from-indigo-400/60 group-hover:to-indigo-500/40 transition-all duration-300">
          {React.cloneElement(icon, {
            className:
              "w-7 h-7 text-white group-hover:text-white/90 transition-all duration-300 group-hover:scale-110 drop-shadow-lg",
          })}
        </div>

        {/* Texts */}
        <div className="flex-1 text-left">
          <p className="text-white font-bold text-lg group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
            {title}
          </p>
          {subtitle && (
            <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="w-5 h-5 text-white"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
};

```

Install NPM dependencies:
```bash
lucide-react
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
