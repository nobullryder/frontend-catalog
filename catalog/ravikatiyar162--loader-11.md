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
loader-11.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="sharingon">
        <div className="ring">
          <div className="to" />
          <div className="to" />
          <div className="to" />
          <div className="circle" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .sharingon {
    width: 6em;
    height: 6em;
    background-color: red;
    border: 6px solid black;
    animation: rot 1s ease-in-out infinite;
  }

  .ring {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 3.5em;
    height: 3.5em;
    border: 4px solid rgb(110, 13 ,13 ,0.5);
    transform: translate(-50%,-50%);
  }

  .sharingon, .ring, .to,.circle {
    border-radius: 50%;
  }

  .to,.circle {
    position: absolute;
    content: "";
    width: 0.9em;
    height: 0.9em;
    background-color: black;
  }

  .to:nth-child(1) {
    top: -0.5em;
    left: 50%;
    transform: translate(-40%);
  }

  .to::before {
    content: "";
    position: absolute;
    top: -0.5em;
    right: -0.2em;
    width: 1.1em;
    height: 0.9em;
    box-sizing: border-box;
    border-left: 16px solid black;
    border-radius: 100% 0 0;
  }

  .to:nth-child(2) {
    bottom: 0.5em;
    left: -0.35em;
    transform: rotate(-120deg);
  }

  .to:nth-child(3) {
    bottom: 0.5em;
    right: -0.35em;
    transform: rotate(120deg);
  }

  .circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 20px 1px;
    width: 1em;
    height: 1em;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;


code.demo.1756921298413.tsx
import Loader from "@/components/ui/loader-11";

export default function DemoOne() {
  return <Loader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-11.tsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="sharingon">
        <div className="ring">
          <div className="to" />
          <div className="to" />
          <div className="to" />
          <div className="circle" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .sharingon {
    width: 6em;
    height: 6em;
    background-color: red;
    border: 6px solid black;
    animation: rot 1s ease-in-out infinite;
  }

  .ring {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 3.5em;
    height: 3.5em;
    border: 4px solid rgb(110, 13 ,13 ,0.5);
    transform: translate(-50%,-50%);
  }

  .sharingon, .ring, .to,.circle {
    border-radius: 50%;
  }

  .to,.circle {
    position: absolute;
    content: "";
    width: 0.9em;
    height: 0.9em;
    background-color: black;
  }

  .to:nth-child(1) {
    top: -0.5em;
    left: 50%;
    transform: translate(-40%);
  }

  .to::before {
    content: "";
    position: absolute;
    top: -0.5em;
    right: -0.2em;
    width: 1.1em;
    height: 0.9em;
    box-sizing: border-box;
    border-left: 16px solid black;
    border-radius: 100% 0 0;
  }

  .to:nth-child(2) {
    bottom: 0.5em;
    left: -0.35em;
    transform: rotate(-120deg);
  }

  .to:nth-child(3) {
    bottom: 0.5em;
    right: -0.35em;
    transform: rotate(120deg);
  }

  .circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 20px 1px;
    width: 1em;
    height: 1em;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;

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
