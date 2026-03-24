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
cta-card-1.tsx
import React from "react";
import { Annoyed } from "lucide-react";

interface CTACardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  showBadge?: boolean;
  variant?: "light" | "dark" | "gradient";
  icon?: React.ReactNode;
}

const CTACard: React.FC<CTACardProps> = ({
  title = "This is supposed to be a cool title",
  description = "Your description goes here but idk what to write so im gonna continue with this to just take up some of the space on here",
  buttonText = "Subscribe",
  buttonUrl = "https://www.youtube.com/@axorax",
  badge = "New",
  showBadge = true,
  variant = "light",
  icon = <Annoyed className="w-6 h-6 text-white" />,
}) => {
  const variantStyles = {
    light: {
      container: "bg-white border border-gray-100",
      badge: "text-indigo-700 bg-indigo-100",
      iconContainer: "bg-indigo-600",
      text: "text-gray-900",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      description: "text-gray-600",
    },
    dark: {
      container: "bg-gray-900 border border-gray-800",
      badge: "text-indigo-300 bg-indigo-950",
      iconContainer: "bg-indigo-500",
      text: "text-white",
      button: "bg-indigo-500 hover:bg-indigo-400 text-white",
      description: "text-gray-300",
    },
    gradient: {
      container:
        "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700",
      badge: "text-white bg-white/20 backdrop-blur-sm",
      iconContainer: "bg-white/20 backdrop-blur-sm",
      text: "text-white",
      button: "bg-white hover:bg-gray-100 text-indigo-700",
      description: "text-gray-100",
    },
  };

  const variantStyle = variantStyles[variant];

  return (
    <div
      className={`max-w-md mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${variantStyle.container}`}
    >
      <div className="px-6 py-8">
        {showBadge && (
          <span
            className={`inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full ${variantStyle.badge}`}
          >
            {badge}
          </span>
        )}

        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg mr-3 ${variantStyle.iconContainer}`}>
            {icon}
          </div>
          <h3 className={`text-xl font-bold ${variantStyle.text}`}>
            Sigma Nuts
          </h3>
        </div>

        <h2
          className={`text-2xl font-bold mb-3 leading-tight ${variantStyle.text}`}
        >
          {title}
        </h2>
        <p className={`mb-6 leading-relaxed ${variantStyle.description}`}>
          {description}
        </p>

        <a
          href={buttonUrl}
          className={`w-full inline-flex items-center justify-center px-5 py-3 font-medium rounded-lg transition-colors duration-200 text-center ${variantStyle.button}`}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default CTACard;


code.demo.1746086947492.tsx
import { useState } from "react";
import CTACard from "@/components/ui/cta-card-1";

export function Demo() {
  const [selectedVariant, setSelectedVariant] = useState<
    "light" | "dark" | "gradient"
  >("light");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full mb-8">
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setSelectedVariant("light")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedVariant === "light"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setSelectedVariant("dark")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedVariant === "dark"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setSelectedVariant("gradient")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedVariant === "gradient"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <CTACard variant={selectedVariant} />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/cta-card-1.tsx
import React from "react";
import { Annoyed } from "lucide-react";

interface CTACardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  showBadge?: boolean;
  variant?: "light" | "dark" | "gradient";
  icon?: React.ReactNode;
}

const CTACard: React.FC<CTACardProps> = ({
  title = "This is supposed to be a cool title",
  description = "Your description goes here but idk what to write so im gonna continue with this to just take up some of the space on here",
  buttonText = "Subscribe",
  buttonUrl = "https://www.youtube.com/@axorax",
  badge = "New",
  showBadge = true,
  variant = "light",
  icon = <Annoyed className="w-6 h-6 text-white" />,
}) => {
  const variantStyles = {
    light: {
      container: "bg-white border border-gray-100",
      badge: "text-indigo-700 bg-indigo-100",
      iconContainer: "bg-indigo-600",
      text: "text-gray-900",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      description: "text-gray-600",
    },
    dark: {
      container: "bg-gray-900 border border-gray-800",
      badge: "text-indigo-300 bg-indigo-950",
      iconContainer: "bg-indigo-500",
      text: "text-white",
      button: "bg-indigo-500 hover:bg-indigo-400 text-white",
      description: "text-gray-300",
    },
    gradient: {
      container:
        "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700",
      badge: "text-white bg-white/20 backdrop-blur-sm",
      iconContainer: "bg-white/20 backdrop-blur-sm",
      text: "text-white",
      button: "bg-white hover:bg-gray-100 text-indigo-700",
      description: "text-gray-100",
    },
  };

  const variantStyle = variantStyles[variant];

  return (
    <div
      className={`max-w-md mx-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${variantStyle.container}`}
    >
      <div className="px-6 py-8">
        {showBadge && (
          <span
            className={`inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full ${variantStyle.badge}`}
          >
            {badge}
          </span>
        )}

        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg mr-3 ${variantStyle.iconContainer}`}>
            {icon}
          </div>
          <h3 className={`text-xl font-bold ${variantStyle.text}`}>
            Sigma Nuts
          </h3>
        </div>

        <h2
          className={`text-2xl font-bold mb-3 leading-tight ${variantStyle.text}`}
        >
          {title}
        </h2>
        <p className={`mb-6 leading-relaxed ${variantStyle.description}`}>
          {description}
        </p>

        <a
          href={buttonUrl}
          className={`w-full inline-flex items-center justify-center px-5 py-3 font-medium rounded-lg transition-colors duration-200 text-center ${variantStyle.button}`}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default CTACard;

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
