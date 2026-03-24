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
switch.tsx
import React from 'react';
import styled from 'styled-components';

const Switch = () => {
  return (
    <StyledWrapper>
      <div>
        <input id="check" type="checkbox" />
        <label className="switch" htmlFor="check">
          <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
            <path pathLength={360} fill="none" stroke="currentColor" d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0" />
          </svg>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    --a: 0.5s ease-out;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    height: 2em;
    border-radius: 2em;
    box-shadow: 0 0 0 0.66em #aaa;
    aspect-ratio: 212.4992/84.4688;
    background-color: #aaa;
  }

  /* Hide default HTML checkbox */
  #check {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch svg {
    height: 100%;
  }

  .switch svg path {
    color: #fff;
    stroke-width: 16;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 136 224;
    transition:
      all var(--a),
      0s transform;
    transform-origin: center;
  }

  #check:checked ~ .switch svg path {
    stroke-dashoffset: 180;
    transform: scaleY(-1);
  }`;

export default Switch;


code.demo.1756745840130.tsx
import Switch from "@/components/ui/switch";

export default function DemoOne() {
  return <Switch />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch.tsx
import React from 'react';
import styled from 'styled-components';

const Switch = () => {
  return (
    <StyledWrapper>
      <div>
        <input id="check" type="checkbox" />
        <label className="switch" htmlFor="check">
          <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
            <path pathLength={360} fill="none" stroke="currentColor" d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0" />
          </svg>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    --a: 0.5s ease-out;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    height: 2em;
    border-radius: 2em;
    box-shadow: 0 0 0 0.66em #aaa;
    aspect-ratio: 212.4992/84.4688;
    background-color: #aaa;
  }

  /* Hide default HTML checkbox */
  #check {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch svg {
    height: 100%;
  }

  .switch svg path {
    color: #fff;
    stroke-width: 16;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 136 224;
    transition:
      all var(--a),
      0s transform;
    transform-origin: center;
  }

  #check:checked ~ .switch svg path {
    stroke-dashoffset: 180;
    transform: scaleY(-1);
  }`;

export default Switch;

```

Install NPM dependencies:
```bash
styled-components
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
