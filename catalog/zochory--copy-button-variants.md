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
copy-button-variants.tsx
import { useState } from "react";

// Placeholder icons
const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const Component = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Cross Fade Animation Example</h1>
      <button
        onClick={handleClick}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          background: "#3f3f46",
          color: "white",
          border: "none",
          borderRadius: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          margin: "2rem auto"
        }}
      >
<div
            style={{
              position: "relative",
              width: "24px",
              height: "24px",
              display: "inline-block"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: copied ? 0 : 1,
                transform: copied ? "scale(0.6)" : "scale(1)",
                transition: "opacity 150ms, transform 150ms"
              }}
            >
              <CopyIcon />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: copied ? 1 : 0,
                transform: copied ? "scale(1)" : "scale(0.6)",
                transition: "opacity 400ms 150ms, transform 400ms 150ms"
              }}
            >
              <CheckIcon />
            </div>          </div>        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

code.demo.1763938028517.tsx
import { Component } from "@/components/ui/copy-button-variants";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/copy-button-variants.tsx
import { useState } from "react";

// Placeholder icons
const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const Component = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Cross Fade Animation Example</h1>
      <button
        onClick={handleClick}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          background: "#3f3f46",
          color: "white",
          border: "none",
          borderRadius: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          margin: "2rem auto"
        }}
      >
<div
            style={{
              position: "relative",
              width: "24px",
              height: "24px",
              display: "inline-block"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: copied ? 0 : 1,
                transform: copied ? "scale(0.6)" : "scale(1)",
                transition: "opacity 150ms, transform 150ms"
              }}
            >
              <CopyIcon />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: copied ? 1 : 0,
                transform: copied ? "scale(1)" : "scale(0.6)",
                transition: "opacity 400ms 150ms, transform 400ms 150ms"
              }}
            >
              <CheckIcon />
            </div>          </div>        {copied ? "Copied!" : "Copy"}
      </button>
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
