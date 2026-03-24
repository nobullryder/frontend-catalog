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
show-more.tsx
import React from "react";

interface ShowMoreProps {
  expanded: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  noBorder?: boolean;
  className?: string;
}

export const ShowMore = ({ expanded = false, onClick, className = "" }: ShowMoreProps) => {
  return (
    <div className={`w-[calc(100%_-_40px)] flex items-center justify-center min-h-[30px] ${className}`}>
      <div className="rounded-[99px] bg-background">
        <button
          type="submit"
          className="h-8 px-3 text-sm rounded-[100px] text-gray-1000 font-sans bg-background-100 font-medium border border-gray-alpha-400 duration-150"
          onClick={() => onClick(!expanded)}
        >
          <span className="text-nowrap inline-block">
            <div className="flex items-center">
              Show {expanded ? "Less" : "More"}
              <span className={`inline-flex ml-1 duration-200${expanded ? " rotate-180" : ""}`}>
                <svg
                  height="16"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                  className="fill-gray-1000"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z"
                  />
                </svg>
              </span>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};

code.demo.tsx
import React, { useState } from "react";
import { ShowMore } from "@/components/ui/show-more";

export const Demo = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <ShowMore expanded={expanded} onClick={setExpanded} />
    </div>
  );
};
```

Copy-paste these files for dependencies:
```tsx
/components/ui/show-more.tsx
import React from "react";

interface ShowMoreProps {
  expanded: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  noBorder?: boolean;
  className?: string;
}

export const ShowMore = ({ expanded = false, onClick, className = "" }: ShowMoreProps) => {
  return (
    <div className={`w-[calc(100%_-_40px)] flex items-center justify-center min-h-[30px] ${className}`}>
      <div className="rounded-[99px] bg-background">
        <button
          type="submit"
          className="h-8 px-3 text-sm rounded-[100px] text-gray-1000 font-sans bg-background-100 font-medium border border-gray-alpha-400 duration-150"
          onClick={() => onClick(!expanded)}
        >
          <span className="text-nowrap inline-block">
            <div className="flex items-center">
              Show {expanded ? "Less" : "More"}
              <span className={`inline-flex ml-1 duration-200${expanded ? " rotate-180" : ""}`}>
                <svg
                  height="16"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                  className="fill-gray-1000"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z"
                  />
                </svg>
              </span>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-1000": "var(--ds-gray-1000)",
        "gray-alpha-400": "var(--ds-gray-alpha-400)",
        "background-100": "var(--ds-background-100)",
        "background": "var(--geist-background)"
      }
    }
  }
}
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
