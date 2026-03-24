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
text-reveal-animation.tsx
import { useState } from "react";

export function TextReveal({word}) {
  const [reset, setReset] = useState(0);
  const WORD = word || "Animations";
  return (
    <div>
      <div key={reset}>
        <h1 className="h1">
          {WORD.split("").map((char,i)=>(
              <span 
                style={{"--index":i}}
                key={i}>
                {char}
              </span>
          )
        )}
        </h1>
      </div>
      {/* Use this button to replay your animation */}
      <button className="button" onClick={() => setReset(reset + 1)}>
        Replay animation
      </button>
      <style jsx>{`
.h1 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.05em;
  animation: reveal 0.5s ease;
  overflow:hidden;
}
.h1 span {
  display: inline-block;
  opacity:0;
  color: var(--foreground);
  animation: reveal 0.5s ease-in-out forwards;
  animation-delay: calc(0.02s * var(--index))
}
.button {
  width: 100%;
  margin-top: 24px;
  position: relative;
  height: 32px;
  font-size: 14px;
  padding-inline: 12px;
  font-weight: 500;
  border-radius: 9999px;
  color: var(--primary-foreground);
  background-color: var(--primary);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0px 2px 2px rgba(0, 0, 0, 0.04);
}


@keyframes reveal {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

`}</style>
    </div>
  );
}

code.demo.1769194006668.tsx
import { TextReveal } from "@/components/ui/text-reveal-animation";

export default function DemoOne() {
  return <TextReveal />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-reveal-animation.tsx
import { useState } from "react";

export function TextReveal({word}) {
  const [reset, setReset] = useState(0);
  const WORD = word || "Animations";
  return (
    <div>
      <div key={reset}>
        <h1 className="h1">
          {WORD.split("").map((char,i)=>(
              <span 
                style={{"--index":i}}
                key={i}>
                {char}
              </span>
          )
        )}
        </h1>
      </div>
      {/* Use this button to replay your animation */}
      <button className="button" onClick={() => setReset(reset + 1)}>
        Replay animation
      </button>
      <style jsx>{`
.h1 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.05em;
  animation: reveal 0.5s ease;
  overflow:hidden;
}
.h1 span {
  display: inline-block;
  opacity:0;
  color: var(--foreground);
  animation: reveal 0.5s ease-in-out forwards;
  animation-delay: calc(0.02s * var(--index))
}
.button {
  width: 100%;
  margin-top: 24px;
  position: relative;
  height: 32px;
  font-size: 14px;
  padding-inline: 12px;
  font-weight: 500;
  border-radius: 9999px;
  color: var(--primary-foreground);
  background-color: var(--primary);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0px 2px 2px rgba(0, 0, 0, 0.04);
}


@keyframes reveal {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

`}</style>
    </div>
  );
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
